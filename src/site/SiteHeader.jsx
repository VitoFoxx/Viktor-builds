import SiteNav from './SiteNav.jsx'

/**
 * Fixed company header. It takes over from the hero navigation at the exact
 * moment the stage unpins (experienceTimeline.js → createHeader), so the
 * visitor is now scrolling a real company website with a sticky nav.
 */
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <SiteNav />
      </div>
    </header>
  )
}
