# René Dávila — Portfolio

A minimalist, Apple-inspired portfolio for a Data Analyst / Business Intelligence professional. Built with plain HTML, CSS and JavaScript — no framework, no build step — so it can be deployed directly on GitHub Pages.

## Structure

```
rene-davila-portfolio/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── images/
    │   ├── dashboards/
    │   ├── incident-app/
    │   ├── offers-app/
    │   └── pharmacy/
    │
    └── cv/
        └── Rene_Davila_CV.pdf
```

## Before you publish — replace the placeholders

This copy ships with clearly-labeled SVG placeholders and sample contact links so the layout can be reviewed immediately. Swap these out before going live:

1. **Screenshots** — replace the SVG files in `assets/images/<project>/` with real PNG or JPG screenshots (same filenames, or update the `src` in `index.html`). Recommended size: 1200×750px (16:10) for project cards, 1280×720px (16:9) for the case-study modal image.
2. **CV** — drop your real PDF at `assets/cv/Rene_Davila_CV.pdf` (same filename), or update the three links in `index.html` that point to it.
3. **Contact details** — update the email address and LinkedIn/GitHub URLs in `index.html` (they currently appear in the nav, hero and contact section — search for `rene.davila@example.com` and `rene-davila`).

## Running locally

No build step is required. Any static file server works:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (e.g. `rene-davila-portfolio`).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and the `/ (root)` folder, then save.
5. GitHub will publish the site at `https://<your-username>.github.io/rene-davila-portfolio/`.

## Notes on the build

- Single page, five sections: Hero, About, Projects, Experience, Contact — no separate Tools/Skills section by design; technologies are shown per project instead.
- Project case studies open in an accessible modal (Problem → Solution → Impact → Technologies), keyboard-dismissible with `Esc`, and return focus to the trigger button on close.
- Layout is mobile-first: the project grid is 1 column on mobile and 2 columns from tablet width up; the nav collapses into a full-width mobile menu below ~860px.
- Respects `prefers-reduced-motion` — all transitions and the on-scroll reveal are disabled for users who request it.
- Fonts: Inter for display and body text; IBM Plex Mono for small numeric/data labels (step numbers, dates, location), tying the typography to the data/BI subject matter.
