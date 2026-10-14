import { useEffect, useState } from 'react'
import { hero } from '../site/content.js'
import './ScrollNudge.css'

const PAUSE = 2000
const THUMB_MIN = 48 // ::-webkit-scrollbar-thumb min-height (base.css)

/**
 * "Weiterscrollen": appears when a visitor stops inside the pinned scroll
 * story, so a still frame doesn't read as the end of the page. Gone again
 * on the next scroll. Not with reduced motion: there the page scrolls as
 * plain sections.
 *
 * With a visible scrollbar (desktop) the hint sits beside its thumb and
 * points down the track; without one (phones) it stays centred at the
 * bottom edge.
 */
export default function ScrollNudge() {
  const [thumbY, setThumbY] = useState(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0

    // Past the opening, and the pinned stage still fills the screen.
    const inStory = () => {
      const spacer = document.querySelector('.stage')?.parentElement
      if (!spacer) return false
      const { bottom } = spacer.getBoundingClientRect()
      return window.scrollY > window.innerHeight * 0.25 && bottom > window.innerHeight * 1.5
    }

    // Centre of the scrollbar thumb, or null when there is no scrollbar.
    // Measured once per pause, never while scrolling.
    const thumbCentre = () => {
      const root = document.documentElement
      if (window.innerWidth - root.clientWidth < 4) return null
      const view = root.clientHeight
      const max = root.scrollHeight - view
      if (max <= 0) return null
      const thumb = Math.max(THUMB_MIN, (view * view) / root.scrollHeight)
      return (window.scrollY / max) * (view - thumb) + thumb / 2
    }

    const hide = () => {
      setShown(false)
      clearTimeout(timer)
    }

    const onScroll = () => {
      hide()
      timer = setTimeout(() => {
        if (!inStory()) return
        setThumbY(thumbCentre())
        setShown(true)
      }, PAUSE)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', hide)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className="nudge"
      data-shown={shown || undefined}
      data-at-thumb={thumbY !== null || undefined}
      style={thumbY !== null ? { '--thumb-y': `${thumbY}px` } : undefined}
      aria-hidden="true"
    >
      {hero.nudge}
      <svg className="nudge__arrow" viewBox="0 0 12 18" width="10" height="15">
        <path d="M6 1v15M1.5 11.5 6 16l4.5-4.5" />
      </svg>
    </div>
  )
}
