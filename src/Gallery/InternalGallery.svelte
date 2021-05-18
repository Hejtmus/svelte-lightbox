<script>
    export let activeImage = 0;
    let slotContent;
    let images;
    $: images = slotContent?.children
    $: console.log(images)
    $: console.log($$slots)

    $: {
        console.log(typeof images)
        if (images && activeImage < images.length) {
            Object.values(images).forEach(img=>{
                img.hidden = true;
                return img
            })
            images[activeImage].hidden = false;
        } else if (images && activeImage >= images.length) {
            console.error("LightboxGallery: Selected image doesn't exist, invalid activeImage")
        }
    }

    const previousImage = () => {
        activeImage--
    }

    const nextImage = () => {
        activeImage++
    }

</script>

<div class="wrapper">
    <button on:click={previousImage} disabled={activeImage === 0} class="previous-button">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path class="arrow" d="M8.7,7.22,4.59,11.33a1,1,0,0,0,0,1.41l4,4"/>
            </g>
        </svg>
    </button>

    <div bind:this={slotContent} class="slot">
        <slot>
        </slot>
    </div>

    <button on:click={nextImage} disabled={activeImage === images?.length-1} class="next-button">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path class="arrow" d="M15.3,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4"/>
            </g>
        </svg>
    </button>
</div>


<style>
    .arrow{
        fill:none;
        stroke: black;
        stroke-linecap:round;
        stroke-linejoin:bevel;
        stroke-width:1.5px;
        margin: 10px;
    }
    button {
        background: transparent;
        color: black;
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
    .wrapper {
        position: relative;
        display: flex;
        width: auto;
        height: auto;
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
    .slot {
        order: 1;
    }
    .next-button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 4;
        text-align: right;
    }
    svg {
        height: 5rem;
    }
</style>