<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let modalStyle;
    export let modalClasses;
    export let transitionDuration;

    const click = () => {
        dispatch('click')
    }
</script>

<div class={modalClasses} transition:fade={{duration:transitionDuration}} on:click>
    <slot>
    </slot>
</div>

<style>
     div {
        background-color: transparent;
        width: auto;
        height: auto;
        max-width: 90vw;
        max-height: 90vh;
    }
    div::after {
        content: "";
        clear: both;
        display: table;
    }
</style>