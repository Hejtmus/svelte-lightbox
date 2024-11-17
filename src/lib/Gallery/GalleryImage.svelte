<script lang="ts">
    import { getContext } from 'svelte'
    import type { Writable } from 'svelte/store'
    import type { GalleryImage } from '$lib/Types'

    export let title: string = ''
    export let description: string = ''

    const activeImageStore: Writable<number> = getContext('activeImage')
    const imageCounterFunction: (imgage: Omit<GalleryImage, 'id'>) => number = getContext('imageCounter')
    const imageId = imageCounterFunction({
        title,
        description
    })
</script>

{#if $activeImageStore === imageId}
    <slot {...$$restProps}/>
{/if}
