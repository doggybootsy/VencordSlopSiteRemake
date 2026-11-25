<script lang="ts">
    import Icon from "#lib/components/Icon.svelte";
    import PageHeader from "#lib/components/PageHeader.svelte";
    import Seo from "#lib/components/Seo.svelte";
    import { getLanguageColor } from "#lib/languageColors.ts";
    import { formatCount } from "#lib/text.ts";

    const { data } = $props();
</script>

<Seo title="Source Code" description="List of Source Code repositories for all Vencord projects" />

<PageHeader title="Source Code" description="Vencord's git repositories" />

<section class="page-section">
    <div class="page-section-inner repo-grid">
        {#each data.repos as r}
            <a class="repo-card" href={r.url}>
                <div class="repo-owner">
                    {#if r.avatar}<img src={r.avatar} alt="" width="20" height="20" />{/if}
                    <span>{r.owner}</span>
                    <Icon name="external" size={16} class="external" title="Open Externally" />
                </div>
                <h2>{r.name}</h2>
                <p>{r.description}</p>
                <div class="repo-info">
                    {#if r.language}
                        <span class="language" style={`--lang-color: ${getLanguageColor(r.language)}`}>{r.language}</span>
                    {/if}
                    {#if r.stars !== null}
                        <span class="stars"><Icon name="star" size={16} title="stars" /> {formatCount(r.stars)}</span>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</section>

<style>
    .repo-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
    }

    .repo-card {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background: var(--bg3);
        border: 1px solid var(--bg4);
        border-radius: 8px;
        color: var(--text-normal);
        font-weight: 400;
        transition:
            0.15s ease border-color,
            0.15s ease transform,
            0.15s ease box-shadow;
    }

    .repo-card:hover {
        text-decoration: none;
        border-color: var(--border-strong);
        box-shadow: var(--shadow-card);
        transform: translateY(-2px);
    }

    .repo-owner {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-muted);
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 14px;
    }

    .repo-owner img {
        border-radius: 50%;
    }

    .repo-owner :global(.external) {
        margin-left: auto;
        transition: 0.15s ease color;
    }

    .repo-card:hover .repo-owner :global(.external) {
        color: var(--accent);
    }

    h2 {
        font-size: 20px;
        margin-bottom: 6px;
    }

    p {
        flex: 1;
        font-size: 14px;
        margin-bottom: 16px;
    }

    .repo-info {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-muted);
    }

    .language::before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--lang-color);
        margin-right: 6px;
    }

    .stars {
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    @media screen and (max-width: 1200px) {
        .repo-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media screen and (max-width: 700px) {
        .repo-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
