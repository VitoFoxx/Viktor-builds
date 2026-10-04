/**
 * Art-directed image: landscape crop on desktop, portrait crop on mobile.
 * `image` is an entry of media.js.
 */
export default function SiteImage({ image, sizes = '100vw', eager = false, className }) {
  const { desktop, mobile, alt, focus } = image
  return (
    <picture className={className}>
      <source
        media="(max-width: 767.98px)"
        srcSet={mobile.srcSet || mobile.src}
        sizes={sizes}
        width={mobile.width}
        height={mobile.height}
      />
      <img
        src={desktop.src}
        srcSet={desktop.srcSet}
        sizes={desktop.srcSet ? sizes : undefined}
        width={desktop.width}
        height={desktop.height}
        alt={alt}
        style={{ objectPosition: focus }}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
