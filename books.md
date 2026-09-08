---
# The shelf. Order in this file is shelf order (left to right): current
# books first, then recent, newest finished on the left. Edit here or run
# `npm run dev` and open /edit-books for a drag-and-drop editor that writes
# this file back.
#
# Per book:
#   title, author   required
#   finished        YYYY-MM, or just YYYY when the month is fuzzy
#   format          physical | ebook | audiobook   (default physical; ebook renders slightly thinner)
#   pages           spine thickness; if absent the build takes Open Library's median
#   isbn            optional, makes the cover lookup exact
#   cover           optional URL override; otherwise the build asks Open Library
#   thoughts        optional, renders in the panel only when present
#   tags            optional list, e.g. [football]
#
# Cover colour for the spine band is sampled from the cover at build time.
# Goodreads: set feeds.goodreads in site.config.ts and any book on the
# "read" shelf that is not listed here is appended at build.

current:
  - title: Answered Prayers
    author: Truman Capote
    format: physical

  - title: A Brief History of Intelligence
    author: Max Bennett
    format: physical
recent:
  - title: Kokoro
    author: Natsume Sōseki
    finished: 2026-07
    format: physical

  - title: A History of Fear
    author: Luke Dumas
    finished: 2026-07
    format: physical

  - title: Austral
    author: Carlos Fonseca
    finished: 2026-07
    format: physical

  - title: Paradise of the Blind
    author: Dương Thu Hương
    finished: 2026-06
    format: physical

  - title: The Only One Left
    author: Riley Sager
    finished: 2026-06
    format: physical

  - title: The Secret of Secrets
    author: Dan Brown
    finished: 2026-05
    format: physical

  - title: Convenience Store Woman
    author: Sayaka Murata
    finished: 2026-03
    format: physical

  - title: Small Things Like These
    author: Claire Keegan
    finished: 2026-02
    format: physical

  - title: Life for Sale
    author: Yukio Mishima
    finished: 2026-01
    format: physical

  - title: Expected Goals
    author: Rory Smith
    finished: 2025
    format: physical
    tags:
      - football

  - title: The Mixer
    author: Michael Cox
    finished: 2025
    format: physical
    tags:
      - football

  - title: Inverting the Pyramid
    author: Jonathan Wilson
    finished: 2025
    format: physical
    tags:
      - football

  - title: Net Gains
    author: Ryan O'Hanlon
    finished: 2025
    format: physical
    tags:
      - football

  - title: Soccernomics
    author: Simon Kuper
    finished: 2025
    format: physical
    tags:
      - football

  - title: The Numbers Game
    author: Chris Anderson
    finished: 2025
    format: physical
    tags:
      - football
---
