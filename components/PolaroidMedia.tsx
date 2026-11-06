import Image from 'next/image'
import type { Media } from '@/lib/projects'

/**
 * The photo or clip inside a polaroid. Photos are resized to the polaroid by next/image.
 * `onHover`: the home list's polaroids only show while their row is hovered, so their clips don't autoplay and
 * don't load until the page knows it has a mouse (components/PageEffects.tsx plays them on hover).
 */
export function PolaroidMedia({ media, sizes, onHover = false }: { media: Media; sizes: string; onHover?: boolean }) {
  if (media.kind === 'img') return <Image src={media.src} alt={media.alt} sizes={sizes} />
  return onHover ? (
    <video src={media.src} poster={media.poster} width={media.w} height={media.h} muted loop playsInline preload="none" />
  ) : (
    <video src={media.src} poster={media.poster} width={media.w} height={media.h} autoPlay muted loop playsInline preload="auto" />
  )
}
