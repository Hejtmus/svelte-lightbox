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

{#if distance === 0}
    <slot {...$$restProps}/>
{:else if isNeighbour}
    <div class="svelte-lightbox-gallery-neighbour" style="--svelte-lightbox-neighbour-distance: {distance}">
        <slot {...$$restProps}/>
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
