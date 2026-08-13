import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

const fixture = (query: Record<string, string> = {}) => {
    return `/tests/lightbox?${new URLSearchParams(query)}`
}

const overlay = (page: Page) => page.locator('.svelte-lightbox-overlay')
const modal = (page: Page) => page.locator('.svelte-lightbox-main')
const footer = (page: Page) => page.locator('.svelte-lightbox-footer')

const openByThumbnail = async (page: Page) => {
    await page.locator('.svelte-lightbox-thumbnail').click()
    await expect(overlay(page)).toBeVisible()
}

test.describe('opening and closing', () => {
    // Documented as: displays user clickable image, which on click expands
    test('opens when the thumbnail is clicked', async ({ page }) => {
        await page.goto(fixture())

        await expect(overlay(page)).toBeHidden()
        await openByThumbnail(page)
        await expect(modal(page)).toBeVisible()
    })

    // Documented as: enableFallbackThumbnail infers the thumbnail from the content
    test('uses the lightbox content as the thumbnail', async ({ page }) => {
        await page.goto(fixture())

        await expect(page.locator('.svelte-lightbox-thumbnail img')).toHaveAttribute('alt', 'fixture')
    })

    // Documented as: showCloseButton shows close button, default true
    test('closes through the close button', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        await page.getByTestId('close-button').click()

        await expect(overlay(page)).toBeHidden()
    })

    test('hides the close button when asked', async ({ page }) => {
        await page.goto(fixture({ showCloseButton: 'false' }))
        await openByThumbnail(page)

        await expect(page.getByTestId('close-button')).toBeHidden()
    })

    // Documented as: enableEscapeToClose, default true
    test('closes on escape by default', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        await page.keyboard.press('Escape')

        await expect(overlay(page)).toBeHidden()
    })

    test('ignores escape when disabled', async ({ page }) => {
        await page.goto(fixture({ enableEscapeToClose: 'false' }))
        await openByThumbnail(page)

        await page.keyboard.press('Escape')

        await expect(overlay(page)).toBeVisible()
    })

    // Documented as: enableClickToClose, anywhere user clicks closes it, default false
    test('keeps the lightbox open when the image itself is clicked', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        await modal(page).click()

        await expect(overlay(page)).toBeVisible()
    })

    test('closes on any click when click to close is on', async ({ page }) => {
        await page.goto(fixture({ enableClickToClose: 'true' }))
        await openByThumbnail(page)

        await modal(page).click()

        await expect(overlay(page)).toBeHidden()
    })

    test('closes when the area around the image is clicked', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        await overlay(page).click({ position: { x: 5, y: 5 } })

        await expect(overlay(page)).toBeHidden()
    })
})

test.describe('programmatic control', () => {
    // Documented as: programmaticController with toggle, open and close
    test('opens, closes and toggles', async ({ page }) => {
        await page.goto(fixture())

        await page.getByTestId('open').click()
        await expect(overlay(page)).toBeVisible()

        await page.getByTestId('close').click()
        await expect(overlay(page)).toBeHidden()

        await page.getByTestId('toggle').click()
        await expect(overlay(page)).toBeVisible()

        await page.getByTestId('toggle').click()
        await expect(overlay(page)).toBeHidden()
    })

    // Documented as: isVisible controls visibility without programmaticController
    test('opens through the isVisible binding', async ({ page }) => {
        await page.goto(fixture())

        await page.getByTestId('bind-open').click()

        await expect(overlay(page)).toBeVisible()
    })

    test('reports visibility back through the binding', async ({ page }) => {
        await page.goto(fixture())
        await expect(page.getByTestId('visible')).toHaveText('false')

        await openByThumbnail(page)

        await expect(page.getByTestId('visible')).toHaveText('true')
    })
})

test.describe('title and description', () => {
    // Documented as: title is wrapped in h2, description in h5
    test('shows them in the footer', async ({ page }) => {
        await page.goto(fixture({ title: 'A title', description: 'A description' }))
        await openByThumbnail(page)

        await expect(footer(page).locator('h2')).toHaveText('A title')
        await expect(footer(page).locator('h5')).toHaveText('A description')
    })

    // Documented as: string/HTML, feel free to use HTML (eg, <br>, <span>)
    // The components render them as text, so the markup shows up verbatim.
    test.fixme('renders markup passed as the title', async ({ page }) => {
        await page.goto(fixture({ title: 'Two<br>lines' }))
        await openByThumbnail(page)

        await expect(footer(page).locator('h2 br')).toBeAttached()
    })
})

test.describe('presets and styling', () => {
    // Documented as: '' default, 'fullscreen' covers an axis, 'scroll' scrolls a big image
    test('applies no preset class by default', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        await expect(page.locator('.svelte-lightbox-body')).not.toHaveClass(/fullscreen|scroll/)
    })

    test('marks the fullscreen preset', async ({ page }) => {
        await page.goto(fixture({ imagePreset: 'fullscreen' }))
        await openByThumbnail(page)

        await expect(page.locator('.svelte-lightbox-body')).toHaveClass(/fullscreen/)
    })

    test('marks the scroll preset', async ({ page }) => {
        await page.goto(fixture({ imagePreset: 'scroll' }))
        await openByThumbnail(page)

        await expect(page.locator('.svelte-lightbox-body')).toHaveClass(/scroll/)
    })

    // Documented as: the global CSS classes available for overriding
    test('exposes the documented css classes', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        for (const className of [
            '.svelte-lightbox-main',
            '.svelte-lightbox-body',
            '.svelte-lightbox-overlay',
            '.svelte-lightbox-header',
            '.svelte-lightbox-footer'
        ]) {
            await expect(page.locator(className)).toBeAttached()
        }
        await expect(page.locator('.svelte-lightbox-thumbnail')).toBeAttached()
    })

    // Documented as: customization holds html props of the element of that key
    test('passes customization props through to the element', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        await expect(page.getByTestId('close-button')).toBeVisible()
    })
})

test.describe('body scroll', () => {
    // Documented as: keepBodyScroll keeps body scroll while open, default false
    test('locks the page behind the lightbox', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)

        await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
    })

    test('leaves the page scrollable when asked', async ({ page }) => {
        await page.goto(fixture({ keepBodyScroll: 'true' }))
        await openByThumbnail(page)

        await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
    })

    test('restores scrolling after closing', async ({ page }) => {
        await page.goto(fixture())
        await openByThumbnail(page)
        await page.keyboard.press('Escape')

        await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
    })
})
