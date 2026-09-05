# Portfolio Redesign: Design Draft

> Status: **Draft - awaiting approval**
> Date: 2026-09-05

---

## 1. Identity statement

**Primary audience**: Hiring managers and startup founders evaluating Moses
Maina for engineering roles or product builds.

**Core impression**: "This person builds serious, reliable systems - and has
the taste and craft to make them feel good."

**Visual stance**: Dark-first, engineering-forward with moments of warmth.
The design proves the craft claim by being precise, intentional, and
quietly sophisticated rather than loud or trendy.

---

## 2. Design system

### 2.1 Color palette

Dark-first. Every color is chosen for the dark canvas; light mode adapts.

| Role | Dark mode | Light mode (secondary) | Usage |
|---|---|---|---|
| Base | `#0a0f1a` (near-black navy) | `#f8fafc` | Page background |
| Surface | `#111827` | `#ffffff` | Cards, nav, elevated elements |
| Surface elevated | `#1a2236` | `#f1f5f9` | Hover states, active panels |
| Text primary | `#e2e8f0` | `#0f172a` | Headings, body |
| Text secondary | `#94a3b8` | `#475569` | Descriptions, metadata |
| Text tertiary | `#64748b` | `#94a3b8` | Timestamps, minor labels |
| Electric blue (accent) | `#3b82f6` | `#2563eb` | Links, active states, CTA borders, particle edges |
| Electric blue glow | `rgba(59, 130, 246, 0.15)` | `rgba(37, 99, 235, 0.08)` | Hover glows, focus rings |
| Amber spark | `#f59e0b` | `#d97706` | Primary CTA fills, portrait accent, rare focal highlights |
| Border | `rgba(255, 255, 255, 0.08)` | `rgba(15, 23, 42, 0.1)` | Card borders, dividers |
| Code/mono accent | `#22d3ee` (cyan) | `#0891b2` | Monospace text, terminal-like labels |

**Amber scarcity rule**: Amber appears in at most three places on the
entire page (primary CTA, portrait frame accent corner, one evidence
highlight). Everything else uses electric blue or neutrals. Scarcity
creates hierarchy.

### 2.2 Typography

Two families, both from the Geist family (Vercel). No other fonts loaded.

| Role | Family | Weight | Size | Tracking |
|---|---|---|---|---|
| Display (h1) | Geist | 800 | clamp(3rem, 8vw, 5.5rem) | -0.04em |
| Section title (h2) | Geist | 750 | clamp(2rem, 4.5vw, 3rem) | -0.03em |
| Subtitle (h3) | Geist | 700 | clamp(1.25rem, 2.5vw, 1.75rem) | -0.02em |
| Body | Geist | 400 | clamp(0.95rem, 1.6vw, 1.05rem) | 0 |
| Body emphasis | Geist | 600 | Same as body | 0 |
| Identity label | Geist Mono | 600 | 0.82rem | 0.06em |
| Eyebrow | Geist Mono | 600 | 0.75rem | 0.14em |
| Code/metric | Geist Mono | 700 | context-dependent | 0.02em |
| Nav item | Geist | 600 | 0.88rem | 0.01em |

**Monospace rule**: Geist Mono appears only on identity markers (name in
nav, section eyebrows, metric values, status badges, tech stack labels).
It signals "engineer" without turning the whole site into a terminal.

### 2.3 Spacing and layout

- Container max: `1240px` (unchanged)
- Section padding: `clamp(5rem, 9vw, 8rem)` vertical
- Content measure: `42rem` for prose, `64rem` for grids
- Card radius: `0.75rem` (tighter than current `1rem`, more precise)
- Border width: `1px` everywhere (consistency)
- Card shadows on dark: subtle `0 1px 3px rgba(0,0,0,0.3)`, rely on
  borders and background contrast instead of heavy shadows

