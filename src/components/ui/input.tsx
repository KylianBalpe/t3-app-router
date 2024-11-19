import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative inline-flex w-full items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "selection:bg-primary flex h-10 w-full rounded-base border-2 border-border bg-white px-3 py-2 text-sm font-base text-text ring-offset-white selection:text-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText",
            type === "password" && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <span className="absolute right-0">
            <button
              type="button"
              className="h-full px-3 py-2 text-text dark:text-darkText"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </button>
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
