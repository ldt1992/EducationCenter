
//=======================WOW - Effect + LazyLoad
(function () {
    var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
      bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; },
      indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    Util = (function () {
        function Util() { }

        Util.prototype.extend = function (custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value;
                }
            }
            return custom;
        };

        Util.prototype.isMobile = function (agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
        };

        Util.prototype.createEvent = function (event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false;
            }
            if (cancel == null) {
                cancel = false;
            }
            if (detail == null) {
                detail = null;
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent('CustomEvent');
                customEvent.initCustomEvent(event, bubble, cancel, detail);
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event;
            } else {
                customEvent.eventName = event;
            }
            return customEvent;
        };

        Util.prototype.emitEvent = function (elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event);
            } else if (event in (elem != null)) {
                return elem[event]();
            } else if (("on" + event) in (elem != null)) {
                return elem["on" + event]();
            }
        };

        Util.prototype.addEvent = function (elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false);
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn);
            } else {
                return elem[event] = fn;
            }
        };

        Util.prototype.removeEvent = function (elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false);
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn);
            } else {
                return delete elem[event];
            }
        };

        Util.prototype.innerHeight = function () {
            if ('innerHeight' in window) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        };

        return Util;

    })();

    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function () {
        function WeakMap() {
            this.keys = [];
            this.values = [];
        }

        WeakMap.prototype.get = function (key) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    return this.values[i];
                }
            }
        };

        WeakMap.prototype.set = function (key, value) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return;
                }
            }
            this.keys.push(key);
            return this.values.push(value);
        };

        return WeakMap;

    })());

    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function () {
        function MutationObserver() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn('MutationObserver is not supported by your browser.');
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
            }
        }

        MutationObserver.notSupported = true;

        MutationObserver.prototype.observe = function () { };

        return MutationObserver;

    })());

    getComputedStyle = this.getComputedStyle || function (el, pseudo) {
        this.getPropertyValue = function (prop) {
            var ref;
            if (prop === 'float') {
                prop = 'styleFloat';
            }
            if (getComputedStyleRX.test(prop)) {
                prop.replace(getComputedStyleRX, function (_, _char) {
                    return _char.toUpperCase();
                });
            }
            return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
        };
        return this;
    };

    getComputedStyleRX = /(\-([a-z]){1})/g;

    this.WOW = (function () {
        WOW.prototype.defaults = {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: null,
            scrollContainer: null
        };

        function WOW(options) {
            if (options == null) {
                options = {};
            }
            this.scrollCallback = bind(this.scrollCallback, this);
            this.scrollHandler = bind(this.scrollHandler, this);
            this.resetAnimation = bind(this.resetAnimation, this);
            this.start = bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            if (options.scrollContainer != null) {
                this.config.scrollContainer = document.querySelector(options.scrollContainer);
            }
            this.animationNameCache = new WeakMap();
            this.wowEvent = this.util().createEvent(this.config.boxClass);
        }

        WOW.prototype.init = function () {
            var ref;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                this.util().addEvent(document, 'DOMContentLoaded', this.start);
            }
            return this.finished = [];
        };

        WOW.prototype.start = function () {
            var box, j, len, ref;
            this.stopped = false;
            this.boxes = (function () {
                var j, len, ref, results;
                ref = this.element.querySelectorAll("." + this.config.boxClass);
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            this.all = (function () {
                var j, len, ref, results;
                ref = this.boxes;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle();
                } else {
                    ref = this.boxes;
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        this.applyStyle(box, true);
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
                this.util().addEvent(window, 'resize', this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50);
            }
            if (this.config.live) {
                return new MutationObserver((function (_this) {
                    return function (records) {
                        var k, len1, node, record, results;
                        results = [];
                        for (k = 0, len1 = records.length; k < len1; k++) {
                            record = records[k];
                            results.push((function () {
                                var l, len2, ref1, results1;
                                ref1 = record.addedNodes || [];
                                results1 = [];
                                for (l = 0, len2 = ref1.length; l < len2; l++) {
                                    node = ref1[l];
                                    results1.push(this.doSync(node));
                                }
                                return results1;
                            }).call(_this));
                        }
                        return results;
                    };
                })(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        };

        WOW.prototype.stop = function () {
            this.stopped = true;
            this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
            this.util().removeEvent(window, 'resize', this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval);
            }
        };

        WOW.prototype.sync = function (element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element);
            }
        };

        WOW.prototype.doSync = function (element) {
            var box, j, len, ref, results;
            if (element == null) {
                element = this.element;
            }
            if (element.nodeType !== 1) {
                return;
            }
            element = element.parentNode || element;
            ref = element.querySelectorAll("." + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (indexOf.call(this.all, box) < 0) {
                    this.boxes.push(box);
                    this.all.push(box);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle();
                    } else {
                        this.applyStyle(box, true);
                    }
                    results.push(this.scrolled = true);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        WOW.prototype.show = function (box) {
            this.applyStyle(box);
            box.className = box.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(box);
            }
            this.util().emitEvent(box, this.wowEvent);
            this.util().addEvent(box, 'animationend', this.resetAnimation);
            this.util().addEvent(box, 'oanimationend', this.resetAnimation);
            this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
            this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
            return box;
        };

        WOW.prototype.applyStyle = function (box, hidden) {
            var delay, duration, iteration;
            duration = box.getAttribute('data-wow-duration');
            delay = box.getAttribute('data-wow-delay');
            iteration = box.getAttribute('data-wow-iteration');
            return this.animate((function (_this) {
                return function () {
                    return _this.customStyle(box, hidden, duration, delay, iteration);
                };
            })(this));
        };

        WOW.prototype.animate = (function () {
            if ('requestAnimationFrame' in window) {
                return function (callback) {
                    return window.requestAnimationFrame(callback);
                };
            } else {
                return function (callback) {
                    return callback();
                };
            }
        })();

        WOW.prototype.resetStyle = function () {
            var box, j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                results.push(box.style.visibility = 'visible');
            }
            return results;
        };

        WOW.prototype.resetAnimation = function (event) {
            var target;
            if (event.type.toLowerCase().indexOf('animationend') >= 0) {
                target = event.target || event.srcElement;
                return target.className = target.className.replace(this.config.animateClass, '').trim();
            }
        };

        WOW.prototype.customStyle = function (box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box);
            }
            box.style.visibility = hidden ? 'hidden' : 'visible';
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                });
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                });
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                });
            }
            this.vendorSet(box.style, {
                animationName: hidden ? 'none' : this.cachedAnimationName(box)
            });
            return box;
        };

        WOW.prototype.vendors = ["moz", "webkit"];

        WOW.prototype.vendorSet = function (elem, properties) {
            var name, results, value, vendor;
            results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                results.push((function () {
                    var j, len, ref, results1;
                    ref = this.vendors;
                    results1 = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        vendor = ref[j];
                        results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
                    }
                    return results1;
                }).call(this));
            }
            return results;
        };

        WOW.prototype.vendorCSS = function (elem, property) {
            var j, len, ref, result, style, vendor;
            style = getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            ref = this.vendors;
            for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
            }
            return result;
        };

        WOW.prototype.animationName = function (box) {
            var animationName;
            try {
                animationName = this.vendorCSS(box, 'animation-name').cssText;
            } catch (_error) {
                animationName = getComputedStyle(box).getPropertyValue('animation-name');
            }
            if (animationName === 'none') {
                return '';
            } else {
                return animationName;
            }
        };

        WOW.prototype.cacheAnimationName = function (box) {
            return this.animationNameCache.set(box, this.animationName(box));
        };

        WOW.prototype.cachedAnimationName = function (box) {
            return this.animationNameCache.get(box);
        };

        WOW.prototype.scrollHandler = function () {
            return this.scrolled = true;
        };

        WOW.prototype.scrollCallback = function () {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = (function () {
                    var j, len, ref, results;
                    ref = this.boxes;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        if (!(box)) {
                            continue;
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue;
                        }
                        results.push(box);
                    }
                    return results;
                }).call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop();
                }
            }
        };

        WOW.prototype.offsetTop = function (element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        };

        WOW.prototype.isVisible = function (box) {
            var bottom, offset, top, viewBottom, viewTop;
            offset = box.getAttribute('data-wow-offset') || this.config.offset;
            viewTop = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;
            viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop;
        };

        WOW.prototype.util = function () {
            return this._util != null ? this._util : this._util = new Util();
        };

        WOW.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        };

        return WOW;

    })();

}).call(this);
//=======================End WOW - Effect + LazyLoad



//=======================Smooth Scroll
(function () {

    // Scroll Variables (tweakable)
    var defaultOptions = {

        // Scrolling Core
        frameRate: 150, // [Hz]
        animationTime: 700, // [px]
        stepSize: 85, // [px]

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true,
        pulseScale: 8,
        pulseNormalize: 1,

        // Acceleration
        accelerationDelta: 20,  // 20
        accelerationMax: 1,   // 1

        // Keyboard Settings
        keyboardSupport: true,  // option
        arrowScroll: 50,     // [px]

        // Other
        touchpadSupport: true,
        fixedBackground: true,
        excluded: ""
    };

    var options = defaultOptions;


    // Other Variables
    var isExcluded = false;
    var isFrame = false;
    var direction = { x: 0, y: 0 };
    var initDone = false;
    var root = document.documentElement;
    var activeElement;
    var observer;
    var deltaBuffer = [120, 120, 120];

    var key = {
        left: 37, up: 38, right: 39, down: 40, spacebar: 32,
        pageup: 33, pagedown: 34, end: 35, home: 36
    };


    /***********************************************
     * SETTINGS
     ***********************************************/

    var options = defaultOptions;


    /***********************************************
     * INITIALIZE
     ***********************************************/

    /**
     * Tests if smooth scrolling is allowed. Shuts down everything if not.
     */
    function initTest() {

        var disableKeyboard = false;

        // disable keyboard support if anything above requested it
        if (disableKeyboard) {
            removeEvent("keydown", keydown);
        }

        if (options.keyboardSupport && !disableKeyboard) {
            addEvent("keydown", keydown);
        }
    }

    /**
     * Sets up scrolls array, determines if frames are involved.
     */
    function init() {

        if (!document.body) return;

        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight;
        var scrollHeight = body.scrollHeight;

        // check compat mode for root element
        root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
        activeElement = body;

        initTest();
        initDone = true;

        // Checks if this script is running in a frame
        if (top != self) {
            isFrame = true;
        }

            /**
             * This fixes a bug where the areas left and right to 
             * the content does not trigger the onmousewheel event
             * on some pages. e.g.: html, body { height: 100% }
             */
        else if (scrollHeight > windowHeight &&
                (body.offsetHeight <= windowHeight ||
                 html.offsetHeight <= windowHeight)) {

            html.style.height = 'auto';
            //setTimeout(refresh, 10);

            // clearfix
            if (root.offsetHeight <= windowHeight) {
                var underlay = document.createElement("div");
                underlay.style.clear = "both";
                body.appendChild(underlay);
            }
        }

        // disable fixed background
        if (!options.fixedBackground && !isExcluded) {
            body.style.backgroundAttachment = "scroll";
            html.style.backgroundAttachment = "scroll";
        }
    }


    /************************************************
     * SCROLLING 
     ************************************************/

    var que = [];
    var pending = false;
    var lastScroll = +new Date;

    /**
     * Pushes scroll actions to the scrolling queue.
     */
    function scrollArray(elem, left, top, delay) {

        delay || (delay = 1000);
        directionCheck(left, top);

        if (options.accelerationMax != 1) {
            var now = +new Date;
            var elapsed = now - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + (30 / elapsed)) / 2;
                if (factor > 1) {
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;
                    top *= factor;
                }
            }
            lastScroll = +new Date;
        }

        // push a scroll command
        que.push({
            x: left,
            y: top,
            lastX: (left < 0) ? 0.99 : -0.99,
            lastY: (top < 0) ? 0.99 : -0.99,
            start: +new Date
        });

        // don't act if there's a pending queue
        if (pending) {
            return;
        }

        var scrollWindow = (elem === document.body);

        var step = function (time) {

            var now = +new Date;
            var scrollX = 0;
            var scrollY = 0;

            for (var i = 0; i < que.length; i++) {

                var item = que[i];
                var elapsed = now - item.start;
                var finished = (elapsed >= options.animationTime);

                // scroll position: [0, 1]
                var position = (finished) ? 1 : elapsed / options.animationTime;

                // easing [optional]
                if (options.pulseAlgorithm) {
                    position = pulse(position);
                }

                // only need the difference
                var x = (item.x * position - item.lastX) >> 0;
                var y = (item.y * position - item.lastY) >> 0;

                // add this to the total scrolling
                scrollX += x;
                scrollY += y;

                // update last values
                item.lastX += x;
                item.lastY += y;

                // delete and step back if it's over
                if (finished) {
                    que.splice(i, 1); i--;
                }
            }

            // scroll left and top
            if (scrollWindow) {
                window.scrollBy(scrollX, scrollY);
            }
            else {
                if (scrollX) elem.scrollLeft += scrollX;
                if (scrollY) elem.scrollTop += scrollY;
            }

            // clean up if there's nothing left to do
            if (!left && !top) {
                que = [];
            }

            if (que.length) {
                requestFrame(step, elem, (delay / options.frameRate + 1));
            } else {
                pending = false;
            }
        };

        // start a new queue of actions
        requestFrame(step, elem, 0);
        pending = true;
    }


    /***********************************************
     * EVENTS
     ***********************************************/

    /**
     * Mouse wheel handler.
     * @param {Object} event
     */
    function wheel(event) {

        if (!initDone) {
            init();
        }

        var target = event.target;
        var overflowing = overflowingAncestor(target);

        // use default if there's no overflowing
        // element or default action is prevented    
        if (!overflowing || event.defaultPrevented ||
            isNodeName(activeElement, "embed") ||
           (isNodeName(target, "embed") && /\.pdf/i.test(target.src))) {
            return true;
        }

        var deltaX = event.wheelDeltaX || 0;
        var deltaY = event.wheelDeltaY || 0;

        // use wheelDelta if deltaX/Y is not available
        if (!deltaX && !deltaY) {
            deltaY = event.wheelDelta || 0;
        }

        // check if it's a touchpad scroll that should be ignored
        if (!options.touchpadSupport && isTouchpad(deltaY)) {
            return true;
        }

        // scale by step size
        // delta is 120 most of the time
        // synaptics seems to send 1 sometimes
        if (Math.abs(deltaX) > 1.2) {
            deltaX *= options.stepSize / 120;
        }
        if (Math.abs(deltaY) > 1.2) {
            deltaY *= options.stepSize / 120;
        }

        scrollArray(overflowing, -deltaX, -deltaY);
        event.preventDefault();
    }

    /**
     * Keydown event handler.
     * @param {Object} event
     */
    function keydown(event) {

        var target = event.target;
        var modifier = event.ctrlKey || event.altKey || event.metaKey ||
                      (event.shiftKey && event.keyCode !== key.spacebar);

        // do nothing if user is editing text
        // or using a modifier key (except shift)
        // or in a dropdown
        if (/input|textarea|select|embed/i.test(target.nodeName) ||
             target.isContentEditable ||
             event.defaultPrevented ||
             modifier) {
            return true;
        }
        // spacebar should trigger button press
        if (isNodeName(target, "button") &&
            event.keyCode === key.spacebar) {
            return true;
        }

        var shift, x = 0, y = 0;
        var elem = overflowingAncestor(activeElement);
        var clientHeight = elem.clientHeight;

        if (elem == document.body) {
            clientHeight = window.innerHeight;
        }

        switch (event.keyCode) {
            case key.up:
                y = -options.arrowScroll;
                break;
            case key.down:
                y = options.arrowScroll;
                break;
            case key.spacebar: // (+ shift)
                shift = event.shiftKey ? 1 : -1;
                y = -shift * clientHeight * 0.9;
                break;
            case key.pageup:
                y = -clientHeight * 0.9;
                break;
            case key.pagedown:
                y = clientHeight * 0.9;
                break;
            case key.home:
                y = -elem.scrollTop;
                break;
            case key.end:
                var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
                y = (damt > 0) ? damt + 10 : 0;
                break;
            case key.left:
                x = -options.arrowScroll;
                break;
            case key.right:
                x = options.arrowScroll;
                break;
            default:
                return true; // a key we don't care about
        }

        scrollArray(elem, x, y);
        event.preventDefault();
    }

    /**
     * Mousedown event only for updating activeElement
     */
    function mousedown(event) {
        activeElement = event.target;
    }


    /***********************************************
     * OVERFLOW
     ***********************************************/

    var cache = {}; // cleared out every once in while
    setInterval(function () { cache = {}; }, 10 * 1000);

    var uniqueID = (function () {
        var i = 0;
        return function (el) {
            return el.uniqueID || (el.uniqueID = i++);
        };
    })();

    function setCache(elems, overflowing) {
        for (var i = elems.length; i--;)
            cache[uniqueID(elems[i])] = overflowing;
        return overflowing;
    }

    function overflowingAncestor(el) {
        var elems = [];
        var rootScrollHeight = root.scrollHeight;
        do {
            var cached = cache[uniqueID(el)];
            if (cached) {
                return setCache(elems, cached);
            }
            elems.push(el);
            if (rootScrollHeight === el.scrollHeight) {
                if (!isFrame || root.clientHeight + 10 < rootScrollHeight) {
                    return setCache(elems, document.body); // scrolling root in WebKit
                }
            } else if (el.clientHeight + 10 < el.scrollHeight) {
                overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
                if (overflow === "scroll" || overflow === "auto") {
                    return setCache(elems, el);
                }
            }
        } while (el = el.parentNode);
    }


    /***********************************************
     * HELPERS
     ***********************************************/

    function addEvent(type, fn, bubble) {
        window.addEventListener(type, fn, (bubble || false));
    }

    function removeEvent(type, fn, bubble) {
        window.removeEventListener(type, fn, (bubble || false));
    }

    function isNodeName(el, tag) {
        return (el.nodeName || "").toLowerCase() === tag.toLowerCase();
    }

    function directionCheck(x, y) {
        x = (x > 0) ? 1 : -1;
        y = (y > 0) ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
            direction.x = x;
            direction.y = y;
            que = [];
            lastScroll = 0;
        }
    }

    var deltaBufferTimer;

    function isTouchpad(deltaY) {
        if (!deltaY) return;
        deltaY = Math.abs(deltaY)
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);

        var allEquals = (deltaBuffer[0] == deltaBuffer[1] &&
                            deltaBuffer[1] == deltaBuffer[2]);
        var allDivisable = (isDivisible(deltaBuffer[0], 120) &&
                            isDivisible(deltaBuffer[1], 120) &&
                            isDivisible(deltaBuffer[2], 120));
        return !(allEquals || allDivisable);
    }

    function isDivisible(n, divisor) {
        return (Math.floor(n / divisor) == n / divisor);
    }

    var requestFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function (callback, element, delay) {
                    window.setTimeout(callback, delay || (1000 / 60));
                };
    })();


    /***********************************************
     * PULSE
     ***********************************************/

    /**
     * Viscous fluid with a pulse for part and decay for the rest.
     * - Applies a fixed force over an interval (a damped acceleration), and
     * - Lets the exponential bleed away the velocity over a longer interval
     * - Michael Herf, http://stereopsis.com/stopping/
     */
    function pulse_(x) {
        var val, start, expx;
        // test
        x = x * options.pulseScale;
        if (x < 1) { // acceleartion
            val = x - (1 - Math.exp(-x));
        } else {     // tail
            // the previous animation ended here:
            start = Math.exp(-1);
            // simple viscous drag
            x -= 1;
            expx = 1 - Math.exp(-x);
            val = start + (expx * (1 - start));
        }
        return val * options.pulseNormalize;
    }

    function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;

        if (options.pulseNormalize == 1) {
            options.pulseNormalize /= pulse_(1);
        }
        return pulse_(x);
    }

    var isChrome = /chrome/i.test(window.navigator.userAgent);
    var isMouseWheelSupported = 'onmousewheel' in document;

    if (isMouseWheelSupported && isChrome) {
        addEvent("mousedown", mousedown);
        addEvent("mousewheel", wheel);
        addEvent("load", init);
    };

})();
//=======================End Smooth Scroll



//=======================Hover Direction
; (function ($, window, undefined) {

    'use strict';

    $.HoverDir = function (options, element) {

        this.$el = $(element);
        this._init(options);

    };

    // the options
    $.HoverDir.defaults = {
        speed: 500,
        easing: 'ease',
        hoverDelay: 0,
        inverse: false
    };

    $.HoverDir.prototype = {

        _init: function (options) {

            // options
            this.options = $.extend(true, {}, $.HoverDir.defaults, options);
            // transition properties
            this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
            // support for CSS transitions
            this.support = Modernizr.csstransitions;
            // load the events
            this._loadEvents();

        },
        _loadEvents: function () {

            var self = this;

            this.$el.on('mouseenter.hoverdir, mouseleave.hoverdir', function (event) {

                var $el = $(this),
					$hoverElem = $el.find('div'),
					direction = self._getDir($el, { x: event.pageX, y: event.pageY }),
					styleCSS = self._getStyle(direction);

                if (event.type === 'mouseenter') {

                    $hoverElem.hide().css(styleCSS.from);
                    clearTimeout(self.tmhover);

                    self.tmhover = setTimeout(function () {

                        $hoverElem.show(0, function () {

                            var $el = $(this);
                            if (self.support) {
                                $el.css('transition', self.transitionProp);
                            }
                            self._applyAnimation($el, styleCSS.to, self.options.speed);

                        });


                    }, self.options.hoverDelay);

                }
                else {

                    if (self.support) {
                        $hoverElem.css('transition', self.transitionProp);
                    }
                    clearTimeout(self.tmhover);
                    self._applyAnimation($hoverElem, styleCSS.from, self.options.speed);

                }

            });

        },
        // credits : http://stackoverflow.com/a/3647634
        _getDir: function ($el, coordinates) {

            // the width and height of the current div
            var w = $el.width(),
				h = $el.height(),

				// calculate the x and y to get an angle to the center of the div from that x and y.
				// gets the x value relative to the center of the DIV and "normalize" it
				x = (coordinates.x - $el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
				y = (coordinates.y - $el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),

				// the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
				// first calculate the angle of the point,
				// add 180 deg to get rid of the negative values
				// divide by 90 to get the quadrant
				// add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
				direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

            return direction;

        },
        _getStyle: function (direction) {

            var fromStyle, toStyle,
				slideFromTop = { left: '0px', top: '-100%' },
				slideFromBottom = { left: '0px', top: '100%' },
				slideFromLeft = { left: '-100%', top: '0px' },
				slideFromRight = { left: '100%', top: '0px' },
				slideTop = { top: '0px' },
				slideLeft = { left: '0px' };

            switch (direction) {
                case 0:
                    // from top
                    fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
                    toStyle = slideTop;
                    break;
                case 1:
                    // from right
                    fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
                    toStyle = slideLeft;
                    break;
                case 2:
                    // from bottom
                    fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
                    toStyle = slideTop;
                    break;
                case 3:
                    // from left
                    fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
                    toStyle = slideLeft;
                    break;
            };

            return { from: fromStyle, to: toStyle };

        },
        // apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
        _applyAnimation: function (el, styleCSS, speed) {

            $.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
            el.stop().applyStyle(styleCSS, $.extend(true, [], { duration: speed + 'ms' }));

        },

    };

    var logError = function (message) {

        if (window.console) {

            window.console.error(message);

        }

    };

    $.fn.hoverdir = function (options) {

        var instance = $.data(this, 'hoverdir');

        if (typeof options === 'string') {

            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function () {

                if (!instance) {

                    logError("cannot call methods on hoverdir prior to initialization; " +
					"attempted to call method '" + options + "'");
                    return;

                }

                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {

                    logError("no such method '" + options + "' for hoverdir instance");
                    return;

                }

                instance[options].apply(instance, args);

            });

        }
        else {

            this.each(function () {

                if (instance) {

                    instance._init();

                }
                else {

                    instance = $.data(this, 'hoverdir', new $.HoverDir(options, this));

                }

            });

        }

        return instance;

    };

})(jQuery, window);

