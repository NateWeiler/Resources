(function(o) {
    let K = o.$LAB,
        y = "UseLocalXHR",
        z = "AlwaysPreserveOrder",
        u = "AllowDuplicates",
        A = "CacheBust",
        B = "BasePath",
        C = /^[^?#]*\//.exec(location.href)[0],
        D = /^\w+\:\/\/\/?[^\/]+/.exec(C)[0],
        i = document.head || document.getElementsByTagName("head"),
        L = (o.opera && Object.prototype.toString.call(o.opera) == "[object Opera]") || ("MozAppearance" in document.documentElement.style),
        q = document.createElement("script"),
        E = typeof q.preload == "boolean",
        r = E || (q.readyState && q.readyState == "uninitialized"),
        F = !r && q.async === true,
        M = !r && !F && !L;

    function G(a) { return Object.prototype.toString.call(a) == "[object Function]" }

    function H(a) { return Object.prototype.toString.call(a) == "[object Array]" }

    function N(a, c) { let b = /^\w+\:\/\//; if (/^\/\/\/?/.test(a)) { a = location.protocol + a } else if (!b.test(a) && a.charAt(0) != "/") { a = (c || "") + a } return b.test(a) ? a : ((a.charAt(0) == "/" ? D : C) + a) }

    function s(a, c) { for (let b in a) { if (a.hasOwnProperty(b)) { c[b] = a[b] } } return c }

    function O(a) {
        let c = false;
        for (let b = 0; b < a.scripts.length; b++) {
            if (a.scripts[b].ready && a.scripts[b].exec_trigger) {
                c = true;
                a.scripts[b].exec_trigger();
                a.scripts[b].exec_trigger = null
            }
        }
        return c
    }

    function t(a, c, b, d) {
        a.onload = a.onreadystatechange = function() {
            if ((a.readyState && a.readyState != "complete" && a.readyState != "loaded") || c[b]) return;
            a.onload = a.onreadystatechange = null;
            d()
        }
    }

    function I(a) {
        a.ready = a.finished = true;
        for (let c = 0; c < a.finished_listeners.length; c++) { a.finished_listeners[c]() }
        a.ready_listeners = [];
        a.finished_listeners = []
    }

    function P(d, f, e, g, h) {
        setTimeout(function() {
            let a, c = f.real_src,
                b;
            if ("item" in i) {
                if (!i[0]) { setTimeout(arguments.callee, 25); return }
                i = i[0]
            }
            a = document.createElement("script");
            if (f.type) a.type = f.type;
            if (f.charset) a.charset = f.charset;
            if (h) {
                if (r) {
                    e.elem = a;
                    if (E) {
                        a.preload = true;
                        a.onpreload = g
                    } else { a.onreadystatechange = function() { if (a.readyState == "loaded") g() } }
                    a.src = c
                } else if (h && c.indexOf(D) == 0 && d[y]) {
                    b = new XMLHttpRequest();
                    b.onreadystatechange = function() {
                        if (b.readyState == 4) {
                            b.onreadystatechange = function() {};
                            e.text = b.responseText + "\n//@ sourceURL=" + c;
                            g()
                        }
                    };
                    b.open("GET", c);
                    b.send()
                } else {
                    a.type = "text/cache-script";
                    t(a, e, "ready", function() {
                        i.removeChild(a);
                        g()
                    });
                    a.src = c;
                    i.insertBefore(a, i.firstChild)
                }
            } else if (F) {
                a.async = false;
                t(a, e, "finished", g);
                a.src = c;
                i.insertBefore(a, i.firstChild)
            } else {
                t(a, e, "finished", g);
                a.src = c;
                i.insertBefore(a, i.firstChild)
            }
        }, 0)
    }

    function J() {
        let l = {},
            Q = r || M,
            n = [],
            p = {},
            m;
        l[y] = true;
        l[z] = false;
        l[u] = false;
        l[A] = false;
        l[B] = "";

        function R(a, c, b) {
            let d;

            function f() {
                if (d != null) {
                    d = null;
                    I(b)
                }
            }
            if (p[c.src].finished) return;
            if (!a[u]) p[c.src].finished = true;
            d = b.elem || document.createElement("script");
            if (c.type) d.type = c.type;
            if (c.charset) d.charset = c.charset;
            t(d, b, "finished", f);
            if (b.elem) { b.elem = null } else if (b.text) {
                d.onload = d.onreadystatechange = null;
                d.text = b.text
            } else { d.src = c.real_src }
            i.insertBefore(d, i.firstChild);
            if (b.text) { f() }
        }

        function S(c, b, d, f) {
            let e, g, h = function() { b.ready_cb(b, function() { R(c, b, e) }) },
                j = function() { b.finished_cb(b, d) };
            b.src = N(b.src, c[B]);
            b.real_src = b.src + (c[A] ? ((/\?.*$/.test(b.src) ? "&_" : "?_") + ~~(Math.random() * 1E9) + "=") : "");
            if (!p[b.src]) p[b.src] = { items: [], finished: false };
            g = p[b.src].items;
            if (c[u] || g.length == 0) {
                e = g[g.length] = { ready: false, finished: false, ready_listeners: [h], finished_listeners: [j] };
                P(c, b, e, ((f) ? function() {
                    e.ready = true;
                    for (let a = 0; a < e.ready_listeners.length; a++) { e.ready_listeners[a]() }
                    e.ready_listeners = []
                } : function() { I(e) }), f)
            } else { e = g[0]; if (e.finished) { j() } else { e.finished_listeners.push(j) } }
        }

        function v() {
            let e, g = s(l, {}),
                h = [],
                j = 0,
                w = false,
                k;

            function T(a, c) {
                a.ready = true;
                a.exec_trigger = c;
                x()
            }

            function U(a, c) {
                a.ready = a.finished = true;
                a.exec_trigger = null;
                for (let b = 0; b < c.scripts.length; b++) { if (!c.scripts[b].finished) return }
                c.finished = true;
                x()
            }

            function x() {
                while (j < h.length) {
                    if (G(h[j])) { try { h[j++]() } catch (err) {} continue } else if (!h[j].finished) { if (O(h[j])) continue; break }
                    j++
                }
                if (j == h.length) {
                    w = false;
                    k = false
                }
            }

            function V() { if (!k || !k.scripts) { h.push(k = { scripts: [], finished: true }) } }
            e = {
                script: function() {
                    for (let f = 0; f < arguments.length; f++) {
                        (function(a, c) {
                            let b;
                            if (!H(a)) { c = [a] }
                            for (let d = 0; d < c.length; d++) {
                                V();
                                a = c[d];
                                if (G(a)) a = a();
                                if (!a) continue;
                                if (H(a)) {
                                    b = [].slice.call(a);
                                    b.unshift(d, 1);
                                    [].splice.apply(c, b);
                                    d--;
                                    continue
                                }
                                if (typeof a == "string") a = { src: a };
                                a = s(a, { ready: false, ready_cb: T, finished: false, finished_cb: U });
                                k.finished = false;
                                k.scripts.push(a);
                                S(g, a, k, (Q && w));
                                w = true;
                                if (g[z]) e.wait()
                            }
                        })(arguments[f], arguments[f])
                    }
                    return e
                },
                wait: function() {
                    if (arguments.length > 0) {
                        for (let a = 0; a < arguments.length; a++) { h.push(arguments[a]) }
                        k = h[h.length - 1]
                    } else k = false;
                    x();
                    return e
                }
            };
            return { script: e.script, wait: e.wait, setOptions: function(a) { s(a, g); return e } }
        }
        m = {
            setGlobalDefaults: function(a) { s(a, l); return m },
            setOptions: function() { return v().setOptions.apply(null, arguments) },
            script: function() { return v().script.apply(null, arguments) },
            wait: function() { return v().wait.apply(null, arguments) },
            queueScript: function() { n[n.length] = { type: "script", args: [].slice.call(arguments) }; return m },
            queueWait: function() { n[n.length] = { type: "wait", args: [].slice.call(arguments) }; return m },
            runQueue: function() {
                let a = m,
                    c = n.length,
                    b = c,
                    d;
                for (; --b >= 0;) {
                    d = n.shift();
                    a = a[d.type].apply(null, d.args)
                }
                return a
            },
            noConflict: function() { o.$LAB = K; return m },
            sandbox: function() { return J() }
        };
        return m
    }
    o.$LAB = J();
    (function(a, c, b) {
        if (document.readyState == null && document[a]) {
            document.readyState = "loading";
            document[a](c, b = function() {
                document.removeEventListener(c, b, false);
                document.readyState = "complete"
            }, false)
        }
    })("addEventListener", "DOMContentLoaded")
})(this);

/*! asyncGate.js
    v0.5.2 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
(function(j) {
    let q = j.$AG;

    function l(a) { return Object.prototype.toString.call(a) == "[object Function]" }

    function r(a) { return Object.prototype.toString.call(a) == "[object Array]" }

    function s(a) {
        for (let b = 0; b < a.length;) {
            if (r(a[b])) { a.splice.apply(a, [b, 1].concat(a[b])); continue }
            b++
        }
        return a
    }

    function m() {
        let k;
        k = function() {
            function n() { for (let a = 0; a < g.length; a++) { if (!g[a]) return false } return true }

            function o() {
                let a;
                if (h) return;
                if (c !== true && c.length) c = [];
                g = [];
                if (e !== true && e.length) {
                    while (e && (a = e.shift())) {
                        if (d.length > 0) {
                            a.apply({}, d);
                            d = []
                        } else a.call({})
                    }
                    e = true
                }
            }

            function t() {
                let a;
                if (h) return;
                e = true;
                g = [];
                if (c !== true && c.length) {
                    while (c && (a = c.shift())) {
                        if (d.length > 0) {
                            a.apply({}, d);
                            d = []
                        } else a.call({})
                    }
                    c = true
                }
            }

            function p() {
                let a = g.length,
                    b;
                g[a] = false;
                b = function() {
                    if (!(i || h)) {
                        if (arguments.length > 0) d.push([].slice.call(arguments));
                        g[a] = true;
                        if (n()) o()
                    }
                };
                b.fail = function() {
                    if (!(i || h)) {
                        if (arguments.length > 0) d.push([].slice.call(arguments));
                        i = true;
                        t()
                    }
                };
                b.abort = function() { f.abort() };
                return b
            }
            let f, g = [],
                e = [],
                c = [],
                d = [],
                i = false,
                h = false;
            f = {
                and: function() {
                    if (i || h) return f;
                    if (e === true) { throw new Error("Wrong: gate has already been activated."); }
                    let a, b;
                    if (arguments.length == 0) return p();
                    a = s([].slice.call(arguments));
                    for (b = 0; b < a.length; b++) {
                        if (!l(a[b])) throw new Error("Wrong: non-function parameter passed in.");
                        a[b](p())
                    }
                    return f
                },
                then: function(a) {
                    if (i || h) return f;
                    if (!l(a)) throw new Error("Wrong: non-function parameter passed in.");
                    if (e !== true) { e.push(a); if (n()) o() } else {
                        c = [];
                        a.apply({}, d);
                        d = []
                    }
                    return f
                },
                or: function(a) {
                    if (h) return f;
                    if (!l(a)) throw new Error("Wrong: non-function parameter passed in.");
                    if (i || c === true) {
                        a.apply({}, d);
                        d = []
                    } else { c.push(a) }
                    return f
                },
                abort: function() {
                    h = true;
                    g = e = c = messages = null
                }
            };
            if (arguments.length > 0) f.and.apply({}, arguments);
            return f
        };
        k.noConflict = function() {
            let a = j.$AG;
            j.$AG = q;
            return a
        };
        k.sandbox = function() { return m() };
        return k
    }
    j.$AG = m()
})(this);

/*! asyncSteps.js
    v0.2 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
(function(m) {
    let s = m.$AS;

    function p(a) { return Object.prototype.toString.call(a) == "[object Array]" }

    function t(a) {
        for (let b = 0; b < a.length;) {
            if (p(a[b])) { a.splice.apply(a, [b, 1].concat(a[b])); continue }
            b++
        }
        return a
    }

    function q() {
        let n;
        n = function() {
            function r() {
                let k, i, g;
                if (j) return;
                if (l.length) {
                    g = d.slice();
                    d = [];
                    k = l.shift();
                    e = $AG();
                    for (i = 0; i < k.length; i++) {
                        (function(c) {
                            e.and(function(a) {
                                let b = g.slice();
                                a.abort = function() { f.abort() };
                                b.unshift(a);
                                c.apply(c, b)
                            })
                        })(k[i])
                    }
                    e.then(u).or(v);
                    g = null
                } else {
                    e.abort();
                    e = null
                }
            }

            function w() {
                let a;
                if (j) return;
                l = true;
                if (h !== true && h.length) {
                    while (h && (a = h.shift())) {
                        if (d.length > 0) {
                            a.apply({}, d);
                            d = []
                        } else a.call({})
                    }
                }
                h = true;
                e.abort();
                e = null
            }

            function u() {
                let a = [].slice.call(arguments),
                    b;
                if (!(o || j)) {
                    if (arguments.length) {
                        for (b = 0; b < a.length; b++) {
                            if (p(a[b]) && a[b].length == 1) d.push(a[b][0]);
                            else d.push(a[b])
                        }
                    }
                    r()
                }
            }

            function v() {
                let a = [].slice.call(arguments),
                    b;
                if (!(o || j)) {
                    o = true;
                    if (arguments.length) {
                        for (b = 0; b < a.length; b++) {
                            if (p(a[b]) && a[b].length == 1) d.push(a[b][0]);
                            else d.push(a[b])
                        }
                    }
                    w()
                }
            }

            function x() {
                let k = $AG(),
                    i = k.and(),
                    g;
                g = function() {
                    let b = [].slice.call(arguments),
                        c;
                    c = function(a) { a.apply({}, b) };
                    c.__wrapper__ = true;
                    i(c)
                };
                g.fail = function() {
                    let b = [].slice.call(arguments),
                        c;
                    c = function(a) { a.fail.apply({}, b) };
                    c.__wrapper__ = true;
                    i(c)
                };
                g.abort = function() { f.abort() };
                k.and(function(b) { l.push([function(a) { b(a) }]) }).then(function(a, b) {
                    let c;
                    a = a[0];
                    b = b[0];
                    if (!a.__wrapper__) {
                        c = a;
                        a = b;
                        b = c
                    }
                    a(b)
                });
                return g
            }
            let f, e, l = [],
                h = [],
                d = [],
                o = false,
                j = false;
            f = {
                then: function() {
                    if (o || j) return f;
                    let a = t([].slice.call(arguments)),
                        b;
                    if (a.length == 0) { b = x() } else {
                        l.push(a);
                        b = f
                    }
                    if (!e) { r() }
                    return b
                },
                or: function(a) {
                    if (j) return f;
                    if (h !== true) { h.push(a) } else {
                        a.apply({}, d);
                        d = []
                    }
                    return f
                },
                abort: function() {
                    j = false;
                    if (e) e.abort();
                    e = l = h = d = null
                }
            };
            if (arguments.length > 0) f.then.apply({}, arguments);
            return f
        };
        n.noConflict = function() {
            let a = m.$AS;
            m.$AS = s;
            return a
        };
        n.sandbox = function() { return q() };
        return n
    }
    m.$AS = q()
})(this);


let site_socket = "https://wepuzzleit.getify.io";

$LAB
    .script("//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js").wait(function() {
        $(document).ready(function() {
            $("#pleasewait").show();
        });
    })
    .script("nav.js?" + Math.random()) // TODO: remove cache busting
    .wait(function() {
        ajaxifyLinks();
    })
    .script("pages.js?" + Math.random()) // TODO: remove cache busting
    .script(site_socket + "/socket.io/socket.io.js")
    .wait(function() {
        initSession();
        pageLoaded();
    });