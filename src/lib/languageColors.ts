import colors from "./languageColors.json";

export function getLanguageColor(lang: string) {
    return (colors as Record<string, string>)[lang] || "#000000";
}
