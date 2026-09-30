import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:ring-offset-2 font-mono",
    {
        variants: {
            variant: {
                default: "border-transparent bg-[#1E60D5] text-white",
                secondary: "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200",
                destructive: "border-transparent bg-rose-500 text-white",
                outline: "text-[#0F172A] border-slate-200",
                blueLight: "border-[#C5DCFE] bg-[#EBF2FE] text-[#1E60D5]",
                orangeLight: "border-[#FFD8BF] bg-[#FFF7ED] text-[#EA580C]",
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
