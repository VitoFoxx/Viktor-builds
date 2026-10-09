# VITOWORKS — PROJECT RULES

## 1. PROJECT

VITOWORKS (formerly Viktor Builds) is a premium web design studio. Viktor is the person behind it.

Core idea:

> THE WEBSITE IS THE PORTFOLIO.

The website itself must demonstrate what modern web design, animation, interaction and storytelling can achieve.

The experience should feel premium, minimal, cinematic, editorial and highly intentional.

Avoid generic agency layouts and obvious AI-generated design patterns.

---

## 2. CURRENT PHASE

Current development phase:

**PHASE 1 — SCENE 01 + SCENE 02**

Only build:

- Scene 01 — The Void
- Scene 02 — From Idea to Interface
- the transition between them

Do NOT build Scene 03 or any later scene yet.

The goal is not quantity.

Two exceptional scenes are better than ten mediocre scenes.

---

## 3. TECH STACK

Primary stack:

- React
- Vite
- JavaScript or TypeScript
- CSS
- SVG
- GSAP
- GSAP ScrollTrigger

Lenis may be used if it materially improves the scrolling experience.

Three.js / React Three Fiber is NOT allowed in Phase 1.

Three.js may only be introduced later when genuine 3D/WebGL interaction is required and CSS/SVG/DOM/GSAP cannot achieve the intended result appropriately.

Do not add dependencies without a clear technical reason.

---

## 4. DESIGN PRINCIPLES

The visual language should be:

- premium
- minimal
- cinematic
- editorial
- confident
- spacious
- precise
- modern
- immersive

Use:

- strong typography
- generous whitespace
- controlled contrast
- subtle visual details
- purposeful movement
- carefully designed transitions

Avoid:

- template-like layouts
- excessive gradients
- random floating elements
- unnecessary glassmorphism
- excessive rounded cards
- generic SaaS aesthetics
- decorative animation without purpose
- visual clutter

Every visual element must have a reason to exist.

---

## 5. ANIMATION PRINCIPLES

Animation is part of the design system.

Use GSAP and ScrollTrigger for meaningful motion.

Prefer:

- transform
- opacity
- scale
- clip-path
- SVG transforms
- carefully controlled typography animation

Avoid unnecessary layout-triggering animations.

Animations should feel:

- smooth
- deliberate
- physical
- cinematic

Scrolling should feel like controlling a continuous sequence rather than moving between unrelated sections.

Forward and reverse scrolling must both work correctly.

---

## 6. SCENE 01

Scene 01 is the opening experience.

Visual direction:

- dark
- minimal
- almost empty
- strong typography

Primary content:

**VIKTOR BUILDS**

**WEBSITES THAT MOVE.**

Supporting interaction:

**SCROLL TO EXPLORE**

As the visitor scrolls:

- typography transforms
- the composition evolves
- a subtle visual impulse/shape emerges
- the scene gradually develops into Scene 02

There must not be a hard page-section feeling.

The transition should feel continuous.

---

## 7. SCENE 02

Scene 02 visualizes an idea becoming an interface.

The abstract shape from Scene 01 develops into a browser/interface frame.

The interface progressively builds:

- navigation
- headline
- image/content area
- CTA/content blocks

Primary message:

**FROM AN IDEA → TO AN EXPERIENCE.**

The visitor should feel as if the website is being constructed in front of them.

Use GSAP ScrollTrigger with scrub and/or pin where appropriate.

The animation must remain responsive and performant.

---

## 8. PERFORMANCE

Performance is a design requirement.

Prefer:

- transform
- opacity
- GPU-friendly animation
- optimized assets
- minimal DOM complexity

Avoid:

- unnecessary JavaScript work
- excessive scroll listeners
- expensive effects
- oversized assets
- unnecessary rendering loops

Do not introduce WebGL merely for visual spectacle.

---

## 9. RESPONSIVE DESIGN

Desktop is the primary visual reference.

Mobile is not an afterthought.

The experience must remain:

- readable
- usable
- visually intentional
- performant

Do not simply shrink the desktop composition.

Where necessary, simplify or redesign animations for mobile.

---

## 10. ACCESSIBILITY

Respect:

- semantic HTML
- keyboard navigation
- readable contrast
- reduced motion preferences
- usable interaction targets

Provide an appropriate reduced-motion experience.

---

## 11. CODE QUALITY

Keep the architecture clean and understandable.

Prefer:

- reusable components
- clear naming
- small focused components
- centralized animation logic where appropriate
- proper cleanup of GSAP / ScrollTrigger instances

Do not create unnecessary abstractions.

Do not duplicate large amounts of code.

---

## 12. WORKFLOW

Before implementing a major scene:

1. inspect the existing project
2. understand the current architecture
3. identify relevant files
4. plan the implementation
5. implement only the requested scope
6. test the result
7. fix errors
8. verify responsive behavior
9. verify forward and reverse scrolling
10. verify reduced motion

Do not continue into future scenes without explicit instruction.

---

## 13. PRIORITY

When making decisions, prioritize in this order:

1. User experience
2. Visual quality
3. Performance
4. Responsive behavior
5. Accessibility
6. Code simplicity
7. Technical sophistication

Do not choose a technically impressive solution when a simpler solution achieves the same result better.

---

## 14. DEFINITION OF DONE — PHASE 1

Phase 1 is complete when:

- Scene 01 is visually convincing
- Scene 02 is visually convincing
- the transition feels continuous
- scrolling feels intentional
- animations work forward and backward
- desktop works correctly
- mobile works correctly
- reduced motion is handled
- no unnecessary dependencies were introduced
- the project builds successfully
- no obvious console errors remain

Stop after Phase 1.

Do not implement Scene 03+ unless explicitly instructed.