; window.Modernizr = function (a, b, c) { function x(a) { j.cssText = a } function y(a, b) { return x(prefixes.join(a + ";") + (b || "")) } function z(a, b) { return typeof a === b } function A(a, b) { return !!~("" + a).indexOf(b) } function B(a, b) { for (var d in a) { var e = a[d]; if (!A(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 } return !1 } function C(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : z(f, "function") ? f.bind(d || b) : f } return !1 } function D(a, b, c) { var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + n.join(d + " ") + d).split(" "); return z(b, "string") || z(b, "undefined") ? B(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), C(e, b, c)) } var d = "2.6.2", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = "Webkit Moz O ms", n = m.split(" "), o = m.toLowerCase().split(" "), p = {}, q = {}, r = {}, s = [], t = s.slice, u, v = {}.hasOwnProperty, w; !z(v, "undefined") && !z(v.call, "undefined") ? w = function (a, b) { return v.call(a, b) } : w = function (a, b) { return b in a && z(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function (b) { var c = this; if (typeof c != "function") throw new TypeError; var d = t.call(arguments, 1), e = function () { if (this instanceof e) { var a = function () { }; a.prototype = c.prototype; var f = new a, g = c.apply(f, d.concat(t.call(arguments))); return Object(g) === g ? g : f } return c.apply(b, d.concat(t.call(arguments))) }; return e }), p.csstransitions = function () { return D("transition") }; for (var E in p) w(p, E) && (u = E.toLowerCase(), e[u] = p[E](), s.push((e[u] ? "" : "no-") + u)); return e.addTest = function (a, b) { if (typeof a == "object") for (var d in a) w(a, d) && e.addTest(d, a[d]); else { a = a.toLowerCase(); if (e[a] !== c) return e; b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b } return e }, x(""), i = k = null, function (a, b) { function k(a, b) { var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement; return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild) } function l() { var a = r.elements; return typeof a == "string" ? a.split(" ") : a } function m(a) { var b = i[a[g]]; return b || (b = {}, h++, a[g] = h, i[h] = b), b } function n(a, c, f) { c || (c = b); if (j) return c.createElement(a); f || (f = m(c)); var g; return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g } function o(a, c) { a || (a = b); if (j) return a.createDocumentFragment(); c = c || m(a); var d = c.frag.cloneNode(), e = 0, f = l(), g = f.length; for (; e < g; e++) d.createElement(f[e]); return d } function p(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) { return r.shivMethods ? n(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function (a) { return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(r, b.frag) } function q(a) { a || (a = b); var c = m(a); return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a } var c = a.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, f, g = "_html5shiv", h = 0, i = {}, j; (function () { try { var a = b.createElement("a"); a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function () { b.createElement("a"); var a = b.createDocumentFragment(); return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" }() } catch (c) { f = !0, j = !0 } })(); var r = { elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS: c.shivCSS !== !1, supportsUnknownElements: j, shivMethods: c.shivMethods !== !1, type: "default", shivDocument: q, createElement: n, createDocumentFragment: o }; a.html5 = r, q(b) }(this, b), e._version = d, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) { return B([a]) }, e.testAllProps = D, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + s.join(" ") : ""), e }(this, this.document), function (a, b, c) { function d(a) { return "[object Function]" == o.call(a) } function e(a) { return "string" == typeof a } function f() { } function g(a) { return !a || "loaded" == a || "complete" == a || "uninitialized" == a } function h() { var a = p.shift(); q = 1, a ? a.t ? m(function () { ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 } function i(a, c, d, e, f, i, j) { function k(b) { if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function () { t.removeChild(l) }, 50); for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } } var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = { t: d, s: c, e: f, a: i, x: j }; 1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) } function j(a, b, c, d, f) { return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this } function k() { var a = B; return a.loader = { load: j, i: 0 }, a } var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) { return "[object Array]" == o.call(a) }, x = [], y = {}, z = { timeout: function (a, b) { return b.length && (a.timeout = b[0]), a } }, A, B; B = function (a) { function b(a) { var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = { url: c, origUrl: c, prefixes: a }, e, f, g; for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g)); for (f = 0; f < b; f++) c = x[f](c); return c } function g(a, e, f, g, h) { var i = b(a), j = i.autoCallback; i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 }))) } function h(a, b) { function c(a, c) { if (a) { if (e(a)) c || (j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () { var b = 0, c; for (c in a) a.hasOwnProperty(c) && b++; return b }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() } : j[n] = function (a) { return function () { var b = [].slice.call(arguments); a && a.apply(this, b), l() } }(k[n])), g(a[n], j, b, n, h)) } else !c && l() } var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n; c(h ? a.yep : a.nope, !!i), i && c(i) } var i, j, l = this.yepnope.loader; if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l) }, B.addPrefix = function (a, b) { z[a] = b }, B.addFilter = function (a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) { var k = b.createElement("script"), l, o, e = e || B.errorTimeout; k.src = a; for (o in d) k.setAttribute(o, d[o]); c = j ? h : c || f, k.onreadystatechange = k.onload = function () { !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function () { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function (a, c, d, e, g, i) { var e = b.createElement("link"), j, c = i ? h : c || f; e.href = a, e.rel = "stylesheet", e.type = "text/css"; for (j in d) e.setAttribute(j, d[j]); g || (n.parentNode.insertBefore(e, n), m(c, 0)) } }(this, document), Modernizr.load = function () { yepnope.apply(window, [].slice.call(arguments, 0)) };
//=======================End Hover Direction



//=======================PrettyPhoto

(function ($) {
    $.prettyPhoto = { version: '3.1.6' };

    $.fn.prettyPhoto = function (pp_settings) {
        pp_settings = jQuery.extend({
            hook: 'rel', /* the attribute tag to use for prettyPhoto hooks. default: 'rel'. For HTML5, use "data-rel" or similar. */
            animation_speed: 'fast', /* fast/slow/normal */
            ajaxcallback: function () { },
            slideshow: 5000, /* false OR interval time in ms */
            autoplay_slideshow: false, /* true/false */
            opacity: 0.80, /* Value between 0 and 1 */
            show_title: true, /* true/false */
            allow_resize: true, /* Resize the photos bigger than viewport. true/false */
            allow_expand: true, /* Allow the user to expand a resized image. true/false */
            default_width: 500,
            default_height: 344,
            counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
            theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
            horizontal_padding: 20, /* The padding on each side of the picture */
            hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
            wmode: 'opaque', /* Set the flash wmode attribute */
            autoplay: true, /* Automatically start videos: True/False */
            modal: false, /* If set to true, only the close button will close the window */
            deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
            overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            overlay_gallery_max: 30, /* Maximum number of pictures in the overlay gallery */
            keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
            changepicturecallback: function () { }, /* Called everytime an item is shown/changed */
            callback: function () { }, /* Called when prettyPhoto is closed */
            ie6_fallback: true,
            markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											<div class="pp_social">{pp_social}</div> \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
            gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: '',
            social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>' /* html or false to disable */
        }, pp_settings);

        // Global variables accessible only by prettyPhoto
        var matchedObjects = this, percentBased = false, pp_dimensions, pp_open,

		// prettyPhoto container specific
		pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth,

		// Window size
		windowHeight = $(window).height(), windowWidth = $(window).width(),

		// Global elements
		pp_slideshow;

        doresize = true, scroll_pos = _get_scroll();

        // Window/Keyboard events
        $(window).unbind('resize.prettyphoto').bind('resize.prettyphoto', function () { _center_overlay(); _resize_overlay(); });

        if (pp_settings.keyboard_shortcuts) {
            $(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto', function (e) {
                if (typeof $pp_pic_holder != 'undefined') {
                    if ($pp_pic_holder.is(':visible')) {
                        switch (e.keyCode) {
                            case 37:
                                $.prettyPhoto.changePage('previous');
                                e.preventDefault();
                                break;
                            case 39:
                                $.prettyPhoto.changePage('next');
                                e.preventDefault();
                                break;
                            case 27:
                                if (!settings.modal)
                                    $.prettyPhoto.close();
                                e.preventDefault();
                                break;
                        };
                        // return false;
                    };
                };
            });
        };

        /**
		* Initialize prettyPhoto.
		*/
        $.prettyPhoto.initialize = function () {

            settings = pp_settings;

            if (settings.theme == 'pp_default') settings.horizontal_padding = 16;

            // Find out if the picture is part of a set
            theRel = $(this).attr(settings.hook);
            galleryRegExp = /\[(?:.*)\]/;
            isSet = (galleryRegExp.exec(theRel)) ? true : false;

            // Put the SRCs, TITLEs, ALTs into an array.
            pp_images = (isSet) ? jQuery.map(matchedObjects, function (n, i) { if ($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr('href'); }) : $.makeArray($(this).attr('href'));
            pp_titles = (isSet) ? jQuery.map(matchedObjects, function (n, i) { if ($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : ""; }) : $.makeArray($(this).find('img').attr('alt'));
            pp_descriptions = (isSet) ? jQuery.map(matchedObjects, function (n, i) { if ($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).attr('title')) ? $(n).attr('title') : ""; }) : $.makeArray($(this).attr('title'));

            if (pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;

            set_position = jQuery.inArray($(this).attr('href'), pp_images); // Define where in the array the clicked item is positionned
            rel_index = (isSet) ? set_position : $("a[" + settings.hook + "^='" + theRel + "']").index($(this));

            _build_overlay(this); // Build the overlay {this} being the caller

            if (settings.allow_resize)
                $(window).bind('scroll.prettyphoto', function () { _center_overlay(); });


            $.prettyPhoto.open();

            return false;
        }


        /**
		* Opens the prettyPhoto modal box.
		* @param image {String,Array} Full path to the image to be open, can also be an array containing full images paths.
		* @param title {String,Array} The title to be displayed with the picture, can also be an array containing all the titles.
		* @param description {String,Array} The description to be displayed with the picture, can also be an array containing all the descriptions.
		*/
        $.prettyPhoto.open = function (event) {
            if (typeof settings == "undefined") { // Means it's an API call, need to manually get the settings and set the variables
                settings = pp_settings;
                pp_images = $.makeArray(arguments[0]);
                pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
                pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
                isSet = (pp_images.length > 1) ? true : false;
                set_position = (arguments[3]) ? arguments[3] : 0;
                _build_overlay(event.target); // Build the overlay {this} being the caller
            }

            if (settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility', 'hidden'); // Hide the flash

            _checkPosition($(pp_images).size()); // Hide the next/previous links if on first or last images.

            $('.pp_loaderIcon').show();

            if (settings.deeplinking)
                setHashtag();

            // Rebuild Facebook Like Button with updated href
            if (settings.social_tools) {
                facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href));
                $pp_pic_holder.find('.pp_social').html(facebook_like_link);
            }

            // Fade the content in
            if ($ppt.is(':hidden')) $ppt.css('opacity', 0).show();
            $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);

            // Display the current position
            $pp_pic_holder.find('.currentTextHolder').text((set_position + 1) + settings.counter_separator_label + $(pp_images).size());

            // Set the description
            if (typeof pp_descriptions[set_position] != 'undefined' && pp_descriptions[set_position] != "") {
                $pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
            } else {
                $pp_pic_holder.find('.pp_description').hide();
            }

            // Get the dimensions
            movie_width = (parseFloat(getParam('width', pp_images[set_position]))) ? getParam('width', pp_images[set_position]) : settings.default_width.toString();
            movie_height = (parseFloat(getParam('height', pp_images[set_position]))) ? getParam('height', pp_images[set_position]) : settings.default_height.toString();

            // If the size is % based, calculate according to window dimensions
            percentBased = false;
            if (movie_height.indexOf('%') != -1) { movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150); percentBased = true; }
            if (movie_width.indexOf('%') != -1) { movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150); percentBased = true; }

            // Fade the holder
            $pp_pic_holder.fadeIn(function () {
                // Set the title
                (settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');

                imgPreloader = "";
                skipInjection = false;

                // Inject the proper content
                switch (_getFileType(pp_images[set_position])) {
                    case 'image':
                        imgPreloader = new Image();

                        // Preload the neighbour images
                        nextImage = new Image();
                        if (isSet && set_position < $(pp_images).size() - 1) nextImage.src = pp_images[set_position + 1];
                        prevImage = new Image();
                        if (isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];

                        $pp_pic_holder.find('#pp_full_res')[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]);

                        imgPreloader.onload = function () {
                            // Fit item to viewport
                            pp_dimensions = _fitToViewport(imgPreloader.width, imgPreloader.height);

                            _showContent();
                        };

                        imgPreloader.onerror = function () {
                            alert('Image cannot be loaded. Make sure the path is correct and image exist.');
                            $.prettyPhoto.close();
                        };

                        imgPreloader.src = pp_images[set_position];
                        break;

                    case 'youtube':
                        pp_dimensions = _fitToViewport(movie_width, movie_height); // Fit item to viewport

                        // Regular youtube link
                        movie_id = getParam('v', pp_images[set_position]);

                        // youtu.be link
                        if (movie_id == "") {
                            movie_id = pp_images[set_position].split('youtu.be/');
                            movie_id = movie_id[1];
                            if (movie_id.indexOf('?') > 0)
                                movie_id = movie_id.substr(0, movie_id.indexOf('?')); // Strip anything after the ?

                            if (movie_id.indexOf('&') > 0)
                                movie_id = movie_id.substr(0, movie_id.indexOf('&')); // Strip anything after the &
                        }

                        movie = 'http://www.youtube.com/embed/' + movie_id;
                        (getParam('rel', pp_images[set_position])) ? movie += "?rel=" + getParam('rel', pp_images[set_position]) : movie += "?rel=1";

                        if (settings.autoplay) movie += "&autoplay=1";

                        toInject = settings.iframe_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                        break;

                    case 'vimeo':
                        pp_dimensions = _fitToViewport(movie_width, movie_height); // Fit item to viewport

                        movie_id = pp_images[set_position];
                        var regExp = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
                        var match = movie_id.match(regExp);

                        movie = 'http://player.vimeo.com/video/' + match[3] + '?title=0&amp;byline=0&amp;portrait=0';
                        if (settings.autoplay) movie += "&autoplay=1;";

                        vimeo_width = pp_dimensions['width'] + '/embed/?moog_width=' + pp_dimensions['width'];

                        toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, pp_dimensions['height']).replace(/{path}/g, movie);
                        break;

                    case 'quicktime':
                        pp_dimensions = _fitToViewport(movie_width, movie_height); // Fit item to viewport
                        pp_dimensions['height'] += 15; pp_dimensions['contentHeight'] += 15; pp_dimensions['containerHeight'] += 15; // Add space for the control bar

                        toInject = settings.quicktime_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                        break;

                    case 'flash':
                        pp_dimensions = _fitToViewport(movie_width, movie_height); // Fit item to viewport

                        flash_vars = pp_images[set_position];
                        flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10, pp_images[set_position].length);

                        filename = pp_images[set_position];
                        filename = filename.substring(0, filename.indexOf('?'));

                        toInject = settings.flash_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + '?' + flash_vars);
                        break;

                    case 'iframe':
                        pp_dimensions = _fitToViewport(movie_width, movie_height); // Fit item to viewport

                        frame_url = pp_images[set_position];
                        frame_url = frame_url.substr(0, frame_url.indexOf('iframe') - 1);

                        toInject = settings.iframe_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{path}/g, frame_url);
                        break;

                    case 'ajax':
                        doresize = false; // Make sure the dimensions are not resized.
                        pp_dimensions = _fitToViewport(movie_width, movie_height);
                        doresize = true; // Reset the dimensions

                        skipInjection = true;
                        $.get(pp_images[set_position], function (responseHTML) {
                            toInject = settings.inline_markup.replace(/{content}/g, responseHTML);
                            $pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
                            _showContent();
                        });

                        break;

                    case 'custom':
                        pp_dimensions = _fitToViewport(movie_width, movie_height); // Fit item to viewport

                        toInject = settings.custom_markup;
                        break;

                    case 'inline':
                        // to get the item height clone it, apply default width, wrap it in the prettyPhoto containers , then delete
                        myClone = $(pp_images[set_position]).clone().append('<br clear="all" />').css({ 'width': settings.default_width }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();
                        doresize = false; // Make sure the dimensions are not resized.
                        pp_dimensions = _fitToViewport($(myClone).width(), $(myClone).height());
                        doresize = true; // Reset the dimensions
                        $(myClone).remove();
                        toInject = settings.inline_markup.replace(/{content}/g, $(pp_images[set_position]).html());
                        break;
                };

                if (!imgPreloader && !skipInjection) {
                    $pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;

                    // Show content
                    _showContent();
                };
            });

            return false;
        };


        /**
		* Change page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
        $.prettyPhoto.changePage = function (direction) {
            currentGalleryPage = 0;

            if (direction == 'previous') {
                set_position--;
                if (set_position < 0) set_position = $(pp_images).size() - 1;
            } else if (direction == 'next') {
                set_position++;
                if (set_position > $(pp_images).size() - 1) set_position = 0;
            } else {
                set_position = direction;
            };

            rel_index = set_position;

            if (!doresize) doresize = true; // Allow the resizing of the images
            if (settings.allow_expand) {
                $('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
            }

            _hideContent(function () { $.prettyPhoto.open(); });
        };


        /**
		* Change gallery page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
        $.prettyPhoto.changeGalleryPage = function (direction) {
            if (direction == 'next') {
                currentGalleryPage++;

                if (currentGalleryPage > totalPage) currentGalleryPage = 0;
            } else if (direction == 'previous') {
                currentGalleryPage--;

                if (currentGalleryPage < 0) currentGalleryPage = totalPage;
            } else {
                currentGalleryPage = direction;
            };

            slide_speed = (direction == 'next' || direction == 'previous') ? settings.animation_speed : 0;

            slide_to = currentGalleryPage * (itemsPerPage * itemWidth);

            $pp_gallery.find('ul').animate({ left: -slide_to }, slide_speed);
        };


        /**
		* Start the slideshow...
		*/
        $.prettyPhoto.startSlideshow = function () {
            if (typeof pp_slideshow == 'undefined') {
                $pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function () {
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });
                pp_slideshow = setInterval($.prettyPhoto.startSlideshow, settings.slideshow);
            } else {
                $.prettyPhoto.changePage('next');
            };
        }


        /**
		* Stop the slideshow...
		*/
        $.prettyPhoto.stopSlideshow = function () {
            $pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function () {
                $.prettyPhoto.startSlideshow();
                return false;
            });
            clearInterval(pp_slideshow);
            pp_slideshow = undefined;
        }


        /**
		* Closes prettyPhoto.
		*/
        $.prettyPhoto.close = function () {
            if ($pp_overlay.is(":animated")) return;

            $.prettyPhoto.stopSlideshow();

            $pp_pic_holder.stop().find('object,embed').css('visibility', 'hidden');

            $('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed, function () { $(this).remove(); });

            $pp_overlay.fadeOut(settings.animation_speed, function () {

                if (settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility', 'visible'); // Show the flash

                $(this).remove(); // No more need for the prettyPhoto markup

                $(window).unbind('scroll.prettyphoto');

                clearHashtag();

                settings.callback();

                doresize = true;

                pp_open = false;

                delete settings;
            });
        };

        /**
		* Set the proper sizes on the containers and animate the content in.
		*/
        function _showContent() {
            $('.pp_loaderIcon').hide();

            // Calculate the opened top position of the pic holder
            projectedTop = scroll_pos['scrollTop'] + ((windowHeight / 2) - (pp_dimensions['containerHeight'] / 2));
            if (projectedTop < 0) projectedTop = 0;

            $ppt.fadeTo(settings.animation_speed, 1);

            // Resize the content holder
            $pp_pic_holder.find('.pp_content')
				.animate({
				    height: pp_dimensions['contentHeight'],
				    width: pp_dimensions['contentWidth']
				}, settings.animation_speed);

            // Resize picture the holder
            $pp_pic_holder.animate({
                'top': projectedTop,
                'left': ((windowWidth / 2) - (pp_dimensions['containerWidth'] / 2) < 0) ? 0 : (windowWidth / 2) - (pp_dimensions['containerWidth'] / 2),
                width: pp_dimensions['containerWidth']
            }, settings.animation_speed, function () {
                $pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);

                $pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed); // Fade the new content

                // Show the nav
                if (isSet && _getFileType(pp_images[set_position]) == "image") { $pp_pic_holder.find('.pp_hoverContainer').show(); } else { $pp_pic_holder.find('.pp_hoverContainer').hide(); }

                if (settings.allow_expand) {
                    if (pp_dimensions['resized']) { // Fade the resizing link if the image is resized
                        $('a.pp_expand,a.pp_contract').show();
                    } else {
                        $('a.pp_expand').hide();
                    }
                }

                if (settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto.startSlideshow();

                settings.changepicturecallback(); // Callback!

                pp_open = true;
            });

            _insert_gallery();
            pp_settings.ajaxcallback();
        };

        /**
		* Hide the content...DUH!
		*/
        function _hideContent(callback) {
            // Fade out the current picture
            $pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility', 'hidden');
            $pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed, function () {
                $('.pp_loaderIcon').show();

                callback();
            });
        };

        /**
		* Check the item position in the gallery array, hide or show the navigation links
		* @param setCount {integer} The total number of items in the set
		*/
        function _checkPosition(setCount) {
            (setCount > 1) ? $('.pp_nav').show() : $('.pp_nav').hide(); // Hide the bottom nav if it's not a set.
        };

        /**
		* Resize the item dimensions if it's bigger than the viewport
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		* @return An array containin the "fitted" dimensions
		*/
        function _fitToViewport(width, height) {
            resized = false;

            _getDimensions(width, height);

            // Define them in case there's no resize needed
            imageWidth = width, imageHeight = height;

            if (((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
                resized = true, fitting = false;

                while (!fitting) {
                    if ((pp_containerWidth > windowWidth)) {
                        imageWidth = (windowWidth - 200);
                        imageHeight = (height / width) * imageWidth;
                    } else if ((pp_containerHeight > windowHeight)) {
                        imageHeight = (windowHeight - 200);
                        imageWidth = (width / height) * imageHeight;
                    } else {
                        fitting = true;
                    };

                    pp_containerHeight = imageHeight, pp_containerWidth = imageWidth;
                };



                if ((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) {
                    _fitToViewport(pp_containerWidth, pp_containerHeight)
                };

                _getDimensions(imageWidth, imageHeight);
            };

            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(pp_containerHeight),
                containerWidth: Math.floor(pp_containerWidth) + (settings.horizontal_padding * 2),
                contentHeight: Math.floor(pp_contentHeight),
                contentWidth: Math.floor(pp_contentWidth),
                resized: resized
            };
        };

        /**
		* Get the containers dimensions according to the item size
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		*/
        function _getDimensions(width, height) {
            width = parseFloat(width);
            height = parseFloat(height);

            // Get the details height, to do so, I need to clone it since it's invisible
            $pp_details = $pp_pic_holder.find('.pp_details');
            $pp_details.width(width);
            detailsHeight = parseFloat($pp_details.css('marginTop')) + parseFloat($pp_details.css('marginBottom'));

            $pp_details = $pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({
                'position': 'absolute',
                'top': -10000
            });
            detailsHeight += $pp_details.height();
            detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight; // Min-height for the details
            $pp_details.remove();

            // Get the titles height, to do so, I need to clone it since it's invisible
            $pp_title = $pp_pic_holder.find('.ppt');
            $pp_title.width(width);
            titleHeight = parseFloat($pp_title.css('marginTop')) + parseFloat($pp_title.css('marginBottom'));
            $pp_title = $pp_title.clone().appendTo($('body')).css({
                'position': 'absolute',
                'top': -10000
            });
            titleHeight += $pp_title.height();
            $pp_title.remove();

            // Get the container size, to resize the holder to the right dimensions
            pp_contentHeight = height + detailsHeight;
            pp_contentWidth = width;
            pp_containerHeight = pp_contentHeight + titleHeight + $pp_pic_holder.find('.pp_top').height() + $pp_pic_holder.find('.pp_bottom').height();
            pp_containerWidth = width;
        }

        function _getFileType(itemSrc) {
            if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)) {
                return 'youtube';
            } else if (itemSrc.match(/vimeo\.com/i)) {
                return 'vimeo';
            } else if (itemSrc.match(/\b.mov\b/i)) {
                return 'quicktime';
            } else if (itemSrc.match(/\b.swf\b/i)) {
                return 'flash';
            } else if (itemSrc.match(/\biframe=true\b/i)) {
                return 'iframe';
            } else if (itemSrc.match(/\bajax=true\b/i)) {
                return 'ajax';
            } else if (itemSrc.match(/\bcustom=true\b/i)) {
                return 'custom';
            } else if (itemSrc.substr(0, 1) == '#') {
                return 'inline';
            } else {
                return 'image';
            };
        };

        function _center_overlay() {
            if (doresize && typeof $pp_pic_holder != 'undefined') {
                scroll_pos = _get_scroll();
                contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();

                projectedTop = (windowHeight / 2) + scroll_pos['scrollTop'] - (contentHeight / 2);
                if (projectedTop < 0) projectedTop = 0;

                if (contentHeight > windowHeight)
                    return;

                $pp_pic_holder.css({
                    'top': projectedTop,
                    'left': (windowWidth / 2) + scroll_pos['scrollLeft'] - (contentwidth / 2)
                });
            };
        };

        function _get_scroll() {
            if (self.pageYOffset) {
                return { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset };
            } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
                return { scrollTop: document.documentElement.scrollTop, scrollLeft: document.documentElement.scrollLeft };
            } else if (document.body) {// all other Explorers
                return { scrollTop: document.body.scrollTop, scrollLeft: document.body.scrollLeft };
            };
        };

        function _resize_overlay() {
            windowHeight = $(window).height(), windowWidth = $(window).width();

            if (typeof $pp_overlay != "undefined") $pp_overlay.height($(document).height()).width(windowWidth);
        };

        function _insert_gallery() {
            if (isSet && settings.overlay_gallery && _getFileType(pp_images[set_position]) == "image") {
                itemWidth = 52 + 5; // 52 beign the thumb width, 5 being the right margin.
                navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30; // Define the arrow width depending on the theme

                itemsPerPage = Math.floor((pp_dimensions['containerWidth'] - 100 - navWidth) / itemWidth);
                itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
                totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;

                // Hide the nav in the case there's no need for links
                if (totalPage == 0) {
                    navWidth = 0; // No nav means no width!
                    $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();
                } else {
                    $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();
                };

                galleryWidth = itemsPerPage * itemWidth;
                fullGalleryWidth = pp_images.length * itemWidth;

                // Set the proper width to the gallery items
                $pp_gallery
					.css('margin-left', -((galleryWidth / 2) + (navWidth / 2)))
					.find('div:first').width(galleryWidth + 5)
					.find('ul').width(fullGalleryWidth)
					.find('li.selected').removeClass('selected');

                goToPage = (Math.floor(set_position / itemsPerPage) < totalPage) ? Math.floor(set_position / itemsPerPage) : totalPage;

                $.prettyPhoto.changeGalleryPage(goToPage);

                $pp_gallery_li.filter(':eq(' + set_position + ')').addClass('selected');
            } else {
                $pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
                // $pp_gallery.hide();
            }
        }

        function _build_overlay(caller) {
            // Inject Social Tool markup into General markup
            if (settings.social_tools)
                facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href));

            settings.markup = settings.markup.replace('{pp_social}', '');

            $('body').append(settings.markup); // Inject the markup

            $pp_pic_holder = $('.pp_pic_holder'), $ppt = $('.ppt'), $pp_overlay = $('div.pp_overlay'); // Set my global selectors

            // Inject the inline gallery!
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0;
                toInject = "";
                for (var i = 0; i < pp_images.length; i++) {
                    if (!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
                        classname = 'default';
                        img_src = '';
                    } else {
                        classname = '';
                        img_src = pp_images[i];
                    }
                    toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
                };

                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);

                $pp_pic_holder.find('#pp_full_res').after(toInject);

                $pp_gallery = $('.pp_pic_holder .pp_gallery'), $pp_gallery_li = $pp_gallery.find('li'); // Set the gallery selectors

                $pp_gallery.find('.pp_arrow_next').click(function () {
                    $.prettyPhoto.changeGalleryPage('next');
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });

                $pp_gallery.find('.pp_arrow_previous').click(function () {
                    $.prettyPhoto.changeGalleryPage('previous');
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });

                $pp_pic_holder.find('.pp_content').hover(
					function () {
					    $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
					},
					function () {
					    $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
					});

                itemWidth = 52 + 5; // 52 beign the thumb width, 5 being the right margin.
                $pp_gallery_li.each(function (i) {
                    $(this)
						.find('a')
						.click(function () {
						    $.prettyPhoto.changePage(i);
						    $.prettyPhoto.stopSlideshow();
						    return false;
						});
                });
            };


            // Inject the play/pause if it's a slideshow
            if (settings.slideshow) {
                $pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>')
                $pp_pic_holder.find('.pp_nav .pp_play').click(function () {
                    $.prettyPhoto.startSlideshow();
                    return false;
                });
            }

            $pp_pic_holder.attr('class', 'pp_pic_holder ' + settings.theme); // Set the proper theme

            $pp_overlay
				.css({
				    'opacity': 0,
				    'height': $(document).height(),
				    'width': $(window).width()
				})
				.bind('click', function () {
				    if (!settings.modal) $.prettyPhoto.close();
				});

            $('a.pp_close').bind('click', function () { $.prettyPhoto.close(); return false; });


            if (settings.allow_expand) {
                $('a.pp_expand').bind('click', function (e) {
                    // Expand the image
                    if ($(this).hasClass('pp_expand')) {
                        $(this).removeClass('pp_expand').addClass('pp_contract');
                        doresize = false;
                    } else {
                        $(this).removeClass('pp_contract').addClass('pp_expand');
                        doresize = true;
                    };

                    _hideContent(function () { $.prettyPhoto.open(); });

                    return false;
                });
            }

            $pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click', function () {
                $.prettyPhoto.changePage('previous');
                $.prettyPhoto.stopSlideshow();
                return false;
            });

            $pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click', function () {
                $.prettyPhoto.changePage('next');
                $.prettyPhoto.stopSlideshow();
                return false;
            });

            _center_overlay(); // Center it
        };

        if (!pp_alreadyInitialized && getHashtag()) {
            pp_alreadyInitialized = true;

            // Grab the rel index to trigger the click on the correct element
            hashIndex = getHashtag();
            hashRel = hashIndex;
            hashIndex = hashIndex.substring(hashIndex.indexOf('/') + 1, hashIndex.length - 1);
            hashRel = hashRel.substring(0, hashRel.indexOf('/'));

            // Little timeout to make sure all the prettyPhoto initialize scripts has been run.
            // Useful in the event the page contain several init scripts.
            setTimeout(function () { $("a[" + pp_settings.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger('click'); }, 50);
        }

        return this.unbind('click.prettyphoto').bind('click.prettyphoto', $.prettyPhoto.initialize); // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
    };

    function getHashtag() {
        var url = location.href;
        hashtag = (url.indexOf('#prettyPhoto') !== -1) ? decodeURI(url.substring(url.indexOf('#prettyPhoto') + 1, url.length)) : false;
        if (hashtag) { hashtag = hashtag.replace(/<|>/g, ''); }
        return hashtag;
    };

    function setHashtag() {
        if (typeof theRel == 'undefined') return; // theRel is set on normal calls, it's impossible to deeplink using the API
        location.hash = theRel + '/' + rel_index + '/';
    };

    function clearHashtag() {
        if (location.href.indexOf('#prettyPhoto') !== -1) location.hash = "prettyPhoto";
    }

    function getParam(name, url) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return (results == null) ? "" : results[1];
    }

})(jQuery);

var pp_alreadyInitialized = false; // Used for the deep linking to make sure not to call the same function several times.

//=======================End PrettyPhoto


//=======================Wan Carousel
(function ($, window, document, undefined) {
    'use strict';

    var transitionEnd = (function () {
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                };
            }
        }

        return false;
    })();

    var WanCarousel = function (element, options) {
        this.defaults = {
            interval: 6000,
            speed: 500,
            callback: function (element, index) {
                return;
            }
        };
        this.options = $.extend({}, this.defaults, options);
        this.canDo = true;
        this.currentIndex = 0;
        this.carouselIntervalTimeout = undefined;
        this.element = element;
        this.imgList = element.find('.carousel-list img');
        this.imgCount = this.imgList.length || -1;
        this.imgInfo = this.imgList.map(function (index, img) {
            var itemp = $(img);
            return {
                src: itemp.attr('src') || '',
                href: itemp.parent().attr('href') || null
            };
        });
    };

    //初始化DOM
    WanCarousel.prototype.initDom = function () {
        if (this.imgCount > 0) {
            var imgSrc = this.imgInfo[0].src;
            var content = [
              '<div class="carousel-content">',
              '  <a>',
              '    <img class="item-left" src="' + imgSrc + '" alt="img">',
              '    <img class="item-middle" src="' + imgSrc + '" alt="img">',
              '    <img class="item-right" src="' + imgSrc + '" alt="img">',
              '  </a>',
              '</div>'
            ].join('');

            var direction = [
              '<div class="carousel-direction hidden">',
              '  <a href="javascript:void(0)" class="carousel-direction-left"></a>',
              '  <a href="javascript:void(0)" class="carousel-direction-right"></a>',
              '</div>'
            ].join('');

            var anchor = '';
            for (var i = 0; i < this.imgCount; i++) {
                anchor += '<a href="javascript:void(0)" data-index="' + i + '"></a>';
            }
            anchor = '<div class="carousel-anchor">' + anchor + '</div>';

            this.element.append(content);
            this.element.append(direction);
            this.element.append(anchor);
            return true;
        }
        return false;
    };

    //事件绑定
    WanCarousel.prototype.bind = function () {
        var self = this;

        self.myContent = self.element.find('.carousel-content');
        self.imgContent = self.element.find('.carousel-content img');
        self.imgContentLeft = self.element.find('.carousel-content .item-left');
        self.imgContentMiddle = self.element.find('.carousel-content .item-middle');
        self.imgContentRight = self.element.find('.carousel-content .item-right');
        self.direction = self.element.find('.carousel-direction');
        self.anchor = self.element.find('.carousel-anchor > a');

        self.element.delegate('.carousel-content', 'mouseover', function () {
            self.direction.removeClass('hidden');
        }).delegate(self.element.selector, 'mouseleave', function () {
            self.direction.addClass('hidden');
        }).delegate('.carousel-direction-left', 'click', function () {
            if (self.canDo) {
                self.start('pre');
                self.canDo = false;
            }
        }).delegate('.carousel-direction-right', 'click', function () {
            if (self.canDo) {
                self.start('next');
                self.canDo = false;
            }
        }).delegate('.carousel-anchor > a', 'click', function (event) {
            var index;
            if (self.canDo) {
                index = $(this).data('index');
                self.goTo(index);
                self.canDo = false;
            }
        });

        self.setAnchor();
    };

    //开始运行
    WanCarousel.prototype.start = function (direction) {
        var self = this;
        self.carouselIntervalTimeout && clearInterval(self.carouselIntervalTimeout);
        direction && self.carouselShow(direction);
        self.carouselIntervalTimeout = setInterval(function () {
            self.carouselShow();
        }, self.options.interval);
    };

    WanCarousel.prototype.finish = function () {
        var imgTemp = this.imgInfo[this.currentIndex];
        this.imgContentMiddle.attr('src', imgTemp.src).parent().attr('href', imgTemp.href);
        if (transitionEnd) {
            this.myContent.css({
                'transition-duration': '0ms',
                '-moz-transition-duration': '0ms',
                '-webkit-transition-duration': '0ms',
                '-o-transition-duration': '0ms',
                '-ms-transition-duration': '0ms'
            }).removeClass('cs-left cs-right');
        } else {
            this.imgContent.css({
                'right': '33.333333%'
            });
        }
        this.options.callback(this.imgList.eq(this.currentIndex), this.currentIndex);
        this.canDo = true;
    };

    WanCarousel.prototype.goTo = function (index) {
        var self = this;
        var differ = self.currentIndex - index;
        var direction;

        if (differ > 0) {
            direction = 'pre';
        } else if (differ < 0) {
            direction = 'next';
        } else {
            return;
        }

        self.carouselIntervalTimeout && clearInterval(self.carouselIntervalTimeout);
        self.carouselShow(direction, index);
        self.carouselIntervalTimeout = setInterval(function () {
            self.carouselShow();
        }, self.options.interval);
    };

    WanCarousel.prototype.carouselShow = function (direction, index) {
        var self = this;
        var imgInfo = undefined;
        var dirTemp = undefined;
        var animation = undefined;

        if (direction === 'pre') {
            self.currentIndex = index >= 0 ? index : (self.currentIndex + self.imgCount - 1) % self.imgCount;
            dirTemp = '0.000000%'; //bug in IE8, '0' is not good
            animation = 'cs-left';
            imgInfo = self.imgInfo[self.currentIndex];
            self.imgContentLeft.attr('src', imgInfo.src).parent().attr('href', imgInfo.href);
        } else {
            self.currentIndex = index >= 0 ? index : (self.currentIndex + 1) % self.imgCount;
            dirTemp = '66.666666%';
            animation = 'cs-right';
            imgInfo = self.imgInfo[self.currentIndex];
            self.imgContentRight.attr('src', imgInfo.src).parent().attr('href', imgInfo.href);
        }

        self.setAnchor();

        if (transitionEnd) {
            var speed = self.options.speed + 'ms';
            self.myContent.css({
                'transition-duration': speed,
                '-moz-transition-duration': speed,
                '-webkit-transition-duration': speed,
                '-o-transition-duration': speed,
                '-ms-transition-duration': speed
            }).addClass(animation);

            setTimeout(function () {
                $.proxy(self.finish, self)();
            }, self.options.speed);

        } else {
            self.imgContent.animate({
                'right': dirTemp
            }, self.options.speed, 'swing', function () {
                self.finish();
            });
        }
    };

    WanCarousel.prototype.setAnchor = function () {
        this.anchor.css({
            'background-color': 'white'
        });
        $(this.anchor[this.currentIndex]).css({
            'background-color': 'black'
        });
    }

    $.fn.WanCarousel = function (options) {
        this.each(function (index, element) {
            var wanCarousel = new WanCarousel($(element), options);
            if (wanCarousel.initDom()) {
                wanCarousel.bind();
                wanCarousel.start();
            }
        });
        return this;
    };

})(jQuery, window, document);
//=======================End Wan Carousel



//=======================Isotope filter
(function (window) {



    // -------------------------- utils -------------------------- //

    var slice = Array.prototype.slice;

    function noop() { }

    // -------------------------- definition -------------------------- //

    function defineBridget($) {

        // bail if no jQuery
        if (!$) {
            return;
        }

        // -------------------------- addOptionMethod -------------------------- //

        /**
         * adds option method -> $().plugin('option', {...})
         * @param {Function} PluginClass - constructor class
         */
        function addOptionMethod(PluginClass) {
            // don't overwrite original option method
            if (PluginClass.prototype.option) {
                return;
            }

            // option setter
            PluginClass.prototype.option = function (opts) {
                // bail out if not an object
                if (!$.isPlainObject(opts)) {
                    return;
                }
                this.options = $.extend(true, this.options, opts);
            };
        }

        // -------------------------- plugin bridge -------------------------- //

        // helper function for logging errors
        // $.error breaks jQuery chaining
        var logError = typeof console === 'undefined' ? noop :
          function (message) {
              console.error(message);
          };

        /**
         * jQuery plugin bridge, access methods like $elem.plugin('method')
         * @param {String} namespace - plugin name
         * @param {Function} PluginClass - constructor class
         */
        function bridge(namespace, PluginClass) {
            // add to jQuery fn namespace
            $.fn[namespace] = function (options) {
                if (typeof options === 'string') {
                    // call plugin method when first argument is a string
                    // get arguments for method
                    var args = slice.call(arguments, 1);

                    for (var i = 0, len = this.length; i < len; i++) {
                        var elem = this[i];
                        var instance = $.data(elem, namespace);
                        if (!instance) {
                            logError("cannot call methods on " + namespace + " prior to initialization; " +
                              "attempted to call '" + options + "'");
                            continue;
                        }
                        if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                            logError("no such method '" + options + "' for " + namespace + " instance");
                            continue;
                        }

                        // trigger method with arguments
                        var returnValue = instance[options].apply(instance, args);

                        // break look and return first value if provided
                        if (returnValue !== undefined) {
                            return returnValue;
                        }
                    }
                    // return this if no return value
                    return this;
                } else {
                    return this.each(function () {
                        var instance = $.data(this, namespace);
                        if (instance) {
                            // apply options & init
                            instance.option(options);
                            instance._init();
                        } else {
                            // initialize new instance
                            instance = new PluginClass(this, options);
                            $.data(this, namespace, instance);
                        }
                    });
                }
            };

        }

        // -------------------------- bridget -------------------------- //

        /**
         * converts a Prototypical class into a proper jQuery plugin
         *   the class must have a ._init method
         * @param {String} namespace - plugin name, used in $().pluginName
         * @param {Function} PluginClass - constructor class
         */
        $.bridget = function (namespace, PluginClass) {
            addOptionMethod(PluginClass);
            bridge(namespace, PluginClass);
        };

        return $.bridget;

    }

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('jquery-bridget/jquery.bridget', ['jquery'], defineBridget);
    } else if (typeof exports === 'object') {
        defineBridget(require('jquery'));
    } else {
        // get jquery from browser global
        defineBridget(window.jQuery);
    }

})(window);

(function (window) {



    var docElem = document.documentElement;

    var bind = function () { };

    function getIEEvent(obj) {
        var event = window.event;
        // add event.target
        event.target = event.target || event.srcElement || obj;
        return event;
    }

    if (docElem.addEventListener) {
        bind = function (obj, type, fn) {
            obj.addEventListener(type, fn, false);
        };
    } else if (docElem.attachEvent) {
        bind = function (obj, type, fn) {
            obj[type + fn] = fn.handleEvent ?
              function () {
                  var event = getIEEvent(obj);
                  fn.handleEvent.call(fn, event);
              } :
              function () {
                  var event = getIEEvent(obj);
                  fn.call(obj, event);
              };
            obj.attachEvent("on" + type, obj[type + fn]);
        };
    }

    var unbind = function () { };

    if (docElem.removeEventListener) {
        unbind = function (obj, type, fn) {
            obj.removeEventListener(type, fn, false);
        };
    } else if (docElem.detachEvent) {
        unbind = function (obj, type, fn) {
            obj.detachEvent("on" + type, obj[type + fn]);
            try {
                delete obj[type + fn];
            } catch (err) {
                // can't delete window object properties
                obj[type + fn] = undefined;
            }
        };
    }

    var eventie = {
        bind: bind,
        unbind: unbind
    };

    // ----- module definition ----- //

    if (typeof define === 'function' && define.amd) {
        // AMD
        define('eventie/eventie', eventie);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = eventie;
    } else {
        // browser global
        window.eventie = eventie;
    }

})(window);

