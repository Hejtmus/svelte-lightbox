<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let closeButtonProps: HTMLButtonElement | {} = {}
    export let closeButton: boolean
    export let escapeToClose: boolean
    export let fullscreen: boolean

    const handleKey = (event) => {
        if (escapeToClose && event.key === 'Escape') {
            dispatch('close')
        }
    }
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<div class:fullscreen {...$$restProps}>
    {#if closeButton}
        <button on:click={ () => dispatch('close')} class:fullscreen {...closeButtonProps}>
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
