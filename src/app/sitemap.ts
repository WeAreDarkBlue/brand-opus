import type { MetadataRoute } from "next";

import {
	generateStaticJobviteSlugs,
	generateStaticSlugs,
	generateStaticTeamTailorSlugs,
} from "@/sanity/loader/generateStaticSlugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const domain = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const slugs = await Promise.all([
		generateStaticSlugs("page"),
		generateStaticSlugs("project"),
		generateStaticSlugs("newsPost"),
		generateStaticSlugs("office"),
		generateStaticTeamTailorSlugs(),
		generateStaticJobviteSlugs(),
	]);

	const routes = slugs.flatMap((slugGroup, i) =>
		slugGroup.map((s) => {
			const priorities = [0.8, 0.7, 0.7, 0.5, 0.4, 0.4]; // Match the number of slug groups above

			// Set individual page priorities here if necessary
			let priority = priorities[i];
			switch (s.join("/")) {
				case "model":
				case "studio":
				case "media":
				case "creative":
				case "accelerate":
					priority = 0.9;
					break;
				case "cookie-policy":
				case "privacy-policy":
				case "terms-conditions":
					priority = 0.4;
					break;
			}
			return {
				url: `${domain}/${s.join("/")}`,
				lastModified: new Date(),
				changeFrequency: "daily" as const,
				priority,
			};
		}),
	);

	return [
		{
			url: domain,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		...routes,
	];
}
