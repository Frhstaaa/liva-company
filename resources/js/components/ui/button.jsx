import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E60D5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-[#1E60D5] text-white hover:bg-[#164DB0] shadow-sm shadow-blue-600/20",
                destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-xs",
                outline: "border border-slate-200 bg-white hover:bg-slate-50 hover:text-[#0F172A] text-slate-700 shadow-2xs",
                secondary: "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]",
                ghost: "hover:bg-slate-100 hover:text-[#0F172A] text-slate-600",
                link: "text-[#1E60D5] underline-offset-4 hover:underline",
                brandOrange: "bg-[#F97316] text-white hover:bg-[#EA580C] shadow-sm shadow-orange-500/20",
                brandDark: "bg-[#0F172A] text-white hover:bg-slate-800 shadow-xs",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-11 rounded-xl px-5 text-sm font-bold",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
