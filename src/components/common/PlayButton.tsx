import { PlayIcon } from "@sanity/icons";

function PlayButton({ spotColor = "#fff" }) {
	return (
		<span
			className="absolute top-0 right-0 size-[48px] lg:size-[100px] rounded-md flex items-center justify-center mt-[18px] mr-4 lg:mt-[59px] lg:mr-[52px] z-40 group-hover:scale-110 transition-transform bg-orange-300"
			tabIndex={-1}
			style={spotColor ? { backgroundColor: spotColor } : {}}
		>
			<PlayIcon className="text-[30px] lg:text-[60px] text-black" />
		</span>
	);
}

export default PlayButton;
