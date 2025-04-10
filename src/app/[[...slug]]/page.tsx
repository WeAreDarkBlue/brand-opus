import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import HomePage from "@/components/templates/home/HomePage";
import NewsPage from "@/components/templates/news/NewsPage";
import { Page } from "@/components/templates/page/Page";
import ProjectPage from "@/components/templates/project/ProjectPage";
import { studioUrl } from "@/sanity/lib/api";
import { getTypeFromSlugs, urlForOpenGraphImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import {
	loadDocument,
	loadHomePage,
	loadNews,
	loadPage,
	loadProject,
} from "@/sanity/loader/loadQuery";

const PagePreview = dynamic(
	() => import("@/components/templates/page/PagePreview"),
);
const HomePagePreview = dynamic(
	() => import("@/components/templates/home/HomePagePreview"),
);
const ProjectPreview = dynamic(
	() => import("@/components/templates/project/ProjectPreview"),
);
const NewsPreview = dynamic(
	() => import("@/components/templates/news/NewsPreview"),
);

type Props = {
	params: { slug: string[] };
	searchParams: { country: string };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const doc = await loadDocument(params.slug);

	if (doc && "apply_url" in doc) {
		return {
			title: doc.title,
			description: doc.body,
			openGraph: {
				images: [
					{
						url: doc.apply_url,
						alt: doc.title,
					},
				],
			},
		};
	}

	// Office has city instead of title
	const fallbackMetaTitle =
		doc?.data && "city" in doc.data && !("title" in doc)
			? doc.data.city
			: doc?.data && "title" in doc.data
				? doc?.data?.title
				: null;

	const ogImage = doc?.data
		? urlForOpenGraphImage(doc.data.seo?.ogImage)
		: undefined;

	const ogImages = (await parent).openGraph?.images || [];
	if (ogImage) {
		ogImages.unshift(ogImage);
	}

	return {
		title: doc?.data?.seo?.title || fallbackMetaTitle,
		description: doc?.data?.seo?.description || (await parent).description,
		openGraph: {
			images: ogImages,
		},
	};
}

export async function generateStaticParams() {
	const slugs = await Promise.all([
		generateStaticSlugs("page"),
		generateStaticSlugs("project"),
		generateStaticSlugs("newsPost"),
	]);

	return slugs
		.flat()
		.filter(Boolean)
		.map((s) => ({
			slug: Array.isArray(s) ? s : [s], // Ensure it's always an array
		}));
}

export default async function DocumentRoute({ params, searchParams }: Props) {
	const type = getTypeFromSlugs(params.slug);

	const { country } = (await searchParams) || {};

	let initial;
	const { isEnabled } = await draftMode();
	switch (type) {
		case "home":
			initial = await loadHomePage();

			return isEnabled ? (
				initial ? (
					<HomePagePreview initial={initial} />
				) : (
					homeNotFound()
				)
			) : initial?.data ? (
				<HomePage data={initial.data} country={country} />
			) : (
				notFound()
			);
		case "page":
			initial = await loadPage(params.slug[0]);
			return isEnabled ? (
				<PagePreview params={{ slug: params.slug[0] }} initial={initial} />
			) : initial?.data ? (
				<Page data={initial.data} country={country} />
			) : (
				notFound()
			);
		case "project":
			initial = await loadProject(params.slug[1]);
			return isEnabled ? (
				<ProjectPreview params={{ slug: params.slug[1] }} initial={initial} />
			) : initial?.data ? (
				<ProjectPage data={initial.data} country={country} />
			) : (
				notFound()
			);
		case "newsPost":
			initial = await loadNews(params.slug[1]);
			return isEnabled ? (
				<NewsPreview params={{ slug: params.slug[1] }} initial={initial} />
			) : initial?.data ? (
				<NewsPage data={initial.data} country={country} />
			) : (
				notFound()
			);

		// Add any new resource types here e.g.
		// case 'yourResourceType':
		//   const initial = await loadYourResourceType()
		//   return (isEnabled)
		//     ? <YourResourceTypePreview params={} initial={initial} />
		//     : (initial?.data)
		//       ? <YourResourceTypePage data={initial.data} />
		//       : notFound()

		default:
			return notFound();
	}
}

function homeNotFound() {
	return (
		<div className="text-center">
			You don&rsquo;t have a homepage yet,{" "}
			<Link href={`${studioUrl}/structure/home`} className="underline">
				create one now
			</Link>
			!
		</div>
	);
}
