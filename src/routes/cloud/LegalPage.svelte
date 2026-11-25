<script lang="ts">
    import type { Snippet } from "svelte";

    import PageHeader from "#lib/components/PageHeader.svelte";

    interface Props {
        title: string;
        updated: string;
        toc?: [id: string, title: string][];
        children: Snippet;
    }

    const { title, updated, toc, children }: Props = $props();
</script>

<PageHeader {title} description={`Last Updated: ${updated}`} />

<section class="page-section">
    <div class="page-section-inner legal-layout" class:has-toc={toc}>
        {#if toc}
            <nav class="toc" aria-label="Contents">
                <h2 class="toc-heading">Contents</h2>
                <ol>
                    {#each toc as [id, t]}
                        <li><a href={`#${id}`}>{t}</a></li>
                    {/each}
                </ol>
            </nav>
        {/if}
        <article class="panel prose legal">
            {@render children()}
        </article>
    </div>
</section>

<style>
    .legal-layout.has-toc {
        display: grid;
        grid-template-columns: 240px minmax(0, 1fr);
        gap: 40px;
        align-items: start;
    }

    .toc {
        position: sticky;
        top: calc(var(--nav-height) + 24px);
    }

    .toc-heading {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--text-muted);
        margin-bottom: 10px;
    }

    .toc ol {
        margin: 0;
        padding-left: 1.2em;
        color: var(--text-muted);
    }

    .toc li + li {
        margin-top: 6px;
    }

    .toc a {
        color: var(--text-normal);
        font-size: 15px;
    }

    .toc a:hover {
        color: var(--text-light);
    }

    .legal {
        padding: 32px 40px;
        max-width: 860px;
    }

    .legal :global(section) {
        scroll-margin-top: calc(var(--nav-height) + 24px);
    }

    .legal :global(section + section) {
        margin-top: 32px;
    }

    .legal :global(section:target h2) {
        color: var(--accent);
    }

    .legal :global(h2 a) {
        color: inherit;
    }

    .legal :global(h2 a::before) {
        content: "# ";
        color: var(--text-muted);
    }

    @media screen and (max-width: 950px) {
        .legal-layout.has-toc {
            grid-template-columns: 1fr;
        }

        .toc {
            position: static;
        }

        .legal {
            padding: 20px;
        }
    }
</style>
