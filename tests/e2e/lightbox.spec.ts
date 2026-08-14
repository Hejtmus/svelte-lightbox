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

test.describe('crossfade preset', () => {
    // Documented as: the thumbnail expands into the opened image, so the flight starts at its size
    test('starts the flight at the size of the thumbnail', async ({ page }) => {
        // Inside a transformed ancestor, so the flight is only right if it is measured
        // where the lightbox ends up rather than where it was written
        await page.goto(fixture({ transitionPreset: 'crossfade', transitionDuration: '10000', clipped: 'true' }))
        await openByThumbnail(page)

        const thumbnail = await page.locator('.svelte-lightbox-thumbnail').boundingBox()
        const flying = await page.locator('.svelte-lightbox-body').boundingBox()

        // Barely under way, so the image should still be wearing the thumbnail's size and place
        expect(Math.abs(flying.width - thumbnail.width)).toBeLessThan(thumbnail.width / 4)
        expect(Math.abs(flying.x - thumbnail.x)).toBeLessThan(thumbnail.width / 4)
        expect(Math.abs(flying.y - thumbnail.y)).toBeLessThan(thumbnail.height / 2)
    })

    // Documented as: the thumbnail stays where it is, the image lands on top of it
    test('leaves the thumbnail in its place', async ({ page }) => {
        await page.goto(fixture({ transitionPreset: 'crossfade' }))
        await openByThumbnail(page)

        await expect(page.locator('.svelte-lightbox-thumbnail')).toHaveCount(1)
    })

    // Documented as: '' keeps the plain fade, where nothing travels anywhere
    test('moves nothing without the preset', async ({ page }) => {
        await page.goto(fixture({ transitionDuration: '3000' }))
        await openByThumbnail(page)

        await expect(page.locator('.svelte-lightbox-body')).toHaveCSS('transform', 'none')
    })

    // Transitions are local by default, so an ancestor closing the lightbox would skip them
    test('flies the image home rather than dropping it', async ({ page }) => {
        await page.goto(fixture({ transitionPreset: 'crossfade', transitionDuration: '2000', clipped: 'true' }))
        await openByThumbnail(page)
        await page.waitForTimeout(2500)

        const opened = await page.locator('.svelte-lightbox-body').boundingBox()
        const thumbnail = await page.locator('.svelte-lightbox-thumbnail').boundingBox()

        await page.keyboard.press('Escape')
        await page.waitForTimeout(400)

        // Still on its way, so neither gone already nor still sitting at its opened size
        const returning = await page.locator('.svelte-lightbox-body').boundingBox()
        expect(returning.width).toBeLessThan(opened.width)
        expect(returning.width).toBeGreaterThan(thumbnail.width)
    })

    // The image lives inside the cover, so it would be taken away mid flight if it outlasted it
    test('lands the image before the cover is gone', async ({ page }) => {
        await page.goto(fixture({ transitionPreset: 'crossfade', transitionDuration: '600' }))
        await openByThumbnail(page)
        await page.waitForTimeout(1000)

        await page.keyboard.press('Escape')
        await page.waitForTimeout(900)

        await expect(page.locator('.svelte-lightbox-overlay')).toHaveCount(0)
        await expect(page.locator('.svelte-lightbox-body')).toHaveCount(0)
    })

    test('still opens and closes', async ({ page }) => {
        await page.goto(fixture({ transitionPreset: 'crossfade' }))
        await openByThumbnail(page)

        await expect(modal(page)).toBeVisible()

        await page.keyboard.press('Escape')

        await expect(overlay(page)).toBeHidden()
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
