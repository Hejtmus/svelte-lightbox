<script lang="ts">
    import { Lightbox, LightboxGallery, GalleryImage, GalleryThumbnail, i18n } from '$lib'
    import { base } from '$app/paths'

    const gallery = [1, 2, 3, 4]

    let openableGallery: ReturnType<typeof LightboxGallery>

    // Shows that the gallery counter wording is replaceable
    $i18n.generateLocalizedGalleryCounter = (activeImage, imageCount) => {
        return `Obrázok ${activeImage + 1} z ${imageCount}`
    }
</script>

<svelte:head>
    <title>
        svelte-lightbox | Examples
    </title>
    <meta name="description" content="Example uses of svelte-lightbox">
</svelte:head>

<div class="examples">
    <h1>Examples</h1>
    <p class="lead">
        Every example below is live, click any image to open it. The gallery counter reads in Slovak because this page
        replaces the wording through the <code>i18n</code> store.
    </p>

    <div class="grid">
        <section class="card">
            <h2>Standard lightbox</h2>
            <p>The image doubles as its own thumbnail.</p>
            <div class="stage">
                <Lightbox title="Simple lightbox">
                    <img src="{base}/img/test4.jpg" alt="A wall of windows">
                </Lightbox>
            </div>
        </section>

        <section class="card">
            <h2>Custom thumbnail</h2>
            <p>A different image stands in for the one that opens.</p>
            <div class="stage">
                <Lightbox description="Lightbox with a customized thumbnail">
                    {#snippet thumbnail()}
                        <img src="{base}/img/cat.jpg" alt="A cat">
                    {/snippet}
                    <img src="{base}/img/dog.jpg" alt="A dog">
                </Lightbox>
            </div>
        </section>
    </div>

    <section class="card">
        <h2>Growing out of the thumbnail</h2>
        <p>
            With the crossfade preset the small thumbnail expands into the opened image and shrinks back into its
            place on closing, rather than the image fading in over the page.
        </p>
        <div class="stage">
            <Lightbox title="A wall of windows" transitionPreset="crossfade" transitionDuration={450}>
                {#snippet thumbnail()}
                    <img class="small" src="{base}/img/test4.jpg" alt="A wall of windows">
                {/snippet}

                <img src="{base}/img/test4.jpg" alt="A wall of windows">
            </Lightbox>
        </div>
    </section>

    <section class="card">
        <h2>Gallery with a thumbnail layout</h2>
        <p>Fullscreen preset, with swiping enabled. Drag an image sideways, or use the arrows and arrow keys.</p>
        <LightboxGallery imagePreset="fullscreen" swipeConfig={{ enabled: true }}>
            {#snippet thumbnail()}
                <div class="thumbnails">
                    {#each gallery as image (image)}
                        <GalleryThumbnail>
                            <img src="{base}/img/gallery/{image}.jpg" alt="Gallery image {image}">
                        </GalleryThumbnail>
                    {/each}
                </div>
            {/snippet}

            {#each gallery as image (image)}
                <GalleryImage
                    title={image === 4 ? 'Too much wind' : ''}
                    description={image === 4 ? 'This happened ...' : ''}
                >
                    <img src="{base}/img/gallery/{image}.jpg" alt="Gallery image {image}">
                </GalleryImage>
            {/each}
        </LightboxGallery>
    </section>

    <section class="card">
        <h2>Gallery opened from anywhere</h2>
        <p>A single thumbnail beside a button that opens a specific image through the component instance.</p>
        <LightboxGallery
            title="Gallery with unified title"
            swipeConfig={{ enabled: true }}
            bind:this={openableGallery}
        >
            {#snippet thumbnail()}
                <div class="split">
                    <GalleryThumbnail>
                        <img src="{base}/img/test1.png" alt="First image">
                    </GalleryThumbnail>
                    <div>
                        <p>
                            The thumbnail on the left opens the gallery at its own image. The button opens the gallery
                            at the second image instead, without the reader having to touch a thumbnail at all.
                        </p>
                        <button onclick={() => openableGallery.openImage(1)}>
                            Open the second image
                        </button>
                    </div>
                </div>
            {/snippet}

            <GalleryImage>
                <img src="{base}/img/test1.png" alt="First image">
            </GalleryImage>
            <GalleryImage>
                <img src="{base}/img/test2.png" alt="Second image">
            </GalleryImage>
        </LightboxGallery>
    </section>
</div>

<style>
    /* The theme keeps pages in a narrow prose column, which is too tight for
       a page whose point is showing images side by side */
    div.examples {
        width: min(960px, 88vw);
        margin-left: 50%;
        transform: translateX(-50%);
        padding: 2rem 0 4rem;
    }
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    p.lead {
        opacity: 0.75;
        margin-bottom: 2rem;
    }
    section.card p {
        opacity: 0.75;
        margin-bottom: 1.25rem;
    }
    div.grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 1.5rem;
    }
    section.card {
        border: 1px solid rgb(125 125 125 / 25%);
        border-radius: 0.75rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }
    div.stage {
        display: flex;
        justify-content: center;
    }
    div.stage :global(img) {
        max-height: 15rem;
        width: auto;
    }
    /* Small enough that the growing is worth watching */
    div.stage :global(img.small) {
        max-height: 6rem;
        border-radius: 0.5rem;
    }
    div.thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: 1rem;
    }
    div.thumbnails :global(img) {
        width: 100%;
        height: 10rem;
        object-fit: cover;
        border-radius: 0.5rem;
    }
    div.split {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        align-items: center;
    }
    div.split :global(img) {
        max-width: 16rem;
        border-radius: 0.5rem;
    }
    div.split > div {
        flex: 1 1 18rem;
    }
    button {
        border: none;
        border-radius: 0.5rem;
        padding: 0.6rem 1.2rem;
        background-color: #ff3e00;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }
    button:hover {
        background-color: #ff5a1f;
    }
</style>
