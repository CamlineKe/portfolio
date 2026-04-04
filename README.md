# Camline's Portfolio

A professional portfolio website showcasing MERN fullstack development expertise, built with Next.js and TypeScript using CSS Modules for styling. The portfolio features a modern, sleek design with mobile-first responsive layout, dark/light mode toggle, smooth animations, and accessibility compliance.

## 🚀 Tech Stack

### Core Technologies
- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling solution
- **Framer Motion** - Animation library
- **React Hook Form** - Form validation and handling

### Key Features
- ✅ Mobile-first responsive design
- ✅ Responsive navigation bar (top on desktop, bottom on mobile)
- ✅ Dark/light mode toggle with system preference detection
- ✅ Smooth scrolling navigation
- ✅ Accessibility compliance (ARIA, keyboard navigation)
- ✅ SEO optimized with Open Graph tags
- ✅ Performance optimized with code splitting and lazy loading
- ✅ Validated contact form with email sending via Next.js API Route (Gmail SMTP)
- ✅ Spam protection via honeypot
- ✅ Animated progress bars and interactive elements
- ✅ Always visible project action buttons

## 📁 Project Structure

```
/portfolio
├── /components          # React components
│   ├── Navigation.tsx   # Navigation bar with theme toggle
│   ├── Hero.tsx         # Hero section with intro
│   ├── About.tsx        # About section with skills
│   ├── Skills.tsx       # Tech stack showcase
│   ├── Projects.tsx     # Project portfolio
│   ├── Contact.tsx      # Contact form
│   ├── Footer.tsx       # Footer
│   └── ThemeToggle.tsx  # Dark/light mode switcher
├── /pages              # Next.js pages
│   ├── index.tsx       # Main page
│   └── _app.tsx        # App configuration
├── /public             # Static assets
│   ├── /images         # Placeholder images
│   └── /CV             # CV download
├── /styles             # CSS Modules
│   ├── Navigation.module.css # Navigation styles
│   ├── *.module.css    # Component styles
│   └── globals.css     # Global styles
├── /utils              # Utility functions
│   └── helpers.ts      # Helper functions
├── /types              # TypeScript definitions
│   └── index.ts        # Type definitions
├── /hooks              # Custom React hooks
│   └── useTheme.ts     # Theme management
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies
└── README.md           # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone or download the project**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

### Development
```bash
npm run dev          # Start development server
```

### Production
```bash
npm run build        # Build for production
npm start           # Start production server
```

### Additional Scripts
```bash
npm run lint        # Run ESLint
npm run type-check  # TypeScript type checking
```

## 📦 Core Dependencies

```json
{
  "next": "^15.4.6",
  "react": "^18.3.1", 
  "react-dom": "^18.3.1",
  "typescript": "^5.7.3",
  "@types/react": "^18.3.17",
  "@types/node": "^22.10.7",
  "framer-motion": "^11.15.0",
  "react-hook-form": "^7.54.2"
}
```

## 🎨 Customization Guide

### Replace Placeholder Content

1. **Images**: Replace files in `/public/images/`
   - `avatar.jpg` - Your profile photo
   - `project1.jpg` to `project4.jpg` - Project screenshots

2. **CV**: Replace `/public/CV/Moses_Maina_CV.pdf` with your resume

3. **Personal Information**: Update content in components:
   - `Navigation.tsx` - Logo and navigation items
   - `Hero.tsx` - Name and tagline
   - `About.tsx` - Bio and skills
   - `Projects.tsx` - Project details
   - `Contact.tsx` - Social links

### Add/Update Projects

Edit `/components/Projects.tsx`:

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Project description highlighting tech stack and problem solved.",
    image: "/images/your-project.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://your-demo-url.com",
    codeUrl: "https://github.com/your-repo"
  }
  // Add more projects...
];
```

### Customize Theme Colors

Update CSS custom properties in `/styles/globals.css`:

```css
:root {
  --color-primary: #your-color;
  --color-background: #your-bg-color;
  /* Update other color variables */
}
```

## 🌙 Dark/Light Theme

The theme system automatically:
- Detects system preference on first visit
- Persists user choice in localStorage
- Provides smooth transitions between themes
- Updates all components consistently
- Theme toggle is located in the navigation bar (top-right on desktop, rightmost icon on mobile)

### Theme Customization

Modify theme colors in `/styles/globals.css` under `:root` and `[data-theme="dark"]` selectors.

### Customize Navigation

The navigation bar is responsive and includes:
- **Desktop**: Fixed top navigation with logo, menu items, and theme toggle
- **Mobile**: Fixed bottom navigation with icons and theme toggle

To customize navigation items, edit `/components/Navigation.tsx`:

```typescript
const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
  // Add more sections as needed
];
```

Navigation automatically highlights the active section based on scroll position and provides smooth scrolling to sections when clicked.

### Email Sending Setup (Gmail SMTP)

To enable the contact form to send emails, you need to configure environment variables for your Gmail account. The application uses Nodemailer with Gmail SMTP.

**Important:** For security, you **MUST** use a [Gmail App Password](https://support.google.com/accounts/answer/185833?hl=en) instead of your regular Gmail password.

1.  **Generate a Gmail App Password:**
    *   Go to your [Google Account Security page](https://myaccount.google.com/security).
    *   Under "How you sign in to Google," select **2-Step Verification** and ensure it's turned on.
    *   Scroll down and select **App passwords**.
    *   Follow the instructions to generate a new app password. Select "Mail" for the app and "Other (Custom name)" for the device, then enter a name like "Portfolio Website".
    *   Copy the generated 16-character password (e.g., `abcd efgh ijkl mnop`). You will only see this once.

2.  **Create a `.env.local` file:**
    In the root of your `portfolio` directory (where `package.json` is located), create a file named `.env.local`.

3.  **Add the following environment variables to `.env.local`:**
    ```
    GMAIL_USER=your_gmail_address@gmail.com
    GMAIL_APP_PASSWORD=your_16_character_app_password
    TARGET_EMAIL=cmosesmaina@gmail.com
    ```
    *   Replace `your_gmail_address@gmail.com` with the Gmail address you used to generate the App Password.
    *   Replace `your_16_character_app_password` with the actual 16-character App Password you copied.
    *   `TARGET_EMAIL` is the email address where you want to receive messages from the contact form.

    **Note:** The `.env.local` file is ignored by Git (`.gitignore`) for security reasons and should not be committed to version control.

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 375px, 480px, 768px, 991px, 1024px, 1200px
- Flexible grid layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🔧 Development Notes

### Code Quality
- Strict TypeScript mode enabled
- ESLint configuration included
- Clean, commented code structure
- Modular component architecture

### Performance
- Next.js Image optimization
- Code splitting by route
- Lazy loading for components
- Optimized bundle size

### SEO
- Meta tags and Open Graph
- Structured data markup
- Semantic HTML structure
- Fast loading times

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For questions or support, please contact:
- Email: mosesmaina.dev@gmail.com
- GitHub: [@CamlineKe](https://github.com/CamlineKe)
- LinkedIn: [Moses Maina](https://linkedin.com/in/moses-ongware)

---

**Built with ❤️ using Next.js & TypeScript by Camline**



