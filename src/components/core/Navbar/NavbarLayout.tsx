"use client";
import { toPlainText } from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import CloseIcon from "@/components/common/CloseIcon";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import RenderImage from "@/components/common/RenderImage";
import SanityLink from "@/components/common/SanityLink";
import { useThemeState } from "@/components/core/ThemeSetter";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetDescription,
} from "@/components/ui/sheet";
import { useLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import type { MenuItem, SettingsPayload, SubmenuItem } from "@/types";
import FloatingToggle from "./FloatingToggle";
import ArrowRight from "@/components/common/ArrowRight";

interface NavbarProps {
	data: SettingsPayload;
}

const isDarkNav = (navTheme: string) => {
	return navTheme.indexOf("dark") > -1;
};

export default function Navbar({ data }: NavbarProps) {
	const [subMenu, setSubMenu] = useState<SubmenuItem[] | null>(null);
	const navEl = useRef<HTMLDivElement | null>(null);
	let { navTheme } = useThemeState();
	navTheme = stegaClean(navTheme);
	const bgClass = isDarkNav(navTheme) ? "bg-white/95" : "bg-black/95";

	const scrollToBtm = () => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	};

	{useEffect(() => {
		if (navEl.current && open) {
			const items = navEl.current.querySelectorAll("li");
			gsap.fromTo(
				items,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.2,
					duration: 0.8,
					ease: "power3.out",
				}
			);
		}
	}, [])}


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
		}
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
		}
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
		}
	];

	const [open, setOpen] = useState(false)

	const toggleSheet = () => {
		console.log("Sheet toggled");
		setOpen(prev => !prev);
	}


	return (
		
			<nav
				className={cn(
					"z-10 w-full pointer-events-auto transition-all ease-in-out bg-black lg:bg-transparent",
					isDarkNav(navTheme) ? "text-black" : "text-white",
				)}
				id="site-nav"

			>
				<Container noPadding>
					<div className={cn("flex items-center justify-between px-[15px] lg:px-15 py-4 lg:py-9")}>
						<SanityLink
							link="/"
							className="block w-[50px] mix-blend-difference"
						>
							<span className="sr-only">home</span>
							<Logo
								variant="logoOnly"
								fill={
									isDarkNav(navTheme) ? "black" : "white"
								}
								className="hidden lg:block w-[94px] h-[40px] md:w-[48px] md:h-[56px]"
							/>
							<Logo
								variant="full"
								fill={
									isDarkNav(navTheme) ? "black" : "white"
								}
								className="lg:hidden block w-[128px] h-[33px]"
							/>
						</SanityLink>
						
						{menuItems && (
							<ul className="flex-wrap items-end gap-x-[25px] py-4 md:pt-5 md:pb-0 mr-[8px] md:mr-0 z-10 hidden lg:flex">
								{menuItems.map((menuItem) => {
									return (
										<li
											key={menuItem._key}
											className=""
										>
											<SanityLink
												link={"../" + menuItem.slug}
												className="text-[17px] xl:text-[22px] font-bold"
											>
												{menuItem.title}
											</SanityLink>
										</li>
									);
								})}
								<li
									className="text-[17px] xl:text-[22px] font-bold cursor-pointer"
									onClick={scrollToBtm}
								>
									Contact
								</li>
							</ul>
						)}
					</div>
				</Container>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetContent side={"left"} className="w-full h-screen flex flex-col justify-between px-4 py-4"
					  style={{ backgroundColor: 'rgba(255, 83, 15, 0.9)' }}>
						<SheetTitle className="hidden">Sheet</SheetTitle>
							<div className="flex items-center justify-between text-black">

								<SanityLink
									link="/"
									className=""
								>
									<Logo
										variant="full"
										fill={'black'}
										className="md:hidden block w-[128px] h-[33px]"
									/>
								</SanityLink>
								<SheetClose className="hidden">
								</SheetClose>
							</div>
							<ul className="list-style-none">
								{menuItems.map((menuItem, index) => {
									return (
										<li
											key={menuItem._key}
											className="mb-10"
										>
											<SanityLink
												link={menuItem.slug}
												className="text-9xl text-black font-bold"
											>
												{menuItem.title}
											</SanityLink>
										</li>
									);
								})}
							</ul>


						<div>
						<ul className="list-style-none flex flex-col gap-y-1">
							{joinLinks.map((link) => (
								<li key={link._key}>
									<SanityLink
										link={link.slug}
										className="text-[18px] text-black font-medium flex flex-row items-center"
									>
										<ArrowRight fill="#000000"/>{link.title}
									</SanityLink>
								</li>
							))}
						</ul>

						<ul className="list-style-none flex flex-row gap-3 mt-6">
							{lowerLinks.map((link) => (
								<li key={link._key}>
									<SanityLink
										link={link.slug}
										className="text-[15px] text-black font-medium uppercase"
									>
										{link.title}
									</SanityLink>
								</li>
							))}
						</ul>
						<div>copyright</div>
						</div>
					</SheetContent>
				</Sheet>
				<FloatingToggle onClick={toggleSheet} />
			</nav>
	);
}
