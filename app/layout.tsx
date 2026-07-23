import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3001";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol ?? (host.startsWith("localhost") ? "http" : "https");
  const canonical = `${protocol}://${host}`;

  return {
    metadataBase: new URL(canonical),
    title: "Hypercourse — Make videos with rhythm, depth, and intent",
    description:
      "Learn HyperFrames locally through 47 hands-on lessons, including HeyGen’s published release workflows through Day 17.",
    alternates: { canonical },
    icons: { icon: "/favicon.svg" },
    openGraph: {
      type: "website",
      url: canonical,
      title: "Hypercourse — Make videos with rhythm, depth, and intent",
      description:
        "Build launch films, product walkthroughs, motion graphics, data stories, music-led edits, and the newest HyperFrames workflows.",
      images: [`${canonical}/og.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: "Hypercourse — Make videos with rhythm, depth, and intent",
      description: "Learn HyperFrames locally through 47 hands-on, current lessons.",
      images: [`${canonical}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/course/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
