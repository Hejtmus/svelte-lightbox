import type { Attachment } from 'svelte/attachments'

// What Tab is allowed to reach while the dialog holds focus captive
const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(', ')

const focusableElementsIn = (root: HTMLElement): HTMLElement[] => {
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

// Keeps Tab and Shift+Tab cycling through the dialog's own controls rather than walking out of it
const cycleFocus = (dialog: HTMLElement, event: KeyboardEvent) => {
    if (event.key !== 'Tab') {
        return
    }

    const focusable = focusableElementsIn(dialog)

    if (focusable.length === 0) {
        event.preventDefault()
        return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
    } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
    }
}

/**
 * Moves focus into the dialog as it mounts, keeps Tab from walking out of it, and hands
 * focus back to whatever held it before once the dialog is torn down.
 */
const trapFocus = (): Attachment<HTMLElement> => {
    return (dialog) => {
        const returnFocusTo = document.activeElement

        dialog.focus()

        const handleKeydown = (event: KeyboardEvent) => cycleFocus(dialog, event)

        dialog.addEventListener('keydown', handleKeydown)

        return () => {
            dialog.removeEventListener('keydown', handleKeydown)

            if (!(returnFocusTo instanceof HTMLElement)) {
                return
            }

            // Deferred a tick, so the page behind the dialog has already left inert behind by the time focus lands
            queueMicrotask(() => {
                if (returnFocusTo.isConnected) {
                    returnFocusTo.focus()
                }
            })
        }
    }
}

export { trapFocus }
