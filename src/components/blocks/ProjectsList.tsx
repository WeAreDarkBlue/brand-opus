"use client";

import Link from "next/link";
import type {
	Project as ProjectType,
	ProjectsList as ProjectListType,
} from "../../../sanity.types";
import RenderImage from "../common/RenderImage";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface Props extends Omit<ProjectListType, "projects"> {
	projects?: (ProjectType & { _ref: string; _key: string })[];
}

// Type for Capability
interface Capability {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
}

function ProjectsList({ data }: { data: Props }) {
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [capabilities, setCapabilities] = useState<Capability[]>([]);
	const [selectedCapability, setSelectedCapability] = useState<string | null>(
		null,
	);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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
						capabilities[]-> {
							_id,
							title,
							slug
						}
					}`,
				);

				const capabilitiesData = await client.fetch<Capability[]>(
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
							filteredProjects.map((project) => (
								<Link
									key={project._id}
									className="relative h-[180px] lg:h-[715px] opacity-100 starting:opacity-0 transition-opacity duration-300"
									href={`/${process.env.NEXT_PUBLIC_PROJECTS_ROOT}/${project.slug?.current}`}
								>
									<div className="absolute inset-0 size-full">
										<div className="p-5 text-base text-white relative z-50">
											<h2 className="font-body font-bold text-sm md:text-base">
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
											{/* <video class="size-full object-cover" muted loop playsInline>
												<source
													src="https://player.vimeo.com/progressive_redirect/playback/1058997151/rendition/1080p/file.mp4?loc=external&amp;signature=aa468e03fef7f2777728b9104a0331257891406e444fd65af6dffc75dac40bdc&amp;user_id=229644862"
													type="video/mp4"
												/>
												Your browser does not support the video tag.
											</video> */}
										</div>
									</div>
								</Link>
							))
						)}
					</div>
				)}
			</div>
		</section>
	);
}

export default ProjectsList;
