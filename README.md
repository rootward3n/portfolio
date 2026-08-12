# @rootward3n — Portfolio

A minimalist, acid-retro 3D developer portfolio built with Next.js 14, Three.js, and TypeScript. Designed for GitHub Pages deployment.

![Portfolio Preview](public/images/og-image.png)

## ✨ Features

- **3D Interactive Hero** — Minimalist neural network visualization, animated wave terrain, perspective grid, and HUD framing
- **Acid / Retro-Future Theme** — Dark cinematic interface with acid lime, hot magenta, and electric cyan accents
- **Fully Responsive** — Mobile-first design with graceful WebGL fallbacks
- **Accessible** — Semantic HTML, keyboard navigation, `prefers-reduced-motion` support
- **Performance Optimized** — Static export, code splitting, lazy-loaded 3D canvas
- **Centralized Config** — All content in `src/lib/config.ts` for easy customization
- **GitHub Pages Ready** — Automated deployment via GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/rootward3n/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
```

The static site will be generated in the `out/` directory, ready for deployment.

## 🎨 Customization

All personal content is centralized in **`src/lib/config.ts`**:

```typescript
export const config = {
  profile: {
    username: "@rootward3n",
    name: "Shravan Kubade",
    role: "IT Student",
    tagline: "Your tagline here...",
    bio: "Your bio here...",
    location: "India",
    status: "Open to opportunities",
  },
  socials: {
    github: "https://github.com/rootward3n",
    instagram: "https://instagram.com/rootward3n",
    linkedin: "",  // Empty = hidden
    email: "digicartelecom@gmail.com",
  },
  projects: [
    {
      name: "Project Name",
      description: "Project description...",
      technologies: ["React", "TypeScript", "Three.js"],
      github: "https://github.com/username/repo",
      demo: "https://demo-url.com",
    },
    // Add more projects...
  ],
  topSkills: [
    { name: "Python", level: 90, domain: "AI" },
    { name: "TypeScript", level: 80, domain: "Dev" },
    { name: "Pandas / NumPy", level: 85, domain: "AI" },
    { name: "React / Next.js", level: 75, domain: "Dev" },
    { name: "Git / GitHub Actions", level: 80, domain: "Dev" },
    { name: "Linux / Bash", level: 75, domain: "Dev" },
  ],
  interests: {
    ai: ["Generative AI", "Computer Vision", "AI Safety & Alignment"],
    cybersecurity: ["Offensive Security", "Web App Penetration Testing", "Threat Modeling"],
    development: ["Full-Stack Web Development", "Real-time Systems", "Developer Tooling", "Clean Architecture"],
  },
  seo: {
    title: "rootward3n | AI • Cybersecurity • Software Development",
    description: "@rootward3n — IT student building at the intersection of AI, cybersecurity, and software engineering. Exploring neural architectures, threat modeling, and robust software systems.",
    ogImage: "/images/og-image.png",
    twitterHandle: "@rootward3n",
  },
} as const;
```

### Adding Projects

Edit the `projects` array in `config.ts`. Each project supports:

```typescript
{
  name: "Project Name",
  description: "Brief description of what it does",
  technologies: ["Tech1", "Tech2", "Tech3"],
  github: "https://github.com/username/repo",
  demo: "https://live-demo.com",  // Optional
}
```

### Social Links

Empty social URLs are automatically hidden. Add a URL to display the link:

```typescript
socials: {
  github: "https://github.com/yourusername",
  instagram: "https://instagram.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourprofile",  // Add to show
  email: "your@email.com",
}
```

## 🌐 GitHub Pages Deployment

### Automatic (Recommended)

1. Push to `main` branch
2. GitHub Actions builds and deploys to `gh-pages` branch
3. Configure GitHub Pages to serve from `gh-pages` branch

### Manual

```bash
npm run build
# Deploy the `out/` directory to your hosting provider
```

### Repository Settings

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **(root)**
4. Save

The site will be available at `https://rootward3n.github.io/portfolio/`

### Custom Domain (Optional)

1. Add `CNAME` file to `public/` with your domain
2. Configure DNS records
3. Enable "Enforce HTTPS" in GitHub Pages settings

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router, Static Export) |
| Language | TypeScript 5 |
| 3D Graphics | Three.js (raw, no R3F) |
| Animation | Framer Motion |
| Styling | CSS Modules + CSS Variables |
| Deployment | GitHub Actions → GitHub Pages |
| Fonts | Space Grotesk, JetBrains Mono (Google Fonts) |

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── images/           # Static assets (og-image, icons)
│   └── site.webmanifest  # PWA manifest
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles, design tokens
│   │   ├── layout.tsx    # Root layout, metadata, fonts
│   │   ├── page.tsx      # Main page composition
│   │   └── not-found.tsx # 404 page
│   ├── components/
│   │   ├── ui/           # Reusable UI primitives
│   │   ├── hero/         # Hero section + 3D visual
│   │   ├── about/        # About section
│   │   ├── ai/           # AI section
│   │   ├── cybersecurity/# Cybersecurity section
│   │   ├── development/  # Development section
│   │   ├── skills/       # Skills section
│   │   ├── projects/     # Projects showcase
│   │   ├── github/       # GitHub stats
│   │   ├── contact/      # Contact form + links
│   │   ├── footer/       # Footer
│   │   └── three/        # Three.js scene components
│   ├── lib/
│   │   ├── config.ts     # 🎯 CENTRALIZED CONTENT CONFIG
│   │   ├── three-utils.ts# Three.js helpers, shaders
│   │   ├── utils.ts      # General utilities
│   │   └── constants.ts  # Design constants
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   ├── useWebGL.ts
│   │   └── useScroll.ts
│   └── styles/
│       └── variables.css # CSS custom properties
├── .github/workflows/
│   └── deploy.yml        # GitHub Pages deployment
├── next.config.ts        # Static export, basePath config
├── tsconfig.json
└── package.json
```

## ♿ Accessibility

- Semantic HTML5 structure
- Proper heading hierarchy (h1→h6)
- ARIA labels on interactive elements
- Keyboard-navigable focus states
- `prefers-reduced-motion` disables all animations
- WCAG AA color contrast
- Screen reader compatible

## ⚡ Performance

- Static HTML export (no JS hydration for content)
- Three.js canvas lazy-loaded on viewport intersection
- Code splitting via dynamic imports
- Optimized shaders, minimal draw calls
- `prefers-reduced-motion` → static fallback
- Mobile: reduced particle count, simplified shaders

## 🎯 3D Visual System

| Component | Description | Performance |
|-----------|-------------|-------------|
| `PerspectiveGrid` | Animated cyber-grid floor | Shader-based, 1 draw call |
| `NeuralNetwork` | 120 nodes + 180 connections | GPU instancing, buffer geometry |
| `ParticleField` | 1500 floating particles | Points material, 1 draw call |
| `HUDElements` | Corner brackets, scan line | Minimal geometry |

All animations use `requestAnimationFrame` with delta timing for consistent 60fps.

## 🔧 Development

```bash
# Development server with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Production build
npm run build

# Preview production build
npm run start
```

## 📝 License

MIT License — feel free to use as a template for your own portfolio.

## 🙏 Acknowledgments

- Three.js community for WebGL utilities
- Framer Motion for delightful animations
- Next.js team for the excellent framework

---

**Built with curiosity** by [Shravan Kubade](https://github.com/rootward3n)