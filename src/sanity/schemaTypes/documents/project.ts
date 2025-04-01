import { AsteriskIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { slugifyFunc } from "@/sanity/lib/utils";
import fieldGroups from "@/sanity/schemaTypes/groups/pageGroups";

import locales from "@/lib/locales";

export default defineType({
	name: "project",
	title: "Case Studies",
	type: "document",
	...fieldGroups,
	icon: AsteriskIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			group: "page",
			name: "title",
			description: "This field is the title of your project.",
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
			group: "page",
			name: "hero",
			type: "imageVideoAsset",
		}),
		defineField({
			group: "page",
			name: "preview",
			type: "object",
			title: "Preview",
			fields: [
				defineField({
					name: "mediaType",
					type: "string",
					title: "Media Type",
					options: {
						list: [
							{ title: "Image", value: "image" },
							{ title: "Video", value: "video" },
						],
						layout: "radio",
					},
				}),
				defineField({
					name: "previewImage",
					type: "standardImageNoCaption",
					title: "Preview Image",
					hidden: ({ parent }) => parent?.mediaType !== "image",
				}),
				defineField({
					name: "previewVideo",
					type: "file",
					title: "Preview Video",
					options: {
						accept: "video/*",
					},
					hidden: ({ parent }) => parent?.mediaType !== "video",
				}),
			],
		}),
		defineField({
			group: "page",
			name: "previewMobile",
			type: "object",
			title: " Mobile Preview",
			fields: [
				defineField({
					name: "mediaType",
					type: "string",
					title: "Media Type",
					options: {
						list: [
							{ title: "Image", value: "image" },
							{ title: "Video", value: "video" },
						],
						layout: "radio",
					},
				}),
				defineField({
					name: "previewImage",
					type: "standardImageNoCaption",
					title: "Preview Image",
					hidden: ({ parent }) => parent?.mediaType !== "image",
				}),
				defineField({
					name: "previewVideo",
					type: "file",
					title: "Preview Video",
					options: {
						accept: "video/*",
					},
					hidden: ({ parent }) => parent?.mediaType !== "video",
				}),
			],
		}),
		defineField({
			group: "page",
			name: "client",
			title: "Client",
			type: "string",
		}),
		defineField({
			group: "page",
			name: "site",
			title: "Site",
			type: "url",
		}),
		defineField({
			name: "date",
			type: "datetime",
			options: {
				dateFormat: "Do MMM YYYY",
				timeFormat: "HH:mm",
			},
			initialValue: new Date().toISOString(),
			group: "page",
		}),
		defineField({
			title: "Category",
			name: "category",
			type: "reference",
			to: [{ type: "category" }],
			options: {
				disableNew: false,
			},
			group: "page",
		}),
		defineField({
			group: "page",
			name: "related",
			title: "Similar projects",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "project" }],
					options: {
						disableNew: true,
					},
				},
			],
			options: {
				layout: "tags",
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
		defineField({
			name: "salesforceListId",
			type: "string",
			title: "Saleforce Mailing List ID",
			description: "The ID of the Salesforce mailing list for this post.",
			group: "options",
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare(selection) {
			const { title } = selection;
			return {
				title: title,
			};
		},
	},
});
