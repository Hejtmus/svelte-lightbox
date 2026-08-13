import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    // Markdown pages are routes, sveltepress turns them into components
    extensions: ['.svelte', '.md'],

    kit: {
        adapter: adapter()
    }
}

export default config
