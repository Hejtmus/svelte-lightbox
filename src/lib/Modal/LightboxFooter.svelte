<script lang="ts">
    import i18n from '$lib/i18n'
    import type { HTMLAttributes } from 'svelte/elements'
    import type { GalleryState, ImagePreset } from '$lib/Types'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        imagePreset: ImagePreset,
        title?: string,
        description?: string,
        gallery?: GalleryState | null
    }

    let { imagePreset, title = '', description = '', gallery = null, ...rest }: Props = $props()

    const localizedGalleryCounter = $derived(gallery === null
        ? ''
        : $i18n.generateLocalizedGalleryCounter(gallery.activeImage, gallery.imageCount))
</script>

<div class="svelte-lightbox-footer" class:fullscreen={imagePreset === 'fullscreen'} {...rest}>
    <h2>
        {title}
    </h2>
    <h5>
        {description}
    </h5>
    {#if gallery !== null}
        <p>
            {localizedGalleryCounter}
        </p>
    {/if}
</div>

<style>
    div.svelte-lightbox-footer {
        width: 100%;
        height: auto;
        color: white;
        text-align: left;
        position: absolute;
    }
    div.svelte-lightbox-footer.fullscreen {
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        right: 0;
        padding-left: 1rem;
    }
</style>
