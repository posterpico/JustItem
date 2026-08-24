(window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([[21], {
    "0LPd": function(e, n, t) {
        "use strict";
        t.d(n, "c", (function() {
            return s
        }
        )),
        t.d(n, "e", (function() {
            return d
        }
        )),
        t.d(n, "a", (function() {
            return l
        }
        )),
        t.d(n, "b", (function() {
            return f
        }
        )),
        t.d(n, "d", (function() {
            return m
        }
        ));
        var r = t("ODXe")
          , i = t("HaE+")
          , o = t("o0o1")
          , a = t.n(o)
          , c = (t("vDqi"),
        t("cBaE"),
        t("xds5"));
        t("w/Rt");
        function s(e) {
            return u.apply(this, arguments)
        }
        function u() {
            return (u = Object(i.a)(a.a.mark((function e(n) {
                var t, i, o, s, u, d;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            c.d.get("/session/".concat(n));
                        case 2:
                            return t = e.sent,
                            i = Object(r.a)(t, 2),
                            o = i[0],
                            s = i[1],
                            o || ((u = null !== (d = null === s || void 0 === s ? void 0 : s.session) && void 0 !== d ? d : {}).play_urls = s.play_urls,
                            u.session_adult_info = s.session_adult_info),
                            e.abrupt("return", [o, u]);
                        case 8:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function d(e, n) {
            return p.apply(this, arguments)
        }
        function p() {
            return (p = Object(i.a)(a.a.mark((function e(n, t) {
                var i, o, s, u, d;
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return i = {
                                uuid: t,
                                ver: 1
                            },
                            e.next = 3,
                            c.d.post("session/".concat(n, "/joinv2"), i);
                        case 3:
                            return o = e.sent,
                            s = Object(r.a)(o, 2),
                            u = s[0],
                            d = s[1],
                            e.abrupt("return", [u, d]);
                        case 8:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        var l = {
            SHOPEE_ACCOUNT: "shopee",
            SELLER_SUB_ACCOUNT: "seller"
        };
        function f(e, n) {
            return v.apply(this, arguments)
        }
        function v() {
            return (v = Object(i.a)(a.a.mark((function e(n, t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            c.d.get("session/".concat(n, "/voucher/applicable_items"), {
                               params: {
                                  offset: t,
                                  promotion_id: 1491718759661568,
                                  voucher_code: "FSV-1008742931942604800",
                                  limit: 100
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
        function m(e, n) {
            return h.apply(this, arguments)
        }
        function h() {
            return (h = Object(i.a)(a.a.mark((function e(n, t) {
                return a.a.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            c.d.get("session/".concat(n, "/sp_items"), {
                                params: {
                                    offset: t,
                                    limit: 10
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
    },
    K60g: function(e, n, t) {
        "use strict";
        var r = t("rePB")
          , i = t("1OyB")
          , o = t("vuIU")
          , a = -1
          , c = function(e) {
            addEventListener("pageshow", (function(n) {
                n.persisted && (a = n.timeStamp,
                e(n))
            }
            ), !0)
        }
          , s = function() {
            var e = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
            if (e && e.responseStart > 0 && e.responseStart < performance.now())
                return e
        }
          , u = function() {
            var e = s();
            return e && e.activationStart || 0
        }
          , d = function(e, n) {
            var t = s()
              , r = "navigate";
            return a >= 0 ? r = "back-forward-cache" : t && (document.prerendering || u() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : t.type && (r = t.type.replace(/_/g, "-"))),
            {
                name: e,
                value: void 0 === n ? -1 : n,
                rating: "good",
                delta: 0,
                entries: [],
                id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
                navigationType: r
            }
        }
          , p = function(e, n, t) {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                    var r = new PerformanceObserver((function(e) {
                        Promise.resolve().then((function() {
                            n(e.getEntries())
                        }
                        ))
                    }
                    ));
                    return r.observe(Object.assign({
                        type: e,
                        buffered: !0
                    }, t || {})),
                    r
                }
            } catch (e) {}
        }
          , l = function(e, n, t, r) {
            var i, o;
            return function(a) {
                n.value >= 0 && (a || r) && ((o = n.value - (i || 0)) || void 0 === i) && (i = n.value,
                n.delta = o,
                n.rating = function(e, n) {
                    return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good"
                }(n.value, t),
                e(n))
            }
        }
          , f = function(e) {
            requestAnimationFrame((function() {
                return requestAnimationFrame((function() {
                    return e()
                }
                ))
            }
            ))
        }
          , v = function(e) {
            document.addEventListener("visibilitychange", (function() {
                "hidden" === document.visibilityState && e()
            }
            ))
        }
          , m = function(e) {
            var n = !1;
            return function() {
                n || (e(),
                n = !0)
            }
        }
          , h = -1
          , g = function() {
            return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
        }
          , y = function(e) {
            "hidden" === document.visibilityState && h > -1 && (h = "visibilitychange" === e.type ? e.timeStamp : 0,
            E())
        }
          , b = function() {
            addEventListener("visibilitychange", y, !0),
            addEventListener("prerenderingchange", y, !0)
        }
          , E = function() {
            removeEventListener("visibilitychange", y, !0),
            removeEventListener("prerenderingchange", y, !0)
        }
          , w = function() {
            return h < 0 && (h = g(),
            b(),
            c((function() {
                setTimeout((function() {
                    h = g(),
                    b()
                }
                ), 0)
            }
            ))),
            {
                get firstHiddenTime() {
                    return h
                }
            }
        }
          , O = function(e) {
            document.prerendering ? addEventListener("prerenderingchange", (function() {
                return e()
            }
            ), !0) : e()
        }
          , _ = [1800, 3e3]
          , S = function(e, n) {
            n = n || {},
            O((function() {
                var t, r = w(), i = d("FCP"), o = p("paint", (function(e) {
                    e.forEach((function(e) {
                        "first-contentful-paint" === e.name && (o.disconnect(),
                        e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - u(), 0),
                        i.entries.push(e),
                        t(!0)))
                    }
                    ))
                }
                ));
                o && (t = l(e, i, _, n.reportAllChanges),
                c((function(r) {
                    i = d("FCP"),
                    t = l(e, i, _, n.reportAllChanges),
                    f((function() {
                        i.value = performance.now() - r.timeStamp,
                        t(!0)
                    }
                    ))
                }
                )))
            }
            ))
        }
          , P = (new Map,
        [2500, 4e3])
          , C = {}
          , T = [800, 1800]
          , D = function(e, n) {
            n = n || {};
            var t = d("TTFB")
              , r = l(e, t, T, n.reportAllChanges);
            !function e(n) {
                document.prerendering ? O((function() {
                    return e(n)
                }
                )) : "complete" !== document.readyState ? addEventListener("load", (function() {
                    return e(n)
                }
                ), !0) : setTimeout(n, 0)
            }((function() {
                var i = s();
                i && (t.value = Math.max(i.responseStart - u(), 0),
                t.entries = [i],
                r(!0),
                c((function() {
                    t = d("TTFB", 0),
                    (r = l(e, t, T, n.reportAllChanges))(!0)
                }
                )))
            }
            ))
        }
          , j = (new Date,
        t("RgX2"))
          , L = t("cBaE")
          , B = t("+SFn");
        function A(e, n) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                n && (r = r.filter((function(n) {
                    return Object.getOwnPropertyDescriptor(e, n).enumerable
                }
                ))),
                t.push.apply(t, r)
            }
            return t
        }
        function I(e) {
            for (var n = 1; n < arguments.length; n++) {
                var t = null != arguments[n] ? arguments[n] : {};
                n % 2 ? A(Object(t), !0).forEach((function(n) {
                    Object(r.a)(e, n, t[n])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : A(Object(t)).forEach((function(n) {
                    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                }
                ))
            }
            return e
        }
        var R = ["fcp", "lcp", "ttfb"]
          , H = function() {
            function e() {
                var n = this;
                Object(i.a)(this, e),
                this.count = void 0,
                this.performanceData = void 0,
                this.baseInfo = void 0,
                this.enabledReport = void 0,
                this.sendAfterCollection = void 0,
                this.supportsTTFB = function() {
                    var e, n, t = null === (e = performance) || void 0 === e || null === (n = e.getEntriesByType) || void 0 === n ? void 0 : n.call(e, "navigation")[0];
                    return t && t.responseStart > 0 && t.responseStart < performance.now()
                }
                ,
                this.sendEvent = function(e) {
                    n.enabledReport && null !== n.baseInfo && (n.enabledReport = !1,
                    Object(j.f)(I(I({}, n.performanceData), n.baseInfo), e),
                    n.removePageHideListener())
                }
                ,
                this.setMetricValue = function(e) {
                    var t = null !== e && void 0 !== e ? e : {}
                      , r = t.name
                      , i = t.value
                      , o = t.navigationType
                      , a = r.toLocaleLowerCase();
                    R.includes(a) && ("number" !== typeof n.performanceData[a] && (n.count -= 1,
                    n.setBaseInfo(o)),
                    n.performanceData[a] = Math.round(i),
                    0 === n.count && n.sendAfterCollection && (L.A ? B.g.getAppInfo().then((function() {
                        n.sendEvent(!0)
                    }
                    )) : n.sendEvent(!0)))
                }
                ,
                this.handleVisibilitychange = function() {
                    console.log("handleVisibilitychange"),
                    "hidden" === document.visibilityState && n.sendEvent(!0)
                }
                ,
                this.handlePagehide = function() {
                    console.log("handlePagehide"),
                    n.sendEvent(!0)
                }
                ,
                this.addPageHideListener = function() {
                    console.log("addPageHideListener"),
                    L.A ? B.g.addEventListener("viewDidDisappear", n.handlePagehide) : (window.addEventListener("visibilitychange", n.handleVisibilitychange),
                    window.addEventListener("pagehide", n.handlePagehide))
                }
                ,
                this.removePageHideListener = function() {
                    console.log("removePageHideListener"),
                    L.A ? B.g.removeEventListener("viewDidDisappear", n.handlePagehide) : (window.removeEventListener("pagehide", n.handlePagehide),
                    window.removeEventListener("visibilitychange", n.handleVisibilitychange))
                }
                ,
                this.enabledReport = !1,
                this.sendAfterCollection = !1,
                this.performanceData = {},
                this.baseInfo = null,
                this.isHeadless() || (Object(j.a)(),
                this.startPerformanceRecord())
            }
            return Object(o.a)(e, [{
                key: "isHeadless",
                value: function() {
                    return window.navigator.userAgent.includes("HeadlessChrome") || !window.navigator.languages || window.navigator.webdriver || !1
                }
            }, {
                key: "supportsFCP",
                value: function() {
                    return "PerformanceObserver"in window && "supportedEntryTypes"in PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes("paint")
                }
            }, {
                key: "supportsLCP",
                value: function() {
                    return "PerformanceObserver"in window && "supportedEntryTypes"in PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")
                }
            }, {
                key: "setBaseInfo",
                value: function(e) {
                    if (null === this.baseInfo) {
                        var n = window.performance.getEntriesByType("resource").filter((function(e) {
                            return ["script", "link"].includes(e.initiatorType) && e.name.includes("shopee")
                        }
                        ))
                          , t = n.length
                          , r = 0;
                        n.forEach((function(e) {
                            (["cache", "navigational-prefetch"].includes(e.deliveryType) || 0 === e.transferSize || e.duration < 10) && (r += 1)
                        }
                        )),
                        this.baseInfo = {
                            page_url: location.origin + location.pathname,
                            query: location.search.slice(0, 512),
                            total_resource: t,
                            cache_resource: r,
                            navigation_type: e
                        }
                    }
                }
            }, {
                key: "startPerformanceRecord",
                value: function() {
                    this.enabledReport = !0,
                    this.count = 3;
                    var e = "hidden" !== document.visibilityState;
                    this.supportsLCP() && e ? function(e, n) {
                        n = n || {},
                        O((function() {
                            var t, r = w(), i = d("LCP"), o = function(e) {
                                n.reportAllChanges || (e = e.slice(-1)),
                                e.forEach((function(e) {
                                    e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - u(), 0),
                                    i.entries = [e],
                                    t())
                                }
                                ))
                            }, a = p("largest-contentful-paint", o);
                            if (a) {
                                t = l(e, i, P, n.reportAllChanges);
                                var s = m((function() {
                                    C[i.id] || (o(a.takeRecords()),
                                    a.disconnect(),
                                    C[i.id] = !0,
                                    t(!0))
                                }
                                ));
                                ["keydown", "click"].forEach((function(e) {
                                    addEventListener(e, (function() {
                                        return e = s,
                                        n = self.requestIdleCallback || self.setTimeout,
                                        t = -1,
                                        e = m(e),
                                        "hidden" === document.visibilityState ? e() : (t = n(e),
                                        v(e)),
                                        t;
                                        var e, n, t
                                    }
                                    ), !0)
                                }
                                )),
                                v(s),
                                c((function(r) {
                                    i = d("LCP"),
                                    t = l(e, i, P, n.reportAllChanges),
                                    f((function() {
                                        i.value = performance.now() - r.timeStamp,
                                        C[i.id] = !0,
                                        t(!0)
                                    }
                                    ))
                                }
                                ))
                            }
                        }
                        ))
                    }(this.setMetricValue, {
                        reportAllChanges: !0
                    }) : (this.count -= 1,
                    this.sendAfterCollection = !0),
                    this.supportsFCP() && e ? S(this.setMetricValue) : this.count -= 1,
                    this.supportsTTFB() ? D(this.setMetricValue) : this.count -= 1,
                    this.addPageHideListener()
                }
            }]),
            e
        }();
        n.a = H
    },
    RgX2: function(e, n, t) {
        "use strict";
        t.d(n, "a", (function() {
            return E
        }
        )),
        t.d(n, "f", (function() {
            return O
        }
        )),
        t.d(n, "e", (function() {
            return _
        }
        )),
        t.d(n, "k", (function() {
            return S
        }
        )),
        t.d(n, "i", (function() {
            return P
        }
        )),
        t.d(n, "h", (function() {
            return C
        }
        )),
        t.d(n, "g", (function() {
            return T
        }
        )),
        t.d(n, "j", (function() {
            return D
        }
        )),
        t.d(n, "d", (function() {
            return j
        }
        )),
        t.d(n, "c", (function() {
            return L
        }
        )),
        t.d(n, "b", (function() {
            return A
        }
        ));
        var r = t("ODXe")
          , i = t("HaE+")
          , o = t("o0o1")
          , a = t.n(o);
        "undefined" !== typeof globalThis && "undefined" === typeof globalThis.self && (globalThis.self = globalThis);
        var c, s, u = t("GgeO"), d = t("cBaE"), p = t("kWRe"), l = t("w/Rt"), f = t("0LPd"), v = t("nLqX"), m = t("7Cbv"), h = t("+SFn"), g = function() {
            var e = navigator.userAgent
              , n = e.match(/(Android|OS)\s+(\d+(.\d)*)(;\s+([^)]+))?/);
            return {
                os: n && n.length ? "Android" === n[1] ? u.OS.Android : u.OS.iOS : u.OS.PC_WEB,
                info: n,
                ua: e
            }
        }, y = function(e, n) {
            var t = g()
              , r = t.os
              , i = t.info
              , o = t.ua
              , a = r === u.OS.PC_WEB ? "" : i[2]
              , c = i && i.length ? i[5] : "PC"
              , s = Date.now();
            return {
                id: e,
                sceneId: n,
                uid: Object(d.y)(),
                ua: o,
                os: r,
                osVersion: a,
                deviceModel: c,
                timestamp: s,
                rnVersion: Object(p.a)("shopee_rn_version"),
                appType: Object(d.m)(),
                country: "id",
                clientVersion: Object(p.a)("shopee_app_version") || navigator.appVersion
            }
        }, b = function(e, n) {
            var t = g()
              , r = t.os
              , i = t.info
              , o = r === u.OS.PC_WEB ? "" : i[2]
              , a = Date.now()
              , c = Object(d.y)()
              , s = Object(p.a)("shopee_rn_version")
              , l = Object(p.a)("shopee_app_version") || navigator.appVersion
              , f = Object(d.m)();
            return {
                event_id: Object(m.a)(),
                type: e,
                scene_id: n,
                uid: c,
                os_version: o,
                client_ts: a,
                rn_version: s,
                country: "id",
                client_version: l,
                app_type: f
            }
        }, E = function() {
            return s || (s = Object(u.createReporter)({
                url: "".concat(l.x, "/apmapi/v1/event"),
                frequency: 1e4,
                storeName: "apm",
                debug: Object(v.a)("reporter"),
                buildCommonHeader: function() {
                    var e = Object(i.a)(a.a.mark((function e() {
                        var n, t, r;
                        return a.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (!d.A) {
                                        e.next = 6;
                                        break
                                    }
                                    return e.next = 3,
                                    h.g.getAppInfo();
                                case 3:
                                    return n = e.sent,
                                    t = g(),
                                    r = t.os,
                                    e.abrupt("return", {
                                        os: r,
                                        device_id: n.deviceID,
                                        device_model: n.model,
                                        ua: navigator.userAgent
                                    });
                                case 6:
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
            })),
            s
        }, w = function(e) {
            E().commit({
                liveEventType: "ApiRequestEvent",
                body: e,
                body_format: u.BodyFormat.PB,
                header: b(u.EventID.ApiRequest, u.SceneID.H5)
            })
        }, O = function(e, n) {
            E().commit({
                liveEventType: "WebPerformanceEvent",
                body: e,
                body_format: u.BodyFormat.PB,
                header: b(u.EventID.WebPerformance, u.SceneID.H5)
            }, n)
        }, _ = function(e) {
            (c || (c = Object(u.createReporter)({
                url: "".concat(l.y, "/dataapi/dataweb/event/reportPB"),
                frequency: 1e4,
                debug: Object(v.a)("reporter"),
                requestOptions: {
                    headers: {
                        "X-Livestreaming-Source": d.G ? f.a.SELLER_SUB_ACCOUNT : f.a.SHOPEE_ACCOUNT
                    }
                }
            })),
            c).commit({
                liveEventType: "StreamHeartbeatEvent",
                body: e,
                header: y(u.EventID.StreamHeartbeatEvent, u.MMCSceneID.LiveStreaming)
            })
        }, S = function(e) {
            console.log("reportWSStartConnectEvent", b(u.EventID.WsConnectStart, u.SceneID.H5)),
            E().commit({
                liveEventType: "WsConnectStartEvent",
                body: e,
                body_format: u.BodyFormat.PB,
                header: b(u.EventID.WsConnectStart, u.SceneID.H5)
            })
        }, P = function(e) {
            E().commit({
                liveEventType: "WsConnectSucceedEvent",
                body: e,
                body_format: u.BodyFormat.PB,
                header: b(u.EventID.WsConnectSucceed, u.SceneID.H5)
            })
        }, C = function(e) {
            E().commit({
                liveEventType: "WsConnectFailedEvent",
                body: e,
                body_format: u.BodyFormat.PB,
                header: b(u.EventID.WsConnectFailed, u.SceneID.H5)
            })
        }, T = function(e) {
            E().commit({
                liveEventType: "WsConnectCloseEvent",
                body: e,
                body_format: u.BodyFormat.PB,
                header: b(u.EventID.WsConnectClose, u.SceneID.H5)
            })
        }, D = function(e) {
            E().commit({
                liveEventType: "WsReceiveMessageEvent",
                body: e,
                body_format: u.BodyFormat.PB,
                header: b(u.EventID.WsReceiveMessage, u.SceneID.H5)
            })
        }, j = function(e) {
            return e.startsWith("http") ? e : e.startsWith("/") ? "".concat(window.location.origin).concat(e) : "".concat(window.location.origin, "/").concat(e)
        }, L = function(e) {
            var n = j(e);
            return /(?=.*(shopee|xiapi))(?=.*api)^.*$/.test(n)
        }, B = function(e) {
            var n = e.http_method.toUpperCase()
              , t = e.url.split("?")
              , i = Object(r.a)(t, 2)
              , o = i[0]
              , a = i[1];
            return e.url = o,
            e.params = "string" === typeof e.params ? e.params : a,
            e.http_method = n,
            e
        }, A = function() {
            var e = 0
              , n = new Map;
            return console.log("reporter: initialized"),
            {
                onRequest: function(t) {
                    var r = t;
                    e++,
                    r.meta = {},
                    r.meta.id = e,
                    n.set(r.meta.id, Date.now()),
                    r.meta.url = j(t.url)
                },
                onError: function(e) {
                    var t, r = e, i = r.config;
                    L(i.meta.url) && function(e, n, t) {
                        if (L(e.meta.url)) {
                            var r = e.meta.id
                              , i = n.get(r)
                              , o = {};
                            o.duration = Date.now() - i,
                            o.url = e.meta.url,
                            o.params = e.body,
                            o.http_code = 0,
                            o.http_method = e.method,
                            o.client_code = u.ClientErrCode.NETWORK_ERR,
                            o.extra = t,
                            n.delete(r),
                            w(B(o))
                        }
                    }(i, n, null === (t = r.error) || void 0 === t ? void 0 : t.type)
                },
                onResponse: function(e) {
                    var t, r, i = e.config;
                    if (L(i.meta.url)) {
                        var o = i.meta.id
                          , a = n.get(o)
                          , c = {};
                        c.duration = Date.now() - a,
                        c.http_code = e.status,
                        c.url = i.meta.url,
                        c.http_method = i.method,
                        c.params = i.body;
                        var s, d, p = e.response;
                        if ("text" === (null === (t = i.xhr) || void 0 === t ? void 0 : t.responseType) || null === (r = i.xhr) || void 0 === r || !r.responseType)
                            try {
                                p = JSON.parse(i.xhr.responseText)
                            } catch (l) {}
                        if (p)
                            c.biz_code = (null === (s = p.err_code) || void 0 === s ? void 0 : s.toString()) || (null === (d = p.code) || void 0 === d ? void 0 : d.toString()),
                            c.err_msg = p.err_msg || p.msg,
                            c.client_code = u.ClientErrCode.OK;
                        else
                            c.client_code = u.ClientErrCode.ERR,
                            c.err_msg = "Failed to read JSON Response";
                        w(B(c))
                    }
                }
            }
        }
    },
    nLqX: function(e, n, t) {
        "use strict";
        t.d(n, "a", (function() {
            return i
        }
        ));
        var r = null
          , i = function(e) {
            try {
                if (!r) {
                    var n = new URLSearchParams(window.location.search);
                    r = n.get("debug").split(",")
                }
                return r.includes(e) || r.includes("godmode")
            } catch (t) {
                return !1
            }
        }
    }
}]);
//# 4277675af0e98774bf0b6b6207b40e255a1c3894.e7f4b0f52974433a2062.js.map
