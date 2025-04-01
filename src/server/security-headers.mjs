function getSecurityHeaders() {
	const isProd = process.env.NODE_ENV === "production";

	// Dev policy to allow build sources
	const devPolicy = isProd
		? {}
		: {
				connectSrc: "webpack://*",
				scriptSrc: "'unsafe-eval'",
				styleSrc: "'unsafe-inline'",
				frameSrc: "*",
			};

	const csp = [
		{
			key: "default-src",
			value: `'none'`,
		},
		{
			key: "object-src",
			value: `'self' data:`,
		},
		{
			key: "base-uri",
			value: `'self'`,
		},
		{
			key: "script-src",
			value: `'self' 'unsafe-inline' app.termly.io *.vimeo.com www.google-analytics.com ajax.googleapis.com www.googletagmanager.com *.googletagmanager.com *.hsforms.net *.hs-scripts.com *.hs-analytics.net static.hsappstatic.net *.hscollectedforms.net *.hs-banner.com snap.licdn.com www.googleadservices.com googleads.g.doubleclick.net *.google.com *.youtube.com *.hsleadflows.net *.captivate.fm *.onetrust.com *.cookie-script.com *.cookielaw.org vercel.live *.vercel.live *.vimeo.com ${devPolicy.scriptSrc}`,
		},
		{
			key: "connect-src",
			value: `'self' wss: *.hubspot.com *.api.sanity.io *.greenhouse.io *.hsforms.com hubspot-forms-static-embed-eu1.s3.amazonaws.com *.hscollectedforms.net app.termly.io *.google-analytics.com *.google.com *.sanity.io stats.g.doubleclick.net cdn.linkedin.oribi.io *.sentry.io *.captivate.fm https://vimeo.com/api/oembed.json *.onetrust.com *.cookie-script.com *.cookielaw.org *.vercel.live *.ads.linkedin.com *.linkedin.com *.vimeo.com ${devPolicy.connectSrc}`,
		},
		{
			key: "img-src",
			value: `'self' cdn.sanity.io *.hsforms.com *.hubspot.com *.linkedin.com *.google.ie *.google.co.uk *.google.com fonts.gstatic.com *.ytimg.com googleads.g.doubleclick.net *.adsymptotic.com images.unsplash.com *.vercel.live *.onetrust.com data:`,
		},
		{
			key: "style-src",
			value: `'self' 'unsafe-inline' fonts.googleapis.com *.googletagmanager.com *.onetrust.com *.vimeo.com *.vercel.live ${devPolicy.styleSrc}`,
		},
		{
			key: "form-action",
			value: `'self' *.hsforms.com`,
		},
		{
			key: "manifest-src",
			value: `'self'`,
		},
		{
			key: "font-src",
			value: `'self' data: fonts.gstatic.com fonts.googleapis.com *.onetrust.com`,
		},
		{
			key: "frame-ancestors",
			value: `'self'`,
		},
		{
			key: "media-src",
			value: `'self' cdn.sanity.io`,
		},
		{
			key: "frame-src",
			value: `'self' *.hubspot.com *.hsforms.com *.youtube.com *.googletagmanager.com *.google.com *.captivate.fm *.vimeo.com *.onetrust.com *.cookie-script.com *.cookielaw.org vercel.live *.vercel.live *.vimeo.com ${devPolicy.frameSrc}`,
		},
		{
			key: "worker-src",
			value: `'self' blob:`,
		},
	];

	if (isProd) {
		csp.push({
			key: "upgrade-insecure-requests",
			value: "",
		});
	}

	function stringifyCsp() {
		return csp
			.map((policy) => {
				return `${policy.key} ${policy.value};`;
			})
			.join("");
	}

	return [
		{
			key: "X-Content-Type-Options",
			value: "nosniff",
		},
		{
			key: "Referrer-Policy",
			value: "strict-origin-when-cross-origin",
		},
		{
			key: "Permissions-Policy",
			value:
				'camera=(), microphone=(), geolocation=(), interest-cohort=(), battery=(), autoplay=(self "https://cdn.sanity.io"), accelerometer=(), ambient-light-sensor=(), display-capture=(), gamepad=(), gyroscope=(), magnetometer=(), payment=(), picture-in-picture=(), usb=()',
		},
		{
			key: "Cache-Control",
			value: "public, max-age=86400, must-revalidate",
		},
		{
			key: "Strict-Transport-Security",
			value: "max-age=86400; includeSubDomains; preload",
		},
		{
			key: "X-XSS-Protection",
			value: "1; mode=block",
		},
		{
			key: "X-Frame-Options",
			value: "SAMEORIGIN",
		},
		{
			key: "X-DNS-Prefetch-Control",
			value: "on",
		},
		{
			key: "Content-Security-Policy",
			value: stringifyCsp(),
		},
	];
}

export default getSecurityHeaders;
