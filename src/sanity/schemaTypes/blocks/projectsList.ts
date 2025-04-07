import { ProjectsIcon } from "@sanity/icons";
import { defineField, defineArrayMember, defineType } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Projects list",
	name: "projectsList",
	type: "object",
	icon: ProjectsIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			name: "enabled",
			type: "boolean",
			initialValue: true,
			hidden: true,
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
		prepare() {
			return {
				title: "Projects List",
			};
		},
	},
});
