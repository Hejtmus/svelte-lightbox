<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let thumbnailClasses = '';
    export let thumbnailStyle = '';
    export let protect = false;
</script>

<div class="clickable" on:click={ () => dispatch('click') }>
    <div class={thumbnailClasses} style={thumbnailStyle} class:svelte-lightbox-unselectable={protect}>
        <slot/>
    </div>
</div>

<style>
    div.clickable {
        position: static;
        cursor: zoom-in;
    }
    div.svelte-lightbox-unselectable {
        user-select: none;
        pointer-events: none;
    }
</style>