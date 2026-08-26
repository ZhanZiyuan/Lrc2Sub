export const locales = ["en", "zh-CN", "zh-TW", "ja"] as const;

export type Locale = (typeof locales)[number];

const english = {
  appTitle: "Lyrics to Subtitles",
  converter: "Converter",
  converterDescription:
    "Upload an LRC file, convert it to SRT, and download the result.",
  upload: "Upload .lrc File",
  convert: "Convert",
  converting: "Converting...",
  placeholder:
    "Upload an .lrc file to see its content. After conversion, the .srt content will appear here.",
  download: "Download .srt File",
  invalidFileTitle: "Invalid File Type",
  invalidFileDescription: "Please upload a valid .lrc file.",
  fileReadErrorTitle: "File Read Error",
  fileReadErrorDescription: "There was an error reading the file.",
  noContentTitle: "No Content",
  noContentDescription: "Please upload an LRC file first.",
  conversionSuccessfulTitle: "Conversion Successful",
  conversionSuccessfulDescription: "LRC file has been converted to SRT format.",
  conversionFailedTitle: "Conversion Failed",
  conversionFailedDescription:
    "An error occurred during conversion. Please try again.",
  language: "Change language",
  themeToDark: "Switch to dark theme",
  themeToLight: "Switch to light theme",
  github: "View source code on GitHub",
  fileContent: "File content display",
  downloadMenu: "Download SRT file menu",
} as const;

type Dictionary = { [Key in keyof typeof english]: string };
export type MessageKey = keyof Dictionary;

export const dictionaries: Record<Locale, Dictionary> = {
  en: english,
  "zh-CN": {
    appTitle: "歌词转字幕",
    converter: "转换器",
    converterDescription: "上传 LRC 文件，将其转换为 SRT，并下载结果。",
    upload: "上传 .lrc 文件",
    convert: "转换",
    converting: "转换中...",
    placeholder:
      "上传 .lrc 文件后可在此查看内容；转换完成后，此处将显示 .srt 内容。",
    download: "下载 .srt 文件",
    invalidFileTitle: "文件类型无效",
    invalidFileDescription: "请上传有效的 .lrc 文件。",
    fileReadErrorTitle: "文件读取错误",
    fileReadErrorDescription: "读取文件时发生错误。",
    noContentTitle: "没有内容",
    noContentDescription: "请先上传 LRC 文件。",
    conversionSuccessfulTitle: "转换成功",
    conversionSuccessfulDescription: "LRC 文件已转换为 SRT 格式。",
    conversionFailedTitle: "转换失败",
    conversionFailedDescription: "转换时发生错误，请重试。",
    language: "切换语言",
    themeToDark: "切换到深色主题",
    themeToLight: "切换到浅色主题",
    github: "在 GitHub 上查看源代码",
    fileContent: "文件内容显示区域",
    downloadMenu: "SRT 文件下载菜单",
  },
  "zh-TW": {
    appTitle: "歌詞轉字幕",
    converter: "轉換器",
    converterDescription: "上傳 LRC 檔案，將其轉換為 SRT，並下載結果。",
    upload: "上傳 .lrc 檔案",
    convert: "轉換",
    converting: "轉換中...",
    placeholder:
      "上傳 .lrc 檔案後可在此查看內容；轉換完成後，此處將顯示 .srt 內容。",
    download: "下載 .srt 檔案",
    invalidFileTitle: "檔案類型無效",
    invalidFileDescription: "請上傳有效的 .lrc 檔案。",
    fileReadErrorTitle: "檔案讀取錯誤",
    fileReadErrorDescription: "讀取檔案時發生錯誤。",
    noContentTitle: "沒有內容",
    noContentDescription: "請先上傳 LRC 檔案。",
    conversionSuccessfulTitle: "轉換成功",
    conversionSuccessfulDescription: "LRC 檔案已轉換為 SRT 格式。",
    conversionFailedTitle: "轉換失敗",
    conversionFailedDescription: "轉換時發生錯誤，請重試。",
    language: "切換語言",
    themeToDark: "切換至深色主題",
    themeToLight: "切換至淺色主題",
    github: "在 GitHub 上檢視原始碼",
    fileContent: "檔案內容顯示區域",
    downloadMenu: "SRT 檔案下載選單",
  },
  ja: {
    appTitle: "歌詞を字幕に変換",
    converter: "変換ツール",
    converterDescription:
      "LRCファイルをアップロードしてSRTに変換し、結果をダウンロードします。",
    upload: ".lrcファイルをアップロード",
    convert: "変換",
    converting: "変換中...",
    placeholder:
      ".lrcファイルをアップロードすると内容が表示されます。変換後は.srtの内容がここに表示されます。",
    download: ".srtファイルをダウンロード",
    invalidFileTitle: "無効なファイル形式",
    invalidFileDescription: "有効な.lrcファイルをアップロードしてください。",
    fileReadErrorTitle: "ファイル読み込みエラー",
    fileReadErrorDescription: "ファイルの読み込み中にエラーが発生しました。",
    noContentTitle: "内容がありません",
    noContentDescription: "先にLRCファイルをアップロードしてください。",
    conversionSuccessfulTitle: "変換完了",
    conversionSuccessfulDescription: "LRCファイルをSRT形式に変換しました。",
    conversionFailedTitle: "変換失敗",
    conversionFailedDescription:
      "変換中にエラーが発生しました。もう一度お試しください。",
    language: "言語を変更",
    themeToDark: "ダークテーマに切り替え",
    themeToLight: "ライトテーマに切り替え",
    github: "GitHubでソースコードを表示",
    fileContent: "ファイル内容表示",
    downloadMenu: "SRTファイルのダウンロードメニュー",
  },
};

export const languageNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
};

export function isLocale(value: string | null): value is Locale {
  return locales.some((locale) => locale === value);
}

export function detectLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const normalized = language.toLowerCase();

    if (normalized.startsWith("ja")) return "ja";
    if (
      normalized.startsWith("zh-hant") ||
      normalized.startsWith("zh-tw") ||
      normalized.startsWith("zh-hk") ||
      normalized.startsWith("zh-mo")
    ) {
      return "zh-TW";
    }
    if (normalized.startsWith("zh")) return "zh-CN";
    if (normalized.startsWith("en")) return "en";
  }

  return "en";
}
