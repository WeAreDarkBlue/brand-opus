// Define or import the BlockTwoColumnListProps type
interface BlockTwoColumnListProps {
	data: {
		sectors: [sector: string];
	};
}

const TwoColumnList = ({ data }: BlockTwoColumnListProps) => {
	return (
		<div className="container mx-auto md:max-w-[960px] lg:max-w-[960px] xl:max-w-[1320px] text-white py-5 md:py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				{data.sectors?.map((sector: string, index: number) => (
					<h4
						key={index}
						className="border-t-2 font-heading font-light border-white/[0.2] pt-3 lg:pt-6 md:pb-0 lg:pb-[40px] tracking-[2px]"
					>
						{sector}
					</h4>
				))}
			</div>
		</div>
	);
};

export default TwoColumnList;
