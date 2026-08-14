<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        children?: Snippet
    }

    let { children, ...rest }: Props = $props()

    let host: HTMLDivElement | null = $state(null)

    // Keeps the rest of the page out of reach of pointer, keyboard and screen readers while the lightbox is open
    const inertSiblingsOf = (stack: Element) => {
        const siblings = Array.from(document.body.children)
            .filter((sibling) => sibling !== stack)
            .map((sibling) => ({ sibling, wasInert: sibling.hasAttribute('inert') }))

        siblings.forEach(({ sibling }) => sibling.setAttribute('inert', ''))

        return () => {
            siblings.forEach(({ sibling, wasInert }) => {
                if (!wasInert) {
                    sibling.removeAttribute('inert')
                }
            })
        }
    }

    // Kept at the end of the body, where no parent's overflow or stacking context can clip it
    const stackOnBody = (element: HTMLDivElement) => {
        const stack = document.createElement('div')

        document.body.appendChild(stack)
        stack.appendChild(element)
        host = stack

        const restoreInert = inertSiblingsOf(stack)

        return () => {
            restoreInert()
            stack.remove()
        }
    }
</script>

<div {@attach stackOnBody} {...rest}>
    <!-- Held back until the move is done, so that whatever mounts in here and measures itself
         measures the place it is going to be seen in rather than the one it was written in -->
    {#if host !== null}
        {@render children?.()}
    {/if}
</div>
