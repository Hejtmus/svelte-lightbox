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

Moves itself to the end of `<body>` on mount and takes itself away again on destroy. This is what keeps a lightbox out
of the layout it was written in.

Its children are rendered once that move is done rather than before it, which is why anything inside can measure itself
and get an answer that holds. A lightbox written inside an element with a `transform` is laid out against that element
until it is moved, and a flight measured then would aim at a place the image never goes. Nothing inside a `<BodyChild>`
is rendered on the server for the same reason: the move belongs to the browser.

### `<ModalCover>`

The full screen backdrop, carrying the `.svelte-lightbox-overlay` class. Darkens over `transitionDuration * 2`
milliseconds and clears over half of it, unless it is told otherwise. What fades is its background colour rather than
the element, so whatever stands on it keeps its own opacity, and overriding the colour in css keeps the fade.

| prop | type | |
| --- | --- | --- |
| `transitionDuration` | `number` | Base duration the fade is calculated from |
| `timing` | `TransitionTiming` | `{ enter, leave }` in milliseconds, replacing that calculation |

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
| `expandFrom` | `ExpandOrigin` | The place to fly out of, see [growing out of a thumbnail](#growing-out-of-a-thumbnail) |
| `transitionDuration` | `number` | Times that flight, and nothing else |
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
| `element` | `HTMLDivElement` | Bindable reference to the thumbnail element |

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

## Growing out of a thumbnail

The [crossfade preset](/guide/lightbox/#transitionpreset) is one transition rather than two: `expand` measures the
place another element holds on the page and flies the body out of it, keeping its opacity the whole way. Where that
place is is asked for as the flight begins, so it is always measured as the page stands right then.

```svelte title="Growing a hand composed lightbox out of its thumbnail"
<script>
    import { expand, arrivalOf, departureOf, LightboxThumbnail, LightboxBody } from 'svelte-lightbox'

    let isVisible = $state(false)
    let thumbnail = $state(null)
</script>

<LightboxThumbnail bind:element={thumbnail} onclick={() => { isVisible = true }}>
    <img src="/img/cat-small.jpg" alt="A cat">
</LightboxThumbnail>

{#if isVisible}
    ...
    <LightboxBody imagePreset="" enableImageExpand={false} transitionDuration={300} expandFrom={() => thumbnail}>
        <img src="/img/cat.jpg" alt="A cat">
    </LightboxBody>
    ...
{/if}
```

The thumbnail stays exactly where it is throughout. The image lands on top of it rather than replacing it, which is
why nothing has to be taken off the page and put back.

The flight takes `transitionDuration` in each direction, because it covers the same ground whichever way it is going.
That is not what a plain lightbox does: `fadeTiming` is the gentler arrival and brisk dismissal the cover keeps to on
its own, `transitionDuration * 2` in and half of it out. `flightTiming` is the even pair the flight needs, and handing
it to `<ModalCover>` as its `timing` is what keeps the cover underneath the image for exactly as long as the image is
travelling.

:::note[Measured where it lands]
`<BodyChild>` holds its children back until it has moved, so a flight measured as the body mounts is measured against
the place the body ends up in. Composing without `<BodyChild>` is fine; composing with one that renders its children
before moving is what would send the image to the wrong place.

Because of that wait, the parts inside declare their transitions `global`. A lightbox is always closed by a block
somewhere above it rather than by the one holding the transition, and a local transition would simply be skipped.
:::

:::warning[Nothing may outlast the cover]
The image travels inside `<ModalCover>`, so a flight longer than the cover's own fade would be taken off the page
before it arrives. Sharing one `transitionDuration` is what keeps them together.
:::

:::note[Give it something to fly out of]
`expandFrom` returning nothing is not an error, it simply means there is no flight and the lightbox arrives the plain
way. `<Lightbox>` uses that on purpose whenever there is no thumbnail to grow out of.
:::

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
