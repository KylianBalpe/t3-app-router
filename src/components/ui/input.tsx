import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

const InputMessage = ({ className, message, ...props }: InputMessageProps) => {
  return message ? (
    <p
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {message}
    </p>
  ) : null;
};
InputMessage.displayName = "InputMessage";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isPassword, setIsPassword] = React.useState<boolean>(true);

    return (
      <div className="relative flex items-center justify-center">
        <Input
          type={isPassword ? "password" : "text"}
          className={cn("flex items-center", className)}
          ref={ref}
          {...props}
        />
        <div className="absolute right-0 inline-flex h-full items-center">
          <Button
            variant="ghost"
            size="sm"
            className="h-full hover:bg-transparent"
            onClick={() => setIsPassword(!isPassword)}
            type="button"
          >
            {isPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
        </div>
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { Input, InputMessage, InputPassword };
