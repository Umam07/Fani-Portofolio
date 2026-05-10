import { defineField, defineType } from 'sanity'
import { CommentIcon, UserIcon, HeartIcon } from '@sanity/icons'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: CommentIcon,
  groups: [
    { name: 'person', title: 'Pemberi Testimoni' },
    { name: 'content', title: 'Isi Feedback' },
    { name: 'meta', title: 'Metadata' },
  ],
  fields: [
    // --- PERSON ---
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      group: 'person',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Jabatan / Role',
      description: 'Contoh: Senior UI/UX Designer',
      type: 'string',
      group: 'person',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Perusahaan',
      type: 'string',
      group: 'person',
    }),
    defineField({
      name: 'image',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'person',
    }),

    // --- CONTENT ---
    defineField({
      name: 'content',
      title: 'Feedback / Pendapat',
      description: 'Tuliskan kutipan testimoni di sini.',
      type: 'text',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating Bintang',
      description: 'Pilih antara 1 sampai 5 bintang.',
      type: 'number',
      group: 'content',
      initialValue: 5,
      validation: (rule) => rule.min(1).max(5),
    }),

    // --- META ---
    defineField({
      name: 'relationship',
      title: 'Hubungan Kerja',
      description: 'Contoh: "Atasan Langsung" atau "Rekan Satu Tim"',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Testimoni',
      type: 'date',
      group: 'meta',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Link Profile LinkedIn',
      type: 'url',
      group: 'meta',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      rating: 'rating',
      media: 'image',
    },
    prepare({ title, subtitle, rating, media }) {
      return {
        title,
        subtitle: `${subtitle || ''} (${rating} stars)`,
        media: media || UserIcon,
      }
    },
  },
})
