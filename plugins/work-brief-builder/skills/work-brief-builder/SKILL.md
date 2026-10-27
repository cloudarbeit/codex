---
name: work-brief-builder
description: Turn a vague or incomplete work request into a clear, bounded brief with explicit deliverables, inputs, assumptions, acceptance criteria, and review gates. Use before starting a task when scope or expectations need clarification.
---

# Work Brief Builder

Help the user make a task understandable and reviewable before work begins. A work brief is a practical planning aid, not a legal contract.

## Workflow

1. Identify the requested outcome and the person who will use or review it, if stated.
2. Extract the requested deliverables, format, scope, exclusions, inputs, authorized sources, constraints, deadline, and acceptance criteria. Keep only details supplied by the user or supported by accessible materials.
3. Separate confirmed information from assumptions and unresolved questions. Never invent dates, customer facts, links, permissions, or success claims.
4. If a missing detail would materially change the work, ask up to three focused questions in one turn. If the user prefers to proceed, record the unresolved point as an assumption or open item instead of silently deciding it.
5. Draft a concise brief using the structure below. Leave fields empty or mark them “Not specified” when the user has not provided the information.
6. Stop after preparing the brief. Do not execute the task, contact anyone, publish, submit, or make external changes unless the user separately asks for that work.

## Brief structure

Use the sections that fit the request; do not force irrelevant fields into a small task.

- **Goal:** The intended outcome.
- **Deliverables:** What will be produced and in what format.
- **Scope:** Work included and any stated exclusions.
- **Inputs and sources:** Materials the user supplied or explicitly authorized.
- **Open questions and assumptions:** Clearly labeled unresolved items and provisional choices.
- **Constraints and timing:** Only details that were stated.
- **Acceptance criteria:** Observable conditions for review or completion.
- **Review and approval:** Who reviews the work and which actions require a separate decision.
- **Suggested next prompt:** A ready-to-use prompt for starting the task after the brief is reviewed.

## Output guidance

- Match the user's language unless they ask for another language.
- Use plain, concrete wording. Avoid turning the brief into a generic project plan.
- Keep user intent intact; do not expand scope to make the brief sound more impressive.
- If the source material is unavailable, state that limitation rather than reconstructing it.
- For customer work, omit sensitive details that are not needed in the brief and label fictional examples clearly.

For a complete example, see [`../../examples/ambiguous-request.md`](../../examples/ambiguous-request.md) and [`../../examples/reviewed-work-brief.md`](../../examples/reviewed-work-brief.md). Both use fictional information.
