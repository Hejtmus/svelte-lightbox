<script>import { fade } from 'svelte/transition';
export let transitionDuration;
export let imagePreset;
</script>

<div class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
     transition:fade={{ duration: transitionDuration }} on:click {...$$restProps}>
    <slot/>
</div>

<style>
     div {
         position: relative;
         max-width: 100%;
         max-height: 100%;
         height: auto;
         width: auto;
         background-color: transparent;
    }
     .fullscreen {
	     height: inherit;
	     width: inherit;
         max-height: inherit;
         max-width: inherit;
     }
</style>