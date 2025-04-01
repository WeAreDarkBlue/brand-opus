import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-xs text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-white/70 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
	{
		variants: {
			variant: {
				default: "bg-orange-300 text-black hover:bg-orange-100 uppercase",
				orange: "bg-orange-300 text-black hover:bg-orange-100 uppercase",
				destructive: "bg-red-300 text-black hover:bg-red-500 uppeercase",
				outline:
					"border border-orange-300 text-orange-300 bg-transparent shadow-sm hover:bg-orange-300 hover:text-black-light uppercase",
				white: "bg-white text-black-light hover:bg-grey-100",
				purple: "bg-purple-300 hover:bg-purple-100 text-black uppercase",
				pink: "bg-pink-300 hover:bg-pink-100 text-black uppercase",
				teal: "bg-teal-500 hover:bg-teal-300 text-black uppercase",
				link: "underline-offset-4 hover:underline",
				pinkAlt: "bg-pink-300 hover:bg-purple-300 text-black",
				orangeGradient: "bg-orange-to-red",
				tealGradient: "bg-teal-to-blue",
			},
			size: {
				default: "px-6 py-3",
				sm: "py-2 px-5 text-xs",
				md: "px-6 py-3",
				lg: "px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
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
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
