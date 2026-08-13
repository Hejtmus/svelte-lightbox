import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'
import { defineConfig } from 'vite'

const repository = 'https://github.com/Hejtmus/svelte-lightbox'

// sveltepress runs the sveltekit plugin itself, so it takes its place here
export default defineConfig({
    plugins: [
        sveltepress({
            siteConfig: {
                title: 'svelte-lightbox',
                description: 'Lightweight lightbox library for Svelte'
            },
            theme: defaultTheme({
                github: repository,
                logo: '/img/logo.svg',
                editLink: `${repository}/edit/master/src/routes/:route`,
                navbar: [
                    {
                        title: 'Guide',
                        to: '/guide/introduction/'
                    },
                    {
                        title: 'Examples',
                        to: '/examples/'
                    }
                ],
                sidebar: {
                    '/guide/': [
                        {
                            title: 'Introduction',
                            to: '/guide/introduction/'
                        },
                        {
                            title: 'Lightbox',
                            to: '/guide/lightbox/'
                        },
                        {
                            title: 'LightboxGallery',
                            to: '/guide/lightbox-gallery/'
                        },
                        {
                            title: 'Building blocks',
                            to: '/guide/building-blocks/'
                        }
                    ]
                },
                themeColor: {
                    light: '#ffffff',
                    dark: '#1b1b1f',
                    primary: '#ff3e00',
                    hover: '#ff5a1f',
                    gradient: {
                        start: '#ff3e00',
                        end: '#ffb03e'
                    }
                }
            })
        })
    ]
})
