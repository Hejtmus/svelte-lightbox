<script>import { getContext } from 'svelte';
export let id;
const openImage = getContext('openImage');
if (!id) {
    id = (getContext('thumbnailCounter'))();
}
</script>

<div class:svelte-lightbox-thumbnail={true} on:click={() => openImage(id)} {...$$restProps}>
    <slot/>
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