The most basic for of lightbox, displays user clickable image, which on click expands.

## Props

Basic customization is done by setting prop(s) to desired value.

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


### customization `LightboxCustomization (object)`

Customization object contains these props, which represent html props of their key (e.g. closeButtonProps = html props of
close button of).

- closeButtonProps: `HTMLButtonElement`
- lightboxFooterProps: `HTMLDivElement`
- lightboxHeaderProps: `HTMLDivElement`
- lightboxProps: `HTMLDivElement`
- thumbnailProps: `HTMLDivElement`

### transitionDuration `number`

Duration of lightbox toggle, in milliseconds. Based on this number are calculated transitions for lightbox cover. Default
`300`.

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

Allows you to programmatically control lightbox visibility without programmaticController. Default varies on user activity.

### programmaticController

Object with these basic control functions:

- toggle `() => void` - toggles lightbox (opened -> closed, vice versa)
- open `() => void` - opens lightbox
- close `() => void` - closes lightbox
