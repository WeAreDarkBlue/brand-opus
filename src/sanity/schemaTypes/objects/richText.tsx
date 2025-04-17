import { LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
	name: "richText",
	title: "Content",
	description:
		"Warning: using H1 in rich text has the potential to impact SEO ranking. Generally the largest heading used should be H2.",
	type: "array",
	of: [
		{
			type: "block",
			styles: [
				{ title: "Normal", value: "normal" },
				{
					title: "Large",
					value: "large",
					component: ({ children }) => (
						<span style={{ fontStyle: "bold", fontSize: 20 }}>{children}</span>
					),
				},
				{ title: "H1", value: "h1" },
				{ title: "H2", value: "h2" },
				{ title: "H3", value: "h3" },
				{ title: "H4", value: "h4" },
				{ title: "H5", value: "h5" },
				{ title: "H6", value: "h6" },
				{ title: "Quote", value: "blockquote" },
			],
			marks: {
				decorators: [
					{ title: "Strong", value: "strong" },
					{ title: "Emphasis", value: "em" },
					{ title: "Code", value: "code" },
					{ title: 'Scroll to Bottom', value: 'scrollToBottom' }, // Add this
				],
				annotations: [
					{
						name: "richTextLink",
						title: "Link",
						type: "link",
						icon: LinkIcon,
						options: {
							modal: { type: "dialog", width: 1 },
						},
					},
				],
			},
		},
		{
			name: "fullWidthAsset",
			type: "fullWidthAsset",
		},
		{
			name: "quote",
			type: "quote",
		},
		{
			name: "imageWithCaption",
			type: "standardImage",
		},
		{
			type: "object",
			name: "html",
			fields: [
				{
					name: "html",
					type: "text",
					rows: 5,
				},
			],
		},
	],
});
