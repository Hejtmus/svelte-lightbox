<script lang="ts">
    import { getContext } from 'svelte'
    import type { Writable } from 'svelte/store'
    import type { GalleryImage, GallerySwipeConfig } from '$lib/Types'

    export let title: string = ''
    export let description: string = ''

    const activeImageStore: Writable<number> = getContext('activeImage')
    const swipeConfigStore: Writable<GallerySwipeConfig> = getContext('swipeConfig')
    const imageCounterFunction: (imgage: Omit<GalleryImage, 'id'>) => number = getContext('imageCounter')
    const imageId = imageCounterFunction({
        title,
        description
    })

    $: distance = imageId - $activeImageStore
    // Neighbours only exist to be dragged into view, so they cost nothing until then
    $: isNeighbour = $swipeConfigStore.enabled && Math.abs(distance) === 1
</script>

{#if distance === 0 || isNeighbour}
    <div class="svelte-lightbox-gallery-image" class:neighbour={distance !== 0}
        style="--svelte-lightbox-image-distance: {distance}">
        <slot {...$$restProps}/>
    </div>
{/if}

<style>
    /* The displayed image sizes the track, neighbours are parked beside it */
    div.svelte-lightbox-gallery-image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        max-height: inherit;
    }
    div.svelte-lightbox-gallery-image.neighbour {
        position: absolute;
        top: 0;
        left: calc(var(--svelte-lightbox-image-distance) * 100%);
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    /* The body rule now lands on the wrapper, so the limits are restated here */
    div.svelte-lightbox-gallery-image > :global(*) {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
</style>
