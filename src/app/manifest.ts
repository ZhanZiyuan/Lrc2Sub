import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lyrics to Subtitles",
    short_name: "Lrc2Sub",
    description: "Convert LRC lyric files to SRT subtitle files with ease.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0f0f0",
    theme_color: "#7070f5",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
