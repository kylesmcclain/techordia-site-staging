# Techordia MSP Website

Static multi-page marketing site for Techordia, styled around the blue and teal Techordia brand palette with a dark MSP service-site structure.

## Edit Content

- Page content, navigation, services, industries, resources, locations, and footer policy links live in `site-data.mjs`.
- Generated HTML pages are created by `build-site.mjs`; avoid hand-editing generated `index.html` files unless it is a one-off emergency.
- Visual styling lives in `styles.css`.
- Motion, mobile navigation, reveal effects, orbit graphics, and the animated globe live in `script.js`.

After editing `site-data.mjs` or `build-site.mjs`, regenerate the site:

```powershell
node build-site.mjs
```

## Preview

Run a static server from this folder:

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.
