"use client";

import { stegaClean } from "@sanity/client/stega";
import { type Ref, forwardRef } from "react";

import RenderImage from "@/components/common/RenderImage";
import VideoPlayer from "@/components/common/VideoPlayer";
import { cn } from "@/lib/utils";
import type { ImageVideoAsset as ImageVideoAssetType } from "@/types";
import ImageVideoAssetOverlay from "./ImageVideoAssetOverlay";

interface ImageVideoAssetProps {
	showPlayButton?: boolean;
	blur?: number;
	bg?: string;
	className?: string;
	sizes?: string;
	imageClasses?: string;
	debug?: boolean;
	autoPlay?: boolean;
	spotColor?: string;
	hidePlayButton?: boolean;
	playsinline?: boolean;
	aspectRatio?: `${number}/${number}`;
	loop?: boolean;
	priority?: boolean;
	controls?: boolean;
	fill?: boolean;
	forceAssetType?: ImageVideoAssetType["selected"];
	onVideoReady?: () => void;
	asset: ImageVideoAssetType;
	videoFill?: boolean;
}

const ImageVideoAsset = (
	data: ImageVideoAssetProps,
	ref: Ref<HTMLDivElement> | undefined,
) => {
	const {
		asset,
		showPlayButton = false,
		bg = "rgba(255,255,255,0)",
		className = "",
		imageClasses = "",
		sizes = "(max-width: 480px) 768px, (max-width: 1024px) 1280px, 1500px",
		blur = 0,
		autoPlay = false,
		loop = false,
		fill = false,
		controls = false,
		hidePlayButton = false,
		priority = false,
		playsinline = false,
		spotColor,
		onVideoReady,
		aspectRatio,
		forceAssetType = null,
		debug,
		videoFill = true,
	} = data || {};
	let {
		selected,
		videoDesktop,
		videoDesktopOverlay,
		videoMobileOverlay,
		videoMobile,
		imageDesktop,
		imageMobile,
	} = asset || {};
	selected = stegaClean(selected);
	if (forceAssetType) selected = stegaClean(forceAssetType);

	const hasMinimumVideoFields = videoDesktop || videoMobile;

	const imageFillClasses = fill ? "h-full object-cover" : "h-auto";

	debug && console.log("ImageVideoAsset asset", asset);

	return (
		<div
			ref={ref}
			className={cn("overflow-hidden", fill && "size-fill", className)}
			style={{ backgroundColor: bg }}
		>
			{blur > 0 && (
				<div
					className="absolute inset-0 pointer-events-none z-20"
					style={{ backdropFilter: `blur(${blur}px)` }}
				/>
			)}

			{/* IMAGE */}
			{selected === "image" && (imageDesktop?.asset || imageMobile?.asset) && (
				<div className={cn("z-10", imageFillClasses, imageClasses)}>
					{imageDesktop && (
						<RenderImage
							alt={(imageDesktop?.alt as string) || ""}
							fill={fill}
							className={cn(
								"w-full",
								imageFillClasses,
								imageMobile?.asset ? "hidden lg:block" : "",
							)}
							image={imageDesktop}
							priority={priority}
							sizes={sizes}
						/>
					)}
					{imageMobile?.asset && (
						<RenderImage
							alt={(imageMobile?.alt as string) || ""}
							fill={fill}
							image={imageMobile}
							priority={priority}
							className={cn("w-full, lg:hidden", imageFillClasses)}
							sizes={sizes}
						/>
					)}
				</div>
			)}

			{/* VIDEO */}
			{selected === "video" && hasMinimumVideoFields && (
				<>
					{videoDesktopOverlay && (
						<div
							className={`aspect-video z-10 ${videoMobileOverlay ? "hidden lg:block" : ""}`}
						>
							<ImageVideoAssetOverlay
								videoUrl={videoDesktopOverlay}
								spotColor={spotColor}
							/>
						</div>
					)}
					{videoMobileOverlay && (
						<div
							className={`absolute inset-0 size-full z-10 ${videoDesktopOverlay ? "lg:hidden" : ""}`}
						>
							<ImageVideoAssetOverlay
								videoUrl={videoMobileOverlay}
								spotColor={spotColor}
							/>
						</div>
					)}
					{videoDesktop && (
						<VideoPlayer
							autoPlay={autoPlay}
							loop={loop || !videoDesktopOverlay}
							fill={videoFill}
							controls={controls}
							muted={autoPlay}
							hidePlayButton={hidePlayButton}
							spotColor={spotColor}
							aspectRatio={aspectRatio}
							playsinline={true}
							video={videoDesktop}
							onReady={onVideoReady}
							debug={debug}
							className={`${videoMobile ? "hidden lg:block" : "no-mob"}`}
						/>
					)}
					{videoMobile && (
						<VideoPlayer
							autoPlay={autoPlay}
							muted={autoPlay}
							hidePlayButton={hidePlayButton}
							spotColor={spotColor}
							aspectRatio={aspectRatio}
							playsinline={true}
							fill={videoFill}
							controls={controls}
							loop={loop || !videoMobileOverlay}
							video={videoMobile}
							onReady={onVideoReady}
							debug={debug}
							className={"lg:hidden"}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default forwardRef(ImageVideoAsset);
