import * as blocks from "@/sanity/schemaTypes/blocks";
import * as documents from "@/sanity/schemaTypes/documents";
import * as objects from "@/sanity/schemaTypes/objects";
import * as singletons from "@/sanity/schemaTypes/singletons";
import type { SchemaTypeDefinition } from "sanity";

const allObjects = Object.values(objects).map((obj) => {
	return { ...obj };
});
const allDocuments = Object.values(documents).map((doc) => {
	return { ...doc };
});
export const allSingletons = Object.values(singletons).map((singleton) => {
	return { ...singleton };
});
const allPageBlocks = Object.values(blocks).map((component) => {
	return { ...component };
});

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Singletons
		...allSingletons,
		// Documents
		...allDocuments,
		// Objects
		...allObjects,
		// Blocks
		...allPageBlocks,
	] as SchemaTypeDefinition[],
};