### 2.4 Motion tokens

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transitions, morphs |
| `--duration-fast` | `0.2s` | Hovers, micro-interactions |
| `--duration-base` | `0.45s` | Section reveals |
| `--duration-slow` | `0.8s` | Hero entrance, major transitions |
| `--stagger-item` | `0.1s` | Staggered children |

All motion disabled when `prefers-reduced-motion: reduce` (existing
behavior preserved).

---

## 3. Section design

### 3.1 Section order (changed)

```
Hero -> Projects -> About -> Skills -> Contact -> Footer
```

Rationale: Lead with proof before explanation. Projects are the strongest
signal for hiring managers and founders.

### 3.2 Hero

**Layout**: Full-viewport dark canvas. Three.js particle network fills
the background. Content is minimal and centered.

**Content hierarchy** (top to bottom, centered):
1. Name in Geist Mono, small caps, letter-spaced: `MOSES MAINA`
2. One-line role in Geist: `Systems-Driven Software Engineer`
3. Display headline in Geist 800:
   `Building reliable software for complex business problems.`
4. Single CTA button (amber fill): `View Projects`
5. Subtle scroll indicator (animated chevron or line)

**What moves out**:
- Portrait moves to About section
- "Download CV" button moves to Contact or About
- Expertise tags removed (redundant with Skills section)
- Bio line removed (About section handles this)

**Three.js element**: A 3D particle constellation rendered with
Three.js (replacing tsparticles). Nodes connected by thin edges, forming
an abstract network structure.

Behavior:
- On load: particles drift inward and connect, forming the network
  (entrance animation, ~2s)
- Idle: slow ambient drift, nodes pulse subtly
- Mouse interaction: particles near the cursor attract/repel gently
  (grab radius ~150px)
- Scroll response: as the user scrolls past the hero, the network
  disperses downward and fades, creating a transition into the Projects
  section
- Mobile: reduced particle count (20-30 vs 50-60 on desktop), no mouse
  interaction, slower drift for performance
- Reduced motion: static constellation, no animation, still rendered

Color: nodes in `#3b82f6` (electric blue) at varying opacity (0.3-0.8),
edges in `rgba(59, 130, 246, 0.12)`, occasional node in `#f59e0b`
(amber, 1 in 8 ratio) to tie to the accent.

**Performance budget**: Three.js hero targets <16ms frame time on
mid-range mobile. Use `requestAnimationFrame`, limit particle count by
device capability, dispose geometry on unmount.

### 3.3 Projects (moved to second section)

**Eyebrow** (Geist Mono): `SELECTED WORK`
**Title** (Geist 750): `Featured Projects`

**Scroll entrance**: Cards stagger in as the section enters viewport.
Featured project card has a slightly longer entrance with a subtle scale
from 0.97.

**Card redesign - case study format**:

Each project card becomes a mini case study with this structure:

```
[Project image - 16:9 aspect]
[Status badge if present]          (Geist Mono, small)
[Project title]                    (Geist 700)
[One-line problem statement]       (Geist 400, secondary color)
[Highlight/evidence metric]        (left border accent, Geist 600)
[Tech stack as small mono labels]  (Geist Mono, pills)
[Action buttons]
```

The `description` field is shortened to a problem statement (one
sentence). The `highlight` field becomes the evidence block, visually
emphasized with a left border in electric blue.

**Featured project**: Full-width card with side-by-side layout on
desktop (image left, content right). Other cards in a 2-column grid.

**Filter buttons**: Restyle with monospace labels, tighter spacing,
active state uses electric blue background instead of transparent.

**Private repo modal**: Keep the current accessible modal, restyle with
dark tokens.

### 3.4 About (moved to third section)

**Eyebrow** (Geist Mono): `ABOUT`
**Title** (Geist 750): `How I Think About Engineering`

**Layout** (desktop): Two-column grid.

Left column:
- Portrait (moved from hero) in a refined frame. The gradient border
  stays but uses the new palette (electric blue to amber). Tighter
  radius (1.25rem). The decorative corner accent stays in amber.
