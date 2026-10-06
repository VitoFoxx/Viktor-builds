import { media } from './media.js'

/**
 * Every demo-site image goes through here, by its media.js path. Fills its parent (which sets
 * the size). Without a photo it renders a neutral, clearly labelled
 * placeholder: no drawing, no pattern, nothing that pretends to be a photo.
 */
export default function SitePhoto({ name, sizes = '100vw', priority = false, className = '' }) {
  // name = '<branche>.<slot>', see media.js
  const shot = name.split('.').reduce((group, key) => group[key], media)
  const { desktop, mobile } = shot

  if (!desktop.src) {
    return (
      <div className={`site-photo site-photo--placeholder ${className}`} role="img" aria-label={shot.alt}>
        <span className="site-photo__id">IMAGE / {shot.id}</span>
        <span className="site-photo__motif">
          {shot.motif} · {shot.format}
        </span>
      </div>
    )
  }

  const small = mobile.src ? mobile : desktop
  return (
    <picture>
      <source media="(max-width: 767.98px)" srcSet={small.srcSet ?? small.src} sizes={sizes} />
      <img
        className={`site-photo ${className}`}
        src={desktop.src}
        srcSet={desktop.srcSet}
        sizes={sizes}
        width={desktop.width}
        height={desktop.height}
        alt={shot.alt}
        style={{ objectPosition: shot.focus }}
        // Eager: the demo lives inside the pinned stage, where lazy loading
        // would only start once the photo is already on screen.
        loading="eager"
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  )
}
