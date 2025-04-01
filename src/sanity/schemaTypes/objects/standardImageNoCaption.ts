import { defineField } from "sanity";

export default defineField({
	name: "standardImageNoCaption",
	type: "image",
	title: "Image",
	options: {
		hotspot: true,
		collapsible: false,
	},
	fields: [
		defineField({
			name: "alt",
			type: "string",
			title: "Alternative text",
			validation: (Rule) =>
				Rule.error(
					"Alternative text must be provided to meet EAA accessibility requirements.",
				).required(),
		}),
	],
	preview: {
		select: {
			imageUrl: "asset.url",
			alt: "alt",
			filename: "asset.originalFilename",
		},
		prepare({ imageUrl, filename, alt }) {
			return {
				imageUrl: imageUrl,
				title: alt || filename,
			};
		},
	},
});
