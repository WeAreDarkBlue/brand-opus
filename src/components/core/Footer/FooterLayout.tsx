import { toPlainText } from "@portabletext/react";
import Image from "next/image";

import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import Logo from "@/components/common/Logo";
import RichTextLite from "@/components/common/RichText/RichTextLite";
import SanityLink from "@/components/common/SanityLink";
import SlideReveal from "@/components/common/SlideReveal";
import ContactList from "@/components/ui/contactList";
import { getSocialLinkData, replaceYear } from "@/lib/utils";
import type { FooterPayload } from "@/types";
import StructuredData from "./StructuredData";

interface FooterProps {
	data: FooterPayload;
}
export default function Footer({ data }: FooterProps) {
	const {
		copyrightText,
		address,
		contacts,
		navigation,
		socialLinks,
		lowerLinks,
		cta,
	} = data || {};

	return (
		<>
			<StructuredData footerData={data} />
			<footer className="bottom-0 w-full py-4 text-center md:py-6 bg-black text-white z-10 relative overflow-hidden">
				<Container>
					{/* <Image
            src="/footer-bg.svg"
            alt="footer"
            width={2042}
            height={1219}
            className='absolute left-0 right-0 md:left-0 md:right-0 top-[100px] md:top-[-500px] z-0 flex pointer-events-none'
          />
          <div className='pt-32 pb-28 md:pt-48 md:pb-40 z-10 relative'>
            <SlideReveal>
              <h3 className='text-3xl md:text-5xl md:leading-[60px] font-medium tracking-tight max-w-[900px] mx-auto mb-20'>{cta.title}</h3>
            </SlideReveal>
            <SlideReveal>
              <Button asChild variant="pink" size="md" className='mt-8'>
                <SanityLink link={cta.cta} />
              </Button>
            </SlideReveal>
          </div> */}
					<div className="text-left mb-6 mt-[200px]">
						<SlideReveal>
							<Logo
								variant="secondary"
								fill="white"
								width={154}
								className="w-[154px] h-auto"
							/>
						</SlideReveal>
					</div>
					<Grid>
						<div className="py-2 col-span-12 lg:col-start-1 md:col-end-5 text-left flex flex-col justify-between h-full">
							<div>
								{address?.title && (
									<h4 className="mb-6 opacity-50 uppercase text-sm">
										{address.title}
									</h4>
								)}
								{address?.content && (
									<RichTextLite content={address.content} className="text-lg" />
								)}
							</div>
							<ul className="flex flex-row gap-x-4 mt-10 md:mt-0">
								{socialLinks?.map((social) => {
									const socialLinkData = getSocialLinkData(social);

									return (
										socialLinkData && (
											<li key={social._key} className="mb-4 text-lg list-none">
												<SanityLink
													link={socialLinkData.link}
													className="inline-flex"
												>
													<span className="sr-only">
														{socialLinkData.title}
													</span>
													<Image
														src={socialLinkData.icon}
														alt={socialLinkData.title}
														width={24}
														height={24}
													/>
												</SanityLink>
											</li>
										)
									);
								})}
							</ul>
						</div>

						{contacts && (
							<ContactList
								contacts={contacts}
								title="Contacts_"
								className="py-2 col-span-12 lg:col-start-6 lg:col-end-15 text-left"
							/>
						)}

						<ul className="py-2 col-span-12 lg:col-span-9 lg:col-start-16 grid grid-cols-subgrid">
							{/* Navigation (link groups) */}
							{navigation?.map((nav, i) => (
								<li
									key={nav._key}
									className="col-span-12 md:col-span-3 text-left mb-8 md:mb-0"
								>
									<h4 className="mb-6 opacity-50 text-sm">{nav.title}</h4>
									<ul>
										{nav.links?.map((link, j) => (
											<li key={link._key} className="text-lg">
												<SanityLink
													link={link}
													className="hover:text-pink-300 inline-flex"
												/>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</Grid>
					{lowerLinks && (
						<div className="mt-16 pb-8 pt-4 border-t border-[#666] flex flex-col md:flex-row space-x-4 space-between">
							{/* Copyright */}
							<span className="flex-shrink-0 text-xs">
								{replaceYear(copyrightText)}
							</span>
							{/* Lower Links */}
							<ul className="w-full flex flex-col md:flex-row !m-0 md:space-x-8 justify-end text-xs">
								{lowerLinks?.map((link) => (
									<li key={link._key} className="inline-block">
										<SanityLink
											link={link}
											className="hover:text-pink-300 inline-flex"
										/>
									</li>
								))}
							</ul>
						</div>
					)}
				</Container>
			</footer>
		</>
	);
}
