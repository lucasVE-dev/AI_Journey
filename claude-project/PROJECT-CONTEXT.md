# AI Journey — project context

Snapshot written 28 October 2026 from 29 Claude Code conversations
(4 September to 28 October 2026).

This file holds only what the repository does not: decisions and their
reasons from conversations, the learning setup on the Mac, and where things
stand. Upload these repository files next to it. They are the source of
truth, and this file does not repeat them:

- `CLAUDE.md`: who writes the code, stack, working rules
- `docs/SPECIFICATION`: what the app must do
- `docs/CURRICULUM-LOG.md`: why the curriculum changed, and retired ids
- `modules.js`: the curriculum itself (10 modules, 540 planned hours)
- `NEXT-STEPS.md`: ideas parked for later

Where this file and the repository disagree, the repository wins.

---

## Goal

Lucas is an electromechanical engineer moving into AI engineering: building
automations and applications on top of existing models. The aim is to create
real value for a company and build a CV that is attractive in the 2026–27 job
market. The 20 October review used US and Australian job data.

Journey started 5 August 2026. The end date is August 2027. Lucas chose
August over Claude's suggested September ("I want to be ambitious"). The plan
needs about 10 h a week, and the pace so far has been 11–12 h.

---

## Where things stand (as of 23 October 2026)

From the app's export of 24 October. For current numbers, export from the app
and upload the JSON.

| Module | Logged | Planned |
|---|---|---|
| 00 Foundations, browser only | 73.1 h | 70 h |
| 01 The working environment | 26.4 h | 64 h |
| 02–09 | 0 h | 406 h |

- **Module 00 is complete.** Highest rated: Odin Project JavaScript and
  projects (4.8 / 5). Lowest: Markdown (2.0).
- **Module 01:** Automate the Boring Stuff ch. 9–13 done (21.6 h against 18
  planned). Started: Linux (Linux Journey on labex.io), Git branching,
  Anthropic Academy, How language models work.
- **Projects:** 15.7 h, on the tracker app and a wedding website.

---

## The tracker app: history and decisions

| Date | What happened | Why |
|---|---|---|
| 11 Sep | Weekly hours changed from Monday–Sunday to the last 7 days. Lucas's own change | So the weekly bar never resets to zero on Monday |
| 20 Sep | Added **Days on pace**: days on which the 7 days ending that day reached 12 h. PR #3 | Motivation. Lucas corrected Claude, which had built a streak: "it doesn't reset to 0, is just a counter". One strong day counts up to 7 times, which is known and accepted |
| 20 Sep | Cross-device sync discussed, then **deferred** | See below |
| 20 Oct | `docs/CURRICULUM-LOG.md` created, full curriculum review | Git records what changed, not why |
| 28 Oct | Chrome deleted the app's saved data between 24 and 27 Oct. Restored from the 24 Oct export; later sessions lost | The app never deletes data. Chrome removed it (most likely a browsing-data clear) |

**How the app is run:** `index.html` opened from Finder in Chrome, so the
data lives under Chrome's `file://` storage on this Mac only. A GitHub Pages
copy or another browser has separate, empty storage.

**Lesson from the data loss:** `localStorage` belongs to the browser, not the
app. The JSON export is the only copy Lucas controls. Export regularly.

**Cross-device sync options (decision pending):**

| Option | Cost |
|---|---|
| Keep `localStorage` + export/import | Manual. Already built |
| GitHub API, private data repo | Token in the browser. Detects conflicting writes |
| GitHub Gist | Easiest, but a secret gist is readable by anyone with the URL |
| Supabase / Firebase | Most work. Login, security rules. README plans Supabase for v2 |

The first question is whether the app stays personal or goes public.

**Known gaps between the specification and the app:**
- The specification derives the weekly target from `JOURNEY_END`. The app
  uses fixed 12 h (on track) and 15 h (target) and has no end date.
- The specification says "hours this week since Monday". The app uses the
  last 7 days.
- The specification says module ids run 00–07. They now run to 09.

---

## Curriculum: decisions not recorded in the log

