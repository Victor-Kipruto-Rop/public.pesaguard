# Public frontend asset recovery audit

**Repository:** `Victor-Kipruto-Rop/public.pesaguard`  
**Base inspected:** `main`  
**Work branch:** `fix/frontend-asset-recovery-from-main`  
**Scope:** Public website visual assets

## Findings

1. The repository contains six SVG visual assets: `public/favicon.svg`, `public/logo/favicon.svg`, `public/logo/icon.svg`, `public/logo/logo.svg`, `public/logo/logo-dark.svg`, and `public/logo/logo-light.svg`.
2. No PNG, JPEG, WebP, AVIF, or GIF assets were found in the inspected tree or checked earlier revision. No specific missing raster image was identified that justified adding stock imagery.
3. The app layout references `/favicon.svg`; that file exists and is the browser favicon.
4. The homepage already uses `components/home/PipelineCanvas.tsx` for its payment-flow visualization. It is an existing canvas visualization, not a missing image.
5. A source-level code search did not establish a broken local image path. This does not replace a runtime/browser crawl of every deployed route.
6. The shipped SVG marks were visually inconsistent with the site's visible header/footer identity: the visible wordmark uses a `PG` monogram, while the SVG favicon and logo files used a different abstract glyph. This pass aligns the six existing SVG assets around the PG monogram and the existing ink/lime/paper palette.
7. The SEO configuration requested a Twitter `summary_large_image` card, but page metadata supplied no social-share image. Since no justified raster share image is available in the repository, the card configuration now uses `summary` rather than implying a large image exists.

## Changes in this pass

- Updated the browser favicon and duplicate icon files to use the existing `PG` monogram in the site's established dark-ink and lime palette.
- Updated the three wordmark variants to use the same monogram while retaining light/dark wordmark contrast for their respective surfaces.
- Changed the Twitter card type to `summary` because no social-share image is currently configured; no unverified or unsupported SVG preview was added.
- Did not add third-party raster images or new decorative artwork: the repository has no established missing image slot, and the homepage already has a bespoke transaction-pipeline visual.
- Kept changes scoped to existing asset files and audit documentation; no dependencies or application behavior were changed.

## Verification status

- [x] Inspected the existing SVG asset files and favicon reference.
- [x] Checked for common raster asset extensions in the inspected repository tree and earlier revision.
- [x] Inspected the homepage pipeline visualization and found no need to duplicate it.
- [x] Updated the six SVG asset files and recorded their intended use in the provenance register.
- [x] Matched the Twitter card type to the available metadata assets.
- [ ] Run SVG/XML validation in a local build environment.
- [ ] Run lint.
- [ ] Run typecheck.
- [ ] Run unit tests.
- [ ] Run production build.
- [ ] Run browser/E2E visual checks at desktop and mobile sizes.
- [ ] Inspect deployed favicon caching and social-share previews.

The GitHub integration can commit these text-based SVG and Markdown changes, but it does not provide a local browser runtime in this workflow. The checks above are not claimed as passed unless marked complete.
