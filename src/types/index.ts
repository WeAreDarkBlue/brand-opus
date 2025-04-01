import type { PortableTextBlock } from "next-sanity";
import type { File, HexColor, Image } from "sanity";

export interface MenuItem {
	_key: string;
	title: string;
	submenu: SubmenuItem[];
}

export interface SubmenuItem {
	_key: string;
	mediaType: "image" | "video";
	image?: Image;
	video?: File;
	link?: any;
}

export interface StandardImageNoCaption extends Image {
	alt: string;
}

export interface ImageVideoAsset {
	selected: "image" | "video";
	videoDesktop?: string;
	videoDesktopFile?: File;
	videoMobile?: string;
	videoMobileFile?: File;
	imageDesktop?: Image;
	imageMobile?: Image;
	videoDesktopOverlay?: string;
	videoMobileOverlay?: string;
}

export interface ShowcaseProject {
	_type: string;
	coverImage?: Image;
	overview?: PortableTextBlock[];
	slug?: string;
	tags?: string[];
	title?: string;
}

export interface SeoData {
	keywords?: string[];
	ogImage?: Image;
	title?: string;
	description?: string;
}

export interface Author {
	name: string;
	role?: string;
	picture?: StandardImageNoCaption;
	company?: string;
}

// Block Data
export interface BlockOptions {
	paddingTop: string;
	paddingBottom: string;
	theme: string;
	anchorLink: string;
	width: "sm" | "md" | "lg" | "xl" | "full" | "auto";
}

export interface BlockData {
	_key: string;
	_type: string;
	blockOptions: BlockOptions;
}

export type PageTheme = "light" | "dark";
export type NavTheme = PageTheme | "light-bg" | "dark-bg";

export interface BlockDataBasicContent extends BlockData {
	width: "sm" | "md" | "lg" | "xl" | "full" | "auto";
	textAlignment: string;
	richTextContent: PortableTextBlock[];
}

export interface BlockDataCodeBlock extends BlockData {
	code: string;
	scripts: string;
}

// Create other block types here

export interface BlockDataQuote extends BlockData {
	quote: string;
	author?: Author;
	spotColor?: HexColor;
}

// Page payloads
export interface HomePagePayload {
	footer?: PortableTextBlock[];
	intro?: PortableTextBlock[];
	headline?: string;
	title?: string;
	seo?: SeoData;
	blocks?: BlockData[];
	themeColor?: PageTheme;
	navTheme?: NavTheme;
	hero?: {
		background?: ImageVideoAsset;
		title?: string;
	};
}

export interface PagePayload {
	body?: PortableTextBlock[];
	name?: string;
	overview?: PortableTextBlock[];
	title?: string;
	slug?: string;
	seo?: SeoData;
	blocks?: BlockData[];
	themeColor?: PageTheme;
	navTheme?: NavTheme;
}

export interface ProjectPayload {
	client?: string;
	site?: string;
	slug: string;
	tags?: string[];
	title?: string;
	hero?: string;
	seo?: SeoData;
	blocks?: BlockData[];
	themeColor?: PageTheme;
	navTheme?: NavTheme;
	spotColor?: HexColor;
	related?: ProjectPayload;
}

export interface NewsPayload {
	title?: string;
	slug: string;
	tags?: string[];
	seo?: SeoData;
	themeColor?: PageTheme;
	navTheme?: NavTheme;
	spotColor?: HexColor;
	content?: any;
	category: any[];
	hero: any;
	related?: NewsPayload;
}

export interface CareerLocation {
	city: string;
}

export interface CareerPayload {
	title?: string;
	slug: string;
	type?: string;
	apply_url: string;
	body?: string;
	department?: string;
	id?: string;
	location?: CareerLocation[];
	remote?: string;
}

export interface OfficePayload {
	city?: string;
	region?: string;
	slug: string;
	address?: PortableTextBlock[];
	seo?: SeoData;
	themeColor?: PageTheme;
	navTheme?: NavTheme;
	contacts?: {
		_key: string;
		title?: string;
		email?: string;
	}[];
	content?: any;
	blocks?: BlockData[];
}

export interface SettingsPayload {
	menuItems?: MenuItem[];
	ogImage?: Image;
}

export interface FooterPayload {
	address: {
		title?: string;
		content?: PortableTextBlock[];
	};
	contacts: {
		_key: string;
		title?: string;
		email?: string;
	}[];
	navigation: {
		_key: string;
		title?: string;
		links: {
			_key: string;
			title?: string;
			url?: string;
		}[];
	}[];
	lowerLinks: {
		_key: string;
		title?: string;
		url?: string;
	}[];
	socialLinks: {
		_key: string;
		socialType: "instagram" | "linkedin" | "tiktok";
		handle?: string;
	}[];
	cta: {
		title?: string;
		cta: {
			title?: string;
			url?: string;
		};
	};
	copyrightText?: string;
}

export interface JobPayload {
	id: string | number;
	title: string;
	remote?: string;
	type: string;
	body: string;
	department: string;
	location: {
		city: string;
	}[];
	slug: string;
	created_at: Date;
	apply_url: string;
}

export interface JobsResponsePayload {
	jobs: JobPayload;
	total?: number;
	meta?: {
		"page-count": number;
	};
}
