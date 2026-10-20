# Curriculum log

Why the curriculum in `modules.js` changes. Git records *what* changed; this
file records *why*. A change to `modules.js` and its entry here go in the same
commit. Newest first.

The original curriculum and its hour estimates were drafted by Claude without
checking the resources. Several were wrong: book edition, chapter length,
missing prerequisites. Planned hours are adjusted when the estimate was the
mistake.

---

## Principles to follow

1. **Learn a topic when it is needed.**
2. **Build more, read less.** When possible learning topics by doing, not reading
3. **Prefer resources with feedback.**
4. **Merge resources that cover the same ground.**
5. **Everything takes longer than planned.**
6. **Check a resource before planning hours for it.** Edition, chapter length,
   prerequisites.

---

## 2026-10-20 — Full review against live resources and the market

- **End date moved from May to August 2027.** About 450h remain, which needs
  10h every week from now on. The 11–12h logged since September leaves a
  small margin; weeks like late August (1h) and mid-October (7h) use it up.
- **FastAPI and Pydantic moved to module 03, with a plain HTML/CSS/JS front
  end.** Serving a model behind an API is the core of the job, and it puts
  module 00 to use. FastAPI was in module 07, Pydantic was nowhere.
- **Streamlit 10h → 6h, as a prototype before FastAPI.** Teams use it for
  internal demos; it does not replace an API.
- **n8n: three free courses (about 14h) plus three builds (30h).** The old
  Level 1/2 courses no longer exist; N8N103 covers AI, so the Udemy agents
  course went. n8n is not a must for AI engineering roles, so the time goes to
  building the module's three automations — each one tickable.
- **Broken links fixed.** Claude API and MCP courses (now on Skilljar),
  Linux Journey, OWASP, LangChain docs, Python for Everybody.
- **Outdated resources removed.** The LangChain course teaches chains and
  memory, which LangChain 1.0 made legacy. The 2023 prompt engineering
  course is covered by the Claude API course. openai/evals does not teach
  eval design; Hamel Husain's guides replace it.
- **Classes added** to Python for Everybody (ch. 15). Never covered before.
- **Order fixed.** How LLMs work moves from module 05 to 01. Retrieval eval
  moves into module 04, whose deliverable needs it.
- **Estimates checked against course pages.** Claude API 8 → 10h (first
  half only), Agentic AI 12 → 15h, Hugging Face agents 14 → 18h, tenacity
  8 → 3h. Unnamed Udemy bootcamp removed.
- **Invented statistics removed** from the AWS and production-project
  descriptions. AWS stays, on local advice.
- **Open:** which AWS certification. The SAA-C03 exam may get a new version
  around mid-2027; check before buying a course.

## 2026-10-20 — Module 01 trimmed (`bf58a7e`)

- **Automate the Boring Stuff cut to ch. 9–13.** Each chapter takes 4–5h, not
  the under 2h originally estimated (18h for ten chapters). From web scraping on, the chapters are about
  memorising libraries rather than learning Python; the docs and AI cover that
  on demand. The book has no solutions: the exercises that taught the most
  were the ones worked through with Claude.
- **Python environments 6h → 3h.** Seems unnecesarily lenghtl without much purpose

## 2026-10-01 — Descriptions aligned with what was studied (`c361b8c`)

- **DOM chapters removed from javascript.info.** The Odin Project's
  JavaScript section already covers them.
- **Exercism: "until comfortable" instead of ten exercises, 4h → 6h.**
  Was having fun solving projects and it felt like a good way to practice and learn

## 2026-09-18 — The Odin Project split and expanded (`36263f6`)

- **Odin split into HTML/CSS (`00-r1`) and JavaScript + projects (`00-r8`),
  projects built without AI.** The original plan had the projects built with
  no HTML or CSS taught first, only JavaScript. Impossible without them.

## 2026-09-04 — Modules 00 and 01 revised from experience (`cf7cefb`)

- **javascript.info language and DOM entries merged.** Never separate topics in practice.
- **Python Tutor removed.** Used while debugging, not studied on its own.
- **Automate the Boring Stuff moved to the 3rd edition.** The original plan
  pointed at the 2nd edition, with the wrong chapter numbers.
- **Linux 16h → 6h, Git 8h → 3h.** systemd, SSH and networking wait for
  module 07; rebase and conflicts are learned faster on real work.

---

## Retired resource IDs

Never reuse these, or old sessions would attach to the wrong resource.

- `00-r2b` — javascript.info, Document and Events (2026-09-04)
- `00-r6` — Python Tutor (2026-09-04)
- `01-r8` — Prompt engineering for developers (2026-10-20)
- `03-r6` — Practical AI app bootcamp (2026-10-20)
- `04-r1` — LangChain for LLM application development (2026-10-20)
- `05-r4` — How language models work; now `01-r9` (2026-10-20)
- `06-r1` — Building and evaluating advanced RAG (2026-10-20)
- `07-r1` — FastAPI and REST design; now `03-r8` (2026-10-20)
- `05-r6` — Agents inside n8n (2026-10-20)
