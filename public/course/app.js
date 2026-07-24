import { modules, allLessons, officialExamples } from "./course-data.js";

const STORAGE_KEY = "hypercourse-course-v1";
const LEGACY_STORAGE_KEY = "framecraft-course-v1";
const COURSE_UPDATED = "July 23, 2026";
const defaultState = { current: allLessons[0].id, complete: [], notes: {}, quiz: {}, code: {}, checks: {} };
const PROOF_LESSONS = new Set([
  "zero-install",
  "zero-project-map",
  "zero-first-render",
  "lyric-lock",
  "sub-composition-contract",
  "registry-reuse",
  "deterministic-qa",
  "review-language",
  "capstone",
  "daily-install",
  "daily-figma",
  "daily-prompt-anatomy",
  "daily-studio-preview",
  "daily-sample-web",
  "daily-asset-libraries",
  "daily-storyboard",
]);

function loadState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    const legacyState = localStorage.getItem(LEGACY_STORAGE_KEY);
    const nextState = { ...defaultState, ...JSON.parse(savedState || legacyState || "{}") };
    if (!savedState && legacyState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    }
    return nextState;
  } catch {
    return { ...defaultState };
  }
}

let state = loadState();
let drawerOpen = false;
let screen = "home";

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentLesson() {
  return allLessons.find((lesson) => lesson.id === state.current) || allLessons[0];
}

function lessonIndex(id = state.current) {
  return allLessons.findIndex((lesson) => lesson.id === id);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function copyIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>`;
}

function microphoneIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"></path></svg>`;
}

function resetIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8V4m0 0h4M5 4l3.2 3.2A7 7 0 1 1 5.5 14"></path></svg>`;
}

function renderCreatorBar() {
  return `<aside class="creator-bar" aria-label="Project attribution">
    <span>Independent learning project · Not affiliated with or endorsed by HeyGen</span>
    <a href="https://www.linkedin.com/in/danielpgreen" target="_blank" rel="noreferrer">Created by Daniel Green <span aria-hidden="true">↗</span></a>
  </aside>`;
}

function renderSiteFooter() {
  return `<footer class="site-footer">
    <div>
      <strong>Hypercourse</strong>
      <span>Independent, local-first learning project</span>
    </div>
    <nav aria-label="Creator links">
      <a href="https://www.linkedin.com/in/danielpgreen" target="_blank" rel="noreferrer">Daniel Green</a>
      <a href="https://x.com/dgrreen" target="_blank" rel="noreferrer">X · @dgrreen</a>
      <a href="https://www.linkedin.com/in/danielpgreen" target="_blank" rel="noreferrer">LinkedIn</a>
    </nav>
    <p>Last updated <time datetime="2026-07-23">${COURSE_UPDATED}</time></p>
  </footer>`;
}

function labDefaults(preview) {
  const presets = {
    launch: ["1.00", "1.00", ".45", ".50", "#ef4e2f"],
    identity: ["1.06", ".94", ".32", ".34", "#ef4e2f"],
    powerpoint: [".86", ".82", ".22", ".20", "#7d8da6"],
    tour: [".88", "1.08", ".38", ".28", "#165dff"],
    social: ["1.05", "1.12", ".72", ".42", "#9a431e"],
    data: ["1.12", ".82", ".64", ".18", "#2869d8"],
    music: ["1.00", "1.05", ".68", ".74", "#d792b1"],
    manifesto: [".96", "1.04", ".18", ".16", "#c1121f"],
    qa: [".92", "1.00", ".28", ".10", "#9cad8c"],
  };
  return presets[preview] || presets.launch;
}

function starterCode(lesson) {
  if (PROOF_LESSONS.has(lesson.id)) return lesson.code;
  if (lesson.lab?.code) return lesson.lab.code;
  const [headline, subject, energy, density, accent] = labDefaults(lesson.preview);
  return `:root {
  --headline-scale: ${headline};
  --subject-scale: ${subject};
  --energy: ${energy};
  --density: ${density};
  --accent: ${accent};
}

/* Change one value. Run the frame. Observe what moved. */`;
}

function actionPrompt(lesson) {
  if (lesson.actionPrompt) return lesson.actionPrompt;
  const prompts = {
    launch: "Change headline scale and product scale until one element clearly leads.",
    identity: "Change only the accent and density. Does the frame still feel like the same brand?",
    powerpoint: "Increase headline scale and reduce density until the frame makes one claim.",
    tour: "Adjust subject scale so the important product state becomes unmistakable.",
    social: "Increase energy without sacrificing one obvious focal point.",
    data: "Give the decisive value more weight and the supporting form less.",
    music: "Map energy to atmosphere, not to a generic visualizer.",
    manifesto: "Reduce density and let one visual detail hold the silence.",
    qa: "Make the hierarchy obvious enough to verify at thumbnail size.",
  };
  return prompts[lesson.preview] || "Change one value, run the frame, and describe what changed.";
}

