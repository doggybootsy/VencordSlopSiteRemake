import type { PluginData, Trait } from "./types";

export function getPluginTraits(plugin: PluginData): Trait[] {
    const defs: (Trait & { show: boolean })[] = [
        {
            id: "required",
            label: "Required",
            emoji: "<:plugin_required:1414078629528211547>",
            name: "This plugin is required",
            show: plugin.required
        },
        {
            id: "default",
            label: "Enabled by default",
            emoji: "<:plugin_default_enabled:1414078625493418025>",
            name: "This plugin is enabled by default",
            show: plugin.enabledByDefault
        },
        {
            id: "commands",
            label: "Commands",
            emoji: "<:plugin_commands:1414078623803117680>",
            name: "This plugin has chat commands",
            show: plugin.hasCommands
        },
        {
            id: "desktop",
            label: "Desktop only",
            emoji: "<:plugin_desktop:1414078626676342784>",
            name: "This plugin is desktop only",
            show: plugin.target === "desktop"
        },
        {
            id: "desktop",
            label: "Discord Desktop only",
            emoji: "<:plugin_desktop:1414078626676342784>",
            name: "This plugin is discord desktop only",
            show: plugin.target === "discordDesktop"
        },
        {
            id: "web",
            label: "Web only",
            emoji: "<:plugin_web:1414078630535102534>",
            name: "This plugin is web only",
            show: plugin.target === "web"
        },
        {
            id: "dev",
            label: "Dev build only",
            emoji: "<:plugin_dev:1414078627514945536>",
            name: "This plugin is development build only",
            show: plugin.target === "dev"
        }
    ];

    return defs.filter(d => d.show).map(({ show, ...t }) => t);
}
