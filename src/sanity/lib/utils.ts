import { getFile, tryGetExtension } from "@sanity/asset-utils";
import type { SanityFileSource } from "@sanity/asset-utils/dist/types";
import createImageUrlBuilder from "@sanity/image-url";
import type { CurrentUser, Image } from "sanity";

import { dataset, projectId } from "@/sanity/lib/api";
import { client } from "./client";

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || "",
	dataset: dataset || "",
});

export const urlForImage = (source: Image | undefined, isSVG = false) => {
	// Ensure that source image contains a valid reference
	if (!source?.asset?._ref) {
		return undefined;
	}

	// @ts-ignore
	const extension = tryGetExtension(source);

	if (extension === "svg") {
		return imageBuilder?.image(source);
	}

	return imageBuilder?.image(source).format("webp").fit("max");
};

export function urlForOpenGraphImage(image: Image | undefined) {
	return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

export function resolveHref(
	documentType?: string,
	slug?: string,
): string | undefined {
	switch (documentType) {
		case "home":
			return "/";
		case "page":
			return slug ? `/${slug}` : undefined;
		case "project":
			return slug
				? `/${process.env.NEXT_PUBLIC_PROJECTS_ROOT}/${slug}`
				: undefined;
		case "jobs":
			return slug
				? `/${process.env.NEXT_PUBLIC_CAREERS_ROOT}/${slug}`
				: undefined;
		case "newsPost":
			return slug ? `/${process.env.NEXT_PUBLIC_NEWS_ROOT}/${slug}` : undefined;
		case "office":
			return slug
				? `/${process.env.NEXT_PUBLIC_OFFICES_ROOT}/${slug}`
				: undefined;
		default:
			console.warn("Invalid document type:", documentType);
			return undefined;
	}
}

export const getFileInfo = (src: SanityFileSource) =>
	getFile(src, { dataset, projectId });

export async function getFileDetails(documentId) {
	const query = `*[_id == $id][0]{...,}`;
	const params = { id: documentId };

	const result = await client.fetch(query, params);

	return result;
}

export function getTypeFromSlugs(slugs: string[] | undefined): string {
	if (typeof slugs === "undefined" || slugs?.length < 1) {
		return "home";
	} else if (slugs?.length === 1) {
		return "page";
	} else if (
		slugs?.length === 2 &&
		slugs[0] === process.env.NEXT_PUBLIC_PROJECTS_ROOT
	) {
		return "project";
	} else if (
		slugs?.length === 2 &&
		slugs[0] === process.env.NEXT_PUBLIC_NEWS_ROOT
	) {
		return "newsPost";
	} else if (
		slugs?.length === 2 &&
		slugs[0] === process.env.NEXT_PUBLIC_OFFICES_ROOT
	) {
		return "office";
	} else if (
		slugs?.length === 2 &&
		slugs[0] === process.env.NEXT_PUBLIC_CAREERS_ROOT
	) {
		return "careers";
	} else {
		return "unknown";
	}
}

// Dark Blue Admin Check
export const isDarkBlueAdmin = ({
	currentUser,
}: {
	currentUser: CurrentUser | null;
}) => {
	return currentUser
		? currentUser.email?.indexOf("@wearedarkblue.com") > -1
		: false;
};

// Nifty little rich text preview function
export const richTextPreview = (content) => {
	const block = (content || []).find((block) => block._type === "block");
	return block
		? block.children
				.filter((child) => child._type === "span")
				.map((span) => span.text)
				.join("")
		: "";
};

export const blockLocaleString = (localeArray) => {
	const allOptions = ["eu", "asia", "us", "mena"];
	if (localeArray.length === allOptions.length || localeArray.length === 0) {
		return ""; // Blank string, all locales are selected
	} else {
		return `${localeArray.join(", ").toUpperCase()}`;
	}
};

// Return a function for the slugify attribute of the slug field at a given length
export const slugifyFunc = (length = 100) => {
	return (input) =>
		input
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]+/g, "")
			.slice(0, length)
			.trim();
};

export const slugifyFuncWeb = (input, length = 100) => {
	return input
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.slice(0, length)
		.trim();
};
