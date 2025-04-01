import React from "react";

import * as AllBlocks from "@/components/blocks";
import * as NewsBlocks from "@/components/blocks/news-blocks";
import { capitalizeFirstLetter } from "@/lib/frontend-utils";
import type { BlockData } from "@/types";

import BlockWrapper from "./BlockWrapper";

interface BlockRendererProps {
	blocks: BlockData[];
	subset?: string;
	country?: string;
}

const BlockRenderer = ({
	blocks,
	subset = "",
	country,
}: BlockRendererProps) => {
	const blockLibrary =
		subset === "caseStudy" || subset === "news" ? NewsBlocks : AllBlocks;
	const renderedBlocks: JSX.Element[] = [];

	if (blocks) {
		blocks.forEach((block, blockIndex) => {
			const blockName = capitalizeFirstLetter(block._type);

			// Check if block is a component and if so, render a
			// BlockWrapper with the component inside.
			if (typeof blockLibrary[blockName] !== "undefined") {
				const blockComponent = blockLibrary[blockName];
				const innerBlock = React.createElement(blockComponent, {
					data: block,
					blockIndex,
					country,
				});

				const blockWrapperProps = {
					key: block._key,
					data: block,
				};

				const renderedBlock = React.createElement(
					BlockWrapper,
					blockWrapperProps,
					innerBlock,
				);
				renderedBlocks.push(renderedBlock);
			}
		});
	}

	return renderedBlocks;
};

export default BlockRenderer;
