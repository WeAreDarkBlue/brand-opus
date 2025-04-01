import { geolocation } from "@vercel/functions";

export function GET(request: Request) {
	const { country, region, countryRegion } = geolocation(request);

	return new Response(
		JSON.stringify({
			country: country || "global",
			region,
			countryRegion,
		}),
		{
			headers: { "Content-Type": "application/json" },
		},
	);
}
