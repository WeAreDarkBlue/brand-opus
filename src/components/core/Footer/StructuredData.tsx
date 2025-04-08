import { toPlainText } from "@portabletext/react";

import { getSocialLinkData } from "@/lib/utils";
import Script from "next/script";

const StructuredData = ({ footerData }) => {
	const { contacts, address, socialLinks } = footerData || {};
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const structuredData = [
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: "T&Pm",
			url: baseUrl,
		},
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "T&Pm",
			url: baseUrl,
			logo: `${baseUrl}/logo-card.png`,
			contactPoint: contacts?.map((contact) => ({
				"@type": "ContactPoint",
				email: contact.email,
				contactType: contact.title,
			})),
			address: address?.content ? toPlainText(address.content) : null,
			sameAs: socialLinks?.map((social) => {
				const linkData = getSocialLinkData(social);
				return linkData?.link;
			}),
		},
	];

	return (
		<Script
			id="structured-data"
			type="application/ld+json"
			strategy="afterInteractive"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
};

export default StructuredData;
