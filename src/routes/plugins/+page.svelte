<script lang="ts">
    import { onMount } from "svelte";

    import Icon from "#lib/components/Icon.svelte";
    import PageHeader from "#lib/components/PageHeader.svelte";
    import Seo from "#lib/components/Seo.svelte";
    import type { PluginData } from "#lib/types.ts";

    import PluginCard from "./PluginCard.svelte";

    const { data } = $props();
    const plugins = $derived(data.plugins);

    // Same filters as the original site
    const criteria = $state([
        { name: "Has Commands", state: false, check: (p: PluginData) => p.hasCommands },
        { name: "Desktop", state: false, check: (p: PluginData) => p.target !== "web" },
        { name: "Web", state: false, check: (p: PluginData) => p.target === "web" }
    ]);

    let filter = $state("");
    let loaded = $state(false);

    onMount(() => {
        try {
            const hash = location.hash.slice(1);
            if (hash) filter = decodeURIComponent(hash);
        } catch {}
        loaded = true;
    });

    // keep the search in the URL hash (vencord.dev/plugins#query is used for Google's SearchAction)
    $effect(() => {
        if (!loaded) return;
        history.replaceState(history.state, "", filter ? `#${encodeURIComponent(filter)}` : location.pathname);
    });

    const lowerFilter = $derived(filter.toLowerCase());

    const filteredPlugins = $derived(
        plugins.filter(p => {
            for (const c of criteria) if (c.state && !c.check(p)) return false;

            return (
                p.name.toLowerCase().includes(lowerFilter) ||
                p.description.toLowerCase().includes(lowerFilter) ||
                p.tags.some(t => t.toLowerCase().includes(lowerFilter)) ||
                p.authors.some(a => a.name.toLowerCase().includes(lowerFilter))
            );
        })
    );

    const escapeHtml = (s: string) =>
        s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const matcher = $derived(filter ? new RegExp(escapeRegex(escapeHtml(filter)), "gi") : null);

    function highlight(text: string) {
        const safe = escapeHtml(text);
        return matcher ? safe.replace(matcher, m => `<mark>${m}</mark>`) : safe;
    }

    function reset() {
        filter = "";
        for (const c of criteria) c.state = false;
    }
</script>

<Seo
    title="Plugins"
    description={`Browse our list of ${plugins.length} Vencord plugins`}
    breadcrumbs={[["Plugins", "/plugins"]]}
/>

<PageHeader
    title="Plugins"
    description={`We have ${plugins.length} plugins available for you to use immediately, with more being made every day.`}
/>

<section class="page-section">
    <div class="page-section-inner">
        <div class="toolbar">
            <label class="search">
                <span class="visually-hidden">Search plugins</span>
                <Icon name="search" size={16} class="search-icon" />
                <input
                    class="text-input"
                    type="search"
                    placeholder="Search by Name, Author or Description..."
                    bind:value={filter}
                />
            </label>

            <div class="filters" role="group" aria-label="Filter">
                <span class="filters-label">Filter</span>
                {#each criteria as c}
                    <button class="filter-chip" class:active={c.state} aria-pressed={c.state} onclick={() => (c.state = !c.state)}>
                        {c.name}
                    </button>
                {/each}
            </div>
        </div>

        <p class="result-count">
            Showing <strong>{filteredPlugins.length}</strong> of {plugins.length} plugins
        </p>

        {#if filteredPlugins.length}
            <div class="plugins-grid">
                {#each filteredPlugins as p (p.name)}
                    <PluginCard plugin={p} thumbnail={data.thumbnails[p.name]} {highlight} />
                {/each}
            </div>
        {:else}
            <div class="empty panel">
                <h2>No plugins found</h2>
                <p>Nothing matches “{filter}” with the selected filters.</p>
                <button class="btn btn-secondary" onclick={reset}>Clear search &amp; filters</button>
            </div>
        {/if}
    </div>
</section>

<style>
    .toolbar {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
    }

    .search {
        position: relative;
        flex: 1 1 360px;
        display: flex;
        align-items: center;
    }

    .search :global(.search-icon) {
        position: absolute;
        left: 14px;
        color: var(--text-muted);
        pointer-events: none;
    }

    .search input {
        padding-left: 38px;
    }

    .filters {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    .filters-label {
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-right: 4px;
    }

    .filter-chip {
        height: 42px;
        padding: 0 14px;
        border-radius: 4px;
        border: 2px solid var(--border);
        background: var(--bg2);
        color: var(--text-normal);
        font: inherit;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.15s ease;
    }

    .filter-chip:hover {
        border-color: var(--border-strong);
        color: var(--text-light);
    }

    .filter-chip.active {
        border-color: var(--accent);
        background: var(--accent-soft);
        color: var(--text-light);
    }

    .result-count {
        margin: 20px 0 16px;
        color: var(--text-muted);
        font-size: 14px;
        font-weight: 500;
    }

    .result-count strong {
        color: var(--text-normal);
    }

    /* betterdiscord.app's card container */
    .plugins-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        align-items: stretch;
    }

    .empty {
        padding: 48px 24px;
        text-align: center;
    }

    .empty h2 {
        font-size: 20px;
        margin-bottom: 8px;
    }

    .empty p {
        color: var(--text-muted);
    }

</style>
