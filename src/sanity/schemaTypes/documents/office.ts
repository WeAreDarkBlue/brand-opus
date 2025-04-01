import { EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { slugifyFunc } from "@/sanity/lib/utils";
import fieldGroups from "@/sanity/schemaTypes/groups/pageGroups";

export default defineType({
	name: "office",
	title: "Offices",
	type: "document",
	...fieldGroups,
	icon: EarthGlobeIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			group: "page",
			name: "city",
			title: "City",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			group: "page",
			name: "region",
			title: "Region",
			type: "string",
			options: {
				list: [
					{ title: "EMEA", value: "EMEA" },
					{ title: "APAC", value: "APAC" },
					{ title: "Americas", value: "Americas" },
				],
			},
			validation: (rule) => rule.required(),
			initialValue: "EMEA",
		}),
		defineField({
			group: "page",
			title: "Slug",
			name: "slug",
			type: "slug",
			validation: (rule) => rule.required(),
			options: {
				source: "city",
				maxLength: 100,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
				slugify: slugifyFunc(),
			},
		}),
		defineField({
			group: "page",
			name: "contacts",
			type: "array",
			of: [
				{
					name: "contact",
					type: "contact",
				},
			],
		}),
		defineField({
			group: "page",
			name: "address",
			type: "richTextLite",
		}),
		defineField({
			group: "blocks",
			name: "blocks",
			type: "blockContent",
		}),
		defineField({
			group: "seo",
			name: "seo",
			type: "seo",
			title: "Page meta",
		}),
		defineField({
			group: "options",
			name: "themeColor",
			title: "Theme",
			type: "themeColor",
			hidden: true,
			readOnly: true,
		}),
	],
});
