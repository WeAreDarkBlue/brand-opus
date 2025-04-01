"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	type MouseEventHandler,
	type ReactNode,
	type Ref,
	forwardRef,
} from "react";

import RichTextLite from "@/components/common/RichText/RichTextLite";
import {
	getLinkHref,
	getResourcePath,
	isLinkExternal,
} from "@/lib/frontend-utils";
import { toPlainText } from "next-sanity";

export interface SanityLinkProps {
	children?: ReactNode | ReactNode[];
	// biome-ignore lint/suspicious/noExplicitAny: TODO: create a type for this
	link?: any;
	className?: string;
	showActive?: boolean;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
	debug?: boolean;
	hasIcon?: boolean;
	ariaLabelledby?: string;
	ariaDescribedby?: string;
}

const Icon = () => {
	return (
		<div className="h-[22px] pt-[10px]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="13"
				viewBox="0 0 15 13"
				fill="none"
				className="transition-all opacity-0 group-hover:opacity-100 absolute translate-y-[-5px] -right-[30px] -translate-x-2 group-hover:translate-x-0"
			>
				<title>Arrow</title>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0.791699 0.5C1.22894 0.5 1.5834 0.845957 1.5834 1.2727V7.09093H12.2971L9.69012 4.5463C9.38094 4.24455 9.38105 3.7553 9.69023 3.45355C9.99941 3.1518 10.5007 3.1518 10.8099 3.45355L14.7681 7.31727C15.0773 7.61902 15.0773 8.10827 14.7681 8.41002L10.8099 12.2736C10.5007 12.5754 9.99941 12.5755 9.69023 12.2737C9.38105 11.972 9.38094 11.4827 9.69012 11.181L12.2971 8.63636H0.791699C0.354455 8.63636 0 8.29041 0 7.86359V1.2727C0 0.845957 0.354455 0.5 0.791699 0.5Z"
					fill="#202224"
				/>
			</svg>
		</div>
	);
};

const SanityLink = (
	{
		children,
		link,
		className = "",
		onClick = () => {},
		showActive = false,
		debug,
		hasIcon = false,
		ariaLabelledby,
		ariaDescribedby,
	}: SanityLinkProps,
	ref: Ref<HTMLAnchorElement> | undefined,
) => {
	const pathName = usePathname();

	if (debug) console.log("sanity link", link);

	// Return a normal span if no link is provided
	if (!link) return <span className={className}>{children}</span>;

	if (typeof link === "string") {
		// If link is passed as a string, turn it into
		// an object we can use in our functions below
		link = { link: link };
	}

	// Find the href and whether it's external
	const external = isLinkExternal(link);
	const href = getLinkHref(link);

	if (debug) console.log("sanity link href", href);

	// Set up button classes here
	const buttonClasses = link.button ? "btn" : "";

	const underlineClasses = showActive ? "animated-underline" : "";

	// Set link to active if the first url segment of the current path matches the href
	const isActive = showActive && pathName.split("/")[1] === href.split("/")[1];
	const activeClasses = isActive ? "active" : "";

	// Open in new tab if newTab is true, or if link is external and newTab is not set
	const newTab = link.newTab || (external && link.newTab !== false);
	let target = newTab ? "_blank" : "_self";

	if (href.startsWith("mailto:")) target = "_blank";

	const iconClasses = hasIcon
		? "flex items-center group relative !transition-all hover:pr-[52px]"
		: "";
	const allClasses = `${className} ${buttonClasses} ${underlineClasses} ${activeClasses} ${iconClasses}`;

	return (
		<>
			{external ? (
				<a
					ref={ref}
					href={href}
					target={target}
					onClick={onClick}
					rel="noopener noreferrer nofollow"
					className={allClasses}
					aria-labelledby={ariaLabelledby}
					aria-describedby={ariaDescribedby}
				>
					{link.page && link.title && !children && (
						<RichTextLite content={link.title} />
					)}
					{hasIcon ? (
						<div
							className={hasIcon ? "relative flex flex-row items-center" : ""}
						>
							{children}
							{hasIcon && <Icon />}
						</div>
					) : (
						children
					)}
				</a>
			) : (
				<Link
					ref={ref}
					href={link.jumpLink ?? href}
					target={target}
					onClick={onClick}
					className={allClasses}
					aria-labelledby={ariaLabelledby}
					aria-describedby={ariaDescribedby}
				>
					{link.title && !children && <RichTextLite content={link.title} />}
					{link?.title &&
						toPlainText(link.title).toLowerCase() === "learn more" &&
						link.page && (
							<span className="sr-only">&nbsp;about {link.page?.title}</span>
						)}

					{hasIcon ? (
						<div
							className={hasIcon ? "relative flex flex-row items-center" : ""}
						>
							{children}
							{hasIcon && <Icon />}
						</div>
					) : (
						children
					)}
				</Link>
			)}
		</>
	);
};

export default forwardRef(SanityLink);
