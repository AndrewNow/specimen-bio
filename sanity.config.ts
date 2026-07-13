import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes, singletonTypes} from './studio-specimen-bio/schemaTypes'
import {structure} from './studio-specimen-bio/structure'

/**
 * Studio config used by the Astro-embedded Studio at `/studio`.
 * Schemas live in `studio-specimen-bio/` so the standalone studio package
 * and the site stay in sync.
 */
export default defineConfig({
	name: 'default',
	title: 'Specimen Bio',

	projectId: 'gos2rlzf',
	dataset: 'production',

	plugins: [structureTool({structure}), visionTool()],

	schema: {
		types: schemaTypes,
		templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
	},

	document: {
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(
						({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action),
					)
				: input,
		newDocumentOptions: (prev, {creationContext}) =>
			creationContext.type === 'global'
				? prev.filter((template) => !singletonTypes.has(template.templateId))
				: prev,
	},
})
