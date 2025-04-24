import BlockRenderer from "@/components/core/BlockRenderer/BlockRenderer";
import ThemeSetter from "@/components/core/ThemeSetter";
import type { PagePayload } from "@/types";
import { stegaClean } from "@sanity/client/stega";
import type { PagesBySlugQueryResult } from "../../../../sanity.types";
import StaticLogo from "@/components/common/StaticLogo";

export interface PageProps {
	data: PagePayload | null;
	country: string;
}

export function Page({ data, country }: { data: PagesBySlugQueryResult }) {
	// Default to an empty object to allow previews on non-existent documents
	let { blocks, themeColor, navTheme } = data ?? {};
	themeColor = stegaClean(themeColor);
	navTheme = stegaClean(navTheme);

	return (
		<>
			<ThemeSetter theme={themeColor} navTheme={navTheme} />
			{/* static part of logo */}
			<StaticLogo fill={themeColor === "dark" ? "white" : "black"}/>

			<div
				className={`${themeColor === "dark" ? "bg-black" : "bg-white"} bg-theme-bg text-theme-text`}
			>
				{/* Blocks */}
				{blocks && <BlockRenderer blocks={blocks} country={country} />}
			</div>
		</>
	);
}

export default Page;
