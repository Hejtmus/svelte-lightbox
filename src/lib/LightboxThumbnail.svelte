<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onclick'> {
        onclick?: () => void,
        children?: Snippet
    }

    let { onclick, children, ...rest }: Props = $props()

    // The click sits on a plain element, so the keyboard has to be given the reach a button would have
    const handleKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onclick?.()
        }
    }
</script>

<div class="svelte-lightbox-thumbnail" aria-label="thumbnail" role="button" tabindex="0"
    {onclick} onkeydown={handleKey} {...rest}>
    {@render children?.()}
</div>

<style>
    div {
        position: static;
        cursor: zoom-in;
    }
    :global(.svelte-lightbox-thumbnail > *) {
        max-width: 100%;
        height: auto;
    }
</style>
