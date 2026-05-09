import { Studio } from './Studio'
import { viewport as studioViewport } from 'next-sanity/studio'

export { metadata } from 'next-sanity/studio'
export const viewport = { ...studioViewport, interactiveWidget: 'resizes-content' }

export default function StudioPage() {
  return <Studio />
}
