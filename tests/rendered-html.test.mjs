import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://hypercourse.example/", {
      headers: { accept: "text/html", "x-forwarded-proto": "https" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Hypercourse shell and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Hypercourse — Make videos with rhythm, depth, and intent<\/title>/i);
  assert.match(html, /zero to professional HyperFrames fluency through 50 hands-on local lessons/i);
  assert.match(html, /href="\/assets\/[^"]+\.css"/i);
  assert.match(html, /id="app"/i);
  assert.match(html, /id="toast"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("packages the interactive course and social card", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /hypercourse-app-script/);
  assert.match(page, /\/course\/app\.js/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /\$\{canonical\}\/og\.png/);
  assert.match(layout, /icons: \{ icon: "\/favicon\.svg" \}/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await Promise.all([
    access(new URL("../public/course/app.js", import.meta.url)),
    access(new URL("../public/course/course-data.js", import.meta.url)),
    access(new URL("../public/course/practice-data.js", import.meta.url)),
    access(new URL("../public/course/styles.css", import.meta.url)),
    access(new URL("../public/hero-sculpture.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.svg", import.meta.url)),
    access(new URL("../COURSE-QUALITY.md", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("keeps Hypercourse naming consistent and migrates existing progress", async () => {
  const [page, courseApp, courseData, standaloneHtml, rootReadme, courseReadme, design, starterReadme] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../public/course/app.js", import.meta.url), "utf8"),
      readFile(new URL("../public/course/course-data.js", import.meta.url), "utf8"),
      readFile(new URL("../public/course/index.html", import.meta.url), "utf8"),
      readFile(new URL("../README.md", import.meta.url), "utf8"),
      readFile(new URL("../public/course/README.md", import.meta.url), "utf8"),
      readFile(new URL("../public/course/DESIGN.md", import.meta.url), "utf8"),
      readFile(new URL("../public/course/starter-pack/README.md", import.meta.url), "utf8"),
    ]);

  assert.match(page, /Skip to course content/);
  assert.match(courseApp, /data-action="home">Hypercourse</);
  assert.doesNotMatch(courseApp, /data-action="home">Framecraft</);
  assert.match(courseApp, /const STORAGE_KEY = "hypercourse-course-v1"/);
  assert.match(courseApp, /const LEGACY_STORAGE_KEY = "framecraft-course-v1"/);
  assert.match(courseData, /title:"HyperFrames release track"/);
  assert.doesNotMatch(courseData, /title:"30 Days release track"/);
  assert.match(standaloneHtml, /<title>Hypercourse — Make videos with rhythm, depth, and intent<\/title>/);
  assert.doesNotMatch(
    [rootReadme, courseReadme, design, starterReadme].join("\n"),
    /\bFramecraft\b/,
  );
  assert.doesNotMatch(
    [page, courseApp, courseData, standaloneHtml, rootReadme, courseReadme, design, starterReadme].join("\n"),
    /\bHYPERCOURSE\b/,
  );
  assert.match(rootReadme, /50 focused notebook lessons/);
});

test("includes a complete design.md and frame.md learning section", async () => {
  const courseDataUrl = new URL("../public/course/course-data.js", import.meta.url);
  courseDataUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { modules, allLessons } = await import(courseDataUrl.href);
  const designModule = modules.find((module) => module.id === "design-for-frame");

  assert.ok(designModule);
  assert.equal(designModule.number, "02");
  assert.deepEqual(
    designModule.lessons.map(({ id, number }) => [id, number]),
    [
      ["visual-identity", "2.1"],
      ["frame-translation", "2.2"],
      ["frame-presets", "2.3"],
      ["design-adherence", "2.4"],
    ],
  );
  assert.equal(allLessons.length, 50);
  assert.match(
    designModule.lessons.map(({ concept }) => concept).join("\n"),
    /frame\.md, then design\.md, then DESIGN\.md/,
  );
  assert.ok(
    designModule.lessons.every(
      ({ sourceUrl }) => sourceUrl === "https://www.hyperframes.dev/design",
    ),
  );

  await Promise.all([
    access(new URL("../public/course/starter-pack/design.template.md", import.meta.url)),
    access(new URL("../public/course/starter-pack/frame.template.md", import.meta.url)),
  ]);
});

test("links official, watchable HyperFrames projects to remix", async () => {
  const [courseApp, courseData] = await Promise.all([
    readFile(new URL("../public/course/app.js", import.meta.url), "utf8"),
    import(`${new URL("../public/course/course-data.js", import.meta.url).href}?examples=${Date.now()}`),
  ]);

  assert.equal(courseData.officialExamples.length, 6);
  assert.ok(
    courseData.officialExamples.every(
      ({ watchUrl, sourceUrl }) =>
        watchUrl.startsWith("https://hyperframes.dev/viewer/") &&
        sourceUrl.startsWith("https://github.com/heygen-com/"),
    ),
  );
  assert.match(courseApp, /Watch\. Inspect\. Remix\./);
  assert.match(courseApp, /Finished HeyGen videos paired with source you can run locally\./);
  assert.match(courseApp, /Browse all official launch projects/);
  assert.match(courseApp, /git clone https:\/\/github\.com\/heygen-com\/hyperframes-launches\.git/);
});

test("teaches the current reusable composition system and CLI gate", async () => {
  const courseDataUrl = new URL("../public/course/course-data.js", import.meta.url);
  courseDataUrl.searchParams.set("systems", `${process.pid}-${Date.now()}`);
  const { modules } = await import(courseDataUrl.href);
  const systems = modules.find((module) => module.id === "composition-systems");
  const finish = modules.find((module) => module.id === "finish");
  const release = modules.find((module) => module.id === "daily-series");
  const deterministicQa = finish.lessons.find((lesson) => lesson.id === "deterministic-qa");

  assert.deepEqual(
    systems.lessons.map(({ id, number }) => [id, number]),
    [
      ["timeline-contract", "9.1"],
      ["sub-composition-contract", "9.2"],
      ["registry-reuse", "9.3"],
      ["variable-templates", "9.4"],
    ],
  );
  assert.equal(finish.number, "10");
  assert.equal(release.number, "11");
  assert.match(deterministicQa.code, /hyperframes check --snapshots --samples 15/);
  assert.doesNotMatch(deterministicQa.code, /hyperframes (?:validate|inspect)/);
});

test("gives every lesson a concept-specific experiment", async () => {
  const courseDataUrl = new URL("../public/course/course-data.js", import.meta.url);
  courseDataUrl.searchParams.set("practice", `${process.pid}-${Date.now()}`);
  const { allLessons } = await import(courseDataUrl.href);

  assert.equal(allLessons.length, 50);
  assert.equal(new Set(allLessons.map(({ id }) => id)).size, 50);
  assert.ok(allLessons.every(({ objective, concept, exercise, deliverable, code, quiz }) =>
    objective && concept && exercise && deliverable && code && quiz?.question,
  ));
  assert.ok(allLessons.every(({ controls }) => controls.length >= 1 && controls.length <= 2));
  assert.ok(allLessons.every(({ lab, actionPrompt, previewCopy }) =>
    lab?.code.includes("One decision. One visible consequence.") &&
    actionPrompt &&
    previewCopy?.length === 3,
  ));
  assert.ok(new Set(allLessons.map(({ preview }) => preview)).size >= 18);

  const byId = Object.fromEntries(allLessons.map((lesson) => [lesson.id, lesson]));
  assert.equal(byId["timeline-contract"].controls[0].label, "Temporal separation");
  assert.equal(byId["social-captions"].controls[0].label, "Words per group");
  assert.match(byId["daily-install"].code, /hyperframes skills update/);
  assert.match(byId["daily-prompt-anatomy"].code, /BRIEF\.md/);
  assert.match(byId["daily-keyframes"].code, /hyperframes keyframes/);
  assert.match(byId["daily-asset-libraries"].concept, /media-use/);
});

test("starts at zero and closes the first complete local loop", async () => {
  const courseDataUrl = new URL("../public/course/course-data.js", import.meta.url);
  courseDataUrl.searchParams.set("start", `${process.pid}-${Date.now()}`);
  const { modules, allLessons } = await import(courseDataUrl.href);
  const start = modules[0];

  assert.equal(start.id, "getting-started");
  assert.equal(start.number, "00");
  assert.deepEqual(
    start.lessons.map(({ id }) => id),
    ["zero-install", "zero-project-map", "zero-first-render"],
  );
  assert.equal(allLessons[0].id, "zero-install");
  assert.match(start.lessons[0].code, /hyperframes doctor/);
  assert.match(start.lessons[1].code, /BRIEF\.md/);
  assert.match(start.lessons[2].code, /check --snapshots/);
  assert.match(start.lessons[2].code, /ffprobe/);
});

test("keeps responsive typography bounded and reflow-safe", async () => {
  const [courseApp, styles, design] = await Promise.all([
    readFile(new URL("../public/course/app.js", import.meta.url), "utf8"),
    readFile(new URL("../public/course/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../public/course/DESIGN.md", import.meta.url), "utf8"),
  ]);

  assert.match(courseApp, /<h1 class="landing-title">Make videos with rhythm, depth, and intent\.<\/h1>/);
  assert.match(styles, /--type-hero:\s*clamp\([^;]*rem[^;]*vw[^;]*rem\)/);
  assert.match(styles, /\.landing-title\s*\{[^}]*font-size:clamp\(4rem,[^}]*7rem/s);
  assert.match(styles, /\.landing-copy\s*\{[^}]*width:100%/s);
  assert.match(styles, /--type-ui:\s*clamp\(\.9375rem/);
  assert.match(styles, /--type-meta:\s*\.875rem/);
  assert.match(styles, /\.preview-kicker\s*\{[^}]*font-size:\s*clamp\(14px/s);
  assert.match(styles, /\.preview-copy\s*\{[^}]*font-size:\s*clamp\(14px/s);
  assert.match(styles, /\.preview-wrap\s*\{[^}]*container-type:\s*inline-size/s);
  assert.match(styles, /\.preview-headline\s*\{[^}]*cqw/s);
  assert.match(styles, /\.brand-button\s*\{[^}]*min-height:\s*40px/s);
  assert.match(styles, /\.landing-wordmark\s*\{[^}]*min-height:\s*44px/s);
  assert.doesNotMatch(styles, /\.landing-wordmark\s*\{[^}]*text-transform:\s*uppercase/s);
  assert.doesNotMatch(styles, /\.format-action\s*\{[^}]*font-size:\s*0/s);
  assert.doesNotMatch(styles, /(?:progress-compact|local-state|contents-button|cell-index|lesson-path|objective-line|do-help|control-item|panel-bar|code-editor|run-button|shortcut|deliverable|save-note|module-number|module-progress|lesson-list button)[^{]*\{[^}]*font-size:\s*(?:[0-9]|1[0-3])px/s);
  assert.doesNotMatch(styles, /\.landing-title\s*\{[^}]*13\.6vw/s);
  assert.doesNotMatch(styles, /body\s*\{[^}]*min-width:\s*320px/s);
  assert.match(design, /At 320 CSS pixels/);
  assert.match(design, /At 200% text size/);
  assert.match(design, /always `Hypercourse` in title case/);
  assert.match(design, /Supporting metadata uses 14px/);
});

test("adds clear provenance, reusable copy controls, and dictation affordances", async () => {
  const [courseApp, styles] = await Promise.all([
    readFile(new URL("../public/course/app.js", import.meta.url), "utf8"),
    readFile(new URL("../public/course/styles.css", import.meta.url), "utf8"),
  ]);

  assert.match(courseApp, /Independent learning project · Not affiliated with or endorsed by HeyGen/);
  assert.match(courseApp, /Created by Daniel Green/);
  assert.match(courseApp, /https:\/\/x\.com\/dgrreen/);
  assert.match(courseApp, /https:\/\/www\.linkedin\.com\/in\/danielpgreen/);
  assert.match(courseApp, /const COURSE_UPDATED = "July 23, 2026"/);
  assert.match(courseApp, /Last updated <time datetime="2026-07-23">\$\{COURSE_UPDATED\}<\/time>/);
  assert.equal((courseApp.match(/data-copy-target=/g) ?? []).length, 3);
  assert.equal((courseApp.match(/data-dictate-target=/g) ?? []).length, 2);
  assert.match(courseApp, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
  assert.match(courseApp, /Reset default/);
  assert.match(courseApp, /data-action="reset-code"/);
  assert.match(styles, /\.reset-default\s*\{[^}]*min-height:40px/s);
  assert.match(styles, /\.remix-card\s*\{[^}]*background:#fffdf8/s);
  assert.match(styles, /\.landing-wordmark\s*\{[^}]*font-size:22px/s);
  assert.match(styles, /\.landing-nav-actions\s*\{[^}]*font-size:16px/s);
  assert.match(styles, /\.icon-button\s*\{[^}]*width:40px[^}]*height:40px/s);
});
