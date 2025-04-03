import "./globals.css";

// import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import localFont from "next/font/local";

const apercu = localFont({
	variable: "--font-apercu",
	fallback: ["Open Sans", "Arial", "sans-serif"],
	src: [
		{
			path: "./fonts/Apercu/Apercu-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/Apercu/Apercu-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/Apercu/Apercu-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
});

const juana = localFont({
	variable: "--font-juana",
	fallback: [
		"Lucida Bright",
		"Georgia",
		"Times New Roman",
		"Garamond",
		"serif",
		"Baskerville",
		"Palatino Linotype",
		"Book Antiqua",
	],
	src: [
		{
			path: "./fonts/Juana/juana-medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/Juana/juana-light.woff2",
			weight: "300",
			style: "normal",
		},
	],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
	title: {
		template: "%s | Brand Opus",
		default: "Branding Agency - London - New York - Chicago - Melbourne",
	},
	openGraph: {
		images: [
			{
				url: "/logo-card.png",
				width: 1200,
				height: 630,
				alt: "Brand Opus",
			},
		],
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${apercu.variable} ${juana.variable} antialiased`}
		>
			{/* {process.env.NODE_ENV === "production" && (
				<GoogleTagManager gtmId="" />
			)} */}
			<body>{children}</body>
		</html>
	);
}
