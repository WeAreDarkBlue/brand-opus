"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Import ReactPlayer dynamically because it throws
// a hydration error when rendered on the server
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
	ssr: false,
	loading: () => <>loadyload</>,
});

interface VideoModalProps {
	children: React.ReactNode | React.ReactNode[];
	videoUrl: string;
	autoPlay?: boolean;
	controls?: boolean;
	loop?: boolean;
	muted?: boolean;
	fill?: boolean;
	active?: boolean;
	playsInline?: boolean;
	forceFullScreen?: boolean;
}

const VideoModal = (props: VideoModalProps) => {
	const {
		children,
		videoUrl,
		autoPlay = true,
		controls = true,
		loop = false,
		muted = false,
		fill = false,
		playsInline = false,
		active = true,
		forceFullScreen = false,
	} = props || {};

	const reactPlayerRef = useRef(null);

	// Calculate max width and height so the modal fits the video aspect ratio without exceeding the viewport
	const [modalWidth, setModalWidth] = useState(0);
	const [modalHeight, setModalHeight] = useState(0);

	if (!active) return children;

	const onModalPlayerReady = (player) => {
		const video = player.getInternalPlayer();
		const aspectRatio = video.element.offsetWidth / video.element.offsetHeight;
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const maxWidth = viewportWidth - 80; // 40px padding on each side
		const maxHeight = viewportHeight - 80; // 40px padding on each side
		const modalWidthLocal = Math.min(maxWidth, maxHeight * aspectRatio);
		const modalHeightLocal = modalWidthLocal / aspectRatio;
		setModalWidth(modalWidthLocal);
		setModalHeight(modalHeightLocal);
	};

	return (
		<Dialog>
			<DialogTrigger className="absolute inset-0 focus:border-2 border-purple-300">
				{children}
			</DialogTrigger>
			<DialogContent
				className="p-0 gap-0 z-[999]"
				style={{ width: modalWidth || "", height: modalHeight || "" }}
			>
				<DialogHeader className="p-0">
					<DialogTitle className="sr-only">Playing video</DialogTitle>
				</DialogHeader>
				<div className="aspect-video relative">
					<ReactPlayer
						ref={reactPlayerRef}
						url={videoUrl}
						controls={controls}
						loop={loop}
						muted={muted}
						playsinline={playsInline}
						playing={autoPlay}
						config={{
							vimeo: {
								playerOptions: {
									background: fill,
									responsive: true,
								},
							},
						}}
						width="100%"
						height="100%"
						onReady={onModalPlayerReady}
						className={cn(fill && "absolute inset-0 [&>video]:object-cover")}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default VideoModal;
