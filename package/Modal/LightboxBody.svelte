<script>import presets from './presets.js';
import { afterUpdate, getContext } from 'svelte';
export let portrait = false;
export let imagePreset = null;
export let fullscreen = false;
export let isGallery = false;
let image = {};
const activeImageStore = getContext('activeImage');
let imageParent;
const getFullscreenSrc = () => {
    // Getting image that should been displayed and taking its src
    if (imageParent) {
        let imageElement;
        if (isGallery) {
            // Getting active images src from gallery
            imageElement = imageParent.firstChild.children[1].children[$activeImageStore].firstChild;
        }
        else {
            // In case of classic lightbox, we just grab image that is first child
            imageElement = imageParent.firstChild;
        }
        // Getting source for lightbox body background and hiding original
        image.src = imageElement.src;
        imageElement.style.display = 'none';
    }
    else {
        queueMicrotask(getFullscreenSrc);
    }
};
$: if (imageParent && imagePreset && presets[imagePreset]) {
    const imageStyle = imageParent.firstChild.style;
    const styles = Object.keys(presets[imagePreset]);
    for (let i = 0; i !== styles.length; i++) {
        imageStyle[styles[i]] = presets[imagePreset][i];
    }
}
$: if (fullscreen)
    getFullscreenSrc();
$: if (fullscreen) {
    // In case user uses fullscreen preset, we need to get image source from new image and hide it
    afterUpdate(getFullscreenSrc);
}
</script>

<div class="svelte-lightbox-body" class:fullscreen style="{fullscreen ? `background-image: url(${image.src || ''})` : ''}">
	<div bind:this={imageParent} class:svelte-lightbox-image-portrait={portrait} class:expand={imagePreset === 'expand'}
		 class:fit={imagePreset === 'fit'} class:fullscreen>
		<slot />
	</div>
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
    div.svelte-lightbox-image-portrait{
        height: 90vh;
    }
    div.expand {
        width: 90vw;
        height: auto;
        max-height: 90vh;
    }
</style>