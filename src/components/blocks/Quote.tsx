import { urlForImage } from "@/sanity/lib/utils";
import type { BlockDataQuote } from "@/types";
import Image from "next/image";
import type { Quote as QuoteProps } from "../../../sanity.types";

function Quote({ data }: { data: QuoteProps }) {
	const { quote, author, spotColor } = data || {};

	return (
		<section className="block-container">
			<div className="max-w-[900px] mx-auto px-5">
				{quote && (
					<blockquote className="text-center">
						<p className="text-[27px] leading-[1.2] font-semibold">{quote}</p>
						{author && (
							<div className="mt-[45px] lg:mt-[28px] text-center">
								<div className="flex flex-row justify-center">
									<p className="font-semibold whitespace-break-spaces opacity-50">
										{author.name && <span>{author.name}</span>}
										{author.name && <span>, {author.role}</span>}
									</p>
								</div>
							</div>
						)}
					</blockquote>
				)}
			</div>
		</section>
	);
}

export default Quote;
