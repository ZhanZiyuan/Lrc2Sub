import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/components/language-provider";
import { PwaRegister } from "@/components/pwa-register";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lyrics to Subtitles",
  description: "Convert LRC lyric files to SRT subtitle files with ease.",
  applicationName: "Lyrics to Subtitles",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lyrics to Subtitles",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f0f0" },
    { media: "(prefers-color-scheme: dark)", color: "#242426" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider storageKey="lyrics-converter-theme">
          <LanguageProvider>
            {children}
            <Toaster />
            <PwaRegister />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
