// import '@/styles/index.css'

import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { toPlainText } from "next-sanity";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Footer } from "@/components/core/Footer";
import { GSAP } from "@/components/core/Gsap";
import Header from "@/components/core/Header";
import { Lenis } from "@/components/core/Lenis";
import { RealViewport } from "@/components/core/RealViewport";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";

const LiveVisualEditing = dynamic(
	() => import("@/sanity/loader/LiveVisualEditing"),
);

export async function generateMetadata(
	{ params }: { params: { slug: string[] } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { data: homePage } = await loadHomePage();

	const ogImage = urlForOpenGraphImage(homePage?.seo?.ogImage);

	const ogImages = (await parent).openGraph?.images || [];
	if (ogImage) {
		ogImages.unshift(ogImage);
	}
	const meta = {
		title: homePage?.title || "Home",
		description: homePage?.seo?.description
			? homePage?.seo?.description
			: homePage?.intro
				? toPlainText(homePage.intro)
				: "",
		openGraph: {
			images: ogImages,
		},
	};

	return meta;
}

export const viewport: Viewport = {
	themeColor: "#000",
};

export default async function IndexRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const lenis = {
		lerp: 0.125,
	};

	const { isEnabled } = await draftMode();

	return (
		<>
			<RealViewport />
			{lenis && <Lenis root options={lenis} />}
			<Header />
			<div className="flex min-h-screen flex-col">
				<main className="flex-grow">{children}</main>
			</div>
			<Suspense>
				<Footer />
			</Suspense>
			{isEnabled && <LiveVisualEditing />}
			<GSAP scrollTrigger />
		</>
	);
}
