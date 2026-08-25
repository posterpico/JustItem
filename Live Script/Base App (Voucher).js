_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([[88], {
    JhLo: function(t, e, n) {
        "use strict";
        n.r(e);
        var r, c = n("1OyB"), a = n("vuIU"), o = n("Ji7U"), s = n("md7G"), u = n("foSv"), i = n("HaE+"), p = n("o0o1"), f = n.n(p), l = n("q1tI"), d = n.n(l), h = n("qXug"), b = n("fgu8"), y = n("+SFn"), v = n("+Wxn"), m = n("cBaE"), w = n("I4pH"), g = n("XAkn"), O = n("RRtB"), x = n("K60g"), j = d.a.createElement;
        function k(t) {
            var e = function() {
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
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var n, r = Object(u.a)(t);
                if (e) {
                    var c = Object(u.a)(this).constructor;
                    n = Reflect.construct(r, arguments, c)
                } else
                    n = r.apply(this, arguments);
                return Object(s.a)(this, n)
            }
        }
        m.E && (r = new x.a);
        var _ = Object(g.a)((function(t, e) {
            Object(O.e)((function(t) {
                var n;
                (null === (n = e.current) || void 0 === n ? void 0 : n.style) && (e.current.style.width = "".concat(t, "px"))
            }
            ), (function(t) {
                var n;
                (null === (n = e.current) || void 0 === n ? void 0 : n.style) && (e.current.style.height = "".concat(t, "px"))
            }
            ))
        }
        ))("div")
          , I = function(t) {
            return function() {
                var e = Object(i.a)(f.a.mark((function e(n, r, c) {
                    return f.a.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                Object(v.b)({
                                    operation: t,
                                    page_type: n,
                                    target_type: r
                                }, {
                                    streaming_id: c.streamingId,
                                    from_source: c.fromSource,
                                    ctx_streaming_id: c.ctxStreamingId,
                                    ctx_from_source: c.ctxFromSource
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
                return function(t, n, r) {
                    return e.apply(this, arguments)
                }
            }()
        }
          , P = I("impression")
          , S = I("click")
          , E = function(t) {
            Object(o.a)(n, t);
            var e = k(n);
            function n() {
                var t;
                Object(c.a)(this, n);
                for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
                    a[o] = arguments[o];
                return (t = e.call.apply(e, [this].concat(a))).state = {
                    sessionId: 0,
                    fromSource: "",
                    record: [],
                    beBrowser: !1,
                    shareUserId: ""
                },
                t.onClickOpenApp = function() {
                    var e = t.state
                      , n = e.sessionId
                      , r = e.fromSource;
                    S("streaming_room_over", "open_shopee", {
                        streamingId: n,
                        fromSource: r
                    })
                }
                ,
                t.onGetRecordCallback = function(e) {
                    t.setState({
                        record: e
                    })
                }
                ,
                t
            }
            return Object(a.a)(n, [{
                key: "componentDidMount",
                value: function() {
                    Object(y.f)({
                        config: {
                            disableReload: 1,
                            disableBounce: 1
                        },
                        navbar: {
                            isTransparent: 1,
                            navbarStyle: 1
                        }
                    });
                    var t = Object(m.K)(location.search)
                      , e = t.session
                      , n = t.share_user_id
                      , r = t.record
                      , c = parseInt(e, 10)
                      , a = Object(m.K)(location.hash);
                    "share" === a.from_source && P("streaming_room_over", "open_shopee", {
                        streamingId: c,
                        fromSource: a.from_source
                    }),
                    this.setState({
                        fromSource: a.from_source || "",
                        sessionId: c,
                        beBrowser: !m.A,
                        shareUserId: n,
                        record: r ? [r] : []
                    }),
                    y.g.removeWebViewBottomInset()
                }
            }, {
                key: "render",
                value: function() {
                    return j(d.a.Fragment, null, j(w.a, null, j(_, {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 auto"
                        }
                    }, this.state.beBrowser ? j("div", {
                        onClick: this.onClickOpenApp,
                        style: {
                            display: "flex",
                            flexShrink: 0,
                            zIndex: 20,
                            top: 0
                        }
                    }, j(b.a, {
                        sessionId: this.state.sessionId,
                        type: "live-end",
                        record: this.state.record,
                        shareUserId: this.state.shareUserId
                    })) : null, j(h.a, {
                        onGetRecordCallback: this.onGetRecordCallback,
                        trackData: {
                            sessionId: this.state.sessionId,
                            streamerId: +Object(m.K)(location.search).host_user_id
                        },
                        performance: r
                    }))))
                }
            }]),
            n
        }(l.Component);
        e.default = E
    },
    LPsL: function(t, e, n) {
        "use strict";
        var r = n("rePB")
          , c = n("q1tI")
          , a = n.n(c).a.createElement;
        function o(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                e && (r = r.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function s(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? o(Object(n), !0).forEach((function(e) {
                    Object(r.a)(t, e, n[e])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach((function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }
                ))
            }
            return t
        }
        var u = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , e = t.imgUrl
              , n = t.style
              , r = t.maskStyle;
            return a("div", {
                style: s({
                    position: "absolute",
                    left: "-4px",
                    top: "-4px",
                    right: 0,
                    bottom: 0,
                    zIndex: "-1",
                    overflow: "hidden"
                }, n)
            }, a("div", {
                style: {
                    height: "100%",
                    width: "100%",
                    padding: "4px",
                    backgroundImage: "url(".concat(e, ")"),
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    filter: "blur(25px)"
                }
            }), a("div", {
                style: s({
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.45)"
                }, r)
            }))
        };
        u.defaultProps = {
            imgUrl: "",
            style: {}
        },
        e.a = u
    },
    WzRY: function(t, e, n) {
        "use strict";
        n.d(e, "m", (function() {
            return s
        }
        )),
        n.d(e, "k", (function() {
            return i
        }
        )),
        n.d(e, "p", (function() {
            return f
        }
        )),
        n.d(e, "j", (function() {
            return d
        }
        )),
        n.d(e, "i", (function() {
            return b
        }
        )),
        n.d(e, "b", (function() {
            return v
        }
        )),
        n.d(e, "f", (function() {
            return w
        }
        )),
        n.d(e, "v", (function() {
            return O
        }
        )),
        n.d(e, "g", (function() {
            return j
        }
        )),
        n.d(e, "a", (function() {
            return _
        }
        )),
        n.d(e, "t", (function() {
            return P
        }
        )),
        n.d(e, "e", (function() {
            return E
        }
        )),
        n.d(e, "u", (function() {
            return D
        }
        )),
        n.d(e, "d", (function() {
            return C
        }
        )),
        n.d(e, "c", (function() {
            return q
        }
        )),
        n.d(e, "r", (function() {
            return N
        }
        )),
        n.d(e, "n", (function() {
            return A
        }
        )),
        n.d(e, "s", (function() {
            return F
        }
        )),
        n.d(e, "q", (function() {
            return K
        }
        )),
        n.d(e, "h", (function() {
            return X
        }
        )),
        n.d(e, "o", (function() {
            return M
        }
        )),
        n.d(e, "l", (function() {
            return V
        }
        ));
        var r = n("HaE+")
          , c = n("o0o1")
          , a = n.n(c)
          , o = n("xds5");
        function s(t) {
            return u.apply(this, arguments)
        }
        function u() {
            return (u = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/replay", {
                                params: {
                                    session_id: e
                                }
                            });
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function i(t) {
            return p.apply(this, arguments)
        }
        function p() {
            return (p = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                             o.d.get("/session/".concat(e.session, "/voucher/applicable_items"), {
                                        params: {
                                  offset: e.offset,
                                  promotion_id: 1491718759661568,
                                  voucher_code: "FSV-1008742931942604800",
                                  limit: 100
                                 }
                            });
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function f(t) {
            return l.apply(this, arguments)
        }
        function l() {
            return (l = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function d(t) {
            return h.apply(this, arguments)
        }
        function h() {
            return (h = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/insight"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function b(t, e) {
            return y.apply(this, arguments)
        }
        function y() {
            return (y = Object(r.a)(a.a.mark((function t(e, n) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/incentive_task/overview?refresh=").concat(n));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function v(t, e) {
            return m.apply(this, arguments)
        }
        function m() {
            return (m = Object(r.a)(a.a.mark((function t(e, n) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.post("/session/".concat(e, "/incentive_task/claim"), {
                                pending_claim_task_infos: n
                            });
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function w(t) {
            return g.apply(this, arguments)
        }
        function g() {
            return (g = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/message/ai_reply?offset=0&limit=10&only_count=true"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function O(t, e) {
            return x.apply(this, arguments)
        }
        function x() {
            return (x = Object(r.a)(a.a.mark((function t(e, n) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.post("/shop_page/replay/add", {
                                session_id: +e,
                                show_on_shop_page: n
                            });
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function j(t) {
            return k.apply(this, arguments)
        }
        function k() {
            return (k = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/coin/giveout"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function _(t) {
            return I.apply(this, arguments)
        }
        function I() {
            return (I = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/violation/check"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function P() {
            return S.apply(this, arguments)
        }
        function S() {
            return (S = Object(r.a)(a.a.mark((function t() {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/subtitle/list");
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function E(t) {
            return B.apply(this, arguments)
        }
        function B() {
            return (B = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.post("/session/".concat(e, "/end"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function D(t) {
            return R.apply(this, arguments)
        }
        function R() {
            return (R = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.put("/session/".concat(e.session), e);
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function C(t) {
            return U.apply(this, arguments)
        }
        function U() {
            return (U = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.delete("/auction/session/".concat(e, "/config"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function q(t) {
            return z.apply(this, arguments)
        }
        function z() {
            return (z = Object(r.a)(a.a.mark((function t(e) {
                var n, r, c, s = arguments;
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return n = s.length > 1 && void 0 !== s[1] ? s[1] : {},
                            r = n.isFollowersOnly,
                            c = void 0 === r || r,
                            t.next = 3,
                            o.d.post("/auction/session/".concat(e, "/config"), {
                                rule: 1,
                                participation: c ? 1 : 0
                            });
                        case 3:
                            return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function N(t, e) {
            return W.apply(this, arguments)
        }
        function W() {
            return (W = Object(r.a)(a.a.mark((function t(e, n) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.post("/session/".concat(e, "/show_item"), n);
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function A(t) {
            return J.apply(this, arguments)
        }
        function J() {
            return (J = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/cover/quality"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function F(t) {
            return G.apply(this, arguments)
        }
        function G() {
            return (G = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/viewer_traffic"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function K(t) {
            return L.apply(this, arguments)
        }
        function L() {
            return (L = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/suggestion"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function X() {
            return H.apply(this, arguments)
        }
        function H() {
            return (H = Object(r.a)(a.a.mark((function t() {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/activity");
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function M(t) {
            return T.apply(this, arguments)
        }
        function T() {
            return (T = Object(r.a)(a.a.mark((function t(e) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/diagnose"));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        function V(t, e) {
            return Y.apply(this, arguments)
        }
        function Y() {
            return (Y = Object(r.a)(a.a.mark((function t(e, n) {
                return a.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            o.d.get("/session/".concat(e, "/qc_banner?language=").concat(n));
                        case 2:
                            return t.abrupt("return", t.sent);
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
    },
    bWvD: function(t, e, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/viewer-end", function() {
            return n("JhLo")
        }
        ])
    },
    c2Ma: function(t, e, n) {},
    goda: function(t, e, n) {
        "use strict";
        n.d(e, "a", (function() {
            return i
        }
        ));
        var r = n("rePB")
          , c = n("q1tI")
          , a = n.n(c)
          , o = (n("c2Ma"),
        a.a.createElement);
        function s(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                e && (r = r.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function u(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? s(Object(n), !0).forEach((function(e) {
                    Object(r.a)(t, e, n[e])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }
                ))
            }
            return t
        }
        function i(t) {
            var e, n = t.color ? "".concat(null !== (e = t.borderWidth) && void 0 !== e ? e : 1, "px solid ").concat(t.color) : null, r = t.size ? {
                width: t.size,
                height: t.size
            } : {};
            return o("div", {
                className: "c-Spinner"
            }, o("div", {
                className: "c-Spinner--icon",
                style: u({
                    border: n,
                    borderBottomColor: "transparent"
                }, r)
            }))
        }
    }
}, [["bWvD", 0, 1, 18, 3, 2, 4, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 22, 21, 26, 29, 39, 7]]]);
//# viewer-end-46122323617c9be61a62.js.map
