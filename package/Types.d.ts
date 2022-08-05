interface LightboxCustomization {
    closeButtonProps: HTMLButtonElement;
    lightboxFooterProps: HTMLDivElement;
    lightboxHeaderProps: HTMLDivElement;
    lightboxProps: HTMLDivElement;
    thumbnailProps: HTMLDivElement;
}
interface GalleryImage {
    id: number;
    thumbnailProps: HTMLImageElement;
    title: string;
    description: string;
}
interface GalleryState {
    imageCount: number;
    activeImage: number;
}
declare type ImagePreset = 'fit' | 'expand' | 'fullscreen' | 'scroll';
declare type GalleryArrowCharacter = 'unset' | 'hide' | 'loop';
export type { LightboxCustomization, GalleryImage, GalleryState, ImagePreset, GalleryArrowCharacter };
