"use client";

import gsap from 'gsap'
import Link from "next/link";
import type {
	Project as ProjectType,
	Capability as CapabilityType,
} from "../../../sanity.types";
import RenderImage from "../common/RenderImage";
import { useEffect, useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import ImageVideoAssetComponent from '../common/ImageVideoAsset';
import Cursor from '@/components/common/HoverCursor'

function ProjectsList() {
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [capabilities, setCapabilities] = useState<CapabilityType[]>([]);
	const [selectedCapability, setSelectedCapability] = useState<string | null>(
		null,
	);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
		checkScreen();
		window.addEventListener('resize', checkScreen);
		return () => window.removeEventListener('resize', checkScreen);
	}, []);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setIsLoading(true);
				const projectsData = await client.fetch<ProjectType[]>(
					groq`*[_type == "project"] | order(_createdAt desc)[0...10]{
						_id,
						title,
						slug,
						hero,
						previewVideo,
						capabilities[]-> {
							_id,
							title,
							slug
						}
					}`,
				);

				const capabilitiesData = await client.fetch<CapabilityType[]>(
					groq`*[_type == "capability"] | order(title asc){
						_id,
						title,
						slug
					}`,
				);

				setProjects(projectsData);
				setCapabilities(capabilitiesData);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching projects:", error);
				setIsLoading(false);
			}
		};
		fetchProjects();
	}, []);

	const filteredProjects = selectedCapability
		? projects.filter((project) =>
				project.capabilities?.some((cap) => cap._id === selectedCapability),
			)
		: projects;

	const handleCapabilitySelect = (capabilityId: string) => {
		setSelectedCapability(
			capabilityId === selectedCapability ? null : capabilityId,
		);
		setIsOpen(false);
	};


  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRadius = 50;
  const cursorDiameter = cursorRadius * 2;

  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
	

	const handleMouseMove = (e: React.MouseEvent, index) => {
		if (hoveredIndex !== index) {
      setHoveredIndex(index);
    }
		if (cursorRef.current) {
			const x = mousePosition.current.x - cursorRadius;
			const y = mousePosition.current.y - cursorRadius;
			cursorRef.current.style.left = `${x}px`;
			cursorRef.current.style.top = `${y}px`;
		}
	};

	const handleMouseEnter = (e: React.MouseEvent, index) => {
		if (hoveredIndex !== index) {
			setHoveredIndex(index);
		}
	
		if (cursorRef.current) {
			let x = e.clientX;
			let y = e.clientY;
			if (x === 0 && y === 0 && typeof window !== 'undefined' && (window as any).event) {
				x = (window as any).event.clientX;
				y = (window as any).event.clientY;
			}
	
			const adjustedX = x - cursorRadius;
			const adjustedY = y - cursorRadius;
	
			cursorRef.current.style.left = `${adjustedX}px`;
			cursorRef.current.style.top = `${adjustedY}px`;
			cursorRef.current.style.display = 'flex';
	
			gsap.fromTo(cursorRef.current, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'power2.out' });
		}
	};
	
	const handleMouseLeave = (e: React.MouseEvent) => {
		setHoveredIndex(null);
		if (cursorRef.current) {
			const x = e.clientX - cursorRadius;
			const y = e.clientY - cursorRadius;
			cursorRef.current.style.left = `${x}px`;
			cursorRef.current.style.top = `${y}px`;

			gsap.to(cursorRef.current, {
				scale: 0,
				duration: 0.2,
				ease: 'power2.in',
				onComplete: () => {
					if (cursorRef.current && isDesktop) {
						cursorRef.current.style.display = 'none';
					}
				},
			});
		}
	};


	return (
		<section>
			<div className="lg:sticky top-0 pointer-events-none z-1 w-full mt-[40px] mb-4 lg:my-0">
				<h1 className="text-black text-[20vw] lg:text-[38vw] leading-[1] text-center lg:mb-[-12%]">
					Work
				</h1>
			</div>

			<div className="max-w-[1320px] mx-auto px-5">
				{/* Filter dropdown */}
				<div className="fixed top-0 mt-[40px] inset-x-0 z-100 justify-center mb-6 hidden lg:flex">
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger asChild>
							<button
								type="button"
								className={`flex items-center px-2.5 py-2.5 w-[280px] backdrop-blur-[30px] brightness-[30px] text-black ${isOpen ? "rounded-tl-[10px] rounded-tr-[10px]" : "rounded-[10px]"}`}
							>
								<ChevronRight
									className={`h-8 w-8 transition-transform ${isOpen ? "rotate-90" : ""}`}
								/>
								{selectedCapability
									? capabilities.find((c) => c._id === selectedCapability)
											?.title || "All Projects"
									: "All Projects"}
							</button>
						</PopoverTrigger>
						<PopoverContent className="w-[280px] backdrop-blur-[30px] brightness-[30px] -mt-[4px] px-10">
							<div className="flex flex-col border-t border-black space-y-2 pt-2">
								<button
									type="button"
									className={`cursor-pointer text-left ${
										selectedCapability === null ? "text-secondary" : ""
									}`}
									onClick={() => handleCapabilitySelect(null)}
								>
									All Projects
								</button>
								{capabilities.map((capability) => (
									<button
										type="button"
										key={capability._id}
										className={`cursor-pointer text-left ${
											selectedCapability === capability._id
												? "text-secondary "
												: ""
										}`}
										onClick={() => handleCapabilitySelect(capability._id)}
									>
										{capability.title}
									</button>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</div>

				{isLoading ? (
					<div className="flex justify-center mt-[20%]">
						<div className="animate-pulse">Loading projects...</div>
					</div>
				) : (
					<div className="gap-y-4 flex flex-col">
						{filteredProjects.length === 0 ? (
							<div className="text-center mt-[20%">
								No projects found for the selected capability.
							</div>
						) : (  
						filteredProjects.map((project, i) => (
							<Link
								key={project._id}
								className="relative h-[180px] lg:h-[715px] opacity-100 starting:opacity-0 transition-opacity cursor-none duration-300"
								href={`/${process.env.NEXT_PUBLIC_PROJECTS_ROOT}/${project.slug?.current}`}
								onMouseEnter={(e) => handleMouseEnter(e, i)}
								onMouseLeave={(e) => handleMouseLeave(e)}
								onMouseMove={(e) => handleMouseMove(e, i)}

							>
								<div className="absolute inset-0 size-full cursor-none">
									<div className="p-5 text-base text-white relative z-50">
										<h2 className="font-body font-bold text-sm md:text-base tracking-normal pointer-events-none">
											{project.title}
										</h2>
									</div>
									<div className="absolute inset-0 size-full z-40">
										{project.hero?.imageDesktop && (
											<RenderImage
												width={1320}
												height={715}
												image={project.hero?.imageDesktop}
												alt={project.title}
												fill={true}
											/>
										)}
										<ImageVideoAssetComponent
											autoPlay
											loop
											fill
											playsInline
											asset={project.previewVideo}
											className={`inset-0 absolute aspect-video h-full w-full z-0 transition-opacity cursor-none duration-300 ${
												hoveredIndex === i ? 'opacity-100' : 'opacity-0' // Show video only if the item is hovered
											}`}
										/>
									</div>
								</div>
							</Link>
							
							))
						)}
						{isDesktop && (
							<Cursor cursorDiameter={cursorDiameter} ref={cursorRef} text="View work" />
						)}
					</div>
				)}
			</div>
		</section>
	);
}

export default ProjectsList;
