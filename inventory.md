# Inventory

Swept 2026-09-03. Sources: GitHub (trinav-code via gh), local filesystem
(~/personal, ~/Projects, ~/Desktop, ~/Documents, ~/Downloads, ~/research,
~/Claude, ~/github-audit), and the Obsidian vault (Recruiting/Resumes/).

## Candidate projects for the site

Pending Trinav's confirmation. Nothing below is published until confirmed.

| # | Project | Domain | Repo | Live | On resumes | Notes |
|---|---|---|---|---|---|---|
| 1 | AreWeThrough | sport | github.com/trinav-code/arewethrough | arewethrough.com | all 8 active variants | Finished, 119 commits, CI + tests, custom domain. Data frozen 2026-07-19 (upstream retired). Widget planned (qualification slider). |
| 2 | RegWatch | compliance | github.com/abhinavballa/RegWatch (collaborator's org; local at ~/personal/RegWatch) | none | all 9 variants | Hackathon MVP, 37 commits. 10 CLAIM-EVIDENCE rows. Widget planned (clean/violating toggle). Repo is not under trinav-code; decide whether to fork/mirror. |
| 3 | EazyHealth | health | github.com/trinav-code/eazyhealth | eazyhealth.vercel.app | APP, FDE, HAI, SCALE, PAL | Finished, live, 11 KB README. History squashed to 5 commits so build-time commit stats will look thin. |
| 4 | Retracing Intelligence | data | github.com/trinav-code/retracing-intelligence | trinav-code.github.io/retracing-intelligence | 7 of 9 variants | Active; only layer 1 of 5 built. Writeup is a draft, must not be claimed as published (CLAIM-EVIDENCE note). |
| 5 | Episcope | health | github.com/trinav-code/episcope (private) | dead (Vercel + Render deploys failed) | HAI only | 7 CLAIM-EVIDENCE rows with corrections. Abandoned since Jan 2026; would need repo made public and deploy fixed or listed as "not live". |
| 6 | Tabla Tuner | data (weak fit) | github.com/trinav-code/tabla-tuner | trinav-code.github.io/tabla-tuner | none | Live, working, one-line README. Not on any resume, no CLAIM-EVIDENCE rows. Ties to the drum/colophon story. |
| 7 | Omi Health (role, not project) | health | employer org, private | — | all | Widget planned (before/after latency trace). Belongs under roles, but a writeup page could exist if employer permits. |

Excluded and why:
- ScoutAI: on CLAIM-EVIDENCE "permanently excluded" list. Do not publish.
- mini-outbreaks, exobio, bot-alpha/beta, memorialhealth-platform, stmarys-patient-api, projects, biomidterm, tuneoflife, DMA_CAMP: stubs, demo fixtures, or archives.
- claude-watch, vibe_check, ai_sports_recap: local only, no GitHub, not on resumes. Push first if wanted; claude-watch is the strongest of the three.
- Coursework (CS61B, BioE134/234, Data 100), employer repos (Blackprint, Omi), collaborator repos (agentwatch).

### Recommended home page lead (three)

1. AreWeThrough (sport): only project with a custom domain, tests, real history, and a planned widget.
2. RegWatch (compliance): on every resume variant, deepest evidence table, planned widget.
3. EazyHealth (health): live, finished, health domain matches the site's stated focus.

That gives three of the four domain colours on the home page. Retracing Intelligence (data) is the fourth on /work and the natural swap-in if RegWatch's repo ownership is a problem.

## Role stubs (from resume variants + CLAIM-EVIDENCE)

Title and dates are identical across all nine resume documents. "Manga" in roles.md is Magna Education; "Manga" does not appear anywhere in the vault.

| Org | Title | Dates | One-line |
|---|---|---|---|
| Blackprint AI | Data Science Intern | Aug 2024 – Jan 2025 | Async BFS crawler over three listing sites and four Mexican cities with proxy rotation, reconciling 400K+ listings into one schema; incremental S3 loads with on/off-market diffing, cleaning on Redshift. |
| Magna Education | Data Science Intern | Jun 2025 – Aug 2025 | Cheating-detection system over quiz answers (Azure OpenAI embeddings, cosine-similarity clustering, PCA/t-SNE) against a labeled GPT-4o/Gemini/Claude/human benchmark; ran the Copyleaks vs ZeroGPT adopt-or-not evaluation and designed the thresholds. |

Consistency flags for roles.md vs resumes:
- Omi Health: resumes say "Feb 2026 – Present"; roles.md says start 2025.
- Ji Lab: resumes say "Research Assistant, Jul 2023 – Dec 2025"; roles.md says "Undergraduate Researcher", 2023 – 2025-12.
- Education: resumes say Cornell Tech Aug 2026 – May 2028; roles.md says 2026 – 2027.

## Housekeeping found during the sweep

- `pdd-secrets-dispatch.yml` workflow in 12 repos: on `repository_dispatch` it encrypts all repo secrets and POSTs them to a callback URL from the payload (Prompt Driven Development app). Confirm you still want that; remove from repos that don't use it.
- `~/personal/repos/github/trinav-code/samples` has a GitHub PAT embedded in its remote URL. Scrub and revoke.
- `tuneoflife` (private) has `.env` and `error_log` committed. `~/personal/ai_agents` holds a `.env`.
- Second GitHub identity `trinavc` owns `ji_lab`; not covered by this inventory.
- Unpushed commits: `~/personal/projects`, `~/personal/tabla-tuner`.

---

# 1. GitHub repos (trinav-code)

Generated 2026-09-03 via `gh` CLI. 16 repos total (9 public, 7 private, 0 forks, 0 archived, 0 stars on any). Commit counts are from the GitHub commits API. Live URLs were curl-checked on 2026-09-03.

| Name | Visibility | Description/summary | Language | Last push | Live URL | Status | Local path |
|---|---|---|---|---|---|---|---|
| [arewethrough](https://github.com/trinav-code/arewethrough) | Public | World Cup 2026 knockout-qualification tracker (Next.js); pick a team, see every scenario that still gets it through, incl. third-place cut line. README says data frozen 2026-07-19 because upstream source was retired. | TypeScript | 2026-08-10 | https://arewethrough.com (200) / https://arewethrough-two.vercel.app (200); Vercel Production deploys | **finished** — 119 commits, CI + tests, 3.3 KB README, live custom domain, data deliberately frozen | /Users/trinav/personal/arewethrough |
| [eazyhealth](https://github.com/trinav-code/eazyhealth) | Public | EazyHealth AI: full-stack app (FastAPI backend + Vite frontend) generating weekly health briefings and on-demand plain-language explainers at adjustable reading levels, sourced from CDC/NIH/Mayo. | Python | 2026-06-18 | https://eazyhealth.vercel.app (200); Vercel Production deploys | **finished** — 11 KB README, deployment guides, live; only 5 commits (squashed history) | /Users/trinav/personal/eazyhealth |
| [retracing-intelligence](https://github.com/trinav-code/retracing-intelligence) | Public | Re-implements the five "breakthroughs" from Bennett's *A Brief History of Intelligence* as stacked RL agents in a shared 2D foraging world, one layer per breakthrough, with a GitHub Pages playground and planned Medium posts. | JavaScript | 2026-08-10 | https://trinav-code.github.io/retracing-intelligence/ (200); GitHub Pages | **active** — 5 commits, only `layer-1-steering/` of 5 layers exists, pushed 3 weeks ago | /Users/trinav/personal/retracing-intelligence |
| [tabla-tuner](https://github.com/trinav-code/tabla-tuner) | Public | AI-powered tabla tuner with real-time pitch detection; single-page HTML app with a `netlify/functions` dir. | HTML | 2026-01-31 | https://trinav-code.github.io/tabla-tuner/ (200); GitHub Pages | **finished** — 15 commits Nov 2025, live and working, README is one line | /Users/trinav/personal/tabla-tuner |
| [episcope](https://github.com/trinav-code/episcope) | Private | EpiScope: AI-powered global disease intelligence platform — interactive disease map, climate/socioeconomic overlays, GPT-4 natural-language insights. Vercel frontend + Render backend + data pipeline + docker-compose. | Python | 2026-01-31 | None working — Vercel (`episcope-*.vercel.app`) and Render (`episcope-api.onrender.com`) deployments all report **failure**; Render URL times out, episcope.vercel.app 404 | **abandoned** — 16 commits Nov 2025–Jan 2026, deploys broken, no work since | /Users/trinav/personal/episcope |
| [mini-outbreaks](https://github.com/trinav-code/mini-outbreaks) | Public | Mini Outbreak Detector: ML backend for infectious-disease outbreak detection (Z-score + Isolation Forest anomalies, Prophet 14-day forecasts, AI explanations) with REST API, notebooks and a frontend. | Python | 2026-01-31 | none | **abandoned** — 4 commits Nov 2025–Jan 2026, 7 KB README, never deployed | /Users/trinav/personal/outbreaks |
| [scout_ai](https://github.com/trinav-code/scout_ai) | Public | ScoutAI: soccer player scouting platform — natural-language queries over FBref stats, 3-agent RAG pipeline (GPT-4o-mini + Chroma), Next.js frontend, FastAPI backend. STATUS.md claims phases 1–3 complete. | Python | 2026-06-18 | none | **abandoned** — single commit (code dump), 8 KB README, never deployed, no follow-up | /Users/trinav/personal/scout_ai |
| [exobio](https://github.com/trinav-code/exobio) | Private | ExoBio: open pipeline to triage small exoplanets (R < 4 R⊕) for atmospheric follow-up / biosignature potential; Layer 1 = TSM/ESM ranker from NASA Exoplanet Archive, Layers 2–3 (retrieval, scorecards) planned. | HTML | 2026-06-03 | none | **stub** — 2 commits, README says "Week 1 — Layer 1 MVP in progress", 3 months idle | /Users/trinav/personal/astro |
| [memorialhealth-platform](https://github.com/trinav-code/memorialhealth-platform) | Public | "Internal backend services for Memorial Health. HIPAA alignment in progress." Contains `services/`, `security/`, `infra/`; sibling of stmarys-patient-api — appears to be a deliberately vulnerable demo target. | Python | 2026-02-10 | none | **stub** — 2 commits, 105-byte README, demo/fixture repo | /Users/trinav/personal/memorialhealth-platform |
| [stmarys-patient-api](https://github.com/trinav-code/stmarys-patient-api) | Public | Flask "hospital internal patient API" with intentional real-world mistakes; description literally says "Perfect demo victim" — a security-demo target, not a product. | Python | 2026-02-10 | none | **stub** — 2 commits, 126-byte README, intentional demo victim | /Users/trinav/personal/stmarys-patient-api |
| [bot-beta](https://github.com/trinav-code/bot-beta) | Private | Polymarket trading bot (`bot_beta/` + `polymarket-shared/` packages, `.env.example`, `CLAUDE.md`); no README. | Python | 2026-03-12 | none | **abandoned** — 4 commits Mar 2026, no README, no activity since | /Users/trinav/personal/polyBots/bot-beta |
| [bot-alpha](https://github.com/trinav-code/bot-alpha) | Private | "Bot Alpha — Arbitrage. Phase 3. See bot-beta/CLAUDE.md." README only, no code. | (none) | 2026-03-10 | none | **stub** — 2 commits, README + workflow only, zero code | /Users/trinav/personal/polyBots/bot-alpha |
| [biomidterm](https://github.com/trinav-code/biomidterm) | Public | Single file: `BioE 134 Midterm.pdf`. Coursework artifact, not a project. | (none) | 2026-03-02 | none | **stub** — 1 commit, one PDF, no README | none found |
| [projects](https://github.com/trinav-code/projects) | Private | "Personal Projects" — contains only `tatari interview/trinav_intern_case_study/*.ipynb` (Tatari intern case study notebook, Apr 2025). | Jupyter Notebook | 2026-01-31 | none | **stub** — 2 commits, one interview notebook, no README | /Users/trinav/personal/projects |
| [tuneoflife](https://github.com/trinav-code/tuneoflife) | Private | "For Samit and Trinav" — Laravel/PHP web app (Blade, artisan, composer, `.htaccess`, vendor committed, `.env` committed). Started Apr 2020. | Blade | 2026-01-31 | none | **abandoned** — 103 commits from 2020, 34-byte README, `.env` and `error_log` committed | none found |
| [DMA_CAMP](https://github.com/trinav-code/DMA_CAMP) | Private | Summer 2018 Digital Media Academy camp dump: Swift playgrounds, CoreML image/text recognizers, Scratch `.sbx` files, screenshots, a zip. | Python | 2026-01-31 | none | **abandoned** — 2 commits, 2018 camp archive, no README | none found |

## Notes and findings

- **Last-push dates of 2026-01-31 17:33 are not real work.** On 2026-01-31 a bot (`prompt-driven-github[bot]`) pushed `chore: add PDD secrets dispatch workflow [automated]` to 11 of the 16 repos (all but scout_ai, biomidterm, memorialhealth-platform, stmarys-patient-api, and — as of later pushes — arewethrough has its own `ci.yml`/`fetch-results.yml` instead). For episcope, mini-outbreaks, tabla-tuner, projects, tuneoflife, DMA_CAMP that bot commit **is** the latest push; real activity ended earlier (Nov 2025 for the three health/tabla repos, 2020/2018 for tuneoflife/DMA_CAMP).
- **Security flag on that workflow.** `.github/workflows/pdd-secrets-dispatch.yml` triggers on `repository_dispatch`, takes `toJSON(secrets)` (every repo secret), encrypts it with a hard-coded RSA public key, and POSTs it to a `callback_url` supplied in the dispatch payload. This is the "Prompt Driven Development" GitHub App's mechanism for fetching secrets; it was installed org-wide. Worth confirming the user still intends that app to have this access, and removing the workflow from repos that don't use it. Present in: retracing-intelligence, arewethrough, eazyhealth, exobio, bot-beta, bot-alpha, mini-outbreaks, episcope, tabla-tuner, projects, tuneoflife, DMA_CAMP.
- **Live deployments (verified 200):** arewethrough.com, arewethrough-two.vercel.app, eazyhealth.vercel.app, trinav-code.github.io/tabla-tuner, trinav-code.github.io/retracing-intelligence. episcope's Vercel and Render deployments both failed and are down.
- `tuneoflife` has `.env` and `error_log` committed to the repo (private, but still worth scrubbing).
- No README on: bot-beta, biomidterm, projects, DMA_CAMP. No repo README contains TODO/WIP wording; exobio's README states "Layer 1 MVP in progress".
- Repos with no local checkout found: biomidterm, tuneoflife, DMA_CAMP. Local `/Users/trinav/personal/astro` is exobio, `/Users/trinav/personal/outbreaks` is mini-outbreaks.

## Local checkouts (all remotes found under ~/personal, ~/Projects, ~/Desktop, ~/Documents, depth 3)

| Local path | origin remote |
|---|---|
| /Users/trinav/personal/arewethrough | https://github.com/trinav-code/arewethrough.git |
| /Users/trinav/personal/eazyhealth | git@github.com:trinav-code/eazyhealth.git |
| /Users/trinav/personal/retracing-intelligence | https://github.com/trinav-code/retracing-intelligence.git |
| /Users/trinav/personal/tabla-tuner | https://github.com/trinav-code/tabla-tuner.git |
| /Users/trinav/personal/episcope | git@github.com:trinav-code/episcope.git |
| /Users/trinav/personal/outbreaks | https://github.com/trinav-code/mini-outbreaks.git |
| /Users/trinav/personal/scout_ai | https://github.com/trinav-code/scout_ai.git |
| /Users/trinav/personal/astro | https://github.com/trinav-code/exobio.git |
| /Users/trinav/personal/memorialhealth-platform | https://github.com/trinav-code/memorialhealth-platform.git |
| /Users/trinav/personal/stmarys-patient-api | https://github.com/trinav-code/stmarys-patient-api.git |
| /Users/trinav/personal/polyBots/bot-beta | https://github.com/trinav-code/bot-beta.git |
| /Users/trinav/personal/polyBots/bot-alpha | https://github.com/trinav-code/bot-alpha.git |
| /Users/trinav/personal/projects | https://github.com/trinav-code/projects.git |
| /Users/trinav/personal/personal-site | (no remote) |
| /Users/trinav/Projects/claude-watch | (no remote) |
| /Users/trinav/personal/agentwatch | https://github.com/AnvithV/agentwatch.git (not trinav-code) |
| /Users/trinav/personal/ji_lab | https://github.com/trinavc/ji_lab.git (different account: trinavc) |
| /Users/trinav/personal/RegWatch | https://github.com/abhinavballa/RegWatch.git (not trinav-code) |
| /Users/trinav/personal/BioE134/bioe134-234-transcriptdesigner-project-3-trinav-code | https://github.com/UCB-BioE-Genetic-Design-Automation/bioe134-234-transcriptdesigner-project-3-trinav-code.git (course org) |
| /Users/trinav/Desktop/Blackprint/data-exploration-bp | git@github.com:seanrezaie/data-exploration-bp.git |
| /Users/trinav/Desktop/Blackprint/mexico-city-drop | git@github.com:BlackPrintTechnologies/mexico-city-drop.git |
| /Users/trinav/Desktop/CS61B/sp24-s314 | git@github.com:Berkeley-CS61B-Student/sp24-s314.git |
| /Users/trinav/Desktop/CS61B/sp24-proj3-g576 | git@github.com:Berkeley-CS61B-Student/sp24-proj3-g576.git |
| /Users/trinav/Desktop/CS61B/library-sp24 | https://github.com/Berkeley-CS61B/library-sp24 |
| /Users/trinav/Desktop/CS61B/lab042, lab04-checkoff | (no remote) |
| /Users/trinav/Desktop/omi_health/OmiHealthApp | https://github.com/OmiCOO/OmiHealthApp.git |
| /Users/trinav/Desktop/omi_health/OmiHealth-iOS | https://github.com/OmiCOO/OmiHealth-iOS.git |

---

# 2. Local projects not on trinav-code GitHub

Scan date: 2026-09-03. Roots scanned: `~/personal`, `~/Projects`, `~/Desktop`, `~/Documents`, `~/Downloads`, plus extra containers `~/Claude`, `~/github-audit`, `~/research`, `~/Sites` (empty). `~/Developer`, `~/repos`, `~/code`, `~/src` do not exist. Excluded: `~/personal/personal-site`.

"Last modified" = newest non-.git file mtime (or last commit date where noted). Sizes are `du -sh` including data/node_modules.

## A. Local projects with NO trinav-code GitHub remote

| Path | Has .git | Remote (other) | Language | Last modified | What it is | Status |
|---|---|---|---|---|---|---|
| `~/Projects/claude-watch` | yes (3 commits) | none | Python | 2026-05-28 | Menubar dashboard tracking parallel Claude Code sessions across Terminal windows (hooks in ~/.claude/settings.json) | Working personal tool, clean tree; **best candidate to push** |
| `~/personal/vibe_check` | no | – | Python (23 .py), HTML | 2025-12-21 | VibeCheck: local AI movie/music recommender learning taste via conversation (has web UI, sqlite, LICENSE) | Looks finished/MVP; **candidate to push** |
| `~/personal/ai_sports_recap` | no | – | Python (14 .py) | 2025-11-21 | Automated sports recap system for NBA/PL/NFL (setup.py, QUICKSTART) | Looks finished/MVP; **candidate to push** |
| `~/personal/med-gemma` | no | – | Python (4 scripts) + data | 2026-01-31 | DermNet organizer, PubMed case scraper, WHO protocol processor; train/test data for a MedGemma fine-tune | WIP/abandoned; 3.7 GB (mostly data, dermnet.zip) |
| `~/personal/ai_agents` | no | – | Python (4 scripts) | 2025-12-23 | LangChain/agent tutorial lesson scripts (stock agent, react agent); contains a `.env` | Stub / tutorial |
| `~/personal/malnutrition_proj` | no | – | Jupyter (5 .ipynb in `code/`) | 2025-02-21 | WHO malnutrition data cleaning/merging and train/test splitting; raw_data + cleaned_data dirs | Abandoned notebook project |
| `~/personal/ji_lab` | yes (11 commits) | `github.com/trinavc/ji_lab` (different GitHub user, not trinav-code) | Python (41), Jupyter (20) | 2025-11-05 (last commit 2025-03-20) | Ji Lab calcium-imaging + voltage-imaging analysis code | Research; 28 GB (data); 77 uncommitted changes |
| `~/research/jilab` | no | – | Jupyter (2) | 2023-09-24 | `demo_motion_correction.ipynb` (NoRMCorre demo) | Abandoned scratch |
| `~/Downloads/NormCorre` | no | – | Python (3), Jupyter (2) | 2024-05-01 | NoRMCorre motion-correction pipeline steps 1-3 + ROI overlay notebooks + TIFs | Research scratch, abandoned |
| `~/Documents/Old Notebooks` | no | – | Jupyter (5), Python (3) | 2026-01-30 | Misc: health_data_analysis, NormCorre pipeline scripts, stat154 lab, Untitled*.ipynb, WavToCSV | Abandoned scratch |
| `~/personal/agentwatch` | yes (49 commits) | `github.com/AnvithV/agentwatch` (collaborator's repo) | Python (10), JS/JSX (6) | 2026-02-27 | AgentWatch: governance PaaS "mission control" for AI agents (FastAPI + neo4j + React dashboard, Render) | Hackathon project, finished; tree shows 5833 deleted node_modules entries (node_modules was committed) |
| `~/personal/RegWatch` | yes (37 commits) | `github.com/abhinavballa/RegWatch` (collaborator's repo) | Python (38) | 2026-04-22 (last commit 2026-01-31) | RegWatch: automated compliance monitoring, "1.0 Hackathon MVP" | Hackathon, finished; 7 dirty files |
| `~/personal/BioE134/bioe134-234-transcriptdesigner-project-3-trinav-code` | yes (2) | `github.com/UCB-BioE-Genetic-Design-Automation/...` (course org) | Python (29) | 2026-03-11 | BioE134 Project 3: sliding-window codon optimization + InternalRBSChecker | Coursework, done, clean |
| `~/Downloads/2026-bioe234-final-project-trinav-code` | yes (5) | `github.com/UCB-BioE-Genetic-Design-Automation/...` (course org) | Python (18) | 2026-05-02 | BioE234 final: CRISPR Delivery Strategy Advisor (server.py, Gemini client, tests, slides) | Coursework, done, clean; 183 MB |
| `~/Desktop/CS61B/sp24-s314` | yes (112) | `github.com/Berkeley-CS61B-Student/sp24-s314` (course org) | Java (169) | 2024-04-22 | CS61B Spring 2024 personal repo: hw0b-hw2, lab01-lab10, proj0-proj3 | Coursework, done; 6 dirty |
| `~/Desktop/CS61B/sp24-proj3-g576` | yes (38) | `github.com/Berkeley-CS61B-Student/sp24-proj3-g576` (course org) | Java (11) | 2026-01-26 (last commit 2024-04-23) | CS61B proj3 (BYOW) group repo | Coursework, done; 3 dirty |
| `~/Desktop/CS61B/library-sp24` | yes (1) | `github.com/Berkeley-CS61B/library-sp24` | jars | 2024-01-18 | Course-provided library jars | Coursework dependency, not a project |
| `~/Desktop/CS61B/lab04-checkoff` (+ nested `git-exercise-sp24`) | yes | `Berkeley-CS61B/git-exercise-remote`, `git-exercise-sp24` | txt | 2024-02-19 | Lab 4 git exercise | Coursework stub |
| `~/Desktop/CS61B/lab042` (+ nested `git-exercise-sp24`) | yes | outer: none; nested: `Berkeley-CS61B/git-exercise-sp24` | txt | 2024-02-19 | Duplicate copy of Lab 4 git exercise | Coursework stub, duplicate |
| `~/Downloads/data100 Documentation/Homeworks` | no | – | Jupyter (7) | 2024-05-15 | Data 100 homework notebooks hw01-hw07 (one file is another student's PDF) | Coursework |
| `~/Downloads/data100 Documentation/Projects` | no | – | Jupyter (4) | 2024-11-05 | Data 100 projA1/A2/B1/B2 notebooks | Coursework |
| `~/Downloads/hw2` | no | – | Java (5) | 2023-10-05 | IntelliJ Java homework (`src`, `tests`, `inputFiles`) | Coursework, old |
| `~/Desktop/Projects/RAG_BED_Talks/bedtalks-rag-tutorial` | yes (4) | `github.com/kjeelani/bedtalks-rag-tutorial` | Python (3) | 2024-11-22 | RAG tutorial (OpenAI + vector DB) over BED Talks dataset | Workshop/coursework; 4 dirty (env/db) |
| `~/Desktop/Blackprint/data-exploration-bp` | yes (5) | `github.com/seanrezaie/data-exploration-bp` | Python (3) | 2024-10-25 | Real-estate listing exploration/heatmaps (propiedades buy/rent) for BlackPrint | Employer/side gig, dormant; 5 dirty; 55 MB |
| `~/Desktop/Blackprint/mexico-city-drop` | yes (18) | `github.com/BlackPrintTechnologies/mexico-city-drop` (employer org) | Python (14) | 2024-12-14 | Mexico City / Guadalajara listings cleaning + migration (parquet, creds.py) | Employer, dormant; 10 dirty; 612 MB |
| `~/Desktop/Blackprint/webscraper/inmuebles24_scraper` | yes (3) | `github.com/BlackPrintTechnologies/inmuebles24_scraper` (employer org) | Python (11) | 2024-11-24 | inmuebles24 listing scraper per city | Employer, dormant; 7 dirty |
| `~/Desktop/Blackprint/webscraper/spot2_scraper` | yes (1) | `github.com/BlackPrintTechnologies/spot2_scraper` (employer org) | JS (3), Python | 2024-09-24 | spot2 Chrome extension + extraction script | Employer, dormant; 2 dirty |
| `~/Desktop/omi_health/OmiHealthApp` | yes (3263) | `github.com/OmiCOO/OmiHealthApp` (employer org) | Python (1669), Swift (1388), TSX (438) | 2026-09-03 | Omi pet-health SaaS monorepo: iOS app + FastAPI backend + Supabase + admin-ui + marketing-site | Employer, **active**; branch `trinav/goal-trigger-evidence-prompt`, 18 dirty; 3.0 GB |
| `~/Desktop/omi_health/{OmiHealthApp-checkin-logging, -devflag, -findings, -findings-goals, -priorities-ts, -rag, -timelines, -versioned-base, wt-582, wt-biomarker-nodata, wt-catalog-names, wt-eval-genetic-raw, wt-explainers, wt-flag-direction, wt-goal-selection-rules, wt-history-keywords, wt-insight-vet-first, wt-placeholder-ingest, wt-severity-banding}` | worktrees of OmiHealthApp (`.git` file) | same `OmiCOO/OmiHealthApp` | same | 2026-04-10 to 2026-09-03 | 19 git worktrees on `trinav/*` feature branches, all pushed (0 unpushed); a few dirty (findings: 13, versioned-base: 2, priorities-ts: 1) | Employer; ~80 MB-700 MB each (~8 GB total), several stale (Apr-Jul) |
| `~/Desktop/omi_health/OmiHealth-iOS` | yes (507) | `github.com/OmiCOO/OmiHealth-iOS` (employer org) | Swift (180), Python (47) | 2026-02-09 | Older standalone Omi iOS app repo (xcodeproj) | Employer, superseded by monorepo; clean |
| `~/Desktop/omi-feature-pitch` | no | – | TS / Slidev markdown | 2026-03-31 | Slidev slide deck "omi-feature-pitch" (package.json, netlify/vercel config) | One-off deck, finished |
| `~/personal/repos/github/trinav-code/samples` | yes | `github.com/samitchaudhuri/samples` (someone else's repo) | mixed | 2025-04-29 | Clone of another user's samples repo; 67 MB | Not yours. **Remote URL embeds a GitHub personal access token (`ghp_...`) in plaintext** -- scrub with `git remote set-url` and revoke the token |
| `~/github-audit` | no | – | markdown/yaml | 2026-06-10 | `audit-report.md` + `_audit/workflows` from a prior GitHub audit | Scratch output, not a project |
| `~/Claude/Scheduled` | no | – | markdown | 2026-08-30 | Scheduled-agent prompt folders (history quiz, journaling nudge, weekly coach) | Config, not a code project |

Skipped as not-a-project: `~/Downloads/Python Course/Exercises/beautifulsoup4-4.12.2` (vendored library source), `~/personal/Books` (epubs), `~/Sites` (empty), `.ipynb_checkpoints` / `.next` dirs.

## B. Local projects that ARE on trinav-code GitHub

| Path | Remote | Notes |
|---|---|---|
| `~/personal/arewethrough` | `github.com/trinav-code/arewethrough` | 119 commits, 1 dirty file; live at arewethrough.com |
| `~/personal/astro` | `github.com/trinav-code/exobio` | 1 commit, 5 dirty files (ExoBio exoplanet pipeline; folder name differs from repo name) |
| `~/personal/eazyhealth` | `github.com/trinav-code/eazyhealth` | clean |
| `~/personal/episcope` | `github.com/trinav-code/episcope` | 1 dirty |
| `~/personal/memorialhealth-platform` | `github.com/trinav-code/memorialhealth-platform` | clean, 2 commits |
| `~/personal/outbreaks` | `github.com/trinav-code/mini-outbreaks` | 6 dirty |
| `~/personal/polyBots/bot-alpha` | `github.com/trinav-code/bot-alpha` | placeholder README only |
| `~/personal/polyBots/bot-beta` | `github.com/trinav-code/bot-beta` | clean, 4 commits |
| `~/personal/projects` | `github.com/trinav-code/projects` | **1 unpushed commit**, 17 dirty (soccer_match_analysis, tatari interview case study) |
| `~/personal/retracing-intelligence` | `github.com/trinav-code/retracing-intelligence` | clean |
| `~/personal/scout_ai` | `github.com/trinav-code/scout_ai` | clean, 1 commit |
| `~/personal/stmarys-patient-api` | `github.com/trinav-code/stmarys-patient-api` | 5 dirty |
| `~/personal/tabla-tuner` | `github.com/trinav-code/tabla-tuner` | **1 unpushed commit**, 3 dirty |

---

# 3. Resume variants and CLAIM-EVIDENCE.md

Vault root: `/Users/trinav/Library/CloudStorage/GoogleDrive-trinav.chaudhuri@gmail.com/My Drive/Obsidian/Personal Vault`
All resume material lives under `Recruiting/Resumes/`. No files named `*cv*` exist. "Manga" does not appear anywhere in the vault (case-insensitive); the company is **Magna Education** (section D covers it).

Abbreviations for variants used below:

| Code | Variant |
|---|---|
| APP | Applied-AI-ML-Engineer |
| FDE | Forward-Deployed |
| HAI | Health-AI |
| PS | Product-Strategy |
| SA | Sports-Analytics |
| ARC | _archive/AI-ML-Engineer (old, superseded) |
| SCALE | job_versions/ScaleAI-AIBuilder (PDF only, cut of APP) |
| PAL | job_versions/Palantir-FDSE (PDF only, cut of FDE) |
| JS | job_versions/JaneStreet-StrategyProduct (PDF only, cut of PS) |

## A. Resume variants

Base dir: `<vault>/Recruiting/Resumes/`. All active variants are 1-page, LaTeX (fontspec / Times New Roman, built with tectonic), with a matching PDF and an `extracted-text.txt` beside each.

| Code | Path (relative to Resumes/) | Format | Apparent target | Last modified |
|---|---|---|---|---|
| APP | `Applied-AI-ML-Engineer/Trinav_Chaudhuri_Resume_Applied-AI-ML-Engineer_2026-08.tex` (+ `.pdf`, `extracted-text.txt`) | .tex/.pdf | Applied AI / ML engineer (generalist) | tex 2026-08-22 13:27, pdf 13:28 |
| FDE | `Forward-Deployed/Trinav_Chaudhuri_Resume_Forward-Deployed_2026-08.tex` (+ `.pdf`, `extracted-text.txt`) | .tex/.pdf | Forward-deployed engineer (Palantir-style) | 2026-08-22 13:28 |
| HAI | `Health-AI/Trinav_Chaudhuri_Resume_Health-AI_2026-08.tex` (+ `.pdf`, `extracted-text.txt`) | .tex/.pdf | Health AI / clinical ML | 2026-08-22 13:28 |
| PS | `Product-Strategy/Trinav_Chaudhuri_Resume_Product-Strategy_2026-08.tex` (+ `.pdf`, `extracted-text.txt`) | .tex/.pdf | Product / strategy (quant-firm strategy roles) | 2026-08-22 13:28 |
| SA | `Sports-Analytics/Trinav_Chaudhuri_Resume_Sports-Analytics_2026-08.tex` (+ `.pdf`, `extracted-text.txt`) | .tex/.pdf | Sports analytics (Projects section first, AreWeThrough leads) | 2026-08-22 13:28 |
| SCALE | `Applied-AI-ML-Engineer/job_versions/Trinav_Chaudhuri_Resume_ScaleAI-AIBuilder_2026-08.pdf` | .pdf only | Scale AI "AI Builder" cut of APP | 2026-08-22 12:19 |
| PAL | `Forward-Deployed/job_versions/Trinav_Chaudhuri_Resume_Palantir-FDSE_2026-08.pdf` | .pdf only | Palantir FDSE cut of FDE | 2026-08-22 12:19 |
| JS | `Product-Strategy/job_versions/Trinav_Chaudhuri_Resume_JaneStreet-StrategyProduct_2026-08.pdf` | .pdf only | Jane Street Strategy & Product cut of PS | 2026-08-22 12:19 |
| ARC | `_archive/AI-ML-Engineer/Trinav_Chaudhuri_Resume_AI-ML-Engineer_2026-08.tex` (+ `.pdf`) | .tex/.pdf | Old general AI/ML engineer resume (pre-rebuild; contains claims now on the "permanently excluded" list) | tex 2026-08-05 21:50, pdf 21:43 |

Related, not resumes: `Resumes/CLAIM-EVIDENCE.md` (2026-08-22 12:19), `Resumes/CLAIM-EVIDENCE.pdf` (2026-08-10 18:43, older render), `Recruiting/2026-08-27-resume-overview-workshop.md`, `Recruiting/Tracker.md` (has a per-variant notes table around line 227-230).

Notes:
- The three job_versions PDFs have no .tex source in the vault. They were built 12:19, before the main .tex files were last edited at 13:27-13:28. One visible drift: the job_versions PDFs say "**Incoming** Dual M.S." and the PAL/JS PDFs carry a Coursework line; the current main .tex/PDFs say "Dual M.S." with no "Incoming" (SA is the only main variant with a Coursework line).
- The extracted-text.txt files are text dumps of the main PDFs; not separate variants.

## B. Cross-reference matrix

"Project or work item" = every named employer, lab, project, and org on any resume. Names as written on the resumes. CE = appears in CLAIM-EVIDENCE.md.

| Item (as written) | APP | FDE | HAI | PS | SA | SCALE | PAL | JS | ARC | CE |
|---|---|---|---|---|---|---|---|---|---|---|
| Omi Health | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ji Lab, UC Berkeley Physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Magna Education | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Blackprint AI | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| RegWatch -- Automated Compliance Remediation (ARC: "RegWatch - Automated Compliance Monitoring") | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| AreWeThrough -- World Cup 2026 Qualification Tracker | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| EazyHealth -- Automated Health Literacy Briefings | ✓ | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| Retracing Intelligence -- Evolution of Intelligence as Stacked Agents (ARC: "Retracing Intelligence - Stacked RL Agents") | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ |
| Episcope -- Disease Surveillance and Trend Analytics |  |  | ✓ |  |  |  |  |  |  | ✓ |
| ScoutAI - Multi-Agent Soccer Analytics Platform |  |  |  |  |  |  |  |  | ✓ | ✓ (listed only under "Permanently excluded") |
| Finance/Philanthropy Chair, Phi Delta Epsilon |  |  |  |  |  |  |  |  | ✓ |  |
| USA Karate (Athletics & Arts line / "USA Karate Team Member" in ARC) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Hearts to Humanity Eternal Grant (inside Ji Lab bullet) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

Section ordering differences worth knowing: SA puts PROJECTS before EXPERIENCE; PAL orders experience Omi, Ji Lab, Blackprint, Magna; SCALE orders Omi, Magna, Blackprint, Ji Lab; every other variant orders Omi, Ji Lab, Magna, Blackprint.

## C. Blackprint AI

**Title as written (every variant, including ARC and the three job PDFs):** `Data Science Intern`
**Date range (every variant):** `Aug 2024 -- Jan 2025` (rendered "Aug 2024 – Jan 2025" in PDFs)
**Location (every variant):** `San Francisco, CA`

Bullets, by variant:

APP, FDE, HAI, PS, SA, SCALE, PAL, JS (identical text in all eight):
1. "Built an async BFS crawler over three listing sites and four Mexican cities with proxy rotation, reconciling 400K+ listings into one schema."
2. "Fed incremental S3 loads with on/off-market state diffing so only changed records reprocessed, with downstream cleaning on AWS Redshift using complex SQL (joins, unions, geospatial functions)."

ARC (archived, pre-rebuild):
1. "Built a web scraper pulling 400K+ property listings weekly from four Mexican cities with deduplication, cross-site standardization, and S3 ingestion."
2. "Designed a data cleaning and transformation pipeline on AWS Redshift, running complex SQL (joins, unions, geospatial functions) for downstream analytics and dynamic geospatial map layers."

CLAIM-EVIDENCE.md, quoted in full for this role:

```
## Blackprint AI (Data Science Intern, Aug 2024 - Jan 2025)

| Claim | Source |
|---|---|
| Async BFS crawler, three listing sites, four Mexican cities, proxy rotation | `~/Desktop/Blackprint/webscraper/` scrapers (Semaphore + Throttler + ScraperAPI; per-file git authorship Trinav) |
| Cross-site schema normalization | `mexico-city-drop/data_cleaning_{inmuebles,propiedades,spot2}.py` (all Trinav) |
| Incremental S3 loads with on/off-market state diffing | `spot2_extraction.py:29-102,270-294`; `data_migration.py` |
| 400K+ listings across four cities (no weekly rate) | Trin confirmed |
| AWS Redshift; complex SQL (joins, unions, geospatial functions) | Trin confirmed |
```

Also in CLAIM-EVIDENCE.md: the "Claims from the pre-2026 resume that the repos DISPROVE" table lists `Blackprint "400,000 property listings weekly"` and the "Permanently excluded" list includes `"400K weekly" (Blackprint)`.

Inconsistencies:
- Title and dates are fully consistent across all nine documents.
- ARC's bullet 1 ("400K+ property listings **weekly**") is explicitly disproven/excluded by CLAIM-EVIDENCE.md; every active variant uses the corrected "400K+ listings" with no rate. ARC also claims "dynamic geospatial map layers", which is not in the claim table.
- Every active bullet maps to a CLAIM-EVIDENCE row; nothing on the active variants exceeds the table.
- Context from `Network/People/gil.md`: Gil is "Founder at Blackprint AI, believed to be CTO. Trin worked there until January" — consistent with the Jan 2025 end date.

## D. Magna Education ("Manga")

No file in the vault contains the string "manga". The role is **Magna Education**.

**Title as written (every variant):** `Data Science Intern`
**Date range (every variant):** `Jun 2025 -- Aug 2025`
**Location (every variant):** `San Francisco, CA`

Bullets, by variant:

APP, FDE, HAI, PS, SA, SCALE, PAL, JS (identical in all eight):
1. "Built a cheating-detection system over quiz answers: Azure OpenAI embeddings, cosine-similarity clustering, and PCA/t-SNE over a labeled benchmark of GPT-4o, Gemini, Claude, and human-written answers."
2. "Ran the adopt-or-not vendor evaluation of Copyleaks and ZeroGPT against that benchmark and designed the thresholds and short-answer guardrail against false positives."

ARC:
1. "Built a cheating-detection suite: pulled quiz data from MongoDB, generated Azure OpenAI embeddings, computed cosine-similarity matrices, and clustered via scikit-learn (PCA/t-SNE) and Matplotlib/Seaborn to flag suspicious answers."
2. "Evaluated Copyleaks and ZeroGPT detectors across thresholds, batching, and rate limits; reported precision/recall trade-offs and drafted instructor-facing deployment guidance."

CLAIM-EVIDENCE.md, quoted in full:

```
## Magna Education (Data Science Intern, Jun 2025 - Aug 2025)

| Claim | Source |
|---|---|
| Cheating-detection system: Azure OpenAI embeddings, cosine-similarity clustering, PCA/t-SNE | `~/Desktop/magnum/cheating_detection.py` (608 LOC), `analyze_results.py` |
| Labeled benchmark across GPT-4o, Gemini, Claude, human-written answers | `EMAIL_TO_MODEL` dict in `analyze_results.py` (8 labeled authors, 4 sources) |
| Vendor evaluation of Copyleaks AND ZeroGPT (adopt-or-not + metric comparability) | Copyleaks: `~/Downloads/Copyleaks_Integration_Breakdown*.docx`; ZeroGPT: Trin confirmed |
| Threshold and policy design; short-answer false-positive guardrail (median <50 words caps at Medium) | Copyleaks integration docs (weighted risk 0.50/0.30/0.20; HIGH/MED/LOW thresholds) |
```

"Permanently excluded" also lists `"precision/recall trade-offs" (Magna)`.

Inconsistencies:
- Title and dates fully consistent across all nine documents.
- ARC's "reported precision/recall trade-offs" is on the permanently-excluded list; ARC's "MongoDB", "Matplotlib/Seaborn", "batching, and rate limits", "instructor-facing deployment guidance" are not in the claim table. All active variants are within the table.

## E. Other roles (consistency check)

| Role | Title as written | Dates as written | Location | Notes |
|---|---|---|---|---|
| Omi Health | `AI/ML Engineer` (APP, FDE, HAI, PS, SA, SCALE, PAL, JS) / `AI Engineer` (ARC) | `Feb 2026 -- Present` (all) | `New York, NY` (active) / `San Francisco, CA` (ARC) | CLAIM-EVIDENCE: "Omi Health (AI/ML Engineer, Feb 2026 - Present; title per Trin confirmed)". ARC title and location differ from the confirmed values. Bullet count varies: APP 5, FDE 6, HAI 5, PS 7, SA 6, SCALE 5, PAL 6, JS 6, ARC 3. HAI uses distinct "clinical" phrasing of the determinism and subsystem bullets (adds "grounded in cited clinical interventions, SOAP-format summary synthesis"). PS and SA carry an extra "Made evals the decision procedure rather than a report..." bullet. SA carries both "Ran autonomous coding-agent workflows in production development ... three production PRs in one day..." and "Built the team's autonomous coding-agent workflow and gated it..." (two overlapping agent-workflow bullets in one variant). SA's fan-out bullet is a merged short form: "Consolidated an 11-call LLM fan-out into one structured call (duplicates 7 to 0, 34% fewer tokens, quality-neutral by eval) and set the team pattern of deterministic gates with the LLM advisory-only." ARC's Omi bullets ("540+ test suite", "p95 latency from 24s to 14.8s", "multi-modal data pipeline") are all on the permanently-excluded list. |
| Ji Lab, UC Berkeley Physics | `Research Assistant` (all) | `Jul 2023 -- Dec 2025` (all) | `Berkeley, CA` (all) | 1 bullet in APP, FDE, HAI (defects + grant); 2 bullets in PS, SA, SCALE, PAL, JS (adds "Rebuilt MATLAB imaging pipelines in Python ... 47,100 frames at 384.6 Hz ..."). ARC's "GPU-accelerated Python (CUDA...) ~3x speedup on multi-terabyte" is permanently excluded. Matches CLAIM-EVIDENCE header "Ji Lab, UC Berkeley Physics (Research Assistant, Jul 2023 - Dec 2025)". |
| Education | Cornell Tech "Dual M.S. in Information Science, Health Tech Concentration", `Aug 2026 -- May 2028`; UC Berkeley "B.A., Double Major in Data Science and Molecular & Cellular Biology", `Aug 2022 -- May 2026` | | | Job PDFs and ARC say "**Incoming** Dual M.S."; current main .tex files dropped "Incoming". HAI bolds "Health Tech Concentration" and "Molecular & Cellular Biology". Coursework line present in SA, PAL, JS, ARC only (ARC's list differs: includes Deep Learning, Probability for Data Science). |
| Header tagline | "Applied AI engineer. Production systems across clinical documentation, regulatory compliance, edtech, real estate, and neuroimaging." (APP, FDE, PS, SA, SCALE, PAL, JS) | | | HAI: "...across clinical documentation, public-health surveillance, compliance, and neuroimaging." ARC has no tagline, uses `trinav@berkeley.edu` and "New York, NY (relocating Aug 2026)"; all active use `tc839@cornell.edu`. |
| Athletics & Arts | "USA Karate national team, Pan-American Championships (Brazil, Ecuador), world-ranked #9 (2019) \| 18 years of tabla." (all active) | | | ARC: "world-ranked #9 (pre-COVID-19)", no tabla; plus "Finance/Philanthropy Chair, Phi Delta Epsilon, Mar 2023 -- May 2025" which is absent from all active variants and from CLAIM-EVIDENCE. |
| Skills | Identical four-row table in all active variants (Languages / ML & AI / Backend / Data & Cloud) | | | SCALE's ML & AI row adds "autonomous coding agents" (not in the main APP .tex). ARC lists PyTorch, TensorFlow, LangGraph, Chroma, Pinecone, Java, R, Swift, CUDA, MongoDB, none of which appear on active variants (LangGraph and CUDA are permanently excluded). |

Project-level drift among active variants (all within CLAIM-EVIDENCE):
- RegWatch bullet 1: APP/FDE/HAI/PS/SA/PAL/JS say "60% auto-fix rate on HIPAA violations across three hospital test codebases"; SCALE says "60% auto-fix rate across three hospital test codebases" (drops "on HIPAA violations"; CE row is "60% auto-fix rate on HIPAA violations").
- Retracing Intelligence bullet 2: APP says "...a structural answer to reward hacking and never-satisfied agents in single-scalar RL"; PS/SA/SCALE/JS say "...a structural answer to reward hacking in single-scalar RL"; FDE/HAI omit bullet 2; PAL omits the project.
- AreWeThrough: HAI compresses to one bullet; SA's drill bullet reads "Ran forced-mismatch drills against the live pipeline; one drill surfaced a timezone date-bucketing bug in a source affecting roughly a third of records before it could publish a wrong score." vs. the other variants' "Ran a forced-mismatch drill against the live pipeline rather than trusting it, surfacing a timezone date-bucketing bug affecting a third of records." SCALE bullet 1 drops the word "independent" from "its independent sources dispute".
- Episcope appears only in HAI; EazyHealth is absent from PS, SA, JS.

## F. What CLAIM-EVIDENCE.md is

Path: `<vault>/Recruiting/Resumes/CLAIM-EVIDENCE.md` (last modified 2026-08-22 12:19; a PDF render from 2026-08-10 sits beside it). Header: "Claim-Evidence Table (single source of truth, all five variants). Generated 2026-08-10. No variant may introduce a claim not listed here. 'Trin confirmed' = stated directly by Trinav in the rebuild instructions (2026-08-10)." Tracker.md line 227 restates the rule: "Ground truth for every variant is Resumes/CLAIM-EVIDENCE.md. No variant may carry a claim that is not in that table."

Structure: one `##` section per resume entity, each a two-column `| Claim | Source |` table where Source is a repo path, commit hash, PR number, Obsidian note, memory file, or "Trin confirmed". Sections in order:
1. Omi Health (AI/ML Engineer, Feb 2026 - Present) — 15 rows (determinism pattern, 11-call fan-out, subsystem ownership, LOC/commit/test counts, RLS, SOAP, latency 31s to 12s, 100 concurrent users, load-test harness, 8-week outage, RAG consolidation, 15s fallback, coding-agent workflows, evals-as-method).
2. Ji Lab, UC Berkeley Physics (Research Assistant, Jul 2023 - Dec 2025) — 4 rows.
3. Magna Education (Data Science Intern, Jun 2025 - Aug 2025) — 4 rows.
4. Blackprint AI (Data Science Intern, Aug 2024 - Jan 2025) — 5 rows.
5. RegWatch (project) — 10 rows.
6. AreWeThrough (project, live) — 7 rows.
7. Retracing Intelligence (project, live) — 4 rows, incl. a NOTE that the written breakdown is a draft and must not be claimed as published.
8. EazyHealth (project) — verified 2026-08-12 against `~/personal/eazyhealth`; 8 rows incl. a CORRECTION (React 18 + Vite, not Next.js; 89 topics, not "70+").
9. Episcope (project) — verified 2026-08-12 against `~/personal/episcope`; 7 rows incl. a CORRECTION (Mapbox GL + Recharts, not Leaflet/D3) and an UNVERIFIED flag on "400,000+ WHO and OWID records".
10. Header, Skills, Athletics — 3 rows (six domains, skills-to-bullet mapping, karate/tabla wording with correction history: #9 ranking dated 2019 confirmed 2026-08-12; tabla corrected 15 to 18 years on 2026-08-13).
11. "Claims from the pre-2026 resume that the repos DISPROVE (do not reuse)" — 6 rows (EazyHealth Next.js, EazyHealth 70+, Episcope Leaflet/D3, Episcope 400,000+, Ji Lab GPU/3x/multi-terabyte, Blackprint 400K weekly).
12. "Permanently excluded (do not reintroduce)" — a single line: "LangGraph; StatsBomb; 400K match records; ScoutAI (entirely, incl. its eval-framework claim); "63 days to 3 minutes"; "multi-modal" extraction; CUDA; ~3x speedup; multi-terabyte; "precision/recall trade-offs" (Magna); "400K weekly" (Blackprint); "designed a knowledge graph"; p95 24s to 14.8s; "540+ tests"."

Net finding: every bullet on the five active variants and three job PDFs traces to a CLAIM-EVIDENCE row. The only document carrying disproven or excluded claims is the archived `_archive/AI-ML-Engineer` resume (ARC), which predates the 2026-08-10 rebuild.
