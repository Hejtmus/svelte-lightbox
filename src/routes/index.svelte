<script>
    import { Lightbox, LightboxGallery, LightboxImage } from '$lib'
    import { base } from '$app/paths'
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
            <Lightbox description="Simple lightbox">
                <img src="{base}/img/test1.png" alt="Simple lightbox" class="img-fluid">
            </Lightbox>
        </div>
    </div>
    <div class="row">
        <div class="col col-12">
            <Lightbox description="Simple lightbox">
                <img src="{base}/img/test2.png" alt="Simple lightbox" style="max-height: 85vh" class="img-fluid">
            </Lightbox>
        </div>
    </div>
    <div class="row">
        <div class="col col-12">
            <LightboxGallery>
                <img slot="thumbnail" src="{base}/img/gallery/1.jpg" alt="Simple lightbox" class="img-fluid">
                <LightboxImage>
                    <img src="{base}/img/gallery/1.jpg" alt="Simple lightbox">
                </LightboxImage>
                <LightboxImage>
                    <img src="{base}/img/gallery/2.jpg" alt="Simple lightbox">
                </LightboxImage>
                <LightboxImage>
                    <img src="{base}/img/gallery/3.jpg" alt="Simple lightbox">
                </LightboxImage>
                <LightboxImage>
                    <img src="{base}/img/gallery/4.jpg" alt="Simple lightbox">
                </LightboxImage>
            </LightboxGallery>
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
