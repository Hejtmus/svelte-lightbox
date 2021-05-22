<script>
    export let modalStyle;
    export let allModalClasses;
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    export let transitionDuration;
    const dispatch = createEventDispatcher();

    const click = () => {
        dispatch('click')
    }
</script>

<div transition:fade={{duration:transitionDuration}} on:click>
    <slot>
    </slot>
</div>

<style>

</style>