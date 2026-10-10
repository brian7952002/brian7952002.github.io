# brian7952002.github.io

Personal portfolio for Brian Skelton, Solutions Architect & Technical Consultant.
Live at **https://brian7952002.github.io**.

Plain HTML, CSS and JavaScript. No framework, no build step.

## Layout

| Path | What it is |
| --- | --- |
| `docs/` | **The website.** GitHub Pages serves this folder and nothing else. |
| `docs/index.html` | All page content |
| `docs/assets/css/style.css` | Styles; theme tokens (light/dark) are at the top |
| `docs/assets/js/main.js` | Theme toggle, mobile menu, integration-map log, scroll reveals |
| `docs/assets/img/` | Favicon and the social preview image (`og.png`) |
| `docs/404.html` | Not-found page |
| `tools/og-image.html` | Source for `og.png` (see below) |

## Run it locally

```bash
python -m http.server 5174 --directory docs
```

Then open http://localhost:5174.

## Common edits

**Add a case study:** copy one `<article class="case">` block in `docs/index.html`
under `/01 Case studies`. Change the colored panel with the inline `--slab` color,
and fill in the Problem / Build / Impact cells.

**Add a build (code project):** copy one `<article class="repo">` block under
`/02 Builds`. Set the language dot color (GitHub's language color) and the links.
To make it the wide featured card, add the `feature` class and an `.art` panel.

**Change availability:** edit the `status:` tag in the hero and the
contact paragraph near the bottom.

**Regenerate the social preview image** after changing the headline:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --hide-scrollbars --window-size=1200,630 --screenshot="docs/assets/img/og.png" "tools/og-image.html"
```

## Deploy

GitHub Pages: **Settings → Pages → Build and deployment → Deploy from a branch →
`main` / `/docs`**. Every push to `main` redeploys within a minute or two.

The repository is public (required for GitHub Pages on a free plan).
