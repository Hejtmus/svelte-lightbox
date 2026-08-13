<script lang="ts">
    import { getGallery } from './gallery.svelte'
    import type { Snippet } from 'svelte'

    interface Props {
        title?: string,
        description?: string,
        children?: Snippet
    }

    let { title = '', description = '', children }: Props = $props()

    const gallery = getGallery()
    const imageId = gallery.registerImage({ title, description })

    const distance = $derived(imageId - gallery.activeImage)
    // Neighbours only exist to be dragged into view, so they cost nothing until then
    const isNeighbour = $derived(gallery.swipeConfig.enabled && Math.abs(distance) === 1)
</script>

{#if distance === 0}
    {@render children?.()}
{:else if isNeighbour}
    <div class="svelte-lightbox-gallery-neighbour" style="--svelte-lightbox-neighbour-distance: {distance}">
        {@render children?.()}
    </div>
{/if}

<style>
    /* Placed with left rather than transform, which the drag needs for itself */
    div.svelte-lightbox-gallery-neighbour {
        position: absolute;
        top: 0;
        left: calc(var(--svelte-lightbox-neighbour-distance) * 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    div.svelte-lightbox-gallery-neighbour > :global(*) {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
</style>
