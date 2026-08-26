import { describe, expect, it } from "vitest";
import { detectLocale, dictionaries, locales } from "@/lib/i18n";

describe("localization", () => {
  it.each([
    [["zh-TW"], "zh-TW"],
    [["zh-HK"], "zh-TW"],
    [["zh-CN"], "zh-CN"],
    [["ja-JP"], "ja"],
    [["en-US"], "en"],
    [["fr-FR", "ja-JP"], "ja"],
  ] as const)("detects %j as %s", (languages, expected) => {
    expect(detectLocale(languages)).toBe(expected);
  });

  it("falls back to English for unsupported languages", () => {
    expect(detectLocale(["fr-FR"])).toBe("en");
  });

  it("provides every message in all supported languages", () => {
    const keys = Object.keys(dictionaries.en).sort();

    for (const locale of locales) {
      expect(Object.keys(dictionaries[locale]).sort()).toEqual(keys);
    }
  });
});
