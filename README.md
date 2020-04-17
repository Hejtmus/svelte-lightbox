# Svelte-lightbox

***In development***

Lightweight Lightbox Svelte component, no vanilla JS or FullPage.js, just pure Svelte component. There is also support for
mobile devices. Tested on Svelte and Sapper. Note that this component is in development, expect bugs, if you notice some, 
please report them to this component's GitHub repo to the 'Issues' section.

## Instalation

> ```bash
> npm i svelte-lightbox --save-dev
> ```

## How to use

### Static version

1. Make Svelte page
2. Include `import { Lightbox } from 'svelte-lightbox';` into that file.
3. Make Lightbox galleries and put them into `<Lightbox>` as prop, image put inside slot (as its child).
4. Define new array that will contain all descriptions of all images, insert them into Lightbox component, example 
`<Lightbox gallery={myGallery}`.
5. You can check if everything is working, if you use Sapper, don't forget to make this component SSR, just include
it like this `import Fullpage from 'svelte-lightbox/src/Lightbox.svelte'`.


### Something copyable

```html
<script>
    //Svelte import
    import { 
        Lightbox
    } from 'svelte-lightbox';
    //Sapper import
	import Lightbox from 'svelte-lightbox/src/Lightbox.svelte';

    //Include all titles of your images, this is also used as number that indicate count of sections
    const gallery = [
        'Cat is eating mouse',
        'Bike is driven',
        'JS components are downloaded from npm',
        'This component is being developed'
    ];
    //Have to set to 0 (or section you wish to display as default), otherwise lightbox will not display
    let activeImage = 0;
</script>

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

```

### Tweaks

So, there are options for customizing your Lightbox component.

#### Lightbox

These props are customizable:

* **class** - `string` - Standard HTML class for lightbox modal.
* **style** - `string` - Standard HTML style for lightbox modal.
* **gallery** - `array` - Array containing Lightbox descriptions.
* **activeImage** - `number` - Number that points set visibility of image.
* **transitionDuration** - `number` - Duration of lightbox toggle.

## License

### It's free

This component is under MIT license.