import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { testimonialType } from './testimonialType'
import { articleType } from './articleType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, testimonialType, articleType],
}
