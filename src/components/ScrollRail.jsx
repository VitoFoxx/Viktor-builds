import { useRef, useState } from 'react'
import { ScrollTrigger, useGSAP } from '../animations/gsap.js'
import { CHAPTERS, chapterPositions } from '../animations/chapters.js'
import './ScrollRail.css'

// Element chapters count as reached a little before their top meets the
// top of the screen, when they fill most of it.
const LEAD = 0.35

// Rail position (0–1) of a scroll position and back. The chapters sit at
// equal steps, so a long chapter (the pinned stage) does not crowd the
// rest; between two marks the line fills linearly.
function toRail(y, tops, max) {
  const n = tops.length
  for (let i = n - 1; i >= 0; i--) {
    if (y >= tops[i]) {
      const next = i + 1 < n ? tops[i + 1] : max
      const f = next > tops[i] ? Math.min(1, (y - tops[i]) / (next - tops[i])) : 1
      return (i + f) / n
    }
  }
  return 0
}

function fromRail(r, tops, max) {
  const n = tops.length
  const i = Math.min(n - 1, Math.floor(r * n))
  const next = i + 1 < n ? tops[i + 1] : max
  return tops[i] + (r * n - i) * (next - tops[i])
}

/**
 * The page's scrollbar as part of the design: a rail at the right edge
 * with the chapters as marks at equal steps. The red line fills with the
 * visitor's progress; the current chapter is named, all of them on hover
 * or focus.
 * Click a mark to jump there, or drag along the rail to scrub the page.
 * Its tone follows the page (html[data-tone], IntroStage.jsx).
 */
export default function ScrollRail() {
  const rail = useRef(null)
  const fill = useRef(null)
  const [active, setActive] = useState(0)
  const positions = useRef([])

  useGSAP(
    () => {
      let reach = []
      const measure = () => {
        positions.current = chapterPositions()
        reach = positions.current.map((top, i) =>
          i > 0 && !CHAPTERS[i].label ? top - window.innerHeight * LEAD : top,
        )
      }
      const draw = (y) => {
        const r = toRail(y, positions.current, ScrollTrigger.maxScroll(window))
        fill.current.style.transform = `scaleY(${r})`
      }

      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          draw(self.scroll())
          const y = self.scroll() + 1
          let i = 0
          while (i + 1 < reach.length && reach[i + 1] <= y) i++
          setActive(i)
        },
        onRefresh: (self) => {
          measure()
          draw(self.scroll())
        },
      })
      measure()

      return () => st.kill()
    },
    { scope: rail },
  )

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const jump = (i) =>
    window.scrollTo({ top: positions.current[i], behavior: reduced() ? 'auto' : 'smooth' })

  // Drag along the rail: the page follows the pointer.
  const scrub = (event) => {
    const box = event.currentTarget.getBoundingClientRect()
    const r = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height))
    const max = ScrollTrigger.maxScroll(window)
    window.scrollTo(0, r >= 1 ? max : fromRail(r, positions.current, max))
  }
  const onPointerDown = (event) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    scrub(event)
  }
  const onPointerMove = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) scrub(event)
  }

  return (
    <nav className="rail" ref={rail} aria-label="Kapitel der Seite">
      <div
        className="rail__track"
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div className="rail__fill" ref={fill} />
      </div>
      <ol className="rail__marks">
        {CHAPTERS.map((chapter, i) => (
          <li className="rail__item" key={chapter.name} style={{ top: `${(i / CHAPTERS.length) * 100}%` }}>
            <button
              type="button"
              className="rail__mark"
              aria-current={i === active ? 'step' : undefined}
              data-passed={i < active || undefined}
              onClick={() => jump(i)}
            >
              <span className="rail__label">
                <span className="rail__num">{String(i + 1).padStart(2, '0')}</span> {chapter.name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