function controlSpec(lesson) {
  if (lesson.controls) return lesson.controls;
  const controls = {
    launch: [
      { variable: "headline-scale", key: "headline", label: "Headline", min: .65, max: 1.35, step: .01 },
      { variable: "subject-scale", key: "subject", label: "Product", min: .65, max: 1.35, step: .01 },
    ],
    identity: [
      { variable: "density", key: "density", label: "Atmosphere", min: 0, max: 1, step: .01 },
      { variable: "accent", key: "accent", label: "Brand accent", type: "color" },
    ],
    powerpoint: [
      { variable: "headline-scale", key: "headline", label: "Claim scale", min: .65, max: 1.35, step: .01 },
      { variable: "density", key: "density", label: "Visual noise", min: 0, max: 1, step: .01 },
    ],
    tour: [
      { variable: "subject-scale", key: "subject", label: "UI focus", min: .65, max: 1.35, step: .01 },
      { variable: "energy", key: "energy", label: "Pacing", min: 0, max: 1, step: .01 },
    ],
    social: [
      { variable: "energy", key: "energy", label: "Energy", min: 0, max: 1, step: .01 },
      { variable: "headline-scale", key: "headline", label: "Hook scale", min: .65, max: 1.35, step: .01 },
    ],
    data: [
      { variable: "headline-scale", key: "headline", label: "Value weight", min: .65, max: 1.35, step: .01 },
      { variable: "subject-scale", key: "subject", label: "Comparison", min: .65, max: 1.35, step: .01 },
    ],
    music: [
      { variable: "energy", key: "energy", label: "Intensity", min: 0, max: 1, step: .01 },
      { variable: "density", key: "density", label: "Atmosphere", min: 0, max: 1, step: .01 },
    ],
    manifesto: [
      { variable: "density", key: "density", label: "Visual density", min: 0, max: 1, step: .01 },
      { variable: "subject-scale", key: "subject", label: "Detail", min: .65, max: 1.35, step: .01 },
    ],
    qa: [
      { variable: "headline-scale", key: "headline", label: "Claim clarity", min: .65, max: 1.35, step: .01 },
      { variable: "density", key: "density", label: "Complexity", min: 0, max: 1, step: .01 },
    ],
  };
  return controls[lesson.preview] || controls.launch;
}

function previewCopy(lesson) {
  if (lesson.previewCopy) return lesson.previewCopy;
  const copy = {
    launch: ["New local camera", "Frame the future.", "One lens. No cloud. Every decision stays close."],
    identity: ["Design contract", "One voice. Many scenes.", "Color, type, motion, and refusal become a coherent system."],
    powerpoint: ["One claim", "Make the idea lead.", "Sequence the evidence instead of displaying everything at once."],
    tour: ["Relay inbox", "The decision, in focus.", "The result holds long enough to understand."],
    social: ["Local workflows", "Stop automating the wrong thing.", "one idea at a time"],
    data: ["Adoption after four weeks", "81%", "From 34% to 81% when the workflow became visible."],
    music: ["Chorus III", "I found the light still on", "Return with recognition. Evolve with meaning."],
    manifesto: ["A quiet reversal", "The hard part was never the door.", "It was deciding what deserved to come through."],
    qa: ["Local verification", "lint → check → preview → watch", "Each gate answers a different question."],
  };
  return copy[lesson.preview] || copy.launch;
}

function controlConsequence(control) {
  const consequences = {
    headline: "Changes the scale of the main claim.",
    subject: "Changes the scale or crop of the visual subject.",
    energy: "Changes the intensity of the simulated motion or contrast.",
    density: "Changes the amount of supporting visual information.",
    accent: "Changes the accent color used by the frame.",
  };
  return consequences[control.key] || "Changes one visible decision in the practice frame.";
}

function renderTopbar(lesson = null) {
  const done = state.complete.length;
  const progress = Math.round((done / allLessons.length) * 100);
  return `<header class="topbar">
    <div class="brandline">
      <button class="brand brand-button" data-action="home">Hypercourse</button><span class="brand-dot"></span>
      <span class="notebook-name">${lesson ? `${escapeHtml(lesson.moduleTitle)} — ${escapeHtml(lesson.title)}` : "Local HyperFrames course"}</span>
    </div>
    <div class="progress-compact" aria-label="${done} of ${allLessons.length} lessons complete">
      <span>${done}/${allLessons.length}</span>
      <div class="progress-track" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><div class="progress-fill" style="width:${progress}%"></div></div>
    </div>
    <div class="top-actions">
      <span class="local-state"><span class="local-dot"></span>Local</span>
      <button class="contents-button" data-action="open-contents" aria-haspopup="dialog" aria-controls="contents-drawer" aria-expanded="${drawerOpen}">☰&nbsp;&nbsp;Contents</button>
    </div>
  </header>`;
}

