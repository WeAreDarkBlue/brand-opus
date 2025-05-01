import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { slugifyFunc } from "@/sanity/lib/utils";

export default defineType({
	name: "jobs",
	title: "Jobs",
	icon: UserIcon,
	type: "document",
	fields: [
		defineField({
			name: "role",
			title: "Role",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: "Slug",
			name: "slug",
			type: "slug",
			validation: (rule) => rule.required(),
			options: {
				source: "role",
				maxLength: 100,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
				slugify: slugifyFunc(),
			},
		}),
		defineField({
			name: "location",
			title: "Location",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "intro",
			title: "Content",
			type: "richText",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "moreDetail",
			title: "The role in a bit more detail",
			type: "richText",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "lookingFor",
			title: "What we’re looking for",
			type: "richText",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "workWithUs",
			title: "Why you should come and work with us",
			type: "richText",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "nittyGritty",
			title: "The nitty gritty",
			type: "richText",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "reportingTo",
			title: "Reporting to",
			type: "string",
		}),
	],
	preview: {
		select: { title: "role" },
	},
});
