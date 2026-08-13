type ImagePreset = '' | 'fullscreen' | 'scroll'
type GalleryArrowCharacter = '' | 'hide' | 'loop'

interface LightboxCustomization {
    closeButtonProps: HTMLButtonElement,
    lightboxFooterProps: HTMLDivElement,
    lightboxHeaderProps: HTMLDivElement,
    coverProps: HTMLDivElement,
    lightboxProps: HTMLDivElement,
    thumbnailProps: HTMLDivElement
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

export type {
    ImagePreset,
    GalleryArrowCharacter,
    LightboxCustomization,
    GalleryImage,
    GalleryState,
    GalleryArrowsConfig,
    GallerySwipeConfig,
    I18n
}
