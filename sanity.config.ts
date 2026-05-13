import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/cms'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId: 'cb7zixhl',
  dataset: 'production',
  
  // This is the important part for embedding!
  basePath: '/admin',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
