import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    optimizeDeps: {
        exclude: ['codemirror']
    }

}

export default config
