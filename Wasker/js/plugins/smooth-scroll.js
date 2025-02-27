//
// SmoothScroll for websites v1.4.5 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me.
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any
// extension for browsers or native application
// without getting a written permission first.
//
(function () {
    var Y = window.self !== window.top;

    function C() {
        if (!D && document.body) {
            D = !0;
            var a = document.body,
                b = document.documentElement,
                d = window.innerHeight,
                c = a.scrollHeight;
            k = 0 <= document.compatMode.indexOf("CSS") ? b : a;
            m = a;
            f.keyboardSupport && window.addEventListener("keydown", J, {
                passive: false
            });
            if (top != self) u = !0;
            else if (Y && c > d && (a.offsetHeight <= d || b.offsetHeight <= d)) {
                var e = document.createElement("div");
                e.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + k.scrollHeight + "px";
                document.body.appendChild(e);
                var h;
                v = function () {
                    h ||
                        (h = setTimeout(function () {
                            e.style.height = "0";
                            e.style.height = k.scrollHeight + "px";
                            h = null
                        }, 500))
                };
                setTimeout(v, 10);
                window.addEventListener("resize", v, {
                    passive: false
                });
                A = new Z(v);
                A.observe(a, {
                    attributes: !0,
                    childList: !0,
                    characterData: !1
                });
                k.offsetHeight <= d && (d = document.createElement("div"), d.style.clear = "both", a.appendChild(d))
            }
            f.fixedBackground || (a.style.backgroundAttachment = "scroll", b.style.backgroundAttachment = "scroll")
        }
    }

    function K(a, b, d) {
        aa(b, d);
        if (1 != f.accelerationMax) {
            var c = Date.now() - E;
            c < f.accelerationDelta &&
                (c = (1 + 50 / c) / 2, 1 < c && (c = Math.min(c, f.accelerationMax), b *= c, d *= c));
            E = Date.now()
        }
        t.push({
            x: b,
            y: d,
            lastX: 0 > b ? .99 : -.99,
            lastY: 0 > d ? .99 : -.99,
            start: Date.now()
        });
        if (!F) {
            var e = a === document.body,
                h = function (c) {
                    c = Date.now();
                    for (var g = 0, k = 0, l = 0; l < t.length; l++) {
                        var n = t[l],
                            p = c - n.start,
                            m = p >= f.animationTime,
                            q = m ? 1 : p / f.animationTime;
                        f.pulseAlgorithm && (p = q, 1 <= p ? q = 1 : 0 >= p ? q = 0 : (1 == f.pulseNormalize && (f.pulseNormalize /= L(1)), q = L(p)));
                        p = n.x * q - n.lastX >> 0;
                        q = n.y * q - n.lastY >> 0;
                        g += p;
                        k += q;
                        n.lastX += p;
                        n.lastY += q;
                        m && (t.splice(l, 1), l--)
                    }
                    e ?
                        window.scrollBy(g, k) : (g && (a.scrollLeft += g), k && (a.scrollTop += k));
                    b || d || (t = []);
                    t.length ? M(h, a, 1E3 / f.frameRate + 1) : F = !1
                };
            M(h, a, 0);
            F = !0
        }
    }

    function N(a) {
        D || C();
        var b = a.target;
        if (a.defaultPrevented || a.ctrlKey || r(m, "embed") || r(b, "embed") && /\.pdf/i.test(b.src) || r(m, "object") || b.shadowRoot) return !0;
        var d = -a.wheelDeltaX || a.deltaX || 0,
            c = -a.wheelDeltaY || a.deltaY || 0;
        ba && (a.wheelDeltaX && w(a.wheelDeltaX, 120) && (d = -120 * (a.wheelDeltaX / Math.abs(a.wheelDeltaX))), a.wheelDeltaY && w(a.wheelDeltaY, 120) && (c = -120 * (a.wheelDeltaY /
            Math.abs(a.wheelDeltaY))));
        d || c || (c = -a.wheelDelta || 0);
        1 === a.deltaMode && (d *= 40, c *= 40);
        b = O(b);
        if (!b) return u && G ? (Object.defineProperty(a, "target", {
            value: window.frameElement
        }), a = new a.constructor(a.type, a), parent.dispatchEvent(a)) : !0;
        if (!f.touchpadSupport && ca(c)) return !0;
        1.2 < Math.abs(d) && (d *= f.stepSize / 120);
        1.2 < Math.abs(c) && (c *= f.stepSize / 120);
        K(b, d, c);
        a.preventDefault();
        P()
    }

    function J(a) {
        var b = a.target,
            d = a.ctrlKey || a.altKey || a.metaKey || a.shiftKey && a.keyCode !== h.spacebar;
        document.body.contains(m) || (m =
            document.activeElement);
        var c = /^(textarea|select|embed|object)$/i,
            e = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (!(c = a.defaultPrevented || c.test(b.nodeName) || r(b, "input") && !e.test(b.type) || r(m, "video"))) {
            var c = a.target,
                g = !1;
            if (-1 != document.URL.indexOf("www.youtube.com/watch")) {
                do
                    if (g = c.classList && c.classList.contains("html5-video-controls")) break; while (c = c.parentNode)
            }
            c = g
        }
        if (c || b.isContentEditable || d || (r(b, "button") || r(b, "input") && e.test(b.type)) && a.keyCode === h.spacebar || r(b, "input") &&
            "radio" == b.type && da[a.keyCode]) return !0;
        c = b = 0;
        d = O(m);
        if (!d) return u && G ? parent.keydown(a) : !0;
        e = d.clientHeight;
        d == document.body && (e = window.innerHeight);
        switch (a.keyCode) {
            case h.up:
                c = -f.arrowScroll;
                break;
            case h.down:
                c = f.arrowScroll;
                break;
            case h.spacebar:
                c = a.shiftKey ? 1 : -1;
                c = -c * e * .9;
                break;
            case h.pageup:
                c = .9 * -e;
                break;
            case h.pagedown:
                c = .9 * e;
                break;
            case h.home:
                c = -d.scrollTop;
                break;
            case h.end:
                e = d.scrollHeight - d.scrollTop - e;
                c = 0 < e ? e + 10 : 0;
                break;
            case h.left:
                b = -f.arrowScroll;
                break;
            case h.right:
                b = f.arrowScroll;
                break;
            default:
                return !0
        }
        K(d, b, c);
        a.preventDefault();
        P()
    }

    function Q(a) {
        m = a.target
    }

    function P() {
        clearTimeout(R);
        R = setInterval(function () {
            H = {}
        }, 1E3)
    }

    function I(a, b) {
        for (var d = a.length; d--;) H[S(a[d])] = b;
        return b
    }

    function O(a) {
        var b = [],
            d = document.body,
            c = k.scrollHeight;
        do {
            var e = H[S(a)];
            if (e) return I(b, e);
            b.push(a);
            if (c === a.scrollHeight) {
                if (e = T(k) && T(d) || U(k), u && k.clientHeight + 10 < k.scrollHeight || !u && e) return I(b, ea())
            } else if (a.clientHeight + 10 < a.scrollHeight && U(a)) return I(b, a)
        } while (a = a.parentElement)
    }

    function T(a) {
        return "hidden" !==
            getComputedStyle(a, "").getPropertyValue("overflow-y")
    }

    function U(a) {
        a = getComputedStyle(a, "").getPropertyValue("overflow-y");
        return "scroll" === a || "auto" === a
    }

    function r(a, b) {
        return (a.nodeName || "").toLowerCase() === b.toLowerCase()
    }

    function aa(a, b) {
        a = 0 < a ? 1 : -1;
        b = 0 < b ? 1 : -1;
        if (B.x !== a || B.y !== b) B.x = a, B.y = b, t = [], E = 0
    }

    function ca(a) {
        if (a) return l.length || (l = [a, a, a]), a = Math.abs(a), l.push(a), l.shift(), clearTimeout(V), V = setTimeout(function () {
            try {
                localStorage.SS_deltaBuffer = l.join(",")
            } catch (a) {}
        }, 1E3), !W(120) && !W(100)
    }

    function w(a, b) {
        return Math.floor(a / b) == a / b
    }

    function W(a) {
        return w(l[0], a) && w(l[1], a) && w(l[2], a)
    }

    function L(a) {
        var b;
        a *= f.pulseScale;
        1 > a ? b = a - (1 - Math.exp(-a)) : (b = Math.exp(-1), --a, a = 1 - Math.exp(-a), b += a * (1 - b));
        return b * f.pulseNormalize
    }

    function x(a) {
        for (var b in a) X.hasOwnProperty(b) && (f[b] = a[b])
    }
    var X = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !1,
            fixedBackground: !0,
            excluded: ""
        },
        f = X,
        u = !1,
        B = {
            x: 0,
            y: 0
        },
        D = !1,
        k = document.documentElement,
        m, A, v, l = [],
        ba = /^Mac/.test(navigator.platform),
        h = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        da = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        },
        t = [],
        F = !1,
        E = Date.now(),
        S = function () {
            var a = 0;
            return function (b) {
                return b.uniqueID || (b.uniqueID = a++)
            }
        }(),
        H = {},
        R, V;
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        l = localStorage.SS_deltaBuffer.split(",")
    } catch (C) {}
    var G, Z = function (a, b) {
        function d() {
            this.a = a
        }
        d.prototype = {
            observe: function () {},
            disconnect: function () {}
        };
        return b && (window.MutationObserver = b, Z = new b(d))
    };
    window.addEventListener("mousedown", Q, {
        passive: false
    });
    window.addEventListener("mousewheel", N, {
        passive: false
    });
    window.addEventListener("wheel", N, {
        passive: false
    });
    window.addEventListener("load", C, {
        passive: false
    });
    window.addEventListener("DOMContentLoaded", C, {
        passive: false
    });
    window.addEventListener("resize", v, {
        passive: false
    });
    x.destroy = function () {
        A && A.disconnect();
        window.removeEventListener("mousedown", Q, {
            passive: false
        });
        window.removeEventListener("keydown", J, {
            passive: false
        });
        window.removeEventListener("resize", v, {
            passive: false
        });
        window.removeEventListener("load", C, {
            passive: false
        });
        window.removeEventListener("DOMContentLoaded", C, {
            passive: false
        });
        window.removeEventListener("mousewheel", N, {
            passive: false
        });
        window.removeEventListener("wheel", N, {
            passive: false
        })
    };
    window.SmoothScrollOptions && x(window.SmoothScrollOptions);
    "function" === typeof define && define.amd ? define(function () {
            return x
        }) : "object" == typeof exports ?
        module.exports = x : window.SmoothScroll = x
})();

// SmoothScroll for websites
// Licensed under the terms of the MIT license.
