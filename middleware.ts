import { type NextRequest, NextResponse } from "next/server";

import { apacCountries } from "./src/lib/locales";
import locales from "./src/lib/locales";

export const config = {
	matcher: [
		"/((?!api|dbhq|_next/static|.*\\..*|_next/image|favicon.ico|icon.png|favicon-sanity.png|sitemap.xml|robots.txt).*)",
	],
};

export async function middleware(req: NextRequest) {
	const { nextUrl: url, geo } = req;

	let country = geo?.country || "global";

	const nordics = ["DK", "SE", "FI", "NO"].includes(country);
	const apac = apacCountries.includes(country);

	if (nordics) country = "nordics";
	if (apac) country = "apac";

	if (
		!["nordics", "apac", ...locales.flatMap((loc) => loc.value)].includes(
			country.toLowerCase(),
		)
	) {
		country = "global";
	}

	url.searchParams.set("country", country.toLocaleLowerCase());

	return NextResponse.rewrite(url);
}
