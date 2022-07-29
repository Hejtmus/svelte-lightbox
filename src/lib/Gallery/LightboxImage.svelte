<script>
    /*
    This component exists because it helps user imagine what and how are images displayed in gallery,
    also we need every picture in gallery to be hidden until they are active, and by making this component
    we don't bother user with setting it manually.
     */
</script>

<div hidden={true} {...$$restProps}>
    <slot/>
</div>

<style>
	div {
		max-height: inherit;
		display: flex;
		justify-content: center;
	}
</style>