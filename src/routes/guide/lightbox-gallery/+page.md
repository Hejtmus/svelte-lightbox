---
title: LightboxGallery
description: The gallery component, its thumbnails, images and navigation
---

# LightboxGallery

Lightbox component with explicitly defined thumbnail layout and multiple images, allows listing thorough all images within
gallery. According to almost 2 years experience of using this component (in early versions), I found out, that gallery without
thumbnail layout doesn't give any sense in most of the cases, so I decided to embed this feature in design of this component.

```svelte
<script>
    import { LightboxGallery, GalleryImage, GalleryThumbnail } from 'svelte-lightbox'

    const images = [1, 2, 3]
</script>

<LightboxGallery arrowsConfig={{ character: 'loop' }} swipeConfig={{ enabled: true }}>
    {#snippet thumbnail()}
        {#each images as image (image)}
            <GalleryThumbnail>
                <img src="/img/{image}.jpg" alt="Image {image}">
            </GalleryThumbnail>
        {/each}
    {/snippet}

    {#each images as image (image)}
        <GalleryImage title="Image {image}">
            <img src="/img/{image}.jpg" alt="Image {image}">
        </GalleryImage>
    {/each}
</LightboxGallery>
```

## Props

Same as `<Lightbox>`, `<LightboxGallery>` can be customized as well.

### title

Type: `string/HTML`

Same as [`<Lightbox>` title](/guide/lightbox/#title), but this applies to whole gallery. 
`<GalleryImage>` can override this title for specific image.

### description

Type: `string/HTML`

Same as [`<Lightbox>` description](/guide/lightbox/#description), but this applies to whole 
gallery.`<GalleryImage>` can override this description for specific image.

### imagePreset

Type: `ImagePrest (string)`

Same as [`<Lightbox>` imagePreset](/guide/lightbox/#imagepreset).

### customization

Type: `LightboxCustomization (object)`

Same as [`<Lightbox>` customization](/guide/lightbox/#customization).

### transitionDuration

Type: `number`

Same as [`<Lightbox>` transitionDuration](/guide/lightbox/#transitionduration).

### keepBodyScroll

Type: `boolean`

Same as [`<Lightbox>` keepBodyScroll](/guide/lightbox/#keepbodyscroll).

### enableImageExpand

Type: `boolean`

Same as [`<Lightbox>` enableImageExpand](/guide/lightbox/#enableimageexpand).

### enableEscapeToClose

Type: `boolean`

Same as [`<Lightbox>` enableEscapeToClose](/guide/lightbox/#enableescapetoclose).

### enableClickToClose

Type: `boolean`

Same as [`<Lightbox>` enableClickToClose](/guide/lightbox/#enableclicktoclose).

### showCloseButton

Type: `boolean`

Same as [`<Lightbox>` showCloseButton](/guide/lightbox/#showclosebutton).

### isVisible

Type: `boolean`

Same as [`<Lightbox>` isVisible](/guide/lightbox/#isvisible).

### activeImage

Type: `number`

Bindable. Number which sets visibility of image with id equal to it. Also optional, this is used for programmatic
selecting of visible image when Lightbox is opened.

### arrowsConfig

Type: `Partial<GalleryArrowsConfig> (object)`

Allows customizing gallery arrows. Fields left out keep their default, so a single one can be overridden on its own.

#### color

Type: `string`

Sets arrow color, valid value is any valid css color.

#### character

Type: `GalleryArrowCharacter (string)`

Sets arrow charter in edge cases (0th and last item of gallery). Valid values:

- `''` - Leaves arrow inactive and disables particular arrow on keyboard in edge case.

- `'hide'` - Hides arrow and disables particular arrow on keyboard in edge case.

- `'loop'` - Arrows are always active and keyboard arrows as well. For instance when user clicks left arrow on first image, last image
  will be displayed.

#### enableKeyboardControl

Type: `boolean`

Enables navigation in gallery using keyboard arrows. Default `true`.

### swipeConfig

Type: `Partial<GallerySwipeConfig> (object)`

Allows customizing swipe navigation. Swiping lets user drag the displayed image sideways to move through the gallery. The
image follows the pointer during the drag and the neighbouring image is revealed behind the edge it is dragged away from.
Releasing the drag either completes the move to the neighbouring image, or returns the current one back to its place when
the drag was too short.

Because the neighbouring image has to be visible during the drag, images next to the displayed one are rendered as well
whenever swiping is enabled. Browser may therefore start downloading them sooner than it would otherwise.

Edge cases (0th and last image of gallery) follow [`arrowsConfig.character`](#character), so swiping wraps around only when
arrows do.

#### enabled

Type: `boolean`

Enables swipe navigation. Default `false`, so galleries keep behaving exactly as before until swiping is opted into.

#### threshold

Type: `number`

Distance in pixels the image has to be dragged for the move to complete on release. Shorter drags return the image back to
its place. Default `50`.

#### enableMouseDrag

Type: `boolean`

Enables swiping with a mouse by dragging the image, in addition to touch. Turn this off when dragging conflicts with
selecting or dragging images on desktop. Default `true`.

## Snippets

### thumbnail

The layout the reader clicks, holding the `<GalleryThumbnail>` elements. A gallery without one does not make sense in
most cases, which is why it is part of the component's design rather than something to add later.

### children

The `<GalleryImage>` elements the gallery displays, written as the component's children.

## Controlling it from code

The component exposes its controls as instance methods, reached through a `bind:this` reference.

- toggle `() => void` - toggles lightbox (opened -> closed, vice versa)
- open `() => void` - opens lightbox
- openImage `(imageId: number) => void` - opens lightbox at specific image
- close `() => void` - closes lightbox

```svelte
<script>
    import { LightboxGallery, GalleryImage } from 'svelte-lightbox'

    let gallery
</script>

<button onclick={() => gallery.openImage(1)}>Open the second image</button>

<LightboxGallery bind:this={gallery}>
    ...
</LightboxGallery>
```

## `<GalleryThumbnail>`

In order to use `<LightboxGallery>` is needed to define layout of gallery thumbnail/s. Thumbnail takes an element as its
children and displays it to user, whenever user clicks on it, it opens gallery at image associated with this thumbnail.

### id

Type: `number`

Link to gallery image, it can be set to any number within gallery images, starting with 0. Default is order of
`<GalleryThumbnail>`, so let's say you have 3 thumbnails under `<LightboxGallery>`, the first thumbnails has id 0, next one
1 and third 2.

## `<GalleryImage>`

Except thumbnails, `LightboxGallery` requires images which will be displayed when gallery is opened. Desired image has to
be written as `<GalleryImage>` children.

### title

Type: `string/HTML`

Same as `<Lightbox>` title, but this is image specific, that means, it will be only shown for particular image.

### description

Type: `string/HTML`

Same as `<Lightbox>` description, but this is image specific, that means, it will be only shown for particular image.

## CSS

`<LightboxGallery>` uses same CSS classes as `<Lightbox>`, overriding [those classes](/guide/lightbox/#css)
will affect gallery style.
