# Photographer Portfolio

Photographer Portfolio is a Vite, React, and TypeScript portfolio site for Morgan Blake, a production photographer focused on fashion campaigns, editorial stories, commercial production, and personal portrait work.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router

## Requirements

- Node.js 20+
- npm 10+

## Local Development

```bash
npm install
npm run dev
```

The development server starts on port 8080 by default.

## Production Build

```bash
npm run build
npm run preview
```

The compiled app is emitted to `dist/` and can be served with standard static hosting tooling such as Nginx, Caddy, Apache, Vercel, Netlify, or S3-compatible static hosting.

## Project Notes

- Portfolio media is imported from local files under `src/assets/gallery`.
- Project series images are imported from `src/assets/projects`.
- Site metadata uses the local `public/og-image.jpg` social preview image.
- The contact form is client-side only and can be wired to any standard form endpoint or webhook.
- The project uses standard Vite and npm tooling without vendor-specific build plugins.
