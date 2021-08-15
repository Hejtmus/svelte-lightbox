<script>
    import presets from './presets.js';
    import {afterUpdate} from "svelte";
    export let image = {};
    export let protect = false;
    export let portrait = false;
    export let imagePreset = false;
    export let fullscreen = false;
    export let gallery = false;
    let imageParent;
    
    const getFullscreenSrc = () => {
        // Getting image that should been displayed and taking its src
      if (imageParent) {
          let imageElement;
          if (gallery) {
              // Gallery is composed by divs containing images, so we have to 'dig' inside of those divs and take active
	          // image, by getting its parent that is not hidden
              const imageWrapper = imageParent.firstChild.children[1].children;
              for (let i = 0; !imageElement && i !== imageWrapper.length;i++){
                  if (!imageWrapper[i].hidden) {
                      imageElement = imageWrapper[i].firstChild
                  }
              }
              if (!imageElement) {
                  imageElement = imageWrapper[1].firstChild
              }
          } else {
              // In case of classic lightbox, we just grab image that is first child
              imageElement = imageParent.firstChild;
          }
          // Getting source for lightbox body background and hiding original
          image.src = imageElement.src;
          imageElement.style.display = 'none';
      } else {
          queueMicrotask(getFullscreenSrc)
      }
    }

    $: if (imageParent && imagePreset && presets[imagePreset]) {
        const imageStyle = imageParent.firstChild.style;
        const styles = Object.keys(presets[imagePreset])
        for (let i = 0; i !== styles.length; i++) {
            imageStyle[styles[i]] = presets[imagePreset][i]
        }
    }

    $: imageClass = `${image.class ? image.class : ''} ${imagePreset ? imagePreset : ''}`
    $: if (fullscreen && !image?.src) getFullscreenSrc()
    $: if (fullscreen) {
        // In case user uses fullscreen preset, we need to get image source from new image and hide it
        afterUpdate(getFullscreenSrc)
    }
</script>

<div class="svelte-lightbox-body" class:svelte-lightbox-unselectable={protect} class:fullscreen style="{fullscreen ? `background-image: url(${image.src || ''})` : ''}">
	{#if !fullscreen && image.src}
		<img src={image.src} alt={image.alt} style={image.style} class={imageClass}>
	{:else}
		<div bind:this={imageParent} class:svelte-lightbox-image-portrait={portrait} class:expand={imagePreset == 'expand'}
		     class:fit={imagePreset == 'fit'} class:fullscreen>
			<slot />
		</div>
	{/if}
</div>

<style>
    div.svelte-lightbox-body {
        background-color: transparent;
        width: auto;
        height: auto;
        max-height: 80vh;
    }
    div.svelte-lightbox-body.fullscreen {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    div.fullscreen {
        width: inherit;
	    max-width: inherit;
        height: inherit;
        max-height: inherit;
    }
    div.svelte-lightbox-unselectable {
        user-select: none;
        pointer-events: none;
    }
    div.svelte-lightbox-image-portrait{
        height: 90vh;
    }
    div.expand {
        width: 90vw;
        height: auto;
        max-height: 90vh;
    }
</style>