function renderLanding() {
  stopDictation();
  screen = "home";
  document.body.dataset.screen = "home";
  const done = state.complete.length;
  const formats = modules.filter((module) => ["product-launch", "product-tour", "vertical-social", "data-story", "music-lyric"].includes(module.id));
  const dailyModule = modules.find((module) => module.id === "daily-series");
  const hasProgress = done > 0;

  app.innerHTML = `
    ${renderCreatorBar()}
    <main class="landing" id="lesson-main">
      <header class="landing-nav">
        <button class="landing-wordmark" data-action="home">Hypercourse</button>
        <div class="landing-nav-actions">
          <span>${allLessons.length} lessons</span>
          <button data-action="open-contents" aria-haspopup="dialog" aria-controls="contents-drawer" aria-expanded="${drawerOpen}">View syllabus</button>
        </div>
      </header>

      <section class="landing-hero">
        <div class="landing-copy">
          <p class="landing-eyebrow">A local-first course for HyperFrames</p>
          <h1 class="landing-title">Make videos with rhythm, depth, and intent.</h1>
          <div class="landing-support">
            <p class="landing-intro">Start with an empty local folder. Finish with a professional film you can explain, inspect, and verify. No prior HyperFrames experience required.</p>
            <div class="landing-actions">
              <button class="landing-primary" data-action="${hasProgress ? "continue" : "start"}">${hasProgress ? `Continue · ${done}/${allLessons.length}` : "Start with setup"} <span aria-hidden="true">→</span></button>
              <button class="landing-secondary" data-action="scroll-workflows">See what you’ll make <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
        <div class="hero-studio" aria-label="A cinematic HyperFrames composition with a working timeline">
          <div class="hero-stage">
            <span class="hero-word">Move</span>
            <img src="/hero-sculpture.png" alt="" />
            <span class="hero-callout callout-html">HTML → VIDEO</span>
            <span class="hero-callout callout-figma">FIGMA → LAUNCH FILM</span>
            <span class="hero-callout callout-codex">CODEX + HYPERFRAMES</span>
            <span class="motion-path path-one" aria-hidden="true"></span>
            <span class="motion-path path-two" aria-hidden="true"></span>
          </div>
          <div class="hero-timeline" aria-hidden="true">
            <div class="timeline-ruler"><span>00:00</span><span>00:02</span><span>00:04</span><span>00:06</span><span>00:08</span></div>
            <div class="timeline-row"><span>TYPE</span><i class="timeline-clip clip-type"></i></div>
            <div class="timeline-row"><span>FORM</span><i class="timeline-clip clip-form"></i></div>
            <div class="timeline-row"><span>LIGHT</span><i class="timeline-clip clip-light"></i></div>
            <b class="timeline-playhead"></b>
          </div>
        </div>
      </section>

      <section class="format-section" id="workflows" aria-labelledby="formats-title">
        <div class="format-heading">
          <h2 id="formats-title">From first preview to professional film.</h2>
          <p>${allLessons.length} active lessons build setup fluency, visual judgment, production systems, and a verified capstone.</p>
        </div>
        <div class="workflow-list">
          ${formats.map((module) => `<button class="format-card" data-start-lesson="${module.lessons[0].id}" style="--module-color:${module.color}">
            <span class="format-number">${module.number}</span>
            <strong>${escapeHtml(module.title)}</strong>
            <span class="format-action">Explore <span aria-hidden="true">→</span></span>
          </button>`).join("")}
        </div>
      </section>

      <section class="release-track" aria-labelledby="release-title">
        <div class="release-heading">
          <p>Current through Day 17</p>
          <h2 id="release-title">The HyperFrames release track</h2>
          <span>Built from HeyGen’s published 30 Days of HyperFrames series. Day 8 was not published, so the track preserves the official numbering.</span>
        </div>
        <div class="release-rail">
          ${dailyModule.lessons.map((lesson) => `<button data-start-lesson="${lesson.id}">
            <span>Day ${lesson.releaseDay}</span>
            <strong>${escapeHtml(lesson.title)}</strong>
            <i aria-hidden="true">→</i>
          </button>`).join("")}
        </div>
      </section>

      <section class="remix-section" aria-labelledby="remix-title">
        <div class="remix-heading">
          <p>Official source projects</p>
          <div>
            <h2 id="remix-title">Watch. Inspect. Remix.</h2>
            <span>Finished HeyGen videos paired with source you can run locally.</span>
          </div>
        </div>
        <div class="remix-grid">
          ${officialExamples.map((example) => `<article class="remix-card">
            <span>${escapeHtml(example.type)}</span>
            <h3>${escapeHtml(example.title)}</h3>
            <p>${escapeHtml(example.description)}</p>
            <div>
              <a href="${example.watchUrl}" target="_blank" rel="noreferrer">Watch <i aria-hidden="true">↗</i></a>
              <a href="${example.sourceUrl}" target="_blank" rel="noreferrer">Remix source <i aria-hidden="true">↗</i></a>
            </div>
          </article>`).join("")}
        </div>
        <div class="remix-footer">
          <p><strong>Clone once.</strong> The official launch library contains 16 standalone compositions and uses Git LFS for media.</p>
          <div class="clone-command">
            <code id="launch-clone-command">git clone https://github.com/heygen-com/hyperframes-launches.git</code>
            <button class="icon-button on-dark" data-copy-target="#launch-clone-command" aria-label="Copy clone command">${copyIcon()}</button>
          </div>
          <a href="https://github.com/heygen-com/hyperframes-launches" target="_blank" rel="noreferrer">Browse all official launch projects <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section class="landing-method" aria-label="How the course works">
        <p><strong>Change the frame.</strong><span>Use real controls or edit the CSS.</span></p>
        <p><strong>Render locally.</strong><span>See the decision, not a lecture about it.</span></p>
        <p><strong>Direct before you build.</strong><span>Plan, sketch, comment, then commit.</span></p>
      </section>
    </main>
    ${renderSiteFooter()}
    ${renderDrawer()}`;

  bindEvents();
}

