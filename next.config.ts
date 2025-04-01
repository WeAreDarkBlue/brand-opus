import type { NextConfig } from "next";
import allRedirects from "./src/server/redirects";
import getSecurityHeaders from "./src/server/security-headers.mjs";

const config: NextConfig = {
	images: {
		remotePatterns: [{ hostname: "cdn.sanity.io" }],
		dangerouslyAllowSVG: true,
		deviceSizes: [640, 750, 828, 1080, 1280, 1920, 2800],
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: "/:path*",
				headers: getSecurityHeaders(),
			},
		];
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	async redirects() {
		return allRedirects;
	},
	typescript: {
		// Set this to false if you want production builds to abort if there's type errors
		ignoreBuildErrors: true,
	},
	eslint: {
		/// Set this to false if you want production builds to abort if there's lint errors
		ignoreDuringBuilds: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	experimental: {
		taint: true,
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
};

export default config;
