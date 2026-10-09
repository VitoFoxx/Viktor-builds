/**
 * Scene 07: Result. Appended to the master timeline at `businessEnd`,
 * where BUSINESS left the dark phone between the morning and the entry.
 * The last scene of the pinned stage; the contact area follows in the
 * normal page flow (SceneResult.jsx).
 *
 * Labels (seconds after `businessEnd`):
 *   result     0.0   the story steps back: line, time, entry and the small
 *                    call to action leave, the phone empties, the context
 *                    line counts on to WEBSITE 05 / IHR UNTERNEHMEN
 *   reframe    0.35  the empty phone becomes Scene 02's browser frame
 *   address    1.7   the frame contracts onto its address, ihr-unternehmen.de,
 *                    in the middle of the stage
 *   claim      3.2   VITOWORKS / the closing claim: the brand in display
 *                    type, centred on the stage
 *   resultEnd  4.55 + rest: the pin releases into the contact area
 *
 * Calmer than ADAPT and BUSINESS on purpose: one thing moves at a time.
 */
export function addResult(tl, stage, q, { isDesktop, device }) {
  const layer = q('.scene--business')[0]
  const phone = q('.business__device')[0]
  const words = q('.void__word')
  const tagline = q('.void__tagline')[0]
  const contexts = q('.context__item')
  const tokens = getComputedStyle(stage)
  const surface = tokens.getPropertyValue('--c-surface').trim()
  const fg = tokens.getPropertyValue('--c-fg').trim()

  /* ── result: the story steps back ─────────────────────── */

  tl.addLabel('result', 'businessEnd')
    .to(
      q('.business__message, .business__time, .business__entry, .business__cta'),
      { autoAlpha: 0, duration: 0.5, ease: 'power1.in' },
      'result',
    )
    .to(q('.device__site, .device__clock'), { autoAlpha: 0, duration: 0.4, ease: 'power1.in' }, 'result+=0.05')
    // The next website is the visitor's.
    .to(contexts[contexts.length - 2], { yPercent: -110, duration: 0.5, ease: 'power2.in' }, 'result+=0.15')
    .fromTo(
      contexts[contexts.length - 1],
      { autoAlpha: 1, yPercent: 110 },
      { yPercent: 0, duration: 0.5, ease: 'power2.out', immediateRender: false },
      'result+=0.5',
    )

  /* ── frame: phone → browser frame ─────────────────────── */

  tl.addLabel('reframe', 'result+=0.35')
  device.toFrame('reframe')
  // The screen darkens under the dim first, then the dim lifts: no flash.
  tl.to(q('.device__ground'), { backgroundColor: surface, duration: 0.35, ease: 'power1.inOut' }, 'result').to(
    q('.device__dim'),
    { autoAlpha: 0, duration: 0.6, ease: 'power1.inOut' },
    'reframe',
  )
  // Mobile: the phone had made room for the entry.
  if (!isDesktop) tl.to(phone, { scale: 1, y: 0, duration: 1.1, ease: 'power3.inOut' }, 'reframe')

  /* ── address: the frame contracts onto ihr-unternehmen.de ─ */

  tl.addLabel('address', 'reframe+=1.35')
  device.toAddress('address', isDesktop ? 2.2 : 2, { duration: 1.2, ease: 'power3.inOut' })
  tl.to(q('.device__url'), { color: fg, duration: 0.8, ease: 'power1.inOut' }, 'address+=0.4')

  /* ── claim: the beginning, read again ─────────────────── */

  tl.addLabel('claim', 'address+=1.5')
    .to([phone, q('.experience__context')[0]], { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 'claim')
    .set(layer, { autoAlpha: 0 }, 'claim+=0.5')
    // The brand and the closing claim, centred on the dark stage.
    .set(words, { autoAlpha: 1 }, 'claim+=0.3')
    .set(q('.void__word-inner'), { yPercent: 110 }, 'claim+=0.3')
    .to(q('.void__word-inner'), { yPercent: 0, duration: 1.0, stagger: 0.09, ease: 'power4.out' }, 'claim+=0.3')
    .fromTo(
      tagline,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', immediateRender: false },
      'claim+=0.75',
    )
    // It stands for a moment before the page continues.
    .to({}, { duration: 1.0 })
    .addLabel('resultEnd')
}
