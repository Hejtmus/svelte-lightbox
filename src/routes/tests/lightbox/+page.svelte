<script lang="ts">
    import { page } from '$app/state'
    import { Lightbox } from '$lib'
    import { flag, number, text } from '../params'
    import type { ImagePreset, TransitionPreset } from '$lib/Types'

    let lightbox: ReturnType<typeof Lightbox>
    let isVisible = $state(false)

    const params = $derived(page.url.searchParams)
    const imagePreset = $derived(text(params, 'imagePreset') as ImagePreset)
    const transitionPreset = $derived(text(params, 'transitionPreset') as TransitionPreset)
    // A transformed ancestor is what a fixed lightbox is measured against until it is moved out
    const isClipped = $derived(flag(params, 'clipped', false))
</script>

<h1>Lightbox fixture</h1>

<!-- The overlay covers the viewport, so the controls have to sit above it to stay clickable -->
<div class="controls">
    <button data-testid="open" onclick={() => lightbox.open()}>open</button>
    <button data-testid="close" onclick={() => lightbox.close()}>close</button>
    <button data-testid="toggle" onclick={() => lightbox.toggle()}>toggle</button>
    <button data-testid="bind-open" onclick={() => { isVisible = true }}>open by binding</button>
    <span data-testid="visible">{isVisible}</span>
</div>

<div style="height: 200vh" class:clipped={isClipped}>
    <Lightbox
        bind:this={lightbox}
        bind:isVisible
        title={text(params, 'title')}
        description={text(params, 'description')}
        {imagePreset}
        {transitionPreset}
        transitionDuration={number(params, 'transitionDuration', 300)}
        keepBodyScroll={flag(params, 'keepBodyScroll', false)}
        enableImageExpand={flag(params, 'enableImageExpand', false)}
        enableEscapeToClose={flag(params, 'enableEscapeToClose', true)}
        enableClickToClose={flag(params, 'enableClickToClose', false)}
        showCloseButton={flag(params, 'showCloseButton', true)}
        customization={{ closeButtonProps: { 'data-testid': 'close-button' } }}
    >
        <img src="/img/test1.png" alt="fixture" data-testid="image">
    </Lightbox>
</div>

<style>
    div.controls {
        position: relative;
        z-index: 1000001;
    }
    /* Any transform makes this the containing block of the fixed lightbox inside it */
    div.clipped {
        width: 300px;
        transform: translateX(0);
    }
</style>
