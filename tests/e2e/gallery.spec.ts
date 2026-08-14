import { test, expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

const fixture = (query: Record<string, string> = {}) => {
    return `/tests/gallery?${new URLSearchParams(query)}`
}

const overlay = (page: Page) => page.locator('.svelte-lightbox-overlay')
const footer = (page: Page) => page.locator('.svelte-lightbox-footer')
const body = (page: Page) => page.locator('.svelte-lightbox-body')
const nextArrow = (page: Page) => page.locator('button.next-button')
const previousArrow = (page: Page) => page.locator('button.previous-button')

// The displayed image is the only one in flow, neighbours are parked beside it
const displayed = (page: Page) => body(page).locator('> img')

const openAt = async (page: Page, thumbnail: number) => {
    await page.getByTestId(`thumbnail-${thumbnail}`).click()
    await expect(overlay(page)).toBeVisible()
}

const expectDisplayed = async (page: Page, image: number) => {
    await expect(displayed(page)).toHaveAttribute('alt', `image ${image}`)
}

const drag = async (target: Locator, distance: number) => {
    const box = await target.boundingBox()
    const y = box.y + box.height / 2
    const from = box.x + box.width / 2

    await target.page().mouse.move(from, y)
    await target.page().mouse.down()
    await target.page().mouse.move(from + distance, y, { steps: 8 })
    await target.page().mouse.up()
}

test.describe('opening', () => {
    // Documented as: clicking a thumbnail opens the gallery at its image
    test('opens at the image belonging to the thumbnail', async ({ page }) => {
        await page.goto(fixture())

        await openAt(page, 3)

        await expectDisplayed(page, 3)
    })

    // Documented as: id defaults to the order of the thumbnails, starting with 0
    test('pairs thumbnails with images by order', async ({ page }) => {
        await page.goto(fixture())

        await openAt(page, 1)
        await expectDisplayed(page, 1)
    })

    // Documented as: activeImage selects the visible image programmatically
    test('honours the activeImage prop', async ({ page }) => {
        await page.goto(fixture({ activeImage: '2' }))

        await page.getByTestId('open').click()

        await expectDisplayed(page, 3)
    })

    // Documented as: openImage opens the lightbox at a specific image
    test('opens at a given image through the controller', async ({ page }) => {
        await page.goto(fixture())

        await page.getByTestId('open-third').click()

        await expectDisplayed(page, 3)
    })
})

test.describe('arrow navigation', () => {
    test('walks forward and back', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 2)

        await nextArrow(page).click()
        await expectDisplayed(page, 3)

        await previousArrow(page).click()
        await expectDisplayed(page, 2)
    })

    // Documented as: '' leaves the arrow inactive in edge cases
    test('disables the back arrow on the first image', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 1)

        await expect(previousArrow(page)).toBeDisabled()
        await expect(nextArrow(page)).toBeEnabled()
    })

    test('disables the forward arrow on the last image', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 4)

        await expect(nextArrow(page)).toBeDisabled()
        await expect(previousArrow(page)).toBeEnabled()
    })

    // Documented as: 'hide' hides the arrow in edge cases
    test('hides the disabled arrow when asked', async ({ page }) => {
        await page.goto(fixture({ character: 'hide' }))
        await openAt(page, 1)

        await expect(previousArrow(page)).toHaveClass(/hideDisabled/)
        await expect(previousArrow(page)).toBeDisabled()
    })

    // Documented as: 'loop' keeps arrows always active and wraps around
    test('wraps around when looping', async ({ page }) => {
        await page.goto(fixture({ character: 'loop' }))
        await openAt(page, 1)

        await expect(previousArrow(page)).toBeEnabled()
        await previousArrow(page).click()
        await expectDisplayed(page, 4)

        await nextArrow(page).click()
        await expectDisplayed(page, 1)
    })
})

test.describe('keyboard navigation', () => {
    // Documented as: enableKeyboardControl, default true
    test('walks with the arrow keys', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 2)

        await page.keyboard.press('ArrowRight')
        await expectDisplayed(page, 3)

        await page.keyboard.press('ArrowLeft')
        await expectDisplayed(page, 2)
    })

    test('ignores the arrow keys when disabled', async ({ page }) => {
        await page.goto(fixture({ enableKeyboardControl: 'false' }))
        await openAt(page, 2)

        await page.keyboard.press('ArrowRight')

        await expectDisplayed(page, 2)
    })

    test('stops at the last image without looping', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 4)

        await page.keyboard.press('ArrowRight')

        await expectDisplayed(page, 4)
    })
})