function renderPreview(lesson) {
  const [kicker, headline, copy] = previewCopy(lesson);
  return `<div class="preview-frame" id="preview-frame" data-preview="${lesson.preview}" data-lesson="${lesson.id}">
    <div class="preview-safe" aria-hidden="true"></div>
    <div class="preview-kicker">${escapeHtml(kicker)}</div>
    <div class="preview-headline">${escapeHtml(headline)}</div>
    <p class="preview-copy">${escapeHtml(copy)}</p>
    <div class="preview-rule"></div>
    <div class="preview-object" aria-hidden="true"></div>
    <div class="preview-beats" aria-hidden="true">${lesson.beats.map((beat, index) => `<span style="--beat:${index}">${escapeHtml(beat)}</span>`).join("")}</div>
  </div>`;
}

function renderControls(lesson, code) {
  const values = parseVariables(code, lesson);
  const intro = `Use one control at a time. It writes the matching value into ${lesson.lab?.filename || "decision.css"}; the preview changes only after you apply it.`;
  return `<div class="control-deck" aria-label="Interactive frame controls">
    <div class="control-deck-intro"><span>1. Make one change</span><p>${escapeHtml(intro)}</p></div>
    ${controlSpec(lesson).map((control) => {
      const value = values[control.key];
      if (control.type === "color") {
        return `<label class="control-item color-control"><span>${escapeHtml(control.label)}</span><input type="color" data-variable="${control.variable}" value="${value}" aria-label="${escapeHtml(control.label)}" /><output data-output="${control.variable}">${value}</output><small>${escapeHtml(controlConsequence(control))}</small></label>`;
      }
      return `<label class="control-item"><span>${escapeHtml(control.label)}</span><input type="range" data-variable="${control.variable}" min="${control.min}" max="${control.max}" step="${control.step}" value="${value}" aria-label="${escapeHtml(control.label)}" /><output data-output="${control.variable}">${Number(value).toFixed(2)}</output><small>${escapeHtml(controlConsequence(control))}</small></label>`;
    }).join("")}
  </div>`;
}

function renderFrameSource(lesson) {
  const [kicker, headline, copy] = previewCopy(lesson);
  return `<aside class="frame-source" aria-label="Course preview source">
    <div class="frame-source-heading">
      <div><span>Preview source</span><strong>Hypercourse simulation</strong></div>
      <p>This is not reading from your local HyperFrames project. The visible words are course-authored inputs shown below.</p>
    </div>
    <dl class="frame-inputs">
      <div><dt>Kicker</dt><dd>${escapeHtml(kicker)}</dd></div>
      <div><dt>Headline</dt><dd>${escapeHtml(headline)}</dd></div>
      <div><dt>Supporting copy</dt><dd>${escapeHtml(copy)}</dd></div>
    </dl>
    <p class="source-path">Text source: <code>public/course/practice-data.js → practiceByLesson["${escapeHtml(lesson.id)}"].copy</code></p>
  </aside>`;
}

