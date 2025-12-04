"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Download, Upload, Loader2, FileText, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon } from "@/components/github-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function parseLrcTime(time: string) {
  const parts = time.split(/[:.]/);
  const m = parseInt(parts[0], 10);
  const s = parseInt(parts[1], 10);
  const cs = parseInt(parts[2], 10);
  return m * 60 + s + cs / 100;
}

function formatSrtTime(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.round((timeInSeconds - Math.floor(timeInSeconds)) * 1000);

  const pad = (num: number, size = 2) => num.toString().padStart(size, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)},${pad(milliseconds, 3)}`;
}

function convertLrcToSrt(lrcContent: string): string {
  const lines = lrcContent.split('\n');
  const lyrics = [];
  const timeRegex = /\[(\d{2}:\d{2}\.\d{2,3})\]/g;

  for (const line of lines) {
    const matches = [...line.matchAll(timeRegex)];
    if (matches.length > 0) {
      const text = line.replace(timeRegex, '').trim();
      if (text) {
        for (const match of matches) {
          lyrics.push({ time: parseLrcTime(match[1]), text });
        }
      }
    }
  }

  lyrics.sort((a, b) => a.time - b.time);

  let srtData = "";
  for (let i = 0; i < lyrics.length; i++) {
    const startTime = lyrics[i].time;
    const endTime = i + 1 < lyrics.length ? lyrics[i + 1].time : startTime + 5; // Default 5s duration if it's the last line

    srtData += `${i + 1}\n`;
    srtData += `${formatSrtTime(startTime)} --> ${formatSrtTime(endTime)}\n`;
    srtData += `${lyrics[i].text}\n\n`;
  }

  return srtData;
}


export default function Home() {
  const [lrcContent, setLrcContent] = useState<string>("");
  const [srtContent, setSrtContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/plain" && !file.name.endsWith(".lrc")) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a valid .lrc file.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setLrcContent(text);
        setSrtContent(""); // Reset srt content on new file upload
        setFileName(file.name.replace(/\.lrc$/, ""));
      };
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: "There was an error reading the file.",
        });
      };
      reader.readAsText(file, "UTF-8");
    }
  };

  const handleConvert = async () => {
    if (!lrcContent) {
      toast({
        variant: "destructive",
        title: "No Content",
        description: "Please upload an LRC file first.",
      });
      return;
    }

    setIsConverting(true);
    // Use a short timeout to allow the UI to update to the loading state
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const result = convertLrcToSrt(lrcContent);
      if (result) {
        setSrtContent(result);
        toast({
          title: "Conversion Successful",
          description: "LRC file has been converted to SRT format.",
        });
      } else {
        throw new Error("Conversion returned empty data.");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description:
          "An error occurred during conversion. Please try again.",
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = (encoding: "utf-8" | "utf-8-bom") => {
    if (!srtContent) return;

    let content = srtContent;
    let mimeType = "text/plain;charset=utf-8";
    if (encoding === "utf-8-bom") {
      content = "\uFEFF" + content;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "lyrics"}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const displayText = srtContent || lrcContent;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <h1 className="text-xl font-semibold tracking-tight font-headline">
          Lyrics to Subtitles
        </h1>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ZhanZiyuan/Lrc2Sub"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            <GitHubIcon />
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
              <FileText className="h-6 w-6" />
              Converter
            </CardTitle>
            <CardDescription>
              Upload an LRC file, convert it to SRT, and download the result.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                onClick={handleUploadClick}
                className="w-full"
                aria-label="Upload LRC file"
              >
                <Upload className="mr-2" />
                Upload .lrc File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".lrc,text/plain"
                className="hidden"
              />

              <Button
                onClick={handleConvert}
                disabled={!lrcContent || isConverting}
                className="w-full"
                aria-label="Convert to SRT"
              >
                {isConverting ? (
                  <Loader2 className="mr-2 animate-spin" />
                ) : (
                  <Wand2 className="mr-2" />
                )}
                {isConverting ? "Converting..." : "Convert"}
              </Button>
            </div>

            <Textarea
              placeholder={
                "Upload an .lrc file to see its content. After conversion, the .srt content will appear here."
              }
              value={displayText}
              readOnly
              className="h-64 min-h-[10rem] resize-y font-mono text-xs"
              aria-label="File content display"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={!srtContent}
                  className="w-full"
                  aria-label="Download SRT file menu"
                >
                  <Download className="mr-2" />
                  Download .srt File
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="center">
                <DropdownMenuItem onSelect={() => handleDownload("utf-8")}>
                  UTF-8
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => handleDownload("utf-8-bom")}
                >
                  UTF-8 with BOM
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}
