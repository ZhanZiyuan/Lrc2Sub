"use client";

import { Download, FileText, Loader2, Upload, Wand2 } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { GitHubIcon } from "@/components/github-icon";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { convertLrcToSrt, encodeSrtContent } from "@/lib/lrc";

export default function Home() {
  const [lrcContent, setLrcContent] = useState("");
  const [srtContent, setSrtContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain" && !file.name.endsWith(".lrc")) {
      toast({
        variant: "destructive",
        title: t("invalidFileTitle"),
        description: t("invalidFileDescription"),
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setLrcContent(String(loadEvent.target?.result ?? ""));
      setSrtContent("");
      setFileName(file.name.replace(/\.lrc$/i, ""));
    };
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: t("fileReadErrorTitle"),
        description: t("fileReadErrorDescription"),
      });
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleConvert = async () => {
    if (!lrcContent) {
      toast({
        variant: "destructive",
        title: t("noContentTitle"),
        description: t("noContentDescription"),
      });
      return;
    }

    setIsConverting(true);
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const result = convertLrcToSrt(lrcContent);
      if (!result) throw new Error("Conversion returned empty data.");

      setSrtContent(result);
      toast({
        title: t("conversionSuccessfulTitle"),
        description: t("conversionSuccessfulDescription"),
      });
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        variant: "destructive",
        title: t("conversionFailedTitle"),
        description: t("conversionFailedDescription"),
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = (encoding: "utf-8" | "utf-8-bom") => {
    if (!srtContent) return;

    const content = encodeSrtContent(srtContent, encoding);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${fileName || "lyrics"}.srt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const displayText = srtContent || lrcContent;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <h1 className="font-headline text-xl font-semibold tracking-tight">
          {t("appTitle")}
        </h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/ZhanZiyuan/Lrc2Sub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("github")}
              title={t("github")}
            >
              <GitHubIcon aria-hidden="true" />
              <span className="sr-only">{t("github")}</span>
            </a>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <FileText className="h-6 w-6" />
              {t("converter")}
            </CardTitle>
            <CardDescription>{t("converterDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                aria-label={t("upload")}
              >
                <Upload className="mr-2" />
                {t("upload")}
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
                aria-label={t("convert")}
              >
                {isConverting ? (
                  <Loader2 className="mr-2 animate-spin" />
                ) : (
                  <Wand2 className="mr-2" />
                )}
                {isConverting ? t("converting") : t("convert")}
              </Button>
            </div>

            <Textarea
              placeholder={t("placeholder")}
              value={displayText}
              readOnly
              className="h-64 min-h-40 resize-y font-mono text-xs"
              aria-label={t("fileContent")}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={!srtContent}
                  className="w-full"
                  aria-label={t("downloadMenu")}
                >
                  <Download className="mr-2" />
                  {t("download")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
                align="center"
              >
                <DropdownMenuItem onSelect={() => handleDownload("utf-8")}>
                  UTF-8
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDownload("utf-8-bom")}>
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
