---
title: Building blocks
description: Composing a lightbox out of the parts Lightbox and LightboxGallery are made of
---

# Building blocks

`<Lightbox>` and `<LightboxGallery>` are assembled from smaller components, and every one of them is exported. When the
props on the ready made components do not reach far enough, the same parts can be arranged by hand.

:::warning[Reach for this last]
Composing by hand means owning the wiring that `<Lightbox>` normally does, including the open state and the close
handling. Check whether [customization](/guide/lightbox/#customization) covers the need first, since it passes html
props straight to the element behind each part.
:::

## The shape of a lightbox

A lightbox is a cover holding a modal, which holds a header, a body and a footer. The whole stack is moved to the end of
`<body>` so that no parent's overflow or stacking context can clip it.

```svelte title="A hand composed lightbox"
<script>
    import {
        BodyChild,
        ModalCover,
        Modal,
        LightboxHeader,
        LightboxBody,
        LightboxFooter,
        LightboxThumbnail
    } from 'svelte-lightbox'

    let isVisible = $state(false)
</script>

<LightboxThumbnail onclick={() => { isVisible = true }}>
    <img src="/img/cat.jpg" alt="A cat">
</LightboxThumbnail>

{#if isVisible}
    <BodyChild>
        <ModalCover transitionDuration={300} onclick={() => { isVisible = false }}>
            <Modal transitionDuration={300} imagePreset="">
                <LightboxHeader
                    imagePreset=""
                    showCloseButton={true}
                    enableEscapeToClose={true}
                    onclose={() => { isVisible = false }}
                />
                <LightboxBody imagePreset="" enableImageExpand={false}>
                    <img src="/img/cat.jpg" alt="A cat">
                </LightboxBody>
                <LightboxFooter imagePreset="" title="A cat" description="Photographed last summer"/>
            </Modal>
        </ModalCover>
    </BodyChild>
{/if}
```

Every part spreads the props it does not use itself onto the element behind it, so anything an html element accepts, a
part accepts too. That is what carries `onclick` to `<ModalCover>` and `<Modal>`, and it is the same mechanism
[customization](/guide/lightbox/#customization) uses.

## The parts

### `<BodyChild>`

Moves its children to the end of `<body>` on mount and takes them away again on destroy. Nothing else. This is what keeps
a lightbox out of the layout it was written in.

### `<ModalCover>`

The full screen backdrop, carrying the `.svelte-lightbox-overlay` class. Fades in over `transitionDuration * 2`
milliseconds and out over half of it.

| prop | type | |
| --- | --- | --- |
| `transitionDuration` | `number` | Base duration the fade is calculated from |

### `<Modal>`

The box the image sits in, carrying `.svelte-lightbox-main`. A lightbox listens to its `onclick` in order to tell a
click on the image apart from a click on the backdrop.

| prop | type | |
| --- | --- | --- |
| `transitionDuration` | `number` | Duration of the fade |
| `imagePreset` | `ImagePreset` | `''`, `'fullscreen'` or `'scroll'` |

### `<LightboxHeader>`

The bar above the image, carrying `.svelte-lightbox-header`. Holds the close button and calls `onclose` both when that
button is pressed and, while `enableEscapeToClose` is on, when escape is pressed.

| prop | type | |
| --- | --- | --- |
| `imagePreset` | `ImagePreset` | Preset the header should follow |
| `showCloseButton` | `boolean` | Renders the close button |
| `enableEscapeToClose` | `boolean` | Calls `onclose` on the escape key |
| `closeButtonProps` | `HTMLButtonAttributes` | Html props for the close button |
| `onclose` | `() => void` | Called when the lightbox should close |

### `<LightboxBody>`

The area holding the image, carrying `.svelte-lightbox-body`. It sizes whatever is placed inside it, which is why the
image itself needs no styling of its own.

| prop | type | |
| --- | --- | --- |
| `imagePreset` | `ImagePreset` | Preset the body should follow |
| `enableImageExpand` | `boolean` | Lets the image grow past its own resolution |
| `element` | `HTMLDivElement` | Bindable reference to the body element |

### `<LightboxFooter>`

The strip under the image, carrying `.svelte-lightbox-footer`. Renders the title in an `<h2>` and the description in an
`<h5>`. Passing `gallery` adds the counter underneath them.

| prop | type | |
| --- | --- | --- |
| `imagePreset` | `ImagePreset` | Preset the footer should follow |
| `title` | `string` | Shown in an `<h2>` |
| `description` | `string` | Shown in an `<h5>` |
| `gallery` | `GalleryState` | `{ imageCount, activeImage }`, adds the counter |

### `<LightboxThumbnail>`

A clickable wrapper carrying `.svelte-lightbox-thumbnail`, calling `onclick` on a click as well as on enter and space.
This is what `<Lightbox>` puts around the thumbnail.

| prop | type | |
| --- | --- | --- |
| `onclick` | `() => void` | Called when the reader activates the thumbnail |

## Gallery parts

A gallery adds navigation on top of the same stack. All of it reads from one piece of state, created with
`createGallery`, which also puts it within reach of every `<GalleryThumbnail>` and `<GalleryImage>` below it.

```svelte title="A hand composed gallery"
<script>
    import { createAttachmentKey } from 'svelte/attachments'
    import {
        createGallery,
        swipeNavigation,
        GalleryController,
        GalleryImage,
        GalleryThumbnail,
        LightboxBody
    } from 'svelte-lightbox'

    const images = [1, 2, 3]

    let isVisible = $state(false)
    let activeImage = $state(0)

    const gallery = createGallery({
        get activeImage () {
            return activeImage
        },
        set activeImage (imageId) {
            activeImage = imageId
        },
        arrowsConfig: { color: 'white', character: 'loop', enableKeyboardControl: true },
        swipeConfig: { enabled: true, threshold: 50, enableMouseDrag: true },
        openImage: (imageId) => {
            activeImage = imageId
            isVisible = true
        }
    })

    // Drags are read from the element the images sit in
    const swipeSurface = { [createAttachmentKey()]: swipeNavigation(gallery) }
</script>

{#each images as image (image)}
    <GalleryThumbnail>
        <img src="/img/{image}.jpg" alt="Image {image}">
    </GalleryThumbnail>
{/each}

{#if isVisible}
    <LightboxBody imagePreset="" enableImageExpand={false} {...swipeSurface}>
        <GalleryController {gallery}>
            {#each images as image (image)}
                <GalleryImage title="Image {image}">
                    <img src="/img/{image}.jpg" alt="Image {image}">
                </GalleryImage>
            {/each}
        </GalleryController>
    </LightboxBody>
{/if}
```

### `createGallery`

Creates the gallery state and shares it downwards. It is given the parts a gallery cannot decide on its own, so the
state stays the caller's rather than the library's.

| setting | type | |
| --- | --- | --- |
| `activeImage` | `number` | Index of the displayed image, read and written |
| `arrowsConfig` | `GalleryArrowsConfig` | Arrow colour, edge behaviour, keyboard |
| `swipeConfig` | `GallerySwipeConfig` | Swipe settings |
| `openImage` | `(imageId: number) => void` | Called by a thumbnail that was clicked |

Written as getters, as in the example above, the settings stay live: whatever the surrounding component keeps them in
remains the single source of truth. The returned `Gallery` also counts the images, which is what pairs a thumbnail with
the image of the same order.

### `<GalleryController>`

Holds the arrows and the keyboard handling, and displays whatever is placed inside it between them.

| prop | type | |
| --- | --- | --- |
| `gallery` | `Gallery` | The state returned by `createGallery` |

### `swipeNavigation`

An attachment turning drags on the element it is put on into moves through the gallery. Place it on the element holding
the images, since that is the surface the reader drags. It follows
[`arrowsConfig.character`](/guide/lightbox-gallery/#character) at the edges of the gallery, exactly like the arrows do.

### `<PreviousImageButton>` and `<NextImageButton>`

The arrows themselves. Both call `onclick` and disable themselves at the edges of the gallery unless `character` is
`'loop'`.

| prop | type | |
| --- | --- | --- |
| `activeImage` | `number` | Index of the displayed image |
| `imageCount` | `number` | How many images there are, next arrow only |
| `character` | `GalleryArrowCharacter` | `''`, `'hide'` or `'loop'` |
| `onclick` | `() => void` | Called when the arrow is pressed |

## Changing the counter wording

The gallery counter comes from a store, so replacing the function replaces the wording everywhere.

```svelte title="src/routes/+layout.svelte"
<script>
    import { i18n } from 'svelte-lightbox'

    $i18n.generateLocalizedGalleryCounter = (activeImage, imageCount) => {
        return `Obrázok ${activeImage + 1} z ${imageCount}`
    }
</script>
```

The function receives a zero based index, which is why the examples add one before showing it.
