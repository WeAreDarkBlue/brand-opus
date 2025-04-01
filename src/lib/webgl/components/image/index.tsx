import { useRect } from "hamo";
import { useDeviceDetection } from "hooks/use-device-detection";
import dynamic from "next/dynamic";
import { useState } from "react";

import RenderImage from "@/components/common/RenderImage";

import { WebGLTunnel } from "../tunnel";

const WebGLImage = dynamic(
	() => import("./webgl").then(({ WebGLImage }) => WebGLImage),
	{
		ssr: false,
	},
);

export function Image({ className, ...props }) {
	const [src, setSrc] = useState();
	const [setRectRef, rect] = useRect();

	const { isWebGL } = useDeviceDetection();

	return (
		<>
			<WebGLTunnel>
				<WebGLImage rect={rect} src={src} />
			</WebGLTunnel>
			<div
				className={className}
				style={{
					opacity: src && isWebGL ? 0 : 1,
					position: "relative",
				}}
				ref={setRectRef}
			>
				<RenderImage {...props} image={src} fill />
			</div>
		</>
	);
}
