<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let size = 'xs';
    export let style = '';
    export let headerClasses = '';
    export let buttonClasses = '';
</script>

<div class={"svelte-lightbox-header " + headerClasses}>
    <button on:click={ () => dispatch('close')} {size} {style} class={buttonClasses}>
        ×
    </button>
</div>

<style>
    div.svelte-lightbox-header {
        width: auto;
        height: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
</style>
