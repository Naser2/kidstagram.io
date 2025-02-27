import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:"bg-[rgb(var(--ig-primary-button))] text-white dark:text-[rgb(var(--ig-primary-text))] ",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-secondary/80",
        secondary:
          " dark:text-[rgb(var(--ig-primary-text))]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hover_highlight:"hover:!bg-secondary/80",
        profile_header_btns:"profile_header_btns",
        post_follow_btn:"bg-transparent !min-w-[6rem] bg-background follow-text group-hover:bg-foreground group-hover:text-background !rounded-full  hover:!bg-[rgb(var(--ig-primary-button))] hover:!text-white like_follow_transition",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "max-[600px]:w-[9rem] h-9 rounded-md px-3",
        xs: "h-7 py-[1.2rem] rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
