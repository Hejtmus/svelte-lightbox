<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let modalStyle;
    export let modalClasses;
    export let transitionDuration;
    export let fullscreen = false;

    const click = () => {
        dispatch('click')
    }
</script>

<div class={modalClasses} class:fullscreen transition:fade={{duration:transitionDuration}}
     on:click>
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