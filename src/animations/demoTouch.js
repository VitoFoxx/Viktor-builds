// The rows of the design studies that can be picked, one per list.
const PICKABLE = '.site-facts__item, .r-menu__item, .s-price, .d-need'

/**
 * A click (or tap) on a row of a study picks it, as on the real website;
 * a second click lets it go. Styles in site/interactive.css.
 */
export function enableDemoTouch(root) {
  const onClick = (event) => {
    const row = event.target.closest(PICKABLE)
    if (!row || !root.contains(row)) return
    const picked = !row.classList.contains('is-picked')
    row.parentElement.querySelectorAll(':scope > .is-picked').forEach((el) => el.classList.remove('is-picked'))
    row.classList.toggle('is-picked', picked)
  }
  root.addEventListener('click', onClick)
  return () => {
    root.removeEventListener('click', onClick)
    root.querySelectorAll(PICKABLE).forEach((el) => el.classList.remove('is-picked'))
  }
}
