'use client'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { ImageVideoAsset } from '@/types' // Adjust the path to where ImageVideoAsset is defined
import Link from 'next/link'

import { default as ImageVideoAssetComponent } from '@/components/common/ImageVideoAsset'
import Loading from '@/components/common/Loading'

// Define the HeroProps type
interface HeroProps {
  data: {
    hero : {
      background?: {
        selected?: string;
        [key: string]: any;
      };
    };
  };
}

const Hero = ({ data }: HeroProps) => {
  const { hero } = data
  const { background } = hero || {}
  const heroEl = useRef<HTMLDivElement>(null)
  const isVideoBackground = background?.selected === 'video'
  const [showLoader, setShowLoader] = useState<boolean>(isVideoBackground)
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
      {background && (
        <>
          {showLoader && <Loading />}
          <Link href="/work" passHref>
            <div 
              ref={backgroundRef}
              style={{ opacity: 'var(--intro-progress)', cursor: 'none' }} 
              className="inset-0 absolute"
            >
              <ImageVideoAssetComponent
                autoPlay
                loop
                fill
                playsinline
                asset={isVideoBackground || background?.selected === 'image' ? (background as ImageVideoAsset) : null!}
                onVideoReady={onVideoReady}
                className="inset-0 absolute aspect-video z-0"
              />
            </div>
          </Link>
        </>
      )}
    </div>
  )
}

export default Hero