<script lang="ts">
    import type { ImagePreset } from '$lib/Types'

    export let imagePreset: ImagePreset
    export let enableImageExpand: boolean
    // Exposed so a gallery can attach gestures to the area holding the images
    export let element: HTMLDivElement | null = null
</script>

<div bind:this={element} class="svelte-lightbox-body" class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
    class:expand={enableImageExpand}>
    <slot/>
</div>

<style>
    div.svelte-lightbox-body {
        position: relative;
        width: auto;
        height: auto;
        /* TODO: mitigate this hardcode by using flexbox in lightbox modal <Modal.svelte> */
        max-height: 80vh;
        /* Gallery neighbours are positioned as a percentage of this box, so without
           clipping they stay visible next to the active image whenever the box is
           narrower than the viewport (e.g. a portrait image outside the fullscreen preset) */
        overflow: hidden;
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
