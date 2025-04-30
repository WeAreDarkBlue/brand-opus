"use client";

import Author from "@/components/common/Author";
import Loading from "@/components/common/Loading";
import RenderImage from "@/components/common/RenderImage";
import { ImageVideoAsset } from '@/types'
import gsap from "gsap";
import { useRef, useState } from "react";
import Link from 'next/link'
import { default as ImageVideoAssetComponent } from '@/components/common/ImageVideoAsset'


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


  const heroEl = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null);

  const onVideoReady = () => {
    setShowLoader(false)
    gsap.fromTo(heroEl.current, { ['--intro-progress']: 0 }, { ['--intro-progress']: 1, duration: 1.5, ease: 'power4.out' })
  }

	return (
    <div
      ref={heroEl}
      className={`hero relative w-full aspect-video max-h-screen bg-black overflow-hidden origin-top flex flex-col justify-center items-center text-center [--intro-progress:0]`}
    >
        <>
          {showLoader && <Loading />}
          <Link href="/work" passHref>
            <div 
              ref={backgroundRef}
              style={{ opacity: data?.selected === 'video' ? 'var(--intro-progress)':'1', cursor: 'none' }} 
              className="inset-0 absolute"
            >
              <ImageVideoAssetComponent
                autoPlay
                loop
                fill
                playsinline
                asset={heroData}
                onVideoReady={onVideoReady}
                className="inset-0 absolute aspect-video z-0"
              />
            </div>
          </Link>
        </>
    </div>
	);
}

export default PageHero;
