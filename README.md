# Svelte-lightbox

Lightweight Lightbox Svelte component

***In development, stable, tested***

Lightweight Lightbox Svelte component, no vanilla JS or jQuery, just pure Svelte component. There is also support for
mobile devices. Tested on Svelte and Sapper. Note that this component is in development, expect bugs, if you notice some, 
please report them to this component's GitHub repo to the 'Issues' section.

## Instalation

> ```bash
> npm i svelte-lightbox --save-dev
> ```

## How to use

1. Make Svelte page

2. Include `import { Lightbox } from 'svelte-lightbox';` into that file.

3. Make `<Lightbox>` component and image you need to display put inside slot (as its child).

### Standard lightbox

4. You can **check if everything is working**, if you use **Sapper**, don't forget to make this component **SSR**, just include
   it like this `import Lightbox from 'svelte-lightbox/src/Lightbox.svelte'` (this step is not needed in SvelteKit).
   
### Lightbox with gallery

4. Go to import from step `2.` and include `LightboxGallery` and `LightboxImage` as well.

5. Define new array that will contain objects with all descriptions and titles of all images, insert them into
   Lightbox component, example `<Lightbox gallery={myGallery}`.
   ```js
    GalleryArray: [
        GalleryImage,
        GalleryImage,
        ...
    ]
    GalleryImage: {
        title: String /*(supports HTML)*/,
        description: String /*(supports HTML)*/
    }
    ```
6. Put `<img slot="thumbnail">` with prop slot equal to thumbnail inside `<Lightbox>`. This will be the main image, that 
   will users see.

6. Make `<LightboxGallery>` and put it into `<Lightbox>`.

7. Make `<LightboxImage>`, put your `<img>` into it and then make, pass it to your `<LightboxGallery>`.

8. Test functionality and eventually post issue to [this project repository](https://github.com/Hejtmus/svelte-lightbox).
    If you use sapper, don't forget to make imports SSR compatible (this step is not needed in SvelteKit).
   

### Something copyable

```html
<script>
    //Svelte import
    import { 
        Lightbox,
        LightboxImage,
        LightboxGallery
    } from 'svelte-lightbox';
    //Sapper import
	import Lightbox from 'svelte-lightbox/src/Lightbox.svelte';

    /*
    Include all titles and descriptions of your images, this field is optional, and you can set universal 
    title and description by setting it as Lightbox prop.
    */
	
    const gallery = [
     {
      title: 'Cat is eating mouse',
      description: 'Pretty cruel, ieurgv eoirhe hgioh vihvieh vn  if neib '
     },
     {
      title: 'Bike is driven',
      description: `LOL, What a sentence, eriugherheh ioghieo `
     },
     {
      title: 'JS components are downloaded from npm',
      description: 'Obviously, jrgoer iojre oigejgi heiruoiqevj eoirhjv ioehh ve'
     },
     {
      title: 'This component is under development',
      description: `So don't stake your life on it, but it should be pretty stable`
     }
    ];
</script>

    <Lightbox description="Simple lightbox">
        <img src="path" alt="Simple lightbox">
    </Lightbox>

    <Lightbox thumbnail description="Lightbox with thumbnail and image">
        <img slot="thumbnail" src="path/thumbnail.png" alt="Thumbnail">
        <img slot="image" src="path/image.png" alt="Lightbox image">
    </Lightbox>


    <Lightbox {gallery}>
        <!-- Important thing to mention: 
        lightbox gallery needs some thumbnail, you can set it like this, dont worry, this image will be displayed within gallery
         -->
        <img slot="thumbnail" src="./image.png" alt="Simple lightbox">
        <LightboxGallery>
            <LightboxImage>
                <img src="./image.jpg" alt="Simple lightbox">
            </LightboxImage>
            <LightboxImage>
                <img src="./image.png" alt="Simple lightbox">
            </LightboxImage>
            <LightboxImage>
                <img src="./image.png" alt="Simple lightbox">
            </LightboxImage>
        </LightboxGallery>
    </Lightbox>

