<script>import Thumbnail from '../LightboxThumbnail.svelte';
export let images;
export let activeImage;
export let isVisible;
const selectImage = (selectedImageId) => {
    activeImage = selectedImageId;
    isVisible = true;
};
</script>

{#each images as image}
    <Thumbnail on:click={() => selectImage(image.id)} {...$$restProps}>
        <img {...image.thumbnailProps}>
    </Thumbnail>
{/each}

<style>
    img {
        max-width: 100%;
        height: auto;
    }
</style>