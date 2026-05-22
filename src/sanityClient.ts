import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Replace these with your actual Sanity details once you create the project!
export const client = createClient({
  projectId: '0jmt9kru', // Your new Sanity Project ID!
  dataset: 'production', 
  useCdn: true, // Use Edge for fast reads
  apiVersion: '2024-03-01', // Use current date for stable API version
})

const builder = imageUrlBuilder(client)

// Helper function to easily resolve sanity image URLs within React components
export function urlFor(source: any) {
  return builder.image(source)
}
