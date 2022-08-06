<script lang="ts">
    import presets from './presets.js'
    import { afterUpdate, getContext } from 'svelte'

    export let imagePreset: string | null = null
    export let fullscreen = false
    export let isGallery = false
	let image = {}
    const activeImageStore = getContext('activeImage')
    let imageParent

    const getFullscreenSrc = () => {
        // Getting image that should been displayed and taking its src
      if (imageParent) {
          let imageElement
          if (isGallery) {
              // Getting active images src from gallery
              imageElement = imageParent.firstChild.children[1].children[$activeImageStore].firstChild
          } else {
              // In case of classic lightbox, we just grab image that is first child
              imageElement = imageParent.firstChild
          }
          // Getting source for lightbox body background and hiding original
          image.src = imageElement.src
          imageElement.style.display = 'none'
      } else {
          queueMicrotask(getFullscreenSrc)
      }
    }

    $: if (fullscreen) getFullscreenSrc()
    $: if (fullscreen) {
        // In case user uses fullscreen preset, we need to get image source from new image and hide it
        afterUpdate(getFullscreenSrc)
    }
</script>

<div bind:this={imageParent} class="svelte-lightbox-body" class:fullscreen class:expand={imagePreset === 'expand'}
	 class:fit={imagePreset === 'fit'}
	 style="{fullscreen ? `background-image: url(${image.src || ''})` : ''}">
	<slot/>
</div>

<style>
    div.svelte-lightbox-body {
        background-color: transparent;
        width: auto;
        height: auto;
        max-height: 80vh;
    }
	:global(div.svelte-lightbox-body > *) {
		max-width: 100%;
		/*max-height: 100%;*/
		height: auto;
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
    div.expand {
        width: 90vw;
        height: auto;
        max-height: 90vh;
    }
</style>