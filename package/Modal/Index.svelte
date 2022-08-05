<script>import { createEventDispatcher } from 'svelte';
import Header from './LightboxHeader.svelte';
import Body from './LightboxBody.svelte';
import Footer from './LightboxFooter.svelte';
import ModalCover from './ModalCover.svelte';
import Modal from './Modal.svelte';
const dispatch = createEventDispatcher();
export let customization;
export let transitionDuration = 500;
export let gallery = null;
export let portrait = false;
export let title = '';
export let description = '';
export let imagePreset;
export let escapeToClose;
export let closeButton;
const handleKey = (event) => {
    if (escapeToClose && event.key === 'Escape') {
        dispatch('close');
    }
};
$: fullscreen = imagePreset === 'fullscreen';
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<ModalCover {transitionDuration} on:click={ () => dispatch('topModalClick') }>
    <Modal {transitionDuration} {fullscreen} on:click={ () => dispatch('modalClick') } {...(customization.lightboxProps || {})}>
        <Header {closeButton} {fullscreen} closeButtonProps={customization.closeButtonProps} on:close
                {...(customization.lightboxHeaderProps || {})}/>

        <Body {portrait} {imagePreset} {fullscreen} isGallery={gallery !== null}>
            <slot/>
        </Body>

        <Footer {title} {description} {gallery} {...(customization.lightboxFooterProps || {})}/>
    </Modal>
</ModalCover>

