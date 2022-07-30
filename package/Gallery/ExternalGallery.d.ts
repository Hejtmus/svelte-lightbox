import { SvelteComponentTyped } from 'svelte'

export interface ExternalGalleryProps {
    galleryArrowsColor?: string,
    galleryArrowsCharacter?: 'unset' | 'hide' | 'loop',
    disableKeyboardArrowsControl?: boolean
}

export default class ExternalGallery extends SvelteComponentTyped<ExternalGalleryProps> {}
