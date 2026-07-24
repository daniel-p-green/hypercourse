import { practiceByLesson } from "./practice-data.js";

function releaseLesson({ day, id, title, objective, concept, deliverable, code, preview, source, steps }) {
  return {
    id,
    releaseDay: day,
    number: `Day ${day}`,
    title,
    duration: "15–25 min",
    objective,
    coach: "Use the published workflow as a starting point, then make one visible decision yourself.",
    concept,
    takeaways: steps ?? [
      "Run the workflow on a sanitized local project.",
      "Change one meaningful creative decision.",
      "Inspect the result at the moment it must read.",
      "Record what improved and what still needs judgment.",
    ],
    exercise: objective,
    deliverable,
    code,
    quiz: {
      question: "What turns this from a demo into a useful course exercise?",
      options: ["Watching the generated result", "Making and explaining one visible decision", "Using every available effect"],
      answer: 1,
    },
    preview,
    beats: ["Brief", "Run", "Change", "Inspect", "Explain"],
    sourceUrl: `https://x.com/HeyGen/status/${source}`,
  };
}

export const modules = [
  {
    id: "getting-started",
    number: "00",
    title: "Start here",
    short: "Go from an empty folder to a verified local video loop.",
    color: "#ef4e2f",
    lessons: [
      {
        id: "zero-install",
        number: "0.1",
        title: "Install and verify HyperFrames",
        duration: "15 min",
        objective: "Open a working local HyperFrames project and prove that its preview loads.",
        coach: "Setup is complete when the real project opens, not when an install command exits.",
        concept: "HyperFrames runs locally through its CLI and browser-based Studio. Check the environment, scaffold a blank project, validate it, then open the exact preview URL the CLI returns.",
        takeaways: ["Confirm Node.js 22 or newer and FFmpeg are available.", "Run the environment check and resolve every failure.", "Create a blank local project.", "Run lint and inspect inside the project.", "Use the CLI’s exact Studio project URL."],
        exercise: "Install HyperFrames in your working agent environment, create a blank project, and open its first composition in Studio.",
        deliverable: "A local project folder plus a browser preview you can reopen.",
        code: `node --version\nffmpeg -version\nnpx hyperframes doctor\nnpx hyperframes init hypercourse-first-frame --non-interactive --example blank\ncd hypercourse-first-frame\nnpx hyperframes lint\nnpx hyperframes inspect\nnpx hyperframes preview`,
        quiz: { question: "What proves the setup is actually complete?", options: ["The package downloaded", "The real project preview opens", "A command was copied"], answer: 1 },
        preview: "workflow",
        beats: ["Check", "Create", "Validate", "Open", "Verify"],
        sourceUrl: "https://github.com/heygen-com/hyperframes",
        sourceLabel: "Official HyperFrames repository",
      },
      {
        id: "zero-project-map",
        number: "0.2",
        title: "Know what every project file does",
        duration: "18 min",
        objective: "Read a HyperFrames project without treating it as an undifferentiated code folder.",
        coach: "When intent, design, composition, media, and proof have clear homes, revision becomes much safer.",
        concept: "BRIEF.md defines the job and completion bar. design.md holds brand truth. frame.md translates that system for video. The HTML composition owns the visible frame, local assets supply media, and QA plus renders preserve proof and output.",
        takeaways: ["Start with BRIEF.md.", "Keep design truth separate from frame translation.", "Treat assets as sourced inputs.", "Separate QA evidence from final renders."],
        exercise: "Label the role of each file in a starter project and trace one visual decision from brief to rendered frame.",
        deliverable: "A one-page project map you can use when a generated folder becomes confusing.",
        code: `project/\n├── BRIEF.md          # job, audience, source, completion bar\n├── design.md         # brand truth\n├── frame.md          # video-specific design contract\n├── index.html        # composition\n├── compositions/     # reusable scenes\n├── assets/           # approved local media\n├── qa/               # checks and review evidence\n└── renders/          # output files`,
        quiz: { question: "Where should the project’s completion bar live?", options: ["BRIEF.md", "A random code comment", "The renders folder"], answer: 0 },
        preview: "workflow",
        beats: ["Intent", "Design", "Frame", "Proof", "Output"],
        sourceUrl: "https://www.hyperframes.dev/design",
        sourceLabel: "Official HyperFrames design guide",
      },
      {
        id: "zero-first-render",
        number: "0.3",
        title: "Complete the first local feedback loop",
        duration: "25 min",
        objective: "Move one tiny composition from brief to watched render without skipping approval.",
        coach: "The point is not cinematic ambition. It is learning the complete loop while the project is still small.",
        concept: "Write a six-line brief, compose one strong still, run lint and check, inspect the browser preview, render only after the frame is approved, then watch the output file. Each gate answers a different question.",
        takeaways: ["Keep the first video to one claim.", "Approve the still before motion.", "Use check for technical proof.", "Watch the final file before calling it done."],
        exercise: "Create a five-second title reveal from a sanitized brief and carry it through the complete local loop.",
        deliverable: "A five-second MP4, its source project, and a short QA ledger.",
        code: `npx hyperframes lint\nnpx hyperframes check --snapshots\nnpx hyperframes preview\n# Approve the frame in the browser, then:\nnpx hyperframes render --quality high --output renders/first-loop.mp4\nffprobe renders/first-loop.mp4`,
        quiz: { question: "When should you render the first master?", options: ["Immediately after generation", "After the browser preview is creatively approved", "Before running check"], answer: 1 },
        preview: "qa",
        beats: ["Brief", "Compose", "Check", "Approve", "Watch"],
        sourceUrl: "https://github.com/heygen-com/hyperframes",
        sourceLabel: "Official HyperFrames repository",
      },
    ],
  },
  {
    id: "foundations",
    number: "01",
    title: "Foundations",
    short: "Stop designing slides. Start directing frames.",
    color: "#ff5a36",
    lessons: [
      {
        id: "composition-first",
        number: "1.1",
        title: "Composition before animation",
        duration: "18 min",
        objective: "Build the hero frame first, then animate toward it.",
        coach: "If the still frame is weak, motion only makes the weakness move.",
        concept: "A video scene is a composed image with time attached. Establish one dominant idea, a secondary destination for the eye, and enough depth that the frame feels inhabited before adding a single tween.",
        takeaways: [
          "Name the focal point in one sentence.",
          "Build the most-visible moment as static HTML and CSS.",
          "Use asymmetry, crop, scale, and overlap to create tension.",
          "Animate from hidden states into the finished composition.",
        ],
        exercise: "Compose a 16:9 launch frame for a fictional camera called Vela. Use one headline, one product crop, one accent rule, and three depth layers. Export a still before animating.",
        deliverable: "A 1920×1080 hero frame that reads at thumbnail size.",
        code: `.scene-content {\n  width: 100%; height: 100%;\n  display: grid;\n  grid-template-columns: 0.9fr 1.1fr;\n  align-items: center;\n  padding: 96px 120px;\n  box-sizing: border-box;\n}\n\n/* CSS is the finished frame. GSAP describes the journey. */\ntl.from(".headline", { x: -72, opacity: 0, duration: 0.7, ease: "expo.out" }, 0.2);`,
        quiz: { question: "When should you decide the final position of a scene element?", options: ["Inside its entrance tween", "In static CSS before animation", "After the first render"], answer: 1 },
        preview: "launch",
        beats: ["Establish", "Reveal", "Focus", "Message", "Resolve"],
      },
      {
        id: "powerpoint-detector",
        number: "1.2",
        title: "The PowerPoint detector",
        duration: "16 min",
        objective: "Recognize and repair slide-shaped video scenes.",
        coach: "A slide displays information. A frame directs attention through time.",
        concept: "The common failure is not ‘bad styling.’ It is equal hierarchy: centered headline, explanatory bullets, repeated cards, empty background, and no meaningful visual event. Repair structure before decoration.",
        takeaways: ["One scene should make one claim.", "Replace lists with sequence.", "Let scale and timing carry hierarchy.", "Use visuals as evidence, not wallpaper."],
        exercise: "Run a scene through the PowerPoint Test and repair every structural warning.",
        deliverable: "A before/after pair plus a one-paragraph rationale for the structural change.",
        code: `// Replace simultaneous bullet cards with a sequence.\ntl.from("#claim", { scale: 0.84, opacity: 0, duration: 0.55, ease: "back.out(1.2)" }, 0.2);\ntl.from("#evidence", { clipPath: "inset(0 100% 0 0)", duration: 0.8, ease: "power3.out" }, 0.55);`,
        quiz: { question: "What is the first repair for a scene with six equal cards?", options: ["Add shadows", "Animate the cards faster", "Choose one claim and sequence the evidence"], answer: 2 },
        preview: "powerpoint",
        beats: ["Diagnose", "Choose", "Sequence", "Evidence", "Review"],
      },
    ],
  },
  {
    id: "design-for-frame",
    number: "02",
    title: "Design for the frame",
    short: "Translate brand truth into a camera-ready composition system.",
    color: "#ff5a36",
    lessons: [
      {
        id: "visual-identity",
        number: "2.1",
        title: "Write brand truth in design.md",
        duration: "22 min",
        objective: "Turn taste into exact, machine-readable brand decisions.",
        coach: "Consistency comes from constraints an agent can quote exactly, not from asking every scene to feel on brand.",
        concept: "A design.md starts with normative YAML frontmatter for colors, typography, spacing, and components, then uses prose for intent and judgment. Exact tokens are source truth; descriptive sections explain when and why to use them.",
        takeaways: ["Assign every color a named role.", "Record exact font families and weights.", "Separate normative tokens from contextual prose.", "Write visible anti-patterns an agent can verify."],
        exercise: "Edit the sample design.md until the brand has one clear accent, a deliberate density, and three explicit avoids.",
        deliverable: "A lowercase design.md with exact tokens, contextual guidance, and a short avoidance list.",
        code: `---\ncolors:\n  canvas: "#f4f1ea"\n  ink: "#111112"\n  accent: "#ff5134"\ntypography:\n  display: "Helvetica Neue"\n  body: "Iowan Old Style"\nspacing:\n  base: 8\n---\n\n## Overview\nEditorial confidence with one warm accent.\n\n## Do not\n- Equal card grids\n- Unnamed colors\n- Generic gradient backgrounds`,
        quiz: { question: "Which part of a design.md is normative?", options: ["The YAML frontmatter", "The descriptive examples", "The file name alone"], answer: 0 },
        preview: "identity",
        previewCopy: ["design.md", "Brand truth, written down.", "Exact tokens first. Context and constraints second."],
        actionPrompt: "Change the accent and density. Which choice still feels like the same brand?",
        controls: [
          { variable: "accent", key: "accent", label: "Brand accent", type: "color" },
          { variable: "density", key: "density", label: "Surface density", min: 0, max: 1, step: .01 },
        ],
        lab: {
          syntax: "yaml",
          filename: "design.md",
          kind: "brand source",
          title: "Edit the brand truth",
          help: "Change the frontmatter, then run the frame.",
          intro: "Tune two normative values. The preview translates them immediately.",
          ariaLabel: "Editable design.md brand specification",
          code: `---\ncolors:\n  canvas: "#f4f1ea"\n  ink: "#111112"\n  accent: "#ff5134"\ntypography:\n  display: "Helvetica Neue"\n  body: "Iowan Old Style"\npreview:\n  headline-scale: 1.02\n  subject-scale: .94\n  energy: .32\n  density: .34\n---\n\n## Overview\nEditorial confidence with one warm accent.\n\n## Do not\n- Equal card grids\n- Unnamed colors\n- Generic gradient backgrounds`,
        },
        beats: ["Tokens", "Roles", "Context", "Avoids", "Verify"],
        sourceUrl: "https://www.hyperframes.dev/design",
        sourceLabel: "Official HyperFrames design guide",
      },
      {
        id: "frame-translation",
        number: "2.2",
        title: "Translate design.md into frame.md",
        duration: "24 min",
        objective: "Convert a general brand system into rules an agent can compose at 1920×1080.",
        coach: "The brand can stay the same while its scale, safe areas, hierarchy, and density change for the camera.",
        concept: "Lowercase frame.md is the video-first companion to design.md. It preserves brand atoms but rewrites them for the frame: canvas, type ramp, safe areas, crop behavior, hierarchy, and component scale. In HyperFrames projects it takes precedence over design.md and DESIGN.md.",
        takeaways: ["Keep the brand tokens exact.", "Specify the frame as the unit.", "Replace web chrome with camera-ready hierarchy.", "Save the adopted file as lowercase frame.md."],
        exercise: "Translate the sample brand into a 16:9 frame spec and make one element unmistakably dominant.",
        deliverable: "A lowercase frame.md with 1920×1080 geometry, safe areas, type scale, and composition rules.",
        code: `---\ncolors:\n  canvas: "#f4f1ea"\n  ink: "#111112"\n  accent: "#ff5134"\nframe:\n  width: 1920\n  height: 1080\n  safe_area: 96\n  headline_min: 96\n  headline_max: 184\n---\n\n## The frame\nOne dominant idea, one supporting destination, deliberate depth.\n\n## Composition rules\n- Crops may break the safe area; essential text may not.\n- Web navigation and equal cards do not transfer to video.`,
        quiz: { question: "What changes when design.md becomes frame.md?", options: ["The brand atoms", "The unit and composition rules", "The source copy"], answer: 1 },
        preview: "identity",
        previewCopy: ["frame.md", "Same brand. Camera-ready scale.", "The frame becomes the unit, so hierarchy can stop guessing."],
        actionPrompt: "Change headline and subject scale until the composition has one obvious lead.",
        controls: [
          { variable: "headline-scale", key: "headline", label: "Headline scale", min: .65, max: 1.35, step: .01 },
          { variable: "subject-scale", key: "subject", label: "Subject scale", min: .65, max: 1.35, step: .01 },
        ],
        lab: {
          syntax: "yaml",
          filename: "frame.md",
          kind: "video design truth",
          title: "Translate for the camera",
          help: "Edit frame-scale values, then run the frame.",
          intro: "Balance the headline and subject. The brand tokens remain fixed.",
          ariaLabel: "Editable frame.md video design specification",
          code: `---\ncolors:\n  canvas: "#f4f1ea"\n  ink: "#111112"\n  accent: "#ff5134"\ntypography:\n  display: "Helvetica Neue"\n  body: "Iowan Old Style"\nframe:\n  width: 1920\n  height: 1080\n  safe-area: 96\n  headline-scale: 1.02\n  subject-scale: .94\n  energy: .32\n  density: .34\n---\n\n## Composition rules\n- One dominant idea per frame.\n- Essential text stays inside the safe area.\n- Composition may vary; brand atoms may not.`,
        },
        beats: ["Preserve", "Translate", "Scale", "Compose", "Save"],
        sourceUrl: "https://www.hyperframes.dev/design",
        sourceLabel: "Official HyperFrames frame.md guide",
      },
      {
        id: "frame-presets",
        number: "2.3",
        title: "Start with a preset, then make it yours",
        duration: "20 min",
        objective: "Use a premade frame as a design tradition, not as borrowed branding.",
        coach: "A preset should remove blank-page anxiety. It should not make every project look like the showcase.",
        concept: "HyperFrames provides premade frames such as Biennale Yellow, BlockFrame, Broadside, Cartesian, and Cobalt Grid. Choose by visual logic, copy the uppercase FRAME.md template into the project as lowercase frame.md, then overlay the real brand tokens and constraints.",
        takeaways: ["Choose a preset by design logic and tone.", "Copy the template as lowercase frame.md.", "Replace tokens before composing scenes.", "Keep the preset’s structural logic, not its sample copy."],
        exercise: "Adopt one preset for a fictional product, replace its accent, and remove one rule that conflicts with the brand.",
        deliverable: "A fine-tuned frame.md plus a one-paragraph rationale for what stayed and what changed.",
        code: `# Preset adoption\nsource: cobalt-grid/FRAME.md\ndestination: ./frame.md\n\n## Keep\n- Hairline grid\n- Editorial serif display\n\n## Replace\n- Accent with the approved brand cobalt\n- Sample labels with project content`,
        quiz: { question: "How should an uppercase preset FRAME.md enter a project?", options: ["Reference it remotely", "Copy and adopt it as lowercase frame.md", "Rename design.md to FRAME.md"], answer: 1 },
        preview: "identity",
        previewCopy: ["Preset → frame.md", "Borrow the logic, not the identity.", "Fine-tune the atoms before the first scene is built."],
        actionPrompt: "Change the accent and density until the preset serves this brand instead of itself.",
        controls: [
          { variable: "accent", key: "accent", label: "Approved accent", type: "color" },
          { variable: "density", key: "density", label: "Preset density", min: 0, max: 1, step: .01 },
        ],
        lab: {
          syntax: "yaml",
          filename: "frame.md",
          kind: "fine-tuned preset",
          title: "Fine-tune the preset",
          help: "Replace preset values, then run the frame.",
          intro: "Keep the composition logic. Replace the brand-specific decisions.",
          ariaLabel: "Editable frame.md preset specification",
          code: `---\npreset: "cobalt-grid"\ncolors:\n  canvas: "#f4f1ea"\n  ink: "#111112"\n  accent: "#165dff"\nframe:\n  headline-scale: 1.08\n  subject-scale: .92\n  energy: .28\n  density: .46\n---\n\n## Keep\n- Hairline grid\n- Editorial hierarchy\n\n## Replace\n- Preset accent with approved brand color\n- Showcase labels with project content`,
        },
        beats: ["Browse", "Choose", "Copy", "Replace", "Explain"],
        sourceUrl: "https://www.hyperframes.dev/design",
        sourceLabel: "Official HyperFrames premade frames",
      },
      {
        id: "design-adherence",
        number: "2.4",
        title: "Resolve and verify the design truth",
        duration: "18 min",
        objective: "Prove that a composition follows the correct specification without freezing its layout.",
        coach: "Strict on tokens. Free on composition. That is how consistency avoids becoming a template.",
        concept: "HyperFrames resolves the first available spec in this order: frame.md, then design.md, then DESIGN.md. After authoring, verify colors, typography, corners, spacing, depth, and avoidance rules against that resolved file. Fix invented tokens before previewing.",
        takeaways: ["Resolve the spec once at the start.", "Treat frontmatter values as normative.", "Audit exact colors and fonts after authoring.", "Let layouts vary while the brand contract stays fixed."],
        exercise: "Audit a deliberately drifting frame, identify three violations, and repair the highest-impact one.",
        deliverable: "A design-adherence checklist with each violation, repair, and verification result.",
        code: `Resolution: frame.md → design.md → DESIGN.md\n\nAdherence:\n- Colors: exact palette values only\n- Typography: approved families and weights\n- Corners: declared radius system\n- Spacing: declared density range\n- Depth: declared shadow model\n- Avoids: no listed anti-patterns`,
        quiz: { question: "Which file wins when all three exist?", options: ["DESIGN.md", "design.md", "frame.md"], answer: 2 },
        preview: "qa",
        previewCopy: ["Design adherence", "Exact atoms. Flexible composition.", "Resolve once, audit after authoring, fix drift before preview."],
        actionPrompt: "Reduce complexity and strengthen the claim until the frame passes its own specification.",
        controls: [
          { variable: "headline-scale", key: "headline", label: "Claim clarity", min: .65, max: 1.35, step: .01 },
          { variable: "density", key: "density", label: "Complexity", min: 0, max: 1, step: .01 },
        ],
        lab: {
          syntax: "yaml",
          filename: "frame.md",
          kind: "resolved specification",
          title: "Repair design drift",
          help: "Edit the resolved spec values, then run the check.",
          intro: "Make the hierarchy legible without inventing a new token.",
          ariaLabel: "Editable resolved frame.md specification",
          code: `---\ncolors:\n  canvas: "#1a1b19"\n  ink: "#dbe6d5"\n  accent: "#aec3a1"\ntypography:\n  display: "SFMono-Regular"\nframe:\n  headline-scale: .92\n  subject-scale: 1.00\n  energy: .28\n  density: .48\n---\n\n## Avoid\n- Unapproved colors\n- Mixed corner systems\n- Equal visual weight`,
        },
        beats: ["Resolve", "Compare", "Flag", "Repair", "Verify"],
        sourceUrl: "https://www.hyperframes.dev/design",
        sourceLabel: "Official HyperFrames frame.md guide",
      },
    ],
  },
  {
    id: "product-launch",
    number: "03",
    title: "Product launch",
    short: "Make a new thing feel inevitable.",
    color: "#ff5a36",
    lessons: [
      {
        id: "launch-arc", number: "3.1", title: "Compress the launch story", duration: "20 min", objective: "Turn features into a reveal arc.", coach: "The viewer needs tension, proof, and release—not a feature inventory.", concept: "A concise launch film moves through friction, reframe, reveal, proof, and invitation. Each beat earns a change in scale or visual register.", takeaways: ["Open on the tension, not the logo.", "Delay the complete product reveal.", "Demonstrate one decisive behavior.", "Resolve with a concrete invitation."], exercise: "Write a five-beat, 18-second launch for the fictional Vela camera.", deliverable: "A storyboard with one sentence and one visual verb per beat.", code: `const beats = [\n  ["friction", 0, 3.2],\n  ["reframe", 3.2, 6.0],\n  ["reveal", 6.0, 10.5],\n  ["proof", 10.5, 15.0],\n  ["invitation", 15.0, 18.0]\n];`, quiz: { question: "What should usually happen before the full product reveal?", options: ["A list of specifications", "A tension or reframing beat", "The end card"], answer: 1 }, preview: "launch", beats: ["Friction", "Reframe", "Reveal", "Proof", "Invite"]
      },
      {
        id: "object-staging", number: "3.2", title: "Stage the product as evidence", duration: "24 min", objective: "Create physical presence from still assets.", coach: "A product render is not a scene until lighting, crop, depth, and movement give it a role.", concept: "Use foreground occlusion, controlled crop, shadow, and camera-scale changes to make a still product feel photographed rather than pasted onto a canvas.", takeaways: ["Animate a wrapper, not the media element.", "Prefer one strong crop to three thumbnails.", "Separate foreground, product, and atmosphere.", "Use motion to reveal function."], exercise: "Build three reveal variants: silhouette, macro detail, and full hero.", deliverable: "A contact sheet of three hero frames and a selected reveal.", code: `.product-wrap { position:absolute; inset:0; overflow:hidden; }\n.product { width:118%; transform-origin:72% 44%; }\ntl.from(".product", { scale: 1.18, x: 160, filter: "brightness(.35)", duration: 1.1, ease: "power3.out" }, 0.25);`, quiz: { question: "What should receive scale animation around a video or image?", options: ["A wrapper", "The timed media node", "The root composition"], answer: 0 }, preview: "launch", beats: ["Silhouette", "Detail", "Turn", "Hero", "Hold"]
      },
      {
        id: "launch-transitions", number: "3.3", title: "Transitions as product logic", duration: "23 min", objective: "Use transitions to explain relationships.", coach: "A transition is editorial punctuation. Spend the bold one on the reveal.", concept: "Choose a primary transition for continuity, an accent for topic changes, and one hero transition for the product payoff. Repetition creates a system; contrast creates meaning.", takeaways: ["Use one primary transition 60–70% of the time.", "Reserve the strongest transition for the reveal.", "Match duration to energy.", "Avoid a sampler platter of effects."], exercise: "Map transition meaning across the five-beat Vela launch.", deliverable: "A transition map with rationale and exact durations.", code: `// Related beat: editorial push, 0.32s\n// Reveal: cinematic zoom, 0.48s\n// Outro: color dip, 0.7s\n// Do not mix CSS and shader transition systems in one composition.`, quiz: { question: "Why repeat a primary transition?", options: ["To save code", "To create visual grammar", "To reduce rendering time"], answer: 1 }, preview: "launch", beats: ["Push", "Push", "Zoom", "Push", "Dip"]
      },
    ],
  },
  {
    id: "product-tour", number: "04", title: "Product tour", short: "Make software behavior feel tangible.", color: "#b6cbea",
    lessons: [
      { id:"tour-route", number:"4.1", title:"Direct attention through UI", duration:"21 min", objective:"Turn interface capture into a guided visual argument.", coach:"The cursor is not the story. The consequence of the action is the story.", concept:"Frame a task, show the decisive action, then isolate the resulting state. Use camera movement, masks, and local emphasis to reduce cognitive load without redrawing the product.", takeaways:["One task per beat.","Crop to the decision area.","Move after the interface changes, not during every click.","Use annotations only when the UI cannot carry the point."], exercise:"Plan a 30-second tour of the fictional Relay inbox.", deliverable:"A capture list and six-beat route with focal rectangles.", code:`<div class="ui-camera"><img src="relay-capture.png" alt="" /></div>\ntl.to(".ui-camera", { scale: 1.34, x: -210, y: 86, duration: 0.75, ease: "power3.inOut" }, 4.2);`, quiz:{question:"What should determine a product-tour camera move?",options:["Every cursor movement","A change in viewer attention","A fixed two-second interval"],answer:1}, preview:"tour", beats:["Task","Orient","Act","Result","Meaning"] },
      { id:"tour-annotations", number:"4.2", title:"Annotations without clutter", duration:"17 min", objective:"Add just enough explanation to preserve flow.", coach:"If every control is labeled, none of the labels are directing attention.", concept:"Use a single annotation voice with consistent geometry. Prefer local highlights, masks, or a short phrase attached to the action area.", takeaways:["Keep one active annotation.","Anchor labels to interface geometry.","Use verbs, not feature names.","Remove annotation as soon as the result reads."], exercise:"Create three annotation types and choose one family for Relay.", deliverable:"An annotation system with label, focus mask, and cursor rules.", code:`tl.from(".focus-ring", { scale: .82, opacity: 0, duration: .28, ease: "back.out(1.4)" }, 3.9);\ntl.from(".action-label", { x: 18, opacity: 0, duration: .35, ease: "power3.out" }, 4.05);`, quiz:{question:"How many annotations should compete at once?",options:["One","Three","As many as fit"],answer:0}, preview:"tour", beats:["Frame","Focus","Verb","Action","Clear"] },
      { id:"tour-pacing", number:"4.3", title:"Let comprehension set the pace", duration:"19 min", objective:"Balance action speed with reading time.", coach:"A fast cursor does not make a fast film. It makes a hard-to-follow one.", concept:"Budget time for orientation, action, and consequence. Compress dead travel, not the moment the viewer needs to understand.", takeaways:["Orient before the action.","Hold the result longer than the click.","Cut cursor travel.","Use narration timestamps as beat anchors."], exercise:"Retiming lab: repair an over-fast six-beat tour.", deliverable:"A timing table with orientation/action/result spans.", code:`const beat = { orient: 0.7, action: 0.35, result: 1.4 };\n// The state change earns the longest hold.`, quiz:{question:"Which moment usually deserves the longest hold?",options:["Cursor travel","The resulting state","The logo intro"],answer:1}, preview:"tour", beats:["Orient","Act","Hold","Connect","Advance"] },
    ]
  },
  {
    id:"vertical-social", number:"05", title:"Vertical social", short:"Hook fast without flattening taste.", color:"#ffd166",
    lessons:[
      { id:"social-hook", number:"5.1", title:"Build a visual hook", duration:"18 min", objective:"Make the first two seconds specific and legible.", coach:"Energy is not the number of things moving. It is how quickly the idea becomes unavoidable.", concept:"Use a provocative claim, a decisive crop, and one synchronized visual change. Avoid stuffing the opening with captions, stickers, b-roll, and a title card simultaneously.", takeaways:["Start inside the argument.","Use one dominant phrase.","Frame the face off-center for caption space.","Make the first visual change semantic."], exercise:"Create three opening frames for a fictional creator explaining local AI workflows.", deliverable:"A selected 9:16 hook plus a two-second timing plan.", code:`.hook { font-size: 94px; max-width: 840px; }\ntl.from(".hook", { scale: .72, opacity: 0, duration: .22, ease: "back.out(1.7)" }, 0.16);`, quiz:{question:"What makes a hook energetic?",options:["Many simultaneous elements","Rapid idea recognition","A neon color palette"],answer:1}, preview:"social", beats:["Claim","Punch","Proof","Turn","Payoff"] },
      { id:"social-captions", number:"5.2", title:"Captions as performance", duration:"25 min", objective:"Translate vocal rhythm into readable typographic rhythm.", coach:"Captions should carry the speaker’s phrasing, not compete with their face.", concept:"Group words by natural phrase, style only meaningful emphasis, guarantee every caption exits, and use fitText for variable phrases.", takeaways:["Transcribe with the correct language model.","Group by phrase and pause.","Reserve accent treatment for meaningful words.","Hard-kill every group after its exit."], exercise:"Build five caption groups from a sanitized transcript and mark emphasis words.", deliverable:"A word-timed caption plan and one rendered caption composition.", code:`tl.to(groupEl, { opacity: 0, scale: .96, duration: .12, ease: "power2.in" }, group.end - .12);\ntl.set(groupEl, { opacity: 0, visibility: "hidden" }, group.end);`, quiz:{question:"Why add a hard caption kill?",options:["To shorten the render","To prevent stale groups remaining visible","To improve transcription"],answer:1}, preview:"social", beats:["Phrase","Emphasis","Breath","Turn","Kill"] },
      { id:"social-zooms", number:"5.3", title:"Punch zooms with restraint", duration:"16 min", objective:"Use scale changes as editorial emphasis.", coach:"If every word gets a punch, the frame has no baseline and the punches disappear.", concept:"Land a hard scale change on a true emphasis word, hold briefly, and reset cleanly. Use slow pushes for thesis lines and leave long unzoomed stretches.", takeaways:["Use word timestamps.","Animate the wrapper around footage.","Keep punch scale under roughly 1.30.","Choose focal coordinates for the face."], exercise:"Map one punch, one ratchet, and one slow push across a 15-second clip.", deliverable:"A zoom map with rationale and a before/after review.", code:`tl.set(".camera", { scale: 1.22, transformOrigin: "52% 38%" }, 4.55);\ntl.set(".camera", { scale: 1 }, 4.92);\ntl.to(".camera", { scale: 1.10, duration: 3.4, ease: "none" }, 8.1);`, quiz:{question:"What makes a hard punch zoom read as intentional?",options:["A deep zoom","Exact timing on emphasis","A blur transition"],answer:1}, preview:"social", beats:["Rest","Punch","Rest","Push","Reset"] },
    ]
  },
  {
    id:"data-story", number:"06", title:"Data story", short:"Make numbers move like an argument.", color:"#7ea0d8",
    lessons:[
      { id:"data-argument", number:"6.1", title:"Start with the claim", duration:"19 min", objective:"Choose the one comparison the viewer must understand.", coach:"A chart is not evidence until the viewer knows what question it answers.", concept:"State the claim, choose the minimum visual relationship that proves it, and keep related metrics in one visual space so change is perceptible.", takeaways:["One chart answers one question.","Keep related values in the same scene grammar.","Remove legends and nonessential axes.","Give the number physical weight."], exercise:"Reduce a six-metric dashboard into a three-beat data story.", deliverable:"A claim, evidence mapping, and storyboard.", code:`const quarters = [34, 48, 67, 81];\n// Keep the visual system; animate only the value and proportional form.`, quiz:{question:"What should change between related quarterly values?",options:["The entire visual style","Only the value and its proportional form","The color palette"],answer:1}, preview:"data", beats:["Question","Baseline","Change","Meaning","Implication"] },
      { id:"data-choreography", number:"6.2", title:"Choreograph the comparison", duration:"23 min", objective:"Use motion to reveal causality and contrast.", coach:"Animate in the order the argument is understood, not the order the SVG was written.", concept:"Sequence context, baseline, comparison, and annotation. Use motion paths and scale only where they clarify the relationship.", takeaways:["The first movement states hierarchy.","Use tabular numerals.","Keep total stagger under 500ms.","Hold long enough to read the comparison."], exercise:"Animate a before/after adoption metric without using a bar-chart template.", deliverable:"An 8-second data composition and animation map.", code:`tl.from(".baseline", { scaleX: 0, transformOrigin: "left", duration: .55, ease: "power3.out" }, .2);\ntl.from(".delta", { y: 44, opacity: 0, duration: .42, ease: "expo.out" }, .55);`, quiz:{question:"What should determine animation order in a data scene?",options:["DOM order","Argument hierarchy","Alphabetical order"],answer:1}, preview:"data", beats:["Context","Baseline","Compare","Delta","Hold"] },
      { id:"data-clarity", number:"6.3", title:"Design for three-second reading", duration:"15 min", objective:"Make a complex result legible at video speed.", coach:"If the viewer has to study the frame, the edit already lost them.", concept:"Simplify labels, enlarge the decisive number, use direct annotation, and test the composition as a thumbnail and at actual duration.", takeaways:["Remove gridlines and legends.","Use 16px+ labels and 60px+ headlines.","Direct-label the important value.","Test at playback speed."], exercise:"Run the thumbnail and three-second comprehension tests.", deliverable:"A revised frame plus a five-second silent comprehension recording.", code:`.metric { font-variant-numeric: tabular-nums; font-size: 148px; }\n.label { font-size: 24px; max-width: 360px; }`, quiz:{question:"Which data element deserves the most visual weight?",options:["The decisive comparison","The chart title","The source footnote"],answer:0}, preview:"data", beats:["Read","Compare","Understand","Confirm","Leave"] },
    ]
  },
  {
    id:"music-lyric", number:"07", title:"Music + lyric", short:"Let the song drive intensity, not dictate cliché.", color:"#d792b1",
    lessons:[
      { id:"lyric-lock", number:"7.1", title:"Lock lyrics before styling", duration:"20 min", objective:"Create trustworthy timing and wording before animation.", coach:"A beautiful wrong lyric is still wrong—and much harder to unsee once animated.", concept:"Use the approved lyric sheet as source truth, align it to the master, audit uncertain words, and separate instrumental spans from missing transcription.", takeaways:["Start with the master audio.","Use medium or larger models for produced vocals.","Prefer approved lyrics over ASR guesses.","Audit tail ad-libs manually."], exercise:"Clean a deliberately noisy sanitized transcript.", deliverable:"A locked lyric map with uncertainty annotations resolved.", code:`npx hyperframes transcribe song.wav --model medium.en\n# Then read and clean transcript.json before composition work.`, quiz:{question:"What is the source of truth for generated vocals?",options:["The smallest Whisper model","The approved lyric sheet checked against the master","Auto-captions"],answer:1}, preview:"music", beats:["Listen","Align","Audit","Lock","Map"] },
      { id:"audio-reactive", number:"7.2", title:"Audio-reactive without a visualizer", duration:"26 min", objective:"Map musical energy to narrative visuals.", coach:"Audio gives timing and intensity. The song’s meaning gives you the visual vocabulary.", concept:"Pre-extract deterministic audio data. Let bass affect scale or warmth, treble affect edge or glow, and major changes trigger compositional evolution—not equalizer bars.", takeaways:["Pre-extract audio bands locally.","Map signals to narrative properties.","Keep lyric scale variation subtle.","Put all reactions on the seekable timeline."], exercise:"Design three signal-to-meaning mappings for a fictional song about returning home.", deliverable:"An audio mapping table and 12-second proof.", code:`// Bass makes the porch light breathe; treble sharpens the paper edge.\nvar bass = AUDIO.frames[f].bands[0];\ntl.set(".porch-glow", { scale: 1 + bass * .08 }, f / AUDIO.fps);`, quiz:{question:"What should determine the visual vocabulary?",options:["The frequency bands","The narrative meaning","A waveform preset"],answer:1}, preview:"music", beats:["Signal","Meaning","Map","React","Restrain"] },
      { id:"lyric-evolution", number:"7.3", title:"Repeat with evolution", duration:"21 min", objective:"Make chorus repetition feel intentional.", coach:"Repetition is musical structure. Visual evolution is what lets us feel where we are in it.", concept:"Reuse a visual motif across choruses while changing one meaningful variable—scale, density, color temperature, crop, or viewpoint. Preserve recognition while raising stakes.", takeaways:["Assign a motif to the chorus.","Change one variable per return.","Use stillness as contrast.","Save the fullest version for the final chorus."], exercise:"Plan three chorus returns using one visual motif.", deliverable:"A motif evolution table and contact sheet.", code:`const chorusStates = [\n  { scale: .82, density: .35, warmth: .4 },\n  { scale: 1.0, density: .62, warmth: .7 },\n  { scale: 1.18, density: 1.0, warmth: 1.0 }\n];`, quiz:{question:"How should a recurring chorus motif change?",options:["Replace it completely","Change every property","Evolve one meaningful variable"],answer:2}, preview:"music", beats:["Motif","Return","Shift","Return","Full"] },
    ]
  },
  {
    id:"manifesto", number:"08", title:"Cinematic manifesto", short:"Build conviction through voice, image, and restraint.", color:"#9cad8c",
    lessons:[
      { id:"voice-spine", number:"8.1", title:"Use voice as the spine", duration:"20 min", objective:"Build the edit around spoken turns, not scene count.", coach:"The line break, breath, and reversal are editorial events.", concept:"Map the narration into propositions, turns, evidence, and silence. Let scene duration come from the voice and emotional weight rather than equal-sized storyboard boxes.", takeaways:["Mark reversals and breaths.","Give heavier claims longer holds.","Let silence own the frame.","Avoid illustrating every noun."], exercise:"Mark a 45-second sanitized manifesto script into editorial turns.", deliverable:"A voice map with line purpose and visual role.", code:`const turns = [\n  { at: 0.0, role: "invitation" },\n  { at: 6.4, role: "tension" },\n  { at: 15.8, role: "reversal" },\n  { at: 28.2, role: "proof" },\n  { at: 39.0, role: "resolve" }\n];`, quiz:{question:"What should usually determine manifesto scene duration?",options:["An equal grid","The spoken line and emotional weight","A transition preset"],answer:1}, preview:"manifesto", beats:["Invite","Tension","Silence","Turn","Resolve"] },
      { id:"metaphor-footage", number:"8.2", title:"Use footage as metaphor and proof", duration:"23 min", objective:"Choose images that deepen the line rather than repeat it.", coach:"If the voice says ‘door,’ showing a door is only useful when that door adds meaning.", concept:"Separate literal evidence from evocative metaphor. Literal footage proves claims; metaphor should introduce a second idea, emotional register, or tension.", takeaways:["Name what each image contributes.","Prefer one precise image over montage filler.","Use literal footage for claims.","Reject mood footage with no relationship to the line."], exercise:"Select visual roles for ten lines without searching for assets.", deliverable:"A source map labeling evidence, metaphor, and deliberate absence.", code:`// Storyboard field\nvisual_role: "metaphor"\nadds: "Fragile construction under pressure"\navoids: "Literal illustration of the spoken noun"`, quiz:{question:"When is evocative footage useful?",options:["When it adds a second idea or emotional register","Whenever no literal clip exists","When it looks cinematic"],answer:0}, preview:"manifesto", beats:["Line","Image","Friction","Absence","Meaning"] },
      { id:"restraint", number:"8.3", title:"Design silence and restraint", duration:"18 min", objective:"Use absence as a compositional event.", coach:"Professional restraint is not empty. It is controlled attention with nothing unnecessary left.", concept:"A near-empty frame can carry enormous weight when typography, texture, duration, and the preceding cut prepare it. Avoid filling every hold with ambient motion.", takeaways:["Earn stillness through contrast.","Keep one live visual detail.","Let silence last long enough to register.","Do not defend weak emptiness as minimalism."], exercise:"Create one three-second silent scene that still has visual intent.", deliverable:"A silent proof frame plus the preceding and following transitions.", code:`// One deliberate event inside a still hold.\ntl.from(".hairline", { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "sine.out" }, 0.7);`, quiz:{question:"What distinguishes restraint from an empty frame?",options:["More decorative motion","Controlled attention and earned duration","A black background"],answer:1}, preview:"manifesto", beats:["Noise","Cut","Stillness","Detail","Release"] },
    ]
  },
  {
    id:"composition-systems", number:"09", title:"Composition systems", short:"Build reusable films without hiding the timeline.", color:"#8173c9",
    lessons:[
      {
        id:"timeline-contract", number:"9.1", title:"Build the timeline contract", duration:"22 min",
        objective:"Turn ordinary HTML into clips the renderer can seek deterministically.",
        coach:"A composition is not a page that happens to move. It is a timeline with explicit ownership of time.",
        concept:"Every authored clip declares when it starts, how long it lives, and which temporal track owns it. Track index prevents time collisions; CSS z-index controls visual layering. Keeping those jobs separate makes preview, inspection, and render agree.",
        takeaways:["Give the root a composition id and canvas size.","Give every visual clip explicit start, duration, and track data.","Use tracks for time and z-index for paint order.","Keep video muted and route audible sound through a separate audio element."],
        exercise:"Convert a three-layer hero page into a six-second HyperFrames composition contract.",
        deliverable:"A valid root plus background, claim, and audio clips with non-overlapping temporal tracks.",
        code:`<div data-composition-id="launch" data-width="1920" data-height="1080">\n  <video class="clip" data-start="0" data-duration="6" data-track-index="0" muted playsinline></video>\n  <h1 class="clip" data-start="1" data-duration="4" data-track-index="1">Launch day</h1>\n  <audio data-start="0" data-duration="6" data-track-index="10" data-volume=".5"></audio>\n</div>`,
        quiz:{question:"What does data-track-index control?",options:["Front-to-back paint order","Temporal overlap","Font hierarchy"],answer:1},
        preview:"launch", beats:["Root","Clip","Time","Track","Seek"],
        sourceUrl:"https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes-core/references/tracks-and-clips.md",
        sourceLabel:"Official clips and tracks reference"
      },
      {
        id:"sub-composition-contract", number:"9.2", title:"Split scenes without breaking time", duration:"24 min",
        objective:"Use sub-compositions as independently authored scenes that still mount and seek correctly.",
        coach:"A scene file is useful only when its styles, timeline, and identity survive the mount boundary.",
        concept:"A sub-composition is a separate HTML file mounted by the host. HyperFrames clones only the template contents, so live styles, markup, and scripts belong inside that template. The host id, inner id, and timeline key must match; timed media remains a direct child of the host root.",
        takeaways:["Put the complete live scene inside template.","Match host, root, and timeline composition ids.","Keep video and audio at the host root.","Snapshot a visible midpoint for every mounted scene."],
        exercise:"Extract one scene into compositions/proof.html and wire it back into the six-second host.",
        deliverable:"A mounted scene plus a midpoint snapshot proving its style and motion survived.",
        code:`<!-- index.html -->\n<div data-composition-id="proof" data-composition-src="compositions/proof.html"\n  data-start="2" data-duration="3" data-track-index="1" data-width="1920" data-height="1080"></div>\n\n<!-- compositions/proof.html -->\n<template>\n  <style>#root { position:absolute; inset:0; }</style>\n  <div id="root" data-composition-id="proof"></div>\n  <script>window.__timelines.proof = gsap.timeline({paused:true});</script>\n</template>`,
        quiz:{question:"Which content survives a sub-composition mount?",options:["Everything in head","Only template contents","Only external stylesheets"],answer:1},
        preview:"tour", beats:["Extract","Template","Match","Mount","Snapshot"],
        sourceUrl:"https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes-core/references/sub-compositions.md",
        sourceLabel:"Official sub-composition contract"
      },
      {
        id:"registry-reuse", number:"9.3", title:"Reuse blocks before inventing skills", duration:"18 min",
        objective:"Discover, install, and adapt a reusable HyperFrames block or component.",
        coach:"A reusable visual primitive belongs in the registry. A skill is for judgment and workflow, not every effect.",
        concept:"The registry separates blocks, which are standalone sub-compositions, from components, which are snippets merged into a host. Catalog by type or tag, install the closest primitive, then adapt its composition and design tokens instead of rebuilding the same chart, caption, or overlay.",
        takeaways:["Search the catalog before creating a new primitive.","Wire blocks with a composition source and explicit timing.","Merge component HTML, CSS, and timeline hooks into the host.","Keep project-specific story and design outside the reusable primitive."],
        exercise:"Find one data or caption item, install it, and restyle it to the current frame.md.",
        deliverable:"One installed registry item with its wiring and design adaptation documented.",
        code:`npx hyperframes catalog --type block --tag data\nnpx hyperframes add data-chart --dir .\n\n<!-- Wire the installed block into index.html with id, src, start, duration, track, width, and height. -->`,
        quiz:{question:"When should a visual effect become a standalone skill?",options:["Whenever it has CSS","When it requires reusable workflow judgment","Whenever it appears twice"],answer:1},
        preview:"data", beats:["Search","Choose","Install","Wire","Adapt"],
        sourceUrl:"https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes-registry/SKILL.md",
        sourceLabel:"Official HyperFrames registry guide"
      },
      {
        id:"variable-templates", number:"9.4", title:"Render a system, not one file", duration:"25 min",
        objective:"Turn a composition into a strict variable-driven template and render safe variations.",
        coach:"The visual system stays fixed. The variable contract says exactly what may change.",
        concept:"Declare typed variables once, bind simple text, media, and colors declaratively, and keep useful defaults so preview always works. Batch rendering applies one validated value object per output and records every result in a manifest.",
        takeaways:["Declare id, type, label, and default for every variable.","Use data-var-text, data-var-src, and CSS custom properties for direct bindings.","Gate automated output with strict variables.","Verify the batch manifest and every rendered file."],
        exercise:"Parameterize a launch title, accent, and product image, then define three sanitized batch rows.",
        deliverable:"A variable schema, three input rows, and a collision-safe output template.",
        code:`<html data-composition-variables='[\n  {"id":"title","type":"string","label":"Title","default":"Hello"},\n  {"id":"accent","type":"color","label":"Accent","default":"#ff5134"}\n]'>\n<h1 data-var-text="title">Hello</h1>\n\nnpx hyperframes render --batch rows.json --output "renders/{name}.mp4" --strict-variables`,
        quiz:{question:"What should differ across a batch?",options:["The composition contract","Only declared variable values","The QA standard"],answer:1},
        preview:"identity", beats:["Declare","Bind","Default","Batch","Verify"],
        sourceUrl:"https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes-core/references/variables-and-media.md",
        sourceLabel:"Official variables and media reference"
      },
    ]
  },
  {
    id:"finish", number:"10", title:"Polish + export", short:"Prove the film, not just the code.", color:"#9cad8c",
    lessons:[
      { id:"deterministic-qa", number:"10.1", title:"The deterministic QA loop", duration:"22 min", objective:"Turn verification into a repeatable creative practice.", coach:"A green lint result cannot tell you whether the scene feels good—but it can keep preventable defects out of the review.", concept:"Use lint for fast static feedback, then check --snapshots as the final browser gate for runtime, layout, motion, contrast, and annotated review frames. Preview for creative approval before rendering, then watch and verify the output file.", takeaways:["Lint while authoring.","Use check --snapshots for the final technical gate.","Preview and receive creative approval before render.","Watch and verify the rendered file."], exercise:"Run the current four-stage QA loop on one lesson project.", deliverable:"A QA ledger with commands, findings, fixes, and remaining judgment calls.", code:`npx hyperframes lint\nnpx hyperframes check --snapshots --samples 15\nnpx hyperframes preview\n# After creative approval:\nnpx hyperframes render --quality high --output renders/final.mp4\nffprobe renders/final.mp4`, quiz:{question:"What does a passing lint result prove?",options:["The film is creatively strong","The checked structural rules pass","The final render was watched"],answer:1}, preview:"qa", beats:["Lint","Check","Preview","Render","Watch"] },
      { id:"review-language", number:"10.2", title:"Give actionable review notes", duration:"17 min", objective:"Diagnose the layer that actually failed.", coach:"‘Make it pop’ is not a note. ‘The claim and evidence enter with equal weight’ is.", concept:"Classify notes as narrative, composition, typography, motion, timing, asset, or technical. Fix the highest layer first; polishing motion cannot rescue a broken story beat.", takeaways:["Name the layer.","Describe visible evidence.","State the viewer consequence.","Propose the smallest repair."], exercise:"Rewrite ten vague creative notes into actionable work orders.", deliverable:"A review ledger sorted by layer and priority.", code:`Finding: Claim and proof enter simultaneously.\nLayer: Motion hierarchy.\nConsequence: Viewer cannot identify the main idea.\nRepair: Lead with claim; delay proof by 280ms.`, quiz:{question:"Which note is most actionable?",options:["Make it more cinematic","The evidence arrives before the claim; delay it 300ms","Try another color"],answer:1}, preview:"qa", beats:["Observe","Classify","Consequence","Repair","Verify"] },
      { id:"capstone", number:"10.3", title:"Capstone: one complete professional film", duration:"3–5 hr", objective:"Build, verify, and package one sanitized film from brief to master.", coach:"The capstone is complete when another person can understand the intent, inspect the source, and watch a verified render.", concept:"Choose one professional format. Produce BRIEF.md, design.md, frame.md, a script or transcript, storyboard, composition, QA ledger, review render, and final local master.", takeaways:["Choose a format-specific completion bar.","Preserve the decision trail.","Use sanitized local assets.","Package source, proof, and master separately."], exercise:"Complete one sanitized project and prepare it for optional HeyGen team sharing.", deliverable:"A portable project folder with source, local assets, QA evidence, and a final MP4.", code:`project/\n├── BRIEF.md\n├── design.md\n├── frame.md\n├── SCRIPT.md or transcript.json\n├── STORYBOARD.md\n├── index.html\n├── compositions/\n├── assets/\n├── qa/\n└── renders/`, quiz:{question:"What makes the capstone shareable?",options:["A polished MP4 alone","Source, decisions, QA evidence, and verified output","A public deployment"],answer:1}, preview:"qa", beats:["Brief","Design","Build","Verify","Package"] },
    ]
  },
  {
    id:"daily-series",
    number:"11",
    title:"HyperFrames release track",
    short:"Practice every HyperFrames workflow HeyGen has published so far.",
    color:"#ff5a36",
    lessons:[
      releaseLesson({
        day:1,
        id:"daily-install",
        title:"Install HyperFrames where you work",
        objective:"Install and verify HyperFrames in the same local agent environment you will use for the course.",
        concept:"The shortest path to fluency is removing setup friction. Confirm the prerequisites, run the environment check, scaffold a blank project, validate it, and make the Studio project URL your working surface.",
        deliverable:"The first-frame project, clean doctor, lint, and inspect results, plus its Studio project URL.",
        code:`node --version\nffmpeg -version\nnpx hyperframes doctor\nnpx hyperframes init first-frame --non-interactive --example blank\ncd first-frame\nnpx hyperframes lint\nnpx hyperframes inspect\nnpx hyperframes preview`,
        preview:"qa",
        source:"2074176916819685648",
        steps:[
          "Confirm Node.js 22 or newer and FFmpeg are available.",
          "Run npx hyperframes doctor and resolve every failed requirement.",
          "Scaffold first-frame from the blank example.",
          "Run lint and inspect inside the new project.",
          "Start preview and open the exact Studio project URL printed by the CLI.",
        ],
      }),
      releaseLesson({ day:2, id:"daily-motion-language", title:"Give the brand a motion language", objective:"Translate a brand into reusable visual and motion constraints before generating scenes.", concept:"A brand survives motion when color, type, entrance behavior, transition grammar, and explicit anti-patterns are written down as a design contract.", deliverable:"A compact design.md and frame.md plus one frame that visibly follows them.", code:`# design.md sets brand truth.\n# frame.md translates it for video composition.\n\n## Motion intent\n- Entries: decisive, 0.35–0.65s\n- Primary transition: editorial push\n- Avoid: equal cards, generic gradients, constant motion`, preview:"identity", source:"2074574265714905167" }),
      releaseLesson({ day:3, id:"daily-pr-video", title:"Turn an open PR into a video", objective:"Convert a real code change into a concise product story rather than a changelog slideshow.", concept:"A useful PR video connects the user problem, the changed behavior, and the proof. The diff supplies facts; the film still needs hierarchy and an editorial arc.", deliverable:"A 60-second PR walkthrough plan with one visible before-and-after.", code:`Story: problem → changed behavior → proof → next step\nSource: PR description + changed UI + approved screenshots`, preview:"tour", source:"2074954182583554051" }),
      releaseLesson({ day:4, id:"daily-music-video", title:"Turn music into beat-synced video", objective:"Map a track’s structure and meaning to deterministic visual changes.", concept:"Beat sync is useful when it supports the song’s form. Use sections, energy, and lyrical meaning to drive a visual system instead of attaching generic pulses to every beat.", deliverable:"A 12-second music-led proof with one motif that evolves.", code:`npx hyperframes transcribe track.wav\n// Map sections and energy before styling individual beats.`, preview:"music", source:"2075262117964615956" }),
      releaseLesson({ day:5, id:"daily-faceless-explainer", title:"Build a faceless explainer from a concept", objective:"Turn an idea with no footage into a visual explanation built from designed evidence.", concept:"When the input is only a concept, the storyboard must earn every visual. Use diagrams, kinetic type, purposeful assets, and sequence instead of filling time with generic b-roll.", deliverable:"A three-beat faceless explainer with a clear claim and visual proof.", code:`const beats = ["question", "mechanism", "implication"];\n// One explanatory relationship per frame.`, preview:"data", source:"2075682104302882908" }),
      releaseLesson({ day:6, id:"daily-talking-head", title:"Recut a talking head with synced graphics", objective:"Layer designed graphic moments over speech without obscuring the speaker or flattening the pacing.", concept:"Talking-head graphics should clarify the spoken turn: a kinetic title, a decisive stat, or a visual proof. They should enter on meaning, leave cleanly, and preserve the face.", deliverable:"A 15-second recut with three distinct, word-timed graphic interventions.", code:`// Use transcript timestamps as anchors.\ntl.from(".key-claim", { y: 36, opacity: 0, duration: .38 }, wordStart);`, preview:"social", source:"2075998619325604238" }),
      releaseLesson({ day:7, id:"daily-motion-graphics", title:"Make motion graphics by example", objective:"Build a short design-led piece where motion itself carries the message.", concept:"Short motion graphics work best when one visual rule does the heavy lifting: kinetic type, a count-up, a chart reveal, or a geometric transformation. No narration is required when the movement is the argument.", deliverable:"An under-10-second motion graphic with one idea and one motion rule.", code:`tl.from(".claim", { scale:.72, opacity:0, duration:.32, ease:"back.out(1.4)" });\ntl.to(".proof", { "--value": 81, duration:1.1, ease:"power3.out" });`, preview:"data", source:"2076381187640324427" }),
      releaseLesson({ day:9, id:"daily-figma", title:"Carry a Figma design into HyperFrames", objective:"Use a Figma source as the design contract for a launch film.", concept:"Figma-to-HyperFrames is valuable because it preserves decisions already made: layout, colors, fonts, spacing, and assets. Motion should extend that system, not reinterpret it into a generic video template.", deliverable:"A launch frame that matches its source mock in type, color, spacing, and asset treatment.", code:`/figma https://figma.com/file/...\n// Audit hex, font, frame geometry, and crop before animating.`, preview:"identity", source:"2077072141309382770" }),
      releaseLesson({ day:10, id:"daily-prompt-anatomy", title:"Write the brief before the prompt", objective:"Write BRIEF.md so the selected workflow starts with decisions instead of guesses.", concept:"A useful BRIEF.md specifies the job, audience, source material, deliverable, visual direction, and completion bar. HyperFrames can then route to the right workflow without inventing the project’s intent.", deliverable:"A reusable six-part BRIEF.md for one professional video format.", code:`# BRIEF.md\n\nJob:\nAudience:\nSource material:\nDeliverable + duration:\nVisual direction:\nCompletion bar:\n\n# Then invoke the workflow that matches the deliverable.`, preview:"launch", source:"2077438104982667282" }),
      releaseLesson({ day:11, id:"daily-video-extraction", title:"Reuse a scene from an existing video", objective:"Extract and repurpose the strongest element of a prior video without rebuilding the whole piece.", concept:"Existing video can be source material. Isolate a useful scene, remove what no longer belongs, and place it inside a new composition where timing and context give it a new job.", deliverable:"One extracted scene reused inside a new 10-second composition.", code:`// Keep video muted; route audio separately.\n<video src="source.mp4" muted playsinline data-media-start="12.4"></video>`, preview:"tour", source:"2077798995762823593" }),
      releaseLesson({ day:12, id:"daily-dynamic-captions", title:"Style dynamic captions", objective:"Add word-timed caption components that feel designed and remain readable.", concept:"Caption styles are reusable components, but the choices stay editorial: phrase grouping, emphasis, position, and exit timing must follow the speaker and the frame.", deliverable:"Five caption groups using one coherent component style and verified exits.", code:`npx hyperframes add dynamic-captions\n// Group by phrase; emphasize meaning; hard-kill every group.`, preview:"social", source:"2078190361932103716" }),
      releaseLesson({ day:13, id:"daily-studio-preview", title:"Edit the composition in Studio", objective:"Move from prompt-only generation into deliberate visual editing.", concept:"Studio is the place to inspect the actual composition: clips, timing, typography, color, and frame state. A generated first pass becomes professional when the maker can see and revise the visual system directly.", deliverable:"A Studio revision that improves one typography, color, or clip decision.", code:`npx hyperframes preview\n# Open the project URL and inspect the composition, not index.html.`, preview:"qa", source:"2078589328562016559" }),
      releaseLesson({ day:14, id:"daily-keyframes", title:"Edit how the frame moves", objective:"Use Studio keyframes to refine timing, easing, and spatial emphasis.", concept:"Keyframes expose the motion decision itself: when movement begins, where it lands, and how easing changes perceived weight. Define the end-state first, inspect proof poses, and verify that seeking produces the same frame every time.", deliverable:"A before-and-after keyframe pass with proof poses and a written timing rationale.", code:`// End-state CSS first. Then tune the journey.\ntl.from(".subject", { x:72, opacity:0, duration:.62, ease:"expo.out" }, .2);\n\nnpx hyperframes keyframes . --json\nnpx hyperframes snapshot . --at 0.2,0.51,0.82`, preview:"launch", source:"2078945075787452660" }),
      releaseLesson({ day:15, id:"daily-sample-web", title:"Extract motion graphics from the web", objective:"Study and reuse a web motion pattern without copying the surrounding page.", concept:"The web is a reference library: hero animation, chart behavior, Lottie timing, and interaction patterns can be isolated, understood, and adapted into a deterministic composition.", deliverable:"A recreated motion principle with its source behavior and adaptation documented.", code:`Observe → isolate the motion rule → rebuild deterministically → credit the reference`, preview:"manifesto", source:"2079251321484722675" }),
      releaseLesson({ day:16, id:"daily-asset-libraries", title:"Use asset libraries with intent", objective:"Resolve source-appropriate local media by narrative role instead of treating every frame as generated typography.", concept:"The media-use workflow handles images, video, audio, logos, grades, and transforms. Select each local asset by narrative role, provenance, crop potential, and visual fit, then record the decision before it enters the storyboard.", deliverable:"A five-asset local source map labeling proof, metaphor, atmosphere, and transition use.", code:`asset: assets/product-closeup.mp4\nrole: proof\nsource: approved local library\nprovenance: internal product capture\ncrop: 16:9 macro\nused_at: reveal`, preview:"manifesto", source:"2079609229737111978" }),
      releaseLesson({ day:17, id:"daily-storyboard", title:"Control the output through storyboards", objective:"Direct the video in three increasingly expensive passes before the final build.", concept:"The Storyboard flow separates plan, sketch, and build. First approve the sequence, then approve real copy and layout, then add design and motion. Comments can revise one frame while approved frames remain fixed.", deliverable:"A confirmed storyboard with plan cards, wireframe sketches, and one frame revised by comment.", code:`Use HyperFrames to build a launch video for my website.\nI want to storyboard it first.\n\nnpx hyperframes preview\n# Open the Storyboard tab: plan → sketch → build`, preview:"qa", source:"2080012076454719554" }),
    ]
  }
];