function renderVisualLab(lesson, code) {
  return `
    <div class="exercise-brief">
      <span>Your task</span>
      <strong>${escapeHtml(actionPrompt(lesson))}</strong>
      <p>Why: ${escapeHtml(lesson.lab?.intro || lesson.concept)}</p>
    </div>
    ${renderControls(lesson, code)}
    ${renderFrameSource(lesson)}
    <div class="lab-grid">
      <div class="code-panel">
        <div class="panel-bar"><span>Decision source · ${escapeHtml(lesson.lab?.filename || "frame.css")}</span><div class="panel-tools"><span>course simulator</span><button class="reset-default" data-action="reset-code" aria-label="Reset code to lesson default">${resetIcon()}<span>Reset default</span></button><button class="icon-button" data-copy-target="#code-editor" aria-label="Copy editable code">${copyIcon()}</button><button class="icon-button" data-dictate-target="#code-editor" aria-label="Dictate into editable code" aria-pressed="false">${microphoneIcon()}</button></div></div>
        <textarea class="code-editor" id="code-editor" spellcheck="false" aria-label="${escapeHtml(lesson.lab?.ariaLabel || "Editable frame variables")}">${escapeHtml(code)}</textarea>
      </div>
      <div class="preview-panel">
        <div class="panel-bar"><span>Course preview · uses the text above</span><span class="panel-status" id="panel-status" aria-live="polite">ready</span></div>
        <div class="preview-wrap">${renderPreview(lesson)}</div>
      </div>
    </div>
    <div class="run-row">
      <button class="run-button" data-action="run">▶&nbsp;&nbsp;2. Apply to course preview</button>
      <span class="shortcut">⌘/Ctrl + Enter</span>
      <p><strong>3. Inspect:</strong> ${escapeHtml(actionPrompt(lesson))}</p>
    </div>
    <p class="parse-warning" id="parse-warning" aria-live="assertive"></p>`;
}

function renderProofLab(lesson, code) {
  const savedChecks = state.checks[lesson.id] || [];
  const checks = lesson.takeaways || [];
  return `
    <div class="exercise-brief proof-brief">
      <span>Your task</span>
      <strong>${escapeHtml(lesson.exercise || lesson.objective)}</strong>
      <p>Do this in your local HyperFrames project. Hypercourse cannot inspect your machine, so only record a gate after you have real evidence.</p>
    </div>
    <div class="proof-origin">
      <strong>No simulated result.</strong>
      <span>This lesson uses a self-reported evidence checklist because a decorative slider cannot prove local work.</span>
    </div>
    <div class="proof-grid">
      <fieldset class="proof-checklist">
        <legend>Evidence gates</legend>
        ${checks.map((check, index) => `<label><input type="checkbox" data-proof-check="${index}" ${savedChecks.includes(index) ? "checked" : ""} /><span><b>${index + 1}</b>${escapeHtml(check)}</span></label>`).join("")}
      </fieldset>
      <div class="code-panel proof-code-panel">
        <div class="panel-bar"><span>Local commands · visible lesson source</span><div class="panel-tools"><span>copy to your project</span><button class="reset-default" data-action="reset-code" aria-label="Reset code to lesson default">${resetIcon()}<span>Reset default</span></button><button class="icon-button" data-copy-target="#code-editor" aria-label="Copy reference commands">${copyIcon()}</button><button class="icon-button" data-dictate-target="#code-editor" aria-label="Dictate into reference commands" aria-pressed="false">${microphoneIcon()}</button></div></div>
        <textarea class="code-editor proof-code" id="code-editor" spellcheck="false" aria-label="Editable local reference commands">${escapeHtml(code)}</textarea>
        <p class="code-caveat">Visible source only. Hypercourse does not execute these commands.</p>
      </div>
    </div>
    <div class="proof-summary" id="proof-summary" aria-live="polite">
      <strong>${savedChecks.length}/${checks.length} gates recorded</strong>
      <span>Completion bar: ${escapeHtml(lesson.objective)}</span>
    </div>
    <p class="source-path">Lesson source: <code>public/course/course-data.js → ${escapeHtml(lesson.id)}</code></p>`;
}

function renderDrawer() {
  return `<div class="drawer-backdrop ${drawerOpen ? "is-open" : ""}" data-drawer-backdrop>
    <aside class="drawer" id="contents-drawer" role="dialog" aria-modal="true" aria-labelledby="contents-title">
      <div class="drawer-head"><h2 id="contents-title">Contents</h2><button class="close-button" data-action="close-contents" aria-label="Close contents">×</button></div>
      ${modules.map((module) => {
        const complete = module.lessons.filter((l) => state.complete.includes(l.id)).length;
        return `<section class="module-group">
          <div class="module-summary"><span class="module-number">${module.number}</span><h3 class="module-title">${escapeHtml(module.title)}</h3><span class="module-progress">${complete}/${module.lessons.length}</span></div>
          <ol class="lesson-list">${module.lessons.map((lesson) => `<li><button data-lesson="${lesson.id}" class="${lesson.id === state.current ? "is-current" : ""}"><span class="lesson-check">${state.complete.includes(lesson.id) ? "✓" : "○"}</span><span>${lesson.number} ${escapeHtml(lesson.title)}</span></button></li>`).join("")}</ol>
        </section>`;
      }).join("")}
    </aside>
  </div>`;
}