; (function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() { }

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[key][i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define('eventEmitter/EventEmitter', [], function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

(function (window) {



    var prefixes = 'Webkit Moz ms Ms O'.split(' ');
    var docElemStyle = document.documentElement.style;

    function getStyleProperty(propName) {
        if (!propName) {
            return;
        }

        // test standard property first
        if (typeof docElemStyle[propName] === 'string') {
            return propName;
        }

        // capitalize
        propName = propName.charAt(0).toUpperCase() + propName.slice(1);

        // test vendor specific properties
        var prefixed;
        for (var i = 0, len = prefixes.length; i < len; i++) {
            prefixed = prefixes[i] + propName;
            if (typeof docElemStyle[prefixed] === 'string') {
                return prefixed;
            }
        }
    }

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('get-style-property/get-style-property', [], function () {
            return getStyleProperty;
        });
    } else if (typeof exports === 'object') {
        // CommonJS for Component
        module.exports = getStyleProperty;
    } else {
        // browser global
        window.getStyleProperty = getStyleProperty;
    }

})(window);

(function (window, undefined) {



    // -------------------------- helpers -------------------------- //

    // get a number from a string, not a percentage
    function getStyleSize(value) {
        var num = parseFloat(value);
        // not a percent like '100%', and a number
        var isValid = value.indexOf('%') === -1 && !isNaN(num);
        return isValid && num;
    }

    function noop() { }

    var logError = typeof console === 'undefined' ? noop :
      function (message) {
          console.error(message);
      };

    // -------------------------- measurements -------------------------- //

    var measurements = [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
      'borderBottomWidth'
    ];

    function getZeroSize() {
        var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var i = 0, len = measurements.length; i < len; i++) {
            var measurement = measurements[i];
            size[measurement] = 0;
        }
        return size;
    }



    function defineGetSize(getStyleProperty) {

        // -------------------------- setup -------------------------- //

        var isSetup = false;

        var getStyle, boxSizingProp, isBoxSizeOuter;

        /**
         * setup vars and functions
         * do it on initial getSize(), rather than on script load
         * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
         */
        function setup() {
            // setup once
            if (isSetup) {
                return;
            }
            isSetup = true;

            var getComputedStyle = window.getComputedStyle;
            getStyle = (function () {
                var getStyleFn = getComputedStyle ?
                  function (elem) {
                      return getComputedStyle(elem, null);
                  } :
                  function (elem) {
                      return elem.currentStyle;
                  };

                return function getStyle(elem) {
                    var style = getStyleFn(elem);
                    if (!style) {
                        logError('Style returned ' + style +
                          '. Are you running this code in a hidden iframe on Firefox? ' +
                          'See http://bit.ly/getsizebug1');
                    }
                    return style;
                };
            })();

            // -------------------------- box sizing -------------------------- //

            boxSizingProp = getStyleProperty('boxSizing');

            /**
             * WebKit measures the outer-width on style.width on border-box elems
             * IE & Firefox measures the inner-width
             */
            if (boxSizingProp) {
                var div = document.createElement('div');
                div.style.width = '200px';
                div.style.padding = '1px 2px 3px 4px';
                div.style.borderStyle = 'solid';
                div.style.borderWidth = '1px 2px 3px 4px';
                div.style[boxSizingProp] = 'border-box';

                var body = document.body || document.documentElement;
                body.appendChild(div);
                var style = getStyle(div);

                isBoxSizeOuter = getStyleSize(style.width) === 200;
                body.removeChild(div);
            }

        }

        // -------------------------- getSize -------------------------- //

        function getSize(elem) {
            setup();

            // use querySeletor if elem is string
            if (typeof elem === 'string') {
                elem = document.querySelector(elem);
            }

            // do not proceed on non-objects
            if (!elem || typeof elem !== 'object' || !elem.nodeType) {
                return;
            }

            var style = getStyle(elem);

            // if hidden, everything is 0
            if (style.display === 'none') {
                return getZeroSize();
            }

            var size = {};
            size.width = elem.offsetWidth;
            size.height = elem.offsetHeight;

            var isBorderBox = size.isBorderBox = !!(boxSizingProp &&
              style[boxSizingProp] && style[boxSizingProp] === 'border-box');

            // get all measurements
            for (var i = 0, len = measurements.length; i < len; i++) {
                var measurement = measurements[i];
                var value = style[measurement];
                value = mungeNonPixel(elem, value);
                var num = parseFloat(value);
                // any 'auto', 'medium' value will be 0
                size[measurement] = !isNaN(num) ? num : 0;
            }

            var paddingWidth = size.paddingLeft + size.paddingRight;
            var paddingHeight = size.paddingTop + size.paddingBottom;
            var marginWidth = size.marginLeft + size.marginRight;
            var marginHeight = size.marginTop + size.marginBottom;
            var borderWidth = size.borderLeftWidth + size.borderRightWidth;
            var borderHeight = size.borderTopWidth + size.borderBottomWidth;

            var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

            // overwrite width and height if we can get it from style
            var styleWidth = getStyleSize(style.width);
            if (styleWidth !== false) {
                size.width = styleWidth +
                  // add padding and border unless it's already including it
                  (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
            }

            var styleHeight = getStyleSize(style.height);
            if (styleHeight !== false) {
                size.height = styleHeight +
                  // add padding and border unless it's already including it
                  (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
            }

            size.innerWidth = size.width - (paddingWidth + borderWidth);
            size.innerHeight = size.height - (paddingHeight + borderHeight);

            size.outerWidth = size.width + marginWidth;
            size.outerHeight = size.height + marginHeight;

            return size;
        }

        // IE8 returns percent values, not pixels
        // taken from jQuery's curCSS
        function mungeNonPixel(elem, value) {
            // IE8 and has percent value
            if (window.getComputedStyle || value.indexOf('%') === -1) {
                return value;
            }
            var style = elem.style;
            // Remember the original values
            var left = style.left;
            var rs = elem.runtimeStyle;
            var rsLeft = rs && rs.left;

            // Put in the new values to get a computed value out
            if (rsLeft) {
                rs.left = elem.currentStyle.left;
            }
            style.left = value;
            value = style.pixelLeft;

            // Revert the changed values
            style.left = left;
            if (rsLeft) {
                rs.left = rsLeft;
            }

            return value;
        }

        return getSize;

    }

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD for RequireJS
        define('get-size/get-size', ['get-style-property/get-style-property'], defineGetSize);
    } else if (typeof exports === 'object') {
        // CommonJS for Component
        module.exports = defineGetSize(require('desandro-get-style-property'));
    } else {
        // browser global
        window.getSize = defineGetSize(window.getStyleProperty);
    }

})(window);

(function (window) {



    var document = window.document;
    // collection of functions to be triggered on ready
    var queue = [];

    function docReady(fn) {
        // throw out non-functions
        if (typeof fn !== 'function') {
            return;
        }

        if (docReady.isReady) {
            // ready now, hit it
            fn();
        } else {
            // queue function when ready
            queue.push(fn);
        }
    }

    docReady.isReady = false;

    // triggered on various doc ready events
    function onReady(event) {
        // bail if already triggered or IE8 document is not ready just yet
        var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
        if (docReady.isReady || isIE8NotReady) {
            return;
        }

        trigger();
    }

    function trigger() {
        docReady.isReady = true;
        // process queue
        for (var i = 0, len = queue.length; i < len; i++) {
            var fn = queue[i];
            fn();
        }
    }

    function defineDocReady(eventie) {
        // trigger ready if page is ready
        if (document.readyState === 'complete') {
            trigger();
        } else {
            // listen for events
            eventie.bind(document, 'DOMContentLoaded', onReady);
            eventie.bind(document, 'readystatechange', onReady);
            eventie.bind(window, 'load', onReady);
        }

        return docReady;
    }

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('doc-ready/doc-ready', ['eventie/eventie'], defineDocReady);
    } else if (typeof exports === 'object') {
        module.exports = defineDocReady(require('eventie'));
    } else {
        // browser global
        window.docReady = defineDocReady(window.eventie);
    }

})(window);

(function (ElemProto) {

    'use strict';

    var matchesMethod = (function () {
        // check for the standard method name first
        if (ElemProto.matches) {
            return 'matches';
        }
        // check un-prefixed
        if (ElemProto.matchesSelector) {
            return 'matchesSelector';
        }
        // check vendor prefixes
        var prefixes = ['webkit', 'moz', 'ms', 'o'];

        for (var i = 0, len = prefixes.length; i < len; i++) {
            var prefix = prefixes[i];
            var method = prefix + 'MatchesSelector';
            if (ElemProto[method]) {
                return method;
            }
        }
    })();

    // ----- match ----- //

    function match(elem, selector) {
        return elem[matchesMethod](selector);
    }

    // ----- appendToFragment ----- //

    function checkParent(elem) {
        // not needed if already has parent
        if (elem.parentNode) {
            return;
        }
        var fragment = document.createDocumentFragment();
        fragment.appendChild(elem);
    }

    // ----- query ----- //

    // fall back to using QSA
    // thx @jonathantneal https://gist.github.com/3062955
    function query(elem, selector) {
        // append to fragment if no parent
        checkParent(elem);

        // match elem with all selected elems of parent
        var elems = elem.parentNode.querySelectorAll(selector);
        for (var i = 0, len = elems.length; i < len; i++) {
            // return true if match
            if (elems[i] === elem) {
                return true;
            }
        }
        // otherwise return false
        return false;
    }

    // ----- matchChild ----- //

    function matchChild(elem, selector) {
        checkParent(elem);
        return match(elem, selector);
    }

    // ----- matchesSelector ----- //

    var matchesSelector;

    if (matchesMethod) {
        // IE9 supports matchesSelector, but doesn't work on orphaned elems
        // check for that
        var div = document.createElement('div');
        var supportsOrphans = match(div, 'div');
        matchesSelector = supportsOrphans ? match : matchChild;
    } else {
        matchesSelector = query;
    }

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('matches-selector/matches-selector', [], function () {
            return matchesSelector;
        });
    } else if (typeof exports === 'object') {
        module.exports = matchesSelector;
    }
    else {
        // browser global
        window.matchesSelector = matchesSelector;
    }

})(Element.prototype);

(function (window, factory) {
    /*global define: false, module: false, require: false */
    'use strict';
    // universal module definition

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('fizzy-ui-utils/utils', [
          'doc-ready/doc-ready',
          'matches-selector/matches-selector'
        ], function (docReady, matchesSelector) {
            return factory(window, docReady, matchesSelector);
        });
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          window,
          require('doc-ready'),
          require('desandro-matches-selector')
        );
    } else {
        // browser global
        window.fizzyUIUtils = factory(
          window,
          window.docReady,
          window.matchesSelector
        );
    }

}(window, function factory(window, docReady, matchesSelector) {



    var utils = {};

    // ----- extend ----- //

    // extends objects
    utils.extend = function (a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    };

    // ----- modulo ----- //

    utils.modulo = function (num, div) {
        return ((num % div) + div) % div;
    };

    // ----- isArray ----- //

    var objToString = Object.prototype.toString;
    utils.isArray = function (obj) {
        return objToString.call(obj) == '[object Array]';
    };

    // ----- makeArray ----- //

    // turn element or nodeList into an array
    utils.makeArray = function (obj) {
        var ary = [];
        if (utils.isArray(obj)) {
            // use object if already an array
            ary = obj;
        } else if (obj && typeof obj.length == 'number') {
            // convert nodeList to array
            for (var i = 0, len = obj.length; i < len; i++) {
                ary.push(obj[i]);
            }
        } else {
            // array of single index
            ary.push(obj);
        }
        return ary;
    };

    // ----- indexOf ----- //

    // index of helper cause IE8
    utils.indexOf = Array.prototype.indexOf ? function (ary, obj) {
        return ary.indexOf(obj);
    } : function (ary, obj) {
        for (var i = 0, len = ary.length; i < len; i++) {
            if (ary[i] === obj) {
                return i;
            }
        }
        return -1;
    };

    // ----- removeFrom ----- //

    utils.removeFrom = function (ary, obj) {
        var index = utils.indexOf(ary, obj);
        if (index != -1) {
            ary.splice(index, 1);
        }
    };

    // ----- isElement ----- //

    // http://stackoverflow.com/a/384380/182183
    utils.isElement = (typeof HTMLElement == 'function' || typeof HTMLElement == 'object') ?
      function isElementDOM2(obj) {
          return obj instanceof HTMLElement;
      } :
      function isElementQuirky(obj) {
          return obj && typeof obj == 'object' &&
            obj.nodeType == 1 && typeof obj.nodeName == 'string';
      };

    // ----- setText ----- //

    utils.setText = (function () {
        var setTextProperty;
        function setText(elem, text) {
            // only check setTextProperty once
            setTextProperty = setTextProperty || (document.documentElement.textContent !== undefined ? 'textContent' : 'innerText');
            elem[setTextProperty] = text;
        }
        return setText;
    })();

    // ----- getParent ----- //

    utils.getParent = function (elem, selector) {
        while (elem != document.body) {
            elem = elem.parentNode;
            if (matchesSelector(elem, selector)) {
                return elem;
            }
        }
    };

    // ----- getQueryElement ----- //

    // use element as selector string
    utils.getQueryElement = function (elem) {
        if (typeof elem == 'string') {
            return document.querySelector(elem);
        }
        return elem;
    };

    // ----- handleEvent ----- //

    // enable .ontype to trigger from .addEventListener( elem, 'type' )
    utils.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    // ----- filterFindElements ----- //

    utils.filterFindElements = function (elems, selector) {
        // make array of elems
        elems = utils.makeArray(elems);
        var ffElems = [];

        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            // check that elem is an actual element
            if (!utils.isElement(elem)) {
                continue;
            }
            // filter & find items if we have a selector
            if (selector) {
                // filter siblings
                if (matchesSelector(elem, selector)) {
                    ffElems.push(elem);
                }
                // find children
                var childElems = elem.querySelectorAll(selector);
                // concat childElems to filterFound array
                for (var j = 0, jLen = childElems.length; j < jLen; j++) {
                    ffElems.push(childElems[j]);
                }
            } else {
                ffElems.push(elem);
            }
        }

        return ffElems;
    };

    // ----- debounceMethod ----- //

    utils.debounceMethod = function (_class, methodName, threshold) {
        // original method
        var method = _class.prototype[methodName];
        var timeoutName = methodName + 'Timeout';

        _class.prototype[methodName] = function () {
            var timeout = this[timeoutName];
            if (timeout) {
                clearTimeout(timeout);
            }
            var args = arguments;

            var _this = this;
            this[timeoutName] = setTimeout(function () {
                method.apply(_this, args);
                delete _this[timeoutName];
            }, threshold || 100);
        };
    };

    // ----- htmlInit ----- //

    // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
    utils.toDashed = function (str) {
        return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
            return $1 + '-' + $2;
        }).toLowerCase();
    };

    var console = window.console;
    /**
     * allow user to initialize classes via .js-namespace class
     * htmlInit( Widget, 'widgetName' )
     * options are parsed from data-namespace-option attribute
     */
    utils.htmlInit = function (WidgetClass, namespace) {
        docReady(function () {
            var dashedNamespace = utils.toDashed(namespace);
            var elems = document.querySelectorAll('.js-' + dashedNamespace);
            var dataAttr = 'data-' + dashedNamespace + '-options';

            for (var i = 0, len = elems.length; i < len; i++) {
                var elem = elems[i];
                var attr = elem.getAttribute(dataAttr);
                var options;
                try {
                    options = attr && JSON.parse(attr);
                } catch (error) {
                    // log error, do not initialize
                    if (console) {
                        console.error('Error parsing ' + dataAttr + ' on ' +
                          elem.nodeName.toLowerCase() + (elem.id ? '#' + elem.id : '') + ': ' +
                          error);
                    }
                    continue;
                }
                // initialize
                var instance = new WidgetClass(elem, options);
                // make available via $().data('layoutname')
                var jQuery = window.jQuery;
                if (jQuery) {
                    jQuery.data(elem, namespace, instance);
                }
            }
        });
    };

    // -----  ----- //

    return utils;

}));

(function (window, factory) {
    'use strict';
    // universal module definition
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('outlayer/item', [
            'eventEmitter/EventEmitter',
            'get-size/get-size',
            'get-style-property/get-style-property',
            'fizzy-ui-utils/utils'
        ],
          function (EventEmitter, getSize, getStyleProperty, utils) {
              return factory(window, EventEmitter, getSize, getStyleProperty, utils);
          }
        );
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(
          window,
          require('wolfy87-eventemitter'),
          require('get-size'),
          require('desandro-get-style-property'),
          require('fizzy-ui-utils')
        );
    } else {
        // browser global
        window.Outlayer = {};
        window.Outlayer.Item = factory(
          window,
          window.EventEmitter,
          window.getSize,
          window.getStyleProperty,
          window.fizzyUIUtils
        );
    }

}(window, function factory(window, EventEmitter, getSize, getStyleProperty, utils) {
    'use strict';

    // ----- helpers ----- //

    var getComputedStyle = window.getComputedStyle;
    var getStyle = getComputedStyle ?
      function (elem) {
          return getComputedStyle(elem, null);
      } :
      function (elem) {
          return elem.currentStyle;
      };


    function isEmptyObj(obj) {
        for (var prop in obj) {
            return false;
        }
        prop = null;
        return true;
    }

    // -------------------------- CSS3 support -------------------------- //

    var transitionProperty = getStyleProperty('transition');
    var transformProperty = getStyleProperty('transform');
    var supportsCSS3 = transitionProperty && transformProperty;
    var is3d = !!getStyleProperty('perspective');

    var transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'otransitionend',
        transition: 'transitionend'
    }[transitionProperty];

    // properties that could have vendor prefix
    var prefixableProperties = [
      'transform',
      'transition',
      'transitionDuration',
      'transitionProperty'
    ];

    // cache all vendor properties
    var vendorProperties = (function () {
        var cache = {};
        for (var i = 0, len = prefixableProperties.length; i < len; i++) {
            var prop = prefixableProperties[i];
            var supportedProp = getStyleProperty(prop);
            if (supportedProp && supportedProp !== prop) {
                cache[prop] = supportedProp;
            }
        }
        return cache;
    })();

    // -------------------------- Item -------------------------- //

    function Item(element, layout) {
        if (!element) {
            return;
        }

        this.element = element;
        // parent layout class, i.e. Masonry, Isotope, or Packery
        this.layout = layout;
        this.position = {
            x: 0,
            y: 0
        };

        this._create();
    }

    // inherit EventEmitter
    utils.extend(Item.prototype, EventEmitter.prototype);

    Item.prototype._create = function () {
        // transition objects
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        };

        this.css({
            position: 'absolute'
        });
    };

    // trigger specified handler for event type
    Item.prototype.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    Item.prototype.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * apply CSS styles to element
     * @param {Object} style
     */
    Item.prototype.css = function (style) {
        var elemStyle = this.element.style;

        for (var prop in style) {
            // use vendor property if available
            var supportedProp = vendorProperties[prop] || prop;
            elemStyle[supportedProp] = style[prop];
        }
    };

    // measure position, and sets it
    Item.prototype.getPosition = function () {
        var style = getStyle(this.element);
        var layoutOptions = this.layout.options;
        var isOriginLeft = layoutOptions.isOriginLeft;
        var isOriginTop = layoutOptions.isOriginTop;
        var xValue = style[isOriginLeft ? 'left' : 'right'];
        var yValue = style[isOriginTop ? 'top' : 'bottom'];
        // convert percent to pixels
        var layoutSize = this.layout.size;
        var x = xValue.indexOf('%') != -1 ?
          (parseFloat(xValue) / 100) * layoutSize.width : parseInt(xValue, 10);
        var y = yValue.indexOf('%') != -1 ?
          (parseFloat(yValue) / 100) * layoutSize.height : parseInt(yValue, 10);

        // clean up 'auto' or other non-integer values
        x = isNaN(x) ? 0 : x;
        y = isNaN(y) ? 0 : y;
        // remove padding from measurement
        x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
        y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

        this.position.x = x;
        this.position.y = y;
    };

    // set settled position, apply padding
    Item.prototype.layoutPosition = function () {
        var layoutSize = this.layout.size;
        var layoutOptions = this.layout.options;
        var style = {};

        // x
        var xPadding = layoutOptions.isOriginLeft ? 'paddingLeft' : 'paddingRight';
        var xProperty = layoutOptions.isOriginLeft ? 'left' : 'right';
        var xResetProperty = layoutOptions.isOriginLeft ? 'right' : 'left';

        var x = this.position.x + layoutSize[xPadding];
        // set in percentage or pixels
        style[xProperty] = this.getXValue(x);
        // reset other property
        style[xResetProperty] = '';

        // y
        var yPadding = layoutOptions.isOriginTop ? 'paddingTop' : 'paddingBottom';
        var yProperty = layoutOptions.isOriginTop ? 'top' : 'bottom';
        var yResetProperty = layoutOptions.isOriginTop ? 'bottom' : 'top';

        var y = this.position.y + layoutSize[yPadding];
        // set in percentage or pixels
        style[yProperty] = this.getYValue(y);
        // reset other property
        style[yResetProperty] = '';

        this.css(style);
        this.emitEvent('layout', [this]);
    };

    Item.prototype.getXValue = function (x) {
        var layoutOptions = this.layout.options;
        return layoutOptions.percentPosition && !layoutOptions.isHorizontal ?
          ((x / this.layout.size.width) * 100) + '%' : x + 'px';
    };

    Item.prototype.getYValue = function (y) {
        var layoutOptions = this.layout.options;
        return layoutOptions.percentPosition && layoutOptions.isHorizontal ?
          ((y / this.layout.size.height) * 100) + '%' : y + 'px';
    };


    Item.prototype._transitionTo = function (x, y) {
        this.getPosition();
        // get current x & y from top/left
        var curX = this.position.x;
        var curY = this.position.y;

        var compareX = parseInt(x, 10);
        var compareY = parseInt(y, 10);
        var didNotMove = compareX === this.position.x && compareY === this.position.y;

        // save end position
        this.setPosition(x, y);

        // if did not move and not transitioning, just go to layout
        if (didNotMove && !this.isTransitioning) {
            this.layoutPosition();
            return;
        }

        var transX = x - curX;
        var transY = y - curY;
        var transitionStyle = {};
        transitionStyle.transform = this.getTranslate(transX, transY);

        this.transition({
            to: transitionStyle,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: true
        });
    };

    Item.prototype.getTranslate = function (x, y) {
        // flip cooridinates if origin on right or bottom
        var layoutOptions = this.layout.options;
        x = layoutOptions.isOriginLeft ? x : -x;
        y = layoutOptions.isOriginTop ? y : -y;

        if (is3d) {
            return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
        }

        return 'translate(' + x + 'px, ' + y + 'px)';
    };

    // non transition + transform support
    Item.prototype.goTo = function (x, y) {
        this.setPosition(x, y);
        this.layoutPosition();
    };

    // use transition and transforms if supported
    Item.prototype.moveTo = supportsCSS3 ?
      Item.prototype._transitionTo : Item.prototype.goTo;

    Item.prototype.setPosition = function (x, y) {
        this.position.x = parseInt(x, 10);
        this.position.y = parseInt(y, 10);
    };

    // ----- transition ----- //

    /**
     * @param {Object} style - CSS
     * @param {Function} onTransitionEnd
     */

    // non transition, just trigger callback
    Item.prototype._nonTransition = function (args) {
        this.css(args.to);
        if (args.isCleaning) {
            this._removeStyles(args.to);
        }
        for (var prop in args.onTransitionEnd) {
            args.onTransitionEnd[prop].call(this);
        }
    };

    /**
     * proper transition
     * @param {Object} args - arguments
     *   @param {Object} to - style to transition to
     *   @param {Object} from - style to start transition from
     *   @param {Boolean} isCleaning - removes transition styles after transition
     *   @param {Function} onTransitionEnd - callback
     */
    Item.prototype._transition = function (args) {
        // redirect to nonTransition if no transition duration
        if (!parseFloat(this.layout.options.transitionDuration)) {
            this._nonTransition(args);
            return;
        }

        var _transition = this._transn;
        // keep track of onTransitionEnd callback by css property
        for (var prop in args.onTransitionEnd) {
            _transition.onEnd[prop] = args.onTransitionEnd[prop];
        }
        // keep track of properties that are transitioning
        for (prop in args.to) {
            _transition.ingProperties[prop] = true;
            // keep track of properties to clean up when transition is done
            if (args.isCleaning) {
                _transition.clean[prop] = true;
            }
        }

        // set from styles
        if (args.from) {
            this.css(args.from);
            // force redraw. http://blog.alexmaccaw.com/css-transitions
            var h = this.element.offsetHeight;
            // hack for JSHint to hush about unused var
            h = null;
        }
        // enable transition
        this.enableTransition(args.to);
        // set styles that are transitioning
        this.css(args.to);

        this.isTransitioning = true;

    };

    // dash before all cap letters, including first for
    // WebkitTransform => -webkit-transform
    function toDashedAll(str) {
        return str.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    }

    var transitionProps = 'opacity,' +
      toDashedAll(vendorProperties.transform || 'transform');

    Item.prototype.enableTransition = function (/* style */) {
        // HACK changing transitionProperty during a transition
        // will cause transition to jump
        if (this.isTransitioning) {
            return;
        }

        // make `transition: foo, bar, baz` from style object
        // HACK un-comment this when enableTransition can work
        // while a transition is happening
        // var transitionValues = [];
        // for ( var prop in style ) {
        //   // dash-ify camelCased properties like WebkitTransition
        //   prop = vendorProperties[ prop ] || prop;
        //   transitionValues.push( toDashedAll( prop ) );
        // }
        // enable transition styles
        this.css({
            transitionProperty: transitionProps,
            transitionDuration: this.layout.options.transitionDuration
        });
        // listen for transition end event
        this.element.addEventListener(transitionEndEvent, this, false);
    };

    Item.prototype.transition = Item.prototype[transitionProperty ? '_transition' : '_nonTransition'];

    // ----- events ----- //

    Item.prototype.onwebkitTransitionEnd = function (event) {
        this.ontransitionend(event);
    };

    Item.prototype.onotransitionend = function (event) {
        this.ontransitionend(event);
    };

    // properties that I munge to make my life easier
    var dashedVendorProperties = {
        '-webkit-transform': 'transform',
        '-moz-transform': 'transform',
        '-o-transform': 'transform'
    };

    Item.prototype.ontransitionend = function (event) {
        // disregard bubbled events from children
        if (event.target !== this.element) {
            return;
        }
        var _transition = this._transn;
        // get property name of transitioned property, convert to prefix-free
        var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;

        // remove property that has completed transitioning
        delete _transition.ingProperties[propertyName];
        // check if any properties are still transitioning
        if (isEmptyObj(_transition.ingProperties)) {
            // all properties have completed transitioning
            this.disableTransition();
        }
        // clean style
        if (propertyName in _transition.clean) {
            // clean up style
            this.element.style[event.propertyName] = '';
            delete _transition.clean[propertyName];
        }
        // trigger onTransitionEnd callback
        if (propertyName in _transition.onEnd) {
            var onTransitionEnd = _transition.onEnd[propertyName];
            onTransitionEnd.call(this);
            delete _transition.onEnd[propertyName];
        }

        this.emitEvent('transitionEnd', [this]);
    };

    Item.prototype.disableTransition = function () {
        this.removeTransitionStyles();
        this.element.removeEventListener(transitionEndEvent, this, false);
        this.isTransitioning = false;
    };

    /**
     * removes style property from element
     * @param {Object} style
    **/
    Item.prototype._removeStyles = function (style) {
        // clean up transition styles
        var cleanStyle = {};
        for (var prop in style) {
            cleanStyle[prop] = '';
        }
        this.css(cleanStyle);
    };

    var cleanTransitionStyle = {
        transitionProperty: '',
        transitionDuration: ''
    };

    Item.prototype.removeTransitionStyles = function () {
        // remove transition
        this.css(cleanTransitionStyle);
    };

    // ----- show/hide/remove ----- //

    // remove element from DOM
    Item.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element);
        // remove display: none
        this.css({ display: '' });
        this.emitEvent('remove', [this]);
    };

    Item.prototype.remove = function () {
        // just remove element if no transition support or no transition
        if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
            this.removeElem();
            return;
        }

        // start transition
        var _this = this;
        this.once('transitionEnd', function () {
            _this.removeElem();
        });
        this.hide();
    };

    Item.prototype.reveal = function () {
        delete this.isHidden;
        // remove display: none
        this.css({ display: '' });

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
        onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;

        this.transition({
            from: options.hiddenStyle,
            to: options.visibleStyle,
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    Item.prototype.onRevealTransitionEnd = function () {
        // check if still visible
        // during transition, item may have been hidden
        if (!this.isHidden) {
            this.emitEvent('reveal');
        }
    };

    /**
     * get style property use for hide/reveal transition end
     * @param {String} styleProperty - hiddenStyle/visibleStyle
     * @returns {String}
     */
    Item.prototype.getHideRevealTransitionEndProperty = function (styleProperty) {
        var optionStyle = this.layout.options[styleProperty];
        // use opacity
        if (optionStyle.opacity) {
            return 'opacity';
        }
        // get first property
        for (var prop in optionStyle) {
            return prop;
        }
    };

    Item.prototype.hide = function () {
        // set flag
        this.isHidden = true;
        // remove display: none
        this.css({ display: '' });

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
        onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;

        this.transition({
            from: options.visibleStyle,
            to: options.hiddenStyle,
            // keep hidden stuff hidden
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    Item.prototype.onHideTransitionEnd = function () {
        // check if still hidden
        // during transition, item may have been un-hidden
        if (this.isHidden) {
            this.css({ display: 'none' });
            this.emitEvent('hide');
        }
    };

    Item.prototype.destroy = function () {
        this.css({
            position: '',
            left: '',
            right: '',
            top: '',
            bottom: '',
            transition: '',
            transform: ''
        });
    };

    return Item;

}));

(function (window, factory) {
    'use strict';
    // universal module definition

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('outlayer/outlayer', [
            'eventie/eventie',
            'eventEmitter/EventEmitter',
            'get-size/get-size',
            'fizzy-ui-utils/utils',
            './item'
        ],
          function (eventie, EventEmitter, getSize, utils, Item) {
              return factory(window, eventie, EventEmitter, getSize, utils, Item);
          }
        );
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          window,
          require('eventie'),
          require('wolfy87-eventemitter'),
          require('get-size'),
          require('fizzy-ui-utils'),
          require('./item')
        );
    } else {
        // browser global
        window.Outlayer = factory(
          window,
          window.eventie,
          window.EventEmitter,
          window.getSize,
          window.fizzyUIUtils,
          window.Outlayer.Item
        );
    }

}(window, function factory(window, eventie, EventEmitter, getSize, utils, Item) {
    'use strict';

    // ----- vars ----- //

    var console = window.console;
    var jQuery = window.jQuery;
    var noop = function () { };

    // -------------------------- Outlayer -------------------------- //

    // globally unique identifiers
    var GUID = 0;
    // internal store of all Outlayer intances
    var instances = {};


    /**
     * @param {Element, String} element
     * @param {Object} options
     * @constructor
     */
    function Outlayer(element, options) {
        var queryElement = utils.getQueryElement(element);
        if (!queryElement) {
            if (console) {
                console.error('Bad element for ' + this.constructor.namespace +
                  ': ' + (queryElement || element));
            }
            return;
        }
        this.element = queryElement;
        // add jQuery
        if (jQuery) {
            this.$element = jQuery(this.element);
        }

        // options
        this.options = utils.extend({}, this.constructor.defaults);
        this.option(options);

        // add id for Outlayer.getFromElement
        var id = ++GUID;
        this.element.outlayerGUID = id; // expando
        instances[id] = this; // associate via id

        // kick it off
        this._create();

        if (this.options.isInitLayout) {
            this.layout();
        }
    }

    // settings are for internal use only
    Outlayer.namespace = 'outlayer';
    Outlayer.Item = Item;

    // default options
    Outlayer.defaults = {
        containerStyle: {
            position: 'relative'
        },
        isInitLayout: true,
        isOriginLeft: true,
        isOriginTop: true,
        isResizeBound: true,
        isResizingContainer: true,
        // item options
        transitionDuration: '0.4s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        }
    };

    // inherit EventEmitter
    utils.extend(Outlayer.prototype, EventEmitter.prototype);

    /**
     * set options
     * @param {Object} opts
     */
    Outlayer.prototype.option = function (opts) {
        utils.extend(this.options, opts);
    };

    Outlayer.prototype._create = function () {
        // get items from children
        this.reloadItems();
        // elements that affect layout, but are not laid out
        this.stamps = [];
        this.stamp(this.options.stamp);
        // set container style
        utils.extend(this.element.style, this.options.containerStyle);

        // bind resize method
        if (this.options.isResizeBound) {
            this.bindResize();
        }
    };

    // goes through all children again and gets bricks in proper order
    Outlayer.prototype.reloadItems = function () {
        // collection of item elements
        this.items = this._itemize(this.element.children);
    };


    /**
     * turn elements into Outlayer.Items to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - collection of new Outlayer Items
     */
    Outlayer.prototype._itemize = function (elems) {

        var itemElems = this._filterFindItemElements(elems);
        var Item = this.constructor.Item;

        // create new Outlayer Items for collection
        var items = [];
        for (var i = 0, len = itemElems.length; i < len; i++) {
            var elem = itemElems[i];
            var item = new Item(elem, this);
            items.push(item);
        }

        return items;
    };

    /**
     * get item elements to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - item elements
     */
    Outlayer.prototype._filterFindItemElements = function (elems) {
        return utils.filterFindElements(elems, this.options.itemSelector);
    };

    /**
     * getter method for getting item elements
     * @returns {Array} elems - collection of item elements
     */
    Outlayer.prototype.getItemElements = function () {
        var elems = [];
        for (var i = 0, len = this.items.length; i < len; i++) {
            elems.push(this.items[i].element);
        }
        return elems;
    };

    // ----- init & layout ----- //

    /**
     * lays out all items
     */
    Outlayer.prototype.layout = function () {
        this._resetLayout();
        this._manageStamps();

        // don't animate first layout
        var isInstant = this.options.isLayoutInstant !== undefined ?
          this.options.isLayoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, isInstant);

        // flag for initalized
        this._isLayoutInited = true;
    };

    // _init is alias for layout
    Outlayer.prototype._init = Outlayer.prototype.layout;

    /**
     * logic before any new layout
     */
    Outlayer.prototype._resetLayout = function () {
        this.getSize();
    };


    Outlayer.prototype.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * get measurement from option, for columnWidth, rowHeight, gutter
     * if option is String -> get element from selector string, & get size of element
     * if option is Element -> get size of element
     * else use option as a number
     *
     * @param {String} measurement
     * @param {String} size - width or height
     * @private
     */
    Outlayer.prototype._getMeasurement = function (measurement, size) {
        var option = this.options[measurement];
        var elem;
        if (!option) {
            // default to 0
            this[measurement] = 0;
        } else {
            // use option as an element
            if (typeof option === 'string') {
                elem = this.element.querySelector(option);
            } else if (utils.isElement(option)) {
                elem = option;
            }
            // use size of element, if element
            this[measurement] = elem ? getSize(elem)[size] : option;
        }
    };

    /**
     * layout a collection of item elements
     * @api public
     */
    Outlayer.prototype.layoutItems = function (items, isInstant) {
        items = this._getItemsForLayout(items);

        this._layoutItems(items, isInstant);

        this._postLayout();
    };

    /**
     * get the items to be laid out
     * you may want to skip over some items
     * @param {Array} items
     * @returns {Array} items
     */
    Outlayer.prototype._getItemsForLayout = function (items) {
        var layoutItems = [];
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            if (!item.isIgnored) {
                layoutItems.push(item);
            }
        }
        return layoutItems;
    };

    /**
     * layout items
     * @param {Array} items
     * @param {Boolean} isInstant
     */
    Outlayer.prototype._layoutItems = function (items, isInstant) {
        this._emitCompleteOnItems('layout', items);

        if (!items || !items.length) {
            // no items, emit event with empty array
            return;
        }

        var queue = [];

        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            // get x/y object from method
            var position = this._getItemLayoutPosition(item);
            // enqueue
            position.item = item;
            position.isInstant = isInstant || item.isLayoutInstant;
            queue.push(position);
        }

        this._processLayoutQueue(queue);
    };

    /**
     * get item layout position
     * @param {Outlayer.Item} item
     * @returns {Object} x and y position
     */
    Outlayer.prototype._getItemLayoutPosition = function ( /* item */) {
        return {
            x: 0,
            y: 0
        };
    };

    /**
     * iterate over array and position each item
     * Reason being - separating this logic prevents 'layout invalidation'
     * thx @paul_irish
     * @param {Array} queue
     */
    Outlayer.prototype._processLayoutQueue = function (queue) {
        for (var i = 0, len = queue.length; i < len; i++) {
            var obj = queue[i];
            this._positionItem(obj.item, obj.x, obj.y, obj.isInstant);
        }
    };

    /**
     * Sets position of item in DOM
     * @param {Outlayer.Item} item
     * @param {Number} x - horizontal position
     * @param {Number} y - vertical position
     * @param {Boolean} isInstant - disables transitions
     */
    Outlayer.prototype._positionItem = function (item, x, y, isInstant) {
        if (isInstant) {
            // if not transition, just set CSS
            item.goTo(x, y);
        } else {
            item.moveTo(x, y);
        }
    };

    /**
     * Any logic you want to do after each layout,
     * i.e. size the container
     */
    Outlayer.prototype._postLayout = function () {
        this.resizeContainer();
    };

    Outlayer.prototype.resizeContainer = function () {
        if (!this.options.isResizingContainer) {
            return;
        }
        var size = this._getContainerSize();
        if (size) {
            this._setContainerMeasure(size.width, true);
            this._setContainerMeasure(size.height, false);
        }
    };

    /**
     * Sets width or height of container if returned
     * @returns {Object} size
     *   @param {Number} width
     *   @param {Number} height
     */
    Outlayer.prototype._getContainerSize = noop;

    /**
     * @param {Number} measure - size of width or height
     * @param {Boolean} isWidth
     */
    Outlayer.prototype._setContainerMeasure = function (measure, isWidth) {
        if (measure === undefined) {
            return;
        }

        var elemSize = this.size;
        // add padding and border width if border box
        if (elemSize.isBorderBox) {
            measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
              elemSize.borderLeftWidth + elemSize.borderRightWidth :
              elemSize.paddingBottom + elemSize.paddingTop +
              elemSize.borderTopWidth + elemSize.borderBottomWidth;
        }

        measure = Math.max(measure, 0);
        this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
    };

    /**
     * emit eventComplete on a collection of items events
     * @param {String} eventName
     * @param {Array} items - Outlayer.Items
     */
    Outlayer.prototype._emitCompleteOnItems = function (eventName, items) {
        var _this = this;
        function onComplete() {
            _this.dispatchEvent(eventName + 'Complete', null, [items]);
        }

        var count = items.length;
        if (!items || !count) {
            onComplete();
            return;
        }

        var doneCount = 0;
        function tick() {
            doneCount++;
            if (doneCount === count) {
                onComplete();
            }
        }

        // bind callback
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            item.once(eventName, tick);
        }
    };

    /**
     * emits events via eventEmitter and jQuery events
     * @param {String} type - name of event
     * @param {Event} event - original event
     * @param {Array} args - extra arguments
     */
    Outlayer.prototype.dispatchEvent = function (type, event, args) {
        // add original event to arguments
        var emitArgs = event ? [event].concat(args) : args;
        this.emitEvent(type, emitArgs);

        if (jQuery) {
            // set this.$element
            this.$element = this.$element || jQuery(this.element);
            if (event) {
                // create jQuery event
                var $event = jQuery.Event(event);
                $event.type = type;
                this.$element.trigger($event, args);
            } else {
                // just trigger with type if no event available
                this.$element.trigger(type, args);
            }
        }
    };

    // -------------------------- ignore & stamps -------------------------- //


    /**
     * keep item in collection, but do not lay it out
     * ignored items do not get skipped in layout
     * @param {Element} elem
     */
    Outlayer.prototype.ignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            item.isIgnored = true;
        }
    };

    /**
     * return item to layout collection
     * @param {Element} elem
     */
    Outlayer.prototype.unignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            delete item.isIgnored;
        }
    };

    /**
     * adds elements to stamps
     * @param {NodeList, Array, Element, or String} elems
     */
    Outlayer.prototype.stamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        this.stamps = this.stamps.concat(elems);
        // ignore
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            this.ignore(elem);
        }
    };

    /**
     * removes elements to stamps
     * @param {NodeList, Array, or Element} elems
     */
    Outlayer.prototype.unstamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            // filter out removed stamp elements
            utils.removeFrom(this.stamps, elem);
            this.unignore(elem);
        }

    };

    /**
     * finds child elements
     * @param {NodeList, Array, Element, or String} elems
     * @returns {Array} elems
     */
    Outlayer.prototype._find = function (elems) {
        if (!elems) {
            return;
        }
        // if string, use argument as selector string
        if (typeof elems === 'string') {
            elems = this.element.querySelectorAll(elems);
        }
        elems = utils.makeArray(elems);
        return elems;
    };

    Outlayer.prototype._manageStamps = function () {
        if (!this.stamps || !this.stamps.length) {
            return;
        }

        this._getBoundingRect();

        for (var i = 0, len = this.stamps.length; i < len; i++) {
            var stamp = this.stamps[i];
            this._manageStamp(stamp);
        }
    };

    // update boundingLeft / Top
    Outlayer.prototype._getBoundingRect = function () {
        // get bounding rect for container element
        var boundingRect = this.element.getBoundingClientRect();
        var size = this.size;
        this._boundingRect = {
            left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
            top: boundingRect.top + size.paddingTop + size.borderTopWidth,
            right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
            bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
        };
    };

    /**
     * @param {Element} stamp
    **/
    Outlayer.prototype._manageStamp = noop;

    /**
     * get x/y position of element relative to container element
     * @param {Element} elem
     * @returns {Object} offset - has left, top, right, bottom
     */
    Outlayer.prototype._getElementOffset = function (elem) {
        var boundingRect = elem.getBoundingClientRect();
        var thisRect = this._boundingRect;
        var size = getSize(elem);
        var offset = {
            left: boundingRect.left - thisRect.left - size.marginLeft,
            top: boundingRect.top - thisRect.top - size.marginTop,
            right: thisRect.right - boundingRect.right - size.marginRight,
            bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
        };
        return offset;
    };

    // -------------------------- resize -------------------------- //

    // enable event handlers for listeners
    // i.e. resize -> onresize
    Outlayer.prototype.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    /**
     * Bind layout to window resizing
     */
    Outlayer.prototype.bindResize = function () {
        // bind just one listener
        if (this.isResizeBound) {
            return;
        }
        eventie.bind(window, 'resize', this);
        this.isResizeBound = true;
    };

    /**
     * Unbind layout to window resizing
     */
    Outlayer.prototype.unbindResize = function () {
        if (this.isResizeBound) {
            eventie.unbind(window, 'resize', this);
        }
        this.isResizeBound = false;
    };

    // original debounce by John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

    // this fires every resize
    Outlayer.prototype.onresize = function () {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        var _this = this;
        function delayed() {
            _this.resize();
            delete _this.resizeTimeout;
        }

        this.resizeTimeout = setTimeout(delayed, 100);
    };

    // debounced, layout on resize
    Outlayer.prototype.resize = function () {
        // don't trigger if size did not change
        // or if resize was unbound. See #9
        if (!this.isResizeBound || !this.needsResizeLayout()) {
            return;
        }

        this.layout();
    };

    /**
     * check if layout is needed post layout
     * @returns Boolean
     */
    Outlayer.prototype.needsResizeLayout = function () {
        var size = getSize(this.element);
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var hasSizes = this.size && size;
        return hasSizes && size.innerWidth !== this.size.innerWidth;
    };

    // -------------------------- methods -------------------------- //

    /**
     * add items to Outlayer instance
     * @param {Array or NodeList or Element} elems
     * @returns {Array} items - Outlayer.Items
    **/
    Outlayer.prototype.addItems = function (elems) {
        var items = this._itemize(elems);
        // add items to collection
        if (items.length) {
            this.items = this.items.concat(items);
        }
        return items;
    };

    /**
     * Layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    Outlayer.prototype.appended = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // layout and reveal just the new items
        this.layoutItems(items, true);
        this.reveal(items);
    };

    /**
     * Layout prepended elements
     * @param {Array or NodeList or Element} elems
     */
    Outlayer.prototype.prepended = function (elems) {
        var items = this._itemize(elems);
        if (!items.length) {
            return;
        }
        // add items to beginning of collection
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems);
        // start new layout
        this._resetLayout();
        this._manageStamps();
        // layout new stuff without transition
        this.layoutItems(items, true);
        this.reveal(items);
        // layout previous items
        this.layoutItems(previousItems);
    };

    /**
     * reveal a collection of items
     * @param {Array of Outlayer.Items} items
     */
    Outlayer.prototype.reveal = function (items) {
        this._emitCompleteOnItems('reveal', items);

        var len = items && items.length;
        for (var i = 0; len && i < len; i++) {
            var item = items[i];
            item.reveal();
        }
    };

    /**
     * hide a collection of items
     * @param {Array of Outlayer.Items} items
     */
    Outlayer.prototype.hide = function (items) {
        this._emitCompleteOnItems('hide', items);

        var len = items && items.length;
        for (var i = 0; len && i < len; i++) {
            var item = items[i];
            item.hide();
        }
    };

    /**
     * reveal item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    Outlayer.prototype.revealItemElements = function (elems) {
        var items = this.getItems(elems);
        this.reveal(items);
    };

    /**
     * hide item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    Outlayer.prototype.hideItemElements = function (elems) {
        var items = this.getItems(elems);
        this.hide(items);
    };

    /**
     * get Outlayer.Item, given an Element
     * @param {Element} elem
     * @param {Function} callback
     * @returns {Outlayer.Item} item
     */
    Outlayer.prototype.getItem = function (elem) {
        // loop through items to get the one that matches
        for (var i = 0, len = this.items.length; i < len; i++) {
            var item = this.items[i];
            if (item.element === elem) {
                // return item
                return item;
            }
        }
    };

    /**
     * get collection of Outlayer.Items, given Elements
     * @param {Array} elems
     * @returns {Array} items - Outlayer.Items
     */
    Outlayer.prototype.getItems = function (elems) {
        elems = utils.makeArray(elems);
        var items = [];
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            var item = this.getItem(elem);
            if (item) {
                items.push(item);
            }
        }

        return items;
    };

    /**
     * remove element(s) from instance and DOM
     * @param {Array or NodeList or Element} elems
     */
    Outlayer.prototype.remove = function (elems) {
        var removeItems = this.getItems(elems);

        this._emitCompleteOnItems('remove', removeItems);

        // bail if no items to remove
        if (!removeItems || !removeItems.length) {
            return;
        }

        for (var i = 0, len = removeItems.length; i < len; i++) {
            var item = removeItems[i];
            item.remove();
            // remove item from collection
            utils.removeFrom(this.items, item);
        }
    };

    // ----- destroy ----- //

    // remove and disable Outlayer instance
    Outlayer.prototype.destroy = function () {
        // clean up dynamic styles
        var style = this.element.style;
        style.height = '';
        style.position = '';
        style.width = '';
        // destroy items
        for (var i = 0, len = this.items.length; i < len; i++) {
            var item = this.items[i];
            item.destroy();
        }

        this.unbindResize();

        var id = this.element.outlayerGUID;
        delete instances[id]; // remove reference to instance by id
        delete this.element.outlayerGUID;
        // remove data for jQuery
        if (jQuery) {
            jQuery.removeData(this.element, this.constructor.namespace);
        }

    };

    // -------------------------- data -------------------------- //

    /**
     * get Outlayer instance from element
     * @param {Element} elem
     * @returns {Outlayer}
     */
    Outlayer.data = function (elem) {
        elem = utils.getQueryElement(elem);
        var id = elem && elem.outlayerGUID;
        return id && instances[id];
    };


    // -------------------------- create Outlayer class -------------------------- //

    /**
     * create a layout class
     * @param {String} namespace
     */
    Outlayer.create = function (namespace, options) {
        // sub-class Outlayer
        function Layout() {
            Outlayer.apply(this, arguments);
        }
        // inherit Outlayer prototype, use Object.create if there
        if (Object.create) {
            Layout.prototype = Object.create(Outlayer.prototype);
        } else {
            utils.extend(Layout.prototype, Outlayer.prototype);
        }
        // set contructor, used for namespace and Item
        Layout.prototype.constructor = Layout;

        Layout.defaults = utils.extend({}, Outlayer.defaults);
        // apply new options
        utils.extend(Layout.defaults, options);
        // keep prototype.settings for backwards compatibility (Packery v1.2.0)
        Layout.prototype.settings = {};

        Layout.namespace = namespace;

        Layout.data = Outlayer.data;

        // sub-class Item
        Layout.Item = function LayoutItem() {
            Item.apply(this, arguments);
        };

        Layout.Item.prototype = new Item();

        // -------------------------- declarative -------------------------- //

        utils.htmlInit(Layout, namespace);

        // -------------------------- jQuery bridge -------------------------- //

        // make into jQuery plugin
        if (jQuery && jQuery.bridget) {
            jQuery.bridget(namespace, Layout);
        }

        return Layout;
    };

    // ----- fin ----- //

    // back in global
    Outlayer.Item = Item;

    return Outlayer;

}));