const lessonIds = modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
const missingPractice = lessonIds.filter((id) => !practiceByLesson[id]);
const extraPractice = Object.keys(practiceByLesson).filter((id) => !lessonIds.includes(id));

if (missingPractice.length || extraPractice.length) {
  throw new Error(`Practice map mismatch. Missing: ${missingPractice.join(", ") || "none"}. Extra: ${extraPractice.join(", ") || "none"}.`);
}

for (const module of modules) {
  for (const lesson of module.lessons) {
    Object.assign(lesson, practiceByLesson[lesson.id]);
  }
}

export const styles = [
  { id:"precision", name:"Precision Editorial", bg:"#11110f", fg:"#f2efe7", accent:"#ff5a36", secondary:"#9cad8c", display:"Helvetica Neue", body:"Iowan Old Style", motion:"Fast structural entries; decisive holds; editorial pushes", avoids:"Centered card grids, neon tech defaults, decorative motion" },
  { id:"soft", name:"Soft Signal", bg:"#efe9db", fg:"#292821", accent:"#c46f50", secondary:"#81967a", display:"Georgia", body:"Arial", motion:"Gentle reveals; warm drift; long breathing room", avoids:"Corporate chrome, frantic cuts, synthetic gradients" },
  { id:"swiss", name:"Swiss Pulse", bg:"#efefeb", fg:"#151515", accent:"#165dff", secondary:"#ffb000", display:"Helvetica Neue", body:"SFMono-Regular", motion:"Grid-locked snaps; counter changes; geometric transitions", avoids:"Floating decoratives, ornamental serif, elastic motion" },
  { id:"shadow", name:"Shadow Cut", bg:"#090909", fg:"#f5f4ef", accent:"#c1121f", secondary:"#51514d", display:"Helvetica Neue", body:"Iowan Old Style", motion:"Creeping push-ins; abrupt reveals; silence before impact", avoids:"Soft cards, pastel colors, constant ambient motion" },
];

