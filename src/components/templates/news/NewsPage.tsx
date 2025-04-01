import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

import PageHero from "@/components/common/PageHero";
import RichText from "@/components/common/RichText/RichText";
import ThemeSetter from "@/components/core/ThemeSetter";
import type { NewsPayload } from "@/types";
import { stegaClean } from "@sanity/client/stega";

export interface NewsPageProps {
	data: NewsPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
	country: string;
}

export function NewsPage({
	data,
	encodeDataAttribute,
	country,
}: NewsPageProps) {
	let { hero, content, themeColor, navTheme, related } = data ?? {};
	themeColor = stegaClean(themeColor);
	navTheme = stegaClean(navTheme);

	return (
		<>
			<ThemeSetter theme={themeColor} navTheme={navTheme} />

			<div
				className={`${themeColor === "dark" ? "theme-dark" : "theme-light"} bg-theme-bg text-theme-text`}
			>
				<div className="space-y-6">
					{hero && (
						<div className="inset-0 h-screen-dvh z-[1]">
							<PageHero data={data} isNews />
						</div>
					)}
				</div>

				{content && (
					<div
						className={`${themeColor === "dark" ? "theme-dark" : "theme-light"} bg-theme-bg  pt-[72px] lg:pt-[120px] relative z-[2]`}
					>
						<div className="block-container px-5 lg:px-6">
							<div className="col-span-full lg:col-span-13 lg:col-start-10">
								<RichText content={content} className="rich-text-article" />
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default NewsPage;
