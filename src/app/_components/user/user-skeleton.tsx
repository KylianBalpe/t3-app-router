import * as React from "react";

export default function UserSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-darkBg/20 h-36 w-36 animate-pulse rounded-full"></div>
      <div className="flex flex-col items-center gap-1">
        <div className="bg-darkBg/20 h-8 w-48 animate-pulse rounded-md"></div>
        <div className="bg-darkBg/20 h-6 w-24 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
}
