# personal-site

Astro site. See `BRIEF.md` for the design brief and `reference/index.html` for the mockup.

- `site.config.ts`: every personal detail (name, links, email, domain tags).
- `roles.md`, `books.md`: role/education history and the bookshelf, YAML in frontmatter fences.
- `src/content/projects/*.mdx`: one writeup per project. `featured: 1..3` puts it on the home page.
- `src/content/writing/*.mdx`: posts.
- `public/files/`: the resume PDF that `/resume` redirects to.

```
npm install
npm run dev
npm run build
```