- **Estimates were Claude's unchecked guesses.** Several were wrong: book
  edition, chapter count, hours. Lucas adjusts them freely. Before planning
  hours for a resource, check its live page (log principle 6).
- **Automate the Boring Stuff** took about 4.2 h a chapter, not the 1.6 h
  planned. Lucas did not enjoy its read-first style, and the book has no
  solutions. The exercises that taught most were worked through with Claude.
  The chapter 12 gap in the old range was left over from renumbering the 2nd
  edition to the 3rd, not a deliberate choice.
- **Anthropic Academy** moved to academy.claude.com. Agreed order: Claude
  Code 101, then Claude Platform 101, then Building with the Claude API. In
  the long course, do the API access and tool-use sections fully, skim the
  prompt sections, and stop before RAG. Claude 101 is optional.
- **Linux** (Linux Journey on labex.io): the course uses bash, while the Mac
  uses zsh. Claude proposed keeping about 41 of the 89 lessons. Lucas decided
  to continue first and judge the scope from experience. **Open.**
- **n8n** is not a must for AI engineering roles. It is kept as three free
  courses plus three builds, because ticking resources keeps morale up.
- **Streamlit vs FastAPI:** Streamlit (6 h) is a prototype tool; FastAPI is
  how a model gets served as an API.
- **AWS** was chosen on advice from friends. Which certification is
  **open**: SAA-C03 may change around mid-2027.

---

## Learning setup on the Mac

**Shell:** zsh, the macOS default. Homebrew is installed. `~/.zprofile` holds
the Homebrew line and `~/.zshrc` holds nvm (Node). Tutorials written for
bash, such as Linux Journey, differ in places; for example, `help` is
bash-only.

**Python:**
- `uv` (from Homebrew) manages Python 3.12. Apple's `/usr/bin/python3` is
  3.9.6 and cannot see project packages. Typing a bare `python3` is the usual
  cause of `ModuleNotFoundError`.
- Run with `uv run python` or `uv run script.py`. Never type terminal
  commands at the `>>>` prompt.
- `~/Programing-practice/` has a shared `.venv` for the book exercises, one
  folder per chapter. VS Code uses it through `.vscode/settings.json`.
- `~/Scripts/` has its own `.venv`, for scripts launched from `PATH` (book
  ch. 12). The line to add to `PATH` is
  `export PATH="$PATH:$HOME/Scripts"`.
- Install libraries one chapter at a time. The book's `automateboringstuff3`
  bundle fails to install because of a broken `playsound` dependency.

**JavaScript:** Odin Project work lives in `~/TOP/repos/`. Run a single
folder's tests with `npx jest <folder path>`.

**Web scraping:** PyPI blocks scripts with a bot check, and xkcd allows them.
Chrome is in `/Applications` for Selenium. Playwright is also installed.

**Editor:** VS Code, with inline AI suggestions turned off, so Lucas types
the code himself.

**Git:** commits use `283061802+lucasVE-dev@users.noreply.github.com`. One
branch per feature, named after the work, deleted after merging. Lucas runs
git commands himself.

---

## Concepts covered so far

**JavaScript:** code runs once at load and handlers run on events;
`setTimeout` schedules work and does not pause; create DOM elements inside
the handler that uses them; never add listeners inside listeners; `sort`
changes the array in place and its comparator must return a number;
`reduce` with an object as the accumulator; dot versus bracket notation;
misspellings like `lenght` fail silently; a calculator built as a state
machine.

**Python:** `enumerate`; `append` versus assigning to an index that doesn't
exist; conditional expressions; how floats turn into text; regex (`\b`,
`re.sub` with a function, lookarounds); `pathlib` (`name` versus `stem`);
`shutil`; renaming files safely through a temporary name; avoid a bare
`except`; when a loop runs zero times, check its input first; `requests`,
BeautifulSoup, Selenium, Playwright.

**Shell:** `PATH` and how commands are found; `~` and hidden dotfiles;
`.zshrc` versus `.zprofile`; `which` and `where`; `man`, `--help`, `q` to
leave a pager; manual sections in `whatis` and `apropos`; standard folders
such as `bin` and `sbin`; Homebrew.
