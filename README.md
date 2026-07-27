# Hypercourse

The OpenAI Sites release of **Hypercourse**, an interactive course for building professional videos with the local HyperFrames workflow.

Hypercourse opens with a zero-assumption setup runway, then teaches professional HyperFrames video design through 55 focused notebook lessons. Each lesson follows the same active loop:

**Idea → Do → Notice → Reflect → Check**

Fifteen visual-decision lessons use an immediate practice preview. Production lessons use a split-window workflow: keep Hypercourse beside Codex, Claude Code, or an editor, run the real local HyperFrames workflow, and record evidence in the course.

The course covers foundations, product launches, product tours, vertical social video, data stories, music and lyric videos, cinematic manifestos, and deterministic finishing.

The curriculum and responsive acceptance bar are documented in [COURSE-QUALITY.md](./COURSE-QUALITY.md).

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run build
```

Course progress, edited cells, quiz responses, and reflections stay in browser storage on the learner's device. The course does not require accounts, APIs, analytics, databases, or external assets.
