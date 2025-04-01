import LogoSVG from "@/lib/icons/logo.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
	variant?: "primary" | "secondary";
	width?: number | "full";
	fill?: string;
	className?: string;
}

const Logo = ({
	variant = "primary",
	fill = "white",
	className,
}: LogoProps) => {
	const vectorClasses = cn("h-auto", className);
	return (
		<LogoSVG
			className={vectorClasses}
			width="321"
			height="320"
			viewBox="0 0 321 320"
			style={{ fill }}
		/>
	);
};

export default Logo;
