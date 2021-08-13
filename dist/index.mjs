function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

/* src/LightboxThumbnail.svelte generated by Svelte v3.38.2 */

function add_css$6() {
	var style = element("style");
	style.id = "svelte-1u332e1-style";
	style.textContent = "div.clickable.svelte-1u332e1{position:static;cursor:zoom-in}div.svelte-lightbox-unselectable.svelte-1u332e1{user-select:none;pointer-events:none}";
	append(document.head, style);
}

function create_fragment$a(ctx) {
	let div1;
	let div0;
	let div0_class_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if (default_slot) default_slot.c();
			attr(div0, "class", div0_class_value = "" + (null_to_empty(/*classes*/ ctx[0]) + " svelte-1u332e1"));
			attr(div0, "style", /*style*/ ctx[1]);
			toggle_class(div0, "svelte-lightbox-unselectable", /*protect*/ ctx[2]);
			attr(div1, "class", "clickable svelte-1u332e1");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen(div1, "click", /*click_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], dirty, null, null);
				}
			}

			if (!current || dirty & /*classes*/ 1 && div0_class_value !== (div0_class_value = "" + (null_to_empty(/*classes*/ ctx[0]) + " svelte-1u332e1"))) {
				attr(div0, "class", div0_class_value);
			}

			if (!current || dirty & /*style*/ 2) {
				attr(div0, "style", /*style*/ ctx[1]);
			}

			if (dirty & /*classes, protect*/ 5) {
				toggle_class(div0, "svelte-lightbox-unselectable", /*protect*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	const dispatch = createEventDispatcher();
	let { class: classes = "" } = $$props;
	let { style = "" } = $$props;
	let { protect = false } = $$props;
	const click_handler = () => dispatch("click");

	$$self.$$set = $$props => {
		if ("class" in $$props) $$invalidate(0, classes = $$props.class);
		if ("style" in $$props) $$invalidate(1, style = $$props.style);
		if ("protect" in $$props) $$invalidate(2, protect = $$props.protect);
		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	};

	return [classes, style, protect, dispatch, $$scope, slots, click_handler];
}

class LightboxThumbnail extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1u332e1-style")) add_css$6();
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { class: 0, style: 1, protect: 2 });
	}
}

function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}

/* src/Modal/LightboxHeader.svelte generated by Svelte v3.38.2 */

function add_css$5() {
	var style = element("style");
	style.id = "svelte-12yipzn-style";
	style.textContent = "div.svelte-lightbox-header.svelte-12yipzn{width:auto;height:3rem;display:flex;justify-content:flex-end;align-items:center}button.svelte-12yipzn{background:transparent;font-size:3rem;border:none;color:white}button.svelte-12yipzn:hover{color:lightgray;cursor:pointer}";
	append(document.head, style);
}

// (13:4) {#if closeButton}
function create_if_block$3(ctx) {
	let button;
	let t;
	let button_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			t = text("×");
			attr(button, "size", /*size*/ ctx[0]);
			attr(button, "style", /*style*/ ctx[1]);
			attr(button, "class", button_class_value = "" + (null_to_empty(/*buttonClasses*/ ctx[3]) + " svelte-12yipzn"));
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*size*/ 1) {
				attr(button, "size", /*size*/ ctx[0]);
			}

			if (dirty & /*style*/ 2) {
				attr(button, "style", /*style*/ ctx[1]);
			}

			if (dirty & /*buttonClasses*/ 8 && button_class_value !== (button_class_value = "" + (null_to_empty(/*buttonClasses*/ ctx[3]) + " svelte-12yipzn"))) {
				attr(button, "class", button_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$9(ctx) {
	let div;
	let div_class_value;
	let if_block = /*closeButton*/ ctx[4] && create_if_block$3(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			attr(div, "class", div_class_value = "" + (null_to_empty("svelte-lightbox-header " + /*headerClasses*/ ctx[2]) + " svelte-12yipzn"));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (/*closeButton*/ ctx[4]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*headerClasses*/ 4 && div_class_value !== (div_class_value = "" + (null_to_empty("svelte-lightbox-header " + /*headerClasses*/ ctx[2]) + " svelte-12yipzn"))) {
				attr(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { size = "xs" } = $$props;
	let { style = "" } = $$props;
	let { headerClasses = "" } = $$props;
	let { buttonClasses = "" } = $$props;
	let { closeButton = true } = $$props;
	const click_handler = () => dispatch("close");

	$$self.$$set = $$props => {
		if ("size" in $$props) $$invalidate(0, size = $$props.size);
		if ("style" in $$props) $$invalidate(1, style = $$props.style);
		if ("headerClasses" in $$props) $$invalidate(2, headerClasses = $$props.headerClasses);
		if ("buttonClasses" in $$props) $$invalidate(3, buttonClasses = $$props.buttonClasses);
		if ("closeButton" in $$props) $$invalidate(4, closeButton = $$props.closeButton);
	};

	return [
		size,
		style,
		headerClasses,
		buttonClasses,
		closeButton,
		dispatch,
		click_handler
	];
}

class LightboxHeader extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-12yipzn-style")) add_css$5();

		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
			size: 0,
			style: 1,
			headerClasses: 2,
			buttonClasses: 3,
			closeButton: 4
		});
	}
}

/* src/Modal/LightboxBody.svelte generated by Svelte v3.38.2 */

function add_css$4() {
	var style = element("style");
	style.id = "svelte-5blj8a-style";
	style.textContent = "div.svelte-lightbox-body.svelte-5blj8a{background-color:transparent;width:auto;height:auto;max-height:80vh}div.svelte-lightbox-unselectable.svelte-5blj8a{user-select:none;pointer-events:none}div.svelte-lightbox-image-portrait.svelte-5blj8a{height:90vh}div.expand.svelte-5blj8a{width:90vw;height:auto;max-height:90vh}";
	append(document.head, style);
}

// (43:4) {:else}
function create_else_block$1(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", "svelte-5blj8a");
			toggle_class(div, "svelte-lightbox-image-portrait", /*portrait*/ ctx[2]);
			toggle_class(div, "expand", /*imagePreset*/ ctx[3] == "expand");
			toggle_class(div, "fit", /*imagePreset*/ ctx[3] == "fit");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[8](div);
			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], dirty, null, null);
				}
			}

			if (dirty & /*portrait*/ 4) {
				toggle_class(div, "svelte-lightbox-image-portrait", /*portrait*/ ctx[2]);
			}

			if (dirty & /*imagePreset*/ 8) {
				toggle_class(div, "expand", /*imagePreset*/ ctx[3] == "expand");
			}

			if (dirty & /*imagePreset*/ 8) {
				toggle_class(div, "fit", /*imagePreset*/ ctx[3] == "fit");
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[8](null);
		}
	};
}

