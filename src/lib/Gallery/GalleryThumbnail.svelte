<script lang="ts">
    import LightboxThumbnail from '../LightboxThumbnail.svelte'
    import { getGallery } from './gallery.svelte'
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onclick'> {
        id?: number,
        children?: Snippet
    }

    let { id, children, ...rest }: Props = $props()

    const gallery = getGallery()
    // Thumbnails stand for the images in the order they are written, unless they say otherwise
    const imageId = id ?? gallery.nextThumbnailId()
</script>

<LightboxThumbnail onclick={() => gallery.openImage(imageId)} {...rest}>
    {@render children?.()}
</LightboxThumbnail>