export const officialExamples = [
  {
    id: "frame-md-launch",
    type: "Design system",
    title: "Frame.md storyboard launch",
    description: "See how frame.md becomes a composed launch story instead of a web layout on a timeline.",
    watchUrl: "https://hyperframes.dev/viewer/c5198458-4eaa-4933-a4e8-029c8010a845",
    sourceUrl: "https://github.com/heygen-com/hyperframes-launches/tree/main/frame-md-launch-storyboard",
  },
  {
    id: "figma-launch",
    type: "Product launch",
    title: "Figma integration launch",
    description: "Study how an existing interface language carries into framing, typography, and motion.",
    watchUrl: "https://hyperframes.dev/viewer/58fdce81-6ef0-4860-899d-d6b3da692a54",
    sourceUrl: "https://github.com/heygen-com/hyperframes-launches/tree/main/figma-launch",
  },
  {
    id: "pr-to-video",
    type: "Product story",
    title: "PR-to-video launch",
    description: "Trace a software change from problem and proof into a concise product narrative.",
    watchUrl: "https://hyperframes.dev/viewer/72c9b502-0c96-4bde-9a78-9a178267c475",
    sourceUrl: "https://github.com/heygen-com/hyperframes-launches/tree/main/pr-to-video-launch",
  },
  {
    id: "sfx-music",
    type: "Sound-led edit",
    title: "SFX + music launch",
    description: "Inspect a composition where sound, cuts, and graphic events share the same beat structure.",
    watchUrl: "https://hyperframes.dev/viewer/1adcf040-9df5-46b9-ab56-8e33795b5f84",
    sourceUrl: "https://github.com/heygen-com/hyperframes-launches/tree/main/sfx-music-launch",
  },
  {
    id: "timeline-launch",
    type: "Product tour",
    title: "Timeline editor launch",
    description: "Learn how interface evidence, local emphasis, and pacing turn a feature tour into a film.",
    watchUrl: "https://hyperframes.dev/viewer/105200be-ebda-4209-a225-a2edf01cf1b7",
    sourceUrl: "https://github.com/heygen-com/hyperframes-launches/tree/main/timeline-launch",
  },
  {
    id: "website-demo",
    type: "Full production",
    title: "Website → HyperFrames",
    description: "Remix a documented 41.8-second build with source, storyboard, voice, SFX, and captured clips.",
    watchUrl: "https://hyperframes.dev/viewer/85d2d8d5-bf5b-4d04-901d-7c3ae157a30a",
    sourceUrl: "https://github.com/heygen-com/website-to-hyperframes-demo",
  },
];

export const detectorChecks = [
  ["oneClaim", "The scene makes one clear claim", 18],
  ["hierarchy", "One element visibly leads the eye", 18],
  ["sequence", "Information arrives in a meaningful sequence", 16],
  ["evidence", "The visual proves or deepens the claim", 14],
  ["depth", "Foreground, subject, and background have distinct roles", 10],
  ["crop", "Cropping removes noise and creates tension", 8],
  ["restraint", "Motion stops when the idea needs room", 8],
  ["thumbnail", "The frame reads at thumbnail size", 8],
];

export const allLessons = modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title, moduleNumber: module.number, color: module.color })));
