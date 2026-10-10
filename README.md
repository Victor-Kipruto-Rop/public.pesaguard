# PesaGuard web

The public PesaGuard website: a standalone Next.js App Router project. The backend lives in a separate repository (https://github.com/Victor-Kipruto-Rop/pesaguard).

## Run locally

Install Node.js 20+ and npm, then run:

```bash
npm install
npm run dev
```

Set `PESAGUARD_API_URL=https://api.pesaguard.co.ke` to enable the server-side status health check. No backend secret is exposed to the browser.

Set `NEXT_PUBLIC_SITE_URL=https://pesaguard.co.ke` for production deployments. The sitemap, robots.txt, canonical URLs and metadata base all use this canonical domain by default; set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` only when running locally.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```