(function (window, factory) {
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope/js/item', [
            'outlayer/outlayer'
        ],
          factory);
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          require('outlayer')
        );
    } else {
        // browser global
        window.Isotope = window.Isotope || {};
        window.Isotope.Item = factory(
          window.Outlayer
        );
    }

}(window, function factory(Outlayer) {
    'use strict';

    // -------------------------- Item -------------------------- //

    // sub-class Outlayer Item
    function Item() {
        Outlayer.Item.apply(this, arguments);
    }

    Item.prototype = new Outlayer.Item();

    Item.prototype._create = function () {
        // assign id, used for original-order sorting
        this.id = this.layout.itemGUID++;
        Outlayer.Item.prototype._create.call(this);
        this.sortData = {};
    };

    Item.prototype.updateSortData = function () {
        if (this.isIgnored) {
            return;
        }
        // default sorters
        this.sortData.id = this.id;
        // for backward compatibility
        this.sortData['original-order'] = this.id;
        this.sortData.random = Math.random();
        // go thru getSortData obj and apply the sorters
        var getSortData = this.layout.options.getSortData;
        var sorters = this.layout._sorters;
        for (var key in getSortData) {
            var sorter = sorters[key];
            this.sortData[key] = sorter(this.element, this);
        }
    };

    var _destroy = Item.prototype.destroy;
    Item.prototype.destroy = function () {
        // call super
        _destroy.apply(this, arguments);
        // reset display, #741
        this.css({
            display: ''
        });
    };

    return Item;

}));

(function (window, factory) {
    'use strict';
    // universal module definition

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope/js/layout-mode', [
            'get-size/get-size',
            'outlayer/outlayer'
        ],
          factory);
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          require('get-size'),
          require('outlayer')
        );
    } else {
        // browser global
        window.Isotope = window.Isotope || {};
        window.Isotope.LayoutMode = factory(
          window.getSize,
          window.Outlayer
        );
    }

}(window, function factory(getSize, Outlayer) {
    'use strict';

    // layout mode class
    function LayoutMode(isotope) {
        this.isotope = isotope;
        // link properties
        if (isotope) {
            this.options = isotope.options[this.namespace];
            this.element = isotope.element;
            this.items = isotope.filteredItems;
            this.size = isotope.size;
        }
    }

    /**
     * some methods should just defer to default Outlayer method
     * and reference the Isotope instance as `this`
    **/
    (function () {
        var facadeMethods = [
          '_resetLayout',
          '_getItemLayoutPosition',
          '_manageStamp',
          '_getContainerSize',
          '_getElementOffset',
          'needsResizeLayout'
        ];

        for (var i = 0, len = facadeMethods.length; i < len; i++) {
            var methodName = facadeMethods[i];
            LayoutMode.prototype[methodName] = getOutlayerMethod(methodName);
        }

        function getOutlayerMethod(methodName) {
            return function () {
                return Outlayer.prototype[methodName].apply(this.isotope, arguments);
            };
        }
    })();

    // -----  ----- //

    // for horizontal layout modes, check vertical size
    LayoutMode.prototype.needsVerticalResizeLayout = function () {
        // don't trigger if size did not change
        var size = getSize(this.isotope.element);
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var hasSizes = this.isotope.size && size;
        return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
    };

    // ----- measurements ----- //

    LayoutMode.prototype._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
    };

    LayoutMode.prototype.getColumnWidth = function () {
        this.getSegmentSize('column', 'Width');
    };

    LayoutMode.prototype.getRowHeight = function () {
        this.getSegmentSize('row', 'Height');
    };

    /**
     * get columnWidth or rowHeight
     * segment: 'column' or 'row'
     * size 'Width' or 'Height'
    **/
    LayoutMode.prototype.getSegmentSize = function (segment, size) {
        var segmentName = segment + size;
        var outerSize = 'outer' + size;
        // columnWidth / outerWidth // rowHeight / outerHeight
        this._getMeasurement(segmentName, outerSize);
        // got rowHeight or columnWidth, we can chill
        if (this[segmentName]) {
            return;
        }
        // fall back to item of first element
        var firstItemSize = this.getFirstItemSize();
        this[segmentName] = firstItemSize && firstItemSize[outerSize] ||
          // or size of container
          this.isotope.size['inner' + size];
    };

    LayoutMode.prototype.getFirstItemSize = function () {
        var firstItem = this.isotope.filteredItems[0];
        return firstItem && firstItem.element && getSize(firstItem.element);
    };

    // ----- methods that should reference isotope ----- //

    LayoutMode.prototype.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
    };

    LayoutMode.prototype.getSize = function () {
        this.isotope.getSize();
        this.size = this.isotope.size;
    };

    // -------------------------- create -------------------------- //

    LayoutMode.modes = {};

    LayoutMode.create = function (namespace, options) {

        function Mode() {
            LayoutMode.apply(this, arguments);
        }

        Mode.prototype = new LayoutMode();

        // default options
        if (options) {
            Mode.options = options;
        }

        Mode.prototype.namespace = namespace;
        // register in Isotope
        LayoutMode.modes[namespace] = Mode;

        return Mode;
    };

    return LayoutMode;

}));

(function (window, factory) {
    'use strict';
    // universal module definition
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('masonry/masonry', [
            'outlayer/outlayer',
            'get-size/get-size',
            'fizzy-ui-utils/utils'
        ],
          factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(
          require('outlayer'),
          require('get-size'),
          require('fizzy-ui-utils')
        );
    } else {
        // browser global
        window.Masonry = factory(
          window.Outlayer,
          window.getSize,
          window.fizzyUIUtils
        );
    }

}(window, function factory(Outlayer, getSize, utils) {



    // -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var Masonry = Outlayer.create('masonry');

    Masonry.prototype._resetLayout = function () {
        this.getSize();
        this._getMeasurement('columnWidth', 'outerWidth');
        this._getMeasurement('gutter', 'outerWidth');
        this.measureColumns();

        // reset column Y
        var i = this.cols;
        this.colYs = [];
        while (i--) {
            this.colYs.push(0);
        }

        this.maxY = 0;
    };

    Masonry.prototype.measureColumns = function () {
        this.getContainerWidth();
        // if columnWidth is 0, default to outerWidth of first item
        if (!this.columnWidth) {
            var firstItem = this.items[0];
            var firstItemElem = firstItem && firstItem.element;
            // columnWidth fall back to item of first element
            this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
              // if first elem has no width, default to size of container
              this.containerWidth;
        }

        var columnWidth = this.columnWidth += this.gutter;

        // calculate columns
        var containerWidth = this.containerWidth + this.gutter;
        var cols = containerWidth / columnWidth;
        // fix rounding errors, typically with gutters
        var excess = columnWidth - containerWidth % columnWidth;
        // if overshoot is less than a pixel, round up, otherwise floor it
        var mathMethod = excess && excess < 1 ? 'round' : 'floor';
        cols = Math[mathMethod](cols);
        this.cols = Math.max(cols, 1);
    };

    Masonry.prototype.getContainerWidth = function () {
        // container is parent if fit width
        var container = this.options.isFitWidth ? this.element.parentNode : this.element;
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var size = getSize(container);
        this.containerWidth = size && size.innerWidth;
    };

    Masonry.prototype._getItemLayoutPosition = function (item) {
        item.getSize();
        // how many columns does this brick span
        var remainder = item.size.outerWidth % this.columnWidth;
        var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
        // round if off by 1 pixel, otherwise use ceil
        var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
        colSpan = Math.min(colSpan, this.cols);

        var colGroup = this._getColGroup(colSpan);
        // get the minimum Y value from the columns
        var minimumY = Math.min.apply(Math, colGroup);
        var shortColIndex = utils.indexOf(colGroup, minimumY);

        // position the brick
        var position = {
            x: this.columnWidth * shortColIndex,
            y: minimumY
        };

        // apply setHeight to necessary columns
        var setHeight = minimumY + item.size.outerHeight;
        var setSpan = this.cols + 1 - colGroup.length;
        for (var i = 0; i < setSpan; i++) {
            this.colYs[shortColIndex + i] = setHeight;
        }

        return position;
    };

    /**
     * @param {Number} colSpan - number of columns the element spans
     * @returns {Array} colGroup
     */
    Masonry.prototype._getColGroup = function (colSpan) {
        if (colSpan < 2) {
            // if brick spans only one column, use all the column Ys
            return this.colYs;
        }

        var colGroup = [];
        // how many different places could this brick fit horizontally
        var groupCount = this.cols + 1 - colSpan;
        // for each group potential horizontal position
        for (var i = 0; i < groupCount; i++) {
            // make an array of colY values for that one group
            var groupColYs = this.colYs.slice(i, i + colSpan);
            // and get the max value of the array
            colGroup[i] = Math.max.apply(Math, groupColYs);
        }
        return colGroup;
    };

    Masonry.prototype._manageStamp = function (stamp) {
        var stampSize = getSize(stamp);
        var offset = this._getElementOffset(stamp);
        // get the columns that this stamp affects
        var firstX = this.options.isOriginLeft ? offset.left : offset.right;
        var lastX = firstX + stampSize.outerWidth;
        var firstCol = Math.floor(firstX / this.columnWidth);
        firstCol = Math.max(0, firstCol);
        var lastCol = Math.floor(lastX / this.columnWidth);
        // lastCol should not go over if multiple of columnWidth #425
        lastCol -= lastX % this.columnWidth ? 0 : 1;
        lastCol = Math.min(this.cols - 1, lastCol);
        // set colYs to bottom of the stamp
        var stampMaxY = (this.options.isOriginTop ? offset.top : offset.bottom) +
          stampSize.outerHeight;
        for (var i = firstCol; i <= lastCol; i++) {
            this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
        }
    };

    Masonry.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var size = {
            height: this.maxY
        };

        if (this.options.isFitWidth) {
            size.width = this._getContainerFitWidth();
        }

        return size;
    };

    Masonry.prototype._getContainerFitWidth = function () {
        var unusedCols = 0;
        // count unused columns
        var i = this.cols;
        while (--i) {
            if (this.colYs[i] !== 0) {
                break;
            }
            unusedCols++;
        }
        // fit container to columns that have been used
        return (this.cols - unusedCols) * this.columnWidth - this.gutter;
    };

    Masonry.prototype.needsResizeLayout = function () {
        var previousWidth = this.containerWidth;
        this.getContainerWidth();
        return previousWidth !== this.containerWidth;
    };

    return Masonry;

}));

(function (window, factory) {
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope/js/layout-modes/masonry', [
            '../layout-mode',
            'masonry/masonry'
        ],
          factory);
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          require('../layout-mode'),
          require('masonry-layout')
        );
    } else {
        // browser global
        factory(
          window.Isotope.LayoutMode,
          window.Masonry
        );
    }

}(window, function factory(LayoutMode, Masonry) {
    'use strict';

    // -------------------------- helpers -------------------------- //

    // extend objects
    function extend(a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    }

    // -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var MasonryMode = LayoutMode.create('masonry');

    // save on to these methods
    var _getElementOffset = MasonryMode.prototype._getElementOffset;
    var layout = MasonryMode.prototype.layout;
    var _getMeasurement = MasonryMode.prototype._getMeasurement;

    // sub-class Masonry
    extend(MasonryMode.prototype, Masonry.prototype);

    // set back, as it was overwritten by Masonry
    MasonryMode.prototype._getElementOffset = _getElementOffset;
    MasonryMode.prototype.layout = layout;
    MasonryMode.prototype._getMeasurement = _getMeasurement;

    var measureColumns = MasonryMode.prototype.measureColumns;
    MasonryMode.prototype.measureColumns = function () {
        // set items, used if measuring first item
        this.items = this.isotope.filteredItems;
        measureColumns.call(this);
    };

    // HACK copy over isOriginLeft/Top options
    var _manageStamp = MasonryMode.prototype._manageStamp;
    MasonryMode.prototype._manageStamp = function () {
        this.options.isOriginLeft = this.isotope.options.isOriginLeft;
        this.options.isOriginTop = this.isotope.options.isOriginTop;
        _manageStamp.apply(this, arguments);
    };

    return MasonryMode;

}));

(function (window, factory) {
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope/js/layout-modes/fit-rows', [
            '../layout-mode'
        ],
          factory);
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          require('../layout-mode')
        );
    } else {
        // browser global
        factory(
          window.Isotope.LayoutMode
        );
    }

}(window, function factory(LayoutMode) {
    'use strict';

    var FitRows = LayoutMode.create('fitRows');

    FitRows.prototype._resetLayout = function () {
        this.x = 0;
        this.y = 0;
        this.maxY = 0;
        this._getMeasurement('gutter', 'outerWidth');
    };

    FitRows.prototype._getItemLayoutPosition = function (item) {
        item.getSize();

        var itemWidth = item.size.outerWidth + this.gutter;
        // if this element cannot fit in the current row
        var containerWidth = this.isotope.size.innerWidth + this.gutter;
        if (this.x !== 0 && itemWidth + this.x > containerWidth) {
            this.x = 0;
            this.y = this.maxY;
        }

        var position = {
            x: this.x,
            y: this.y
        };

        this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
        this.x += itemWidth;

        return position;
    };

    FitRows.prototype._getContainerSize = function () {
        return { height: this.maxY };
    };

    return FitRows;

}));

(function (window, factory) {
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('isotope/js/layout-modes/vertical', [
            '../layout-mode'
        ],
          factory);
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          require('../layout-mode')
        );
    } else {
        // browser global
        factory(
          window.Isotope.LayoutMode
        );
    }

}(window, function factory(LayoutMode) {
    'use strict';

    var Vertical = LayoutMode.create('vertical', {
        horizontalAlignment: 0
    });

    Vertical.prototype._resetLayout = function () {
        this.y = 0;
    };

    Vertical.prototype._getItemLayoutPosition = function (item) {
        item.getSize();
        var x = (this.isotope.size.innerWidth - item.size.outerWidth) *
          this.options.horizontalAlignment;
        var y = this.y;
        this.y += item.size.outerHeight;
        return { x: x, y: y };
    };

    Vertical.prototype._getContainerSize = function () {
        return { height: this.y };
    };

    return Vertical;

}));

