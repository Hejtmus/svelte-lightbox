<script lang="ts">
    import { fade } from 'svelte/transition'
    import type { ImagePreset } from '$lib/Types'

    export let transitionDuration: number
    export let imagePreset: ImagePreset
</script>

<div class="svelte-lightbox" class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
     transition:fade={{ duration: transitionDuration }} on:click {...$$restProps}>
    <slot/>
</div>

<style>
     div.svelte-lightbox {
         position: relative;
         max-width: 100%;
         max-height: 100%;
         height: auto;
         width: auto;
         background-color: transparent;
    }
     div.svelte-lightbox.fullscreen {
	     height: inherit;
	     width: inherit;
         max-height: inherit;
         max-width: inherit;
     }
</style>