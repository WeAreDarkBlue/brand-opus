import { EditIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Image Carousel",
	name: "imageCarousel",
	type: "object",
	icon: EditIcon,
	...blockGroups,
	fields: [
		defineField({
			title: "Projects",
			name: "projects",
			type: "array",
			of: [
				{
					name: "category",
					type: "reference",
					to: [{ type: "project" }],
					options: {
						disableNew: false,
					},
				},
			],
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
