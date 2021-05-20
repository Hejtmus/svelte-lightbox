<script>
    // Gives option for user to control displayed image
    export let activeImage = 0;
    // Here will be stored markup that will user put inside of this component
    let slotContent;
    // Auxiliary variable for storing elements with image that user has provided
    let images;

    // Every time, when contents of this component changes, images will be updated
    $: images = slotContent?.children

    $: {
        /*
        When activeImage or images array changes, checks if active image points to existing image and then displays it,
        if selected image doesn't exist, then logs out error, these error normally does not occur, only in cases when
        activeImage is controlled programmatically
         */
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

    /*
    Those functions move between active image, we dont need condition to disable their role, because this is already
    implemented in the element section by conditionally disabling buttons, that call this function.

     */
    const previousImage = () => {
        activeImage--
    }

    const nextImage = () => {
        activeImage++
    }

</script>

<div class="wrapper">
    <!-- Left arrow -->
    <button on:click={previousImage} disabled={activeImage === 0} class="previous-button">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path class="arrow" d="M8.7,7.22,4.59,11.33a1,1,0,0,0,0,1.41l4,4"/>
            </g>
        </svg>
    </button>

    <!-- Image wrapper -->
    <div bind:this={slotContent} class="slot">
        <slot>
        </slot>
    </div>

    <!-- Right arrow -->
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