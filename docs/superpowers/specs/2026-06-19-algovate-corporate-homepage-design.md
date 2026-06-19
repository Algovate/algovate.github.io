# Algovate Corporate Homepage — Design Specification

Date: 2026-06-19  
Status: Approved for implementation planning

## 1. Objective

Create an English-first corporate homepage for Algovate that positions the organization as:

- an open-source ecosystem;
- an enterprise AI collaboration partner; and
- an incubator of intelligent products and new ventures.

The homepage primarily addresses investors, strategic partners, and prospective team members. Its main conversion is starting a partnership conversation. GitHub remains the principal evidence and secondary navigation path.

## 2. Verified Public Context

Source: Algovate's public GitHub organization and GitHub API, reviewed on 2026-06-19.

- Organization tagline: “Intelligence in Motion”
- Location: United States of America
- Public repositories: 55
- Original, non-fork repositories: 44
- Total stars across public repositories at review time: 99
- Organization created: 2025-05-14
- Primary public brand asset: GitHub organization avatar
- Representative projects include `xhs-mcp`, `Zephyr`, `Quanta`, `jimeng-cli`, `agent-skills-deep-dive`, and `ai-quant-trader`

Repository and star counts are time-sensitive. The implementation must retrieve them at build time and retain checked-in fallback data.

## 3. Brand Position

### Core proposition

Algovate identifies emerging technical signals, turns them into useful open tools, and develops the strongest signals into durable products, partnerships, and ventures.

### Public operating thesis

Open source is how Algovate learns in public:

1. build quickly;
2. publish useful primitives;
3. observe real adoption;
4. invest deeply where momentum appears.

### Audience priority

1. Investors and strategic partners
2. Prospective collaborators and talent
3. Developers exploring Algovate's open-source work

### Primary call to action

`Start a conversation`

The action will use a clearly configured contact destination supplied during implementation. Until an address or form destination is available, the interface must label the dependency explicitly rather than invent contact details.

### Secondary call to action

`Explore GitHub`

Destination: `https://github.com/algovate/`

## 4. Creative Direction

Selected direction: **Technical Frontier**, moderated by editorial restraint.

The design uses a near-black technical field, a luminous green signal color, precise typography, and restrained motion. It must avoid generic cyberpunk imagery, decorative dashboards, excessive glow, terminal clichés, and unsupported claims about company scale or clients.

### Visual principles

- Dark neutral backgrounds with high legibility
- Green used as a directional signal, not a blanket tint
- Large, concise headlines with editorial spacing
- Visible grid logic, but not a literal dashboard
- Real GitHub evidence in place of generic credibility statements
- Sparse motion that reinforces “Intelligence in Motion”
- Project content curated into a company narrative rather than shown as a repository dump

### Initial design tokens

These are implementation starting points and may be tuned while preserving contrast and character:

- Background: `#070908`
- Raised surface: `#0C100E`
- Primary text: `#EFF7F3`
- Secondary text: `#829089`
- Border: `#26302C`
- Signal green: `#5DFFBF`
- Dark green text on signal background: `#04100B`

### Brand asset handling

Use the real GitHub organization avatar as the current logo asset. Do not redraw it. Cache a local copy for production and preserve aspect ratio. If Algovate supplies an official logo or brand kit later, it replaces the avatar without changing the page structure.

## 5. Information Architecture

### Global navigation

- Projects
- Capabilities
- Thesis
- Start a conversation

The navigation is compact, sticky after the hero threshold, keyboard accessible, and reduced to a simple mobile menu below the responsive breakpoint.

### Section 1 — Position

Purpose: establish what Algovate is and provide the primary action immediately.

Proposed headline:

> We build AI that moves.

Supporting copy:

> Open tools, intelligent systems, and new ventures built at the edge of what is newly possible.

Actions:

- Start a conversation
- Explore GitHub

The hero contains a lightweight animated signal object and grid field. The visual may respond subtly to pointer movement but must not interfere with reading.

### Section 2 — Proof in public

Purpose: replace unsupported corporate claims with verifiable delivery data.

Display:

- public repository count;
- original build count;
- aggregate GitHub stars; and
- a concise recent-activity signal, such as the latest repository update date.

Each metric includes a small source indication and uses build-time data. Counts animate once on entry from zero to the current cached value. They do not run as fake live counters.

### Section 3 — Selected work

Purpose: show a coherent range of technical capability through three flagship projects.

Initial editorial set:

1. `xhs-mcp` — MCP and CLI automation for a major social platform
2. `Zephyr` — multimodal AI generation gateway
3. `Quanta` — real-time AI market intelligence

Each card includes:

- project name;
- concise English description;
- strategic category;
- primary language or stack;
- current GitHub stars where available; and
- direct repository link.

If one selected project lacks enough public documentation to support credible copy, replace it with the strongest documented project from the verified repository dataset. Do not fabricate product maturity or adoption.

### Section 4 — Capabilities

Purpose: explain what Algovate can create with a partner beyond existing repositories.

Three capability groups:

1. **AI Infrastructure** — MCP, agent systems, model gateways, orchestration, automation
2. **Intelligent Products** — focused software tools with demonstrable user utility
3. **Venture Incubation** — experiments developed into durable products and businesses

Copy remains capability-led and avoids claiming services, customers, or outcomes not evidenced publicly.

### Section 5 — Thesis

Purpose: unify a diverse portfolio under a defensible operating philosophy.

