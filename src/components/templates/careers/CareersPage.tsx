import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

import ThemeSetter from "@/components/core/ThemeSetter";
import StaticLogo from "@/components/common/StaticLogo";
import type { Jobs as JobsType } from "../../../../sanity.types";
import RichTextLite from "@/components/common/RichText/RichTextLite";

export interface CareersPageProps {
	data: JobsType | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
	country?: string;
}

export function CareersPage({
	data,
	encodeDataAttribute,
	country,
}: CareersPageProps) {
	return (
		<>
			<ThemeSetter theme="dark" navTheme="light" />
			{/* static part of logo */}
			<StaticLogo fill="white" />
			<div>
				<div className="space-y-6">
					<div className="bg-black bg-theme-bg text-theme-text min-h-screen pt-[220px]">
						<article className="max-w-[2000px] mx-auto px-5 lg:px-10">
							<header className="mb-[60px]">
								<h1 className="text-white text-8xl flex-col flex">
									<span className="text-4.5xl mb-4 text-grey-500">
										{data.location}
									</span>
									<span>{data.role}</span>
								</h1>
							</header>
							<div className="text-white">
								<section>
									{data.intro && (
										<RichTextLite
											className="rich-text text-3xl"
											content={data.intro}
										/>
									)}
								</section>

								<hr className="opacity-25 mt-[40px] pb-[40px]" />

								<section className="pb-6">
									<h2 className="text-3xl font-body font-semibold my-5">
										The role in a bit more detail:
									</h2>
									{data.moreDetail && (
										<RichTextLite
											className="rich-text text-md"
											content={data.moreDetail}
										/>
									)}
								</section>

								<section className="pb-6">
									<h2 className="text-3xl font-body font-semibold my-5">
										What we’re looking for:
									</h2>
									{data.lookingFor && (
										<RichTextLite
											className="rich-text text-md"
											content={data.lookingFor}
										/>
									)}
								</section>

								<section className="pb-6">
									<h2 className="text-3xl font-body font-semibold my-5">
										Why you should come and work with us:
									</h2>
									{data.workWithUs && (
										<RichTextLite
											className="rich-text text-md"
											content={data.workWithUs}
										/>
									)}
								</section>

								<section className="pb-6">
									<h2 className="text-3xl font-body font-semibold my-5">
										The nitty gritty
									</h2>
									{data.nittyGritty && (
										<RichTextLite
											className="rich-text text-md"
											content={data.nittyGritty}
										/>
									)}
								</section>

								{data.reportingTo && (
									<section className="mt-[60px]">
										<h3 className="font-body tracking-normal font-medium">
											Reporting to: {data.reportingTo}
										</h3>
									</section>
								)}

								<hr className="opacity-25 mt-[60px] pb-[40px]" />

								<section className="pb-[60px]">
									<p className="text-3xl font-semibold">
										To apply, send your CV / portfolio to{" "}
										<a
											href="mailto:careers@brandopus.com"
											className="underline hover:text-secondary"
										>
											careers@brandopus.com
										</a>
									</p>
								</section>
							</div>
						</article>
					</div>
				</div>
			</div>
		</>
	);
}

export default CareersPage;
