import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const articleType = defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'A short hook line below the title (e.g., "How Much Brutal Pain Is Left for Bitcoin?")',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Article URL',
      description: 'Link to the full article (e.g., Medium, Substack, etc.)',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isPinned',
      title: 'Pin this article',
      description: 'Pinned article will be highlighted and displayed first.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      description: 'e.g., 5 min read',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'image',
      isPinned: 'isPinned',
    },
    prepare({ title, subtitle, media, isPinned }) {
      return {
        title: `${isPinned ? '📌 ' : ''}${title}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
