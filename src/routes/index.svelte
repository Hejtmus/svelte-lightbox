<script>
    import { Lightbox, LightboxGallery, GalleryImage, GalleryThumbnail, i18n } from '$lib'
    import { base } from '$app/paths'

    $i18n.generateLocalizedGalleryCounter = (activeImage, imageCount) => {
            return `Obrázok ${activeImage + 1} z ${imageCount}`
    }

    // let lightboxController
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
            <Lightbox description="Lightbox without customized thumbnail" imagePreset="">
                <img slot="thumbnail" src="{base}/img/test1.png" alt="Simple lightbox" >
                <img src="{base}/img/gallery/4.jpg" alt="Simple lightbox">
            </Lightbox>
        </div>
    </div>
    <div class="row">
        <div class="col col-12">
            <Lightbox description="Simple lightbox">
                <img src="{base}/img/test2.png" alt="Simple lightbox">
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
            <LightboxGallery imagePreset="fullscreen">
<!--                <img slot="thumbnail" src="{base}/img/gallery/1.jpg" alt="Simple lightbox" class="img-fluid">-->
                <svelte:fragment slot="thumbnail">
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
                </svelte:fragment>

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
            </LightboxGallery>
            <LightboxGallery title="Gallery with unified title" bind:programmaticController={galleryController}>
                <div slot="thumbnail">
                    <div class="row">
                        <h3>
                            Gallery with single thumbnail
                        </h3>
                    </div>
                    <div class="row">
                        <GalleryThumbnail class="col col-md-3">
                            <img src="{base}/img/test1.png" alt="Simple lightbox" class="img-fluid">
                        </GalleryThumbnail>
                        <div class="col">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, culpa dicta eligendi fuga
                            incidunt labore laudantium maiores, minus numquam soluta ullam voluptate, voluptates! Accusamus
                            dolor, doloremque excepturi explicabo fugit tenetur.
                        </div>
                    </div>
                </div>

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
