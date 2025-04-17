import { EditIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Content With Asset",
	name: "contentWithAsset",
	type: "object",
	icon: EditIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			name: "title",
			type: "string",
			title: "Title",
		}),
    defineField({
			group: "block",
			name: "asset",
			type: "imageVideoAsset",
		}),
		defineField({
			group: "block",
			title: "Sections",
			name: "sections",
			type: "array",
      of: [
        {
          type: 'object',
          fields: [
						{
							title: "Title",
							name: "title",
							type: "string",
						},
						{
							title: "Content",
							name: "richTextContent",
							type: "richText",
						},
          ],
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
