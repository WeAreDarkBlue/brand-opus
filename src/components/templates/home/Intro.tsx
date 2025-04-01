"use client";

import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import RichText from "@/components/common/RichText/RichText";
import SlideReveal from "@/components/common/SlideReveal";

interface IntroProps {
	description?: any[];
	title?: string;
}

export default function Intro(props: IntroProps) {
	const { title, description } = props || {};

	return (
		<div className={"relative w-full overflow-hidden lg:pt-20 lg:pb-14"}>
			<Container className="relative">
				<Grid>
					<div className="relative lg:mt-0 flex flex-col items-start justify-center py-6 md:py-10 col-span-4 md:col-span-24 lg:col-start-2 lg:col-span-14 xl:col-start-4">
						{/* Title */}
						{title && (
							<SlideReveal>
								<div className="text-3xl leading-[44px] font-medium tracking-tight md:text-5xl mb-12">
									{title}
								</div>
							</SlideReveal>
						)}
						{/* Description */}
						{description && (
							<SlideReveal>
								<div className="mt-4 font-serif text-xl !leading-[24px] md:text-2xl max-w-[600px]">
									<RichText content={description} />
								</div>
							</SlideReveal>
						)}
					</div>
				</Grid>
			</Container>
		</div>
	);
}
