import "./globals.css";

// import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const fontSpaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	display: "swap",
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
		<html lang="en" className={`${fontSpaceGrotesk.variable}`}>
			{/* {process.env.NODE_ENV === "production" && (
				<GoogleTagManager gtmId="" />
			)} */}
			<body>{children}</body>
		</html>
	);
}
