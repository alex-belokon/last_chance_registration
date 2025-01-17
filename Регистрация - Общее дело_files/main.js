$(function() {
    $.exitIntent('enable');
    $(document).bind('exitintent', function() {
        $(".modal_wr").addClass("active");
        $("body").addClass("no_scroll");
    });
});

$(".closing, .modal__close a").click(function() {
    $(".modal_wr").removeClass("active");
    $("body").removeClass("no_scroll");
});

function getCookie(n) {
    var t = " " + document.cookie,
        u = " " + n + "=",
        f = null,
        i = 0,
        r = 0;
    return t.length > 0 && (i = t.indexOf(u), i !== -1 && (i += u.length, r = t.indexOf(";", i), r === -1 && (r = t.length), f = unescape(t.substring(i, r)))), f
}

function setCookie(n, t, i) {
    var r, u, f, e, o;
    i = i || {};
    r = i.expires;
    typeof r == "number" && r && (u = new Date, u.setTime(u.getTime() + r * 1e3), r = i.expires = u);
    r && r.toUTCString && (i.expires = r.toUTCString());
    t = encodeURIComponent(t);
    f = n + "=" + t;
    for (e in i) f += "; " + e, o = i[e], o !== !0 && (f += "=" + o);
    document.cookie = f
}

function submitForm(n) {
    $("#Client_details" + t).validate();
    var i = !0,
        t = n;
    $.each($("#Client_details" + t + " .req"), function(n, t) {
        $(t).val() === "" && (i = !1)
    });
    i === !0 ? (LoaderOn(), $(".reg-btn").prop("disabled", !0), $.each($(".reg-form"), function(n, t) {
        $(t).find('input[name="Email"]').val().length > 0 && (email = $(t).find('input[name="Email"]').val(), name = $(t).find('input[name="FirstName"]').val())
    }), $("#Client_details" + t).submit()) : alert("Все поля обязательны!!!")
}

function ClientDetailsOnSuccess(n) {
    n.success === !0 ? (window.onbeforeunload = null, n.approve === !0 ? setTimeout(function() {
        window.location = "/approve"
    }, 1e3) : n.tologin === !0 ? setTimeout(function() {
        window.location = "/account/login"
    }, 1e3) : setTimeout(function() {
        window.location = "/"
    }, 1e3)) : (LoaderOff(), $(".reg-btn").prop("disabled", !1))
}

function sendForms(n, t) {
    if (!validateEmail(n)) {
        alert("Email имеет неверный формат!");
        return
    }
    var i = location.protocol + "//" + location.host + "/registration?email=" + n + "&username=" + t;
    window.location = i

    // var i = "";
    // i = 'Через 2 – 3 минуты на указанный email придет письмо с подробной инструкцией.  \n\nЕсли письмо не появилось в папке «Входящие», проверьте папку «Спам».\n\nЕсли вы не получили письмо в течение 30 минут, пожалуйста, обратитесь в тех. поддержку. \n\nПосле получения письма: \n1. Добавьте адрес отправителя в контакты\n2. Если письмо попало в папку «Спам», выделите его и нажмите «Не спам», чтобы  в дальнейшем гарантированно получать всю важную информацию по проекту «Общее дело».\n\nНе забудьте нажать кнопку "Ок"';
    // alert(i);
    // window.onbeforeunload = null;
    // LoaderOn();
    // $.get(subscriptionRefCodeUrl, {
    //     refcode: getCookie("refcode"),
    //     urlRef: document.referrer,
    //     email: n,
    //     name: t
    // }, function() {
    //     var i = location.protocol + "//" + location.host + "/registration?email=" + n + "&name=" + t;
    //     window.location = i
    // })
}

function SendReg(n, t, i, r, u, f, e) {
    if ($(".reg-btn").prop("disabled", !0), n === "" || t === "" || i === "" || r === "" || u === "" || f === "") {
        $("#" + e).text("Все поля обязательны!");
        $(".reg-btn").prop("disabled", !1);
        return
    }
    if (!validateEmail(i)) {
        $("#" + e).text("Email имеет неверный формат!");
        $(".reg-btn").prop("disabled", !1);
        return
    }
    LoaderOn();
    $.post("/home/register", {
        FirstName: n,
        LastName: t,
        Email: i,
        Password: r,
        PhoneCountryCode: u,
        PhoneNumber: f
    }, function(n) {
        n.success === !0 ? (window.onbeforeunload = null, window.location = n.approve === !0 ? "/approve" : n.tologin === !0 ? "/account/login" : "/") : (LoaderOff(), $("#" + e).html(n.error), $(".reg-btn").prop("disabled", !1))
    })
}

function validateEmail(n) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n)
}

function LoaderOn() {
    $(".preloader-wrapper").fadeToggle()
}

