# Techordia Staging Site

Static staging rebuild for Techordia's MSP website.

Live staging target:

`https://kylesmcclain.github.io/techordia-site-staging/`

The production GitHub Pages site remains in the separate `techordia-site` repository. This repo is intentionally noindexed with `robots.txt` and a `noindex,nofollow` meta tag.

## Build

```powershell
node build-site.mjs
```

The generator writes exactly 9 pages:

- `/`
- `/services/`
- `/services/fully-managed-it-services/`
- `/services/co-managed-it-services/`
- `/services/cybersecurity/`
- `/services/short-term-it-projects/`
- `/approach/`
- `/about/`
- `/contact/`

## Notes

- Do not hand-edit generated `index.html` files.
- Edit `site-data.mjs`, `build-site.mjs`, `styles.css`, and `script.js`, then rebuild.
- The Google-review-style widget does not show numeric Google review claims until Techordia's Google Business Profile data is verified.