// (41:4) {#if image.src}
function create_if_block$2(ctx) {
	let img;
	let img_src_value;
	let img_alt_value;
	let img_style_value;

	return {
		c() {
			img = element("img");
			if (img.src !== (img_src_value = /*image*/ ctx[0].src)) attr(img, "src", img_src_value);
			attr(img, "alt", img_alt_value = /*image*/ ctx[0].alt);
			attr(img, "style", img_style_value = /*image*/ ctx[0].style);
			attr(img, "class", /*imageClass*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, img, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*image*/ 1 && img.src !== (img_src_value = /*image*/ ctx[0].src)) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*image*/ 1 && img_alt_value !== (img_alt_value = /*image*/ ctx[0].alt)) {
				attr(img, "alt", img_alt_value);
			}

			if (dirty & /*image*/ 1 && img_style_value !== (img_style_value = /*image*/ ctx[0].style)) {
				attr(img, "style", img_style_value);
			}

			if (dirty & /*imageClass*/ 32) {
				attr(img, "class", /*imageClass*/ ctx[5]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(img);
		}
	};
}

function create_fragment$8(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*image*/ ctx[0].src) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "svelte-lightbox-body svelte-5blj8a");
			toggle_class(div, "svelte-lightbox-unselectable", /*protect*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div, null);
			}

			if (dirty & /*protect*/ 2) {
				toggle_class(div, "svelte-lightbox-unselectable", /*protect*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let imageClass;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { image = {} } = $$props;
	let { protect = false } = $$props;
	let { portrait = false } = $$props;
	let { imagePreset = false } = $$props;
	let imageParent;

	const presets = {
		fit: {
			width: "",
			maxWidth: "80vw",
			height: "",
			maxHeight: "80vh"
		},
		expand: {
			width: "100%",
			maxWidth: "",
			height: "auto",
			maxHeight: ""
		},
		scroll: {
			width: "auto",
			height: "auto",
			overflow: "scroll"
		}
	};

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			imageParent = $$value;
			$$invalidate(4, imageParent);
		});
	}

	$$self.$$set = $$props => {
		if ("image" in $$props) $$invalidate(0, image = $$props.image);
		if ("protect" in $$props) $$invalidate(1, protect = $$props.protect);
		if ("portrait" in $$props) $$invalidate(2, portrait = $$props.portrait);
		if ("imagePreset" in $$props) $$invalidate(3, imagePreset = $$props.imagePreset);
		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*imageParent, imagePreset*/ 24) {
			if (imageParent && imagePreset) {
				const imageStyle = imageParent.firstChild.style;
				imageStyle.width = presets[imagePreset].width;
				imageStyle.height = presets[imagePreset].height;
				imageStyle.maxWidth = presets[imagePreset].maxWidth;
				imageStyle.maxHeight = presets[imagePreset].maxHeight;
				imageStyle.overflow = presets[imagePreset].overflow;
			}
		}

		if ($$self.$$.dirty & /*imagePreset*/ 8) {
			console.log("imagePreset:", imagePreset);
		}

		if ($$self.$$.dirty & /*image, imagePreset*/ 9) {
			$$invalidate(5, imageClass = `${image.class} ${imagePreset ? imagePreset : ""}`);
		}
	};

	return [
		image,
		protect,
		portrait,
		imagePreset,
		imageParent,
		imageClass,
		$$scope,
		slots,
		div_binding
	];
}

class LightboxBody extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-5blj8a-style")) add_css$4();

		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
			image: 0,
			protect: 1,
			portrait: 2,
			imagePreset: 3
		});
	}
}

/* src/Modal/LightboxFooter.svelte generated by Svelte v3.38.2 */

function add_css$3() {
	var style = element("style");
	style.id = "svelte-1u8lh7d-style";
	style.textContent = "div.svelte-lightbox-footer.svelte-1u8lh7d{background-color:transparent;color:white;text-align:left;width:inherit;height:auto}";
	append(document.head, style);
}

// (18:4) {#if galleryLength}
function create_if_block$1(ctx) {
	let p;
	let t0;
	let t1_value = /*activeImage*/ ctx[3] + 1 + "";
	let t1;
	let t2;
	let t3;

	return {
		c() {
			p = element("p");
			t0 = text("Image ");
			t1 = text(t1_value);
			t2 = text(" of ");
			t3 = text(/*galleryLength*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t0);
			append(p, t1);
			append(p, t2);
			append(p, t3);
		},
		p(ctx, dirty) {
			if (dirty & /*activeImage*/ 8 && t1_value !== (t1_value = /*activeImage*/ ctx[3] + 1 + "")) set_data(t1, t1_value);
			if (dirty & /*galleryLength*/ 4) set_data(t3, /*galleryLength*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function create_fragment$7(ctx) {
	let div;
	let h2;
	let t0;
	let h5;
	let t1;
	let div_class_value;
	let if_block = /*galleryLength*/ ctx[2] && create_if_block$1(ctx);

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			t0 = space();
			h5 = element("h5");
			t1 = space();
			if (if_block) if_block.c();
			attr(div, "class", div_class_value = "" + (null_to_empty("svelte-lightbox-footer " + /*classes*/ ctx[4]) + " svelte-1u8lh7d"));
			attr(div, "style", /*style*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			h2.innerHTML = /*title*/ ctx[0];
			append(div, t0);
			append(div, h5);
			h5.innerHTML = /*description*/ ctx[1];
			append(div, t1);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (dirty & /*title*/ 1) h2.innerHTML = /*title*/ ctx[0];			if (dirty & /*description*/ 2) h5.innerHTML = /*description*/ ctx[1];
			if (/*galleryLength*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*classes*/ 16 && div_class_value !== (div_class_value = "" + (null_to_empty("svelte-lightbox-footer " + /*classes*/ ctx[4]) + " svelte-1u8lh7d"))) {
				attr(div, "class", div_class_value);
			}

			if (dirty & /*style*/ 32) {
				attr(div, "style", /*style*/ ctx[5]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let { title = "" } = $$props;
	let { description = "" } = $$props;
	let { galleryLength } = $$props;
	let { activeImage } = $$props;
	let { classes = "" } = $$props;
	let { style = "" } = $$props;

	$$self.$$set = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("description" in $$props) $$invalidate(1, description = $$props.description);
		if ("galleryLength" in $$props) $$invalidate(2, galleryLength = $$props.galleryLength);
		if ("activeImage" in $$props) $$invalidate(3, activeImage = $$props.activeImage);
		if ("classes" in $$props) $$invalidate(4, classes = $$props.classes);
		if ("style" in $$props) $$invalidate(5, style = $$props.style);
	};

	return [title, description, galleryLength, activeImage, classes, style];
}

class LightboxFooter extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1u8lh7d-style")) add_css$3();

		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
			title: 0,
			description: 1,
			galleryLength: 2,
			activeImage: 3,
			classes: 4,
			style: 5
		});
	}
}

/* src/Modal/ModalCover.svelte generated by Svelte v3.38.2 */

function add_css$2() {
	var style = element("style");
	style.id = "svelte-o5rrpx-style";
	style.textContent = "div.svelte-o5rrpx{position:fixed;z-index:1000000!important;background-color:rgba(43, 39, 45, 0.87);top:0;bottom:0;left:0;right:0;overflow:hidden;width:100%;height:100%;display:flex;align-items:center;justify-content:center}div.svelte-o5rrpx::before{content:'';position:absolute;top:0;bottom:0;left:0;right:0;opacity:0;z-index:-1}div.svelte-o5rrpx::after{content:\"\";clear:both;display:table}";
	append(document.head, style);
}

function create_fragment$6(ctx) {
	let div;
	let div_intro;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", "svelte-o5rrpx");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen(div, "click", /*click_handler*/ ctx[3]);
				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);

				if (!div_intro) div_intro = create_in_transition(div, fade, {
					duration: /*transitionDuration*/ ctx[0] * 2
				});

				div_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			if (div_intro) div_intro.invalidate();

			div_outro = create_out_transition(div, fade, {
				duration: /*transitionDuration*/ ctx[0] / 2
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			dispose();
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { transitionDuration } = $$props;
	createEventDispatcher();

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("transitionDuration" in $$props) $$invalidate(0, transitionDuration = $$props.transitionDuration);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	return [transitionDuration, $$scope, slots, click_handler];
}

class ModalCover extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-o5rrpx-style")) add_css$2();
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { transitionDuration: 0 });
	}
}

/* src/Modal/Modal.svelte generated by Svelte v3.38.2 */

