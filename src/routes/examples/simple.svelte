<script lang="ts">
    import Repl from '@sveltejs/svelte-repl/src/Repl.svelte'

    let repl
    $: if (repl) {
        repl.set({
            components: [{
            name: 'test',
            type: 'svelte',
            source: '<h1>Test</h1>',
            url: 'https://raw.githubusercontent.com/Hejtmus/svelte-lightbox/master/src/lib/Lightbox.svelte'
        }
        ]})
    }

</script>

<div style="height: 100%; position: relative">
    <Repl bind:this={repl} workersUrl="/examples"/>
</div>
