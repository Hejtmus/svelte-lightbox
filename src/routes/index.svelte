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
    <div class="row py-4 bg-light">
        <div class="col">
            <h1>
                <span class="w-auto bg-black text-white title">
                    svelte-lightbox
                </span>
            </h1>
            <p>
                <img src="https://img.shields.io/github/workflow/status/Hejtmus/svelte-lightbox/Node.js%20CI"
                     alt="workflow status">
                <img src="https://img.shields.io/npm/v/svelte-lightbox" alt="version">
                <img src="https://img.shields.io/bundlephobia/minzip/svelte-lightbox" alt="bundle size">
                <img src="https://img.shields.io/github/license/Hejtmus/svelte-lightbox" alt="MIT">
                <img src="https://img.shields.io/github/issues/Hejtmus/svelte-lightbox" alt="issues count">
                <img src="https://img.shields.io/npm/dw/svelte-lightbox" alt="downloads">
            </p>
            <p>
                Simple, but customizable lightbox component library for Svelte.
            </p>
        </div>
    </div>
    <div class="row py-3">
        <div class="col col-12">
            <h2>
                Lightbox without customized thumbnail
            </h2>
            <Lightbox description="Simple lightbox">
                <img src="{base}/img/test1.png" alt="Simple lightbox">
            </Lightbox>
<!--            <div class="row">-->
<!--                <div class="col d-flex">-->
<!--                </div>-->
<!--                <div class="col">-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
    <div class="row py-3">
        <div class="col col-12">
            <h2>
                Lightbox with customized thumbnail
            </h2>
            <Lightbox description="Lightbox without customized thumbnail" imagePreset="">
                <img slot="thumbnail" src="{base}/img/test2.png" alt="Simple lightbox" class="img-fluid">
                <img src="{base}/img/gallery/4.jpg" alt="Simple lightbox">
            </Lightbox>
        </div>
    </div>
    <div class="row py-3">
        <div class="col col-12">
            <h2>
                Gallery with thumbnail layout
            </h2>
            <LightboxGallery imagePreset="fullscreen">
<!--                <img slot="thumbnail" src="{base}/img/gallery/1.jpg" alt="Simple lightbox" class="img-fluid">-->
                <svelte:fragment slot="thumbnail">
                    <div class="row">
                        <div class="col-12 col-md-3 bg-light">
                            <GalleryThumbnail style="max-height: 15rem" class="d-flex">
                                <img src="{base}/img/gallery/1.jpg" alt="Simple lightbox" class="img-fluid" style="object-fit: contain">
                            </GalleryThumbnail>
                        </div>
                        <div class="col-12 col-md-3">
                            <GalleryThumbnail style="max-height: 15rem" class="d-flex">
                                <img src="{base}/img/gallery/2.jpg" alt="Simple lightbox" class="img-fluid" style="object-fit: contain">
                            </GalleryThumbnail>
                        </div>
                        <div class="col-12 col-md-3">
                            <GalleryThumbnail style="max-height: 15rem" class="d-flex">
                                <img src="{base}/img/gallery/3.jpg" alt="Simple lightbox" class="img-fluid" style="object-fit: contain">
                            </GalleryThumbnail>
                        </div>
                        <div class="col-12 col-md-3">
                            <GalleryThumbnail style="max-height: 15rem" class="d-flex">
                                <img src="{base}/img/gallery/4.jpg" alt="Simple lightbox" class="img-fluid" style="object-fit: contain">
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
        </div>
    </div>
    <div class="row py-3">
        <div class="col col-12">
            <div class="row">
                <h3>
                    Gallery with single thumbnail with programmatic controll
                </h3>
            </div>
            <div class="row">
                <div class="col col-12">
                    <button on:click={() => galleryController.openImage(1)} class="btn btn-dark m-2">
                        Open image 2 from gallery 2
                    </button>
                </div>
            </div>
            <LightboxGallery title="Gallery with unified title" bind:programmaticController={galleryController}>
                <div slot="thumbnail">
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
    @import url('https://fonts.googleapis.com/css2?family=Silkscreen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap');
    :global(body) {
        font-family: 'Montserrat', sans-serif;
    }
    .title {
        font-family: 'Silkscreen', cursive;
    }
    main {
        text-align: center;
        max-width: 100%;
        margin: 0 auto;
    }
</style>
