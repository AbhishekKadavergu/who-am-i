# Portfolio Website

Modern portfolio showcasing projects, skills, and professional background with dark/light theme support.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build
npm run lint     # ESLint check
```

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite 6** for fast builds
- **Tailwind CSS 4** with custom theme variables
- **Context API** for theme management
- **Serverless API** (Vercel/Netlify functions)

## Features

- ✅ **Dark/Light Theme** — Auto-saved to localStorage
- ✅ **Searchable Projects** — Debounced filtering, tag-based
- ✅ **Contact Form** — Client-side validation, SendGrid integration
- ✅ **Toast Notifications** — Success/error states
- ✅ **Accessible** — WCAG 2.1 AA (keyboard nav, ARIA labels, semantic HTML)
- ✅ **Responsive Design** — Mobile-first with Tailwind

## Environment Setup

### SendGrid (Contact Form)

```bash
cp .env.example .env.local
```

Add these variables:

```
SENDGRID_API_KEY=your-sendgrid-api-key
CONTACT_TO_EMAIL=your-email@example.com
```

Deploy on **Vercel** or **Netlify** — add env vars in your platform's dashboard.

### Optional: Google Sheets

Store contact submissions in Google Sheets:

1. Create [Google Cloud project](https://console.cloud.google.com), enable Sheets API
2. Create service account, download JSON key
3. Share Google Sheet with service account email (Editor access)
4. Base64-encode the JSON key: `cat key.json | base64` (or use online tool)
5. Add env vars:
   ```
   GOOGLE_SHEET_ID=your-sheet-id
   GOOGLE_SERVICE_ACCOUNT=base64-encoded-key
   ```

## Development

- **Edit components:** `src/components/`
- **Add projects:** `src/data/projects.ts`
- **Add skills:** `src/data/skills.ts`
- **Modify validation:** `src/utils/validation.ts`
- **Change theme colors:** `src/index.css` (CSS variables)

See [copilot-instructions.md](./copilot-instructions.md) for detailed development patterns and Phase 1/2 feature checklist.

## Building & Deployment

```bash
npm run build     # Creates dist/ folder
npm run preview   # Test production build locally
```

Works on **Vercel** (recommended), **Netlify**, or any Node.js host. API routes expect `api/send-contact.js` or similar serverless function.
