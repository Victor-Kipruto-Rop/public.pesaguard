# Public frontend brand and UI consistency audit

**Repository:** `Victor-Kipruto-Rop/public.pesaguard`  
**Reference:** `Victor-Kipruto-Rop/developer.plartform/frontend` on `main`  
**Work branch:** `fix/frontend-asset-recovery-from-main`  
**Scope:** Public website theme, shared brand assets, form interaction and metadata

## Reference UI inspected

- `frontend/src/pages/auth/AuthPages.tsx` — login, registration, email verification/MFA, password recovery and reset flows; inline validation, touched-field handling, disabled/loading states, six-digit code inputs, accessible notices and focus handling.
- `frontend/src/styles/auth-pages.css` — auth page surfaces, rounded controls, field focus treatment, error styling and reduced-motion-aware transitions.
- `frontend/src/styles/globals.css` — shared light palette, Inter typography and forest/mint tokens.
- `frontend/public/favicon.svg`, `pesaguard-icon.svg`, `pesaguard-logo.svg`, `pesaguard-logo-light.svg`, and `pesaguard-brand-mark.svg` — first-party favicon, icon, logo and brand mark.

## Findings

1. The public website had a different lime/charcoal palette and a `PG` monogram in the header/footer instead of the shield/payment-card/check mark used by the developer platform.
2. The public website used Manrope while the developer platform uses Inter.
3. The public contact form relied on native validation and did not present the same accessible, inline field-error pattern as the developer authentication screens.
4. The public homepage includes a bespoke payment-flow canvas. No extra stock illustration was needed.
5. The SEO configuration has no Open Graph/Twitter share image; the Twitter card type remains `summary` rather than claiming a large image is available.
6. The canonical production domain is `https://pesaguard.co.ke`, with connected service references under the `.co.ke` domain family.

## Changes made

- Synchronized the favicon, icon, default/reversed wordmarks and brand mark from the developer platform's first-party assets.
- Replaced the visible `PG` monogram in the public header/footer with the shared shield/payment-card/check brand mark and split-color wordmark.
- Aligned the global public-site design tokens with the developer platform's forest/mint palette, light surfaces, Inter font and green-tinted shadows.
- Updated the public homepage, API, marketing, section and animation accent glows from yellow-lime to mint/green.
- Updated the pipeline canvas's matched-transaction accent to the forest-green palette.
- Added matching favicon/apple icon and browser theme-color metadata.
- Improved the public contact form with touched-field and submit-attempt validation, `aria-invalid`, `aria-describedby`, inline messages, consistent focus/error styles, and reduced-motion-aware transitions. The form still clearly explains that it opens an email draft rather than creating a ticket.
- Documented the first-party asset source in `public/assets/ASSET_SOURCES.md`.
- Kept the existing public page content and routes; no authentication or payment business logic was replaced.

## Verification status

- [x] Inspected developer authentication components and styles.
- [x] Inspected source favicon, icon, logo and brand-mark assets.
- [x] Read back updated public assets and changed files from the work branch.
- [x] Confirmed the public stylesheet no longer contains the old `#d8ff4f` lime accent or its `rgba(216, 255, 79, ...)` variants in the checked files.
- [ ] Run SVG/XML validation in a local build environment.
- [ ] Run lint and typecheck.
- [ ] Run unit tests and production build.
- [ ] Run browser/E2E visual checks at desktop and mobile sizes.
- [ ] Inspect the deployed pages, favicon caching and browser theme color.

The repository integration permits source edits and read-back, but no local browser runtime was used in this pass. The unchecked verification items are not claimed as passed.
