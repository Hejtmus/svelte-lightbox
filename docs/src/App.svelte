<script>
	import {
		Row,
		Col
	} from "sveltestrap";
	import { Lightbox } from '../../dist';
</script>

<main>
	<Row>
		<Col>
			<h1>
				svelte-lightbox demo
			</h1>
		</Col>
	</Row>
	<Row>
		<Col xs="12">
			<Lightbox description="Simple lightbox" preset="fit">
				<img src="./img/test1.png" alt="Simple lightbox" style="max-width: 100%">
			</Lightbox>
		</Col>
	</Row>
	<Row>
		<Col>
			<Lightbox description="Simple lightbox" preset="expand">
				<img src="./img/test2.png" alt="Simple lightbox" style="max-height: 85vh">
			</Lightbox>
		</Col>
	</Row>
	<Row>
		<Col>
			<Lightbox description="Simple lightbox" preset="fit">
				<img src="./img/test3.png" alt="Simple lightbox">
			</Lightbox>
		</Col>
	</Row>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 100%;
		margin: 0 auto;
	}
</style>
