import ArrowRight from "@/components/common/ArrowRight";
import Link from "next/link";
import type {
	JobList as JobListProps,
	Jobs as JobProps,
} from "../../../sanity.types";

interface BlockJobListProps {
	data: JobListProps & {
		jobs: JobProps[];
	};
}

const JobList = ({ data }: BlockJobListProps) => {
	return (
		<div className="text-white lg:container mx-auto xl:max-w-[1320px]">
			<h3 className="text-lg md:text-[40px] text-[#767676] mb-4 md:mb-6">
				{data.eyebrow}
			</h3>
			<p className="font-heading font-light text-white text-[34px] leading-2xl lg:text-[56px] lg:leading-3xl xl:text-8xl xl:leading-4xl mb-10 md:mb-32">
				{data.heading}
			</p>
			{data.jobs?.map((job: JobProps) => (
				<Link
					key={job._id}
					href={`/${process.env.NEXT_PUBLIC_CAREERS_ROOT}/${job.slug.current}`}
					className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-1 md:mb-4 border-t-2 last-of-type:border-b-2 md:last-of-type:border-b-0 py-2 md:py-5 border-white/[0.2] group"
				>
					<div className="flex flex-row justify-between lg:grid lg:grid-cols-[200px_1fr_80px] items-center w-full">
						<p className="text-sm md:text-md">{job.location}</p>
						<h3 className="text-4xl text-left hidden lg:block">{job.role}</h3>
						<div className="ml-auto">
							<div className="flex flex-row items-center text-sm md:text-md">
								<ArrowRight />
								<span>Apply</span>
							</div>
							<div className="bg-secondary h-[2px] w-0 group-hover:w-full transition-all duration-300" />
						</div>
					</div>
					<h3 className="text-2xl text-left block lg:hidden mt-2">
						{job.role}
					</h3>
				</Link>
			))}
		</div>
	);
};

export default JobList;
