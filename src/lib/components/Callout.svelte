<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        kind?: "warning" | "error" | "success" | "info";
        title?: string;
        children: Snippet;
    }

    const { kind = "info", title, children }: Props = $props();
</script>

<div class="callout {kind}" role={kind === "error" || kind === "warning" ? "note" : undefined}>
    {#if title}<strong class="callout-title">{title}</strong>{/if}
    <div class="callout-body">{@render children()}</div>
</div>

<style>
    .callout {
        --c: var(--info);
        position: relative;
        margin: 16px 0;
        padding: 12px 16px 12px 20px;
        border-radius: 4px;
        background: color-mix(in srgb, var(--c) 10%, var(--bg3));
        border: 1px solid color-mix(in srgb, var(--c) 30%, transparent);
        color: var(--text-normal);
        font-size: 15px;
    }

    .callout::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        border-radius: 4px 0 0 4px;
        background: var(--c);
    }

    .warning {
        --c: var(--warning);
    }

    .error {
        --c: var(--danger);
    }

    .success {
        --c: var(--success);
    }

    .callout-title {
        display: block;
        color: var(--text-light);
        font-weight: 600;
        margin-bottom: 4px;
    }

    .callout-body :global(p:last-child),
    .callout-body :global(ul:last-child) {
        margin-bottom: 0;
    }

    .callout-body :global(ul) {
        margin-top: 0;
        padding-left: 1.25em;
    }
</style>
