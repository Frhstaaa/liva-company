import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-[#2F8BFF] text-white hover:bg-[#1E75E6] shadow-xs",
                destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-xs",
                outline: "border border-slate-200 bg-white hover:bg-slate-50 hover:text-[#1F2937] text-slate-700",
                secondary: "bg-[#F1F5F9] text-[#1F2937] hover:bg-[#E2E8F0]",
                ghost: "hover:bg-slate-100 hover:text-[#1F2937] text-slate-600",
                link: "text-[#2F8BFF] underline-offset-4 hover:underline",
                brandOrange: "bg-[#FF8A2B] text-white hover:bg-[#E67216] shadow-xs",
                brandDark: "bg-[#1F2937] text-white hover:bg-slate-800 shadow-xs",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-xl px-5 text-sm",
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
