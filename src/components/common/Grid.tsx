import { classNames } from "@/lib/frontend-utils";

interface GridProps {
	cols?: PropSizeVariants | number;
	gap?: PropSizeVariants | number;
	start?: PropSizeVariants | number;
	span?: PropSizeVariants | number;
	children: React.ReactNode;
}

interface PropSizeVariants {
	base?: string | number;
	sm?: string | number;
	md?: string | number;
	lg?: string | number;
	xl?: string | number;
}

/**
 * Get the grid classes based on the prop value
 * @param {PropSizeVariants | number} value - The value of the prop
 * @param {string} prop - The prop name
 * @returns {string} - The grid classes
 * @example
 * getGridPropClasses({base: 4, md: 24}, 'grid-cols') // 'grid-cols-4 md:grid-cols-24'
 * getGridPropClasses(4, 'grid-cols') // 'grid-cols-4'
 */
const getGridPropClasses = (value: PropSizeVariants | number, prop: string) => {
	if (Number.parseInt(value as string) === 0) return "";
	if (
		Number.parseInt(value as string) < 1 ||
		Number.parseInt(value as string) > 24
	) {
		console.error(`Invalid value for ${prop}: ${value}`);
		return "";
	}

	if (typeof value === "number" || typeof value === "string") {
		return `${prop}-${value}`;
	}

	const propClasses: string[] = [];
	if (value.base) propClasses.push(`${prop}-${value.base}`);
	if (value.sm) propClasses.push(`sm:${prop}-${value.sm}`);
	if (value.md) propClasses.push(`md:${prop}-${value.md}`);
	if (value.lg) propClasses.push(`lg:${prop}-${value.lg}`);
	if (value.xl) propClasses.push(`xl:${prop}-${value.xl}`);
	return propClasses.join(" ");
};

/**
 * Grid component
 * This component is used to wrap all the other components in a consistent grid.
 *
 * @param {PropSizeVariants | number} cols - The number of columns in the grid.
 * @param {PropSizeVariants | number} gap - The gap between the columns in the grid.
 * @param {array} children - The children of the grid.
 * @returns {JSX.Element} - The grid component
 * @example
 * <Grid cols={{base: 4, md: 24}} gap={{base: 5, md: 5}}>
 *  <div className="col-span-8 col-start-5">Content</div>
 * </Grid>
 *
 */
const Grid = ({
	cols = { base: 4, md: 24 },
	gap = { base: 5, md: 5 },
	children,
}: GridProps) => {
	const colClasses = getGridPropClasses(cols, "grid-cols");
	const gapClasses = getGridPropClasses(gap, "gap");

	return (
		<div className={classNames("grid", colClasses, gapClasses)}>{children}</div>
	);
};

export default Grid;
