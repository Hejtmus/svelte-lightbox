<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    let classes = ''
    export { classes as class }
    export let style = ''
    export let protect = false
</script>

<div class="clickable {classes}" class:svelte-lightbox-unselectable={protect} {style} on:click={ () => dispatch('click') }>
    <slot/>
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