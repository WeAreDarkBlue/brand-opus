import { ThListIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Capabilities",
	name: "capabilities",
	type: "object",
	icon: ThListIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			name: "content",
			type: "richText",
			validation: (rule) => rule.required(),
		}),
		defineField({
			group: "block",
			name: "list",
			type: "array",
			of: [
				defineField({
					name: "name",
					type: "string",
					validation: (rule) => rule.required(),
				}),
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
		prepare() {
			return {
				title: "Capabilities",
			};
		},
	},
});
