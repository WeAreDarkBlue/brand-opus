import { richTextPreview } from "@/sanity/lib/utils";
import { defineField } from "sanity";

export default defineField({
	name: "link",
	title: "Link",
	type: "object",
	groups: [
		{
			name: "link",
			title: "Link",
			default: true,
		},
		{
			name: "options",
			title: "Options",
		},
	],
	fields: [
		defineField({
			title: "Title",
			name: "title",
			type: "richTextLite",
			group: "link",
			hidden: ({ parent }) => parent?._type === "richTextLink",
		}),
		{
			title: "Page",
			name: "page",
			type: "reference",
			group: "link",
			to: [{ type: "home" }, { type: "page" }, { type: "project" }],
		},
		{
			title: "External URL",
			name: "link",
			type: "string",
			description: "Example: https://www.google.com",
			validation: (Rule) =>
				Rule.uri({
					allowRelative: false,
					scheme: ["http", "https", "mailto", "tel"],
				}),
			group: "link",
		},
		defineField({
			title: "Append page link",
			name: "appendLink",
			type: "string",
			description: "Add to end of an internal resource link",
			group: "options",
		}),
		defineField({
			title: "Open in new tab",
			description: "External links open in new tabs by default",
			name: "newTab",
			type: "boolean",
			initialValue: false,
			group: "options",
		}),
		defineField({
			title: "Colour",
			description: "Background colour (only applies to buttons)",
			name: "color",
			type: "string",
			initialValue: "orange",
			options: {
				list: [
					{ title: "Orange", value: "orange" },
					{ title: "Pink", value: "pink" },
					{ title: "Purple", value: "purple" },
					{ title: "Teal", value: "teal" },
				],
			},
			group: "options",
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			const titlePreview = richTextPreview(title);
			return {
				title: titlePreview,
			};
		},
	},
});