(function (window, factory) {
    'use strict';
    // universal module definition

    if (typeof define == 'function' && define.amd) {
        // AMD
        define([
            'outlayer/outlayer',
            'get-size/get-size',
            'matches-selector/matches-selector',
            'fizzy-ui-utils/utils',
            'isotope/js/item',
            'isotope/js/layout-mode',
            // include default layout modes
            'isotope/js/layout-modes/masonry',
            'isotope/js/layout-modes/fit-rows',
            'isotope/js/layout-modes/vertical'
        ],
          function (Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
              return factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode);
          });
    } else if (typeof exports == 'object') {
        // CommonJS
        module.exports = factory(
          window,
          require('outlayer'),
          require('get-size'),
          require('desandro-matches-selector'),
          require('fizzy-ui-utils'),
          require('./item'),
          require('./layout-mode'),
          // include default layout modes
          require('./layout-modes/masonry'),
          require('./layout-modes/fit-rows'),
          require('./layout-modes/vertical')
        );
    } else {
        // browser global
        window.Isotope = factory(
          window,
          window.Outlayer,
          window.getSize,
          window.matchesSelector,
          window.fizzyUIUtils,
          window.Isotope.Item,
          window.Isotope.LayoutMode
        );
    }

}(window, function factory(window, Outlayer, getSize, matchesSelector, utils,
  Item, LayoutMode) {



    // -------------------------- vars -------------------------- //

    var jQuery = window.jQuery;

    // -------------------------- helpers -------------------------- //

    var trim = String.prototype.trim ?
      function (str) {
          return str.trim();
      } :
      function (str) {
          return str.replace(/^\s+|\s+$/g, '');
      };

    var docElem = document.documentElement;

    var getText = docElem.textContent ?
      function (elem) {
          return elem.textContent;
      } :
      function (elem) {
          return elem.innerText;
      };

    // -------------------------- isotopeDefinition -------------------------- //

    // create an Outlayer layout class
    var Isotope = Outlayer.create('isotope', {
        layoutMode: "masonry",
        isJQueryFiltering: true,
        sortAscending: true
    });

    Isotope.Item = Item;
    Isotope.LayoutMode = LayoutMode;

    Isotope.prototype._create = function () {
        this.itemGUID = 0;
        // functions that sort items
        this._sorters = {};
        this._getSorters();
        // call super
        Outlayer.prototype._create.call(this);

        // create layout modes
        this.modes = {};
        // start filteredItems with all items
        this.filteredItems = this.items;
        // keep of track of sortBys
        this.sortHistory = ['original-order'];
        // create from registered layout modes
        for (var name in LayoutMode.modes) {
            this._initLayoutMode(name);
        }
    };

    Isotope.prototype.reloadItems = function () {
        // reset item ID counter
        this.itemGUID = 0;
        // call super
        Outlayer.prototype.reloadItems.call(this);
    };

    Isotope.prototype._itemize = function () {
        var items = Outlayer.prototype._itemize.apply(this, arguments);
        // assign ID for original-order
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            item.id = this.itemGUID++;
        }
        this._updateItemsSortData(items);
        return items;
    };


    // -------------------------- layout -------------------------- //

    Isotope.prototype._initLayoutMode = function (name) {
        var Mode = LayoutMode.modes[name];
        // set mode options
        // HACK extend initial options, back-fill in default options
        var initialOpts = this.options[name] || {};
        this.options[name] = Mode.options ?
          utils.extend(Mode.options, initialOpts) : initialOpts;
        // init layout mode instance
        this.modes[name] = new Mode(this);
    };


    Isotope.prototype.layout = function () {
        // if first time doing layout, do all magic
        if (!this._isLayoutInited && this.options.isInitLayout) {
            this.arrange();
            return;
        }
        this._layout();
    };

    // private method to be used in layout() & magic()
    Isotope.prototype._layout = function () {
        // don't animate first layout
        var isInstant = this._getIsInstant();
        // layout flow
        this._resetLayout();
        this._manageStamps();
        this.layoutItems(this.filteredItems, isInstant);

        // flag for initalized
        this._isLayoutInited = true;
    };

    // filter + sort + layout
    Isotope.prototype.arrange = function (opts) {
        // set any options pass
        this.option(opts);
        this._getIsInstant();
        // filter, sort, and layout

        // filter
        var filtered = this._filter(this.items);
        this.filteredItems = filtered.matches;

        var _this = this;
        function hideReveal() {
            _this.reveal(filtered.needReveal);
            _this.hide(filtered.needHide);
        }

        this._bindArrangeComplete();

        if (this._isInstant) {
            this._noTransition(hideReveal);
        } else {
            hideReveal();
        }

        this._sort();
        this._layout();
    };
    // alias to _init for main plugin method
    Isotope.prototype._init = Isotope.prototype.arrange;

    // HACK
    // Don't animate/transition first layout
    // Or don't animate/transition other layouts
    Isotope.prototype._getIsInstant = function () {
        var isInstant = this.options.isLayoutInstant !== undefined ?
          this.options.isLayoutInstant : !this._isLayoutInited;
        this._isInstant = isInstant;
        return isInstant;
    };

    // listen for layoutComplete, hideComplete and revealComplete
    // to trigger arrangeComplete
    Isotope.prototype._bindArrangeComplete = function () {
        // listen for 3 events to trigger arrangeComplete
        var isLayoutComplete, isHideComplete, isRevealComplete;
        var _this = this;
        function arrangeParallelCallback() {
            if (isLayoutComplete && isHideComplete && isRevealComplete) {
                _this.dispatchEvent('arrangeComplete', null, [_this.filteredItems]);
            }
        }
        this.once('layoutComplete', function () {
            isLayoutComplete = true;
            arrangeParallelCallback();
        });
        this.once('hideComplete', function () {
            isHideComplete = true;
            arrangeParallelCallback();
        });
        this.once('revealComplete', function () {
            isRevealComplete = true;
            arrangeParallelCallback();
        });
    };

    // -------------------------- filter -------------------------- //

    Isotope.prototype._filter = function (items) {
        var filter = this.options.filter;
        filter = filter || '*';
        var matches = [];
        var hiddenMatched = [];
        var visibleUnmatched = [];

        var test = this._getFilterTest(filter);

        // test each item
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            if (item.isIgnored) {
                continue;
            }
            // add item to either matched or unmatched group
            var isMatched = test(item);
            // item.isFilterMatched = isMatched;
            // add to matches if its a match
            if (isMatched) {
                matches.push(item);
            }
            // add to additional group if item needs to be hidden or revealed
            if (isMatched && item.isHidden) {
                hiddenMatched.push(item);
            } else if (!isMatched && !item.isHidden) {
                visibleUnmatched.push(item);
            }
        }

        // return collections of items to be manipulated
        return {
            matches: matches,
            needReveal: hiddenMatched,
            needHide: visibleUnmatched
        };
    };

    // get a jQuery, function, or a matchesSelector test given the filter
    Isotope.prototype._getFilterTest = function (filter) {
        if (jQuery && this.options.isJQueryFiltering) {
            // use jQuery
            return function (item) {
                return jQuery(item.element).is(filter);
            };
        }
        if (typeof filter == 'function') {
            // use filter as function
            return function (item) {
                return filter(item.element);
            };
        }
        // default, use filter as selector string
        return function (item) {
            return matchesSelector(item.element, filter);
        };
    };

    // -------------------------- sorting -------------------------- //

    /**
     * @params {Array} elems
     * @public
     */
    Isotope.prototype.updateSortData = function (elems) {
        // get items
        var items;
        if (elems) {
            elems = utils.makeArray(elems);
            items = this.getItems(elems);
        } else {
            // update all items if no elems provided
            items = this.items;
        }

        this._getSorters();
        this._updateItemsSortData(items);
    };

    Isotope.prototype._getSorters = function () {
        var getSortData = this.options.getSortData;
        for (var key in getSortData) {
            var sorter = getSortData[key];
            this._sorters[key] = mungeSorter(sorter);
        }
    };

    /**
     * @params {Array} items - of Isotope.Items
     * @private
     */
    Isotope.prototype._updateItemsSortData = function (items) {
        // do not update if no items
        var len = items && items.length;

        for (var i = 0; len && i < len; i++) {
            var item = items[i];
            item.updateSortData();
        }
    };

    // ----- munge sorter ----- //

    // encapsulate this, as we just need mungeSorter
    // other functions in here are just for munging
    var mungeSorter = (function () {
        // add a magic layer to sorters for convienent shorthands
        // `.foo-bar` will use the text of .foo-bar querySelector
        // `[foo-bar]` will use attribute
        // you can also add parser
        // `.foo-bar parseInt` will parse that as a number
        function mungeSorter(sorter) {
            // if not a string, return function or whatever it is
            if (typeof sorter != 'string') {
                return sorter;
            }
            // parse the sorter string
            var args = trim(sorter).split(' ');
            var query = args[0];
            // check if query looks like [an-attribute]
            var attrMatch = query.match(/^\[(.+)\]$/);
            var attr = attrMatch && attrMatch[1];
            var getValue = getValueGetter(attr, query);
            // use second argument as a parser
            var parser = Isotope.sortDataParsers[args[1]];
            // parse the value, if there was a parser
            sorter = parser ? function (elem) {
                return elem && parser(getValue(elem));
            } :
            // otherwise just return value
            function (elem) {
                return elem && getValue(elem);
            };

            return sorter;
        }

        // get an attribute getter, or get text of the querySelector
        function getValueGetter(attr, query) {
            var getValue;
            // if query looks like [foo-bar], get attribute
            if (attr) {
                getValue = function (elem) {
                    return elem.getAttribute(attr);
                };
            } else {
                // otherwise, assume its a querySelector, and get its text
                getValue = function (elem) {
                    var child = elem.querySelector(query);
                    return child && getText(child);
                };
            }
            return getValue;
        }

        return mungeSorter;
    })();

    // parsers used in getSortData shortcut strings
    Isotope.sortDataParsers = {
        'parseInt': function (val) {
            return parseInt(val, 10);
        },
        'parseFloat': function (val) {
            return parseFloat(val);
        }
    };

    // ----- sort method ----- //

    // sort filteredItem order
    Isotope.prototype._sort = function () {
        var sortByOpt = this.options.sortBy;
        if (!sortByOpt) {
            return;
        }
        // concat all sortBy and sortHistory
        var sortBys = [].concat.apply(sortByOpt, this.sortHistory);
        // sort magic
        var itemSorter = getItemSorter(sortBys, this.options.sortAscending);
        this.filteredItems.sort(itemSorter);
        // keep track of sortBy History
        if (sortByOpt != this.sortHistory[0]) {
            // add to front, oldest goes in last
            this.sortHistory.unshift(sortByOpt);
        }
    };

    // returns a function used for sorting
    function getItemSorter(sortBys, sortAsc) {
        return function sorter(itemA, itemB) {
            // cycle through all sortKeys
            for (var i = 0, len = sortBys.length; i < len; i++) {
                var sortBy = sortBys[i];
                var a = itemA.sortData[sortBy];
                var b = itemB.sortData[sortBy];
                if (a > b || a < b) {
                    // if sortAsc is an object, use the value given the sortBy key
                    var isAscending = sortAsc[sortBy] !== undefined ? sortAsc[sortBy] : sortAsc;
                    var direction = isAscending ? 1 : -1;
                    return (a > b ? 1 : -1) * direction;
                }
            }
            return 0;
        };
    }

    // -------------------------- methods -------------------------- //

    // get layout mode
    Isotope.prototype._mode = function () {
        var layoutMode = this.options.layoutMode;
        var mode = this.modes[layoutMode];
        if (!mode) {
            // TODO console.error
            throw new Error('No layout mode: ' + layoutMode);
        }
        // HACK sync mode's options
        // any options set after init for layout mode need to be synced
        mode.options = this.options[layoutMode];
        return mode;
    };

    Isotope.prototype._resetLayout = function () {
        // trigger original reset layout
        Outlayer.prototype._resetLayout.call(this);
        this._mode()._resetLayout();
    };

    Isotope.prototype._getItemLayoutPosition = function (item) {
        return this._mode()._getItemLayoutPosition(item);
    };

    Isotope.prototype._manageStamp = function (stamp) {
        this._mode()._manageStamp(stamp);
    };

    Isotope.prototype._getContainerSize = function () {
        return this._mode()._getContainerSize();
    };

    Isotope.prototype.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
    };

    // -------------------------- adding & removing -------------------------- //

    // HEADS UP overwrites default Outlayer appended
    Isotope.prototype.appended = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // filter, layout, reveal new items
        var filteredItems = this._filterRevealAdded(items);
        // add to filteredItems
        this.filteredItems = this.filteredItems.concat(filteredItems);
    };

    // HEADS UP overwrites default Outlayer prepended
    Isotope.prototype.prepended = function (elems) {
        var items = this._itemize(elems);
        if (!items.length) {
            return;
        }
        // start new layout
        this._resetLayout();
        this._manageStamps();
        // filter, layout, reveal new items
        var filteredItems = this._filterRevealAdded(items);
        // layout previous items
        this.layoutItems(this.filteredItems);
        // add to items and filteredItems
        this.filteredItems = filteredItems.concat(this.filteredItems);
        this.items = items.concat(this.items);
    };

    Isotope.prototype._filterRevealAdded = function (items) {
        var filtered = this._filter(items);
        this.hide(filtered.needHide);
        // reveal all new items
        this.reveal(filtered.matches);
        // layout new items, no transition
        this.layoutItems(filtered.matches, true);
        return filtered.matches;
    };

    /**
     * Filter, sort, and layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    Isotope.prototype.insert = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // append item elements
        var i, item;
        var len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i];
            this.element.appendChild(item.element);
        }
        // filter new stuff
        var filteredInsertItems = this._filter(items).matches;
        // set flag
        for (i = 0; i < len; i++) {
            items[i].isLayoutInstant = true;
        }
        this.arrange();
        // reset flag
        for (i = 0; i < len; i++) {
            delete items[i].isLayoutInstant;
        }
        this.reveal(filteredInsertItems);
    };

    var _remove = Isotope.prototype.remove;
    Isotope.prototype.remove = function (elems) {
        elems = utils.makeArray(elems);
        var removeItems = this.getItems(elems);
        // do regular thing
        _remove.call(this, elems);
        // bail if no items to remove
        var len = removeItems && removeItems.length;
        if (!len) {
            return;
        }
        // remove elems from filteredItems
        for (var i = 0; i < len; i++) {
            var item = removeItems[i];
            // remove item from collection
            utils.removeFrom(this.filteredItems, item);
        }
    };

    Isotope.prototype.shuffle = function () {
        // update random sortData
        for (var i = 0, len = this.items.length; i < len; i++) {
            var item = this.items[i];
            item.sortData.random = Math.random();
        }
        this.options.sortBy = 'random';
        this._sort();
        this._layout();
    };

    /**
     * trigger fn without transition
     * kind of hacky to have this in the first place
     * @param {Function} fn
     * @returns ret
     * @private
     */
    Isotope.prototype._noTransition = function (fn) {
        // save transitionDuration before disabling
        var transitionDuration = this.options.transitionDuration;
        // disable transition
        this.options.transitionDuration = 0;
        // do it
        var returnValue = fn.call(this);
        // re-enable transition for reveal
        this.options.transitionDuration = transitionDuration;
        return returnValue;
    };

    // ----- helper methods ----- //

    /**
     * getter method for getting filtered item elements
     * @returns {Array} elems - collection of item elements
     */
    Isotope.prototype.getFilteredItemElements = function () {
        var elems = [];
        for (var i = 0, len = this.filteredItems.length; i < len; i++) {
            elems.push(this.filteredItems[i].element);
        }
        return elems;
    };

    // -----  ----- //

    return Isotope;

}));

//=======================End Isotope filter


