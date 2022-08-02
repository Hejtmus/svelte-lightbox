<script>import Thumbnail from '../LightboxThumbnail.svelte';
export let images;
export let activeImage;
const selectImage = (selectedImageId) => {
    activeImage = selectedImageId;
};
</script>

{#each images as image}
    <Thumbnail on:click={() => selectImage(image.id)}>
        <img {...image.thumbnailProps}>
    </Thumbnail>
{/each}