<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        description?: string;
        children?: Snippet;
    }

    const { title, description, children }: Props = $props();
</script>

<header class="page-header">
    <div class="page-section-inner">
        <h1 class="title">{title}</h1>
        {#if description}<p class="title-description">{description}</p>{/if}
        {@render children?.()}
    </div>
</header>

<style>
    .page-header {
        padding: 56px 0 40px;
        background-image: radial-gradient(circle at top center, var(--bg3), var(--bg2) 70%);
        border-bottom: 1px solid var(--border-subtle);
    }

    .title-description {
        margin-bottom: 0;
    }
</style>
