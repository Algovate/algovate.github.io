# Algovate Homepage

Corporate homepage for [Algovate](https://github.com/Algovate), published at
[algovate.github.io](https://algovate.github.io/).

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run build
npm run preview
```

`npm run build` retrieves current public GitHub organization and repository
data. If GitHub is unavailable or rate-limited, the build uses
`src/data/github.fallback.json` and prints a warning.

## Content

- Page structure and editorial copy: `index.html`
- CTA URLs: `src/content.js`
- Verified GitHub fallback: `src/data/github.fallback.json`
- Generated GitHub data: `src/data/github.generated.json`
- Brand asset: `public/algovate-avatar.png`
- Self-hosted type: `public/fonts/switzer-*.woff2`

The “Start a conversation” CTA opens the repository's public partnership issue
form. Visitors are warned not to submit confidential information.

## Typography

The site uses Switzer by the Indian Type Foundry, self-hosted from Fontshare
under the [ITF Free Font License](https://www.fontshare.com/licenses/itf-ffl).
The original source is [fontshare.com/fonts/switzer](https://www.fontshare.com/fonts/switzer).

## Deployment

Pushes to `main` run tests, build the static site, and deploy `dist` through
GitHub Actions and GitHub Pages.
