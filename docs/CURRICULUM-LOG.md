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
