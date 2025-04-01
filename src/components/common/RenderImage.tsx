import { getImageDimensions } from "@sanity/asset-utils";
import { default as NextImage } from "next/image";
import type { Image as ImageType } from "sanity";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/utils";

export interface RenderImageProps {
	image: ImageType;
	alt: string;
	width?: number | "auto";
	height?: number | "auto";
	sizes: string;
	onLoad?: () => void;
	fill?: boolean;
	className?: string;
	priority?: boolean;
	"data-sanity"?: string;
}

export default function RenderImage({
	image,
	alt,
	width = "auto",
	height = "auto",
	fill = false,
	priority = false,
	sizes,
	className,
	...props
}: RenderImageProps) {
	const DIMENSION_LIMIT = 2800;

	if (!image) {
		return <Skeleton className="w-full h-20" />;
	}

	// Can ignore typescript here because sanity's image types are all messed up
	// @ts-ignore
	const imgOriginalSize = getImageDimensions(image);

	if (height === "auto") {
		height =
			typeof width === "string" && width === "auto"
				? imgOriginalSize.height
				: Math.round((width / imgOriginalSize.width) * imgOriginalSize.height);
	}

	if (width === "auto") {
		width =
			typeof height === "string" && height === "auto"
				? imgOriginalSize.width
				: Math.round((height / imgOriginalSize.height) * imgOriginalSize.width);
	}

	if (width > DIMENSION_LIMIT) {
		// scale down height to keep aspect ratio
		height = Math.round((height / width) * DIMENSION_LIMIT);
		width = DIMENSION_LIMIT;
	}

	if (height > DIMENSION_LIMIT) {
		// scale down width to keep aspect ratio
		width = Math.round((width / height) * DIMENSION_LIMIT);
		height = DIMENSION_LIMIT;
	}

	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();

	return (
		<div
			className={cn(
				`w-full overflow-hidden ${fill ? "h-full relative" : ""} ${className ?? ""}`,
			)}
			data-sanity={props["data-sanity"]}
		>
			{imageUrl && (
				<NextImage
					className={`w-full ${fill ? "object-cover h-full" : "object-contain"}`}
					alt={alt}
					width={width}
					height={height}
					priority={priority}
					sizes={sizes}
					src={imageUrl}
					placeholder={"empty"}
				/>
			)}
		</div>
	);
}
