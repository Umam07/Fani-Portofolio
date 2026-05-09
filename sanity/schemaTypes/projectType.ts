import { defineField, defineType } from 'sanity'
import { RocketIcon, DocumentTextIcon, ImageIcon, LinkIcon } from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: 'Project Portfolio',
  type: 'document',
  icon: RocketIcon,
  groups: [
    { name: 'main', title: 'Info Utama' },
    { name: 'content', title: 'Konten & Detail' },
    { name: 'media', title: 'Media' },
    { name: 'links', title: 'Link & Teknis' },
  ],
  fields: [
    // --- INFO UTAMA ---
    defineField({
      name: 'title',
      title: 'Judul Project',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan',
      description: 'Semakin kecil angkanya (misal 1), semakin di depan/atas tampilannya.',
      type: 'number',
      group: 'main',
      initialValue: 100,
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'main',
      validation: (rule) => rule.required(),
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'client',
      title: 'Klien',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'year',
      title: 'Tahun',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'duration',
      title: 'Durasi',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'role',
      title: 'Peran (Role)',
      type: 'string',
      group: 'main',
    }),

    // --- MEDIA ---
    defineField({
      name: 'image',
      title: 'Gambar Utama',
      description: 'Gambar ini akan muncul di halaman utama (Thumbnail).',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    // --- KONTEN ---
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      description: 'Muncul di kartu project (maksimal 2 baris).',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Project Overview',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      group: 'content',
    }),

    // --- LINKS & TEKNIS ---
    defineField({
      name: 'technologies',
      title: 'Teknologi yang Digunakan',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'links',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'docLink',
      title: 'Link Dokumentasi / Live Demo',
      type: 'url',
      group: 'links',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ? `[${order}] ` : ''}${title}`,
        subtitle: subtitle ? `Client: ${subtitle}` : 'Personal Project',
        media,
      }
    },
  },
})
