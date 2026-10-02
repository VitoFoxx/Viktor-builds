import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Mobile browsers resize the viewport when the URL bar shows/hides.
// Ignoring that avoids a jump of the pinned stage mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true })

// The sequence is designed to start at the top. Browsers restore the old
// scroll position before the pin exists, which lands inconsistently.
ScrollTrigger.clearScrollMemory('manual')

export { gsap, ScrollTrigger, useGSAP }
