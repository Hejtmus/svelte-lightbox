import { cubicOut } from 'svelte/easing'
import { fade } from 'svelte/transition'
import type { TransitionConfig } from 'svelte/transition'

// Asked as the flight begins rather than when it was arranged, so the place is measured
// as it is now, wherever the page has been scrolled to in the meantime
type ExpandOrigin = () => Element | null | undefined

interface ExpandParams {
    from?: ExpandOrigin | null,
    duration: number
}

const NO_FLIGHT: TransitionConfig = { duration: 0 }

// Collapses a duration to nothing when the reader's OS asks for reduced motion, regardless of what was asked for
const reducedMotionDuration = (duration: number): number => {
    const prefersReducedMotion = typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    return prefersReducedMotion ? 0 : duration
}

// How long a part of a lightbox takes in each direction
interface TransitionTiming {
    enter: number,
    leave: number
}

// A lightbox that only fades arrives gently and is dismissed briskly
const fadeTiming = (transitionDuration: number): TransitionTiming => ({
    enter: transitionDuration * 2,
    leave: transitionDuration / 2
})

// An image travelling between two places covers the same ground whichever way it goes,
// so it takes the same time doing it, and the cover it travels inside keeps to that
const flightTiming = (transitionDuration: number): TransitionTiming => ({
    enter: transitionDuration,
    leave: transitionDuration
})

/**
 * Grows the node out of the place another element holds on the page, and shrinks it back
 * into that same place on the way out. The node keeps its own opacity the whole way, so
 * what the reader follows is one image travelling rather than two images swapping.
 */
const expand = (node: Element, { from, duration }: ExpandParams): TransitionConfig => {
    const origin = from?.()

    if (!origin) {
        return NO_FLIGHT
    }

    const start = origin.getBoundingClientRect()
    const end = node.getBoundingClientRect()

    // Nothing to fly out of, and dividing by it would only produce a broken scale
    if (!start.width || !start.height || !end.width || !end.height) {
        return NO_FLIGHT
    }

    const dx = start.left - end.left
    const dy = start.top - end.top
    const dw = start.width / end.width
    const dh = start.height / end.height
    // Whatever the node is transformed by already has to survive the flight
    const transform = getComputedStyle(node).transform.replace('none', '')

    return {
        duration: reducedMotionDuration(duration),
        easing: cubicOut,
        css: (t, u) => `
            transform-origin: top left;
            transform: ${transform} translate(${u * dx}px, ${u * dy}px) scale(${t + u * dw}, ${t + u * dh});
        `
    }
}

// Computed colours come back as rgb() or rgba(), in either the comma or the slash spelling
const RGB_COLOUR = /^rgba?\(([^)]+)\)$/

/**
 * Darkens the page behind a lightbox by fading the backdrop colour itself rather than the
 * element carrying it. Fading the element would take everything standing on it along, and
 * an image travelling towards its place should arrive solid rather than half see through.
 *
 * Whatever colour the element is given is the colour that is faded, so overriding the
 * backdrop in css keeps working. A colour that cannot be read is faded the plain way.
 */
const dim = (node: Element, { duration }: { duration: number }): TransitionConfig => {
    const colour = RGB_COLOUR.exec(getComputedStyle(node).backgroundColor)
    const effectiveDuration = reducedMotionDuration(duration)

    if (colour === null) {
        return fade(node, { duration: effectiveDuration })
    }

    const [red, green, blue, alpha = '1'] = colour[1].split(/[\s,/]+/)

    return {
        duration: effectiveDuration,
        easing: cubicOut,
        css: (t) => `background-color: rgba(${red}, ${green}, ${blue}, ${Number(alpha) * t})`
    }
}

export { expand, dim, fadeTiming, flightTiming, reducedMotionDuration }
export type { ExpandOrigin, ExpandParams, TransitionTiming }
