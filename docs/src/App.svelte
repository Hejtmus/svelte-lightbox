<script>
	import { Lightbox } from '../../dist';
	export let name;
</script>

<main>
	<Lightbox description="Simple lightbox">
		<img src="./img/test1.png" alt="Simple lightbox">
	</Lightbox>
	<Lightbox description="Simple lightbox">
		<img src="./img/test2.png" alt="Simple lightbox">
	</Lightbox>
	<Lightbox description="Simple lightbox">
		<img src="./img/test3.png" alt="Simple lightbox">
	</Lightbox>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
