<script lang="ts">
    import Icon from "./Icon.svelte";

    const { code }: { code: string } = $props();

    let copied = $state(false);

    async function copy() {
        await navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<div class="code-block">
    <pre><code>{code}</code></pre>
    <button class="copy" onclick={copy} title={copied ? "Code copied!" : "Copy to Clipboard"}>
        <Icon name={copied ? "check" : "copy"} size={18} />
        <span>{copied ? "Copied" : "Copy"}</span>
    </button>
</div>

<style>
    .code-block {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 12px 0 16px;
        padding: 6px 6px 6px 16px;
        background: var(--bg2);
        border: 2px solid var(--border);
        border-radius: 4px;
    }

    pre {
        flex: 1;
        margin: 0;
        overflow-x: auto;
        font-size: 14px;
        color: var(--text-light);
        white-space: pre-wrap;
        overflow-wrap: anywhere;
    }

    .copy {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        padding: 8px 12px;
        border: none;
        border-radius: 3px;
        background: var(--bg4);
        color: var(--text-light);
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.15s ease background;
    }

    .copy:hover {
        background: var(--accent);
        color: #fff;
    }
</style>
