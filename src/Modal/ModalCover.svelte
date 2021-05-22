<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    export let transitionDuration;
    const dispatch = createEventDispatcher();

    const click = () => {
        dispatch('click')
    }
</script>

<div on:click in:fade={{duration:transitionDuration*2}} out:fade={{duration: transitionDuration/2}}>
    <slot>
    </slot>
</div>

<style>
    div {
        position: fixed;
        z-index: 1000000!important;
        background-color: rgba(43, 39, 45, 0.87);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div::after {
        content: "";
        clear: both;
        display: table;
    }
</style>