"use client";

import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? t("themeToLight") : t("themeToDark");

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      <Moon aria-hidden="true" className="dark:hidden" />
      <Sun aria-hidden="true" className="hidden dark:block" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
