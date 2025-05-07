"use client";
import React, { useEffect, useState, useRef } from "react";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import RichText from "@/components/common/RichText/RichText";
import SanityLink from "@/components/common/SanityLink";
import StructuredData from "./StructuredData";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import ArrowRight from "@/components/common/ArrowRight";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
	data: FooterPayload;
}
export interface FooterPayload {
	copyrightText: string;
	navigation: Array<{
		_key: string;
		title: string;
	}>;
	socialLinks: Array<{
		handle: string;
		socialType: string;
	}>;
	lowerLinks?: Array<{
		_key: string;
		href: string;
		text: string;
	}>;
	contacts: Array<{
		title: string;
		email: string;
	}>;
	cta?: string;
}

export default function Footer({ data }: FooterProps) {
	const { copyrightText, navigation, socialLinks, lowerLinks } = data || {};

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (navigation?.length && activeIndex === null) {
			setActiveIndex(0);
		}
	}, [navigation, activeIndex]);

	const handleHover = (index: number) => setActiveIndex(index);

	const [offices, setOffices] = useState<
		Array<{
			_id: string;
			city: string;
			address?: string;
			phone: string;
			gmaps: string;
		}>
	>([]);
	useEffect(() => {
		const fetchOffices = async () => {
			try {
				const officesData = await client.fetch(
					groq`*[_type == "office"] | order(_createdAt desc)[0...10]{
						_id,
						city,
						address,
							phone,
							gmaps
					}`,
				);
				setOffices(officesData);
			} catch (error) {
				console.error("Error fetching office:", error);
			}
		};
		fetchOffices();
	}, []);

	const [openItems, setOpenItems] = useState<Record<number, boolean>>(() =>
		navigation.reduce((acc, _, i) => ({ ...acc, [i]: i === 0 }), {}),
	);

	const contentRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

	const toggleItem = (index: number) => {
		setOpenItems((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	useEffect(() => {
		if (navigation.length > contentRefs.current.length) {
			contentRefs.current = Array(navigation.length)
				.fill(undefined)
				.map((_, i) => contentRefs.current[i] || React.createRef());
		}
	}, [navigation]);

	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const letters = svgRef.current.querySelectorAll("path");

		gsap.set(letters, { opacity: 0, y: 40 });

		const animation = gsap.to(letters, {
			opacity: 1,
			y: 0,
			stagger: 0.05,
			ease: "power3.out",
			scrollTrigger: {
				trigger: svgRef.current,
				start: "top 90%", // top of SVG hits bottom of viewport
				end: "bottom bottom ",
				scrub: true,
				markers: false,
			},
		});

		// Refresh ScrollTrigger on resize
		const handleResize = () => {
			ScrollTrigger.refresh();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			animation.kill();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<StructuredData footerData={data} />
			<footer className="bottom-0 w-full py-4 text-center md:pt-6 md:pb-0 bg-black text-white z-10 relative overflow-hidden">
				<Container>
					<Grid>
						{/* DESKTOP */}
						<ul className="col-span-12 lg:col-span-24 grid-cols-3 hidden lg:grid">
							{navigation?.map((nav, i) => (
								<li
									key={nav._key}
									className={`col-span-3 md:col-span-1 text-center pt-10 hover:cursor hover:text-secondary transition-colors duration-300 
											${activeIndex === i ? "text-secondary" : ""}`}
									onMouseEnter={() => handleHover(i)}
								>
									<h3
										className={`font-body lg:text-[68px] xl:text-[120px] xl:leading-[120px] transition-opacity duration-300 cursor-pointer ${
											activeIndex === i ? "opacity-100" : "opacity-50"
										}`}
									>
										{nav.title}
									</h3>
								</li>
							))}
						</ul>

						{/* Content container */}
						<div
							key={activeIndex}
							className="w-full transition-all duration-500 opacity-0 animate-fadeIn col-span-24 h-[320px] hidden lg:grid"
						>
							{/* Contact */}
							<div
								className={`transition-opacity duration-500 ${
									activeIndex === 0 ? "opacity-100" : "opacity-0 hidden"
								}`}
							>
								<div className="grid grid-cols-3 w-full items-start">
									<div className="col-span-1 text-center flex flex-col items-center justify-center py-6 font-body gap-6">
										{data.contacts.map((contact, idx) => (
											<a
												key={idx}
												href={`mailto:${contact.email}`}
												target="_blank"
												className="group"
											>
												<h3 className="font-body text-[22px] xl:text-[35px] font-bold tracking-normal">
													{contact.title}
												</h3>
												<span className="text-[17px] xl:text-[22px] font-bold group-hover:text-secondary">
													{contact.email}
												</span>
											</a>
										))}
									</div>
									<div className="col-span-1 text-center flex flex-col items-center justify-start py-6">
										<h3 className="font-body text-[22px] xl:text-[35px] font-bold tracking-normal mb-4">
											Follow Us
										</h3>
										{data.socialLinks.map((link, idx) => (
											<a
												className="capitalize flex flex-col items-start group mb-4"
												key={idx}
												href={link.handle}
												target="_blank"
											>
												<div className="flex flex-row items-center">
													<ArrowRight />
													<span className="text-[17px] xl:text-[22px] font-bold">
														{link.socialType}
													</span>
												</div>
												<div className="bg-secondary h-[2px] w-0 group-hover:w-full transition-all duration-300"></div>
											</a>
										))}
									</div>
									<div className="col-span-1 text-center flex flex-col items-center justify-center py-6">
										<h3 className="font-body text-[22px] xl:text-[35px] font-bold tracking-normal mb-10">
											Stay Up to Date
										</h3>

										<Input
											type="email"
											placeholder="Subscribe to our newsletter"
											hasIcon={true}
										/>
									</div>
								</div>
							</div>

							{/* Find */}
							<div
								className={`transition-opacity duration-500 ${
									activeIndex === 1 ? "opacity-100" : "opacity-0 hidden"
								}`}
							>
								<div className="grid grid-cols-4 w-full py-6">
									{offices.map((city, idx) => (
										<div
											key={idx}
											className="col-span-1 text-center flex flex-col items-center"
										>
											<h3 className="font-body text-[28px] xl:text-[35px] font-bold tracking-normal">
												{city.city}
											</h3>
											{city.address && (
												<Link
													href={city.gmaps}
													target="_blank"
													className="hover:cursor-pointer"
												>
													<div className="text-[17px] xl:text-[22px] px-10 xl:px-24 mb-5">
														<RichText content={city.address} />
													</div>
												</Link>
											)}

											<div className="flex flex-col items-start group">
												<a
													className="text-[17px] xl:text-[22px]"
													href={`tel:${city.phone}`}
												>
													{city.phone}
												</a>
												<div className="bg-secondary h-[2px] w-0 group-hover:w-full transition-all duration-300"></div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Join */}
							<div
								className={`transition-opacity duration-500 ${
									activeIndex === 2 ? "opacity-100" : "opacity-0 hidden"
								}`}
							>
								<div className="grid grid-cols-3 w-full py-6">
									{["Culture", "Careers", "Hatch"].map((item, idx) => (
										<div
											key={idx}
											className="col-span-1 text-center flex flex-col items-center justify-center"
										>
											<Link
												href={item.toLowerCase()}
												className="hover:cursor-pointer lowercase group"
											>
												<div className="flex flex-row items-center">
													<ArrowRight />
													<h3 className="font-body text-[28px] xl:text-[35px] font-bold tracking-normal capitalize">
														{item}
													</h3>
												</div>
												<div className="bg-secondary h-[2px] w-0 group-hover:w-full transition-all duration-300"></div>
											</Link>
										</div>
									))}
								</div>
							</div>
						</div>
					</Grid>

					{/* MOBILE */}
					<div className="w-full mx-auto space-y-4 col-span-full lg:hidden">
						{navigation.map((nav, i) => {
							const isOpen = openItems[i];
							const ref = contentRefs.current[i];

							return (
								<div key={i}>
									<button
										onClick={() => toggleItem(i)}
										key={i}
										className={`w-full text-left pt-3 pb-0 border-white/[0.175] text-[34px] font-body ${i !== 0 ? "border-t-2" : ""} ${isOpen ? "text-secondary" : "text-white"}`}
									>
										{nav.title}
									</button>

									<div
										ref={ref}
										className="overflow-hidden transition-all duration-500"
										style={{
											maxHeight: isOpen
												? `${ref?.current?.scrollHeight}px`
												: "0px",
											opacity: isOpen ? 1 : 0,
										}}
									>
										<div className="py-4 text-left">
											{/* Custom content per item */}
											{i === 0 && (
												<div className="flex flex-col items-start">
													{data.contacts.map((contact, idx) => (
														<a
															key={idx}
															href={`mailto:${contact.email}`}
															target="_blank"
															className="mb-1 flex flex-row items-center"
														>
															<ArrowRight />
															<h3 className="font-body text-[18px] font-bold tracking-normal mt-[3px]">
																{contact.title}
															</h3>
														</a>
													))}
													<h3 className="font-body text-[25px] font-bold tracking-normal mb-1 mt-5">
														Follow Us
													</h3>
													{data.socialLinks.map((link, idx) => (
														<a
															className="capitalize mb-1 flex flex-row item-center"
															key={idx}
															href={link.handle}
															target="_blank"
														>
															<ArrowRight />
															<span className="text-[18px] font-bold mt-[3px]">
																{link.socialType}
															</span>
														</a>
													))}
												</div>
											)}
											{i === 1 && (
												<div className="flex flex-col items-start gap-y-5">
													{offices.map((city, idx) => (
														<div
															key={idx}
															className="col-span-1 flex flex-col w-1/2"
														>
															<h3 className="font-body text-[25px] font-bold tracking-normal mb-2">
																{city.city}
															</h3>
															{city.address && (
																<Link
																	href={city.gmaps}
																	target="_blank"
																	className="hover:cursor-pointer "
																>
																	<div className="text-[18px] mb-2 leading-[22px]">
																		<RichText content={city.address} />
																	</div>
																</Link>
															)}
															<div className="flex flex-row items-center mt-3">
																<ArrowRight />
																<a
																	className="text-[18px] mt-0 tracking-wider"
																	href={`tel:${city.phone}`}
																>
																	{city.phone}
																</a>
															</div>
														</div>
													))}
												</div>
											)}
											{i === 2 && (
												<div>
													{["Culture", "Careers", "Hatch"].map((item, idx) => (
														<div key={idx} className="flex flex-col mb-2">
															<Link
																href={item.toLowerCase()}
																className="hover:cursor-pointer lowercase group flex flex-row items-center"
															>
																<ArrowRight />
																<h3 className="font-body text-[18px] font-bold tracking-normal capitalize">
																	{item}
																</h3>
															</Link>
														</div>
													))}
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{lowerLinks && (
						<div className="pb-8 pt-4 uppercase flex flex-col gap-y-2 items-start md:items-end opacity-50">
							{/* Lower Links */}
							<ul className="w-full flex flex-row !m-0 space-x-8 md:justify-end text-[15px]">
								{lowerLinks?.map((link) => (
									<li key={link._key} className="inline-block">
										<SanityLink
											link={link}
											className="hover:text-pink-300 inline-flex"
										/>
									</li>
								))}
							</ul>

							{/* Copyright */}
							<span className="text-[15px]">&copy; {copyrightText}</span>
						</div>
					)}
				</Container>
				<div className="px-5 md:px-14 -mb-[16px]">
					<svg viewBox="0 0 944.35 185.47" ref={svgRef}>
						<path
							id="b"
							data-name="Path 204"
							fill="white"
							d="M79.36,66.51c8.95-4.68,14.03-14.87,14.03-26.46s-3.37-20.89-10.05-27.55c-7.53-7.51-17.8-10.88-34.65-10.88H0v142.33h51.91c16.58,0,27.93-3.33,36.75-11.57,7.79-7.28,12.05-17.86,12.05-31.33,0-17.28-7.12-28.65-21.35-34.54ZM26.43,25.91h21.59c12.62,0,19.01,5.14,19.01,15.59s-6.39,15.59-19.01,15.59h-21.59v-31.19ZM50.85,119.44h-24.42v-38.61h24.42c15.25,0,22.98,6.37,22.98,19.3,0,12.95-7.73,19.31-22.98,19.31Z"
						></path>
						<path
							id="r"
							data-name="Path 205"
							fill="white"
							d="M173.16,39.85c-12,0-22.97,6.71-30.3,18.3v-16.68h-25.21v102.48h25.21v-36.4c0-31.11,11.39-45.14,27.45-45.14,3.72-.02,7.37.96,10.57,2.85l4.68-23.38c-4-1.32-8.19-2.01-12.4-2.03Z"
						></path>
						<path
							id="a"
							data-name="Path 206"
							fill="white"
							d="M268.84,82.75c0-28.67-14.44-42.9-43.1-42.9-14.79,0-26.81,5.93-33.61,15.61l16.41,16.41c3.05-6.29,8.79-10.46,17.2-10.46,12,0,17.89,5.08,17.89,15.05v4.47h-14.38c-15.52,0-26.18,2.14-34.71,8.77-7.5,5.83-11.71,14.04-11.71,24.78,0,19.72,14.51,31.16,34.32,31.16,11.2,0,21.27-3.99,29.04-12.65l12.46,14.85,18.52-15.82-8.34-10.06v-39.19ZM236.92,118.93c-4.51,3.81-9.34,5.29-15.88,5.29-8.6,0-12.81-5.06-12.81-10.98,0-4.21,1.37-6.85,4.08-9.09,3.02-2.5,7.03-3.76,16.23-3.76h15.08c0,6.71-.68,13.46-6.7,18.54Z"
						></path>
						<path
							id="n"
							data-name="Path 207"
							fill="white"
							d="M344.44,39.85c-12.17,0-23.43,5.13-30.82,14.71v-13.08h-25.21v102.48h25.21v-41.37c0-10.96.96-22.6,6.37-31,4.22-6.55,10.5-10.18,17.01-10.18,9.11,0,14.64,5.71,14.64,17.8v64.75h25.22v-69.11c0-12.93-3.5-20.38-8.96-26-5.65-5.81-13.42-9-23.46-9Z"
						></path>
						<path
							id="d"
							data-name="Path 210"
							fill="white"
							d="M487.68,1.6h-25.21v49.08c-6.32-6.6-14.43-10.83-26.62-10.83-24.44,0-44.06,21.05-44.06,52.87,0,33.39,18.85,52.87,43.39,52.87,11.77,0,22.18-3.74,29.95-12.49l12.36,14.73,18.52-15.82-8.33-10.06V1.6ZM458,115.89c-4.27,5.49-9.96,8.13-16.87,8.13s-12.61-2.85-17.08-8.33-6.71-13.22-6.71-22.98,2.24-17.49,6.71-22.98c4.47-5.49,10.17-8.34,17.08-8.34s12.52,2.52,16.97,8.24c4.47,5.49,6.62,13.12,6.62,23.08s-2.23,17.69-6.71,23.18h0Z"
						></path>
						<path
							id="o"
							data-name="Path 212"
							fill="white"
							d="M571.44,0c-41.22,0-67.1,29.98-67.1,72.79s25.88,72.79,67.1,72.79,67.1-29.97,67.1-72.79S612.66,0,571.44,0ZM571.44,121.74c-24.8,0-40.38-19.38-40.38-48.95s15.58-48.95,40.38-48.95,40.38,19.38,40.38,48.95-15.58,48.95-40.38,48.95Z"
						></path>
						<path
							id="p"
							data-name="Path 211"
							fill="white"
							d="M708.43,39.89c-11.99,0-21.62,4.41-28.39,12.12v-10.55h-25.19v144.01h25.21v-50.68c6.32,6.6,14.43,10.83,26.62,10.83,24.91,0,44.06-21.95,44.06-52.87,0-33.39-18.33-52.87-42.31-52.87ZM718.49,115.73c-4.47,5.49-10.17,8.34-17.08,8.34s-12.52-2.52-16.97-8.24c-4.48-5.49-6.62-13.11-6.62-23.08s2.23-17.69,6.71-23.18c4.27-5.49,9.96-8.13,16.87-8.13s12.61,2.85,17.08,8.33c4.47,5.49,6.71,13.22,6.71,22.98s-2.24,17.49-6.71,22.98Z"
						></path>
						<path
							id="u"
							data-name="Path 208"
							fill="white"
							d="M854.11,41.47h-25.21v44.77c0,15.25-.63,22.51-5.04,29.13-4.19,6.3-10.27,8.66-16.91,8.66-9.71,0-16.07-6.97-16.07-19.33v-63.22h-25.21v64.74c0,16.31,3.46,23.68,10.07,30.01,6.45,6.17,15.1,9.35,26.26,9.35s21.69-4.43,29.46-12.62l12.48,14.86,18.51-15.82-8.33-10.06V41.47Z"
						></path>
						<path
							id="s"
							data-name="Path 209"
							fill="white"
							d="M897.33,68.51c0-4.94,4.09-8.35,10.32-8.35,7.27,0,12.98,3.86,16.34,9.85l17.45-14.84c-7.52-8.9-18.15-15.36-34.03-15.36-20.87,0-33.94,14.71-33.94,30.47,0,36.62,46.97,27.37,46.97,45.06,0,6.36-5.04,9.86-12.78,9.86-9.48,0-17.44-5.66-21.98-15.26l-17.41,14.91c9.48,14.33,23.33,20.91,40.18,20.91,20.9,0,35.89-12.63,35.89-32.9,0-36.73-47.02-28.12-47.02-44.35Z"
						></path>
					</svg>
				</div>
			</footer>
		</>
	);
}
