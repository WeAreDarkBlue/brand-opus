import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { slugifyFunc } from "@/sanity/lib/utils";
import fieldGroups from "@/sanity/schemaTypes/groups/pageGroups";

export default defineType({
	name: "newsPost",
	title: "Thinking",
	type: "document",
	...fieldGroups,
	icon: BulbOutlineIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			group: "page",
			name: "title",
			description: "The title of your post.",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			group: "page",
			title: "Slug",
			name: "slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 100,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
				slugify: slugifyFunc(),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Preview Image",
			group: "page",
			name: "previewImage",
			type: "standardImageNoCaption",
		}),
		defineField({
			group: "page",
			name: "hero",
			type: "imageVideoAsset",
		}),
		defineField({
			name: "date",
			type: "datetime",
			options: {
				dateFormat: "Do MMM YYYY",
				timeFormat: "HH:mm",
			},
			initialValue: new Date().toISOString(),
			validation: (rule) => rule.required(),
			group: "page",
		}),
		defineField({
			title: "Category",
			name: "categories",
			type: "array",
			of: [
				{
					name: "category",
					type: "reference",
					to: [{ type: "category" }],
					options: {
						disableNew: false,
					},
				},
			],
			group: "page",
		}),
		defineField({
			title: "Author",
			name: "author",
			type: "reference",
			to: [{ type: "author" }],
			options: {
				disableNew: false,
			},
			group: "page",
		}),
		defineField({
			group: "page",
			name: "excerpt",
			type: "text",
			rows: 3,
		}),
		defineField({
			group: "page",
			name: "content",
			title: "Content",
			type: "richText",
			validation: (rule) => rule.required(),
		}),
		defineField({
			group: "page",
			name: "related",
			title: "Similar articles",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "newsPost" }],
					options: {
						disableNew: false,
					},
				},
			],
			validation: (rule) => rule.max(2),
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
		// defineField({
		//   name: 'salesforceListId',
		//   type: 'string',
		//   title: 'Saleforce Mailing List ID',
		//   description: 'The ID of the Salesforce mailing list for this post.',
		//   group: 'options',
		// }),
	],
});
