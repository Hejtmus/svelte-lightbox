<script>import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
export let closeButtonProps = {};
export let showCloseButton;
export let enableEscapeToClose;
export let imagePreset;
const handleKey = (event) => {
    if (enableEscapeToClose && event.key === 'Escape') {
        dispatch('close');
    }
};
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<div class:fullscreen={imagePreset === 'fullscreen'} {...$$restProps}>
    {#if showCloseButton}
        <button class:fullscreen={imagePreset === 'fullscreen'} on:click={ () => dispatch('close')} {...closeButtonProps}>
            ×
        </button>
    {/if}
</div>

<style>
    div {
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
