---
title: Lightbox
description: The basic lightbox component and all of its props
---

# Lightbox

The most basic for of lightbox, displays user clickable image, which on click expands.

```svelte
<script>
    import { Lightbox } from 'svelte-lightbox'
</script>

<Lightbox title="A cat" description="Photographed last summer">
    <img src="/img/cat.jpg" alt="A cat">
</Lightbox>
```

## Props

Basic customization is done by setting prop(s) to desired value.

### title

Type: `string/HTML`

Image's title that is displayed below the image (in a lightbox), feel free to use HTML (eg, `<br>`, `<span>`). Everything
in a lightbox footer is aligned to the left, but you can override it by putting it into `<span>` which would allow you to
apply a different style or a class of your choosing.

### description

Type: `string/HTML`

Image's description that is, similarly to the title, displayed under the image (in a lightbox). The difference between
those two are the title is wrapped in `<h2>` and description is wrapped in `<h5>`.

### imagePreset

Type: `ImagePrest (string)`

Select between these 3 presets:

- `''` - Default preset, doesn't make any drastic behavior changes, just displays image in its maximum size and fits into viewport.

- `'fullscreen'` - Makes image fullscreen to cover at least one of axes.

- `'scroll'` - Enables scrolling big image instead of making it smaller to fit into the screen.


### transitionPreset

Type: `TransitionPreset (string)`

Selects how the lightbox arrives and leaves:

- `''` - Default preset, the lightbox fades in over the page.

- `'crossfade'` - The thumbnail expands into the opened image, and the image shrinks back into the thumbnail on
closing.

The image itself travels, at full opacity, rather than one image fading out while another fades in. It is measured
against wherever the thumbnail sits at the moment the flight begins, so scrolling the page behind an open lightbox
still sends the image home to the right place.

The flight takes [`transitionDuration`](#transitionduration) in each direction, opening and closing alike, since it
covers the same ground either way. A lightbox without the preset keeps its gentler arrival and brisker dismissal.

```svelte
<Lightbox transitionPreset="crossfade" transitionDuration={450}>
    {#snippet thumbnail()}
        <img src="/img/cat-small.jpg" alt="A cat">
    {/snippet}

    <img src="/img/cat.jpg" alt="A cat">
</Lightbox>
```

:::tip[Give it a small thumbnail]
The effect is the distance travelled. A thumbnail that already fills half the screen has nowhere to grow from, so
crossfading is worth the most where the thumbnail is small next to the image it opens.
:::

### customization

Type: `LightboxCustomization (object)`

Customization object contains these props, which represent html props of their key (e.g. closeButtonProps = html props of
close button of).

- closeButtonProps: `HTMLButtonAttributes`
- lightboxFooterProps: `HTMLAttributes<HTMLDivElement>`
- lightboxHeaderProps: `HTMLAttributes<HTMLDivElement>`
- coverProps: `HTMLAttributes<HTMLDivElement>`
- lightboxProps: `HTMLAttributes<HTMLDivElement>`
- thumbnailProps: `HTMLButtonAttributes`

### transitionDuration

Type: `number`

Duration of lightbox toggle, in milliseconds. Based on this number are calculated transitions for lightbox cover, and
for the flight of the image under the [crossfade preset](#transitionpreset). Default `300`.

### keepBodyScroll

Type: `boolean`

Keeps body scroll while lightbox is open. Default `false`.

### enableImageExpand

Type: `boolean`

Enables image inside lightbox to resize above its resolution. Default `false`.

### enableFallbackThumbnail

Type: `boolean`

Enables inferring thumbnail from lightbox content, if the `thumbnail` snippet isn't specified. Default `true`.

### enableEscapeToClose

Type:`boolean`

Enables closing lightbox on keydown which is equal to escape button. Default `true`.

### enableClickToClose

Type: `boolean`

Anywhere user clicks when modal is opened, closes it. Default `false`.

### showCloseButton

Type: `boolean`

Shows close button. Default `true`.

### isVisible

Type: `boolean`

Bindable. Allows you to control lightbox visibility as a piece of your own state, rather than through the component
instance. Default varies on user activity.

## Snippets

### thumbnail

The element the reader clicks to open the lightbox. Leave it out and the lightbox content stands in for it, unless
[`enableFallbackThumbnail`](#enablefallbackthumbnail) says otherwise.

### children

The content the lightbox displays, written as the component's children.

```svelte
<Lightbox>
    {#snippet thumbnail()}
        <img src="/img/cat-small.jpg" alt="A cat">
    {/snippet}

    <img src="/img/cat.jpg" alt="A cat">
</Lightbox>
```

## Controlling it from code

The component exposes its controls as instance methods, so a `bind:this` reference is everything needed to open or close
a lightbox from elsewhere on the page.

- toggle `() => void` - toggles lightbox (opened -> closed, vice versa)
- open `() => void` - opens lightbox
- close `() => void` - closes lightbox

```svelte
<script>
    import { Lightbox } from 'svelte-lightbox'

    let lightbox
</script>

<button onclick={() => lightbox.open()}>Open the cat</button>

<Lightbox bind:this={lightbox} enableFallbackThumbnail={false}>
    <img src="/img/cat.jpg" alt="A cat">
</Lightbox>
```

## CSS

If you'd like to change global styles, feel free to override these global CSS classes: `.svelte-lightbox-main`,
`.svelte-lightbox-body`, `.svelte-lightbox-overlay`, `.svelte-lightbox-header`, `.svelte-lightbox-footer` and `.svelte-lightbox-thumbnail`.
