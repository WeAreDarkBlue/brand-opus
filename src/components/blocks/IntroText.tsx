// Define or import the BlockIntroTextProps type
interface BlockIntroTextProps {
	data: {
		heading: string;
		subHeading: string;
		dark: boolean;
	};
}

const IntroText = ({ data }: BlockIntroTextProps) => {
	return (
		<div className="container mx-auto xl:max-w-[1320px] text-[42px] md:text-[68px] lg:text-[67px] leading-[51px] md:leading-[80px] lg:leading-[1.2] py-5 md:py-10">
			<p
				className={`font-heading font-light ${data.dark ? "text-black" : "text-white"}`}
			>
				{data.heading}
			</p>
			<p
				className={`font-heading font-light leading-[1.1] ${data.dark ? "text-black/40" : "text-white/40"}`}
			>
				{data.subHeading}
			</p>
		</div>
	);
};

export default IntroText;
