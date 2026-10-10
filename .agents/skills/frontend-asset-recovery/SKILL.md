---
name: frontend-asset-recovery
description: Audit, recover, source, integrate, and verify visual assets for PesaGuard public frontend pages.
---

# Frontend Asset Recovery

## Goal
Restore missing or broken frontend imagery with the smallest safe change set. Preserve PesaGuard's established visual identity and never add decorative assets merely to increase image count.

## Required order of work
1. **Inspect before editing.** Read the app routes, page components, CSS, asset directories, package scripts, CSP/image configuration, and current Git branch. Inventory every image reference and check whether its file exists. Record the route/component that uses it.
2. **Recover originals first.** Search the current repository, relevant local asset directories, accessible Git history and branches, and related PesaGuard frontend repositories the user has authorized. Restore an original asset when its identity and intended use can be established. Do not overwrite working assets or change logos to unrelated substitutes.
3. **Source non-SVG assets only when needed.** For photographs, textures, raster screenshots, and other raster assets that cannot be recovered, use legitimate sources with a compatible license. Prefer official product/brand resources for third-party marks and genuine product screenshots for UI. Verify the exact asset page and license/terms; do not assume a site's general reputation grants permission for every file. Download the original file from its legitimate source, optimize it without visibly degrading quality, and record source URL, creator, license/terms, access date, attribution requirement, and local path in `public/assets/ASSET_SOURCES.md`.
4. **Create original artwork only as SVG.** If a custom illustration is genuinely needed and no recoverable original exists, author clean, accessible, responsive SVG using the existing PesaGuard palette and design language. Do not generate original raster art or convert generated raster art into SVG. Keep SVG markup simple, local, and reviewable.
5. **Do not fabricate product evidence.** Never invent dashboard screenshots, transaction records presented as real, partner logos, customer logos, trust badges, certifications, or performance claims. Use actual verified product captures only, with sensitive information removed.
6. **Integrate into the real UI.** Put assets in the repository's existing asset convention (or `public/assets/` if no convention exists). Update the actual page/component/CSS references, responsive behavior, alt text, dimensions, loading priority, and CSP configuration where required. Decorative images should have empty alt text; meaningful images need concise descriptive alt text. Avoid layout shifts and unnecessary client-side code.
7. **Verify.** Check that every local reference resolves, file formats and SVG markup are valid, attribution records exist, and no obsolete paths remain. Run available lint, typecheck, unit tests, production build, and browser/E2E checks when an executable environment is available. Inspect mobile and desktop layouts, dark/light theme if supported, loading behavior, console/network errors, and reduced-motion behavior. Do not report checks as passed unless they were run.
8. **Report honestly.** Separate recovered originals, licensed downloads, original SVGs, UI integrations, checks actually run, and unresolved items. If the audit finds no missing or justified image needs, document that result and do not add unnecessary stock imagery.

## PesaGuard-specific design constraints
- Preserve the existing forest/deep-green, white, and restrained mint visual identity; follow current tokens and typography.
- Keep the public site premium, calm, trustworthy, and fintech-appropriate. Avoid generic stock-finance imagery, decorative clutter, and generic AI-style illustrations.
- The current homepage already includes a custom transaction-pipeline canvas. Inspect it before proposing a duplicate hero illustration.
- Use only assets required by an actual page or component.
- Do not modify unrelated application behavior, dependencies, or copy during asset recovery.

## Completion checklist
- [ ] Existing asset paths and relevant history inspected.
- [ ] Missing references distinguished from intentional image-free layouts.
- [ ] Original assets recovered where possible.
- [ ] Any raster downloads have verified rights and source records.
- [ ] Any new original illustration is authored as SVG.
- [ ] Assets are integrated into actual components, not merely added to disk.
- [ ] Accessibility, responsive layout, performance, and CSP checked.
- [ ] Lint, typecheck, tests, build, and browser checks reported individually as run/not run.
- [ ] Remaining risks and unverified assumptions listed.
