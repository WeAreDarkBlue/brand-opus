import { stegaClean } from "@sanity/client/stega";

import Grid from "@/components/common/Grid";
import RichText from "@/components/common/RichText/RichText";
import { classNames, getBlockWidthClasses } from "@/lib/frontend-utils";
import type { BlockDataBasicContent } from "@/types";

interface BlockBasicContentProps {
	data: BlockDataBasicContent;
}

const BasicContent = ({ data }: BlockBasicContentProps) => {
	const { textAlignment, blockOptions, richTextContent } = data;
	const { width } = blockOptions;
	const textAlignClass = `text-${textAlignment}`;
	const widthClasses = width
		? getBlockWidthClasses(stegaClean(width))
		: "col-span-4 md:col-span-12";

	return (
		<Grid>
			<div className={classNames(widthClasses, textAlignClass)}>
				{richTextContent && <RichText content={richTextContent} />}
			</div>
		</Grid>
	);
};

export default BasicContent;
