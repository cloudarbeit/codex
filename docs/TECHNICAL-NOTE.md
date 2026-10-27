# Technical note

## Purpose

Codex Sales Research Studio is a local-first work aid for preparing an evidence-backed account research brief. It is a small browser application, not a CRM, crawler, agent, or email client.

## Data model

- `lead`: user-entered company name, public website reference, optional segment, and research question.
- `evidence[]`: source title, HTTPS URL, direct observation, user classification (`signal`, `constraint`, `unknown`), confidence label, and timestamp.
- `questions[]`: internal questions that public evidence has not answered.
- `tasks[]`: manually entered follow-up actions and optional due dates.
- `draft`: editable internal outreach text generated from one selected signal.
- `reviewed`: user-controlled review marker; it does not approve or transmit a message.

The brief is deterministically rendered from these fields. A source ID is assigned by ledger order when rendered; it is not a claim of source verification.

## Privacy boundary

No server API is called by the app. No source URL is fetched. By default, data exists only in in-memory page state. Device-local persistence requires the user to turn on the explicit toggle and uses origin-scoped browser `localStorage`. JSON and Markdown exports are created as local downloads. There is no analytics or third-party runtime dependency in the client bundle.

## Safety and limits

- URLs are accepted only when they use HTTPS, omit embedded credentials, and use the standard port.
- Clicking a source link is a user action; links open in a separate tab with `noopener noreferrer`.
- Imported JSON is size-limited and normalized before use. It remains local to the browser.
- User-entered observations are not independently verified and may be wrong or incomplete.
- Confidence and classifications are user judgments, not model outputs.
- Coverage counts are descriptive only; there is no account priority score.
- Outreach copy is a local, editable draft. There is no send button or connected account.
- The application cannot establish internal company processes, budget, intent, or outcomes from public snippets.

## Known product boundaries

The standalone tool has no CRM, live-research, or messaging integrations. It demonstrates a portable evidence-led workflow that runs in the browser. The hosting provider may retain ordinary infrastructure logs; the application code does not send user-entered data to a server.
