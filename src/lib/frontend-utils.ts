import { cn } from "@/lib/utils";
import { groq } from "next-sanity";

const projectsSlug = process.env.NEXT_PUBLIC_PROJECTS_ROOT;
const careersSlug = process.env.NEXT_PUBLIC_CAREERS_ROOT;
const blogSlug = process.env.NEXT_PUBLIC_NEWS_ROOT;
const newsSlug = process.env.NEXT_PUBLIC_NEWS_ROOT;
const officeSlug = process.env.NEXT_PUBLIC_OFFICES_ROOT;

// Capitalize first letter in a string
export const capitalizeFirstLetter = (string: string) => {
	if (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return;
};

// Returns whether link begins with http (i.e. is external)
export const isLinkExternal = (link) => {
	return link.link?.startsWith("http");
};

export const getLinkHref = (link) => {
	const append = link?.appendLink ?? "";
	if (link.link) {
		return link.link + append;
	}
	if (link.page) {
		return getResourcePath(link.page) + append;
	}
	if (link._type) {
		return getResourcePath(link) + append;
	}
	return "#";
};

// Returns the path of a sanity internal resource
export const getResourcePath = (resource) => {
	const resourceSlug = resource?.slug?.current || resource?.slug;
	switch (resource?._type) {
		// PAGES
		case "page":
			return `/${resourceSlug}`;

		// POSTS
		case "post":
			return `/${blogSlug}/${resourceSlug}`;

		// PROJECTS
		case "project":
			return `/${projectsSlug}/${resourceSlug}`;

		// NEWS
		case "newsPost":
			return `/${newsSlug}/${resourceSlug}`;

		// OFFICES
		case "office":
			return `/${officeSlug}/${resourceSlug}`;

		// REFERENCE
		case "reference":
			throw new Error(
				"Link data not fully loaded. Check Sanity GROQ query for this link.",
			);

		// DEFAULT
		default:
			return "#";
	}
};

// Combines GROQ query chunks into a single query and removes superfluous whitespace
export const buildCompositeQuery = (queryChunks: Array<string>) => {
	const chunkString = queryChunks.reduce((acc, chunk) => {
		return `${acc}, ${chunk}`;
	});

	return groq`{${chunkString}}`.replaceAll("\n", "").replaceAll("  ", "");
};

// Simple classname joiner
// Edited to use the tailwind one 20241031
export const classNames = (...classes: string[]) => {
	return cn(classes);
};

export const isPromise = (promise) => {
	return !!promise && typeof promise.then === "function";
};

export const getBlockWidthClasses = (width: string) => {
	let classes = "col-span-4";
	switch (width) {
		case "sm":
			classes += " md:col-span-8 xl:col-span-4 md:col-start-3 lg:col-start-5";
			break;
		case "md":
			classes += " md:col-span-10 xl:col-span-6 md:col-start-2 xl:col-start-4";
			break;
		case "lg":
			classes +=
				" md:col-span-12 lg:col-span-10 xl:col-span-8 lg:col-start-2 xl:col-start-3";
			break;
		case "xl":
			classes += " md:col-span-12 lg:col-span-12 xl:col-span-10 xl:col-start-2";
			break;
		default:
			classes += " md:col-span-12";
	}
	return classes;
};
