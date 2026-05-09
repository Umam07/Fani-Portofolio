import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, testimonialType],
}
