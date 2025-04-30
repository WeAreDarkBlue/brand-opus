"use client";

import { PlayIcon } from "@sanity/icons";
import gsap from "gsap";
import { useRect } from "hamo";
import dynamic from "next/dynamic";
import { Fragment, forwardRef, useCallback, useEffect, useRef } from "react";
import type ReactPlayer from "react-player";
import type { File } from "sanity";

import VideoModal from "@/components/common/VideoModal";
import { cn } from "@/lib/utils";
import { getFileInfo } from "@/sanity/lib/utils";

interface VideoPlayerProps {
	video: File | string;
	className?: string;
	autoPlay?: boolean;
	controls?: boolean;
	loop?: boolean;
	muted?: boolean;
	fill?: boolean;
	spotColor?: string;
	hidePlayButton?: boolean;
	aspectRatio?: `${number}/${number}`;
	playsinline?: boolean;
	onReady?: () => void;
	debug?: boolean;
}

// Import ReactPlayer dynamically because it throws
// a hydration error when rendered on the server
const ReactPlayerElement = dynamic(() => import("react-player/lazy"), {
	ssr: false,
	loading: () => <></>,
});

const VideoPlayer = (props: VideoPlayerProps, ref) => {
	const reactPlayerRef = useRef<ReactPlayer>();
	const [setVideoRef, videoRect] = useRect({
		debounce: 100,
		callback: (rect) => {
			setVideoSizeProps(rect);
		},
	});

	const {
		video,
		className,
		autoPlay,
		controls,
		loop,
		muted,
		fill,
		spotColor,
		hidePlayButton = false,
		aspectRatio,
		playsinline,
		onReady,
		debug,
	} = props || {};

	const setVideoSizeProps = useCallback((container) => {
		const player = reactPlayerRef.current?.getInternalPlayer();
		if (!container || !player?.element) return;
		const trueAspectRatio = player.element.width / player.element.height;
		const videoAspectWidth = container.height * trueAspectRatio;
		const sizeByWidth = videoAspectWidth > container.width;

		if (sizeByWidth) {
			container.element?.style.setProperty(
				"--video-width",
				`${
					(((100 / trueAspectRatio) * container.height) / container.height) *
					100
				}px`,
			);
			container.element?.style.setProperty(
				"--video-height",
				`${container.height}px`,
			);
		} else {
			container.element?.style.setProperty(
				"--video-width",
				`${container.width}px`,
			);
			container.element?.style.setProperty(
				"--video-height",
				`${
					(((100 / trueAspectRatio) * container.width) / container.width) * 100
				}px`,
			);
		}
	}, []);

	let videoUrl = "";
	if (typeof video === "object" && video?.asset) {
		const videoFileInfo = getFileInfo(video.asset);
		videoUrl = videoFileInfo.asset.url;
	} else if (typeof video === "string") {
		videoUrl = video;
	}

	const fillClasses = fill ? "absolute inset-0 size-full" : "";
	const fillIframeClasses = fill
		? "absolute inset-0 [&>video]:object-cover [&>div>iframe]:absolute [&>div>iframe]:-translate-x-1/2 [&>div>iframe]:-translate-y-1/2 [&>div>iframe]:top-1/2 [&>div>iframe]:left-1/2 [&>div>iframe]:!w-[--video-width] [&>div>iframe]:!h-[--video-height]"
		: "";

	const onReadyLocal = useCallback(
		(e) => {
			onReady?.();
			gsap.to(videoRect.element, { opacity: 1, duration: 0.3, delay: 0.3 });

			setVideoSizeProps(videoRect);
		},
		[videoRect, onReady, setVideoSizeProps],
	);

	if (!video) return null;

	return (
		<div
			ref={setVideoRef}
			className={cn(
				"size-full overflow-hidden opacity-0",
				fillClasses,
				className,
			)}
		>
			{videoUrl && (
				<div
					className={cn(
						"relative group",
						fill && "object-cover size-full",
					)}
					style={{ aspectRatio: aspectRatio || "unset" }}
				>
					{!hidePlayButton && !playsinline && (
						<button
							className="absolute top-0 right-0 size-[48px] lg:size-[100px] rounded-md flex items-center justify-center mt-[18px] mr-4 lg:mt-[59px] lg:mr-[52px] z-40 group-hover:scale-110 transition-transform pointer-events-none bg-orange-300"
							tabIndex={-1}
							type="button"
							style={spotColor ? { backgroundColor: spotColor } : {}}
						>
							<PlayIcon className="text-[30px] lg:text-[60px]" />
						</button>
					)}
					<VideoModal active={!playsinline} videoUrl={videoUrl}>
						<ReactPlayerElement
							ref={reactPlayerRef}
							url={videoUrl}
							controls={controls}
							loop={loop}
							muted={muted}
							light={
								!autoPlay &&
								!playsinline &&
								!(typeof video === "object" && video?.asset)
							}
							playsinline={playsinline}
							playing={autoPlay && playsinline}
							config={{
								vimeo: {
									playerOptions: {
										background: fill,
										responsive: false,
									},
								},
							}}
							width="100%"
							height="100%"
							onReady={onReadyLocal}
							tabIndex={1}
							className={cn(
								!controls && "pointer-events-none",
								fillIframeClasses,
							)}
						/>
					</VideoModal>
				</div>
			)}
		</div>
	);
};

export default forwardRef(VideoPlayer);
