# Public website asset provenance

This register records the visual assets used by the PesaGuard public website and the source alignment performed for the shared brand pass.

## First-party shared brand assets

The public website's brand artwork is synchronized with the existing PesaGuard developer platform repository:

- Source repository: https://github.com/Victor-Kipruto-Rop/developer.plartform
- Source paths: `frontend/public/favicon.svg`, `frontend/public/pesaguard-icon.svg`, `frontend/public/pesaguard-logo.svg`, `frontend/public/pesaguard-logo-light.svg`, and `frontend/public/pesaguard-brand-mark.svg`
- Source branch inspected: `main`
- Destination paths:
  - `public/favicon.svg`: browser favicon
  - `public/logo/favicon.svg`: favicon compatibility copy
  - `public/logo/icon.svg`: app/touch icon
  - `public/logo/brand-mark.svg`: shared shield, payment-card and verified-check mark used by the public header/footer
  - `public/logo/logo.svg`: default logo/wordmark
  - `public/logo/logo-dark.svg`: light logo for dark surfaces
  - `public/logo/logo-light.svg`: dark/green logo for light surfaces

These are first-party assets copied from the PesaGuard developer platform repository, not third-party downloads. The palette is aligned to the developer UI's forest green (`#0B5D3B`), mint green (`#22C55E`), white and pale green surfaces.

## Social-share images

No Open Graph/Twitter share image is currently shipped. The SEO default therefore uses a standard summary card instead of advertising a large-image card without an image. No new raster artwork was created and no SVG was assigned as a social preview because support for SVG social cards is inconsistent.

## Third-party assets

_No third-party assets were added in this pass._

Before adding a third-party asset, record:
- Asset name and local path
- Direct asset/source page URL
- Creator or copyright holder
- Specific license/terms and attribution requirements
- Date checked/downloaded
- Page/component where the asset is used

A file being publicly accessible does not itself grant permission to reuse it.

## Original artwork

_No new illustration was added._ The homepage already has a custom transaction-pipeline canvas. The work focused on shared brand identity, theme tokens, accessible form states and existing page UI rather than adding generic stock finance imagery.
