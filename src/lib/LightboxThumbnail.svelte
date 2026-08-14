<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLButtonAttributes } from 'svelte/elements'

    interface Props extends Omit<HTMLButtonAttributes, 'onclick'> {
        onclick?: () => void,
        // Exposed so a lightbox can grow its image out of the place this holds
        element?: HTMLButtonElement | null,
        children?: Snippet
    }

    let { onclick, element = $bindable(null), children, ...rest }: Props = $props()
</script>

<button bind:this={element} type="button" class="svelte-lightbox-thumbnail" aria-label="thumbnail" {onclick} {...rest}>
    {@render children?.()}
</button>

<style>
    button {
        display: block;
        position: static;
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        font: inherit;
        color: inherit;
        text-align: inherit;
        cursor: zoom-in;
    }
    :global(.svelte-lightbox-thumbnail > *) {
        max-width: 100%;
        height: auto;
    }
</style>
