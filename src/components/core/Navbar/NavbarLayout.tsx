"use client";
import { stegaClean } from "@sanity/client/stega";
import gsap from "gsap";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import SanityLink from "@/components/common/SanityLink";
import { useThemeState } from "@/components/core/ThemeSetter";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { SettingsPayload, SubmenuItem } from "@/types";
import FloatingToggle from "./FloatingToggle";
import { CustomEase } from "gsap/all";
import { ChevronRight } from "lucide-react";

interface NavbarProps {
	data: SettingsPayload;
}

const isDarkNav = (navTheme: string) => {
	return navTheme.indexOf("dark") > -1;
};

gsap.registerPlugin(CustomEase);

export default function Navbar({ data }: NavbarProps) {
	let { navTheme } = useThemeState();
	navTheme = stegaClean(navTheme);

	const scrollToBtm = () => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
	};

	const menuItems = [
		{
			_key: "1",
			title: "About",
			slug: "culture",
		},
		{
			_key: "2",
			title: "Insights",
			slug: "insights",
		},
		{
			_key: "3",
			title: "Work",
			slug: "work",
		},
	];

	const joinLinks = [
		{
			_key: "1",
			title: "Culture",
			slug: "culture",
		},
		{
			_key: "2",
			title: "Careers",
			slug: "careers",
		},
		{
			_key: "3",
			title: "Hatch",
			slug: "hatch",
		},
	];

	const lowerLinks = [
		{
			_key: "1",
			title: "Privacy",
			slug: "privacy",
		},
		{
			_key: "2",
			title: "Cookies",
			slug: "cookies",
		},
		{
			_key: "3",
			title: "Terms",
			slug: "terms",
		},
	];

	const menuItemsPrimaryRef = useRef<HTMLUListElement>(null);
	const menuItemsSecondaryRef = useRef<HTMLUListElement>(null);
	const menuItemsTertiaryRef = useRef<HTMLUListElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const [isNavOpen, setIsNavOpen] = useState(false);

	const handleToggle = (state: boolean) => {
		setIsNavOpen(state);
	};

	useEffect(() => {
		if (isNavOpen) {
			gsap.delayedCall(0.15, () => {
				const animateMenuItems = (
					menuRef: React.RefObject<HTMLUListElement | null>,
				) => {
					if (menuRef.current) {
						const items = menuRef.current.querySelectorAll("li div");
						if (items.length > 0) {
							gsap.fromTo(
								items,
								{ opacity: 0, y: 50 },
								{
									opacity: 1,
									y: 0,
									stagger: 0.1,
									duration: 1,
									ease: "0.19, 1, 0.22, 1",
								},
							);
						}
					}
				};

				animateMenuItems(menuItemsPrimaryRef);
				animateMenuItems(menuItemsSecondaryRef);
				animateMenuItems(menuItemsTertiaryRef);
			});
		}
	}, [isNavOpen]);

	return (
		<nav
			className={cn(
				"z-10 w-full pointer-events-auto transition-all ease-in-out bg-black lg:bg-transparent",
				isDarkNav(navTheme) ? "text-black" : "text-white",
			)}
			id="site-nav"
		>
			<Container noPadding>
				<div
					className={cn(
						"flex items-center justify-between px-[15px] lg:px-15 py-4 lg:py-9",
					)}
				>
					<SanityLink link="/" className="block w-[50px] mix-blend-difference">
						<span className="sr-only">home</span>
						<Logo
							variant="logoOnly"
							fill={isDarkNav(navTheme) ? "black" : "white"}
							className="hidden lg:block w-[94px] h-[40px] md:w-[48px] md:h-[56px]"
						/>
						<Logo
							variant="full"
							fill={isDarkNav(navTheme) ? "black" : "white"}
							className="lg:hidden block w-[128px] h-[33px]"
						/>
					</SanityLink>

					{menuItems && (
						<ul className="flex-wrap items-end gap-x-[25px] py-4 md:pt-5 md:pb-0 mr-[8px] md:mr-0 z-10 hidden lg:flex">
							{menuItems.map((menuItem) => {
								return (
									<li key={menuItem._key} className="">
										<SanityLink
											link={"../" + menuItem.slug}
											className="font-bold"
										>
											{menuItem.title}
										</SanityLink>
									</li>
								);
							})}
							<li className="font-bold cursor-pointer" onClick={scrollToBtm}>
								Contact
							</li>
						</ul>
					)}
				</div>
				<FloatingToggle handleToggle={handleToggle} />
				<Sheet open={isNavOpen}>
					<SheetContent
						ref={contentRef}
						side={"left"}
						className="w-full h-screen flex flex-col justify-between px-4 py-4"
						style={{ backgroundColor: "rgba(255, 83, 15, 0.9)" }}
					>
						<SheetTitle className="hidden">Sheet</SheetTitle>
						<div className="flex items-center justify-between text-black">
							<SanityLink link="/" className="">
								<Logo
									variant="full"
									fill={"black"}
									className="md:hidden block w-[128px] h-[33px]"
								/>
							</SanityLink>
							<SheetClose className="hidden"></SheetClose>
						</div>
						<ul ref={menuItemsPrimaryRef} className="list-style-none">
							{menuItems.map((menuItem, index) => {
								return (
									<li key={menuItem._key} className="mb-10 overflow-hidden">
										<div>
											<SanityLink
												link={menuItem.slug}
												className="text-9xl text-black font-bold"
											>
												{menuItem.title}
											</SanityLink>
										</div>
									</li>
								);
							})}
						</ul>

						<div>
							<ul
								ref={menuItemsSecondaryRef}
								className="list-style-none flex flex-col gap-y-1"
							>
								{joinLinks.map((link) => (
									<li key={link._key} className="overflow-hidden">
										<div>
											<SanityLink
												link={link.slug}
												className="text-[18px] text-black font-medium flex flex-row items-center"
											>
												<ChevronRight />
												{link.title}
											</SanityLink>
										</div>
									</li>
								))}
							</ul>

							<ul
								ref={menuItemsTertiaryRef}
								className="list-style-none flex flex-row gap-3 mt-6"
							>
								{lowerLinks.map((link) => (
									<li key={link._key} className="overflow-hidden">
										<div>
											<SanityLink
												link={link.slug}
												className="text-[15px] text-black font-medium uppercase"
											>
												{link.title}
											</SanityLink>
										</div>
									</li>
								))}
							</ul>
							<div className="uppercase mt-1">&copy; Brand Opus Group LTD.</div>
						</div>
					</SheetContent>
				</Sheet>
			</Container>
		</nav>
	);
}
