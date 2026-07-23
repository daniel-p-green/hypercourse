---
name: Project frame direction
description: Video-first translation of design.md
canvas:
  aspect: "16:9"
  background: "#111111"
safe_area:
  x: "7%"
  y: "8%"
type:
  display_family: "Your approved display family"
  body_family: "Your approved text family"
  headline_max: "88px"
  body_max: "28px"
composition:
  hierarchy: "one dominant idea"
  preferred_balance: "asymmetric"
  crop_behavior: "protect faces and decisive evidence"
  depth: "flat"
motion_intent:
  entrance_character: "decisive"
  typical_dwell: "1.2–2.8s"
avoids:
  - browser-like cards
  - dashboard chrome
  - equal visual weight
---

# Project frame direction

`frame.md` is the video-first companion to `design.md`. Keep the brand atoms exact, then translate them into frame scale, safe areas, crop behavior, hierarchy, and compositional rules.

## Composition rules

- One dominant idea per frame.
- Numbers come from the script and media, not from a preset.
- Preserve enough negative space for captions and editorial movement.
- Build the end-state composition before tuning animation.

## File resolution

HyperFrames uses the first available design source in this order:

1. `frame.md`
2. `design.md`
3. `DESIGN.md`

Preset files may be named `FRAME.md` in their source library. Once adopted into a project, save the working file as lowercase `frame.md`.

Timing and motion implementation still belong in the storyboard and composition. This file records the visual intent that those layers should honor.
