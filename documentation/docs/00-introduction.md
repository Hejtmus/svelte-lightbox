svelte-lightbox is svelte library providing lightbox component(s) and its building parts to allow more customization. 
Architecture of this library makes it fit for wide array of use cases. This library tries to be as minimal as possible,
that's why its size is so low. To reduce bundle size of projects using svelte-lightbox, this library supports tree-shaking.

## Instalation

> ```bash
> npm i svelte-lightbox -D
> ```

## How to use

1. Make Svelte page

### Standard lightbox

2. Include `import { Lightbox } from 'svelte-lightbox';` into that file.

3. Make `<Lightbox>` component and image you need to display put inside slot (as its child).

### Lightbox with gallery

2. Include `import { LightboxGallery, GalleryImage, GalleryThumbnail } from 'svelte-lightbox';` into that file.

3. Make `<LightboxGallery>` component and append to it list of `<GalleryImage>`, which each `<GalleryImage>` contains
   desired image (or it could be video).

4. Prepend `<LightboxGallery>` with element or svelte:fragment with prop slot equal to `"thumbnail"`, under this element
   place your thumbnail layout, which is basically layout with images wrapped inside `<GalleryThumbnail>`.
