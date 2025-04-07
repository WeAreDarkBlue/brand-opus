import { EditIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { BlockPreview } from "@/components/studio/blockPreview";
import blockGroups from "@/sanity/schemaTypes/groups/blockGroups";

export default defineField({
	title: "Quote Carousel",
	name: "quoteCarousel",
	type: "object",
	icon: EditIcon,
	...blockGroups,
	fields: [
		defineField({
			group: "block",
			title: "Quotes",
			name: "quotes",
			type: "array",
      of: [
        {
          type: 'object',
          fields: [
						{
							title: "Quote",
							name: "quote",
							type: "text",
						},
						{
							title: "Name",
							name: "name",
							type: "string",
						},
						{
							title: "Job",
							name: "job",
							type: "string",
						},
						{
							title: "Company",
							name: "company",
							type: "string",
						},
          ],
        },
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
		select: {
			locale: "blockOptions.limitToLocale",
		},
	},
});
