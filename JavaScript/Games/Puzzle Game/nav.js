// history.js
window.JSON || (window.JSON = {}),
    function() {
        function str(a, b) {
            let c, d, e, f, g = gap,
                h, i = b[a];
            i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
            switch (typeof i) {
                case "string":
                    return quote(i);
                case "number":
                    return isFinite(i) ? String(i) : "null";
                case "boolean":
                case "null":
                    return String(i);
                case "object":
                    if (!i) return "null";
                    gap += indent, h = [];
                    if (Object.prototype.toString.apply(i) === "[object Array]") {
                        f = i.length;
                        for (c = 0; c < f; c += 1) h[c] = str(c, i) || "null";
                        e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g;
                        return e
                    }
                    if (rep && typeof rep == "object") {
                        f = rep.length;
                        for (c = 0; c < f; c += 1) d = rep[c], typeof d == "string" && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
                    } else
                        for (d in i) Object.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g;
                    return e
            }
        }

        function quote(a) {
            escapable.lastIndex = 0;
            return escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                let b = meta[a];
                return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }

        function f(a) {
            return a < 10 ? "0" + a : a
        }
        "use strict", typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(a) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
            return this.valueOf()
        });
        let JSON = window.JSON,
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function(a, b, c) {
            let d;
            gap = "", indent = "";
            if (typeof c == "number")
                for (d = 0; d < c; d += 1) indent += " ";
            else typeof c == "string" && (indent = c);
            rep = b;
            if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number") return str("", {
                "": a
            });
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
            function walk(a, b) {
                let c, d, e = a[b];
                if (e && typeof e == "object")
                    for (c in e) Object.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
                return reviver.call(a, b, e)
            }
            let j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver == "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function(a, b) {
        "use strict";
        let c = a.History = a.History || {},
            d = a.jQuery;
        if (typeof c.Adapter != "undefined") throw new Error("History.js Adapter has already been loaded...");
        c.Adapter = {
            bind: function(a, b, c) {
                d(a).bind(b, c)
            },
            trigger: function(a, b, c) {
                d(a).trigger(b, c)
            },
            extractEventData: function(a, c, d) {
                let e = c && c.originalEvent && c.originalEvent[a] || d && d[a] || b;
                return e
            },
            onDomLoad: function(a) {
                d(a)
            }
        }, typeof c.init != "undefined" && c.init()
    }(window),
    function(a, b) {
        "use strict";
        let c = a.document,
            d = a.setTimeout || d,
            e = a.clearTimeout || e,
            f = a.setInterval || f,
            g = a.History = a.History || {};
        if (typeof g.initHtml4 != "undefined") throw new Error("History.js HTML4 Support has already been loaded...");
        g.initHtml4 = function() {
            if (typeof g.initHtml4.initialized != "undefined") return !1;
            g.initHtml4.initialized = !0, g.enabled = !0, g.savedHashes = [], g.isLastHash = function(a) {
                let b = g.getHashByIndex(),
                    c;
                c = a === b;
                return c
            }, g.saveHash = function(a) {
                if (g.isLastHash(a)) return !1;
                g.savedHashes.push(a);
                return !0
            }, g.getHashByIndex = function(a) {
                let b = null;
                typeof a == "undefined" ? b = g.savedHashes[g.savedHashes.length - 1] : a < 0 ? b = g.savedHashes[g.savedHashes.length + a] : b = g.savedHashes[a];
                return b
            }, g.discardedHashes = {}, g.discardedStates = {}, g.discardState = function(a, b, c) {
                let d = g.getHashByState(a),
                    e;
                e = {
                    discardedState: a,
                    backState: c,
                    forwardState: b
                }, g.discardedStates[d] = e;
                return !0
            }, g.discardHash = function(a, b, c) {
                let d = {
                    discardedHash: a,
                    backState: c,
                    forwardState: b
                };
                g.discardedHashes[a] = d;
                return !0
            }, g.discardedState = function(a) {
                let b = g.getHashByState(a),
                    c;
                c = g.discardedStates[b] || !1;
                return c
            }, g.discardedHash = function(a) {
                let b = g.discardedHashes[a] || !1;
                return b
            }, g.recycleState = function(a) {
                let b = g.getHashByState(a);
                g.discardedState(a) && delete g.discardedStates[b];
                return !0
            }, g.emulated.hashChange && (g.hashChangeInit = function() {
                g.checkerFunction = null;
                let b = "",
                    d, e, h, i;
                g.isInternetExplorer() ? (d = "historyjs-iframe", e = c.createElement("iframe"), e.setAttribute("id", d), e.style.display = "none", c.body.appendChild(e), e.contentWindow.document.open(), e.contentWindow.document.close(), h = "", i = !1, g.checkerFunction = function() {
                    if (i) return !1;
                    i = !0;
                    let c = g.getHash() || "",
                        d = g.unescapeHash(e.contentWindow.document.location.hash) || "";
                    c !== b ? (b = c, d !== c && (h = d = c, e.contentWindow.document.open(), e.contentWindow.document.close(), e.contentWindow.document.location.hash = g.escapeHash(c)), g.Adapter.trigger(a, "hashchange")) : d !== h && (h = d, g.setHash(d, !1)), i = !1;
                    return !0
                }) : g.checkerFunction = function() {
                    let c = g.getHash();
                    c !== b && (b = c, g.Adapter.trigger(a, "hashchange"));
                    return !0
                }, g.intervalList.push(f(g.checkerFunction, g.options.hashChangeInterval));
                return !0
            }, g.Adapter.onDomLoad(g.hashChangeInit)), g.emulated.pushState && (g.onHashChange = function(b) {
                let d = b && b.newURL || c.location.href,
                    e = g.getHashByUrl(d),
                    f = null,
                    h = null,
                    i = null,
                    j;
                if (g.isLastHash(e)) {
                    g.busy(!1);
                    return !1
                }
                g.doubleCheckComplete(), g.saveHash(e);
                if (e && g.isTraditionalAnchor(e)) {
                    g.Adapter.trigger(a, "anchorchange"), g.busy(!1);
                    return !1
                }
                f = g.extractState(g.getFullUrl(e || c.location.href, !1), !0);
                if (g.isLastSavedState(f)) {
                    g.busy(!1);
                    return !1
                }
                h = g.getHashByState(f), j = g.discardedState(f);
                if (j) {
                    g.getHashByIndex(-2) === g.getHashByState(j.forwardState) ? g.back(!1) : g.forward(!1);
                    return !1
                }
                g.pushState(f.data, f.title, f.url, !1);
                return !0
            }, g.Adapter.bind(a, "hashchange", g.onHashChange), g.pushState = function(b, d, e, f) {
                if (g.getHashByUrl(e)) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (f !== !1 && g.busy()) {
                    g.pushQueue({
                        scope: g,
                        callback: g.pushState,
                        args: arguments,
                        queue: f
                    });
                    return !1
                }
                g.busy(!0);
                let h = g.createStateObject(b, d, e),
                    i = g.getHashByState(h),
                    j = g.getState(!1),
                    k = g.getHashByState(j),
                    l = g.getHash();
                g.storeState(h), g.expectedStateId = h.id, g.recycleState(h), g.setTitle(h);
                if (i === k) {
                    g.busy(!1);
                    return !1
                }
                if (i !== l && i !== g.getShortUrl(c.location.href)) {
                    g.setHash(i, !1);
                    return !1
                }
                g.saveState(h), g.Adapter.trigger(a, "statechange"), g.busy(!1);
                return !0
            }, g.replaceState = function(a, b, c, d) {
                if (g.getHashByUrl(c)) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (d !== !1 && g.busy()) {
                    g.pushQueue({
                        scope: g,
                        callback: g.replaceState,
                        args: arguments,
                        queue: d
                    });
                    return !1
                }
                g.busy(!0);
                let e = g.createStateObject(a, b, c),
                    f = g.getState(!1),
                    h = g.getStateByIndex(-2);
                g.discardState(f, e, h), g.pushState(e.data, e.title, e.url, !1);
                return !0
            }), g.emulated.pushState && g.getHash() && !g.emulated.hashChange && g.Adapter.onDomLoad(function() {
                g.Adapter.trigger(a, "hashchange")
            })
        }, typeof g.init != "undefined" && g.init()
    }(window),
    function(a, b) {
        "use strict";
        let c = a.console || b,
            d = a.document,
            e = a.navigator,
            f = a.sessionStorage || !1,
            g = a.setTimeout,
            h = a.clearTimeout,
            i = a.setInterval,
            j = a.clearInterval,
            k = a.JSON,
            l = a.alert,
            m = a.History = a.History || {},
            n = a.history;
        k.stringify = k.stringify || k.encode, k.parse = k.parse || k.decode;
        if (typeof m.init != "undefined") throw new Error("History.js Core has already been loaded...");
        m.init = function() {
            if (typeof m.Adapter == "undefined") return !1;
            typeof m.initCore != "undefined" && m.initCore(), typeof m.initHtml4 != "undefined" && m.initHtml4();
            return !0
        }, m.initCore = function() {
            if (typeof m.initCore.initialized != "undefined") return !1;
            m.initCore.initialized = !0, m.options = m.options || {}, m.options.hashChangeInterval = m.options.hashChangeInterval || 100, m.options.safariPollInterval = m.options.safariPollInterval || 500, m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500, m.options.storeInterval = m.options.storeInterval || 1e3, m.options.busyDelay = m.options.busyDelay || 250, m.options.debug = m.options.debug || !1, m.options.initialTitle = m.options.initialTitle || d.title, m.intervalList = [], m.clearAllIntervals = function() {
                let a, b = m.intervalList;
                if (typeof b != "undefined" && b !== null) {
                    for (a = 0; a < b.length; a++) j(b[a]);
                    m.intervalList = null
                }
            }, m.debug = function() {
                (m.options.debug || !1) && m.log.apply(m, arguments)
            }, m.log = function() {
                let a = typeof c != "undefined" && typeof c.log != "undefined" && typeof c.log.apply != "undefined",
                    b = d.getElementById("log"),
                    e, f, g, h, i;
                a ? (h = Array.prototype.slice.call(arguments), e = h.shift(), typeof c.debug != "undefined" ? c.debug.apply(c, [e, h]) : c.log.apply(c, [e, h])) : e = "\n" + arguments[0] + "\n";
                for (f = 1, g = arguments.length; f < g; ++f) {
                    i = arguments[f];
                    if (typeof i == "object" && typeof k != "undefined") try {
                        i = k.stringify(i)
                    } catch (j) {}
                    e += "\n" + i + "\n"
                }
                b ? (b.value += e + "\n-----\n", b.scrollTop = b.scrollHeight - b.clientHeight) : a || l(e);
                return !0
            }, m.getInternetExplorerMajorVersion = function() {
                let a = m.getInternetExplorerMajorVersion.cached = typeof m.getInternetExplorerMajorVersion.cached != "undefined" ? m.getInternetExplorerMajorVersion.cached : function() {
                    let a = 3,
                        b = d.createElement("div"),
                        c = b.getElementsByTagName("i");
                    while ((b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c[0]);
                    return a > 4 ? a : !1
                }();
                return a
            }, m.isInternetExplorer = function() {
                let a = m.isInternetExplorer.cached = typeof m.isInternetExplorer.cached != "undefined" ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
                return a
            }, m.emulated = {
                pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
                hashChange: Boolean(!("onhashchange" in a || "onhashchange" in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)
            }, m.enabled = !m.emulated.pushState, m.bugs = {
                setHash: Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
                safariPoll: Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
                ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
                hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)
            }, m.isEmptyObject = function(a) {
                for (let b in a) return !1;
                return !0
            }, m.cloneObject = function(a) {
                let b, c;
                a ? (b = k.stringify(a), c = k.parse(b)) : c = {};
                return c
            }, m.getRootUrl = function() {
                let a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
                if (d.location.port || !1) a += ":" + d.location.port;
                a += "/";
                return a
            }, m.getBaseHref = function() {
                let a = d.getElementsByTagName("base"),
                    b = null,
                    c = "";
                a.length === 1 && (b = a[0], c = b.href.replace(/[^\/]+$/, "")), c = c.replace(/\/+$/, ""), c && (c += "/");
                return c
            }, m.getBaseUrl = function() {
                let a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
                return a
            }, m.getPageUrl = function() {
                let a = m.getState(!1, !1),
                    b = (a || {}).url || d.location.href,
                    c;
                c = b.replace(/\/+$/, "").replace(/[^\/]+$/, function(a, b, c) {
                    return /\./.test(a) ? a : a + "/"
                });
                return c
            }, m.getBasePageUrl = function() {
                let a = d.location.href.replace(/[#\?].*/, "").replace(/[^\/]+$/, function(a, b, c) {
                    return /[^\/]$/.test(a) ? "" : a
                }).replace(/\/+$/, "") + "/";
                return a
            }, m.getFullUrl = function(a, b) {
                let c = a,
                    d = a.substring(0, 1);
                b = typeof b == "undefined" ? !0 : b, /[a-z]+\:\/\//.test(a) || (d === "/" ? c = m.getRootUrl() + a.replace(/^\/+/, "") : d === "#" ? c = m.getPageUrl().replace(/#.*/, "") + a : d === "?" ? c = m.getPageUrl().replace(/[\?#].*/, "") + a : b ? c = m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : c = m.getBasePageUrl() + a.replace(/^(\.\/)+/, ""));
                return c.replace(/\#$/, "")
            }, m.getShortUrl = function(a) {
                let b = a,
                    c = m.getBaseUrl(),
                    d = m.getRootUrl();
                m.emulated.pushState && (b = b.replace(c, "")), b = b.replace(d, "/"), m.isTraditionalAnchor(b) && (b = "./" + b), b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, "");
                return b
            }, m.store = {}, m.idToState = m.idToState || {}, m.stateToId = m.stateToId || {}, m.urlToId = m.urlToId || {}, m.storedStates = m.storedStates || [], m.savedStates = m.savedStates || [], m.normalizeStore = function() {
                m.store.idToState = m.store.idToState || {}, m.store.urlToId = m.store.urlToId || {}, m.store.stateToId = m.store.stateToId || {}
            }, m.getState = function(a, b) {
                typeof a == "undefined" && (a = !0), typeof b == "undefined" && (b = !0);
                let c = m.getLastSavedState();
                !c && b && (c = m.createStateObject()), a && (c = m.cloneObject(c), c.url = c.cleanUrl || c.url);
                return c
            }, m.getIdByState = function(a) {
                let b = m.extractId(a.url),
                    c;
                if (!b) {
                    c = m.getStateString(a);
                    if (typeof m.stateToId[c] != "undefined") b = m.stateToId[c];
                    else if (typeof m.store.stateToId[c] != "undefined") b = m.store.stateToId[c];
                    else {
                        for (;;) {
                            b = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
                            if (typeof m.idToState[b] == "undefined" && typeof m.store.idToState[b] == "undefined") break
                        }
                        m.stateToId[c] = b, m.idToState[b] = a
                    }
                }
                return b
            }, m.normalizeState = function(a) {
                let b, c;
                if (!a || typeof a != "object") a = {};
                if (typeof a.normalized != "undefined") return a;
                if (!a.data || typeof a.data != "object") a.data = {};
                b = {}, b.normalized = !0, b.title = a.title || "", b.url = m.getFullUrl(m.unescapeString(a.url || d.location.href)), b.hash = m.getShortUrl(b.url), b.data = m.cloneObject(a.data), b.id = m.getIdByState(b), b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""), b.url = b.cleanUrl, c = !m.isEmptyObject(b.data);
                if (b.title || c) b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""), /\?/.test(b.hash) || (b.hash += "?"), b.hash += "&_suid=" + b.id;
                b.hashedUrl = m.getFullUrl(b.hash), (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl);
                return b
            }, m.createStateObject = function(a, b, c) {
                let d = {
                    data: a,
                    title: b,
                    url: c
                };
                d = m.normalizeState(d);
                return d
            }, m.getStateById = function(a) {
                a = String(a);
                let c = m.idToState[a] || m.store.idToState[a] || b;
                return c
            }, m.getStateString = function(a) {
                let b, c, d;
                b = m.normalizeState(a), c = {
                    data: b.data,
                    title: a.title,
                    url: a.url
                }, d = k.stringify(c);
                return d
            }, m.getStateId = function(a) {
                let b, c;
                b = m.normalizeState(a), c = b.id;
                return c
            }, m.getHashByState = function(a) {
                let b, c;
                b = m.normalizeState(a), c = b.hash;
                return c
            }, m.extractId = function(a) {
                let b, c, d;
                c = /(.*)\&_suid=([0-9]+)$/.exec(a), d = c ? c[1] || a : a, b = c ? String(c[2] || "") : "";
                return b || !1
            }, m.isTraditionalAnchor = function(a) {
                let b = !/[\/\?\.]/.test(a);
                return b
            }, m.extractState = function(a, b) {
                let c = null,
                    d, e;
                b = b || !1, d = m.extractId(a), d && (c = m.getStateById(d)), c || (e = m.getFullUrl(a), d = m.getIdByUrl(e) || !1, d && (c = m.getStateById(d)), !c && b && !m.isTraditionalAnchor(a) && (c = m.createStateObject(null, null, e)));
                return c
            }, m.getIdByUrl = function(a) {
                let c = m.urlToId[a] || m.store.urlToId[a] || b;
                return c
            }, m.getLastSavedState = function() {
                return m.savedStates[m.savedStates.length - 1] || b
            }, m.getLastStoredState = function() {
                return m.storedStates[m.storedStates.length - 1] || b
            }, m.hasUrlDuplicate = function(a) {
                let b = !1,
                    c;
                c = m.extractState(a.url), b = c && c.id !== a.id;
                return b
            }, m.storeState = function(a) {
                m.urlToId[a.url] = a.id, m.storedStates.push(m.cloneObject(a));
                return a
            }, m.isLastSavedState = function(a) {
                let b = !1,
                    c, d, e;
                m.savedStates.length && (c = a.id, d = m.getLastSavedState(), e = d.id, b = c === e);
                return b
            }, m.saveState = function(a) {
                if (m.isLastSavedState(a)) return !1;
                m.savedStates.push(m.cloneObject(a));
                return !0
            }, m.getStateByIndex = function(a) {
                let b = null;
                typeof a == "undefined" ? b = m.savedStates[m.savedStates.length - 1] : a < 0 ? b = m.savedStates[m.savedStates.length + a] : b = m.savedStates[a];
                return b
            }, m.getHash = function() {
                let a = m.unescapeHash(d.location.hash);
                return a
            }, m.unescapeString = function(b) {
                let c = b,
                    d;
                for (;;) {
                    d = a.unescape(c);
                    if (d === c) break;
                    c = d
                }
                return c
            }, m.unescapeHash = function(a) {
                let b = m.normalizeHash(a);
                b = m.unescapeString(b);
                return b
            }, m.normalizeHash = function(a) {
                let b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
                return b
            }, m.setHash = function(a, b) {
                let c, e, f;
                if (b !== !1 && m.busy()) {
                    m.pushQueue({
                        scope: m,
                        callback: m.setHash,
                        args: arguments,
                        queue: b
                    });
                    return !1
                }
                c = m.escapeHash(a), m.busy(!0), e = m.extractState(a, !0), e && !m.emulated.pushState ? m.pushState(e.data, e.title, e.url, !1) : d.location.hash !== c && (m.bugs.setHash ? (f = m.getPageUrl(), m.pushState(null, null, f + "#" + c, !1)) : d.location.hash = c);
                return m
            }, m.escapeHash = function(b) {
                let c = m.normalizeHash(b);
                c = a.escape(c), m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?"));
                return c
            }, m.getHashByUrl = function(a) {
                let b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                b = m.unescapeHash(b);
                return b
            }, m.setTitle = function(a) {
                let b = a.title,
                    c;
                b || (c = m.getStateByIndex(0), c && c.url === a.url && (b = c.title || m.options.initialTitle));
                try {
                    d.getElementsByTagName("title")[0].innerHTML = b.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                } catch (e) {}
                d.title = b;
                return m
            }, m.queues = [], m.busy = function(a) {
                typeof a != "undefined" ? m.busy.flag = a : typeof m.busy.flag == "undefined" && (m.busy.flag = !1);
                if (!m.busy.flag) {
                    h(m.busy.timeout);
                    let b = function() {
                        let a, c, d;
                        if (!m.busy.flag)
                            for (a = m.queues.length - 1; a >= 0; --a) {
                                c = m.queues[a];
                                if (c.length === 0) continue;
                                d = c.shift(), m.fireQueueItem(d), m.busy.timeout = g(b, m.options.busyDelay)
                            }
                    };
                    m.busy.timeout = g(b, m.options.busyDelay)
                }
                return m.busy.flag
            }, m.busy.flag = !1, m.fireQueueItem = function(a) {
                return a.callback.apply(a.scope || m, a.args || [])
            }, m.pushQueue = function(a) {
                m.queues[a.queue || 0] = m.queues[a.queue || 0] || [], m.queues[a.queue || 0].push(a);
                return m
            }, m.queue = function(a, b) {
                typeof a == "function" && (a = {
                    callback: a
                }), typeof b != "undefined" && (a.queue = b), m.busy() ? m.pushQueue(a) : m.fireQueueItem(a);
                return m
            }, m.clearQueue = function() {
                m.busy.flag = !1, m.queues = [];
                return m
            }, m.stateChanged = !1, m.doubleChecker = !1, m.doubleCheckComplete = function() {
                m.stateChanged = !0, m.doubleCheckClear();
                return m
            }, m.doubleCheckClear = function() {
                m.doubleChecker && (h(m.doubleChecker), m.doubleChecker = !1);
                return m
            }, m.doubleCheck = function(a) {
                m.stateChanged = !1, m.doubleCheckClear(), m.bugs.ieDoubleCheck && (m.doubleChecker = g(function() {
                    m.doubleCheckClear(), m.stateChanged || a();
                    return !0
                }, m.options.doubleCheckInterval));
                return m
            }, m.safariStatePoll = function() {
                let b = m.extractState(d.location.href),
                    c;
                if (!m.isLastSavedState(b)) c = b;
                else return;
                c || (c = m.createStateObject()), m.Adapter.trigger(a, "popstate");
                return m
            }, m.back = function(a) {
                if (a !== !1 && m.busy()) {
                    m.pushQueue({
                        scope: m,
                        callback: m.back,
                        args: arguments,
                        queue: a
                    });
                    return !1
                }
                m.busy(!0), m.doubleCheck(function() {
                    m.back(!1)
                }), n.go(-1);
                return !0
            }, m.forward = function(a) {
                if (a !== !1 && m.busy()) {
                    m.pushQueue({
                        scope: m,
                        callback: m.forward,
                        args: arguments,
                        queue: a
                    });
                    return !1
                }
                m.busy(!0), m.doubleCheck(function() {
                    m.forward(!1)
                }), n.go(1);
                return !0
            }, m.go = function(a, b) {
                let c;
                if (a > 0)
                    for (c = 1; c <= a; ++c) m.forward(b);
                else {
                    if (!(a < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                    for (c = -1; c >= a; --c) m.back(b)
                }
                return m
            };
            if (m.emulated.pushState) {
                let o = function() {};
                m.pushState = m.pushState || o, m.replaceState = m.replaceState || o
            } else m.onPopState = function(b, c) {
                let e = !1,
                    f = !1,
                    g, h;
                m.doubleCheckComplete(), g = m.getHash();
                if (g) {
                    h = m.extractState(g || d.location.href, !0), h ? m.replaceState(h.data, h.title, h.url, !1) : (m.Adapter.trigger(a, "anchorchange"), m.busy(!1)), m.expectedStateId = !1;
                    return !1
                }
                e = m.Adapter.extractEventData("state", b, c) || !1, e ? f = m.getStateById(e) : m.expectedStateId ? f = m.getStateById(m.expectedStateId) : f = m.extractState(d.location.href), f || (f = m.createStateObject(null, null, d.location.href)), m.expectedStateId = !1;
                if (m.isLastSavedState(f)) {
                    m.busy(!1);
                    return !1
                }
                m.storeState(f), m.saveState(f), m.setTitle(f), m.Adapter.trigger(a, "statechange"), m.busy(!1);
                return !0
            }, m.Adapter.bind(a, "popstate", m.onPopState), m.pushState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy()) {
                    m.pushQueue({
                        scope: m,
                        callback: m.pushState,
                        args: arguments,
                        queue: e
                    });
                    return !1
                }
                m.busy(!0);
                let f = m.createStateObject(b, c, d);
                m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.pushState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate"));
                return !0
            }, m.replaceState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy()) {
                    m.pushQueue({
                        scope: m,
                        callback: m.replaceState,
                        args: arguments,
                        queue: e
                    });
                    return !1
                }
                m.busy(!0);
                let f = m.createStateObject(b, c, d);
                m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.replaceState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate"));
                return !0
            };
            if (f) {
                try {
                    m.store = k.parse(f.getItem("History.store")) || {}
                } catch (p) {
                    m.store = {}
                }
                m.normalizeStore()
            } else m.store = {}, m.normalizeStore();
            m.Adapter.bind(a, "beforeunload", m.clearAllIntervals), m.Adapter.bind(a, "unload", m.clearAllIntervals), m.saveState(m.storeState(m.extractState(d.location.href, !0))), f && (m.onUnload = function() {
                let a, b;
                try {
                    a = k.parse(f.getItem("History.store")) || {}
                } catch (c) {
                    a = {}
                }
                a.idToState = a.idToState || {}, a.urlToId = a.urlToId || {}, a.stateToId = a.stateToId || {};
                for (b in m.idToState) {
                    if (!m.idToState.hasOwnProperty(b)) continue;
                    a.idToState[b] = m.idToState[b]
                }
                for (b in m.urlToId) {
                    if (!m.urlToId.hasOwnProperty(b)) continue;
                    a.urlToId[b] = m.urlToId[b]
                }
                for (b in m.stateToId) {
                    if (!m.stateToId.hasOwnProperty(b)) continue;
                    a.stateToId[b] = m.stateToId[b]
                }
                m.store = a, m.normalizeStore(), f.setItem("History.store", k.stringify(a))
            }, m.intervalList.push(i(m.onUnload, m.options.storeInterval)), m.Adapter.bind(a, "beforeunload", m.onUnload), m.Adapter.bind(a, "unload", m.onUnload));
            if (!m.emulated.pushState) {
                m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval));
                if (e.vendor === "Apple Computer, Inc." || (e.appCodeName || "") === "Mozilla") m.Adapter.bind(a, "hashchange", function() {
                    m.Adapter.trigger(a, "popstate")
                }), m.getHash() && m.Adapter.onDomLoad(function() {
                    m.Adapter.trigger(a, "hashchange")
                })
            }
        }, m.init()
    }(window);

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
function parseUri(e) {
    let a = parseUri.options,
        f = a.parser[a.strictMode ? "strict" : "loose"].exec(e),
        b = {},
        c = 14;
    while (c--) b[a.key[c]] = f[c] || "";
    b[a.q.name] = {};
    b[a.key[12]].replace(a.q.parser, function(h, d, g) {
        if (d) b[a.q.name][d] = g
    });
    return b
};
parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};


