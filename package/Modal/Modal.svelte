<script>import { fade } from 'svelte/transition';
export let transitionDuration;
export let fullscreen;
</script>

<div class:fullscreen transition:fade={{ duration: transitionDuration }} on:click {...$$restProps}>
    <slot>
    </slot>
</div>

<style>
     div {
         position: relative;
         background-color: transparent;
         width: auto;
         height: auto;
         max-width: 90vw;
         max-height: 90vh;
    }
     .fullscreen {
	     height: inherit;
	     width: inherit;
         max-height: inherit;
         max-width: inherit;
     }
</style>