import { gsap } from './gsap.js'
import { along, rise, comeUp } from './along.js'

const PUSH = { duration: 0.55, ease: 'power3.inOut' }

/**
 * Scene 06: Business (SceneBusiness.jsx). The scene comes up from below
 * like every other; then `.business__pin` (CSS sticky) holds it for the
 * length of `.business__hold`, the one place of the page that stands
 * still, because a phone has to hold still to be used. Then it moves on
 * upwards.
 *
 *   arrive   (coming up) A WEBSITE CAN DO MORE, the evening: DI 21:47,
 *            the practice's site reads "closed" … THAN LOOK GOOD.
 *   request  (holding) three short steps, each pushed in on the phone
 *            as on a real one; the visitor may answer them
 *   sent     the request in four lines
 *   morning  MI 07:30: the phone is put away, the practice finds the
 *            request as an entry (desktop: beside the phone; mobile: it
 *            follows below, once the scene moves on)
 */
export function addBusiness(q, { isDesktop }) {
  const scene = q('.scene--business')[0]
  const device = q('.business__device')[0]
  const phone = (selector) => device.querySelector(selector)
  const phoneAll = (selector) => [...device.querySelectorAll(selector)]
  const pages = phoneAll('.pd-page')
  const labels = phoneAll('.pd-bar__label')
  const progress = phone('.pd-progress')

  // The start: the practice's start page, open today. (The markup's own
  // state is the sent request, which reduced motion shows.)
  gsap.set(pages, { autoAlpha: 0 })
  gsap.set([pages[0], phone('.pd-bar'), phone('.pd-status__today')], { autoAlpha: 1 })

  /* ── arrive: while the scene comes up ─────────────────── */

  const lineIn = (tl, targets, at) =>
    tl.fromTo(targets, { autoAlpha: 1, ...rise()[0] }, { ...rise()[1], duration: 0.6, stagger: 0.08 }, at)
  const lineOut = (tl, targets, at) =>
    tl.to(targets, { yPercent: -110, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, at)

  const arrive = along(scene, 'top 92%', 'top top')
  arrive
    .fromTo(q('.business__message-a'), ...comeUp({ duration: 0.6 }), 0)
    .fromTo(q('.business__message-b'), ...comeUp({ duration: 0.6 }), 0.9)
  lineIn(arrive, q('.time__mark--evening .time__mask > *'), 0.7)
  // The site itself knows the practice is closed.
  lineOut(arrive, phone('.pd-status__today'), 1.1)
  lineIn(arrive, phone('.pd-status__today--closed'), 1.3)
  arrive.to({}, { duration: 0.2 })

  /* ── hold: the request ────────────────────────────────── */

  const tl = along(scene, 'top top', 'bottom bottom', undefined, { endTrigger: q('.business__hold')[0] })

  // A tap on the bar: it darkens for a moment.
  const press = (at) =>
    tl
      .to(phone('.pd-bar__press'), { autoAlpha: 1, duration: 0.08 }, at)
      .to(phone('.pd-bar__press'), { autoAlpha: 0, duration: 0.25, ease: 'power1.out' }, at + 0.08)
  // The next step slides in as on a phone.
  const push = (i, at) => {
    tl.set(pages[i], { autoAlpha: 1 }, at)
      .fromTo(pages[i], { xPercent: 100 }, { xPercent: 0, ...PUSH }, at)
      .to(pages[i - 1], { xPercent: -100, ...PUSH }, at)
      .set(pages[i - 1], { autoAlpha: 0 }, at + PUSH.duration)
    if (i < labels.length) {
      lineOut(tl, labels[i - 1], at)
      lineIn(tl, labels[i], at + 0.15)
    }
  }
  // The picked answer's dot (whichever the visitor picked, see visitorChoice.js).
  const pick = (list, at) => tl.fromTo(list, { '--pick': 0 }, { '--pick': 1, duration: 0.3, ease: 'power3.out' }, at)
  const onAccent = getComputedStyle(phone('[data-brand]')).getPropertyValue('--brand-on-accent').trim()
  const choose = (option, at) =>
    tl
      .fromTo(option.querySelector('.pd-choice__fill'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, at)
      .to(option.querySelector('.pd-choice__label'), { color: onAccent, duration: 0.25 }, at)

  const STEP = 1.0
  const t0 = 0.2
  // While the request is open, the visitor may answer it: one quiet line.
  tl.fromTo(q('.time__hint'), ...comeUp({ duration: 0.4 }, 8), t0)

  // The appointment bar → 1 of 3: the concern.
  press(t0)
  push(1, t0 + 0.1)
  tl.fromTo(progress, { autoAlpha: 1, scaleX: 0 }, { scaleX: 1 / 3, ...PUSH }, t0 + 0.1)
  pick(pages[1].querySelector('.pd-options'), t0 + 0.75)

  // → 2 of 3: new here, statutory insurance.
  const t1 = t0 + STEP
  press(t1)
  push(2, t1 + 0.1)
  tl.to(progress, { scaleX: 2 / 3, ...PUSH }, t1 + 0.1)
  const [returning, insurance] = pages[2].querySelectorAll('.pd-choice')
  choose(returning.querySelectorAll('.pd-choice__option')[1], t1 + 0.75)
  choose(insurance.querySelectorAll('.pd-choice__option')[0], t1 + 0.95)

  // → 3 of 3: as early as possible, call back on this number.
  const t2 = t1 + STEP + 0.05
  press(t2)
  push(3, t2 + 0.1)
  tl.to(progress, { scaleX: 1, ...PUSH }, t2 + 0.1)
  pick(pages[3].querySelector('.pd-options'), t2 + 0.75)
  tl.fromTo(
    phone('.pd-field__value'),
    { clipPath: 'inset(0% 100% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35, ease: 'power2.out' },
    t2 + 0.95,
  )

  // Send: the bar leaves downwards, the request is confirmed in four lines.
  const t3 = t2 + STEP
  press(t3)
  tl.to(q('.time__hint'), { autoAlpha: 0, duration: 0.3 }, t3)
  push(4, t3 + 0.1)
  tl.to(phone('.pd-bar'), { yPercent: 100, duration: 0.45, ease: 'power2.in' }, t3 + 0.15)
    .to(progress, { autoAlpha: 0, duration: 0.3 }, t3 + 0.35)
    .fromTo(
      phoneAll('.pd-sent__line, .pd-sent__text, .pd-summary__row'),
      ...comeUp({ duration: 0.5, stagger: 0.07 }, 8),
      t3 + 0.45,
    )

  /* ── morning: 07:30, the entry is there ───────────────── */

  const t4 = t3 + 1.5
  lineOut(tl, q('.time__mark--evening .time__mask > *'), t4)
  lineIn(tl, q('.time__mark--morning .time__mask > *'), t4 + 0.25)
  tl.fromTo(phone('.device__dim'), { autoAlpha: 0 }, { autoAlpha: 0.84, duration: 1.1, ease: 'power1.inOut' }, t4)

  if (isDesktop) {
    // Beside the phone, line by line.
    tl.fromTo(q('.entry__head'), ...comeUp({ duration: 0.5 }, 16), t4 + 0.4)
      .fromTo(q('.entry__row'), ...comeUp({ duration: 0.6, stagger: 0.12 }, 16), t4 + 0.6)
      // It stands a moment before the scene moves on.
      .to({}, { duration: 0.6 })
  } else {
    tl.to({}, { duration: 0.3 })
    // Below the phone: comes up as the scene moves on.
    const entry = q('.business__entry')[0]
    along(entry, 'top 95%', 'top 60%')
      .fromTo(q('.entry__head'), ...comeUp({ duration: 0.5 }, 16), 0)
      .fromTo(q('.entry__row'), ...comeUp({ duration: 0.6, stagger: 0.12 }, 16), 0.2)
  }
}
