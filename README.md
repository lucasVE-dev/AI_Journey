# AI_Journey — Study Tracker

A single-page web app to log study hours against a structured AI learning plan
and compare actual time spent against planned estimates.

**Live demo:** _coming soon_ · **Status:** in development (v1.0)

---

## Why I built this

I'm following a self-designed curriculum to become a AI automation and application
development (AI Engineer). The plan spans seven modules with an estimated 358 hours of work.

Tracking that in a spreadsheet gave me numbers but no answers. I wanted to know
which modules consistently run over their estimate and *why* — so I could
adjust the plan in month two instead of discovering the problem in month six.

This app is both the tool I use daily and the first project of that curriculum.

## Features

- Log study sessions retrospectively (date, module, resource, duration, notes)
- Record what blocked me in each session — the data that explains overruns
- Weekly progress against a 15 h/week target
- Per-module comparison of actual hours vs. planned hours
- Mark modules as complete
- Export and import all data as JSON

## Tech stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript | The app is small. A framework here would be overengineering. |
| Persistence | `localStorage` + JSON export | No backend to maintain. Migration to Supabase planned for v2. |
| Hosting | GitHub Pages | Free, deploys on push, public URL. |

No build step, no dependencies, no package manager.

## Project structure

```
├── index.html        # Markup and layout
├── style.css         # Styles
├── app.js            # Application logic
├── modulos.js        # Curriculum reference data
└── docs/
    └── ESPECIFICACION.md
```

Curriculum data is kept separate from application logic so the plan can change
without touching the code.

## Running locally

No installation required. Clone the repository and open `index.html` in a
browser.

```bash
git clone https://github.com/USERNAME/progreso-ia.git
cd AI_journey
open index.html
```

## Roadmap

- [ ] **v1.0** — Session logging, module progress, JSON export _(in progress)_
- [ ] **v1.1** — Edit existing sessions
- [ ] **v1.2** — Filter by module and date range
- [ ] **v2.0** — Supabase backend for cross-device sync
- [ ] **v2.1** — AI-generated summary of recurring blockers
- [ ] **v3.0** — Public portfolio view with linked projects

## Author

**Lucas Villalba** 
