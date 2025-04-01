import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import locales from "./locales";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Get the YouTube or Vimeo ID from a URL or string.
 *
 * @param url - The URL or string.
 * @returns - Object with video ID & type.
 */
export function GetVideoID(url: string) {
	const youtubeRegex =
		/(youtube\.com\/watch\?v=|youtu\.be\/)([0-9A-Za-z_-]{10}[048AEIMQUYcgkosw])/;
	const vimeoRegex = /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

	if (typeof url !== "string") {
		throw new TypeError("First argument must be a string");
	}

	const matchYoutube = url.match(youtubeRegex);
	const matchVimeo = url.match(vimeoRegex);

	if (matchYoutube?.length && matchYoutube[2]) {
		return {
			type: "youtube",
			id: matchYoutube[2],
		};
	}

	if (matchVimeo?.length && matchVimeo[2]) {
		return {
			type: "vimeo",
			id: matchVimeo[2],
		};
	}

	return {
		type: "unknown",
		id: null,
	};
}

// Check if string contains numbers
// Teamtailor IDs contain only numbers
// jobvite contain both letters and numbers
export function isNumeric(str) {
	return /^\d+$/.test(str);
}

// Replace year shortcode
export function replaceYear(text?: string) {
	if (!text) return "";
	return text.replace(/\[year\]/g, new Date().getFullYear().toString());
}

export function getSocialLinkData(socialLink) {
	switch (socialLink.socialType) {
		case "facebook":
			return {
				link: `https://facebook.com/${socialLink.handle}`,
				title: "Facebook",
				icon: "/facebook.svg",
			};
		case "instagram":
			return {
				link: `https://instagram.com/${socialLink.handle}`,
				title: "Instagram",
				icon: "/instagram.svg",
			};
		case "linkedin":
			return {
				link: `https://linkedin.com/company/${socialLink.handle}`,
				title: "LinkedIn",
				icon: "/linkedin.svg",
			};
		case "twitter":
			return {
				link: `https://x.com/${socialLink.handle}`,
				title: "Twitter",
				icon: "/twitter.svg",
			};
		case "youtube":
			return {
				link: `https://youtube.com/${socialLink.handle}`,
				title: "YouTube",
				icon: "/youtube.svg",
			};
		case "tiktok":
			return {
				link: `https://tiktok.com/@${socialLink.handle}`,
				title: "TikTok",
				icon: "/tiktok.svg",
			};
		case "whatsapp":
			return {
				link: `https://wa.me/${socialLink.handle}`,
				title: "WhatsApp",
				icon: "/whatsapp.svg",
			};
		default:
	}
}

export const getLocaleEmoji = (country) => {
	return locales.find((loc) => loc.value === country)?.emoji || "🌍";
}
