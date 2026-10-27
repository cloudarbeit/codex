# Work Brief Builder

Work Brief Builder turns a rough request into a concise, reviewable brief before the work starts. It is intended for people who want to use Codex on real business tasks and need to make the expected outcome, boundaries, inputs, and review conditions clear.

## What it helps with

- State the intended outcome and deliverables.
- Make scope and exclusions visible.
- Record which materials and sources may be used.
- Separate known facts from assumptions and open questions.
- Define observable acceptance criteria and review gates.
- Prepare a next prompt for the task after the brief has been reviewed.

The skill prepares the brief and then stops. It does not perform the task, contact people, publish content, or submit forms. A work brief is a planning aid, not a legal contract.

## Install

In Codex, add this repository as a plugin source, then install **Work Brief Builder** from the `plugins/work-brief-builder` directory. If your Codex version does not support installing from a repository subdirectory, download the repository and select that plugin folder in the plugin installation flow.

## Use

Try prompts such as:

- “Turn this request into a clear work brief: [paste request].”
- “What is missing or ambiguous in this brief?”
- “Draft a brief from these notes and label any assumptions.”

The skill replies in the language used by the person requesting the brief, unless they specify another language.

## Fictional example

The [`examples`](examples/) folder shows a fictional request and the corresponding brief. Names, dates, and business details in both files are invented for demonstration and do not describe a real customer or engagement.

## Package contents

- `plugin.json` — plugin manifest.
- `skills/work-brief-builder/SKILL.md` — skill instructions.
- `examples/` — fictional before-and-after sample.

## Status

This is an independent portfolio project by Andreas Hacklinger. It is not affiliated with or endorsed by OpenAI. The examples illustrate the skill's intended behavior; they do not establish product compatibility or guarantee a particular result.
