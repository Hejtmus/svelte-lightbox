import { c as create_ssr_component, a as createEventDispatcher, e as escape, n as null_to_empty, b as add_attribute, g as getContext, d as subscribe, f as noop, h as safe_not_equal, s as setContext, v as validate_component, i as compute_rest_props, o as onDestroy, j as spread, k as escape_object, l as compute_slots } from "../../chunks/index-40b79576.js";
var LightboxThumbnail_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: "div.clickable.svelte-1u332e1{position:static;cursor:zoom-in}div.svelte-lightbox-unselectable.svelte-1u332e1{user-select:none;pointer-events:none}",
  map: null
};
const LightboxThumbnail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { class: classes = "" } = $$props;
  let { style = "" } = $$props;
  let { protect = false } = $$props;
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.protect === void 0 && $$bindings.protect && protect !== void 0)
    $$bindings.protect(protect);
  $$result.css.add(css$7);
  return `<div class="${"clickable svelte-1u332e1"}"><div class="${[
    escape(null_to_empty(classes)) + " svelte-1u332e1",
    protect ? "svelte-lightbox-unselectable" : ""
  ].join(" ").trim()}"${add_attribute("style", style, 0)}>${slots.default ? slots.default({}) : ``}</div>
</div>`;
});
var LightboxHeader_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: "div.svelte-lightbox-header.svelte-fa0syz{width:auto;height:3rem;display:flex;justify-content:flex-end;align-items:center}div.fullscreen.svelte-fa0syz{position:fixed;z-index:5;top:0;left:0;right:0}button.svelte-fa0syz{background:transparent;font-size:3rem;border:none;color:white}button.svelte-fa0syz:hover{color:lightgray;cursor:pointer}button.svelte-fa0syz:active{background-color:transparent}button.fullscreen.svelte-fa0syz{filter:drop-shadow(0 0 5px black) drop-shadow(0 0 10px black)}",
  map: null
};
const LightboxHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { size = "xs" } = $$props;
  let { style = "" } = $$props;
  let { headerClasses = "" } = $$props;
  let { buttonClasses = "" } = $$props;
  let { closeButton = true } = $$props;
  let { fullscreen = false } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.headerClasses === void 0 && $$bindings.headerClasses && headerClasses !== void 0)
    $$bindings.headerClasses(headerClasses);
  if ($$props.buttonClasses === void 0 && $$bindings.buttonClasses && buttonClasses !== void 0)
    $$bindings.buttonClasses(buttonClasses);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0)
    $$bindings.closeButton(closeButton);
  if ($$props.fullscreen === void 0 && $$bindings.fullscreen && fullscreen !== void 0)
    $$bindings.fullscreen(fullscreen);
  $$result.css.add(css$6);
  return `<div class="${[
    escape(null_to_empty("svelte-lightbox-header " + headerClasses)) + " svelte-fa0syz",
    fullscreen ? "fullscreen" : ""
  ].join(" ").trim()}">${closeButton ? `<button${add_attribute("size", size, 0)}${add_attribute("style", style, 0)} class="${[
    escape(null_to_empty(buttonClasses)) + " svelte-fa0syz",
    fullscreen ? "fullscreen" : ""
  ].join(" ").trim()}">\xD7
        </button>` : ``}
</div>`;
});
var LightboxBody_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "div.svelte-lightbox-body.svelte-3luti8{background-color:transparent;width:auto;height:auto;max-height:80vh}div.svelte-lightbox-body.fullscreen.svelte-3luti8{background-size:contain;background-repeat:no-repeat;background-position:center}div.fullscreen.svelte-3luti8{width:inherit;max-width:inherit;height:inherit;max-height:inherit}div.svelte-lightbox-unselectable.svelte-3luti8{user-select:none;pointer-events:none}div.svelte-lightbox-image-portrait.svelte-3luti8{height:90vh}div.expand.svelte-3luti8{width:90vw;height:auto;max-height:90vh}",
  map: null
};
const LightboxBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imageClass;
  let $$unsubscribe_activeImageStore;
  let { image = {} } = $$props;
  let { protect = false } = $$props;
  let { portrait = false } = $$props;
  let { imagePreset = false } = $$props;
  let { fullscreen = false } = $$props;
  let { gallery = false } = $$props;
  const activeImageStore = getContext("svelte-lightbox-activeImage");
  $$unsubscribe_activeImageStore = subscribe(activeImageStore, (value) => value);
  let imageParent;
  const getFullscreenSrc = () => {
    {
      queueMicrotask(getFullscreenSrc);
    }
  };
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.protect === void 0 && $$bindings.protect && protect !== void 0)
    $$bindings.protect(protect);
  if ($$props.portrait === void 0 && $$bindings.portrait && portrait !== void 0)
    $$bindings.portrait(portrait);
  if ($$props.imagePreset === void 0 && $$bindings.imagePreset && imagePreset !== void 0)
    $$bindings.imagePreset(imagePreset);
  if ($$props.fullscreen === void 0 && $$bindings.fullscreen && fullscreen !== void 0)
    $$bindings.fullscreen(fullscreen);
  if ($$props.gallery === void 0 && $$bindings.gallery && gallery !== void 0)
    $$bindings.gallery(gallery);
  $$result.css.add(css$5);
  imageClass = `${image.class ? image.class : ""} ${imagePreset ? imagePreset : ""}`;
  {
    if (fullscreen && !image?.src)
      getFullscreenSrc();
  }
  $$unsubscribe_activeImageStore();
  return `<div class="${[
    "svelte-lightbox-body svelte-3luti8",
    (protect ? "svelte-lightbox-unselectable" : "") + " " + (fullscreen ? "fullscreen" : "")
  ].join(" ").trim()}"${add_attribute("style", fullscreen ? `background-image: url(${image.src || ""})` : "", 0)}>${!fullscreen && image.src ? `<img${add_attribute("src", image.src, 0)}${add_attribute("alt", image.alt, 0)}${add_attribute("style", image.style, 0)}${add_attribute("class", imageClass, 0)}>` : `<div class="${[
    "svelte-3luti8",
    (portrait ? "svelte-lightbox-image-portrait" : "") + " " + (imagePreset == "expand" ? "expand" : "") + " " + (imagePreset == "fit" ? "fit" : "") + " " + (fullscreen ? "fullscreen" : "")
  ].join(" ").trim()}"${add_attribute("this", imageParent, 0)}>${slots.default ? slots.default({}) : ``}</div>`}
