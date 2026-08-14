# svelte-lightbox

Lightweight lightbox library for Svelte

![workflow status](https://img.shields.io/github/actions/workflow/status/Hejtmus/svelte-lightbox/nodejs.yml)
![version](https://img.shields.io/npm/v/svelte-lightbox)
![bundle size](https://img.shields.io/bundlephobia/minzip/svelte-lightbox)
![MIT](https://img.shields.io/github/license/Hejtmus/svelte-lightbox)
![issues count](https://img.shields.io/github/issues/Hejtmus/svelte-lightbox)
![downloads](https://img.shields.io/npm/dw/svelte-lightbox)

Lightweight Lightbox, but very customizable Svelte component library. There is also support for
mobile devices. If you notice any bug, please report it to this library's GitHub repository to the 'Issues' section.

The full documentation lives at [svelte-lightbox.js.org](https://svelte-lightbox.js.org).

## Instalation

> ```bash
> npm i svelte-lightbox -D
> ```

The components are written in runes mode and need **Svelte 5**. Stay on svelte-lightbox 1.x for Svelte 3 and 4.

### Coming from version 1

- The `thumbnail` slot became a `thumbnail` snippet, and slot content became children.
- `programmaticController` is gone. The same functions are instance methods, reached with `bind:this`.
- Forwarded events became callback props: `on:click` is now `onclick`, and `<LightboxHeader>` calls `onclose`.
- A hand composed gallery holds its state in `createGallery` rather than in four stores of its own.

## How to use

1. Make Svelte page

### Standard lightbox

2. Include `import { Lightbox } from 'svelte-lightbox';` into that file.

3. Make `<Lightbox>` component and image you need to display put inside it (as its child).

### Lightbox with gallery

2. Include `import { LightboxGallery, GalleryImage, GalleryThumbnail } from 'svelte-lightbox';` into that file.

3. Make `<LightboxGallery>` component and append to it list of `<GalleryImage>`, which each `<GalleryImage>` contains 
desired image (or it could be video).

4. Give `<LightboxGallery>` a `thumbnail` snippet holding your thumbnail layout, which is basically layout with images
wrapped inside `<GalleryThumbnail>`.


### Common use cases

```svelte
<script>
    import { 
        Lightbox,
        LightboxGallery,
        GalleryThumbnail,
        GalleryImage
    } from 'svelte-lightbox'
    
    let programmaticLightbox
</script>

    <!-- Lightbox with image same as thumbnail -->
    <Lightbox description="Simple lightbox">
        <img src="path" alt="Simple lightbox">
    </Lightbox>

    <!-- Lightbox with different image from thumbnail -->
    <Lightbox description="Lightbox with thumbnail and image">
        {#snippet thumbnail()}
            <img src="path/thumbnail.png" alt="Thumbnail">
        {/snippet}

        <img src="path/image.png" alt="Lightbox image">
    </Lightbox>

    <!-- Programmatically controlled lightbox without thumbnail -->
    <Lightbox enableFallbackThumbnail={false} bind:this={programmaticLightbox}
              description="Simple lightbox">
        <img src="path" alt="Simple lightbox">
    </Lightbox>

    <LightboxGallery>
        <!-- Layout-->
        {#snippet thumbnail()}
            <div class="sample-class-1">
                <GalleryThumbnail>
                    <img src="./thumbnail-0.jpg" alt="Simple lightbox">
                </GalleryThumbnail>
                <div class="sample-class-2">
                    <div class="sample-class-3">
                        <img src="./thumbnail-0.jpg" alt="Simple lightbox">
                    </div>
                    <div class="sample-class-4">
                        <img src="./thumbnail-0.jpg" alt="Simple lightbox">
                    </div>
                </div>
            </div>
        {/snippet}
        
        <GalleryImage>
            <img src="./image-0.jpg" alt="Simple lightbox">
        </GalleryImage>
        <GalleryImage>
            <img src="./image-1.jpg" alt="Simple lightbox">
        </GalleryImage>
        <GalleryImage>
            <img src="./image-2.jpg" alt="Simple lightbox">
        </GalleryImage>
    </LightboxGallery>

```

If you need more usage examples, you should see demo page code at this library GitHub repository.

# API

This library mainly consists out of 2 components which are `<Lightbox>` and `<LightboxGallery>`, but their customization
is significant part of using them.

## `<Lightbox>`

This component is meant to be used to display image, which is clickable, that click will trigger action to open same or
different image in larger scale.

### title `string/HTML`

Image's title that is displayed below the image (in a lightbox), feel free to use HTML (eg, `<br>`, `<span>`). Everything
in a lightbox footer is aligned to the left, but you can override it by putting it into `<span>` which would allow you to
apply a different style or a class of your choosing.

### description `string/HTML`

Image's description that is, similarly to the title, displayed under the image (in a lightbox). The difference between
those two are the title is wrapped in `<h2>` and description is wrapped in `<h5>`.

### imagePreset `ImagePrest (string)`

Select between these 3 presets:

- `''` - Default preset, doesn't make any drastic behavior changes, just displays image in its maximum size and fits into viewport.

- `'fullscreen'` - Makes image fullscreen to cover at least one of axes.

- `'scroll'` - Enables scrolling big image instead of making it smaller to fit into the screen.


### transitionPreset `TransitionPreset (string)`

Select between these 2 presets:

- `''` - Default preset, the lightbox fades in over the page.

- `'crossfade'` - The thumbnail expands into the opened image, and the image shrinks back into the thumbnail on closing.
The image itself travels, at full opacity, rather than one image fading out while another fades in. The thumbnail stays
where it is and the image lands on top of it. The flight takes `transitionDuration` in each direction, unlike the plain
fade which arrives over twice that and leaves over half. The effect is worth the most where the thumbnail is small next
to the image it opens.

### customization `LightboxCustomization (object)/CSS`

#### Using `LightboxCustomization` object

Customization object contains these props, which represent html props of their key (e.g. closeButtonProps = html props of
close button of).

- closeButtonProps: `HTMLButtonAttributes`
- lightboxFooterProps: `HTMLAttributes<HTMLDivElement>`
- lightboxHeaderProps: `HTMLAttributes<HTMLDivElement>`
- coverProps: `HTMLAttributes<HTMLDivElement>`
- lightboxProps: `HTMLAttributes<HTMLDivElement>`
- thumbnailProps: `HTMLAttributes<HTMLDivElement>`

#### Using CSS

If you'd like to change global styles, feel free to override these global CSS classes instead: `.svelte-lightbox-main`, 
`.svelte-lightbox-body`, `.svelte-lightbox-overlay`, `.svelte-lightbox-header`, `.svelte-lightbox-footer` and `.svelte-lightbox-thumbnail`.

### transitionDuration `number`

Duration of lightbox toggle, in milliseconds. Based on this number are calculated transitions for lightbox cover, and
the flight of the image under the crossfade preset. Default `300`.
  
### keepBodyScroll `boolean`

Keeps body scroll while lightbox is open. Default `false`.

### enableImageExpand `boolean`

Enables image inside lightbox to resize above its resolution. Default `false`.

### enableFallbackThumbnail `boolean`

Enables inferring thumbnail from lightbox content, if thumbnail isn't specified. Default `true`.

### enableEscapeToClose `boolean`

Enables closing lightbox on keydown which is equal to escape button. Default `true`.

### enableClickToClose `boolean`

Anywhere user clicks when modal is opened, closes it. Default `false`.

### showCloseButton `boolean`

Shows close button. Default `true`.

### isVisible `boolean`

Bindable. Allows you to control lightbox visibility as a piece of your own state. Default varies on user activity.

### Instance methods

Reached through `bind:this`:

- toggle `() => void` - toggles lightbox (opened -> closed, vice versa)
- open `() => void` - opens lightbox
- close `() => void` - closes lightbox

---

## `<LightboxGallery>`

Lightbox component with explicitly defined thumbnail layout and multiple images, allows listing thorough all images within 
gallery. According to almost 2 years experience of using this component (in early versions), I found out, that gallery without 
thumbnail layout doesn't give any sense in most of the cases, so I decided to embed this feature in design of this component. 


### title `string/HTML`

Same as in `<Lightbox>` title, but this is same in whole gallery. `<GalleryImage>` can override this title for specific image.

### description `string/HTML`

Same as in `<Lightbox>` description, but this is same in whole gallery. `<GalleryImage>` can override this description for 
specific image.

### imagePreset `ImagePrest (string)`

Same as in `<Lightbox>`.

### transitionPreset `TransitionPreset (string)`

Same as in `<Lightbox>`. Every thumbnail says where it sits, so `'crossfade'` grows the image out of the thumbnail that
was clicked, and sends it back into the thumbnail of whichever image is displayed on closing.

### customization `LightboxCustomization (object)`

Same as in `<Lightbox>`.

### transitionDuration `number`

Same as in `<Lightbox>`.

### keepBodyScroll `boolean`

Same as in `<Lightbox>`.

### enableImageExpand `boolean`

Same as in `<Lightbox>`.

### enableEscapeToClose `boolean`

Same as in `<Lightbox>`.

### enableClickToClose `boolean`

Same as in `<Lightbox>`.

### showCloseButton `boolean`

Same as in `<Lightbox>`.

### isVisible `boolean`

Same as in `<Lightbox>`.

### activeImage `number`

Bindable. Number which sets visibility of image with id equal to it. Also optional, this is used for programmatic selecting of 
visible image when Lightbox is opened.

### arrowsConfig `Partial<GalleryArrowsConfig> (object)`

Allows customizing gallery arrows. Fields left out keep their default.

#### color `string`

Sets arrow color, valid value is any valid css color.

#### character `GalleryArrowCharacter (string)`

Sets arrow charter in edge cases (0th and last item of gallery). Valid values:

- `''` - Leaves arrow inactive and disables particular arrow on keyboard in edge case.

- `'hide'` - Hides arrow and disables particular arrow on keyboard in edge case.

- `'loop'` - Arrows are always active and keyboard arrows as well. For instance when user clicks left arrow on first image, last image
will be displayed.

#### enableKeyboardControl `boolean`

Enables navigation in gallery using keyboard arrows. Default `true`.

### swipeConfig `Partial<GallerySwipeConfig> (object)`

Allows customizing swipe navigation, which lets the user drag the displayed image sideways to move through the gallery.
Fields left out keep their default.

#### enabled `boolean`

Enables swipe navigation. Default `false`.

#### threshold `number`

Distance in pixels the image has to be dragged for the move to complete on release. Default `50`.

#### enableMouseDrag `boolean`

Enables swiping with a mouse, in addition to touch. Default `true`.

### Instance methods

Reached through `bind:this`:

- toggle `() => void` - toggles lightbox (opened -> closed, vice versa)
- open `() => void` - opens lightbox
- openImage `(imageId: number) => void` - opens lightbox at specific image
- close `() => void` - closes lightbox

---

## `<GalleryThumbnail>`

#### id `number`

Link to gallery image, it can be set to any number within gallery images, starting with 0. Default is order of 
`<GalleryThumbnail>`, so let's say you have 3 thumbnails under `<LightboxGallery>`, the first thumbnails has id 0, next one
1 and third 2.

---

## `<GalleryImage>`

### title `string/HTML`

Same as `<Lightbox>` title, but this is image specific, that means, it will be only shown for particular image.

### description `string/HTML`

Same as `<Lightbox>` description, but this is image specific, that means, it will be only shown for particular image.

---

## Custom lightbox

This library by design allows you to construct custom lightbox by providing you with basic building block of lightbox. 
If you want to use this advanced functionality, you are supposed to read code (I recommend reading it from GitHub, code 
from NPM is already processed) of basic building blocks and examples of their usage (`<Lightbox>`, `<LightboxGallery>`) 
as well, this documentation is only brief overview. You can take available building blocks and lay them down in different 
way, or replace some of them by your own tweaked variants. Basic building blocks are:

### Building blocks of lightbox modal

#### `<LightboxThumbnail>`

Name says it all.

#### `<BodyChild>`

Makes itself a direct child of `<body>`, this can be especially useful when using CSS frameworks, which can break
`z-index` effect in some cases (element with higher index is lower than element with lower index). Its children are
rendered after that move, so anything inside measuring itself measures the place it actually ends up in.

#### `<ModalCover>`

Cover behind lightbox modal, dimmed background.

#### `<Modal>`

Name says it all.

#### `<LightboxHeader>`

Header of lightbox modal, contains close button as well as window keypress binding.

#### `<LightboxHeader>`

Body of lightbox modal, contains lightbox image.

#### `<LightboxFooter>`

Footer of lightbox modal, contains title, description of image and gallery counter.

#### `<GalleryController>`

Layout with image space, left and right arrow, keyboard handling of gallery. It reads the gallery state created by
`createGallery`.

#### `createGallery`, `swipeNavigation`, `expand` and `dim`

`createGallery` holds the state a gallery shares with its thumbnails and images, and shares it downwards.
`swipeNavigation` is the attachment turning drags on the element holding the images into moves through the gallery.
`expand` is the transition flying an image out of the place a thumbnail holds, and `dim` is the one darkening the page
behind a lightbox by fading the backdrop colour rather than the element carrying it.

#### `<PreviousImageButton>` and `<NextImageButton>`

Buttons which allow you to move within gallery.

---

## i18n

There is 1 thing that has to be localized and that is gallery counter, that what shows user where in gallery is located 
(e.g. Image 2 of 4). Gallery counter text can be customized by overriding its generator. That can be done by importing 
i18n from 'svelte-lightbox' and then setting `generateLocalizedGalleryCounter` to desired generator. 

### Default `generateLocalizedGalleryCounter`

```ts
    (activeImage: number, imageCount: number): string => {
        return `Image ${activeImage + 1} of ${imageCount}`
    }
```

# Contribution

Every issue or code contribution is welcome.

# License

It's free, this component is under MIT license.
