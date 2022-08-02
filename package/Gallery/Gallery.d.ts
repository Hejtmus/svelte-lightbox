import { SvelteComponentTyped } from 'svelte'
import type { LightboxProps } from '../Lightbox'

export interface ExternalGalleryProps extends LightboxProps{
    galleryArrowsColor?: string,
    galleryArrowsCharacter?: 'unset' | 'hide' | 'loop',
    disableKeyboardArrowsControl?: boolean
}

export default class ExternalGallery extends SvelteComponentTyped<ExternalGalleryProps> {}
