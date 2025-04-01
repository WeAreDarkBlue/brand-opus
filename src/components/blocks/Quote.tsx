import { urlForImage } from "@/sanity/lib/utils";
import type { BlockDataQuote } from "@/types";
import Image from "next/image";

function Quote({ data }: { data: BlockDataQuote }) {
	const { quote, author, spotColor } = data || {};

	return (
		<section className="block-container">
			<div className="col-span-full lg:col-span-13 lg:col-start-10">
				<div className="mb-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="58"
						viewBox="0 0 72 58"
						fill="none"
					>
						<title>Quote</title>
						<path
							d="M32.5316 41.4979C32.5316 46.3515 31.0166 50.3152 27.9867 53.3891C24.9568 56.463 21.0498 58 16.2658 58C11.4817 58 7.57475 56.463 4.54485 53.3891C1.51495 50.3152 0 46.2706 0 41.2552V25.7239C0 17.4728 2.07309 11.1632 6.21927 6.79498C10.5249 2.26499 16.7442 0 24.8771 0H29.6611V12.1339H24.6379C20.8106 12.1339 18.0199 13.0237 16.2658 14.8033C14.5116 16.583 13.6346 19.4142 13.6346 23.2971V25.7239H16.505C21.1296 25.7239 24.9568 27.2608 27.9867 30.3347C31.0166 33.2469 32.5316 36.9679 32.5316 41.4979ZM72 41.4979C72 46.3515 70.4053 50.3152 67.216 53.3891C64.1861 56.463 60.2791 58 55.495 58C50.8704 58 46.9635 56.463 43.7741 53.3891C40.7442 50.1534 39.2292 46.1088 39.2292 41.2552V25.7239C39.2292 17.4728 41.3821 11.1632 45.6877 6.79498C49.9934 2.26499 56.2126 0 64.3455 0H69.1296V12.1339H63.8671C60.0399 12.1339 57.2492 13.1046 55.495 15.046C53.7409 16.8257 52.8638 19.576 52.8638 23.2971V25.7239H55.9734C60.598 25.7239 64.4252 27.2608 67.4551 30.3347C70.485 33.2469 72 36.9679 72 41.4979Z"
							fill={spotColor || "#202224"}
						/>
					</svg>
				</div>
				{quote && (
					<blockquote>
						<p className="text-xl leading-8 lg:text-2xl">{quote}</p>
						{author && (
							<div className="mt-8 lg:mt-16 flex gap-x-5 lg:gap-x-4 items-center">
								{author.picture && (
									<div className="relative w-[108px] h-[108px]">
										<Image
											src={urlForImage(author.picture)?.url() || ""}
											alt={author.picture.alt || ""}
											className="absolute inset-0 size-full object-cover"
											width={108}
											height={108}
										/>
									</div>
								)}
								<div className="flex flex-col gap-y-2">
									{author.name && (
										<p className="text-sm-m leading-none uppercase font-semibold !mb-0">
											{author.name}
										</p>
									)}
									{author.role && (
										<p className="text-xs leading-none uppercase font-semibold !mb-0">
											{author.role}
										</p>
									)}
									{author.company && (
										<p className="text-xs opacity-50 leading-none uppercase font-semibold !mb-0">
											{author.company}
										</p>
									)}
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
