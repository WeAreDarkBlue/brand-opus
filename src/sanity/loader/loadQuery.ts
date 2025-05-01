import "server-only";

import * as queryStore from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { draftMode } from "next/headers";

import { client } from "@/sanity/lib/client";
import {
	careerBySlugQuery,
	footerQuery,
	homePageQuery,
	newsBySlugQuery,
	officeBySlugQuery,
	pagesBySlugQuery,
	projectBySlugQuery,
	settingsQuery,
} from "@/sanity/lib/queries";
import { token } from "@/sanity/lib/token";
import type {
	FooterPayload,
	HomePagePayload,
	NewsPayload,
	OfficePayload,
	PagePayload,
	ProjectPayload,
	SettingsPayload,
} from "@/types";

import { isNumeric } from "@/lib/utils";
import axios from "axios";
import { getTypeFromSlugs } from "../lib/utils";
import type {
	CareerBySlugQueryResult,
	PagesBySlugQueryResult,
} from "../../../sanity.types";

const serverClient = client.withConfig({
	token,
	// Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
	stega: false, //process.env.VERCEL_ENV === 'preview',
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = (async (query, params = {}, options = {}) => {
	const { isEnabled } = await draftMode();
	const { perspective = isEnabled ? "previewDrafts" : "published" } = options;
	// Don't cache by default
	let revalidate: NextFetchRequestConfig["revalidate"] = 0;
	// If `next.tags` is set, and we're not using the CDN, then it's safe to cache
	if (!usingCdn && Array.isArray(options.next?.tags)) {
		revalidate = false;
	} else if (usingCdn) {
		revalidate = 60;
	}
	return queryStore.loadQuery(query, params, {
		...options,
		next: {
			revalidate,
			...(options.next || {}),
		},
		perspective,
	});
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
	return loadQuery<SettingsPayload>(
		settingsQuery,
		{},
		{
			next: { tags: ["settings", "home", "page", "project", "news", "office"] },
		},
	);
}
export function loadFooter() {
	return loadQuery<FooterPayload>(
		footerQuery,
		{},
		{
			next: { tags: ["settings", "home", "page", "project", "news", "office"] },
		},
	);
}

export function loadHomePage() {
	return loadQuery<HomePagePayload | null>(
		homePageQuery,
		{},
		{ next: { tags: ["home", "project"] } },
	);
}

export function loadProject(slug: string) {
	return loadQuery<ProjectPayload | null>(
		projectBySlugQuery,
		{ slug },
		{ next: { tags: [`project:${slug}`] } },
	);
}

export function loadNews(slug: string) {
	return loadQuery<NewsPayload | null>(
		newsBySlugQuery,
		{ slug },
		{ next: { tags: [`news:${slug}`] } },
	);
}

export function loadOffice(slug: string) {
	return loadQuery<OfficePayload | null>(
		officeBySlugQuery,
		{ slug },
		{ next: { tags: [`office:${slug}`] } },
	);
}

export function loadPage(slug: string) {
	return loadQuery<PagesBySlugQueryResult | null>(
		pagesBySlugQuery,
		{ slug },
		{ next: { tags: [`page:${slug}`] } },
	);
}

export function loadCareer(slug: string) {
	return loadQuery<CareerBySlugQueryResult | null>(
		careerBySlugQuery,
		{ slug },
		{ next: { tags: [`career:${slug}`] } },
	);
}

// export async function loadCareer(slug: string) {
// 	const isTeamTailor = isNumeric(slug);
// 	const apiUrl = isTeamTailor
// 		? "/api/jobs/teamtailor/single"
// 		: "/api/jobs/jobvite/single";

// 	try {
// 		const { data } = await axios.post(
// 			`${process.env.NEXT_PUBLIC_BASE_URL}${apiUrl}`,
// 			{
// 				job_id: slug,
// 			},
// 		);

// 		return data;
// 	} catch (error) {
// 		return null;
// 	}
// }

export function loadDocument(
	slugs: string[],
): Promise<QueryResponseInitial<
	| HomePagePayload
	| PagePayload
	| ProjectPayload
	| NewsPayload
	| OfficePayload
	| CareerBySlugQueryResult
	| null
>> | null {
	const type = getTypeFromSlugs(slugs);

	switch (type) {
		case "home":
			return loadHomePage();
		case "page":
			return loadPage(slugs[0]);
		case "project":
			return loadProject(slugs[1]);
		case "newsPost":
			return loadNews(slugs[1]);
		case "office":
			return loadOffice(slugs[1]);
		case "careers":
			return loadCareer(slugs[1]);
		default:
			return null;
	}
}
