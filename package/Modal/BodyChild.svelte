<script>import { onMount, onDestroy } from 'svelte';
let targetElement;
let child;
const stackTarget = () => {
    child = document.createElement('div');
    document.body.appendChild(child);
    child.appendChild(targetElement);
};
const removeTarget = () => {
    if (typeof document !== 'undefined') {
        document.body.removeChild(child);
    }
};
onMount(stackTarget);
onDestroy(removeTarget);
</script>

<div bind:this={targetElement} {...$$restProps}>
	<slot />
</div>
