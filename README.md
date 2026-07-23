# Hypercourse

An interactive, local-first course for learning how to build professional videos with [HyperFrames](https://github.com/heygen-com/hyperframes).

[Try the live course](https://hypercourse.daniel-green.chatgpt.site)

![Hypercourse: Make videos with rhythm, depth, and intent](public/og.png)

Hypercourse works like a notebook: learn one idea, change a real frame, run it locally, inspect the result, and explain the decision. It includes 47 hands-on lessons spanning composition, design systems, product launches, product tours, vertical video, data stories, music-led editing, reusable composition systems, and deterministic finishing.

Each lesson follows the same active loop:

**Idea → Do → Run → Notice → Reflect → Check**

## What is included

- 47 interactive lessons with editable frame variables and immediate previews
- A complete section on `design.md`, `frame.md`, and `DESIGN.md`
- The published HyperFrames release track through Day 17
- Links to official HeyGen examples that learners can watch and remix
- Copy controls for code and browser-supported dictation for text fields
- A starter pack with design, storyboard, frame, track-brief, and QA templates
- Device-local progress, code edits, quiz responses, and reflections

No account, API key, analytics service, database, or cloud render is required to use the course locally.

## Run locally

Requirements:

- Node.js 22.13 or newer
- npm

```bash
git clone https://github.com/daniel-p-green/hypercourse.git
cd hypercourse
npm install
npm run dev
```

Open the local URL printed by the development server.

## Validate a change

```bash
npm test
```

This builds the application and runs the rendered-shell, course-content, responsive-typography, provenance, and interaction checks.

## Project map

- `public/course/course-data.js` — modules and lesson content
- `public/course/app.js` — course rendering, progress, copy, and dictation interactions
- `public/course/styles.css` — the visual system and responsive typography
- `public/course/starter-pack/` — reusable planning and QA templates
- `tests/rendered-html.test.mjs` — build and content checks
- `app/` and `worker/` — the web application shell and runtime entrypoint

## Sources and attribution

The course links to and teaches from publicly available HyperFrames material, including:

- [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)
- [HyperFrames design documentation](https://www.hyperframes.dev/design)
- [heygen-com/hyperframes-launches](https://github.com/heygen-com/hyperframes-launches)

Hypercourse is an independent learning project created by [Daniel Green](https://www.linkedin.com/in/danielpgreen). It is not affiliated with or endorsed by HeyGen. HyperFrames and HeyGen are trademarks of their respective owner.

## Contributing

Issues and pull requests are welcome. For lesson changes, keep the course’s core rule intact: one idea per frame, and every lesson should ask the learner to do something observable.

## License

The Hypercourse source code and original course materials are available under the [MIT License](LICENSE). Third-party names, trademarks, linked examples, and external materials remain the property of their respective owners.
