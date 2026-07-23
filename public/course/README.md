# Hypercourse

Hypercourse is a self-contained, privacy-safe interactive course for learning professional video design with the local HyperFrames workflow. Every lesson follows the same notebook loop:

**Idea → Do → Run → Reflect → Check**

The opening course map starts with a zero-assumption local setup runway, then lets learners continue linearly or jump into a professional production format. Inside each lesson, one or two context-specific controls update the visual frame and the editable CSS cell together.

No account, API key, analytics, database, or cloud service is used. Progress, reflections, quiz responses, and edited cells are stored in the browser's `localStorage` on the current device.

## Run the course

From this directory:

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173
```

The course uses plain HTML, CSS, and JavaScript so it can be shared or archived without a build tool. A local server is required because the curriculum is loaded as an ES module.

## Curriculum

1. Foundations: composition and PowerPoint diagnosis
2. Design for the frame: `design.md`, `frame.md`, presets, and adherence
3. Product launch
4. Product tour
5. Vertical social
6. Data story
7. Music and lyric video
8. Cinematic manifesto
9. Composition systems: timeline contracts, sub-compositions, registry reuse, and batch variables
10. Deterministic QA and capstone packaging
11. HyperFrames release track through Day 17

The labs use sanitized fictional products and claims. The downloadable starter pack contains reusable planning documents for real HyperFrames projects.

The landing page also includes a curated official example library: six watchable projects with direct source links, plus the full HeyGen launch-composition repository for local study and remixing.

## Keyboard shortcuts

- `Cmd/Ctrl + Enter`: run the active frame
- `Cmd/Ctrl + ]`: next lesson
- `Escape`: close Contents

## Local data

The browser stores course state under `hypercourse-course-v1`. Existing progress from earlier course builds is imported automatically. Clearing site storage resets progress. No state leaves the device.

## Technical scope

The lessons are based on the locally installed HyperFrames skill pack and cover:

- `design.md`, `frame.md`, design resolution, and visual adherence
- static hero-frame composition before animation
- GSAP timing, easing, hierarchy, and finite seekable timelines
- product, UI, caption, data, lyric, and manifesto patterns
- local transcription and audio-reactive workflows
- transitions as editorial meaning
- lint, check with annotated snapshots, preview approval, render, and human review

The in-course preview is a lightweight learning simulator for immediate visual feedback. The capstone uses the actual HyperFrames CLI and the starter pack in this folder.
