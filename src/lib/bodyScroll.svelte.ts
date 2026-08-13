/**
 * Holds the page behind an open lightbox still, and hands scrolling back exactly
 * as it was found once the lightbox is gone.
 */
const lockBodyScroll = (isLocked: () => boolean) => {
    $effect(() => {
        if (!isLocked()) {
            return
        }
        const scrollBefore = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = scrollBefore
        }
    })
}

export { lockBodyScroll }
