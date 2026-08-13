<script lang="ts">
    import { page } from '$app/state'
    import { LightboxGallery, GalleryImage, GalleryThumbnail } from '$lib'
    import { flag, number, text } from '../params'
    import type { GalleryArrowCharacter, ImagePreset } from '$lib/Types'

    const images = [1, 2, 3, 4]

    let gallery: ReturnType<typeof LightboxGallery>

    const params = $derived(page.url.searchParams)
    const imagePreset = $derived(text(params, 'imagePreset') as ImagePreset)
    const arrowsConfig = $derived({
        color: text(params, 'arrowColor', 'black'),
        character: text(params, 'character') as GalleryArrowCharacter,
        enableKeyboardControl: flag(params, 'enableKeyboardControl', true)
    })
    const swipeConfig = $derived({
        enabled: flag(params, 'swipe', false),
        threshold: number(params, 'threshold', 50),
        enableMouseDrag: flag(params, 'enableMouseDrag', true)
    })
</script>

<h1>Gallery fixture</h1>

<button data-testid="open" onclick={() => gallery.open()}>open</button>
<button data-testid="close" onclick={() => gallery.close()}>close</button>
<button data-testid="toggle" onclick={() => gallery.toggle()}>toggle</button>
<button data-testid="open-third" onclick={() => gallery.openImage(2)}>open third</button>

<LightboxGallery
    bind:this={gallery}
    activeImage={number(params, 'activeImage', 0)}
    title={text(params, 'title')}
    description={text(params, 'description')}
    {imagePreset}
    {arrowsConfig}
    {swipeConfig}
    keepBodyScroll={flag(params, 'keepBodyScroll', false)}
    showCloseButton={flag(params, 'showCloseButton', true)}
>
    {#snippet thumbnail()}
        {#each images as image (image)}
            <GalleryThumbnail>
                <img src="/img/gallery/{image}.jpg" alt="thumbnail {image}" data-testid="thumbnail-{image}">
            </GalleryThumbnail>
        {/each}
    {/snippet}

    {#each images as image (image)}
        <GalleryImage title="Title {image}" description="Description {image}">
            <img src="/img/gallery/{image}.jpg" alt="image {image}" data-testid="image-{image}">
        </GalleryImage>
    {/each}
</LightboxGallery>
