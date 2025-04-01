import { MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { slugifyFunc } from "@/sanity/lib/utils";
import fieldGroups from "@/sanity/schemaTypes/groups/pageGroups";

export default defineType({
	icon: MasterDetailIcon,
	type: "document",
	// i18n: false,
	name: "page",
	title: "Pages",
	...fieldGroups,
	initialValue: {
		__i18n_lang: "en",
	},
	fields: [
		defineField({
			group: "page",
			name: "title",
			type: "string",
			title: "Title",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			group: "page",
			title: "Slug",
			name: "slug",
			type: "slug",
			validation: (rule) => rule.required(),
			options: {
				source: "title",
				maxLength: 100,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
				slugify: slugifyFunc(),
			},
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
		}),
		defineField({
			group: "options",
			name: "navTheme",
			title: "Nav Theme Override",
			type: "navTheme",
		}),
	],
});
