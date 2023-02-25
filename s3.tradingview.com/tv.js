"use strict";
! function() {
    if (window.TradingView && window.TradingView.host && !window.TradingView.reoloadTvjs) return;
    var e = {
        "color-gull-gray": "#9db2bd",
        "color-brand": "#2962FF",
        "color-brand-hover": "#1E53E5",
        "color-brand-active": "#1848CC"
    };
    const t = new RegExp("^http(s)?:(//)?");
    var o, i, r, n, s, a, d, l = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
        h = {
            host: null == window.location.host.match(/tradingview\.com|pyrrosinvestment\.com/i) ? "https://s.tradingview.com" : "https://www.tradingview.com",
            ideasHost: "https://www.tradingview.com",
            chatHost: "https://www.tradingview.com",
            widgetHost: "https://www.tradingview-widget.com",
            getHost: function(e) {
                return e.useWidgetHost ? h.widgetHost : h.host
            },
            embedStylesForCopyright: function() {
                var t = document.createElement("style");
                return t.innerHTML = ".tradingview-widget-copyright {font-size: 13px !important; line-height: 32px !important; text-align: center !important; vertical-align: middle !important; font-family: " + l + " !important; color: " + e["color-gull-gray"] + " !important;} .tradingview-widget-copyright .blue-text {color: " + e["color-brand"] + " !important;} .tradingview-widget-copyright a {text-decoration: none !important; color: " + e["color-gull-gray"] + " !important;} .tradingview-widget-copyright a:visited {color: " + e["color-gull-gray"] + " !important;} .tradingview-widget-copyright a:hover .blue-text {color: " + e["color-brand-hover"] + " !important;} .tradingview-widget-copyright a:active .blue-text {color: " + e["color-brand-active"] + " !important;} .tradingview-widget-copyright a:visited .blue-text {color: " + e["color-brand"] + " !important;}", t
            },
            embedStylesForFullHeight: function(e, t, o) {
                var i = t ? "calc(" + e + " - 32px)" : e,
                    r = document.querySelector("#" + o);
                r.parentElement.style.height = i, r.style.height = "100%"
            },
            gId: function() {
                return "tradingview_" + (1048576 * (1 + Math.random()) | 0).toString(16).substring(1)
            },
            isPersentHeight: function(e) {
                return "%" === e
            },
            getSuffix: function(e) {
                var t = e.toString().match(/(%|px|em|ex)/);
                return t ? t[0] : "px"
            },
            hasCopyright: function(e) {
                var t = document.getElementById(e),
                    o = t && t.parentElement;
                return !!o && !!o.querySelector(".tradingview-widget-copyright")
            },
            calculateWidgetHeight: function(e, t) {
                var o = parseInt(e),
                    i = this.getSuffix(e),
                    r = this.isPersentHeight(i),
                    n = t && this.hasCopyright(t);
                return r && t && (this.embedStylesForFullHeight(o + i, n, t), n) ? 100 + i : n ? "calc(" + o + i + " - 32px)" : o + i
            },
            onready: function(e) {
                window.addEventListener ? window.addEventListener("DOMContentLoaded", e, !1) : window.attachEvent("onload", e)
            },
            css: function(e) {
                var t, o = document.getElementsByTagName("head")[0],
                    i = document.createElement("style");
                i.type = "text/css", i.styleSheet ? i.styleSheet.cssText = e : (t = document.createTextNode(e), i.appendChild(t)), o.appendChild(i)
            },
            bindEvent: function(e, t, o) {
                e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent && e.attachEvent("on" + t, o)
            },
            unbindEvent: function(e, t, o) {
                e.removeEventListener ? e.removeEventListener(t, o, !1) : e.detachEvent && e.detachEvent("on" + t, o)
            },
            cloneSimpleObject: function(e) {
                if (null == e || "object" != typeof e) return e;
                var t = e.constructor();
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                return t
            },
            isArray: function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            isMobileDevice: (o = {
                Android: /Android/i.test(navigator.userAgent),
                BlackBerry: /BlackBerry/i.test(navigator.userAgent),
                iOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
                Opera: /Opera Mini/i.test(navigator.userAgent)
            }, o.any = o.Android || o.BlackBerry || o.iOS || o.Opera, o),
            generateUtmForUrlParams: function(e) {
                return "utm_source=" + encodeURI(window.location.hostname) + "&utm_medium=" + (h.hasCopyright(e.container) ? "widget_new" : "widget") + (e.type ? "&utm_campaign=" + e.type : "") + (e.type && "chart" === e.type ? "&utm_term=" + encodeURIComponent(e.symbol) : "")
            },
            getPageUriString: function() {
                const e = location.href,
                    o = this.invalidUrl(e);
                return o || e.replace(t, "")
            },
            invalidUrl: function(e) {
                try {
                    const o = new URL(e);
                    return t.test(o.protocol) ? null : "__NHTTP__"
                } catch (e) {
                    return "__FAIL__"
                }
            },
            WidgetAbstract: function() {},
            MiniWidget: function(e) {
                this.id = h.gId(), this.options = {
                    whitelabel: e.whitelabel || "",
                    width: h.WidgetAbstract.prototype.fixSize(e.width) || 300,
                    height: h.WidgetAbstract.prototype.fixSize(e.height) || 400,
                    symbols: e.symbols,
                    tabs: e.tabs || "",
                    symbols_description: e.symbols_description || "",
                    customer: e.customer || "",
                    container: e.container_id || "",
                    greyText: e.greyText || "",
                    large_chart_url: e.large_chart_url || "",
                    large_chart_target: e.large_chart_target || "",
                    gridLineColor: e.gridLineColor || "",
                    fontColor: e.fontColor || "",
                    widgetFontColor: e.widgetFontColor || "",
                    underLineColor: e.underLineColor || "",
                    underLineBottomColor: e.underLineBottomColor || "",
                    trendLineColor: e.trendLineColor || "",
                    timeAxisBackgroundColor: e.timeAxisBackgroundColor || "",
                    activeTickerBackgroundColor: e.activeTickerBackgroundColor || "",
                    noGraph: e.noGraph || !1,
                    locale: e.locale,
                    styleTickerActiveBg: e.styleTickerActiveBg || "",
                    styleTabActiveBorderColor: e.styleTabActiveBorderColor || "",
                    styleTickerBodyFontSize: e.styleTickerBodyFontSize || "",
                    styleTickerBodyFontWeight: e.styleTickerBodyFontWeight || "",
                    styleTickerHeadFontSize: e.styleTickerHeadFontSize || "",
                    styleTickerHeadFontWeight: e.styleTickerHeadFontWeight || "",
                    styleTickerChangeDownColor: e.styleTickerChangeDownColor || "",
                    styleTickerChangeUpColor: e.styleTickerChangeUpColor || "",
                    styleTickerLastDownBg: e.styleTickerLastDownBg || "",
                    styleTickerLastUpBg: e.styleTickerLastUpBg || "",
                    styleTickerSymbolColor: e.styleTickerSymbolColor || "",
                    styleTickerSymbolHoverTextDecoration: e.styleTickerSymbolHoverTextDecoration || "",
                    styleTickerActiveSymbolTextDecoration: e.styleTickerActiveSymbolTextDecoration || "",
                    styleTabsActiveBorderColor: e.styleTabsActiveBorderColor || "",
                    styleTabsNoBorder: e.styleTabsNoBorder || "",
                    styleWidgetNoBorder: e.styleWidgetNoBorder || "",
                    useWidgetHost: Boolean(e.useWidgetHost)
                }, this.createWidget()
            },
            MediumWidget: function(e) {
                this.id = h.gId();
                const t = h.calculateWidgetHeight(e.height || 400, e.container_id);
                let o;
                switch (e.chartType) {
                    case "candlesticks":
                        {
                            const {
                                chartType: t,
                                upColor: i,
                                downColor: r,
                                borderUpColor: n,
                                borderDownColor: s,
                                wickUpColor: a,
                                wickDownColor: d
                            } = e;o = {
                                chartType: t,
                                upColor: i,
                                downColor: r,
                                borderUpColor: n,
                                borderDownColor: s,
                                wickUpColor: a,
                                wickDownColor: d
                            };
                            break
                        }
                    case "bars":
                        {
                            const {
                                chartType: t,
                                upColor: i,
                                downColor: r
                            } = e;o = {
                                chartType: t,
                                upColor: i,
                                downColor: r
                            };
                            break
                        }
                    case "line":
                        {
                            const {
                                chartType: t,
                                color: i,
                                colorGrowing: r,
                                colorFalling: n,
                                lineWidth: s
                            } = e;o = {
                                chartType: t,
                                color: i,
                                colorGrowing: r,
                                colorFalling: n,
                                lineWidth: s
                            };
                            break
                        }
                    case "area":
                    default:
                        {
                            const {
                                chartType: t = "area",
                                lineColor: i = e.trendLineColor || "",
                                lineColorGrowing: r,
                                lineColorFalling: n,
                                topColor: s = e.underLineColor || "",
                                bottomColor: a = e.underLineBottomColor || "",
                                lineWidth: d
                            } = e;o = {
                                chartType: t,
                                lineColor: i,
                                lineColorGrowing: r,
                                lineColorFalling: n,
                                topColor: s,
                                bottomColor: a,
                                lineWidth: d
                            };
                            break
                        }
                }
                this.options = {
                    container: e.container_id || "",
                    width: h.WidgetAbstract.prototype.fixSize(e.width) || "",
                    height: h.WidgetAbstract.prototype.fixSize(t) || "",
                    symbols: e.symbols,
                    greyText: e.greyText || "",
                    symbols_description: e.symbols_description || "",
                    large_chart_url: e.large_chart_url || "",
                    customer: e.customer || "",
                    backgroundColor: e.backgroundColor || "",
                    gridLineColor: e.gridLineColor || "",
                    fontColor: e.fontColor || "",
                    fontSize: e.fontSize || "",
                    widgetFontColor: e.widgetFontColor || "",
                    timeAxisBackgroundColor: e.timeAxisBackgroundColor || "",
                    chartOnly: !!e.chartOnly,
                    locale: e.locale,
                    whitelabel: !!e.whitelabel || "",
                    colorTheme: e.colorTheme,
                    isTransparent: e.isTransparent,
                    useWidgetHost: Boolean(e.useWidgetHost),
                    showFloatingTooltip: e.showFloatingTooltip,
                    valuesTracking: e.valuesTracking,
                    changeMode: e.changeMode,
                    dateFormat: e.dateFormat,
                    timeHoursFormat: e.timeHoursFormat,
                    showVolume: e.showVolume,
                    volumeUpColor: e.volumeUpColor,
                    volumeDownColor: e.volumeDownColor,
                    hideDateRanges: e.hideDateRanges,
                    hideMarketStatus: e.hideMarketStatus,
                    hideSymbolLogo: e.hideSymbolLogo,
                    scalePosition: e.scalePosition,
                    scaleMode: e.scaleMode,
                    fontFamily: e.fontFamily,
                    noTimeScale: e.noTimeScale,
                    ...o
                }, this.createWidget()
            },
            widget: function(e) {
                this.id = e.id || h.gId();
                var t = h.getUrlParams(),
                    o = e.tvwidgetsymbol || t.tvwidgetsymbol || t.symbol || e.symbol || "NASDAQ:AAPL",
                    i = e.logo || "";
                i.src && (i = i.src), i && i.replace(".png", "");
                var r = h.calculateWidgetHeight(e.height || 500, e.container_id);
                this.options = {
                    whitelabel: e.whitelabel || "",
                    width: e.width || 800,
                    height: r,
                    symbol: o,
                    interval: e.interval || "1",
                    range: e.range || "",
                    timezone: e.timezone || "",
                    autosize: e.autosize,
                    hide_top_toolbar: e.hide_top_toolbar,
                    hide_side_toolbar: e.hide_side_toolbar,
                    hide_legend: e.hide_legend,
                    allow_symbol_change: e.allow_symbol_change,
                    save_image: void 0 === e.save_image || e.save_image,
                    container: e.container_id || "",
                    toolbar_bg: e.toolbar_bg || "f4f7f9",
                    watchlist: e.watchlist || [],
                    editablewatchlist: !!e.editablewatchlist,
                    studies: e.studies || [],
                    theme: e.theme || "",
                    style: e.style || "",
                    extended_hours: void 0 === e.extended_hours ? void 0 : +e.extended_hours,
                    details: !!e.details,
                    calendar: !!e.calendar,
                    hotlist: !!e.hotlist,
                    hideideas: !!e.hideideas,
                    hideideasbutton: !!e.hideideasbutton,
                    widgetbar_width: +e.widgetbar_width || void 0,
                    withdateranges: e.withdateranges || "",
                    customer: e.customer || i || "",
                    venue: e.venue,
                    symbology: e.symbology,
                    logo: i,
                    show_popup_button: !!e.show_popup_button,
                    popup_height: e.popup_height || "",
                    popup_width: e.popup_width || "",
                    studies_overrides: e.studies_overrides,
                    overrides: e.overrides,
                    enabled_features: e.enabled_features,
                    disabled_features: e.disabled_features,
                    publish_source: e.publish_source || "",
                    enable_publishing: e.enable_publishing,
                    whotrades: e.whotrades || void 0,
                    locale: e.locale,
                    referral_id: e.referral_id,
                    no_referral_id: e.no_referral_id,
                    fundamental: e.fundamental,
                    percentage: e.percentage,
                    hidevolume: e.hidevolume,
                    padding: e.padding,
                    greyText: e.greyText || "",
                    horztouchdrag: e.horztouchdrag,
                    verttouchdrag: e.verttouchdrag,
                    useWidgetHost: Boolean(e.useWidgetHost)
                }, e.cme && (this.options.customer = "cme"), isFinite(e.widgetbar_width) && e.widgetbar_width > 0 && (this.options.widgetbar_width = e.widgetbar_width), this._ready_handlers = [], this.create()
            },
            chart: function(e) {
                this.id = h.gId(), this.options = {
                    width: e.width || 640,
                    height: e.height || 500,
                    container: e.container_id || "",
                    realtime: e.realtime,
                    chart: e.chart,
                    locale: e.locale,
                    type: "chart",
                    autosize: e.autosize,
                    mobileStatic: e.mobileStatic
                }, this._ready_handlers = [], this.create()
            },
            stream: function(e) {
                this.id = h.gId(), this.options = {
                    width: e.width || 640,
                    height: e.height || 500,
                    container: e.container_id || "",
                    stream: e.stream,
                    locale: e.locale,
                    autosize: e.autosize
                }, this.create()
            },
            EventsWidget: function(e) {
                this.id = h.gId(), this.options = {
                    container: e.container_id || "",
                    width: e.width || 486,
                    height: e.height || 670,
                    currency: e.currencyFilter || "",
                    importance: e.importanceFilter || "",
                    type: "economic-calendar"
                }, this.createWidget(e)
            },
            IdeasStreamWidget: function(e) {
                this.id = h.gId(), this.options = {
                    container: e.container_id || "",
                    width: e.width || 486,
                    height: e.height || 670,
                    symbol: e.symbol || "",
                    username: e.username || "",
                    mode: e.mode || "",
                    publishSource: e.publishSource || "",
                    sort: e.sort || "trending",
                    stream: e.stream,
                    waitSymbol: e.waitSymbol,
                    hideDescription: e.hideDescription,
                    startingCount: e.startingCount,
                    bgColor: e.bgColor || "",
                    headerColor: e.headerColor || "",
                    borderColor: e.borderColor || "",
                    locale: e.locale,
                    type: "ideas-stream",
                    useWidgetHost: Boolean(e.useWidgetHost)
                }, this._ready_handlers = [], this.createWidget()
            },
            IdeaWidget: function(e) {
                this.id = h.gId(), this.options = {
                    container: e.container_id || "",
                    width: e.width || 486,
                    height: e.height || 670,
                    idea: e.idea || "",
                    chartUrl: e.chartUrl || "",
                    whotrades: e.whotrades || void 0,
                    locale: e.locale,
                    type: "idea"
                }, this.createWidget(e)
            },
            ChatWidgetEmbed: function(e) {
                this.id = h.gId(), this.options = {
                    container: e.container_id || "",
                    width: e.width || 400,
                    height: e.height || 500,
                    room: e.room || "",
                    whotrades: e.whotrades || void 0,
                    locale: e.locale,
                    type: "chat-embed"
                }, this.createWidget(e)
            }
        };
    h.WidgetAbstract.prototype = {
        fixSize: function(e) {
            return /^[0-9]+(\.|,[0-9])*$/.test(e) ? e + "px" : e
        },
        width: function() {
            return this.options.autosize ? "100%" : h.WidgetAbstract.prototype.fixSize(this.options.width)
        },
        height: function() {
            return this.options.autosize ? "100%" : h.WidgetAbstract.prototype.fixSize(this.options.height)
        },
        addWrapperFrame: function(e, t, o) {
            var i = h.WidgetAbstract.prototype.height.call(this),
                r = h.WidgetAbstract.prototype.width.call(this);
            o = o || "transparent";
            return '<div id="' + this.id + '-wrapper" style="position: relative;box-sizing: content-box;width: ' + r + ";height: " + i + ";margin: 0 auto !important;padding: 0 !important;font-family: " + l + ';"><div style="width: ' + r + ";height: " + i + ";background: " + o + ';padding: 0 !important;">' + e + "</div>" + (t || "") + "</div>"
        },
        addFooterLogo: function(e, t) {
            var o = (t || {}).greyText || "powered by",
                i = (t || {}).linkText || "tradingview.com",
                r = (t || {}).href || "https://www.tradingview.com/";
            return h.WidgetAbstract.prototype.addWrapperFrame.call(this, e, '<div style="position:absolute;display: block;box-sizing: content-box;height: 24px;width: ' + h.WidgetAbstract.prototype.width.call(this) + ";bottom: 0;left: 0;margin: 0;padding: 0;font-family: " + l + ';"><div style="display: block;margin: 0 1px 1px 1px;line-height: 7px;box-sizing: content-box;height: 11px;padding: 6px 10px;text-align: right;background: #fff;"><a href="' + r + "?" + h.generateUtmForUrlParams(this.options) + '" target="_blank" style="color: #0099d4;text-decoration: none;font-size: 11px;"><span style="color: #b4b4b4;font-size: 11px;">' + o + "</span> " + i + "</a></div></div>", "#fff")
        }
    }, h.ChatWidgetEmbed.prototype = {
        createWidget: function() {
            var e = this.widgetCode();
            e = h.WidgetAbstract.prototype.addFooterLogo.call(this, e), c(e, this.options.container)
        },
        widgetCode: function() {
            var e = this.options.room ? "#" + encodeURIComponent(this.options.room) : "",
                t = "&" + h.createUrlParams({
                    whotrades: this.options.whotrades,
                    locale: this.options.locale
                }),
                o = h.generateUtmForUrlParams(this.options, {
                    type: "UserInfoWidget"
                });
            return '<iframe src="' + (h.chatHost + "/chatwidgetembed/?" + o + t + e) + '"' + (this.options.width ? ' width="' + this.options.width + '"' : "") + (this.options.height ? ' height="' + this.options.height + '"' : "") + ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
        }
    }, h.IdeaWidget.prototype = {
        createWidget: function() {
            var e = this.widgetCode();
            c(e, this.options.container);
            var t = this,
                o = document.getElementById(this.id);
            this.postMessage = h.postMessageWrapper(o.contentWindow, this.id), this.postMessage.on("resize", (function(e) {
                e.id === t.id && (o.style.height = e.height + "px")
            }), !0)
        },
        widgetCode: function() {
            var e = h.createUrlParams({
                id: this.id,
                width: this.options.width,
                height: this.options.height,
                idea: this.options.idea,
                chart_url: this.options.chartUrl,
                whotrades: this.options.whotrades,
                locale: this.options.locale
            });
            this.options.type = "idea";
            var t = "&" + h.generateUtmForUrlParams(this.options),
                o = h.ideasHost + "/idea-popup/?" + e + t;
            return '<iframe id="' + this.id + '" src="' + o + '" width="' + this.options.width + '"' + (this.options.height ? ' height="' + this.options.height + '"' : "") + ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
        },
        getSymbol: function(e) {
            this.postMessage.on("symbolInfo", e)
        }
    }, h.EventsWidget.prototype = {
        createWidget: function() {
            var e = this.widgetCode();
            c(e, this.options.container)
        },
        widgetCode: function() {
            var e = h.createUrlParams({
                currency: this.options.currency,
                importance: this.options.importance
            });
            this.options.type = "events";
            var t = "&" + h.generateUtmForUrlParams(this.options);
            return '<iframe src="' + (h.getHost(this.options) + "/eventswidgetembed/?" + e + t) + '" width="' + this.options.width + '"' + (this.options.height ? ' height="' + this.options.height + '"' : "") + ' frameborder="0" scrolling="no"></iframe>'
        }
    }, h.IdeasStreamWidget.prototype = {
        createWidget: function() {
            var e = this.widgetCode();
            c(e, this.options.container);
            var t = this,
                o = document.getElementById(this.id);
            this.postMessage = h.postMessageWrapper(o.contentWindow, this.id), h.bindEvent(o, "load", (function() {
                t._ready = !0;
                for (var e = t._ready_handlers.length; e--;) t._ready_handlers[e].call(t)
            })), t.postMessage.on("resize", (function(e) {
                if (e.id === t.id) {
                    var i = Math.max(e.height, 450);
                    o.style.height = i + "px"
                }
            }), !0)
        },
        widgetCode: function() {
            var e = this.options,
                t = h.createUrlParams({
                    id: this.id,
                    width: e.width,
                    height: e.height,
                    symbol: e.symbol,
                    username: e.username,
                    mode: e.mode,
                    publish_source: e.publishSource,
                    sort: e.sort,
                    stream: e.stream,
                    wait_symbol: e.waitSymbol,
                    hide_desc: e.hideDescription,
                    s_count: e.startingCount,
                    bg_color: e.bgColor,
                    h_color: e.headerColor,
                    borderColor: e.borderColor,
                    locale: e.locale,
                    useWidgetHost: Boolean(e.useWidgetHost)
                }),
                o = h.generateUtmForUrlParams(this.options) + "&",
                i = h.getHost(e) + "/ideaswidgetembed/?" + o + t;
            return '<iframe id="' + this.id + '" src="' + i + '" width="' + e.width + '"' + (e.height ? ' height="' + e.height + '"' : "") + ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
        },
        setSymbol: function(e) {
            var t = document.getElementById(this.id);
            this.postMessage.post(t.contentWindow, "setSymbol", e)
        },
        ready: function(e) {
            this._ready ? e.call(this) : this._ready_handlers.push(e)
        }
    }, h.MiniWidget.prototype = {
        createWidget: function() {
            var e = this.widgetCode(),
                t = this.options;
            if (!t.noLogoOverlay && !t.whitelabel) {
                var o = this.options.greyText || "Quotes by";
                e = h.WidgetAbstract.prototype.addFooterLogo.call(this, e, {
                    greyText: o,
                    linkText: "TradingView"
                })
            }
            c(e, t.container)
        },
        widgetCode: function() {
            var e = "",
                t = "",
                o = "",
                i = "/miniwidgetembed/",
                r = this.options.width ? "&width=" + encodeURIComponent(this.options.width) : "",
                n = this.options.height ? "&height=" + encodeURIComponent(this.options.height) : "",
                s = this.options.noGraph ? "&noGraph=" + encodeURIComponent(this.options.noGraph) : "",
                a = this.options.locale ? "&locale=" + encodeURIComponent(this.options.locale) : "",
                d = this.options.whitelabel ? "&whitelabel=1" : "";
            this.options.type = "market-overview";
            for (var l = "&" + h.generateUtmForUrlParams(this.options), c = ["large_chart_url", "large_chart_target", "backgroundColor", "gridLineColor", "fontColor", "underLineColor", "underLineBottomColor", "trendLineColor", "activeTickerBackgroundColor", "timeAxisBackgroundColor", "locale", "styleTickerActiveBg", "styleTabActiveBorderColor", "styleTickerBodyFontSize", "styleTickerBodyFontWeight", "styleTickerHeadFontSize", "styleTickerHeadFontWeight", "styleTickerChangeDownColor", "styleTickerChangeUpColor", "styleTickerLastDownBg", "styleTickerLastUpBg", "styleTickerSymbolColor", "styleTickerSymbolHoverTextDecoration", "styleTickerActiveSymbolTextDecoration", "styleTabsActiveBorderColor", "styleTabsNoBorder", "styleWidgetNoBorder"], p = "", g = c.length - 1; g >= 0; g--) {
                var m = c[g],
                    u = this.options[m];
                p += u ? "&" + m + "=" + encodeURIComponent(u) : ""
            }
            var y = function(e) {
                for (var t = [], i = 0; i < e.length; i++) {
                    var r = e[i];
                    if (h.isArray(r)) {
                        var n = encodeURIComponent(r[0]),
                            s = encodeURIComponent(r[1]);
                        t.push(n), o += "&" + n + "=" + s
                    } else "string" == typeof r && t.push(encodeURIComponent(r))
                }
                return t.join(",")
            };
            if (this.options.tabs) {
                g = 0;
                for (var w = this.options.tabs.length; g < w; g++) {
                    var b = this.options.tabs[g];
                    this.options.symbols[b] && (e += (e ? "&" : "") + encodeURIComponent(b) + "=" + y(this.options.symbols[b]))
                }
                t = "&tabs=" + encodeURIComponent(this.options.tabs.join(","))
            } else this.options.symbols && (e = "symbols=" + y(this.options.symbols));
            if (this.options.symbols_description)
                for (var f in this.options.symbols_description) o += "&" + encodeURIComponent(f) + "=" + encodeURIComponent(this.options.symbols_description[f]);
            this.options.customer && (i = "/" + this.options.customer + i);
            var v = h.getHost(this.options) + i + "?" + e + t + o + p + r + n + s + a + d + l;
            return '<iframe id="' + this.id + '" src="' + v + '" width="' + this.options.width + '"' + (this.options.height ? ' height="' + this.options.height + '"' : "") + ' frameborder="0" allowTransparency="true" scrolling="no" style="margin: 0 !important; padding: 0 !important;"></iframe>'
        },
        remove: function() {
            var e = document.getElementById("tradingview_widget");
            e.parentNode.removeChild(e)
        }
    }, h.MediumWidget.prototype = {
        createWidget: function() {
            var e = this.widgetCode();
            c(e, this.options.container)
        },
        widgetCode: function() {
            const e = Object.create(null);
            for (const t of ["symbols", "width", "height", "colorTheme", "backgroundColor", "gridLineColor", "fontColor", "widgetFontColor", "underLineColor", "underLineBottomColor", "trendLineColor", "activeTickerBackgroundColor", "timeAxisBackgroundColor", "scalePosition", "scaleMode", "chartType", "color", "colorGrowing", "colorFalling", "lineColor", "lineColorGrowing", "lineColorFalling", "topColor", "bottomColor", "upColor", "downColor", "borderUpColor", "borderDownColor", "wickUpColor", "wickDownColor", "fontFamily", "fontSize", "noTimeScale", "valuesTracking", "changeMode", "dateFormat", "timeHoursFormat", "lineWidth", "volumeUpColor", "volumeDownColor", "chartOnly", "whitelabel", "isTransparent", "showFloatingTooltip", "showVolume", "hideDateRanges", "hideMarketStatus", "hideSymbolLogo"]) this.options[t] && (e[t] = this.options[t]);
            e["page-uri"] = h.getPageUriString(), this.options.type = "symbol-overview";
            const t = h.generateUtmForUrlParams(this.options);
            for (const [o, i] of new URLSearchParams(t)) e[o] = i;
            const o = new URL("/embed-widget/symbol-overview/", h.getHost(this.options));
            return this.options.customer && (o.pathname += this.options.customer + "/"), this.options.locale && o.searchParams.append("locale", this.options.locale), o.hash = encodeURIComponent(JSON.stringify(e)), '<iframe id="' + this.id + '" src="' + o.href + '" style="margin: 0 !important; padding: 0 !important; ' + (this.options.width ? "width: " + this.options.width + "; " : "") + (this.options.height ? "height: " + this.options.height + ";" : "") + '" frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
        },
        remove: function() {
            var e = document.getElementById("tradingview_widget");
            e.parentNode.removeChild(e)
        }
    }, h.widget.prototype = {
        create: function() {
            this.options.type = this.options.fundamental ? "fundamental" : "chart";
            var e = this.render(),
                t = this;
            this.options.noLogoOverlay || (e = h.WidgetAbstract.prototype.addWrapperFrame.call(this, e)), c(e, this.options.container);
            var o = document.getElementById("tradingview-copyright");
            o && o.parentElement && o.parentElement.removeChild(o), this.iframe = document.getElementById(this.id), this.postMessage = h.postMessageWrapper(this.iframe.contentWindow, this.id), h.bindEvent(this.iframe, "load", (function() {
                t.postMessage.get("widgetReady", {}, (function() {
                    var e;
                    for (t._ready = !0, e = t._ready_handlers.length; e--;) t._ready_handlers[e].call(t)
                }))
            })), t.postMessage.on("logoCreated", (function(e) {
                if (e.left && e.bottom && e.width && e.height && e.href) {
                    t._logoOverlay && (t._logoOverlay.parentNode.removeChild(t._logoOverlay), delete t._logoOverlay);
                    var o = document.createElement("a");
                    e.text && (o.textContent = e.text, o.style.color = "transparent"), o.style.position = "absolute", o.style.display = "inline-block", o.style.left = e.left, o.style.bottom = e.bottom, o.style.width = e.width, o.style.height = e.height, o.style.backgroundColor = "transparent", o.style.pointerEvents = "none", o.href = e.href, o.setAttribute("target", "_blank"), t._logoOverlay = o, document.getElementById(t.id + "-wrapper").appendChild(o)
                }
            })), t.postMessage.on("setLogoOverlayVisibility", (function(e) {
                t._logoOverlay && e && "boolean" == typeof e.visible && (t._logoOverlay.style.display = e.visible ? "inline-block" : "none")
            })), t.postMessage.on("openChartInPopup", (function(e) {
                for (var o = h.cloneSimpleObject(t.options), i = ["symbol", "interval"], r = i.length - 1; r >= 0; r--) {
                    var n = i[r],
                        s = e[n];
                    s && (o[n] = s)
                }
                o.show_popup_button = !1;
                var a = t.options.popup_width || 900,
                    d = t.options.popup_height || 600,
                    l = (screen.width - a) / 2,
                    c = (screen.height - d) / 2,
                    p = window.open(t.generateUrl(o), "_blank", "resizable=yes, top=" + c + ", left=" + l + ", width=" + a + ", height=" + d);
                p && (p.opener = null)
            }))
        },
        ready: function(e) {
            this._ready ? e.call(this) : this._ready_handlers.push(e)
        },
        render: function() {
            var e = this.generateUrl();
            return '<iframe id="' + this.id + '" src="' + e + '" style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;" frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen></iframe>'
        },
        generateUrl: function(e) {
            var t;

            function o(t, o) {
                return o = o || t, void 0 === e[t] ? "" : "&" + encodeURIComponent(o) + "=" + (e[t] ? "1" : "0")
            }

            function i(t, o, i) {
                return i = i || t, e[t] ? "&" + i + "=" + o : ""
            }

            function r(t, o, i) {
                return i = i || {}, "&" + t + "=" + (e[t] ? encodeURIComponent(JSON.stringify(o)) : encodeURIComponent(JSON.stringify(i)))
            }
            t = "cme" === (e = e || this.options).customer ? "/cmewidgetembed/" : e.customer ? "/" + e.customer + "/widgetembed/" : "/widgetembed/";
            const n = Object.create(null);
            var s = (e.enable_publishing ? h.ideasHost : h.getHost(e)) + t + "?frameElementId=" + this.id + "&symbol=" + encodeURIComponent(e.symbol) + "&interval=" + encodeURIComponent(e.interval) + (e.range ? "&range=" + encodeURIComponent(e.range) : "") + (e.whitelabel ? "&whitelabel=1" : "") + (e.hide_top_toolbar ? "&hidetoptoolbar=1" : "") + (e.hide_legend ? "&hidelegend=1" : "") + o("hide_side_toolbar", "hidesidetoolbar") + o("allow_symbol_change", "symboledit") + o("save_image", "saveimage") + "&toolbarbg=" + e.toolbar_bg.replace("#", "") + (e.watchlist && e.watchlist.length && e.watchlist.join ? "&watchlist=" + encodeURIComponent(e.watchlist.join("")) : "") + i("editablewatchlist", "1") + i("details", "1") + i("calendar", "1") + i("hotlist", "1") + (e.studies && h.isArray(e.studies) ? "string" == typeof e.studies[0] ? i("studies", encodeURIComponent(e.studies.join(""))) : r("studies", e.studies) : "") + o("horztouchdrag") + o("verttouchdrag") + i("widgetbar_width", e.widgetbar_width, "widgetbarwidth") + i("hideideas", "1") + i("theme", encodeURIComponent(e.theme)) + i("style", encodeURIComponent(e.style)) + (void 0 === e.extended_hours ? "" : "&extended_hours=" + e.extended_hours) + i("timezone", encodeURIComponent(e.timezone)) + i("hideideasbutton", "1") + i("withdateranges", "1") + i("hidevolume", "1") + (void 0 === e.padding ? "" : "&padding=" + e.padding) + i("show_popup_button", "1", "showpopupbutton") + r("studies_overrides", e.studies_overrides, {}) + r("overrides", e.overrides, {}) + r("enabled_features", e.enabled_features, []) + r("disabled_features", e.disabled_features, []) + (e.show_popup_button ? "&showpopupbutton=1" : "") + (e.publish_source ? "&publishsource=" + encodeURIComponent(e.publish_source) : "") + (e.enable_publishing ? "&enablepublishing=" + encodeURIComponent(e.enable_publishing) : "") + (e.venue ? "&venue=" + encodeURIComponent(e.venue) : "") + (e.symbology ? "&symbology=" + encodeURIComponent(e.symbology) : "") + (e.whotrades ? "&whotrades=" + encodeURIComponent(e.whotrades) : "") + (e.locale ? "&locale=" + e.locale : "") + (e.referral_id ? "&referral_id=" + e.referral_id : "") + (e.no_referral_id ? "&no_referral_id=1" : "") + (e.fundamental ? "&fundamental=" + encodeURIComponent(e.fundamental) : "") + (e.percentage ? "&percentage=" + encodeURIComponent(e.percentage) : "") + "&utm_source=" + encodeURI(window.location.hostname) + "&utm_medium=" + (h.hasCopyright(e.container) ? "widget_new" : "widget") + (e.type ? "&utm_campaign=" + e.type : "") + (e.type && "chart" === e.type ? "&utm_term=" + encodeURIComponent(e.symbol) : "");
            return n["page-uri"] = h.getPageUriString(), s = s + "#" + encodeURIComponent(JSON.stringify(n))
        },
        image: function(e) {
            this.postMessage.get("imageURL", {}, (function(t) {
                var o = h.host + "/x/" + t + "/";
                e(o)
            }))
        },
        subscribeToQuote: function(e) {
            var t = document.getElementById(this.id);
            this.postMessage.post(t.contentWindow, "quoteSubscribe"), this.postMessage.on("quoteUpdate", e)
        },
        getSymbolInfo: function(e) {
            this.postMessage.get("symbolInfo", {}, e)
        },
        remove: function() {
            var e = document.getElementById(this.id);
            e.parentNode.removeChild(e)
        },
        reload: function() {
            var e = document.getElementById(this.id),
                t = e.parentNode;
            t.removeChild(e), t.innerHTML = this.render()
        }
    }, h.chart.prototype = {
        create: function() {
            this.isMobile = h.isMobileDevice.any;
            var e, t = this.render(),
                o = this;
            h.chartCssAttached || (h.css(this.renderCss()), h.chartCssAttached = !0), c(t, this.options.container), e = document.getElementById(this.id), h.bindEvent(e, "load", (function() {
                var e;
                for (o._ready = !0, e = o._ready_handlers.length; e--;) o._ready_handlers[e].call(o)
            })), h.onready((function() {
                var t = !1;
                if (document.querySelector && document.querySelector('a[href$="/v/' + o.options.chart + '/"]') && (t = !0), !t)
                    for (var i = document.getElementsByTagName("a"), r = new RegExp("/v/" + o.options.chart + "/$"), n = new RegExp("/chart/([0-9a-zA-Z:+*-/()]+)/" + o.options.chart), s = 0; s < i.length; s++)
                        if (r.test(i[s].href) || n.test(i[s].href)) {
                            t = !0;
                            break
                        }
                t && (e.src += "#nolinks", e.name = "nolinks")
            })), this.postMessage = h.postMessageWrapper(e.contentWindow, this.id), this.postMessage.on("toggleFullscreen", (function(t) {
                e.contentWindow === this.source && o.toggleFullscreen(t.value)
            }), !0)
        },
        ready: h.widget.prototype.ready,
        renderCss: function() {
            return ".tradingview-widget {position: relative;}"
        },
        render: function() {
            var e = this.options.mobileStatic && this.isMobile ? h.host + "/embed-static/" : h.host + "/embed/",
                t = "?method=script" + (this.options.locale ? "&locale=" + encodeURIComponent(this.options.locale) : "");
            return this.options.type = "chart", '<div class="tradingview-widget" ' + (this.options.autosize ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : ' style="width:' + this.options.width + "px; height:" + this.options.height + 'px;"') + '><iframe id="' + this.id + '" src="' + e + this.options.chart + "/" + t + "&" + h.generateUtmForUrlParams(this.options) + '"' + (this.options.autosize ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : ' width="' + this.options.width + '" height="' + this.options.height + '"') + ' frameborder="0" allowTransparency="true" scrolling="no"></iframe></div>'
        },
        toggleFullscreen: function(e) {
            var t = document.getElementById(this.id);
            e ? (t.style.position = "fixed", t.style.width = "100vw", t.style.maxWidth = "100%", t.style.height = "100vh", t.style.maxHeight = "100%", t.style.left = "0px", t.style.top = "0px", t.style.zIndex = "1000000", t.style.backgroundColor = "#fff") : (t.style.position = "static", this.options.autosize ? (t.style.width = "100%", t.style.height = "100%") : (t.style.width = this.options.width + "px", t.style.height = this.options.height + "px"), t.style.maxWidth = "none", t.style.maxHeight = "none", t.style.zIndex = "auto", t.style.backgroundColor = "transparent")
        },
        getSymbolInfo: function(e) {
            this.postMessage.get("symbolInfo", {}, e)
        }
    }, h.stream.prototype = {
        create: function() {
            this.isMobile = h.isMobileDevice.any;
            var e = this.render();
            c(e, this.options.container)
        },
        render: function() {
            var e = "?" + (this.options.locale ? "&locale=" + encodeURIComponent(this.options.locale) : "");
            return this.options.type = "chart", '<div class="tradingview-widget" ' + (this.options.autosize ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : ' style="width:' + this.options.width + "px; height:" + this.options.height + 'px;"') + '><iframe id="' + this.id + '" src="' + h.host + this.options.stream + "/embed/" + e + "&" + h.generateUtmForUrlParams(this.options) + '"' + (this.options.autosize ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' : ' width="' + this.options.width + '" height="' + this.options.height + '"') + ' frameborder="0" allowTransparency="true" scrolling="no"></iframe></div>'
        }
    }, h.postMessageWrapper = (r = {}, n = {}, s = {}, a = 0, d = 0, window.addEventListener && window.addEventListener("message", (function(e) {
        var t;
        try {
            t = JSON.parse(e.data)
        } catch (e) {
            return
        }
        if (t && t.provider && "TradingView" === t.provider)
            if (t.source = e.source, "get" === t.type) {
                if (!n[t.name]) return;
                n[t.name].forEach((function(e) {
                    "function" == typeof e && e.call(t, t.data, (function(e) {
                        var o = {
                            id: t.id,
                            type: "on",
                            name: t.name,
                            client_id: t.client_id,
                            data: e,
                            provider: "TradingView"
                        };
                        i.postMessage(JSON.stringify(o), "*")
                    }))
                }))
            } else if ("on" === t.type) r[t.client_id] && r[t.client_id][t.id] && (r[t.client_id][t.id].call(t, t.data), delete r[t.client_id][t.id]);
        else if ("post" === t.type) {
            if (!n[t.name]) return;
            n[t.name].forEach((function(e) {
                "function" == typeof e && e.call(t, t.data, (function() {}))
            }))
        }
    })), function(e, t) {
        return r[t] = {}, s[t] = e, i = e, {
            on: function(e, t, o) {
                n[e] && o || (n[e] = []), n[e].push(t)
            },
            off: function(e, t) {
                if (!n[e]) return !1;
                var o = n[e].indexOf(t);
                o > -1 && n[e].splice(o, 1)
            },
            get: function(e, o, i) {
                var n = {
                    id: a++,
                    type: "get",
                    name: e,
                    client_id: t,
                    data: o,
                    provider: "TradingView"
                };
                r[t][n.id] = i, s[t].postMessage(JSON.stringify(n), "*")
            },
            post: function(e, t, o) {
                var i = {
                    id: d++,
                    type: "post",
                    name: t,
                    data: o,
                    provider: "TradingView"
                };
                e && "function" == typeof e.postMessage && e.postMessage(JSON.stringify(i), "*")
            }
        }
    }), h.getUrlParams = function() {
        for (var e = /\+/g, t = /([^&=]+)=?([^&]*)/g, o = window.location.search.substring(1), i = t.exec(o), r = function(t) {
                return decodeURIComponent(t.replace(e, " "))
            }, n = {}; i;) n[r(i[1])] = r(i[2]), i = t.exec(o);
        return n
    }, h.createUrlParams = function(e) {
        var t = [];
        for (var o in e) e.hasOwnProperty(o) && null != e[o] && t.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
        return t.join("&")
    };
    var c = function(e, t) {
            var o = document.getElementById(t);
            if (o) {
                o.innerHTML = e;
                var i = o.parentElement && o.parentElement.querySelector(".tradingview-widget-copyright");
                i && (i.style.width = o.querySelector("iframe").style.width)
            } else document.write(e);
            document.body.appendChild(h.embedStylesForCopyright())
        },
        p = function(e, t) {
            for (var o in t) "object" == typeof t[o] && e.hasOwnProperty(o) ? p(e[o], t[o]) : e[o] = t[o];
            return e
        };
    window.TradingView ? p(window.TradingView, h) : window.TradingView = h
}();