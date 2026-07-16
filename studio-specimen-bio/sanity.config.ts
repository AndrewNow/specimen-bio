import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {StudioLogo} from './components/StudioLogo'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Specimen Bio',
  icon: StudioLogo,

  projectId: 'gos2rlzf',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Singletons are created via the desk structure, not the "new document" menu.
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Prevent editors from duplicating, deleting, or unpublishing singletons.
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
