<p align="center">
    <img alt="logo" src="./src/app/icon.svg"
        width="138" />
</p>

# Lrc2Sub

<p align="right">
    <a href="./README.md">English</a> | <b>简体中文</b>
</p>

[![GitHub deployments](https://img.shields.io/github/deployments/ZhanZiyuan/Lrc2Sub/Production)](https://github.com/ZhanZiyuan/Lrc2Sub/deployments)
[![GitHub last commit](https://img.shields.io/github/last-commit/ZhanZiyuan/Lrc2Sub)](https://github.com/ZhanZiyuan/Lrc2Sub/commits/main/)
[![GitHub License](https://img.shields.io/github/license/ZhanZiyuan/Lrc2Sub)](https://github.com/ZhanZiyuan/Lrc2Sub/blob/main/LICENSE)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ZhanZiyuan/Lrc2Sub/total)](https://github.com/ZhanZiyuan/Lrc2Sub/releases)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/lrc2sub)](https://lrc2sub.vercel.app/)

一个简单高效的Web应用程序，用于将LRC歌词文件转换为SRT字幕文件。
基于现代Web技术构建，提供流畅的用户体验。

## 功能特点

- **轻松转换**：上传您的`.lrc`文件，一键转换为`.srt`格式。
- **即时预览**：直接在浏览器中查看LRC文件内容和转换后的SRT字幕。
- **编码支持**：支持下载标准UTF-8或带BOM（字节顺序标记）的UTF-8格式SRT文件，以更好地兼容各种播放器。
- **隐私保护**：所有处理均在客户端进行。您的文件永远不会上传到服务器。
- **多语言支持**：支持 English、简体中文、繁體中文和日本語，并自动识别浏览器语言。
- **跟随系统主题**：默认跟随设备主题，并可随时切换浅色/深色模式。
- **可安装 PWA**：可将转换器安装到设备，并在首次访问后离线使用。
- **现代界面**：使用 Shadcn/UI 构建的简洁响应式界面。

## 技术栈

- [Next.js 16](https://nextjs.org/) 与 [React 19](https://react.dev/) - 应用框架与 UI 运行时
- [TypeScript](https://www.typescriptlang.org/) - 严格类型的应用代码
- [Tailwind CSS v4](https://tailwindcss.com/) - 原子化CSS框架
- [Shadcn/UI](https://ui.shadcn.com/) - 可重用组件库
- [Lucide React](https://lucide.dev/) - 图标库
- [Biome](https://biomejs.dev/) - 代码格式化与检查

## 快速开始

### 前置要求

确保您的系统中已安装Node.js。

### 安装步骤

1. 克隆仓库：

   ```bash
   git clone https://github.com/ZhanZiyuan/Lrc2Sub.git
   cd Lrc2Sub
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 运行开发服务器：

   ```bash
   npm run dev
   ```

4. 在浏览器中打开 [http://localhost:9002](http://localhost:9002) 查看结果。

## 许可证

本项目采用GNU General Public License v3.0（GPLv3）许可。详情请参阅[LICENSE](./LICENSE)文件。
