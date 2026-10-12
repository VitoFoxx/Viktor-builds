/**
 * The page's chapters, for the scroll rail (ScrollRail.jsx). Inside the
 * pinned stage a chapter is a moment of the master timeline (`label`);
 * after it, or without motion, it is an element (`target`).
 */
export const CHAPTERS = [
  { name: 'Start', label: 'hero', target: '.scene--void' },
  { name: 'Idee', label: 'plan', target: '.scene--interface' },
  { name: 'Beispiel', label: 'arrive', target: '#beispiele' },
  { name: 'Branchen', label: 'adapt', target: '.scene--adapt' },
  { name: 'Wirkung', label: 'business', target: '.scene--business' },
  { name: 'Sichtbarkeit', target: '.visibility' },
  { name: 'Leistungen', target: '#leistungen' },
  { name: 'Ablauf', target: '#ablauf' },
  { name: 'Kontakt', target: '#kontakt' },
]

// The stage's ScrollTrigger while the motion layout is active (IntroStage.jsx).
let stage = null
export const registerStage = (st) => (stage = st)

/** Scroll position of each chapter, measured after a ScrollTrigger refresh. */
export function chapterPositions() {
  return CHAPTERS.map(({ label, target }) => {
    if (stage && label && stage.animation?.labels[label] !== undefined) {
      return label === 'hero' ? 0 : stage.labelToScroll(label)
    }
    const el = document.querySelector(target)
    return el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY) : 0
  })
}
