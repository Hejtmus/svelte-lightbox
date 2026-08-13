import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

type ImagePreset = '' | 'fullscreen' | 'scroll'
type GalleryArrowCharacter = '' | 'hide' | 'loop'

// Html props handed to the element behind each part of a lightbox
interface LightboxCustomization {
    closeButtonProps: HTMLButtonAttributes,
    lightboxFooterProps: HTMLAttributes<HTMLDivElement>,
    lightboxHeaderProps: HTMLAttributes<HTMLDivElement>,
    coverProps: HTMLAttributes<HTMLDivElement>,
    lightboxProps: HTMLAttributes<HTMLDivElement>,
    thumbnailProps: HTMLAttributes<HTMLDivElement>
}
interface GalleryImage {
    id: number,
    title: string,
    description: string
}
interface GalleryState {
    imageCount: number,
    activeImage: number
}

interface GalleryArrowsConfig {
    color: string,
    character: GalleryArrowCharacter,
    enableKeyboardControl: boolean
}

interface GallerySwipeConfig {
    enabled: boolean,
    threshold: number,
    enableMouseDrag: boolean
}

interface I18n {
    generateLocalizedGalleryCounter: (activeImage: number, imageCount: number) => string
}

// Everything <Lightbox> and <LightboxGallery> have in common
interface LightboxOptions {
    title?: string,
    description?: string,
    imagePreset?: ImagePreset,
    customization?: Partial<LightboxCustomization>,
    transitionDuration?: number,
    keepBodyScroll?: boolean,
    enableImageExpand?: boolean,
    enableEscapeToClose?: boolean,
    enableClickToClose?: boolean,
    showCloseButton?: boolean,
    isVisible?: boolean,
    children?: Snippet
}

export type {
    ImagePreset,
    GalleryArrowCharacter,
    LightboxCustomization,
    LightboxOptions,
    GalleryImage,
    GalleryState,
    GalleryArrowsConfig,
    GallerySwipeConfig,
    I18n
}
