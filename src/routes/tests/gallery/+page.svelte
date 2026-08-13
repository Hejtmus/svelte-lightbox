<script lang="ts">
    import { page } from '$app/stores'
    import { LightboxGallery, GalleryImage, GalleryThumbnail } from '$lib'
    import { flag, number, text } from '../params'
    import type { GalleryArrowCharacter, ImagePreset } from '$lib/Types'

    const images = [1, 2, 3, 4]

    let controller

    $: params = $page.url.searchParams
    $: imagePreset = text(params, 'imagePreset') as ImagePreset
    $: arrowsConfig = {
        color: text(params, 'arrowColor', 'black'),
        character: text(params, 'character') as GalleryArrowCharacter,
        enableKeyboardControl: flag(params, 'enableKeyboardControl', true)
    }
    $: swipeConfig = {
        enabled: flag(params, 'swipe', false),
        threshold: number(params, 'threshold', 50),
        enableMouseDrag: flag(params, 'enableMouseDrag', true)
    }
</script>

<h1>Gallery fixture</h1>

<button data-testid="open" on:click={() => controller.open()}>open</button>
<button data-testid="close" on:click={() => controller.close()}>close</button>
<button data-testid="toggle" on:click={() => controller.toggle()}>toggle</button>
<button data-testid="open-third" on:click={() => controller.openImage(2)}>open third</button>

<LightboxGallery
    bind:programmaticController={controller}
    activeImage={number(params, 'activeImage', 0)}
    title={text(params, 'title')}
    description={text(params, 'description')}
    {imagePreset}
    {arrowsConfig}
    {swipeConfig}
    keepBodyScroll={flag(params, 'keepBodyScroll', false)}
    showCloseButton={flag(params, 'showCloseButton', true)}
>
    <svelte:fragment slot="thumbnail">
        {#each images as image (image)}
            <GalleryThumbnail>
                <img src="/img/gallery/{image}.jpg" alt="thumbnail {image}" data-testid="thumbnail-{image}">
            </GalleryThumbnail>
        {/each}
    </svelte:fragment>

    {#each images as image (image)}
        <GalleryImage title="Title {image}" description="Description {image}">
            <img src="/img/gallery/{image}.jpg" alt="image {image}" data-testid="image-{image}">
        </GalleryImage>
    {/each}
</LightboxGallery>
