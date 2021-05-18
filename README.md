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
   
4. Define new array that will contain objects with all descriptions and titles of all images, insert them into 
   Lightbox component, example `<Lightbox gallery={myGallery}`.
   
5. You can **check if everything is working**, if you use **Sapper**, don't forget to make this component **SSR**, just include
it like this `import Lightbox from 'svelte-lightbox/src/Lightbox.svelte'`.

## Pro tips

- Images in lightbox behave in the same way as their thumbnails, if you need to behave differently, override thumbnail
with other image, or the same image, but with different style
  
- If you want to disable drag'n'drop over lightbox, pass protected prop to `<Lightbox>` component

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
        <img slot="thumbnail" src="./portrait.png" class="img-fluid" alt="Simple lightbox">
        <LightboxGallery>
            <LightboxImage gallery={false}>
                <img src="./1.jpg" alt="Simple lightbox">
            </LightboxImage>
            <LightboxImage>
                <img src="./2.png" alt="Simple lightbox">
            </LightboxImage>
            <LightboxImage>
                <img src="./3.png" alt="Simple lightbox">
            </LightboxImage>
        </LightboxGallery>
    </Lightbox>

```

### Tweaks

So, there are options for customizing your Lightbox component.

#### Lightbox

These props are customizable:

* **thumbnail** - `boolean` - Enables thumbnail to be different from an actual image.
  
* **thumbnailClasses** - `string` - Standard HTML "class" for lightbox thumbnail.
  
* **thumbnailStyle** - `string` - Standard HTML "style" for lightbox thumbnail.
  
* **modalClasses** - `string` - Standard HTML "class" for lightbox modal.
  
* **modalStyle** - `string` - Standard HTML "style" for lightbox modal.
  
* **transitionDuration** - `number` - Duration of lightbox toggle.
  
* **protect** - `boolean` - Enable protection of image from being dragged n dropped.
  
* **title** - `string/HTML` - Image's title that is displayed below the image (in a lightbox), feel free to use HTML
 (eg, `<br>`, `<span>`). Everything in a lightbox footer is aligned to the left, but you can override it
 by putting it into `<span>` which would allow you to apply a different style or a class of your choosing.
  
* **description** - `string/HTML` - Image's description that is, similarly to the title, displayed under the image (in a lightbox).
The difference between those two is that the title is wrapped in `<h2>` and description is wrapped in `<h5>`.
  
* **portrait** - `boolean` - Enables improved portrait mode.
  
* **noScroll** - `boolean` - Disables body scrolling while in lightbox mode, default `true`.


* **gallery** - `array of objects` - Array containing objects with Lightbox descriptions and titles. Optional, if you don't 
need image specific title and description, you can specify universal by passing props *title* and *description* to `<Lightbox>` component.
  
* **activeImage** - `number` - Number that points set visibility of image. Also optional, this is used for programmatic 
selecting of visible image when Lightbox is opened.

### Future

I plan to improve this component in the future, but I don't have much time.
So feel free to contribute some code if you will. This component needs CSS rework.

## License

### It's free

This component is under MIT license.