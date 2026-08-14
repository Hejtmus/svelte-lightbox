<script lang="ts">
    import { dim, fadeTiming } from '$lib/transitions'
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'
    import type { TransitionTiming } from '$lib/transitions'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        transitionDuration: number,
        // Said out loud when something standing on the cover has to move in step with it
        timing?: TransitionTiming | null,
        children?: Snippet
    }

    let { transitionDuration, timing = null, children, ...rest }: Props = $props()

    const beat = $derived(timing ?? fadeTiming(transitionDuration))
</script>

<div class="svelte-lightbox-overlay" aria-label="overlay" role="presentation"
    in:dim|global={{ duration: beat.enter }} out:dim|global={{ duration: beat.leave }} {...rest}>
    {@render children?.()}
</div>

<style>
    div.svelte-lightbox-overlay {
        position: fixed;
        z-index: 1000000!important;
        background-color: rgba(43, 39, 45, 0.87);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.svelte-lightbox-overlay::before {
        content: '';
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
        opacity: 0;
        z-index: -1;
    }
    div.svelte-lightbox-overlay::after {
        content: "";
        clear: both;
        display: table;
    }
</style>
