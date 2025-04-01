"use client";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRect } from "hamo";
import { useEffect } from "react";

interface SlideRevealProps {
	children?: React.ReactNode;
	className?: string;
	isOpen?: boolean;
	delay?: number;
	duration?: number;
	start?: string;
	end?: string;
	scrub?: boolean;
	fill?: boolean;
	debug?: boolean;
}

const SlideReveal = (props: SlideRevealProps) => {
	const {
		children,
		className,
		delay = 0,
		duration = 0.8,
		start = "top bottom-=120",
		end = "+=100",
		scrub = false,
		fill = false,
		debug = false,
	} = props || {};
	const [setSlideRevealRect, slideRevealRect] = useRect();

	useEffect(() => {
		if (slideRevealRect.element) {
			const el = slideRevealRect.element.children[0];
			const animation = gsap.to(el, {
				y: "0%",
				opacity: 1,
				scrollTrigger: {
					trigger: el,
					start,
					end,
					scrub,
					markers: false,
					once: true,
				},
				duration,
				delay,
				ease: "power4.out",
			});

			return () => {
				animation.kill();
			};
		}
	}, [delay, duration, slideRevealRect, start, end, scrub, debug]);

	const fillClasses = fill ? "absolute inset-0 size-full" : "";

	return (
		<div
			ref={setSlideRevealRect}
			className={cn("overflow-hidden", fillClasses, className)}
		>
			<div className={cn("opacity-0 size-full translate-y-10", fillClasses)}>
				{children}
			</div>
		</div>
	);
};

export default SlideReveal;
