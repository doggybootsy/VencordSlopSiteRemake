<script lang="ts">
    import { page } from "$app/state";
    import Icon from "#lib/components/Icon.svelte";
    import type { IconName } from "#lib/components/icons.ts";
    import Seo from "#lib/components/Seo.svelte";
    import { GITHUB_URL, SITE } from "#lib/constants.ts";
    import { ButtonStyle, ComponentType, EMBED_ACCENT, SeparatorSpacingSize } from "#lib/discordComponents.ts";
    import { humanFriendlyJoin } from "#lib/text.ts";
    import { getPluginTraits } from "#lib/traits.ts";
    import type { Trait } from "#lib/types.ts";

    const { data } = $props();
    const p = $derived(data.plugin);

    const traits = $derived(getPluginTraits(p));
    const sourceUrl = $derived(`${GITHUB_URL}/tree/main/src/plugins/${p.filePath}`);
    const byline = $derived(humanFriendlyJoin(p.authors, a => a.name));

    const traitIcons: Record<Trait["id"], IconName> = {
        required: "asterisk",
        default: "plug",
        commands: "terminal",
        desktop: "desktop",
        web: "globe",
        dev: "code"
    };

    const component = $derived({
        type: ComponentType.Container,
        accent_color: EMBED_ACCENT,
        components: [
            { type: ComponentType.TextDisplay, content: `## ${p.name}\n${p.description}` },
            ...(data.images.length
                ? [{ type: ComponentType.MediaGallery, items: data.images.map(({ description, url }) => ({ media: { url }, description })) }]
                : []),
            { type: ComponentType.Separator, spacing: SeparatorSpacingSize.Large },
            ...(traits.length ? [{ type: ComponentType.TextDisplay, content: traits.map(t => `${t.emoji} ${t.name}`).join("\n") }] : []),
            { type: ComponentType.TextDisplay, content: `-# Made by ${byline}` },
            {
                type: ComponentType.ActionRow,
                components: [
                    { type: ComponentType.Button, style: ButtonStyle.Link, url: new URL(page.url.pathname, SITE).toString(), label: "View Website" },
                    { type: ComponentType.Button, style: ButtonStyle.Link, url: sourceUrl, label: "View Source Code" }
                ]
            }
        ]
    });
</script>

<Seo
    title={p.name}
    description={p.description}
    breadcrumbs={[
        ["Plugins", "/plugins"],
        [p.name, "/plugins/" + p.name]
    ]}
    {component}
/>

<header class="addon-header">
    <div class="page-section-inner">
        <a class="back" href="/plugins">
            <Icon name="arrowRight" size={16} class="back-icon" />
            All plugins
        </a>
        <div class="addon-header-row">
            <div class="addon-icon" aria-hidden="true">{p.name[0]}</div>
            <div class="addon-heading">
                <h1 class="title">{p.name}</h1>
                <p class="title-description">by {byline}</p>
            </div>
            <div class="btn-container addon-actions">
                <a class="btn btn-secondary btn-lg" href={sourceUrl}>
                    <Icon name="github" />
                    View Source Code
                </a>
                <a class="btn btn-primary btn-lg" href="/download">
                    <Icon name="download" />
                    Get Vencord
                </a>
            </div>
        </div>
    </div>
</header>

<section class="page-section">
    <div class="page-section-inner addon-layout">
        <div class="addon-main">
            <article class="panel readme prose">
                {#if data.readmeHtml}
                    {@html data.readmeHtml}
                {:else}
                    <p>{p.description}</p>
                {/if}
            </article>

            <div class="panel install">
                <h2 class="section-heading">Installation</h2>
                <p>
                    To enable {p.name}, first <a href="/download">install Vencord</a> if you haven't already done so. Then
                    open the Plugins section in settings, search for {p.name}, and enable it.
                </p>
            </div>
        </div>

        <aside class="addon-sidebar">
            <div class="panel info">
                <h2 class="info-heading">Information</h2>

                <dl>
                    <dt>{p.authors.length === 1 ? "Author" : "Authors"}</dt>
                    <dd>{byline}</dd>

                    {#if traits.length}
                        <dt>Details</dt>
                        <dd>
                            <ul class="traits">
                                {#each traits as t}
                                    <li><Icon name={traitIcons[t.id]} size={16} /> {t.label}</li>
                                {/each}
                            </ul>
                        </dd>
                    {/if}

                    {#if p.tags.length}
                        <dt>Tags</dt>
                        <dd class="tags">
                            {#each p.tags as tag}
                                <a class="tag" href={`/plugins#${encodeURIComponent(tag)}`}>{tag}</a>
                            {/each}
                        </dd>
                    {/if}

                    {#if p.dependencies?.length}
                        <dt>Depends on</dt>
                        <dd>{p.dependencies.join(", ")}</dd>
                    {/if}

                    {#if data.dependents.length}
                        <dt>Required by</dt>
                        <dd class="tags">
                            {#each data.dependents as d}
                                <a class="tag" href={`/plugins/${encodeURIComponent(d)}`}>{d}</a>
                            {/each}
                        </dd>
                    {/if}

                    <dt>Source</dt>
                    <dd><a href={sourceUrl}>src/plugins/{p.filePath}</a></dd>
                </dl>
            </div>
        </aside>
    </div>
</section>

<style>
    .addon-header {
        padding: 32px 0 40px;
        background-image: radial-gradient(circle at top center, var(--bg3), var(--bg2) 70%);
        border-bottom: 1px solid var(--border-subtle);
    }

    .back {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--text-muted);
        font-size: 14px;
        margin-bottom: 20px;
    }

    .back:hover {
        color: var(--text-light);
        text-decoration: none;
    }

    .back :global(.back-icon) {
        transform: rotate(180deg);
    }

    .addon-header-row {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .addon-icon {
        width: 72px;
        height: 72px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--accent), var(--accent-hover));
        color: #fff;
        font-size: 32px;
        font-weight: 700;
        box-shadow: var(--shadow-card);
    }

    .addon-heading {
        flex: 1;
        min-width: 0;
    }

    .addon-heading .title {
        font-size: 40px;
        overflow-wrap: anywhere;
    }

    .addon-heading .title-description {
        margin: 0;
    }

    .addon-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 300px;
        gap: 24px;
        align-items: start;
    }

    .addon-main {
        display: flex;
        flex-direction: column;
        gap: 24px;
        min-width: 0;
    }

    .readme,
    .install {
        padding: 28px 32px;
    }

    .install p {
        margin: 0;
    }

    .info {
        position: sticky;
        top: calc(var(--nav-height) + 24px);
        padding: 20px;
    }

    .info-heading {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--text-muted);
        margin-bottom: 12px;
    }

    dl {
        margin: 0;
    }

    dt {
        color: var(--text-light);
        font-size: 14px;
        font-weight: 600;
        margin-top: 16px;
    }

    dt:first-child {
        margin-top: 0;
    }

    dd {
        margin: 4px 0 0;
        font-size: 14px;
        color: var(--text-normal);
        overflow-wrap: anywhere;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 8px;
    }

    .tags .tag:hover {
        border-color: var(--border-strong);
        text-decoration: none;
    }

    .traits {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .traits li {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 6px;
    }

    .traits :global(svg) {
        color: var(--accent);
    }

    @media screen and (max-width: 950px) {
        .addon-layout {
            grid-template-columns: 1fr;
        }

        .info {
            position: static;
        }

        .addon-actions {
            width: 100%;
        }

        .readme,
        .install {
            padding: 20px;
        }

        .addon-heading .title {
            font-size: 32px;
        }
    }
</style>
