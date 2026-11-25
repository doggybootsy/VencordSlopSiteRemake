import vesktopVersion from "./vesktopVersion.txt?raw";

const v = vesktopVersion.trim();
const vesktop = (file: string) => `https://github.com/Vencord/Vesktop/releases/download/v${v}/${file}`;

export const Redirects: Record<string, string> = {
    "/vesktop": "https://vesktop.dev",
    "/github": "https://github.com/Vendicated/Vencord",
    "/discord": "https://discord.gg/D9uwnFnqmd",
    "/twitter": "https://x.com/vencordapp",
    "/x": "https://x.com/vencordapp",
    "/install": "/download",
    "/faq": "/support",
    "/plugins.json": "https://raw.githubusercontent.com/Vencord/builds/main/plugins.json",
    "/plugin-readmes.json": "https://raw.githubusercontent.com/Vencord/builds/main/plugin-readmes.json",
    "/donate": "https://github.com/sponsors/Vendicated",
    "/click-to-help/vencord": "https://github.com/sponsors/Vendicated",
    "/docs/plugin-requests": "https://discord.com/channels/1015060230222131221/1539309279519973386",

    "/download/vesktop/universal/windows": vesktop(`Vesktop-Setup-${v}.exe`),
    "/download/vesktop/amd64/windows-portable": vesktop(`Vesktop-${v}-win.zip`),
    "/download/vesktop/arm64/windows-portable": vesktop(`Vesktop-${v}-arm64-win.zip`),
    "/download/vesktop/universal/dmg": vesktop(`Vesktop-${v}-universal.dmg`),
    "/download/vesktop/amd64/tar": vesktop(`vesktop-${v}.tar.gz`),
    "/download/vesktop/amd64/rpm": vesktop(`vesktop-${v}.x86_64.rpm`),
    "/download/vesktop/amd64/deb": vesktop(`vesktop_${v}_amd64.deb`),
    "/download/vesktop/amd64/appimage": vesktop(`Vesktop-${v}.AppImage`),
    "/download/vesktop/arm64/dmg": vesktop(`Vesktop-${v}-arm64.dmg`),
    "/download/vesktop/arm64/appimage": vesktop(`Vesktop-${v}-arm64.AppImage`),
    "/download/vesktop/arm64/tar": vesktop(`vesktop-${v}-arm64.tar.gz`),
    "/download/vesktop/arm64/deb": vesktop(`vesktop_${v}_arm64.deb`),
    "/download/vesktop/arm64/rpm": vesktop(`vesktop-${v}.aarch64.rpm`)
};
