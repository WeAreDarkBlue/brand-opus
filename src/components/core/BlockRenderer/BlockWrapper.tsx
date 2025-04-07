import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import type { BlockOptions } from "@/types";

interface BlockWrapperProps {
	data: {
		_type: string;
		_key: string;
		blockOptions: BlockOptions;
		themeColor?: string;
		blockFullWidth?: boolean;
	};
	children?: React.ReactNode[] | React.ReactNode;
}

const BlockWrapper = ({ data, children }: BlockWrapperProps) => {
	const { blockOptions, _type, _key, blockFullWidth } = data;
	const { anchorLink, paddingTop, paddingBottom } = blockOptions || {};

	return (
		<section
			data-type={_type}
			className={cn(
				`content-block content-block-${_type} data-[type=fullWidthAsset]:py-2`,
				paddingTop,
				paddingBottom,
				blockFullWidth && "relative",
			)}
			id={anchorLink || `block-${_key}`}
		>
			<Container
				noPadding={blockFullWidth || _type === "fullWidthAsset" || false}
			>
				{children}
			</Container>
		</section>
	);
};

export default BlockWrapper;
