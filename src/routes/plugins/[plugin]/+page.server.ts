import { error } from "@sveltejs/kit";
import { marked } from "marked";

import { fetchPluginReadmes, fetchPlugins } from "#lib/server/data.ts";

import type { EntryGenerator } from "./$types";

// every plugin gets a page (including API plugins hidden from the list), like the original getStaticPaths
export const entries: EntryGenerator = async () =>
    (await fetchPlugins()).map(p => ({ plugin: p.name }));

export async function load({ params }) {
    const [plugins, readmes] = await Promise.all([fetchPlugins(), fetchPluginReadmes()]);

    const plugin = plugins.find(p => p.name === params.plugin);
    if (!plugin) error(404, "Plugin not found");

    const readme = readmes[plugin.name];

    // github asset links on their own line are videos
    const processedReadme = readme?.replace(
        new RegExp(String.raw`\n(https://github\.com/\S+/assets/\d+/[\w-]+)`, "g"),
        '\n<video controls><source src="$1" type="video/mp4"></video>\n'
    );

    const images = [...(readme?.matchAll(/!\[([^\]]*?)\]\((https:[^)]+?)\)/g) ?? [])]
        .slice(0, 10)
        .map(i => ({ description: i[1] || undefined, url: i[2] }));

    return {
        plugin,
        readmeHtml: processedReadme ? marked.parse(processedReadme, { async: false }) : null,
        images,
        dependents: plugins.filter(p => p.dependencies?.includes(plugin.name)).map(p => p.name)
    };
}
