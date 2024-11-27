<script>
    import { Lightbox, LightboxGallery, GalleryImage, GalleryThumbnail, i18n } from '$lib'
    import { base } from '$app/paths'

    $i18n.generateLocalizedGalleryCounter = (activeImage, imageCount) => {
        return `Obrázok ${activeImage + 1} z ${imageCount}`
    }

    // let lightboxController
    let galleryController
</script>

<svelte:head>
    <title>
        svelte-lightbox | Examples
    </title>
    <meta name="description" content="Example uses of svelte-lightbox">
</svelte:head>

<div class="row py-3">
    <div class="col col-12 col-md-6 flex-grow py-1">
        <div class="row card m-4 p-4 shadow h-100">
            <div class="col col-12">
                <h2 class="text-center display-5">
                    Standard lightbox
                </h2>
            </div>
            <div class="col col-12 col-md-3 mx-auto text-white">
                <Lightbox title="Simple lightbox">
                    <img src="{base}/img/test4.jpg" alt="Simple lightbox">
                </Lightbox>
            </div>
        </div>
    </div>
    <div class="col col-12 col-md-6 flex-grow py-1">
        <div class="row card m-4 p-4 shadow h-100">
            <div class="col col-12">
                <h2 class="text-center display-5">
                    Lightbox with custom thumbnail
                </h2>
            </div>
            <div class="col col-12 col-md-2 mx-auto">
                <Lightbox description="Lightbox without customized thumbnail" imagePreset="">
                    <img slot="thumbnail" src="{base}/img/cat.jpg" alt="Simple lightbox" class="img-fluid">
                    <img src="{base}/img/dog.jpg" alt="Simple lightbox">
                </Lightbox>
            </div>
        </div>
    </div>
</div>
<div class="row p-5 py-3">
    <div class="col col-12 card shadow p-3">
        <h2 class="text-center py-4 display-5">
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
<div class="row p-5 py-3">
    <div class="col col-12 card shadow">
        <div class="row">
            <h2 class="text-center py-3 display-5">
                Gallery with single thumbnail with programmatic controller
            </h2>
        </div>
        <div class="row">
        </div>
        <LightboxGallery title="Gallery with unified title" bind:programmaticController={galleryController}>
            <div slot="thumbnail">
                <div class="row">
                    <GalleryThumbnail class="col col-md-3">
                        <img src="{base}/img/test1.png" alt="Simple lightbox" class="img-fluid">
                    </GalleryThumbnail>
                    <div class="col">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, culpa dicta eligendi fuga
                        incidunt labore laudantium maiores, minus numquam soluta ullam voluptate, voluptates! Accusamus
                        dolor, doloremque excepturi explicabo fugit tenetur.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, culpa dicta eligendi fuga
                        incidunt labore laudantium maiores, minus numquam soluta ullam voluptate, voluptates! Accusamus
                        dolor, doloremque excepturi explicabo fugit tenetur.
                        </p>
                        <button on:click={() => galleryController.openImage(1)} class="btn btn-dark m-2">
                          Open image 2 from gallery 2
                        </button>
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