function renderLesson() {
  stopDictation();
  screen = "lesson";
  document.body.dataset.screen = "lesson";
  const lesson = currentLesson();
  const index = lessonIndex();
  const savedCode = state.code[lesson.id];
  const obsoleteProofSimulation = PROOF_LESSONS.has(lesson.id) && savedCode && /One decision\. One visible consequence|^\s*:root\s*\{/m.test(savedCode);
  const code = obsoleteProofSimulation ? starterCode(lesson) : (savedCode || starterCode(lesson));
  const note = state.notes[lesson.id] || "";
  const selectedQuiz = state.quiz[lesson.id];
  const isComplete = state.complete.includes(lesson.id);

  app.innerHTML = `${renderCreatorBar()}${renderTopbar(lesson)}
    <main class="notebook" id="lesson-main">
      <section class="cell idea-cell">
        <div class="cell-index">01 <span class="cell-kind">Idea</span></div>
        <div class="cell-body">
          <p class="lesson-path">Notebook ${lesson.moduleNumber} / ${escapeHtml(lesson.moduleTitle)} / ${lesson.duration}</p>
          <h1>${escapeHtml(lesson.title)}</h1>
          <p class="idea-copy">${escapeHtml(lesson.concept)}</p>
          <p class="objective-line">By the end of this frame: ${escapeHtml(lesson.objective)}</p>
          ${lesson.sourceUrl ? `<p class="source-line">${escapeHtml(lesson.sourceLabel || `Based on HeyGen’s published Day ${lesson.releaseDay} lesson`)} · <a href="${lesson.sourceUrl}" target="_blank" rel="noreferrer">Read the source ↗</a></p>` : ""}
        </div>
      </section>

      <section class="cell do-cell">
        <div class="cell-index">02 <span class="cell-kind">Do</span></div>
        <div class="cell-body">
          <div class="do-header"><h2 class="do-title">${escapeHtml(lesson.lab?.title || "Change the frame")}</h2><p class="do-help">${PROOF_LESSONS.has(lesson.id) ? "Complete real gates in your local project and record the evidence." : "Change one decision, apply it, and inspect the named consequence."}</p></div>
          ${PROOF_LESSONS.has(lesson.id) ? renderProofLab(lesson, code) : renderVisualLab(lesson, code)}
        </div>
      </section>

      <section class="cell instruction-cell">
        <div class="cell-index">03 <span class="cell-kind">Notice</span></div>
        <div class="cell-body">
          <h2 class="instruction">${escapeHtml(PROOF_LESSONS.has(lesson.id) ? `Proof required: ${lesson.objective}` : actionPrompt(lesson))}</h2>
          <p class="deliverable">Make: ${escapeHtml(lesson.deliverable)}</p>
          ${PROOF_LESSONS.has(lesson.id) ? "" : `<details class="reference-details"><summary>Show the production pattern after you try</summary><div class="reference-code-wrap"><pre class="reference-code"><code id="reference-code">${escapeHtml(lesson.code)}</code></pre><button class="icon-button on-dark reference-copy" data-copy-target="#reference-code" aria-label="Copy production pattern">${copyIcon()}</button></div></details>`}
        </div>
      </section>

      <section class="cell reflect-cell">
        <div class="cell-index">04 <span class="cell-kind">Reflect</span></div>
        <div class="cell-body">
          <h2 class="instruction">${PROOF_LESSONS.has(lesson.id) ? "What evidence did you produce, and where is it saved?" : "What did this decision change, and which version would you keep?"}</h2>
          <div class="input-shell">
            <textarea class="reflection" id="reflection" maxlength="500" placeholder="Write or dictate one observation…">${escapeHtml(note)}</textarea>
            <button class="icon-button input-microphone" data-dictate-target="#reflection" aria-label="Dictate reflection" aria-pressed="false">${microphoneIcon()}</button>
          </div>
          <p class="save-note">Saved on this device only.</p>
        </div>
      </section>

      <section class="cell check-cell">
        <div class="cell-index">05 <span class="cell-kind">Check</span></div>
        <div class="cell-body">
          <h2 class="instruction">${escapeHtml(lesson.quiz.question)}</h2>
          <form class="quiz-form" id="quiz-form">${lesson.quiz.options.map((option, optionIndex) => `<label class="quiz-option"><input type="radio" name="quiz" value="${optionIndex}" ${Number(selectedQuiz) === optionIndex ? "checked" : ""} /><span>${escapeHtml(option)}</span></label>`).join("")}</form>
          <p class="quiz-result" id="quiz-result">${selectedQuiz === undefined ? "" : Number(selectedQuiz) === lesson.quiz.answer ? "Correct. The idea is ready to carry forward." : "Not yet. Re-read the idea and inspect what the frame is asking the eye to do."}</p>
        </div>
      </section>

      <nav class="lesson-nav" aria-label="Lesson navigation">
        <button class="nav-button" data-action="previous" ${index === 0 ? "disabled" : ""}>← Previous</button>
        <button class="complete-button ${isComplete ? "is-complete" : ""}" data-action="complete">${isComplete ? "✓ Complete" : "Mark done"}</button>
        <button class="nav-button next" data-action="next" ${index === allLessons.length - 1 ? "disabled" : ""}>Next →</button>
      </nav>
    </main>
    ${renderSiteFooter()}
    ${renderDrawer()}`;

  bindEvents();
  if (!PROOF_LESSONS.has(lesson.id)) applyVariables(false);
}

function parseVariables(text, lesson = currentLesson()) {
  const get = (name, fallback) => {
    const match = text.match(new RegExp(`--${name}\\s*:\\s*([^;]+);`, "i"));
    return match ? match[1].trim() : fallback;
  };
  const values = { headline: 1, subject: 1, energy: .45, density: .5, accent: "#ef4e2f" };

  for (const control of controlSpec(lesson)) {
    const fallback = control.value ?? values[control.key];
    const raw = get(control.variable, fallback);
    if (control.type === "color") {
      if (!/^#[0-9a-f]{6}$/i.test(raw)) throw new Error(`Use a six-digit hex value for --${control.variable}.`);
      values[control.key] = raw;
      continue;
    }
    const parsed = Number.parseFloat(raw);
    if (!Number.isFinite(parsed)) throw new Error(`Use a number for --${control.variable}.`);
    values[control.key] = Math.min(control.max, Math.max(control.min, parsed));
  }

  return values;
}

function updateEditorVariable(variable, value) {
  const editor = document.querySelector("#code-editor");
  if (!editor) return;
  const pattern = new RegExp(`(--${variable}\\s*:\\s*)([^;]+)(;)`, "i");
  editor.value = editor.value.replace(pattern, `$1${value}$3`);
  state.code[state.current] = editor.value;
  saveState();
  const status = document.querySelector("#panel-status");
  if (status) {
    status.textContent = "change pending";
    status.classList.add("is-pending");
  }
}

function syncControls(vars, lesson = currentLesson()) {
  for (const spec of controlSpec(lesson)) {
    const value = vars[spec.key];
    const control = document.querySelector(`[data-variable="${spec.variable}"]`);
    const output = document.querySelector(`[data-output="${spec.variable}"]`);
    if (control) control.value = value;
    if (output) output.value = spec.type === "color" ? value : Number(value).toFixed(2);
  }
}

function applyVariables(animate = true) {
  const editor = document.querySelector("#code-editor");
  const frame = document.querySelector("#preview-frame");
  const warning = document.querySelector("#parse-warning");
  if (!editor || !frame) return;
  try {
    const vars = parseVariables(editor.value, currentLesson());
    frame.style.setProperty("--headline-scale", vars.headline);
    frame.style.setProperty("--subject-scale", vars.subject);
    frame.style.setProperty("--energy", vars.energy);
    frame.style.setProperty("--density", vars.density);
    frame.style.setProperty("--accent-local", vars.accent);
    for (const control of controlSpec(currentLesson())) {
      frame.style.setProperty(`--decision-${control.variable}`, vars[control.key]);
    }
    syncControls(vars, currentLesson());
    warning.textContent = "";
    state.code[state.current] = editor.value;
    saveState();
    if (animate) {
      frame.classList.remove("is-running");
      requestAnimationFrame(() => frame.classList.add("is-running"));
      const status = document.querySelector("#panel-status");
      if (status) {
        status.textContent = "rendered locally";
        status.classList.remove("is-pending");
        window.setTimeout(() => { status.textContent = "ready"; }, 1000);
      }
    }
  } catch (error) {
    warning.textContent = error.message;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1500);
}

async function copyFromButton(button) {
  const target = document.querySelector(button.dataset.copyTarget);
  const text = target?.value ?? target?.textContent ?? "";
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  showToast("Copied to clipboard");
}

let activeDictation = null;

function stopDictation() {
  activeDictation?.recognition.stop();
}

function startDictation(button) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Dictation is not supported in this browser");
    return;
  }
  if (activeDictation?.button === button) {
    stopDictation();
    return;
  }
  stopDictation();

  const target = document.querySelector(button.dataset.dictateTarget);
  if (!target) return;
  const recognition = new SpeechRecognition();
  const start = target.selectionStart ?? target.value.length;
  const end = target.selectionEnd ?? start;
  const before = target.value.slice(0, start);
  const after = target.value.slice(end);
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = document.documentElement.lang || "en-US";

  activeDictation = { button, recognition };
  button.classList.add("is-listening");
  button.setAttribute("aria-pressed", "true");
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results).map((result) => result[0].transcript).join("");
    const spacer = before && !/\s$/.test(before) ? " " : "";
    target.value = `${before}${spacer}${transcript}${after}`;
    target.dispatchEvent(new Event("input", { bubbles: true }));
  };
  recognition.onerror = (event) => {
    if (!["aborted", "no-speech"].includes(event.error)) showToast(`Dictation stopped: ${event.error}`);
  };
  recognition.onend = () => {
    button.classList.remove("is-listening");
    button.setAttribute("aria-pressed", "false");
    if (activeDictation?.recognition === recognition) activeDictation = null;
  };
  recognition.start();
  showToast("Listening…");
}

