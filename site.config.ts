/**
 * Every personal detail on the site lives here.
 * Nothing below this file should hardcode a name, URL or handle.
 */

export const site = {
  name: "Trinav Chaudhuri",

  /** Shown in the nav. Set to `name` if you'd rather have the full thing. */
  shortName: "Trinav",

  /** Used in <title>, OG cards and the resume redirect. No trailing slash. */
  url: "https://REPLACE-ME.com",

  /** One line. Used in meta description and OG cards, not printed on the page. */
  role: "Applied AI / ML Engineer",

  description:
    "Applied AI engineer working on clinical AI infrastructure. Cornell Tech.",

  email: {
    address: "tc839@cornell.edu",
    /**
     * Render behind a click rather than as plain text in the markup.
     * Cuts most scraping for the cost of one interaction.
     */
    obfuscate: true,
  },

  links: {
    github: "https://github.com/trinav-code",
    linkedin: "https://www.linkedin.com/in/trinav-chaudhuri-16a1921a9/",
    medium: "https://medium.com/@trinav.chaudhuri",
  },

  /** Fetched at build time and merged into /writing. Titles and dates only. */
  feeds: {
    medium: "https://medium.com/feed/@trinav.chaudhuri",
    /**
     * Goodreads "read" shelf RSS. Profile > the RSS icon at the bottom of
     * your shelf page, or https://www.goodreads.com/review/list_rss/<user-id>?shelf=read
     * Empty string skips the import.
     */
    goodreads: "https://www.goodreads.com/review/list_rss/171932170?shelf=read",
  },

  /** /resume redirects here. Update the target, never the path. */
  resume: "/files/trinav-chaudhuri.pdf",

  /**
   * Read at build time for repo metadata (test counts, last commit).
   * Projects reference these by key in their frontmatter.
   */
  githubUser: "trinav-code",
} as const;

/**
 * The only colour on the site. Each tag is an information channel,
 * not decoration. Adding a fifth means adding a real fifth domain.
 */
export const domains = {
  health: { label: "Health AI", color: "#2F6B5E" },
  compliance: { label: "Compliance", color: "#7A3E52" },
  sport: { label: "Sports", color: "#3B5486" },
  data: { label: "Data", color: "#8A6420" },
} as const;

export type Domain = keyof typeof domains;
