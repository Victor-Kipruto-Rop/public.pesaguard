# Public website asset provenance

This file records third-party and original assets used by the PesaGuard public website.

## Audit result

At the start of the frontend asset-recovery pass, the repository contained these visual asset files:

- `public/favicon.svg`
- `public/logo/favicon.svg`
- `public/logo/icon.svg`
- `public/logo/logo-dark.svg`
- `public/logo/logo-light.svg`
- `public/logo/logo.svg`

The initial repository-tree and earlier-revision checks found no PNG, JPEG, WebP, AVIF, or GIF assets. The homepage already renders a custom payment-processing visualization in `components/home/PipelineCanvas.tsx`. No specific missing raster asset or broken local image reference was established by this audit.

Therefore, no third-party raster assets have been downloaded as part of this pass. This is intentional: adding unrelated stock photos would not recover missing originals and would weaken the existing focused fintech design.

## Third-party assets

_No third-party assets added in this pass._

When adding one, record:
- Asset name and local path
- Direct asset/source page URL
- Creator or copyright holder
- License/terms and any attribution requirement
- Date checked/downloaded
- Page/component where the asset is used

## Original assets

Existing PesaGuard logo and favicon SVGs are repository assets. Their authorship/license provenance was not independently established in this audit; do not describe them as third-party licensed assets without evidence.

_No new original SVG illustration was added in this pass because the homepage already has a custom pipeline visualization and no missing image slot was identified._

## Review rule

A file being publicly accessible does not by itself grant permission to reuse it. Verify the specific asset's license and terms before downloading or publishing it.
