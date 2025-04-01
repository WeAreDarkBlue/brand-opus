'use client'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Container from '@/components/common/Container'
import { default as ImageVideoAssetComponent } from '@/components/common/ImageVideoAsset'
import Loading from '@/components/common/Loading'
import ScrambleText from '@/components/common/ScrambleText'
import SlideReveal from '@/components/common/SlideReveal'
import { ImageVideoAsset } from '@/types'

interface HeroProps {
  data: {
    title?: string
    background?: ImageVideoAsset
  }
}
const Hero = ({ data }: HeroProps) => {
  const { title, background } = data || {}
  const scramble = useRef<typeof ScrambleText>(null)
  const heroEl = useRef<HTMLDivElement>(null)
  const isVideoBackground = background?.selected === 'video'
  const [showLoader, setShowLoader] = useState<boolean>(isVideoBackground)

  const onVideoReady = () => {
    setShowLoader(false)
    gsap.fromTo(heroEl.current, { ['--intro-progress']: 0 }, { ['--intro-progress']: 1, duration: 1.5, ease: 'power4.out' })
    if (scramble.current) {
      scramble.current.replay()
    }
  }

  return (
    <div
      ref={heroEl}
      className={`hero relative w-full h-screen min-h-[600px] bg-black overflow-hidden origin-top flex flex-col justify-center items-center text-center [--intro-progress:0]`}
    >
      {background && (
        <>
          { showLoader && <Loading /> }
          <div style={{ opacity: 'var(--intro-progress)' }} className="inset-0 absolute">
            <Image alt="" src="/video-mask.svg" fill={true} className="inset-0 absolute z-0 animate-fade-in pointer-events-none object-cover"/>
            <ImageVideoAssetComponent
              autoPlay
              loop
              fill
              playsinline
              asset={background}
              onVideoReady={onVideoReady}
              className="inset-0 absolute size-full z-0 pointer-events-none opacity-50"
            />
          </div>
        </>
      )}

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Container className="overflow-hidden">
          {title && (
            <SlideReveal>
              <h1 className="text-4xl-m md:text-6xl text-center tracking-tight font-semibold max-w-[1060px] mx-auto pb-2" style={{
                transform: 'translateY(calc(200px - var(--intro-progress, 0) * 200px))',
                opacity: 'var(--intro-progress, 0)'
              }}>
                {title}
              </h1>
            </SlideReveal>
          )}
        </Container>
      </div>
    </div>
  )
}

export default Hero
