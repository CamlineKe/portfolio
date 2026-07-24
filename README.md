# Moses Maina Portfolio

A responsive, single-page portfolio for Moses Maina, a systems-driven software
engineer focused on reliable custom software, secure integrations, and
production-ready digital products.

Live site: [moses-maina-portfolio.vercel.app](https://moses-maina-portfolio.vercel.app)

## What the portfolio includes

- Mobile-first layout with fixed desktop and mobile navigation
- Light and dark themes with saved and system preferences
- Reduced-motion-aware transitions and pointer-aware hover effects
- Responsive Next.js images for the portrait and project previews
- One-open-at-a-time technology accordion with self-hosted brand icons
- Category-based project filtering with accessible selected states
- Public repository links and an accessible private-repository dialog
- Direct phone and prefilled WhatsApp contact actions
- Validated contact form backed by a Next.js API route and Gmail SMTP
- Page-level canonical, Open Graph, and social-preview metadata

## Technology stack

### Application

- Next.js 15 using the Pages Router
- React and TypeScript
- CSS Modules and shared CSS custom properties
- Framer Motion
- React Hook Form
- tsParticles

### Contact delivery

- Next.js API route
- Nodemailer
- Gmail SMTP with an app password

The exact dependency versions are maintained in `package.json` and
`package-lock.json`.

## Application structure

```text
portfolio/
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── ParticleBackground.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── ThemeToggle.tsx
├── data/
│   └── projects.ts
├── hooks/
│   ├── useCanHover.ts
│   └── useTheme.ts
├── pages/
│   ├── api/
│   │   └── contact.ts
│   ├── _app.tsx
│   └── index.tsx
├── public/
│   ├── CV/
│   ├── icons/
│   │   └── technologies/
│   └── images/
├── styles/
│   ├── *.module.css
│   └── globals.css
├── types/
│   └── index.ts
└── utils/
    ├── helpers.ts
    └── motion.ts
```

### Main responsibilities

- `pages/index.tsx` assembles the page sections and owns page-specific SEO
  metadata.
- `pages/_app.tsx` loads global styles and global viewport and favicon tags.
- `data/projects.ts` is the source of truth for project content, categories,
  demos, and repository visibility.
- `components/Projects.tsx` handles filtering, project actions, and the private
  repository dialog.
- `components/Skills.tsx` owns the technology categories and maps their icon
  identifiers to self-hosted assets.
- `pages/api/contact.ts` validates contact submissions, applies a honeypot and
  per-instance rate limit, and sends email.
- `styles/globals.css` defines theme colors, shared surfaces, spacing, shadows,
  navigation dimensions, safe-area values, and motion defaults.
- `utils/motion.ts` provides shared entrance and hover helpers.

## Local setup

### Prerequisites

- Node.js `^18.18.0`, `^19.8.0`, or `>=20.0.0`
- npm

### Install and run

```bash
cd /path/to/portfolio
npm install
npm run dev
```

The development server listens on `0.0.0.0:3000`. Open
[http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` in the project root:

```dotenv
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
TARGET_EMAIL=your_contact_destination@example.com
```

Requirements:

- `GMAIL_USER` is the Gmail account used as the controlled sender.
- `GMAIL_APP_PASSWORD` must be a Gmail app password, not the account password.
- `TARGET_EMAIL` receives submitted portfolio messages.
- `.env.local` is ignored by Git and must never be committed.

The portfolio can render without these variables, but contact-form submissions
will return a server error until email delivery is configured. Direct phone,
WhatsApp, and social links remain available.

## Available scripts

```bash
npm run dev
npm run type-check
npm run lint
npm run build
npm start
```

- `dev` starts the local development server.
- `type-check` runs TypeScript without emitting files.
- `lint` runs the configured Next.js ESLint checks.
- `build` creates an optimized production build.
- `start` serves a completed production build.

There is currently no automated test script configured for the portfolio
application.

## Updating personal content

The primary content locations are:

- `components/Hero.tsx` for the headline, role, expertise, and CV action
- `components/About.tsx` for the biography, working principles, education, and
  engineering evidence
- `components/Skills.tsx` for technology and skill categories
- `data/projects.ts` for all project records
- `components/Contact.tsx` for phone, WhatsApp copy, opportunities, and social
  links
- `pages/index.tsx` for SEO titles, descriptions, and the canonical site URL

Current main assets:

- Portrait: `public/images/avatar.png`
- Resume: `public/CV/Moses_Maina_Software_Engineer_Resume.pdf`
- Project previews: `public/images/rms.png`, `wpv.jpg`, `project1.jpg`,
  `project3.jpg`, `project4.jpg`, and `viesta.png`

When replacing an image, preserve the file path or update the corresponding
component or project record. Keep useful alternative text and review image
cropping at mobile and desktop widths.

## Adding or updating projects

Projects use the discriminated types in `types/index.ts` and live in
`data/projects.ts`.

```typescript
{
  id: 7,
  title: 'Project name',
  description: 'A concise description of the problem, users, and outcome.',
  highlight: 'An optional verified engineering or product result.',
  image: '/images/project-name.png',
  technologies: ['Next.js', 'TypeScript'],
  category: 'Web Applications',
  status: 'Live Website',
  demos: [
    {
      type: 'live',
      label: 'Live Demo',
      url: 'https://example.com',
    },
  ],
  repository: {
    visibility: 'private',
    reason: 'This production repository is private.',
  },
}
```

Supported project categories:

- `Custom Software`
- `SaaS`
- `AI & Data`
- `Web Applications`

Project behavior:

- Filters use the explicit `category` field, not the technology list.
- `featured: true` creates a full-width flagship card.
- `status` adds a compact project-state label.
- `highlight` adds a separate evidence statement.
- A demo without `label` defaults to `Live Demo` or `Video Demo` according to
  its `type`.
- The first demo is presented as the primary action.
- Additional demos and repository actions use the secondary action style.
- A public repository requires a `url` and renders as a real external link.
- A private repository can include a `reason` and opens the repository-details
  dialog.

Every project image must exist under `public/images` and should be optimized
before being committed.

## Technology icons

Technology icons are stored under `public/icons/technologies` and rendered
through `next/image`.

To add a technology:

1. Add an SVG or PNG asset to `public/icons/technologies`.
2. Add the technology entry to the relevant category in
   `components/Skills.tsx`.
3. Add PNG filenames to `rasterTechnologyIcons` when the asset is not SVG.
4. Document its source and licensing notes in
   `public/icons/technologies/SOURCES.md`.

Prefer an official vendor or project asset. Use a reputable brand-icon source
when an official compact asset is unavailable. Self-host icons rather than
depending on a runtime icon CDN.

The technology accordion intentionally keeps one category open. The first
category opens on initial load, and selecting another category closes the
previous one.

## Responsive, theme, and motion conventions

- Mobile navigation is fixed to the bottom and uses one six-column row.
- Desktop navigation is fixed to the top.
- Mobile safe-area spacing uses `env(safe-area-inset-*)`.
- Interactive controls should maintain at least a 44px target.
- Shared card surfaces, borders, radii, and shadows come from
  `styles/globals.css`.
- Component-specific breakpoints remain in the relevant CSS Module.
- Framer Motion interactions should check `useReducedMotion`.
- Hover animation should be limited to devices detected by `useCanHover`.
- CSS transitions require a `prefers-reduced-motion` override.

## Accessibility behavior

The current interface includes:

- Semantic page sections and project articles
- Labelled desktop and mobile navigation
- Visible keyboard focus states
- Active navigation and project-filter state announcements
- Accordion trigger and panel relationships
- Form labels, validation descriptions, and submission status messages
- A private-repository dialog with initial focus, focus trapping, Escape
  handling, scroll locking, and focus restoration
- Decorative icon and background elements hidden from assistive technology
- Reduced-motion behavior for animation-sensitive users

Accessibility still requires manual browser and assistive-technology review
when interaction or layout behavior changes.

## Contact API behavior

`POST /api/contact` accepts:

```json
{
  "name": "Example Person",
  "email": "person@example.com",
  "message": "A message containing at least ten characters.",
  "honeypot": ""
}
```

The API:

- Rejects unsupported HTTP methods
- Validates types and length limits
- Rejects invalid email addresses and newline characters in names
- Returns a successful response for filled honeypot submissions
- Escapes user content before inserting it into HTML email
- Sends both plain-text and HTML email content
- Uses the visitor as `replyTo` while keeping `GMAIL_USER` as the sender
- Allows five accepted submissions per client IP in a 15-minute window

The rate limiter is stored in process memory. It resets when an instance
restarts and is not shared across serverless instances. Use a shared rate-limit
store if traffic or abuse risk grows.

## SEO and deployment

The canonical URL and social-image URL are created in `pages/index.tsx`.
Update `siteUrl` there when the production domain changes.

The current social preview uses:

```text
/images/avatar.png
```

`vercel.json` delegates the production build to `npm run build` and identifies
the framework as Next.js. Production deployments must provide the three contact
environment variables if the form is expected to send email.

## Verification

Recommended checks after a change:

```bash
npm run type-check
npm run lint
npm run build
```

Manual browser review should cover:

- Light and dark themes
- Keyboard-only navigation
- Reduced-motion mode
- Project filtering and private-repository dialogs
- Contact validation, phone, and WhatsApp actions
- Layouts around 320px, 360px, 768px, 900px, 1024px, and desktop widths
- Contact email delivery in an environment with SMTP variables configured

## Contact

- Email: `cmosesmaina@gmail.com`
- Phone: `+254 110 868 049`
- GitHub: [@CamlineKe](https://github.com/CamlineKe)
- LinkedIn: [Moses Maina](https://www.linkedin.com/in/moses-ongware/)

Built with Next.js and TypeScript by Moses Maina.