function add_css$1() {
	var style = element("style");
	style.id = "svelte-1nx05o5-style";
	style.textContent = "div.svelte-1nx05o5{position:relative;background-color:transparent;width:auto;height:auto;max-width:90vw;max-height:90vh}div.svelte-1nx05o5::after{content:\"\";clear:both;display:table}";
	append(document.head, style);
}

function create_fragment$5(ctx) {
	let div;
	let div_class_value;
	let div_transition;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", div_class_value = "" + (null_to_empty(/*modalClasses*/ ctx[0]) + " svelte-1nx05o5"));
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen(div, "click", /*click_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
				}
			}

			if (!current || dirty & /*modalClasses*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(/*modalClasses*/ ctx[0]) + " svelte-1nx05o5"))) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);

			add_render_callback(() => {
				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: /*transitionDuration*/ ctx[1] }, true);
				div_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: /*transitionDuration*/ ctx[1] }, false);
			div_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			dispose();
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	createEventDispatcher();
	let { modalStyle } = $$props;
	let { modalClasses } = $$props;
	let { transitionDuration } = $$props;

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("modalStyle" in $$props) $$invalidate(2, modalStyle = $$props.modalStyle);
		if ("modalClasses" in $$props) $$invalidate(0, modalClasses = $$props.modalClasses);
		if ("transitionDuration" in $$props) $$invalidate(1, transitionDuration = $$props.transitionDuration);
		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
	};

	return [modalClasses, transitionDuration, modalStyle, $$scope, slots, click_handler];
}

class Modal extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1nx05o5-style")) add_css$1();

		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
			modalStyle: 2,
			modalClasses: 0,
			transitionDuration: 1
		});
	}
}

/* src/Modal/Index.svelte generated by Svelte v3.38.2 */