function LoaderOff() {
    $(".preloader-wrapper").fadeToggle()
}(function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery)
})(function(n) {
    function i(n) {
        return t.raw ? n : encodeURIComponent(n)
    }

    function f(n) {
        return t.raw ? n : decodeURIComponent(n)
    }

    function e(n) {
        return i(t.json ? JSON.stringify(n) : String(n))
    }

    function o(n) {
        n.indexOf('"') === 0 && (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            n = decodeURIComponent(n.replace(u, " "))
        } catch (i) {
            return
        }
        try {
            return t.json ? JSON.parse(n) : n
        } catch (i) {}
    }

    function r(i, r) {
        var u = t.raw ? i : o(i);
        return n.isFunction(r) ? r(u) : u
    }
    var u = /\+/g,
        t = n.cookie = function(u, o, s) {
            var y, a, h, v, c, p;
            if (o !== undefined && !n.isFunction(o)) return s = n.extend({}, t.defaults, s), typeof s.expires == "number" && (y = s.expires, a = s.expires = new Date, a.setDate(a.getDate() + y)), document.cookie = [i(u), "=", e(o), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("");
            for (h = u ? undefined : {}, v = document.cookie ? document.cookie.split("; ") : [], c = 0, p = v.length; c < p; c++) {
                var w = v[c].split("="),
                    b = f(w.shift()),
                    l = w.join("=");
                if (u && u === b) {
                    h = r(l, o);
                    break
                }
                u || (l = r(l)) === undefined || (h[b] = l)
            }
            return h
        };
    t.defaults = {};
    n.removeCookie = function(t, i) {
        return n.cookie(t) !== undefined ? (n.cookie(t, "", n.extend({}, i, {
            expires: -1
        })), !0) : !1
    }
}),
function(n) {
    function r(i) {
        0 < i.clientY || (t && clearTimeout(t), 0 >= n.exitIntent.settings.sensitivity ? n.event.trigger("exitintent") : t = setTimeout(function() {
            t = null;
            n.event.trigger("exitintent")
        }, n.exitIntent.settings.sensitivity))
    }

    function i() {
        t && (clearTimeout(t), t = null)
    }
    var t;
    n.exitIntent = function(t, u) {
        if (n.exitIntent.settings = n.extend(n.exitIntent.settings, u), "enable" == t) n(window).mouseleave(r), n(window).mouseenter(i);
        else if ("disable" == t) i(), n(window).unbind("mouseleave", r), n(window).unbind("mouseenter", i);
        else throw "Invalid parameter to jQuery.exitIntent -- should be 'enable'/'disable'";
    };
    n.exitIntent.settings = {
        sensitivity: 300
    }
}(jQuery);
var QueryString = function() {
        for (var n, u, t = {}, f = window.location.search.substring(1), r = f.split("&"), i = 0; i < r.length; i++) n = r[i].split("="), typeof t[n[0]] == "undefined" ? t[n[0]] = n[1] : typeof t[n[0]] == "string" ? (u = [t[n[0]], n[1]], t[n[0]] = u) : t[n[0]].push(n[1]);
        return t
    }(),
    email = "",
    name = "";
$(function() {
    function t(r, u) {
        var c = $(".done_block__reviews_items .review__item .review").length,
            f, e, h, o, s, l;
        if (c == 0)
            for (e = 0; e < r; e++) f = i(u), o = f[0], s = f[1], $(".done_block__reviews_items .review").append(o), u[e] = s;
        else h = n(0, c), f = i(u), o = f[0], s = f[1], $(".done_block__reviews_items .review")[h].outerHTML = $(o).html(), u[h] = s;
        l = n(3, 8) * 1e3;
        if ($('.done_block__reviews_items .review li').length > 2) {
            $(".done_block__reviews_items .review li").first().remove();
        }
        setTimeout(function() {
            t(1, u)
        }, l)
    }

    function o(n, t) {
        return n.indexOf(t) !== -1
    }

    function i(t) {
        for (var r = names.length, i = n(0, r), u, f; o(t, i);) i = n(0, r);
        return u = n(100, 600), f = '<li class="review__item"><div class="review__user_photo"><img src="img/users/' + i + '.jpg" alt=""></div><div class="review__info"><div class="review__info_name">' + names[i] + '</div><div class="review__info_signature">just made</div><div class="review__info_money">$ ' + u + "," + n(3, 7) + '</div></div></li>', [f, i]
    }

    function n(n, t) {
        return Math.floor(Math.random() * (t - n)) + n
    }

    function n(n, t) {
        return Math.floor(Math.random() * (t - n)) + n
    }

    function r(t) {
        $(".online .num").text(t);
        t = t < 245 ? t + n(-1, 3) : t - n(1, 3);
        var i = n(6, 9) * 1e3;
        setTimeout(function() {
            r(t)
        }, i)
    }

    function u(t) {
        $(".lasts .num").text(t);
        t = t > 5 ? t - n(1, 3) : t - n(-2, 2);
        t < 2 && (t = 1);
        var i = n(6, 9) * 1e3;
        setTimeout(function() {
            u(t)
        }, i)
    }
    names = ["David", "Mark", "Michael", "Sergio", "Mathew", "Nicolas", "Charles"];
    (new WOW).init();
    $(".navbar-tog").click(function() {
        $(this).toggleClass("navbar-on");
        $(".menu").toggleClass("menu-on")
    });
    $(".modal__blackout, .modal__close a").click(function() {
        $(".modal-wrapper").hide()
    });
    var s = n(105, 115),
        f, e;
    r(s);
    f = 20;
    u(f);
    e = [0];
    t(2, e);
    $(".done__reviews_items").slick({
        arrows: !1,
        dots: !1,
        slidesToShow: 2,
        slidesToScroll: 2,
        swipe: !1,
        autoplay: !0,
        autoplaySpeed: 2e3,
        speed: 0,
        responsive: [{
            breakpoint: 577,
            settings: {
                slidesToShow: 1
            }
        }]
    })
});
! function(n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], n) : "undefined" != typeof exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    "use strict";
    var t = window.Slick || {};
    (t = function() {
        var t = 0;
        return function(i, r) {
            var f, u = this;
            u.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: n(i),
                appendDots: n(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous<\/button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next<\/button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return n('<button type="button" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            };
            u.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            };
            n.extend(u, u.initials);
            u.activeBreakpoint = null;
            u.animType = null;
            u.animProp = null;
            u.breakpoints = [];
            u.breakpointSettings = [];
            u.cssTransitions = !1;
            u.focussed = !1;
            u.interrupted = !1;
            u.hidden = "hidden";
            u.paused = !0;
            u.positionProp = null;
            u.respondTo = null;
            u.rowCount = 1;
            u.shouldClick = !0;
            u.$slider = n(i);
            u.$slidesCache = null;
            u.transformType = null;
            u.transitionType = null;
            u.visibilityChange = "visibilitychange";
            u.windowWidth = 0;
            u.windowTimer = null;
            f = n(i).data("slick") || {};
            u.options = n.extend({}, u.defaults, r, f);
            u.currentSlide = u.options.initialSlide;
            u.originalSettings = u.options;
            void 0 !== document.mozHidden ? (u.hidden = "mozHidden", u.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (u.hidden = "webkitHidden", u.visibilityChange = "webkitvisibilitychange");
            u.autoPlay = n.proxy(u.autoPlay, u);
            u.autoPlayClear = n.proxy(u.autoPlayClear, u);
            u.autoPlayIterator = n.proxy(u.autoPlayIterator, u);
            u.changeSlide = n.proxy(u.changeSlide, u);
            u.clickHandler = n.proxy(u.clickHandler, u);
            u.selectHandler = n.proxy(u.selectHandler, u);
            u.setPosition = n.proxy(u.setPosition, u);
            u.swipeHandler = n.proxy(u.swipeHandler, u);
            u.dragHandler = n.proxy(u.dragHandler, u);
            u.keyHandler = n.proxy(u.keyHandler, u);
            u.instanceUid = t++;
            u.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            u.registerBreakpoints();
            u.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    };
    t.prototype.addSlide = t.prototype.slickAdd = function(t, i, r) {
        var u = this;
        if ("boolean" == typeof i) r = i, i = null;
        else if (i < 0 || i >= u.slideCount) return !1;
        u.unload();
        "number" == typeof i ? 0 === i && 0 === u.$slides.length ? n(t).appendTo(u.$slideTrack) : r ? n(t).insertBefore(u.$slides.eq(i)) : n(t).insertAfter(u.$slides.eq(i)) : !0 === r ? n(t).prependTo(u.$slideTrack) : n(t).appendTo(u.$slideTrack);
        u.$slides = u.$slideTrack.children(this.options.slide);
        u.$slideTrack.children(this.options.slide).detach();
        u.$slideTrack.append(u.$slides);
        u.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t)
        });
        u.$slidesCache = u.$slides;
        u.reinit()
    };
    t.prototype.animateHeight = function() {
        var n = this,
            t;
        1 === n.options.slidesToShow && !0 === n.options.adaptiveHeight && !1 === n.options.vertical && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.animate({
            height: t
        }, n.options.speed))
    };
    t.prototype.animateSlide = function(t, i) {
        var u = {},
            r = this;
        r.animateHeight();
        !0 === r.options.rtl && !1 === r.options.vertical && (t = -t);
        !1 === r.transformsEnabled ? !1 === r.options.vertical ? r.$slideTrack.animate({
            left: t
        }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
            top: t
        }, r.options.speed, r.options.easing, i) : !1 === r.cssTransitions ? (!0 === r.options.rtl && (r.currentLeft = -r.currentLeft), n({
            animStart: r.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function(n) {
                n = Math.ceil(n);
                !1 === r.options.vertical ? (u[r.animType] = "translate(" + n + "px, 0px)", r.$slideTrack.css(u)) : (u[r.animType] = "translate(0px," + n + "px)", r.$slideTrack.css(u))
            },
            complete: function() {
                i && i.call()
            }
        })) : (r.applyTransition(), t = Math.ceil(t), u[r.animType] = !1 === r.options.vertical ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(u), i && setTimeout(function() {
            r.disableTransition();
            i.call()
        }, r.options.speed))
    };
    t.prototype.getNavTarget = function() {
        var i = this,
            t = i.options.asNavFor;
        return t && null !== t && (t = n(t).not(i.$slider)), t
    };
    t.prototype.asNavFor = function(t) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = n(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    };
    t.prototype.applyTransition = function(n) {
        var t = this,
            i = {};
        i[t.transitionType] = !1 === t.options.fade ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase;
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    };
    t.prototype.autoPlay = function() {
        var n = this;
        n.autoPlayClear();
        n.slideCount > n.options.slidesToShow && (n.autoPlayTimer = setInterval(n.autoPlayIterator, n.options.autoplaySpeed))
    };
    t.prototype.autoPlayClear = function() {
        var n = this;
        n.autoPlayTimer && clearInterval(n.autoPlayTimer)
    };
    t.prototype.autoPlayIterator = function() {
        var n = this,
            t = n.currentSlide + n.options.slidesToScroll;
        n.paused || n.interrupted || n.focussed || (!1 === n.options.infinite && (1 === n.direction && n.currentSlide + 1 === n.slideCount - 1 ? n.direction = 0 : 0 === n.direction && (t = n.currentSlide - n.options.slidesToScroll, n.currentSlide - 1 == 0 && (n.direction = 1))), n.slideHandler(t))
    };
    t.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = n(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = n(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    };
    t.prototype.buildDots = function() {
        var i, r, t = this;
        if (!0 === t.options.dots) {
            for (t.$slider.addClass("slick-dotted"), r = n("<ul />").addClass(t.options.dotsClass), i = 0; i <= t.getDotCount(); i += 1) r.append(n("<li />").append(t.options.customPaging.call(this, t, i)));
            t.$dots = r.appendTo(t.options.appendDots);
            t.$dots.find("li").first().addClass("slick-active")
        }
    };
    t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
        t.slideCount = t.$slides.length;
        t.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t).data("originalStyling", n(i).attr("style") || "")
        });
        t.$slider.addClass("slick-slider");
        t.$slideTrack = 0 === t.slideCount ? n('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent();
        t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent();
        t.$slideTrack.css("opacity", 0);
        !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1);
        n("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading");
        t.setupInfinite();
        t.buildArrows();
        t.buildDots();
        t.updateDots();
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0);
        !0 === t.options.draggable && t.$list.addClass("draggable")
    };
    t.prototype.buildRows = function() {
        var t, i, r, f, c, u, e, n = this,
            o, s, h;
        if (f = document.createDocumentFragment(), u = n.$slider.children(), n.options.rows > 1) {
            for (e = n.options.slidesPerRow * n.options.rows, c = Math.ceil(u.length / e), t = 0; t < c; t++) {
                for (o = document.createElement("div"), i = 0; i < n.options.rows; i++) {
                    for (s = document.createElement("div"), r = 0; r < n.options.slidesPerRow; r++) h = t * e + (i * n.options.slidesPerRow + r), u.get(h) && s.appendChild(u.get(h));
                    o.appendChild(s)
                }
                f.appendChild(o)
            }
            n.$slider.empty().append(f);
            n.$slider.children().children().children().css({
                width: 100 / n.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    };
    t.prototype.checkResponsive = function(t, i) {
        var f, u, e, r = this,
            o = !1,
            s = r.$slider.width(),
            h = window.innerWidth || n(window).width();
        if ("window" === r.respondTo ? e = h : "slider" === r.respondTo ? e = s : "min" === r.respondTo && (e = Math.min(h, s)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            u = null;
            for (f in r.breakpoints) r.breakpoints.hasOwnProperty(f) && (!1 === r.originalSettings.mobileFirst ? e < r.breakpoints[f] && (u = r.breakpoints[f]) : e > r.breakpoints[f] && (u = r.breakpoints[f]));
            null !== u ? null !== r.activeBreakpoint ? (u !== r.activeBreakpoint || i) && (r.activeBreakpoint = u, "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : (r.activeBreakpoint = u, "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t), o = u);
            t || !1 === o || r.$slider.trigger("breakpoint", [r, o])
        }
    };
    t.prototype.changeSlide = function(t, i) {
        var f, e, o, r = this,
            u = n(t.currentTarget),
            s;
        switch (u.is("a") && t.preventDefault(), u.is("li") || (u = u.closest("li")), o = r.slideCount % r.options.slidesToScroll != 0, f = o ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
            case "previous":
                e = 0 === f ? r.options.slidesToScroll : r.options.slidesToShow - f;
                r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - e, !1, i);
                break;
            case "next":
                e = 0 === f ? r.options.slidesToScroll : f;
                r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + e, !1, i);
                break;
            case "index":
                s = 0 === t.data.index ? 0 : t.data.index || u.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(s), !1, i);
                u.children().trigger("focus");
                break;
            default:
                return
        }
    };
    t.prototype.checkNavigable = function(n) {
        var t, i, r;
        if (t = this.getNavigableIndexes(), i = 0, n > t[t.length - 1]) n = t[t.length - 1];
        else
            for (r in t) {
                if (n < t[r]) {
                    n = i;
                    break
                }
                i = t[r]
            }
        return n
    };
    t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (n("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", n.proxy(t.interrupt, t, !0)).off("mouseleave.slick", n.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler));
        t.$slider.off("focus.slick blur.slick");
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler)));
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler);
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler);
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler);
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler);
        t.$list.off("click.slick", t.clickHandler);
        n(document).off(t.visibilityChange, t.visibility);
        t.cleanUpSlideEvents();
        !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler);
        !0 === t.options.focusOnSelect && n(t.$slideTrack).children().off("click.slick", t.selectHandler);
        n(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange);
        n(window).off("resize.slick.slick-" + t.instanceUid, t.resize);
        n("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault);
        n(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    };
    t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", n.proxy(t.interrupt, t, !0));
        t.$list.off("mouseleave.slick", n.proxy(t.interrupt, t, !1))
    };
    t.prototype.cleanUpRows = function() {
        var t, n = this;
        n.options.rows > 1 && ((t = n.$slides.children().children()).removeAttr("style"), n.$slider.empty().append(t))
    };
    t.prototype.clickHandler = function(n) {
        !1 === this.shouldClick && (n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault())
    };
    t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear();
        i.touchObject = {};
        i.cleanUpEvents();
        n(".slick-cloned", i.$slider).detach();
        i.$dots && i.$dots.remove();
        i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove());
        i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove());
        i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            n(this).attr("style", n(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides));
        i.cleanUpRows();
        i.$slider.removeClass("slick-slider");
        i.$slider.removeClass("slick-initialized");
        i.$slider.removeClass("slick-dotted");
        i.unslicked = !0;
        t || i.$slider.trigger("destroy", [i])
    };
    t.prototype.disableTransition = function(n) {
        var t = this,
            i = {};
        i[t.transitionType] = "";
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    };
    t.prototype.fadeSlide = function(n, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(n).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(n).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(n), i.$slides.eq(n).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function() {
            i.disableTransition(n);
            t.call()
        }, i.options.speed))
    };
    t.prototype.fadeSlideOut = function(n) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(n).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(n), t.$slides.eq(n).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    };
    t.prototype.filterSlides = t.prototype.slickFilter = function(n) {
        var t = this;
        null !== n && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(n).appendTo(t.$slideTrack), t.reinit())
    };
    t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var r = n(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = r.is(":focus"), t.autoPlay())
            }, 0)
        })
    };
    t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    };
    t.prototype.getDotCount = function() {
        var n = this,
            i = 0,
            r = 0,
            t = 0;
        if (!0 === n.options.infinite)
            if (n.slideCount <= n.options.slidesToShow) ++t;
            else
                for (; i < n.slideCount;) ++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        else if (!0 === n.options.centerMode) t = n.slideCount;
        else if (n.options.asNavFor)
            for (; i < n.slideCount;) ++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        else t = 1 + Math.ceil((n.slideCount - n.options.slidesToShow) / n.options.slidesToScroll);
        return t - 1
    };
    t.prototype.getLeft = function(n) {
        var f, r, i, e, t = this,
            u = 0;
        return t.slideOffset = 0, r = t.$slides.first().outerHeight(!0), !0 === t.options.infinite ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, e = -1, !0 === t.options.vertical && !0 === t.options.centerMode && (2 === t.options.slidesToShow ? e = -1.5 : 1 === t.options.slidesToShow && (e = -2)), u = r * t.options.slidesToShow * e), t.slideCount % t.options.slidesToScroll != 0 && n + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (n > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (n - t.slideCount)) * t.slideWidth * -1, u = (t.options.slidesToShow - (n - t.slideCount)) * r * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, u = t.slideCount % t.options.slidesToScroll * r * -1))) : n + t.options.slidesToShow > t.slideCount && (t.slideOffset = (n + t.options.slidesToShow - t.slideCount) * t.slideWidth, u = (n + t.options.slidesToShow - t.slideCount) * r), t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0, u = 0), !0 === t.options.centerMode && t.slideCount <= t.options.slidesToShow ? t.slideOffset = t.slideWidth * Math.floor(t.options.slidesToShow) / 2 - t.slideWidth * t.slideCount / 2 : !0 === t.options.centerMode && !0 === t.options.infinite ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : !0 === t.options.centerMode && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)), f = !1 === t.options.vertical ? n * t.slideWidth * -1 + t.slideOffset : n * r * -1 + u, !0 === t.options.variableWidth && (i = t.slideCount <= t.options.slidesToShow || !1 === t.options.infinite ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow), f = !0 === t.options.rtl ? i[0] ? -1 * (t.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === t.options.centerMode && (i = t.slideCount <= t.options.slidesToShow || !1 === t.options.infinite ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow + 1), f = !0 === t.options.rtl ? i[0] ? -1 * (t.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, f += (t.$list.width() - i.outerWidth()) / 2)), f
    };
    t.prototype.getOption = t.prototype.slickGetOption = function(n) {
        return this.options[n]
    };
    t.prototype.getNavigableIndexes = function() {
        var i, n = this,
            t = 0,
            r = 0,
            u = [];
        for (!1 === n.options.infinite ? i = n.slideCount : (t = -1 * n.options.slidesToScroll, r = -1 * n.options.slidesToScroll, i = 2 * n.slideCount); t < i;) u.push(t), t = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        return u
    };
    t.prototype.getSlick = function() {
        return this
    };
    t.prototype.getSlideCount = function() {
        var i, r, t = this;
        return r = !0 === t.options.centerMode ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0, !0 === t.options.swipeToSlide ? (t.$slideTrack.find(".slick-slide").each(function(u, f) {
            if (f.offsetLeft - r + n(f).outerWidth() / 2 > -1 * t.swipeLeft) return i = f, !1
        }), Math.abs(n(i).attr("data-slick-index") - t.currentSlide) || 1) : t.options.slidesToScroll
    };
    t.prototype.goTo = t.prototype.slickGoTo = function(n, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(n)
            }
        }, t)
    };
    t.prototype.init = function(t) {
        var i = this;
        n(i.$slider).hasClass("slick-initialized") || (n(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler());
        t && i.$slider.trigger("init", [i]);
        !0 === i.options.accessibility && i.initADA();
        i.options.autoplay && (i.paused = !1, i.autoPlay())
    };
    t.prototype.initADA = function() {
        var t = this,
            f = Math.ceil(t.slideCount / t.options.slidesToShow),
            r = t.getNavigableIndexes().filter(function(n) {
                return n >= 0 && n < t.slideCount
            }),
            i, u;
        for (t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
                var u = r.indexOf(i);
                n(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + t.instanceUid + i,
                    tabindex: -1
                }); - 1 !== u && n(this).attr({
                    "aria-describedby": "slick-slide-control" + t.instanceUid + u
                })
            }), t.$dots.attr("role", "tablist").find("li").each(function(i) {
                var u = r[i];
                n(this).attr({
                    role: "presentation"
                });
                n(this).find("button").first().attr({
                    role: "tab",
                    id: "slick-slide-control" + t.instanceUid + i,
                    "aria-controls": "slick-slide" + t.instanceUid + u,
                    "aria-label": i + 1 + " of " + f,
                    "aria-selected": null,
                    tabindex: "-1"
                })
            }).eq(t.currentSlide).find("button").attr({
                "aria-selected": "true",
                tabindex: "0"
            }).end()), i = t.currentSlide, u = i + t.options.slidesToShow; i < u; i++) t.$slides.eq(i).attr("tabindex", 0);
        t.activateADA()
    };
    t.prototype.initArrowEvents = function() {
        var n = this;
        !0 === n.options.arrows && n.slideCount > n.options.slidesToShow && (n.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, n.changeSlide), n.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, n.changeSlide), !0 === n.options.accessibility && (n.$prevArrow.on("keydown.slick", n.keyHandler), n.$nextArrow.on("keydown.slick", n.keyHandler)))
    };
    t.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && (n("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler));
        !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && n("li", t.$dots).on("mouseenter.slick", n.proxy(t.interrupt, t, !0)).on("mouseleave.slick", n.proxy(t.interrupt, t, !1))
    };
    t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", n.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", n.proxy(t.interrupt, t, !1)))
    };
    t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents();
        t.initDotEvents();
        t.initSlideEvents();
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler);
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler);
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("click.slick", t.clickHandler);
        n(document).on(t.visibilityChange, n.proxy(t.visibility, t));
        !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler);
        !0 === t.options.focusOnSelect && n(t.$slideTrack).children().on("click.slick", t.selectHandler);
        n(window).on("orientationchange.slick.slick-" + t.instanceUid, n.proxy(t.orientationChange, t));
        n(window).on("resize.slick.slick-" + t.instanceUid, n.proxy(t.resize, t));
        n("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault);
        n(window).on("load.slick.slick-" + t.instanceUid, t.setPosition);
        n(t.setPosition)
    };
    t.prototype.initUI = function() {
        var n = this;
        !0 === n.options.arrows && n.slideCount > n.options.slidesToShow && (n.$prevArrow.show(), n.$nextArrow.show());
        !0 === n.options.dots && n.slideCount > n.options.slidesToShow && n.$dots.show()
    };
    t.prototype.keyHandler = function(n) {
        var t = this;
        n.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === n.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === n.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    };
    t.prototype.lazyLoad = function() {
        function f(i) {
            n("img[data-lazy]", i).each(function() {
                var i = n(this),
                    r = n(this).attr("data-lazy"),
                    f = n(this).attr("data-srcset"),
                    e = n(this).attr("data-sizes") || t.$slider.attr("data-sizes"),
                    u = document.createElement("img");
                u.onload = function() {
                    i.animate({
                        opacity: 0
                    }, 100, function() {
                        f && (i.attr("srcset", f), e && i.attr("sizes", e));
                        i.attr("src", r).animate({
                            opacity: 1
                        }, 200, function() {
                            i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        });
                        t.$slider.trigger("lazyLoaded", [t, i, r])
                    })
                };
                u.onerror = function() {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    t.$slider.trigger("lazyLoadError", [t, i, r])
                };
                u.src = r
            })
        }
        var u, i, r, t = this;
        if (!0 === t.options.centerMode ? !0 === t.options.infinite ? r = (i = t.currentSlide + (t.options.slidesToShow / 2 + 1)) + t.options.slidesToShow + 2 : (i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), r = t.options.slidesToShow / 2 + 1 + 2 + t.currentSlide) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, r = Math.ceil(i + t.options.slidesToShow), !0 === t.options.fade && (i > 0 && i--, r <= t.slideCount && r++)), u = t.$slider.find(".slick-slide").slice(i, r), "anticipated" === t.options.lazyLoad)
            for (var e = i - 1, o = r, s = t.$slider.find(".slick-slide"), h = 0; h < t.options.slidesToScroll; h++) e < 0 && (e = t.slideCount - 1), u = (u = u.add(s.eq(e))).add(s.eq(o)), e--, o++;
        f(u);
        t.slideCount <= t.options.slidesToShow ? f(t.$slider.find(".slick-slide")) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? f(t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow)) : 0 === t.currentSlide && f(t.$slider.find(".slick-cloned").slice(-1 * t.options.slidesToShow))
    };
    t.prototype.loadSlider = function() {
        var n = this;
        n.setPosition();
        n.$slideTrack.css({
            opacity: 1
        });
        n.$slider.removeClass("slick-loading");
        n.initUI();
        "progressive" === n.options.lazyLoad && n.progressiveLazyLoad()
    };
    t.prototype.next = t.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    };
    t.prototype.orientationChange = function() {
        var n = this;
        n.checkResponsive();
        n.setPosition()
    };
    t.prototype.pause = t.prototype.slickPause = function() {
        var n = this;
        n.autoPlayClear();
        n.paused = !0
    };
    t.prototype.play = t.prototype.slickPlay = function() {
        var n = this;
        n.autoPlay();
        n.options.autoplay = !0;
        n.paused = !1;
        n.focussed = !1;
        n.interrupted = !1
    };
    t.prototype.postSlide = function(t) {
        var i = this;
        i.unslicked || (i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && n(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
    };
    t.prototype.prev = t.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    };
    t.prototype.preventDefault = function(n) {
        n.preventDefault()
    };
    t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var r, u, f, e, o, i = this,
            s = n("img[data-lazy]", i.$slider);
        s.length ? (r = s.first(), u = r.attr("data-lazy"), f = r.attr("data-srcset"), e = r.attr("data-sizes") || i.$slider.attr("data-sizes"), (o = document.createElement("img")).onload = function() {
            f && (r.attr("srcset", f), e && r.attr("sizes", e));
            r.attr("src", u).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
            !0 === i.options.adaptiveHeight && i.setPosition();
            i.$slider.trigger("lazyLoaded", [i, r, u]);
            i.progressiveLazyLoad()
        }, o.onerror = function() {
            t < 3 ? setTimeout(function() {
                i.progressiveLazyLoad(t + 1)
            }, 500) : (r.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), i.$slider.trigger("lazyLoadError", [i, r, u]), i.progressiveLazyLoad())
        }, o.src = u) : i.$slider.trigger("allImagesLoaded", [i])
    };
    t.prototype.refresh = function(t) {
        var r, u, i = this;
        u = i.slideCount - i.options.slidesToShow;
        !i.options.infinite && i.currentSlide > u && (i.currentSlide = u);
        i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0);
        r = i.currentSlide;
        i.destroy(!0);
        n.extend(i, i.initials, {
            currentSlide: r
        });
        i.init();
        t || i.changeSlide({
            data: {
                message: "index",
                index: r
            }
        }, !1)
    };
    t.prototype.registerBreakpoints = function() {
        var u, f, i, t = this,
            r = t.options.responsive || null;
        if ("array" === n.type(r) && r.length) {
            t.respondTo = t.options.respondTo || "window";
            for (u in r)
                if (i = t.breakpoints.length - 1, r.hasOwnProperty(u)) {
                    for (f = r[u].breakpoint; i >= 0;) t.breakpoints[i] && t.breakpoints[i] === f && t.breakpoints.splice(i, 1), i--;
                    t.breakpoints.push(f);
                    t.breakpointSettings[f] = r[u].settings
                }
            t.breakpoints.sort(function(n, i) {
                return t.options.mobileFirst ? n - i : i - n
            })
        }
    };
    t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide");
        t.slideCount = t.$slides.length;
        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll);
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0);
        t.registerBreakpoints();
        t.setProps();
        t.setupInfinite();
        t.buildArrows();
        t.updateArrows();
        t.initArrowEvents();
        t.buildDots();
        t.updateDots();
        t.initDotEvents();
        t.cleanUpSlideEvents();
        t.initSlideEvents();
        t.checkResponsive(!1, !0);
        !0 === t.options.focusOnSelect && n(t.$slideTrack).children().on("click.slick", t.selectHandler);
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0);
        t.setPosition();
        t.focusHandler();
        t.paused = !t.options.autoplay;
        t.autoPlay();
        t.$slider.trigger("reInit", [t])
    };
    t.prototype.resize = function() {
        var t = this;
        n(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = n(window).width();
            t.checkResponsive();
            t.unslicked || t.setPosition()
        }, 50))
    };
    t.prototype.removeSlide = t.prototype.slickRemove = function(n, t, i) {
        var r = this;
        if (n = "boolean" == typeof n ? !0 === (t = n) ? 0 : r.slideCount - 1 : !0 === t ? --n : n, r.slideCount < 1 || n < 0 || n > r.slideCount - 1) return !1;
        r.unload();
        !0 === i ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(n).remove();
        r.$slides = r.$slideTrack.children(this.options.slide);
        r.$slideTrack.children(this.options.slide).detach();
        r.$slideTrack.append(r.$slides);
        r.$slidesCache = r.$slides;
        r.reinit()
    };
    t.prototype.setCSS = function(n) {
        var r, u, t = this,
            i = {};
        !0 === t.options.rtl && (n = -n);
        r = "left" == t.positionProp ? Math.ceil(n) + "px" : "0px";
        u = "top" == t.positionProp ? Math.ceil(n) + "px" : "0px";
        i[t.positionProp] = n;
        !1 === t.transformsEnabled ? t.$slideTrack.css(i) : (i = {}, !1 === t.cssTransitions ? (i[t.animType] = "translate(" + r + ", " + u + ")", t.$slideTrack.css(i)) : (i[t.animType] = "translate3d(" + r + ", " + u + ", 0px)", t.$slideTrack.css(i)))
    };
    t.prototype.setDimensions = function() {
        var n = this,
            t;
        !1 === n.options.vertical ? !0 === n.options.centerMode && n.$list.css({
            padding: "0px " + n.options.centerPadding
        }) : (n.$list.height(n.$slides.first().outerHeight(!0) * n.options.slidesToShow), !0 === n.options.centerMode && n.$list.css({
            padding: n.options.centerPadding + " 0px"
        }));
        n.listWidth = n.$list.width();
        n.listHeight = n.$list.height();
        !1 === n.options.vertical && !1 === n.options.variableWidth ? (n.slideWidth = Math.ceil(n.listWidth / n.options.slidesToShow), n.$slideTrack.width(Math.ceil(n.slideWidth * n.$slideTrack.children(".slick-slide").length))) : !0 === n.options.variableWidth ? n.$slideTrack.width(5e3 * n.slideCount) : (n.slideWidth = Math.ceil(n.listWidth), n.$slideTrack.height(Math.ceil(n.$slides.first().outerHeight(!0) * n.$slideTrack.children(".slick-slide").length)));
        t = n.$slides.first().outerWidth(!0) - n.$slides.first().width();
        !1 === n.options.variableWidth && n.$slideTrack.children(".slick-slide").width(n.slideWidth - t)
    };
    t.prototype.setFade = function() {
        var i, t = this;
        t.$slides.each(function(r, u) {
            i = t.slideWidth * r * -1;
            !0 === t.options.rtl ? n(u).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : n(u).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        });
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    };
    t.prototype.setHeight = function() {
        var n = this,
            t;
        1 === n.options.slidesToShow && !0 === n.options.adaptiveHeight && !1 === n.options.vertical && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.css("height", t))
    };
    t.prototype.setOption = t.prototype.slickSetOption = function() {
        var u, f, e, i, r, t = this,
            o = !1;
        if ("object" === n.type(arguments[0]) ? (e = arguments[0], o = arguments[1], r = "multiple") : "string" === n.type(arguments[0]) && (e = arguments[0], i = arguments[1], o = arguments[2], "responsive" === arguments[0] && "array" === n.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) t.options[e] = i;
        else if ("multiple" === r) n.each(e, function(n, i) {
            t.options[n] = i
        });
        else if ("responsive" === r)
            for (f in i)
                if ("array" !== n.type(t.options.responsive)) t.options.responsive = [i[f]];
                else {
                    for (u = t.options.responsive.length - 1; u >= 0;) t.options.responsive[u].breakpoint === i[f].breakpoint && t.options.responsive.splice(u, 1), u--;
                    t.options.responsive.push(i[f])
                }
        o && (t.unload(), t.reinit())
    };
    t.prototype.setPosition = function() {
        var n = this;
        n.setDimensions();
        n.setHeight();
        !1 === n.options.fade ? n.setCSS(n.getLeft(n.currentSlide)) : n.setFade();
        n.$slider.trigger("setPosition", [n])
    };
    t.prototype.setProps = function() {
        var n = this,
            t = document.body.style;
        n.positionProp = !0 === n.options.vertical ? "top" : "left";
        "top" === n.positionProp ? n.$slider.addClass("slick-vertical") : n.$slider.removeClass("slick-vertical");
        void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === n.options.useCSS && (n.cssTransitions = !0);
        n.options.fade && ("number" == typeof n.options.zIndex ? n.options.zIndex < 3 && (n.options.zIndex = 3) : n.options.zIndex = n.defaults.zIndex);
        void 0 !== t.OTransform && (n.animType = "OTransform", n.transformType = "-o-transform", n.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1));
        void 0 !== t.MozTransform && (n.animType = "MozTransform", n.transformType = "-moz-transform", n.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (n.animType = !1));
        void 0 !== t.webkitTransform && (n.animType = "webkitTransform", n.transformType = "-webkit-transform", n.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1));
        void 0 !== t.msTransform && (n.animType = "msTransform", n.transformType = "-ms-transform", n.transitionType = "msTransition", void 0 === t.msTransform && (n.animType = !1));
        void 0 !== t.transform && !1 !== n.animType && (n.animType = "transform", n.transformType = "transform", n.transitionType = "transition");
        n.transformsEnabled = n.options.useTransform && null !== n.animType && !1 !== n.animType
    };
    t.prototype.setSlideClasses = function(n) {
        var u, i, r, f, t = this,
            e;
        (i = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), t.$slides.eq(n).addClass("slick-current"), !0 === t.options.centerMode) ? (e = t.options.slidesToShow % 2 == 0 ? 1 : 0, u = Math.floor(t.options.slidesToShow / 2), !0 === t.options.infinite && (n >= u && n <= t.slideCount - 1 - u ? t.$slides.slice(n - u + e, n + u + 1).addClass("slick-active").attr("aria-hidden", "false") : (r = t.options.slidesToShow + n, i.slice(r - u + 1 + e, r + u + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === n ? i.eq(i.length - 1 - t.options.slidesToShow).addClass("slick-center") : n === t.slideCount - 1 && i.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(n).addClass("slick-center")) : n >= 0 && n <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(n, n + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= t.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (f = t.slideCount % t.options.slidesToShow, r = !0 === t.options.infinite ? t.options.slidesToShow + n : n, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - n < t.options.slidesToShow ? i.slice(r - (t.options.slidesToShow - f), r + f).addClass("slick-active").attr("aria-hidden", "false") : i.slice(r, r + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== t.options.lazyLoad && "anticipated" !== t.options.lazyLoad || t.lazyLoad()
    };
    t.prototype.setupInfinite = function() {
        var i, r, u, t = this;
        if (!0 === t.options.fade && (t.options.centerMode = !1), !0 === t.options.infinite && !1 === t.options.fade && (r = null, t.slideCount > t.options.slidesToShow)) {
            for (u = !0 === t.options.centerMode ? t.options.slidesToShow + 1 : t.options.slidesToShow, i = t.slideCount; i > t.slideCount - u; i -= 1) r = i - 1, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < u + t.slideCount; i += 1) r = i, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
            t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                n(this).attr("id", "")
            })
        }
    };
    t.prototype.interrupt = function(n) {
        var t = this;
        n || t.autoPlay();
        t.interrupted = n
    };
    t.prototype.selectHandler = function(t) {
        var i = this,
            u = n(t.target).is(".slick-slide") ? n(t.target) : n(t.target).parents(".slick-slide"),
            r = parseInt(u.attr("data-slick-index"));
        r || (r = 0);
        i.slideCount <= i.options.slidesToShow ? i.slideHandler(r, !1, !0) : i.slideHandler(r)
    };
    t.prototype.slideHandler = function(n, t, i) {
        var u, f, s, e, o, h = null,
            r = this;
        if (t = t || !1, !(!0 === r.animating && !0 === r.options.waitForAnimate || !0 === r.options.fade && r.currentSlide === n))
            if (!1 === t && r.asNavFor(n), u = n, h = r.getLeft(u), e = r.getLeft(r.currentSlide), r.currentLeft = null === r.swipeLeft ? e : r.swipeLeft, !1 === r.options.infinite && !1 === r.options.centerMode && (n < 0 || n > r.getDotCount() * r.options.slidesToScroll)) !1 === r.options.fade && (u = r.currentSlide, !0 !== i ? r.animateSlide(e, function() {
                r.postSlide(u)
            }) : r.postSlide(u));
            else if (!1 === r.options.infinite && !0 === r.options.centerMode && (n < 0 || n > r.slideCount - r.options.slidesToScroll)) !1 === r.options.fade && (u = r.currentSlide, !0 !== i ? r.animateSlide(e, function() {
            r.postSlide(u)
        }) : r.postSlide(u));
        else {
            if (r.options.autoplay && clearInterval(r.autoPlayTimer), f = u < 0 ? r.slideCount % r.options.slidesToScroll != 0 ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + u : u >= r.slideCount ? r.slideCount % r.options.slidesToScroll != 0 ? 0 : u - r.slideCount : u, r.animating = !0, r.$slider.trigger("beforeChange", [r, r.currentSlide, f]), s = r.currentSlide, r.currentSlide = f, r.setSlideClasses(r.currentSlide), r.options.asNavFor && (o = (o = r.getNavTarget()).slick("getSlick")).slideCount <= o.options.slidesToShow && o.setSlideClasses(r.currentSlide), r.updateDots(), r.updateArrows(), !0 === r.options.fade) return !0 !== i ? (r.fadeSlideOut(s), r.fadeSlide(f, function() {
                r.postSlide(f)
            })) : r.postSlide(f), void r.animateHeight();
            !0 !== i ? r.animateSlide(h, function() {
                r.postSlide(f)
            }) : r.postSlide(f)
        }
    };
    t.prototype.startLoad = function() {
        var n = this;
        !0 === n.options.arrows && n.slideCount > n.options.slidesToShow && (n.$prevArrow.hide(), n.$nextArrow.hide());
        !0 === n.options.dots && n.slideCount > n.options.slidesToShow && n.$dots.hide();
        n.$slider.addClass("slick-loading")
    };
    t.prototype.swipeDirection = function() {
        var i, r, u, n, t = this;
        return i = t.touchObject.startX - t.touchObject.curX, r = t.touchObject.startY - t.touchObject.curY, u = Math.atan2(r, i), (n = Math.round(180 * u / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? !1 === t.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === t.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === t.options.rtl ? "right" : "left" : !0 === t.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    };
    t.prototype.swipeEnd = function() {
        var t, i, n = this;
        if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1, !1;
        if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
                case "left":
                case "down":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount();
                    n.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount();
                    n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    };
    t.prototype.swipeHandler = function(n) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== n.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = n.originalEvent && void 0 !== n.originalEvent.touches ? n.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), n.data.action) {
            case "start":
                t.swipeStart(n);
                break;
            case "move":
                t.swipeMove(n);
                break;
            case "end":
                t.swipeEnd(n)
        }
    };
    t.prototype.swipeMove = function(n) {
        var f, e, r, u, i, o, t = this;
        return i = void 0 !== n.originalEvent ? n.originalEvent.touches : null, !(!t.dragging || t.scrolling || i && 1 !== i.length) && (f = t.getLeft(t.currentSlide), t.touchObject.curX = void 0 !== i ? i[0].pageX : n.clientX, t.touchObject.curY = void 0 !== i ? i[0].pageY : n.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), o = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2))), !t.options.verticalSwiping && !t.swiping && o > 4 ? (t.scrolling = !0, !1) : (!0 === t.options.verticalSwiping && (t.touchObject.swipeLength = o), e = t.swipeDirection(), void 0 !== n.originalEvent && t.touchObject.swipeLength > 4 && (t.swiping = !0, n.preventDefault()), u = (!1 === t.options.rtl ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), !0 === t.options.verticalSwiping && (u = t.touchObject.curY > t.touchObject.startY ? 1 : -1), r = t.touchObject.swipeLength, t.touchObject.edgeHit = !1, !1 === t.options.infinite && (0 === t.currentSlide && "right" === e || t.currentSlide >= t.getDotCount() && "left" === e) && (r = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), t.swipeLeft = !1 === t.options.vertical ? f + r * u : f + r * (t.$list.height() / t.listWidth) * u, !0 === t.options.verticalSwiping && (t.swipeLeft = f + r * u), !0 !== t.options.fade && !1 !== t.options.touchMove && (!0 === t.animating ? (t.swipeLeft = null, !1) : void t.setCSS(t.swipeLeft))))
    };
    t.prototype.swipeStart = function(n) {
        var i, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== n.originalEvent && void 0 !== n.originalEvent.touches && (i = n.originalEvent.touches[0]);
        t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : n.clientX;
        t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : n.clientY;
        t.dragging = !0
    };
    t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var n = this;
        null !== n.$slidesCache && (n.unload(), n.$slideTrack.children(this.options.slide).detach(), n.$slidesCache.appendTo(n.$slideTrack), n.reinit())
    };
    t.prototype.unload = function() {
        var t = this;
        n(".slick-cloned", t.$slider).remove();
        t.$dots && t.$dots.remove();
        t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove();
        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove();
        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    };
    t.prototype.unslick = function(n) {
        var t = this;
        t.$slider.trigger("unslick", [t, n]);
        t.destroy()
    };
    t.prototype.updateArrows = function() {
        var n = this;
        Math.floor(n.options.slidesToShow / 2);
        !0 === n.options.arrows && n.slideCount > n.options.slidesToShow && !n.options.infinite && (n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === n.currentSlide ? (n.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - n.options.slidesToShow && !1 === n.options.centerMode ? (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - 1 && !0 === n.options.centerMode && (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    };
    t.prototype.updateDots = function() {
        var n = this;
        null !== n.$dots && (n.$dots.find("li").removeClass("slick-active").end(), n.$dots.find("li").eq(Math.floor(n.currentSlide / n.options.slidesToScroll)).addClass("slick-active"))
    };
    t.prototype.visibility = function() {
        var n = this;
        n.options.autoplay && (n.interrupted = document[n.hidden] ? !0 : !1)
    };
    n.fn.slick = function() {
        for (var u, i = this, r = arguments[0], f = Array.prototype.slice.call(arguments, 1), e = i.length, n = 0; n < e; n++)
            if ("object" == typeof r || void 0 === r ? i[n].slick = new t(i[n], r) : u = i[n].slick[r].apply(i[n].slick, f), void 0 !== u) return u;
        return i
    }
}),
function() {
    var n, f, i, r, u, t = function(n, t) {
            return function() {
                return n.apply(t, arguments)
            }
        },
        e = [].indexOf || function(n) {
            for (var t = 0, i = this.length; i > t; t++)
                if (t in this && this[t] === n) return t;
            return -1
        };
    f = function() {
        function n() {}
        return n.prototype.extend = function(n, t) {
            var i, r;
            for (i in t) r = t[i], null == n[i] && (n[i] = r);
            return n
        }, n.prototype.isMobile = function(n) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n)
        }, n.prototype.createEvent = function(n, t, i, r) {
            var u;
            return null == t && (t = !1), null == i && (i = !1), null == r && (r = null), null != document.createEvent ? (u = document.createEvent("CustomEvent"), u.initCustomEvent(n, t, i, r)) : null != document.createEventObject ? (u = document.createEventObject(), u.eventType = n) : u.eventName = n, u
        }, n.prototype.emitEvent = function(n, t) {
            return null != n.dispatchEvent ? n.dispatchEvent(t) : t in (null != n) ? n[t]() : "on" + t in (null != n) ? n["on" + t]() : void 0
        }, n.prototype.addEvent = function(n, t, i) {
            return null != n.addEventListener ? n.addEventListener(t, i, !1) : null != n.attachEvent ? n.attachEvent("on" + t, i) : n[t] = i
        }, n.prototype.removeEvent = function(n, t, i) {
            return null != n.removeEventListener ? n.removeEventListener(t, i, !1) : null != n.detachEvent ? n.detachEvent("on" + t, i) : delete n[t]
        }, n.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, n
    }();
    i = this.WeakMap || this.MozWeakMap || (i = function() {
        function n() {
            this.keys = [];
            this.values = []
        }
        return n.prototype.get = function(n) {
            var t, u, i, f, r;
            for (r = this.keys, t = i = 0, f = r.length; f > i; t = ++i)
                if (u = r[t], u === n) return this.values[t]
        }, n.prototype.set = function(n, t) {
            var i, f, r, e, u;
            for (u = this.keys, i = r = 0, e = u.length; e > r; i = ++r)
                if (f = u[i], f === n) return void(this.values[i] = t);
            return this.keys.push(n), this.values.push(t)
        }, n
    }());
    n = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (n = function() {
        function n() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser.");
            "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return n.notSupported = !0, n.prototype.observe = function() {}, n
    }());
    r = this.getComputedStyle || function(n) {
        return this.getPropertyValue = function(t) {
            var i;
            return "float" === t && (t = "styleFloat"), u.test(t) && t.replace(u, function(n, t) {
                return t.toUpperCase()
            }), (null != (i = n.currentStyle) ? i[t] : void 0) || null
        }, this
    };
    u = /(\-([a-z]){1})/g;
    this.WOW = function() {
        function u(n) {
            null == n && (n = {});
            this.scrollCallback = t(this.scrollCallback, this);
            this.scrollHandler = t(this.scrollHandler, this);
            this.resetAnimation = t(this.resetAnimation, this);
            this.start = t(this.start, this);
            this.scrolled = !0;
            this.config = this.util().extend(n, this.defaults);
            null != n.scrollContainer && (this.config.scrollContainer = document.querySelector(n.scrollContainer));
            this.animationNameCache = new i;
            this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return u.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, u.prototype.init = function() {
            var n;
            return this.element = window.document.documentElement, "interactive" === (n = document.readyState) || "complete" === n ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, u.prototype.start = function() {
            var t, i, u, r;
            if (this.stopped = !1, this.boxes = function() {
                    var n, u, i, r;
                    for (i = this.element.querySelectorAll("." + this.config.boxClass), r = [], n = 0, u = i.length; u > n; n++) t = i[n], r.push(t);
                    return r
                }.call(this), this.all = function() {
                    var n, u, i, r;
                    for (i = this.boxes, r = [], n = 0, u = i.length; u > n; n++) t = i[n], r.push(t);
                    return r
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (r = this.boxes, i = 0, u = r.length; u > i; i++) t = r[i], this.applyStyle(t, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new n(function(n) {
                return function(t) {
                    var i, u, f, e, r;
                    for (r = [], i = 0, u = t.length; u > i; i++) e = t[i], r.push(function() {
                        var n, r, t, i;
                        for (t = e.addedNodes || [], i = [], n = 0, r = t.length; r > n; n++) f = t[n], i.push(this.doSync(f));
                        return i
                    }.call(n));
                    return r
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, u.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, u.prototype.sync = function() {
            if (n.notSupported) return this.doSync(this.element)
        }, u.prototype.doSync = function(n) {
            var t, i, f, u, r;
            if (null == n && (n = this.element), 1 === n.nodeType) {
                for (n = n.parentNode || n, u = n.querySelectorAll("." + this.config.boxClass), r = [], i = 0, f = u.length; f > i; i++) t = u[i], e.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                return r
            }
        }, u.prototype.show = function(n) {
            return this.applyStyle(n), n.className = n.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(n), this.util().emitEvent(n, this.wowEvent), this.util().addEvent(n, "animationend", this.resetAnimation), this.util().addEvent(n, "oanimationend", this.resetAnimation), this.util().addEvent(n, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(n, "MSAnimationEnd", this.resetAnimation), n
        }, u.prototype.applyStyle = function(n, t) {
            var i, r, u;
            return r = n.getAttribute("data-wow-duration"), i = n.getAttribute("data-wow-delay"), u = n.getAttribute("data-wow-iteration"), this.animate(function(f) {
                return function() {
                    return f.customStyle(n, t, r, i, u)
                }
            }(this))
        }, u.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(n) {
                return window.requestAnimationFrame(n)
            } : function(n) {
                return n()
            }
        }(), u.prototype.resetStyle = function() {
            var r, n, u, t, i;
            for (t = this.boxes, i = [], n = 0, u = t.length; u > n; n++) r = t[n], i.push(r.style.visibility = "visible");
            return i
        }, u.prototype.resetAnimation = function(n) {
            var t;
            if (n.type.toLowerCase().indexOf("animationend") >= 0) return (t = n.target || n.srcElement, t.className = t.className.replace(this.config.animateClass, "").trim())
        }, u.prototype.customStyle = function(n, t, i, r, u) {
            return t && this.cacheAnimationName(n), n.style.visibility = t ? "hidden" : "visible", i && this.vendorSet(n.style, {
                animationDuration: i
            }), r && this.vendorSet(n.style, {
                animationDelay: r
            }), u && this.vendorSet(n.style, {
                animationIterationCount: u
            }), this.vendorSet(n.style, {
                animationName: t ? "none" : this.cachedAnimationName(n)
            }), n
        }, u.prototype.vendors = ["moz", "webkit"], u.prototype.vendorSet = function(n, t) {
            var i, r, u, f;
            r = [];
            for (i in t) u = t[i], n["" + i] = u, r.push(function() {
                var t, o, r, e;
                for (r = this.vendors, e = [], t = 0, o = r.length; o > t; t++) f = r[t], e.push(n["" + f + i.charAt(0).toUpperCase() + i.substr(1)] = u);
                return e
            }.call(this));
            return r
        }, u.prototype.vendorCSS = function(n, t) {
            var i, o, f, u, e, s;
            for (e = r(n), u = e.getPropertyCSSValue(t), f = this.vendors, i = 0, o = f.length; o > i; i++) s = f[i], u = u || e.getPropertyCSSValue("-" + s + "-" + t);
            return u
        }, u.prototype.animationName = function(n) {
            var t;
            try {
                t = this.vendorCSS(n, "animation-name").cssText
            } catch (i) {
                t = r(n).getPropertyValue("animation-name")
            }
            return "none" === t ? "" : t
        }, u.prototype.cacheAnimationName = function(n) {
            return this.animationNameCache.set(n, this.animationName(n))
        }, u.prototype.cachedAnimationName = function(n) {
            return this.animationNameCache.get(n)
        }, u.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, u.prototype.scrollCallback = function() {
            var n;
            if (this.scrolled && !(this.scrolled = !1, this.boxes = function() {
                    var t, u, i, r;
                    for (i = this.boxes, r = [], t = 0, u = i.length; u > t; t++) n = i[t], n && (this.isVisible(n) ? this.show(n) : r.push(n));
                    return r
                }.call(this), this.boxes.length || this.config.live)) return this.stop()
        }, u.prototype.offsetTop = function(n) {
            for (var t; void 0 === n.offsetTop;) n = n.parentNode;
            for (t = n.offsetTop; n = n.offsetParent;) t += n.offsetTop;
            return t
        }, u.prototype.isVisible = function(n) {
            var r, u, t, f, i;
            return u = n.getAttribute("data-wow-offset") || this.config.offset, i = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, f = i + Math.min(this.element.clientHeight, this.util().innerHeight()) - u, t = this.offsetTop(n), r = t + n.clientHeight, f >= t && r >= i
        }, u.prototype.util = function() {
            return null != this._util ? this._util : this._util = new f
        }, u.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, u
    }()
}.call(this)