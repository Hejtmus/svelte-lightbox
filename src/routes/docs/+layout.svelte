<script lang="ts">
    import { Main, Contents } from '@sveltejs/site-kit/docs'
    import type { Section } from '$utils/types'

    export let data
    const sections: Array<Section> = data.sections
    let path = null
</script>

<Main bind:path>
    <slot/>
</Main>

<Contents contents={sections} {path}/>
