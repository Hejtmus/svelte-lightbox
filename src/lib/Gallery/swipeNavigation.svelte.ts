import { untrack } from 'svelte'
import { swipe } from './swipe'
import { toSwipedImage } from './navigation'
import type { Attachment } from 'svelte/attachments'
import type { Gallery } from './gallery.svelte'

const SWIPING_CLASS = 'svelte-lightbox-swiping'
const OFFSET_PROPERTY = '--svelte-lightbox-swipe-offset'

/**
 * Turns drags on the element holding the images into moves through the gallery,
 * with the images following the pointer until the drag is released.
 */
const swipeNavigation = (gallery: Gallery): Attachment<HTMLElement> => {
    return (surface) => {
        // The configuration is allowed to change without the gesture being torn down
        const gesture = swipe(surface, untrack(() => gallery.swipeConfig))

        const showOffset = (offset: number) => {
            surface.style.setProperty(OFFSET_PROPERTY, `${offset}px`)
        }
        const offsetOf = (event: Event) => (event as CustomEvent).detail.offset as number

        const start = () => surface.classList.add(SWIPING_CLASS)
        const move = (event: Event) => showOffset(offsetOf(event))
        const end = (event: Event) => {
            surface.classList.remove(SWIPING_CLASS)
            showOffset(0)
            toSwipedImage(gallery, offsetOf(event), gallery.swipeConfig.threshold)
        }

        surface.addEventListener('swipestart', start)
        surface.addEventListener('swipemove', move)
        surface.addEventListener('swipeend', end)

        $effect(() => {
            gesture.update(gallery.swipeConfig)
        })

        return () => {
            surface.removeEventListener('swipestart', start)
            surface.removeEventListener('swipemove', move)
            surface.removeEventListener('swipeend', end)
            gesture.destroy()
            surface.classList.remove(SWIPING_CLASS)
            surface.style.removeProperty(OFFSET_PROPERTY)
        }
    }
}

export { swipeNavigation }
