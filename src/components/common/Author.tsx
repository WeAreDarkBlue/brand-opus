import type { Image as ImageType } from "sanity";
import RenderImage from "./RenderImage";

interface AuthorProps {
	data: {
		name: string;
		role?: string;
		picture?: ImageType;
	};
	small?: boolean;
}

function Author({ data, small = false }: AuthorProps) {
	const { name, role, picture } = data || {};

	return (
		<div className="flex gap-x-5">
			{picture && (
				<div className="rounded-lg overflow-hidden">
					<RenderImage
						image={picture}
						alt={name}
						sizes={small ? "84px" : "110px"}
					/>
				</div>
			)}
			<div
				className={`flex flex-col ${small ? "justify-end" : "justify-between"}`}
			>
				{!small && (
					<p className="uppercase tracking-[1.92px] text-[12px] !mb-0 text-white text-opacity-50 font-semibold">
						Author_
					</p>
				)}
				<div>
					<p className="text-lg !mb-0 tracking-[-0.5px] font-medium">{name}</p>
					{role && (
						<p className="text-xs uppercase tracking-widest text-white">
							{role}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Author;
