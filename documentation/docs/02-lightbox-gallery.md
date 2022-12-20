Lightbox component with explicitly defined thumbnail layout and multiple images, allows listing thorough all images within
gallery. According to almost 2 years experience of using this component (in early versions), I found out, that gallery without
thumbnail layout doesn't give any sense in most of the cases, so I decided to embed this feature in design of this component.

## Props

Same as `<Lightbox>`, `<LightboxGallery>` can be customized as well.

### title

Type: `string/HTML`

Same as [`<Lightbox>` title](https://svelte-lightbox.js.org/docs/lightbox#title), but this applies to whole gallery. 
`<GalleryImage>` can override this title for specific image.

### description

Type: `string/HTML`

Same as [`<Lightbox>` description](https://svelte-lightbox.js.org/docs/lightbox#description), but this applies to whole 
gallery.`<GalleryImage>` can override this description for specific image.

### imagePreset

Type: `ImagePrest (string)`

Same as [`<Lightbox>` imagePreset](https://svelte-lightbox.js.org/docs/lightbox#imagepreset).

### customization

Type: `LightboxCustomization (object)`

Same as [`<Lightbox>` customization](https://svelte-lightbox.js.org/docs/lightbox#customization).

### transitionDuration

Type: `number`

Same as [`<Lightbox>` transitionDuration](https://svelte-lightbox.js.org/docs/lightbox#transitionduration).

### keepBodyScroll

Type: `boolean`

Same as [`<Lightbox>` keepBodyScroll](https://svelte-lightbox.js.org/docs/lightbox#keepbodyscroll).

### enableImageExpand

Type: `boolean`

Same as [`<Lightbox>` enableImageExpand](https://svelte-lightbox.js.org/docs/lightbox#enableimageexpand).

### enableEscapeToClose

Type: `boolean`

Same as [`<Lightbox>` enableEscapeToClose](https://svelte-lightbox.js.org/docs/lightbox#enableescapetoclose).

### enableClickToClose

Type: `boolean`

Same as [`<Lightbox>` enableClickToClose](https://svelte-lightbox.js.org/docs/lightbox#enableclicktoclose).

### showCloseButton

Type: `boolean`

Same as [`<Lightbox>` showCloseButton](https://svelte-lightbox.js.org/docs/lightbox#showclosebutton).

### isVisible

Type: `boolean`

Same as [`<Lightbox>` isVisible](https://svelte-lightbox.js.org/docs/lightbox#isvisible).

### activeImage

Type: `number`

Number which sets visibility of image with id equal to it. Also optional, this is used for programmatic selecting of
visible image when Lightbox is opened.

### arrowsConfig

Type: `GalleryArrowsConfig (object)`

Allows customizing gallery arrows.

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

### programmaticController

Type: `object`

Object with these basic control functions:

- toggle `() => void` - toggles lightbox (opened -> closed, vice versa)
- open `() => void` - opens lightbox
- openImage `(imageId: number) => void` - opens lightbox at specific image
- close `() => void` - closes lightbox

## `<GalleryThumbnail>`

In order to use `<LightboxGallery>` is needed to define layout of gallery thumbnail/s. Thumbnail takes element in slot
and displays it to user, whenever user clicks on it, it opens gallery at image associated with this thumbnail.

### id

Type: `number`

Link to gallery image, it can be set to any number within gallery images, starting with 0. Default is order of
`<GalleryThumbnail>`, so let's say you have 3 thumbnails under `<LightboxGallery>`, the first thumbnails has id 0, next one
1 and third 2.

## `<GalleryImage>`

Except thumbnails, `LightboxGallery` requires images which will be displayed when gallery is opened. Desired image has to
be `<GalleryImage>` child (in its slot).

### title

Type: `string/HTML`

Same as `<Lightbox>` title, but this is image specific, that means, it will be only shown for particular image.

### description

Type: `string/HTML`

Same as `<Lightbox>` description, but this is image specific, that means, it will be only shown for particular image.

## CSS

`<LightboxGallery>` uses same CSS classes as `<Lightbox>`, overriding [those classes](https://svelte-lightbox.js.org/docs/lightbox#css)
will affect gallery style.
