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
} from "@/components/ui/sheet";
import { getLinkHref } from "@/lib/frontend-utils";
import { useLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import type { MenuItem, SettingsPayload, SubmenuItem } from "@/types";

interface NavbarProps {
	data: SettingsPayload;
}

const colSpanClassMatrix = [
	[],
	["col-span-4"],
	["col-span-4 md:col-span-12", "col-span-4 md:col-span-12"],
	[
		"col-span-2 md:col-span-10",
		"col-span-2 md:col-span-6",
		"col-span-4 md:col-span-8",
	],
	[
		"col-span-2 md:col-span-5",
		"col-span-2 md:col-span-7",
		"col-span-2 md:col-span-5",
		"col-span-2 md:col-span-7",
	],
];

const getColSpan = (numElements: number, index: number) => {
	if (
		Array.isArray(colSpanClassMatrix[numElements]) &&
		colSpanClassMatrix[numElements][index]
	) {
		return colSpanClassMatrix[numElements][index];
	}
	return "col-span-2 md:col-span-6";
};

const getSubmenuTitle = (menuItems: MenuItem[], subMenu: SubmenuItem[]) => {
	const title = menuItems.find(
		(item) => item.submenu[0]._key === subMenu[0]._key,
	)?.title;
	return title || "";
};

const isBackgroundVisible = (navTheme: string) => {
	return navTheme.indexOf("-bg") > -1;
};

const isDarkNav = (navTheme: string) => {
	return navTheme.indexOf("dark") > -1;
};

export default function Navbar({ data }: NavbarProps) {
	const [subMenu, setSubMenu] = useState<SubmenuItem[] | null>(null);
	// const menuItems = data?.menuItems || ([] as MenuItem[]);
	const subMenuEl = useRef<HTMLUListElement | null>(null);
	const navEl = useRef<HTMLDivElement | null>(null);
	const lenis = useLenis();
	let { navTheme } = useThemeState();
	navTheme = stegaClean(navTheme);
	const bgClass = isDarkNav(navTheme) ? "bg-white/95" : "bg-black/95";
	const pathName = usePathname();


	const subMenuRefsByKey = useMemo(() => {
		const refs = {};
		if (subMenu !== null) {
			for (const item of subMenu) {
				refs[item._key] = React.createRef();
			}
		}
		return refs;
	}, [subMenu]);

	const isActive = useCallback(
		(menuItem: MenuItem) => {
			// Check submenu for matching link
			if (menuItem.submenu) {
				return menuItem.submenu.some((subMenuItem) => {
					const href = getLinkHref(subMenuItem.link);
					return pathName.split("/")[1] === href.split("/")[1];
				});
			}
		},
		[pathName],
	);

	const closeSubMenu = useCallback((e: any) => {
		// Ignore if click is inside the nav or missing submenu
		if (e?.target?.closest("#site-nav") || !subMenuEl.current) return;
		gsap.to(subMenuEl.current, {
			height: 0,
			duration: 0.3,
			ease: "power3.in",
			onComplete: () => {
				setSubMenu(null);
			},
		});
	}, []);

	const toggleMenuItem = useCallback(
		(menuItem) => {
			if (menuItem.submenu && subMenu !== menuItem.submenu) {
				if (!subMenuEl.current) {
					setSubMenu(menuItem.submenu);
					return;
				}

				const target = subMenuEl.current;
				gsap.to(target, {
					opacity: 0,
					y: 20,
					duration: 0.15,
					stagger: 0.1,
					ease: "power2.in",
					onComplete: () => {
						setSubMenu(menuItem.submenu);
						gsap.fromTo(
							target,
							{
								opacity: 0,
								y: -20,
							},
							{
								opacity: 1,
								y: 0,
								delay: 0.1,
								ease: "power4.out",
								duration: 0.5,
							},
						);
					},
				});
			} else {
				closeSubMenu(null);
			}
		},
		[subMenu, closeSubMenu],
	);

	const onLinkHover = useCallback(
		(key) => {
			if (subMenuRefsByKey[key]) {
				subMenuRefsByKey[key].current?.replay();
			}
		},
		[subMenuRefsByKey],
	);

	const onLinkClick = useCallback(
		(e) => {
			if (subMenu) {
				closeSubMenu(null);
			}
		},
		[subMenu, closeSubMenu],
	);



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
		{
			_key: "4",
			title: "Contact",
			slug: "contact",
		},
	];
	return (
		<Sheet open={subMenu !== null} modal={false}>
			<nav
				className={cn(
					"z-10 w-full pointer-events-auto transition-all ease-in-out bg-black lg:bg-transparent",
					isDarkNav(navTheme) && subMenu === null ? "text-black" : "text-white",
				)}
				id="site-nav"
				ref={navEl}
			>
				<Container noPadding>
					<div className={cn("flex items-center justify-between h-24 px-15 py-15")}>
						<SanityLink
							link="/"
							className="block w-[84px] md:w-[120px]"
							onClick={onLinkClick}
						>
							<span className="sr-only">home</span>
							<Logo
								variant="secondary"
								fill={
									isDarkNav(navTheme) && subMenu === null ? "black" : "white"
								}
								className="w-[94px] h-[40px] md:w-[48px] md:h-[56px]"
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
												link={menuItem.slug}
												className="text-[17px] xl:text-[22px] font-bold"
											>
												{menuItem.title}
											</SanityLink>
										</li>
									);
								})}
							</ul>
						)}


						{/* <SheetTrigger
							onClick={() => toggleMenuItem(menuItem)}
						>
							text
						</SheetTrigger> */}

					</div>
				</Container>

				<SheetContent
					side="left"
					aria-describedby={undefined}
					className="md:pt-24 pb-10 px-0 bg-secondary"
					onInteractOutside={closeSubMenu}
					onEscapeKeyDown={closeSubMenu}
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<SheetHeader className="text-left px-5 mb-12 flex items-center justify-between">
						<SheetTitle className="md:hidden text-3xl uppercase">
							Logo
						</SheetTitle>
						<SheetClose
							className="md:sr-only flex gap-3 hover:gap-2 transition-all items-center uppercase tracking-wider font-semibold outline-none"
							onClick={closeSubMenu}
						>
							Close
						</SheetClose>
					</SheetHeader>

					<Container>
						<ul
							ref={subMenuEl}
							className="grid grid-cols-4 md:grid-cols-24 items-center gap-[4px] md:gap-5 overflow-hidden"
						>
							{subMenu?.map((subMenuItem, index) => {
								return (
									<li
										key={subMenuItem._key}
										className={`${getColSpan(subMenu.length, index)} relative md:!h-[400px]`}
										style={{
											height:
												"clamp(150px, calc(var(--1dvh, 1vh) * 35), 400px)",
										}}
										onMouseEnter={() => onLinkHover(subMenuItem._key)}
									>
										<SanityLink
											link={subMenuItem.link}
											className={
												"absolute inset-0 block overflow-hidden border-2 border-transparent group focus:outline-0 focus:border-purple-300"
											}
											onClick={onLinkClick}
											ariaLabelledby={`submenu-title-${subMenuItem._key}`}
										>
											{/* {subMenuItem.image && (
												<RenderImage
													className="transition-transform scale-100 group-hover:scale-105 duration-300"
													image={subMenuItem.image}
													alt={(subMenuItem.image.alt as string) || "alt"}
													fill
													sizes="(max-width: 768px) 100vw, 750px"
												/>
											)} */}
											{subMenuItem.link?.title && (
												<span className="absolute bottom-0 left-0 right-0 text-lg sm:text-xl md:text-3xl-m 2xl:text-3xl font-semibold p-4 xl:p-8 text-center transition-transform origin-top-left tracking-minus md:text-right xl:text-center md:-rotate-90 md:right-auto md:translate-y-full xl:translate-y-0 xl:right-0 xl:rotate-0">
													{toPlainText(subMenuItem.link?.title)}
												</span>
											)}
										</SanityLink>
									</li>
								);
							})}
						</ul>
					</Container>
				</SheetContent>
			</nav>
		</Sheet>
	);
}
