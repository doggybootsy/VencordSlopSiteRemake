import { PLUGIN_READMES_JSON_PATH, PLUGINS_JSON_PATH } from "#lib/constants.ts";
import type { PluginData } from "#lib/types.ts";

import { fetchGithubFileJson } from "./github";

let pluginsPromise: Promise<PluginData[]> | undefined;
let readmesPromise: Promise<Record<string, string | undefined>> | undefined;

// memoised so prerendering ~200 plugin pages only downloads the data once
export function fetchPlugins() {
    return (pluginsPromise ??= fetchGithubFileJson<PluginData[]>(PLUGINS_JSON_PATH));
}

export function fetchPluginReadmes() {
    return (readmesPromise ??= fetchGithubFileJson<Record<string, string | undefined>>(PLUGIN_READMES_JSON_PATH));
}

/** Plugins shown in the public list (API plugins are hidden), sorted by name */
export async function fetchListedPlugins() {
    return (await fetchPlugins())
        .filter(p => !p.name.endsWith("API"))
        .sort((a, b) => a.name.localeCompare(b.name));
}
