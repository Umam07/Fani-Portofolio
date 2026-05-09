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
      name: 'image',
      title: 'Gambar Project',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'year',
      title: 'Tahun',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Durasi',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Peran (Role)',
      type: 'string',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
    }),
    defineField({
      name: 'tags',
      title: 'Tags Utama',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Semua Teknologi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'docLink',
      title: 'Link Dokumentasi',
      type: 'url',
    }),
  ],
})
