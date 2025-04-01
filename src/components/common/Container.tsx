/*
 * Container component
 * This component is used to wrap all the other components in a consistent container.
 *
 * @param {boolean} noPadding - Whether to add padding to the container.
 * @param {array} children - The children of the container.
 * @param {string} className - The class name of the container.
 * @param {string} blockType - The type of block.
 * @param {string} id - The id of the container.
 *
 */
import { forwardRef } from "react";

import { classNames } from "@/lib/frontend-utils";

export interface ContainerProps {
	noPadding?: boolean;
	children: React.ReactNode;
	className?: string;
	blockType?: string;
	id?: string;
}

const Container = (props: ContainerProps, ref) => {
	const {
		noPadding = false,
		children,
		className = "",
		id,
		blockType = "",
	} = props;
	const paddingClass = noPadding ? "" : "px-5 lg:px-10";
	const type = blockType ? { ["data-type"]: blockType } : {};

	return (
		<div
			id={id ? id.replace("#", "") : ""}
			{...type}
			className={classNames(className, "max-w-[2000px] mx-auto")}
			ref={ref}
		>
			<div className={paddingClass}>{children}</div>
		</div>
	);
};

export default forwardRef(Container);