</div>`;
});
var LightboxFooter_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "div.svelte-lightbox-footer.svelte-1u8lh7d{background-color:transparent;color:white;text-align:left;width:inherit;height:auto}",
  map: null
};
const LightboxFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { galleryLength } = $$props;
  let { activeImage } = $$props;
  let { classes = "" } = $$props;
  let { style = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.galleryLength === void 0 && $$bindings.galleryLength && galleryLength !== void 0)
    $$bindings.galleryLength(galleryLength);
  if ($$props.activeImage === void 0 && $$bindings.activeImage && activeImage !== void 0)
    $$bindings.activeImage(activeImage);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css$4);
  return `<div class="${escape(null_to_empty("svelte-lightbox-footer " + classes)) + " svelte-1u8lh7d"}"${add_attribute("style", style, 0)}><h2><!-- HTML_TAG_START -->${title}<!-- HTML_TAG_END --></h2>
    <h5><!-- HTML_TAG_START -->${description}<!-- HTML_TAG_END --></h5>
    ${galleryLength ? `<p>Image ${escape(activeImage + 1)} of ${escape(galleryLength)}</p>` : ``}
</div>`;
});
var ModalCover_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: `div.svelte-o5rrpx{position:fixed;z-index:1000000!important;background-color:rgba(43, 39, 45, 0.87);top:0;bottom:0;left:0;right:0;overflow:hidden;width:100%;height:100%;display:flex;align-items:center;justify-content:center}div.svelte-o5rrpx::before{content:'';position:absolute;top:0;bottom:0;left:0;right:0;opacity:0;z-index:-1}div.svelte-o5rrpx::after{content:"";clear:both;display:table}`,
  map: null
};
const ModalCover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { transitionDuration } = $$props;
  createEventDispatcher();
  if ($$props.transitionDuration === void 0 && $$bindings.transitionDuration && transitionDuration !== void 0)
    $$bindings.transitionDuration(transitionDuration);
  $$result.css.add(css$3);
  return `<div class="${"svelte-o5rrpx"}">${slots.default ? slots.default({}) : `
    `}
