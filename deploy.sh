#!/bin/bash

# Env Vars
POSTGRES_USER="postgres"
POSTGRES_PASSWORD=$(openssl rand -base64 12)  # Generate a random 12-character password
POSTGRES_DB="mydb"
NEXTAUTH_SECRET=$(openssl rand -base64 32)  # Generate random 32-character secret
DOMAIN_NAME="your@domain.com"  # Replace with your actual domain name
EMAIL="your@email.com"  # Replace with your own email

# Script Vars
REPO_URL="https://github.com/KylianBalpe/t3-app-router.git"
APP_DIR=~/myapp
SWAP_SIZE="1G"  # Swap size of 1GB

# Update and upgrade existing packages
sudo apt update && sudo apt upgrade -y

# Add Swap Space
echo "Adding swap space..."
sudo fallocate -l $SWAP_SIZE /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Install Docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
sudo apt update
sudo apt install docker-ce -y

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version || { echo "Docker Compose installation failed. Exiting."; exit 1; }

# Ensure Docker starts on boot and start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Clone the Git repository
if [ -d "$APP_DIR" ]; then
  echo "Directory $APP_DIR already exists. Pulling latest changes..."
  cd $APP_DIR && git pull
else
  echo "Cloning repository from $REPO_URL..."
  git clone $REPO_URL $APP_DIR
  cd $APP_DIR
fi

# Prepare the `.env` file with localhost database connection
DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB"

cat > "$APP_DIR/.env" <<EOL
POSTGRES_USER=$POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_DB=$POSTGRES_DB
DATABASE_URL=$DATABASE_URL
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL=https://$DOMAIN_NAME
NEXTAPP_URL=https://$DOMAIN_NAME
EOL

# Configure docker-compose.yml for the web service
sed -i '/- NODE_ENV=production/a\
      - DATABASE_URL=${DATABASE_URL}\
      - NEXTAUTH_URL=${NEXTAUTH_URL}\
      - NEXTAPP_URL=${NEXTAPP_URL}\
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}' "$APP_DIR/docker-compose.yml"

# Install and stop Nginx (temporarily for Certbot)
sudo apt install nginx -y
sudo systemctl stop nginx

# Set up SSL Certificates using Certbot
sudo apt install certbot -y
sudo certbot certonly --standalone -d $DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL || {
  echo "Certbot failed to issue SSL certificates. Check your domain and configuration.";
  exit 1;
}

# Configure Nginx
cat > /etc/nginx/sites-available/myapp <<EOL
limit_req_zone \$binary_remote_addr zone=mylimit:10m rate=10r/s;
server {
    listen 80;
    server_name $DOMAIN_NAME;
    # Redirect all HTTP to HTTPS
    return 301 https://\$host\$request_uri;
}
server {
    listen 443 ssl;
    server_name $DOMAIN_NAME;
    ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    # Enable rate limiting
    limit_req zone=mylimit burst=20 nodelay;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        # Disable buffering for streaming support
        proxy_buffering off;
        proxy_set_header X-Accel-Buffering no;
    }
}
EOL

sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/myapp
sudo systemctl restart nginx

# Start PostgreSQL Locally
echo "Checking PostgreSQL status on localhost..."
sudo systemctl restart postgresql
sudo systemctl enable postgresql

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
for i in {1..10}; do
  sudo -u postgres psql -c "SELECT 1" > /dev/null 2>&1 && break
  echo "PostgreSQL is unavailable - retrying in 5 seconds..."
  sleep 5
done

# Run Prisma Migrations
echo "Running Prisma migrations..."
sudo docker-compose run --rm web npx prisma migrate deploy || { echo "Prisma migrations failed."; exit 1; }

# Build and Start the Web Service
echo "Starting the web service..."
sudo docker-compose up -d --build web

# Verify everything started properly
if ! sudo docker-compose ps | grep "Up"; then
  echo "Some Docker containers failed to start. Check logs with 'docker-compose logs'."
  exit 1
fi

echo "Deployment complete! Your app is live at https://$DOMAIN_NAME."