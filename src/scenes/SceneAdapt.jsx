import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from '../animations/gsap.js'
import SiteRestaurant from '../site/SiteRestaurant.jsx'
import SiteSalon from '../site/SiteSalon.jsx'
import SiteDental from '../site/SiteDental.jsx'
import { FrameChrome } from '../components/BrowserFrame.jsx'
import { adapt, brand as studio, restaurant, salon, dental } from '../site/content.js'
import withStop from '../components/withStop.jsx'
import './SceneAdapt.css'

// In the order of the story; `brand` names the study's tokens (data-brand)
// and the jump target of its card in the opening's fan.
const STUDIES = [
  { brand: 'restaurant', Site: SiteRestaurant, content: restaurant, label: 'ein Restaurant' },
  { brand: 'salon', Site: SiteSalon, content: salon, label: 'einen Barbershop' },
  { brand: 'dental', Site: SiteDental, content: dental, label: 'eine Zahnarztpraxis' },
]

// The studies are laid out for a frame at least this wide (their type has
// pixel floors). A narrower frame (small laptop window, tablet) shows the
// same layout, scaled down as a whole, instead of one that collides.
const MIN_SITE_W = 940

function useFitToFrame(ref) {
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const pages = [...root.querySelectorAll('.adapt__page')]
    const desktop = window.matchMedia('(min-width: 768px)')
    let frame = 0

    const fit = () => {
      let changed = false
      pages.forEach((page) => {
        const site = page.querySelector('.adapt__site')
        const w = page.clientWidth
        const scale = desktop.matches && w > 0 && w < MIN_SITE_W ? w / MIN_SITE_W : 1
        if (scale === 1) {
          if (page.hasAttribute('data-fit')) {
            page.removeAttribute('data-fit')
            page.style.removeProperty('--fit-s')
            site.style.removeProperty('height')
            changed = true
          }
          return
        }
        // The scaled study takes up its scaled height in the page.
        page.setAttribute('data-fit', '')
        page.style.setProperty('--fit-s', scale)
        const height = `${Math.round(site.firstElementChild.offsetHeight * scale)}px`
        if (site.style.height !== height) {
          site.style.height = height
          changed = true
        }
      })
      if (changed) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => ScrollTrigger.refresh())
      }
    }

    const ro = new ResizeObserver(fit)
    pages.forEach((page) => ro.observe(page))
    desktop.addEventListener('change', fit)
    fit()
    return () => {
      ro.disconnect()
      desktop.removeEventListener('change', fit)
      cancelAnimationFrame(frame)
    }
  }, [ref])
}

/**
 * Scene 05: Adapt. Viktor's line, then the three businesses one below the
 * other, each in its own browser frame under its context line. Every
 * website builds itself in its own order as it comes up from below
 * (adaptTimeline.js): what a restaurant shows first is not what a
 * practice shows first.
 */
export default function SceneAdapt() {
  const content = useRef(null)
  useFitToFrame(content)
  return (
    <section className="scene scene--adapt" aria-labelledby="adapt-title">
      <h2 id="adapt-title" className="adapt__message">
        <span className="adapt__message-a">Jede Branche ist anders.</span>{' '}
        <span className="adapt__message-b">
          <span aria-hidden="true">→ </span>
          {withStop('Ihre Website sollte es auch sein.')}
        </span>
        <span className="adapt__message-sub">{adapt.sub}</span>
      </h2>

      <div className="adapt__content" ref={content}>
        {STUDIES.map(({ brand, Site, content, label }) => (
          <div
            className={`adapt__layer adapt__layer--${brand}`}
            data-brand={brand}
            role="group"
            aria-label={`Designstudie von ${studio.name}: Website für ${label}`}
            key={brand}
          >
            <p className="adapt__context">
              {studio.name} <span aria-hidden="true">—</span> {content.context}
            </p>
            <div className="adapt__page">
              <FrameChrome />
              <div className="adapt__site">
                <div className="adapt__fit">
                  <Site />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
