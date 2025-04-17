'use client'
import { stegaClean } from "@sanity/client/stega";

import Grid from "@/components/common/Grid";
import RichText from "@/components/common/RichText/RichText";
import { classNames, getBlockWidthClasses } from "@/lib/frontend-utils";
import type { BlockDataBasicContent } from "@/types";
import RenderImage from "../common/RenderImage";
import { useEffect, useRef, useState } from 'react'
import { default as ImageVideoAssetComponent } from '@/components/common/ImageVideoAsset'
import Loading from '@/components/common/Loading'
import ImageVideoAsset from '../common/ImageVideoAsset'

interface Section {
  title: string;
  richTextContent?: any; // Replace 'any' with the appropriate type if known
}

interface ContentWithAssetProps {
  data: {
    hero?: {
      background?: {
        selected?: string;
      };
    };
    richTextContent?: any; // Replace 'any' with the appropriate type if known
    asset?: any; // Replace 'any' with the appropriate type if known
    title?: string;
    spotColor?: string;
    sections?: Section[];
  };
}

const ContentWithAsset = ({ data }: ContentWithAssetProps) => {
  console.log('ContentWithAsset', data)
	const { hero, asset, title, spotColor, sections} = data;
  const { background } = hero || {}
  const isVideoBackground = background?.selected === 'video'
  const [showLoader, setShowLoader] = useState<boolean>(isVideoBackground)

	return (
			<div className={'lg:container mx-auto xl:max-w-[1320px] py-24'}>
        <h3 className="text-lg md:text-[40px] text-[#767676] mb-4 md:mb-6">{title}</h3>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="text-white md:w-1/2">
            {sections?.map((section, index) => (
                <div
                key={index}
                className={classNames(
                  "section py-1",
                  index !== sections.length - 1 ? "border-b-2 border-white/[0.2]" : ""
                )}
                >
                  <h2 className="text-2xl xl:text-4xl 2xl:text-6xl mt-4 mb-2 md:mb-6">{section.title}</h2>
                  <div className="text-sm lg:text-md mb-6 lg:mb-8 mt-2 lg:mt-4 leading-[20px] lg:leading-[28px] md:pr-4">
                    {section.richTextContent && <RichText content={section.richTextContent} />}
                  </div>
                </div>
            ))}
          </div>
          <div className="w-full aspect-video md:w-1/2 relative">
            {showLoader && <Loading />}
            <ImageVideoAsset
              fill
              loop
              priority
              playsinline
              autoPlay
              asset={asset}
              spotColor={spotColor}
              className={`${asset.imageDesktop ? 'absolute inset-0':'absolute inset-0'}`}
            />
          </div>
        </div>
			</div>
	);
};

export default ContentWithAsset;
