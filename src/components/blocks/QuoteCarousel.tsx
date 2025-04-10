"use client";
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';  // Import default styles
import { author } from '@/sanity/schemaTypes/documents';


// Define the BlockQuoteCarouselProps type
interface BlockQuoteCarouselProps {
	data: {
		textAlignment: string;
		blockOptions: {
			width: string;
		};
		richTextContent: string;
		quotes: {
			quote: string;
			name: string;
			job: string;
			company: string;
		}[];
	};
}

const QuoteCarousel = ({ data }: BlockQuoteCarouselProps) => {
	return (
		<div className="bg-white text-black pt-16 md:pt-32 pb-16 md:pb-64 rounded-b-3xl">
      <Splide options={{
        type       : 'loop',
        perPage    : 1,
        gap        : '1rem',
        pagination: true,
        arrows    : false,
				autoplay: true,
      }}
			className={`max-w-[850px] w-full mx-auto px-6 lg:px-0`}>
				{data.quotes.map((quote, index) => (
					<SplideSlide key={index}>
						<div>
							<p className='text-[25px] md:text-[35px] leading-[30px] md:leading-[42px] font-bold mb-6'>"{quote.quote}"</p>
							<p className="font-bold text-[22px] opacity-50">{quote.name}, {quote.job}</p>
							<p className="font-bold text-[22px] opacity-50">{quote.company}</p>
						</div>
					</SplideSlide>
				))}
      </Splide>
    </div>
  );
}

export default QuoteCarousel;
