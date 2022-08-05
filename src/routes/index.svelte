<script>
    import { Lightbox, LightboxGallery, GalleryImage, GalleryThumbnail } from '$lib'
    import { base } from '$app/paths'

    let galleryController
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
            <button on:click={() => galleryController.openImage(1)} class="btn btn-dark">
                Open image 2 from gallery 2
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col col-12">
            <LightboxGallery>
<!--                <img slot="thumbnail" src="{base}/img/gallery/1.jpg" alt="Simple lightbox" class="img-fluid">-->
                <div slot="thumbnail">
                    <div class="row">
                        <div class="col-6">
                            <GalleryThumbnail>
                                <img src="{base}/img/gallery/1.jpg" alt="Simple lightbox" class="img-fluid">
                            </GalleryThumbnail>
                        </div>
                        <div class="col-6">
                            <GalleryThumbnail>
                                <img src="{base}/img/gallery/2.jpg" alt="Simple lightbox" class="img-fluid">
                            </GalleryThumbnail>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <GalleryThumbnail>
                                <img src="{base}/img/gallery/3.jpg" alt="Simple lightbox" class="img-fluid">
                            </GalleryThumbnail>
                        </div>
                        <div class="col-6">
                            <GalleryThumbnail>
                                <img src="{base}/img/gallery/4.jpg" alt="Simple lightbox" class="img-fluid">
                            </GalleryThumbnail>
                        </div>
                    </div>
                </div>

                <div slot="lightbox">
                    <GalleryImage>
                        <img src="{base}/img/gallery/1.jpg" alt="Simple lightbox">
                    </GalleryImage>
                    <GalleryImage>
                        <img src="{base}/img/gallery/2.jpg" alt="Simple lightbox">
                    </GalleryImage>
                    <GalleryImage>
                        <img src="{base}/img/gallery/3.jpg" alt="Simple lightbox">
                    </GalleryImage>
                    <GalleryImage title="Too much wind" description="This happened ...">
                        <img src="{base}/img/gallery/4.jpg" alt="Simple lightbox" class="img-fluid">
                    </GalleryImage>
                </div>
            </LightboxGallery>
            <LightboxGallery bind:programmaticController={galleryController}>
                <!--                <img slot="thumbnail" src="{base}/img/gallery/1.jpg" alt="Simple lightbox" class="img-fluid">-->
                <GalleryImage>
                    <img src="{base}/img/test1.png" alt="Simple lightbox">
                </GalleryImage>
                <GalleryImage>
                    <img src="{base}/img/test2.png" alt="Simple lightbox">
                </GalleryImage>
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
