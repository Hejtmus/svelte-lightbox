import type { GallerySwipeConfig } from '$lib/Types'

interface SwipeGesture {
    update: (config: GallerySwipeConfig) => void,
    destroy: () => void
}

// Mouse and touch both arrive as pointer events, pointerType tells them apart
const acceptsPointer = (event: PointerEvent, config: GallerySwipeConfig) => {
    if (!config.enabled) {
        return false
    }
    return event.pointerType !== 'mouse' || config.enableMouseDrag
}

// Lets the browser keep vertical scrolling while horizontal drags reach us
const reserveHorizontalGestures = (node: HTMLElement, enabled: boolean) => {
    node.style.touchAction = enabled ? 'pan-y' : ''
}

/**
 * Turns horizontal pointer drags on the node into swipestart, swipemove and
 * swipeend events, each carrying the distance dragged so far in `detail.offset`.
 */
const swipe = (node: HTMLElement, config: GallerySwipeConfig): SwipeGesture => {
    let current = config
    let origin: number | null = null

    const emit = (name: string, offset: number) => {
        node.dispatchEvent(new CustomEvent(name, { detail: { offset } }))
    }

    const start = (event: PointerEvent) => {
        if (!acceptsPointer(event, current)) {
            return
        }
        origin = event.clientX
        node.setPointerCapture(event.pointerId)
        emit('swipestart', 0)
    }

    const move = (event: PointerEvent) => {
        if (origin === null) {
            return
        }
        emit('swipemove', event.clientX - origin)
    }

    const end = (event: PointerEvent) => {
        if (origin === null) {
            return
        }
        const offset = event.clientX - origin
        origin = null

        if (node.hasPointerCapture(event.pointerId)) {
            node.releasePointerCapture(event.pointerId)
        }
        emit('swipeend', offset)
    }

    // Without this the browser starts its own image drag and the gesture dies
    const suppressNativeDrag = (event: Event) => {
        if (current.enabled && current.enableMouseDrag) {
            event.preventDefault()
        }
    }

    node.addEventListener('pointerdown', start)
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerup', end)
    node.addEventListener('pointercancel', end)
    node.addEventListener('dragstart', suppressNativeDrag)
    reserveHorizontalGestures(node, config.enabled)

    return {
        update (config: GallerySwipeConfig) {
            current = config
            reserveHorizontalGestures(node, config.enabled)
        },
        destroy () {
            node.removeEventListener('pointerdown', start)
            node.removeEventListener('pointermove', move)
            node.removeEventListener('pointerup', end)
            node.removeEventListener('pointercancel', end)
            node.removeEventListener('dragstart', suppressNativeDrag)
            reserveHorizontalGestures(node, false)
        }
    }
}

export { swipe }
export type { SwipeGesture }
