# Personal site — build brief

Reference render: `index.html` (single-file mockup, home page only). Match its
look. It is the source of truth for type, spacing and palette. Do not redesign it.

## What this is

A personal site for an applied AI engineer working in clinical AI. Two audiences,
in this order:

1. Recruiters and hiring managers at applied-AI, health-tech and product orgs.
   They will spend 30–60 seconds. The home page must be a complete answer on its own.
2. Engineers who click through, read a project writeup, and look at the source.
   Everything below the home page is for them.

The message is capability, cross-domain range, and rigor. Range is demonstrated by
the spread of the work, never asserted in a sentence. Four degrees across molecular
biology, data science, applied information science and information systems are
presented as one trajectory, not a credentials list.

Voice matters more than layout here. Copy should sound like a person talking, dry
and specific. It should never read like a LinkedIn summary. The owner will write
the final copy; treat everything currently in the mockup as placeholder.

## Stack

- Astro. Content-first, MDX for writeups and posts, zero JS by default.
- Islands only for: the bookshelf, the globe. Nothing else ships JS.
- Public GitHub repo. Deploy on Vercel.
- All personal details (name, domain, email, GitHub, LinkedIn, Medium) live in one
  `site.config.ts`. Nothing personal hardcoded in components.

## Design tokens

Taken from the mockup. Do not add to this palette.

```
--paper       #FBFAF7
--ink         #000000
--ink-soft    #565049
--ink-faint   #A29C93
--rule        #E4E0D7
```

Domain colours. These are the **only** colour on the page, and they exist to encode
information, never to decorate:

```
--d-health      #2F6B5E
--d-compliance  #7A3E52
--d-sport       #3B5486
--d-other       #8A6420
```

Type: Newsreader (serif) for hero prose, headings and project titles.
Instrument Sans for body, meta and UI. Measure stays under ~50ch.
Content column is 680px.

## Explicitly rejected

Do not reintroduce these. Each was considered and cut.

- Dark themes of any kind.
- Teal or violet accents, dark navy, monospace numerals as decoration. These read
  as AI-generated and the owner spotted it unprompted.
- Metrics displayed on the home page as right-aligned figures. Reads as a resume.
  Numbers belong inside project writeups where there is context.
- Numbered markers (01 / 02 / 03).
- All-caps eyebrow labels above headings.
- A print stylesheet that regenerates a resume. Six LaTeX resume variants already
  exist with a CLAIM-EVIDENCE file as single source of truth; a CSS resume would
  fork it. Instead: `/resume` is a stable redirect to the current default PDF.
- More than one generative art piece per page.

## Pages

```
/                home
/work            all projects, filterable by domain tag
/work/[slug]     one writeup per project
/writing         index
/writing/[slug]  MDX posts
/about           the four-degree trajectory as a path, not a list
/globe           COBE globe, full page
/colophon        how the site is built and who it borrows from
/resume          redirect to current PDF
/404             reaction-diffusion piece
```

Home page order: masthead + hero, Work (roles), Where I studied, Selected projects,
Writing, Currently (reading + listening + globe teaser), footer.

Roles and projects are visually distinct: roles carry employer and a date range,
projects carry a domain tag and no date. Each section links out so
three items read as a selection rather than the full inventory.

## Features, in build order

**First, the substance**

- Build-time data fetching. Test counts, commit history and last-updated dates come
  from the GitHub API at build, not typed into content files. The numbers are a
  reading off the repo, not a claim. This also stops the site going stale.
- Interactive widgets inside project writeups, only where they earn it. Three
  planned: an AreWeThrough qualification-probability slider; a RegWatch code block
  toggling between clean and violating to show the analyzer's verdict; an Omi
  before/after latency trace. Not every project needs one.
- Margin annotations in writing. Popover API + CSS anchor positioning, zero JS.
  Margin notes on desktop, tap-to-reveal on mobile. Note: `@position-try` needs
  Safari 18.4+, so set a sensible default position.

**Then, polish**

- Bookshelf. Books as spines with vertical text; height and width vary by page
  count so the shelf looks real. Click pulls a book forward and rotates it to face
  the reader, revealing a blurb and optional `thoughts:` field. CSS 3D transforms
  for the pull, native popover for the panel, a real `<button>` per spine for
  keyboard access. Spine colours from a small fixed palette, not random.
- Cmd+K command palette. Jump to a project, copy email, open GitHub.
- Same-document view transitions. Baseline since Oct 2025, safe to rely on.
- Cross-document view transitions (`@view-transition`) as a **progressive
  enhancement only**. Chromium-only; Firefox and Safari ignore the at-rule. A
  project title morphing from the list into the page heading is the target effect.
- Scroll-driven CSS animations. Chromium and Safari only, Firefox has not shipped.
  Enhancement, not foundation. Gentle fade-and-rise on section entry, nothing more.
- Generated OG images per project at build time.
- COBE globe (5kB, `shuding/cobe`) with real coordinates and arcs. Own page. It is
  deliberately minor on the home page — a small dot and a link.

## Content pipeline

- `books.md` lives in the owner's Obsidian vault. obsidian-git auto-commits the
  vault to a private repo; a push fires a Vercel deploy hook; the build parses the
  frontmatter into the shelf. Current book plus last month's shelf. No dashboard,
  no manual step.
- Spotify now-playing via a serverless function, cached. Fails silently to nothing
  if the API is down; never show an error state for this.
- Project writeups are MDX in a content collection so the project count is derived,
  never hardcoded.

## Quality floor

Responsive to mobile. Visible keyboard focus. `prefers-reduced-motion` respected
everywhere including the shelf. No layout shift. The whole point of
choosing Astro is that this site should be very fast; keep it that way.

## Attribution

A real colophon, not a formality. Credit `shuding/cobe` for the globe and Fabian
Schultz (fabianschultz.com, source at github.com/fabe/site) as the inspiration for
having a globe at all. This page is part of the
argument, not an afterthought.

## Resolved since this brief was written

Name, links, email and domain tokens now live in `site.config.ts`. Shelf data is
in `books.md`, role and education history in `roles.md`. Use those, not the
placeholder content in the reference mockup.

## First task

Sweep the GitHub account and the local file structure for every project, cross
reference against the resume variants and CLAIM-EVIDENCE.md in the Obsidian vault,
and produce a candidate list with name, suggested domain tag, repo URL and live URL
for Trinav to confirm. Do not publish a project he has not confirmed. The home page
project count is derived from the content collection, so it will be correct
automatically once the list is settled.

Also fill the two role stubs (Blackprint AI, Manga) from the resume variants and
confirm before publishing.

## Still open

- Domain. `site.config.ts` has a placeholder.
- Which three projects lead on the home page.
