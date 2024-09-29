import SignUpForm from "@/components/authentication/sign-up";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <SignUpForm />
      <Link href="/" className={buttonVariants({ variant: "link" })}>
        Return to home
      </Link>
    </main>
  );
}
