// One way to glide to a place on the page: through the smooth scroller
// when it runs (desktop, smoothScroll.js), the browser's own otherwise.
let scroller = null

export const setScroller = (instance) => {
  scroller = instance
}

export function glideTo(y) {
  if (scroller) scroller.scrollTo(y, { duration: 2.2 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}
