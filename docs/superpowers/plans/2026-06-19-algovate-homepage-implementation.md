# Algovate Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved Algovate corporate homepage and publish it as the organization site at `https://algovate.github.io/`.

**Architecture:** Use a small Vite-powered static site with semantic HTML, focused CSS modules, and lightweight progressive-enhancement JavaScript. A Node build script fetches GitHub organization/repository data into a generated JSON artifact and falls back to a checked-in snapshot when the API is unavailable. GitHub Actions builds, tests, and deploys the `dist` artifact to GitHub Pages.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Vite, Node.js test runner, GitHub REST API, GitHub Actions, GitHub Pages

---

## File Structure

- `index.html` — semantic page shell, metadata, all six approved content sections
- `src/styles.css` — brand tokens, responsive layout, interactions, accessibility, motion
- `src/main.js` — menu, reveal enhancement, pointer signal, counters, current year
- `src/content.js` — approved editorial copy, capabilities, thesis, CTA configuration
- `src/data/github.generated.json` — generated build-time organization/project data
- `src/data/github.fallback.json` — checked-in verified fallback snapshot
- `scripts/fetch-github-data.mjs` — GitHub API normalization and fallback behavior
- `tests/github-data.test.mjs` — normalization and fallback tests
- `public/algovate-avatar.png` — locally cached real organization avatar
- `public/favicon.png` — browser icon derived from the organization avatar
- `.github/workflows/deploy-pages.yml` — test, build, upload, and Pages deployment
- `.gitignore` — generated and local-only paths
- `package.json` — project scripts and Vite dependency
- `README.md` — local development, content configuration, data refresh, deployment

### Task 1: Bootstrap the static site

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `src/content.js`
- Create: `src/data/github.fallback.json`
- Create: `public/algovate-avatar.png`
- Create: `public/favicon.png`

- [ ] **Step 1: Add package scripts**

Define `data:refresh`, `dev`, `test`, `build`, and `preview`. `build` must refresh GitHub data before invoking Vite.

- [ ] **Step 2: Add verified content configuration**

Store the contact destination as the new public repository's issue creation URL:
`https://github.com/Algovate/algovate.github.io/issues/new?template=partnership.yml`.

- [ ] **Step 3: Add the verified fallback snapshot**

Include retrieval time, organization counts, and the curated repository set. Keep external URLs explicit.

- [ ] **Step 4: Cache the organization avatar**

Download the GitHub organization avatar and create a favicon-sized copy.

- [ ] **Step 5: Install dependencies**

Run: `npm install`  
Expected: Vite installs and a lockfile is created.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .gitignore src/content.js src/data/github.fallback.json public
git commit -m "chore: bootstrap Algovate homepage"
```

### Task 2: Implement and test GitHub data generation

**Files:**
- Create: `scripts/fetch-github-data.mjs`
- Create: `tests/github-data.test.mjs`
- Generate: `src/data/github.generated.json`

- [ ] **Step 1: Write normalization tests**

Cover organization metrics, exclusion of forks from the original build count, aggregate stars, curated project metadata, and stable fallback output.

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test`  
Expected: failure because the data module is not implemented.

- [ ] **Step 3: Implement the data module**

Export pure normalization functions for tests. When run directly, fetch `Algovate` organization and repositories, write normalized JSON atomically, and use the fallback snapshot with a warning if fetching fails.

- [ ] **Step 4: Run tests and refresh data**

Run: `npm test && npm run data:refresh`  
Expected: tests pass and `src/data/github.generated.json` contains current data.

- [ ] **Step 5: Commit**

```bash
git add scripts tests src/data/github.generated.json
git commit -m "feat: generate GitHub evidence data"
```

### Task 3: Build the approved homepage

**Files:**
- Create: `index.html`
- Create: `src/styles.css`
- Create: `src/main.js`

- [ ] **Step 1: Create semantic page structure**

Implement global navigation, hero, proof, selected work, capabilities, thesis, partnership CTA, and footer. Use the real avatar and real project URLs. Add complete SEO, Open Graph, and Organization JSON-LD metadata without unsupported claims.

- [ ] **Step 2: Implement the Technical Frontier visual system**

Create the near-black canvas, signal-green accent, editorial typography, lightweight signal object, grid field, project card system, responsive breakpoints, and visible focus states.

- [ ] **Step 3: Add progressive enhancement**

Implement accessible mobile navigation, one-time counters, section reveals, bounded pointer response, current year, and full reduced-motion handling. The page must remain readable without JavaScript.

- [ ] **Step 4: Build**

Run: `npm run build`  
Expected: Vite creates `dist` without errors.

- [ ] **Step 5: Commit**

```bash
git add index.html src
git commit -m "feat: build Algovate corporate homepage"
```

### Task 4: Configure contact and GitHub Pages deployment

**Files:**
- Create: `.github/ISSUE_TEMPLATE/partnership.yml`
- Create: `.github/workflows/deploy-pages.yml`
- Create: `README.md`

- [ ] **Step 1: Create the partnership issue form**

Request name, organization, contact email, collaboration type, and context. Keep public-data implications clear because GitHub issues are public.

- [ ] **Step 2: Create the Pages workflow**

On pushes to `main`, install with `npm ci`, run tests, build, configure Pages, upload `dist`, and deploy with official GitHub Pages actions.

- [ ] **Step 3: Document operation**

Document local development, GitHub data refresh/fallback behavior, contact configuration, and deployment URL.

- [ ] **Step 4: Validate workflow and build**

Run: `npm test && npm run build`  
Expected: all tests pass and the production artifact exists.

- [ ] **Step 5: Commit**

```bash
git add .github README.md
git commit -m "ci: deploy homepage to GitHub Pages"
```

### Task 5: Browser verification

**Files:**
- Modify as needed: `index.html`, `src/styles.css`, `src/main.js`

- [ ] **Step 1: Start the production preview**

Run: `npm run preview -- --host 127.0.0.1`  
Expected: local production URL is available.

- [ ] **Step 2: Verify desktop**

Check navigation, both CTAs, all project links, project metadata, animation, focus states, console output, and visual hierarchy.

- [ ] **Step 3: Verify mobile**

Check menu behavior, single-column flow, touch targets, no horizontal overflow, and readable hero composition.

- [ ] **Step 4: Verify reduced motion and script failure**

Confirm nonessential animation is disabled under reduced motion and the raw built page still contains all content.

- [ ] **Step 5: Fix and re-run checks**

Run: `npm test && npm run build`  
Expected: all checks pass after browser fixes.

- [ ] **Step 6: Commit any verification fixes**

```bash
git add index.html src
git commit -m "fix: polish responsive homepage behavior"
```

### Task 6: Publish the organization site

**Files:**
- Modify: Git remote and GitHub repository settings

- [ ] **Step 1: Rename the local branch**

Run: `git branch -M main`

- [ ] **Step 2: Create the public organization repository**

Run:

```bash
gh repo create Algovate/algovate.github.io --public --source=. --remote=origin --description "Algovate — Intelligence in Motion"
```

- [ ] **Step 3: Push**

Run: `git push -u origin main`

- [ ] **Step 4: Enable GitHub Pages through Actions**

Configure the repository Pages build type to `workflow` using the GitHub API if it is not activated automatically.

- [ ] **Step 5: Monitor deployment**

Wait for the Pages workflow to succeed and inspect its logs if it fails.

- [ ] **Step 6: Verify production**

Open `https://algovate.github.io/`, confirm HTTP success, inspect the rendered desktop and mobile page, verify assets and links, and check for console errors.

- [ ] **Step 7: Report the deployed URL**

Only report completion after the live site and workflow are both verified.
