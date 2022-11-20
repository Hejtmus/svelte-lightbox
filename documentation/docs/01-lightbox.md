The most basic for of lightbox, displays user clickable image, which on click expands.

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


### customization

Type: `LightboxCustomization (object)`

Customization object contains these props, which represent html props of their key (e.g. closeButtonProps = html props of
close button of).

- closeButtonProps: `HTMLButtonElement`
- lightboxFooterProps: `HTMLDivElement`
- lightboxHeaderProps: `HTMLDivElement`
- lightboxProps: `HTMLDivElement`
- thumbnailProps: `HTMLDivElement`

### transitionDuration

Type: `number`

Duration of lightbox toggle, in milliseconds. Based on this number are calculated transitions for lightbox cover. Default
`300`.

### keepBodyScroll

Type: `boolean`

Keeps body scroll while lightbox is open. Default `false`.

### enableImageExpand

Type: `boolean`

Enables image inside lightbox to resize above its resolution. Default `false`.

### enableFallbackThumbnail

Type: `boolean`

Enables inferring thumbnail from lightbox content, if thumbnail isn't specified. Default `true`.

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

Allows you to programmatically control lightbox visibility without programmaticController. Default varies on user activity.

### programmaticController

Type: `object`

Object with these basic control functions:

- toggle `() => void` - toggles lightbox (opened -> closed, vice versa)
- open `() => void` - opens lightbox
- close `() => void` - closes lightbox

## CSS

If you'd like to change global styles, feel free to override these global CSS classes: `.svelte-lightbox-main`,
`.svelte-lightbox-body`, `.svelte-lightbox-overlay`, `.svelte-lightbox-header`, `.svelte-lightbox-footer` and `.svelte-lightbox-thumbnail`.
