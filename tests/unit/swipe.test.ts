import { describe, it, expect, beforeEach, vi } from 'vitest'
import { swipe } from '../../src/lib/Gallery/swipe'
import type { GallerySwipeConfig } from '../../src/lib/Types'

const enabled: GallerySwipeConfig = {
    enabled: true,
    threshold: 50,
    enableMouseDrag: true
}

// jsdom has no pointer capture, the action treats that as a refused pointer
const pointer = (type: string, clientX: number, pointerType = 'touch') => new PointerEvent(type, {
    pointerId: 1,
    pointerType,
    clientX,
    bubbles: true
})

let node: HTMLElement
let offsets: Record<string, number[]>

const record = (element: HTMLElement) => {
    const seen: Record<string, number[]> = { swipestart: [], swipemove: [], swipeend: [] }

    for (const name of Object.keys(seen)) {
        element.addEventListener(name, (event) => seen[name].push((event as CustomEvent).detail.offset))
    }
    return seen
}

beforeEach(() => {
    node = document.createElement('div')
    node.setPointerCapture = vi.fn()
    node.releasePointerCapture = vi.fn()
    node.hasPointerCapture = vi.fn(() => true)
    document.body.appendChild(node)
    offsets = record(node)
})

describe('swipe action', () => {
    it('reports how far the pointer has travelled', () => {
        swipe(node, enabled)

        node.dispatchEvent(pointer('pointerdown', 200))
        node.dispatchEvent(pointer('pointermove', 150))
        node.dispatchEvent(pointer('pointerup', 120))

        expect(offsets.swipestart).toEqual([0])
        expect(offsets.swipemove).toEqual([-50])
        expect(offsets.swipeend).toEqual([-80])
    })

    it('reports rightward drags as a positive offset', () => {
        swipe(node, enabled)

        node.dispatchEvent(pointer('pointerdown', 100))
        node.dispatchEvent(pointer('pointerup', 175))

        expect(offsets.swipeend).toEqual([75])
    })

    it('ignores movement that did not start on the node', () => {
        swipe(node, enabled)

        node.dispatchEvent(pointer('pointermove', 150))
        node.dispatchEvent(pointer('pointerup', 150))

        expect(offsets.swipemove).toEqual([])
        expect(offsets.swipeend).toEqual([])
    })

    it('ends the gesture when the pointer is cancelled', () => {
        swipe(node, enabled)

        node.dispatchEvent(pointer('pointerdown', 200))
        node.dispatchEvent(pointer('pointercancel', 160))

        expect(offsets.swipeend).toEqual([-40])
    })

    // Documented as: enabled defaults to false, so galleries keep behaving as before
    it('stays silent while disabled', () => {
        swipe(node, { ...enabled, enabled: false })

        node.dispatchEvent(pointer('pointerdown', 200))
        node.dispatchEvent(pointer('pointerup', 100))

        expect(offsets.swipestart).toEqual([])
        expect(offsets.swipeend).toEqual([])
    })

    // Documented as: enableMouseDrag turns mouse dragging off, touch keeps working
    it('ignores the mouse but not touch when mouse dragging is off', () => {
        swipe(node, { ...enabled, enableMouseDrag: false })

        node.dispatchEvent(pointer('pointerdown', 200, 'mouse'))
        node.dispatchEvent(pointer('pointerup', 100, 'mouse'))
        expect(offsets.swipeend).toEqual([])

        node.dispatchEvent(pointer('pointerdown', 200, 'touch'))
        node.dispatchEvent(pointer('pointerup', 100, 'touch'))
        expect(offsets.swipeend).toEqual([-100])
    })

    it('leaves vertical scrolling to the browser while enabled', () => {
        const gesture = swipe(node, enabled)
        expect(node.style.touchAction).toBe('pan-y')

        gesture.update({ ...enabled, enabled: false })
        expect(node.style.touchAction).toBe('')
    })

    it('picks up a configuration change without rebinding', () => {
        const gesture = swipe(node, { ...enabled, enabled: false })

        gesture.update(enabled)
        node.dispatchEvent(pointer('pointerdown', 200))
        node.dispatchEvent(pointer('pointerup', 100))

        expect(offsets.swipeend).toEqual([-100])
    })

    it('stops listening once destroyed', () => {
        const gesture = swipe(node, enabled)

        gesture.destroy()
        node.dispatchEvent(pointer('pointerdown', 200))
        node.dispatchEvent(pointer('pointerup', 100))

        expect(offsets.swipestart).toEqual([])
        expect(node.style.touchAction).toBe('')
    })

    it('survives a browser that refuses to capture the pointer', () => {
        node.setPointerCapture = vi.fn(() => {
            throw new Error('NotFoundError')
        })
        swipe(node, enabled)

        node.dispatchEvent(pointer('pointerdown', 200))
        node.dispatchEvent(pointer('pointerup', 100))

        expect(offsets.swipeend).toEqual([-100])
    })

    it('suppresses the browser its own image dragging', () => {
        swipe(node, enabled)
        const dragStart = new Event('dragstart', { bubbles: true, cancelable: true })

        node.dispatchEvent(dragStart)

        expect(dragStart.defaultPrevented).toBe(true)
    })
})
