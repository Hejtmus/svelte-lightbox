<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let size = 'xs'
    export let style = ''
    export let headerClasses = ''
    export let buttonClasses = ''
    export let closeButton = true
    export let fullscreen = false
</script>

<div class={'svelte-lightbox-header ' + headerClasses} class:fullscreen>
    {#if closeButton}
        <button on:click={ () => dispatch('close')} {size} {style} class={buttonClasses} class:fullscreen>
            ×
        </button>
    {/if}
</div>

<style>
    div.svelte-lightbox-header {
        width: auto;
        height: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    div.fullscreen {
	    position: fixed;
	    z-index: 5;
	    top: 0;
	    left: 0;
	    right: 0;
    }
    button {
        background: transparent;
        font-size: 3rem;
        border: none;
        color: white;
    }
    button:hover {
        color: lightgray;
        cursor: pointer;
    }
    button:active {
	    background-color: transparent;
    }
    button.fullscreen {
	    filter: drop-shadow(0 0 5px black) drop-shadow(0 0 10px black);
    }
</style>
