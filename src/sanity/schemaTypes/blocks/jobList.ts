import { ProjectsIcon } from "@sanity/icons";
import { defineField, defineArrayMember, defineType } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Jobs list",
	name: "jobList",
	type: "object",
	icon: ProjectsIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			title: "Eyebrow",
			name: "eyebrow",
			type: "text",
			rows: 1,
		}),
		defineField({
			group: "block",
			title: "Heading",
			name: "heading",
			type: "text",
		}),
		defineField({
			title: "Jobs",
			name: "jobs",
			type: "array",
			of: [
				{
					name: "job",
					type: "reference",
					to: [{ type: "jobs" }],
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
		prepare() {
			return {
				title: "Projects List",
			};
		},
	},
});
