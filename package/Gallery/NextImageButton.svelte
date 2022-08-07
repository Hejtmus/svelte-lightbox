<script>export let imageCount;
export let activeImage;
export let character;
</script>

<button on:click disabled={character !== 'loop' && activeImage === imageCount - 1}
        class="next-button" class:hideDisabled={character === 'hide'}>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="M15.3,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4" class="arrow"/>
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
    .next-button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 4;
        text-align: right;
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