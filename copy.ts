/**
 * Every sentence a visitor reads lives here, organised by page and section.
 * Components import from this file and hardcode nothing. Personal facts
 * (name, links, email) stay in site.config.ts; this file is prose.
 *
 * Entries that depend on a number are functions so the count stays derived.
 */

export const copy = {
  nav: {
    work: "Work",
    writing: "Writing",
    about: "About",
  },

  footer: {
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    medium: "Medium",
    colophon: "Colophon",
  },

  home: {
    name: "Trinav Chaudhuri",
    role: "Applied AI / ML Engineer",
    hero: [
      "I build clinical AI that has to work when there is a real patient on the other end of it.",
      "Most of what I do is unglamorous. Pipelines, retrieval, evals, the plumbing that decides whether a model is useful or just fluent. I care a lot about the difference.",
      "I started in a wet lab and ended up here, which felt like a detour for about three years and then suddenly did not.",
    ],

    work: {
      heading: "Work",
      link: "All roles",
    },
    education: {
      heading: "Where I studied",
      link: "How this happened",
    },
    projects: {
      heading: "Selected projects",
      link: "All projects",
    },
    writing: {
      heading: "Writing",
      link: "Archive",
    },
    currently: {
      heading: "Currently",
      reading: "Reading",
      readingAside: "Pulled from my notes, so it stays honest about the ones I abandoned.",
      shelfLabel: "Bookshelf",
      readingNow: "reading now",
      finished: (when: string) => `finished ${when}`,
      coverAlt: (title: string) => `Cover of ${title}`,
      close: "Close",
      listening: "Listening",
      listeningAside: "Eighteen years of tabla means I notice the percussion first, every time.",
      globe: "Everywhere I have been so far, on one slowly turning ball.",
      globeLink: "Open the globe",
    },
  },

  work: {
    title: "Work",
    description: "Every project, filterable by domain.",
    heading: "Everything I have shipped or nearly shipped, by domain.",
    filterAll: "All",
    filterLabel: "Filter by domain",
    /* Project page */
    live: (host: string) => `Live at ${host}`,
    source: "Source on GitHub",
  },

  writing: {
    title: "Writing",
    description: "Essays and notes, mostly about building things that have to be right.",
    heading: "I write when a project leaves a question I could not answer while building it.",
    intro:
      "Mostly the maths behind something that looked simple, or the part of a system that turned out to be the whole system. Long form lives on Medium for now; the shorter notes will live here.",
    draft: "Draft",
    draftsGroup: "Drafts",
    externalMarker: "↗",
    externalLabel: "on Medium",
    elsewhere: (n: number, mediumLink: string) =>
      n === 1
        ? `Everything marked ↗ opens on ${mediumLink}, where one piece is published so far.`
        : `Everything marked ↗ opens on ${mediumLink}, where ${n} pieces are published so far.`,
    elsewhereEmpty: "Medium was unreachable at build time, so only local notes are listed.",
  },

  about: {
    title: "About",
    description: "How four degrees across biology, data science and information science turned into one job.",
    heading:
      "Molecular biology, then data science, then applied information science and information systems. It reads like four things. It was one.",
    intro: "Placeholder. The owner will write this as a path, not a list.",
    work: "Work",
    education: "Where I studied",
  },

  globe: {
    title: "Globe",
    description: "Everywhere so far, on one slowly turning ball.",
    heading: "Everywhere I have been so far.",
    intro: "The globe itself arrives in a later pass. This page holds its place.",
  },

  colophon: {
    title: "Colophon",
    description: "How this site is built and who it borrows from.",
    heading: "How this is built, and who it borrows from.",
    stack:
      "Astro, content collections, MDX. Static output, deployed on Vercel. Newsreader for the serif, Instrument Sans for everything else. The only colour on the site is the four domain tags, and each one means something.",
    globeHeading: "The globe",
    /* Links are rendered by the component; these are the words around them. */
    globeBefore: "The globe is ",
    globeCobe: "cobe",
    globeMiddle: " by Shu Ding. The idea of having a globe at all is borrowed from ",
    globeFabian: "Fabian Schultz",
    globeAfter: ", whose site source is ",
    globePublic: "public",
    globeEnd: ".",
  },

  notFound: {
    title: "Not found",
    heading: "Nothing here.",
    back: "Back to the start.",
  },

  /* Shared bits */
  dates: {
    now: "now",
    lastMonth: "Last month",
    recently: "Recently",
  },
} as const;
