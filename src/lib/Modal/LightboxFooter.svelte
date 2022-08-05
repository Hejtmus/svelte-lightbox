<script lang="ts">
    import type { GalleryState } from '$lib/Types'

    export let title = ''
    export let description = ''
    export let gallery: GalleryState = null

    export let classes = ''
    export let style = ''
</script>

<div class={'svelte-lightbox-footer ' + classes} {style}>
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
    div.svelte-lightbox-footer {
        position: absolute;
        background-color: transparent;
        color: white;
        text-align: left;
        width: inherit;
        height: auto;
    }
</style>