"use client";

import type { QueryResponseInitial } from "@sanity/react-loader";

import { projectBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";

import CareersPage from "./CareersPage";
import type { CareerBySlugQueryResult } from "../../../../sanity.types";

type Props = {
	params: { slug: string };
	initial: QueryResponseInitial<CareerBySlugQueryResult | null>;
};

export default function CareersPreview(props: Props) {
	const { params, initial } = props;
	const { data, encodeDataAttribute } = useQuery<null>(
		projectBySlugQuery,
		params,
		{ initial },
	);

	return <CareersPage data={data!} encodeDataAttribute={encodeDataAttribute} />;
}
