# Svelte-lightbox

***In development, stable, tested***

Lightweight Lightbox Svelte component, no vanilla JS or jQuery, just pure Svelte component. There is also support for
mobile devices. Tested on Svelte and Sapper. Note that this component is in development, expect bugs, if you notice some, 
please report them to this component's GitHub repo to the 'Issues' section.

Gallery feature is on its way, please be patient

## Instalation

> ```bash
> npm i svelte-lightbox --save-dev
> ```

## How to use

1. Make Svelte page
2. Include `import { Lightbox } from 'svelte-lightbox';` into that file.
3. Make Lightbox galleries and put them into `<Lightbox>` as prop, image put inside slot (as its child). You are done.
4. **Warning, in this version step 4 is redundant, because feature is not implemented**. Define new array that will contain 
all descriptions of all images, insert them into Lightbox component, example `<Lightbox gallery={myGallery}`.
5. You can **check if everything is working**, if you use **Sapper**, don't forget to make this component **SSR**, just include
it like this `import Lightbox from 'svelte-lightbox/src/Lightbox.svelte'`.


### Something copyable

```html
<script>
    //Svelte import
    import { 
        Lightbox
    } from 'svelte-lightbox';
    //Sapper import
	import Lightbox from 'svelte-lightbox/src/Lightbox.svelte';

    // NOTE - Gallery feature is NOT implemented in this version

    //Include all titles of your images, this is also used as number that indicate count of sections
    const gallery = [
        'Cat is eating mouse',
        'Bike is driven',
        'JS components are downloaded from npm',
        'This component is being developed'
    ];
    //Have to set to 0 (or image you wish to display as default), otherwise lightbox will not display
    let activeImage = 0;
    //END OF NON EXISTING FEATURE
</script>

    // THIS WORKS, STABLE, TESTED

    <Lightbox description="Simple lightbox">
        <img src="path" alt="Simple lightbox">
    </Lightbox>

    // END OF IMPLEMENTED CODE

    // AS MENTIONED BEFORE, GALLERY FEATURE IS NOT PRESENT, USE UPPER CODE ^^^

    <Lightbox {gallery} imageId="0" bind:activeImage>
        <img src="path" alt="Someone is having tough time">
    </Lightbox>
    <Lightbox {gallery} imageId="1" bind:activeImage>
        <img src="path" alt="That ninja is impressively fast">
    </Lightbox>
    <Lightbox {gallery} imageId="2" bind:activeImage>
        <img src="path" alt="NPM rocks">
    </Lightbox>
    <Lightbox {gallery} imageId="2" bind:activeImage>
        <img src="path" alt="svelte-lightbox is not done yet">
    </Lightbox>

    //END OF NON EXISTING FEATURE
```

### Tweaks

So, there are options for customizing your Lightbox component.

#### Lightbox

These props are customizable:

* **class** - `string` - Standard HTML class for lightbox modal.
* **style** - `string` - Standard HTML style for lightbox modal.
* **transitionDuration** - `number` - Duration of lightbox toggle.
* **protect** - `boolean` - Enable protection of image from being dragged n dropped.
* **title** - `string/HTML` - Image's title that is displayed below the image (in a lightbox), feel free to use HTML
 (eg, `<br>`, `<span>`). Everything in a lightbox footer is aligned to the left, but you can override it
 by putting it into `<span>` which would allow you to apply a different style or a class of your choosing.
* **description** - `string/HTML` - Image's description that is, similarly to the title, displayed under the image (in a lightbox).
The difference between those two is that the title is wrapped in `<h2>` and description is wrapped in `<h5>`.
* **portrait** - `boolean` - Enables improved portrait mode.
* **noScroll** - `boolean` - Disables body scrolling while in lightbox mode, default `true`.

* **gallery** - `array` - Array containing Lightbox descriptions. **NOT IMPLEMENTED**
* **activeImage** - `number` - Number that points set visibility of image. **NOT IMPLEMENTED**
* **imageId** - `number/string` - Number or number in string, says what to display. **NOT IMPLEMENTED**

### Future

I plan to improve this component in the future, but I don't have much time.
So feel free to contribute some code if you will.

## License

### It's free

This component is under MIT license.