import { fetchListedPlugins } from "#lib/server/data.ts";

export async function load() {
    return { pluginCount: (await fetchListedPlugins()).length };
}
