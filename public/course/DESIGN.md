# Hypercourse notebook design system

## Product

Hypercourse is a privacy-safe, action-first notebook for learning professional video construction with the local HyperFrames workflow. Each screen teaches one idea and asks the student to change one thing, run it, observe the result, and reflect.

## Experience model

Every lesson follows the same quiet loop:

1. **Idea** — at most three short sentences.
2. **Do** — one concrete edit in a local code cell.
3. **Run** — the frame updates immediately.
4. **Reflect** — one short observation saved locally.

Navigation stays behind a Contents drawer. There are no permanent sidebars, dashboards, point systems, or passive lecture walls.

## Layout

- One central notebook column, maximum width `1120px`.
- Thin graphite top bar with notebook title, local status, progress, and Contents.
- Teaching copy uses open whitespace and horizontal rules.
- The action cell contains one editable variable/code surface and one large 16:9 result.
- Previous, complete, and next controls close the page.

## Colors

- Canvas: `#f7f5ef`
- Paper: `#fffefa`
- Ink: `#171714`
- Muted ink: `#66635c`
- Rule: `#d7d2c8`
- Shell: `#171715`
- Shell text: `#f3f0e8`
- Accent: `#ef4e2f`
- Success: `#aec3a1`
- Code surface: `#f0eee8`

## Typography

- UI/display: `Helvetica Neue`, `SF Pro Display`, system sans-serif
- Teaching voice: `Iowan Old Style`, Baskerville, Georgia, serif
- Code/timing: `SFMono-Regular`, Consolas, monospace
- The visible product name is always `Hypercourse` in title case. Never apply uppercase transforms or alternate casing to the wordmark.
- Meaningful controls and labels use 15–16px type. Supporting metadata uses 14px. Text below 14px is reserved for decorative detail inside a simulated video frame.
- Use one bounded fluid scale. Every `clamp()` combines `rem` with viewport growth; no content size is driven by `vw` alone.
- Body copy targets roughly 45–90 characters per line, with 66 characters as the default long-form measure.
- Headings use short measures and can wrap. Intended line groups may be block spans, but never `white-space: nowrap`.
- Heading line-height stays between 1 and 1.15. Running text stays at 1.5 or greater.
- Text containers grow with their content. Fixed heights and `overflow: hidden` are not allowed around instructional copy.

### Typography acceptance checks

- At 320 CSS pixels, all instructional text reflows in one direction with no clipping or horizontal page scroll.
- At 200% text size, content and controls remain complete and usable.
- Review at 320, 375, 390, 768, 1024, and 1440 CSS pixels.
- Check the longest lesson title, the landing headline, navigation, buttons, drawer rows, code, and helper text—not only the page-level scroll width.
- Sources: [WCAG 2.2 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [WCAG 2.2 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [USWDS Typography](https://designsystem.digital.gov/components/typography/), and [web.dev responsive typography](https://web.dev/learn/design/typography/).

## Interaction

- `Run frame` parses the editable local variables and updates the preview.
- Reflection notes and completion state use `localStorage` only.
- Contents is a modal drawer, not permanent chrome.
- Keyboard shortcuts: `Cmd/Ctrl + Enter` runs; `Cmd/Ctrl + ]` advances.
- Motion is restrained and respects `prefers-reduced-motion`.

## What not to do

- No card grids, bento boxes, fake metrics, badges, or gamification.
- No permanent curriculum rail or coaching panel.
- No dense video-editor timeline.
- No more than one idea and one requested action per lesson.
- No decorative gradients, glass, neon, or generic course-platform styling.
- No passive walls of documentation.
