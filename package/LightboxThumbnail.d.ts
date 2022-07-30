import { SvelteComponentTyped } from 'svelte'

export interface LightboxThumbnailProps {
    class?: string,
    style?: string,
    protect?: boolean
}

export default class LightboxThumbnail extends SvelteComponentTyped<LightboxThumbnailProps> {}
