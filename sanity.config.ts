"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import SanityLogo from "@/SanityLogo";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import { allSingletons } from "@/sanity/schemaTypes";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
	icon: SanityLogo,
	basePath: studioUrl,
	title: "Brand Opus Content Studio",
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		structureTool({
			structure: pageStructure([...allSingletons]),
		}),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		singletonPlugin(allSingletons.map((singleton) => singleton.name)),
	],
});
