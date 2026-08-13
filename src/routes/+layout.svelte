<script lang="ts">
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit'
    import type { Snippet } from 'svelte'

    let { children }: { children?: Snippet } = $props()

    injectSpeedInsights()
</script>

{@render children?.()}
