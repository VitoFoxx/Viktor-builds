# VITOWORKS — ARCHITECTURE

## 1. CORE STACK

Primary technologies:

- React
- Vite
- JavaScript or TypeScript
- CSS
- SVG
- GSAP
- GSAP ScrollTrigger

Optional:

- Lenis for smooth scrolling if justified

Three.js / React Three Fiber:

Not permitted during Phase 1.

---

# 2. TECHNOLOGY DECISION HIERARCHY

Use the simplest appropriate technology.

Decision order:

### Level 1
HTML / CSS / SVG

Use this whenever possible.

### Level 2
GSAP / ScrollTrigger

Use for:

- timeline animation
- scroll-driven animation
- pinning
- sequencing
- complex transitions

### Level 3
Three.js / WebGL

Only use when genuine 3D rendering or WebGL interaction is required.

Three.js should never be introduced simply because it looks technically impressive.

---

# 3. COMPONENT ARCHITECTURE

Prefer a clear component structure.

Example:

src/
  components/
  scenes/
  animations/
  styles/
  assets/

Scenes should be separated conceptually.

Animation logic should not be unnecessarily scattered throughout unrelated components.

Use reusable components where repetition actually exists.

Avoid premature abstraction.

---

# 4. GSAP ARCHITECTURE

Use GSAP Context or equivalent cleanup mechanisms where appropriate.

Every ScrollTrigger created by a component must be properly cleaned up when the component unmounts.

Avoid uncontrolled global animations.

Prefer timelines for sequences that belong together.

Use ScrollTrigger for scroll-driven storytelling.

---

# 5. SCROLL ARCHITECTURE

Scrolling should drive the experience.

Prefer:

- scrub
- pin
- controlled timelines
- progressive transformations

Avoid:

- arbitrary scroll event handlers
- dozens of independent listeners
- animation logic that cannot be reversed

Animations must behave correctly when the visitor scrolls backward.

---

# 6. RESPONSIVE ANIMATION

Do not assume desktop animation values work on mobile.

Use responsive GSAP logic where appropriate.

Potentially simplify animation complexity on smaller screens.

The mobile experience should remain intentional rather than becoming a broken desktop layout.

---

# 7. PERFORMANCE

Prioritize performant properties:

- transform
- opacity

Use layout-affecting properties only when necessary.

Optimize:

- image sizes
- SVG complexity
- DOM size
- animation count
- JavaScript execution

Avoid unnecessary render loops.

Avoid WebGL unless justified.

---

# 8. ACCESSIBILITY

Use semantic HTML.

Support:

- keyboard interaction
- readable contrast
- meaningful structure
- reduced motion

Animations should respect:

`prefers-reduced-motion`

Reduced motion should preserve the content and hierarchy while minimizing unnecessary animation.

---

# 9. QUALITY GATES

Before considering a scene complete, verify:

### Visual
- typography
- spacing
- hierarchy
- transitions
- composition

### Interaction
- scroll forward
- scroll backward
- refresh
- resize
- mobile interaction

### Technical
- build succeeds
- no obvious console errors
- no unnecessary dependencies
- animations clean up correctly

### Performance
- no obvious jank
- no unnecessary continuous rendering
- reasonable asset sizes

---

# 10. DEVELOPMENT PROCESS

For each scene:

1. understand the intended experience
2. inspect the existing implementation
3. define the visual states
4. define the scroll timeline
5. implement
6. test forward scroll
7. test reverse scroll
8. test resize
9. test mobile
10. test reduced motion
11. fix issues
12. stop when the requested scope is complete

Do not implement future scenes prematurely.

---

# 11. THREE.JS POLICY

Three.js is optional technology, not a default requirement.

Introduce it only when the visual concept genuinely requires:

- real 3D geometry
- camera movement
- lighting
- depth
- WebGL particle systems
- complex 3D interaction

Before introducing Three.js, ask:

1. Can CSS achieve this?
2. Can SVG achieve this?
3. Can DOM + GSAP achieve this?

If yes, prefer the simpler solution.

Phase 1 explicitly excludes Three.js.
