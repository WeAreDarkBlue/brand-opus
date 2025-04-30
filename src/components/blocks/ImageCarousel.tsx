"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import RenderImage from "../common/RenderImage";
import Link from "next/link";
import { gsap } from 'gsap';
import HoverCursor from '../common/HoverCursor';
import { da } from 'date-fns/locale';
import ImageVideoAssetComponent from '../common/ImageVideoAsset';

// Define the BlockImageCarouselProps type
interface BlockImageCarouselProps {
  data: {
  caseStudies: {
    title: string;
    hero: any[];
    slug: {
      current: string;
    };
  }[];
  };
}

const cursorRadius = 50;
const cursorDiameter = cursorRadius * 2;

const ImageCarousel = ({ data }: BlockImageCarouselProps) => {
  const splideRef = useRef<{ splide: { on: Function; off: Function; index: number } } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const splide = splideRef.current?.splide;
    if (!splide) return;

    const onMove = (_: unknown, newIndex: number) => setActiveIndex(newIndex);

    splide.on('moved', onMove);
    setActiveIndex(splide.index); // initial
    return () => {
      splide.off('moved', onMove);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent, index) => {
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
    }
    if (cursorRef.current) {
      const x = e.clientX - cursorDiameter / 2;
      const y = e.clientY - cursorDiameter / 2;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, index) => {
    console.log(index)
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
    }
    if (cursorRef.current) {
      const x = e.clientX - cursorDiameter / 2;
      const y = e.clientY - cursorDiameter / 2;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
      cursorRef.current.style.display = 'flex';

      // Animations and cursor effects
      gsap.fromTo(
        cursorRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setHoveredIndex(null);
    if (cursorRef.current) {
      const x = e.clientX - cursorDiameter / 2;
      const y = e.clientY - cursorDiameter / 2;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;

      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (cursorRef.current) {
            cursorRef.current.style.display = 'none';
          }
        },
      });
    }
  };

  return (
    <>
      <HoverCursor cursorDiameter={cursorDiameter} text={'View Project'} ref={cursorRef} />
      <Splide
        ref={splideRef}
        options={{
          type: 'loop',
          perPage: 1.5,
          focus: 'center',
          gap: '3rem',
          width: '100vw',
          minHeight: '640px',
          padding: '10vw',
          pagination: false,
          arrows: false,
          breakpoints: {
            768: {
              gap: '1rem',
              perPage: 1.25,
            },
          },
        }}
        style={{ width: '100vw', height: 'auto' }}
      >
        {data.caseStudies.map((project, i) => {
          return (
            <SplideSlide key={i}>
              <Link href={`/work/${project.slug.current}`}>
                <div
                  onMouseEnter={(e) => handleMouseEnter(e, i)}
                  onMouseLeave={(e) => handleMouseLeave(e)} // if you want to keep updating
                  onMouseMove={(e) => handleMouseMove(e, i)} // if you want to keep updating
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    fontSize: '8vw',
                    fontWeight: 'bold',
                  }}
                >
                  <RenderImage
                    width={1320}
                    height={715}
                    image={project.hero?.imageDesktop}
                    alt={project.title}
                    fill={true}
                  />
                  <ImageVideoAssetComponent
                    autoPlay
                    loop
                    fill
                    playsinline
                    asset={project.previewVideo}
                    className={`inset-0 absolute aspect-video z-0 transition-opacity duration-300 ${
                      hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
};

export default ImageCarousel;
