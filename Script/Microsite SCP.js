"use strict";
(self.webpackChunk_shopee_page_builder_pcmall = self.webpackChunk_shopee_page_builder_pcmall || []).push([
    [2781], {
        26474: (t, e, s) => {
            s.r(e), s.d(e, {
                Collection: () => ve,
                ItemCard: () => Ot,
                Teaser: () => ie
            });
            var i = s(87363),
                o = s.n(i),
                n = s(19826),
                r = s.n(n),
                a = s(81523),
                l = function(t, e, s) {
                    if (Array.isArray(e) && e.length)
                        for (let i = 0, o = e.length; i < o; i++) {
                            const o = e[i];
                            if (!t || !Object.prototype.hasOwnProperty.call(t, o)) return s;
                            t = t[o]
                        }
                    return t
                },
                c = s(47922),
                m = s(36094);
            const d = i.createContext({
                item: null,
                locale: null,
                manifest: null
            });

            function _(t) {
                return function(e) {
                    return (0, m.jsx)(d.Consumer, {
                        children: ({
                            item: s,
                            locale: i,
                            manifest: o
                        }) => (0, m.jsx)(t, (0, c.Z)({
                            item: s,
                            locale: i,
                            manifest: o
                        }, e))
                    })
                }
            }
            const u = d;
            class h extends i.Component {
                constructor(t) {
                    super(t);
                    const {
                        item: e,
                        locale: s,
                        manifest: i
                    } = t;
                    this.state = {
                        item: e,
                        locale: s,
                        manifest: i
                    }
                }
                componentDidUpdate(t) {
                    const {
                        item: e,
                        locale: s,
                        manifest: i
                    } = this.props, {
                        item: o,
                        manifest: n
                    } = t;
                    e && s && (e !== o || i !== n) && this.setState({
                        item: e,
                        locale: s,
                        manifest: i
                    })
                }
                render() {
                    const {
                        children: t
                    } = this.props;
                    return (0, m.jsx)(u.Provider, {
                        value: this.state,
                        children: t
                    })
                }
            }
            const p = h;
            var S = s(76749),
                I = s(93476),
                T = s(34770),
                g = s(63837);
            const E = s.p + "pagebuilder/e0d1677a58deaa693aa9.png",
                C = s.p + "pagebuilder/3d819965643f1287ea73.png",
                f = s.p + "pagebuilder/f897d97e691bc43c7b91.png";
            var w = s(56008);
            const N = ({
                    className: t,
                    soldOutText: e,
                    i18nCollection: s
                }) => {
                    const i = (0, w.Z)(s, ["text_sold_out"], "");
                    return (0, m.jsx)("div", {
                        className: r()("E6gonQ", t),
                        children: (0, m.jsx)("div", {
                            className: "z4CamU",
                            children: (0, m.jsx)("div", {
                                className: "hS0p87",
                                children: e || i || "Sold Out"
                            })
                        })
                    })
                },
                x = {
                    itemImage: "j01ojt",
                    wrapper: "Au2Naa"
                };
            var A = function(t) {
                    var e = t.item,
                        s = t.options;
                    return e && 0 === e.stock && ! function(t) {
                        return Boolean(t && t.preview_info)
                    }(e) && !L({
                        item: e,
                        options: s
                    }) && s && s.badges.showSoldOutBadge
                },
                L = function(t) {
                    var e = t.item,
                        s = t.options;
                    return e && e.welcome_package_type && 0 === e.price && s && s.badges.showFreeBadge
                },
                O = s(32718);

            function y({
                Icon: t,
                className: e
            }) {
                return (0, m.jsx)("div", {
                    className: r()("shopee-image-placeholder", e),
                    children: t ? (0, m.jsx)(t, {}) : (0, m.jsx)(O.Z, {})
                })
            }
            const M = ({
                item: t,
                isUserAdult: e,
                adultAge: s,
                getImageUrl: i,
                className: o,
                placeholderClassName: n,
                children: a,
                maskAdultImageWhenApplicable: l,
                useTransparentBackgroundImage: c,
                useThumbnailImage: d = !0,
                showSoldOutBadge: _ = !0,
                i18nCollection: u
            }) => {
                var h;
                const p = (0, g.Kd)(),
                    S = !(!(l && t && t.is_adult) || "SG" === p && null != (h = t.adult_types) && h.includes(1) || e),
                    T = (t => {
                        switch (t) {
                            case 18:
                            default:
                                return E;
                            case 20:
                                return C;
                            case 21:
                                return f
                        }
                    })(null != t && t.adult_age_threshold && [18, 20, 21].includes(t.adult_age_threshold) ? null == t ? void 0 : t.adult_age_threshold : s),
                    L = (0, w.Z)(t, ["overlay_image"], "") || (0, w.Z)(t, ["image"]),
                    M = S ? T : t ? i(c && t.transparent_background_image ? t.transparent_background_image : L, d) : null;
                return t ? (0, m.jsx)("div", {
                    style: {
                        pointerEvents: "none"
                    },
                    children: (0, m.jsxs)(I.p, {
                        useImgTag: !0,
                        className: r()(x.itemImage, S && x.adultImage, o),
                        wrapperClassName: r()(x.wrapper),
                        placeholderClassName: n,
                        src: M,
                        alt: t.name ? t.name : "",
                        customPlaceholder: (0, m.jsx)(y, {
                            Icon: O.Z
                        }),
                        children: [A({
                            item: t,
                            options: {
                                badges: {
                                    showSoldOutBadge: _
                                }
                            }
                        }) ? (0, m.jsx)(N, {
                            i18nCollection: u
                        }) : null, a]
                    })
                }) : null
            };
            M.defaultProps = {
                useTransparentBackgroundImage: !1
            };
            const b = _(M);
            var v = s(80437);
            const {
                t: R
            } = v.I18n;

            function U(t) {
                let e = (0, c.Z)({}, ((0, S.Z)(t), t));
                const s = R("item_card_label_sold_out");
                return (0, m.jsx)(b, (0, c.Z)({
                    i18nCollection: {
                        text_sold_out: s
                    }
                }, e))
            }
            const F = _((({
                item: t,
                className: e,
                enableGeneratedName: s = !1
            }) => {
                const i = (0, w.Z)(t, ["autogen_title"], null),
                    o = s && i;
                return t && (t.name || o) ? (0, m.jsx)("div", {
                    "aria-hidden": "true",
                    className: r()("I98eAi", e),
                    children: o ? i : t.name
                }) : null
            }));
            let P = function(t) {
                return t.CUSTOM = "CUSTOM", t.PREFERRED = "PREFERRED", t.OFFICIAL_SHOP = "OFFICIAL_SHOP", t.SBS = "SBS", t.PREFERRED_PLUS = "PREFERRED_PLUS", t.TOP_PRODUCTS = "TOP_PRODUCTS", t.S_MART = "S_MART", t.PREMIUM = "PREMIUM", t.MALL_FBS = "MALL_FBS", t.FLAGSHIP_SHOP = "FLAGSHIP_SHOP", t.CHOICE = "CHOICE", t
            }({});
            P.CUSTOM, P.CUSTOM;
            var j = s(98246),
                D = s(99387),
                H = s(8731),
                G = s(3735),
                k = Object.defineProperty;

            function B(t, e) {
                const s = e.isSupported.bind(this, t),
                    i = e.getItem.bind(this, t),
                    o = e.setItem.bind(this, t),
                    n = e.removeItem.bind(this, t);
                return {
                    read: i,
                    get: i,
                    getItem: i,
                    write: o,
                    set: o,
                    setItem: o,
                    remove: n,
                    removeItem: n,
                    clear: e.clear.bind(this, t),
                    isSupported: s
                }
            }
            var Z = {};
            ((t, e) => {
                for (var s in e) k(t, s, {
                    get: e[s],
                    enumerable: !0
                })
            })(Z, {
                clear: () => V,
                getItem: () => $,
                isSupported: () => W,
                removeItem: () => X,
                setItem: () => Q
            });
            var W = t => {
                    const e = "SPC_" + t + "_TEST_KEY";
                    try {
                        return !(!self || !self[t] || (self[t].setItem(e, e), self[t].removeItem(e), 0))
                    } catch (s) {
                        return !1
                    }
                },
                $ = (t, e) => {
                    try {
                        if (window && window[t]) {
                            const s = window[t].getItem(e);
                            return s ? JSON.parse(s) : void 0
                        }
                    } catch (s) {
                        return
                    }
                },
                Q = (t, e, s) => {
                    try {
                        if (window && window[t]) {
                            const i = JSON.stringify(s);
                            window[t].setItem(e, i)
                        }
                    } catch (i) {}
                },
                X = (t, e) => {
                    try {
                        window && window[t] && window[t].removeItem(e)
                    } catch (s) {}
                },
                V = (t, e) => {
                    const s = {};
                    e && e.forEach((e => {
                        s[e] = $(t, e)
                    }));
                    try {
                        window && window[t] && window[t].clear()
                    } catch (i) {}
                    e && e.forEach((e => {
                        s[e] && Q(t, e, s[e])
                    }))
                },
                K = B("localStorage", Z);
            B("sessionStorage", Z);
            const Y = "@shopee/account-basic-info";
            var z, q, J = s(19194),
                tt = Object.freeze({
                    INIT: 0,
                    REQ: 1,
                    OK: 2,
                    ERR: 3
                }),
                et = (Object.freeze({
                    apiProgress: tt.INIT,
                    error: null,
                    error_msg: null
                }), tt),
                st = s(85326),
                it = function(t, e, s) {
                    if (Array.isArray(e) && e.length)
                        for (let i = 0, o = e.length; i < o; i++) {
                            const o = e[i];
                            if (!t || !Object.prototype.hasOwnProperty.call(t, o)) return s;
                            t = t[o]
                        }
                    return t
                };
            (q = z || (z = {}))[q.UNKNOWN = 0] = "UNKNOWN", q[q.LOGGED_IN = 1] = "LOGGED_IN", q[q.NOT_LOGGED_IN = 2] = "NOT_LOGGED_IN", J.M9, J.Rv, J.s, J.eF, J.$5, J.yy, J.rY, J.jW, J.dg, J.LM, J.F1;
            const ot = () => {
                const {
                    actions: t,
                    state: e
                } = (0, i.useContext)(G.AccountContext), s = (t => {
                    const e = it(t, ["info"]),
                        s = it(e, ["userid"], null),
                        i = it(t, ["progress"], et.INIT),
                        o = it(t, ["error"]),
                        n = i === et.INIT || i === et.REQ || i === et.ERR && 19 !== o ? z.UNKNOWN : i === et.OK && s ? z.LOGGED_IN : z.NOT_LOGGED_IN;
                    return {
                        accountInfo: {
                            userId: it(e, ["userid"]) || st.UB.userid,
                            username: it(e, ["username"]) || st.UB.username,
                            email: it(e, ["email"]) || st.UB.email,
                            emailVerified: it(e, ["email_verified"]) || st.UB.email_verified,
                            phone: it(e, ["phone"]) || st.UB.phone,
                            hasPassword: it(e, ["has_password"]) || st.UB.has_password,
                            portrait: it(e, ["portrait"]) || st.UB.portrait,
                            adultConsentTimestamp: it(e, ["adult_consent"]) || st.UB.adult_consent,
                            birthTimestamp: it(e, ["birth_timestamp"]) || st.UB.birth_timestamp,
                            birthTimestampVerified: it(e, ["birth_timestamp_verified"]) || st.UB.birth_timestamp_verified,
                            ctime: it(e, ["ctime"]) || st.UB.ctime,
                            isSeller: it(e, ["is_seller"]) || st.UB.is_seller,
                            isMallSeller: it(e, ["is_mall_seller"]) || st.UB.is_mall_seller,
                            isNewUser: !it(e, ["not_new_user"]) || st.UB.not_new_user,
                            shopId: it(e, ["shopid"]) || st.UB.shopid,
                            tosAcceptedTime: it(e, ["tos_accepted_time"]) || st.UB.tos_accepted_time,
                            webOption: it(e, ["web_option"]) || st.UB.web_option,
                            paymentPassword: it(e, ["payment_password"]) || st.UB.payment_password,
                            cbOption: it(e, ["cb_option"]) || st.UB.cb_option,
                            cookiesAcceptedTime: it(e, ["cookies_accepted_time"]) || st.UB.cookies_accepted_time,
                            disallowDataProcessing: it(e, ["disallow_data_processing"]) || st.UB.disallow_data_processing,
                            taxId: it(e, ["tax_id"]) || st.UB.tax_id
                        },
                        accountStatus: n,
                        accountInfoProgress: i,
                        accountInfoError: o
                    }
                })(e), {
                    accountStatus: o,
                    accountInfo: {
                        username: n,
                        portrait: r
                    }
                } = s;
                return (0, i.useEffect)((() => {
                    var t;
                    o === z.LOGGED_IN ? (t = {
                        username: n,
                        portrait: r
                    }, K.setItem(Y, t)) : o === z.NOT_LOGGED_IN && K.removeItem(Y)
                }), [o, n, r]), Object.assign(Object.assign({}, s), t)
            };
            var nt = s(60982);

            function rt(t, e) {
                return nt.O.getUrl({
                    shopId: t,
                    itemId: e
                })
            }
            const at = "c4uE7i",
                lt = i.useContext,
                ct = (0, a.withRouter)((({
                    item: t,
                    setting: e,
                    history: s,
                    trackingData: i
                }) => {
                    const o = lt(H.Em),
                        {
                            deep_discount_ongoing_status: n
                        } = t,
                        r = n > 1,
                        a = (0, j.useTrackClick)("ActionButton", i),
                        {
                            accountInfo: l,
                            accountStatus: c
                        } = ot(),
                        d = c === z.LOGGED_IN,
                        _ = !!t && d && l.shopId === t.shopid;
                    if (!t) return null;
                    if (!r) {
                        const i = e.upcoming_promo_items_button_text_color || e.remind_me_button_text_color;
                        return (0, m.jsx)(D.Z, {
                            className: at,
                            onClick: () => {
                                a(), s.push(rt(t.shopid, t.itemid))
                            },
                            type: "outline-primary",
                            style: i ? {
                                color: i,
                                borderColor: i
                            } : void 0,
                            children: v.I18n.t("pr_dd_view_details")
                        })
                    }
                    const u = e.add_to_cart_button_text_color;
                    return (0, m.jsx)(D.Z, {
                        onClick: () => {
                            a(), _ ? s.push(rt(t.shopid, t.itemid)) : o(t.shopid, t.itemid)
                        },
                        type: "primary",
                        className: at,
                        style: u ? {
                            backgroundColor: u,
                            borderColor: u
                        } : void 0,
                        children: v.I18n.t("pr_dd_add_to_cart")
                    })
                }));
            var mt = s(82638),
                dt = s(43207),
                _t = s(44400);
            const ut = dt.timeLocales[(0, _t.R)((0, g.Kd)(), (0, g.of)())],
                ht = dt.formatTime.bind(null, ut);

            function pt(t, e, s) {
                return "date_and_time" === s ? `${ht(1e3*t,{month:"short",day:"short"})} ${ht(1e3*t,"hh:mm")}-${ht(1e3*e,"hh:mm")}` : `${ht(1e3*t,"hh:mm")}-${ht(1e3*e,"hh:mm")}`
            }
            const St = function({
                    backgroundColor: t,
                    start: e,
                    end: s
                }) {
                    return (0, m.jsxs)("div", {
                        className: "Rv1Q4F",
                        children: [(0, m.jsx)("svg", {
                            className: "fnE_wI",
                            viewBox: "0 0 262 30",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: (0, m.jsx)("path", {
                                fill: t,
                                d: "M0 0H16.2953H262L253.543 15L262 30H16.2953H0L8.45654 15L0 0Z"
                            })
                        }), (0, m.jsx)("p", {
                            className: "QGvBCs",
                            children: pt(e, s, "time_only")
                        })]
                    })
                },
                It = {
                    wrapper: "nHMCfU",
                    card: "LKhyUm",
                    collection: "LH67Y1",
                    soldoutBanner: "nwOD_k",
                    name: "JvzU_j",
                    "name-left": "S224Vu",
                    "name-center": "w3El60",
                    price: "_mRfnn",
                    originalPrice: "qdv05l",
                    promotionPrice: "hUvhpV",
                    promotionPriceSymbol: "ysXMJw",
                    soldoutText: "zfTAsf"
                };
            var Tt = s(36974);

            function gt(t) {
                return `${parseFloat(((100-t)/10).toFixed(1))}`
            }

            function Et(t) {
                return `-${t}%`
            }
            const Ct = {
                    [Tt.LANGUAGES["zh-Hant"]]: gt,
                    [Tt.LANGUAGES["zh-Hans"]]: gt,
                    [Tt.LANGUAGES.fr]: Et,
                    [Tt.LANGUAGES.pl]: Et,
                    [Tt.LANGUAGES["es-ES"]]: Et
                },
                ft = (t, e) => {
                    if ("string" == typeof t || t instanceof String) return t;
                    const s = Ct[e];
                    return "function" == typeof s ? s(t) : function(t) {
                        return `${t}%`
                    }(t)
                },
                wt = "zijA6M",
                Nt = function({
                    item: t
                }) {
                    const e = (t => {
                            const e = t.price_before_dd || 1,
                                s = t.deep_discount_price;
                            return e >= s ? Math.floor((e - s) / e * 100) : 0
                        })(t),
                        s = (0, g.of)(),
                        i = s === Tt.LANGUAGES["zh-Hant"] || s === Tt.LANGUAGES["zh-Hans"],
                        o = (0, v.t)("pr_dd_label_off");
                    return 0 === e ? null : i ? (0, m.jsxs)("p", {
                        className: wt,
                        children: [(0, m.jsx)("span", {
                            "aria-label": (0, v.t)("item_card_promotion_label_webfe_accessibility")
                        }), ft(e, Tt.LANGUAGES["zh-Hant"]), o]
                    }) : (0, m.jsxs)("p", {
                        className: r()(wt, "MGM5ca"),
                        children: [(0, m.jsx)("span", {
                            "aria-label": (0, v.t)("item_card_promotion_label_webfe_accessibility")
                        }), (0, m.jsx)("span", {
                            className: "E9vF1T",
                            children: ft(e, s)
                        }), (0, m.jsx)("span", {
                            className: "bU9sto",
                            children: o
                        })]
                    })
                },
                xt = {
                    imageFlag: [{
                        name: P.PREFERRED
                    }, {
                        name: P.OFFICIAL_SHOP
                    }, {
                        name: P.SBS
                    }, {
                        name: P.PREFERRED_PLUS
                    }, {
                        name: P.TOP_PRODUCTS
                    }, {
                        name: P.S_MART
                    }, {
                        name: P.CUSTOM
                    }],
                    iconInPrice: [],
                    overlayImage: [],
                    promotionLabel: [],
                    bottomRight: [],
                    topRight: [],
                    maxBadges: {
                        imageFlag: 1,
                        overlayImage: 1,
                        iconInPrice: 2,
                        promotionLabel: 2,
                        topRight: 3,
                        bottomRight: 1
                    },
                    status: "loaded"
                };

            function At(t, e) {
                const {
                    key: s,
                    timespan: i
                } = function(t) {
                    return t > 3600 ? {
                        key: "pr_dd_sold_out_in_n_hours",
                        timespan: Math.floor(t / 3600).toString()
                    } : t < 60 ? {
                        key: "pr_dd_sold_out_in_n_mins",
                        timespan: "1"
                    } : {
                        key: "pr_dd_sold_out_in_n_mins",
                        timespan: Math.floor(t / 60).toString()
                    }
                }(e);
                return v.I18n.t(s, {
                    minutes: i,
                    hours: i,
                    amount: t
                })
            }

            function Lt(t) {
                const e = (0, mt.getCurrencyConfig)(__LOCALE__);
                switch (e.symbolPosition) {
                    case mt.SYMBOL_POSITION.FRONT:
                        return (0, m.jsxs)(i.Fragment, {
                            children: [(0, m.jsx)("span", {
                                className: It.promotionPriceSymbol,
                                children: e.symbol + (e.spaceBetweenSymbol ? " " : "")
                            }), (0, mt.formatCurrencyNumber)(__LOCALE__, (0, mt.deflateServerNumber)(t, __LOCALE__))]
                        });
                    case mt.SYMBOL_POSITION.BACK:
                        return (0, m.jsxs)(i.Fragment, {
                            children: [(0, mt.formatCurrencyNumber)(__LOCALE__, (0, mt.deflateServerNumber)(t, __LOCALE__)), (0, m.jsx)("span", {
                                className: It.promotionPriceSymbol,
                                children: (e.spaceBetweenSymbol ? " " : "") + e.symbol
                            })]
                        });
                    case mt.SYMBOL_POSITION.FRONT_AND_BACK:
                        return (0, m.jsxs)(i.Fragment, {
                            children: [(0, m.jsx)("span", {
                                className: It.promotionPriceSymbol,
                                children: e.symbol[0] + (e.spaceBetweenSymbol[0] ? " " : "")
                            }), (0, mt.formatCurrencyNumber)(__LOCALE__, (0, mt.deflateServerNumber)(t, __LOCALE__)), (0, m.jsx)("span", {
                                className: It.promotionPriceSymbol,
                                children: (e.spaceBetweenSymbol[1] ? " " : "") + e.symbol[1]
                            })]
                        });
                    default:
                        return null
                }
            }
            const Ot = (0, a.withRouter)((({
                item: t,
                ImageFlag: e,
                setting: s,
                usage: i,
                index: o,
                promotionId: n,
                isUserAdult: c,
                adultAge: d
            }) => {
                const _ = {
                        item: t,
                        index: o,
                        itemStatus: {
                            isOngoing: l(t, ["deep_discount_ongoing_status"], 0) > 1,
                            isSoldout: l(t, ["is_deep_discount_soldout"], !1),
                            actionType: s.click_to_action
                        },
                        promotionId: n
                    },
                    u = (0, j.useTrackImpression)("Item", _),
                    h = (0, j.useTrackClick)("Item", _);
                if (!t) return null;
                const {
                    deep_discount_ongoing_status: S
                } = t, I = S > 1, g = s.product_card_timeslot && s.product_card_timeslot.show, E = s.product_card_timeslot && s.product_card_timeslot.background_color, C = s.style.deep_discount_price_color || s.style.dd_price_color, f = t.price_before_dd, w = t.deep_discount_price, N = !I && t.hidden_deep_discount_price_pc, x = t.is_deep_discount_soldout;
                return (0, m.jsxs)("div", {
                    ref: u,
                    className: r()(It.wrapper, It[i]),
                    children: [g && (0, m.jsx)(St, {
                        start: t.deep_discount_start_time,
                        end: t.deep_discount_end_time,
                        backgroundColor: E || ""
                    }), (0, m.jsx)(p, {
                        item: t,
                        locale: __LOCALE__,
                        manifest: xt,
                        children: (0, m.jsxs)(a.Link, {
                            className: It.card,
                            onClick: t => {
                                h(t)
                            },
                            to: rt(t.shopid, t.itemid),
                            children: [(0, m.jsxs)(U, {
                                className: It.image,
                                getImageUrl: T.Jn,
                                adultAge: d,
                                isUserAdult: c,
                                maskAdultImageWhenApplicable: !0,
                                useTransparentBackgroundImage: !0,
                                showSoldOutBadge: !1,
                                children: [e && (0, m.jsx)(e, {}), x && (0, m.jsx)("p", {
                                    className: It.soldoutBanner,
                                    children: v.I18n.t("dd_promo_soldout")
                                }), N ? null : (0, m.jsx)(Nt, {
                                    item: t
                                })]
                            }), (0, m.jsx)(F, {
                                className: r()(It.name, It[`name-${s.align_text}`])
                            }), (0, m.jsxs)("div", {
                                className: It.price,
                                style: {
                                    textAlign: s.align_text
                                },
                                children: [(0, m.jsx)("span", {
                                    className: It.originalPrice,
                                    "aria-hidden": "true",
                                    children: (0, mt.formatCurrency)(__LOCALE__, (0, mt.deflateServerNumber)(f, __LOCALE__))
                                }), (0, m.jsx)("span", {
                                    "aria-label": v.I18n.t("item_card_current_price_webfe_accessibility")
                                }), (0, m.jsx)("span", {
                                    className: It.promotionPrice,
                                    style: {
                                        color: C
                                    },
                                    children: N || Lt(w)
                                })]
                            })]
                        })
                    }), x ? (0, m.jsx)("p", {
                        className: It.soldoutText,
                        style: {
                            textAlign: s.align_text
                        },
                        children: At(t.deep_discount_soldout_count, t.deep_discount_soldout_time_span)
                    }) : (0, m.jsx)(ct, {
                        setting: s,
                        item: t,
                        trackingData: _,
                        isUserAdult: c
                    })]
                })
            }));
            var yt = s(64581),
                Mt = s(52231),
                bt = s(90966),
                vt = s(34337),
                Rt = s(57502);
            const Ut = ["direction", "showArrowOnHover", "isShown", "handleClick", "showArrowHint", "isVisible", "padding", "IconArrow", "style", "ariaContent"];

            function Ft(t) {
                let {
                    direction: e,
                    showArrowOnHover: s,
                    isShown: i,
                    handleClick: o,
                    showArrowHint: n,
                    isVisible: a,
                    padding: l,
                    IconArrow: d,
                    style: _,
                    ariaContent: u
                } = t, h = (0, yt.Z)(t, Ut);
                const p = s && n && !i;
                return l = l || "0px", (0, m.jsxs)("div", (0, c.Z)({}, h, {
                    className: r()("carousel-arrow carousel-arrow--" + (e < 0 ? "prev" : "next"), !!p && "carousel-arrow--hint", !a && "carousel-arrow--hidden", h.className),
                    role: "button",
                    tabIndex: 0,
                    style: (0, c.Z)({
                        opacity: !s || i || p ? "1" : "0",
                        visibility: a ? "visible" : "hidden",
                        transform: `translateX(calc(${e<0?"-50% + "+l:"50% - "+l}))`
                    }, _),
                    onClick: o,
                    children: [u, d ? (0, m.jsx)(d, {}) : e < 0 ? (0, m.jsx)(vt.Z, {}) : (0, m.jsx)(Rt.Z, {})]
                }))
            }
            class Pt extends i.Component {
                constructor(t) {
                    super(t), this._swipeStartX = 0, this._swipeStartY = 0, this._swipeVx = 0, this._swipeLastX = 0, this._swipeStarted = !1, this._swipeMoved = !1, this.isSwiping = !1, this.state = {
                        position: 0,
                        isSliding: !1,
                        isShowArrows: !1
                    }, this.hideArrows = this.hideArrows.bind(this), this.showArrows = this.showArrows.bind(this), this.finishSliding = this.finishSliding.bind(this), this.handleNextArrowClick = this.handleNextArrowClick.bind(this), this.handlePrevArrowClick = this.handlePrevArrowClick.bind(this), this.touchStart = this.touchStart.bind(this), this.touchEnd = this.touchEnd.bind(this), this.touchMove = this.touchMove.bind(this), this.getFirstItemWidth = this.getFirstItemWidth.bind(this), this._carouselContainer = i.createRef(), this._carouselList = i.createRef(), this._carouselItems = [], this._firstItemWidth = null, this._carouselContainerWidth = null, this._finishSlidingTimeout = null
                }
                componentWillUnmount() {
                    this._carouselItems = []
                }
                componentDidMount() {
                    const {
                        numItemsPerRow: t,
                        focusIndex: e
                    } = this.props, s = this.props.items ? this.props.items.length : 0;
                    if ("number" == typeof e) {
                        const i = Math.floor(e / t) * t,
                            o = Math.min(i, Math.max(s - Math.floor(t), 0));
                        this.setState({
                            position: o
                        }, (() => {
                            const {
                                _carouselList: t
                            } = this;
                            t.current && (t.current.style.transform = this.getCurrentCarouselTransform(o))
                        }))
                    }
                }
                componentDidUpdate(t) {
                    if (t.numItemsPerRow !== this.props.numItemsPerRow) {
                        this._finishSlidingTimeout && clearTimeout(this._finishSlidingTimeout), this.setState({
                            isSliding: !0
                        });
                        const {
                            _carouselList: t,
                            state: {
                                position: e
                            }
                        } = this, s = Math.max(0, Math.min(e, this.props.items.length - this.props.numItemsPerRow));
                        t.current && (t.current.style.transition = "0ms", t.current.style.transform = this.getCurrentCarouselTransform(s)), this._finishSlidingTimeout = setTimeout((() => {
                            this.finishSliding(s)
                        }), 0)
                    }
                }
                renderDisplayedItems() {
                    const {
                        items: t,
                        isFluid: e,
                        padding: s,
                        distributeCardWidthWhenFewerItems: i,
                        numItemsPerRow: o
                    } = this.props, n = t.length, a = i && n < o ? 100 / n : 100 / o;
                    return t.map(((t, i) => (0, m.jsx)("li", {
                        className: r()("image-carousel__item", e && "image-carousel__item--fluid"),
                        style: {
                            padding: `0 ${s}`,
                            width: e ? void 0 : `${a}%`
                        },
                        ref: t => {
                            this._carouselItems[i] = t
                        },
                        children: t
                    }, i)))
                }
                render() {
                    var t;
                    const {
                        items: e,
                        numItemsPerRow: s,
                        showArrowOnHover: i,
                        showArrowHint: o,
                        isFluid: n,
                        distributeCardWidthWhenFewerItems: a,
                        itemPadding: l,
                        className: d,
                        wrapperProps: _,
                        IconArrowLeft: u,
                        IconArrowRight: h,
                        arrowStyle: p,
                        leftArrowProps: S,
                        rightArrowProps: I
                    } = this.props, {
                        isShowArrows: T,
                        position: g
                    } = this.state, E = e.length, C = E > s ? (a && E < s ? 100 / E : 100 / s) * E : 100, f = this._carouselItems && this._carouselItems[this.state.position] ? (null == (t = this._carouselItems[this.state.position]) ? void 0 : t.getBoundingClientRect().width) + "px" : null;
                    return (0, m.jsxs)("div", {
                        className: r()("image-carousel", d),
                        onMouseEnter: this.showArrows,
                        onMouseLeave: this.hideArrows,
                        style: n ? {
                            width: f,
                            transition: `${this.props.transitionTime}ms`
                        } : void 0,
                        children: [(0, m.jsx)("div", {
                            className: r()("image-carousel__item-list-wrapper"),
                            onTouchEnd: this.touchEnd,
                            onTouchStart: this.touchStart,
                            onTouchMove: this.touchMove,
                            ref: this._carouselContainer,
                            children: (0, m.jsx)("ul", (0, c.Z)({
                                className: "image-carousel__item-list",
                                style: {
                                    width: n ? void 0 : `${C}%`,
                                    transform: this.getCurrentCarouselTransform(g)
                                },
                                ref: this._carouselList
                            }, _, {
                                children: this.renderDisplayedItems()
                            }))
                        }), (0, m.jsx)(Ft, (0, c.Z)({
                            direction: -1,
                            showArrowOnHover: i,
                            isVisible: E > s && g > 0,
                            isShown: T,
                            handleClick: this.handlePrevArrowClick,
                            showArrowHint: o,
                            padding: l,
                            IconArrow: u,
                            style: p
                        }, S)), (0, m.jsx)(Ft, (0, c.Z)({
                            direction: 1,
                            showArrowOnHover: i,
                            isVisible: E > s && g + s < E,
                            isShown: T,
                            handleClick: this.handleNextArrowClick,
                            showArrowHint: o,
                            padding: l,
                            IconArrow: h,
                            style: p
                        }, I))]
                    })
                }
                getCurrentCarouselTransform(t) {
                    const {
                        _carouselItems: e
                    } = this;
                    let s = 0;
                    return this.props.isFluid && e ? (s = e.map(((e, s) => e && s < t ? e.getBoundingClientRect().width : 0)).reduce(((t, e) => t + e), 0), `translate(${-s}px, 0px)`) : (s = this.getCarouselContainerWidth() / this.props.numItemsPerRow, `translate(${-t*s}px, 0px)`)
                }
                animateCarousel(t, e, s = 100) {
                    const {
                        _carouselList: i
                    } = this;
                    if (!i.current) return;
                    const o = -1 * t * this.getFirstItemWidth();
                    i.current.style.transition = `${s}ms`, i.current.style.transform = `translate(${o+e}px, 0px)`
                }
                touchMove(t) {
                    if (!this._swipeStarted) return;
                    const e = t.changedTouches[0].pageX,
                        s = t.changedTouches[0].pageY;
                    let i = e - this._swipeStartX;
                    if (t.stopPropagation(), 0 === this.state.position && (i = Math.min(i, 0)), this.state.position >= this.props.items.length - Math.floor(this.props.numItemsPerRow) && (i = Math.max(i, 0)), !this._swipeMoved) {
                        const t = s - this._swipeStartY;
                        this.isSwiping = Math.abs(i) > Math.abs(t) && Math.abs(i) > 3, (this.isSwiping || Math.abs(t) > 3) && (this._swipeMoved = !0, this._swipeStartX = e, i = e - this._swipeStartX)
                    }
                    this.isSwiping && (this.animateCarousel(this.state.position, i), this._swipeVx = .5 * this._swipeVx + .5 * (e - this._swipeLastX), this._swipeLastX = e)
                }
                touchStart(t) {
                    t.stopPropagation(), this._swipeStartX = t.changedTouches[0].pageX, this._swipeStartY = t.changedTouches[0].pageY, this._swipeStarted = !0, this._swipeVx = 0, this._swipeLastX = this._swipeStartX, this._swipeMoved = !1
                }
                touchEnd(t) {
                    if (!this._swipeStarted || !this.isSwiping) return;
                    this._swipeStarted = !1, this._swipeMoved = !1, this.isSwiping = !1, t.stopPropagation();
                    const e = t.changedTouches[0].pageX - this._swipeStartX;
                    let s = this.state.position;
                    Math.abs(this._swipeVx) > 5 ? this._swipeVx > 0 ? s -= 1 : s += 1 : e > .5 * this.getCarouselContainerWidth() ? s -= 1 : e < .5 * -this.getCarouselContainerWidth() && (s += 1), this.animateCarousel(s, 0, 100), s > this.state.position && this.handleNextArrowClick(), s < this.state.position && this.handlePrevArrowClick()
                }
                getFirstItemWidth() {
                    return null !== this._firstItemWidth ? this._firstItemWidth : this._carouselList.current && this._carouselList.current.firstElementChild ? (this._firstItemWidth = this._carouselList.current.firstElementChild.getBoundingClientRect().width, this._firstItemWidth) : 0
                }
                getCarouselContainerWidth() {
                    return null == this._carouselContainerWidth && this._carouselContainer && this._carouselContainer.current ? this._carouselContainer.current.getBoundingClientRect().width : 0
                }
                handlePrevArrowClick() {
                    const t = this.state.position;
                    let e = 0;
                    this.props.keepPreviousItemOnSlide && (e = 1);
                    const s = this.props.slidesByOne ? Math.max(t - 1, 0) : Math.max(t - Math.ceil(this.props.numItemsPerRow) + e, 0);
                    this.slideTo(s)
                }
                handleNextArrowClick() {
                    const {
                        items: t,
                        numItemsPerRow: e,
                        slidesByOne: s
                    } = this.props, i = t.length, o = i % 2 == 0 ? i - Math.floor(e) : i + 1 - Math.floor(e), n = this.state.position;
                    let r = 0;
                    this.props.keepPreviousItemOnSlide && (r = 1);
                    const a = s ? Math.min(n + 1, o) : Math.min(n + Math.ceil(e) - r, o);
                    this.slideTo(a)
                }
                slideTo(t) {
                    if (this.state.isSliding && !this.props.isOverrideSliding) return;
                    this._finishSlidingTimeout && clearTimeout(this._finishSlidingTimeout);
                    const {
                        transitionTime: e
                    } = this.props;
                    this.setState({
                        isSliding: !0
                    });
                    const {
                        _carouselList: s
                    } = this;
                    s.current && (s.current.style.transition = `${e}ms`, s.current.style.transform = this.getCurrentCarouselTransform(t)), "function" == typeof this.props.onSlide && this.props.onSlide(t), this.props.isOverrideSliding && this.setState({
                        position: t
                    }), this._finishSlidingTimeout = setTimeout((() => {
                        this.finishSliding(t)
                    }), e)
                }
                finishSliding(t) {
                    this.setState({
                        isSliding: !1,
                        position: t
                    }), this._finishSlidingTimeout && clearTimeout(this._finishSlidingTimeout)
                }
                showArrows() {
                    this.setState({
                        isShowArrows: !0
                    })
                }
                hideArrows() {
                    this.setState({
                        isShowArrows: !1
                    })
                }
            }
            var jt;
            Pt.defaultProps = {
                transitionTime: 500,
                padding: (jt = 10, String(jt / 16) + "rem"),
                keepPreviousItemOnSlide: !0,
                showArrowOnHover: !1,
                showArrowHint: !1,
                isFluid: !1,
                isOverrideSliding: !1,
                slidesByOne: !1
            };
            var Dt = s(1247),
                Ht = s(10618),
                Gt = s(37039);
            const kt = 1e3,
                Bt = async t => {
                    if (!Array.isArray(t.items) || 0 === t.items.length) throw new Error("query.items is empty");
                    const {
                        items: e,
                        limit: s = kt,
                        deboost_soldout_items: i,
                        same_day: o
                    } = t, n = await (0, Gt.C8)("/api/v4/microsite/get_items", {
                        promo_item_list: e,
                        item_limit: 120,
                        deboost_soldout_items: i,
                        same_day: o
                    });
                    if (!n || !n.response || n.response.error || n.error) throw new Error(n.response);
                    return n.response.data
                };
            var Zt = s(98059),
                Wt = s(26157);
            const $t = i.createContext({
                ItemCard: () => (0, m.jsx)(m.Fragment, {}),
                platformMeta: {},
                pageMeta: {}
            });
            s(62827), s(99608), s(21624), s(70893), s(34986), s(17441), s(35210);
            var Qt = s(86813),
                Xt = s(40139),
                Vt = (s(25688), s(48978)),
                Kt = s(56338),
                Yt = s(78493);
            (() => {
                const {
                    pathname: t,
                    search: e
                } = location;
                "/m/preview" === t && (e.includes("__mobile__=1") || e.includes("__mobile__=true")) || (0, Xt.gn)() || (0, Xt.Dt)()
            })();
            const zt = [Vt.TN.PRODUCT_COLLECTION_CAROUSEL, Vt.TN.PRODUCT_COLLECTION_CAROUSEL_2, Vt.TN.TWO_ROW_COLLECTION, Vt.TN.BANNER_CAROUSEL, Vt.TN.TOP_PRODUCTS_CATEGORY_CLUSTER, Vt.TN.PRODUCT_LIST, Vt.TN.ITEM_RECOMMENDATION, Vt.TN.SHOP_RECOMMENDATION, Vt.TN.PRODUCT_COLLECTION_GRID, Vt.TN.SHOP_CAROUSEL, Vt.TN.IFRAME, Vt.TN.FLASH_SALE, Vt.TN.BUNDLE_DEAL, Vt.TN.VOUCHER_GRID, Vt.TN.LIVE_STREAMING, Vt.TN.TEXT, Vt.TN.GAP, Vt.TN.SHOP_GRID, Vt.TN.HEADER, Vt.TN.PRODUCT_GRID, Vt.TN.ADD_ON_DEAL, Vt.TN.COLLECTION_GROUP, Vt.TN.VOTING];
            new Set(zt);
            !("/m/preview" !== location.pathname || !location.search.includes("__mobile__=1") && !location.search.includes("__mobile__=true")) || (0, Xt.gn)() || (0, Xt.Dt)();
            Kt.K0, Vt.uT.SHOPEE_PAGE_HEADER, Kt.GA, Kt._P, Kt.K0, Vt.uT.SOCIAL_SHARING, Vt.uT.SHOPEE_PAGE_FOOTER, Kt.GA, Kt._P, Math.min((0, Yt.z)(), Kt.Gl);
            Vt.TN.PRODUCT_COLLECTION_CAROUSEL, Vt.TN.TWO_ROW_COLLECTION, Vt.TN.PRODUCT_COLLECTION_CAROUSEL_2, Vt.TN.SHOP_CAROUSEL, Vt.TN.ADD_ON_DEAL, s(33329), s(4192), s(41274), s(70978), s(27684);
            const qt = (t, e) => `${t}:${e}`;
            async function Jt(t, e) {
                let s;
                for (let o = 0; o < e; o++) try {
                    return await t()
                } catch (i) {
                    s = i
                }
                throw s
            }
            const te = ["sectionLocation", "meta"],
                ee = i.useMemo,
                se = ((0, Ht.getCountryConfig)(v.config.LOCALE) || {}).adultAge || 0,
                ie = v.I18n.withI18nCollections([Dt.pq, 34])((oe = function(t) {
                    let {
                        sectionLocation: e,
                        meta: s
                    } = t, i = (0, yt.Z)(t, te);
                    const {
                        ItemCardBadges: n
                    } = o().useContext($t), {
                        accountInfo: r
                    } = ot(), {
                        username: a,
                        birthTimestamp: d,
                        adultConsentTimestamp: _
                    } = r, u = ee((() => (0, bt.Eg)({
                        username: a,
                        birthTimestamp: d,
                        adultConsentTimestamp: _
                    }, se, v.config.LOCALE).isUserAdult), [a, d, _]), h = ee((() => {
                        const t = {};
                        for (const e of i.promo_item_list) t[qt(e.shop_id, e.item_id)] = e.promotion_id;
                        return t
                    }), [i.promo_item_list]), {
                        data: p
                    } = (0, Mt.a)(["deep-discount-teaser-items"], (async () => (await Jt((() => {
                        var t;
                        return Bt({
                            items: i.promo_item_list,
                            limit: i.item_limit,
                            deboost_soldout_items: !0,
                            same_day: (null == (t = i.product_card_timeslot) ? void 0 : t.show) || !1
                        })
                    }), 3)).promo_item_list), {
                        initialData: [],
                        enabled: !0,
                        suspense: !1
                    }), S = {
                        MDDdComponent: {
                            sectionLocation: e,
                            meta: s
                        }
                    }, I = l(i, ["data", "component_banner", "image"], ""), g = (0, j.useTrackImpression)("MDDeepDiscountTeaser.Banner", (0, c.Z)({}, S, {
                        banner_url: I
                    })), E = (0, j.useTrackClick)("MDDeepDiscountTeaser.Banner", (0, c.Z)({}, S, {
                        banner_url: I
                    })), C = (0, j.useTrackImpression)("MDDeepDiscountTeaser.SeeAll", S), f = (0, j.useTrackClick)("MDDeepDiscountTeaser.SeeAll", S);
                    return p && 0 !== p.length ? (0, m.jsx)(j.TrackingDataAnchor, {
                        targetType: "MDDeepDiscountTeaser",
                        targetData: S,
                        children: (0, m.jsxs)("section", {
                            className: "dpwCvU",
                            children: [i.component_banner.show && (0, m.jsx)("img", {
                                alt: "",
                                ref: g,
                                className: "yDU8UK",
                                onClick: E,
                                src: (0, T.Jn)(i.component_banner.image)
                            }), p && p.length > 0 && (0, m.jsx)(Pt, {
                                className: "Jx9yDg",
                                showArrowOnHover: !0,
                                showArrowHint: !0,
                                numItemsPerRow: 4,
                                padding: "6px",
                                items: p.slice(0, i.num_items_display).map(((t, e) => (0, m.jsx)(Ot, {
                                    item: t,
                                    ImageFlag: n,
                                    setting: i,
                                    index: e,
                                    promotionId: h[qt(t.shopid, t.itemid)],
                                    isUserAdult: u,
                                    adultAge: se,
                                    usage: "teaser"
                                }, e))),
                                itemPadding: "10px",
                                wrapperProps: {
                                    "aria-label": v.I18n.t("list_of_items_with_count_a11y", {
                                        count: Math.min(p.length, i.num_items_display)
                                    })
                                }
                            }), i.see_all.show && (0, m.jsx)(D.Z, {
                                type: "outline-primary",
                                className: "W6OplY",
                                children: (0, m.jsx)("a", {
                                    ref: C,
                                    className: "JCLZjl",
                                    href: i.see_all.redirect_url,
                                    onClick: f,
                                    children: v.I18n.t("pr_dd_see_all")
                                })
                            })]
                        })
                    }) : null
                }, function(t) {
                    const e = (0, i.useMemo)((() => new Zt.S), []);
                    return (0, m.jsx)(Wt.aH, {
                        client: e,
                        children: (0, m.jsx)(oe, (0, c.Z)({}, t))
                    })
                }));
            var oe;
            const ne = function({
                    start: t,
                    end: e,
                    type: s,
                    backgroundColor: o,
                    className: n
                }) {
                    const a = i.useMemo((() => pt(t, e, s)), [t, e, s]);
                    return (0, m.jsxs)("div", {
                        className: r()("XIlen3", n),
                        children: [(0, m.jsx)("p", {
                            className: "PwNsWN",
                            children: a
                        }), (0, m.jsx)("svg", {
                            className: "O0aryL",
                            width: "697",
                            height: "48",
                            viewBox: "0 0 697 48",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: (0, m.jsx)("path", {
                                fill: o,
                                d: "M0.493423 3.22364C-0.523308 1.90915 0.413605 0 2.07542 0H670H694.144C695.765 0 696.713 1.82704 695.779 3.15202L681.9 22.848C681.413 23.5388 681.413 24.4612 681.9 25.152L695.779 44.848C696.713 46.173 695.765 48 694.144 48H670.5H2.07543C0.413621 48 -0.523307 46.0908 0.493424 44.7764L15.6171 25.2236C16.1744 24.5031 16.1744 23.4969 15.6171 22.7764L0.493423 3.22364Z"
                            })
                        })]
                    })
                },
                re = i.useContext,
                ae = ({
                    itemRow: t,
                    setting: e,
                    promotionIdMap: s,
                    isUserAdult: i,
                    adultAge: o,
                    ItemCardBadges: n
                }) => (0, m.jsx)("div", {
                    className: "FR7g58",
                    children: t.map(((t, r) => (0, m.jsx)("div", {
                        className: "rissc7",
                        role: "listitem",
                        children: (0, m.jsx)(Ot, {
                            usage: "collection",
                            item: t,
                            ImageFlag: n,
                            setting: e,
                            index: r,
                            isUserAdult: i,
                            adultAge: o,
                            promotionId: s[qt(t.shopid, t.itemid)]
                        })
                    }, r)))
                });

            function le({
                items: t,
                setting: e,
                index: s,
                promotionIdMap: o,
                timeslot: n,
                isUserAdult: a,
                adultAge: l
            }) {
                const {
                    ItemCardBadges: d
                } = re($t);
                if (!Array.isArray(t) || 0 === t.length) return null;
                const _ = (t => {
                        if (!t.style) return;
                        const {
                            inner_background: e,
                            inner_background_color: s
                        } = t.style;
                        return "transparent" === e ? "transparent" : "color" === e ? s : void 0
                    })(e),
                    u = e.promo_item_list.length > 1e3,
                    h = ((t, e, s) => {
                        const i = [];
                        let o = 0;
                        for (; o < t.length;) i.push((0, c.Z)({}, s, {
                            itemRow: t.slice(o, o + 4)
                        })), o += 4;
                        return i
                    })(t, 0, {
                        setting: e,
                        promotionIdMap: o,
                        isUserAdult: a,
                        adultAge: l,
                        ItemCardBadges: d
                    }),
                    p = e.component_time_slot,
                    S = u ? 375 * h.length + (p ? 72 : 0) + 12 + "px" : "auto";
                return (0, m.jsx)(j.TrackingDataAnchor, {
                    targetType: "Section",
                    targetData: {
                        sectionIndex: s
                    },
                    children: (0, m.jsxs)("section", {
                        style: {
                            backgroundColor: _,
                            height: S
                        },
                        className: r()("p35Zml", u && "X2w1Xm"),
                        "aria-label": v.I18n.t("list_of_items_a11y"),
                        role: "list",
                        children: [p && (0, m.jsx)(ne, {
                            backgroundColor: e.style.time_slot_bg_color,
                            start: n.start_time,
                            end: n.end_time,
                            type: e.time_slot_type
                        }), (0, m.jsx)("div", {
                            className: "DMWCoR",
                            style: {
                                height: S
                            },
                            children: u ? (0, m.jsx)(Qt.ZP, {
                                dataArray: h,
                                estimateItemHeight: () => 375,
                                buffer: 1,
                                Component: ae,
                                getAnchorId: () => null,
                                getIsAnchorTabBarItem: () => !1,
                                getItemId: (t, e) => e,
                                getIsFixedItem: () => !1,
                                convertItemStyle: () => ({})
                            }) : h.map((t => (0, i.createElement)(ae, (0, c.Z)({}, t, {
                                key: t.itemRow[0].itemid
                            }))))
                        })]
                    })
                })
            }
            const [ce, me, de, _e, ue, he, pe] = Array.from({
                length: 10
            }).map(((t, e) => e)), Se = {
                INITIAL: ce,
                FETCHING_TIMESLOTS_SUCCESS: me,
                FETCHING_TIMESLOTS_FAIL: de,
                PENDING: _e,
                FETCHING_ITEMS: ue,
                FETCHING_ITEMS_FAIL: he,
                FINISH: pe
            }, [Ie, Te, ge, Ee] = Array.from({
                length: 10
            }).map(((t, e) => e)), Ce = {
                ITEM_REQUEST_PENDING: Ie,
                ITEM_REQUEST_SUCCESS: Te,
                ITEM_REQUEST_FAIL: ge,
                NO_VALID_ITEM: Ee
            };
            var fe = function(t) {
                return t.SET_TIMESLOTS_SUCCESS = "SET_TIMESLOTS_SUCCESS", t.SET_TIMESLOTS_FAIL = "SET_TIMESLOTS_FAIL", t.FETCH_TIMESLOTS_ITEMS_REQUEST = "FETCH_TIMESLOTS_ITEMS_REQUEST", t.FETCH_TIMESLOTS_ITEMS_SUCCESS = "FETCH_TIMESLOTS_ITEMS_SUCCESS", t.FETCH_TIMESLOTS_ITEMS_FAIL = "FETCH_TIMESLOTS_ITEMS_FAIL", t.FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST", t.FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS", t.FETCH_ITEMS_FAIL = "FETCH_ITEMS_FAIL", t
            }(fe || {});
            const we = {
                    status: Se.INITIAL,
                    hasTimeslot: !0,
                    timeslots: [],
                    timeslotsMeta: [],
                    itemMap: {},
                    ongoingFetchIndexes: [],
                    maxReadyIndex: -1
                },
                Ne = {
                    status: Se.PENDING,
                    hasTimeslot: !1,
                    itemList: [],
                    nextFetchStartIndex: 0,
                    itemMap: {},
                    ongoingFetchIndexes: [],
                    maxReadyIndex: -1
                },
                xe = (t, e) => {
                    if (e.type === fe.SET_TIMESLOTS_SUCCESS) return t.status !== Se.INITIAL ? t : (0, c.Z)({}, t, {
                        status: Se.FETCHING_TIMESLOTS_SUCCESS,
                        timeslots: e.payload.time_slots,
                        timeslotsMeta: e.payload.time_slots.map((() => ({
                            itemRequestStatus: Ce.ITEM_REQUEST_PENDING,
                            itemList: []
                        })))
                    });
                    if (e.type === fe.FETCH_TIMESLOTS_ITEMS_REQUEST) {
                        if (t.status !== Se.FETCHING_TIMESLOTS_SUCCESS && t.status !== Se.PENDING) return t;
                        const {
                            startIndex: s,
                            endIndex: i
                        } = e.payload;
                        if (s > i) return t;
                        if (s !== t.maxReadyIndex + 1) return t;
                        const o = [];
                        for (let t = e.payload.startIndex; t <= e.payload.endIndex; t++) o.push(t);
                        return (0, c.Z)({}, t, {
                            status: Se.FETCHING_ITEMS,
                            ongoingFetchIndexes: o
                        })
                    }
                    if (e.type === fe.FETCH_TIMESLOTS_ITEMS_SUCCESS || e.type === fe.FETCH_TIMESLOTS_ITEMS_FAIL) {
                        const {
                            index: s
                        } = e.payload, i = e.type === fe.FETCH_TIMESLOTS_ITEMS_SUCCESS ? e.payload.res : void 0, o = {}, n = i && i.promo_item_list && i.promo_item_list.length > 0, r = [];
                        if (i && i.promo_item_list)
                            for (const t of i.promo_item_list) o[qt(t.shopid, t.itemid)] = t, r.push(t);
                        const a = (t.timeslotsMeta || []).map(((t, i) => i === s ? {
                                itemRequestStatus: e.type === fe.FETCH_TIMESLOTS_ITEMS_SUCCESS ? n ? Ce.ITEM_REQUEST_SUCCESS : Ce.NO_VALID_ITEM : Ce.ITEM_REQUEST_FAIL,
                                itemList: r
                            } : t)),
                            l = t.ongoingFetchIndexes.filter((t => t !== s));
                        let m = t.status;
                        0 === l.length && (m = Se.PENDING);
                        let d = t.maxReadyIndex;
                        for (; d + 1 < a.length && a[d + 1].itemRequestStatus !== Ce.ITEM_REQUEST_PENDING;) d += 1;
                        return t.timeslots && d + 1 >= t.timeslots.length && (m = Se.FINISH), (0, c.Z)({}, t, {
                            status: m,
                            ongoingFetchIndexes: l,
                            timeslotsMeta: a,
                            itemMap: (0, c.Z)({}, t.itemMap, o),
                            maxReadyIndex: d
                        })
                    }
                    if (e.type === fe.FETCH_ITEMS_REQUEST) return (0, c.Z)({}, t, {
                        status: Se.FETCHING_ITEMS
                    });
                    if (e.type === fe.FETCH_ITEMS_SUCCESS) {
                        var s;
                        const {
                            endIndex: i,
                            res: o,
                            needDeboostSoldoutItems: n
                        } = e.payload, r = (0, c.Z)({}, t.itemMap), a = new Set;
                        if (o && o.promo_item_list)
                            for (const t of o.promo_item_list) {
                                const e = qt(t.shopid, t.itemid);
                                r[e] = t, t.is_deep_discount_soldout && a.add(e)
                            }
                        const l = i >= ((null == (s = t.itemList) ? void 0 : s.length) || 0),
                            m = n ? function(t, e) {
                                const s = [],
                                    i = [];
                                return t.forEach((t => {
                                    const o = qt(t.shop_id, t.item_id);
                                    e.has(o) ? i.push(t) : s.push(t)
                                })), [...s, ...i]
                            }(t.itemList || [], a) : t.itemList;
                        return (0, c.Z)({}, t, {
                            itemList: m,
                            status: l ? Se.FINISH : Se.PENDING,
                            nextFetchStartIndex: i + 1,
                            itemMap: r
                        })
                    }
                    return e.type === fe.FETCH_ITEMS_FAIL ? (0, c.Z)({}, t, {
                        status: Se.FETCHING_ITEMS_FAIL
                    }) : t
                };
            const Ae = ["imageFlag"],
                Le = ((0, Ht.getCountryConfig)(v.config.LOCALE) || {}).adultAge || 0,
                Oe = i.useEffect,
                ye = i.useCallback,
                Me = i.useRef,
                be = i.useMemo,
                ve = v.I18n.withI18nCollections([Dt.pq, 34])((function(t) {
                    let e = (0, yt.Z)(t, Ae);
                    const {
                        timeslots: s,
                        isFetchingItems: o,
                        finishedFetchingItems: n,
                        fetchMoreItems: r
                    } = function(t) {
                        const [e, s] = (0, i.useReducer)(xe, t.component_time_slot ? we : (0, c.Z)({}, Ne, {
                            itemList: t.promo_item_list
                        })), o = (0, i.useRef)();
                        (0, i.useEffect)((() => {
                            t.component_time_slot && Jt((() => (async t => {
                                if (!Array.isArray(t.items) || 0 === t.items.length) throw new Error("query.items is empty");
                                const e = await (0, Gt.C8)("/api/v4/microsite/get_timeslots", {
                                    promo_item_list: t.items,
                                    item_limit: 1e3,
                                    deboost_soldout_items: t.deboost || !1,
                                    DeboostSoldoutItems: t.deboost || !1,
                                    same_day: t.same_day
                                });
                                if (!e || !e.response || e.response.error || e.error) throw new Error(e.response);
                                return e.response.data
                            })({
                                items: t.promo_item_list,
                                deboost: t.deboost_soldout_items,
                                same_day: t.component_time_slot
                            })), 3).then((t => {
                                s({
                                    type: fe.SET_TIMESLOTS_SUCCESS,
                                    payload: t
                                })
                            }), (t => {
                                s({
                                    type: fe.SET_TIMESLOTS_FAIL,
                                    payload: t
                                })
                            }))
                        }), [t.component_time_slot]);
                        const n = (0, i.useCallback)((() => {
                            var i;
                            if (e.status !== Se.PENDING && e.status !== Se.FETCHING_TIMESLOTS_SUCCESS) return;
                            if (!t.component_time_slot) {
                                var o;
                                const i = e.nextFetchStartIndex || 0;
                                if (i >= ((null == (o = e.itemList) ? void 0 : o.length) || 0)) return;
                                const n = i + 120 - 1;
                                return s({
                                    type: fe.FETCH_ITEMS_REQUEST,
                                    payload: {
                                        startIndex: i,
                                        endIndex: n
                                    }
                                }), void Bt({
                                    items: (e.itemList || []).slice(i, n + 1),
                                    same_day: t.component_time_slot || !1,
                                    deboost_soldout_items: t.deboost_soldout_items || !1
                                }).then((e => {
                                    s({
                                        type: fe.FETCH_ITEMS_SUCCESS,
                                        payload: {
                                            res: e,
                                            startIndex: i,
                                            endIndex: n,
                                            needDeboostSoldoutItems: t.deboost_soldout_items
                                        }
                                    })
                                }), (t => s({
                                    type: fe.FETCH_ITEMS_FAIL,
                                    payload: {
                                        err: t,
                                        startIndex: i,
                                        endIndex: n
                                    }
                                })))
                            }
                            const n = e.maxReadyIndex + 1,
                                r = Math.min(((null == (i = e.timeslots) ? void 0 : i.length) || 0) - 1, n + 3 - 1);
                            if (!(n > r)) {
                                s({
                                    type: fe.FETCH_TIMESLOTS_ITEMS_REQUEST,
                                    payload: {
                                        startIndex: n,
                                        endIndex: r
                                    }
                                });
                                for (let i = n; i <= r; i++) {
                                    var a;
                                    const o = null == (a = e.timeslots) ? void 0 : a[i];
                                    o && Jt((() => Bt({
                                        items: o.promo_item_id_list,
                                        deboost_soldout_items: t.deboost_soldout_items || !1,
                                        same_day: t.component_time_slot || !1
                                    })), 3).then((t => {
                                        s({
                                            type: fe.FETCH_TIMESLOTS_ITEMS_SUCCESS,
                                            payload: {
                                                res: t,
                                                index: i
                                            }
                                        })
                                    }), (t => {
                                        s({
                                            type: fe.FETCH_TIMESLOTS_ITEMS_FAIL,
                                            payload: {
                                                err: t,
                                                index: i
                                            }
                                        })
                                    }))
                                }
                            }
                        }), [e.status, e.timeslots, e.maxReadyIndex, t.component_time_slot]);
                        return o.current === ce && e.status === Se.FETCHING_TIMESLOTS_SUCCESS && n(), o.current = e.status, t.component_time_slot ? {
                            timeslots: (e.timeslots || []).slice(0, e.maxReadyIndex + 1).map(((t, s) => (0, c.Z)({}, t, {
                                itemList: (e.timeslotsMeta || [])[s].itemList
                            }))).filter(((t, s) => (e.timeslotsMeta || [])[s].itemRequestStatus === Ce.ITEM_REQUEST_SUCCESS)),
                            isFetchingItems: e.status === Se.FETCHING_ITEMS,
                            finishedFetchingItems: e.status === Se.FINISH || e.status === Se.FETCHING_ITEMS_FAIL,
                            fetchMoreItems: n,
                            itemMap: e.itemMap
                        } : {
                            isFetchingItems: e.status === Se.FETCHING_ITEMS,
                            finishedFetchingItems: e.status === Se.FINISH || e.status === Se.FETCHING_ITEMS_FAIL,
                            fetchMoreItems: n,
                            timeslots: [{
                                itemList: (e.itemList || []).slice(0, e.nextFetchStartIndex).map((({
                                    item_id: t,
                                    shop_id: s
                                }) => e.itemMap[qt(s, t)])).filter((t => Boolean(t))),
                                promo_item_id_list: (e.itemList || []).slice(0, e.nextFetchStartIndex),
                                start_time: 0,
                                end_time: 1
                            }],
                            itemMap: e.itemMap,
                            state: e
                        }
                    }(e), a = Me(null), {
                        accountInfo: l
                    } = ot();
                    var d, _;
                    d = a, _ = ye((t => {
                        for (const e of t)
                            if (e.isIntersecting) {
                                if (o || n) return;
                                return void r()
                            }
                    }), [o, n]), Oe((() => {
                        if (!d || !d.current) return;
                        const t = new IntersectionObserver(_);
                        return t.observe(d.current), () => {
                            t.disconnect()
                        }
                    }), [d, _]);
                    const u = be((() => {
                            const t = {};
                            if (!s) return {};
                            for (const e of s)
                                for (const s of e.promo_item_id_list) t[qt(s.shop_id, s.item_id)] = s.promotion_id;
                            return t
                        }), [s]),
                        {
                            username: h,
                            birthTimestamp: p,
                            adultConsentTimestamp: S
                        } = l,
                        I = be((() => (0, bt.Eg)({
                            username: h,
                            birthTimestamp: p,
                            adultConsentTimestamp: S
                        }, Le, v.config.LOCALE).isUserAdult), [h, p, S]);
                    return (0, m.jsx)(j.TrackingDataAnchor, {
                        targetType: "MDDeepDiscountCollection",
                        children: (0, m.jsxs)("div", {
                            children: [s.map(((t, s) => (0, m.jsx)(le, {
                                isUserAdult: I,
                                adultAge: Le,
                                promotionIdMap: u,
                                index: s,
                                timeslot: t,
                                setting: e,
                                items: t.itemList
                            }, `${t.start_time}:${t.end_time}:${s}`))), !n && (0, m.jsx)("div", {
                                ref: a
                            })]
                        })
                    })
                }))
        },
        1247: (t, e, s) => {
            s.d(e, {
                pq: () => o,
                L: () => i
            });
            const i = 58,
                o = 208
        }
    }
]);
//# sourceMappingURL=https://sourcemap.webfe.shopeemobile.com/pcmall-pagebuilder/_/2781.8903c15c1c42c0fe1008.js.map