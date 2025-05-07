import * as React from "react";

import { cn } from "@/lib/utils";
import ArrowRight from "../common/ArrowRight";
import { ArrowRightIcon, ChevronRight } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	hasIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<div className="relative w-full">
				<input
					type={type}
					className={cn(
						"flex h-12 w-full bg-transparent py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-black text-[16px] font-medium border-b border-[#767676] focus:border-[#767676] focus:ring-0 focus-visible:ring-0",
						className,
					)}
					ref={ref}
					{...props}
				/>
				{props.hasIcon && (
					<div className="absolute right-0 top-1/2 -translate-y-1/2">
						<ChevronRight color="#767676" size={30} />
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