</div>`;
});
var Modal_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "div.svelte-12ihcp1{position:relative;background-color:transparent;width:auto;height:auto;max-width:90vw;max-height:90vh}.fullscreen.svelte-12ihcp1{height:inherit;width:inherit;max-height:inherit;max-width:inherit}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { modalStyle } = $$props;
  let { modalClasses } = $$props;
  let { transitionDuration } = $$props;
  let { fullscreen = false } = $$props;
  if ($$props.modalStyle === void 0 && $$bindings.modalStyle && modalStyle !== void 0)
    $$bindings.modalStyle(modalStyle);
  if ($$props.modalClasses === void 0 && $$bindings.modalClasses && modalClasses !== void 0)
    $$bindings.modalClasses(modalClasses);
  if ($$props.transitionDuration === void 0 && $$bindings.transitionDuration && transitionDuration !== void 0)
    $$bindings.transitionDuration(transitionDuration);
  if ($$props.fullscreen === void 0 && $$bindings.fullscreen && fullscreen !== void 0)
    $$bindings.fullscreen(fullscreen);
  $$result.css.add(css$2);
  return `<div class="${[
    escape(null_to_empty(modalClasses)) + " svelte-12ihcp1",
    fullscreen ? "fullscreen" : ""
  ].join(" ").trim()}"${add_attribute("style", modalStyle, 0)}>${slots.default ? slots.default({}) : `
    `}
</div>`;
});
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fullscreen;
  let $activeImageStore, $$unsubscribe_activeImageStore;
  createEventDispatcher();
  let { modalClasses = "" } = $$props;
  let { modalStyle = "" } = $$props;
  let { transitionDuration = 500 } = $$props;
  let { image = {} } = $$props;
  let { protect = false } = $$props;
  let { portrait = false } = $$props;
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { gallery = [] } = $$props;
  let { imagePreset } = $$props;
  let { closeButton } = $$props;
  const activeImageStore = new writable(0);
  $$unsubscribe_activeImageStore = subscribe(activeImageStore, (value) => $activeImageStore = value);
  let actualTitle;
  let actualDescription;
  setContext("svelte-lightbox-activeImage", activeImageStore);
  if ($$props.modalClasses === void 0 && $$bindings.modalClasses && modalClasses !== void 0)
    $$bindings.modalClasses(modalClasses);
  if ($$props.modalStyle === void 0 && $$bindings.modalStyle && modalStyle !== void 0)
    $$bindings.modalStyle(modalStyle);
  if ($$props.transitionDuration === void 0 && $$bindings.transitionDuration && transitionDuration !== void 0)
    $$bindings.transitionDuration(transitionDuration);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.protect === void 0 && $$bindings.protect && protect !== void 0)
    $$bindings.protect(protect);
  if ($$props.portrait === void 0 && $$bindings.portrait && portrait !== void 0)
    $$bindings.portrait(portrait);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.gallery === void 0 && $$bindings.gallery && gallery !== void 0)
    $$bindings.gallery(gallery);
  if ($$props.imagePreset === void 0 && $$bindings.imagePreset && imagePreset !== void 0)
    $$bindings.imagePreset(imagePreset);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0)
    $$bindings.closeButton(closeButton);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    actualTitle = title;
    actualDescription = description;
    {
      if (gallery && !title && !description) {
        actualTitle = gallery[$activeImageStore].title;
        actualDescription = gallery[$activeImageStore].description;
      }
    }
    fullscreen = imagePreset === "fullscreen";
    $$rendered = `${validate_component(ModalCover, "ModalCover").$$render($$result, { transitionDuration }, {
      transitionDuration: ($$value) => {
        transitionDuration = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `${validate_component(Modal, "Modal").$$render($$result, {
          fullscreen,
          modalClasses,
          modalStyle,
          transitionDuration
        }, {
          modalClasses: ($$value) => {
            modalClasses = $$value;
            $$settled = false;
          },
          modalStyle: ($$value) => {
            modalStyle = $$value;
            $$settled = false;
          },
          transitionDuration: ($$value) => {
            transitionDuration = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${validate_component(LightboxHeader, "Header").$$render($$result, { fullscreen, closeButton }, {
              closeButton: ($$value) => {
                closeButton = $$value;
                $$settled = false;
              }
            }, {})}

        ${validate_component(LightboxBody, "Body").$$render($$result, {
              imagePreset,
              fullscreen,
              gallery: !!gallery.length,
              image,
              protect,
              portrait
            }, {
              image: ($$value) => {
                image = $$value;
                $$settled = false;
              },
              protect: ($$value) => {
                protect = $$value;
                $$settled = false;
              },
              portrait: ($$value) => {
                portrait = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `${slots.default ? slots.default({}) : ``}`;
              }
            })}


        ${validate_component(LightboxFooter, "Footer").$$render($$result, {
              galleryLength: gallery ? gallery.length : false,
              title: actualTitle,
              description: actualDescription,
              activeImage: $activeImageStore
            }, {
              title: ($$value) => {
                actualTitle = $$value;
                $$settled = false;
              },
              description: ($$value) => {
                actualDescription = $$value;
                $$settled = false;
              },
              activeImage: ($$value) => {
                $activeImageStore = $$value;
                $$settled = false;
              }
            }, {})}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_activeImageStore();
  return $$rendered;
});
var InternalGallery_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "div.svelte-1lrmlbr{max-height:inherit}div.fullscreen.svelte-1lrmlbr{height:100%;width:100%}.arrow.svelte-1lrmlbr{fill:none;stroke:var(--svelte-lightbox-arrows-color);stroke-linecap:round;stroke-linejoin:bevel;stroke-width:1.5px;margin:10px}button.svelte-1lrmlbr{background:transparent;border:none;font-size:1rem;width:50%;height:100%}button.svelte-1lrmlbr:active{background:transparent}button.svelte-1lrmlbr:disabled{color:gray}button:disabled.hideDisabled.svelte-1lrmlbr{visibility:hidden}.wrapper.svelte-1lrmlbr{position:relative;display:flex;width:auto;height:auto}.previous-button.svelte-1lrmlbr{position:absolute;top:0;bottom:0;left:0;right:50%;z-index:4;text-align:left}.slot.svelte-1lrmlbr{order:1;display:flex;justify-content:center}.next-button.svelte-1lrmlbr{position:absolute;top:0;bottom:0;right:0;z-index:4;text-align:right}svg.svelte-1lrmlbr{height:5rem}",
  map: null
};
const InternalGallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeImage;
  let galleryArrowsColor;
  let galleryArrowsCharacter;
  let fullscreen;
  let $$unsubscribe_keyboardControlStore;
  let $arrowsCharacterStore, $$unsubscribe_arrowsCharacterStore;
  let $arrowsColorStore, $$unsubscribe_arrowsColorStore;
  let $activeImageStore, $$unsubscribe_activeImageStore;
  let { imagePreset = "" } = $$props;
  const activeImageStore = getContext("svelte-lightbox-activeImage");
  $$unsubscribe_activeImageStore = subscribe(activeImageStore, (value) => $activeImageStore = value);
  const arrowsColorStore = new writable("black");
  $$unsubscribe_arrowsColorStore = subscribe(arrowsColorStore, (value) => $arrowsColorStore = value);
  const arrowsCharacterStore = new writable("unset");
  $$unsubscribe_arrowsCharacterStore = subscribe(arrowsCharacterStore, (value) => $arrowsCharacterStore = value);
  const keyboardControlStore = new writable(false);
  $$unsubscribe_keyboardControlStore = subscribe(keyboardControlStore, (value) => value);
  let slotContent;
  let images;
  setContext("svelte-lightbox-galleryArrowsColor", arrowsColorStore);
  setContext("svelte-lightbox-galleryArrowsCharacter", arrowsCharacterStore);
  setContext("svelte-lightbox-disableKeyboardArrowsControl", keyboardControlStore);
  if ($$props.imagePreset === void 0 && $$bindings.imagePreset && imagePreset !== void 0)
    $$bindings.imagePreset(imagePreset);
  $$result.css.add(css$1);
  activeImage = $activeImageStore;
  galleryArrowsColor = $arrowsColorStore;
  galleryArrowsCharacter = $arrowsCharacterStore;
  images = slotContent?.children;
  fullscreen = imagePreset === "fullscreen";
  {
    {
      if (images && activeImage < images.length) {
        Object.values(images).forEach((img) => {
          img.hidden = true;
          return img;
        });
        if (!fullscreen) {
          images[activeImage].hidden = false;
        }
      } else if (images && activeImage >= images.length) {
        console.error("LightboxGallery: Selected image doesn't exist, invalid activeImage");
      }
    }
  }
  $$unsubscribe_keyboardControlStore();
  $$unsubscribe_arrowsCharacterStore();
  $$unsubscribe_arrowsColorStore();
  $$unsubscribe_activeImageStore();
  return `

<div class="${["wrapper svelte-1lrmlbr", fullscreen ? "fullscreen" : ""].join(" ").trim()}" style="${"--svelte-lightbox-arrows-color: " + escape(galleryArrowsColor)}">
    <button ${galleryArrowsCharacter !== "loop" && activeImage === 0 ? "disabled" : ""} class="${[
    "previous-button svelte-1lrmlbr",
    galleryArrowsCharacter === "hide" ? "hideDisabled" : ""
  ].join(" ").trim()}"><svg viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-1lrmlbr"}"><g><path class="${"arrow svelte-1lrmlbr"}" d="${"M8.7,7.22,4.59,11.33a1,1,0,0,0,0,1.41l4,4"}"></path></g></svg></button>

    
    <div class="${"slot svelte-1lrmlbr"}"${add_attribute("this", slotContent, 0)}>${slots.default ? slots.default({}) : `
        `}</div>

    
    <button ${galleryArrowsCharacter !== "loop" && activeImage === images?.length - 1 ? "disabled" : ""} class="${[
    "next-button svelte-1lrmlbr",
    galleryArrowsCharacter === "hide" ? "hideDisabled" : ""
  ].join(" ").trim()}"><svg viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-1lrmlbr"}"><g><path d="${"M15.3,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4"}" class="${"arrow svelte-1lrmlbr"}"></path></g></svg></button>
</div>`;
});
const BodyChild = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let targetElement;
  let child;
  const removeTarget = () => {
    if (typeof document !== "undefined") {
      document.body.removeChild(child);
    }
  };
  onDestroy(removeTarget);
  return `<div${spread([escape_object($$restProps)], {})}${add_attribute("this", targetElement, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Lightbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let { thumbnailClasses = "" } = $$props;
  let { thumbnailStyle = "" } = $$props;
  let { modalClasses = "" } = $$props;
  let { modalStyle = "" } = $$props;
  let { gallery = false } = $$props;
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { transitionDuration = 500 } = $$props;
  let { protect = false } = $$props;
  let { image = {} } = $$props;
  let { portrait = false } = $$props;
  let { noScroll = true } = $$props;
  let { thumbnail = false } = $$props;
  let { imagePreset = false } = $$props;
  let { clickToClose = false } = $$props;
  let { closeButton = true } = $$props;
  let { isVisible = false } = $$props;
  if ($$props.thumbnailClasses === void 0 && $$bindings.thumbnailClasses && thumbnailClasses !== void 0)
    $$bindings.thumbnailClasses(thumbnailClasses);
  if ($$props.thumbnailStyle === void 0 && $$bindings.thumbnailStyle && thumbnailStyle !== void 0)
    $$bindings.thumbnailStyle(thumbnailStyle);
  if ($$props.modalClasses === void 0 && $$bindings.modalClasses && modalClasses !== void 0)
    $$bindings.modalClasses(modalClasses);
  if ($$props.modalStyle === void 0 && $$bindings.modalStyle && modalStyle !== void 0)
    $$bindings.modalStyle(modalStyle);
  if ($$props.gallery === void 0 && $$bindings.gallery && gallery !== void 0)
    $$bindings.gallery(gallery);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.transitionDuration === void 0 && $$bindings.transitionDuration && transitionDuration !== void 0)
    $$bindings.transitionDuration(transitionDuration);
  if ($$props.protect === void 0 && $$bindings.protect && protect !== void 0)
    $$bindings.protect(protect);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.portrait === void 0 && $$bindings.portrait && portrait !== void 0)
    $$bindings.portrait(portrait);
  if ($$props.noScroll === void 0 && $$bindings.noScroll && noScroll !== void 0)
    $$bindings.noScroll(noScroll);
  if ($$props.thumbnail === void 0 && $$bindings.thumbnail && thumbnail !== void 0)
    $$bindings.thumbnail(thumbnail);
  if ($$props.imagePreset === void 0 && $$bindings.imagePreset && imagePreset !== void 0)
    $$bindings.imagePreset(imagePreset);
  if ($$props.clickToClose === void 0 && $$bindings.clickToClose && clickToClose !== void 0)
    $$bindings.clickToClose(clickToClose);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0)
    $$bindings.closeButton(closeButton);
  if ($$props.isVisible === void 0 && $$bindings.isVisible && isVisible !== void 0)
    $$bindings.isVisible(isVisible);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(LightboxThumbnail, "Thumbnail").$$render($$result, {
      class: thumbnailClasses,
      style: thumbnailStyle,
      protect
    }, {
      class: ($$value) => {
        thumbnailClasses = $$value;
        $$settled = false;
      },
      style: ($$value) => {
        thumbnailStyle = $$value;
        $$settled = false;
      },
      protect: ($$value) => {
        protect = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `${thumbnail || gallery ? `${slots.thumbnail ? slots.thumbnail({}) : ``}` : `${slots.default ? slots.default({}) : ``}`}`;
      }
    })}

${isVisible ? `${validate_component(BodyChild, "BodyChild").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Index, "Modal").$$render($$result, {
          modalClasses,
          modalStyle,
          transitionDuration,
          image,
          protect,
          portrait,
          title,
          description,
          gallery,
          imagePreset,
          closeButton
        }, {
          modalClasses: ($$value) => {
            modalClasses = $$value;
            $$settled = false;
          },
          modalStyle: ($$value) => {
            modalStyle = $$value;
            $$settled = false;
          },
          transitionDuration: ($$value) => {
            transitionDuration = $$value;
            $$settled = false;
          },
          image: ($$value) => {
            image = $$value;
            $$settled = false;
          },
          protect: ($$value) => {
            protect = $$value;
            $$settled = false;
          },
          portrait: ($$value) => {
            portrait = $$value;
            $$settled = false;
          },
          title: ($$value) => {
            title = $$value;
            $$settled = false;
          },
          description: ($$value) => {
            description = $$value;
            $$settled = false;
          },
          gallery: ($$value) => {
            gallery = $$value;
            $$settled = false;
          },
          imagePreset: ($$value) => {
            imagePreset = $$value;
            $$settled = false;
          },
          closeButton: ($$value) => {
            closeButton = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${thumbnail ? `${slots.image ? slots.image({}) : ``}` : `${gallery ? `${validate_component(InternalGallery, "InternalGallery").$$render($$result, { imagePreset }, {}, {
              default: () => {
                return `${$$slots.thumbnail ? `<div>${slots.thumbnail ? slots.thumbnail({}) : ``}</div>` : ``}
					${slots.default ? slots.default({}) : `
					`}`;
              }
            })}` : `${slots.default ? slots.default({}) : ``}`}`}`;
          }
        })}`;
      }
    })}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
