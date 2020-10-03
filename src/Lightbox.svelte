<script>
    import Thumbnail from './LightboxThumbnail.svelte';
    import Modal from './Modal/Index.svelte';
    import {onMount} from 'svelte';

    //defining variable that will hold class value, that will be passed into this component's wrapper
    let defaultClasses = '';

    //exporting classes, for passing classes into wrapper
    export {defaultClasses as class};
    export let style = '';
    //number that hold which image is active
    export let activeImage = 0;
    //array with image descriptions
    export let gallery = [];
    export let title = '';
    export let description = '';
    //exporting duration of fade transition
    export let transitionDuration = 500;
    //bool that enables drag n drop protection
    export let protect = false;
    //enables other image than in slot
    export let image = {};
    //enables portrait mode
    export let portrait = false;
    //disables scrolling <body>
    export let noScroll = true;

    let visible = false;

    const toggle = () => {
        visible = !visible;
        if (noScroll) {
            mountedT()
        }
    };
    let mountedT = () => {
    };

    onMount(() => {
        let defaultOverflow = document.body.style.overflow;
        mountedT = () => {
            if (visible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = defaultOverflow;
            }
        };
    })
</script>

<Thumbnail bind:protect={protect} on:click={toggle}/>

{#if visible}
    <Modal bind:modalClasses={defaultClasses} bind:modalStyle={style} bind:transitionDuration bind:image bind:protect
           bind:portrait bind:title bind:description bind:gallery bind:activeImage
           on:close={toggle} on:topModalClick={toggle} on:modalClick={toggle}/>
{/if}
