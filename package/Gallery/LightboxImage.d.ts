import { SvelteComponentTyped } from 'svelte'

export interface LightboxImageProps extends HTMLImageElement {
    thumbnailProps?: HTMLImageElement
}

export default class LightboxImage extends SvelteComponentTyped<LightboxImageProps> {}
