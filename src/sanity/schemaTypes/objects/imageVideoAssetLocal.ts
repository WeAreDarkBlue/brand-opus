import { CogIcon, DesktopIcon, MobileDeviceIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
	name: "imageVideoAssetLocal",
	title: "Image or Video asset",
	type: "object",
	groups: [
		{
			name: "desktop",
			title: "Desktop",
			default: true,
			icon: DesktopIcon,
		},
		{
			name: "mobile",
			title: "Mobile",
			icon: MobileDeviceIcon,
		},
	],
	fields: [
		defineField({
			name: "selected",
			title: "Select type",
			type: "string",
			initialValue: "image",
			group: ["desktop", "mobile"],
			options: {
				layout: "radio",
				direction: "horizontal",
				list: [
					{
						title: "Image",
						value: "image",
					},
					{
						title: "Video",
						value: "video",
					},
				],
			},
		}),
		defineField({
			name: "videoDesktop",
			title: "Video Desktop",
			type: "file",
			accept: "video/*",
			group: "desktop",
			hidden: ({ parent }) => parent?.selected !== "video",
		}),
		defineField({
			name: "videoMobile",
			title: "Video Mobile",
			type: "file",
			accept: "video/*",
			group: "mobile",
			hidden: ({ parent }) => parent?.selected !== "video",
		}),
		defineField({
			name: "imageDesktop",
			type: "standardImageNoCaption",
			group: "desktop",
			hidden: ({ parent }) => parent?.selected !== "image",
		}),
		defineField({
			name: "imageMobile",
			type: "standardImageNoCaption",
			group: "mobile",
			hidden: ({ parent }) => parent?.selected !== "image",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Image / Video asset",
			};
		},
	},
});