- Below portrait: Name + role + short bio (the current hero bio and
  lead text, consolidated)

Right column:
- Working principles (keep the three principles, they're strong)
  Restyle as numbered items with monospace numbers
- Education card (keep, restyle with new tokens)

**Evidence strip**: The "Evidence in practice" section stays at the
bottom of About. Metric values rendered in Geist Mono at a larger size.
The left-border accent uses electric blue.

**Scroll entrance**: Left column slides in from left, right column from
right, with a slight delay. Evidence strip fades up last.

### 3.5 Skills (fourth section)

**Eyebrow** (Geist Mono): `CAPABILITIES`
**Title** (Geist 750): `Skills & Technologies`

**Technology categories**: Replace the accordion with horizontal tabs.

- Tab bar: horizontal scroll on mobile, centered on desktop
- Tab labels in Geist Mono with a count badge
- Active tab: electric blue underline, text color shift
- Panel: clean icon grid (3-4 columns desktop, 2 mobile)
- Technology items: icon + name, same structure but with new tokens

**Core skills**: Keep the three-column tag cloud (Technical, Soft,
Media). Restyle tags with subtle borders, no background fill until hover.

**Scroll entrance**: Tab bar fades in, then the active panel content
staggers in. Tab switches animate the grid (crossfade).

### 3.6 Contact (fifth section)

**Background**: Gradient treatment similar to hero (radial gradients)
but more subtle, creating visual bookending.

**Eyebrow** (Geist Mono): `CONTACT`
**Title** (Geist 750): `Let's Build Something`

Keep the current structure:
- Quick contact (phone + WhatsApp) cards
- Contact form (left)
- Social links + opportunity card (right)

Restyle with new tokens. The form card uses `surface` background
with a `1px` border. No glass morphism.

**Download CV**: Add a "Download CV" link here (moved from hero), styled
as a secondary action in the opportunity card area.

### 3.7 Navigation

**Desktop**: Minimal fixed top bar.
- Hidden when viewport is at the hero (top of page)
- Slides down on scroll past hero with a subtle entrance
- Left: `MOSES MAINA` in Geist Mono (small, letter-spaced)
- Center/right: section links in Geist 600
- Far right: theme toggle
- Background: solid `surface` color, `1px` bottom border, no blur/glass
- Height: `3.5rem` (shorter than current `5rem`)

**Mobile**: Keep the bottom tab bar pattern (it's good UX for mobile).
Restyle with new tokens. Remove glass morphism, use solid background.

**Active state**: Electric blue text + a `2px` bottom line (desktop) or
filled background (mobile).

### 3.8 Footer

Minimal. Single line with copyright and "Back to top" button.
Background matches the last section's base. No decorative elements.

---

## 4. Animation choreography

### 4.1 Library additions

| Library | Purpose | License |
|---|---|---|
| `three` | 3D particle network in hero | MIT |
| `@react-three/fiber` | React renderer for Three.js | MIT |
| `@react-three/drei` | Three.js helpers | MIT |
| `gsap` (+ ScrollTrigger) | Scroll-driven animation | Free (non-commercial) |
| `lenis` | Smooth scroll (optional, pairs with GSAP) | MIT |

**Removals**: `@tsparticles/engine`, `@tsparticles/react`,
`@tsparticles/slim` (replaced by Three.js).

### 4.2 Scroll narrative

| Scroll position | What happens |
|---|---|
| 0-100vh (Hero) | Three.js network is alive, ambient. CTA and text visible. |
| ~80vh | Nav bar slides in from top. |
| 100vh (Hero exit) | Network particles disperse and fade. Section transition. |
| Projects enter | Cards stagger in (scale 0.97 to 1, opacity 0 to 1). Featured card first. |
| Each project card in view | Subtle parallax on project image (2-3% Y offset). |
| About enter | Portrait slides in from left. Principles stagger from right. |
| Evidence strip in view | Metric numbers count up from 0 (Geist Mono, 0.6s per number). |
| Skills enter | Tab bar fades in. Active panel grid staggers. |
| Contact enter | Gradient background fades in. Form and social cards stagger. |

### 4.3 Micro-interactions (unchanged patterns)

- Hover lifts on cards: `translateY(-3px)` + border color shift
- Button hover: subtle scale `1.02` + glow shadow
- Focus-visible: `2px` electric blue outline (accessibility preserved)
- Theme toggle: rotation animation (keep current)
- Reduced motion: all scroll animations resolve immediately, Three.js
  renders static frame

---

## 5. Implementation plan

### Phase 1: Design system foundation
- Add Geist + Geist Mono fonts
- Rewrite CSS variables (new palette, spacing, motion tokens)
- Update `globals.css` with new base styles
- Restyle navigation (both desktop and mobile)
- Restyle footer

### Phase 2: Three.js hero
- Install `three`, `@react-three/fiber`, `@react-three/drei`
- Remove tsparticles dependencies
- Build `ParticleNetwork` component (replaces `ParticleBackground`)
- Redesign hero layout (minimal content, centered)
- Move portrait to About section

### Phase 3: Section redesign
- Reorder sections (Hero, Projects, About, Skills, Contact)
- Redesign project cards to case-study format
- Redesign About layout with portrait
- Replace skills accordion with horizontal tabs
- Restyle contact section

### Phase 4: Scroll animation
- Install GSAP + ScrollTrigger
- Wire nav show/hide on scroll
- Add section entrance animations
- Add Three.js scroll response (network dispersion)
- Add metric count-up animation
- Add project image parallax

### Phase 5: Polish and light mode
- Adapt light mode from dark-first tokens
- Responsive testing across breakpoints
- Performance audit (Three.js frame budget)
- Accessibility audit (contrast, reduced motion, keyboard)
- Final visual QA

---

## 6. Dependencies to add

```
three @react-three/fiber @react-three/drei gsap
```

### Dependencies to remove

```
@tsparticles/engine @tsparticles/react @tsparticles/slim
```

### Optional addition (Phase 4)

```
lenis
```

---

## 7. Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Three.js performance on mobile | High | Particle count by device, `devicePixelRatio` capping, lazy init, dispose on unmount |
| GSAP free license scope | Medium | Portfolio is non-commercial; verify GSAP license terms allow this use |
| Geist font loading delay (FOUT) | Low | `next/font` handles preload and swap automatically |
| Large JS bundle from Three.js | Medium | Dynamic import the hero, code-split Three.js from main bundle |
| Light mode quality gap | Low | Accepted (Q10): ship dark first, refine light as second pass |
| Scroll animation jank | Medium | GSAP ScrollTrigger with `will-change`, GPU-composited transforms only |

---

## 8. Decisions log

All decisions made during the grilling session on 2026-09-05.

| # | Decision | Choice |
|---|---|---|
| Q1 | Primary audience | Hiring managers + startup founders |
| Q2 | Core impression | "Builds serious, reliable systems with taste and craft" |
| Q3 | Visual direction | Dark-first, engineering-forward with warmth |
| Q4 | Three.js role | Focused hero element + scroll transitions |
| Q5 | Page structure | Single scrolling page |
| Q6 | Color palette | Navy/slate + electric blue + sparse amber |
| Q7 | Typography | Geist + Geist Mono |
| Q8 | Three.js concept | 3D particle network/constellation |
| Q9 | Scroll animation | Section-driven narrative |
| Q10 | Light mode | Dark default, light secondary (later polish) |
| Q11 | Section order | Hero, Projects, About, Skills, Contact |
| Q12 | Hero approach | Minimal hero, portrait to About |
| Q13 | Skills section | Horizontal tabs replacing accordion |
| Q14 | Project cards | Case-study format (problem/approach/evidence) |
| Q15 | Navigation | Minimal fixed nav, appears on scroll |
| Q16 | Animation library | GSAP ScrollTrigger |
