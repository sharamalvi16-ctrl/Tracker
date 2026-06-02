import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-md border border-white/12 bg-white/8 px-3 text-sm text-white outline-none transition placeholder:text-white/38 focus:border-primary",
        props.className,
      )}
    />
  );
}
