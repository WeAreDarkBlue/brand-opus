import { PortableText } from "@portabletext/react";
import type { PortableTextBlock, PortableTextComponents } from "next-sanity";
import React from "react";

import { FullWidthAsset, Quote } from "@/components/blocks";
import SanityLink from "@/components/common/SanityLink";
import { cn } from "@/lib/utils";

import Eyebrow from "./RichTextComponents/Eyebrow";
import HtmlEmbed from "./RichTextComponents/HtmlEmbed";
import RichTextImage from "./RichTextComponents/RichTextImage";

const components: PortableTextComponents = {
	types: {
		html: HtmlEmbed,
		imageWithCaption: RichTextImage,
		fullWidthAsset: ({ value }) => (
			<div className="rich-text-block rich-text-block--large">
				<FullWidthAsset data={value} />
			</div>
		),
		quote: ({ value }) => (
			<div className="rich-text-block">
				<Quote data={value} />
			</div>
		),
	},
	block: {
		eyebrow: Eyebrow,
		large: ({ children }) => (
			<span className="text-lg lg:text-2xl font-semibold mb-6 lg:mb-12 block">
				{children}
			</span>
		),
	},
	marks: {
		link: ({ value = null, children }) => {
			if (!value) return children;
			const { button, link, href } = value;
			return (
				<SanityLink className={button ?? "button"} link={link || href}>
					{children}
				</SanityLink>
			);
		},
		richTextLink: ({ value = null, children }) => {
			if (!value) return children;
			const { button, link, href } = value;
			return (
				<SanityLink className={cn(button && "button")} link={link || href}>
					{children}
				</SanityLink>
			);
		},
		scrollToBottom: ({ children }) => {
			const handleClick = () => {
				window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
			};
		
			return (
				<button
					onClick={handleClick}
					style={{
						all: 'unset',
						cursor: 'pointer',
						color: 'inherit',
						textDecoration: 'underline',
					}}
				>
					{children}
				</button>
			);
		},
	},
};

const RichText = ({
	content,
	className = "",
}: {
	content: PortableTextBlock[];
	className?: string;
}) => {
	return (
		<div className={cn("rich-text", className)}>
			<PortableText value={content} components={components} />
		</div>
	);
};

export default RichText;
