
// Define or import the BlockIntroTextProps type
interface BlockIntroTextProps {
  data: {
		heading: string;
		subHeading: string;
  };
}

const IntroText = ({ data }: BlockIntroTextProps) => {
	return (
			<div className="container mx-auto xl:max-w-[1320px] text-[42px] md:text-[68px] lg:text-[90px] leading-[51px] md:leading-[80px] lg:leading-[104px] py-5 md:py-10">
				<p className="text-white font-heading font-light">{data.heading}</p>
				<p className=" text-white/[0.4] font-heading font-light">{data.subHeading}</p>
			</div>
	);
};

export default IntroText;
