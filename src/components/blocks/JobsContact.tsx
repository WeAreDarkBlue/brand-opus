"use client";
import { stegaClean } from "@sanity/client/stega";

import Grid from "@/components/common/Grid";
import RichText from "@/components/common/RichText/RichText";
import ArrowRight from "../common/ArrowRight";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BlockDataJobsContact {
	blockOptions?: any;
	lookingForContent?: any;
	lookingForHeading?: string;
	lookingForWarning?: any;
	startingOutContent?: any;
	startingOutHeading?: string;
	startingOutLink?: string;
}

interface BlockJobsContactProps {
	data: BlockDataJobsContact;
}

const JobsContact = ({ data }: BlockJobsContactProps) => {
	const {
		lookingForContent,
		lookingForHeading,
		lookingForWarning,
		startingOutContent,
		startingOutHeading,
		startingOutLink,
	} = data;
	return (
		<div
			className={
				"lg:container mx-auto xl:max-w-[1320px] text-white mb-12 md:mb-0"
			}
		>
			<Grid>
				<div className="col-span-24 lg:col-span-12 mb-10 lg:mb-0">
					<h2 className="h6 font-body font-bold mb-4">{lookingForHeading}</h2>
					<div className="mb-6">
						{lookingForContent && (
							<div className="inline-block">
								<RichText content={lookingForContent} />
							</div>
						)}
					</div>
					<div className="opacity-50">
						{lookingForWarning && (
							<div className="inline-block">
								<RichText
									content={lookingForWarning}
									className="text-[size:var(--small)]"
								/>
							</div>
						)}
					</div>
				</div>
				<div className="col-span-24 lg:col-span-12">
					<h3 className="h6 font-body font-bold mb-4">{startingOutHeading}</h3>
					<div className="mb-6">
						{startingOutContent && <RichText content={startingOutContent} />}
					</div>
					<div className="flex items-center">
						{startingOutLink && startingOutLink.title && (
							<Link
								href={startingOutLink.title}
								className="text-white flex flex-row items-center gap-2 hover:text-secondary"
							>
								<ChevronRight />
								<RichText content={startingOutLink.title} />
							</Link>
						)}
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default JobsContact;
