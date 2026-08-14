<script lang="ts">
    import i18n from '$lib/i18n'
    import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'
    import type { ImagePreset } from '$lib/Types'

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onclose'> {
        imagePreset: ImagePreset,
        showCloseButton: boolean,
        enableEscapeToClose: boolean,
        closeButtonProps?: HTMLButtonAttributes,
        onclose?: () => void
    }

    let {
        imagePreset,
        showCloseButton,
        enableEscapeToClose,
        closeButtonProps = {},
        onclose,
        ...rest
    }: Props = $props()

    const handleKey = (event: KeyboardEvent) => {
        if (enableEscapeToClose && event.key === 'Escape') {
            onclose?.()
        }
    }
</script>

<svelte:window onkeydown={handleKey}/>

<div class="svelte-lightbox-header" class:fullscreen={imagePreset === 'fullscreen'} {...rest}>
    {#if showCloseButton}
        <button type="button" class:fullscreen={imagePreset === 'fullscreen'} onclick={() => onclose?.()}
            aria-label={$i18n.closeLabel} {...closeButtonProps}>
            <span aria-hidden="true">×</span>
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
    div.svelte-lightbox-header.fullscreen {
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
