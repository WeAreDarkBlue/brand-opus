import { CogIcon, DesktopIcon, MobileDeviceIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
	name: "videoAsset",
	title: "Video asset",
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
			name: "videoDesktop",
			title: "Video Desktop",
			type: "file",
			accept: "video/*",
			group: "desktop",
		}),
		defineField({
			name: "videoMobile",
			title: "Video Mobile",
			type: "file",
			accept: "video/*",
			group: "mobile",
		}),
		defineField({
			name: "selected",
			type: "string",
			value: "video",
			hidden: true,
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
