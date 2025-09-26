"use client";

import { Spinner } from "@/components/ui/spinner";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[34rem] animate-pulse">
      <Spinner variant="default" />
    </div>
  );
}
