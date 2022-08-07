<script lang="ts">
    import type { GalleryState, ImagePreset } from '$lib/Types'

    export let imagePreset: ImagePreset
    export let title = ''
    export let description = ''
    export let gallery: GalleryState = null
</script>

<div class:fullscreen={imagePreset === 'fullscreen'} {...$$restProps}>
    <h2>
        {@html title}
    </h2>
    <h5>
        {@html description}
    </h5>
    {#if gallery !== null}
        <p>
            Image {gallery.activeImage + 1} of {gallery.imageCount}
        </p>
    {/if}
</div>

<style>
    div {
        width: 100%;
        height: auto;
        color: white;
        text-align: left;
        position: absolute;
    }
    div.fullscreen {
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        right: 0;
        padding-left: 1rem;
    }
</style>