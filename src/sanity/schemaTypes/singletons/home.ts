import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import fieldGroups from "@/sanity/schemaTypes/groups/pageGroups";
import createLocalisedField from "../../lib/createLocalisedField";

export default defineType({
	name: "home",
	title: "Home",
	type: "document",
	...fieldGroups,
	icon: HomeIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			group: "page",
			type: "string",
			validation: (rule) => rule.required(),
		}),
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
		defineField({
			name: "headline",
			title: "Intro Headline",
			group: "page",
			type: "string",
		}),
		defineField({
			name: "intro",
			title: "Intro Text",
			group: "page",
			type: "richText",
		}),
		defineField({
			group: "blocks",
			name: "blocks",
			type: "blockContent",
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
		defineField({
			group: "seo",
			name: "seo",
			title: "Page meta",
			type: "seo",
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				subtitle: "Home",
				title,
			};
		},
	},
});
