<script lang="ts">
    import LightboxThumbnail from '../LightboxThumbnail.svelte'
    import { getGallery } from './gallery.svelte'
    import type { Snippet } from 'svelte'
    import type { HTMLButtonAttributes } from 'svelte/elements'

    interface Props extends Omit<HTMLButtonAttributes, 'onclick'> {
        id?: number,
        children?: Snippet
    }

    let { id, children, ...rest }: Props = $props()

    const gallery = getGallery()
    // Thumbnails stand for the images in the order they are written, unless they say otherwise
    const imageId = id ?? gallery.nextThumbnailId()

    let element: HTMLButtonElement | null = $state(null)

    // Told where it sits, so the gallery can grow that image out of here and put it back
    $effect(() => {
        return element === null ? undefined : gallery.rememberThumbnail(imageId, element)
    })
</script>

<LightboxThumbnail bind:element onclick={() => gallery.openImage(imageId)} {...rest}>
    {@render children?.()}
</LightboxThumbnail>