test.describe('per image title and description', () => {
    // Documented as: GalleryImage title/description are shown for that image only
    test('follow the displayed image', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 2)

        await expect(footer(page).locator('h2')).toHaveText('Title 2')
        await expect(footer(page).locator('h5')).toHaveText('Description 2')

        await nextArrow(page).click()

        await expect(footer(page).locator('h2')).toHaveText('Title 3')
    })

    // Documented as: the gallery counter, wording comes from the i18n store
    test('count the images for the reader', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 2)

        await expect(footer(page).locator('p')).toHaveText('Image 2 of 4')

        await nextArrow(page).click()

        await expect(footer(page).locator('p')).toHaveText('Image 3 of 4')
    })
})

test.describe('crossfade preset', () => {
    // Documented as: the image grows out of the thumbnail that was clicked, at its size
    test('starts the flight at the thumbnail that was clicked', async ({ page }) => {
        await page.goto(fixture({ transitionPreset: 'crossfade', transitionDuration: '10000' }))
        await openAt(page, 2)

        const thumbnail = await page.getByTestId('thumbnail-2').boundingBox()
        const flying = await body(page).boundingBox()

        // Barely under way, so the image should still be wearing the thumbnail's size and place
        expect(Math.abs(flying.width - thumbnail.width)).toBeLessThan(thumbnail.width / 4)
        expect(Math.abs(flying.x - thumbnail.x)).toBeLessThan(thumbnail.width / 4)
    })

    // Documented as: the thumbnails stay where they are, the image lands on top of one
    test('leaves every thumbnail in its place', async ({ page }) => {
        await page.goto(fixture({ transitionPreset: 'crossfade' }))
        await openAt(page, 2)

        await expect(page.locator('.svelte-lightbox-thumbnail')).toHaveCount(4)
    })

    test('moves nothing without the preset', async ({ page }) => {
        await page.goto(fixture({ transitionDuration: '3000' }))
        await openAt(page, 2)

        await expect(body(page)).toHaveCSS('transform', 'none')
    })

    // Documented as: the image goes back into the thumbnail it is showing, not the one clicked
    test('keeps navigating and closing intact', async ({ page }) => {
        await page.goto(fixture({ transitionPreset: 'crossfade' }))
        await openAt(page, 2)

        await nextArrow(page).click()
        await expectDisplayed(page, 3)

        await page.keyboard.press('Escape')

        await expect(overlay(page)).toBeHidden()
        await expect(page.locator('.svelte-lightbox-thumbnail')).toHaveCount(4)
    })
})

test.describe('swipe navigation', () => {
    // Documented as: enabled defaults to false, galleries keep behaving as before
    test('is off unless opted into', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 2)

        await drag(displayed(page), -200)

        await expectDisplayed(page, 2)
    })

    test('mounts no neighbouring images while off', async ({ page }) => {
        await page.goto(fixture())
        await openAt(page, 2)

        await expect(body(page).locator('.svelte-lightbox-gallery-neighbour')).toHaveCount(0)
    })

    // Documented as: neighbouring images render while swiping is enabled
    test('mounts the neighbours on both sides once enabled', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true' }))
        await openAt(page, 2)

        await expect(body(page).locator('.svelte-lightbox-gallery-neighbour')).toHaveCount(2)
    })

    test('mounts one neighbour at the end of the gallery', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true' }))
        await openAt(page, 4)

        await expect(body(page).locator('.svelte-lightbox-gallery-neighbour')).toHaveCount(1)
    })

    test('moves forward when dragged left', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true' }))
        await openAt(page, 2)

        await drag(displayed(page), -200)

        await expectDisplayed(page, 3)
    })

    test('moves back when dragged right', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true' }))
        await openAt(page, 2)

        await drag(displayed(page), 200)

        await expectDisplayed(page, 1)
    })

    // Documented as: shorter drags return the image back to its place
    test('springs back below the threshold', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true', threshold: '100' }))
        await openAt(page, 2)

        await drag(displayed(page), -60)

        await expectDisplayed(page, 2)
    })

    test('respects a lowered threshold', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true', threshold: '20' }))
        await openAt(page, 2)

        await drag(displayed(page), -30)

        await expectDisplayed(page, 3)
    })

    // Documented as: edge cases follow arrowsConfig.character
    test('does not move past the end without looping', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true' }))
        await openAt(page, 4)

        await drag(displayed(page), -200)

        await expectDisplayed(page, 4)
    })

    test('wraps when the arrows loop', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true', character: 'loop' }))
        await openAt(page, 4)

        await drag(displayed(page), -200)

        await expectDisplayed(page, 1)
    })

    // Documented as: enableMouseDrag adds mouse dragging on top of touch
    test('ignores mouse drags when only touch is allowed', async ({ page }) => {
        await page.goto(fixture({ swipe: 'true', enableMouseDrag: 'false' }))
        await openAt(page, 2)

        await drag(displayed(page), -200)

        await expectDisplayed(page, 2)
    })
})