```

# Tweaks

So, there are options for customizing your Lightbox component.


## `<Lightbox>`

These props are customizable:

### thumbnailClasses `string`

Standard HTML "class" for lightbox thumbnail parent div, this class applies to both, automatically generated thumbnail 
and custom thumbnail (`<LightboxThumbnail>`, keep in mind that `thumbnailClass` styles parent div and not directly 
thumbnail).

### thumbnailStyle `string `

Standard HTML "style" for lightbox thumbnail. Same as `thubmnailClasses`, but this is style.

### modalClasses `string`

Standard HTML "class" for lightbox modal.
  
### modalStyle `string`

Standard HTML "style" for lightbox modal.
  
### transitionDuration `number`

Duration of lightbox toggle, in milliseconds. Based on this number are calculated transitions for lightbox cover. Default
`500`.
  
### protect `boolean`

Enable protection of image from being dragged and dropped (disabled drag'n'drop). Default `false`.
  
### title `string/HTML`

Image's title that is displayed below the image (in a lightbox), feel free to use HTML (eg, `<br>`, `<span>`). Everything 
in a lightbox footer is aligned to the left, but you can override it by putting it into `<span>` which would allow you to
apply a different style or a class of your choosing.

***IMPORTANT: When used with gallery, title acts as universal title for all images in gallery***
  
### description `string/HTML`

Image's description that is, similarly to the title, displayed under the image (in a lightbox). The difference between 
those two is the title is wrapped in `<h2>` and description is wrapped in `<h5>`.

***IMPORTANT: When used with gallery, description acts as universal description for all images in gallery***
  
### ~~portrait~~ `boolean` ***DEPRECATED -> use `imagePreset="fit"`***

~~Enables improved portrait mode.~~
  
### noScroll `boolean`

Disables body scrolling while in lightbox mode, default `true`.


### gallery `array of objects` 

Array containing objects with Lightbox descriptions and titles. Optional, if you don't need image specific title and 
description, you can specify universal by passing props *title* and *description* to `<Lightbox>` component.

### imagePreset `string` 

Select between 4 presets: fit, expand, fullscreen, scroll.

#### fit

Makes big image fit into small viewport.

#### fullscreen ***RELATIVELY NEW: works well, passed 1st level of testing, but currently is in testing in production***

Makes image fullscreen to cover at least one of axes.

#### expand ***PESKY: Behaves broken in some situations***

Expands image above its resolution to fill user's viewport.

#### scroll ***EXPERIMENTAL: don't use in production***

Enables scrolling big image instead of making it smaller to fit into the screen.

### isVisible `boolean`

Allows you to programmatically control lightbox visibility. Default varies on user activity.

### clickToClose `boolean`

Anywhere user clicks when modal is opened, closes it. Default `false`.

### closeButton `boolean`

Enables close button. Default `true`.

## `<LightboxThumbnail>`

### class `string`

Standard HTML "class" for lightbox thumbnail, classes are separated by space, just like classic HTML class.

### style `string`

Standard HTML "style" for lightbox thumbnail, similar to thumbnailStyle. 

## `<LightboxGallery>`

### activeImage `number`

Number that points set visibility of image. Also optional, this is used for programmatic selecting of visible image when
Lightbox is opened.

### galleryArrowsColor `string`

Sets color of arrows for navigation between images in gallery. Valid is any valid CSS color. Default `black`.

### galleryArrowsCharacter `string`

Sets arrow charter in edge cases (0th and last item of gallery). Valid values: `unset`, `hide`, `loop`

#### unset

Leaves arrow inactive and disables particular arrow on keyboard in edge case.

#### hide

Hides arrow and disables particular arrow on keyboard in edge case.

#### loop

Arrows are always active and keyboard arrows as well. For instance when user clicks left arrow on first image, last image
will be displayed.

### disableKeyboardArrowsControl `boolean`

Disables navigation withing gallery using keyboard arrows. Default `false`.

# Pro tips

- Images in lightbox behave in the same way as their thumbnails, if you need to behave differently, override thumbnail
  with other image, or the same image, but with different style

- If you want to disable drag'n'drop over lightbox, pass protected prop to `<Lightbox>` component

# Future

I plan to improve this component in the future, but I don't have much time.
So feel free to contribute some code if you will. This component needs CSS rework.

# License

## It's free

This component is under MIT license.