import { EditIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Scrolling Marquee",
	name: "scrollingMarquee",
	type: "object",
	icon: EditIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			title: "Items",
			name: "Items",
			type: "array",
			of: [
				{
					name: "item",
					type: "string",
				},
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
		},
	},
});
