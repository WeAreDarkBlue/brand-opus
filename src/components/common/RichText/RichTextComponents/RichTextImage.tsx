import RenderImage, {
	type RenderImageProps,
} from "@/components/common/RenderImage";
import RichTextLite from "@/components/common/RichText/RichTextLite";

export interface ImageProps {
	value: RenderImageProps;
}

const RichTextImage = ({ value }) => {
	return (
		<div className="my-16 lg:my-[120px] overflow-hidden">
			<RenderImage
				alt={value.alt}
				image={value}
				sizes="(max-width: 800px) 100vw, 800px"
				className="w-full"
			/>

			{value.imageCaption && (
				<RichTextLite
					content={value.imageCaption}
					className="text-sm text-theme-light mt-2"
				/>
			)}
		</div>
	);
};

export default RichTextImage;
