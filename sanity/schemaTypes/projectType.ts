import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Project',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Project',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Gambar Project',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Teknologi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