//=======================Rating Star
(function ($) {
    "use strict";
    var DEFAULT_MIN = 0, DEFAULT_MAX = 5, DEFAULT_STEP = 0.5,
        isEmpty = function (value, trim) {
            return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
        },
        addCss = function ($el, css) {
            $el.removeClass(css).addClass(css);
        },
        validateAttr = function ($input, vattr, options) {
            var chk = isEmpty($input.data(vattr)) ? $input.attr(vattr) : $input.data(vattr);
            return chk ? chk : options[vattr];
        },
        getDecimalPlaces = function (num) {
            var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
        },
        applyPrecision = function (val, precision) {
            return parseFloat(val.toFixed(precision));
        },
        Rating = function (element, options) {
            this.$element = $(element);
            this.init(options);
        };

    Rating.prototype = {
        constructor: Rating,
        _parseAttr: function (vattr, options) {
            var self = this, $el = self.$element;
            if ($el.attr('type') === 'range' || $el.attr('type') === 'number') {
                var val = validateAttr($el, vattr, options), chk, final;
                switch (vattr) {
                    case 'min':
                        chk = DEFAULT_MIN;
                        break;
                    case 'max':
                        chk = DEFAULT_MAX;
                        break;
                    default:
                        chk = DEFAULT_STEP;
                }
                final = isEmpty(val) ? chk : val;
                return parseFloat(final);
            }
            return parseFloat(options[vattr]);
        },
        listenClick: function ($el, callback) {
            $el.on('click touchstart', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.handled !== true) {
                    callback(e);
                    e.handled = true;
                } else {
                    return false;
                }
            });
        },
        setDefault: function (key, val) {
            var self = this;
            if (isEmpty(self[key])) {
                self[key] = val;
            }
        },
        getPosition: function (e) {
            var pageX = e.pageX || e.originalEvent.touches[0].pageX;
            return pageX - this.$rating.offset().left;
        },
        listen: function () {
            var self = this, pos, out;
            self.initTouch();
            self.listenClick(self.$rating, function (e) {
                if (self.inactive) {
                    return false;
                }
                pos = self.getPosition(e);
                self.setStars(pos);
                self.$element.trigger('change').trigger('rating.change', [self.$element.val(), self.$caption.html()]);
                self.starClicked = true;
            });
            self.$rating.on("mousemove", function (e) {
                if (!self.hoverEnabled || self.inactive) {
                    return;
                }
                self.starClicked = false;
                pos = self.getPosition(e);
                out = self.calculate(pos);
                self.toggleHover(out);
                self.$element.trigger('rating.hover', [out.val, out.caption, 'stars']);
            });
            self.$rating.on("mouseleave", function () {
                if (!self.hoverEnabled || self.inactive || self.starClicked) {
                    return;
                }
                out = self.cache;
                self.toggleHover(out);
                self.$element.trigger('rating.hoverleave', ['stars']);
            });
            self.$clear.on("mousemove", function () {
                if (!self.hoverEnabled || self.inactive || !self.hoverOnClear) {
                    return;
                }
                self.clearClicked = false;
                var caption = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>',
                    val = self.clearValue, width = self.getWidthFromValue(val);
                out = { caption: caption, width: width, val: val };
                self.toggleHover(out);
                self.$element.trigger('rating.hover', [val, caption, 'clear']);
            });
            self.$clear.on("mouseleave", function () {
                if (!self.hoverEnabled || self.inactive || self.clearClicked || !self.hoverOnClear) {
                    return;
                }
                out = self.cache;
                self.toggleHover(out);
                self.$element.trigger('rating.hoverleave', ['clear']);
            });
            self.listenClick(self.$clear, function () {
                if (!self.inactive) {
                    self.clear();
                    self.clearClicked = true;
                }
            });
            $(self.$element[0].form).on("reset", function () {
                if (!self.inactive) {
                    self.reset();
                }
            });
        },
        destroy: function () {
            var self = this, $el = self.$element;
            if (!isEmpty(self.$container)) {
                self.$container.before($el).remove();
            }
            $.removeData($el.get(0));
            $el.off('rating').removeClass('hide');
        },
        create: function (options) {
            var self = this, $el = self.$element;
            options = options || self.options || {};
            self.destroy();
            $el.rating(options);
        },
        setTouch: function (e, flag) {
            var self = this, isTouchCapable = 'ontouchstart' in window ||
                (window.DocumentTouch && document instanceof window.DocumentTouch);
            if (!isTouchCapable || self.inactive) {
                return;
            }
            var ev = e.originalEvent, touches = ev.touches || ev.changedTouches, pos = self.getPosition(touches[0]);
            if (flag) {
                self.setStars(pos);
                self.$element.trigger('change').trigger('rating.change', [self.$element.val(), self.$caption.html()]);
                self.starClicked = true;
            } else {
                var out = self.calculate(pos), caption = out.val <= self.clearValue ? self.fetchCaption(self.clearValue) : out.caption,
                    w = self.getWidthFromValue(self.clearValue),
                    width = out.val <= self.clearValue ? (self.rtl ? (100 - w) + '%' : w + '%') : out.width;
                self.$caption.html(caption);
                self.$stars.css('width', width);
            }
        },
        initTouch: function () {
            var self = this;
            self.$rating.on("touchstart touchmove touchend", function (e) {
                var flag = (e.type === "touchend");
                self.setTouch(e, flag);
            });
        },
        initSlider: function (options) {
            var self = this;
            if (isEmpty(self.$element.val())) {
                self.$element.val(0);
            }
            self.initialValue = self.$element.val();
            self.setDefault('min', self._parseAttr('min', options));
            self.setDefault('max', self._parseAttr('max', options));
            self.setDefault('step', self._parseAttr('step', options));
            if (isNaN(self.min) || isEmpty(self.min)) {
                self.min = DEFAULT_MIN;
            }
            if (isNaN(self.max) || isEmpty(self.max)) {
                self.max = DEFAULT_MAX;
            }
            if (isNaN(self.step) || isEmpty(self.step) || self.step === 0) {
                self.step = DEFAULT_STEP;
            }
            self.diff = self.max - self.min;
        },
        init: function (options) {
            var self = this, $el = self.$element, defaultStar, starVal, starWidth;
            self.options = options;
            $.each(options, function (key, value) {
                self[key] = value;
            });
            self.starClicked = false;
            self.clearClicked = false;
            self.initSlider(options);
            self.checkDisabled();
            self.setDefault('rtl', $el.attr('dir'));
            if (self.rtl) {
                $el.attr('dir', 'rtl');
            }
            defaultStar = (self.glyphicon) ? '\ue006' : '\u2605';
            self.setDefault('symbol', defaultStar);
            self.setDefault('clearButtonBaseClass', 'clear-rating');
            self.setDefault('clearButtonActiveClass', 'clear-rating-active');
            self.setDefault('clearValue', self.min);
            addCss($el, 'form-control hide');
            self.$clearElement = isEmpty(options.clearElement) ? null : $(options.clearElement);
            self.$captionElement = isEmpty(options.captionElement) ? null : $(options.captionElement);
            if (self.$rating === undefined && self.$container === undefined) {
                self.$rating = $(document.createElement("div")).html('<div class="rating-stars"></div>');
                self.$container = $(document.createElement("div"));
                self.$container.before(self.$rating).append(self.$rating);
                $el.before(self.$container).appendTo(self.$rating);
            }
            self.$stars = self.$rating.find('.rating-stars');
            self.generateRating();
            self.$clear = !isEmpty(self.$clearElement) ? self.$clearElement : self.$container.find('.' + self.clearButtonBaseClass);
            self.$caption = !isEmpty(self.$captionElement) ? self.$captionElement : self.$container.find(".caption");
            self.setStars();
            self.listen();
            if (self.showClear) {
                self.$clear.attr({ "class": self.getClearClass() });
            }
            starVal = $el.val();
            starWidth = self.getWidthFromValue(starVal);
            self.cache = {
                caption: self.$caption.html(),
                width: (self.rtl ? (100 - starWidth) : starWidth) + '%',
                val: starVal
            };
            $el.removeClass('rating-loading');
        },
        checkDisabled: function () {
            var self = this;
            self.disabled = validateAttr(self.$element, 'disabled', self.options);
            self.readonly = validateAttr(self.$element, 'readonly', self.options);
            self.inactive = (self.disabled || self.readonly);
        },
        getClearClass: function () {
            return this.clearButtonBaseClass + ' ' + ((this.inactive) ? '' : this.clearButtonActiveClass);
        },
        generateRating: function () {
            var self = this, clear = self.renderClear(), caption = self.renderCaption(),
                css = (self.rtl) ? 'rating-container-rtl' : 'rating-container',
                stars = self.getStars();
            if (self.glyphicon) {
                css += (self.symbol === '\ue006' ? ' rating-gly-star' : ' rating-gly') + self.ratingClass;
            } else {
                css += isEmpty(self.ratingClass) ? ' rating-uni' : ' ' + self.ratingClass;
            }
            self.$rating.attr('class', css);
            self.$rating.attr('data-content', stars);
            self.$stars.attr('data-content', stars);
            css = self.rtl ? 'star-rating-rtl' : 'star-rating';
            self.$container.attr('class', css + ' rating-' + self.size);
            self.$container.removeClass('rating-active rating-disabled');
            if (self.inactive) {
                self.$container.addClass('rating-disabled');
            }
            else {
                self.$container.addClass('rating-active');
            }
            if (isEmpty(self.$caption)) {
                if (self.rtl) {
                    self.$container.prepend(caption);
                } else {
                    self.$container.append(caption);
                }
            }
            if (isEmpty(self.$clear)) {
                if (self.rtl) {
                    self.$container.append(clear);
                }
                else {
                    self.$container.prepend(clear);
                }
            }
            if (!isEmpty(self.containerClass)) {
                addCss(self.$container, self.containerClass);
            }
        },
        getStars: function () {
            var self = this, numStars = self.stars, stars = '', i;
            for (i = 1; i <= numStars; i++) {
                stars += self.symbol;
            }
            return stars;
        },
        renderClear: function () {
            var self = this, css;
            if (!self.showClear) {
                return '';
            }
            css = self.getClearClass();
            if (!isEmpty(self.$clearElement)) {
                addCss(self.$clearElement, css);
                self.$clearElement.attr({ "title": self.clearButtonTitle }).html(self.clearButton);
                return '';
            }
            return '<div class="' + css + '" title="' + self.clearButtonTitle + '">' + self.clearButton + '</div>';
        },
        renderCaption: function () {
            var self = this, val = self.$element.val(), html;
            if (!self.showCaption) {
                return '';
            }
            html = self.fetchCaption(val);
            if (!isEmpty(self.$captionElement)) {
                addCss(self.$captionElement, 'caption');
                self.$captionElement.html(html);
                return '';
            }
            return '<div class="caption">' + html + '</div>';
        },
        fetchCaption: function (rating) {
            var self = this, val = parseFloat(rating), css, cap, capVal, cssVal,
                vCap = self.starCaptions, vCss = self.starCaptionClasses, caption;
            cssVal = typeof vCss === "function" ? vCss(val) : vCss[val];
            capVal = typeof vCap === "function" ? vCap(val) : vCap[val];
            cap = isEmpty(capVal) ? self.defaultCaption.replace(/\{rating\}/g, val) : capVal;
            css = isEmpty(cssVal) ? self.clearCaptionClass : cssVal;
            caption = (val === self.clearValue) ? self.clearCaption : cap;
            return '<span class="' + css + '">' + caption + '</span>';
        },
        getWidthFromValue: function (val) {
            var self = this, min = self.min, max = self.max;
            if (val <= min || min === max) {
                return 0;
            }
            if (val >= max) {
                return 100;
            }
            return (val - min) * 100 / (max - min);
        },
        getValueFromPosition: function (pos) {
            var self = this, precision = getDecimalPlaces(self.step),
                val, factor, maxWidth = self.$rating.width();
            factor = (self.diff * pos) / (maxWidth * self.step);
            factor = self.rtl ? Math.floor(factor) : Math.ceil(factor);
            val = applyPrecision(parseFloat(self.min + factor * self.step), precision);
            val = Math.max(Math.min(val, self.max), self.min);
            return self.rtl ? (self.max - val) : val;
        },
        toggleHover: function (out) {
            var self = this, w, width, caption;
            if (self.hoverChangeCaption) {
                caption = out.val <= self.clearValue ? self.fetchCaption(self.clearValue) : out.caption;
                self.$caption.html(caption);
            }
            if (self.hoverChangeStars) {
                w = self.getWidthFromValue(self.clearValue);
                width = out.val <= self.clearValue ? (self.rtl ? (100 - w) + '%' : w + '%') : out.width;
                self.$stars.css('width', width);
            }
        },
        calculate: function (pos) {
            var self = this, defaultVal = isEmpty(self.$element.val()) ? 0 : self.$element.val(),
                val = arguments.length ? self.getValueFromPosition(pos) : defaultVal,
                caption = self.fetchCaption(val), width = self.getWidthFromValue(val);
            if (self.rtl) {
                width = 100 - width;
            }
            width += '%';
            return { caption: caption, width: width, val: val };
        },
        setStars: function (pos) {
            var self = this, out = arguments.length ? self.calculate(pos) : self.calculate();
            self.$element.val(out.val);
            self.$stars.css('width', out.width);
            self.$caption.html(out.caption);
            self.cache = out;
        },
        clear: function () {
            var self = this,
                title = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>';
            self.$stars.removeClass('rated');
            if (!self.inactive) {
                self.$caption.html(title);
            }
            self.$element.val(self.clearValue);
            self.setStars();
            self.$element.trigger('rating.clear');
        },
        reset: function () {
            var self = this;
            self.$element.val(self.initialValue);
            self.setStars();
            self.$element.trigger('rating.reset');
        },
        update: function (val) {
            var self = this;
            if (!arguments.length) {
                return;
            }
            self.$element.val(val);
            self.setStars();
        },
        refresh: function (options) {
            var self = this;
            if (!arguments.length) {
                return;
            }
            self.$rating.off('rating');
            if (self.$clear !== undefined) {
                self.$clear.off();
            }
            self.init($.extend(self.options, options));
            if (self.showClear) {
                self.$clear.show();
            } else {
                self.$clear.hide();
            }
            if (self.showCaption) {
                self.$caption.show();
            } else {
                self.$caption.hide();
            }
            self.$element.trigger('rating.refresh');
        }
    };

    $.fn.rating = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('rating'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('rating',
                    (data = new Rating(this, $.extend({}, $.fn.rating.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.rating.defaults = {
        stars: 5,
        glyphicon: true,
        symbol: null,
        ratingClass: '',
        disabled: false,
        readonly: false,
        rtl: false,
        size: 'md',
        showClear: true,
        showCaption: true,
        defaultCaption: '{rating} Stars',
        starCaptions: {
            0.5: 'Half Star',
            1: 'One Star',
            1.5: 'One & Half Star',
            2: 'Two Stars',
            2.5: 'Two & Half Stars',
            3: 'Three Stars',
            3.5: 'Three & Half Stars',
            4: 'Four Stars',
            4.5: 'Four & Half Stars',
            5: 'Five Stars'
        },
        starCaptionClasses: {
            0.5: 'label label-danger',
            1: 'label label-danger',
            1.5: 'label label-warning',
            2: 'label label-warning',
            2.5: 'label label-info',
            3: 'label label-info',
            3.5: 'label label-primary',
            4: 'label label-primary',
            4.5: 'label label-success',
            5: 'label label-success'
        },
        clearButton: '<i class="glyphicon glyphicon-minus-sign"></i>',
        clearButtonTitle: 'Clear',
        clearButtonBaseClass: 'clear-rating',
        clearButtonActiveClass: 'clear-rating-active',
        clearCaption: 'Not Rated',
        clearCaptionClass: 'label label-default',
        clearValue: null,
        captionElement: null,
        clearElement: null,
        containerClass: null,
        hoverEnabled: true,
        hoverChangeCaption: true,
        hoverChangeStars: true,
        hoverOnClear: true
    };

    $.fn.rating.Constructor = Rating;

    /**
     * Convert automatically inputs with class 'rating'
     * into the star rating control.
     */
    $('input.rating').addClass('rating-loading');

    $(document).ready(function () {
        var $input = $('input.rating'), count = Object.keys($input).length;
        if (count > 0) {
            $input.rating();
        }
    });
}(window.jQuery));
//=======================End Rating Star



//=======================wowslider.js
jQuery.fn.wowSlider = function (am) { var aI = jQuery; var H = this; var y = H.get(0); window.ws_basic = function (k, c, f) { var a0 = aI(this); this.go = function (a1) { f.find(".ws_list").css("transform", "translate3d(0,0,0)").stop(true).animate({ left: (a1 ? -a1 + "00%" : (/Safari/.test(navigator.userAgent) ? "0%" : 0)) }, k.duration, "easeInOutExpo", function () { a0.trigger("effectEnd") }) } }; am = aI.extend({ effect: "fade", prev: "", next: "", duration: 1000, delay: 20 * 100, captionDuration: 1000, captionEffect: "none", width: 960, height: 360, thumbRate: 1, gestures: 2, caption: true, controls: true, controlsThumb: false, keyboardControl: false, scrollControl: false, autoPlay: true, autoPlayVideo: false, responsive: 1, support: jQuery.fn.wowSlider.support, stopOnHover: 0, preventCopy: 1 }, am); var C = navigator.userAgent; var au = aI(".ws_images", H).css("overflow", "visible"); var ar = aI("<div>").appendTo(au).css({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }); var S = au.find("ul").css("width", "100%").wrap("<div class='ws_list'></div>").parent().appendTo(ar); function h(c) { return S.css({ left: -c + "00%" }) } aI("<div>").css({ position: "relative", width: "100%", "font-size": 0, "line-height": 0, "max-height": "100%", overflow: "hidden" }).append(au.find("li:first img:first").clone().css({ width: "100%", visibility: "hidden" })).prependTo(au); S.css({ position: "absolute", top: 0, height: "100%", transform: /Firefox/.test(C) ? "" : "translate3d(0,0,0)" }); var b = am.images && (new wowsliderPreloader(this, am)); var aQ = au.find("li"); var z = aQ.length; function aO(c) { return ((c || 0) + z) % z } var d = S.width() / S.find("li").width(), L = { position: "absolute", top: 0, height: "100%", overflow: "hidden" }, aH = aI("<div>").addClass("ws_swipe_left").css(L).prependTo(S), aR = aI("<div>").addClass("ws_swipe_right").css(L).appendTo(S); if (/MSIE/.test(C) || /Trident/.test(C) || /Safari/.test(C) || /Firefox/.test(C)) { var t = Math.pow(10, Math.ceil(Math.LOG10E * Math.log(z))); S.css({ width: t + "00%" }); aQ.css({ width: 100 / t + "%" }); aH.css({ width: 100 / t + "%", left: -100 / t + "%" }); aR.css({ width: 100 / t + "%", left: z * 100 / t + "%" }) } else { S.css({ width: z + "00%", display: "table" }); aQ.css({ display: "table-cell", "float": "none", width: "auto" }); aH.css({ width: 100 / z + "%", left: -100 / z + "%" }); aR.css({ width: 100 / z + "%", left: "100%" }) } var G = am.onBeforeStep || function (c) { return c + 1 }; am.startSlide = aO(isNaN(am.startSlide) ? G(-1, z) : am.startSlide); if (b) { b.load(am.startSlide, function () { }) } h(am.startSlide); var Z, ah; if (am.preventCopy) { Z = aI('<div class="ws_cover"><a href="#" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%"></a></div>').css({ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", "z-index": 10, background: "#FFF", opacity: 0 }).appendTo(au); ah = Z.find("A").get(0) } var r = []; var A = aI(".ws_frame", H); aQ.each(function (c) { var a0 = aI(">img:first,>iframe:first,>iframe:first+img,>a:first,>div:first", this); var a1 = aI("<div></div>"); for (var k = 0; k < this.childNodes.length;) { if (this.childNodes[k] != a0.get(0) && this.childNodes[k] != a0.get(1)) { a1.append(this.childNodes[k]) } else { k++ } } if (!aI(this).data("descr")) { if (a1.text().replace(/\s+/g, "")) { aI(this).data("descr", a1.html().replace(/^\s+|\s+$/g, "")) } else { aI(this).data("descr", "") } } aI(this).data("type", a0[0].tagName); var f = aI(">iframe", this).css("opacity", 0); r[r.length] = aI(">a>img", this).get(0) || aI(">iframe+img", this).get(0) || aI(">*", this).get(0) }); r = aI(r); r.css("visibility", "visible"); aH.append(aI(r[z - 1]).clone()); aR.append(aI(r[0]).clone()); var aW = []; am.effect = am.effect.replace(/\s+/g, "").split(","); function aJ(c) { if (!window["ws_" + c]) { return } var f = new window["ws_" + c](am, r, au); f.name = "ws_" + c; aW.push(f) } for (var Q in am.effect) { aJ(am.effect[Q]) } if (!aW.length) { aJ("basic") } var x = am.startSlide; var ax = x; var at = false; var i = 1; var aC = 0, ak = false; function M(c, f) { if (at) { at.pause(c.curIndex, f) } else { f() } } function ap(c, f) { if (at) { at.play(c, 0, f) } else { f() } } aI(aW).bind("effectStart", function (c, f) { aC++; M(f, function () { n(); if (f.cont) { aI(f.cont).stop().show().css("opacity", 1) } if (f.start) { f.start() } ax = x; x = f.nextIndex; Y(x, ax, f.captionNoDelay) }) }); aI(aW).bind("effectEnd", function (c, f) { h(x).stop(true, true).show(); setTimeout(function () { ap(x, function () { aC--; K(); if (at) { at.start(x) } }) }, f ? (f.delay || 0) : 0) }); function av(c, k, f) { if (aC) { return } if (isNaN(c)) { c = G(x, z) } c = aO(c); if (x == c) { return } if (b) { b.load(c, function () { aa(c, k, f) }) } else { aa(c, k, f) } } function ae(k) { var f = ""; for (var c = 0; c < k.length; c++) { f += String.fromCharCode(k.charCodeAt(c) ^ (1 + (k.length - c) % 7)) } return f } am.loop = am.loop || Number.MAX_VALUE; am.stopOn = aO(am.stopOn); var m = Math.floor(Math.random() * aW.length); function aa(c, k, f) { if (aC) { return } if (k) { if (f != undefined) { i = f ^ am.revers } h(c) } else { if (aC) { return } ak = false; (function (a1, a0, a2) { m = Math.floor(Math.random() * aW.length); aI(aW[m]).trigger("effectStart", { curIndex: a1, nextIndex: a0, cont: aI("." + aW[m].name, H), start: function () { if (a2 != undefined) { i = a2 ^ am.revers } else { i = !!(a0 > a1) ^ am.revers ? 1 : 0 } aW[m].go(a0, a1, i) } }) }(x, c, f)); H.trigger(aI.Event("go", { index: c })) } x = c; if (x == am.stopOn && !--am.loop) { am.autoPlay = 0 } if (am.onStep) { am.onStep(c) } } function n() { H.find(".ws_effect").fadeOut(200); h(x).fadeIn(200).find("img").css({ visibility: "visible" }) } if (am.gestures == 2) { H.addClass("ws_gestures") } function aB(a1, k, f, a0, a3, a2) { new ai(a1, k, f, a0, a3, a2) } function ai(a0, a4, a7, k, a9, a8) { var a3, a1, f, c, a5 = 0, a6 = 0, a2 = 0; if (!a0[0]) { a0 = aI(a0) } a0.on((a4 ? "mousedown " : "") + "touchstart", function (bb) { var ba = bb.originalEvent.touches ? bb.originalEvent.touches[0] : bb; if (am.gestures == 2) { H.addClass("ws_grabbing") } a5 = 0; if (ba) { a3 = ba.pageX; a1 = ba.pageY; a6 = a2 = 1; if (k) { a6 = a2 = k(bb) } } else { a6 = a2 = 0 } if (!bb.originalEvent.touches) { bb.preventDefault(); bb.stopPropagation() } }); aI(document).on((a4 ? "mousemove " : "") + "touchmove", a0, function (bb) { if (!a6) { return } var ba = bb.originalEvent.touches ? bb.originalEvent.touches[0] : bb; a5 = 1; f = ba.pageX - a3; c = ba.pageY - a1; if (a7) { a7(bb, f, c) } }); aI(document).on((a4 ? "mouseup " : "") + "touchend", a0, function (ba) { if (am.gestures == 2) { H.removeClass("ws_grabbing") } if (!a6) { return } if (a5 && a9) { a9(ba, f, c) } if (!a5 && a8) { a8(ba) } if (a5) { ba.preventDefault(); ba.stopPropagation() } a5 = 0; a6 = 0 }); a0.on("click", function (ba) { if (a2) { ba.preventDefault(); ba.stopPropagation() } a2 = 0 }) } var X = au, p = "!hgws9'idvt8$oeuu?%lctv>\"m`rw=#jaqq< kfpr:!hgws9'idvt8$oeuu?%lctv>\"m`rw=#jaqq< kfpr:!hgws9'idvt8$oeuu?%lctv>\"m`rw=#jaqq< kfpr:!hgws9"; if (!p) { return } p = ae(p); if (!p) { return } else { if (am.gestures) { function g(k) { var c = k.css("transform"), f = { top: 0, left: 0 }; if (c) { c = c.match(/(-?[0-9\.]+)/g); if (c) { if (c[1] == "3d") { f.left = parseFloat(c[2]) || 0; f.top = parseFloat(c[3]) || 0 } else { f.left = parseFloat(c[4]) || 0; f.top = parseFloat(c[5]) || 0 } } else { f.left = 0; f.top = 0 } } return f } var s = 0, o = 10, aS, aA, q, P; aB(au, am.gestures == 2, function (k, f, c) { P = !!aW[0].step; af(); S.stop(true, true); if (q) { ak = true; aC++; q = 0; if (!P) { n() } } s = f; if (f > aS) { f = aS } if (f < -aS) { f = -aS } if (P) { aW[0].step(x, f / aS) } else { if (am.support.transform && am.support.transition) { S.css("transform", "translate3d(" + f + "px,0,0)") } else { S.css("left", aA + f) } } }, function (k) { var f = /ws_playpause|ws_prev|ws_next|ws_bullets/g.test(k.target.className) || aI(k.target).parents(".ws_bullets").get(0); var c = e ? (k.target == e[0]) : 0; if (f || c || (at && at.playing())) { return false } q = 1; aS = au.width(); aA = parseFloat(-x * aS) || 0; if (l && u) { u.play() } return true }, function (a2, f, c) { q = 0; var a0 = au.width(), k = aO(x + (f < 0 ? 1 : -1)), a3 = a0 * f / Math.abs(f); if (Math.abs(s) < o) { k = x; a3 = 0 } var a1 = 200 + 200 * (a0 - Math.abs(f)) / a0; aC--; aI(aW[0]).trigger("effectStart", { curIndex: x, nextIndex: k, cont: P ? aI(".ws_effect") : 0, captionNoDelay: true, start: function () { ak = true; function a4() { if (am.support.transform && am.support.transition) { S.css({ transition: "0ms", transform: /Firefox/.test(C) ? "" : "translate3d(0,0,0)" }) } aI(aW[0]).trigger("effectEnd", { swipe: true }) } function a5() { if (P) { if (f > a0 || f < -a0) { aI(aW[0]).trigger("effectEnd") } else { wowAnimate(function (a6) { var a7 = f + (a0 * (f > 0 ? 1 : -1) - f) * a6; aW[0].step(ax, a7 / a0) }, 0, 1, a1, function () { aI(aW[0]).trigger("effectEnd") }) } } else { if (am.support.transform && am.support.transition) { S.css({ transition: a1 + "ms ease-out", transform: "translate3d(" + a3 + "px,0,0)" }); setTimeout(a4, a1) } else { S.animate({ left: aA + a3 }, a1, a4) } } } if (b) { b.load(k, a5) } else { a5() } } }) }, function () { var c = aI("A", aQ.get(x)); if (c) { c.click() } }) } } var ay = H.find(".ws_bullets"); var ao = H.find(".ws_thumbs"); function Y(k, a0, c) { if (ay.length) { aY(k) } if (ao.length) { aE(k) } if (am.controlsThumb && am.controls) { aP(k) } if (am.caption) { aX(k, a0, c) } if (ah) { var f = aI("A", aQ.get(k)).get(0); if (f) { ah.setAttribute("href", f.href); ah.setAttribute("target", f.target); ah.style.display = "block" } else { ah.style.display = "none" } } if (am.responsive) { aV() } } var az = am.autoPlay; function aK() { if (az) { az = 0; setTimeout(function () { H.trigger(aI.Event("stop", {})) }, am.duration) } } function v() { if (!az && am.autoPlay) { az = 1; H.trigger(aI.Event("start", {})) } } function aD() { af(); aK() } var al; var B = false; function K() { af(); if (am.autoPlay) { al = setTimeout(function () { if (!B) { av(undefined, undefined, 1) } }, am.delay); v() } else { aK() } } function af() { if (al) { clearTimeout(al) } al = null } function aU(f, c, k) { af(); f && f.preventDefault(); av(c, undefined, k); K(); if (l && u) { u.play() } } var e = ae('8B"iucc9!jusv?+,unpuimggs)eji!"'); e += ae("uq}og<%vjwjvhhh?vfn`sosa8fhtviez8ckifo8dnir(wjxd=70t{9"); var R = X || document.body; if (p.length < 4) { p = p.replace(/^\s+|\s+$/g, "") } X = p ? aI("<div>") : 0; aI(X).css({ position: "absolute", padding: "0 0 0 0" }).appendTo(R); if (X && document.all) { var V = aI("<iframe>"); V.css({ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", filter: "alpha(opacity=0)", opacity: 0.01 }); V.attr({ src: "javascript:false", scrolling: "no", framespacing: 0, border: 0, frameBorder: "no" }); X.append(V) } aI(X).css({ zIndex: 56, right: "15px", bottom: "15px" }).appendTo(R); e += ae("uhcrm>bwuh=majeis<dqwm:aikp.d`joi}9Csngi?!<"); e = X ? aI(e) : X; if (e) { e.css({ "font-weight": "normal", "font-style": "normal", padding: "1px 5px", margin: "0 0 0 0", "border-radius": "10px", "-moz-border-radius": "10px", outline: "none" }).html(p).bind("contextmenu", function (c) { return false }).show().appendTo(X || document.body).attr("target", "_blank"); (function () { if (!document.getElementById("wowslider_engine")) { var c = document.createElement("div"); c.id = "wowslider_engine"; c.style.position = "absolute"; c.style.left = "-1000px"; c.style.top = "-1000px"; c.style.opacity = "0.1"; c.innerHTML = '<a href="http://wowslider.com">wowslider.com</a>'; document.body.insertBefore(c, document.body.childNodes[0]) } }()) } var O = aI('<div class="ws_controls">').appendTo(au); if (ay[0]) { ay.appendTo(O) } if (am.controls) { var aj = aI('<a href="#" class="ws_next"><span>' + am.next + "<i></i><b></b></span></a>"); var ad = aI('<a href="#" class="ws_prev"><span>' + am.prev + "<i></i><b></b></span></a>"); O.append(aj, ad); aj.bind("click", function (c) { aU(c, x + 1, 1) }); ad.bind("click", function (c) { aU(c, x - 1, 0) }); if (/iPhone/.test(navigator.platform)) { ad.get(0).addEventListener("touchend", function (c) { aU(c, x - 1, 1) }, false); aj.get(0).addEventListener("touchend", function (c) { aU(c, x + 1, 0) }, false) } if (am.controlsThumb) { var U = aI('<img alt="" src="">').appendTo(aj); var T = aI('<img alt="" src="">').appendTo(aj); var aN = aI('<img alt="" src="">').appendTo(ad); var aM = aI('<img alt="" src="">').appendTo(ad) } } function aP(f) { var k = am.controlsThumb; var a0 = k[f + 1] || k[0]; var c = k[(f || k.length) - 1]; U.attr("src", a0); T.css("transition", "none"); aN.attr("src", c); aM.css("transition", "none"); wowAnimate(aI.merge(T, aM), { opacity: 1 }, { opacity: 0 }, 400, function () { T.attr({ src: a0, style: "" }); aM.attr({ src: c, style: "" }) }) } var E = am.thumbRate; var aw; var ag; function I() { H.find(".ws_bullets a,.ws_thumbs a").click(function (bg) { aU(bg, aI(this).index()) }); function a5(bm) { if (ba) { return } clearTimeout(a2); var bo = 0.2; for (var bl = 0; bl < 2; bl++) { if (bl) { var bp = bf.find("> a"); var bk = ag ? bf.width() : aI(bp.get(0)).outerWidth(true) * bp.length } else { var bk = bf.height() } var bq = ao[bl ? "width" : "height"](), bg = bq - bk; if (bg < 0) { var bh, bj, bn = (bm[bl ? "pageX" : "pageY"] - ao.offset()[bl ? "left" : "top"]) / bq; if (bb == bn) { return } bb = bn; var bi = bf.position()[bl ? "left" : "top"]; bf.css({ transition: "0ms linear", transform: "translate3d(" + bi.left + "px," + bi.top + "px,0)" }); bf.stop(true); if (E > 0) { if ((bn > bo) && (bn < 1 - bo)) { return } bh = bn < 0.5 ? 0 : bg - 1; bj = E * Math.abs(bi - bh) / (Math.abs(bn - 0.5) - bo) } else { bh = bg * Math.min(Math.max((bn - bo) / (1 - 2 * bo), 0), 1); bj = -E * bk / 2 } bf.animate(bl ? { left: bh } : { top: bh }, bj, E > 0 ? "linear" : "easeOutCubic") } else { bf.css(bl ? "left" : "top", bg / 2) } } } if (ao.length) { ao.hover(function () { aw = 1 }, function () { aw = 0 }); var bf = ao.find(">div"); ao.css({ overflow: "hidden" }); var bb; var a2; var ba; ag = ao.width() < H.width(); ao.bind("mousemove mouseover", a5); ao.mouseout(function (bg) { a2 = setTimeout(function () { bf.stop() }, 100) }); ao.trigger("mousemove"); if (am.gestures) { var c, f; var a7, be, a6, bd; aB(ao, am.gestures == 2, function (bk, bh, bg) { if (a7 > a6 || be > bd) { return false } if (ag) { var bi = Math.min(Math.max(f + bg, be - bd), 0); bf.css("top", bi) } else { var bj = Math.min(Math.max(c + bh, a7 - a6), 0); bf.css("left", bj) } }, function (bg) { ba = 1; var bh = bf.find("> a"); a7 = ao.width(); be = ao.height(); a6 = aI(bh.get(0)).outerWidth(true) * bh.length; bd = bf.height(); c = parseFloat(bf.css("left")) || 0; f = parseFloat(bf.css("top")) || 0; return true }, function () { ba = 0 }, function () { ba = 0 }) } H.find(".ws_thumbs a").each(function (bg, bh) { aB(bh, 0, 0, function (bi) { return !!aI(bi.target).parents(".ws_thumbs").get(0) }, function (bi) { ba = 1 }, function (bi) { aU(bi, aI(bh).index()) }) }) } if (ay.length) { var k = ay.find(">div"); var a8 = aI("a", ay); var a1 = a8.find("IMG"); if (a1.length) { var a3 = aI('<div class="ws_bulframe"/>').appendTo(k); var a9 = aI("<div/>").css({ width: a1.length + 1 + "00%" }).appendTo(aI("<div/>").appendTo(a3)); a1.appendTo(a9); aI("<span/>").appendTo(a3); var a4 = -1; function bc(bi) { if (bi < 0) { bi = 0 } if (b) { b.loadTtip(bi) } aI(a8.get(a4)).removeClass("ws_overbull"); aI(a8.get(bi)).addClass("ws_overbull"); a3.show(); var bj = { left: a8.get(bi).offsetLeft - a3.width() / 2, "margin-top": a8.get(bi).offsetTop - a8.get(0).offsetTop + "px", "margin-bottom": -a8.get(bi).offsetTop + a8.get(a8.length - 1).offsetTop + "px" }; var bh = a1.get(bi); var bg = { left: -bh.offsetLeft + (aI(bh).outerWidth(true) - aI(bh).outerWidth()) / 2 }; if (a4 < 0) { a3.css(bj); a9.css(bg) } else { if (!document.all) { bj.opacity = 1 } a3.stop().animate(bj, "fast"); a9.stop().animate(bg, "fast") } a4 = bi } a8.hover(function () { bc(aI(this).index()) }); var a0; k.hover(function () { if (a0) { clearTimeout(a0); a0 = 0 } bc(a4) }, function () { a8.removeClass("ws_overbull"); if (document.all) { if (!a0) { a0 = setTimeout(function () { a3.hide(); a0 = 0 }, 400) } } else { a3.stop().animate({ opacity: 0 }, { duration: "fast", complete: function () { a3.hide() } }) } }); k.click(function (bg) { aU(bg, aI(bg.target).index()) }) } } } function aE(c) { aI("A", ao).each(function (a3) { if (a3 == c) { var k = aI(this); k.addClass("ws_selthumb"); if (!aw) { var a5 = ao.find(">div"), a2 = k.position() || {}, a6; a6 = a5.position() || {}; for (var a1 = 0; a1 <= 1; a1++) { if (a1) { var a4 = a5.find("> a"); var a0 = ag ? a5.width() : aI(a4.get(0)).outerWidth(true) * a4.length } else { var a0 = a5.height() } var a7 = ao[a1 ? "width" : "height"](), f = a7 - a0; if (f < 0) { if (a1) { a5.stop(true).animate({ left: -Math.max(Math.min(a2.left, -a6.left), a2.left + k.outerWidth(true) - ao.width()) }) } else { a5.stop(true).animate({ top: -Math.max(Math.min(a2.top, 0), a2.top + k.outerHeight(true) - ao.height()) }) } } else { a5.css(a1 ? "left" : "top", f / 2) } } } } else { aI(this).removeClass("ws_selthumb") } }) } function aY(c) { aI("A", ay).each(function (f) { if (f == c) { aI(this).addClass("ws_selbull") } else { aI(this).removeClass("ws_selbull") } }) } if (am.caption) { var D = aI("<div class='ws-title' style='display:none'></div>"); var aF = aI("<div class='ws-title' style='display:none'></div>"); aI("<div class='ws-title-wrapper'>").append(D, aF).appendTo(au); D.bind("mouseover", function (c) { if (!at || !at.playing()) { af() } }); D.bind("mouseout", function (c) { if (!at || !at.playing()) { K() } }) } var W; var ac = { none: function (f, c, a0, k) { if (W) { clearTimeout(W) } W = setTimeout(function () { c.html(k).show() }, f.noDelay ? 0 : f.duration / 2) } }; if (!ac[am.captionEffect]) { ac[am.captionEffect] = window["ws_caption_" + am.captionEffect] } function N(c) { var f = aQ[c], a0 = aI("img", f).attr("title"), k = aI(f).data("descr"); if (!a0.replace(/\s+/g, "")) { a0 = "" } return (a0 ? "<span>" + a0 + "</span>" : "") + (k ? "<br><div>" + k + "</div>" : "") } function aX(f, a1, c) { var a0 = N(f); var a2 = N(a1); var k = am.captionEffect; (ac[aI.type(k)] || ac[k] || ac.none)(aI.extend({ $this: H, curIdx: x, prevIdx: ax, noDelay: c }, am), D, aF, a0, a2, i) } if (ay.length || ao.length) { I() } Y(x, ax, true); if (am.stopOnHover) { this.bind("mouseover", function (c) { if (!at || !at.playing()) { af() } B = true }); this.bind("mouseout", function (c) { if (!at || !at.playing()) { K() } B = false }) } if (!at || !at.playing()) { K() } var u = H.find("audio").get(0), l = am.autoPlay; if (u) { aI(u).insertAfter(H); if (window.Audio && u.canPlayType && u.canPlayType("audio/mp3")) { u.loop = "loop"; if (am.autoPlay) { u.autoplay = "autoplay"; setTimeout(function () { u.play() }, 100) } } else { u = u.src; var ab = u.substring(0, u.length - /[^\\\/]+$/.exec(u)[0].length); var j = "wsSound" + Math.round(Math.random() * 9999); aI("<div>").appendTo(H).get(0).id = j; var J = "wsSL" + Math.round(Math.random() * 9999); window[J] = { onInit: function () { } }; swfobject.createSWF({ data: ab + "player_mp3_js.swf", width: "1", height: "1" }, { allowScriptAccess: "always", loop: true, FlashVars: "listener=" + J + "&loop=1&autoplay=" + (am.autoPlay ? 1 : 0) + "&mp3=" + u }, j); u = 0 } H.bind("stop", function () { l = false; if (u) { u.pause() } else { aI(j).SetVariable("method:pause", "") } }); H.bind("start", function () { if (u) { u.play() } else { aI(j).SetVariable("method:play", "") } }) } y.wsStart = av; y.wsRestart = K; y.wsStop = aD; var aL = aI('<a href="#" class="ws_playpause"><span><i></i><b></b></span></a>'); function a() { am.autoPlay = !am.autoPlay; if (!am.autoPlay) { y.wsStop(); aL.removeClass("ws_pause"); aL.addClass("ws_play") } else { K(); aL.removeClass("ws_play"); aL.addClass("ws_pause"); if (at) { at.start(x) } } } if (am.playPause) { if (am.autoPlay) { aL.addClass("ws_pause") } else { aL.addClass("ws_play") } aL.click(function () { a(); return false }); O.append(aL) } if (am.keyboardControl) { aI(document).on("keyup", function (c) { switch (c.which) { case 32: a(); break; case 37: aU(c, x - 1, 0); break; case 39: aU(c, x + 1, 1); break } }) } if (am.scrollControl) { H.on("DOMMouseScroll mousewheel", function (c) { if (c.originalEvent.wheelDelta < 0 || c.originalEvent.detail > 0) { aU(null, x + 1, 1) } else { aU(null, x - 1, 0) } }) } if (typeof wowsliderVideo == "function") { var F = aI('<div class="ws_video_btn"><div></div></div>').appendTo(au); at = new wowsliderVideo(H, am, n); if (typeof $f != "undefined") { at.vimeo(true); at.start(x) } window.onYouTubeIframeAPIReady = function () { at.youtube(true); at.start(x) }; F.on("click touchend", function () { if (!aC) { at.play(x, 1) } }) } var aZ = 0; if (am.fullScreen) { if (typeof NoSleep !== "undefined") { var aT = new NoSleep() } var w = (function () { var a2 = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenchange"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitfullscreenchange"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitfullscreenchange"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozfullscreenchange"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "MSFullscreenChange"]], f = {}, a1, a0; for (var k = 0, c = a2.length; k < c; k++) { a1 = a2[k]; if (a1 && a1[1] in document) { for (k = 0, a0 = a1.length; k < a0; k++) { f[a2[0][k]] = a1[k] } return f } } return false })(); if (w) { function aq() { return !!document[w.fullscreenElement] } var aG = 0; function an(c) { if (/WOW Slider/g.test(C)) { return } c.preventDefault(); if (aq()) { document[w.exitFullscreen](); if (typeof aT !== "undefined") { aT.disable() } } else { aG = 1; H.wrap("<div class='ws_fs_wrapper'></div>").parent()[0][w.requestFullscreen](); if (typeof aT !== "undefined") { aT.enable() } } } document.addEventListener(w.fullscreenchange, function (c) { if (aq()) { aZ = 1; aV() } else { if (aG) { aG = 0; H.unwrap() } aZ = 0; aV() } if (!aW[0].step) { n() } }); aI("<a href='#' class='ws_fullscreen'></a>").on("click", an).appendTo(au) } } function aV() { var a4 = aZ ? 4 : am.responsive, c = au.width() || am.width, a0 = aI([r, aH.find("img"), aR.find("img")]); if (a4 > 0 && !!document.addEventListener) { H.css("fontSize", Math.max(Math.min((c / am.width) || 1, 1) * 10, 4)) } if (a4 == 2) { var f = Math.max((c / am.width), 1) - 1; a0.each(function () { aI(this).css("marginTop", -am.height * f / 2) }) } if (a4 == 3) { var a5 = window.innerHeight - (H.offset().top || 0), a2 = am.width / am.height, a3 = a2 > c / a5; H.css("height", a5); a0.each(function () { aI(this).css({ width: a3 ? "auto" : "100%", height: a3 ? "100%" : "auto", marginLeft: a3 ? ((c - a5 * a2) / 2) : 0, marginTop: a3 ? 0 : ((a5 - c / a2) / 2) }) }) } if (a4 == 4) { var a1 = window.innerWidth, k = window.innerHeight, a2 = (H.width() || am.width) / (H.height() || am.height); H.css({ maxWidth: a2 > a1 / k ? "100%" : (a2 * k), height: "" }); a0.each(function () { aI(this).css({ width: "100%", marginLeft: 0, marginTop: 0 }) }) } else { H.css({ maxWidth: "", top: "" }) } } if (am.responsive) { aI(aV); aI(window).on("load resize", aV) } return this }; jQuery.extend(jQuery.easing, { easeInOutExpo: function (e, f, a, h, g) { if (f == 0) { return a } if (f == g) { return a + h } if ((f /= g / 2) < 1) { return h / 2 * Math.pow(2, 10 * (f - 1)) + a } return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a }, easeOutCirc: function (e, f, a, h, g) { return h * Math.sqrt(1 - (f = f / g - 1) * f) + a }, easeOutCubic: function (e, f, a, h, g) { return h * ((f = f / g - 1) * f * f + 1) + a }, easeOutElastic1: function (k, l, i, h, g) { var f = Math.PI / 2; var m = 1.70158; var e = 0; var j = h; if (l == 0) { return i } if ((l /= g) == 1) { return i + h } if (!e) { e = g * 0.3 } if (j < Math.abs(h)) { j = h; var m = e / 4 } else { var m = e / f * Math.asin(h / j) } return j * Math.pow(2, -10 * l) * Math.sin((l * g - m) * f / e) + h + i }, easeOutBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a } }); jQuery.fn.wowSlider.support = { transform: (function () { if (!window.getComputedStyle) { return false } var b = document.createElement("div"); document.body.insertBefore(b, document.body.lastChild); b.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"; var a = window.getComputedStyle(b).getPropertyValue("transform"); b.parentNode.removeChild(b); if (a !== undefined) { return a !== "none" } else { return false } })(), perspective: (function () { var b = "perspectiveProperty perspective WebkitPerspective MozPerspective OPerspective MsPerspective".split(" "); for (var a = 0; a < b.length; a++) { if (document.body.style[b[a]] !== undefined) { return !!b[a] } } return false })(), transition: (function () { var a = document.body || document.documentElement, b = a.style; return b.transition !== undefined || b.WebkitTransition !== undefined || b.MozTransition !== undefined || b.MsTransition !== undefined || b.OTransition !== undefined })() };// -----------------------------------------------------------------------------------
(function (a) { function b(l, m, n, f, h, j, o) { if (typeof l === "undefined") { return } if (!l.jquery && typeof l !== "function") { m = l.from; n = l.to; f = l.duration; h = l.delay; j = l.easing; o = l.callback; l = l.each || l.obj } var k = "num"; if (l.jquery) { k = "obj" } if (typeof l === "undefined" || typeof m === "undefined" || typeof n === "undefined") { return } if (typeof h === "function") { o = h; h = 0 } if (typeof j === "function") { o = j; j = 0 } if (typeof h === "string") { j = h; h = 0 } f = f || 0; h = h || 0; j = j || 0; o = o || 0; function i(s) { var t = new Date().getTime() + h; var r = function () { var v = new Date().getTime() - t; if (v < 0) { v = 0 } var u = f ? (v / f) : 1; if (u < 1) { s(u); requestAnimationFrame(r) } else { q(1) } }; r(); function q(u) { cancelAnimationFrame(u); s(1); if (o) { o() } } return { stop: q } } function g(s, r, q) { return s + (r - s) * q } function e(q, r) { if (r == "linear") { return q } if (r == "swing") { return a.easing[r] ? a.easing[r](q) : q } return a.easing[r] ? a.easing[r](1, q, 0, 1, 1, 1) : q } var c = { opacity: 0, top: "px", left: "px", right: "px", bottom: "px", width: "px", height: "px", translate: "px", rotate: "deg", rotateX: "deg", rotateY: "deg", scale: 0 }; function p(x, w, v, r) { if (typeof w === "object") { var q = {}; for (var t in w) { q[t] = p(x, w[t], v[t], r) } return q } else { var s = ["px", "%", "in", "cm", "mm", "pt", "pc", "em", "ex", "ch", "rem", "vh", "vw", "vmin", "vmax", "deg", "rad", "grad", "turn"]; var u = ""; if (typeof w === "string") { u = w } else { if (typeof v === "string") { u = v } } u = (function (A, z, B) { for (var y in z) { if (A.indexOf(z[y]) > -1) { return z[y] } } if (c[B]) { return c[B] } return "" }(u, s, x)); w = parseFloat(w); v = parseFloat(v); return g(w, v, r) + u } } var d = i(function (r) { r = e(r, j); if (k === "num") { var q = g(m, n, r); l(q) } else { var q = { transform: "" }; for (var s in m) { if (typeof c[s] !== "undefined") { var t = p(s, m[s], n[s], r); switch (s) { case "translate": q.transform += " translate3d(" + t[0] + "," + t[1] + "," + t[2] + ")"; break; case "rotate": q.transform += " rotate(" + t + ")"; break; case "rotateX": q.transform += " rotateX(" + t + ")"; break; case "rotateY": q.transform += " rotateY(" + t + ")"; break; case "scale": if (typeof t === "object") { q.transform += " scale(" + t[0] + ", " + t[1] + ")" } else { q.transform += " scale(" + t + ")" } break; default: q[s] = t } } } if (q.transform === "") { delete q.transform } l.css(q) } }); return d } window.wowAnimate = b }(jQuery)); if (!Date.now) { Date.now = function () { return new Date().getTime() } } (function () { var d = ["webkit", "moz"]; for (var b = 0; b < d.length && !window.requestAnimationFrame; ++b) { var a = d[b]; window.requestAnimationFrame = window[a + "RequestAnimationFrame"]; window.cancelAnimationFrame = (window[a + "CancelAnimationFrame"] || window[a + "CancelRequestAnimationFrame"]) } if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) { var c = 0; window.requestAnimationFrame = function (g) { var f = Date.now(); var e = Math.max(c + 16, f); return setTimeout(function () { g(c = e) }, e - f) }; window.cancelAnimationFrame = clearTimeout } }());// -----------------------------------------------------------------------------------
//***********************************************
function ws_caption_parallax(d, c, h, f, g, b) { var e = jQuery; c.parent().css({ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }); c.html(f).css("width", "100%").stop(1, 1); h.html(g).css("width", "100%").stop(1, 1); (function a(n, j, v, r, s, w) { var p = 15; var m = d.$this.width(); p *= m / 100; function q(z, A) { return z.css(d.support.transform ? { transform: "translate3d(" + A + "px,0px,0px)" } : { marginLeft: A }).css("display", "inline-block") } if (d.prevIdx == d.curIdx) { q(n, 0).fadeIn(s / 3); q(e(">div,>span", n), 0) } else { var l = e(">div", n); var y = e(">div", j); var o = e(">span", n); var i = e(">span", j); var u = p + m * (w ? -1 : 1), x = p + m * (w ? 1 : -1), t = (w ? -1 : 1) * p; q(n, u).show(); q(j, 0).show(); q(l, t); q(y, 0); q(o, 2 * t); q(i, 0); wowAnimate(function (z) { z = e.easing.swing(z); q(n, (1 - z) * u); q(j, z * x) }, 0, 1, d.duration); var k = 0.8; wowAnimate(function (z) { z *= k; q(o, (1 - z) * 2 * t); q(l, (1 - z) * t); q(i, z * (-2 * t)); q(y, z * (-t)) }, 0, 1, d.duration, function () { i.css("opacity", 0); y.css("opacity", 0); wowAnimate(function (z) { z = e.easing.easeOutCubic(1, z, 0, 1, 1, 1); var A = (1 - k) * 2 * t, C = (1 - k) * t, B = k * (-2 * t), D = k * (-t); q(o, (1 - z) * A); q(l, (1 - z) * C); q(i, (1 - z) * B + z * (-2 * t)); q(y, (1 - z) * D + z * (-t)) }, 0, 1, (/Firefox/g.test(navigator.userAgent) ? 1500 : d.delay)) }) } }(c, h, f, g, d.captionDuration, b)) };
//=======================end wowslider.js



//=======================Owl Carousel
if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() { }
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {
        init: function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent: function () {
            var base = this, url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn: function () {
            var base = this;

            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));

            base.$elem.css({ opacity: 0 });
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars: function () {
            var base = this;
            if (base.$elem.children().length === 0) { return false; }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup: function () {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            base.$elem.find(".owl-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate: function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars: function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload: function () {
            var base = this;
            window.setTimeout(function () {
                base.updateVars();
            }, 0);
        },

        watchVisibility: function () {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({ opacity: 0 });
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({ opacity: 1 }, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapItems: function () {
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
        },

        baseClass: function () {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updateItems: function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) { return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        response: function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition: function () {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendItemsSizes: function () {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$owlItems.each(function (index) {
                var $this = $(this);
                $this
                    .css({ "width": base.itemWidth })
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("owl-roundPages", roundPages);
            });
        },

        appendWrapperSizes: function () {
            var base = this,
                width = base.$owlItems.length * base.itemWidth;

            base.$owlWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        calculateAll: function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth: function () {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },

        max: function () {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min: function () {
            return 0;
        },

        loops: function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls: function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons: function () {
            var base = this,
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class": "owl-prev",
                "html": base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class": "owl-next",
                "html": base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination: function () {
            var base = this;

            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }
            });
        },

        updatePagination: function () {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {
                        "class": "owl-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination: function () {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper
                        .find(".owl-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation: function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls: function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        },

        destroyControls: function () {
            var base = this;
            if (base.owlControls) {
                base.owlControls.remove();
            }
        },

        next: function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev: function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo: function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo: function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        },

        afterGo: function () {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop: function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp: function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play: function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed: function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed: function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition: function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate: function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d: function (value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        },

        css2move: function (value) {
            var base = this;
            base.$owlWrapper.css({ "left": value });
        },

        css2slide: function (value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate({
                "left": value
            }, {
                duration: speed || base.options.slideSpeed,
                complete: function () {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser: function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:" + translate3D +
                                  "; -o-transform:" + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:" + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d": support3d,
                "isTouch": isTouch
            };
        },

        moveEvents: function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes: function () {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl",
                    "touchmove.owl",
                    "touchend.owl touchcancel.owl"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.owl",
                    "mousemove.owl",
                    "mouseup.owl"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents: function () {
            var base = this;
            base.$elem.on("dragstart.owl", function (event) { event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures: function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX: 0,
                    offsetY: 0,
                    baseElWidth: 0,
                    relativePos: 0,
                    position: null,
                    minSwipe: null,
                    maxSwipe: null,
                    sliding: null,
                    dargging: null,
                    targetElement: null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x: event.touches[0].pageX,
                        y: event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x: event.pageX,
                            y: event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x: event.clientX,
                            y: event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },

        getNewPosition: function () {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },
        closestItem: function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection: function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents: function () {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("owl.next", function () {
                base.next();
            });
            base.$elem.on("owl.prev", function () {
                base.prev();
            });
            base.$elem.on("owl.play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("owl.stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("owl.goTo", function (event, item) {
                base.goTo(item);
            });
            base.$elem.on("owl.jumpTo", function (event, item) {
                base.jumpTo(item);
            });
        },

        stopOnHover: function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    base.stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        },

        lazyLoad: function () {
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$owlItems[i]);

                if ($item.data("owl-loaded") === "loaded") {
                    continue;
                }

                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");

                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("owl-loaded", "loaded");
                    continue;
                }
                if ($item.data("owl-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    base.lazyPreload($item, $lazyImg);
                }
            }
        },

        lazyPreload: function ($item, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight: function () {
            var base = this,
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function () {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg: function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisibleItems: function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        },

        transitionTypes: function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        },

        singleItemTransition: function () {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$owlItems.eq(base.currentItem),
                $prevItem = base.$owlItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$owlWrapper
                .addClass('owl-origin')
                .css({
                    "-webkit-transform-origin": origin + "px",
                    "-moz-perspective-origin": origin + "px",
                    "perspective-origin": origin + "px"
                });
            function transStyles(prevPos) {
                return {
                    "position": "relative",
                    "left": prevPos + "px"
                };
            }

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () {
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
                });

            $currentItem
                .addClass(inClass)
                .on(animEnd, function () {
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
                });
        },

        clearTransStyle: function (item, classToRemove) {
            var base = this;
            item.css({
                "position": "",
                "left": ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        owlStatus: function () {
            var base = this;
            base.owl = {
                "userOptions": base.userOptions,
                "baseElement": base.$elem,
                "userItems": base.$userItems,
                "owlItems": base.$owlItems,
                "currentItem": base.currentItem,
                "prevItem": base.prevItem,
                "visibleItems": base.visibleItems,
                "isTouch": base.browser.isTouch,
                "browser": base.browser,
                "dragDirection": base.dragDirection
            };
        },

        clearEvents: function () {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
        },

        unWrap: function () {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) {
                    base.owlControls.remove();
                }
            }
            base.clearEvents();
            base.$elem
                .attr("style", base.$elem.data("owl-originalStyles") || "")
                .attr("class", base.$elem.data("owl-originalClasses"));
        },

        destroy: function () {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit: function (newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addItem: function (htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) { return false; }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removeItem: function (targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        }

    };

    $.fn.owlCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
        });
    };

    $.fn.owlCarousel.options = {

        items: 4,
        itemsCustom: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        itemsScaleUp: false,

        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1000,

        autoPlay: false,
        stopOnHover: false,

        navigation: false,
        navigationText: ["prev", "next"],
        rewindNav: true,
        scrollPerPage: false,

        pagination: true,
        paginationNumbers: false,

        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,

        baseClass: "owl-carousel",
        theme: "owl-theme",

        lazyLoad: false,
        lazyFollow: true,
        lazyEffect: "fade",

        autoHeight: false,

        jsonPath: false,
        jsonSuccess: false,

        dragBeforeAnimFinish: true,
        mouseDrag: true,
        touchDrag: true,

        addClassActive: false,
        transitionStyle: false,

        beforeUpdate: false,
        afterUpdate: false,
        beforeInit: false,
        afterInit: false,
        beforeMove: false,
        afterMove: false,
        afterAction: false,
        startDragging: false,
        afterLazyLoad: false
    };
}(jQuery, window, document));
//=======================End Owl Carousel



//=======================Counter Up
(function ($) {
    "use strict";

    $.fn.counterUp = function (options) {

        // Defaults
        var settings = $.extend({
            'time': 400,
            'delay': 10
        }, options);

        return this.each(function () {

            // Store the object
            var $this = $(this);
            var $settings = settings;

            var counterUpper = function () {
                var nums = [];
                var divisions = $settings.time / $settings.delay;
                var num = $this.text();
                var isComma = /[0-9]+,[0-9]+/.test(num);
                num = num.replace(/,/g, '');
                var isInt = /^[0-9]+$/.test(num);
                var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
                var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

                // Generate list of incremental numbers to display
                for (var i = divisions; i >= 1; i--) {

                    // Preserve as int if input was int
                    var newNum = parseInt(num / divisions * i);

                    // Preserve float if input was float
                    if (isFloat) {
                        newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                    }

                    // Preserve commas if input had commas
                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                        }
                    }

                    nums.unshift(newNum);
                }

                $this.data('counterup-nums', nums);
                $this.text('0');

                // Updates the number until we're done
                var f = function () {
                    $this.text($this.data('counterup-nums').shift());
                    if ($this.data('counterup-nums').length) {
                        setTimeout($this.data('counterup-func'), $settings.delay);
                    } else {
                        delete $this.data('counterup-nums');
                        $this.data('counterup-nums', null);
                        $this.data('counterup-func', null);
                    }
                };
                $this.data('counterup-func', f);

                // Start the count up
                setTimeout($this.data('counterup-func'), $settings.delay);
            };

            // Perform counts when the element gets into view
            $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
        });

    };

})(jQuery);
//=======================End Counter Up



//=======================WayPoint : Animate Element when scroll to
(function () {
    var __indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
      __slice = [].slice;

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            return define('waypoints', ['jquery'], function ($) {
                return factory($, root);
            });
        } else {
            return factory(root.jQuery, root);
        }
    })(this, function ($, window) {
        var $w, Context, Waypoint, allWaypoints, contextCounter, contextKey, contexts, isTouch, jQMethods, methods, resizeEvent, scrollEvent, waypointCounter, waypointKey, wp, wps;

        $w = $(window);
        isTouch = __indexOf.call(window, 'ontouchstart') >= 0;
        allWaypoints = {
            horizontal: {},
            vertical: {}
        };
        contextCounter = 1;
        contexts = {};
        contextKey = 'waypoints-context-id';
        resizeEvent = 'resize.waypoints';
        scrollEvent = 'scroll.waypoints';
        waypointCounter = 1;
        waypointKey = 'waypoints-waypoint-ids';
        wp = 'waypoint';
        wps = 'waypoints';
        Context = (function () {
            function Context($element) {
                var _this = this;

                this.$element = $element;
                this.element = $element[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = 'context' + contextCounter++;
                this.oldScroll = {
                    x: $element.scrollLeft(),
                    y: $element.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                $element.data(contextKey, this.id);
                contexts[this.id] = this;
                $element.bind(scrollEvent, function () {
                    var scrollHandler;

                    if (!(_this.didScroll || isTouch)) {
                        _this.didScroll = true;
                        scrollHandler = function () {
                            _this.doScroll();
                            return _this.didScroll = false;
                        };
                        return window.setTimeout(scrollHandler, $[wps].settings.scrollThrottle);
                    }
                });
                $element.bind(resizeEvent, function () {
                    var resizeHandler;

                    if (!_this.didResize) {
                        _this.didResize = true;
                        resizeHandler = function () {
                            $[wps]('refresh');
                            return _this.didResize = false;
                        };
                        return window.setTimeout(resizeHandler, $[wps].settings.resizeThrottle);
                    }
                });
            }

            Context.prototype.doScroll = function () {
                var axes,
                  _this = this;

                axes = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: 'right',
                        backward: 'left'
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: 'down',
                        backward: 'up'
                    }
                };
                if (isTouch && (!axes.vertical.oldScroll || !axes.vertical.newScroll)) {
                    $[wps]('refresh');
                }
                $.each(axes, function (aKey, axis) {
                    var direction, isForward, triggered;

                    triggered = [];
                    isForward = axis.newScroll > axis.oldScroll;
                    direction = isForward ? axis.forward : axis.backward;
                    $.each(_this.waypoints[aKey], function (wKey, waypoint) {
                        var _ref, _ref1;

                        if ((axis.oldScroll < (_ref = waypoint.offset) && _ref <= axis.newScroll)) {
                            return triggered.push(waypoint);
                        } else if ((axis.newScroll < (_ref1 = waypoint.offset) && _ref1 <= axis.oldScroll)) {
                            return triggered.push(waypoint);
                        }
                    });
                    triggered.sort(function (a, b) {
                        return a.offset - b.offset;
                    });
                    if (!isForward) {
                        triggered.reverse();
                    }
                    return $.each(triggered, function (i, waypoint) {
                        if (waypoint.options.continuous || i === triggered.length - 1) {
                            return waypoint.trigger([direction]);
                        }
                    });
                });
                return this.oldScroll = {
                    x: axes.horizontal.newScroll,
                    y: axes.vertical.newScroll
                };
            };

            Context.prototype.refresh = function () {
                var axes, cOffset, isWin,
                  _this = this;

                isWin = $.isWindow(this.element);
                cOffset = this.$element.offset();
                this.doScroll();
                axes = {
                    horizontal: {
                        contextOffset: isWin ? 0 : cOffset.left,
                        contextScroll: isWin ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: 'right',
                        backward: 'left',
                        offsetProp: 'left'
                    },
                    vertical: {
                        contextOffset: isWin ? 0 : cOffset.top,
                        contextScroll: isWin ? 0 : this.oldScroll.y,
                        contextDimension: isWin ? $[wps]('viewportHeight') : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: 'down',
                        backward: 'up',
                        offsetProp: 'top'
                    }
                };
                return $.each(axes, function (aKey, axis) {
                    return $.each(_this.waypoints[aKey], function (i, waypoint) {
                        var adjustment, elementOffset, oldOffset, _ref, _ref1;

                        adjustment = waypoint.options.offset;
                        oldOffset = waypoint.offset;
                        elementOffset = $.isWindow(waypoint.element) ? 0 : waypoint.$element.offset()[axis.offsetProp];
                        if ($.isFunction(adjustment)) {
                            adjustment = adjustment.apply(waypoint.element);
                        } else if (typeof adjustment === 'string') {
                            adjustment = parseFloat(adjustment);
                            if (waypoint.options.offset.indexOf('%') > -1) {
                                adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
                            }
                        }
                        waypoint.offset = elementOffset - axis.contextOffset + axis.contextScroll - adjustment;
                        if ((waypoint.options.onlyOnScroll && (oldOffset != null)) || !waypoint.enabled) {
                            return;
                        }
                        if (oldOffset !== null && (oldOffset < (_ref = axis.oldScroll) && _ref <= waypoint.offset)) {
                            return waypoint.trigger([axis.backward]);
                        } else if (oldOffset !== null && (oldOffset > (_ref1 = axis.oldScroll) && _ref1 >= waypoint.offset)) {
                            return waypoint.trigger([axis.forward]);
                        } else if (oldOffset === null && axis.oldScroll >= waypoint.offset) {
                            return waypoint.trigger([axis.forward]);
                        }
                    });
                });
            };

            Context.prototype.checkEmpty = function () {
                if ($.isEmptyObject(this.waypoints.horizontal) && $.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([resizeEvent, scrollEvent].join(' '));
                    return delete contexts[this.id];
                }
            };

            return Context;

        })();
        Waypoint = (function () {
            function Waypoint($element, context, options) {
                var idList, _ref;

                options = $.extend({}, $.fn[wp].defaults, options);
                if (options.offset === 'bottom-in-view') {
                    options.offset = function () {
                        var contextHeight;

                        contextHeight = $[wps]('viewportHeight');
                        if (!$.isWindow(context.element)) {
                            contextHeight = context.$element.height();
                        }
                        return contextHeight - $(this).outerHeight();
                    };
                }
                this.$element = $element;
                this.element = $element[0];
                this.axis = options.horizontal ? 'horizontal' : 'vertical';
                this.callback = options.handler;
                this.context = context;
                this.enabled = options.enabled;
                this.id = 'waypoints' + waypointCounter++;
                this.offset = null;
                this.options = options;
                context.waypoints[this.axis][this.id] = this;
                allWaypoints[this.axis][this.id] = this;
                idList = (_ref = $element.data(waypointKey)) != null ? _ref : [];
                idList.push(this.id);
                $element.data(waypointKey, idList);
            }

            Waypoint.prototype.trigger = function (args) {
                if (!this.enabled) {
                    return;
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, args);
                }
                if (this.options.triggerOnce) {
                    return this.destroy();
                }
            };

            Waypoint.prototype.disable = function () {
                return this.enabled = false;
            };

            Waypoint.prototype.enable = function () {
                this.context.refresh();
                return this.enabled = true;
            };

            Waypoint.prototype.destroy = function () {
                delete allWaypoints[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty();
            };

            Waypoint.getWaypointsByElement = function (element) {
                var all, ids;

                ids = $(element).data(waypointKey);
                if (!ids) {
                    return [];
                }
                all = $.extend({}, allWaypoints.horizontal, allWaypoints.vertical);
                return $.map(ids, function (id) {
                    return all[id];
                });
            };

            return Waypoint;

        })();
        methods = {
            init: function (f, options) {
                var _ref;

                if (options == null) {
                    options = {};
                }
                if ((_ref = options.handler) == null) {
                    options.handler = f;
                }
                this.each(function () {
                    var $this, context, contextElement, _ref1;

                    $this = $(this);
                    contextElement = (_ref1 = options.context) != null ? _ref1 : $.fn[wp].defaults.context;
                    if (!$.isWindow(contextElement)) {
                        contextElement = $this.closest(contextElement);
                    }
                    contextElement = $(contextElement);
                    context = contexts[contextElement.data(contextKey)];
                    if (!context) {
                        context = new Context(contextElement);
                    }
                    return new Waypoint($this, context, options);
                });
                $[wps]('refresh');
                return this;
            },
            disable: function () {
                return methods._invoke(this, 'disable');
            },
            enable: function () {
                return methods._invoke(this, 'enable');
            },
            destroy: function () {
                return methods._invoke(this, 'destroy');
            },
            prev: function (axis, selector) {
                return methods._traverse.call(this, axis, selector, function (stack, index, waypoints) {
                    if (index > 0) {
                        return stack.push(waypoints[index - 1]);
                    }
                });
            },
            next: function (axis, selector) {
                return methods._traverse.call(this, axis, selector, function (stack, index, waypoints) {
                    if (index < waypoints.length - 1) {
                        return stack.push(waypoints[index + 1]);
                    }
                });
            },
            _traverse: function (axis, selector, push) {
                var stack, waypoints;

                if (axis == null) {
                    axis = 'vertical';
                }
                if (selector == null) {
                    selector = window;
                }
                waypoints = jQMethods.aggregate(selector);
                stack = [];
                this.each(function () {
                    var index;

                    index = $.inArray(this, waypoints[axis]);
                    return push(stack, index, waypoints[axis]);
                });
                return this.pushStack(stack);
            },
            _invoke: function ($elements, method) {
                $elements.each(function () {
                    var waypoints;

                    waypoints = Waypoint.getWaypointsByElement(this);
                    return $.each(waypoints, function (i, waypoint) {
                        waypoint[method]();
                        return true;
                    });
                });
                return this;
            }
        };
        $.fn[wp] = function () {
            var args, method;

            method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            if (methods[method]) {
                return methods[method].apply(this, args);
            } else if ($.isFunction(method)) {
                return methods.init.apply(this, arguments);
            } else if ($.isPlainObject(method)) {
                return methods.init.apply(this, [null, method]);
            } else if (!method) {
                return $.error("jQuery Waypoints needs a callback function or handler option.");
            } else {
                return $.error("The " + method + " method does not exist in jQuery Waypoints.");
            }
        };
        $.fn[wp].defaults = {
            context: window,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        jQMethods = {
            refresh: function () {
                return $.each(contexts, function (i, context) {
                    return context.refresh();
                });
            },
            viewportHeight: function () {
                var _ref;

                return (_ref = window.innerHeight) != null ? _ref : $w.height();
            },
            aggregate: function (contextSelector) {
                var collection, waypoints, _ref;

                collection = allWaypoints;
                if (contextSelector) {
                    collection = (_ref = contexts[$(contextSelector).data(contextKey)]) != null ? _ref.waypoints : void 0;
                }
                if (!collection) {
                    return [];
                }
                waypoints = {
                    horizontal: [],
                    vertical: []
                };
                $.each(waypoints, function (axis, arr) {
                    $.each(collection[axis], function (key, waypoint) {
                        return arr.push(waypoint);
                    });
                    arr.sort(function (a, b) {
                        return a.offset - b.offset;
                    });
                    waypoints[axis] = $.map(arr, function (waypoint) {
                        return waypoint.element;
                    });
                    return waypoints[axis] = $.unique(waypoints[axis]);
                });
                return waypoints;
            },
            above: function (contextSelector) {
                if (contextSelector == null) {
                    contextSelector = window;
                }
                return jQMethods._filter(contextSelector, 'vertical', function (context, waypoint) {
                    return waypoint.offset <= context.oldScroll.y;
                });
            },
            below: function (contextSelector) {
                if (contextSelector == null) {
                    contextSelector = window;
                }
                return jQMethods._filter(contextSelector, 'vertical', function (context, waypoint) {
                    return waypoint.offset > context.oldScroll.y;
                });
            },
            left: function (contextSelector) {
                if (contextSelector == null) {
                    contextSelector = window;
                }
                return jQMethods._filter(contextSelector, 'horizontal', function (context, waypoint) {
                    return waypoint.offset <= context.oldScroll.x;
                });
            },
            right: function (contextSelector) {
                if (contextSelector == null) {
                    contextSelector = window;
                }
                return jQMethods._filter(contextSelector, 'horizontal', function (context, waypoint) {
                    return waypoint.offset > context.oldScroll.x;
                });
            },
            enable: function () {
                return jQMethods._invoke('enable');
            },
            disable: function () {
                return jQMethods._invoke('disable');
            },
            destroy: function () {
                return jQMethods._invoke('destroy');
            },
            extendFn: function (methodName, f) {
                return methods[methodName] = f;
            },
            _invoke: function (method) {
                var waypoints;

                waypoints = $.extend({}, allWaypoints.vertical, allWaypoints.horizontal);
                return $.each(waypoints, function (key, waypoint) {
                    waypoint[method]();
                    return true;
                });
            },
            _filter: function (selector, axis, test) {
                var context, waypoints;

                context = contexts[$(selector).data(contextKey)];
                if (!context) {
                    return [];
                }
                waypoints = [];
                $.each(context.waypoints[axis], function (i, waypoint) {
                    if (test(context, waypoint)) {
                        return waypoints.push(waypoint);
                    }
                });
                waypoints.sort(function (a, b) {
                    return a.offset - b.offset;
                });
                return $.map(waypoints, function (waypoint) {
                    return waypoint.element;
                });
            }
        };
        $[wps] = function () {
            var args, method;

            method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            if (jQMethods[method]) {
                return jQMethods[method].apply(null, args);
            } else {
                return jQMethods.aggregate.call(null, method);
            }
        };
        $[wps].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return $w.load(function () {
            return $[wps]('refresh');
        });
    });

}).call(this);
//=======================End WayPoint



//=======================Countdown
(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    "use strict";
    var instances = [], matchers = [], defaultOptions = {
        precision: 100,
        elapse: false
    };
    matchers.push(/^[0-9]*$/.source);
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers = new RegExp(matchers.join("|"));
    function parseDateString(dateString) {
        if (dateString instanceof Date) {
            return dateString;
        }
        if (String(dateString).match(matchers)) {
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, "/");
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString + "` to a date object.");
        }
    }
    var DIRECTIVE_KEY_MAP = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        w: "weeks",
        d: "daysToWeek",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
    };
    function escapedRegExp(str) {
        var sanitize = str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(sanitize);
    }
    function strftime(offsetObject) {
        return function (format) {
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (directives) {
                for (var i = 0, len = directives.length; i < len; ++i) {
                    var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), regexp = escapedRegExp(directive[0]), modifier = directive[1] || "", plural = directive[3] || "", value = null;
                    directive = directive[2];
                    if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if (value !== null) {
                        if (modifier === "!") {
                            value = pluralize(plural, value);
                        }
                        if (modifier === "") {
                            if (value < 10) {
                                value = "0" + value.toString();
                            }
                        }
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace(/%%/, "%");
            return format;
        };
    }
    function pluralize(format, count) {
        var plural = "s", singular = "";
        if (format) {
            format = format.replace(/(:|;|\s)/gi, "").split(/\,/);
            if (format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        if (Math.abs(count) === 1) {
            return singular;
        } else {
            return plural;
        }
    }
    var Countdown = function (el, finalDate, options) {
        this.el = el;
        this.$el = $(el);
        this.interval = null;
        this.offset = {};
        this.options = $.extend({}, defaultOptions);
        this.instanceNumber = instances.length;
        instances.push(this);
        this.$el.data("countdown-instance", this.instanceNumber);
        if (options) {
            if (typeof options === "function") {
                this.$el.on("update.countdown", options);
                this.$el.on("stoped.countdown", options);
                this.$el.on("finish.countdown", options);
            } else {
                this.options = $.extend({}, defaultOptions, options);
            }
        }
        this.setFinalDate(finalDate);
        this.start();
    };
    $.extend(Countdown.prototype, {
        start: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            var self = this;
            this.update();
            this.interval = setInterval(function () {
                self.update.call(self);
            }, this.options.precision);
        },
        stop: function () {
            clearInterval(this.interval);
            this.interval = null;
            this.dispatchEvent("stoped");
        },
        toggle: function () {
            if (this.interval) {
                this.stop();
            } else {
                this.start();
            }
        },
        pause: function () {
            this.stop();
        },
        resume: function () {
            this.start();
        },
        remove: function () {
            this.stop.call(this);
            instances[this.instanceNumber] = null;
            delete this.$el.data().countdownInstance;
        },
        setFinalDate: function (value) {
            this.finalDate = parseDateString(value);
        },
        update: function () {
            if (this.$el.closest("html").length === 0) {
                this.remove();
                return;
            }
            var hasEventsAttached = $._data(this.el, "events") !== undefined, now = new Date(), newTotalSecsLeft;
            newTotalSecsLeft = this.finalDate.getTime() - now.getTime();
            newTotalSecsLeft = Math.ceil(newTotalSecsLeft / 1e3);
            newTotalSecsLeft = !this.options.elapse && newTotalSecsLeft < 0 ? 0 : Math.abs(newTotalSecsLeft);
            if (this.totalSecsLeft === newTotalSecsLeft || !hasEventsAttached) {
                return;
            } else {
                this.totalSecsLeft = newTotalSecsLeft;
            }
            this.elapsed = now >= this.finalDate;
            this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - now.getFullYear())
            };
            if (!this.options.elapse && this.totalSecsLeft === 0) {
                this.stop();
                this.dispatchEvent("finish");
            } else {
                this.dispatchEvent("update");
            }
        },
        dispatchEvent: function (eventName) {
            var event = $.Event(eventName + ".countdown");
            event.finalDate = this.finalDate;
            event.elapsed = this.elapsed;
            event.offset = $.extend({}, this.offset);
            event.strftime = strftime(this.offset);
            this.$el.trigger(event);
        }
    });
    $.fn.countdown = function () {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var instanceNumber = $(this).data("countdown-instance");
            if (instanceNumber !== undefined) {
                var instance = instances[instanceNumber], method = argumentsArray[0];
                if (Countdown.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, argumentsArray.slice(1));
                } else if (String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
                    instance.setFinalDate.call(instance, method);
                    instance.start();
                } else {
                    $.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, method));
                }
            } else {
                new Countdown(this, argumentsArray[0], argumentsArray[1]);
            }
        });
    };
});
//=======================End Countdown



//=======================Responsive Calendar
(function () {

    (function ($) {
        "use strict";
        var Calendar, opts, spy;
        Calendar = function (element, options) {
            var time;
            this.$element = element;
            this.options = options;
            this.weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            this.time = new Date();
            this.currentYear = this.time.getFullYear();
            this.currentMonth = this.time.getMonth();
            if (this.options.time) {
                time = this.splitDateString(this.options.time);
                this.currentYear = time.year;
                this.currentMonth = time.month;
            }
            this.initialDraw();
            return null;
        };
        Calendar.prototype = {
            addLeadingZero: function (num) {
                if (num < 10) {
                    return "0" + num;
                } else {
                    return "" + num;
                }
            },
            applyTransition: function ($el, transition) {
                $el.css('transition', transition);
                $el.css('-ms-transition', '-ms-' + transition);
                $el.css('-moz-transition', '-moz-' + transition);
                return $el.css('-webkit-transition', '-webkit-' + transition);
            },
            applyBackfaceVisibility: function ($el) {
                $el.css('backface-visibility', 'hidden');
                $el.css('-ms-backface-visibility', 'hidden');
                $el.css('-moz-backface-visibility', 'hidden');
                return $el.css('-webkit-backface-visibility', 'hidden');
            },
            applyTransform: function ($el, transform) {
                $el.css('transform', transform);
                $el.css('-ms-transform', transform);
                $el.css('-moz-transform', transform);
                return $el.css('-webkit-transform', transform);
            },
            splitDateString: function (dateString) {
                var day, month, time, year;
                time = dateString.split('-');
                year = parseInt(time[0]);
                month = parseInt(time[1] - 1);
                day = parseInt(time[2]);
                return time = {
                    year: year,
                    month: month,
                    day: day
                };
            },
            initialDraw: function () {
                return this.drawDays(this.currentYear, this.currentMonth);
            },
            editDays: function (events) {
                var dateString, day, dayEvents, time, _results;
                _results = [];
                for (dateString in events) {
                    dayEvents = events[dateString];
                    this.options.events[dateString] = events[dateString];
                    time = this.splitDateString(dateString);
                    day = this.$element.find('[data-year="' + time.year + '"][data-month="' + (time.month + 1) + '"][data-day="' + time.day + '"]').parent('.day');
                    day.removeClass('active');
                    day.find('.badge').remove();
                    day.find('a').removeAttr('href');
                    if (this.currentMonth === time.month || this.options.activateNonCurrentMonths) {
                        _results.push(this.makeActive(day, dayEvents));
                    } else {
                        _results.push(void 0);
                    }
                }
                return _results;
            },
            clearDays: function (days) {
                var dateString, day, time, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = days.length; _i < _len; _i++) {
                    dateString = days[_i];
                    delete this.options.events[dateString];
                    time = this.splitDateString(dateString);
                    day = this.$element.find('[data-year="' + time.year + '"][data-month="' + (time.month + 1) + '"][data-day="' + time.day + '"]').parent('.day');
                    day.removeClass('active');
                    day.find('.badge').remove();
                    _results.push(day.find('a').removeAttr('href'));
                }
                return _results;
            },
            clearAll: function () {
                var day, days, i, _i, _len, _results;
                this.options.events = {};
                days = this.$element.find('[data-group="days"] .day');
                _results = [];
                for (i = _i = 0, _len = days.length; _i < _len; i = ++_i) {
                    day = days[i];
                    $(day).removeClass('active');
                    $(day).find('.badge').remove();
                    _results.push($(day).find('a').removeAttr('href'));
                }
                return _results;
            },
            setMonthYear: function (dateString) {
                var time;
                time = this.splitDateString(dateString);
                this.currentMonth = this.drawDays(time.year, time.month);
                return this.currentYear = time.year;
            },
            prev: function () {
                if (this.currentMonth - 1 < 0) {
                    this.currentYear = this.currentYear - 1;
                    this.currentMonth = 11;
                } else {
                    this.currentMonth = this.currentMonth - 1;
                }
                this.drawDays(this.currentYear, this.currentMonth);
                if (this.options.onMonthChange) {
                    this.options.onMonthChange.call(this);
                }
                return null;
            },
            next: function () {
                if (this.currentMonth + 1 > 11) {
                    this.currentYear = this.currentYear + 1;
                    this.currentMonth = 0;
                } else {
                    this.currentMonth = this.currentMonth + 1;
                }
                this.drawDays(this.currentYear, this.currentMonth);
                if (this.options.onMonthChange) {
                    this.options.onMonthChange.call(this);
                }
                return null;
            },
            curr: function () {
                this.currentYear = this.time.getFullYear();
                this.currentMonth = this.time.getMonth();
                this.drawDays(this.currentYear, this.currentMonth);
                if (this.options.onMonthChange) {
                    this.options.onMonthChange.call(this);
                }
                return null;
            },
            addOthers: function (day, dayEvents) {
                var badge;
                if (typeof dayEvents === "object") {
                    if (dayEvents.number != null) {
                        badge = $("<span></span>").html(dayEvents.number).addClass("badge");
                        if (dayEvents.badgeClass != null) {
                            badge.addClass(dayEvents.badgeClass);
                        }
                        day.append(badge);
                    }
                    if (dayEvents.url) {
                        day.find("a").attr("href", dayEvents.url);
                    }
                }
                return day;
            },
            makeActive: function (day, dayEvents) {
                var classes, eventClass, i, _i, _len;
                if (dayEvents) {
                    if (dayEvents["class"]) {
                        classes = dayEvents["class"].split(" ");
                        for (i = _i = 0, _len = classes.length; _i < _len; i = ++_i) {
                            eventClass = classes[i];
                            day.addClass(eventClass);
                        }
                    } else {
                        day.addClass("active");
                    }
                    day = this.addOthers(day, dayEvents);
                }
                return day;
            },
            getDaysInMonth: function (year, month) {
                return new Date(year, month + 1, 0).getDate();
            },
            drawDay: function (lastDayOfMonth, yearNum, monthNum, dayNum, i) {
                var calcDate, dateNow, dateString, day, dayDate, pastFutureClass;
                day = $("<div></div>").addClass("day");
                dateNow = new Date();
                dateNow.setHours(0, 0, 0, 0);
                dayDate = new Date(yearNum, monthNum - 1, dayNum);
                if (dayDate.getTime() < dateNow.getTime()) {
                    pastFutureClass = "past";
                } else if (dayDate.getTime() === dateNow.getTime()) {
                    pastFutureClass = "today";
                } else {
                    pastFutureClass = "future";
                }
                day.addClass(this.weekDays[i % 7]);
                day.addClass(pastFutureClass);
                dateString = yearNum + "-" + this.addLeadingZero(monthNum) + "-" + this.addLeadingZero(dayNum);
                if (dayNum <= 0 || dayNum > lastDayOfMonth) {
                    calcDate = new Date(yearNum, monthNum - 1, dayNum);
                    dayNum = calcDate.getDate();
                    monthNum = calcDate.getMonth() + 1;
                    yearNum = calcDate.getFullYear();
                    day.addClass("not-current").addClass(pastFutureClass);
                    if (this.options.activateNonCurrentMonths) {
                        dateString = yearNum + "-" + this.addLeadingZero(monthNum) + "-" + this.addLeadingZero(dayNum);
                    }
                }
                day.append($("<a>" + dayNum + "</a>").attr("data-day", dayNum).attr("data-month", monthNum).attr("data-year", yearNum));
                if (this.options.monthChangeAnimation) {
                    this.applyTransform(day, 'rotateY(180deg)');
                    this.applyBackfaceVisibility(day);
                }
                day = this.makeActive(day, this.options.events[dateString]);
                return this.$element.find('[data-group="days"]').append(day);
            },
            drawDays: function (year, month) {
                var currentMonth, day, dayBase, days, delay, draw, firstDayOfMonth, i, lastDayOfMonth, loopBase, monthNum, multiplier, thisRef, time, timeout, yearNum, _i, _len;
                thisRef = this;
                time = new Date(year, month);
                currentMonth = time.getMonth();
                monthNum = time.getMonth() + 1;
                yearNum = time.getFullYear();
                time.setDate(1);
                firstDayOfMonth = this.options.startFromSunday ? time.getDay() + 1 : time.getDay() || 7;
                lastDayOfMonth = this.getDaysInMonth(year, month);
                timeout = 0;
                if (this.options.monthChangeAnimation) {
                    days = this.$element.find('[data-group="days"] .day');
                    for (i = _i = 0, _len = days.length; _i < _len; i = ++_i) {
                        day = days[i];
                        delay = i * 0.01;
                        this.applyTransition($(day), 'transform .5s ease ' + delay + 's');
                        this.applyTransform($(day), 'rotateY(180deg)');
                        this.applyBackfaceVisibility($(day));
                        timeout = (delay + 0.1) * 1000;
                    }
                }
                dayBase = 2;
                if (this.options.allRows) {
                    loopBase = 42;
                } else {
                    multiplier = Math.ceil((firstDayOfMonth - (dayBase - 1) + lastDayOfMonth) / 7);
                    loopBase = multiplier * 7;
                }
                this.$element.find("[data-head-year]").html(time.getFullYear());
                this.$element.find("[data-head-month]").html(this.options.translateMonths[time.getMonth()]);
                draw = function () {
                    var dayNum, setEvents;
                    thisRef.$element.find('[data-group="days"]').empty();
                    dayNum = dayBase - firstDayOfMonth;
                    i = thisRef.options.startFromSunday ? 0 : 1;
                    while (dayNum < loopBase - firstDayOfMonth + dayBase) {
                        thisRef.drawDay(lastDayOfMonth, yearNum, monthNum, dayNum, i);
                        dayNum = dayNum + 1;
                        i = i + 1;
                    }
                    setEvents = function () {
                        var _j, _len1;
                        days = thisRef.$element.find('[data-group="days"] .day');
                        for (i = _j = 0, _len1 = days.length; _j < _len1; i = ++_j) {
                            day = days[i];
                            thisRef.applyTransition($(day), 'transform .5s ease ' + (i * 0.01) + 's');
                            thisRef.applyTransform($(day), 'rotateY(0deg)');
                        }
                        if (thisRef.options.onDayClick) {
                            thisRef.$element.find('[data-group="days"] .day a').click(function () {
                                return thisRef.options.onDayClick.call(this, thisRef.options.events);
                            });
                        }
                        if (thisRef.options.onDayHover) {
                            thisRef.$element.find('[data-group="days"] .day a').hover(function () {
                                return thisRef.options.onDayHover.call(this, thisRef.options.events);
                            });
                        }
                        if (thisRef.options.onActiveDayClick) {
                            thisRef.$element.find('[data-group="days"] .day.active a').click(function () {
                                return thisRef.options.onActiveDayClick.call(this, thisRef.options.events);
                            });
                        }
                        if (thisRef.options.onActiveDayHover) {
                            return thisRef.$element.find('[data-group="days"] .day.active a').hover(function () {
                                return thisRef.options.onActiveDayHover.call(this, thisRef.options.events);
                            });
                        }
                    };
                    return setTimeout(setEvents, 0);
                };
                setTimeout(draw, timeout);
                return currentMonth;
            }
        };
        $.fn.responsiveCalendar = function (option, params) {
            var init, options, publicFunc;
            options = $.extend({}, $.fn.responsiveCalendar.defaults, typeof option === 'object' && option);
            publicFunc = {
                next: 'next',
                prev: 'prev',
                edit: 'editDays',
                clear: 'clearDays',
                clearAll: 'clearAll',
                getYearMonth: 'getYearMonth',
                jump: 'jump',
                curr: 'curr'
            };
            init = function ($this) {
                var data;
                options = $.metadata ? $.extend({}, options, $this.metadata()) : options;
                $this.data('calendar', (data = new Calendar($this, options)));
                if (options.onInit) {
                    options.onInit.call(data);
                }
                return $this.find("[data-go]").click(function () {
                    if ($(this).data("go") === "prev") {
                        data.prev();
                    }
                    if ($(this).data("go") === "next") {
                        return data.next();
                    }
                });
            };
            return this.each(function () {
                var $this, data;
                $this = $(this);
                data = $this.data('calendar');
                if (!data) {
                    init($this);
                } else if (typeof option === 'string') {
                    if (publicFunc[option] != null) {
                        data[publicFunc[option]](params);
                    } else {
                        data.setMonthYear(option);
                    }
                } else if (typeof option === 'number') {
                    data.jump(Math.abs(option) + 1);
                }
                return null;
            });
        };
        $.fn.responsiveCalendar.defaults = {
            translateMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            events: {},
            time: void 0,
            allRows: true,
            startFromSunday: false,
            activateNonCurrentMonths: false,
            monthChangeAnimation: true,
            onInit: void 0,
            onDayClick: void 0,
            onDayHover: void 0,
            onActiveDayClick: void 0,
            onActiveDayHover: void 0,
            onMonthChange: void 0
        };
        spy = $('[data-spy="responsive-calendar"]');
        if (spy.length) {
            opts = {};
            if ((spy.data('translate-months')) != null) {
                opts.translateMonths = spy.data('translate-months').split(',');
            }
            if ((spy.data('time')) != null) {
                opts.time = spy.data('time');
            }
            if ((spy.data('all-rows')) != null) {
                opts.allRows = spy.data('all-rows');
            }
            if ((spy.data('start-from-sunday')) != null) {
                opts.startFromSunday = spy.data('start-from-sunday');
            }
            if ((spy.data('activate-non-current-months')) != null) {
                opts.activateNonCurrentMonths = spy.data('activate-non-current-months');
            }
            if ((spy.data('month-change-animation')) != null) {
                opts.monthChangeAnimation = spy.data('month-change-animation');
            }
            return spy.responsiveCalendar(opts);
        }
    })(jQuery);

}).call(this);
//=======================End Responsive Calendar



//=======================Masonry Bootstrap
!function (a) { function b() { } function c(a) { function c(b) { b.prototype.option || (b.prototype.option = function (b) { a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b)) }) } function e(b, c) { a.fn[b] = function (e) { if ("string" == typeof e) { for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) { var j = this[h], k = a.data(j, b); if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) { var l = k[e].apply(k, g); if (void 0 !== l) return l } else f("no such method '" + e + "' for " + b + " instance"); else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'") } return this } return this.each(function () { var d = a.data(this, b); d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d)) }) } } if (a) { var f = "undefined" == typeof console ? b : function (a) { console.error(a) }; return a.bridget = function (a, b) { c(b), e(a, b) }, a.bridget } } var d = Array.prototype.slice; "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery) }(window), function (a) { function b(b) { var c = a.event; return c.target = c.target || c.srcElement || b, c } var c = document.documentElement, d = function () { }; c.addEventListener ? d = function (a, b, c) { a.addEventListener(b, c, !1) } : c.attachEvent && (d = function (a, c, d) { a[c + d] = d.handleEvent ? function () { var c = b(a); d.handleEvent.call(d, c) } : function () { var c = b(a); d.call(a, c) }, a.attachEvent("on" + c, a[c + d]) }); var e = function () { }; c.removeEventListener ? e = function (a, b, c) { a.removeEventListener(b, c, !1) } : c.detachEvent && (e = function (a, b, c) { a.detachEvent("on" + b, a[b + c]); try { delete a[b + c] } catch (d) { a[b + c] = void 0 } }); var f = { bind: d, unbind: e }; "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f }(window), function () { function a() { } function b(a, b) { for (var c = a.length; c--;) if (a[c].listener === b) return c; return -1 } function c(a) { return function () { return this[a].apply(this, arguments) } } var d = a.prototype, e = this, f = e.EventEmitter; d.getListeners = function (a) { var b, c, d = this._getEvents(); if (a instanceof RegExp) { b = {}; for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]) } else b = d[a] || (d[a] = []); return b }, d.flattenListeners = function (a) { var b, c = []; for (b = 0; b < a.length; b += 1) c.push(a[b].listener); return c }, d.getListenersAsObject = function (a) { var b, c = this.getListeners(a); return c instanceof Array && (b = {}, b[a] = c), b || c }, d.addListener = function (a, c) { var d, e = this.getListenersAsObject(a), f = "object" == typeof c; for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : { listener: c, once: !1 }); return this }, d.on = c("addListener"), d.addOnceListener = function (a, b) { return this.addListener(a, { listener: b, once: !0 }) }, d.once = c("addOnceListener"), d.defineEvent = function (a) { return this.getListeners(a), this }, d.defineEvents = function (a) { for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]); return this }, d.removeListener = function (a, c) { var d, e, f = this.getListenersAsObject(a); for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1)); return this }, d.off = c("removeListener"), d.addListeners = function (a, b) { return this.manipulateListeners(!1, a, b) }, d.removeListeners = function (a, b) { return this.manipulateListeners(!0, a, b) }, d.manipulateListeners = function (a, b, c) { var d, e, f = a ? this.removeListener : this.addListener, g = a ? this.removeListeners : this.addListeners; if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--;) f.call(this, b, c[d]); else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e)); return this }, d.removeEvent = function (a) { var b, c = typeof a, d = this._getEvents(); if ("string" === c) delete d[a]; else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b]; else delete this._events; return this }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function (a, b) { var c, d, e, f, g = this.getListenersAsObject(a); for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener); return this }, d.trigger = c("emitEvent"), d.emit = function (a) { var b = Array.prototype.slice.call(arguments, 1); return this.emitEvent(a, b) }, d.setOnceReturnValue = function (a) { return this._onceReturnValue = a, this }, d._getOnceReturnValue = function () { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, d._getEvents = function () { return this._events || (this._events = {}) }, a.noConflict = function () { return e.EventEmitter = f, a }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () { return a }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a }.call(this), function (a) { function b(a) { if (a) { if ("string" == typeof d[a]) return a; a = a.charAt(0).toUpperCase() + a.slice(1); for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b } } var c = "Webkit Moz ms Ms O".split(" "), d = document.documentElement.style; "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () { return b }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b }(window), function (a) { function b(a) { var b = parseFloat(a), c = -1 === a.indexOf("%") && !isNaN(b); return c && b } function c() { } function d() { for (var a = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, b = 0, c = g.length; c > b; b++) { var d = g[b]; a[d] = 0 } return a } function e(c) { function e() { if (!m) { m = !0; var d = a.getComputedStyle; if (j = function () { var a = d ? function (a) { return d(a, null) } : function (a) { return a.currentStyle }; return function (b) { var c = a(b); return c || f("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c } }(), k = c("boxSizing")) { var e = document.createElement("div"); e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box"; var g = document.body || document.documentElement; g.appendChild(e); var h = j(e); l = 200 === b(h.width), g.removeChild(e) } } } function h(a) { if (e(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) { var c = j(a); if ("none" === c.display) return d(); var f = {}; f.width = a.offsetWidth, f.height = a.offsetHeight; for (var h = f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k]), m = 0, n = g.length; n > m; m++) { var o = g[m], p = c[o]; p = i(a, p); var q = parseFloat(p); f[o] = isNaN(q) ? 0 : q } var r = f.paddingLeft + f.paddingRight, s = f.paddingTop + f.paddingBottom, t = f.marginLeft + f.marginRight, u = f.marginTop + f.marginBottom, v = f.borderLeftWidth + f.borderRightWidth, w = f.borderTopWidth + f.borderBottomWidth, x = h && l, y = b(c.width); y !== !1 && (f.width = y + (x ? 0 : r + v)); var z = b(c.height); return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f } } function i(b, c) { if (a.getComputedStyle || -1 === c.indexOf("%")) return c; var d = b.style, e = d.left, f = b.runtimeStyle, g = f && f.left; return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c } var j, k, l, m = !1; return h } var f = "undefined" == typeof console ? c : function (a) { console.error(a) }, g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]; "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property")) : a.getSize = e(a.getStyleProperty) }(window), function (a) { function b(a) { "function" == typeof a && (b.isReady ? a() : g.push(a)) } function c(a) { var c = "readystatechange" === a.type && "complete" !== f.readyState; b.isReady || c || d() } function d() { b.isReady = !0; for (var a = 0, c = g.length; c > a; a++) { var d = g[a]; d() } } function e(e) { return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b } var f = a.document, g = []; b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie) }(window), function (a) { function b(a, b) { return a[g](b) } function c(a) { if (!a.parentNode) { var b = document.createDocumentFragment(); b.appendChild(a) } } function d(a, b) { c(a); for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) if (d[e] === a) return !0; return !1 } function e(a, d) { return c(a), b(a, d) } var f, g = function () { if (a.matches) return "matches"; if (a.matchesSelector) return "matchesSelector"; for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) { var e = b[c], f = e + "MatchesSelector"; if (a[f]) return f } }(); if (g) { var h = document.createElement("div"), i = b(h, "div"); f = i ? b : e } else f = d; "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () { return f }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f }(Element.prototype), function (a, b) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function (c, d) { return b(a, c, d) }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector) }(window, function (a, b, c) { var d = {}; d.extend = function (a, b) { for (var c in b) a[c] = b[c]; return a }, d.modulo = function (a, b) { return (a % b + b) % b }; var e = Object.prototype.toString; d.isArray = function (a) { return "[object Array]" == e.call(a) }, d.makeArray = function (a) { var b = []; if (d.isArray(a)) b = a; else if (a && "number" == typeof a.length) for (var c = 0, e = a.length; e > c; c++) b.push(a[c]); else b.push(a); return b }, d.indexOf = Array.prototype.indexOf ? function (a, b) { return a.indexOf(b) } : function (a, b) { for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c; return -1 }, d.removeFrom = function (a, b) { var c = d.indexOf(a, b); -1 != c && a.splice(c, 1) }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (a) { return a instanceof HTMLElement } : function (a) { return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName }, d.setText = function () { function a(a, c) { b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c } var b; return a }(), d.getParent = function (a, b) { for (; a != document.body;) if (a = a.parentNode, c(a, b)) return a }, d.getQueryElement = function (a) { return "string" == typeof a ? document.querySelector(a) : a }, d.handleEvent = function (a) { var b = "on" + a.type; this[b] && this[b](a) }, d.filterFindElements = function (a, b) { a = d.makeArray(a); for (var e = [], f = 0, g = a.length; g > f; f++) { var h = a[f]; if (d.isElement(h)) if (b) { c(h, b) && e.push(h); for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j]) } else e.push(h) } return e }, d.debounceMethod = function (a, b, c) { var d = a.prototype[b], e = b + "Timeout"; a.prototype[b] = function () { var a = this[e]; a && clearTimeout(a); var b = arguments, f = this; this[e] = setTimeout(function () { d.apply(f, b), delete f[e] }, c || 100) } }, d.toDashed = function (a) { return a.replace(/(.)([A-Z])/g, function (a, b, c) { return b + "-" + c }).toLowerCase() }; var f = a.console; return d.htmlInit = function (c, e) { b(function () { for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) { var k, l = g[i], m = l.getAttribute(h); try { k = m && JSON.parse(m) } catch (n) { f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n); continue } var o = new c(l, k), p = a.jQuery; p && p.data(l, e, o) } }) }, d }), function (a, b) { "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function (c, d, e, f) { return b(a, c, d, e, f) }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils)) }(window, function (a, b, c, d, e) { function f(a) { for (var b in a) return !1; return b = null, !0 } function g(a, b) { a && (this.element = a, this.layout = b, this.position = { x: 0, y: 0 }, this._create()) } function h(a) { return a.replace(/([A-Z])/g, function (a) { return "-" + a.toLowerCase() }) } var i = a.getComputedStyle, j = i ? function (a) { return i(a, null) } : function (a) { return a.currentStyle }, k = d("transition"), l = d("transform"), m = k && l, n = !!d("perspective"), o = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend" }[k], p = ["transform", "transition", "transitionDuration", "transitionProperty"], q = function () { for (var a = {}, b = 0, c = p.length; c > b; b++) { var e = p[b], f = d(e); f && f !== e && (a[e] = f) } return a }(); e.extend(g.prototype, b.prototype), g.prototype._create = function () { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, g.prototype.handleEvent = function (a) { var b = "on" + a.type; this[b] && this[b](a) }, g.prototype.getSize = function () { this.size = c(this.element) }, g.prototype.css = function (a) { var b = this.element.style; for (var c in a) { var d = q[c] || c; b[d] = a[c] } }, g.prototype.getPosition = function () { var a = j(this.element), b = this.layout.options, c = b.isOriginLeft, d = b.isOriginTop, e = a[c ? "left" : "right"], f = a[d ? "top" : "bottom"], g = this.layout.size, h = -1 != e.indexOf("%") ? parseFloat(e) / 100 * g.width : parseInt(e, 10), i = -1 != f.indexOf("%") ? parseFloat(f) / 100 * g.height : parseInt(f, 10); h = isNaN(h) ? 0 : h, i = isNaN(i) ? 0 : i, h -= c ? g.paddingLeft : g.paddingRight, i -= d ? g.paddingTop : g.paddingBottom, this.position.x = h, this.position.y = i }, g.prototype.layoutPosition = function () { var a = this.layout.size, b = this.layout.options, c = {}, d = b.isOriginLeft ? "paddingLeft" : "paddingRight", e = b.isOriginLeft ? "left" : "right", f = b.isOriginLeft ? "right" : "left", g = this.position.x + a[d]; c[e] = this.getXValue(g), c[f] = ""; var h = b.isOriginTop ? "paddingTop" : "paddingBottom", i = b.isOriginTop ? "top" : "bottom", j = b.isOriginTop ? "bottom" : "top", k = this.position.y + a[h]; c[i] = this.getYValue(k), c[j] = "", this.css(c), this.emitEvent("layout", [this]) }, g.prototype.getXValue = function (a) { var b = this.layout.options; return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px" }, g.prototype.getYValue = function (a) { var b = this.layout.options; return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px" }, g.prototype._transitionTo = function (a, b) { this.getPosition(); var c = this.position.x, d = this.position.y, e = parseInt(a, 10), f = parseInt(b, 10), g = e === this.position.x && f === this.position.y; if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition(); var h = a - c, i = b - d, j = {}; j.transform = this.getTranslate(h, i), this.transition({ to: j, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, g.prototype.getTranslate = function (a, b) { var c = this.layout.options; return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, n ? "translate3d(" + a + "px, " + b + "px, 0)" : "translate(" + a + "px, " + b + "px)" }, g.prototype.goTo = function (a, b) { this.setPosition(a, b), this.layoutPosition() }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function (a, b) { this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10) }, g.prototype._nonTransition = function (a) { this.css(a.to), a.isCleaning && this._removeStyles(a.to); for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this) }, g.prototype._transition = function (a) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a); var b = this._transn; for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c]; for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0); if (a.from) { this.css(a.from); var d = this.element.offsetHeight; d = null } this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0 }; var r = "opacity," + h(q.transform || "transform"); g.prototype.enableTransition = function () { this.isTransitioning || (this.css({ transitionProperty: r, transitionDuration: this.layout.options.transitionDuration }), this.element.addEventListener(o, this, !1)) }, g.prototype.transition = g.prototype[k ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function (a) { this.ontransitionend(a) }, g.prototype.onotransitionend = function (a) { this.ontransitionend(a) }; var s = { "-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform" }; g.prototype.ontransitionend = function (a) { if (a.target === this.element) { var b = this._transn, c = s[a.propertyName] || a.propertyName; if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) { var d = b.onEnd[c]; d.call(this), delete b.onEnd[c] } this.emitEvent("transitionEnd", [this]) } }, g.prototype.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1 }, g.prototype._removeStyles = function (a) { var b = {}; for (var c in a) b[c] = ""; this.css(b) }; var t = { transitionProperty: "", transitionDuration: "" }; return g.prototype.removeTransitionStyles = function () { this.css(t) }, g.prototype.removeElem = function () { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, g.prototype.remove = function () { if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem(); var a = this; this.once("transitionEnd", function () { a.removeElem() }), this.hide() }, g.prototype.reveal = function () { delete this.isHidden, this.css({ display: "" }); var a = this.layout.options, b = {}, c = this.getHideRevealTransitionEndProperty("visibleStyle"); b[c] = this.onRevealTransitionEnd, this.transition({ from: a.hiddenStyle, to: a.visibleStyle, isCleaning: !0, onTransitionEnd: b }) }, g.prototype.onRevealTransitionEnd = function () { this.isHidden || this.emitEvent("reveal") }, g.prototype.getHideRevealTransitionEndProperty = function (a) { var b = this.layout.options[a]; if (b.opacity) return "opacity"; for (var c in b) return c }, g.prototype.hide = function () { this.isHidden = !0, this.css({ display: "" }); var a = this.layout.options, b = {}, c = this.getHideRevealTransitionEndProperty("hiddenStyle"); b[c] = this.onHideTransitionEnd, this.transition({ from: a.visibleStyle, to: a.hiddenStyle, isCleaning: !0, onTransitionEnd: b }) }, g.prototype.onHideTransitionEnd = function () { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, g.prototype.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, g }), function (a, b) { "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (c, d, e, f, g) { return b(a, c, d, e, f, g) }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item) }(window, function (a, b, c, d, e, f) { function g(a, b) { var c = e.getQueryElement(a); if (!c) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a))); this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b); var d = ++k; this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout() } var h = a.console, i = a.jQuery, j = function () { }, k = 0, l = {}; return g.namespace = "outlayer", g.Item = f, g.defaults = { containerStyle: { position: "relative" }, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, isResizingContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }, e.extend(g.prototype, c.prototype), g.prototype.option = function (a) { e.extend(this.options, a) }, g.prototype._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize() }, g.prototype.reloadItems = function () { this.items = this._itemize(this.element.children) }, g.prototype._itemize = function (a) { for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) { var g = b[e], h = new c(g, this); d.push(h) } return d }, g.prototype._filterFindItemElements = function (a) { return e.filterFindElements(a, this.options.itemSelector) }, g.prototype.getItemElements = function () { for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element); return a }, g.prototype.layout = function () { this._resetLayout(), this._manageStamps(); var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited; this.layoutItems(this.items, a), this._isLayoutInited = !0 }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function () { this.getSize() }, g.prototype.getSize = function () { this.size = d(this.element) }, g.prototype._getMeasurement = function (a, b) { var c, f = this.options[a]; f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0 }, g.prototype.layoutItems = function (a, b) { a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout() }, g.prototype._getItemsForLayout = function (a) { for (var b = [], c = 0, d = a.length; d > c; c++) { var e = a[c]; e.isIgnored || b.push(e) } return b }, g.prototype._layoutItems = function (a, b) { if (this._emitCompleteOnItems("layout", a), a && a.length) { for (var c = [], d = 0, e = a.length; e > d; d++) { var f = a[d], g = this._getItemLayoutPosition(f); g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g) } this._processLayoutQueue(c) } }, g.prototype._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, g.prototype._processLayoutQueue = function (a) { for (var b = 0, c = a.length; c > b; b++) { var d = a[b]; this._positionItem(d.item, d.x, d.y, d.isInstant) } }, g.prototype._positionItem = function (a, b, c, d) { d ? a.goTo(b, c) : a.moveTo(b, c) }, g.prototype._postLayout = function () { this.resizeContainer() }, g.prototype.resizeContainer = function () { if (this.options.isResizingContainer) { var a = this._getContainerSize(); a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1)) } }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function (a, b) { if (void 0 !== a) { var c = this.size; c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px" } }, g.prototype._emitCompleteOnItems = function (a, b) { function c() { e.dispatchEvent(a + "Complete", null, [b]) } function d() { g++, g === f && c() } var e = this, f = b.length; if (!b || !f) return void c(); for (var g = 0, h = 0, i = b.length; i > h; h++) { var j = b[h]; j.once(a, d) } }, g.prototype.dispatchEvent = function (a, b, c) { var d = b ? [b].concat(c) : c; if (this.emitEvent(a, d), i) if (this.$element = this.$element || i(this.element), b) { var e = i.Event(b); e.type = a, this.$element.trigger(e, c) } else this.$element.trigger(a, c) }, g.prototype.ignore = function (a) { var b = this.getItem(a); b && (b.isIgnored = !0) }, g.prototype.unignore = function (a) { var b = this.getItem(a); b && delete b.isIgnored }, g.prototype.stamp = function (a) { if (a = this._find(a)) { this.stamps = this.stamps.concat(a); for (var b = 0, c = a.length; c > b; b++) { var d = a[b]; this.ignore(d) } } }, g.prototype.unstamp = function (a) { if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) { var d = a[b]; e.removeFrom(this.stamps, d), this.unignore(d) } }, g.prototype._find = function (a) { return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0 }, g.prototype._manageStamps = function () { if (this.stamps && this.stamps.length) { this._getBoundingRect(); for (var a = 0, b = this.stamps.length; b > a; a++) { var c = this.stamps[a]; this._manageStamp(c) } } }, g.prototype._getBoundingRect = function () { var a = this.element.getBoundingClientRect(), b = this.size; this._boundingRect = { left: a.left + b.paddingLeft + b.borderLeftWidth, top: a.top + b.paddingTop + b.borderTopWidth, right: a.right - (b.paddingRight + b.borderRightWidth), bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth) } }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function (a) { var b = a.getBoundingClientRect(), c = this._boundingRect, e = d(a), f = { left: b.left - c.left - e.marginLeft, top: b.top - c.top - e.marginTop, right: c.right - b.right - e.marginRight, bottom: c.bottom - b.bottom - e.marginBottom }; return f }, g.prototype.handleEvent = function (a) { var b = "on" + a.type; this[b] && this[b](a) }, g.prototype.bindResize = function () { this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0) }, g.prototype.unbindResize = function () { this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1 }, g.prototype.onresize = function () { function a() { b.resize(), delete b.resizeTimeout } this.resizeTimeout && clearTimeout(this.resizeTimeout); var b = this; this.resizeTimeout = setTimeout(a, 100) }, g.prototype.resize = function () { this.isResizeBound && this.needsResizeLayout() && this.layout() }, g.prototype.needsResizeLayout = function () { var a = d(this.element), b = this.size && a; return b && a.innerWidth !== this.size.innerWidth }, g.prototype.addItems = function (a) { var b = this._itemize(a); return b.length && (this.items = this.items.concat(b)), b }, g.prototype.appended = function (a) { var b = this.addItems(a); b.length && (this.layoutItems(b, !0), this.reveal(b)) }, g.prototype.prepended = function (a) { var b = this._itemize(a); if (b.length) { var c = this.items.slice(0); this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c) } }, g.prototype.reveal = function (a) { this._emitCompleteOnItems("reveal", a); for (var b = a && a.length, c = 0; b && b > c; c++) { var d = a[c]; d.reveal() } }, g.prototype.hide = function (a) { this._emitCompleteOnItems("hide", a); for (var b = a && a.length, c = 0; b && b > c; c++) { var d = a[c]; d.hide() } }, g.prototype.revealItemElements = function (a) { var b = this.getItems(a); this.reveal(b) }, g.prototype.hideItemElements = function (a) { var b = this.getItems(a); this.hide(b) }, g.prototype.getItem = function (a) { for (var b = 0, c = this.items.length; c > b; b++) { var d = this.items[b]; if (d.element === a) return d } }, g.prototype.getItems = function (a) { a = e.makeArray(a); for (var b = [], c = 0, d = a.length; d > c; c++) { var f = a[c], g = this.getItem(f); g && b.push(g) } return b }, g.prototype.remove = function (a) { var b = this.getItems(a); if (this._emitCompleteOnItems("remove", b), b && b.length) for (var c = 0, d = b.length; d > c; c++) { var f = b[c]; f.remove(), e.removeFrom(this.items, f) } }, g.prototype.destroy = function () { var a = this.element.style; a.height = "", a.position = "", a.width = ""; for (var b = 0, c = this.items.length; c > b; b++) { var d = this.items[b]; d.destroy() } this.unbindResize(); var e = this.element.outlayerGUID; delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace) }, g.data = function (a) { a = e.getQueryElement(a); var b = a && a.outlayerGUID; return b && l[b] }, g.create = function (a, b) { function c() { g.apply(this, arguments) } return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function () { f.apply(this, arguments) }, c.Item.prototype = new f, e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c }, g.Item = f, g }), function (a, b) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils) }(window, function (a, b, c) { var d = a.create("masonry"); return d.prototype._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(); var a = this.cols; for (this.colYs = []; a--;) this.colYs.push(0); this.maxY = 0 }, d.prototype.measureColumns = function () { if (this.getContainerWidth(), !this.columnWidth) { var a = this.items[0], c = a && a.element; this.columnWidth = c && b(c).outerWidth || this.containerWidth } var d = this.columnWidth += this.gutter, e = this.containerWidth + this.gutter, f = e / d, g = d - e % d, h = g && 1 > g ? "round" : "floor"; f = Math[h](f), this.cols = Math.max(f, 1) }, d.prototype.getContainerWidth = function () { var a = this.options.isFitWidth ? this.element.parentNode : this.element, c = b(a); this.containerWidth = c && c.innerWidth }, d.prototype._getItemLayoutPosition = function (a) { a.getSize(); var b = a.size.outerWidth % this.columnWidth, d = b && 1 > b ? "round" : "ceil", e = Math[d](a.size.outerWidth / this.columnWidth); e = Math.min(e, this.cols); for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = { x: this.columnWidth * h, y: g }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j; return i }, d.prototype._getColGroup = function (a) { if (2 > a) return this.colYs; for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) { var e = this.colYs.slice(d, d + a); b[d] = Math.max.apply(Math, e) } return b }, d.prototype._manageStamp = function (a) { var c = b(a), d = this._getElementOffset(a), e = this.options.isOriginLeft ? d.left : d.right, f = e + c.outerWidth, g = Math.floor(e / this.columnWidth); g = Math.max(0, g); var h = Math.floor(f / this.columnWidth); h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h); for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j]) }, d.prototype._getContainerSize = function () { this.maxY = Math.max.apply(Math, this.colYs); var a = { height: this.maxY }; return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a }, d.prototype._getContainerFitWidth = function () { for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++; return (this.cols - a) * this.columnWidth - this.gutter }, d.prototype.needsResizeLayout = function () { var a = this.containerWidth; return this.getContainerWidth(), a !== this.containerWidth }, d });

(function () { "use strict"; function e() { } function t(e, t) { for (var n = e.length; n--;) if (e[n].listener === t) return n; return -1 } function n(e) { return function () { return this[e].apply(this, arguments) } } var i = e.prototype, r = this, s = r.EventEmitter; i.getListeners = function (e) { var t, n, i = this._getEvents(); if ("object" == typeof e) { t = {}; for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]) } else t = i[e] || (i[e] = []); return t }, i.flattenListeners = function (e) { var t, n = []; for (t = 0; t < e.length; t += 1) n.push(e[t].listener); return n }, i.getListenersAsObject = function (e) { var t, n = this.getListeners(e); return n instanceof Array && (t = {}, t[e] = n), t || n }, i.addListener = function (e, n) { var i, r = this.getListenersAsObject(e), s = "object" == typeof n; for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(s ? n : { listener: n, once: !1 }); return this }, i.on = n("addListener"), i.addOnceListener = function (e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = n("addOnceListener"), i.defineEvent = function (e) { return this.getListeners(e), this }, i.defineEvents = function (e) { for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]); return this }, i.removeListener = function (e, n) { var i, r, s = this.getListenersAsObject(e); for (r in s) s.hasOwnProperty(r) && (i = t(s[r], n), -1 !== i && s[r].splice(i, 1)); return this }, i.off = n("removeListener"), i.addListeners = function (e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function (e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function (e, t, n) { var i, r, s = e ? this.removeListener : this.addListener, o = e ? this.removeListeners : this.addListeners; if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) s.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? s.call(this, i, r) : o.call(this, i, r)); return this }, i.removeEvent = function (e) { var t, n = typeof e, i = this._getEvents(); if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events; return this }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) { var n, i, r, s, o = this.getListenersAsObject(e); for (r in o) if (o.hasOwnProperty(r)) for (i = o[r].length; i--;) n = o[r][i], n.once === !0 && this.removeListener(e, n.listener), s = n.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, n.listener); return this }, i.trigger = n("emitEvent"), i.emit = function (e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function (e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function () { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, i._getEvents = function () { return this._events || (this._events = {}) }, e.noConflict = function () { return r.EventEmitter = s, e }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e }).call(this), function (e) { function t(t) { var n = e.event; return n.target = n.target || n.srcElement || t, n } var n = document.documentElement, i = function () { }; n.addEventListener ? i = function (e, t, n) { e.addEventListener(t, n, !1) } : n.attachEvent && (i = function (e, n, i) { e[n + i] = i.handleEvent ? function () { var n = t(e); i.handleEvent.call(i, n) } : function () { var n = t(e); i.call(e, n) }, e.attachEvent("on" + n, e[n + i]) }); var r = function () { }; n.removeEventListener ? r = function (e, t, n) { e.removeEventListener(t, n, !1) } : n.detachEvent && (r = function (e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } }); var s = { bind: i, unbind: r }; "function" == typeof define && define.amd ? define("eventie/eventie", s) : e.eventie = s }(this), function (e, t) { "use strict"; "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) { return t(e, n, i) }) : "object" == typeof module && module.exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie) }(window, function (e, t, n) { function i(e, t) { for (var n in t) e[n] = t[n]; return e } function r(e) { return "[object Array]" == f.call(e) } function s(e) { var t = []; if (r(e)) t = e; else if ("number" == typeof e.length) for (var n = 0; n < e.length; n++) t.push(e[n]); else t.push(e); return t } function o(e, t, n) { if (!(this instanceof o)) return new o(e, t, n); "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = s(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), u && (this.jqDeferred = new u.Deferred); var r = this; setTimeout(function () { r.check() }) } function h(e) { this.img = e } function a(e, t) { this.url = e, this.element = t, this.img = new Image } var u = e.jQuery, c = e.console, f = Object.prototype.toString; o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function () { this.images = []; for (var e = 0; e < this.elements.length; e++) { var t = this.elements[e]; this.addElementImages(t) } }, o.prototype.addElementImages = function (e) { "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e); var t = e.nodeType; if (t && d[t]) { for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) { var r = n[i]; this.addImage(r) } if ("string" == typeof this.options.background) { var s = e.querySelectorAll(this.options.background); for (i = 0; i < s.length; i++) { var o = s[i]; this.addElementBackgroundImages(o) } } } }; var d = { 1: !0, 9: !0, 11: !0 }; o.prototype.addElementBackgroundImages = function (e) { for (var t = m(e), n = /url\(['"]*([^'"\)]+)['"]*\)/gi, i = n.exec(t.backgroundImage) ; null !== i;) { var r = i && i[1]; r && this.addBackground(r, e), i = n.exec(t.backgroundImage) } }; var m = e.getComputedStyle || function (e) { return e.currentStyle }; return o.prototype.addImage = function (e) { var t = new h(e); this.images.push(t) }, o.prototype.addBackground = function (e, t) { var n = new a(e, t); this.images.push(n) }, o.prototype.check = function () { function e(e, n, i) { setTimeout(function () { t.progress(e, n, i) }) } var t = this; if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete(); for (var n = 0; n < this.images.length; n++) { var i = this.images[n]; i.once("progress", e), i.check() } }, o.prototype.progress = function (e, t, n) { this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emit("progress", this, e, t), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && c && c.log("progress: " + n, e, t) }, o.prototype.complete = function () { var e = this.hasAnyBroken ? "fail" : "done"; if (this.isComplete = !0, this.emit(e, this), this.emit("always", this), this.jqDeferred) { var t = this.hasAnyBroken ? "reject" : "resolve"; this.jqDeferred[t](this) } }, h.prototype = new t, h.prototype.check = function () { var e = this.getIsImageComplete(); return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, n.bind(this.proxyImage, "load", this), n.bind(this.proxyImage, "error", this), n.bind(this.img, "load", this), n.bind(this.img, "error", this), void (this.proxyImage.src = this.img.src)) }, h.prototype.getIsImageComplete = function () { return this.img.complete && void 0 !== this.img.naturalWidth }, h.prototype.confirm = function (e, t) { this.isLoaded = e, this.emit("progress", this, this.img, t) }, h.prototype.handleEvent = function (e) { var t = "on" + e.type; this[t] && this[t](e) }, h.prototype.onload = function () { this.confirm(!0, "onload"), this.unbindEvents() }, h.prototype.onerror = function () { this.confirm(!1, "onerror"), this.unbindEvents() }, h.prototype.unbindEvents = function () { n.unbind(this.proxyImage, "load", this), n.unbind(this.proxyImage, "error", this), n.unbind(this.img, "load", this), n.unbind(this.img, "error", this) }, a.prototype = new h, a.prototype.check = function () { n.bind(this.img, "load", this), n.bind(this.img, "error", this), this.img.src = this.url; var e = this.getIsImageComplete(); e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents()) }, a.prototype.unbindEvents = function () { n.unbind(this.img, "load", this), n.unbind(this.img, "error", this) }, a.prototype.confirm = function (e, t) { this.isLoaded = e, this.emit("progress", this, this.element, t) }, o.makeJQueryPlugin = function (t) { t = t || e.jQuery, t && (u = t, u.fn.imagesLoaded = function (e, t) { var n = new o(this, e, t); return n.jqDeferred.promise(u(this)) }) }, o.makeJQueryPlugin(), o });
//=======================End Masonry Bootstrap