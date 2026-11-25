<script lang="ts">
    import Icon from "#lib/components/Icon.svelte";
    import type { IconName } from "#lib/components/icons.ts";
    import { GITHUB_URL } from "#lib/constants.ts";
    import { getPluginTraits } from "#lib/traits.ts";
    import type { PluginData, Trait } from "#lib/types.ts";

    interface Props {
        plugin: PluginData;
        thumbnail?: string;
        highlight: (text: string) => string;
    }

    const { plugin: p, thumbnail, highlight }: Props = $props();

    const traitIcons: Record<Trait["id"], IconName> = {
        required: "asterisk",
        default: "plug",
        commands: "terminal",
        desktop: "desktop",
        web: "globe",
        dev: "code"
    };

    // badge in the thumbnail corner, like betterdiscord.app's "Updated" / "New" badges
    const badge = $derived(p.required ? "Required" : p.enabledByDefault ? "Default" : null);
    // required / default are already shown by the badge
    const stats = $derived(getPluginTraits(p).filter(t => t.id !== "required" && t.id !== "default"));

    const href = $derived(`/plugins/${encodeURIComponent(p.name)}`);
    const sourceUrl = $derived(`${GITHUB_URL}/tree/main/src/plugins/${p.filePath}`);
    const authors = $derived(p.authors.map(a => a.name).join(", "));

    let imageFailed = $state(false);
</script>

<article class="card">
    {#if badge}
        <span class="addon-badge" class:required={p.required}>{badge}</span>
    {/if}

    {#if thumbnail && !imageFailed}
        <img class="card-image" src={thumbnail} alt="" loading="lazy" referrerpolicy="no-referrer" onerror={() => (imageFailed = true)} />
    {:else}
        <div class="card-image placeholder" aria-hidden="true">
            <Icon name="plug" size={56} />
        </div>
    {/if}

    <div class="card-body">
        <h3 class="card-title" title={p.name}>
            <a {href} class="stretched">{@html highlight(p.name)}</a>
        </h3>
        <p class="card-subtext" title={authors}>by {@html highlight(authors)}</p>
        <p class="card-description" title={p.description}>{@html highlight(p.description)}</p>

        {#if p.tags.length}
            <div class="addon-tags">
                {#each p.tags as tag}
                    <span class="addon-tag">{@html highlight(tag)}</span>
                {/each}
            </div>
        {/if}

        <div class="card-footer">
            <a class="btn btn-primary card-button" href={sourceUrl}>
                <Icon name="github" size={16} />
                Source
            </a>
            <div class="card-stats">
                {#each stats as t}
                    <span class="card-stat" title={t.name}>
                        <Icon name={traitIcons[t.id]} size={16} />
                        <span>{t.label.replace(" only", "")}</span>
                    </span>
                {/each}
            </div>
        </div>
    </div>
</article>

<style>
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        background-color: var(--bg3);
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 2px 10px #00000040;
        transition: 0.15s ease;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .card:focus-within {
        transform: translateY(-5px);
        box-shadow: 0 0 0 4px var(--accent-faded);
    }

    .addon-badge {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 1;
        font-size: 12px;
        color: #fff;
        font-weight: 500;
        padding: 2px 6px;
        background: var(--accent);
        border-radius: 50px;
        border: 2px solid rgba(255, 255, 255, 0.1);
        text-transform: uppercase;
        user-select: none;
    }

    .addon-badge.required {
        background: var(--danger);
    }

    .card-image {
        display: block;
        width: 100%;
        height: 184px;
        object-fit: cover;
        object-position: top;
        background-color: var(--bg4);
        -webkit-user-drag: none;
    }

    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        opacity: 0.6;
        background-image: radial-gradient(circle at center, var(--bg3-alt), var(--bg4) 70%);
    }

    .card-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        min-width: 0;
    }

    .card-title {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-light);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .card-title a {
        color: inherit;
        font-weight: inherit;
    }

    .card-title a:hover {
        text-decoration: none;
    }

    .card-title a:focus-visible {
        box-shadow: none !important;
    }

    /* the whole card opens the plugin page through the title link */
    .stretched::after {
        content: "";
        position: absolute;
        inset: 0;
    }

    .card-subtext {
        margin: 0;
        color: var(--text-muted);
        font-weight: 500;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .card-description {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--text-muted);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .addon-tags {
        display: flex;
        flex-wrap: nowrap;
        gap: 5px;
        margin: 5px 0;
        overflow: hidden;
        /* fade out tags that don't fit instead of hard-clipping them */
        mask-image: linear-gradient(to right, #000 85%, transparent);
    }

    .addon-tag {
        font-size: 12px;
        color: var(--text-normal);
        font-weight: 500;
        padding: 2px 6px;
        background: var(--bg2);
        border-radius: 50px;
        border: 2px solid var(--border);
        white-space: nowrap;
        user-select: none;
    }

    .card-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
        gap: 8px;
        margin-top: auto;
        padding-top: 10px;
    }

    /* sits above the stretched title link so it stays clickable */
    .card-button {
        position: relative;
        z-index: 1;
    }

    .card-stats {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .card-stat {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: flex-end;
        gap: 5px;
        margin-left: 10px;
        color: var(--text-normal);
        font-size: 14px;
        font-weight: 500;
        line-height: normal;
    }

    .card-stat :global(svg) {
        color: var(--text-muted);
    }
</style>