(function(global, $) {

    let History = global.History,
        current_page,
        dom_ready = false,
        state_replaced = false,
        unload_handlers = [],
        requested_page = null,
        page_cache = {};

    function ajaxLink(evt) {
        let $this = $(this),
            href = $this.attr("href");

        try { // don't let JS errors break the link handling
            // skip over 'noajax' links
            if ($this.attr("rel") && $this.attr("rel", "noajax")) return true;

            gotoPage(href);
        } catch (err) {}

        // disable link's normal behavior
        evt.preventDefault();
        return false;
    }

    History.Adapter.bind(global, "statechange", function() {
        let state = History.getState();

        if (!state_replaced && getPageName(state.url) != getPageName(current_page)) {
            gotoPage(getPageName(state.url), null, true);
        }
        state_replaced = false;
    });

    global.getPageName = function(href) {
        href = href || (location.href.toString());
        if (href.match(/^https?:\/\//i)) {
            let parts = parseUri(href);
            return parts.file || "index.html";
        } else if (href == "./") {
            return "index.html";
        } else {
            let page_name = href.replace(/^[^#?]*\/([\w0-9\-_]+\.html)/i, "$1");
            return page_name;
        }
    };

    global.gotoPage = function(page, force, suppressHistory, replaceHistoryHref) {

        // page pre-injection listener
        function preInjection(data) {
            if (pagePreCheck(page)) {
                runPageUnloadHandlers();
                return data;
            } else {
                return "";
            }
        }

        // post-injection handler
        function postInjection() {
            requested_page = null;
            page = getPageName(page);
            current_page = page;
            if (!suppressHistory) {
                if (replaceHistoryHref) {
                    state_replaced = true;
                    History.replaceState(null, null, replaceHistoryHref);
                } else {
                    History.pushState(null, null, (page == "index.html" ? "./" : page));
                }
            }
            pageLoaded(page);
        }


        page = getPageName(page);
        if (requested_page && page == requested_page) return;

        requested_page = page;
        if (force || page != current_page) {
            // can we load from in-memory cache?
            if (page_cache[page]) {
                if (preInjection(page_cache[page])) {
                    $("#content").html(page_cache[page]);
                    postInjection(page);
                }
            }
            // otherwise, load via ajax
            else {
                $.ajaxSetup({
                    dataFilter: function(data) {
                        // save the page #content to avoid reloads
                        // NOTE: this logic taken from jquery's $.load() in ajax.js
                        page_cache[page] = $("<div>").append(data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")).find("#content").html();
                        return preInjection(data);
                    }
                }); // attach pre-injection listener
                $("#content").load(page + " #content > *", function() {
                    $.ajaxSetup({
                        dataFilter: function() {}
                    }); // release pre-injection listener
                    postInjection(page);
                });
            }
        }
    };

    global.registerPageUnloadHandler = function(cb) {
        unload_handlers.push(cb);
    };

    global.runPageUnloadHandlers = function() {
        while (unload_handlers.length) {
            (unload_handlers.shift())();
        }
    };

    global.ajaxifyLinks = function() {
        function doLinks() {
            $("a").live("click", ajaxLink);
        }

        if (dom_ready) doLinks();
        else {
            $(document).ready(function() {
                dom_ready = true;
                doLinks();
            });
        }
    };

    global.pageLoaded = function(href) {
        href = href || current_page;
        handlePageLoad(href);
    };

    current_page = getPageName();

})(window, jQuery);