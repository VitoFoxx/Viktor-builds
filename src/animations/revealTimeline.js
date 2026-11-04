import { gsap } from './gsap.js'

/**
 * The part after the pinned stage (Scene 07, normal page flow) keeps the
 * stage's vocabulary instead of turning into a plain page: headlines rise
 * from below a mask, rules draw themselves, the figures count up, and the
 * offer and the steps are built as in Scene 02: grey placeholder lines
 * first, then the text takes their place.
 *
 * Each group plays once, when it comes into view; scrolling back leaves it
 * standing. Reduced motion: nothing here runs (SceneResult.jsx).
 */
export function createReveals(q) {
  const once = (trigger, start = 'top 82%') =>
    gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger, start, once: true } })

  // A headline rises from its baseline, as the lines over the stage do.
  const rise = (tl, targets, at = 0) =>
    tl.fromTo(
      targets,
      { clipPath: 'inset(100% 0% 0% 0%)', y: '0.35em' },
      { clipPath: 'inset(0% 0% -10% 0%)', y: 0, duration: 1.0, stagger: 0.08, ease: 'power3.out' },
      at,
    )
  const fadeUp = (tl, targets, at, stagger = 0.06) =>
    tl.fromTo(targets, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger }, at)

  // Grey lines where the text will be (CSS ::before, --bar), then the
  // text arrives and the lines give way.
  const build = (tl, items, at, { rule, parts }) => {
    items.forEach((item, i) => {
      const t = at + i * 0.12
      const text = item.querySelectorAll(parts)
      if (rule) tl.fromTo(item, { '--rule': 0 }, { '--rule': 1, duration: 0.7, ease: 'power2.inOut' }, t)
      tl.fromTo(text, { '--bar': 0 }, { '--bar': 1, duration: 0.5, stagger: 0.08, ease: 'power2.inOut' }, t + 0.15)
      text.forEach((el, j) => {
        // The text's own colour, read before it is hidden.
        const color = getComputedStyle(el).color
        tl.fromTo(el, { color: 'transparent' }, { color, duration: 0.45, ease: 'power1.out', clearProps: 'color' }, t + 0.6 + j * 0.08)
      })
      tl.to(text, { '--bar-o': 0, duration: 0.45, stagger: 0.08, ease: 'power1.out' }, t + 0.6)
    })
  }

  /* ── Sichtbarkeit ─────────────────────────────────────── */
  {
    const tl = once(q('.visibility')[0])
    fadeUp(tl, q('.visibility__label'), 0)
    rise(tl, q('.visibility__title'), 0.05)
    fadeUp(tl, q('.visibility__lead'), 0.35)
  }
  {
    const facts = q('.fact')
    const tl = once(q('.visibility__facts')[0], 'top 85%')
    facts.forEach((fact, i) => {
      const t = i * 0.14
      const num = fact.querySelector('.fact__num')
      const value = Number(num.textContent)
      const counter = { v: 0 }
      tl.fromTo(fact, { '--rule': 0 }, { '--rule': 1, duration: 0.8, ease: 'power2.inOut' }, t)
        .fromTo(fact.querySelector('.fact__value'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, t + 0.2)
        .fromTo(
          counter,
          { v: 0 },
          {
            v: value,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => (num.textContent = Math.round(counter.v)),
            onComplete: () => (num.textContent = value),
          },
          t + 0.2,
        )
      fadeUp(tl, fact.querySelectorAll('.fact__text, .fact__source'), t + 0.55, 0.08)
    })
  }

  /* ── Über mich ────────────────────────────────────────── */
  {
    const tl = once(q('.result__intro')[0])
    fadeUp(tl, q('.result__eyebrow'), 0)
    rise(tl, q('.result__title'), 0.05)
    tl.fromTo(
      q('.result__portrait'),
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' },
      0.3,
    ).fromTo(q('.result__portrait img'), { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0.3)
    fadeUp(tl, q('.result__name-line, .result__lead'), 0.6, 0.1)
  }

  /* ── Leistungen: built like the website in Scene 02 ───── */
  {
    const tl = once(q('.result__offer')[0], 'top 85%')
    build(tl, q('.offer'), 0, { rule: true, parts: '.offer__title, .offer__text' })
    tl.fromTo(q('.offer__n'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.12 }, 0.2)
    fadeUp(tl, q('.result__services'), 1.2)
  }

  /* ── Ablauf: the line runs through the four steps ─────── */
  {
    const tl = once(q('.flow')[0])
    fadeUp(tl, q('.flow__label'), 0)
    rise(tl, q('.flow__title'), 0.05)
  }
  {
    const steps = q('.flow__step')
    const tl = once(q('.flow__steps')[0], 'top 85%')
    steps.forEach((step, i) => {
      const t = i * 0.28
      tl.fromTo(step.querySelector('.flow__n'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, t)
        .fromTo(step, { '--line': 0 }, { '--line': 1, duration: 0.6, ease: 'power2.inOut' }, t + 0.15)
    })
    build(tl, steps, 0.1, { parts: '.flow__step-title, .flow__text' })
    fadeUp(tl, q('.flow__price'), 1.3)
  }

  /* ── Projekt anfragen ─────────────────────────────────── */
  {
    const tl = once(q('.request')[0])
    rise(tl, q('.request__title'), 0)
    fadeUp(tl, q('.request__text, .request__direct, .request__region'), 0.3, 0.08)
    fadeUp(tl, q('.request__form'), 0.45)
  }
}
