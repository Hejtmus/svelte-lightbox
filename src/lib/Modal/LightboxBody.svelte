<script lang="ts">
    import { expand } from '$lib/transitions'
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'
    import type { ImagePreset } from '$lib/Types'
    import type { ExpandOrigin } from '$lib/transitions'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        imagePreset: ImagePreset,
        enableImageExpand: boolean,
        // The place on the page the body grows out of and shrinks back into, if any
        expandFrom?: ExpandOrigin | null,
        // Only the flight is timed by this, the body has nothing else to animate, and it
        // covers the same ground each way so it takes the same time in both directions
        transitionDuration?: number,
        // Exposed so the area holding the images can be reached from outside
        element?: HTMLDivElement | null,
        children?: Snippet
    }

    let {
        imagePreset,
        enableImageExpand,
        expandFrom = null,
        transitionDuration = 0,
        element = $bindable(null),
        children,
        ...rest
    }: Props = $props()
</script>

<div bind:this={element} class="svelte-lightbox-body" class:fullscreen={imagePreset === 'fullscreen'}
    class:scroll={imagePreset === 'scroll'} class:expand={enableImageExpand}
    in:expand|global={{ from: expandFrom, duration: transitionDuration }}
    out:expand|global={{ from: expandFrom, duration: transitionDuration }} {...rest}>
    {@render children?.()}
</div>

<style>
    div.svelte-lightbox-body {
        position: relative;
        width: auto;
        height: auto;
        /* TODO: mitigate this hardcode by using flexbox in lightbox modal <Modal.svelte> */
        max-height: 80vh;
    }
    :global(div.svelte-lightbox-body > *) {
        max-width: 100%;
        max-height: inherit;
        height: auto;
        width: auto;
        object-fit: contain;
    }
    :global(div.svelte-lightbox-body.scroll > *) {
        max-height: 100%;
    }
    :global(div.svelte-lightbox-body.expand > *) {
        flex-grow: 1;
    }
    div.fullscreen {
        width: inherit;
        max-width: inherit;
        height: inherit;
        max-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.scroll {
        overflow: scroll;
    }
</style>
