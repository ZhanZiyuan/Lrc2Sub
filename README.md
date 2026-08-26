<p align="center">
    <img alt="logo" src="./src/app/icon.svg"
        width="138" />
</p>

# Lrc2Sub

<p align="right">
    <b>English</b> | <a href="./README_zh.md">简体中文</a>
</p>

[![GitHub deployments](https://img.shields.io/github/deployments/ZhanZiyuan/Lrc2Sub/Production)](https://github.com/ZhanZiyuan/Lrc2Sub/deployments)
[![GitHub last commit](https://img.shields.io/github/last-commit/ZhanZiyuan/Lrc2Sub)](https://github.com/ZhanZiyuan/Lrc2Sub/commits/main/)
[![GitHub License](https://img.shields.io/github/license/ZhanZiyuan/Lrc2Sub)](https://github.com/ZhanZiyuan/Lrc2Sub/blob/main/LICENSE)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ZhanZiyuan/Lrc2Sub/total)](https://github.com/ZhanZiyuan/Lrc2Sub/releases)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/lrc2sub)](https://lrc2sub.vercel.app/)

A simple and efficient web application to convert LRC lyric files into SRT subtitle files.
Built with modern web technologies for a smooth user experience.

## Features

- **Easy Conversion**: Upload your `.lrc` files and convert them to `.srt` format with a single click.
- **Instant Preview**: View the content of your LRC files and the converted SRT subtitles directly in the browser.
- **Encoding Support**: Download your SRT files in standard UTF-8 or UTF-8 with BOM (Byte Order Mark) for better compatibility with various players.
- **Privacy Focused**: All processing happens client-side. Your files are never uploaded to a server.
- **Multilingual**: Supports English, Simplified Chinese, Traditional Chinese, and Japanese, with automatic browser-language detection.
- **System-aware Theme**: Follows your device theme by default and supports instant light/dark switching.
- **Installable PWA**: Install the converter and keep using it offline after the first visit.
- **Modern UI**: Clean and responsive interface built with Shadcn/UI.

## Tech Stack

- [Next.js 16](https://nextjs.org/) and [React 19](https://react.dev/) - Application framework and UI runtime
- [TypeScript](https://www.typescriptlang.org/) - Strictly typed application code
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Re-usable components
- [Lucide React](https://lucide.dev/) - Icons
- [Biome](https://biomejs.dev/) - Formatting and linting

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ZhanZiyuan/Lrc2Sub.git
   cd Lrc2Sub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## License

This project is licensed under the GNU General Public License v3.0 (GPLv3). See the [LICENSE](./LICENSE) file for details.
