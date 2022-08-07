declare type ImagePreset = '' | 'fullscreen' | 'scroll';
declare type GalleryArrowCharacter = '' | 'hide' | 'loop';
interface LightboxCustomization {
    closeButtonProps: HTMLButtonElement;
    lightboxFooterProps: HTMLDivElement;
    lightboxHeaderProps: HTMLDivElement;
    lightboxProps: HTMLDivElement;
    thumbnailProps: HTMLDivElement;
}
interface GalleryImage {
    id: number;
    title: string;
    description: string;
}
interface GalleryState {
    imageCount: number;
    activeImage: number;
}
interface GalleryArrowsConfig {
    color: string;
    character: GalleryArrowCharacter;
    enableKeyboardControl: boolean;
}
interface I18n {
    generateLocalizedGalleryCounter: (activeImage: number, imageCount: number) => string;
}
export type { ImagePreset, GalleryArrowCharacter, LightboxCustomization, GalleryImage, GalleryState, GalleryArrowsConfig, I18n };
