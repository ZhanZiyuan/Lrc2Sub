import { describe, expect, it } from "vitest";
import {
  convertLrcToSrt,
  encodeSrtContent,
  formatSrtTime,
  parseLrc,
  parseLrcTime,
} from "@/lib/lrc";

describe("LRC conversion", () => {
  it("parses centiseconds and milliseconds correctly", () => {
    expect(parseLrcTime("01", "02", "50")).toBe(62.5);
    expect(parseLrcTime("01", "02", "500")).toBe(62.5);
  });

  it("formats SRT timestamps", () => {
    expect(formatSrtTime(3_661.007)).toBe("01:01:01,007");
  });

  it("sorts timestamps and supports multiple timestamps per line", () => {
    expect(parseLrc("[00:03.00]Second\n[00:01.50][00:02.00]First")).toEqual([
      { time: 1.5, text: "First" },
      { time: 2, text: "First" },
      { time: 3, text: "Second" },
    ]);
  });

  it("converts LRC content and gives the final line a five-second duration", () => {
    expect(convertLrcToSrt("[00:01.00]Hello\n[00:03.250]World")).toBe(
      "1\n00:00:01,000 --> 00:00:03,250\nHello\n\n" +
        "2\n00:00:03,250 --> 00:00:08,250\nWorld\n",
    );
  });

  it("ignores metadata and blank lyric lines", () => {
    expect(convertLrcToSrt("[ar:Artist]\n[00:01.00]   ")).toBe("");
  });

  it("supports UTF-8 downloads with or without a byte-order mark", () => {
    expect(encodeSrtContent("subtitle", "utf-8")).toBe("subtitle");
    expect(encodeSrtContent("subtitle", "utf-8-bom")).toBe("\uFEFFsubtitle");
  });
});
