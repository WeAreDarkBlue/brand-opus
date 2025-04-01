import { BlockquoteIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Quote",
	name: "quote",
	type: "object",
	icon: BlockquoteIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			name: "quote",
			type: "text",
			rows: 3,
		}),
		defineField({
			group: "block",
			name: "author",
			type: "object",
			fields: [
				defineField({
					name: "name",
					type: "string",
				}),
				defineField({
					name: "role",
					type: "string",
				}),
				defineField({
					name: "company",
					type: "string",
				}),
				defineField({
					name: "image",
					type: "standardImage",
				}),
			],
		}),
		defineField({
			title: "Block Options",
			name: "blockOptions",
			type: "blockOptions",
			group: "options",
		}),
	],
	components: { preview: BlockPreview },
	preview: {
		select: {
			locale: "blockOptions.limitToLocale",
			author: "author",
		},
		prepare(selection) {
			const { author } = selection;

			return {
				title: `Quote`,
				subtitle: author?.name || "",
			};
		},
	},
});
