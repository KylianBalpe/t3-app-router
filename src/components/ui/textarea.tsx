import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "selection:bg-primary flex min-h-[80px] w-full rounded-base border-2 border-border bg-white p-4 px-3 py-2 text-sm font-base text-text ring-offset-white selection:text-black placeholder:text-text/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText dark:placeholder:text-darkText/50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