function create_default_slot_2$1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[15].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[31], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 1)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[31], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (41:4) <Modal bind:modalClasses bind:modalStyle bind:transitionDuration on:click={ () => dispatch('modalClick') }>
function create_default_slot_1$1(ctx) {
	let header;
	let updating_closeButton;
	let t0;
	let body;
	let updating_image;
	let updating_protect;
	let updating_portrait;
	let updating_imagePreset;
	let t1;
	let footer;
	let updating_title;
	let updating_description;
	let updating_activeImage;
	let current;

	function header_closeButton_binding(value) {
		/*header_closeButton_binding*/ ctx[16](value);
	}

	let header_props = {};

	if (/*closeButton*/ ctx[8] !== void 0) {
		header_props.closeButton = /*closeButton*/ ctx[8];
	}

	header = new LightboxHeader({ props: header_props });
	binding_callbacks.push(() => bind(header, "closeButton", header_closeButton_binding));
	header.$on("close", /*close_handler*/ ctx[17]);

	function body_image_binding(value) {
		/*body_image_binding*/ ctx[18](value);
	}

	function body_protect_binding(value) {
		/*body_protect_binding*/ ctx[19](value);
	}

	function body_portrait_binding(value) {
		/*body_portrait_binding*/ ctx[20](value);
	}

	function body_imagePreset_binding(value) {
		/*body_imagePreset_binding*/ ctx[21](value);
	}

	let body_props = {
		$$slots: { default: [create_default_slot_2$1] },
		$$scope: { ctx }
	};

	if (/*image*/ ctx[4] !== void 0) {
		body_props.image = /*image*/ ctx[4];
	}

	if (/*protect*/ ctx[5] !== void 0) {
		body_props.protect = /*protect*/ ctx[5];
	}

	if (/*portrait*/ ctx[6] !== void 0) {
		body_props.portrait = /*portrait*/ ctx[6];
	}

	if (/*imagePreset*/ ctx[7] !== void 0) {
		body_props.imagePreset = /*imagePreset*/ ctx[7];
	}

	body = new LightboxBody({ props: body_props });
	binding_callbacks.push(() => bind(body, "image", body_image_binding));
	binding_callbacks.push(() => bind(body, "protect", body_protect_binding));
	binding_callbacks.push(() => bind(body, "portrait", body_portrait_binding));
	binding_callbacks.push(() => bind(body, "imagePreset", body_imagePreset_binding));

	function footer_title_binding(value) {
		/*footer_title_binding*/ ctx[22](value);
	}

	function footer_description_binding(value) {
		/*footer_description_binding*/ ctx[23](value);
	}

	function footer_activeImage_binding(value) {
		/*footer_activeImage_binding*/ ctx[24](value);
	}

	let footer_props = {
		galleryLength: /*gallery*/ ctx[9] ? /*gallery*/ ctx[9].length : false
	};

	if (/*actualTitle*/ ctx[10] !== void 0) {
		footer_props.title = /*actualTitle*/ ctx[10];
	}

	if (/*actualDescription*/ ctx[11] !== void 0) {
		footer_props.description = /*actualDescription*/ ctx[11];
	}

	if (/*activeImage*/ ctx[0] !== void 0) {
		footer_props.activeImage = /*activeImage*/ ctx[0];
	}

	footer = new LightboxFooter({ props: footer_props });
	binding_callbacks.push(() => bind(footer, "title", footer_title_binding));
	binding_callbacks.push(() => bind(footer, "description", footer_description_binding));
	binding_callbacks.push(() => bind(footer, "activeImage", footer_activeImage_binding));

	return {
		c() {
			create_component(header.$$.fragment);
			t0 = space();
			create_component(body.$$.fragment);
			t1 = space();
			create_component(footer.$$.fragment);
		},
		m(target, anchor) {
			mount_component(header, target, anchor);
			insert(target, t0, anchor);
			mount_component(body, target, anchor);
			insert(target, t1, anchor);
			mount_component(footer, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const header_changes = {};

			if (!updating_closeButton && dirty[0] & /*closeButton*/ 256) {
				updating_closeButton = true;
				header_changes.closeButton = /*closeButton*/ ctx[8];
				add_flush_callback(() => updating_closeButton = false);
			}

			header.$set(header_changes);
			const body_changes = {};

			if (dirty[1] & /*$$scope*/ 1) {
				body_changes.$$scope = { dirty, ctx };
			}

			if (!updating_image && dirty[0] & /*image*/ 16) {
				updating_image = true;
				body_changes.image = /*image*/ ctx[4];
				add_flush_callback(() => updating_image = false);
			}

			if (!updating_protect && dirty[0] & /*protect*/ 32) {
				updating_protect = true;
				body_changes.protect = /*protect*/ ctx[5];
				add_flush_callback(() => updating_protect = false);
			}

			if (!updating_portrait && dirty[0] & /*portrait*/ 64) {
				updating_portrait = true;
				body_changes.portrait = /*portrait*/ ctx[6];
				add_flush_callback(() => updating_portrait = false);
			}

			if (!updating_imagePreset && dirty[0] & /*imagePreset*/ 128) {
				updating_imagePreset = true;
				body_changes.imagePreset = /*imagePreset*/ ctx[7];
				add_flush_callback(() => updating_imagePreset = false);
			}

			body.$set(body_changes);
			const footer_changes = {};
			if (dirty[0] & /*gallery*/ 512) footer_changes.galleryLength = /*gallery*/ ctx[9] ? /*gallery*/ ctx[9].length : false;

			if (!updating_title && dirty[0] & /*actualTitle*/ 1024) {
				updating_title = true;
				footer_changes.title = /*actualTitle*/ ctx[10];
				add_flush_callback(() => updating_title = false);
			}

			if (!updating_description && dirty[0] & /*actualDescription*/ 2048) {
				updating_description = true;
				footer_changes.description = /*actualDescription*/ ctx[11];
				add_flush_callback(() => updating_description = false);
			}

			if (!updating_activeImage && dirty[0] & /*activeImage*/ 1) {
				updating_activeImage = true;
				footer_changes.activeImage = /*activeImage*/ ctx[0];
				add_flush_callback(() => updating_activeImage = false);
			}

			footer.$set(footer_changes);
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(body.$$.fragment, local);
			transition_in(footer.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			transition_out(body.$$.fragment, local);
			transition_out(footer.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach(t0);
			destroy_component(body, detaching);
			if (detaching) detach(t1);
			destroy_component(footer, detaching);
		}
	};
}

// (40:0) <ModalCover bind:transitionDuration on:click={ () => dispatch('topModalClick') }>
function create_default_slot$1(ctx) {
	let modal;
	let updating_modalClasses;
	let updating_modalStyle;
	let updating_transitionDuration;
	let current;

	function modal_modalClasses_binding(value) {
		/*modal_modalClasses_binding*/ ctx[25](value);
	}

	function modal_modalStyle_binding(value) {
		/*modal_modalStyle_binding*/ ctx[26](value);
	}

	function modal_transitionDuration_binding(value) {
		/*modal_transitionDuration_binding*/ ctx[27](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot_1$1] },
		$$scope: { ctx }
	};

	if (/*modalClasses*/ ctx[1] !== void 0) {
		modal_props.modalClasses = /*modalClasses*/ ctx[1];
	}

	if (/*modalStyle*/ ctx[2] !== void 0) {
		modal_props.modalStyle = /*modalStyle*/ ctx[2];
	}

	if (/*transitionDuration*/ ctx[3] !== void 0) {
		modal_props.transitionDuration = /*transitionDuration*/ ctx[3];
	}

	modal = new Modal({ props: modal_props });
	binding_callbacks.push(() => bind(modal, "modalClasses", modal_modalClasses_binding));
	binding_callbacks.push(() => bind(modal, "modalStyle", modal_modalStyle_binding));
	binding_callbacks.push(() => bind(modal, "transitionDuration", modal_transitionDuration_binding));
	modal.$on("click", /*click_handler*/ ctx[28]);

	return {
		c() {
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modal_changes = {};

			if (dirty[0] & /*gallery, actualTitle, actualDescription, activeImage, image, protect, portrait, imagePreset, closeButton*/ 4081 | dirty[1] & /*$$scope*/ 1) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_modalClasses && dirty[0] & /*modalClasses*/ 2) {
				updating_modalClasses = true;
				modal_changes.modalClasses = /*modalClasses*/ ctx[1];
				add_flush_callback(() => updating_modalClasses = false);
			}

			if (!updating_modalStyle && dirty[0] & /*modalStyle*/ 4) {
				updating_modalStyle = true;
				modal_changes.modalStyle = /*modalStyle*/ ctx[2];
				add_flush_callback(() => updating_modalStyle = false);
			}

			if (!updating_transitionDuration && dirty[0] & /*transitionDuration*/ 8) {
				updating_transitionDuration = true;
				modal_changes.transitionDuration = /*transitionDuration*/ ctx[3];
				add_flush_callback(() => updating_transitionDuration = false);
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modal, detaching);
		}
	};
}

function create_fragment$4(ctx) {
	let modalcover;
	let updating_transitionDuration;
	let current;

	function modalcover_transitionDuration_binding(value) {
		/*modalcover_transitionDuration_binding*/ ctx[29](value);
	}

	let modalcover_props = {
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	if (/*transitionDuration*/ ctx[3] !== void 0) {
		modalcover_props.transitionDuration = /*transitionDuration*/ ctx[3];
	}

	modalcover = new ModalCover({ props: modalcover_props });
	binding_callbacks.push(() => bind(modalcover, "transitionDuration", modalcover_transitionDuration_binding));
	modalcover.$on("click", /*click_handler_1*/ ctx[30]);

	return {
		c() {
			create_component(modalcover.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modalcover, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modalcover_changes = {};

			if (dirty[0] & /*modalClasses, modalStyle, transitionDuration, gallery, actualTitle, actualDescription, activeImage, image, protect, portrait, imagePreset, closeButton*/ 4095 | dirty[1] & /*$$scope*/ 1) {
				modalcover_changes.$$scope = { dirty, ctx };
			}

			if (!updating_transitionDuration && dirty[0] & /*transitionDuration*/ 8) {
				updating_transitionDuration = true;
				modalcover_changes.transitionDuration = /*transitionDuration*/ ctx[3];
				add_flush_callback(() => updating_transitionDuration = false);
			}

			modalcover.$set(modalcover_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modalcover.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modalcover.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modalcover, detaching);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	const dispatch = createEventDispatcher();
	let { modalClasses = "" } = $$props;
	let { modalStyle = "" } = $$props;
	let { transitionDuration = 500 } = $$props;
	let { image = {} } = $$props;
	let { protect = false } = $$props;
	let { portrait = false } = $$props;
	let { title = "" } = $$props;
	let { description = "" } = $$props;
	let { gallery = [] } = $$props;
	let { activeImage } = $$props;
	let { imagePreset } = $$props;
	let { closeButton } = $$props;
	let actualTitle;
	let actualDescription;

	function header_closeButton_binding(value) {
		closeButton = value;
		$$invalidate(8, closeButton);
	}

	const close_handler = () => dispatch("close");

	function body_image_binding(value) {
		image = value;
		$$invalidate(4, image);
	}

	function body_protect_binding(value) {
		protect = value;
		$$invalidate(5, protect);
	}

	function body_portrait_binding(value) {
		portrait = value;
		$$invalidate(6, portrait);
	}

	function body_imagePreset_binding(value) {
		imagePreset = value;
		$$invalidate(7, imagePreset);
	}

	function footer_title_binding(value) {
		actualTitle = value;
		(((($$invalidate(10, actualTitle), $$invalidate(13, title)), $$invalidate(9, gallery)), $$invalidate(14, description)), $$invalidate(0, activeImage));
	}

	function footer_description_binding(value) {
		actualDescription = value;
		(((($$invalidate(11, actualDescription), $$invalidate(14, description)), $$invalidate(9, gallery)), $$invalidate(13, title)), $$invalidate(0, activeImage));
	}

	function footer_activeImage_binding(value) {
		activeImage = value;
		$$invalidate(0, activeImage);
	}

	function modal_modalClasses_binding(value) {
		modalClasses = value;
		$$invalidate(1, modalClasses);
	}

	function modal_modalStyle_binding(value) {
		modalStyle = value;
		$$invalidate(2, modalStyle);
	}

	function modal_transitionDuration_binding(value) {
		transitionDuration = value;
		$$invalidate(3, transitionDuration);
	}

	const click_handler = () => dispatch("modalClick");

	function modalcover_transitionDuration_binding(value) {
		transitionDuration = value;
		$$invalidate(3, transitionDuration);
	}

	const click_handler_1 = () => dispatch("topModalClick");

	$$self.$$set = $$props => {
		if ("modalClasses" in $$props) $$invalidate(1, modalClasses = $$props.modalClasses);
		if ("modalStyle" in $$props) $$invalidate(2, modalStyle = $$props.modalStyle);
		if ("transitionDuration" in $$props) $$invalidate(3, transitionDuration = $$props.transitionDuration);
		if ("image" in $$props) $$invalidate(4, image = $$props.image);
		if ("protect" in $$props) $$invalidate(5, protect = $$props.protect);
		if ("portrait" in $$props) $$invalidate(6, portrait = $$props.portrait);
		if ("title" in $$props) $$invalidate(13, title = $$props.title);
		if ("description" in $$props) $$invalidate(14, description = $$props.description);
		if ("gallery" in $$props) $$invalidate(9, gallery = $$props.gallery);
		if ("activeImage" in $$props) $$invalidate(0, activeImage = $$props.activeImage);
		if ("imagePreset" in $$props) $$invalidate(7, imagePreset = $$props.imagePreset);
		if ("closeButton" in $$props) $$invalidate(8, closeButton = $$props.closeButton);
		if ("$$scope" in $$props) $$invalidate(31, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*title*/ 8192) {
			// For variable title and description, we need to define this auxiliary variables
			$$invalidate(10, actualTitle = title);
		}

		if ($$self.$$.dirty[0] & /*description*/ 16384) {
			$$invalidate(11, actualDescription = description);
		}

		if ($$self.$$.dirty[0] & /*gallery, title, description, activeImage*/ 25089) {
			// If there is not universal title or description for gallery, we will display individual title and description
			if (gallery && !title && !description) {
				$$invalidate(10, actualTitle = gallery[activeImage].title);
				$$invalidate(11, actualDescription = gallery[activeImage].description);
			}
		}
	};

	return [
		activeImage,
		modalClasses,
		modalStyle,
		transitionDuration,
		image,
		protect,
		portrait,
		imagePreset,
		closeButton,
		gallery,
		actualTitle,
		actualDescription,
		dispatch,
		title,
		description,
		slots,
		header_closeButton_binding,
		close_handler,
		body_image_binding,
		body_protect_binding,
		body_portrait_binding,
		body_imagePreset_binding,
		footer_title_binding,
		footer_description_binding,
		footer_activeImage_binding,
		modal_modalClasses_binding,
		modal_modalStyle_binding,
		modal_transitionDuration_binding,
		click_handler,
		modalcover_transitionDuration_binding,
		click_handler_1,
		$$scope
	];
}

class Index extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$4,
			create_fragment$4,
			safe_not_equal,
			{
				modalClasses: 1,
				modalStyle: 2,
				transitionDuration: 3,
				image: 4,
				protect: 5,
				portrait: 6,
				title: 13,
				description: 14,
				gallery: 9,
				activeImage: 0,
				imagePreset: 7,
				closeButton: 8
			},
			[-1, -1]
		);
	}
}

/* src/Gallery/InternalGallery.svelte generated by Svelte v3.38.2 */

function add_css() {
	var style = element("style");
	style.id = "svelte-wwe8hv-style";
	style.textContent = ".arrow.svelte-wwe8hv{fill:none;stroke:black;stroke-linecap:round;stroke-linejoin:bevel;stroke-width:1.5px;margin:10px}button.svelte-wwe8hv{background:transparent;color:black;border:none;font-size:1rem;width:50%;height:100%}button.svelte-wwe8hv:active{background:transparent}button.svelte-wwe8hv:disabled{color:gray}.wrapper.svelte-wwe8hv{position:relative;display:flex;width:auto;height:auto}.previous-button.svelte-wwe8hv{position:absolute;top:0;bottom:0;left:0;right:50%;z-index:4;text-align:left}.slot.svelte-wwe8hv{order:1}.next-button.svelte-wwe8hv{position:absolute;top:0;bottom:0;right:0;z-index:4;text-align:right}svg.svelte-wwe8hv{height:5rem}";
	append(document.head, style);
}

function create_fragment$3(ctx) {
	let div1;
	let button0;
	let svg0;
	let g0;
	let path0;
	let button0_disabled_value;
	let t0;
	let div0;
	let t1;
	let button1;
	let svg1;
	let g1;
	let path1;
	let button1_disabled_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	return {
		c() {
			div1 = element("div");
			button0 = element("button");
			svg0 = svg_element("svg");
			g0 = svg_element("g");
			path0 = svg_element("path");
			t0 = space();
			div0 = element("div");
			if (default_slot) default_slot.c();
			t1 = space();
			button1 = element("button");
			svg1 = svg_element("svg");
			g1 = svg_element("g");
			path1 = svg_element("path");
			attr(path0, "class", "arrow svelte-wwe8hv");
			attr(path0, "d", "M8.7,7.22,4.59,11.33a1,1,0,0,0,0,1.41l4,4");
			attr(svg0, "viewBox", "0 0 24 24");
			attr(svg0, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg0, "class", "svelte-wwe8hv");
			button0.disabled = button0_disabled_value = /*activeImage*/ ctx[0] === 0;
			attr(button0, "class", "previous-button svelte-wwe8hv");
			attr(div0, "class", "slot svelte-wwe8hv");
			attr(path1, "class", "arrow svelte-wwe8hv");
			attr(path1, "d", "M15.3,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4");
			attr(svg1, "viewBox", "0 0 24 24");
			attr(svg1, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg1, "class", "svelte-wwe8hv");
			button1.disabled = button1_disabled_value = /*activeImage*/ ctx[0] === /*images*/ ctx[2]?.length - 1;
			attr(button1, "class", "next-button svelte-wwe8hv");
			attr(div1, "class", "wrapper svelte-wwe8hv");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, button0);
			append(button0, svg0);
			append(svg0, g0);
			append(g0, path0);
			append(div1, t0);
			append(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			/*div0_binding*/ ctx[7](div0);
			append(div1, t1);
			append(div1, button1);
			append(button1, svg1);
			append(svg1, g1);
			append(g1, path1);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*previousImage*/ ctx[3]),
					listen(button1, "click", /*nextImage*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*activeImage*/ 1 && button0_disabled_value !== (button0_disabled_value = /*activeImage*/ ctx[0] === 0)) {
				button0.disabled = button0_disabled_value;
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
				}
			}

			if (!current || dirty & /*activeImage, images*/ 5 && button1_disabled_value !== (button1_disabled_value = /*activeImage*/ ctx[0] === /*images*/ ctx[2]?.length - 1)) {
				button1.disabled = button1_disabled_value;
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (default_slot) default_slot.d(detaching);
			/*div0_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { activeImage = 0 } = $$props;

	// Here will be stored markup that will user put inside of this component
	let slotContent;

	// Auxiliary variable for storing elements with image that user has provided
	let images;

	/*
Those functions move between active image, we dont need condition to disable their role, because this is already
implemented in the element section by conditionally disabling buttons, that call this function.

 */
	const previousImage = () => {
		$$invalidate(0, activeImage--, activeImage);
	};

	const nextImage = () => {
		$$invalidate(0, activeImage++, activeImage);
	};

	function div0_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			slotContent = $$value;
			$$invalidate(1, slotContent);
		});
	}

	$$self.$$set = $$props => {
		if ("activeImage" in $$props) $$invalidate(0, activeImage = $$props.activeImage);
		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*slotContent*/ 2) {
			// Every time, when contents of this component changes, images will be updated
			$$invalidate(2, images = slotContent?.children);
		}

		if ($$self.$$.dirty & /*images, activeImage*/ 5) {
			{
				/*
When activeImage or images array changes, checks if active image points to existing image and then displays it,
if selected image doesn't exist, then logs out error, these error normally does not occur, only in cases when
activeImage is controlled programmatically
 */
				if (images && activeImage < images.length) {
					Object.values(images).forEach(img => {
						img.hidden = true;
						return img;
					});

					$$invalidate(2, images[activeImage].hidden = false, images);
				} else if (images && activeImage >= images.length) {
					console.error("LightboxGallery: Selected image doesn't exist, invalid activeImage");
				}
			}
		}
	};

	return [
		activeImage,
		slotContent,
		images,
		previousImage,
		nextImage,
		$$scope,
		slots,
		div0_binding
	];
}

