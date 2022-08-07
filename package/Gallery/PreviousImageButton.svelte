<script>export let activeImage;
export let character;
</script>

<button on:click disabled={character !== 'loop' && activeImage === 0} class="previous-button"
        class:hideDisabled={character === 'hide'}>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path class="arrow" d="M8.7,7.22,4.59,11.33a1,1,0,0,0,0,1.41l4,4"/>
        </g>
    </svg>
</button>

<style>
    button {
        background: transparent;
        border: none;
        font-size: 1rem;
        width: 50%;
        height: 100%;
    }

    button:active {
        background: transparent;
    }

    button:disabled {
        color: gray;
    }

    button:disabled.hideDisabled {
        visibility: hidden;
    }
    svg {
        height: 5rem;
    }
    .previous-button {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 50%;
        z-index: 4;
        text-align: left;
    }
    .arrow {
        fill: none;
        stroke: var(--svelte-lightbox-arrows-color);
        stroke-linecap: round;
        stroke-linejoin: bevel;
        stroke-width: 1.5px;
        margin: 10px;
    }
</style>