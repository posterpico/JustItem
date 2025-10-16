_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([[55], {
    "/0+H": function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.isInAmpMode = a,
        t.useAmp = function() {
            return a(i.default.useContext(o.AmpStateContext))
        }
        ;
        var r, i = (r = n("q1tI")) && r.__esModule ? r : {
            default: r
        }, o = n("lwAK");
        function a() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , t = e.ampFirst
              , n = void 0 !== t && t
              , r = e.hybrid
              , i = void 0 !== r && r
              , o = e.hasQuery
              , a = void 0 !== o && o;
            return n || i && a
        }
    },
    18: function(e, t, n) {
        n("74v/"),
        e.exports = n("nOHt")
    },
    19: function(e, t) {},
    "1bxb": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Reporter = void 0;
        const r = n("y66H")
          , i = n("IEzh")
          , o = n("JG9b")
          , a = n("k4w3")
          , s = n("VOJa")
          , c = (0,
        r.__importDefault)(n("xRp3"))
          , u = n("bfg4")
          , l = n("rwij");
        t.Reporter = class {
            constructor(e, t) {
                this.queue = [],
                this.customQueue = [],
                this.fingerprint = "",
                this.tags = {},
                this.session_id = "",
                this.session_start_time = "",
                this.timeOffset = 0,
                this.configs = e,
                this.userAgent = new i.UserAgent,
                this.network = t,
                this.fingerprint = e.fingerprint || "",
                this.offlineStore = new a.OfflineStore(e.de_app_id,t),
                this.offlineStore.setup(),
                [this.session_id,this.session_start_time] = (window.__APMS_SESSION_ID__ = window.__APMS_SESSION_ID__ || (0,
                s.uuidv4)(),
                window.__APMS_SESSION_START_TIME__ = window.__APMS_SESSION_START_TIME__ || (new Date).toISOString(),
                [window.__APMS_SESSION_ID__, window.__APMS_SESSION_START_TIME__])
            }
            async initFingerprint() {
                try {
                    this.fingerprint = (0,
                    l.setFingerprint)()
                } catch (e) {
                    console.log("initFingerprint error", e)
                }
            }
            serverNow(e) {
                var t;
                return ("number" === typeof e ? e : (new Date).getTime()) + (null !== (t = this.timeOffset) && void 0 !== t ? t : 0)
            }
            register(e) {
                try {
                    e.serverNow = this.serverNow.bind(this),
                    e.reporter = this,
                    e.register({
                        de_app_id: this.configs.de_app_id,
                        env: this.configs.environment
                    })
                } catch (t) {
                    u.Logger.log("Failed to register plugin"),
                    u.Logger.error(t)
                }
            }
            unregister(e) {
                e.unregister(this.configs.de_app_id)
            }
            get app() {
                var e;
                return {
                    region: null !== (e = this.configs.region) && void 0 !== e ? e : "unknown",
                    type: "web"
                }
            }
            get commonData() {
                const {js_bundle_version: e, js_bundle_name: t, js_build_id: n} = this.configs;
                return {
                    isSampled: 0,
                    app: this.app,
                    commonInfo: this.commonInfo,
                    device: this.device,
                    eventType: "web_custom",
                    extra: {
                        webCommonData: {
                            js_bundle_name: t,
                            js_bundle_version: e || "",
                            js_build_id: n || "",
                            js_sdk_name: c.default.name,
                            js_sdk_version: c.default.version,
                            js_engine_name: this.userAgent.browser.engine_name,
                            js_engine_version: this.userAgent.browser.engine_version,
                            js_browser_name: this.userAgent.browser.browser_name,
                            js_browser_version: this.userAgent.browser.browser_version
                        }
                    },
                    metaData: this.metaData,
                    pageInfo: {
                        pageId: window.location.href
                    },
                    session: {
                        id: this.session_id,
                        startedAt: this.session_start_time
                    },
                    user: {
                        email: this.configs.user_email,
                        name: this.configs.user_name,
                        id: this.configs.user_id || ""
                    },
                    tag: "web_custom"
                }
            }
            get commonInfo() {
                return {
                    bundle_id: "",
                    carrier_provider_code: "",
                    carrier_provider_name: "",
                    current_time: this.serverNow(),
                    de_app_id: this.configs.de_app_id,
                    device_id: this.fingerprint,
                    is_vpn: !1,
                    local_wifi_ip: "",
                    os_version: this.userAgent.device.os_version,
                    screen_density: this.userAgent.screen.screen_dpr || 0,
                    screen_height: this.userAgent.screen.screen_height || 0,
                    screen_width: this.userAgent.screen.screen_width || 0,
                    session_id: this.session_id,
                    user_id: this.configs.user_id || ""
                }
            }
            get device() {
                var e, t;
                return {
                    id: this.fingerprint,
                    manufacturer: this.userAgent.browser.browser_name,
                    model: this.userAgent.browser.browser_version,
                    osName: null !== (e = this.userAgent.device.os_name) && void 0 !== e ? e : "unknown",
                    osVersion: null !== (t = this.userAgent.device.os_version) && void 0 !== t ? t : "unknown",
                    orientation: this.userAgent.screen.orientation
                }
            }
            get metaData() {
                return {
                    device: {
                        brand: this.userAgent.browser.browser_name,
                        screenDensity: this.userAgent.screen.screen_dpr,
                        screenResolution: `${this.userAgent.screen.screen_width}x${this.userAgent.screen.screen_height}`,
                        networkAccess: this.userAgent.connection.connection_type
                    }
                }
            }
            async sendData(e, t=!1) {
                try {
                    await this.network.sendRequest({
                        reportData: e,
                        pageUnload: t
                    }) === o.REQUEST_FAILED && this.offlineStore.cacheData(e)
                } catch (n) {
                    this.offlineStore.cacheData(e),
                    u.Logger.warn("[APMS] Failed to send data: " + ((null === n || void 0 === n ? void 0 : n.message) || "unknown reason."))
                }
            }
            async sendBulkData(e) {
                try {
                    return await this.network.sendBulk(e)
                } catch (t) {
                    this.offlineStore.cacheData(e),
                    u.Logger.warn("[APMS] Failed to send data bulk: " + ((null === t || void 0 === t ? void 0 : t.message) || "unknown reason."))
                }
            }
        }
    },
    20: function(e, t) {},
    "48fX": function(e, t, n) {
        var r = n("qhzo");
        e.exports = function(e, t) {
            if ("function" !== typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && r(e, t)
        }
    },
    "4Za5": function(e, t, n) {
        "use strict";
        n.d(t, "b", (function() {
            return s
        }
        )),
        n.d(t, "a", (function() {
            return c
        }
        ));
        var r = n("Z3Gs")
          , i = Object(r.d)("shopee-live-streaming-");
        function o(e, t) {
            return "".concat(t, "_").concat(e)
        }
        function a(e, t) {
            var n = i.get("STORAGE_AUCTION_SESSIONID");
            n !== e && (i.remove(o(n, "STORAGE_AUCTION")),
            function(e) {
                i.set("STORAGE_AUCTION_SESSIONID", e)
            }(e));
            var r = o(e, "STORAGE_AUCTION");
            try {
                i.set(r, JSON.stringify(t))
            } catch (a) {
                console.error(a)
            }
        }
        function s(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            a(e, t)
        }
        function c(e) {
            return function(e) {
                var t = null
                  , n = o(e, "STORAGE_AUCTION");
                try {
                    var r = i.get(n);
                    t = JSON.parse(r)
                } catch (a) {
                    console.error(a)
                }
                return t
            }(e) || []
        }
    },
    "5fIB": function(e, t, n) {
        var r = n("7eYB");
        e.exports = function(e) {
            if (Array.isArray(e))
                return r(e)
        }
    },
    "6OVD": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const r = n("bfg4");
        t.default = class {
            constructor(e) {
                this.tag = "base",
                this.extraParams = {},
                this.offsetByte = void 0,
                this.triggerHandler = e => {
                    var t;
                    try {
                        this.queue.push(Object.assign(Object.assign({}, null === (t = this.reporter) || void 0 === t ? void 0 : t.commonData), e))
                    } catch (n) {
                        r.Logger.warn("[APMS] Failed to add data")
                    }
                }
                ,
                this.queue = [],
                this.sample = 1,
                this.enable = !0,
                this.configs = null !== e && void 0 !== e ? e : {},
                this.sample = this.defaultSample
            }
            serverNow(e) {
                return (new Date).getTime()
            }
            init(...e) {}
            get defaultSample() {
                const e = this.configs;
                return "number" === typeof (null === e || void 0 === e ? void 0 : e.sample) && (null === e || void 0 === e ? void 0 : e.sample) >= 0 && (null === e || void 0 === e ? void 0 : e.sample) <= 1 ? null === e || void 0 === e ? void 0 : e.sample : 1
            }
            start() {
                var e;
                this.timer = setInterval( () => {
                    this.check()
                }
                , (null === (e = this.configs) || void 0 === e ? void 0 : e.interval) || 1e4);
                const t = "onpagehide"in self ? "pagehide" : "unload";
                window.addEventListener(t, this.check.bind(this, !0), !1)
            }
            check(e=!1) {
                try {
                    "requestIdleCallback"in window ? requestIdleCallback(this.reportData.bind(this)) : this.reportData()
                } catch (t) {
                    r.Logger.warn("[APMS] failed to process report datas."),
                    r.Logger.error(t)
                }
            }
            async reportData() {
                if (this.queue.length) {
                    const e = this.getDataChunk();
                    for (; e.length; ) {
                        const t = e.shift();
                        t && await this.reporter.sendData(t)
                    }
                }
            }
            getDataChunk() {
                try {
                    let e = [...this.queue];
                    this.queue = [];
                    const t = [];
                    let n = 1;
                    for (; e.length; ) {
                        const r = e.splice(0, 10)
                          , i = this.processData(r);
                        n >= 50 && (e = []),
                        t.push(i),
                        n++
                    }
                    return t
                } catch (e) {
                    return r.Logger.warn("Failed to process report data."),
                    []
                }
            }
            processData(e) {
                return Object.assign({
                    apiKey: this.reporter.configs.secret_key,
                    notifier: {},
                    payloadVersion: "1.0",
                    events: [...e],
                    tag: this.tag
                }, this.extraParams)
            }
            register(e) {
                try {
                    this.start(),
                    this.init()
                } catch (t) {
                    r.Logger.info("[APMS] Failed to init plugin"),
                    r.Logger.error(t)
                }
            }
            unregister(e) {
                this.triggerHandler = () => {}
                ,
                this.timer && clearInterval(this.timer)
            }
        }
    },
    "6ifN": function(e, t, n) {
        "use strict";
        n.d(t, "c", (function() {
            return u
        }
        )),
        n.d(t, "a", (function() {
            return l
        }
        )),
        n.d(t, "d", (function() {
            return d
        }
        )),
        n.d(t, "b", (function() {
            return p
        }
        ));
        var r = n("ODXe")
          , i = n("HaE+")
          , o = n("o0o1")
          , a = n.n(o)
          , s = n("xds5")
          , c = n("w/Rt");
        function u(e) {
            return s.c.get("/host/".concat(e, "/follow"))
        }
        function l(e, t) {
            return s.c.post("/session/".concat(e, "/follow/").concat(t))
        }
        var d = function() {
            return s.c.get("".concat(c.p, "/api/v2/user/login_status"))
        }
          , p = function() {
            var e = Object(i.a)(a.a.mark((function e() {
                var t, n, i, o;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/mgmt_page/privilege");
                        case 2:
                            return t = e.sent,
                            n = Object(r.a)(t, 2),
                            i = n[0],
                            o = n[1],
                            e.abrupt("return", [i, o]);
                        case 7:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
    },
    "74v/": function(e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/_app", function() {
            return n("cha2")
        }
        ])
    },
    "8Bbg": function(e, t, n) {
        e.exports = n("B5Ud")
    },
    "8CFJ": function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "__extends", (function() {
            return i
        }
        )),
        n.d(t, "__assign", (function() {
            return o
        }
        )),
        n.d(t, "__rest", (function() {
            return a
        }
        )),
        n.d(t, "__decorate", (function() {
            return s
        }
        )),
        n.d(t, "__param", (function() {
            return c
        }
        )),
        n.d(t, "__esDecorate", (function() {
            return u
        }
        )),
        n.d(t, "__runInitializers", (function() {
            return l
        }
        )),
        n.d(t, "__propKey", (function() {
            return d
        }
        )),
        n.d(t, "__setFunctionName", (function() {
            return p
        }
        )),
        n.d(t, "__metadata", (function() {
            return f
        }
        )),
        n.d(t, "__awaiter", (function() {
            return h
        }
        )),
        n.d(t, "__generator", (function() {
            return b
        }
        )),
        n.d(t, "__createBinding", (function() {
            return v
        }
        )),
        n.d(t, "__exportStar", (function() {
            return m
        }
        )),
        n.d(t, "__values", (function() {
            return g
        }
        )),
        n.d(t, "__read", (function() {
            return y
        }
        )),
        n.d(t, "__spread", (function() {
            return _
        }
        )),
        n.d(t, "__spreadArrays", (function() {
            return w
        }
        )),
        n.d(t, "__spreadArray", (function() {
            return O
        }
        )),
        n.d(t, "__await", (function() {
            return x
        }
        )),
        n.d(t, "__asyncGenerator", (function() {
            return S
        }
        )),
        n.d(t, "__asyncDelegator", (function() {
            return j
        }
        )),
        n.d(t, "__asyncValues", (function() {
            return k
        }
        )),
        n.d(t, "__makeTemplateObject", (function() {
            return P
        }
        )),
        n.d(t, "__importStar", (function() {
            return I
        }
        )),
        n.d(t, "__importDefault", (function() {
            return T
        }
        )),
        n.d(t, "__classPrivateFieldGet", (function() {
            return D
        }
        )),
        n.d(t, "__classPrivateFieldSet", (function() {
            return R
        }
        )),
        n.d(t, "__classPrivateFieldIn", (function() {
            return C
        }
        )),
        n.d(t, "__addDisposableResource", (function() {
            return L
        }
        )),
        n.d(t, "__disposeResources", (function() {
            return N
        }
        )),
        n.d(t, "__rewriteRelativeImportExtension", (function() {
            return F
        }
        ));
        var r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        };
        function i(e, t) {
            if ("function" !== typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        var o = function() {
            return (o = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var i in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }
            ).apply(this, arguments)
        };
        function a(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                    t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
            }
            return n
        }
        function s(e, t, n, r) {
            var i, o = arguments.length, a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
            if ("object" === typeof Reflect && "function" === typeof Reflect.decorate)
                a = Reflect.decorate(e, t, n, r);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
            return o > 3 && a && Object.defineProperty(t, n, a),
            a
        }
        function c(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        }
        function u(e, t, n, r, i, o) {
            function a(e) {
                if (void 0 !== e && "function" !== typeof e)
                    throw new TypeError("Function expected");
                return e
            }
            for (var s, c = r.kind, u = "getter" === c ? "get" : "setter" === c ? "set" : "value", l = !t && e ? r.static ? e : e.prototype : null, d = t || (l ? Object.getOwnPropertyDescriptor(l, r.name) : {}), p = !1, f = n.length - 1; f >= 0; f--) {
                var h = {};
                for (var b in r)
                    h[b] = "access" === b ? {} : r[b];
                for (var b in r.access)
                    h.access[b] = r.access[b];
                h.addInitializer = function(e) {
                    if (p)
                        throw new TypeError("Cannot add initializers after decoration has completed");
                    o.push(a(e || null))
                }
                ;
                var v = (0,
                n[f])("accessor" === c ? {
                    get: d.get,
                    set: d.set
                } : d[u], h);
                if ("accessor" === c) {
                    if (void 0 === v)
                        continue;
                    if (null === v || "object" !== typeof v)
                        throw new TypeError("Object expected");
                    (s = a(v.get)) && (d.get = s),
                    (s = a(v.set)) && (d.set = s),
                    (s = a(v.init)) && i.unshift(s)
                } else
                    (s = a(v)) && ("field" === c ? i.unshift(s) : d[u] = s)
            }
            l && Object.defineProperty(l, r.name, d),
            p = !0
        }
        function l(e, t, n) {
            for (var r = arguments.length > 2, i = 0; i < t.length; i++)
                n = r ? t[i].call(e, n) : t[i].call(e);
            return r ? n : void 0
        }
        function d(e) {
            return "symbol" === typeof e ? e : "".concat(e)
        }
        function p(e, t, n) {
            return "symbol" === typeof t && (t = t.description ? "[".concat(t.description, "]") : ""),
            Object.defineProperty(e, "name", {
                configurable: !0,
                value: n ? "".concat(n, " ", t) : t
            })
        }
        function f(e, t) {
            if ("object" === typeof Reflect && "function" === typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        function h(e, t, n, r) {
            return new (n || (n = Promise))((function(i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (t) {
                        o(t)
                    }
                }
                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (t) {
                        o(t)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                c((r = r.apply(e, t || [])).next())
            }
            ))
        }
        function b(e, t) {
            var n, r, i, o = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" === typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" === typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(c) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (o = 0)),
                        o; )
                            try {
                                if (n = 1,
                                r && (i = 2 & s[0] ? r.return : s[0] ? r.throw || ((i = r.return) && i.call(r),
                                0) : r.next) && !(i = i.call(r, s[1])).done)
                                    return i;
                                switch (r = 0,
                                i && (s = [2 & s[0], i.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    i = s;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    r = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!i || s[1] > i[0] && s[1] < i[3])) {
                                        o.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && o.label < i[1]) {
                                        o.label = i[1],
                                        i = s;
                                        break
                                    }
                                    if (i && o.label < i[2]) {
                                        o.label = i[2],
                                        o.ops.push(s);
                                        break
                                    }
                                    i[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                s = t.call(e, o)
                            } catch (c) {
                                s = [6, c],
                                r = 0
                            } finally {
                                n = i = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, c])
                }
            }
        }
        var v = Object.create ? function(e, t, n, r) {
            void 0 === r && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[n]
                }
            }),
            Object.defineProperty(e, r, i)
        }
        : function(e, t, n, r) {
            void 0 === r && (r = n),
            e[r] = t[n]
        }
        ;
        function m(e, t) {
            for (var n in e)
                "default" === n || Object.prototype.hasOwnProperty.call(t, n) || v(t, e, n)
        }
        function g(e) {
            var t = "function" === typeof Symbol && Symbol.iterator
              , n = t && e[t]
              , r = 0;
            if (n)
                return n.call(e);
            if (e && "number" === typeof e.length)
                return {
                    next: function() {
                        return e && r >= e.length && (e = void 0),
                        {
                            value: e && e[r++],
                            done: !e
                        }
                    }
                };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }
        function y(e, t) {
            var n = "function" === typeof Symbol && e[Symbol.iterator];
            if (!n)
                return e;
            var r, i, o = n.call(e), a = [];
            try {
                for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
                    a.push(r.value)
            } catch (s) {
                i = {
                    error: s
                }
            } finally {
                try {
                    r && !r.done && (n = o.return) && n.call(o)
                } finally {
                    if (i)
                        throw i.error
                }
            }
            return a
        }
        function _() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e = e.concat(y(arguments[t]));
            return e
        }
        function w() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                e += arguments[t].length;
            var r = Array(e)
              , i = 0;
            for (t = 0; t < n; t++)
                for (var o = arguments[t], a = 0, s = o.length; a < s; a++,
                i++)
                    r[i] = o[a];
            return r
        }
        function O(e, t, n) {
            if (n || 2 === arguments.length)
                for (var r, i = 0, o = t.length; i < o; i++)
                    !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)),
                    r[i] = t[i]);
            return e.concat(r || Array.prototype.slice.call(t))
        }
        function x(e) {
            return this instanceof x ? (this.v = e,
            this) : new x(e)
        }
        function S(e, t, n) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var r, i = n.apply(e, t || []), o = [];
            return r = Object.create(("function" === typeof AsyncIterator ? AsyncIterator : Object).prototype),
            a("next"),
            a("throw"),
            a("return", (function(e) {
                return function(t) {
                    return Promise.resolve(t).then(e, u)
                }
            }
            )),
            r[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            r;
            function a(e, t) {
                i[e] && (r[e] = function(t) {
                    return new Promise((function(n, r) {
                        o.push([e, t, n, r]) > 1 || s(e, t)
                    }
                    ))
                }
                ,
                t && (r[e] = t(r[e])))
            }
            function s(e, t) {
                try {
                    (n = i[e](t)).value instanceof x ? Promise.resolve(n.value.v).then(c, u) : l(o[0][2], n)
                } catch (r) {
                    l(o[0][3], r)
                }
                var n
            }
            function c(e) {
                s("next", e)
            }
            function u(e) {
                s("throw", e)
            }
            function l(e, t) {
                e(t),
                o.shift(),
                o.length && s(o[0][0], o[0][1])
            }
        }
        function j(e) {
            var t, n;
            return t = {},
            r("next"),
            r("throw", (function(e) {
                throw e
            }
            )),
            r("return"),
            t[Symbol.iterator] = function() {
                return this
            }
            ,
            t;
            function r(r, i) {
                t[r] = e[r] ? function(t) {
                    return (n = !n) ? {
                        value: x(e[r](t)),
                        done: !1
                    } : i ? i(t) : t
                }
                : i
            }
        }
        function k(e) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var t, n = e[Symbol.asyncIterator];
            return n ? n.call(e) : (e = g(e),
            t = {},
            r("next"),
            r("throw"),
            r("return"),
            t[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            t);
            function r(n) {
                t[n] = e[n] && function(t) {
                    return new Promise((function(r, i) {
                        (function(e, t, n, r) {
                            Promise.resolve(r).then((function(t) {
                                e({
                                    value: t,
                                    done: n
                                })
                            }
                            ), t)
                        }
                        )(r, i, (t = e[n](t)).done, t.value)
                    }
                    ))
                }
            }
        }
        function P(e, t) {
            return Object.defineProperty ? Object.defineProperty(e, "raw", {
                value: t
            }) : e.raw = t,
            e
        }
        var A = Object.create ? function(e, t) {
            Object.defineProperty(e, "default", {
                enumerable: !0,
                value: t
            })
        }
        : function(e, t) {
            e.default = t
        }
          , E = function(e) {
            return (E = Object.getOwnPropertyNames || function(e) {
                var t = [];
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
                return t
            }
            )(e)
        };
        function I(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var n = E(e), r = 0; r < n.length; r++)
                    "default" !== n[r] && v(t, e, n[r]);
            return A(t, e),
            t
        }
        function T(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function D(e, t, n, r) {
            if ("a" === n && !r)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" === typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e)
        }
        function R(e, t, n, r, i) {
            if ("m" === r)
                throw new TypeError("Private method is not writable");
            if ("a" === r && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" === typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === r ? i.call(e, n) : i ? i.value = n : t.set(e, n),
            n
        }
        function C(e, t) {
            if (null === t || "object" !== typeof t && "function" !== typeof t)
                throw new TypeError("Cannot use 'in' operator on non-object");
            return "function" === typeof e ? t === e : e.has(t)
        }
        function L(e, t, n) {
            if (null !== t && void 0 !== t) {
                if ("object" !== typeof t && "function" !== typeof t)
                    throw new TypeError("Object expected.");
                var r, i;
                if (n) {
                    if (!Symbol.asyncDispose)
                        throw new TypeError("Symbol.asyncDispose is not defined.");
                    r = t[Symbol.asyncDispose]
                }
                if (void 0 === r) {
                    if (!Symbol.dispose)
                        throw new TypeError("Symbol.dispose is not defined.");
                    r = t[Symbol.dispose],
                    n && (i = r)
                }
                if ("function" !== typeof r)
                    throw new TypeError("Object not disposable.");
                i && (r = function() {
                    try {
                        i.call(this)
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
                ),
                e.stack.push({
                    value: t,
                    dispose: r,
                    async: n
                })
            } else
                n && e.stack.push({
                    async: !0
                });
            return t
        }
        var M = "function" === typeof SuppressedError ? SuppressedError : function(e, t, n) {
            var r = new Error(n);
            return r.name = "SuppressedError",
            r.error = e,
            r.suppressed = t,
            r
        }
        ;
        function N(e) {
            function t(t) {
                e.error = e.hasError ? new M(t,e.error,"An error was suppressed during disposal.") : t,
                e.hasError = !0
            }
            var n, r = 0;
            return function i() {
                for (; n = e.stack.pop(); )
                    try {
                        if (!n.async && 1 === r)
                            return r = 0,
                            e.stack.push(n),
                            Promise.resolve().then(i);
                        if (n.dispose) {
                            var o = n.dispose.call(n.value);
                            if (n.async)
                                return r |= 2,
                                Promise.resolve(o).then(i, (function(e) {
                                    return t(e),
                                    i()
                                }
                                ))
                        } else
                            r |= 1
                    } catch (a) {
                        t(a)
                    }
                if (1 === r)
                    return e.hasError ? Promise.reject(e.error) : Promise.resolve();
                if (e.hasError)
                    throw e.error
            }()
        }
        function F(e, t) {
            return "string" === typeof e && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, (function(e, n, r, i, o) {
                return n ? t ? ".jsx" : ".js" : !r || i && o ? r + i + "." + o.toLowerCase() + "js" : e
            }
            )) : e
        }
        t.default = {
            __extends: i,
            __assign: o,
            __rest: a,
            __decorate: s,
            __param: c,
            __esDecorate: u,
            __runInitializers: l,
            __propKey: d,
            __setFunctionName: p,
            __metadata: f,
            __awaiter: h,
            __generator: b,
            __createBinding: v,
            __exportStar: m,
            __values: g,
            __read: y,
            __spread: _,
            __spreadArrays: w,
            __spreadArray: O,
            __await: x,
            __asyncGenerator: S,
            __asyncDelegator: j,
            __asyncValues: k,
            __makeTemplateObject: P,
            __importStar: I,
            __importDefault: T,
            __classPrivateFieldGet: D,
            __classPrivateFieldSet: R,
            __classPrivateFieldIn: C,
            __addDisposableResource: L,
            __disposeResources: N,
            __rewriteRelativeImportExtension: F
        }
    },
    "8Kt/": function(e, t, n) {
        "use strict";
        n("oI91");
        t.__esModule = !0,
        t.defaultHead = l,
        t.default = void 0;
        var r, i = function(e) {
            if (e && e.__esModule)
                return e;
            if (null === e || "object" !== typeof e && "function" !== typeof e)
                return {
                    default: e
                };
            var t = u();
            if (t && t.has(e))
                return t.get(e);
            var n = {}
              , r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in e)
                if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var o = r ? Object.getOwnPropertyDescriptor(e, i) : null;
                    o && (o.get || o.set) ? Object.defineProperty(n, i, o) : n[i] = e[i]
                }
            n.default = e,
            t && t.set(e, n);
            return n
        }(n("q1tI")), o = (r = n("Xuae")) && r.__esModule ? r : {
            default: r
        }, a = n("lwAK"), s = n("FYa8"), c = n("/0+H");
        function u() {
            if ("function" !== typeof WeakMap)
                return null;
            var e = new WeakMap;
            return u = function() {
                return e
            }
            ,
            e
        }
        function l() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
              , t = [i.default.createElement("meta", {
                charSet: "utf-8"
            })];
            return e || t.push(i.default.createElement("meta", {
                name: "viewport",
                content: "width=device-width"
            })),
            t
        }
        function d(e, t) {
            return "string" === typeof t || "number" === typeof t ? e : t.type === i.default.Fragment ? e.concat(i.default.Children.toArray(t.props.children).reduce((function(e, t) {
                return "string" === typeof t || "number" === typeof t ? e : e.concat(t)
            }
            ), [])) : e.concat(t)
        }
        var p = ["name", "httpEquiv", "charSet", "itemProp"];
        function f(e, t) {
            return e.reduce((function(e, t) {
                var n = i.default.Children.toArray(t.props.children);
                return e.concat(n)
            }
            ), []).reduce(d, []).reverse().concat(l(t.inAmpMode)).filter(function() {
                var e = new Set
                  , t = new Set
                  , n = new Set
                  , r = {};
                return function(i) {
                    var o = !0;
                    if (i.key && "number" !== typeof i.key && i.key.indexOf("$") > 0) {
                        var a = i.key.slice(i.key.indexOf("$") + 1);
                        e.has(a) ? o = !1 : e.add(a)
                    }
                    switch (i.type) {
                    case "title":
                    case "base":
                        t.has(i.type) ? o = !1 : t.add(i.type);
                        break;
                    case "meta":
                        for (var s = 0, c = p.length; s < c; s++) {
                            var u = p[s];
                            if (i.props.hasOwnProperty(u))
                                if ("charSet" === u)
                                    n.has(u) ? o = !1 : n.add(u);
                                else {
                                    var l = i.props[u]
                                      , d = r[u] || new Set;
                                    d.has(l) ? o = !1 : (d.add(l),
                                    r[u] = d)
                                }
                        }
                    }
                    return o
                }
            }()).reverse().map((function(e, t) {
                var n = e.key || t;
                return i.default.cloneElement(e, {
                    key: n
                })
            }
            ))
        }
        function h(e) {
            var t = e.children
              , n = (0,
            i.useContext)(a.AmpStateContext)
              , r = (0,
            i.useContext)(s.HeadManagerContext);
            return i.default.createElement(o.default, {
                reduceComponentsToState: f,
                headManager: r,
                inAmpMode: (0,
                c.isInAmpMode)(n)
            }, t)
        }
        h.rewind = function() {}
        ;
        var b = h;
        t.default = b
    },
    "9Bz4": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.transferDataField = void 0;
        const r = n("y66H")
          , i = (0,
        r.__importDefault)(n("6OVD"));
        t.transferDataField = e => {
            if (!e)
                return {};
            const t = {};
            for (const n of Object.keys(e)) {
                const r = e[n];
                /^dimension([0-9]|[1-2][0-9])$/.test(n) && "string" === typeof r && (t[n] = r),
                /^value([0-9]|[1-2][0-9])$/.test(n) && "number" === typeof r && (t[n] = r)
            }
            return t
        }
        ;
        class o extends i.default {
            constructor(e) {
                super(e),
                this.type = "customized",
                this.tag = "web_custom",
                this.event_type = e.event_type,
                this.extraParams = {
                    eventType: e.event_type
                }
            }
            sendData(e) {
                var n;
                const {extra: i, point_id: o, point_name: a, point_type: s, page_name: c} = e
                  , u = (0,
                r.__rest)(e, ["extra", "point_id", "point_name", "point_type", "page_name"]);
                null === (n = this.triggerHandler) || void 0 === n || n.call(this, {
                    metric: Object.assign(Object.assign({
                        event_type: this.event_type
                    }, (0,
                    t.transferDataField)(u)), {
                        extra: i,
                        point_id: o,
                        point_name: a,
                        point_type: s,
                        page_name: c
                    })
                })
            }
        }
        t.default = o
    },
    B3ul: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.addConsoleInstrumentationHandler = t.CONSOLE_LEVELS = void 0;
        const r = n("ParK")
          , i = n("pbPy");
        t.CONSOLE_LEVELS = ["debug", "info", "warn", "error", "log", "assert", "trace"],
        t.addConsoleInstrumentationHandler = function(e) {
            "console"in i.GLOBAL_OBJ && t.CONSOLE_LEVELS.forEach((function(t) {
                t in i.GLOBAL_OBJ.console && (0,
                r.fill)(i.GLOBAL_OBJ.console, t, (function(n) {
                    return function(...r) {
                        e({
                            args: r,
                            level: t
                        }),
                        n && n.apply(i.GLOBAL_OBJ.console, r)
                    }
                }
                ))
            }
            ))
        }
    },
    B5Ud: function(e, t, n) {
        "use strict";
        var r = n("vJKn")
          , i = n("/GRZ")
          , o = n("i2R6")
          , a = n("48fX")
          , s = n("tCBg")
          , c = n("T0f4")
          , u = n("qVT1");
        function l(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = c(e);
                if (t) {
                    var i = c(this).constructor;
                    n = Reflect.construct(r, arguments, i)
                } else
                    n = r.apply(this, arguments);
                return s(this, n)
            }
        }
        var d = n("AroE");
        t.__esModule = !0,
        t.Container = function(e) {
            0;
            return e.children
        }
        ,
        t.createUrl = m,
        t.default = void 0;
        var p = d(n("q1tI"))
          , f = n("g/15");
        function h(e) {
            return b.apply(this, arguments)
        }
        function b() {
            return (b = u(r.mark((function e(t) {
                var n, i, o;
                return r.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = t.Component,
                            i = t.ctx,
                            e.next = 3,
                            (0,
                            f.loadGetInitialProps)(n, i);
                        case 3:
                            return o = e.sent,
                            e.abrupt("return", {
                                pageProps: o
                            });
                        case 5:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        t.AppInitialProps = f.AppInitialProps,
        t.NextWebVitalsMetric = f.NextWebVitalsMetric;
        var v = function(e) {
            a(n, e);
            var t = l(n);
            function n() {
                return i(this, n),
                t.apply(this, arguments)
            }
            return o(n, [{
                key: "componentDidCatch",
                value: function(e, t) {
                    throw e
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.router
                      , n = e.Component
                      , r = e.pageProps
                      , i = e.__N_SSG
                      , o = e.__N_SSP;
                    return p.default.createElement(n, Object.assign({}, r, i || o ? {} : {
                        url: m(t)
                    }))
                }
            }]),
            n
        }(p.default.Component);
        function m(e) {
            var t = e.pathname
              , n = e.asPath
              , r = e.query;
            return {
                get query() {
                    return r
                },
                get pathname() {
                    return t
                },
                get asPath() {
                    return n
                },
                back: function() {
                    e.back()
                },
                push: function(t, n) {
                    return e.push(t, n)
                },
                pushTo: function(t, n) {
                    var r = n ? t : ""
                      , i = n || t;
                    return e.push(r, i)
                },
                replace: function(t, n) {
                    return e.replace(t, n)
                },
                replaceTo: function(t, n) {
                    var r = n ? t : ""
                      , i = n || t;
                    return e.replace(r, i)
                }
            }
        }
        t.default = v,
        v.origGetInitialProps = h,
        v.getInitialProps = h
    },
    EFV3: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isValidTag = void 0;
        const r = ["number", "string", "boolean"];
        t.isValidTag = function(e, t) {
            return !!r.includes(typeof t) && (!(e.length > 32) && !("string" === typeof t && t.length > 250))
        }
    },
    FYa8: function(e, t, n) {
        "use strict";
        var r;
        t.__esModule = !0,
        t.HeadManagerContext = void 0;
        var i = ((r = n("q1tI")) && r.__esModule ? r : {
            default: r
        }).default.createContext({});
        t.HeadManagerContext = i
    },
    IEzh: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.UserAgent = void 0;
        const r = (0,
        n("y66H").__importDefault)(n("jB2q"));
        t.UserAgent = class {
            constructor() {
                const e = new r.default;
                this.ua = e.getResult()
            }
            get connection() {
                var e, t, n, r, i;
                return navigator.connection ? {
                    connection_type: (null === (e = navigator.connection) || void 0 === e ? void 0 : e.effectiveType) || (null === (t = navigator.connection) || void 0 === t ? void 0 : t.type) || "unknown",
                    connection_downlink: (null === (n = navigator.connection) || void 0 === n ? void 0 : n.downlink) ? 1024 * (null === (r = navigator.connection) || void 0 === r ? void 0 : r.downlink) : -1,
                    connection_rtt: null === (i = navigator.connection) || void 0 === i ? void 0 : i.rtt
                } : {
                    connection_type: "unknown"
                }
            }
            get browser() {
                var e, t, n, r;
                return {
                    browser: this.ua.ua,
                    browser_name: null !== (e = this.ua.browser.name) && void 0 !== e ? e : "",
                    browser_version: null !== (t = this.ua.browser.version) && void 0 !== t ? t : "",
                    engine_name: null !== (n = this.ua.engine.name) && void 0 !== n ? n : "",
                    engine_version: null !== (r = this.ua.engine.version) && void 0 !== r ? r : ""
                }
            }
            get screen() {
                var e;
                return {
                    screen_dpr: window.devicePixelRatio ? parseFloat(window.devicePixelRatio.toFixed(2)) : void 0,
                    screen_height: window.screen.height,
                    screen_width: window.screen.width,
                    orientation: (null === (e = window.screen.orientation) || void 0 === e ? void 0 : e.type) || ""
                }
            }
            get device() {
                var e, t, n;
                return {
                    os_name: this.ua.os.name,
                    os_version: this.ua.os.version,
                    device_name: null !== (t = null === (e = this.ua.device) || void 0 === e ? void 0 : e.model) && void 0 !== t ? t : null === (n = this.ua.device) || void 0 === n ? void 0 : n.type,
                    device_id: ""
                }
            }
        }
    },
    JG9b: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Network = t.REQUEST_FAILED = void 0;
        const r = n("hkHQ")
          , i = n("bfg4")
          , o = n("Mza6")
          , a = n("QEem");
        t.REQUEST_FAILED = -999;
        t.Network = class {
            constructor(e) {
                var t;
                this.inited = !1,
                this.de_app_id = e.de_app_id,
                this.secret_key = e.secret_key,
                this.host = e.report_host || (null !== (t = r.host[e.env]) && void 0 !== t ? t : r.host.test)
            }
            getReportDataUrl(e, t) {
                return "web-exception" == e ? `${this.host}${r.API_PREFIX}/${this.de_app_id}/signature` : `${this.host}${r.API_PREFIX_NON_ERROR}/${this.de_app_id}/web_custom/${t}/signature`
            }
            async sendRequest(e) {
                return this.sendPlainData(e)
            }
            async sendPlainData(e) {
                return (0,
                a.retry)(async () => {
                    var n, r, a, s, c, u;
                    const {reportData: l, pageUnload: d=!1} = e
                      , p = l.tag || (null === (r = null === (n = l.events) || void 0 === n ? void 0 : n[0]) || void 0 === r ? void 0 : r.tag) || "web_custom"
                      , f = null !== (a = l.eventType) && void 0 !== a ? a : null === (u = null === (c = null === (s = l.events) || void 0 === s ? void 0 : s[0]) || void 0 === c ? void 0 : c.metric) || void 0 === u ? void 0 : u.event_type
                      , h = this.getReportDataUrl(p, f);
                    if (o.APIs.supportFetchKeepAlive) {
                        const e = await o.APIs.fetchPost({
                            url: h,
                            data: l,
                            apiKey: this.secret_key
                        });
                        return i.Logger.info("[APMS] post successfully - event_id " + (null === e || void 0 === e ? void 0 : e.event_id)),
                        e
                    }
                    return d ? t.REQUEST_FAILED : o.APIs.postXHR({
                        url: h,
                        data: l,
                        apiKey: this.secret_key,
                        async: !d
                    })
                }
                )
            }
            async sendBulk(e) {
                return this.sendPlainBulk(e)
            }
            async sendPlainBulk(e) {
                return (0,
                a.retry)(async () => {
                    const t = e.map(e => this.sendPlainData({
                        reportData: e
                    }));
                    return Promise.all(t)
                }
                )
            }
        }
    },
    JX7q: function(e, t, n) {
        "use strict";
        function r(e) {
            if (void 0 === e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        n.d(t, "a", (function() {
            return r
        }
        ))
    },
    Ji7U: function(e, t, n) {
        "use strict";
        function r(e, t) {
            return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        function i(e, t) {
            if ("function" !== typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            t && r(e, t)
        }
        n.d(t, "a", (function() {
            return i
        }
        ))
    },
    K64n: function(e, t, n) {
        "use strict";
        t.Headers = self.Headers,
        t.Request = self.Request,
        t.Response = self.Response,
        t.fetch = self.fetch
    },
    LpSC: function(e, t, n) {
        n("K64n"),
        e.exports = self.fetch.bind(self)
    },
    Mza6: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.APIs = t.isLimitedDataSize = void 0;
        const r = n("gkOF")
          , i = n("diK7");
        function o(e) {
            return !(e.length > 65536) && (e.length <= 32768 || (0,
            r.getByteLength)(e) <= 65536)
        }
        function a(e, t) {
            const n = +new Date
              , r = Math.floor(2147483647 * Math.random());
            return JSON.stringify({
                api_key: e,
                time_stamp: n,
                nonce: r,
                obf_sig: (0,
                i.md5)(`${e}_${n}_${r}_${t}`)
            })
        }
        t.isLimitedDataSize = o,
        t.APIs = {
            inited: !1,
            supportFetch: "function" === typeof window.fetch,
            supportFetchKeepAlive: "function" === typeof window.fetch && "keepalive"in new Request(""),
            supportSendBeacon: "function" === typeof (null === navigator || void 0 === navigator ? void 0 : navigator.sendBeacon),
            isLimitedDataSize: e => e.byteLength <= 65536,
            async fetchPost(e) {
                const {url: t, data: n, token: r, apiKey: i} = e;
                if (this.supportFetchKeepAlive) {
                    const e = JSON.stringify(n)
                      , s = o(e)
                      , c = await fetch(t, {
                        method: "POST",
                        headers: Object.assign(Object.assign({
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }, r ? {
                            Authorization: "Bearer " + r
                        } : {}), i ? {
                            "Apm-Signature-Headers": a(i, e)
                        } : {}),
                        keepalive: s,
                        body: e
                    })
                      , u = await c.json();
                    return 200 === c.status ? u : Promise.reject(u)
                }
                return !1
            },
            postXHR(e) {
                const {url: t, data: n, async: r=!0, token: i, apiKey: o} = e;
                return new Promise( (e, s) => {
                    const c = new XMLHttpRequest;
                    c.open("POST", t, r),
                    c.setRequestHeader("Content-Type", "application/json"),
                    i && c.setRequestHeader("Authorization", "Bearer " + i),
                    o && c.setRequestHeader("Apm-Signature-Headers", a(o, JSON.stringify(n))),
                    c.addEventListener("readystatechange", () => {
                        if (c.readyState === XMLHttpRequest.DONE) {
                            if (200 === c.status) {
                                let n = c.response;
                                try {
                                    n = JSON.parse(n)
                                } catch (t) {}
                                return e(n)
                            }
                            return s(c.response)
                        }
                    }
                    ),
                    c.send(JSON.stringify(n))
                }
                )
            }
        }
    },
    NMth: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.parseFetchArgs = t.addFetchInstrumentationHandler = void 0;
        const r = n("pbPy")
          , i = n("ParK");
        function o(e) {
            if (0 === e.length)
                return {
                    method: "GET",
                    url: ""
                };
            if (2 === e.length) {
                const [t,n] = e;
                return {
                    url: s(t),
                    method: a(n, "method") ? String(n.method).toUpperCase() : "GET"
                }
            }
            const t = e[0];
            return {
                url: s(t),
                method: a(t, "method") ? String(t.method).toUpperCase() : "GET"
            }
        }
        function a(e, t) {
            return !!e && "object" === typeof e && !!e[t]
        }
        function s(e) {
            return "string" === typeof e ? e : e ? a(e, "url") ? e.url : e.toString ? e.toString() : "" : ""
        }
        t.addFetchInstrumentationHandler = function(e) {
            "fetch"in r.GLOBAL_OBJ && (0,
            i.fill)(r.GLOBAL_OBJ, "fetch", (function(t) {
                return function(...n) {
                    const {method: i, url: a} = o(n)
                      , s = {
                        args: n,
                        fetchData: {
                            method: i,
                            url: a
                        },
                        startTimestamp: Date.now()
                    };
                    return e(Object.assign({}, s)),
                    t.apply(r.GLOBAL_OBJ, n).then(t => {
                        const n = Object.assign(Object.assign({}, s), {
                            endTimestamp: Date.now(),
                            response: t
                        });
                        return e(n),
                        t
                    }
                    , t => {
                        const n = Object.assign(Object.assign({}, s), {
                            endTimestamp: Date.now(),
                            error: t
                        });
                        throw e(n),
                        t
                    }
                    )
                }
            }
            ))
        }
        ,
        t.parseFetchArgs = o
    },
    NzDi: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.addXhrInstrumentationHandler = t.APMS_XHR_DATA_KEY = void 0;
        const r = n("pbPy")
          , i = n("ParK")
          , o = r.GLOBAL_OBJ;
        t.APMS_XHR_DATA_KEY = "__apms_xhr__",
        t.addXhrInstrumentationHandler = function(e) {
            if (!o.XMLHttpRequest)
                return;
            const n = XMLHttpRequest.prototype;
            (0,
            i.fill)(n, "open", (function(n) {
                return function(...r) {
                    const o = Date.now()
                      , a = "string" === typeof r[0] ? r[0].toUpperCase() : void 0
                      , s = function(e) {
                        if ("string" === typeof e)
                            return e;
                        try {
                            return e.toString()
                        } catch (t) {}
                        return
                    }(r[1]);
                    if (!a || !s)
                        return n.apply(this, r);
                    this[t.APMS_XHR_DATA_KEY] = {
                        method: a,
                        url: s,
                        request_headers: {}
                    },
                    "POST" === a && s.match(/apms_key/) && (this.__apms_own_request__ = !0);
                    const c = () => {
                        const n = this[t.APMS_XHR_DATA_KEY];
                        if (n && 4 === this.readyState) {
                            try {
                                n.status_code = this.status
                            } catch (r) {}
                            const t = {
                                args: [a, s],
                                endTimestamp: Date.now(),
                                startTimestamp: o,
                                xhr: this
                            };
                            e(t)
                        }
                    }
                    ;
                    return "onreadystatechange"in this && "function" === typeof this.onreadystatechange ? (0,
                    i.fill)(this, "onreadystatechange", (function(e) {
                        return function(...t) {
                            return c(),
                            e.apply(this, t)
                        }
                    }
                    )) : this.addEventListener("readystatechange", c),
                    (0,
                    i.fill)(this, "setRequestHeader", (function(e) {
                        return function(...n) {
                            const [r,i] = n
                              , o = this[t.APMS_XHR_DATA_KEY];
                            return o && "string" === typeof r && "string" === typeof i && (o.request_headers[r.toLowerCase()] = i),
                            e.apply(this, n)
                        }
                    }
                    )),
                    n.apply(this, r)
                }
            }
            )),
            (0,
            i.fill)(n, "send", (function(n) {
                return function(...r) {
                    const i = this[t.APMS_XHR_DATA_KEY];
                    if (!i)
                        return n.apply(this, r);
                    void 0 !== r[0] && (i.body = r[0]);
                    const o = {
                        args: [i.method, i.url],
                        startTimestamp: Date.now(),
                        xhr: this
                    };
                    return e(o),
                    n.apply(this, r)
                }
            }
            ))
        }
    },
    OPOX: function(e, t, n) {
        "use strict";
        var r = n("rePB")
          , i = n("HaE+")
          , o = n("o0o1")
          , a = n.n(o)
          , s = n("+SFn")
          , c = n("SyLE")
          , u = n("cBaE")
          , l = n("uNo7")
          , d = n("LpSC")
          , p = n.n(d);
        function f(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function h(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? f(Object(n), !0).forEach((function(t) {
                    Object(r.a)(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var b = u.D && window.navigator ? navigator.userAgent || navigator.vendor || window.opera : "";
        function v() {
            var e = Object(u.r)();
            return e === u.d.iOS ? "rweb_ios" : e === u.d.Android ? "rweb_android" : "rweb_others"
        }
        var m, g = function(e) {
            try {
                if (u.D && window.localStorage) {
                    var t = window.localStorage.getItem(e);
                    return JSON.parse(t)
                }
            } catch (n) {
                return void console.warn("getItem error", n)
            }
        }, y = function(e, t) {
            try {
                u.D && window.localStorage && window.localStorage.setItem(e, JSON.stringify(t))
            } catch (n) {
                console.warn("setItem error", n)
            }
        };
        function _(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , n = e.operation
              , r = e.page_type
              , i = e.page_section
              , o = e.target_type
              , a = t;
            return "impression" === n && (a = {
                viewed_objects: [a]
            }),
            {
                operation: n,
                page_type: r,
                target_type: o,
                page_section: i,
                data: a
            }
        }
        var w = null
          , O = function() {
            var e = Object(i.a)(a.a.mark((function e(t, r) {
                var i, o, d, f, O;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (t) {
                                e.next = 2;
                                break
                            }
                            return e.abrupt("return");
                        case 2:
                            return e.next = 4,
                            Object(l.a)();
                        case 4:
                            if (i = e.sent,
                            o = _(t, h(h({}, r), i)),
                            d = {
                                type: "v3",
                                source: "h5",
                                timestamp: +new Date,
                                info: o
                            },
                            !u.z) {
                                e.next = 11;
                                break
                            }
                            Object(s.x)([d]),
                            e.next = 22;
                            break;
                        case 11:
                            if (!w) {
                                e.next = 15;
                                break
                            }
                            w.then((function() {
                                var e;
                                null === (e = m) || void 0 === e || e.sync({
                                    data: d
                                })
                            }
                            )),
                            e.next = 22;
                            break;
                        case 15:
                            if (m) {
                                e.next = 21;
                                break
                            }
                            return e.next = 18,
                            n.e(94).then(n.bind(null, "SBND"));
                        case 18:
                            f = e.sent,
                            O = f.createTrackingV3Sdk,
                            m = u.D ? O({
                                env: c.c,
                                locale: c.b,
                                source: "rweb",
                                platform: v(),
                                storage: {
                                    get: g,
                                    set: y
                                },
                                getCookies: function() {
                                    for (var e = {}, t = document.cookie.split(/;\s/), n = 0, r = t.length; n < r; n++) {
                                        var i = t[n].split("=");
                                        e[i[0]] = i[1]
                                    }
                                    return e
                                },
                                ua: b,
                                fetch: p.a
                            }) : {
                                sync: function() {}
                            };
                        case 21:
                            w = m.sync({
                                data: d
                            });
                        case 22:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t, n) {
                return e.apply(this, arguments)
            }
        }();
        t.a = O
    },
    ParK: function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            try {
                Object.defineProperty(e, t, {
                    value: n,
                    writable: !0,
                    configurable: !0
                })
            } catch (r) {
                console.log(`Failed to add non-enumerable property "${t}" to object`, e)
            }
        }
        function i(e, t) {
            try {
                const n = t.prototype || {};
                e.prototype = t.prototype = n,
                r(e, "__apms_original__", t)
            } catch (n) {}
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getOriginalFunction = t.fill = t.markFunctionWrapped = t.addNonEnumerableProperty = void 0,
        t.addNonEnumerableProperty = r,
        t.markFunctionWrapped = i,
        t.fill = function(e, t, n) {
            if (!(t in e))
                return;
            const r = e[t]
              , o = n(r);
            "function" === typeof o && i(o, r),
            e[t] = o
        }
        ,
        t.getOriginalFunction = function(e) {
            return e.__apms_original__
        }
    },
    Pd7Z: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.supportsHistory = t.addHistoryInstrumentationHandler = void 0;
        const r = n("pbPy")
          , i = n("ParK")
          , o = r.GLOBAL_OBJ;
        let a;
        function s() {
            const e = o.chrome
              , t = e && e.app && e.app.runtime
              , n = "history"in o && !!o.history.pushState && !!o.history.replaceState;
            return !t && n
        }
        t.addHistoryInstrumentationHandler = function(e) {
            if (!s())
                return;
            const t = o.onpopstate;
            function n(t) {
                return function(...n) {
                    const r = n.length > 2 ? n[2] : void 0;
                    if (r) {
                        const t = a
                          , n = String(r);
                        a = n;
                        e({
                            from: t,
                            to: n
                        })
                    }
                    return t.apply(this, n)
                }
            }
            o.onpopstate = function(...n) {
                const r = o.location.href
                  , i = a;
                a = r;
                if (e({
                    from: i,
                    to: r
                }),
                t)
                    try {
                        return t.apply(this, n)
                    } catch (s) {}
            }
            ,
            (0,
            i.fill)(o.history, "pushState", n),
            (0,
            i.fill)(o.history, "replaceState", n)
        }
        ,
        t.supportsHistory = s
    },
    QEem: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.retry = void 0;
        const r = 1;
        t.retry = function(e, t={}) {
            const {retry_limit: n=r} = t;
            let i = 0;
            return async function t() {
                try {
                    return await e()
                } catch (r) {
                    return i >= n ? Promise.reject(new Error(r)) : (i += 1,
                    t())
                }
            }()
        }
    },
    T0f4: function(e, t) {
        function n(t) {
            return e.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            ,
            n(t)
        }
        e.exports = n
    },
    Td3m: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const r = n("pbPy")
          , i = n("B3ul")
          , o = n("Xdf5")
          , a = n("NMth")
          , s = n("Pd7Z")
          , c = n("NzDi");
        function u(e) {
            return !e || (0,
            r.isEmpty)(e) ? void 0 : e
        }
        t.default = class {
            constructor() {
                this.LIST_LIMIT = 50,
                this.breadcrumbs = [],
                (0,
                i.addConsoleInstrumentationHandler)(e => {
                    this.add({
                        type: "default",
                        category: e.level,
                        message: e.args.filter(e => null === e || void 0 === e ? void 0 : e.toString).map(e => e.toString()).join(", ")
                    })
                }
                ),
                (0,
                o.addClickKeypressInstrumentationHandler)(e => {
                    const t = e.event.target || {};
                    this.add({
                        type: "default",
                        category: e.name,
                        data: {
                            target: {
                                id: null === t || void 0 === t ? void 0 : t.id,
                                className: null === t || void 0 === t ? void 0 : t.className,
                                tagName: null === t || void 0 === t ? void 0 : t.tagName
                            }
                        }
                    })
                }
                ),
                (0,
                a.addFetchInstrumentationHandler)(e => {
                    var t, n, r;
                    const i = {};
                    null === (t = e.response) || void 0 === t || t.headers.forEach( (e, t) => {
                        i[t] = e
                    }
                    ),
                    this.add({
                        type: "http",
                        category: "fetch",
                        data: {
                            headers: u(null === (n = e.args[1]) || void 0 === n ? void 0 : n.headers),
                            response_header: u(i),
                            method: e.fetchData.method,
                            url: e.fetchData.url,
                            time_span: e.startTimestamp && e.endTimestamp ? e.endTimestamp - e.startTimestamp : null,
                            status_code: null === (r = e.response) || void 0 === r ? void 0 : r.status
                        }
                    })
                }
                ),
                (0,
                c.addXhrInstrumentationHandler)(e => {
                    var t, n, r, i, o, a;
                    const s = null === (n = (t = e.xhr).getAllResponseHeaders) || void 0 === n ? void 0 : n.call(t)
                      , c = {};
                    if (s) {
                        s.trim().split(/[\r\n]+/).forEach((function(e) {
                            const t = e.split(": ")
                              , n = t.shift()
                              , r = t.join(": ");
                            c[n] = r
                        }
                        ))
                    }
                    this.add({
                        type: "http",
                        category: "xhr",
                        data: {
                            headers: u(null === (r = e.xhr.__apms_xhr__) || void 0 === r ? void 0 : r.request_headers),
                            response_header: u(c),
                            method: null === (i = e.xhr.__apms_xhr__) || void 0 === i ? void 0 : i.method,
                            url: null === (o = e.xhr.__apms_xhr__) || void 0 === o ? void 0 : o.url,
                            time_span: e.startTimestamp && e.endTimestamp ? e.endTimestamp - e.startTimestamp : null,
                            status_code: null === (a = e.xhr.__apms_xhr__) || void 0 === a ? void 0 : a.status_code
                        }
                    })
                }
                ),
                (0,
                s.addHistoryInstrumentationHandler)(e => {
                    this.add({
                        type: "navigation",
                        category: "navigation",
                        data: {
                            from: e.from,
                            to: e.to
                        }
                    })
                }
                )
            }
            get() {
                return [...this.breadcrumbs]
            }
            add(e) {
                const t = {
                    type: e.type || "default",
                    trace_id: (0,
                    r.uuidv4)(),
                    category: e.category,
                    message: e.message,
                    data: e.data,
                    timestamp: +Date.now()
                };
                this.breadcrumbs.push(t),
                this.breadcrumbs.length > this.LIST_LIMIT && (this.breadcrumbs = this.breadcrumbs.slice(-this.LIST_LIMIT))
            }
            clear() {
                this.breadcrumbs = []
            }
        }
    },
    VOJa: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.uuidv4 = void 0,
        t.uuidv4 = function() {
            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                const t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16)
            }
            ))
        }
    },
    WNSG: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const r = n("8CFJ")
          , i = n("YOnp")
          , o = n("bfg4")
          , a = n("nqPb")
          , s = n("m1W8")
          , c = n("pbPy")
          , u = (0,
        r.__importDefault)(n("Td3m"));
        class l extends i.BasePlugin {
            constructor(e) {
                super(e),
                this.interval = s.DEFAULT_CHECK_INTERVAL,
                this.reportAtInterval = !0,
                this.breadcrumb = new u.default,
                this.type = "exception",
                this.delegateReporter = !0,
                this.reportDatas = [],
                "number" === typeof (null === e || void 0 === e ? void 0 : e.interval) && (this.interval = e.interval),
                "history" === (null === e || void 0 === e ? void 0 : e.mode) && (this.reportAtInterval = !1),
                this.path = null === e || void 0 === e ? void 0 : e.path,
                this.beforeAddData = null === e || void 0 === e ? void 0 : e.beforeAddData,
                this.transport = null === e || void 0 === e ? void 0 : e.transport
            }
            static trackError(e, t) {
                if (Object.keys(l.TRIGGER_MAPS).length)
                    try {
                        let n = t;
                        n || (n = "string" === typeof e ? {
                            name: "ErrorEvent",
                            message: e
                        } : {
                            name: e.type,
                            message: "unknown"
                        });
                        const r = {
                            js_error_type: "error",
                            js_error_level: "error",
                            js_error_name: n.name,
                            js_error_message: n.message,
                            js_error_stack: n.stack,
                            js_original_exception: (0,
                            c.stringifyOriginalException)(n),
                            js_page_name: window.location.hostname
                        };
                        r.js_error_stack = (0,
                        c.preProcessStack)(r.js_error_stack);
                        for (const e of Object.values(l.TRIGGER_MAPS))
                            e.triggerFunction(r)
                    } catch (t) {
                        o.Logger.error(t)
                    }
            }
            static trackEvent(e) {
                var t;
                if (Object.keys(l.TRIGGER_MAPS).length)
                    try {
                        let n = void 0
                          , r = "string" === typeof e.reason ? e.reason : null === (t = e.reason) || void 0 === t ? void 0 : t.message
                          , i = e.type;
                        if (e.reason instanceof Error && (r = e.reason.message,
                        i = e.reason.name,
                        n = e.reason.stack),
                        !n && "function" === typeof Error.captureStackTrace) {
                            r instanceof Object && (r = JSON.stringify(r));
                            const e = {
                                message: r
                            };
                            Error.captureStackTrace(e),
                            n = e.stack
                        }
                        const o = {
                            js_error_type: "unhandledrejection",
                            js_error_level: "error",
                            js_error_name: i,
                            js_error_message: r,
                            js_error_stack: n,
                            js_original_exception: (0,
                            c.stringifyOriginalException)(e.reason),
                            js_page_name: window.location.hostname
                        };
                        o.js_error_stack = (0,
                        c.preProcessStack)(o.js_error_stack);
                        for (const e of Object.values(l.TRIGGER_MAPS))
                            e.triggerFunction(o)
                    } catch (n) {
                        o.Logger.error(n)
                    }
            }
            isPageUrlMatch() {
                if (!this.path)
                    return !0;
                const e = window.location.href;
                if ((0,
                c.isMatchArray)(this.path)) {
                    let t = !1;
                    for (const n of this.path)
                        if (e.match(n)) {
                            t = !0;
                            break
                        }
                    return t
                }
                return !!e.match(this.path)
            }
            register(e) {
                this.de_app_id = e.de_app_id,
                this.processData();
                const t = e => {
                    var t, n, r, i, a, c, u, l, d, p;
                    try {
                        if (!this.isPageUrlMatch())
                            return;
                        const o = null === (t = this.beforeAddData) || void 0 === t ? void 0 : t.call(this, e);
                        if (!1 === o)
                            return;
                        this.reportDatas.length || this.processData();
                        let f = this.reportDatas[this.reportDatas.length - 1];
                        f.events.length >= s.LIMITATIONS.REPORT_TRANSACTION_LIMIT && (this.processData(),
                        f = this.reportDatas[this.reportDatas.length - 1]),
                        "object" === typeof o && (e = Object.assign(e, o)),
                        e.js_data_field = Object.assign(null !== (n = e.js_data_field) && void 0 !== n ? n : {}, {
                            report_page_url: "" + window.location.href.slice(0, 512)
                        }),
                        Object.keys(null !== (i = null === (r = this.reporter) || void 0 === r ? void 0 : r.tags) && void 0 !== i ? i : {}).length && (e.js_data_field = Object.assign({}, null !== (c = null === (a = this.reporter) || void 0 === a ? void 0 : a.tags) && void 0 !== c ? c : {}, null !== (u = e.js_data_field) && void 0 !== u ? u : {})),
                        e.js_data_field = Object.assign(null !== (l = e.js_data_field) && void 0 !== l ? l : {}, window.location.hash ? {
                            path_hash: window.location.hash
                        } : {}, window.location.search ? {
                            path_search: window.location.search
                        } : {}),
                        e.js_breadcrumbs = this.breadcrumb.get();
                        const h = Object.assign(Object.assign({}, null === (d = this.reporter) || void 0 === d ? void 0 : d.commonData), {
                            eventType: "web_js_error",
                            tag: "web-exception",
                            exceptions: [Object.assign({}, e)]
                        });
                        h.extra.webCommonData = Object.assign({}, h.extra.webCommonData, (null === (p = this.transport) || void 0 === p ? void 0 : p.call(this, e)) || {}),
                        f.events.push(h)
                    } catch (f) {
                        o.Logger.warn("[APMS] Failed to add datas")
                    }
                }
                ;
                this.triggerHandler = t,
                l.TRIGGER_MAPS[e.de_app_id] = {
                    triggerFunction: t
                },
                this.init(e.de_app_id)
            }
            processData() {
                if (this.reporter)
                    try {
                        if (this.reportDatas.length && !this.reportDatas[this.reportDatas.length - 1].events.length)
                            return;
                        const e = {
                            apiKey: this.reporter.configs.secret_key,
                            notifier: {},
                            payloadVersion: "1.0",
                            events: []
                        };
                        return this.reportDatas.push(e),
                        e
                    } catch (e) {
                        o.Logger.info("[APMS] Failed to process exception data"),
                        o.Logger.error(e)
                    }
            }
            getDataChunks() {
                const e = []
                  , t = this.reportAtInterval ? 0 : 1;
                for (; this.reportDatas.length > t; ) {
                    const t = this.reportDatas.shift();
                    t && e.push(t)
                }
                return this.reportAtInterval && this.processData(),
                e
            }
            async sendData() {
                if (this.reporter && this.hasPendingData)
                    try {
                        const e = this.getDataChunks();
                        if (!e.length)
                            return;
                        if (1 === e.length)
                            return void (await this.reporter.sendData(e[0]));
                        await this.reporter.sendBulkData(e)
                    } catch (e) {
                        o.Logger.error(e)
                    }
            }
            cacheData() {
                var e, t, n;
                this.reportAtInterval && !(null === (t = null === (e = this.reportDatas[0]) || void 0 === e ? void 0 : e.events) || void 0 === t ? void 0 : t.length) || (null === (n = this.reporter) || void 0 === n || n.offlineStore.cacheData(this.reportDatas),
                this.reportDatas = [])
            }
            get hasPendingData() {
                var e;
                if (this.reportAtInterval) {
                    const t = this.reportDatas.filter(e => e.events.length);
                    return !(!t.length || !(null === (e = t[0]) || void 0 === e ? void 0 : e.events.length))
                }
                return this.reportDatas.length > 1
            }
            check() {
                try {
                    if (!this.hasPendingData)
                        return;
                    "requestIdleCallback"in window ? requestIdleCallback(this.sendData.bind(this)) : this.sendData()
                } catch (e) {
                    o.Logger.warn("[APMS] failed to process report datas."),
                    o.Logger.error(e)
                }
            }
            start() {
                this.timer = setInterval( () => {
                    this.check()
                }
                , this.interval)
            }
            unregister() {
                this.appName && delete l.TRIGGER_MAPS[this.appName],
                this.timer && clearInterval(this.timer)
            }
            init(e) {
                try {
                    if (this.reportAtInterval) {
                        const e = "onpagehide"in self ? "pagehide" : "unload";
                        window.addEventListener(e, this.cacheData.bind(this), !1)
                    } else {
                        const t = e => {
                            "beforeunload" === e ? this.cacheData() : this.processData()
                        }
                        ;
                        (new a.HistoryListener).add(e, t)
                    }
                    if (this.start(),
                    l.filled)
                        return;
                    l.serverNow = this.serverNow.bind(this),
                    this.trackGlobalError(),
                    this.trackUnhandledRejection(),
                    l.filled = !0
                } catch (t) {
                    o.Logger.info("[APMS] Failed to init exception plugin"),
                    o.Logger.error(t)
                }
            }
            trackGlobalError() {
                const e = window.onerror;
                window.onerror = function(t, n, r, i, o) {
                    return l.trackError(t, o),
                    "function" === typeof e && e.apply(this, arguments)
                }
            }
            trackUnhandledRejection() {
                const e = window.onunhandledrejection;
                window.onunhandledrejection = function(t) {
                    return l.trackEvent(t),
                    "function" !== typeof e || e.apply(window, arguments)
                }
            }
            capture(e) {
                var t, n, r;
                if ("function" !== typeof this.triggerHandler)
                    return void o.Logger.warn("[APMS] capture - triggerhandler not exist");
                const {error: i, message: a, data: s} = null !== e && void 0 !== e ? e : {};
                if (i || a)
                    try {
                        let e = ""
                          , o = null !== a && void 0 !== a ? a : ""
                          , u = null !== (t = null === s || void 0 === s ? void 0 : s.name) && void 0 !== t ? t : "";
                        (0,
                        c.isErrorObject)(i) ? (e = i.stack,
                        o = null !== (n = o + i.message) && void 0 !== n ? n : "",
                        u = null !== (r = u + i.name) && void 0 !== r ? r : "") : o || "string" !== typeof i || (o = i),
                        e || (e = new Error(o).stack);
                        const l = {
                            js_error_type: "custom",
                            js_error_level: (null === s || void 0 === s ? void 0 : s.level) || "error",
                            js_error_name: u || "error",
                            js_error_message: o,
                            js_error_stack: e,
                            js_original_exception: (0,
                            c.stringifyOriginalException)(i),
                            js_data_field: (0,
                            c.transferDataField)(null === s || void 0 === s ? void 0 : s.data_field),
                            js_extra: null === s || void 0 === s ? void 0 : s.extra,
                            js_breadcrumbs: this.breadcrumb.get(),
                            js_page_name: (null === s || void 0 === s ? void 0 : s.page_name) || window.location.hostname
                        };
                        l.js_error_stack = (0,
                        c.preProcessStack)(l.js_error_stack),
                        this.triggerHandler(l)
                    } catch (i) {
                        o.Logger.error(i)
                    }
                else
                    o.Logger.info("[APMS] error / message cannot be empty at the same time")
            }
            addBreadcrumb(e) {
                this.breadcrumb.add(e)
            }
            clearBreadcrumb() {
                this.breadcrumb.clear()
            }
        }
        t.default = l,
        l.filled = !1,
        l.TRIGGER_MAPS = {}
    },
    WzRY: function(e, t, n) {
        "use strict";
        n.d(t, "m", (function() {
            return s
        }
        )),
        n.d(t, "k", (function() {
            return u
        }
        )),
        n.d(t, "p", (function() {
            return d
        }
        )),
        n.d(t, "j", (function() {
            return f
        }
        )),
        n.d(t, "i", (function() {
            return b
        }
        )),
        n.d(t, "b", (function() {
            return m
        }
        )),
        n.d(t, "f", (function() {
            return y
        }
        )),
        n.d(t, "v", (function() {
            return w
        }
        )),
        n.d(t, "g", (function() {
            return x
        }
        )),
        n.d(t, "a", (function() {
            return j
        }
        )),
        n.d(t, "t", (function() {
            return P
        }
        )),
        n.d(t, "e", (function() {
            return E
        }
        )),
        n.d(t, "u", (function() {
            return T
        }
        )),
        n.d(t, "d", (function() {
            return R
        }
        )),
        n.d(t, "c", (function() {
            return L
        }
        )),
        n.d(t, "r", (function() {
            return N
        }
        )),
        n.d(t, "n", (function() {
            return B
        }
        )),
        n.d(t, "s", (function() {
            return H
        }
        )),
        n.d(t, "q", (function() {
            return G
        }
        )),
        n.d(t, "h", (function() {
            return K
        }
        )),
        n.d(t, "o", (function() {
            return J
        }
        )),
        n.d(t, "l", (function() {
            return W
        }
        ));
        var r = n("HaE+")
          , i = n("o0o1")
          , o = n.n(i)
          , a = n("xds5");
        function s(e) {
            return c.apply(this, arguments)
        }
        function c() {
            return (c = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/replay", {
                                params: {
                                    session_id: t
                                }
                            });
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function u(e) {
            return l.apply(this, arguments)
        }
        function l() {
            return (l = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t.session, "/voucher/applicable_items"), {
                                params: t
                            });
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function d(e) {
            return p.apply(this, arguments)
        }
        function p() {
            return (p = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function f(e) {
            return h.apply(this, arguments)
        }
        function h() {
            return (h = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/insight"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function b(e, t) {
            return v.apply(this, arguments)
        }
        function v() {
            return (v = Object(r.a)(o.a.mark((function e(t, n) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/incentive_task/overview?refresh=").concat(n));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function m(e, t) {
            return g.apply(this, arguments)
        }
        function g() {
            return (g = Object(r.a)(o.a.mark((function e(t, n) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.post("/session/".concat(t, "/incentive_task/claim"), {
                                pending_claim_task_infos: n
                            });
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function y(e) {
            return _.apply(this, arguments)
        }
        function _() {
            return (_ = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/message/ai_reply?offset=0&limit=10&only_count=true"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function w(e, t) {
            return O.apply(this, arguments)
        }
        function O() {
            return (O = Object(r.a)(o.a.mark((function e(t, n) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.post("/shop_page/replay/add", {
                                session_id: +t,
                                show_on_shop_page: n
                            });
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function x(e) {
            return S.apply(this, arguments)
        }
        function S() {
            return (S = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/coin/giveout"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function j(e) {
            return k.apply(this, arguments)
        }
        function k() {
            return (k = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/violation/check"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function P() {
            return A.apply(this, arguments)
        }
        function A() {
            return (A = Object(r.a)(o.a.mark((function e() {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/subtitle/list");
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function E(e) {
            return I.apply(this, arguments)
        }
        function I() {
            return (I = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.post("/session/".concat(t, "/end"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function T(e) {
            return D.apply(this, arguments)
        }
        function D() {
            return (D = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.put("/session/".concat(t.session), t);
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function R(e) {
            return C.apply(this, arguments)
        }
        function C() {
            return (C = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.delete("/auction/session/".concat(t, "/config"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function L(e) {
            return M.apply(this, arguments)
        }
        function M() {
            return (M = Object(r.a)(o.a.mark((function e(t) {
                var n, r, i, s = arguments;
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = s.length > 1 && void 0 !== s[1] ? s[1] : {},
                            r = n.isFollowersOnly,
                            i = void 0 === r || r,
                            e.next = 3,
                            a.c.post("/auction/session/".concat(t, "/config"), {
                                rule: 1,
                                participation: i ? 1 : 0
                            });
                        case 3:
                            return e.abrupt("return", e.sent);
                        case 4:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function N(e, t) {
            return F.apply(this, arguments)
        }
        function F() {
            return (F = Object(r.a)(o.a.mark((function e(t, n) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.post("/session/".concat(t, "/item/track_token"), n);
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function B(e) {
            return U.apply(this, arguments)
        }
        function U() {
            return (U = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/cover/quality"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function H(e) {
            return z.apply(this, arguments)
        }
        function z() {
            return (z = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/viewer_traffic"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function G(e) {
            return q.apply(this, arguments)
        }
        function q() {
            return (q = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/suggestion"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function K() {
            return V.apply(this, arguments)
        }
        function V() {
            return (V = Object(r.a)(o.a.mark((function e() {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/activity");
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function J(e) {
            return X.apply(this, arguments)
        }
        function X() {
            return (X = Object(r.a)(o.a.mark((function e(t) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/diagnose"));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function W(e, t) {
            return $.apply(this, arguments)
        }
        function $() {
            return ($ = Object(r.a)(o.a.mark((function e(t, n) {
                return o.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            a.c.get("/session/".concat(t, "/qc_banner?language=").concat(n));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
    },
    Xdf5: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.addClickKeypressInstrumentationHandler = void 0;
        const r = n("pbPy")
          , i = n("ParK")
          , o = r.GLOBAL_OBJ;
        let a, s, c;
        t.addClickKeypressInstrumentationHandler = function(e) {
            if (!o.document)
                return;
            const t = e;
            ["EventTarget", "Node"].forEach(e => {
                const n = o[e] && o[e].prototype;
                n && n.hasOwnProperty && n.hasOwnProperty("addEventListener") && ((0,
                i.fill)(n, "addEventListener", (function(e) {
                    return function(n, u, l) {
                        if ("click" === n || "keydown" == n)
                            try {
                                const u = this
                                  , d = u.__apms_instrumentation_handlers__ = u.__apms_instrumentation_handlers__ || {}
                                  , p = d[n] = d[n] || {
                                    refCount: 0
                                };
                                if (!p.handler) {
                                    const u = function(e, t=!1) {
                                        return n => {
                                            if (!n || n._apmsCaptured)
                                                return;
                                            const u = function(e) {
                                                try {
                                                    return e.target
                                                } catch (t) {
                                                    return null
                                                }
                                            }(n);
                                            if (function(e, t) {
                                                if ("keydown" !== e)
                                                    return !1;
                                                if (!t || !t.tagName)
                                                    return !0;
                                                if ("INPUT" === t.tagName || "TEXTAREA" === t.tagName || t.isContentEditable)
                                                    return !1;
                                                return !0
                                            }(n.type, u))
                                                return;
                                            (0,
                                            i.addNonEnumerableProperty)(n, "_apmsCaptured", !0),
                                            u && !u._apmsId && (0,
                                            i.addNonEnumerableProperty)(u, "_apmsId", (0,
                                            r.uuidv4)());
                                            const l = "keydown" === n.type ? "input" : n.type;
                                            if (!function(e) {
                                                if (e.type !== s)
                                                    return !1;
                                                try {
                                                    if (!e.target || e.target._apmsId !== c)
                                                        return !1
                                                } catch (t) {}
                                                return !0
                                            }(n)) {
                                                e({
                                                    event: n,
                                                    name: l,
                                                    global: t
                                                }),
                                                s = n.type,
                                                c = u ? u._apmsId : void 0
                                            }
                                            clearTimeout(a),
                                            a = o.setTimeout( () => {
                                                c = void 0,
                                                s = void 0
                                            }
                                            , 1e3)
                                        }
                                    }(t);
                                    p.handler = u,
                                    e.call(this, n, u, l)
                                }
                                p.refCount++
                            } catch (d) {}
                        return e.call(this, n, u, l)
                    }
                }
                )),
                (0,
                i.fill)(n, "removeEventListener", (function(e) {
                    return function(t, n, r) {
                        if ("click" === t || "keydown" == t)
                            try {
                                const n = this
                                  , i = n.__apms_instrumentation_handlers__ || {}
                                  , o = i[t];
                                o && (o.refCount--,
                                o.refCount <= 0 && (e.call(this, t, o.handler, r),
                                o.handler = void 0,
                                delete i[t]),
                                0 === Object.keys(i).length && delete n.__apms_instrumentation_handlers__)
                            } catch (i) {}
                        return e.call(this, t, n, r)
                    }
                }
                )))
            }
            )
        }
    },
    Xuae: function(e, t, n) {
        "use strict";
        var r = n("mPvQ")
          , i = n("/GRZ")
          , o = n("i2R6")
          , a = (n("qXWd"),
        n("48fX"))
          , s = n("tCBg")
          , c = n("T0f4");
        function u(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = c(e);
                if (t) {
                    var i = c(this).constructor;
                    n = Reflect.construct(r, arguments, i)
                } else
                    n = r.apply(this, arguments);
                return s(this, n)
            }
        }
        t.__esModule = !0,
        t.default = void 0;
        var l = n("q1tI")
          , d = function(e) {
            a(n, e);
            var t = u(n);
            function n(e) {
                var o;
                return i(this, n),
                (o = t.call(this, e))._hasHeadManager = void 0,
                o.emitChange = function() {
                    o._hasHeadManager && o.props.headManager.updateHead(o.props.reduceComponentsToState(r(o.props.headManager.mountedInstances), o.props))
                }
                ,
                o._hasHeadManager = o.props.headManager && o.props.headManager.mountedInstances,
                o
            }
            return o(n, [{
                key: "componentDidMount",
                value: function() {
                    this._hasHeadManager && this.props.headManager.mountedInstances.add(this),
                    this.emitChange()
                }
            }, {
                key: "componentDidUpdate",
                value: function() {
                    this.emitChange()
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    this._hasHeadManager && this.props.headManager.mountedInstances.delete(this),
                    this.emitChange()
                }
            }, {
                key: "render",
                value: function() {
                    return null
                }
            }]),
            n
        }(l.Component);
        t.default = d
    },
    YOnp: function(e, t, n) {
        "use strict";
        var r = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ApmsSdk = t.CustomPlugin = t.host = t.BasePlugin = void 0;
        const i = n("1bxb")
          , o = n("JG9b")
          , a = n("bfg4")
          , s = n("EFV3");
        var c = n("6OVD");
        Object.defineProperty(t, "BasePlugin", {
            enumerable: !0,
            get: function() {
                return r(c).default
            }
        });
        var u = n("hkHQ");
        Object.defineProperty(t, "host", {
            enumerable: !0,
            get: function() {
                return u.host
            }
        });
        var l = n("9Bz4");
        Object.defineProperty(t, "CustomPlugin", {
            enumerable: !0,
            get: function() {
                return r(l).default
            }
        });
        t.ApmsSdk = class {
            constructor(e) {
                var t;
                this.inited = !1,
                this.enable = !1;
                try {
                    this.configs = e,
                    this.network = new o.Network({
                        env: null !== (t = e.environment) && void 0 !== t ? t : "test",
                        de_app_id: e.de_app_id,
                        secret_key: e.secret_key,
                        report_host: e.report_host
                    }),
                    this.reporter = new i.Reporter(e,this.network),
                    a.Logger.mute = !e.logger,
                    this.initConfigStatic()
                } catch (n) {
                    a.Logger.log("Failed to init mdap sdk"),
                    a.Logger.error(n)
                }
            }
            async initConfigStatic() {
                var e, t;
                try {
                    (null === (e = this.reporter) || void 0 === e ? void 0 : e.fingerprint) || null === (t = this.reporter) || void 0 === t || t.initFingerprint(),
                    this.enable = !0,
                    this.inited = !0
                } catch (n) {
                    a.Logger.log("Failed to init config")
                }
            }
            use(e) {
                var t;
                if (!this.inited || !this.enable)
                    return;
                const n = e.sample;
                !e.enable || Math.random() > n || null === (t = this.reporter) || void 0 === t || t.register(e)
            }
            remove(e) {
                var t;
                null === (t = this.reporter) || void 0 === t || t.unregister(e)
            }
            addEntryTag(e, t) {
                e ? this.reporter && ((0,
                s.isValidTag)(e, t) ? this.reporter.tags[e] = t.toString() : a.Logger.warn("[APMS] addTag - invalid tag key or value")) : a.Logger.warn("[APMS] addTag - tag is required")
            }
            removeEntryTag(e) {
                e ? this.reporter && Object.prototype.hasOwnProperty.call(this.reporter.tags, e) && delete this.reporter.tags[e] : a.Logger.warn("[APMS] removeTag - tag is required")
            }
        }
    },
    bfg4: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Logger = void 0,
        t.Logger = {
            mute: !1,
            log(e, ...t) {
                (null === this || void 0 === this ? void 0 : this.mute) || console.log(e, ...null !== t && void 0 !== t ? t : [])
            },
            warn(e, ...t) {
                (null === this || void 0 === this ? void 0 : this.mute) || console.warn(e, ...null !== t && void 0 !== t ? t : [])
            },
            info(e, ...t) {
                (null === this || void 0 === this ? void 0 : this.mute) || console.info(e, ...null !== t && void 0 !== t ? t : [])
            },
            error(e, ...t) {
                (null === this || void 0 === this ? void 0 : this.mute) || console.error(e, ...null !== t && void 0 !== t ? t : [])
            }
        }
    },
    cha2: function(e, t, n) {
        "use strict";
        n.r(t);
        var r, i = n("rePB"), o = n("ODXe"), a = n("HaE+"), s = n("1OyB"), c = n("vuIU"), u = n("Ji7U"), l = n("md7G"), d = n("foSv"), p = n("o0o1"), f = n.n(p), h = n("q1tI"), b = n.n(h), v = n("8Bbg"), m = n.n(v), g = n("8Kt/"), y = n.n(g), _ = n("9kay"), w = n("fsQa"), O = n("h4VS"), x = n("vOnD"), S = n("SyLE"), j = Object(x.a)(r || (r = Object(O.a)(['\n  /*! SHPBurmese Font\n  ===============\n\n  This font is a Modified Version of the Padauk font created by SIL International.\n\n  Modifications by Shopee include subsetting to support only the Myanmar Unicode range:\n  U+1000\u2013109F, U+200C\u2013200D, U+25CC, U+A92E, U+A9E0\u2013A9FE, U+AA60\u2013AA7F, U+116D0\u2013116E3.\n\n  New Font Name: SHPBurmese\n\n  Copyright (c) 2002\u20132022 SIL International (http://www.sil.org/)\n  with Reserved Font Names "Padauk", "Namkio", "Deemawso", and "SHPBurmese".\n\n  Portions Copyright (c) 2025 Shopee.\n\n  This Font Software is licensed under the SIL Open Font License, Version 1.1.\n  The full license text is included below.\n\n  -------------------------------------------------------------------------------\n  SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007\n  -------------------------------------------------------------------------------\n\n  PREAMBLE\n  The goals of the Open Font License (OFL) are to stimulate worldwide development\n  of collaborative font projects, to support the font creation efforts of academic\n  and linguistic communities, and to provide a free and open framework in which\n  fonts may be shared and improved in partnership with others.\n\n  The OFL allows the licensed fonts to be used, studied, modified and\n  redistributed freely as long as they are not sold by themselves. The fonts,\n  including any derivative works, can be bundled, embedded, redistributed\n  and/or sold with any software provided that any reserved names are not used\n  by derivative works. The fonts and derivatives, however, cannot be released\n  under any other type of license. The requirement for fonts to remain under\n  this license does not apply to any document created using the fonts or their\n  derivatives.\n\n  DEFINITIONS\n  "Font Software" refers to the set of files released by the Copyright Holder(s)\n  under this license and clearly marked as such. This may include source files,\n  build scripts and documentation.\n\n  "Reserved Font Name" refers to any names specified as such after the copyright\n  statement(s).\n\n  "Original Version" refers to the collection of Font Software components as\n  distributed by the Copyright Holder(s).\n\n  "Modified Version" refers to any derivative made by adding to, deleting, or\n  substituting\u2014in part or in whole\u2014any of the components of the Original\n  Version, by changing formats or by porting the Font Software to a new\n  environment.\n\n  "Author" refers to any designer, engineer, programmer, technical writer or\n  other person who contributed to the Font Software.\n\n  PERMISSION & CONDITIONS\n  Permission is hereby granted, free of charge, to any person obtaining a copy of\n  the Font Software, to use, study, copy, merge, embed, modify, redistribute,\n  and sell modified and unmodified copies of the Font Software, subject to the\n  following conditions:\n\n  1) Neither the Font Software nor any of its individual components, in Original\n    or Modified Versions, may be sold by itself.\n\n  2) Original or Modified Versions of the Font Software may be bundled,\n    redistributed and/or sold with any software, provided that each copy contains\n    the above copyright notice and this license. These can be included either\n    as stand-alone text files, human-readable headers or in the appropriate\n    machine-readable metadata fields within text or binary files as long as\n    those fields can be easily viewed by the user.\n\n  3) No Modified Version of the Font Software may use the Reserved Font Name(s)\n    unless explicit written permission is granted by the corresponding\n    Copyright Holder. This restriction only applies to the primary font name\n    as presented to the users.\n\n  4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font Software\n    shall not be used to promote, endorse or advertise any Modified Version,\n    except to acknowledge the contribution(s) of the Copyright Holder(s) and\n    the Author(s) or with their explicit written permission.\n\n  5) The Font Software, modified or unmodified, in part or in whole, must be\n    distributed entirely under this license and must not be distributed under\n    any other license. The requirement for fonts to remain under this license\n    does not apply to any document created using the Font Software.\n\n  TERMINATION\n  This license becomes null and void if any of the above conditions are not met.\n\n  DISCLAIMER\n  THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n  IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,\n  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT,\n  TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR\n  ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL,\n  INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF\n  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE\n  THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE. */\n\n  @font-face {\n    font-display: swap;\n    font-family: \'SHPBurmese\';\n    src: local(\'SHPBurmese\'), local(\'SHPBurmese-Regular\'),\n      url(\'', "/fonts/SHPBurmese-Regular.woff2') format('woff2'),\n      url('", "/fonts/SHPBurmese-Regular.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n    unicode-range: U+1000-109F, U+200C-200D, U+25CC, U+A92E, U+A9E0-A9FE,\n      U+AA60-AA7F, U+116D0-116E3;\n  }\n\n  @font-face {\n    font-display: swap;\n    font-family: 'SHPBurmese';\n    src: local('SHPBurmese'), local('SHPBurmese-Bold'),\n      url('", "/fonts/SHPBurmese-Bold.woff2') format('woff2'),\n      url('", "/fonts/SHPBurmese-Bold.woff') format('woff');\n    font-weight: 500 900;\n    font-style: normal;\n    unicode-range: U+1000-109F, U+200C-200D, U+25CC, U+A92E, U+A9E0-A9FE,\n      U+AA60-AA7F, U+116D0-116E3;\n  }\n\n  /*! SHPKhmer Font | SIL Open Font License | See SHPKhmer.LICENSE.txt */\n  @font-face {\n    font-display: swap;\n    font-family: 'SHPKhmer';\n    src: local('SHPKhmer'), local('SHPKhmer-Regular'),\n      url('", "/fonts/SHPKhmer-Regular.woff2') format('woff2'),\n      url('", "/fonts/SHPKhmer-Regular.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n    unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;\n  }\n  \n  /*! SHPKhmer Font | SIL Open Font License | See SHPKhmer.LICENSE.txt */\n  @font-face {\n    font-display: swap;\n    font-family: 'SHPKhmer';\n    src: local('SHPKhmer'), local('SHPKhmer-Bold'),\n      url('", "/fonts/SHPKhmer-Bold.woff2') format('woff2'),\n      url('", "/fonts/SHPKhmer-Bold.woff') format('woff');\n    font-weight: 500 900;\n    font-style: normal;\n    unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;\n  }\n\n  html {\n    touch-action: manipulation;\n    font-family: -apple-system, \"Helvetica\", PingFangSC-Regular, sans-serif;\n    user-select: none;\n  }\n\n  html[lang='my'] {\n    touch-action: manipulation;\n    font-family: 'SHPBurmese', sans-serif;\n    user-select: none;\n  }\n\n  html[lang='km'] {\n    touch-action: manipulation;\n    font-family: 'SHPKhmer', sans-serif;\n    user-select: none;\n  }\n\n  html,\n  body,\n  ul,\n  p {\n    padding: 0;\n    margin: 0;\n\n    ul {\n      list-style-type: none;\n    }\n  }\n\n  button {\n    outline: none;\n    background-color: transparent;\n  }\n\n  textarea,\n  input,\n  button {\n    border: none;\n  }\n\n  a,\n  img,\n  button,\n  input,\n  textarea,\n  li {\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  }\n\n  textarea:focus,\n  textarea:active,\n  input:focus,\n  input:active {\n    outline: none;\n  }\n\n  .text-ellipsis {\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n"])), S.a, S.a, S.a, S.a, S.a, S.a, S.a, S.a), k = b.a.createElement, P = function() {
            return k(y.a, null, k("meta", {
                charSet: "UTF-8"
            }), k("meta", {
                name: "viewport",
                content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
            }), k("meta", {
                httpEquiv: "X-UA-Compatible",
                content: "ie=edge"
            }), k("meta", {
                name: "format-detection",
                content: "telephone=no"
            }))
        }, A = n("cBaE"), E = n("okNM"), I = n("KQm4");
        function T(e, t, n, r) {
            n && Object.defineProperty(e, t, {
                enumerable: n.enumerable,
                configurable: n.configurable,
                writable: n.writable,
                value: n.initializer ? n.initializer.call(r) : void 0
            })
        }
        function D(e, t, n, r, i) {
            var o = {};
            return Object.keys(r).forEach((function(e) {
                o[e] = r[e]
            }
            )),
            o.enumerable = !!o.enumerable,
            o.configurable = !!o.configurable,
            ("value"in o || o.initializer) && (o.writable = !0),
            o = n.slice().reverse().reduce((function(n, r) {
                return r(e, t, n) || n
            }
            ), o),
            i && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(i) : void 0,
            o.initializer = void 0),
            void 0 === o.initializer && (Object.defineProperty(e, t, o),
            o = null),
            o
        }
        var R = n("2vnA")
          , C = n("vwzm")
          , L = n("WzRY")
          , M = n("+CCi")
          , N = n("Bk8j")
          , F = n("Z3Gs")
          , B = n("+SFn")
          , U = n("6ifN")
          , H = {};
        function z() {
            return G.apply(this, arguments)
        }
        function G() {
            return (G = Object(a.a)(f.a.mark((function e() {
                var t, n, r, i;
                return f.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            Object(U.d)();
                        case 2:
                            if (t = e.sent,
                            n = Object(o.a)(t, 2),
                            r = n[0],
                            i = n[1],
                            !r) {
                                e.next = 9;
                                break
                            }
                            return H.loginStatus = !1,
                            e.abrupt("return", Promise.resolve(!1));
                        case 9:
                            return H.loginStatus = !0,
                            H.userInfo = i,
                            e.abrupt("return", Promise.resolve(!0));
                        case 12:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function q() {
            return K.apply(this, arguments)
        }
        function K() {
            return (K = Object(a.a)(f.a.mark((function e() {
                return f.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            B.g.login({
                                redirectTab: 1
                            });
                        case 2:
                            if (1 === e.sent.status) {
                                e.next = 5;
                                break
                            }
                            return e.abrupt("return", Promise.resolve(!1));
                        case 5:
                            return e.next = 7,
                            z();
                        case 7:
                            if (!e.sent) {
                                e.next = 12;
                                break
                            }
                            return e.abrupt("return", Promise.resolve(!0));
                        case 12:
                            return e.abrupt("return", Promise.resolve(!1));
                        case 13:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        var V, J, X, W, $, Y, Q, Z, ee, te, ne, re, ie, oe, ae, se, ce, ue, le, de, pe, fe, he, be, ve, me, ge, ye, _e, we = n("oGiH"), Oe = n("4Za5"), xe = n("jR5A"), Se = n("xds5"), je = n("WAIB"), ke = n("npMX"), Pe = n("zSlH"), Ae = n("+Wxn");
        function Ee(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function Ie(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Ee(Object(n), !0).forEach((function(t) {
                    Object(i.a)(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ee(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var Te = function() {
            var e = Object(a.a)(f.a.mark((function e(t) {
                return f.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            new Promise((function(e) {
                                setTimeout((function() {
                                    e([null, {}])
                                }
                                ), t)
                            }
                            ));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , De = Object(F.d)("shopee-live-streaming-")
          , Re = w.a.init()
          , Ce = new (V = R.d.bound,
        J = R.d.bound,
        X = R.d.bound,
        W = R.d.bound,
        $ = R.d.bound,
        Y = R.d.bound,
        Q = R.d.bound,
        Z = R.d.bound,
        ee = R.d.bound,
        te = R.d.bound,
        ne = R.d.bound,
        re = R.d.bound,
        ie = R.d.bound,
        oe = R.d.bound,
        ae = R.d.bound,
        se = R.d.bound,
        ce = R.d.bound,
        le = D((ue = function() {
            function e() {
                var t = this;
                Object(s.a)(this, e),
                T(this, "info", le, this),
                T(this, "recordInfo", de, this),
                T(this, "status", pe, this),
                T(this, "loadSession", fe, this),
                T(this, "loadProducts", he, this),
                T(this, "canShowRecProducts", be, this),
                T(this, "uploading", ve, this),
                T(this, "coverUploading", me, this),
                T(this, "maxItems", ge, this),
                T(this, "sortMode", ye, this),
                this.updating = void 0,
                this.tryQuitTime = void 0,
                this.coverFile = void 0,
                this.coverUploadPromise = void 0,
                this.initTime = void 0,
                this.listener = void 0,
                this.addListener = void 0,
                this.removeListener = void 0,
                this.callListeners = void 0,
                this.incentiveTasks = void 0,
                this.trackToast = function(e) {
                    Object(Ae.a)({
                        operation: "impression",
                        page_type: "streamer_operation_failed_toast"
                    }, Ie({
                        item_count: t.info.selectedProducts.length,
                        streamer_from_source: "create_stream_page",
                        function_button_name: e,
                        ctx_streaming_id: t.info.sessionid
                    }, Object(A.s)()))
                }
                ,
                this.getFetchItems = function(e) {
                    return e.map((function(e) {
                        var t, n, r = null === (t = e.affiliate) || void 0 === t || null === (n = t.campaign) || void 0 === n ? void 0 : n.campaign_token;
                        return {
                            itemId: e.item_id,
                            shopId: e.shop_id,
                            campaignToken: r
                        }
                    }
                    ))
                }
                ,
                T(this, "onChangeSort", _e, this),
                this.navigatePreviewLivePage = function(e) {
                    var n = e.isSlave
                      , r = void 0 !== n && n
                      , i = e.cover
                      , o = e.popSelfConfig
                      , a = void 0 === o ? {
                        popSelf: !1
                    } : o;
                    je.c.navigatePreviewLivePage(t.info.sessionid, {
                        auctionAllow: t.info.auction && 0 === t.info.auction.length ? 0 : 1,
                        uid: t.info.uid,
                        isSlave: r ? 1 : 0,
                        cover: i
                    }, Ie({}, a))
                }
                ,
                this.info = {
                    sessionid: De.get(N.x),
                    cover: "",
                    showCover: "",
                    title: "",
                    description: "",
                    products: [],
                    subtitle: "",
                    auction: [],
                    uid: null,
                    isTest: !1,
                    lastNormalSid: 0,
                    hasViolation: !1,
                    selectedProducts: []
                },
                this.recordInfo = {
                    title: ""
                },
                this.status = N.F.SESSION_UNSTART,
                this.loadSession = !0,
                this.loadProducts = !1,
                this.uploading = !1,
                this.updating = !1,
                this.coverUploading = !1,
                this.tryQuitTime = 0,
                this.initTime = 0,
                this.incentiveTasks = [],
                this.maxItems = 0,
                this.sortMode = !1,
                this.listener = {},
                this.addListener = function(e, n) {
                    t.listener[e] || (t.listener[e] = []),
                    t.listener[e] = [].concat(Object(I.a)(t.listener[e]), [n])
                }
                ,
                this.removeListener = function(e, n) {
                    var r = t.listener[e] && Object(I.a)(t.listener[e]);
                    if (r) {
                        var i = r.indexOf(n);
                        -1 !== i && (r.splice(i, 1),
                        t.listener[e] = r)
                    }
                }
                ,
                this.callListeners = function(e, n) {
                    var r = t.listener[e];
                    r && r.forEach((function(e) {
                        return e(n)
                    }
                    ))
                }
            }
            return Object(c.a)(e, [{
                key: "canSubmit",
                get: function() {
                    return "" !== this.info.cover && "" !== this.info.title.trim() && !this.coverUploading && this.info.products.length <= this.maxItems
                }
            }, {
                key: "exceedLimit",
                get: function() {
                    return this.info.products.length > this.maxItems
                }
            }, {
                key: "getBaseInfo",
                value: function() {
                    var e, t, n, r, i, o = null;
                    try {
                        o = JSON.parse(Object(xe.e)("setup_extra_info"))
                    } catch (a) {}
                    return {
                        title: (null === (e = o) || void 0 === e ? void 0 : e.title) || Object(xe.e)("title") || this.getStorage("title") || "",
                        subtitle: (null === (t = o) || void 0 === t ? void 0 : t.subtitle) || Object(xe.e)("subtitle") || this.getStorage("subtitle") || "",
                        description: (null === (n = o) || void 0 === n ? void 0 : n.description) || Object(xe.e)("description") || this.getStorage("description") || "",
                        cover: (null === (r = o) || void 0 === r ? void 0 : r.cover) || Object(xe.e)("cover") || this.getStorage("cover") || "",
                        showCover: (null === (i = o) || void 0 === i ? void 0 : i.cover) || Object(xe.e)("cover") || this.getStorage("cover") || ""
                    }
                }
            }, {
                key: "presetReminderInSession",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t) {
                        var n, r, i, a, s;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if ((n = Object(xe.e)("setup_extra_info")) && t) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 3:
                                    r = null;
                                    try {
                                        i = JSON.parse(n),
                                        r = i.reminder_id ? Number(i.reminder_id) : null
                                    } catch (c) {}
                                    if (r) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 7:
                                    return e.next = 9,
                                    Object(C.m)(t, r);
                                case 9:
                                    a = e.sent,
                                    s = Object(o.a)(a, 1),
                                    s[0] && Object(B.u)(Re.t("live_tab_network_error1"), B.w.FAILURE);
                                case 13:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "initSession",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n, r, i, a, s = this;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return this.loadSession = !0,
                                    e.next = 3,
                                    Object(C.h)();
                                case 3:
                                    if (n = e.sent,
                                    r = Object(o.a)(n, 2),
                                    i = r[0],
                                    a = r[1],
                                    this.initTime = this.initTime + 1,
                                    !i) {
                                        e.next = 19;
                                        break
                                    }
                                    if (i.message === Se.d.NETWORK_ERROR && window.location.reload(),
                                    i.errCode !== N.f && i.errCode !== N.g) {
                                        e.next = 17;
                                        break
                                    }
                                    return e.next = 13,
                                    q();
                                case 13:
                                    e.sent ? this.initTime < 3 ? this.initSession() : (B.g.showToast(i.message, B.w.FAILURE),
                                    setTimeout((function() {
                                        B.g.popSelf()
                                    }
                                    ), 500)) : (B.g.showToast(Re.t("toast.noLiveAuth"), B.w.FAILURE),
                                    setTimeout((function() {
                                        B.g.popSelf()
                                    }
                                    ), 500)),
                                    e.next = 18;
                                    break;
                                case 17:
                                    i.errCode === N.l ? (B.g.showToast(Re.t("toast.noLiveAuth"), B.w.FAILURE),
                                    setTimeout((function() {
                                        B.g.popSelf()
                                    }
                                    ), 500)) : B.g.showToast(i.message, B.w.FAILURE);
                                case 18:
                                    return e.abrupt("return");
                                case 19:
                                    return e.next = 21,
                                    this.presetReminderInSession(null === a || void 0 === a || null === (t = a.session) || void 0 === t ? void 0 : t.session_id);
                                case 21:
                                    Object(R.m)((function() {
                                        var e = a.session
                                          , t = e.session_id
                                          , n = e.cover_pic
                                          , r = e.title
                                          , i = e.description
                                          , o = e.status
                                          , c = e.device_id
                                          , u = e.subtitle
                                          , l = e.uid
                                          , d = e.last_normal_sid
                                          , p = a.subtitle_permission
                                          , f = void 0 !== p && p
                                          , h = a.user_status
                                          , b = a.has_violation
                                          , v = a.multi_dev_role;
                                        s.status = o,
                                        s.judgeSession({
                                            sessionid: t,
                                            cover: n,
                                            title: r,
                                            description: i,
                                            deviceID: c,
                                            subtitle: u,
                                            subtitlePermission: f,
                                            uid: l,
                                            isTest: "test" === Object(N.G)(),
                                            lastNormalSid: d,
                                            hasViolation: b
                                        }),
                                        s.dealCover(a.session),
                                        s.getProducts(),
                                        o !== N.F.SESSION_UNSTART ? s.handleSessionLive(r, v, n) : s.loadSession = !1,
                                        h === N.A.FROZEN && s.dealFrozenUser()
                                    }
                                    ));
                                case 22:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "dealFrozenUser",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return t = Re.t("multipages_setup_frozen_user_tips"),
                                    e.next = 3,
                                    B.g.popUp({
                                        popUp: {
                                            message: t,
                                            okText: Re.t("live_streaming_host_noted")
                                        }
                                    });
                                case 3:
                                    0 !== (n = e.sent).buttonClicked && 2 !== n.buttonClicked || B.g.popSelf();
                                case 5:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "dealCover",
                value: function(e) {
                    var t = e.is_low_quality_cover
                      , n = e.cover_pic
                      , r = e.cover_violation;
                    this.getStorage("cover") === n && (null !== r && void 0 !== r && r.is_invalid && (this.setAndSave("cover", ""),
                    this.info.showCover = "",
                    this.callListeners("dealViolationCover", null === r || void 0 === r ? void 0 : r.violation_info)),
                    t && this.callListeners("dealLowQualityCover"))
                }
            }, {
                key: "judgeSession",
                value: function(e) {
                    if (this.info.sessionid && this.info.sessionid === e.sessionid)
                        this.info = Ie(Ie({}, this.info), {}, {
                            products: this.getStorage("products") ? JSON.parse(this.getStorage("products")) : [],
                            isTest: "true" === this.getStorage("isTest")
                        }, this.getBaseInfo()),
                        this.recordInfo.title = this.getBaseInfo().title;
                    else {
                        this.info.sessionid && (this.removeStorage("cover"),
                        this.removeStorage("title"),
                        this.removeStorage("description"),
                        this.removeStorage("products"),
                        this.removeStorage("subtitle"),
                        this.removeStorage("isTest")),
                        this.setAndSave("sessionid", e.sessionid),
                        this.setAndSave("cover", e.cover || ""),
                        this.info.showCover = e.cover || "";
                        var t = e.title || "";
                        this.setAndSave("title", t);
                        var n = e.subtitle || "";
                        this.setAndSave("subtitle", n);
                        var r = this.getBaseInfo()
                          , i = r.title
                          , o = r.subtitle
                          , a = r.description;
                        this.info.subtitle = o || n,
                        this.info.title = i || t,
                        this.recordInfo.title = i || t,
                        this.info.description = a || "",
                        this.setAndSave("isTest", e.isTest),
                        this.info.isTest = e.isTest || !1
                    }
                    this.info.subtitlePermission = e.subtitlePermission,
                    this.info.deviceID = e.deviceID,
                    this.info.uid = e.uid,
                    this.info.isTest = e.isTest,
                    this.info.lastNormalSid = e.lastNormalSid;
                    var s = Object(Oe.a)(this.info.sessionid);
                    this.info.auction = s,
                    this.info.hasViolation = e.hasViolation
                }
            }, {
                key: "handleSessionLive",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t, n, r) {
                        var i, o, a, s, c;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    B.g.getAppInfo();
                                case 2:
                                    return i = e.sent,
                                    e.next = 5,
                                    Object(Pe.c)();
                                case 5:
                                    if (o = e.sent,
                                    this.info.deviceID !== i.deviceID && 1 !== n) {
                                        e.next = 17;
                                        break
                                    }
                                    return a = t ? Re.t("live_streaming_host_account_has_start_do_you_wish_return", {
                                        title: t
                                    }) : Re.t("confirm.liveNotEnd"),
                                    e.next = 10,
                                    B.g.popUp({
                                        popUp: {
                                            message: a,
                                            okText: Re.t("live_streaming_host_return"),
                                            cancelText: Re.t("live_streaming_host_end_live"),
                                            autoDismiss: !1
                                        }
                                    });
                                case 10:
                                    if (0 !== e.sent.buttonClicked) {
                                        e.next = 14;
                                        break
                                    }
                                    return this.navigatePreviewLivePage({
                                        isSlave: !1
                                    }),
                                    e.abrupt("return");
                                case 14:
                                    this.handleEndSession(),
                                    e.next = 26;
                                    break;
                                case 17:
                                    if (!o || 2 !== n) {
                                        e.next = 21;
                                        break
                                    }
                                    this.navigatePreviewLivePage({
                                        isSlave: !0,
                                        cover: r,
                                        popSelfConfig: {
                                            popSelf: !0,
                                            __pc__: 1
                                        }
                                    }),
                                    e.next = 26;
                                    break;
                                case 21:
                                    return s = t ? Re.t("live_streaming_host_account_has_start", {
                                        title: t
                                    }) : Re.t("liveConflict.description"),
                                    e.next = 24,
                                    B.g.popUp({
                                        popUp: {
                                            message: s,
                                            okText: Re.t("live_streaming_host_noted")
                                        }
                                    });
                                case 24:
                                    0 !== (c = e.sent).buttonClicked && 2 !== c.buttonClicked || B.g.popSelf();
                                case 26:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleEndSession",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n, r, i = this;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return this.loadSession = !0,
                                    e.next = 3,
                                    Object(L.e)(this.info.sessionid);
                                case 3:
                                    t = e.sent,
                                    n = Object(o.a)(t, 1),
                                    r = n[0],
                                    Object(R.m)((function() {
                                        i.loadSession = !1,
                                        r ? i.tryQuitTime < 3 ? (i.handleEndSession(),
                                        i.tryQuitTime++) : (B.g.showToast(Re.t("toast.requestFailed"), B.w.FAILURE),
                                        B.g.popSelf()) : i.initSession()
                                    }
                                    ));
                                case 7:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "getIncentiveTask",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n, r, i, a = this;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    Object(L.h)();
                                case 2:
                                    t = e.sent,
                                    n = Object(o.a)(t, 2),
                                    r = n[0],
                                    i = n[1],
                                    Object(R.m)((function() {
                                        !r && i.activities && (a.incentiveTasks = i.activities)
                                    }
                                    ));
                                case 7:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "getAuctionFromCache",
                value: function() {
                    return Object(Oe.a)(this.info.sessionid)
                }
            }, {
                key: "handleAuctionChange",
                value: function(e) {
                    this.info.auction = e
                }
            }, {
                key: "getSubtitle",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    this.info.subtitle = this.getStorage("subtitle") || "";
                                case 1:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "getProducts",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n, r, i, a, s, c, u, l, d = this, p = arguments;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return n = !(p.length > 0 && void 0 !== p[0]) || p[0],
                                    this.loadProducts = !0,
                                    e.next = 4,
                                    Object(M.q)({
                                        sessionId: this.info.sessionid,
                                        offset: 0,
                                        isUsedNew: !0
                                    });
                                case 4:
                                    return r = e.sent,
                                    i = Object(o.a)(r, 2),
                                    a = i[0],
                                    s = i[1],
                                    c = null !== (t = null === s || void 0 === s ? void 0 : s.max_items) && void 0 !== t ? t : ke.d,
                                    Object(ke.a)(c, this.info.sessionid),
                                    u = s && s.items || [],
                                    l = u,
                                    Object(R.m)((function() {
                                        d.loadProducts = !1,
                                        a || (d.canShowRecProducts = !0,
                                        d.maxItems = c,
                                        d.setAndSave("products", l))
                                    }
                                    )),
                                    n && l.length > c && this.showExceedLimitDialog(),
                                    e.abrupt("return", l);
                                case 15:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "showExceedLimitDialog",
                value: function() {
                    var e = this;
                    Object(Pe.d)().then((function(t) {
                        t && B.g.popUp({
                            popUp: {
                                title: Re.t("live_streaming_orange_bag_limit_exceed_limit_title"),
                                message: Re.t("live_streaming_orange_bag_limit_exceed_limit_limits").replace("{orange_bag_limits}", e.maxItems),
                                okText: Re.t("live_streaming_orange_bag_limit_exceed_limit_btn_to_sort"),
                                cancelText: Re.t("live_streaming_orange_bag_limit_exceed_limit_btn_cancel"),
                                autoDismiss: !1
                            }
                        }).then((function(t) {
                            0 === t.buttonClicked && Object(R.m)((function() {
                                e.sortMode = !0
                            }
                            ))
                        }
                        ))
                    }
                    ))
                }
            }, {
                key: "handleTextChange",
                value: function(e, t) {
                    t.length <= 200 && this.setAndSave(e, t)
                }
            }, {
                key: "handleSubtitleChange",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    this.setAndSave("subtitle", e)
                }
            }, {
                key: "handleCoverChange",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t) {
                        var n, r, i, a, s = this;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return this.coverFile = "",
                                    this.coverUploading = !0,
                                    this.coverUploadPromise = this.imageUploading(t),
                                    e.next = 5,
                                    Promise.race([this.coverUploadPromise, Te(8e3)]);
                                case 5:
                                    n = e.sent,
                                    r = Object(o.a)(n, 2),
                                    i = r[0],
                                    a = r[1],
                                    Object(R.m)((function() {
                                        var e, n, r, o;
                                        (s.coverUploading = !1,
                                        a) ? B.g.showToast(Re.t("cover_upload_failed_network"), B.w.FAILURE) : null !== i && void 0 !== i && null !== (e = i.data) && void 0 !== e && null !== (n = e.cover_violation) && void 0 !== n && n.is_invalid ? s.callListeners("dealViolationCover", null === i || void 0 === i || null === (r = i.data) || void 0 === r || null === (o = r.cover_violation) || void 0 === o ? void 0 : o.violation_info) : (s.info = Ie(Ie({}, s.info), {}, {
                                            showCover: t,
                                            cover: t
                                        }),
                                        s.setAndSave("cover", i.data.file_id))
                                    }
                                    ));
                                case 10:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "imageUploading",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t) {
                        var r, i, a, s, c, u, l, d;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (this.coverFile) {
                                        e.next = 16;
                                        break
                                    }
                                    return e.next = 3,
                                    n.e(48).then(n.bind(null, "SqG3"));
                                case 3:
                                    return r = e.sent.default,
                                    e.next = 6,
                                    new we.a(r).dispatch([t, "cover"]);
                                case 6:
                                    if (i = e.sent,
                                    a = Object(o.a)(i, 2),
                                    s = a[0],
                                    !a[1]) {
                                        e.next = 15;
                                        break
                                    }
                                    return this.coverUploading = !1,
                                    e.next = 14,
                                    Promise.resolve([null, new Error("Failed")]);
                                case 14:
                                    return e.abrupt("return", e.sent);
                                case 15:
                                    this.coverFile = s;
                                case 16:
                                    return e.next = 18,
                                    Object(C.p)(this.coverFile, 5e3);
                                case 18:
                                    if (c = e.sent,
                                    u = Object(o.a)(c, 2),
                                    l = u[0],
                                    !(d = u[1])) {
                                        e.next = 26;
                                        break
                                    }
                                    return e.next = 25,
                                    Promise.resolve([null, d]);
                                case 25:
                                    return e.abrupt("return", e.sent);
                                case 26:
                                    return e.next = 28,
                                    Promise.resolve([l, null]);
                                case 28:
                                    return e.abrupt("return", e.sent);
                                case 29:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleDeleteProduct",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t, n) {
                        var r, i, a, s, c;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (!this.updating) {
                                        e.next = 2;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 2:
                                    return this.updating = !0,
                                    e.next = 5,
                                    Object(M.c)({
                                        sessionId: this.info.sessionid,
                                        itemIds: [n]
                                    });
                                case 5:
                                    if (r = e.sent,
                                    i = Object(o.a)(r, 1),
                                    a = i[0],
                                    this.updating = !1,
                                    !a) {
                                        e.next = 12;
                                        break
                                    }
                                    return B.g.showToast(Re.t("live_streaming_edit_order_common_operation_fail"), B.w.FAILURE),
                                    e.abrupt("return");
                                case 12:
                                    return s = this.info.products,
                                    c = s.slice(0, t).concat(s.slice(t + 1)),
                                    this.setAndSave("products", c),
                                    e.abrupt("return", c);
                                case 16:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handlePinProduct",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t, n) {
                        var r, i, a, s, c;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return r = this.info.products,
                                    i = r[t],
                                    this.updating = !0,
                                    e.next = 5,
                                    Object(M.r)({
                                        sessionId: this.info.sessionid,
                                        items: [{
                                            item_id: i.item_id,
                                            shop_id: i.shop_id
                                        }]
                                    });
                                case 5:
                                    if (a = e.sent,
                                    s = Object(o.a)(a, 1),
                                    !s[0]) {
                                        e.next = 11;
                                        break
                                    }
                                    return B.g.showToast(Re.t("live_streaming_edit_order_common_operation_fail"), B.w.FAILURE),
                                    e.abrupt("return");
                                case 11:
                                    this.updating = !1,
                                    (c = r.slice(0, t).concat(r.slice(t + 1))).unshift(i),
                                    this.setAndSave("products", c);
                                case 15:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleBatchDelete",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n, r, i, a, s, c;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (t = [],
                                    n = this.info,
                                    r = n.products,
                                    i = n.selectedProducts,
                                    !this.updating) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 4:
                                    return this.updating = !0,
                                    e.next = 7,
                                    Object(M.c)({
                                        sessionId: this.info.sessionid,
                                        itemIds: i.map((function(e) {
                                            return e.item_id
                                        }
                                        ))
                                    });
                                case 7:
                                    if (a = e.sent,
                                    s = Object(o.a)(a, 1),
                                    c = s[0],
                                    this.updating = !1,
                                    !c) {
                                        e.next = 15;
                                        break
                                    }
                                    return B.g.showToast(Re.t("live_streaming_edit_order_common_operation_fail"), B.w.FAILURE),
                                    this.trackToast("delete"),
                                    e.abrupt("return");
                                case 15:
                                    return r.forEach((function(e) {
                                        -1 === i.findIndex((function(t) {
                                            return t.item_id === e.item_id
                                        }
                                        )) && t.push(e)
                                    }
                                    )),
                                    this.setAndSave("products", t),
                                    this.info.selectedProducts = [],
                                    e.abrupt("return", t);
                                case 19:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleBatchPin",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n, r, i, a, s, c, u, l;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return t = [],
                                    n = [],
                                    r = this.info,
                                    i = r.products,
                                    a = r.selectedProducts,
                                    i.forEach((function(e) {
                                        -1 === a.findIndex((function(t) {
                                            return t.item_id === e.item_id
                                        }
                                        )) ? t.push(e) : n.push(e)
                                    }
                                    )),
                                    this.updating = !0,
                                    e.next = 7,
                                    Object(M.r)({
                                        sessionId: this.info.sessionid,
                                        items: a.map((function(e) {
                                            return {
                                                item_id: e.item_id,
                                                shop_id: e.shop_id
                                            }
                                        }
                                        ))
                                    });
                                case 7:
                                    if (s = e.sent,
                                    c = Object(o.a)(s, 1),
                                    u = c[0],
                                    this.updating = !1,
                                    !u) {
                                        e.next = 15;
                                        break
                                    }
                                    return B.g.showToast(Re.t("live_streaming_edit_order_common_operation_fail"), B.w.FAILURE),
                                    this.trackToast("pin_to_top"),
                                    e.abrupt("return");
                                case 15:
                                    return l = [].concat(n, t),
                                    this.setAndSave("products", l),
                                    this.info.selectedProducts = [],
                                    e.abrupt("return", l);
                                case 19:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleProductChange",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t, n) {
                        var r, i, a, s;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (r = !0,
                                    !n) {
                                        e.next = 8;
                                        break
                                    }
                                    return e.next = 4,
                                    Object(M.t)({
                                        sessionId: this.info.sessionid,
                                        items: this.getFetchItems(t),
                                        adjust: !0
                                    });
                                case 4:
                                    i = e.sent,
                                    a = Object(o.a)(i, 1),
                                    s = a[0],
                                    r = !s;
                                case 8:
                                    r && this.setAndSave("products", t);
                                case 9:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleProductSelect",
                value: function(e) {
                    var t = this.info.selectedProducts
                      , n = t.findIndex((function(t) {
                        return t.item_id === e.item_id
                    }
                    ));
                    -1 === n ? (t.push(e),
                    this.info.selectedProducts = Object(I.a)(t)) : (t.splice(n, 1),
                    this.info.selectedProducts = Object(I.a)(t))
                }
            }, {
                key: "handleSelectAll",
                value: function(e) {
                    this.info.selectedProducts = e ? Object(I.a)(this.info.products) : []
                }
            }, {
                key: "handleCompleteEdit",
                value: function() {
                    this.onChangeSort(!1),
                    this.info.selectedProducts = []
                }
            }, {
                key: "getErrorMessage",
                value: function(e) {
                    var t, n;
                    return e ? {
                        code: null !== (t = null === e || void 0 === e ? void 0 : e.errCode) && void 0 !== t ? t : null,
                        message: null !== (n = null === e || void 0 === e ? void 0 : e.message) && void 0 !== n ? n : "unkonwn error"
                    } : null
                }
            }, {
                key: "updateAndroid",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (Object(A.r)() === A.d.Android) {
                                        e.next = 2;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 2:
                                    return e.next = 4,
                                    B.g.getAppInfo();
                                case 4:
                                    if (!((t = e.sent).appVersion >= 28700)) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 7:
                                    return e.next = 9,
                                    B.g.popUp({
                                        popUp: {
                                            title: Re.t("live_streaming_host_update_app_notice"),
                                            message: Re.t("live_streaming_host_update_app_text"),
                                            okText: Re.t("live_streaming_host_update_app_continue"),
                                            cancelText: Re.t("live_streaming_host_update_app_update_app"),
                                            autoDismiss: !0
                                        }
                                    });
                                case 9:
                                    if (0 !== (n = e.sent).buttonClicked) {
                                        e.next = 12;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 12:
                                    if (1 !== n.buttonClicked) {
                                        e.next = 17;
                                        break
                                    }
                                    return window.open("https://play.google.com/store/apps/details?id=com.shopee." + t.appCountry.toLowerCase(), "_blank"),
                                    e.abrupt("return", !0);
                                case 17:
                                    return e.abrupt("return", !0);
                                case 18:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleProhibitAddProduct",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (!this.info.products.some((function(e) {
                                        return Boolean(e.is_prohibited)
                                    }
                                    ))) {
                                        e.next = 6;
                                        break
                                    }
                                    return e.next = 4,
                                    B.g.popUp({
                                        popUp: {
                                            message: Re.t("live_streaming_delete_sales_prohibit"),
                                            okText: Re.t("confirm.btn.yes"),
                                            cancelText: Re.t("confirm.btn.no")
                                        }
                                    });
                                case 4:
                                    return t = e.sent,
                                    e.abrupt("return", 1 === t.buttonClicked);
                                case 6:
                                    return e.abrupt("return", !1);
                                case 7:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "checkBeforeSubmit",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e() {
                        var t, n, r, i, a, s, c, u, l;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    Object(C.h)();
                                case 2:
                                    if (t = e.sent,
                                    n = Object(o.a)(t, 2),
                                    r = n[0],
                                    i = n[1],
                                    !r) {
                                        e.next = 16;
                                        break
                                    }
                                    if (r.errCode !== N.f && r.errCode !== N.g) {
                                        e.next = 14;
                                        break
                                    }
                                    return e.next = 10,
                                    q();
                                case 10:
                                    e.sent || B.g.showToast(Re.t("toast.noLiveAuth"), B.w.FAILURE),
                                    e.next = 15;
                                    break;
                                case 14:
                                    r.errCode === N.l ? B.g.showToast(Re.t("toast.noLiveAuth"), B.w.FAILURE) : B.g.showToast(r.message, B.w.FAILURE);
                                case 15:
                                    return e.abrupt("return", !1);
                                case 16:
                                    if (a = i.session,
                                    s = a.status,
                                    c = a.title,
                                    u = a.cover_pic,
                                    l = i.multi_dev_role,
                                    s === N.F.SESSION_UNSTART) {
                                        e.next = 21;
                                        break
                                    }
                                    return this.handleSessionLive(c, l, u),
                                    e.abrupt("return", !1);
                                case 21:
                                    return e.abrupt("return", !0);
                                case 22:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "handleSubmit",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t, n) {
                        var r, i, a, s, c, u, l, d, p, h, b, v, m, g, y, _, w, O, x, S, j, k, P, E, I, T = this;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (r = Object(A.J)(location.search),
                                    i = r && r.from_source ? decodeURIComponent(r.from_source) : "",
                                    !this.coverUploading) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 4:
                                    return e.next = 6,
                                    this.handleProhibitAddProduct();
                                case 6:
                                    if (!e.sent) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 9:
                                    return e.next = 11,
                                    this.updateAndroid();
                                case 11:
                                    if (!e.sent) {
                                        e.next = 14;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 14:
                                    return a = this.info.products.filter((function(e) {
                                        return !e.is_prohibited
                                    }
                                    )),
                                    n("click")("streamer_create_streaming", "next")({
                                        has_product: this.info.products.length > 0,
                                        has_description: !!this.info.description,
                                        streamer_from_source: i,
                                        session_id: this.info.sessionid,
                                        item_counts: a.length,
                                        item: a.map((function(e, t) {
                                            return {
                                                item_rank_number: t + 1,
                                                item_id: e.item_id
                                            }
                                        }
                                        ))
                                    }),
                                    Object(R.m)((function() {
                                        T.uploading = !0,
                                        T.info.products = a
                                    }
                                    )),
                                    s = this.info,
                                    c = s.title,
                                    u = s.description,
                                    l = s.cover,
                                    s.products,
                                    d = s.isTest,
                                    p = {
                                        title: c.trim(),
                                        cover_pic: l,
                                        description: u.trim(),
                                        is_test: d
                                    },
                                    e.next = 21,
                                    this.checkBeforeSubmit();
                                case 21:
                                    if (e.sent) {
                                        e.next = 24;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 24:
                                    return h = l,
                                    e.next = 27,
                                    B.g.getAppInfo();
                                case 27:
                                    return b = e.sent,
                                    this.setAndSave("cover", h),
                                    e.next = 31,
                                    Promise.all([Object(L.u)(Ie(Ie({
                                        session: this.info.sessionid
                                    }, p), {}, {
                                        cover_pic: h,
                                        device_id: b.deviceID
                                    }, this.info.subtitlePermission ? {
                                        subtitle: this.info.subtitle
                                    } : {})), Object(M.t)({
                                        sessionId: this.info.sessionid,
                                        items: this.getFetchItems(a),
                                        adjust: !1
                                    }), t ? 0 === this.info.auction.length ? Object(L.d)(this.info.sessionid) : Object(L.c)(this.info.sessionid, {
                                        isFollowersOnly: !!this.info.auction[0]
                                    }) : Promise.resolve([])]);
                                case 31:
                                    if (v = e.sent,
                                    m = Object(o.a)(v, 3),
                                    g = Object(o.a)(m[0], 1),
                                    y = g[0],
                                    _ = Object(o.a)(m[1], 1),
                                    w = _[0],
                                    O = Object(o.a)(m[2], 1),
                                    x = O[0],
                                    Object(R.m)((function() {
                                        T.uploading = !1
                                    }
                                    )),
                                    !(y || w || x)) {
                                        e.next = 88;
                                        break
                                    }
                                    if (S = {
                                        code: null,
                                        message: "unkonwn error"
                                    },
                                    (j = this.getErrorMessage(y) || this.getErrorMessage(w) || this.getErrorMessage(x) || S).code !== N.k) {
                                        e.next = 48;
                                        break
                                    }
                                    B.g.showToast(Re.t("setup.highlightError"), B.w.FAILURE),
                                    this.callListeners("shouldUpadteSubtitlesCallback"),
                                    e.next = 86;
                                    break;
                                case 48:
                                    if (j.code !== N.j && j.code !== N.i) {
                                        e.next = 58;
                                        break
                                    }
                                    return this.uploading = !0,
                                    e.next = 52,
                                    Object(C.h)();
                                case 52:
                                    k = e.sent,
                                    P = Object(o.a)(k, 2),
                                    E = P[1],
                                    Object(R.m)((function() {
                                        T.uploading = !1;
                                        var e = null === E || void 0 === E ? void 0 : E.session.title;
                                        T.handleSessionLive(e)
                                    }
                                    )),
                                    e.next = 86;
                                    break;
                                case 58:
                                    if (j.code !== N.c && j.code !== N.b) {
                                        e.next = 62;
                                        break
                                    }
                                    B.g.showToast(Re.t("toast.containProhibited"), B.w.FAILURE),
                                    e.next = 86;
                                    break;
                                case 62:
                                    if (j.code !== N.l) {
                                        e.next = 67;
                                        break
                                    }
                                    B.g.showToast(Re.t("toast.noLiveAuth"), B.w.FAILURE),
                                    B.g.popSelf(),
                                    e.next = 86;
                                    break;
                                case 67:
                                    if (j.code !== N.e) {
                                        e.next = 74;
                                        break
                                    }
                                    return e.next = 70,
                                    B.g.popUp({
                                        popUp: {
                                            message: Re.t("live_streaming_add_my_like_failed"),
                                            okText: Re.t("confirm.btn.ok"),
                                            autoDismiss: !1
                                        }
                                    });
                                case 70:
                                    0 === e.sent.buttonClicked && (this.setAndSave("products", []),
                                    this.getProducts()),
                                    e.next = 86;
                                    break;
                                case 74:
                                    if (j.code !== N.h) {
                                        e.next = 85;
                                        break
                                    }
                                    return Object(R.m)((function() {
                                        T.uploading = !0
                                    }
                                    )),
                                    e.next = 78,
                                    this.getProducts(!1);
                                case 78:
                                    return Object(R.m)((function() {
                                        T.uploading = !1
                                    }
                                    )),
                                    e.next = 81,
                                    Object(ke.c)();
                                case 81:
                                    I = e.sent,
                                    B.g.showToast(Re.t("live_streaming_host_product_selection_improvements_web_exceed", {
                                        selectedProductsLimit: I
                                    }), B.w.FAILURE),
                                    e.next = 86;
                                    break;
                                case 85:
                                    j.code === N.d ? B.g.showToast(Re.t("live_streaming_sales_prohibit_toast_2"), B.w.FAILURE) : B.g.showToast(JSON.stringify(j), B.w.FAILURE);
                                case 86:
                                    e.next = 89;
                                    break;
                                case 88:
                                    this.navigatePreviewLivePage({
                                        isSlave: !1
                                    });
                                case 89:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, this)
                    }
                    )));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "setAndSave",
                value: function(e, t) {
                    "undefined" !== typeof t && (this.info[e] = t,
                    this.setStorage(e, "object" === typeof t ? JSON.stringify(t) : t))
                }
            }, {
                key: "setStorage",
                value: function(e, t) {
                    var n = this.getStorageKey(e);
                    n && De.set(n, "object" === typeof t ? JSON.stringify(t) : t)
                }
            }, {
                key: "getStorage",
                value: function(e) {
                    var t = this.getStorageKey(e);
                    return t ? De.get(t) : null
                }
            }, {
                key: "removeStorage",
                value: function(e) {
                    var t = this.getStorageKey(e);
                    t && De.remove(t)
                }
            }, {
                key: "getStorageKey",
                value: function(e) {
                    var t = "";
                    switch (e) {
                    case "sessionid":
                        t = N.x;
                        break;
                    case "cover":
                        t = N.u + "_" + this.info.sessionid;
                        break;
                    case "title":
                        t = N.z + "_" + this.info.sessionid;
                        break;
                    case "description":
                        t = N.v + "_" + this.info.sessionid;
                        break;
                    case "products":
                        t = N.w + "_" + this.info.sessionid;
                        break;
                    case "subtitle":
                        t = N.y + "_" + this.info.sessionid;
                        break;
                    default:
                        t = null
                    }
                    return t
                }
            }]),
            e
        }()).prototype, "info", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        de = D(ue.prototype, "recordInfo", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        pe = D(ue.prototype, "status", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        fe = D(ue.prototype, "loadSession", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        he = D(ue.prototype, "loadProducts", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        be = D(ue.prototype, "canShowRecProducts", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        ve = D(ue.prototype, "uploading", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        me = D(ue.prototype, "coverUploading", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        ge = D(ue.prototype, "maxItems", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        ye = D(ue.prototype, "sortMode", [R.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }),
        D(ue.prototype, "canSubmit", [R.e], Object.getOwnPropertyDescriptor(ue.prototype, "canSubmit"), ue.prototype),
        D(ue.prototype, "exceedLimit", [R.e], Object.getOwnPropertyDescriptor(ue.prototype, "exceedLimit"), ue.prototype),
        D(ue.prototype, "initSession", [R.d], Object.getOwnPropertyDescriptor(ue.prototype, "initSession"), ue.prototype),
        D(ue.prototype, "handleEndSession", [R.d], Object.getOwnPropertyDescriptor(ue.prototype, "handleEndSession"), ue.prototype),
        D(ue.prototype, "getIncentiveTask", [R.d], Object.getOwnPropertyDescriptor(ue.prototype, "getIncentiveTask"), ue.prototype),
        D(ue.prototype, "getAuctionFromCache", [V], Object.getOwnPropertyDescriptor(ue.prototype, "getAuctionFromCache"), ue.prototype),
        D(ue.prototype, "handleAuctionChange", [J], Object.getOwnPropertyDescriptor(ue.prototype, "handleAuctionChange"), ue.prototype),
        D(ue.prototype, "getSubtitle", [R.d], Object.getOwnPropertyDescriptor(ue.prototype, "getSubtitle"), ue.prototype),
        D(ue.prototype, "getProducts", [R.d], Object.getOwnPropertyDescriptor(ue.prototype, "getProducts"), ue.prototype),
        D(ue.prototype, "handleTextChange", [X], Object.getOwnPropertyDescriptor(ue.prototype, "handleTextChange"), ue.prototype),
        D(ue.prototype, "handleSubtitleChange", [W], Object.getOwnPropertyDescriptor(ue.prototype, "handleSubtitleChange"), ue.prototype),
        D(ue.prototype, "handleCoverChange", [$], Object.getOwnPropertyDescriptor(ue.prototype, "handleCoverChange"), ue.prototype),
        D(ue.prototype, "handleDeleteProduct", [Y], Object.getOwnPropertyDescriptor(ue.prototype, "handleDeleteProduct"), ue.prototype),
        D(ue.prototype, "handlePinProduct", [Q], Object.getOwnPropertyDescriptor(ue.prototype, "handlePinProduct"), ue.prototype),
        D(ue.prototype, "handleBatchDelete", [Z], Object.getOwnPropertyDescriptor(ue.prototype, "handleBatchDelete"), ue.prototype),
        D(ue.prototype, "handleBatchPin", [ee], Object.getOwnPropertyDescriptor(ue.prototype, "handleBatchPin"), ue.prototype),
        D(ue.prototype, "handleProductChange", [te], Object.getOwnPropertyDescriptor(ue.prototype, "handleProductChange"), ue.prototype),
        D(ue.prototype, "handleProductSelect", [ne], Object.getOwnPropertyDescriptor(ue.prototype, "handleProductSelect"), ue.prototype),
        D(ue.prototype, "handleSelectAll", [re], Object.getOwnPropertyDescriptor(ue.prototype, "handleSelectAll"), ue.prototype),
        _e = D(ue.prototype, "onChangeSort", [ie], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                var e = this;
                return function(t) {
                    Object(R.m)((function() {
                        e.sortMode = t
                    }
                    ))
                }
            }
        }),
        D(ue.prototype, "handleCompleteEdit", [oe], Object.getOwnPropertyDescriptor(ue.prototype, "handleCompleteEdit"), ue.prototype),
        D(ue.prototype, "updateAndroid", [ae], Object.getOwnPropertyDescriptor(ue.prototype, "updateAndroid"), ue.prototype),
        D(ue.prototype, "handleProhibitAddProduct", [se], Object.getOwnPropertyDescriptor(ue.prototype, "handleProhibitAddProduct"), ue.prototype),
        D(ue.prototype, "handleSubmit", [ce], Object.getOwnPropertyDescriptor(ue.prototype, "handleSubmit"), ue.prototype),
        D(ue.prototype, "setAndSave", [R.d], Object.getOwnPropertyDescriptor(ue.prototype, "setAndSave"), ue.prototype),
        ue)
          , Le = null;
        function Me() {
            return null === Le && (Le = {
                setupStore: Ce
            }),
            Le
        }
        var Ne = n("RgX2")
          , Fe = n("Gtv0")
          , Be = n("7QBe")
          , Ue = n("yjT0")
          , He = b.a.createElement;
        function ze(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function Ge(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ze(Object(n), !0).forEach((function(t) {
                    Object(i.a)(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ze(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function qe(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = Object(d.a)(e);
                if (t) {
                    var i = Object(d.a)(this).constructor;
                    n = Reflect.construct(r, arguments, i)
                } else
                    n = r.apply(this, arguments);
                return Object(l.a)(this, n)
            }
        }
        A.D && (Object(Ue.b)(),
        A.z || Object(Fe.b)());
        var Ke = Promise.all([n.e(50), n.e(95)]).then(n.bind(null, "L852"))
          , Ve = function(e) {
            Object(u.a)(n, e);
            var t = qe(n);
            function n(e) {
                var r;
                Object(s.a)(this, n),
                (r = t.call(this, e)).i18n = void 0,
                r.mobxStore = void 0;
                return r.i18n = w.a.init(),
                r.mobxStore = Me(),
                Be.a.then(function() {
                    var e = Object(a.a)(f.a.mark((function e(t) {
                        var n, r, i, a, s;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (n = Object(o.a)(t, 2),
                                    r = n[0],
                                    i = n[1],
                                    r) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 3:
                                    return e.next = 5,
                                    Ke;
                                case 5:
                                    a = e.sent,
                                    s = a.adblock,
                                    (0,
                                    a.initXHRProxy)([Object(Ne.b)(), s(), i]);
                                case 9:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()),
                r
            }
            return Object(c.a)(n, [{
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.Component
                      , n = e.pageProps;
                    return He(E.a, this.mobxStore, He(_.a, {
                        i18n: this.i18n
                    }, He(P, null), He(y.a, null, He("script", {
                        dangerouslySetInnerHTML: {
                            __html: '!function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);'
                        }
                    })), He(t, n), He(j, null)))
                }
            }], [{
                key: "getInitialProps",
                value: function() {
                    var e = Object(a.a)(f.a.mark((function e(t) {
                        var n, r;
                        return f.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return n = Me(),
                                    t.ctx.mobxStore = n,
                                    e.next = 4,
                                    m.a.getInitialProps(t);
                                case 4:
                                    return r = e.sent,
                                    e.abrupt("return", Ge(Ge({}, r), {}, {
                                        initialMobxState: n
                                    }));
                                case 6:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()
            }]),
            n
        }(m.a);
        t.default = Ve
    },
    diK7: function(e, t, n) {
        (function(t, r) {
            var i;
            !function() {
                "use strict";
                var o = "object" === typeof window
                  , a = o ? window : {};
                a.JS_MD5_NO_WINDOW && (o = !1);
                var s = !o && "object" === typeof self
                  , c = !a.JS_MD5_NO_NODE_JS && "object" === typeof t && t.versions && t.versions.node;
                c ? a = r : s && (a = self);
                var u, l = !a.JS_MD5_NO_COMMON_JS && "object" === typeof e && e.exports, d = n("VRIy"), p = !a.JS_MD5_NO_ARRAY_BUFFER && "undefined" !== typeof ArrayBuffer, f = "0123456789abcdef".split(""), h = [128, 32768, 8388608, -2147483648], b = [0, 8, 16, 24], v = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"], m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), g = [];
                if (p) {
                    var y = new ArrayBuffer(68);
                    u = new Uint8Array(y),
                    g = new Uint32Array(y)
                }
                var _ = Array.isArray;
                !a.JS_MD5_NO_NODE_JS && _ || (_ = function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                );
                var w = ArrayBuffer.isView;
                !p || !a.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && w || (w = function(e) {
                    return "object" === typeof e && e.buffer && e.buffer.constructor === ArrayBuffer
                }
                );
                var O = function(e) {
                    var t = typeof e;
                    if ("string" === t)
                        return [e, !0];
                    if ("object" !== t || null === e)
                        throw new Error("input is invalid type");
                    if (p && e.constructor === ArrayBuffer)
                        return [new Uint8Array(e), !1];
                    if (!_(e) && !w(e))
                        throw new Error("input is invalid type");
                    return [e, !1]
                }
                  , x = function(e) {
                    return function(t) {
                        return new k(!0).update(t)[e]()
                    }
                }
                  , S = function(e) {
                    var t, r = n(19), i = n(20).Buffer;
                    t = i.from && !a.JS_MD5_NO_BUFFER_FROM ? i.from : function(e) {
                        return new i(e)
                    }
                    ;
                    return function(n) {
                        if ("string" === typeof n)
                            return r.createHash("md5").update(n, "utf8").digest("hex");
                        if (null === n || void 0 === n)
                            throw new Error("input is invalid type");
                        return n.constructor === ArrayBuffer && (n = new Uint8Array(n)),
                        _(n) || w(n) || n.constructor === i ? r.createHash("md5").update(t(n)).digest("hex") : e(n)
                    }
                }
                  , j = function(e) {
                    return function(t, n) {
                        return new P(t,!0).update(n)[e]()
                    }
                };
                function k(e) {
                    if (e)
                        g[0] = g[16] = g[1] = g[2] = g[3] = g[4] = g[5] = g[6] = g[7] = g[8] = g[9] = g[10] = g[11] = g[12] = g[13] = g[14] = g[15] = 0,
                        this.blocks = g,
                        this.buffer8 = u;
                    else if (p) {
                        var t = new ArrayBuffer(68);
                        this.buffer8 = new Uint8Array(t),
                        this.blocks = new Uint32Array(t)
                    } else
                        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0,
                    this.finalized = this.hashed = !1,
                    this.first = !0
                }
                function P(e, t) {
                    var n, r = O(e);
                    if (e = r[0],
                    r[1]) {
                        var i, o = [], a = e.length, s = 0;
                        for (n = 0; n < a; ++n)
                            (i = e.charCodeAt(n)) < 128 ? o[s++] = i : i < 2048 ? (o[s++] = 192 | i >>> 6,
                            o[s++] = 128 | 63 & i) : i < 55296 || i >= 57344 ? (o[s++] = 224 | i >>> 12,
                            o[s++] = 128 | i >>> 6 & 63,
                            o[s++] = 128 | 63 & i) : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++n)),
                            o[s++] = 240 | i >>> 18,
                            o[s++] = 128 | i >>> 12 & 63,
                            o[s++] = 128 | i >>> 6 & 63,
                            o[s++] = 128 | 63 & i);
                        e = o
                    }
                    e.length > 64 && (e = new k(!0).update(e).array());
                    var c = []
                      , u = [];
                    for (n = 0; n < 64; ++n) {
                        var l = e[n] || 0;
                        c[n] = 92 ^ l,
                        u[n] = 54 ^ l
                    }
                    k.call(this, t),
                    this.update(u),
                    this.oKeyPad = c,
                    this.inner = !0,
                    this.sharedMemory = t
                }
                k.prototype.update = function(e) {
                    if (this.finalized)
                        throw new Error("finalize already called");
                    var t = O(e);
                    e = t[0];
                    for (var n, r, i = t[1], o = 0, a = e.length, s = this.blocks, c = this.buffer8; o < a; ) {
                        if (this.hashed && (this.hashed = !1,
                        s[0] = s[16],
                        s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0),
                        i)
                            if (p)
                                for (r = this.start; o < a && r < 64; ++o)
                                    (n = e.charCodeAt(o)) < 128 ? c[r++] = n : n < 2048 ? (c[r++] = 192 | n >>> 6,
                                    c[r++] = 128 | 63 & n) : n < 55296 || n >= 57344 ? (c[r++] = 224 | n >>> 12,
                                    c[r++] = 128 | n >>> 6 & 63,
                                    c[r++] = 128 | 63 & n) : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++o)),
                                    c[r++] = 240 | n >>> 18,
                                    c[r++] = 128 | n >>> 12 & 63,
                                    c[r++] = 128 | n >>> 6 & 63,
                                    c[r++] = 128 | 63 & n);
                            else
                                for (r = this.start; o < a && r < 64; ++o)
                                    (n = e.charCodeAt(o)) < 128 ? s[r >>> 2] |= n << b[3 & r++] : n < 2048 ? (s[r >>> 2] |= (192 | n >>> 6) << b[3 & r++],
                                    s[r >>> 2] |= (128 | 63 & n) << b[3 & r++]) : n < 55296 || n >= 57344 ? (s[r >>> 2] |= (224 | n >>> 12) << b[3 & r++],
                                    s[r >>> 2] |= (128 | n >>> 6 & 63) << b[3 & r++],
                                    s[r >>> 2] |= (128 | 63 & n) << b[3 & r++]) : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++o)),
                                    s[r >>> 2] |= (240 | n >>> 18) << b[3 & r++],
                                    s[r >>> 2] |= (128 | n >>> 12 & 63) << b[3 & r++],
                                    s[r >>> 2] |= (128 | n >>> 6 & 63) << b[3 & r++],
                                    s[r >>> 2] |= (128 | 63 & n) << b[3 & r++]);
                        else if (p)
                            for (r = this.start; o < a && r < 64; ++o)
                                c[r++] = e[o];
                        else
                            for (r = this.start; o < a && r < 64; ++o)
                                s[r >>> 2] |= e[o] << b[3 & r++];
                        this.lastByteIndex = r,
                        this.bytes += r - this.start,
                        r >= 64 ? (this.start = r - 64,
                        this.hash(),
                        this.hashed = !0) : this.start = r
                    }
                    return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0,
                    this.bytes = this.bytes % 4294967296),
                    this
                }
                ,
                k.prototype.finalize = function() {
                    if (!this.finalized) {
                        this.finalized = !0;
                        var e = this.blocks
                          , t = this.lastByteIndex;
                        e[t >>> 2] |= h[3 & t],
                        t >= 56 && (this.hashed || this.hash(),
                        e[0] = e[16],
                        e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
                        e[14] = this.bytes << 3,
                        e[15] = this.hBytes << 3 | this.bytes >>> 29,
                        this.hash()
                    }
                }
                ,
                k.prototype.hash = function() {
                    var e, t, n, r, i, o, a = this.blocks;
                    this.first ? t = ((t = ((e = ((e = a[0] - 680876937) << 7 | e >>> 25) - 271733879 << 0) ^ (n = ((n = (-271733879 ^ (r = ((r = (-1732584194 ^ 2004318071 & e) + a[1] - 117830708) << 12 | r >>> 20) + e << 0) & (-271733879 ^ e)) + a[2] - 1126478375) << 17 | n >>> 15) + r << 0) & (r ^ e)) + a[3] - 1316259209) << 22 | t >>> 10) + n << 0 : (e = this.h0,
                    t = this.h1,
                    n = this.h2,
                    t = ((t += ((e = ((e += ((r = this.h3) ^ t & (n ^ r)) + a[0] - 680876936) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + a[1] - 389564586) << 12 | r >>> 20) + e << 0) & (e ^ t)) + a[2] + 606105819) << 17 | n >>> 15) + r << 0) & (r ^ e)) + a[3] - 1044525330) << 22 | t >>> 10) + n << 0),
                    t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + a[4] - 176418897) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + a[5] + 1200080426) << 12 | r >>> 20) + e << 0) & (e ^ t)) + a[6] - 1473231341) << 17 | n >>> 15) + r << 0) & (r ^ e)) + a[7] - 45705983) << 22 | t >>> 10) + n << 0,
                    t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + a[8] + 1770035416) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + a[9] - 1958414417) << 12 | r >>> 20) + e << 0) & (e ^ t)) + a[10] - 42063) << 17 | n >>> 15) + r << 0) & (r ^ e)) + a[11] - 1990404162) << 22 | t >>> 10) + n << 0,
                    t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + a[12] + 1804603682) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + a[13] - 40341101) << 12 | r >>> 20) + e << 0) & (e ^ t)) + a[14] - 1502002290) << 17 | n >>> 15) + r << 0) & (r ^ e)) + a[15] + 1236535329) << 22 | t >>> 10) + n << 0,
                    t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + a[1] - 165796510) << 5 | e >>> 27) + t << 0) ^ t)) + a[6] - 1069501632) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + a[11] + 643717713) << 14 | n >>> 18) + r << 0) ^ r)) + a[0] - 373897302) << 20 | t >>> 12) + n << 0,
                    t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + a[5] - 701558691) << 5 | e >>> 27) + t << 0) ^ t)) + a[10] + 38016083) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + a[15] - 660478335) << 14 | n >>> 18) + r << 0) ^ r)) + a[4] - 405537848) << 20 | t >>> 12) + n << 0,
                    t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + a[9] + 568446438) << 5 | e >>> 27) + t << 0) ^ t)) + a[14] - 1019803690) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + a[3] - 187363961) << 14 | n >>> 18) + r << 0) ^ r)) + a[8] + 1163531501) << 20 | t >>> 12) + n << 0,
                    t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + a[13] - 1444681467) << 5 | e >>> 27) + t << 0) ^ t)) + a[2] - 51403784) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + a[7] + 1735328473) << 14 | n >>> 18) + r << 0) ^ r)) + a[12] - 1926607734) << 20 | t >>> 12) + n << 0,
                    t = ((t += ((o = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + a[5] - 378558) << 4 | e >>> 28) + t << 0)) + a[8] - 2022574463) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (o ^ t) + a[11] + 1839030562) << 16 | n >>> 16) + r << 0)) + a[14] - 35309556) << 23 | t >>> 9) + n << 0,
                    t = ((t += ((o = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + a[1] - 1530992060) << 4 | e >>> 28) + t << 0)) + a[4] + 1272893353) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (o ^ t) + a[7] - 155497632) << 16 | n >>> 16) + r << 0)) + a[10] - 1094730640) << 23 | t >>> 9) + n << 0,
                    t = ((t += ((o = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + a[13] + 681279174) << 4 | e >>> 28) + t << 0)) + a[0] - 358537222) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (o ^ t) + a[3] - 722521979) << 16 | n >>> 16) + r << 0)) + a[6] + 76029189) << 23 | t >>> 9) + n << 0,
                    t = ((t += ((o = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + a[9] - 640364487) << 4 | e >>> 28) + t << 0)) + a[12] - 421815835) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (o ^ t) + a[15] + 530742520) << 16 | n >>> 16) + r << 0)) + a[2] - 995338651) << 23 | t >>> 9) + n << 0,
                    t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + a[0] - 198630844) << 6 | e >>> 26) + t << 0) | ~n)) + a[7] + 1126891415) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + a[14] - 1416354905) << 15 | n >>> 17) + r << 0) | ~e)) + a[5] - 57434055) << 21 | t >>> 11) + n << 0,
                    t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + a[12] + 1700485571) << 6 | e >>> 26) + t << 0) | ~n)) + a[3] - 1894986606) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + a[10] - 1051523) << 15 | n >>> 17) + r << 0) | ~e)) + a[1] - 2054922799) << 21 | t >>> 11) + n << 0,
                    t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + a[8] + 1873313359) << 6 | e >>> 26) + t << 0) | ~n)) + a[15] - 30611744) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + a[6] - 1560198380) << 15 | n >>> 17) + r << 0) | ~e)) + a[13] + 1309151649) << 21 | t >>> 11) + n << 0,
                    t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + a[4] - 145523070) << 6 | e >>> 26) + t << 0) | ~n)) + a[11] - 1120210379) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + a[2] + 718787259) << 15 | n >>> 17) + r << 0) | ~e)) + a[9] - 343485551) << 21 | t >>> 11) + n << 0,
                    this.first ? (this.h0 = e + 1732584193 << 0,
                    this.h1 = t - 271733879 << 0,
                    this.h2 = n - 1732584194 << 0,
                    this.h3 = r + 271733878 << 0,
                    this.first = !1) : (this.h0 = this.h0 + e << 0,
                    this.h1 = this.h1 + t << 0,
                    this.h2 = this.h2 + n << 0,
                    this.h3 = this.h3 + r << 0)
                }
                ,
                k.prototype.hex = function() {
                    this.finalize();
                    var e = this.h0
                      , t = this.h1
                      , n = this.h2
                      , r = this.h3;
                    return f[e >>> 4 & 15] + f[15 & e] + f[e >>> 12 & 15] + f[e >>> 8 & 15] + f[e >>> 20 & 15] + f[e >>> 16 & 15] + f[e >>> 28 & 15] + f[e >>> 24 & 15] + f[t >>> 4 & 15] + f[15 & t] + f[t >>> 12 & 15] + f[t >>> 8 & 15] + f[t >>> 20 & 15] + f[t >>> 16 & 15] + f[t >>> 28 & 15] + f[t >>> 24 & 15] + f[n >>> 4 & 15] + f[15 & n] + f[n >>> 12 & 15] + f[n >>> 8 & 15] + f[n >>> 20 & 15] + f[n >>> 16 & 15] + f[n >>> 28 & 15] + f[n >>> 24 & 15] + f[r >>> 4 & 15] + f[15 & r] + f[r >>> 12 & 15] + f[r >>> 8 & 15] + f[r >>> 20 & 15] + f[r >>> 16 & 15] + f[r >>> 28 & 15] + f[r >>> 24 & 15]
                }
                ,
                k.prototype.toString = k.prototype.hex,
                k.prototype.digest = function() {
                    this.finalize();
                    var e = this.h0
                      , t = this.h1
                      , n = this.h2
                      , r = this.h3;
                    return [255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 & 255, 255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24 & 255, 255 & n, n >>> 8 & 255, n >>> 16 & 255, n >>> 24 & 255, 255 & r, r >>> 8 & 255, r >>> 16 & 255, r >>> 24 & 255]
                }
                ,
                k.prototype.array = k.prototype.digest,
                k.prototype.arrayBuffer = function() {
                    this.finalize();
                    var e = new ArrayBuffer(16)
                      , t = new Uint32Array(e);
                    return t[0] = this.h0,
                    t[1] = this.h1,
                    t[2] = this.h2,
                    t[3] = this.h3,
                    e
                }
                ,
                k.prototype.buffer = k.prototype.arrayBuffer,
                k.prototype.base64 = function() {
                    for (var e, t, n, r = "", i = this.array(), o = 0; o < 15; )
                        e = i[o++],
                        t = i[o++],
                        n = i[o++],
                        r += m[e >>> 2] + m[63 & (e << 4 | t >>> 4)] + m[63 & (t << 2 | n >>> 6)] + m[63 & n];
                    return e = i[o],
                    r += m[e >>> 2] + m[e << 4 & 63] + "=="
                }
                ,
                P.prototype = new k,
                P.prototype.finalize = function() {
                    if (k.prototype.finalize.call(this),
                    this.inner) {
                        this.inner = !1;
                        var e = this.array();
                        k.call(this, this.sharedMemory),
                        this.update(this.oKeyPad),
                        this.update(e),
                        k.prototype.finalize.call(this)
                    }
                }
                ;
                var A = function() {
                    var e = x("hex");
                    c && (e = S(e)),
                    e.create = function() {
                        return new k
                    }
                    ,
                    e.update = function(t) {
                        return e.create().update(t)
                    }
                    ;
                    for (var t = 0; t < v.length; ++t) {
                        var n = v[t];
                        e[n] = x(n)
                    }
                    return e
                }();
                A.md5 = A,
                A.md5.hmac = function() {
                    var e = j("hex");
                    e.create = function(e) {
                        return new P(e)
                    }
                    ,
                    e.update = function(t, n) {
                        return e.create(t).update(n)
                    }
                    ;
                    for (var t = 0; t < v.length; ++t) {
                        var n = v[t];
                        e[n] = j(n)
                    }
                    return e
                }(),
                l ? e.exports = A : (a.md5 = A,
                d && (void 0 === (i = function() {
                    return A
                }
                .call(A, n, A, e)) || (e.exports = i)))
            }()
        }
        ).call(this, n("8oxB"), n("3r9c"))
    },
    foSv: function(e, t, n) {
        "use strict";
        function r(e) {
            return (r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        n.d(t, "a", (function() {
            return r
        }
        ))
    },
    gKH4: function(e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ApmsStorage = t.supportLocalstorage = void 0,
        t.supportLocalstorage = "function" === typeof (null === (r = window.localStorage) || void 0 === r ? void 0 : r.getItem) && "function" === typeof window.localStorage.setItem;
        t.ApmsStorage = class {
            constructor(e) {
                this.prefix = "mdap",
                this.prefix = e.name
            }
            getStorageKey(e) {
                if (!t.supportLocalstorage)
                    return;
                let n = e;
                return new RegExp("^" + this.prefix).test(e) || (n = `${this.prefix}_${e}`),
                n
            }
            setObject(e, n) {
                if (t.supportLocalstorage)
                    try {
                        const t = "string" === typeof n ? n : JSON.stringify(n)
                          , r = this.getStorageKey(e);
                        r && localStorage.setItem(r, t)
                    } catch (r) {}
            }
            getObject(e) {
                if (t.supportLocalstorage)
                    try {
                        const t = this.getStorageKey(e)
                          , n = localStorage.getItem(t);
                        if (!n)
                            return;
                        return JSON.parse(n)
                    } catch (n) {}
            }
            getKeys() {
                if (!t.supportLocalstorage)
                    return;
                const e = []
                  , n = localStorage.length
                  , r = new RegExp("^" + this.prefix);
                for (let t = 0; t < n; t++) {
                    const n = localStorage.key(t);
                    n && r.test(n) && e.push(n)
                }
                return e
            }
            removeItem(e) {
                if (!t.supportLocalstorage)
                    return;
                const n = this.getStorageKey(e);
                localStorage.removeItem(n)
            }
            clear() {
                var e;
                if (!t.supportLocalstorage)
                    return;
                const n = null !== (e = this.getKeys()) && void 0 !== e ? e : [];
                for (const t of n)
                    localStorage.removeItem(t)
            }
        }
    },
    gkOF: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getByteLength = void 0,
        t.getByteLength = function(e) {
            let t = e.length;
            for (let n = t - 1; n >= 0; n--) {
                const r = e.charCodeAt(n);
                r > 127 && r <= 2047 ? t++ : r > 2047 && r < 65535 && (t += 2),
                r >= 56320 && r <= 57343 && n--
            }
            return t
        }
    },
    h4VS: function(e, t, n) {
        "use strict";
        function r(e, t) {
            return t || (t = e.slice(0)),
            Object.freeze(Object.defineProperties(e, {
                raw: {
                    value: Object.freeze(t)
                }
            }))
        }
        n.d(t, "a", (function() {
            return r
        }
        ))
    },
    hkHQ: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.API_PREFIX_NON_ERROR = t.API_PREFIX = t.host = void 0,
        t.host = {
            live: "https://patronus.idata.shopeemobile.com",
            liveish: "https://patronus.idata.shopeemobile.com",
            test: "https://patronus.test.idata.shopeemobile.com",
            staging: "https://patronus.test.idata.shopeemobile.com",
            uat: "https://patronus.test.idata.shopeemobile.com",
            mock: "https://api.seller.shopee.io/mock/1900"
        },
        t.API_PREFIX = "/multi-app/web-receiver/api/v1/receiver/web",
        t.API_PREFIX_NON_ERROR = "/multi-app/web-custom-receiver/api/v1/receiver/web"
    },
    jB2q: function(e, t, n) {
        var r;
        !function(i, o) {
            "use strict";
            var a = "model"
              , s = "name"
              , c = "type"
              , u = "vendor"
              , l = "version"
              , d = "mobile"
              , p = "tablet"
              , f = "smarttv"
              , h = function(e) {
                for (var t = {}, n = 0; n < e.length; n++)
                    t[e[n].toUpperCase()] = e[n];
                return t
            }
              , b = function(e, t) {
                return "string" === typeof e && -1 !== v(t).indexOf(v(e))
            }
              , v = function(e) {
                return e.toLowerCase()
            }
              , m = function(e, t) {
                if ("string" === typeof e)
                    return e = e.replace(/^\s\s*/, ""),
                    "undefined" === typeof t ? e : e.substring(0, 500)
            }
              , g = function(e, t) {
                for (var n, r, i, o, a, s, c = 0; c < t.length && !a; ) {
                    var u = t[c]
                      , l = t[c + 1];
                    for (n = r = 0; n < u.length && !a && u[n]; )
                        if (a = u[n++].exec(e))
                            for (i = 0; i < l.length; i++)
                                s = a[++r],
                                "object" === typeof (o = l[i]) && o.length > 0 ? 2 === o.length ? "function" == typeof o[1] ? this[o[0]] = o[1].call(this, s) : this[o[0]] = o[1] : 3 === o.length ? "function" !== typeof o[1] || o[1].exec && o[1].test ? this[o[0]] = s ? s.replace(o[1], o[2]) : undefined : this[o[0]] = s ? o[1].call(this, s, o[2]) : undefined : 4 === o.length && (this[o[0]] = s ? o[3].call(this, s.replace(o[1], o[2])) : undefined) : this[o] = s || undefined;
                    c += 2
                }
            }
              , y = function(e, t) {
                for (var n in t)
                    if ("object" === typeof t[n] && t[n].length > 0) {
                        for (var r = 0; r < t[n].length; r++)
                            if (b(t[n][r], e))
                                return "?" === n ? undefined : n
                    } else if (b(t[n], e))
                        return "?" === n ? undefined : n;
                return t.hasOwnProperty("*") ? t["*"] : e
            }
              , _ = {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM"
            }
              , w = {
                browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [l, [s, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [l, [s, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [s, l], [/opios[\/ ]+([\w\.]+)/i], [l, [s, "Opera Mini"]], [/\bop(?:rg)?x\/([\w\.]+)/i], [l, [s, "Opera GX"]], [/\bopr\/([\w\.]+)/i], [l, [s, "Opera"]], [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i], [l, [s, "Baidu"]], [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i], [l, [s, "Maxthon"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i, /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i, /(heytap|ovi|115)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [s, l], [/quark(?:pc)?\/([-\w\.]+)/i], [l, [s, "Quark"]], [/\bddg\/([\w\.]+)/i], [l, [s, "DuckDuckGo"]], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [l, [s, "UCBrowser"]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i], [l, [s, "WeChat"]], [/konqueror\/([\w\.]+)/i], [l, [s, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [l, [s, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [l, [s, "Yandex"]], [/slbrowser\/([\w\.]+)/i], [l, [s, "Smart Lenovo Browser"]], [/(avast|avg)\/([\w\.]+)/i], [[s, /(.+)/, "$1 Secure Browser"], l], [/\bfocus\/([\w\.]+)/i], [l, [s, "Firefox Focus"]], [/\bopt\/([\w\.]+)/i], [l, [s, "Opera Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [l, [s, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [l, [s, "Dolphin"]], [/coast\/([\w\.]+)/i], [l, [s, "Opera Coast"]], [/miuibrowser\/([\w\.]+)/i], [l, [s, "MIUI Browser"]], [/fxios\/([\w\.-]+)/i], [l, [s, "Firefox"]], [/\bqihoobrowser\/?([\w\.]*)/i], [l, [s, "360"]], [/\b(qq)\/([\w\.]+)/i], [[s, /(.+)/, "$1Browser"], l], [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i], [[s, /(.+)/, "$1 Browser"], l], [/samsungbrowser\/([\w\.]+)/i], [l, [s, "Samsung Internet"]], [/metasr[\/ ]?([\d\.]+)/i], [l, [s, "Sogou Explorer"]], [/(sogou)mo\w+\/([\d\.]+)/i], [[s, "Sogou Mobile"], l], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i], [s, l], [/(lbbrowser|rekonq)/i, /\[(linkedin)app\]/i], [s], [/ome\/([\w\.]+) \w* ?(iron) saf/i, /ome\/([\w\.]+).+qihu (360)[es]e/i], [l, s], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[s, "Facebook"], l], [/(Klarna)\/([\w\.]+)/i, /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(alipay)client\/([\w\.]+)/i, /(twitter)(?:and| f.+e\/([\w\.]+))/i, /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i], [s, l], [/\bgsa\/([\w\.]+) .*safari\//i], [l, [s, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [l, [s, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [l, [s, "Chrome Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[s, "Chrome WebView"], l], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [l, [s, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [s, l], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [l, [s, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [l, s], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [s, [l, y, {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }]], [/(webkit|khtml)\/([\w\.]+)/i], [s, l], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[s, "Netscape"], l], [/(wolvic|librewolf)\/([\w\.]+)/i], [s, l], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [l, [s, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], [s, [l, /_/g, "."]], [/(cobalt)\/([\w\.]+)/i], [s, [l, /master.|lts./, ""]]],
                cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [["architecture", "amd64"]], [/(ia32(?=;))/i], [["architecture", v]], [/((?:i[346]|x)86)[;\)]/i], [["architecture", "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [["architecture", "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [["architecture", "armhf"]], [/windows (ce|mobile); ppc;/i], [["architecture", "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [["architecture", /ower/, "", v]], [/(sun4\w)[;\)]/i], [["architecture", "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [["architecture", v]]],
                device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [a, [u, "Samsung"], [c, p]], [/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]((?!sm-[lr])[-\w]+)/i, /sec-(sgh\w+)/i], [a, [u, "Samsung"], [c, d]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [a, [u, "Apple"], [c, d]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [a, [u, "Apple"], [c, p]], [/(macintosh);/i], [a, [u, "Apple"]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [a, [u, "Sharp"], [c, d]], [/(?:honor)([-\w ]+)[;\)]/i], [a, [u, "Honor"], [c, d]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [a, [u, "Huawei"], [c, p]], [/(?:huawei)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [a, [u, "Huawei"], [c, d]], [/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i], [[a, /_/g, " "], [u, "Xiaomi"], [c, d]], [/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i, /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[a, /_/g, " "], [u, "Xiaomi"], [c, p]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [a, [u, "OPPO"], [c, d]], [/\b(opd2\d{3}a?) bui/i], [a, [u, "OPPO"], [c, p]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [a, [u, "Vivo"], [c, d]], [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i], [a, [u, "Realme"], [c, d]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [a, [u, "Motorola"], [c, d]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [a, [u, "Motorola"], [c, p]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [a, [u, "LG"], [c, p]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [a, [u, "LG"], [c, d]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [a, [u, "Lenovo"], [c, p]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[a, /_/g, " "], [u, "Nokia"], [c, d]], [/(pixel c)\b/i], [a, [u, "Google"], [c, p]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [a, [u, "Google"], [c, d]], [/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [a, [u, "Sony"], [c, d]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[a, "Xperia Tablet"], [u, "Sony"], [c, p]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [a, [u, "OnePlus"], [c, d]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [a, [u, "Amazon"], [c, p]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[a, /(.+)/g, "Fire Phone $1"], [u, "Amazon"], [c, d]], [/(playbook);[-\w\),; ]+(rim)/i], [a, u, [c, p]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [a, [u, "BlackBerry"], [c, d]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [a, [u, "ASUS"], [c, p]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [a, [u, "ASUS"], [c, d]], [/(nexus 9)/i], [a, [u, "HTC"], [c, p]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [u, [a, /_/g, " "], [c, d]], [/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i], [a, [u, "TCL"], [c, p]], [/(itel) ((\w+))/i], [[u, v], a, [c, y, {
                    tablet: ["p10001l", "w7001"],
                    "*": "mobile"
                }]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [a, [u, "Acer"], [c, p]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [a, [u, "Meizu"], [c, d]], [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i], [a, [u, "Ulefone"], [c, d]], [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i], [a, [u, "Energizer"], [c, d]], [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i], [a, [u, "Cat"], [c, d]], [/((?:new )?andromax[\w- ]+)(?: bui|\))/i], [a, [u, "Smartfren"], [c, d]], [/droid.+; (a(?:015|06[35]|142p?))/i], [a, [u, "Nothing"], [c, d]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i, /; (imo) ((?!tab)[\w ]+?)(?: bui|\))/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [u, a, [c, d]], [/(imo) (tab \w+)/i, /(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [u, a, [c, p]], [/(surface duo)/i], [a, [u, "Microsoft"], [c, p]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [a, [u, "Fairphone"], [c, d]], [/(u304aa)/i], [a, [u, "AT&T"], [c, d]], [/\bsie-(\w*)/i], [a, [u, "Siemens"], [c, d]], [/\b(rct\w+) b/i], [a, [u, "RCA"], [c, p]], [/\b(venue[\d ]{2,7}) b/i], [a, [u, "Dell"], [c, p]], [/\b(q(?:mv|ta)\w+) b/i], [a, [u, "Verizon"], [c, p]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [a, [u, "Barnes & Noble"], [c, p]], [/\b(tm\d{3}\w+) b/i], [a, [u, "NuVision"], [c, p]], [/\b(k88) b/i], [a, [u, "ZTE"], [c, p]], [/\b(nx\d{3}j) b/i], [a, [u, "ZTE"], [c, d]], [/\b(gen\d{3}) b.+49h/i], [a, [u, "Swiss"], [c, d]], [/\b(zur\d{3}) b/i], [a, [u, "Swiss"], [c, p]], [/\b((zeki)?tb.*\b) b/i], [a, [u, "Zeki"], [c, p]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[u, "Dragon Touch"], a, [c, p]], [/\b(ns-?\w{0,9}) b/i], [a, [u, "Insignia"], [c, p]], [/\b((nxa|next)-?\w{0,9}) b/i], [a, [u, "NextBook"], [c, p]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[u, "Voice"], a, [c, d]], [/\b(lvtel\-)?(v1[12]) b/i], [[u, "LvTel"], a, [c, d]], [/\b(ph-1) /i], [a, [u, "Essential"], [c, d]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [a, [u, "Envizen"], [c, p]], [/\b(trio[-\w\. ]+) b/i], [a, [u, "MachSpeed"], [c, p]], [/\btu_(1491) b/i], [a, [u, "Rotor"], [c, p]], [/(shield[\w ]+) b/i], [a, [u, "Nvidia"], [c, p]], [/(sprint) (\w+)/i], [u, a, [c, d]], [/(kin\.[onetw]{3})/i], [[a, /\./g, " "], [u, "Microsoft"], [c, d]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [a, [u, "Zebra"], [c, p]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [a, [u, "Zebra"], [c, d]], [/smart-tv.+(samsung)/i], [u, [c, f]], [/hbbtv.+maple;(\d+)/i], [[a, /^/, "SmartTV"], [u, "Samsung"], [c, f]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[u, "LG"], [c, f]], [/(apple) ?tv/i], [u, [a, "Apple TV"], [c, f]], [/crkey/i], [[a, "Chromecast"], [u, "Google"], [c, f]], [/droid.+aft(\w+)( bui|\))/i], [a, [u, "Amazon"], [c, f]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [a, [u, "Sharp"], [c, f]], [/(bravia[\w ]+)( bui|\))/i], [a, [u, "Sony"], [c, f]], [/(mitv-\w{5}) bui/i], [a, [u, "Xiaomi"], [c, f]], [/Hbbtv.*(technisat) (.*);/i], [u, a, [c, f]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[u, m], [a, m], [c, f]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[c, f]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [u, a, [c, "console"]], [/droid.+; (shield) bui/i], [a, [u, "Nvidia"], [c, "console"]], [/(playstation [345portablevi]+)/i], [a, [u, "Sony"], [c, "console"]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [a, [u, "Microsoft"], [c, "console"]], [/\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i], [a, [u, "Samsung"], [c, "wearable"]], [/((pebble))app/i], [u, a, [c, "wearable"]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [a, [u, "Apple"], [c, "wearable"]], [/droid.+; (glass) \d/i], [a, [u, "Google"], [c, "wearable"]], [/droid.+; (wt63?0{2,3})\)/i], [a, [u, "Zebra"], [c, "wearable"]], [/droid.+; (glass) \d/i], [a, [u, "Google"], [c, "wearable"]], [/(pico) (4|neo3(?: link|pro)?)/i], [u, a, [c, "wearable"]], [/; (quest( \d| pro)?)/i], [a, [u, "Facebook"], [c, "wearable"]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [u, [c, "embedded"]], [/(aeobc)\b/i], [a, [u, "Amazon"], [c, "embedded"]], [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i], [a, [c, d]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [a, [c, p]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[c, p]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[c, d]], [/(android[-\w\. ]{0,9});.+buil/i], [a, [u, "Generic"]]],
                engine: [[/windows.+ edge\/([\w\.]+)/i], [l, [s, "EdgeHTML"]], [/(arkweb)\/([\w\.]+)/i], [s, l], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [l, [s, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [s, l], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [l, s]],
                os: [[/microsoft (windows) (vista|xp)/i], [s, l], [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i], [s, [l, y, _]], [/windows nt 6\.2; (arm)/i, /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i, /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[l, y, _], [s, "Windows"]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[l, /_/g, "."], [s, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[s, "Mac OS"], [l, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [l, s], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish|openharmony)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [s, l], [/\(bb(10);/i], [l, [s, "BlackBerry"]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [l, [s, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [l, [s, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [l, [s, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [l, [s, "watchOS"]], [/crkey\/([\d\.]+)/i], [l, [s, "Chromecast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[s, "Chromium OS"], l], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [s, l], [/(sunos) ?([\w\.\d]*)/i], [[s, "Solaris"], l], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [s, l]]
            }
              , O = function(e, t) {
                if ("object" === typeof e && (t = e,
                e = undefined),
                !(this instanceof O))
                    return new O(e,t).getResult();
                var n = "undefined" !== typeof i && i.navigator ? i.navigator : undefined
                  , r = e || (n && n.userAgent ? n.userAgent : "")
                  , o = n && n.userAgentData ? n.userAgentData : undefined
                  , u = t ? function(e, t) {
                    var n = {};
                    for (var r in e)
                        t[r] && t[r].length % 2 === 0 ? n[r] = t[r].concat(e[r]) : n[r] = e[r];
                    return n
                }(w, t) : w
                  , f = n && n.userAgent == r;
                return this.getBrowser = function() {
                    var e, t = {};
                    return t[s] = undefined,
                    t[l] = undefined,
                    g.call(t, r, u.browser),
                    t.major = "string" === typeof (e = t[l]) ? e.replace(/[^\d\.]/g, "").split(".")[0] : void 0,
                    f && n && n.brave && "function" == typeof n.brave.isBrave && (t[s] = "Brave"),
                    t
                }
                ,
                this.getCPU = function() {
                    var e = {
                        architecture: undefined
                    };
                    return g.call(e, r, u.cpu),
                    e
                }
                ,
                this.getDevice = function() {
                    var e = {
                        vendor: undefined,
                        model: undefined,
                        type: undefined
                    };
                    return g.call(e, r, u.device),
                    f && !e[c] && o && o.mobile && (e[c] = d),
                    f && "Macintosh" == e[a] && n && "undefined" !== typeof n.standalone && n.maxTouchPoints && n.maxTouchPoints > 2 && (e[a] = "iPad",
                    e[c] = p),
                    e
                }
                ,
                this.getEngine = function() {
                    var e = {
                        name: undefined,
                        version: undefined
                    };
                    return g.call(e, r, u.engine),
                    e
                }
                ,
                this.getOS = function() {
                    var e = {
                        name: undefined,
                        version: undefined
                    };
                    return g.call(e, r, u.os),
                    f && !e[s] && o && o.platform && "Unknown" != o.platform && (e[s] = o.platform.replace(/chrome os/i, "Chromium OS").replace(/macos/i, "Mac OS")),
                    e
                }
                ,
                this.getResult = function() {
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                    }
                }
                ,
                this.getUA = function() {
                    return r
                }
                ,
                this.setUA = function(e) {
                    return r = "string" === typeof e && e.length > 500 ? m(e, 500) : e,
                    this
                }
                ,
                this.setUA(r),
                this
            };
            O.VERSION = "0.7.40",
            O.BROWSER = h([s, l, "major"]),
            O.CPU = h(["architecture"]),
            O.DEVICE = h([a, u, c, "console", d, f, p, "wearable", "embedded"]),
            O.ENGINE = O.OS = h([s, l]),
            "undefined" !== typeof t ? ("undefined" !== typeof e && e.exports && (t = e.exports = O),
            t.UAParser = O) : n("VRIy") ? undefined === (r = function() {
                return O
            }
            .call(t, n, t, e)) || (e.exports = r) : "undefined" !== typeof i && (i.UAParser = O);
            var x = "undefined" !== typeof i && (i.jQuery || i.Zepto);
            if (x && !x.ua) {
                var S = new O;
                x.ua = S.getResult(),
                x.ua.get = function() {
                    return S.getUA()
                }
                ,
                x.ua.set = function(e) {
                    S.setUA(e);
                    var t = S.getResult();
                    for (var n in t)
                        x.ua[n] = t[n]
                }
            }
        }("object" === typeof window ? window : this)
    },
    k4w3: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.OfflineStore = void 0;
        const r = n("gKH4")
          , i = n("bfg4");
        t.OfflineStore = class {
            constructor(e, t) {
                this.pending = !1;
                try {
                    this.storage = new r.ApmsStorage({
                        name: "apms_offlinestore_" + e
                    }),
                    this.network = t
                } catch (n) {}
            }
            setup() {
                r.supportLocalstorage && ("requestIdleCallback"in window ? requestIdleCallback(this.checkCache.bind(this)) : setTimeout( () => {
                    this.checkCache()
                }
                , 0),
                window.addEventListener("online", () => {
                    this.checkCache()
                }
                ))
            }
            async checkCache() {
                var e;
                try {
                    if (this.pending && !r.supportLocalstorage)
                        return;
                    this.pending = !0;
                    const t = null !== (e = this.storage.getKeys()) && void 0 !== e ? e : []
                      , n = [];
                    for (const e of t) {
                        const t = this.storage.getObject(e);
                        !t || Array.isArray(t) && 0 == t.length ? this.storage.removeItem(e) : (t instanceof Array ? n.push(...t) : n.push(t),
                        this.storage.removeItem(e))
                    }
                    return await this.network.sendBulk(n),
                    this.pending = !1,
                    !0
                } catch (t) {
                    return this.pending = !1,
                    !1
                }
            }
            checkLimit() {
                var e;
                const t = null !== (e = this.storage.getKeys()) && void 0 !== e ? e : [];
                if (t.length < 30)
                    return !0;
                const n = t.sort( (e, t) => e > t ? -1 : 1).slice(29, t.length);
                for (const r of n)
                    this.storage.removeItem(r)
            }
            async cacheData(e) {
                if (r.supportLocalstorage)
                    try {
                        this.checkLimit();
                        const t = "data_" + +new Date;
                        this.storage.setObject(t, e)
                    } catch (t) {
                        i.Logger.log("[APMS] Failed to cache data.")
                    }
            }
        }
    },
    kG2m: function(e, t) {
        e.exports = function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
    },
    lwAK: function(e, t, n) {
        "use strict";
        var r;
        t.__esModule = !0,
        t.AmpStateContext = void 0;
        var i = ((r = n("q1tI")) && r.__esModule ? r : {
            default: r
        }).default.createContext({});
        t.AmpStateContext = i
    },
    m1W8: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.LIMITATIONS = t.stackMessageRegex = t.DEFAULT_CHECK_INTERVAL = void 0,
        t.DEFAULT_CHECK_INTERVAL = 6e4,
        t.stackMessageRegex = {
            chrome: /^(.*)\n\s+(at)/,
            safari: /^(.*)\/<@/
        },
        t.LIMITATIONS = {
            REPORT_TRANSACTION_LIMIT: 10,
            REPORT_BULK_TRIM_LIMIT: 500,
            REPORT_BULK_ABORT_LIMIT: 100
        }
    },
    mPvQ: function(e, t, n) {
        var r = n("5fIB")
          , i = n("rlHP")
          , o = n("KckH")
          , a = n("kG2m");
        e.exports = function(e) {
            return r(e) || i(e) || o(e) || a()
        }
    },
    md7G: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return o
        }
        ));
        var r = n("U8pU")
          , i = n("JX7q");
        function o(e, t) {
            if (t && ("object" === Object(r.a)(t) || "function" === typeof t))
                return t;
            if (void 0 !== t)
                throw new TypeError("Derived constructors may only return object or undefined");
            return Object(i.a)(e)
        }
    },
    nqPb: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.HistoryListener = void 0;
        function r(e) {
            const t = window.history[e]
              , n = new Event("apms_" + e);
            window.history[e] = function(...e) {
                const r = t.apply(window.history, e);
                return window.dispatchEvent(n),
                r
            }
        }
        const i = ["popstate", "hashchange", "beforeunload"]
          , o = ["apms_replaceState", "apms_pushState"];
        class a {
            static dispatchEvent(e) {
                try {
                    const t = o.includes(e) ? e.replace("apms_", "") : e;
                    for (const e of Object.values(a.listenerMap))
                        e(t)
                } catch (t) {}
            }
            init() {
                if (!a.filled)
                    try {
                        r("pushState"),
                        r("replaceState");
                        for (const e of i)
                            window.addEventListener(e, (function() {
                                a.dispatchEvent(e)
                            }
                            ));
                        for (const e of o)
                            window.addEventListener(e, (function() {
                                a.lastHref !== window.location.href && (a.lastHref = window.location.href,
                                a.dispatchEvent(e))
                            }
                            ));
                        a.filled = !0
                    } catch (e) {}
            }
            add(e, t) {
                a.listenerMap[e] = t,
                this.init()
            }
            remove(e) {
                a.listenerMap[e] && delete a.listenerMap[e]
            }
        }
        t.HistoryListener = a,
        a.listenerMap = {},
        a.filled = !1,
        a.lastHref = window.location.href
    },
    oGiH: function(e, t, n) {
        "use strict";
        var r = n("1OyB")
          , i = n("vuIU")
          , o = function() {
            function e(t) {
                var n = this;
                Object(r.a)(this, e),
                this._workerResolve = void 0,
                this._worker = void 0,
                this._workerResolve = function() {}
                ,
                this._worker = new t,
                this._worker.onmessage = function(e) {
                    return n._workerResolve([e.data, null])
                }
                ,
                this._worker.onerror = function(e) {
                    return n._workerResolve([null, e.error])
                }
            }
            return Object(i.a)(e, [{
                key: "dispatch",
                value: function(e) {
                    var t = this;
                    return new Promise((function(n) {
                        t._workerResolve = n,
                        t._worker.postMessage(e)
                    }
                    ))
                }
            }]),
            e
        }();
        t.a = o
    },
    oI91: function(e, t) {
        e.exports = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
    },
    pbPy: function(e, t, n) {
        "use strict";
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.transferDataField = t.isEmpty = t.GLOBAL_OBJ = t.uuidv4 = t.isMatchArray = t.stringifyOriginalException = t.preProcessStack = t.isErrorObject = void 0;
            const r = n("m1W8")
              , i = n("EFV3");
            t.isErrorObject = e => e instanceof Error;
            t.preProcessStack = e => {
                if (!e)
                    return "";
                let t = e;
                for (const n of Object.values(r.stackMessageRegex))
                    if (n.test(e)) {
                        t = e.replace(n, "$2");
                        break
                    }
                return t
            }
            ;
            t.stringifyOriginalException = e => {
                if (!e)
                    return "";
                if ("string" === typeof e)
                    return e;
                try {
                    return JSON.stringify(e, "object" === typeof e ? Object.getOwnPropertyNames(e) : void 0)
                } catch (e) {
                    return ""
                }
            }
            ;
            function o(e) {
                return e && e.Math == Math ? e : void 0
            }
            t.isMatchArray = e => Array.isArray(e),
            t.uuidv4 = function() {
                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                    const t = 16 * Math.random() | 0;
                    return ("x" == e ? t : 3 & t | 8).toString(16)
                }
                ))
            }
            ,
            t.GLOBAL_OBJ = "object" == typeof globalThis && o(globalThis) || "object" == typeof window && o(window) || "object" == typeof self && o(self) || "object" == typeof e && o(e) || function() {
                return this
            }() || {},
            t.isEmpty = function(e) {
                return null == e || "object" === typeof e && null !== e && (Array.isArray(e) ? 0 === e.length : e instanceof Map || e instanceof Set ? 0 === e.size : 0 === Object.keys(e).length)
            }
            ;
            t.transferDataField = e => {
                if (!e)
                    return {};
                const t = {};
                for (const n of Object.keys(e)) {
                    const r = e[n];
                    (0,
                    i.isValidTag)(n, r) && (t[n] = r ? "string" !== typeof r ? r.toString() : r : "")
                }
                return t
            }
        }
        ).call(this, n("3r9c"))
    },
    qXWd: function(e, t) {
        e.exports = function(e) {
            if (void 0 === e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
    },
    rlHP: function(e, t) {
        e.exports = function(e) {
            if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e))
                return Array.from(e)
        }
    },
    rwij: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setFingerprint = t.getFingerprint = void 0;
        const r = n("VOJa")
          , i = "_apms_sdk_fingerprint";
        function o() {
            if ("undefined" !== typeof localStorage) {
                const e = localStorage.getItem(i);
                return e || null
            }
            const e = document.cookie.split("; ").find(e => e.startsWith(i + "="));
            return e ? e.split("=")[1] : null
        }
        t.getFingerprint = o,
        t.setFingerprint = function() {
            const e = o();
            if (e)
                return console.log("[APMS] Fingerprint already exists:", e),
                e;
            const t = "" + (0,
            r.uuidv4)();
            return "undefined" !== typeof localStorage ? (localStorage.setItem(i, t),
            console.log("[APMS] Fingerprint set in local storage:", t)) : (document.cookie = `${i}=${t}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`,
            console.log("[APMS] Fingerprint set in cookie:", t)),
            t
        }
    },
    tCBg: function(e, t, n) {
        var r = n("C+bE")
          , i = n("qXWd");
        e.exports = function(e, t) {
            return !t || "object" !== r(t) && "function" !== typeof t ? i(e) : t
        }
    },
    uNo7: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return f
        }
        ));
        var r = n("ODXe")
          , i = n("HaE+")
          , o = n("o0o1")
          , a = n.n(o)
          , s = n("6ifN")
          , c = n("cBaE")
          , u = n("Bk8j")
          , l = null
          , d = function(e) {
            sessionStorage.setItem("SUB_STREAMER_ID", e)
        }
          , p = function() {
            var e = Object(i.a)(a.a.mark((function e() {
                var t, n, i, o, c, u;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return l || (l = Object(s.b)()),
                            e.next = 3,
                            l;
                        case 3:
                            if (t = e.sent,
                            n = Object(r.a)(t, 2),
                            i = n[0],
                            o = n[1],
                            i) {
                                e.next = 13;
                                break
                            }
                            return c = o.uid,
                            d(u = void 0 === c ? 0 : c),
                            e.abrupt("return", {
                                account_type: "sub_account",
                                streamer_id: parseInt(u)
                            });
                        case 13:
                            return d(0),
                            e.abrupt("return", {
                                account_type: "sub_account",
                                streamer_id: 0
                            });
                        case 15:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , f = function() {
            var e = Object(i.a)(a.a.mark((function e() {
                var t, n, r, i;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (t = Number(Object(c.w)("host_id")) || 0,
                            Object(u.D)()) {
                                e.next = 3;
                                break
                            }
                            return e.abrupt("return", {});
                        case 3:
                            if (c.F) {
                                e.next = 7;
                                break
                            }
                            return n = Object(u.C)(),
                            t > 0 && (n.streamer_id = t),
                            e.abrupt("return", n);
                        case 7:
                            if (r = sessionStorage.getItem("SUB_STREAMER_ID")) {
                                e.next = 14;
                                break
                            }
                            return e.next = 11,
                            p();
                        case 11:
                            return i = e.sent,
                            t > 0 && (i.streamer_id = t),
                            e.abrupt("return", i);
                        case 14:
                            return e.abrupt("return", {
                                account_type: "sub_account",
                                streamer_id: t > 0 ? t : parseInt(r)
                            });
                        case 15:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
    },
    vwzm: function(e, t, n) {
        "use strict";
        n.d(t, "e", (function() {
            return f
        }
        )),
        n.d(t, "h", (function() {
            return h
        }
        )),
        n.d(t, "m", (function() {
            return b
        }
        )),
        n.d(t, "l", (function() {
            return v
        }
        )),
        n.d(t, "g", (function() {
            return m
        }
        )),
        n.d(t, "f", (function() {
            return g
        }
        )),
        n.d(t, "b", (function() {
            return y
        }
        )),
        n.d(t, "p", (function() {
            return O
        }
        )),
        n.d(t, "o", (function() {
            return x
        }
        )),
        n.d(t, "n", (function() {
            return S
        }
        )),
        n.d(t, "c", (function() {
            return j
        }
        )),
        n.d(t, "a", (function() {
            return k
        }
        )),
        n.d(t, "d", (function() {
            return P
        }
        )),
        n.d(t, "i", (function() {
            return A
        }
        )),
        n.d(t, "j", (function() {
            return E
        }
        )),
        n.d(t, "k", (function() {
            return I
        }
        ));
        var r = n("Ff2n")
          , i = n("HaE+")
          , o = n("o0o1")
          , a = n.n(o)
          , s = n("xds5")
          , c = n("vDqi")
          , u = n.n(c)
          , l = n("cBaE")
          , d = n("9Srp")
          , p = n("AkrU")
          , f = function() {
            var e = Object(i.a)(a.a.mark((function e() {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/host_plan/red_dot");
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , h = function() {
            var e = Object(i.a)(a.a.mark((function e() {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/session");
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , b = function() {
            var e = Object(i.a)(a.a.mark((function e(t, n) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.post("/session/".concat(t, "/update_from_reminder"), {
                                reminder_id: n
                            });
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t, n) {
                return e.apply(this, arguments)
            }
        }()
          , v = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                var n, r;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = t.offset,
                            r = t.limit,
                            e.next = 3,
                            s.c.get("/reminder/upcoming?offset=".concat(n, "&limit=").concat(r));
                        case 3:
                            return e.abrupt("return", e.sent);
                        case 4:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , m = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                var n, r;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = t.offset,
                            r = t.limit,
                            e.next = 3,
                            s.c.get("/reminder/record?offset=".concat(n, "&limit=").concat(r));
                        case 3:
                            return e.abrupt("return", e.sent);
                        case 4:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , g = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/reminder/".concat(t));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , y = function() {
            var e = Object(i.a)(a.a.mark((function e() {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/host_plan/last_plan");
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , _ = "shopee"
          , w = "seller"
          , O = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                var n, r, i, o, c, f, h, b = arguments;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = b.length > 1 && void 0 !== b[1] ? b[1] : 6e4,
                            r = new window.FormData,
                            i = t.type.split("/")[1],
                            r.append("cover_pic", t, "cover." + i),
                            o = {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "X-Livestreaming-Source": l.F ? w : _
                                },
                                timeout: n
                            },
                            c = l.b + l.a + "/image/upload",
                            e.next = 8,
                            Object(d.a)("POST", {
                                url: c,
                                data: ""
                            });
                        case 8:
                            return (f = e.sent) && (o.headers["X-Livestreaming-Auth"] = f),
                            e.next = 12,
                            Object(p.a)();
                        case 12:
                            return h = e.sent,
                            o.headers["X-LS-SZ-TOKEN"] = h,
                            o.headers["Client-Info"] = s.b,
                            e.next = 17,
                            u.a.post(c, r, o).then((function(e) {
                                return 200 === e.status ? e.data && (0 !== e.data.err_code || e.data.data && !e.data.data.file_id) ? [null, e.data] : [e.data, null] : [null, e]
                            }
                            )).catch((function(e) {
                                return [null, e]
                            }
                            ));
                        case 17:
                            return e.abrupt("return", e.sent);
                        case 18:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , x = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.post("/reminder", t);
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , S = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                var n, i;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = t.id,
                            i = Object(r.a)(t, ["id"]),
                            e.next = 3,
                            s.c.put("/reminder/".concat(n), i);
                        case 3:
                            return e.abrupt("return", e.sent);
                        case 4:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , j = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/reminder/".concat(t));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , k = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.delete("/reminder/".concat(t));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , P = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/plan/".concat(t));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , A = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/shop_page/live/ongoing?uid=".concat(t));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , E = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                var n, r, i;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = t.offset,
                            r = t.limit,
                            i = t.uid,
                            e.next = 3,
                            s.c.get("/shop_page/live/replay_list?offset=".concat(n, "&limit=").concat(r, "&uid=").concat(i));
                        case 3:
                            return e.abrupt("return", e.sent);
                        case 4:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , I = function() {
            var e = Object(i.a)(a.a.mark((function e(t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            s.c.get("/shop_page/live/ongoing?uid=".concat(t));
                        case 2:
                            return e.abrupt("return", e.sent);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
    },
    xRp3: function(e) {
        e.exports = JSON.parse('{"name":"apms_web_sdk","version":"0.3.0"}')
    },
    y66H: function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "__extends", (function() {
            return i
        }
        )),
        n.d(t, "__assign", (function() {
            return o
        }
        )),
        n.d(t, "__rest", (function() {
            return a
        }
        )),
        n.d(t, "__decorate", (function() {
            return s
        }
        )),
        n.d(t, "__param", (function() {
            return c
        }
        )),
        n.d(t, "__esDecorate", (function() {
            return u
        }
        )),
        n.d(t, "__runInitializers", (function() {
            return l
        }
        )),
        n.d(t, "__propKey", (function() {
            return d
        }
        )),
        n.d(t, "__setFunctionName", (function() {
            return p
        }
        )),
        n.d(t, "__metadata", (function() {
            return f
        }
        )),
        n.d(t, "__awaiter", (function() {
            return h
        }
        )),
        n.d(t, "__generator", (function() {
            return b
        }
        )),
        n.d(t, "__createBinding", (function() {
            return v
        }
        )),
        n.d(t, "__exportStar", (function() {
            return m
        }
        )),
        n.d(t, "__values", (function() {
            return g
        }
        )),
        n.d(t, "__read", (function() {
            return y
        }
        )),
        n.d(t, "__spread", (function() {
            return _
        }
        )),
        n.d(t, "__spreadArrays", (function() {
            return w
        }
        )),
        n.d(t, "__spreadArray", (function() {
            return O
        }
        )),
        n.d(t, "__await", (function() {
            return x
        }
        )),
        n.d(t, "__asyncGenerator", (function() {
            return S
        }
        )),
        n.d(t, "__asyncDelegator", (function() {
            return j
        }
        )),
        n.d(t, "__asyncValues", (function() {
            return k
        }
        )),
        n.d(t, "__makeTemplateObject", (function() {
            return P
        }
        )),
        n.d(t, "__importStar", (function() {
            return I
        }
        )),
        n.d(t, "__importDefault", (function() {
            return T
        }
        )),
        n.d(t, "__classPrivateFieldGet", (function() {
            return D
        }
        )),
        n.d(t, "__classPrivateFieldSet", (function() {
            return R
        }
        )),
        n.d(t, "__classPrivateFieldIn", (function() {
            return C
        }
        )),
        n.d(t, "__addDisposableResource", (function() {
            return L
        }
        )),
        n.d(t, "__disposeResources", (function() {
            return N
        }
        )),
        n.d(t, "__rewriteRelativeImportExtension", (function() {
            return F
        }
        ));
        var r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        };
        function i(e, t) {
            if ("function" !== typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        var o = function() {
            return (o = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var i in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }
            ).apply(this, arguments)
        };
        function a(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                    t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
            }
            return n
        }
        function s(e, t, n, r) {
            var i, o = arguments.length, a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
            if ("object" === typeof Reflect && "function" === typeof Reflect.decorate)
                a = Reflect.decorate(e, t, n, r);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
            return o > 3 && a && Object.defineProperty(t, n, a),
            a
        }
        function c(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        }
        function u(e, t, n, r, i, o) {
            function a(e) {
                if (void 0 !== e && "function" !== typeof e)
                    throw new TypeError("Function expected");
                return e
            }
            for (var s, c = r.kind, u = "getter" === c ? "get" : "setter" === c ? "set" : "value", l = !t && e ? r.static ? e : e.prototype : null, d = t || (l ? Object.getOwnPropertyDescriptor(l, r.name) : {}), p = !1, f = n.length - 1; f >= 0; f--) {
                var h = {};
                for (var b in r)
                    h[b] = "access" === b ? {} : r[b];
                for (var b in r.access)
                    h.access[b] = r.access[b];
                h.addInitializer = function(e) {
                    if (p)
                        throw new TypeError("Cannot add initializers after decoration has completed");
                    o.push(a(e || null))
                }
                ;
                var v = (0,
                n[f])("accessor" === c ? {
                    get: d.get,
                    set: d.set
                } : d[u], h);
                if ("accessor" === c) {
                    if (void 0 === v)
                        continue;
                    if (null === v || "object" !== typeof v)
                        throw new TypeError("Object expected");
                    (s = a(v.get)) && (d.get = s),
                    (s = a(v.set)) && (d.set = s),
                    (s = a(v.init)) && i.unshift(s)
                } else
                    (s = a(v)) && ("field" === c ? i.unshift(s) : d[u] = s)
            }
            l && Object.defineProperty(l, r.name, d),
            p = !0
        }
        function l(e, t, n) {
            for (var r = arguments.length > 2, i = 0; i < t.length; i++)
                n = r ? t[i].call(e, n) : t[i].call(e);
            return r ? n : void 0
        }
        function d(e) {
            return "symbol" === typeof e ? e : "".concat(e)
        }
        function p(e, t, n) {
            return "symbol" === typeof t && (t = t.description ? "[".concat(t.description, "]") : ""),
            Object.defineProperty(e, "name", {
                configurable: !0,
                value: n ? "".concat(n, " ", t) : t
            })
        }
        function f(e, t) {
            if ("object" === typeof Reflect && "function" === typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        function h(e, t, n, r) {
            return new (n || (n = Promise))((function(i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (t) {
                        o(t)
                    }
                }
                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (t) {
                        o(t)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                c((r = r.apply(e, t || [])).next())
            }
            ))
        }
        function b(e, t) {
            var n, r, i, o = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" === typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" === typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(c) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (o = 0)),
                        o; )
                            try {
                                if (n = 1,
                                r && (i = 2 & s[0] ? r.return : s[0] ? r.throw || ((i = r.return) && i.call(r),
                                0) : r.next) && !(i = i.call(r, s[1])).done)
                                    return i;
                                switch (r = 0,
                                i && (s = [2 & s[0], i.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    i = s;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    r = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!i || s[1] > i[0] && s[1] < i[3])) {
                                        o.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && o.label < i[1]) {
                                        o.label = i[1],
                                        i = s;
                                        break
                                    }
                                    if (i && o.label < i[2]) {
                                        o.label = i[2],
                                        o.ops.push(s);
                                        break
                                    }
                                    i[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                s = t.call(e, o)
                            } catch (c) {
                                s = [6, c],
                                r = 0
                            } finally {
                                n = i = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, c])
                }
            }
        }
        var v = Object.create ? function(e, t, n, r) {
            void 0 === r && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[n]
                }
            }),
            Object.defineProperty(e, r, i)
        }
        : function(e, t, n, r) {
            void 0 === r && (r = n),
            e[r] = t[n]
        }
        ;
        function m(e, t) {
            for (var n in e)
                "default" === n || Object.prototype.hasOwnProperty.call(t, n) || v(t, e, n)
        }
        function g(e) {
            var t = "function" === typeof Symbol && Symbol.iterator
              , n = t && e[t]
              , r = 0;
            if (n)
                return n.call(e);
            if (e && "number" === typeof e.length)
                return {
                    next: function() {
                        return e && r >= e.length && (e = void 0),
                        {
                            value: e && e[r++],
                            done: !e
                        }
                    }
                };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }
        function y(e, t) {
            var n = "function" === typeof Symbol && e[Symbol.iterator];
            if (!n)
                return e;
            var r, i, o = n.call(e), a = [];
            try {
                for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
                    a.push(r.value)
            } catch (s) {
                i = {
                    error: s
                }
            } finally {
                try {
                    r && !r.done && (n = o.return) && n.call(o)
                } finally {
                    if (i)
                        throw i.error
                }
            }
            return a
        }
        function _() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e = e.concat(y(arguments[t]));
            return e
        }
        function w() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                e += arguments[t].length;
            var r = Array(e)
              , i = 0;
            for (t = 0; t < n; t++)
                for (var o = arguments[t], a = 0, s = o.length; a < s; a++,
                i++)
                    r[i] = o[a];
            return r
        }
        function O(e, t, n) {
            if (n || 2 === arguments.length)
                for (var r, i = 0, o = t.length; i < o; i++)
                    !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)),
                    r[i] = t[i]);
            return e.concat(r || Array.prototype.slice.call(t))
        }
        function x(e) {
            return this instanceof x ? (this.v = e,
            this) : new x(e)
        }
        function S(e, t, n) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var r, i = n.apply(e, t || []), o = [];
            return r = Object.create(("function" === typeof AsyncIterator ? AsyncIterator : Object).prototype),
            a("next"),
            a("throw"),
            a("return", (function(e) {
                return function(t) {
                    return Promise.resolve(t).then(e, u)
                }
            }
            )),
            r[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            r;
            function a(e, t) {
                i[e] && (r[e] = function(t) {
                    return new Promise((function(n, r) {
                        o.push([e, t, n, r]) > 1 || s(e, t)
                    }
                    ))
                }
                ,
                t && (r[e] = t(r[e])))
            }
            function s(e, t) {
                try {
                    (n = i[e](t)).value instanceof x ? Promise.resolve(n.value.v).then(c, u) : l(o[0][2], n)
                } catch (r) {
                    l(o[0][3], r)
                }
                var n
            }
            function c(e) {
                s("next", e)
            }
            function u(e) {
                s("throw", e)
            }
            function l(e, t) {
                e(t),
                o.shift(),
                o.length && s(o[0][0], o[0][1])
            }
        }
        function j(e) {
            var t, n;
            return t = {},
            r("next"),
            r("throw", (function(e) {
                throw e
            }
            )),
            r("return"),
            t[Symbol.iterator] = function() {
                return this
            }
            ,
            t;
            function r(r, i) {
                t[r] = e[r] ? function(t) {
                    return (n = !n) ? {
                        value: x(e[r](t)),
                        done: !1
                    } : i ? i(t) : t
                }
                : i
            }
        }
        function k(e) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var t, n = e[Symbol.asyncIterator];
            return n ? n.call(e) : (e = g(e),
            t = {},
            r("next"),
            r("throw"),
            r("return"),
            t[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            t);
            function r(n) {
                t[n] = e[n] && function(t) {
                    return new Promise((function(r, i) {
                        (function(e, t, n, r) {
                            Promise.resolve(r).then((function(t) {
                                e({
                                    value: t,
                                    done: n
                                })
                            }
                            ), t)
                        }
                        )(r, i, (t = e[n](t)).done, t.value)
                    }
                    ))
                }
            }
        }
        function P(e, t) {
            return Object.defineProperty ? Object.defineProperty(e, "raw", {
                value: t
            }) : e.raw = t,
            e
        }
        var A = Object.create ? function(e, t) {
            Object.defineProperty(e, "default", {
                enumerable: !0,
                value: t
            })
        }
        : function(e, t) {
            e.default = t
        }
          , E = function(e) {
            return (E = Object.getOwnPropertyNames || function(e) {
                var t = [];
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
                return t
            }
            )(e)
        };
        function I(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var n = E(e), r = 0; r < n.length; r++)
                    "default" !== n[r] && v(t, e, n[r]);
            return A(t, e),
            t
        }
        function T(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function D(e, t, n, r) {
            if ("a" === n && !r)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" === typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e)
        }
        function R(e, t, n, r, i) {
            if ("m" === r)
                throw new TypeError("Private method is not writable");
            if ("a" === r && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" === typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === r ? i.call(e, n) : i ? i.value = n : t.set(e, n),
            n
        }
        function C(e, t) {
            if (null === t || "object" !== typeof t && "function" !== typeof t)
                throw new TypeError("Cannot use 'in' operator on non-object");
            return "function" === typeof e ? t === e : e.has(t)
        }
        function L(e, t, n) {
            if (null !== t && void 0 !== t) {
                if ("object" !== typeof t && "function" !== typeof t)
                    throw new TypeError("Object expected.");
                var r, i;
                if (n) {
                    if (!Symbol.asyncDispose)
                        throw new TypeError("Symbol.asyncDispose is not defined.");
                    r = t[Symbol.asyncDispose]
                }
                if (void 0 === r) {
                    if (!Symbol.dispose)
                        throw new TypeError("Symbol.dispose is not defined.");
                    r = t[Symbol.dispose],
                    n && (i = r)
                }
                if ("function" !== typeof r)
                    throw new TypeError("Object not disposable.");
                i && (r = function() {
                    try {
                        i.call(this)
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
                ),
                e.stack.push({
                    value: t,
                    dispose: r,
                    async: n
                })
            } else
                n && e.stack.push({
                    async: !0
                });
            return t
        }
        var M = "function" === typeof SuppressedError ? SuppressedError : function(e, t, n) {
            var r = new Error(n);
            return r.name = "SuppressedError",
            r.error = e,
            r.suppressed = t,
            r
        }
        ;
        function N(e) {
            function t(t) {
                e.error = e.hasError ? new M(t,e.error,"An error was suppressed during disposal.") : t,
                e.hasError = !0
            }
            var n, r = 0;
            return function i() {
                for (; n = e.stack.pop(); )
                    try {
                        if (!n.async && 1 === r)
                            return r = 0,
                            e.stack.push(n),
                            Promise.resolve().then(i);
                        if (n.dispose) {
                            var o = n.dispose.call(n.value);
                            if (n.async)
                                return r |= 2,
                                Promise.resolve(o).then(i, (function(e) {
                                    return t(e),
                                    i()
                                }
                                ))
                        } else
                            r |= 1
                    } catch (a) {
                        t(a)
                    }
                if (1 === r)
                    return e.hasError ? Promise.reject(e.error) : Promise.resolve();
                if (e.hasError)
                    throw e.error
            }()
        }
        function F(e, t) {
            return "string" === typeof e && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, (function(e, n, r, i, o) {
                return n ? t ? ".jsx" : ".js" : !r || i && o ? r + i + "." + o.toLowerCase() + "js" : e
            }
            )) : e
        }
        t.default = {
            __extends: i,
            __assign: o,
            __rest: a,
            __decorate: s,
            __param: c,
            __esDecorate: u,
            __runInitializers: l,
            __propKey: d,
            __setFunctionName: p,
            __metadata: f,
            __awaiter: h,
            __generator: b,
            __createBinding: v,
            __exportStar: m,
            __values: g,
            __read: y,
            __spread: _,
            __spreadArrays: w,
            __spreadArray: O,
            __await: x,
            __asyncGenerator: S,
            __asyncDelegator: j,
            __asyncValues: k,
            __makeTemplateObject: P,
            __importStar: I,
            __importDefault: T,
            __classPrivateFieldGet: D,
            __classPrivateFieldSet: R,
            __classPrivateFieldIn: C,
            __addDisposableResource: L,
            __disposeResources: N,
            __rewriteRelativeImportExtension: F
        }
    },
    yjT0: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return c
        }
        )),
        n.d(t, "b", (function() {
            return u
        }
        ));
        var r = n("SyLE")
          , i = n("cBaE")
          , o = null
          , a = null;
        i.D && (o = n("YOnp"),
        a = n("WNSG"));
        var s = null
          , c = null
          , u = function() {
            if (o && a) {
                var e = o.ApmsSdk
                  , t = a.default;
                s = new e({
                    de_app_id: "live" === r.c ? "282" : "281",
                    secret_key: "live" === r.c ? "f3c62734ce924c0aa0ca14f71dd88ef4" : "3b74916cb40749f5814d5e4f4a10e588",
                    js_bundle_name: "live-stream-multipages",
                    js_bundle_version: "1.0.0",
                    region: r.b.toUpperCase(),
                    js_build_id: "".concat(r.b, "-").concat(r.d),
                    environment: "live",
                    interval: 1e4,
                    user_id: ""
                }),
                c = new t({
                    interval: 15
                }),
                s.use(c)
            }
        }
    }
}, [[18, 1, 0, 37, 3, 2, 4, 5, 6, 7, 9, 12, 13, 17, 18, 43]]]);
//# _app-496237ed12326b9a23ee.js.map
