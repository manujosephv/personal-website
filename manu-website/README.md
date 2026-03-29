# manu-joseph.com — Personal Website

Dark & cinematic React site. Built with Vite + React, deployable to Vercel in minutes.

---

## Quick Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
# 1. Install dependencies (first time only)
npm install

# 2. Install Vercel CLI
npm install -g vercel

# 3. Deploy
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Framework: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click Deploy ✓

---

## Add Your Photos

Drop images in the `/public` folder (see `public/README-images.md`):

| File | Where used |
|---|---|
| `portrait.jpg` | About section headshot |
| `book-cover.jpg` | The Artist book cover in Author section |

The site shows styled fallbacks if images are missing — safe to deploy without them first.

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Project Structure

```
manu-website/
├── public/             ← Static assets (photos go here)
├── src/
│   ├── App.jsx         ← Root component
│   ├── index.css       ← Design system (colours, fonts, animations)
│   └── components/
│       ├── Nav.jsx         Hero navigation
│       ├── Hero.jsx        Full-screen landing with particle animation
│       ├── About.jsx       Bio + Two Worlds intro
│       ├── DataScience.jsx PyTorch Tabular, papers, book, blog
│       ├── Author.jsx      The Artist, reviews, excerpt
│       ├── Speaking.jsx    Talks & awards
│       ├── Contact.jsx     Links & email
│       └── Footer.jsx
├── index.html
├── vite.config.js
├── vercel.json         ← SPA routing for Vercel
└── package.json
```

---

## Design System

The colour system is defined as CSS variables in `src/index.css`:

| Variable | Value | Usage |
|---|---|---|
| `--tech-400` | `#60a5fa` | Data science / blue accents |
| `--creative-400` | `#fbbf24` | Author / amber accents |
| `--bg-void` | `#06060d` | Deepest background |
| `--font-display` | Playfair Display | Headings, serif |
| `--font-sans` | Inter | Body text |
| `--font-mono` | JetBrains Mono | Tags, stats, code |

---

## Customisation Tips

- **Change colours**: Edit `--tech-500` / `--creative-500` in `src/index.css`
- **Update stats**: Edit the stats array in `Hero.jsx`
- **Add projects**: Edit the `projects` array in `DataScience.jsx`
- **Update reviews**: Edit the `reviews` array in `Author.jsx`
- **Add talks**: Edit the `talks` array in `Speaking.jsx`
