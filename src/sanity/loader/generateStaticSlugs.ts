import "server-only";

import { groq } from "next-sanity";

import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { slugifyFuncWeb } from "../lib/utils";

// Used in `generateStaticParams`
export async function generateStaticSlugs(type: string) {
	// Not using loadQuery as it's optimized for fetching in the RSC lifecycle
	const slugs = await client
		.withConfig({
			token,
			perspective: "published",
			useCdn: false,
			stega: false,
		})
		.fetch<{ slug: string }[]>(
			groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
			{ type },
			{
				next: {
					tags: [type],
				},
			},
		);

	return slugs.map((slug) => {
		const slugArray = [slug.slug];
		if (type === "project" && process.env.NEXT_PUBLIC_PROJECTS_ROOT) {
			slugArray.unshift(process.env.NEXT_PUBLIC_PROJECTS_ROOT);
		}
		if (type === "newsPost" && process.env.NEXT_PUBLIC_NEWS_ROOT) {
			slugArray.unshift(process.env.NEXT_PUBLIC_NEWS_ROOT);
		}
		if (type === "office" && process.env.NEXT_PUBLIC_OFFICES_ROOT) {
			slugArray.unshift(process.env.NEXT_PUBLIC_OFFICES_ROOT);
		}
		return slugArray;
	});
}
