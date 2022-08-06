<script lang="ts">
    import { fade } from 'svelte/transition'
    import type { ImagePreset } from '$lib/Types'

    export let transitionDuration: number
    export let imagePreset: ImagePreset
</script>

<div class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
     transition:fade={{ duration: transitionDuration }} on:click {...$$restProps}>
    <slot>
    </slot>
</div>

<style>
     div {
         position: relative;
         background-color: transparent;
    }
     .fullscreen {
	     height: inherit;
	     width: inherit;
         max-height: inherit;
         max-width: inherit;
     }
     .scroll {
         height: inherit;
         max-height: inherit;
     }
</style>