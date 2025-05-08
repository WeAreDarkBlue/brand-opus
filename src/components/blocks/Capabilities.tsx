"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Capabilities as CapabilitiesProps } from "../../../sanity.types";
import RichText from "../common/RichText/RichText";

export default function Capabilities({ data }: { data: CapabilitiesProps }) {
	const [expanded, setExpanded] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [contentHeight, setContentHeight] = useState("80px");

	useEffect(() => {
		if (contentRef.current) {
			const scrollHeight = contentRef.current.scrollHeight;
			setContentHeight(expanded ? `${scrollHeight}px` : "100px");
		}
	}, [expanded]);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<div className="max-w-[1320px] mx-auto p-8">
			<div className="flex flex-col lg:flex-row lg:gap-32">
				<div className="lg:w-[640px]">
					<div
						ref={contentRef}
						className={`relative overflow-hidden transition-[height] duration-300 ease-in-out ${!expanded && "after:w-full before:absolute before:h-[50px] before:bottom-0 before:inset-x-0 before:bg-gradient-to-t before:from-white before:via-white/80 before:to-transparent before:z-20"}`}
						style={{ height: contentHeight }}
					>
						<RichText content={data.content} />
					</div>
					<button
						onClick={toggleExpand}
						type="button"
						className="mt-4 border border-secondary px-6 py-2 rounded-full flex items-center hover:bg-secondary hover:text-white cursor transition-colors"
					>
						{expanded ? "See less" : "See more"}
					</button>
				</div>

				<div className="shrink-0">
					<p className="mb-1 font-body font-medium">Capabilities</p>
					<div className="flex flex-col items-baseline gap-3">
						{data.list?.map((capability, index) => (
							<div
								key={capability}
								className="bg-[#efefef] py-[0.8rem] px-[0.9rem] text-[0.75rem] rounded-full text-black"
							>
								{capability}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
