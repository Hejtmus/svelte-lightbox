---
title: Introduction
description: What svelte-lightbox is and how to add it to a project
---

# Introduction

svelte-lightbox is a Svelte library providing lightbox component(s) and its building parts to allow more customization.
Architecture of this library makes it fit for wide array of use cases. This library tries to be as minimal as possible,
that's why its size is so low. To reduce bundle size of projects using svelte-lightbox, this library supports tree-shaking.

:::tip[No runtime dependencies]
The package ships with none at all. Nothing is pulled into a project beyond the components that are actually imported.
:::

## Installation

@install-pkg(svelte-lightbox)

## A first lightbox

Import `Lightbox` and put the image to display inside its slot. The same image doubles as the thumbnail, so this is
everything a working lightbox needs.

```svelte title="src/routes/+page.svelte"
<script>
    import { Lightbox } from 'svelte-lightbox'
</script>

<Lightbox title="A cat">
    <img src="/img/cat.jpg" alt="A cat">
</Lightbox>
```

Clicking the image opens it over the page, and the title shows underneath it.

### A different thumbnail

Pass an element into the `thumbnail` slot when the image that opens should not be the image that is shown.

```svelte title="src/routes/+page.svelte"
<Lightbox description="Photographed last summer">
    <img slot="thumbnail" src="/img/cat-small.jpg" alt="A cat">
    <img src="/img/cat.jpg" alt="A cat">
</Lightbox>
```

Every other option lives on [the Lightbox page](/guide/lightbox/).

## A first gallery

A gallery displays several images and lets the reader move between them. It takes two things: a `thumbnail` slot holding
the layout the reader clicks, and a list of `GalleryImage` children holding the images that open.

```svelte title="src/routes/+page.svelte"
<script>
    import { LightboxGallery, GalleryImage, GalleryThumbnail } from 'svelte-lightbox'

    const images = [1, 2, 3]
</script>

<LightboxGallery>
    <svelte:fragment slot="thumbnail">
        {#each images as image}
            <GalleryThumbnail>
                <img src="/img/{image}.jpg" alt="Image {image}">
            </GalleryThumbnail>
        {/each}
    </svelte:fragment>

    {#each images as image}
        <GalleryImage title="Image {image}">
            <img src="/img/{image}.jpg" alt="Image {image}">
        </GalleryImage>
    {/each}
</LightboxGallery>
```

Each thumbnail opens the gallery at its own image, matched by order. Arrows and the arrow keys move between images from
there, and swiping can be turned on as well.

:::note[Thumbnails are required]
A gallery without a thumbnail layout does not make sense in most cases, so the layout is part of the component's design
rather than something to add later.
:::

Every other option lives on [the LightboxGallery page](/guide/lightbox-gallery/).

## Where to go next

- [Lightbox](/guide/lightbox/) — the basic component and all of its props
- [LightboxGallery](/guide/lightbox-gallery/) — galleries, thumbnails, arrows and swiping
- [Building blocks](/guide/building-blocks/) — composing a lightbox out of its parts
- [Examples](/examples/) — the components running live
