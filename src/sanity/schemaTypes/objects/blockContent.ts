import { defineField } from "sanity";

import * as blocks from "../blocks";

export default defineField({
	name: "blockContent",
	type: "array",
	title: "Blocks",
	description: "Add, edit, and reorder content blocks",
	of: Object.values(blocks).map((block) => {
		return { type: block.name, ref: block.name };
	}),
	options: {
		modal: { type: "dialog", width: 3 },
		insertMenu: {
			views: [
				{
					name: "grid",
					previewImageUrl: (schemaTypeName) =>
						`/sanity/preview-${schemaTypeName}.png`,
				},
			],
		},
	},
});
