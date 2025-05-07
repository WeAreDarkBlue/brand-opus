import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function FloatingToggle({
	handleToggle,
}: { handleToggle: (state: boolean) => void }) {
	const [open, setOpen] = useState(false);
	const topBarRef = useRef<HTMLSpanElement>(null);
	const bottomBarRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!topBarRef.current || !bottomBarRef.current) return;

		const tl = gsap.timeline({
			defaults: { duration: 0.5, ease: "power2.inOut" },
		});

		if (open) {
			tl.to(topBarRef.current, {
				rotation: 45,
				y: 0,
				backgroundColor: "#000",
			}).to(
				bottomBarRef.current,
				{
					rotation: -45,
					y: 0,
					backgroundColor: "#000",
				},
				"<",
			);
		} else {
			tl.to(topBarRef.current, {
				rotation: 0,
				y: -6,
				backgroundColor: "#fff",
			}).to(
				bottomBarRef.current,
				{
					rotation: 0,
					y: 6,
					backgroundColor: "#fff",
				},
				"<",
			);
		}
	}, [open]);

	const handleClick = () => {
		const newState = !open;
		setOpen(newState);
		handleToggle(newState);
	};

	// Using portal to render the toggle button outside of the normal DOM hierarchy
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	const toggleButton = (
		<button
			type="button"
			onClick={handleClick}
			className="fixed top-[12px] right-5 z-[9999] w-10 h-10 flex items-center justify-center pointer-events-auto lg:hidden"
			style={{
				zIndex: 9999,
				position: "fixed",
				isolation: "isolate",
			}}
		>
			<div className="relative w-8 h-8">
				<span
					ref={topBarRef}
					className="absolute top-1/2 left-0 w-8 h-[3px] bg-white origin-center -translate-y-[6px]"
				/>
				<span
					ref={bottomBarRef}
					className="absolute top-1/2 left-0 w-8 h-[3px] bg-white origin-center translate-y-[6px]"
				/>
			</div>
		</button>
	);

	return mounted && typeof document !== "undefined"
		? createPortal(toggleButton, document.body)
		: null;
}
