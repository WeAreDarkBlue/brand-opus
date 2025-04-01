import { PresentationIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Full Width Asset",
	name: "fullWidthAsset",
	type: "object",
	icon: PresentationIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			name: "asset",
			type: "imageVideoAsset",
		}),
		defineField({
			group: "block",
			name: "description",
			type: "text",
			rows: 2,
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
