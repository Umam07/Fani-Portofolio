import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // 1. Informasi Utama
    defineField({
      name: 'title',
      title: 'Judul Project',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Klien',
      type: 'string',
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

    // 2. Visual
    defineField({
      name: 'image',
      title: 'Gambar Project',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    // 3. Konten / Deskripsi
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat (Card)',
      type: 'text',
      validation: (rule) => rule.required(),
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

    // 4. Teknis & Link
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
