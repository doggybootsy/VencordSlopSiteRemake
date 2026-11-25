<script lang="ts">
    import Icon from "../Icon.svelte";

    export interface ActionLink {
        href: string;
        label: string;
        title?: string;
        primary?: boolean;
    }

    const { links }: { links: ActionLink[] } = $props();
</script>

<div class="btn-container actions">
    {#each links as { href, label, title, primary }}
        <a {href} {title} class="btn btn-lg {primary ? 'btn-primary' : 'btn-secondary'}">
            {#if primary}<Icon name="download" />{/if}
            {label}
        </a>
    {/each}
</div>

<style>
    .actions {
        margin-bottom: 20px;
    }
</style>
