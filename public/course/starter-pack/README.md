# Hypercourse starter pack

Use this pack for the course capstone or copy individual templates into any sanitized HyperFrames project.

## Recommended local project shape

```text
project/
├── BRIEF.md
├── design.md
├── frame.md
├── SCRIPT.md or transcript.json
├── STORYBOARD.md
├── index.html
├── compositions/
├── assets/
├── qa/
└── renders/
```

## Local production loop

```bash
npx hyperframes init project-name --non-interactive
cd project-name
npx hyperframes lint
npx hyperframes check --snapshots --samples 15
npx hyperframes preview
npx hyperframes render --quality draft
```

The exact available CLI commands can change. Run `npx hyperframes info` and `npx hyperframes docs` when a command differs from the installed version.
