<script lang="ts">
    import Thumbnail from '$lib/LightboxThumbnail.svelte'
    import type { GalleryImage } from '$lib/Types'

    export let images: Array<GalleryImage>
    export let activeImage: number
    export let isVisible: boolean

    const selectImage = (selectedImageId: number) => {
        activeImage = selectedImageId
        isVisible = true
    }
</script>

{#each images as image}
    <Thumbnail on:click={() => selectImage(image.id)}>
        <img {...image.thumbnailProps}>
    </Thumbnail>
{/each}

<style>
    img {
        max-width: 100%;
        height: auto;
    }
</style>