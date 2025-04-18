/**
 * This plugin contains all the logic for setting up the singletons
 */

import type { DocumentDefinition } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const singletonPlugin = (types: string[]) => {
	return {
		name: "singletonPlugin",
		document: {
			// Hide 'Singletons (such as Home)' from new document options
			// https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
			newDocumentOptions: (prev, { creationContext }) => {
				if (creationContext.type === "global") {
					return prev.filter(
						(templateItem) => !types.includes(templateItem.templateId),
					);
				}

				return prev;
			},
			// Removes the "duplicate" action on the Singletons (such as Home)
			actions: (prev, { schemaType }) => {
				if (types.includes(schemaType)) {
					return prev.filter(({ action }) => action !== "duplicate");
				}

				return prev;
			},
		},
	};
};

// Passing singleton document schema types to the page structure
// will cause the Desktool to display the singletons as top-level items
export const pageStructure = (
	singletons: DocumentDefinition[],
): StructureResolver => {
	return (S) => {
		// Reorder the singletons to be in a specific order
		const order = [
			"home",
			"settings",
			"footer",
			"page",
			"project",
			"newsPost",
			"office",
			"category",
			"author",
		];

		singletons.sort((a, b) => {
			return order.indexOf(a.name) - order.indexOf(b.name);
		});

		// Goes through all of the singletons that were provided and translates them into something the
		// Desktool can understand
		const singletonItems = singletons.map((typeDef) => {
			return S.listItem()
				.title(typeDef.title ?? typeDef.name)
				.icon(typeDef.icon)
				.child(
					S.editor()
						.id(typeDef.name)
						.schemaType(typeDef.name)
						.documentId(typeDef.name),
				);
		});

		// The default root list items (except custom ones)
		const defaultListItems = S.documentTypeListItems()
			.filter(
				(listItem) =>
					!singletons.find((singleton) => singleton.name === listItem.getId()),
			)
			.sort((a, b) => {
				return (
					order.indexOf(a.getId() as string) -
					order.indexOf(b.getId() as string)
				);
			});

		return S.list()
			.title("Content")
			.items([...singletonItems, S.divider(), ...defaultListItems]);
	};
};
