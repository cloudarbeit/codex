# Codex Sales Research Studio

**Go from scattered company notes to a clear, reviewable next step.** Bring account context, source references, possible signals, open questions, and follow-up tasks into one small research pack. Export the result as a Markdown brief or portable JSON project.

## Try it

Live demo: https://codex-sales-intelligence-lab.agrdy.chatgpt.site

Choose **See a finished sample** to jump to a fictional, already-filled brief, then explore its source notes and workflow. Or start an account of your own. Source pages are not fetched: add a note you observed and its HTTPS URL. The tool never claims to have verified your note.

The complete interface is available in English and German. Use the language button in the top navigation; your choice is remembered in this browser. Brief exports follow the selected language.

## Why use it

- **For your own preparation:** keep the account, source notes, assumptions, and next action together instead of reconstructing them from browser tabs.
- **For a colleague:** make it easier to review what you observed, where it came from, and what still needs an answer.
- **For a customer conversation:** use the open questions and editable draft as preparation, then decide yourself what is appropriate to say.

The result is a working aid, not a company score or a promise of better sales outcomes. The sample company and its sources are fictional.

## What it does

- Records an account, website reference, segment, and research question.
- Keeps each observation attached to an HTTPS source URL and a user-selected classification: potential signal, constraint/risk, or unknown.
- Adds open questions and next steps without making up internal company context.
- Shows coverage counts, not an invented lead score.
- Produces a deterministic evidence-linked report and an editable outreach draft based on one selected note.
- Lets a person mark the report reviewed. There is no send action, contact integration, backend, or model-generated claim.
- Keeps data in the current browser tab by default. Optional device-local saving is explicit; Markdown and JSON exports remain under the user's control.

## Privacy and evidence boundaries

This is a browser-only application. It does not crawl websites, call an AI model or API, send form data, or send outreach. The site itself is hosted publicly; the app sends no user-entered research to that host after page load. If you turn on **Remember on this device**, data is stored in this browser's local storage on this device. Switch it off or use **Clear workspace** to remove that saved copy. Exported files are yours to store or share.

Source titles, URLs, observations, confidence labels, and classifications are user-entered. The app organizes them; it does not independently verify source content. Review every brief and outreach draft before use.

## Run locally

Requirements: Node.js 20 or later. No package installation or third-party dependencies are needed.

```sh
npm run build
npm run dev
```

Open http://127.0.0.1:4179. Changes to the source require `npm run build` before preview.

## Project layout

- `index.html` — accessible page structure.
- `src/app.js` — browser-local project state, evidence ledger, report, import/export, and review controls.
- `src/styles.css` — responsive visual system.
- `scripts/build.mjs` — deterministic, dependency-free static build.
- `scripts/preview.mjs` — local static preview server.
- `docs/TECHNICAL-NOTE.md` — data model, privacy boundary, and known limitations.

## GitHub readiness

The source is organized as a standalone repository and has no runtime dependencies. No license is included, so this repository is presented as a portfolio example rather than an invitation to reuse or contribute code.

## Project status

The live page is an independent Codex demonstration. OpenAI is not affiliated with or endorsing this project, and the project does not imply that OpenAI built or tested it.

## Codex skills

- [Work Brief Builder](plugins/work-brief-builder/README.md) — turn an unclear request into a bounded, reviewable work brief. Includes a fictional before-and-after example and is designed for practical use in Codex trainings.
