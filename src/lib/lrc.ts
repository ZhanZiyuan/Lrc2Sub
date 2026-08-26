export type LyricLine = {
  time: number;
  text: string;
};

const TIME_PATTERN = /\[(\d{1,3}):(\d{2})[.:](\d{1,3})\]/g;

function parseFraction(fraction: string): number {
  return Number(fraction.padEnd(3, "0").slice(0, 3)) / 1000;
}

export function parseLrcTime(
  minutes: string,
  seconds: string,
  fraction: string,
): number {
  return Number(minutes) * 60 + Number(seconds) + parseFraction(fraction);
}

export function formatSrtTime(timeInSeconds: number): string {
  const totalMilliseconds = Math.round(timeInSeconds * 1000);
  const hours = Math.floor(totalMilliseconds / 3_600_000);
  const minutes = Math.floor((totalMilliseconds % 3_600_000) / 60_000);
  const seconds = Math.floor((totalMilliseconds % 60_000) / 1000);
  const milliseconds = totalMilliseconds % 1000;
  const pad = (value: number, length = 2) =>
    value.toString().padStart(length, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)},${pad(milliseconds, 3)}`;
}

export function parseLrc(content: string): LyricLine[] {
  const lyrics: LyricLine[] = [];

  for (const line of content.split(/\r?\n/)) {
    const matches = [...line.matchAll(TIME_PATTERN)];
    const text = line.replace(TIME_PATTERN, "").trim();

    if (!text) continue;

    for (const match of matches) {
      lyrics.push({
        time: parseLrcTime(match[1], match[2], match[3]),
        text,
      });
    }
  }

  return lyrics.sort((first, second) => first.time - second.time);
}

export function convertLrcToSrt(content: string): string {
  const lyrics = parseLrc(content);

  return lyrics
    .map((line, index) => {
      const nextLine = lyrics[index + 1];
      const endTime = nextLine ? nextLine.time : line.time + 5;

      return `${index + 1}\n${formatSrtTime(line.time)} --> ${formatSrtTime(endTime)}\n${line.text}\n`;
    })
    .join("\n");
}

export function encodeSrtContent(
  content: string,
  encoding: "utf-8" | "utf-8-bom",
): string {
  return encoding === "utf-8-bom" ? `\uFEFF${content}` : content;
}
