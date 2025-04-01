import { useFrame, useThree } from "@react-three/fiber";

export function RAF({ render = true }) {
	const { advance } = useThree();

	useFrame(({ clock }) => {
		const time = clock.getDelta();
		if (render) {
			advance(time);
		}
	}, 1);

	return null;
}