Core message:

> Open source is how we learn in public.

This section explains the four-step operating thesis and connects rapid experimentation with selective long-term investment.

### Section 6 — Partnership

Purpose: close with a direct collaboration invitation.

Proposed headline:

> Put intelligence in motion.

Supporting line:

> For strategic partnerships, ambitious product ideas, and conversations about what comes next.

Actions:

- Start a conversation
- Explore GitHub

### Footer

Include:

- Algovate identity and tagline;
- GitHub link;
- contact destination;
- current year; and
- concise legal/copyright text.

Do not add unsupported social channels.

## 6. Interaction and Motion

### Entry

- Hero headline resolves within approximately 600 ms.
- Signal object follows roughly 120 ms later.
- Text remains stable after entry.

### Scroll

- Sections reveal once using low-distance vertical translation and opacity.
- Motion should help sequence the argument, not decorate every element.

### Hero signal

- Implement with lightweight CSS or canvas.
- No autoplay video or large 3D library.
- Pointer response is subtle and bounded.
- Static fallback renders correctly when JavaScript is unavailable.

### Project cards

- Hover and keyboard focus expose supporting metadata.
- Repository links remain directly accessible.
- No modal is required.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- disable continuous floating, orbiting, and pointer-follow effects;
- remove smooth scrolling;
- show all content without reveal transitions; and
- retain all information and visual hierarchy.

## 7. Content and Data Architecture

### Repository data

Use a build-time GitHub API request to generate a normalized local data artifact. The page must render from the generated artifact, not fetch GitHub directly in the visitor's browser.

The checked-in fallback dataset must include:

- organization metrics;
- selected repository metadata;
- retrieval timestamp; and
- source URLs.

If the build-time request fails or is rate-limited, the build uses the fallback and logs a clear warning. A stale timestamp may be displayed internally or in source metadata, but the public page must not falsely label stale counts as live.

### Content source

Company copy and editorial project selection should live in a small typed local content module or structured data file. This keeps company narrative separate from fetched repository metrics and makes future editing possible without changing layout code.

### Contact dependency

The implementation requires one real contact target:

- a company email address;
- a scheduling URL; or
- an approved contact form endpoint.

The destination must be configured in one place. Missing configuration should fail clearly during development and must never silently route to a fabricated address.

## 8. Responsive Behavior

- Desktop composition is the primary art direction.
- Tablet reduces decorative scale and card density while retaining section order.
- Below approximately 760 px, content becomes a single readable column.
- The hero signal moves behind or beside text without reducing contrast.
- Metrics wrap into a two-column or single-column grid.
- Navigation becomes a compact accessible menu.
- Touch targets are at least 44 px.

## 9. Accessibility

- Meet WCAG 2.2 AA color contrast for text and controls.
- Use semantic landmarks and heading order.
- Provide visible keyboard focus.
- Ensure navigation, project cards, and menu controls work without a pointer.
- Give the logo meaningful alternative text.
- Treat the hero signal as decorative and hide it from assistive technology.
- Do not encode project categories or states through color alone.
- Respect reduced-motion and high-contrast preferences where supported.

## 10. Performance and Reliability

Targets:

- no hero video;
- no unnecessary full 3D engine;
- production images locally optimized;
- JavaScript limited to navigation, motion enhancement, and optional metrics animation;
- page remains readable and navigable if enhancement scripts fail;
- avoid layout shifts by reserving media dimensions;
- target strong Core Web Vitals on representative mobile hardware.

The GitHub API must not be a runtime availability dependency for visitors.

## 11. SEO and Metadata

Provide:

- descriptive English page title;
- concise meta description;
- canonical URL once known;
- Open Graph and social preview metadata;
- organization structured data using only verified fields; and
- favicon derived from the approved brand asset.

Do not include fabricated founding narratives, team size, customer logos, funding status, or office locations.

## 12. Error States

- Build-time GitHub failure: use checked-in fallback and warn during build.
- Missing contact target: development error with explicit configuration instructions.
- Missing logo asset: fail asset validation rather than substituting a generic mark.
- Failed decorative motion: retain static visual and all textual content.
- Repository without sufficient metadata: omit unsupported fields and preserve the repository link.

## 13. Verification and Acceptance Criteria

The implementation is complete when:

1. All six homepage sections and global navigation are present.
2. The page is English-first and follows the approved Technical Frontier direction.
3. GitHub metrics come from a build-time generated artifact with a checked-in fallback.
4. Three selected projects link to their real repositories and contain no unsupported claims.
5. Primary CTA uses a real configured contact destination.
6. Desktop, tablet, and mobile layouts are visually verified.
7. Keyboard navigation and visible focus are verified.
8. Reduced-motion mode removes nonessential animation.
9. The page remains useful with JavaScript enhancement disabled.
10. Automated checks cover data normalization and fallback behavior.
11. Browser checks cover navigation, CTAs, project links, mobile menu, and responsive layout.
12. No console errors, broken links, missing assets, or unintended horizontal scrolling remain.

## 14. Out of Scope

- Additional corporate pages
- Blog, CMS, or investor portal
- Authentication
- Backend CRM integration beyond an approved contact endpoint
- Localization beyond the English homepage
- Automated display of every repository
- Inventing client work, partnerships, funding, team members, or business metrics

## 15. Implementation Boundary

This specification defines one production-quality corporate homepage. Additional pages or a broader design system require separate scope and approval.
