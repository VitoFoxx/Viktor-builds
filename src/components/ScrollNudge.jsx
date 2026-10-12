import { useEffect, useState } from 'react'
import { hero } from '../site/content.js'
import './ScrollNudge.css'

const PAUSE = 3000

/**
 * "Weiterscrollen": appears when a visitor stops inside the pinned scroll
 * story, so a still frame doesn't read as the end of the page. Gone again
 * on the next scroll. Not with reduced motion: there the page scrolls as
 * plain sections.
 */
export default function ScrollNudge() {
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

    const onScroll = () => {
      setShown(false)
      clearTimeout(timer)
      timer = setTimeout(() => setShown(inStory()), PAUSE)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="nudge" data-shown={shown || undefined} aria-hidden="true">
      {hero.nudge}
      <svg className="nudge__arrow" viewBox="0 0 12 18" width="10" height="15">
        <path d="M6 1v15M1.5 11.5 6 16l4.5-4.5" />
      </svg>
    </div>
  )
}
