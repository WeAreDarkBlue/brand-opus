"use client";
import { usePathname } from "next/navigation";

// Define or import the BlockIntroTextProps type
interface BlockIntroTextProps {
	data: {
		heading: string;
		subHeading: string;
		dark: boolean;
	};
}

const IntroText = ({ data }: BlockIntroTextProps) => {
	const pathname = usePathname();
	const isHomepage = pathname === "/";
	return (
		<div className="container mx-auto xl:max-w-[1320px] py-5 md:py-10 md:px-5">
			<h2
				className={`font-heading font-light ${isHomepage ? "text-[size:var(--introduction)]" : "h2"} leading-[1.2] ${data.dark ? "text-black" : "text-white"}`}
			>
				{data.heading}
			</h2>
			<h2
				className={`font-heading font-light ${isHomepage ? "text-[size:var(--introduction)]" : "h2"} leading-[1.2] ${data.dark ? "text-black/40" : "text-white/40"}`}
			>
				{data.subHeading}
			</h2>
		</div>
	);
};

export default IntroText;
