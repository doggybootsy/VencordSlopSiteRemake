<script lang="ts">
    import { Icons, type IconName } from "./icons";

    interface Props {
        name: IconName;
        title?: string;
        size?: number | string;
        class?: string;
    }

    const { name, title, size = 20, class: cls = "" }: Props = $props();
    const icon = $derived(Icons[name]);
</script>

<svg
    class={cls}
    viewBox={icon.viewBox}
    width={size}
    height={size}
    fill="currentColor"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
>
    {#if title}<title>{title}</title>{/if}
    <path d={icon.d} />
</svg>
