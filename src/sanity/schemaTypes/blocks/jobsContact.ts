import { EditIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Jobs Contact",
	name: "jobsContact",
	type: "object",
	icon: EditIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			title: "Looking for heading",
			name: "lookingForHeading",
			type: "text",
			rows: 1
		}),
		defineField({
			title: "Looking for content",
			name: "lookingForContent",
			type: "richText",
			group: "block",
		}),
		defineField({
			title: "Looking for content link",
			name: "lookingForContentLink",
			type: "text",
			group: "block",
			rows: 1
		}),
		defineField({
			title: "Looking for warning",
			name: "lookingForWarning",
			type: "richText",
			group: "block",
		}),
		defineField({
			title: "Looking for warning link",
			name: "lookingForWarningLink",
			type: "text",
			group: "block",
			rows: 1
		}),
		defineField({
			group: "block",
			title: "Starting out heading",
			name: "startingOutHeading",
			type: "text",
			rows: 1
		}),
		defineField({
			title: "Starting out content",
			name: "startingOutContent",
			type: "richText",
			group: "block",
		}),
		defineField({
			title: "Starting out link",
			name: "startingOutLink",
			type: "link",
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
