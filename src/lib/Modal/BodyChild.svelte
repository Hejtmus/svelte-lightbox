<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        children?: Snippet
    }

    let { children, ...rest }: Props = $props()

    // Kept at the end of the body, where no parent's overflow or stacking context can clip it
    const stackOnBody = (element: HTMLDivElement) => {
        const host = document.createElement('div')

        document.body.appendChild(host)
        host.appendChild(element)

        return () => host.remove()
    }
</script>

<div {@attach stackOnBody} {...rest}>
    {@render children?.()}
</div>
