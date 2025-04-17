import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import fieldGroups from "@/sanity/schemaTypes/groups/pageGroups";

export default defineType({
	name: "hero",
	title: "Hero",
	type: "document",
	...fieldGroups,
	icon: HomeIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: "hero",
			group: "page",
			type: "object",
			fields: [
				defineField({
					name: "background",
					title: "Hero Background",
					type: "imageVideoAsset",
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				subtitle: "Hero",
				title,
			};
		},
	},
});
