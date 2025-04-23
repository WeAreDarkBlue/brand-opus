'use client'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { ImageVideoAsset } from '@/types' // Adjust the path to where ImageVideoAsset is defined
import Link from 'next/link'

import { default as ImageVideoAssetComponent } from '@/components/common/ImageVideoAsset'
import Loading from '@/components/common/Loading'
import Cursor from '@/components/common/HoverCursor'

// Define the HeroProps type
interface HeroProps {
  data: {
    background?: {
      selected?: string;
      [key: string]: any;
    };
  };
}

const Hero = ({ data }: HeroProps) => {
  const { background } = data || {}
  const heroEl = useRef<HTMLDivElement>(null)
  const isVideoBackground = background?.selected === 'video'
  const [showLoader, setShowLoader] = useState<boolean>(isVideoBackground)
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const onVideoReady = () => {
    setShowLoader(false)
    gsap.fromTo(heroEl.current, { ['--intro-progress']: 0 }, { ['--intro-progress']: 1, duration: 1.5, ease: 'power4.out' })
    
    // Initialize cursor on video ready
    initializeCursor();
  }

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRadius = 50;
  const cursorDiameter = cursorRadius * 2;
  
  // Initialize cursor in the center of the container
  const initializeCursor = () => {
    if (cursorRef.current && backgroundRef.current) {
      const rect = backgroundRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Position cursor in the center
      cursorRef.current.style.left = `${centerX - cursorRadius}px`;
      cursorRef.current.style.top = `${centerY - cursorRadius}px`;
      cursorRef.current.style.display = 'flex';

      // Animate scale from 0 to 1
      gsap.fromTo(cursorRef.current, { scale: 0 }, { scale: 1, duration: 0.8, ease: 'power2.out' });
    }
  };

  // Initialize cursor on mount
  useEffect(() => {
    if (!isVideoBackground && backgroundRef.current && isDesktop) {
      initializeCursor();
    }
    // For video backgrounds, initialization happens in onVideoReady
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cursorRef.current) {
      const x = e.clientX - cursorRadius;
      const y = e.clientY - cursorRadius;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (cursorRef.current) {
      const x = e.clientX - cursorRadius;
      const y = e.clientY - cursorRadius;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
      cursorRef.current.style.display = 'flex';

      gsap.fromTo(cursorRef.current, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (cursorRef.current) {
      const x = e.clientX - cursorRadius;
      const y = e.clientY - cursorRadius;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;

      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (cursorRef.current && isDesktop) {
            cursorRef.current.style.display = 'none';
          }
        },
      });
    }
  };



  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <ImageVideoAssetComponent
                autoPlay
                loop
                fill
                playsinline
                asset={isVideoBackground || background?.selected === 'image' ? (background as ImageVideoAsset) : null!}
                onVideoReady={onVideoReady}
                className="inset-0 absolute aspect-video z-0 pointer-events-none"
              />
            </div>
          </Link>
          {isDesktop && (
            <Cursor cursorDiameter={cursorDiameter} ref={cursorRef} text="View work" />
          )}
        </>
      )}
    </div>
  )
}

export default Hero