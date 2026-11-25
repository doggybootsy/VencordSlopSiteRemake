import { fetchListedPlugins, fetchPluginReadmes } from "#lib/server/data.ts";

export async function load() {
    const [plugins, readmes] = await Promise.all([fetchListedPlugins(), fetchPluginReadmes()]);

    // the first screenshot in a plugin's readme becomes its card thumbnail, like betterdiscord.app's addon cards
    const thumbnails: Record<string, string> = {};
    for (const p of plugins) {
        const url = readmes[p.name]?.match(/!\[[^\]]*?\]\((https:[^)\s]+)/)?.[1];
        if (url) thumbnails[p.name] = url;
    }

    return { plugins, thumbnails };
}
