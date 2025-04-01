import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

import PageHero from "@/components/common/PageHero";
import BlockRenderer from "@/components/core/BlockRenderer/BlockRenderer";
import ThemeSetter from "@/components/core/ThemeSetter";
import type { ProjectPayload } from "@/types";

export interface ProjectPageProps {
	data: ProjectPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
	country: string;
}

export function ProjectPage({
	data,
	encodeDataAttribute,
	country,
}: ProjectPageProps) {
	// Default to an empty object to allow previews on non-existent documents
	let { blocks, themeColor, navTheme, hero, related } = data ?? {};
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
						<div className="fixed inset-0 h-screen-dvh z-[1]">
							<PageHero data={data} />
						</div>
					)}

					<div
						className={`${themeColor === "dark" ? "theme-dark" : "theme-light"} bg-theme-bg !mt-[100dvh] pt-8 lg:pt-15 relative z-[2]`}
					>
						{/* Blocks */}
						{blocks && <BlockRenderer blocks={blocks} country={country} />}
						{!!related && <RelatedProjects data={related} />}
					</div>
				</div>
			</div>
		</>
	);
}

export default ProjectPage;