var LightboxImage_svelte_svelte_type_style_lang = "";
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-j9nsmm{text-align:center;padding:1em;max-width:100%;margin:0 auto}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="${"svelte-j9nsmm"}"><div class="${"row"}"><div class="${"col"}"><h1>svelte-lightbox demo
            </h1></div></div>
    <div class="${"row"}"><div class="${"col col-12"}">${validate_component(Lightbox, "Lightbox").$$render($$result, { description: "Simple lightbox" }, {}, {
    default: () => {
      return `<img src="${"./img/test1.png"}" alt="${"Simple lightbox"}" class="${"img-fluid"}">`;
    }
  })}</div></div>
    <div class="${"row"}"><div class="${"col col-12"}">${validate_component(Lightbox, "Lightbox").$$render($$result, { description: "Simple lightbox" }, {}, {
    default: () => {
      return `<img src="${"./img/test2.png"}" alt="${"Simple lightbox"}" style="${"max-height: 85vh"}" class="${"img-fluid"}">`;
    }
  })}</div></div>
    <div class="${"row"}"><div class="${"col col-12"}">${validate_component(Lightbox, "Lightbox").$$render($$result, { description: "Simple lightbox" }, {}, {
    default: () => {
      return `<img src="${"./img/test3.png"}" alt="${"Simple lightbox"}" class="${"img-fluid"}">`;
    }
  })}</div></div>
</main>`;
});
export { Routes as default };
