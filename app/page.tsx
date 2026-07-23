"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (document.getElementById("hypercourse-app-script")) return;

    const script = document.createElement("script");
    script.id = "hypercourse-app-script";
    script.type = "module";
    script.src = "/course/app.js";
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <a className="skip-link" href="#lesson-main">
        Skip to course content
      </a>
      <div id="app" />
      <div id="toast" className="toast" role="status" aria-live="polite" />
    </>
  );
}
