// Subset of discord-api-types/v10 enums used for the site's Discord component embeds
export const ComponentType = {
    ActionRow: 1,
    Button: 2,
    Section: 9,
    TextDisplay: 10,
    MediaGallery: 12,
    Separator: 14,
    Container: 17
} as const;

export const ButtonStyle = { Link: 5 } as const;
export const SeparatorSpacingSize = { Small: 1, Large: 2 } as const;

/** Vencord pink, used as the embed accent colour */
export const EMBED_ACCENT = 14446451;

export type DiscordComponent = Record<string, unknown>;