function navigate(delta) {
  const nextIndex = lessonIndex() + delta;
  if (nextIndex < 0 || nextIndex >= allLessons.length) return;
  state.current = allLessons[nextIndex].id;
  saveState();
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderLesson();
}

function renderCurrent() {
  if (screen === "home") renderLanding();
  else renderLesson();
}

function bindEvents() {
  app.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = event.currentTarget.dataset.action;
      if (action === "home") {
        screen = "home";
        drawerOpen = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
        renderLanding();
      }
      if (action === "start") {
        state.current = allLessons[0].id;
        screen = "lesson";
        saveState();
        window.scrollTo({ top: 0, behavior: "smooth" });
        renderLesson();
      }
      if (action === "continue") {
        screen = "lesson";
        window.scrollTo({ top: 0, behavior: "smooth" });
        renderLesson();
      }
      if (action === "scroll-workflows") {
        document.querySelector("#workflows")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (action === "run") applyVariables(true);
      if (action === "reset-code") {
        state.code[state.current] = starterCode(currentLesson());
        saveState();
        renderLesson();
        showToast("Cell reset");
      }
      if (action === "open-contents") { drawerOpen = true; renderCurrent(); document.querySelector(".close-button")?.focus(); }
      if (action === "close-contents") { drawerOpen = false; renderCurrent(); }
      if (action === "previous") navigate(-1);
      if (action === "next") navigate(1);
      if (action === "complete") {
        const id = state.current;
        state.complete = state.complete.includes(id) ? state.complete.filter((item) => item !== id) : [...state.complete, id];
        saveState();
        renderLesson();
        showToast(state.complete.includes(id) ? "Lesson complete" : "Lesson reopened");
      }
    });
  });

  app.querySelectorAll("[data-lesson]").forEach((button) => button.addEventListener("click", () => {
    state.current = button.dataset.lesson;
    screen = "lesson";
    drawerOpen = false;
    saveState();
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderLesson();
  }));

  app.querySelectorAll("[data-start-lesson]").forEach((button) => button.addEventListener("click", () => {
    state.current = button.dataset.startLesson;
    screen = "lesson";
    saveState();
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderLesson();
  }));

  app.querySelectorAll("[data-variable]").forEach((control) => control.addEventListener("input", (event) => {
    const variable = event.currentTarget.dataset.variable;
    const value = event.currentTarget.type === "color" ? event.currentTarget.value : Number(event.currentTarget.value).toFixed(2);
    updateEditorVariable(variable, value);
  }));

  app.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", () => copyFromButton(button));
  });

  app.querySelectorAll("[data-dictate-target]").forEach((button) => {
    button.addEventListener("click", () => startDictation(button));
  });

  document.querySelector("#code-editor")?.addEventListener("input", (event) => {
    state.code[state.current] = event.target.value;
    saveState();
    const status = document.querySelector("#panel-status");
    if (status) {
      status.textContent = "change pending";
      status.classList.add("is-pending");
    }
  });

  app.querySelectorAll("[data-proof-check]").forEach((checkbox) => checkbox.addEventListener("change", () => {
    const checks = [...app.querySelectorAll("[data-proof-check]:checked")].map((input) => Number(input.dataset.proofCheck));
    state.checks[state.current] = checks;
    saveState();
    const summary = document.querySelector("#proof-summary");
    const total = currentLesson().takeaways?.length || 0;
    if (summary) {
      summary.querySelector("strong").textContent = `${checks.length}/${total} gates recorded`;
      summary.classList.toggle("is-complete", checks.length === total);
    }
  }));

  document.querySelector("[data-drawer-backdrop]")?.addEventListener("click", (event) => {
    if (event.target.matches("[data-drawer-backdrop]")) { drawerOpen = false; renderCurrent(); }
  });

  document.querySelector("#reflection")?.addEventListener("input", (event) => {
    state.notes[state.current] = event.target.value;
    saveState();
  });

  document.querySelector("#quiz-form")?.addEventListener("change", (event) => {
    state.quiz[state.current] = Number(event.target.value);
    saveState();
    const result = document.querySelector("#quiz-result");
    const correct = Number(event.target.value) === currentLesson().quiz.answer;
    result.textContent = correct ? "Correct. The idea is ready to carry forward." : "Not yet. Re-read the idea and inspect what the frame is asking the eye to do.";
    result.className = `quiz-result ${correct ? "correct" : "incorrect"}`;
  });
}

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && !PROOF_LESSONS.has(currentLesson().id)) { event.preventDefault(); applyVariables(true); }
  if ((event.metaKey || event.ctrlKey) && event.key === "]") { event.preventDefault(); navigate(1); }
  if (event.key === "Escape" && drawerOpen) { drawerOpen = false; renderCurrent(); }
});

renderLanding();
