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

    let isVisible = false
</script>

<LightboxThumbnail on:click={() => { isVisible = true }}>
    <img src="/img/cat.jpg" alt="A cat">
</LightboxThumbnail>

{#if isVisible}
    <BodyChild>
        <ModalCover transitionDuration={300} on:click={() => { isVisible = false }}>
            <Modal transitionDuration={300} imagePreset="">
                <LightboxHeader
                    imagePreset=""
                    showCloseButton={true}
                    enableEscapeToClose={true}
                    on:close={() => { isVisible = false }}
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

## The parts

### `<BodyChild>`

Moves its slot to the end of `<body>` on mount and takes it away again on destroy. Nothing else. This is what keeps a
lightbox out of the layout it was written in.

### `<ModalCover>`

The full screen backdrop, carrying the `.svelte-lightbox-overlay` class. Fades in over `transitionDuration * 2`
milliseconds and out over half of it, and forwards `on:click`.

| prop | type | |
| --- | --- | --- |
| `transitionDuration` | `number` | Base duration the fade is calculated from |

### `<Modal>`

The box the image sits in, carrying `.svelte-lightbox-main`. Forwards `on:click`, which is what a lightbox listens to in
order to tell a click on the image apart from a click on the backdrop.

| prop | type | |
| --- | --- | --- |
| `transitionDuration` | `number` | Duration of the fade |
| `imagePreset` | `ImagePreset` | `''`, `'fullscreen'` or `'scroll'` |

### `<LightboxHeader>`

The bar above the image, carrying `.svelte-lightbox-header`. Holds the close button and dispatches `close` both when
that button is pressed and, while `enableEscapeToClose` is on, when escape is pressed.

| prop | type | |
| --- | --- | --- |
| `imagePreset` | `ImagePreset` | Preset the header should follow |
| `showCloseButton` | `boolean` | Renders the close button |
| `enableEscapeToClose` | `boolean` | Dispatches `close` on the escape key |
| `closeButtonProps` | `HTMLButtonElement` | Html props for the close button |

### `<LightboxBody>`

The area holding the image, carrying `.svelte-lightbox-body`. It sizes whatever is placed in its slot, which is why the
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

A clickable wrapper carrying `.svelte-lightbox-thumbnail`, forwarding `on:click`. This is what `<Lightbox>` puts around
the thumbnail slot.

## Gallery parts

A gallery adds navigation on top of the same stack. `<GalleryController>` holds the arrows, the keyboard handling and
the swipe gesture, and expects the stores a gallery keeps its state in.

| prop | type | |
| --- | --- | --- |
| `imageCountStore` | `Writable<number>` | How many images the gallery holds |
| `activeImageStore` | `Writable<number>` | Index of the displayed image |
| `arrowsConfigStore` | `Writable<GalleryArrowsConfig>` | Arrow colour, edge behaviour, keyboard |
| `swipeConfigStore` | `Writable<GallerySwipeConfig>` | Swipe settings |
| `bodyElement` | `HTMLDivElement` | The element drags are read from |

`<PreviousImageButton>` and `<NextImageButton>` are the arrows themselves. Both forward `on:click` and disable
themselves at the edges of the gallery unless `character` is `'loop'`.

| prop | type | |
| --- | --- | --- |
| `activeImage` | `number` | Index of the displayed image |
| `imageCount` | `number` | How many images there are, next arrow only |
| `character` | `GalleryArrowCharacter` | `''`, `'hide'` or `'loop'` |

:::note[Stores, not values]
The gallery parts take stores rather than plain values because the same state is read by several components at once. A
hand composed gallery has to create those stores and keep them updated itself.
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
