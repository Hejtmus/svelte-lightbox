<script lang="ts">
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit'

    injectSpeedInsights()
</script>

<slot/>