class InternalGallery extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-wwe8hv-style")) add_css();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { activeImage: 0 });
	}
}

/* src/Lightbox.svelte generated by Svelte v3.38.2 */
const get_thumbnail_slot_changes_1 = dirty => ({});
const get_thumbnail_slot_context_1 = ctx => ({});
const get_image_slot_changes = dirty => ({});
const get_image_slot_context = ctx => ({});
const get_thumbnail_slot_changes = dirty => ({});
const get_thumbnail_slot_context = ctx => ({});

// (83:4) {:else}
function create_else_block_1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[22].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[39], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[39], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (81:4) {#if thumbnail || gallery}
function create_if_block_3(ctx) {
	let current;
	const thumbnail_slot_template = /*#slots*/ ctx[22].thumbnail;
	const thumbnail_slot = create_slot(thumbnail_slot_template, ctx, /*$$scope*/ ctx[39], get_thumbnail_slot_context);

	return {
		c() {
			if (thumbnail_slot) thumbnail_slot.c();
		},
		m(target, anchor) {
			if (thumbnail_slot) {
				thumbnail_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (thumbnail_slot) {
				if (thumbnail_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot(thumbnail_slot, thumbnail_slot_template, ctx, /*$$scope*/ ctx[39], dirty, get_thumbnail_slot_changes, get_thumbnail_slot_context);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(thumbnail_slot, local);
			current = true;
		},
		o(local) {
			transition_out(thumbnail_slot, local);
			current = false;
		},
		d(detaching) {
			if (thumbnail_slot) thumbnail_slot.d(detaching);
		}
	};
}

// (80:0) <Thumbnail bind:thumbnailClasses bind:thumbnailStyle bind:protect on:click={toggle}>
function create_default_slot_2(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_3, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*thumbnail*/ ctx[15] || /*gallery*/ ctx[5]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (88:0) {#if isVisible}
function create_if_block(ctx) {
	let modal;
	let updating_modalClasses;
	let updating_modalStyle;
	let updating_transitionDuration;
	let updating_image;
	let updating_protect;
	let updating_portrait;
	let updating_title;
	let updating_description;
	let updating_gallery;
	let updating_activeImage;
	let updating_imagePreset;
	let updating_closeButton;
	let current;

	function modal_modalClasses_binding(value) {
		/*modal_modalClasses_binding*/ ctx[27](value);
	}

	function modal_modalStyle_binding(value) {
		/*modal_modalStyle_binding*/ ctx[28](value);
	}

	function modal_transitionDuration_binding(value) {
		/*modal_transitionDuration_binding*/ ctx[29](value);
	}

	function modal_image_binding(value) {
		/*modal_image_binding*/ ctx[30](value);
	}

	function modal_protect_binding(value) {
		/*modal_protect_binding*/ ctx[31](value);
	}

	function modal_portrait_binding(value) {
		/*modal_portrait_binding*/ ctx[32](value);
	}

	function modal_title_binding(value) {
		/*modal_title_binding*/ ctx[33](value);
	}

	function modal_description_binding(value) {
		/*modal_description_binding*/ ctx[34](value);
	}

	function modal_gallery_binding(value) {
		/*modal_gallery_binding*/ ctx[35](value);
	}

	function modal_activeImage_binding(value) {
		/*modal_activeImage_binding*/ ctx[36](value);
	}

	function modal_imagePreset_binding(value) {
		/*modal_imagePreset_binding*/ ctx[37](value);
	}

	function modal_closeButton_binding(value) {
		/*modal_closeButton_binding*/ ctx[38](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	if (/*modalClasses*/ ctx[2] !== void 0) {
		modal_props.modalClasses = /*modalClasses*/ ctx[2];
	}

	if (/*modalStyle*/ ctx[3] !== void 0) {
		modal_props.modalStyle = /*modalStyle*/ ctx[3];
	}

	if (/*transitionDuration*/ ctx[8] !== void 0) {
		modal_props.transitionDuration = /*transitionDuration*/ ctx[8];
	}

	if (/*image*/ ctx[10] !== void 0) {
		modal_props.image = /*image*/ ctx[10];
	}

	if (/*protect*/ ctx[9] !== void 0) {
		modal_props.protect = /*protect*/ ctx[9];
	}

	if (/*portrait*/ ctx[11] !== void 0) {
		modal_props.portrait = /*portrait*/ ctx[11];
	}

	if (/*title*/ ctx[6] !== void 0) {
		modal_props.title = /*title*/ ctx[6];
	}

	if (/*description*/ ctx[7] !== void 0) {
		modal_props.description = /*description*/ ctx[7];
	}

	if (/*gallery*/ ctx[5] !== void 0) {
		modal_props.gallery = /*gallery*/ ctx[5];
	}

	if (/*activeImage*/ ctx[4] !== void 0) {
		modal_props.activeImage = /*activeImage*/ ctx[4];
	}

	if (/*imagePreset*/ ctx[12] !== void 0) {
		modal_props.imagePreset = /*imagePreset*/ ctx[12];
	}

	if (/*closeButton*/ ctx[13] !== void 0) {
		modal_props.closeButton = /*closeButton*/ ctx[13];
	}

	modal = new Index({ props: modal_props });
	binding_callbacks.push(() => bind(modal, "modalClasses", modal_modalClasses_binding));
	binding_callbacks.push(() => bind(modal, "modalStyle", modal_modalStyle_binding));
	binding_callbacks.push(() => bind(modal, "transitionDuration", modal_transitionDuration_binding));
	binding_callbacks.push(() => bind(modal, "image", modal_image_binding));
	binding_callbacks.push(() => bind(modal, "protect", modal_protect_binding));
	binding_callbacks.push(() => bind(modal, "portrait", modal_portrait_binding));
	binding_callbacks.push(() => bind(modal, "title", modal_title_binding));
	binding_callbacks.push(() => bind(modal, "description", modal_description_binding));
	binding_callbacks.push(() => bind(modal, "gallery", modal_gallery_binding));
	binding_callbacks.push(() => bind(modal, "activeImage", modal_activeImage_binding));
	binding_callbacks.push(() => bind(modal, "imagePreset", modal_imagePreset_binding));
	binding_callbacks.push(() => bind(modal, "closeButton", modal_closeButton_binding));
	modal.$on("close", /*close*/ ctx[17]);
	modal.$on("topModalClick", /*coverClick*/ ctx[18]);
	modal.$on("modalClick", /*modalClick*/ ctx[19]);

	return {
		c() {
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modal_changes = {};

			if (dirty[0] & /*thumbnail, activeImage, gallery*/ 32816 | dirty[1] & /*$$scope*/ 256) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_modalClasses && dirty[0] & /*modalClasses*/ 4) {
				updating_modalClasses = true;
				modal_changes.modalClasses = /*modalClasses*/ ctx[2];
				add_flush_callback(() => updating_modalClasses = false);
			}

			if (!updating_modalStyle && dirty[0] & /*modalStyle*/ 8) {
				updating_modalStyle = true;
				modal_changes.modalStyle = /*modalStyle*/ ctx[3];
				add_flush_callback(() => updating_modalStyle = false);
			}

			if (!updating_transitionDuration && dirty[0] & /*transitionDuration*/ 256) {
				updating_transitionDuration = true;
				modal_changes.transitionDuration = /*transitionDuration*/ ctx[8];
				add_flush_callback(() => updating_transitionDuration = false);
			}

			if (!updating_image && dirty[0] & /*image*/ 1024) {
				updating_image = true;
				modal_changes.image = /*image*/ ctx[10];
				add_flush_callback(() => updating_image = false);
			}

			if (!updating_protect && dirty[0] & /*protect*/ 512) {
				updating_protect = true;
				modal_changes.protect = /*protect*/ ctx[9];
				add_flush_callback(() => updating_protect = false);
			}

			if (!updating_portrait && dirty[0] & /*portrait*/ 2048) {
				updating_portrait = true;
				modal_changes.portrait = /*portrait*/ ctx[11];
				add_flush_callback(() => updating_portrait = false);
			}

			if (!updating_title && dirty[0] & /*title*/ 64) {
				updating_title = true;
				modal_changes.title = /*title*/ ctx[6];
				add_flush_callback(() => updating_title = false);
			}

			if (!updating_description && dirty[0] & /*description*/ 128) {
				updating_description = true;
				modal_changes.description = /*description*/ ctx[7];
				add_flush_callback(() => updating_description = false);
			}

			if (!updating_gallery && dirty[0] & /*gallery*/ 32) {
				updating_gallery = true;
				modal_changes.gallery = /*gallery*/ ctx[5];
				add_flush_callback(() => updating_gallery = false);
			}

			if (!updating_activeImage && dirty[0] & /*activeImage*/ 16) {
				updating_activeImage = true;
				modal_changes.activeImage = /*activeImage*/ ctx[4];
				add_flush_callback(() => updating_activeImage = false);
			}

			if (!updating_imagePreset && dirty[0] & /*imagePreset*/ 4096) {
				updating_imagePreset = true;
				modal_changes.imagePreset = /*imagePreset*/ ctx[12];
				add_flush_callback(() => updating_imagePreset = false);
			}

			if (!updating_closeButton && dirty[0] & /*closeButton*/ 8192) {
				updating_closeButton = true;
				modal_changes.closeButton = /*closeButton*/ ctx[13];
				add_flush_callback(() => updating_closeButton = false);
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modal, detaching);
		}
	};
}

// (100:8) {:else}
function create_else_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[22].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[39], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[39], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (94:26) 
function create_if_block_2(ctx) {
	let internalgallery;
	let updating_activeImage;
	let current;

	function internalgallery_activeImage_binding(value) {
		/*internalgallery_activeImage_binding*/ ctx[26](value);
	}

	let internalgallery_props = {
		$$slots: { default: [create_default_slot_1] },
		$$scope: { ctx }
	};

	if (/*activeImage*/ ctx[4] !== void 0) {
		internalgallery_props.activeImage = /*activeImage*/ ctx[4];
	}

	internalgallery = new InternalGallery({ props: internalgallery_props });
	binding_callbacks.push(() => bind(internalgallery, "activeImage", internalgallery_activeImage_binding));

	return {
		c() {
			create_component(internalgallery.$$.fragment);
		},
		m(target, anchor) {
			mount_component(internalgallery, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const internalgallery_changes = {};

			if (dirty[1] & /*$$scope*/ 256) {
				internalgallery_changes.$$scope = { dirty, ctx };
			}

			if (!updating_activeImage && dirty[0] & /*activeImage*/ 16) {
				updating_activeImage = true;
				internalgallery_changes.activeImage = /*activeImage*/ ctx[4];
				add_flush_callback(() => updating_activeImage = false);
			}

			internalgallery.$set(internalgallery_changes);
		},
		i(local) {
			if (current) return;
			transition_in(internalgallery.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(internalgallery.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(internalgallery, detaching);
		}
	};
}

// (92:8) {#if thumbnail}
function create_if_block_1(ctx) {
	let current;
	const image_slot_template = /*#slots*/ ctx[22].image;
	const image_slot = create_slot(image_slot_template, ctx, /*$$scope*/ ctx[39], get_image_slot_context);

	return {
		c() {
			if (image_slot) image_slot.c();
		},
		m(target, anchor) {
			if (image_slot) {
				image_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (image_slot) {
				if (image_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot(image_slot, image_slot_template, ctx, /*$$scope*/ ctx[39], dirty, get_image_slot_changes, get_image_slot_context);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(image_slot, local);
			current = true;
		},
		o(local) {
			transition_out(image_slot, local);
			current = false;
		},
		d(detaching) {
			if (image_slot) image_slot.d(detaching);
		}
	};
}

// (95:12) <InternalGallery bind:activeImage>
function create_default_slot_1(ctx) {
	let t;
	let current;
	const thumbnail_slot_template = /*#slots*/ ctx[22].thumbnail;
	const thumbnail_slot = create_slot(thumbnail_slot_template, ctx, /*$$scope*/ ctx[39], get_thumbnail_slot_context_1);
	const default_slot_template = /*#slots*/ ctx[22].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[39], null);

	return {
		c() {
			if (thumbnail_slot) thumbnail_slot.c();
			t = space();
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (thumbnail_slot) {
				thumbnail_slot.m(target, anchor);
			}

			insert(target, t, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (thumbnail_slot) {
				if (thumbnail_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot(thumbnail_slot, thumbnail_slot_template, ctx, /*$$scope*/ ctx[39], dirty, get_thumbnail_slot_changes_1, get_thumbnail_slot_context_1);
				}
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[39], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(thumbnail_slot, local);
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(thumbnail_slot, local);
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (thumbnail_slot) thumbnail_slot.d(detaching);
			if (detaching) detach(t);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (89:4) <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect            bind:portrait bind:title bind:description bind:gallery bind:activeImage bind:imagePreset bind:closeButton            on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
function create_default_slot(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1, create_if_block_2, create_else_block];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*thumbnail*/ ctx[15]) return 0;
		if (/*gallery*/ ctx[5]) return 1;
		return 2;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$2(ctx) {
	let thumbnail_1;
	let updating_thumbnailClasses;
	let updating_thumbnailStyle;
	let updating_protect;
	let t;
	let if_block_anchor;
	let current;

	function thumbnail_1_thumbnailClasses_binding(value) {
		/*thumbnail_1_thumbnailClasses_binding*/ ctx[23](value);
	}

	function thumbnail_1_thumbnailStyle_binding(value) {
		/*thumbnail_1_thumbnailStyle_binding*/ ctx[24](value);
	}

	function thumbnail_1_protect_binding(value) {
		/*thumbnail_1_protect_binding*/ ctx[25](value);
	}

	let thumbnail_1_props = {
		$$slots: { default: [create_default_slot_2] },
		$$scope: { ctx }
	};

	if (/*thumbnailClasses*/ ctx[0] !== void 0) {
		thumbnail_1_props.thumbnailClasses = /*thumbnailClasses*/ ctx[0];
	}

	if (/*thumbnailStyle*/ ctx[1] !== void 0) {
		thumbnail_1_props.thumbnailStyle = /*thumbnailStyle*/ ctx[1];
	}

	if (/*protect*/ ctx[9] !== void 0) {
		thumbnail_1_props.protect = /*protect*/ ctx[9];
	}

	thumbnail_1 = new LightboxThumbnail({ props: thumbnail_1_props });
	binding_callbacks.push(() => bind(thumbnail_1, "thumbnailClasses", thumbnail_1_thumbnailClasses_binding));
	binding_callbacks.push(() => bind(thumbnail_1, "thumbnailStyle", thumbnail_1_thumbnailStyle_binding));
	binding_callbacks.push(() => bind(thumbnail_1, "protect", thumbnail_1_protect_binding));
	thumbnail_1.$on("click", /*toggle*/ ctx[16]);
	let if_block = /*isVisible*/ ctx[14] && create_if_block(ctx);

	return {
		c() {
			create_component(thumbnail_1.$$.fragment);
			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			mount_component(thumbnail_1, target, anchor);
			insert(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const thumbnail_1_changes = {};

			if (dirty[0] & /*thumbnail, gallery*/ 32800 | dirty[1] & /*$$scope*/ 256) {
				thumbnail_1_changes.$$scope = { dirty, ctx };
			}

			if (!updating_thumbnailClasses && dirty[0] & /*thumbnailClasses*/ 1) {
				updating_thumbnailClasses = true;
				thumbnail_1_changes.thumbnailClasses = /*thumbnailClasses*/ ctx[0];
				add_flush_callback(() => updating_thumbnailClasses = false);
			}

			if (!updating_thumbnailStyle && dirty[0] & /*thumbnailStyle*/ 2) {
				updating_thumbnailStyle = true;
				thumbnail_1_changes.thumbnailStyle = /*thumbnailStyle*/ ctx[1];
				add_flush_callback(() => updating_thumbnailStyle = false);
			}

			if (!updating_protect && dirty[0] & /*protect*/ 512) {
				updating_protect = true;
				thumbnail_1_changes.protect = /*protect*/ ctx[9];
				add_flush_callback(() => updating_protect = false);
			}

			thumbnail_1.$set(thumbnail_1_changes);

			if (/*isVisible*/ ctx[14]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*isVisible*/ 16384) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(thumbnail_1.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(thumbnail_1.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			destroy_component(thumbnail_1, detaching);
			if (detaching) detach(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { thumbnailClasses = "" } = $$props;
	let { thumbnailStyle = "" } = $$props;
	let { modalClasses = "" } = $$props;
	let { modalStyle = "" } = $$props;
	let { activeImage = 0 } = $$props;
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
	let modalClicked = false;

	const toggle = () => {
		$$invalidate(14, isVisible = !isVisible);
		toggleScroll();
	};

	const close = () => {
		$$invalidate(14, isVisible = false);
		toggleScroll();
	};

	const coverClick = () => {
		// console.log('coverClick')
		if (!modalClicked || clickToClose) {
			close();
		}

		modalClicked = false;
	};

	const modalClick = () => {
		// console.log('modalClick')
		modalClicked = true;
	};

	let toggleScroll = () => {
		
	};

	onMount(() => {
		let defaultOverflow = document.body.style.overflow;

		toggleScroll = () => {
			if (noScroll) {
				if (isVisible) {
					document.body.style.overflow = "hidden";
				} else {
					document.body.style.overflow = defaultOverflow;
				}
			}
		};
	});

	function thumbnail_1_thumbnailClasses_binding(value) {
		thumbnailClasses = value;
		$$invalidate(0, thumbnailClasses);
	}

	function thumbnail_1_thumbnailStyle_binding(value) {
		thumbnailStyle = value;
		$$invalidate(1, thumbnailStyle);
	}

	function thumbnail_1_protect_binding(value) {
		protect = value;
		$$invalidate(9, protect);
	}

	function internalgallery_activeImage_binding(value) {
		activeImage = value;
		$$invalidate(4, activeImage);
	}

	function modal_modalClasses_binding(value) {
		modalClasses = value;
		$$invalidate(2, modalClasses);
	}

	function modal_modalStyle_binding(value) {
		modalStyle = value;
		$$invalidate(3, modalStyle);
	}

	function modal_transitionDuration_binding(value) {
		transitionDuration = value;
		$$invalidate(8, transitionDuration);
	}

	function modal_image_binding(value) {
		image = value;
		$$invalidate(10, image);
	}

	function modal_protect_binding(value) {
		protect = value;
		$$invalidate(9, protect);
	}

	function modal_portrait_binding(value) {
		portrait = value;
		$$invalidate(11, portrait);
	}

	function modal_title_binding(value) {
		title = value;
		$$invalidate(6, title);
	}

	function modal_description_binding(value) {
		description = value;
		$$invalidate(7, description);
	}

	function modal_gallery_binding(value) {
		gallery = value;
		$$invalidate(5, gallery);
	}

	function modal_activeImage_binding(value) {
		activeImage = value;
		$$invalidate(4, activeImage);
	}

	function modal_imagePreset_binding(value) {
		imagePreset = value;
		$$invalidate(12, imagePreset);
	}

	function modal_closeButton_binding(value) {
		closeButton = value;
		$$invalidate(13, closeButton);
	}

	$$self.$$set = $$props => {
		if ("thumbnailClasses" in $$props) $$invalidate(0, thumbnailClasses = $$props.thumbnailClasses);
		if ("thumbnailStyle" in $$props) $$invalidate(1, thumbnailStyle = $$props.thumbnailStyle);
		if ("modalClasses" in $$props) $$invalidate(2, modalClasses = $$props.modalClasses);
		if ("modalStyle" in $$props) $$invalidate(3, modalStyle = $$props.modalStyle);
		if ("activeImage" in $$props) $$invalidate(4, activeImage = $$props.activeImage);
		if ("gallery" in $$props) $$invalidate(5, gallery = $$props.gallery);
		if ("title" in $$props) $$invalidate(6, title = $$props.title);
		if ("description" in $$props) $$invalidate(7, description = $$props.description);
		if ("transitionDuration" in $$props) $$invalidate(8, transitionDuration = $$props.transitionDuration);
		if ("protect" in $$props) $$invalidate(9, protect = $$props.protect);
		if ("image" in $$props) $$invalidate(10, image = $$props.image);
		if ("portrait" in $$props) $$invalidate(11, portrait = $$props.portrait);
		if ("noScroll" in $$props) $$invalidate(20, noScroll = $$props.noScroll);
		if ("thumbnail" in $$props) $$invalidate(15, thumbnail = $$props.thumbnail);
		if ("imagePreset" in $$props) $$invalidate(12, imagePreset = $$props.imagePreset);
		if ("clickToClose" in $$props) $$invalidate(21, clickToClose = $$props.clickToClose);
		if ("closeButton" in $$props) $$invalidate(13, closeButton = $$props.closeButton);
		if ("isVisible" in $$props) $$invalidate(14, isVisible = $$props.isVisible);
		if ("$$scope" in $$props) $$invalidate(39, $$scope = $$props.$$scope);
	};

	return [
		thumbnailClasses,
		thumbnailStyle,
		modalClasses,
		modalStyle,
		activeImage,
		gallery,
		title,
		description,
		transitionDuration,
		protect,
		image,
		portrait,
		imagePreset,
		closeButton,
		isVisible,
		thumbnail,
		toggle,
		close,
		coverClick,
		modalClick,
		noScroll,
		clickToClose,
		slots,
		thumbnail_1_thumbnailClasses_binding,
		thumbnail_1_thumbnailStyle_binding,
		thumbnail_1_protect_binding,
		internalgallery_activeImage_binding,
		modal_modalClasses_binding,
		modal_modalStyle_binding,
		modal_transitionDuration_binding,
		modal_image_binding,
		modal_protect_binding,
		modal_portrait_binding,
		modal_title_binding,
		modal_description_binding,
		modal_gallery_binding,
		modal_activeImage_binding,
		modal_imagePreset_binding,
		modal_closeButton_binding,
		$$scope
	];
}

class Lightbox extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$2,
			create_fragment$2,
			safe_not_equal,
			{
				thumbnailClasses: 0,
				thumbnailStyle: 1,
				modalClasses: 2,
				modalStyle: 3,
				activeImage: 4,
				gallery: 5,
				title: 6,
				description: 7,
				transitionDuration: 8,
				protect: 9,
				image: 10,
				portrait: 11,
				noScroll: 20,
				thumbnail: 15,
				imagePreset: 12,
				clickToClose: 21,
				closeButton: 13,
				isVisible: 14
			},
			[-1, -1]
		);
	}
}

/* src/Gallery/LightboxImage.svelte generated by Svelte v3.38.2 */

function create_fragment$1(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			div.hidden = true;
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class LightboxImage extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
	}
}

/* src/Gallery/ExternalGallery.svelte generated by Svelte v3.38.2 */

function create_fragment(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class ExternalGallery extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export { Lightbox, ExternalGallery as LightboxGallery, LightboxImage };
