"use client";
import React, { useEffect, useState, useRef } from "react";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import RichText from "@/components/common/RichText/RichText";
import SanityLink from "@/components/common/SanityLink";
import type { FooterPayload } from "@/types";
import StructuredData from "./StructuredData";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

import Link from "next/link";

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

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (navigation?.length && activeIndex === null) {
			setActiveIndex(0); // fallback
		}
	}, [navigation, activeIndex]);

	const handleHover = (index: number) => setActiveIndex(index);


	const [offices, setOffices] = useState([]);
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
				console.log("offices", officesData);
			} catch (error) {
				console.error("Error fetching office:", error);
			}
		};
		fetchOffices();
	}, []);


  const [openItems, setOpenItems] = useState<Record<number, boolean>>(() =>
	navigation.reduce((acc, _, i) => ({ ...acc, [i]: i === 0 }), {})
  );

  const contentRefs = useRef([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    // Optional: Initialize ref array length based on items
    if (navigation.length > contentRefs.current.length) {
      contentRefs.current = Array(navigation.length)
				.fill(undefined)
        .map((_, i) => contentRefs.current[i] || React.createRef());
    }
  }, [navigation]);

	return (
		<>
			<StructuredData footerData={data} />
			<footer className="bottom-0 w-full py-4 text-center md:py-6 bg-black text-white z-10 relative overflow-hidden">

					<Container>
						<Grid>

							{/* DESKTOP */}
							<ul className="col-span-12 lg:col-span-24 grid-cols-3 hidden md:grid">
								{navigation?.map((nav, i) => (
									<li
										key={nav._key}
										className={`col-span-3 md:col-span-1 text-center pt-10 hover:cursor hover:text-secondary transition-colors duration-300 
											${activeIndex === i ? 'text-secondary' : ''}`}
										onMouseEnter={() => handleHover(i)}
									>
										<h3
											className={`font-body lg:text-[68px] xl:text-[120px] xl:leading-[120px] transition-opacity duration-300 cursor-pointer ${
												activeIndex === i ? 'opacity-100' : 'opacity-50'
											}`}
										>
											{nav.title}
										</h3>
									</li>
								))}
							</ul>

							{/* Content container */}
							<div key={activeIndex} className="w-full transition-all duration-500 opacity-0 animate-fadeIn col-span-24 h-[300px] hidden md:grid">
								{/* Contact */}
								<div
									className={`transition-opacity duration-500 ${
										activeIndex === 0 ? 'opacity-100' : 'opacity-0 hidden'
									}`}
								>
									<div className="grid grid-cols-3 w-full items-start">
										<div className="col-span-1 text-center flex flex-col items-center justify-center py-6 font-body gap-6">

											{data.contacts.map((contact, idx) => (
												<a key={idx} href={`mailto:${contact.email}`} target="_blank">
													<h3 className="font-body text-[35px] font-bold tracking-normal">{contact.title}</h3>
													<span className="text-[22px] font-bold">{contact.email}</span>
												</a>
											))}
										</div>
										<div className="col-span-1 text-center flex flex-col items-center justify-start py-6">
											<h3 className="font-body text-[35px] font-bold tracking-normal">Follow Us</h3>
											{data.socialLinks.map((link, idx) => (
												<a className="capitalize" key={idx} href={link.handle} target="_blank">
													<span className="text-[22px] font-bold">{link.socialType}</span>
												</a>
											))}
										</div>
										<div className="col-span-1 text-center flex flex-col items-center justify-center py-6">
											<h3 className="font-body text-[35px] font-bold tracking-normal mb-10">Stay Up to Date</h3>
											<input
												type="email"
												placeholder="Email"
												className="border border-white bg-transparent text-white placeholder:text-white px-4 py-2 rounded-md"
											/>
										</div>
									</div>
								</div>

								{/* Find */}
								<div
									className={`transition-opacity duration-500 ${
										activeIndex === 1 ? 'opacity-100' : 'opacity-0 hidden'
									}`}
								>
									<div className="grid grid-cols-4 w-full py-6">
										{offices.map((city, idx) => (
											<div key={idx} className="col-span-1 text-center flex flex-col items-center">
												<h3 className="font-body text-[35px] font-bold tracking-normal">{city.city}</h3>
												{city.address && 
												<Link href={city.gmaps} target="_blank" className="hover:cursor-pointer">
													<div className="text-[22px] px-28 mb-5">
														<RichText content={city.address} />
													</div>
												</Link>
												}
												<a className="text-[22px]" href={`tel:${city.phone}`}>{city.phone}</a>
											</div>
										))}
									</div>
								</div>

								{/* Join */}
								<div
									className={`transition-opacity duration-500 ${
										activeIndex === 2 ? 'opacity-100' : 'opacity-0 hidden'
									}`}
								>
									<div className="grid grid-cols-3 w-full py-6">
										{['Culture', 'Careers', 'Hatch'].map((item, idx) => (
											<div key={idx} className="col-span-1 text-center flex flex-col items-center justify-center">
												<Link href={item.toLowerCase()} className="hover:cursor-pointer lowercase group">
													<h3 className="font-body text-[35px] font-bold tracking-normal capitalize">{item}</h3>
													<div className="bg-secondary h-[2px] w-0 group-hover:w-full transition-all duration-300"></div>
												</Link>
											</div>
										))}
									</div>
								</div>
							</div>
						</Grid>

						{/* MOBILE */}
						<div className="w-full mx-auto space-y-4 col-span-full md:hidden">
							{navigation.map((nav, i) => {
								const isOpen = openItems[i];
								const ref = contentRefs.current[i];

								return (
									<div key={i}>
										<button
											onClick={() => toggleItem(i)}
											key={i}
											className={`w-full text-left pt-3 pb-0 border-white/[0.175] text-[34px] font-body ${i !== 0 ? 'border-t-2' : ''} ${isOpen ? 'text-secondary' : 'text-white'}`}
										>
											{nav.title}
										</button>

										<div
											ref={ref}
											className="overflow-hidden transition-all duration-500"
											style={{
												maxHeight: isOpen
													? `${ref?.current?.scrollHeight}px`
													: '0px',
												opacity: isOpen ? 1 : 0,
											}}
										>
											<div className="py-4 text-left">
												{/* Custom content per item */}
												{i === 0 && (
													<div className="flex flex-col items-start">
														{data.contacts.map((contact, idx) => (
															<a key={idx} href={`mailto:${contact.email}`} target="_blank" className="block mb-1">
																<h3 className="font-body text-[18px] font-bold tracking-normal">{contact.title}</h3>
															</a>
														))}
														<h3 className="font-body text-[25px] font-bold tracking-normal mb-1 mt-5">Follow Us</h3>
														{data.socialLinks.map((link, idx) => (
															<a className="capitalize mb-1" key={idx} href={link.handle} target="_blank">
																<span className="text-[18px] font-bold">{link.socialType}</span>
															</a>
														))}
													</div>
												)}
												{i === 1 && (
													<div className="flex flex-col items-start gap-y-5">
														{offices.map((city, idx) => (
															<div key={idx} className="col-span-1 flex flex-col w-1/2">
																<h3 className="font-body text-[25px] font-bold tracking-normal mb-2">{city.city}</h3>
																{city.address && 
																<Link href={city.gmaps} target="_blank" className="hover:cursor-pointer ">
																	<div className="text-[18px] mb-2 leading-[22px]">
																		<RichText content={city.address} />
																	</div>
																</Link>
																}
																<a className="text-[18px] mt-3 tracking-wider" href={`tel:${city.phone}`}>{city.phone}</a>
															</div>
														))}
													</div>
												)}
												{i === 2 && (
													<div>
														{['Culture', 'Careers', 'Hatch'].map((item, idx) => (
															<div key={idx} className="flex flex-col mb-2">
																<Link href={item.toLowerCase()} className="hover:cursor-pointer lowercase group">
																	<h3 className="font-body text-[18px] font-bold tracking-normal capitalize">{item}</h3>
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
								<span className="text-[15px]">
									&copy; {copyrightText}
								</span>
							</div>
						)}
					</Container>
					{/* <div>animated logo here</div> */}
			</footer>
		</>
	);
}
