import { writable } from 'svelte/store';
const i18n = writable({
    generateLocalizedGalleryCounter: (activeImage, imageCount) => {
        return `Image ${activeImage + 1} of ${imageCount}`;
    }
});
export default i18n;
