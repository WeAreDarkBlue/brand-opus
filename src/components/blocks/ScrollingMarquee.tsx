"use client";
import React, { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

interface BlockScrollingMarqueeProps {
	data: {
		Items: string[];
	};
}

const ScrollingMarquee = ({ data }: BlockScrollingMarqueeProps) => {
	const splideRef = useRef(null);

	useEffect(() => {
		if (splideRef.current) {
			const splide = new Splide(splideRef.current, {
				type: "loop",
				drag: "free",
				perPage: 2,
				pagination: false,
				arrows: false,
				autoWidth: true,
				autoScroll: {
					speed: 1,
					pauseOnHover: true,
				},
			}).mount({ AutoScroll });

			return () => {
				splide.destroy();
			};
		}
	}, []);

	return (
		<div className="splide bg-white pt-8 md:pt-16 pb-10" ref={splideRef}>
			<div className="splide__track">
				<ul className="splide__list">
					{data.Items.map((item, i) => (
						<li
							key={i}
							className="splide__slide text-black flex flex-row items-center"
						>
							<h3 className="font-body font-semibold">{item}</h3>
							<svg height="28" width="28" className="mx-16">
								<circle cx="14" cy="14" r="14" fill="#FF530F" />
							</svg>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ScrollingMarquee;
