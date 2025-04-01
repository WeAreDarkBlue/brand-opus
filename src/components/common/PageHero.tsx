"use client";

import Author from "@/components/common/Author";
import Loading from "@/components/common/Loading";
import RenderImage from "@/components/common/RenderImage";
import { format } from "date-fns";
import gsap from "gsap";
import { useRef, useState } from "react";
import ImageVideoAsset from "./ImageVideoAsset";

function PageHero({ data, isNews = false }) {
	const {
		hero: heroData,
		title,
		excerpt,
		spotColor,
		date,
		categories,
		tags,
		preview,
	} = data || {};

	const loader = useRef<HTMLDivElement>(null);
	const [showLoader, setShowLoader] = useState<boolean>(true);

	const onVideoReady = () => {
		gsap.to(loader.current, {
			opacity: 0,
			duration: 0.5,
			ease: "power4.out",
			onComplete: () => setShowLoader(false),
		});
	};

	return (
		<section className="relative w-full h-screen-dvh text-white mb-24 lg:mb-32 overflow-hidden pageHero">
			<div className="inset-0 size-full px-5 lg:px-10 py-10 lg:pb-[64px] z-30 relative lg:pt-0">
				<div
					className={`block-container h-full justify-between lg:justify-start pt-[136px] z-10 relative ${isNews ? "lg:content-between" : "lg:content-end"}`}
				>
					{isNews && (
						<>
							<div className="col-span-2 lg:col-span-9 font-semibold">
								{date && (
									<div>
										<p
											className="uppercase tracking-widest text-xs lg:text-sm !mb-0"
											style={{
												color: spotColor,
											}}
										>
											date_published
										</p>
										<span className="text-xs lg:text-sm mt-1 block">
											{format(date, "dd.LL.y")}
										</span>
									</div>
								)}
							</div>
							<div className="col-span-2 lg:col-span-14 font-semibold">
								{!!categories && (
									<div>
										<p
											className="uppercase tracking-widest text-xs lg:text-sm !mb-0"
											style={{
												color: spotColor,
											}}
										>
											Categories_
										</p>
										<ul className="mt-1 flex gap-x-1">
											{categories.map((cat, index) => (
												<li
													key={cat._id}
													className="underline text-sm lg:text-sm"
												>
													{cat.title}
													{index + 1 !== categories.length && ","}
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</>
					)}
					<div className="col-span-full lg:col-span-9 lg:flex lg:flex-col lg:justify-end">
						{isNews && data?.author ? (
							<div className="hidden lg:block">
								<Author data={data?.author} spotColor={data.spotColor} />
							</div>
						) : (
							!!tags && (
								<>
									<h2 className="mb-2 text-xs lg:text-sm uppercase text-white text-opacity-40 tracking-wide font-semibold">
										Capabilities_
									</h2>
									<ul className="ml-0 flex gap-x-1">
										{tags.map((tag, index) => (
											<li
												key={tag._id}
												className="text-sm lg:text-lg underline font-semibold"
											>
												{tag.title}
												{index + 1 !== tags.length && ","}
											</li>
										))}
									</ul>
								</>
							)
						)}
					</div>
					<div
						className={`col-span-full ${isNews ? "lg:col-span-14" : "lg:col-span-11"} self-end lg:self-start`}
					>
						<h1 className="text-3xl lg:text-4xl hero:text-6xl hero:-tracking-[1px] font-medium">
							{title}
						</h1>
						{excerpt && (
							<p className="lg:font-medium text-sm lg:text-xl mt-6 hero:mt-16 text-white text-opacity-70 leading-[20px] lg:leading-[36px]">
								{excerpt}
							</p>
						)}
					</div>
				</div>
			</div>
			<div>
				{showLoader && (
					<div
						className="absolute inset-0 flex items-center justify-center"
						ref={loader}
					>
						{preview?.previewImage && (
							<RenderImage
								image={preview.previewImage}
								alt={"image"}
								fill
								sizes="(max-width: 768px) 100vw, 800px"
								className="object-cover blur-xl"
							/>
						)}
						<div className="absolute inset-0 flex items-center justify-center">
							<Loading />
						</div>
					</div>
				)}
				<div className="inset-0 absolute">
					{isNews && (
						<div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-50" />
					)}
					<ImageVideoAsset
						autoPlay
						loop
						fill
						playsinline
						asset={heroData}
						onVideoReady={onVideoReady}
						className="inset-0 absolute size-full z-0 pointer-events-none"
					/>
				</div>
			</div>
		</section>
	);
}

export default PageHero;
