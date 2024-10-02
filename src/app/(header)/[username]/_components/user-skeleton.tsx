import * as React from "react";

export default function UserSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-36 w-36 animate-pulse rounded-full bg-primary/20"></div>
      <div className="flex flex-col items-center gap-1">
        <div className="h-8 w-48 animate-pulse rounded-md bg-primary/20"></div>
        <div className="h-6 w-24 animate-pulse rounded-md bg-primary/20"></div>
      </div>
    </div>
  );
}
