import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono",
    {
        variants: {
            variant: {
                default: "border-transparent bg-[#2F8BFF] text-white",
                secondary: "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200",
                destructive: "border-transparent bg-rose-500 text-white",
                outline: "text-[#1F2937] border-slate-200",
                blueLight: "border-blue-200 bg-blue-50 text-[#2F8BFF]",
                orangeLight: "border-orange-200 bg-orange-50 text-[#FF8A2B]",
                emeraldLight: "border-emerald-200 bg-emerald-50 text-emerald-700",
                dark: "border-slate-700 bg-slate-800 text-slate-200",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
