---
# This file is the shelf. It is written to look exactly like what an Obsidian
# note will emit, so the build parser works the same before and after the
# vault sync is wired up.
#
# Per book:
#   title, author   required
#   finished        YYYY-MM, recent shelf only
#   format          paperback | hardcover | ebook   (sets spine height band; default paperback)
#   pages           spine thickness; if absent the build takes Open Library's median
#   isbn            optional, makes the cover lookup exact
#   cover           optional URL override; otherwise the build asks Open Library
#   blurb           optional; otherwise the build takes Open Library's description
#   thoughts        optional, renders only when present
#
# Cover colour for the shelf band is sampled from the cover at build time,
# never here.

current:
  - title: Answered Prayers
    author: Truman Capote
    format: paperback

recent:
  - title: Kokoro
    author: Natsume Sōseki
    finished: 2026-08
    format: paperback

  - title: Paradise of the Blind
    author: Dương Thu Hương
    finished: 2026-08
    format: paperback

  - title: Life for Sale
    author: Yukio Mishima
    finished: 2026-07
    format: paperback

  - title: Austral
    author: Carlos Fonseca
    finished: 2026-07
    format: hardcover
---
