import { SvelteComponentTyped } from 'svelte'

export interface Image {
    src: string,
    class: string,
    alt: string
}

export interface LightboxProps {
    thumbnailClasses?: string,
    thumbnailStyle?: string,
    modalClasses?: string,
    modalStyle?: string,
    activeImage?: number,
    gallery?: Array<string> | false,
    title?: string,
    transitionDuration?: number,
    image?: Image,
    isVisible?: boolean,
    protect?: boolean,
    portrait?: boolean,
    noScroll?: boolean,
    thumbnail?: boolean,
    imagePreset?: 'fit' | 'expand' | 'fullscreen' | 'scroll' | boolean,
    escapeToClose?: boolean,
    clickToClose?: boolean,
    closeButton?: boolean
}

export default class Lightbox extends SvelteComponentTyped<LightboxProps> {}
