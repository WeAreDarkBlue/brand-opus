import { useMediaQuery } from "hamo";

export function useDeviceDetection() {
	const breakpoint = 768;

	const isMobile = useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
	const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`);
	const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
	const isWebGL = isDesktop && !isReducedMotion;
	// TODO: const isLowPowerMode

	return { isMobile, isDesktop, isReducedMotion, isWebGL };
}
