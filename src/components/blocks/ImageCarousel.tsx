"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { classNames, getBlockWidthClasses } from "@/lib/frontend-utils";


// Define the BlockImageCarouselProps type
interface BlockImageCarouselProps {
  data: {
	slides: {
	  id: number;
	  label: string;
	  img: string;
	}[];
  };
}

const slides = [
  { id: 0, label: 'jello', img: './demo/jello-thumbnail.jpg' },
  { id: 1, label: 'jello', img: './demo/jello-thumbnail.jpg' },
  { id: 2, label: 'jello', img: './demo/jello-thumbnail.jpg' },
  { id: 3, label: 'jello', img: './demo/jello-thumbnail.jpg' },
];

const ImageCarousel = ({ data }: BlockImageCarouselProps) => {
  const splideRef = useRef<{ splide: { on: Function; off: Function; index: number } } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
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
      }}
      style={{ width: '100vw', height: 'auto' }}
    >
      {slides.map((slide, index) => {
        return (
          <SplideSlide key={slide.id}>
            <div
              style={{
                width: '100%',
								aspectRatio: '16 / 9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: slide.img ? `url(${slide.img})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                fontSize: '8vw',
                fontWeight: 'bold',
              }}
            >
              {!slide.img && slide.label}
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default ImageCarousel;
