import { EditIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Basic Content",
	name: "basicContent",
	type: "object",
	icon: EditIcon,
	...blockGroups,
	fields: [
		defineField({
			title: "Content",
			name: "richTextContent",
			type: "richText",
			group: "block",
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
