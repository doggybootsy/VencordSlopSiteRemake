export const SITE = "https://vencord.dev";

export const DISCORD_INVITE = "https://discord.gg/D9uwnFnqmd";
export const GITHUB_URL = "https://github.com/Vendicated/Vencord";
export const SOURCE_CODE = "https://github.com/Vencord/vencord.dev";
export const VENCORD_CLOUD_SOURCE_CODE_URL = "https://github.com/Vencord/Vencloud";
export const SPONSOR_URL = "https://github.com/sponsors/Vendicated";

export const DOWNLOAD_BASE = "https://github.com/Vencord/Installer/releases/latest/download/";
export const DownloadFileNames = {
    linux: "VencordInstallerCli-linux",
    windows: "VencordInstaller.exe",
    windowsCli: "VencordInstallerCli.exe",
    macOS: "VencordInstaller.dmg"
};

export const PLUGINS_JSON_PATH = "repos/Vencord/builds/contents/plugins.json";
export const PLUGIN_READMES_JSON_PATH = "repos/Vencord/builds/contents/plugin-readmes.json";

export const CHROME_WEBSTORE_URL =
    "https://chrome.google.com/webstore/detail/vencord-web/cbghhgpcnddeihccjmnadmkaejncjndb";
export const USERSCRIPT_URL = "https://raw.githubusercontent.com/Vencord/builds/main/Vencord.user.js";

export const NAV_LINKS = [
    { href: "/download", label: "Download" },
    { href: "/plugins", label: "Plugins" },
    { href: "/support", label: "Support & FAQ" },
    { href: "/cloud", label: "Cloud" }
] as const;
