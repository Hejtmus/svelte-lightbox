<script>
    import { Lightbox } from '$lib';
</script>

<main>
    <div class="row">
        <div class="col">
            <h1>
                svelte-lightbox demo
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col col-12">
            <Lightbox description="Simple lightbox" preset="fit">
                <img src="./img/test1.png" alt="Simple lightbox" class="img-fluid">
            </Lightbox>
        </div>
    </div>
    <div class="row">
        <div class="col col-12">
            <Lightbox description="Simple lightbox" preset="expand">
                <img src="./img/test2.png" alt="Simple lightbox" style="max-height: 85vh" class="img-fluid">
            </Lightbox>
        </div>
    </div>
    <div class="row">
        <div class="col col-12">
            <Lightbox description="Simple lightbox" preset="fit">
                <img src="./img/test3.png" alt="Simple lightbox" class="img-fluid">
            </Lightbox>
        </div>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 100%;
        margin: 0 auto;
    }
</style>
