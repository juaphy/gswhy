var gewara = gewara || {};
gewara.util = {};
var gewa = gewa || {};
gewa.string = {};
gewa.util = {};
var GewaraUtil = gewara.util, gewaUtil = gewa.util, gewaString = gewa.string;
gewara.util.onReturn = function(a, b) {
    if (!a) {
        a = window.event
    }
    if (a && a.keyCode && a.keyCode == 13) {
        b()
    }
};
gewara.util.rtime = function() {
    return new Date().getTime()
};
gewara.util.basePath = "/";
gewara.util.httpsPath = "https://www.gewara.com/";
gewara.util.imgPath = "http://img5.gewara.com/";
gewara.util.cdnPath = "http://static5.gewara.com/";
gewara.util.icon = gewara.util.cdnPath + "css/global/pub_icon.png";
gewara.util.retdata = {};
gewara.util.retdata.success = true;
gewara.util.member = {};
gewara.util.member.login = false;
gewara.util.member.isMobile = false;
gewara.util.member.headUrl = "";
gewara.util.isNumber = function(a) {
    return /^\d+$/.test(a)
};
gewara.util.isWarp = window.screen.availWidth >= 1280;
gewa.util.cinemaCityPy = "";
gewara.util.isNotNull = function(a) {
    return (!(a.match(/^\s*$/)))
};
gewara.util._isObject = function(a) {
    return a.toString() === "[object Object]"
};
gewara.util._hasObject = function(a) {
    a = a.toString().indexOf("[object Object]");
    return a >= 0 ? true : false
};
gewara.util.isMobile = function(a) {
    return (/^(?:13\d|15[0-9]|18[0-9]|17[0-9]|14[0-9])-?\d{5}(\d{3}|\*{3})$/
            .test(a))
};
gewara.util.isEmail = function(a) {
    return (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*(\.[a-zA-Z]{2,4})$/
            .test(a))
};
gewara.util.isIdCard = function(a) {
    return (/(^\d{15}$)|(^\d{17}([0-9]|[X,x])$)/.test(a))
};
gewara.util.replaceStr = function(a) {
    $(a).value = $(a).value.replace(/[^\d]/g, "")
};
gewara.util.isVideoURL = function(a) {
    var b = "^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&amp;=+$%-]+: )?[0-9a-z_!~*'().&amp;=+$%-]+@)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\\.)*(tudou|youku|56|ku6|qq|sohu|iqiyi|qiyi)\\.[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-zA-Z_\\/!~*'().;?:@&amp;=+$,%#-]+)+/?)$";
    return new RegExp(b).test(a)
};
var _debug = function() {
    if ("\v" == "v") {
        alert(arguments)
    } else {
        try {
            console.info(arguments)
        } catch (a) {
        }
    }
};
gewara.util.refreshCaptcha = function(f, c, e) {
    if ($(f + "Img")) {
        $(f + "Img").setStyle(
                "background",
                "url(" + gewara.util.cdnPath
                        + "css/images/loading2.gif) center center no-repeat")
    }
    var h = gewara.util.basePath;
    var d = gewara.util.httpsPath;
    if (e) {
        h = e.replace("https", "http");
        d = e
    }
    if ($("baoshan_test_001") || !document.location.href.contains("gewara.com")
            || document.location.href.contains("w137.gewara.com")
            || document.location.href.contains("m137.gewara.com")) {
        var b = h.indexOf("://");
        if (b > 0) {
            b += 3;
            h = h.substring(b, h.length);
            b = h.indexOf("/");
            h = h.substring(b, h.length)
        }
        var g = d.indexOf("://");
        if (g > 0) {
            g += 3;
            d = d.substring(g, d.length);
            g = d.indexOf("/");
            d = d.substring(g, d.length)
        }
    }
    if ($(f).value == "") {
        gewara.util.sendRequest(h + "getCaptchaId.xhtml", {
            r : gewara.util.rtime()
        }, function(i) {
            if (i.success) {
                $(f).value = i.retval;
                var j = d + "captcha.xhtml?captchaId=" + i.retval + "&r="
                        + gewara.util.rtime();
                if (c) {
                    j = j + "&zt=" + c
                }
                $(f + "Img").src = j
            } else {
                alert("获取验证码出错，请重新获取！")
            }
        }, "get")
    } else {
        var a = d + "captcha.xhtml?captchaId=" + $(f).value + "&r="
                + gewara.util.rtime();
        if (c) {
            a = a + "&zt=" + c
        }
        $(f + "Img").src = a
    }
    $(f + "Input").value = "";
    if ($(f + "Input").retrieve("label")) {
        $(f + "Input").retrieve("label").text.innerHTML = "输入验证码"
    }
    $(f + "Input").onfocus = null
};
gewara.util.openwin = function(a, c) {
    var b = new Element("form", {
        target : c,
        action : a,
        method : "post",
        styles : {
            display : "none",
            "z-index" : "-1"
        }
    }).addEvent("submit", function() {
        b.submit()
    }).inject(document.body);
    b.fireEvent("submit")
};
gewara.util.getLength = function(c) {
    var b = 0;
    for ( var a in c) {
        if (c.hasOwnProperty(a)) {
            b++
        }
    }
    return b
};
gewara.util.baseValidForm = function(f, c) {
    var b = $(f).getElements("*[mustTxt]");
    var a = true;
    try {
        $each(b, function(e, h) {
            var g = $(e).get("value");
            if (!GewaraUtil.isNotNull(g)) {
                if (c == "admin") {
                    alert($(e).get("mustTxt"))
                } else {
                    if (c == "member") {
                        gewaUtil.alert($(e).get("mustTxt"))
                    } else {
                        if ($(e)) {
                            $(e).focus()
                        }
                        if ($(e) && $(e).type != "hidden"
                                && !$(e).match("textarea")) {
                            GewaraUtil.showValidateErr(e, $(e).get("mustTxt"))
                        } else {
                            gewaUtil.alert($(e).get("mustTxt"))
                        }
                    }
                }
                a = false;
                throw "break"
            }
        })
    } catch (d) {
        return false
    }
    return a
};
gewara.util.showValidateErr = function(c, e, a, b) {
    c = $(c);
    if (!c) {
        gewaUtil.alert(e);
        return false
    }
    if (c.retrieve("tips") == null) {
        c.store("tips", true);
        var d = new Element("div", {
            styles : {
                position : "absolute",
                width : "auto",
                height : "20px",
                border : "1px solid #ffcccc",
                background : "#ffeeee",
                padding : "0px 5px",
                color : "#333",
                "z-index" : "999",
                overflow : "hidden"
            }
        }).inject(document.body);
        new Element("div", {
            "class" : "errmsg",
            html : e
        }).inject(d);
        d.position({
            relativeTo : c,
            position : "leftBottom",
            offset : {
                x : (c.getParent("label.text")) ? -7 : 0,
                y : (c.getParent("label.text")) ? -2 : 0
            }
        });
        (function() {
            d.dispose();
            c.store("tips", null)
        }).delay(2600)
    } else {
        return false
    }
};
gewara.util.showErrorMsg = function(a, b) {
    if (!$(a)) {
        return
    }
    var c = new Hash(b);
    c.each(function(f, d) {
        var e = $(a).getElement("*[name=" + d + "]");
        if (d && e) {
            GewaraUtil.showValidateErr(e, f)
        }
    })
};
gewara.util.showLoading = function(b) {
    if (!$("loadingPic")) {
        var a = new Element("img", {
            id : "loadingPic",
            src : GewaraUtil.cdnPath + "css/home/loading.gif",
            styles : {
                display : "block",
                position : "absolute",
                top : "0px",
                left : "0px",
                visibility : "hidden",
                padding : "4px",
                "z-index" : "401"
            }
        });
        a.inject(document.body)
    }
    gewara.util.toCenter("loadingPic", b)
};
gewara.util.hideLoading = function() {
    if ($("loadingPic")) {
        $("loadingPic").setStyle("visibility", "hidden")
    }
};
gewara.util.showDialog = function(e, f, b, c) {
    if (!f) {
        f = $(e).getStyle("z-index")
    }
    if (f < 10) {
        f = 200
    }
    var d = $("dialogDisabledZone"), a = $(document.body).getScrollSize();
    if (!d) {
        d = new Element("div", {
            id : "dialogDisabledZone",
            styles : {
                position : "absolute",
                "z-index" : f - 1,
                left : "0px",
                top : "0px",
                "background-color" : "#000"
            }
        });
        d.inject($(document.body), "top")
    }
    d.setStyles({
        width : a.x,
        height : a.y,
        display : "",
        visibility : "visible",
        "z-index" : f - 1
    });
    d.setOpacity(0.6);
    $(e).setStyles({
        position : "absolute",
        "z-index" : f,
        display : "",
        top : 0,
        left : 0,
        visibility : "visible"
    }).show();
    gewara.util.toCenter(e);
    if (b) {
        $(e).pin()
    }
};
gewara.util.showAlbumDialog = function(d, f, a, b) {
    if (!f) {
        f = $(d).getStyle("z-index")
    }
    if (f < 10) {
        f = 200
    }
    $(document.body).setStyle("overflow", "hidden");
    var c = $("dialogDisabledZone"), e = $(document.body).getSize();
    winSize = $(document.body).getScrollSize();
    if (!c) {
        c = new Element("div", {
            id : "dialogDisabledZone",
            styles : {
                position : "absolute",
                "z-index" : f - 1,
                left : "0px",
                top : "0px",
                "background-color" : "#474747"
            }
        });
        c.inject($(document.body), "top")
    }
    c.setStyles({
        width : winSize.x,
        height : winSize.y,
        display : "",
        visibility : "visible",
        "z-index" : f - 1
    });
    $(d).setStyles({
        position : "absolute",
        height : e.y,
        "z-index" : f,
        display : "",
        top : 0,
        left : 0,
        visibility : "visible"
    }).show();
    gewara.util.toCenter(d);
    if (a) {
        $(d).pin()
    }
};
gewara.util.hideAlbumDialog = function(a) {
    if ($("dialogDisabledZone")) {
        $("dialogDisabledZone").setStyles({
            visibility : "hidden",
            top : "0px",
            height : "0px"
        })
    }
    if ($(a)) {
        $(a).setStyles({
            display : "none",
            visibility : "hidden",
            top : "0px"
        })
    }
};
gewara.util.hideDialog = function(a) {
    if ($("dialogDisabledZone")) {
        $("dialogDisabledZone").setStyles({
            visibility : "hidden",
            top : "0px",
            height : "0px"
        })
    }
    if ($(a)) {
        $(a).setStyles({
            display : "none",
            visibility : "hidden",
            top : "0px"
        })
    }
};
gewara.util.toCenter = function(c, b) {
    var a = $(b) || document.body, d = $(c).getStyle("z-index");
    if (!d || (d < 10)) {
        d = 100
    }
    $(c).setStyles({
        position : "absolute",
        "z-index" : d,
        visibility : "visible"
    });
    $(c).position({
        relativeTo : a,
        position : "center",
        edge : "center"
    })
};
gewara.util.moveTo = function(d, c, b, a) {
    if (!b) {
        b = 0
    }
    if (!a) {
        a = 0
    }
    var e = $(d).getStyle("z-index");
    if (!e || e < 10) {
        e = 100
    }
    $(d).setStyles({
        position : "absolute",
        "z-index" : e,
        visibility : "visible"
    });
    $(d).position({
        relativeTo : $(c),
        position : "upperLeft",
        offset : {
            x : b,
            y : a
        }
    });
    return this
};
gewara.util.moveToMouse = function(b, a, c) {
    $(b).setStyles({
        position : "absolute",
        "z-index" : zIndex,
        visibility : "visible"
    });
    $(b).position({
        relativeTo : document.body,
        position : "upperLeft"
    })
};
gewara.util.getValues = function(c, d) {
    if (!$(c)) {
        return null
    }
    var b = $(c).toQueryString().parseQueryString();
    if (!d) {
        return b
    }
    var e = new Hash(b), a = {};
    e.each(function(g, f) {
        if (f) {
            a[f] = (g && g.join) ? g.join(d) : g
        }
    });
    return a
};
gewara.util.getPostValues = function(b) {
    if (!$(b)) {
        return null
    }
    var a = $(b).toQueryString().parseQueryString();
    return a
};
gewara.util.setValues = function(a) {
    var b = new Hash(a);
    b.each(function(d, c) {
        if (c && $(c)) {
            if ($(c).getAttribute("type")) {
                $(c).value = d
            } else {
                if ($(c).match("select")) {
                    $(c).getElements("option").each(function(e) {
                        if (e.value == d) {
                            e.selected = true
                        }
                    })
                } else {
                    $(c).innerHTML = d
                }
            }
        }
    })
};
gewara.util.updateHtml = function(b, a) {
    var c = new Hash(b);
    c.each(function(e, d) {
        if (d && $(d + "_" + a)) {
            $(d + "_" + a).set("html", e)
        }
    })
};
gewara.util.inArea = function(b, a, d) {
    var c = $(b).getCoordinates();
    return a >= c.left && a <= c.right && d >= c.top && d <= c.bottom
};
gewara.util.outArea = function(b, a, d) {
    var c = $(b).getCoordinates();
    return a < c.left || a > c.right || d < c.top || d > c.bottom
};
gewara.util.show = function(a) {
    try {
        a.show()
    } catch (b) {
    }
};
gewara.util.hide = function(a) {
    try {
        a.hide()
    } catch (b) {
    }
};
gewara.util.openWindow = function(b, c, d, j, a, h, f) {
    var i = 20, e = 120, g;
    if (window.screen.height) {
        i = (window.screen.height - j) / 2
    }
    if (window.screen.width) {
        e = (window.screen.width - d) / 2
    }
    g = window.open(b, c, "width=" + d + ",height=" + j + ",resizable="
            + (a ? "yes" : "no") + ",scrollbars=" + (h ? "yes" : "no")
            + ",status=" + (f ? "1" : "0") + ",top=" + i + ",left=" + e);
    if (g) {
        g.focus()
    }
    return g
};
gewara.util.isEmptyObject = function(b) {
    for ( var a in b) {
        return false
    }
    return true
};
gewara.util.sendRequest = function(url, values, callback, vmethod) {
    if (typeof values === "object") {
        if (gewara.util.isEmptyObject(values)) {
            vmethod = "get"
        }
    }
    var myRequest = new Request({
        url : url,
        method : vmethod || "post",
        onSuccess : function(resText) {
            eval(resText);
            if (callback) {
                callback.run(data)
            }
        },
        onFailure : function(res) {
            if (callback) {
                var data = {
                    success : false,
                    msg : "网络请求错误！"
                };
                if (res.status == 403) {
                    data.msg = "无权限！"
                }
                callback.run(data)
            }
        }
    });
    myRequest.send({
        data : values
    })
};
gewara.util.sendRequest4Json = function(c, a, e, b) {
    if (typeof a === "object") {
        if (gewara.util.isEmptyObject(a)) {
            b = "get"
        }
    }
    a.callMethod = "ajax";
    var d = new Request.JSON({
        url : c,
        method : b || "post",
        onSuccess : function(f) {
            f.success = f.success || (f.code == "0000");
            f.msg = f.msg || f.error;
            f.retval = f.retval || f.data;
            if (e) {
                e.run(f)
            }
        },
        onFailure : function(g) {
            if (e) {
                var f = {
                    success : false,
                    msg : "网络请求错误！"
                };
                if (g.status == 403) {
                    f.msg = "无权限！"
                }
                e.run(f)
            }
        },
        onError : function(h, f) {
            var g = {
                success : false,
                msg : "数据格式错误！"
            };
            if (e) {
                e.run(g)
            }
        }
    });
    d.send({
        data : a
    })
};
gewara.util.sendLoad = function(c, b, a, f, d, e) {
    return gewara.util.sendLoadCore(c, b, a, f, "true", d, e)
};
gewara.util.sendLoadEasy = function(c, b, a, f, d, e) {
    return gewara.util.sendLoadCore(c, b, a, f, "false", d, e)
};
gewara.util.sendLoadCore = function(el, url, values, callback, iseval, ori,
        method) {
    try {
        var off = url.indexOf("#"), selector = "";
        if (off >= 0) {
            selector = url.slice(off + 1, url.length);
            url = url.slice(0, off)
        }
        var storeValue = $(ori) ? $(ori).retrieve("key") : null;
        var storeJS = $(ori) ? $(ori).retrieve("js") : null;
        iseval = iseval || "true";
        if (storeValue == null) {
            new Request.HTML({
                headers : {
                    "Cache-Control" : "no-cache,no-store",
                    "If-Modified-Since" : "0"
                },
                url : url,
                method : method || "get",
                evalScripts : false,
                async : true,
                link : "cancel",
                onSuccess : function(responseTree, responseElements,
                        responseHTML, responseJavaScript) {
                    if (selector && responseElements.length != 0) {
                        var child = new Element("div", {
                            html : responseHTML
                        }).getElement("*[id=" + selector + "]");
                        responseHTML = child.innerHTML
                    }
                    if (responseElements.length == 0) {
                        if (callback) {
                            try {
                                eval(responseHTML)
                            } catch (e) {
                            }
                            if (typeof data == "object") {
                                callback.run({
                                    success : false,
                                    html : responseHTML,
                                    json : data
                                })
                            } else {
                                callback.run({
                                    success : true,
                                    html : responseHTML
                                })
                            }
                        }
                    } else {
                        if (el && $(el)) {
                            $(el).set("html", responseHTML);
                            if (iseval == "true") {
                                eval(responseJavaScript)
                            }
                            $(ori) ? $(ori).store("key", responseHTML) : null;
                            $(ori) ? $(ori).store("js", responseJavaScript)
                                    : null;
                            if (callback) {
                                callback.run({
                                    success : true,
                                    html : responseHTML
                                })
                            }
                        } else {
                            if (callback) {
                                callback.run(responseHTML)
                            }
                        }
                    }
                },
                onFailure : function(res) {
                    if (callback) {
                        callback.run({
                            success : false,
                            msg : "网络请求错误！"
                        })
                    }
                }
            }).send({
                data : values
            })
        } else {
            if (el && $(el)) {
                if (storeValue) {
                    $(el).set("html", storeValue)
                }
                if (storeJS) {
                    eval(storeJS)
                }
                if (callback) {
                    callback.run({
                        success : true,
                        html : storeValue
                    })
                }
            } else {
                if (callback) {
                    callback.run(storeValue)
                }
            }
        }
    } catch (e) {
    }
};
gewara.util.sendLoadXML = function(c, b, a, d) {
    new Request({
        headers : {
            "Cache-Control" : "no-cache,no-store",
            "If-Modified-Since" : "0"
        },
        url : b,
        method : "get",
        evalScripts : false,
        onSuccess : function(f, e) {
            if (d) {
                d.run({
                    success : true,
                    html : f,
                    xml : e
                })
            }
        },
        onFailure : function(e) {
            if (d) {
                d.run({
                    success : false,
                    msg : "网络请求错误！"
                })
            }
        }
    }).send({
        data : a
    })
};
gewara.util.slideIn = function(c) {
    var b = $(c);
    var a = new Fx.Slide(b, {
        mode : "vertical",
        transition : "sine:in",
        duration : 300
    });
    a.slideIn()
};
gewara.util.removeAllOptions = function(a) {
    var b = $(a);
    b.getElements("option").dispose()
};
gewara.util.addOptions = function(a, c, g, d) {
    var f = $(a), b, e;
    c.each(function(h) {
        if (g instanceof Function) {
            b = g.run(h)
        } else {
            b = h[g]
        }
        if (d instanceof Function) {
            e = d.run(h)
        } else {
            e = h[d]
        }
        new Element("option", {
            value : b,
            text : e
        }).inject(f)
    })
};
gewara.util._escapeHtml = true;
gewara.util.setEscapeHtml = function(a) {
    gewara.util._escapeHtml = a
};
gewara.util._shouldEscapeHtml = function(a) {
    if (a && a.escapeHtml != null) {
        return a.escapeHtml
    }
    return gewara.util._escapeHtml
};
gewara.util.escapeHtml = function(a) {
    var c = document.createElement("div");
    var b = document.createTextNode(a);
    c.appendChild(b);
    return c.innerHTML
};
gewara.util._isHTMLElement = function(a, c) {
    if (a == null || typeof a != "object" || a.nodeName == null) {
        return false
    }
    if (c != null) {
        var b = a.nodeName.toLowerCase();
        if (typeof c == "string") {
            return b == c.toLowerCase()
        }
    }
    return true
};
gewara.util._isArray = function(a) {
    return (a && a.join) ? true : false
};
gewara.util.addRows = function(e, d, a, b) {
    e = $(e);
    if (e == null) {
        return
    }
    if (!gewara.util._isHTMLElement(e, [ "table", "tbody", "thead", "tfoot" ])) {
        return
    }
    if (!b) {
        b = {}
    }
    if (!b.rowCreator) {
        b.rowCreator = gewara.util._defaultRowCreator
    }
    if (!b.cellCreator) {
        b.cellCreator = gewara.util._defaultCellCreator
    }
    var c, f;
    if (gewara.util._isArray(d)) {
        for (f = 0; f < d.length; f++) {
            b.rowData = d[f];
            b.rowIndex = f;
            b.rowNum = f;
            b.data = null;
            b.cellNum = -1;
            c = gewara.util._addRowInner(a, b);
            if (c != null) {
                e.appendChild(c)
            }
        }
    } else {
        if (typeof d == "object") {
            f = 0;
            for ( var g in d) {
                b.rowData = d[g];
                b.rowIndex = g;
                b.rowNum = f;
                b.data = null;
                b.cellNum = -1;
                c = gewara.util._addRowInner(a, b);
                if (c != null) {
                    e.appendChild(c)
                }
                f++
            }
        }
    }
};
gewara.util._addRowInner = function(a, b) {
    var d = b.rowCreator(b);
    if (d == null) {
        return null
    }
    for (var e = 0; e < a.length; e++) {
        var c = a[e];
        if (typeof c == "function") {
            b.data = c(b.rowData, b)
        } else {
            b.data = c || ""
        }
        b.cellNum = e;
        var f = b.cellCreator(b);
        if (f != null) {
            if (b.data != null) {
                if (gewara.util._isHTMLElement(b.data)) {
                    f.appendChild(b.data)
                } else {
                    if (gewara.util._shouldEscapeHtml(b)
                            && typeof (b.data) == "string") {
                        f.innerHTML = gewara.util.escapeHtml(b.data)
                    } else {
                        f.innerHTML = b.data
                    }
                }
            }
            d.appendChild(f)
        }
    }
    return d
};
gewara.util._defaultRowCreator = function(a) {
    return document.createElement("tr")
};
gewara.util._defaultCellCreator = function(a) {
    return document.createElement("td")
};
gewara.util.removeAllRows = function(c, a) {
    c = $(c);
    if (c == null) {
        return
    }
    if (!a) {
        a = {}
    }
    if (!a.filter) {
        a.filter = function() {
            return true
        }
    }
    if (!gewara.util._isHTMLElement(c, [ "table", "tbody", "thead", "tfoot" ])) {
        return
    }
    var d = c.firstChild;
    var b;
    while (d != null) {
        b = d.nextSibling;
        if (a.filter(d)) {
            c.removeChild(d)
        }
        d = b
    }
};
function selectAll(a) {
    $(a).getElements("option").each(function(b) {
        b.selected = true
    })
}
var PanelGroup = new Class(
        {
            tabList : [],
            initialize : function(c, g, d, i, e, b) {
                this.activeClass = d || "active";
                this.hideClass = i || "none";
                this.eventName = e || "click";
                this.current = g || "";
                var j = this.activeClass, f = this.hideClass, h = this.eventName, a = this;
                if (g && $(g)) {
                    $(g).addClass(this.activeClass);
                    $(g + "_content").removeClass(f)
                }
                this.tableList = c;
                c.each(function(l, k) {
                    if ($(l)) {
                        $(l).addEvent(h, function() {
                            if ($(a.current)) {
                                $(a.current).removeClass(j);
                                $(a.current + "_content").addClass(f)
                            }
                            a.current = l;
                            $(l).addClass(j);
                            $(l + "_content").removeClass(f);
                            if (b && $defined(b) && typeof b == "function") {
                                b.call(this, this)
                            }
                        })
                    }
                })
            }
        });
var ClassGroup = new Class({
    initialize : function(a, f, e, d) {
        this.current = f || "";
        this.activeClass = e || "active";
        this.hideClass = d || "none";
        this.tableList = a;
        var c = this.activeClass, b = this;
        if (f) {
            $(f).addClass(c)
        }
        a.each(function(g) {
            if ($(g)) {
                $(g).addEvent("click", function() {
                    if ($(b.current)) {
                        $(b.current).removeClass(c)
                    }
                    b.current = g;
                    $(g).addClass(c)
                })
            }
        })
    }
});
function resizePicture(b, g, e, f, d) {
    var a = 0, c = 0, i = f || "/userfiles/", h = "";
    b.each(function(j) {
        Asset.image(j.get("src"), {
            styles : {
                opacity : 0,
                position : "absolute",
                left : 0,
                top : 0
            },
            onLoad : function() {
                var k = this.getSize();
                if (k.x >= g) {
                    if (k.x >= g || e) {
                        if (j.getParent().tagName != "A") {
                            j.inject(new Element("a", {
                                href : j.src.replace(d + "/", "sw600h600/"),
                                rel : "lightbox[galerie]",
                                target : "_blank"
                            }).inject(j, "before"))
                        }
                    }
                    if (k.x >= g && !d) {
                        a = k.y * g / k.x;
                        c = g;
                        j.set("width", c);
                        j.set("height", a);
                        j.setStyles({
                            width : c + "px",
                            height : a + "px"
                        })
                    }
                    slidePicture()
                }
                this.dispose()
            }
        }).inject(document.body)
    })
}
function slidePicture() {
    var a = $$("a").filter(function(b) {
        return b.rel && b.rel.test(/^lightbox/i)
    });
    $$(a).slimbox({}, null, function(b) {
        return (this == b) || ((this.rel.length > 8) && (this.rel == b.rel))
    })
}
function copyToClipboard(a) {
    var b = $(a);
    if (Browser.Engine.trident) {
        b.select();
        therange = b.createTextRange();
        therange.execCommand("Copy");
        gewaUtil.alert("复制成功。现在您可以粘贴（Ctrl+v）到Blog 或BBS中了。");
        return
    } else {
        gewaUtil.alert("您使用的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。");
        b.select()
    }
}
function stopPropagation(a) {
    a.stopPropagation()
}
function getFCKHtml(a) {
    var b = FCKeditorAPI.GetInstance(a);
    return b.GetXHTML()
}
function getFCKText(a, b) {
    var c = FCKeditorAPI.GetInstance(a), d = $(c.EditorDocument.body).get(
            "text");
    if (b && d.length > b) {
        return d.substring(0, b)
    }
    return d
}
function setFCKHtml(a, c) {
    var b = FCKeditorAPI.GetInstance(a);
    return b.SetHTML(c)
}
function getAndClearFCKElement(a) {
    var c = FCKeditorAPI.GetInstance(a);
    var b = new Element("div", {
        html : c.GetXHTML()
    });
    [ "script", "link", "style" ].each(function(d) {
        b.getElements(d).dispose()
    });
    _process(b);
    c.SetHTML(b.innerHTML);
    return b.innerHTML
}
function _process(a) {
    a.removeAttribute("class");
    a.getChildren().each(function(b) {
        _process(b)
    })
}
function insertFCKHtml(a, c) {
    var b = FCKeditorAPI.GetInstance(a);
    return b.InsertHtml(c)
}
function refreshPage() {
    var c = "" + document.location.href, a = c.indexOf("refresh"), d = c
            .indexOf("#"), b = "";
    if (d > 0) {
        b = c.substring(d);
        c = c.substring(0, d)
    }
    if (a > 0) {
        c = c.substring(0, a - 1)
    } else {
        a = c.indexOf("?");
        if (a > 0) {
            c = c + "&refresh=1"
        } else {
            c = c + "?refresh=1"
        }
    }
    c += b;
    document.location.href = c
}
var runtopAndBottom = new Class({
    initialize : function(a, b) {
        this.isPause = false;
        this.maxScroll = $(a).getScrollSize().y - $(a).getSize().y;
        var d = this, c = function() {
            if (!d.isPause) {
                d.fx.start(0, $(a).getScroll().y + b)
            }
        };
        this.fx = new Fx.Scroll(a, {
            duration : 500,
            transition : Fx.Transitions.Sine.easeOut,
            onComplete : function() {
                if ($(a).getScroll().y == d.maxScroll) {
                    this.set(0, 0)
                }
            }
        });
        $(a).addEvents({
            mouseover : function() {
                d.isPause = true
            },
            mouseout : function() {
                d.isPause = false
            }
        });
        c.periodical(3000)
    }
});
function checkLogin(c, a, b) {
    if (!b) {
        b = function() {
        }
    }
    if (gewara.util.member.login) {
        a()
    } else {
        gewara.util.sendRequest(GewaraUtil.basePath
                + "ma/common/checkLogon.xhtml", {}, function(d) {
            if (d.success) {
                gewara.util.member.login = true;
                gewara.util.member.memberid = d.id;
                gewara.util.member.nickname = d.nickname;
                gewara.util.member.isMobile = d.isMobile;
                gewara.util.member.headUrl = d.headUrl;
                a()
            } else {
                showLogin(a, b)
            }
        })
    }
}
function gotoPosition(a) {
    if ($(a)) {
        $(window).scrollTo(0, $(a).getPosition().y)
    }
}
function gotoURL(a, b) {
    if (b) {
        document.location.target = b
    }
    document.location.href = a
}
var DefaultValue = new Class({
    initialize : function(b, a) {
        if ($(b).value.trim() == "") {
            $(b).value = a
        }
        $(b).addEvents({
            blur : function() {
                if (this.value.trim() == "") {
                    this.value = a
                }
            },
            focus : function() {
                if (this.value.trim() == a) {
                    this.value = ""
                }
            }
        })
    }
});
function addMemberTreasure(memberid, tag, obj) {
    checkLogin(true, function() {
        var url = GewaraUtil.basePath + "micro/addMicroAttention.xhtml";
        new Request({
            url : url,
            method : "post",
            onSuccess : function(resText) {
                eval(resText);
                if (data.success) {
                    if (tag == "micro") {
                        if ($chk(obj) && $chk(obj.getParent("span"))) {
                            obj.getParent("span").set("text", "已关注").addClass(
                                    "gray")
                        } else {
                            refreshPage()
                        }
                    } else {
                        gewaUtil.alert(data.retval)
                    }
                } else {
                    gewaUtil.alert(data.msg)
                }
            }
        }).send({
            data : {
                memberid : memberid
            }
        })
    })
}
function microChange(c) {
    var a = 140;
    if ($chk($(c).value)) {
        a = 140 - $(c).value.length
    }
    if (a < 0) {
        var b = Math.abs(a);
        $("microText").set("styles", {
            color : "#C03B0C"
        });
        $("microText").set(
                "html",
                '已超出<b style="font-size:15px;font-family: Constantia,Georgia" id="font">'
                        + b + "</b>个汉字")
    } else {
        $("microText").set("styles", {
            color : "black"
        }).set(
                "html",
                '你还可以输入<b style="font-size:15px;font-family: Constantia,Georgia" id="font">'
                        + a + "</b>个字")
    }
}
function isCommuBlack(c, d) {
    var b = GewaraUtil.basePath + "home/commu/isCommuBlack.xhtml";
    var a = {
        commuid : c
    };
    return GewaraUtil.sendRequest(b, a, function(e) {
        if (e.success) {
            if (d) {
                window.document.location = d
            }
        } else {
            gewaUtil.alert(e.msg)
        }
    })
}
function addFans(e, d, a) {
    var c = GewaraUtil.basePath + "ajax/common/tobeFans.xhtml";
    var b = {
        relatedid : d,
        tag : a
    };
    GewaraUtil.sendRequest(c, b, function(f) {
        if (f.success) {
            gewaUtil.alert("已添加成功!")
        } else {
            gewaUtil.alert(f.msg)
        }
    });
    $(e).removeEvent("click", addFans)
}
function removeFriendRelate(c) {
    if (confirm("解除好友关系从好友列表中删除，确认删除吗？")) {
        var b = GewaraUtil.basePath + "wala/removeFriend.xhtml";
        var a = {
            memberid : c
        };
        GewaraUtil.sendRequest(b, a, function(d) {
            if (d.success) {
                refreshPage()
            } else {
                gewaUtil.alert(d.msg)
            }
        })
    }
}
gewara.util.successAlert = function(a) {
    $(a).addClass("OkMsg");
    $(a).innerHTML = "设置成功！";
    (function() {
        $(this).removeClass("OkMsg");
        $(this).innerHTML = ""
    }.bind(a)).delay(3000)
};
var tableDialog = new Class({
    Implements : [ Options, Events ],
    options : {},
    initialize : function(c) {
        this.setOptions(c);
        this.options.table = new Element("table", {
            cellspacing : "0",
            cellpadding : "0",
            border : "0",
            width : "100%"
        });
        var b = new Element("tbody").inject(this.options.table);
        var d = new Element("tr").inject(b);
        new Element("td").addClass("dialog_tl").inject(d);
        new Element("td").addClass("dialog_c").inject(d);
        new Element("td").addClass("dialog_tr").inject(d);
        var e = new Element("tr").inject(b);
        new Element("td").addClass("dialog_c").inject(e);
        this.options.content = new Element("td").inject(e);
        new Element("td").addClass("dialog_c").inject(e);
        var a = new Element("tr").inject(b);
        new Element("td").addClass("dialog_bl").inject(a);
        new Element("td").addClass("dialog_c").inject(a);
        new Element("td").addClass("dialog_br").inject(a)
    }
});
//gewara.util.mask = function(b, a) {
//    gewa.util.mask({
//        element : b,
//        mid : a || "mskid_defined_",
//        title : "正在提交，请稍等..."
//    })
//};
gewara.util.mask2 = function(b, a) {
    gewa.util.mask2({
        element : b,
        mid : a || "mskid_defined_"
    })
};
gewara.util.unmask = function() {
    gewa.util.clearMask(arguments[0])
};
gewa.util.maskContent = function(d, h, i, b, c, l, n, f, g, k, a, m) {
    var e = (i ? i.length * 20 + 100 : ""), j = h ? h.length * 12 > 360 ? 360
            : h.length * 12 + 20 : 40, j = e ? e > j ? e : j : e;
    gewa.util.core({
        bgel : $chk(d) ? $(d) : document.body,
        content : h,
        title : i || "",
        width : b || j,
        def : c || "",
        callback : l || $empty,
        bgcolor : n || "#fff",
        dialogBgcolor : f || "#aaa",
        isEsc : g || false,
        cancelCallback : k || $empty,
        initCallback : a || $empty,
        isPin : m || false
    })
};
gewa.util.issure = function(d, g, h, b, c, j, e, k, a, l) {
    var f = (h ? h.length * 20 + 100 : ""), i = g ? g.length * 12 > 360 ? 360
            : g.length * 12 + 40 : 40, i = f ? f > i ? f : i : f;
    gewa.util.core({
        bgel : $chk(d) ? $(d) : document.body,
        content : g,
        title : h || "",
        width : b || i,
        def : c || "",
        callback : j || $empty,
        issure : true,
        cancelCallback : k || $empty,
        initCallback : a || $empty,
        sureBt : e || "确定",
        cancelBt : l || "取消"
    })
};
gewa.util.confirm = function(f, g, e, d, b, c) {
    var a = f.length * 16 < 320 ? 320 : f.length * 16 + 60;
    a = a > 360 ? 360 : a;
    return gewa.util.core({
        bgel : $chk(e) ? $(e) : document.body,
        content : f,
        title : "格瓦拉生活网提示",
        width : d || a,
        issure : true,
        callback : g,
        zIndex : 600,
        isConfirm : true,
        opacity : 0.4,
        def : "confirm",
        sureBt : b || "确定",
        cancelBt : c || "取消"
    })
};
gewa.util.alert = function(e, g, d, c, f, b) {
    var a = e ? e.length * 16 < 320 ? e.length * 16 > 360 ? 360 : 320
            : e.length * 16 + 60 : 320;
    return gewa.util.core({
        bgel : $chk(d) ? $(d) : document.body,
        content : e,
        title : f || "格瓦拉生活网提示",
        width : c || a,
        issure : true,
        callback : g || $empty,
        zIndex : 601,
        isAlert : true,
        opacity : 0.4,
        def : "alert",
        sureBt : b || "确定"
    })
};
gewa.util.tips = function() {
    var a = arguments[1] ? arguments[1].length * 12 > 360 ? 360
            : arguments[1].length * 12 + 40 : 60;
    gewa.util.core({
        bgel : $chk($(arguments[0])) ? $(arguments[0]) : document.body,
        content : arguments[1],
        isFlag : false,
        width : arguments[2] || a,
        def : arguments[3] ? arguments[3] : "tips",
        point : arguments[4] || "down",
        callback : arguments[5] || $empty(),
        zindex : arguments[6] ? arguments[4] : 300,
        ishide : arguments[7] || 1,
        isEsc : arguments[8] || false,
        size : arguments[9] || 15,
        tipsBgColor : arguments[10] || "#fff",
        tipsPtImg : arguments[11] || "css/home/opt.png"
    })
};
gewa.util.popo = function(e, d, c, a, b, g) {
    d = $(d) ? $(d).getElement(".none").get("html") : d;
    var f = function(h, i) {
        if (b && typeof b == "function") {
            b(h, i, a, g)
        } else {
            gewa.util.tips(h, d, c, i, a, g)
        }
    };
    e.each(function(h) {
        h.addEvents({
            mouseenter : function() {
                this.store("isher", true);
                (function() {
                    if (this.retrieve("isher") != null) {
                        var i = e.indexOf(this);
                        if (gewa.util.container["tips_" + i]) {
                            gewa.util.container["tips_" + i].isAttach = true
                        } else {
                            f(this, "tips_" + i)
                        }
                    }
                }).delay(200, this)
            },
            mouseleave : function() {
                var i = e.indexOf(this);
                this.store("isher", null);
                if (gewa.util.container["tips_" + i]) {
                    gewa.util.container["tips_" + i].isAttach = false;
                    gewa.util.container["tips_" + i].disposeTips.delay(120,
                            [ "tips_" + i ])
                }
            }
        })
    })
};
gewa.util.container = new Hash();
gewa.util.core = function(i) {
    var e = i.def || "default";
    var j = i.recreate || true;
    if (gewa.util.container[e] && $defined(gewa.util.container[e])
            && gewa.util.container[e].coreDialog) {
        gewa.util.container[e].show(e);
        return false
    }
    var d = {};
    gewa.util.container[e] = d;
    d.options = $extend({
        def : "default",
        content : "",
        bgel : document.body,
        isFlag : true,
        ishide : true,
        border : 1,
        width : 360,
        title : "",
        bgcolor : "#fff",
        zIndex : 300,
        issrue : false,
        callback : $empty,
        cancelCallback : $empty,
        initCallback : $empty,
        sureBt : "确定",
        cancelBt : "取消",
        isConfirm : false,
        isAlert : false,
        point : "up",
        opacity : 0.4,
        tipsBorderColor : "#999",
        tipsBgColor : "#fff",
        tipsPtImg : "css/home/opt.png",
        ietipsPtImg : "css/home/opt.gif?v=000",
        allowmax : 960,
        dialogBgcolor : "#aaa",
        isEsc : false,
        isPin : false
    }, i || {});
    d.coreDialog = {};
    d.options.bgel = $(d.options.bgel);
    if (d.options.bgel && d.options.bgel.match("body")) {
        d.p = d.options.bgel.getScrollSize()
    } else {
        d.p = d.options.bgel.getDimensions()
    }
    d.pos = d.options.bgel.getPosition();
    d.coreDialog = new Element("div", {
        styles : {
            width : "auto",
            display : "inline-block",
            height : "auto",
            opacity : 0,
            position : "absolute",
            top : 0,
            "z-index" : d.options.zIndex + 1
        }
    }).inject(document.body);
    d.coreDialog.set("id", "self" + d.options.def);
    d.isAttach = true;
    d.coreTable = new Element("table", {
        cellspacing : "0",
        cellpadding : "0",
        border : "0",
        width : "100%"
    }).addClass("tableLayer").inject(d.coreDialog);
    d.coreTbody = new Element("tbody").inject(d.coreTable);
    d.coreTR = new Element("tr").inject(d.coreTbody);
    new Element("td").addClass("t_l").inject(d.coreTR);
    new Element("td").addClass("t_c").inject(d.coreTR);
    new Element("td").addClass("t_r").inject(d.coreTR);
    d.coreTR = new Element("tr").inject(d.coreTbody);
    new Element("td").addClass("m_l").inject(d.coreTR);
    d.coreTD = new Element("td", {
        styles : {
            padding : 1,
            background : d.options.dialogBgcolor
        }
    }).addClass("m_c").inject(d.coreTR);
    new Element("td").addClass("m_r").inject(d.coreTR);
    d.coreTR = new Element("tr").inject(d.coreTbody);
    new Element("td").addClass("b_l").inject(d.coreTR);
    new Element("td").addClass("b_c").inject(d.coreTR);
    new Element("td").addClass("b_r").inject(d.coreTR);
    if (d.options.isFlag) {
        if (d.options.isEsc) {
            if ($("dailogCoreDisable")) {
                $("dailogCoreDisable").setStyles({
                    width : d.p.x + "px",
                    height : d.p.y + "px",
                    top : d.pos.y + "px",
                    left : d.pos.x + "px",
                    "background-color" : d.options.dialogBgcolor,
                    "z-index" : d.options.zIndex
                }).show()
            } else {
                new Element("div", {
                    id : "dailogCoreDisable",
                    styles : {
                        position : "absolute",
                        width : d.p.x + "px",
                        height : d.p.y + "px",
                        top : d.pos.y + "px",
                        left : d.pos.x + "px",
                        "z-indent" : "9",
                        opacity : d.options.opacity,
                        "background-color" : d.options.dialogBgcolor,
                        "z-index" : d.options.zIndex
                    }
                }).inject(document.body)
            }
        } else {
            oldStyle = {
                styles : {
                    position : "absolute",
                    width : d.p.x + "px",
                    height : d.p.y + "px",
                    top : d.pos.y + "px",
                    left : d.pos.x + "px",
                    "z-indent" : "9",
                    opacity : d.options.opacity,
                    "background-color" : d.options.dialogBgcolor,
                    "z-index" : d.options.zIndex
                }
            };
            newStyle = {
                styles : {
                    position : "fixed",
                    width : "100%",
                    height : "100%",
                    top : 0,
                    left : 0,
                    "z-indent" : "9",
                    opacity : d.options.opacity,
                    "background-color" : d.options.dialogBgcolor,
                    "z-index" : d.options.zIndex,
                    "overflow-y" : "scroll"
                }
            };
            d.coreDisable = new Element("div", oldStyle).inject(document.body);
            d.coreDisable.set("id", "parent" + d.options.def)
        }
    } else {
        d.tapImg = gewara.util.cdnPath + d.options.tipsPtImg;
        d.ietipsPtImg = gewara.util.cdnPath + d.options.ietipsPtImg;
        d.coreTable.addClass("fixTableLayer");
        d.los = new Element(
                "div",
                {
                    styles : {
                        height : (d.options.point == "up" || d.options.point == "down") ? "15px"
                                : "33px",
                        width : (d.options.point == "up" || d.options.point == "down") ? "33px"
                                : "15px",
                        overflow : "hidden",
                        position : "absolute",
                        background : "url("
                                + (!Browser.ie6 ? d.tapImg : d.ietipsPtImg)
                                + ") no-repeat"
                    }
                }).inject(d.coreDialog);
        if (d.options.ishide && d.options.ishide == 1) {
            d.coreDialog.addEvents({
                mouseenter : function() {
                    d.isAttach = true;
                    if (d.options.callback) {
                        d.options.callback()
                    }
                },
                mouseleave : function() {
                    d.isAttach = false;
                    if (d.options.callback) {
                        d.options.callback()
                    }
                    d.disposeTips.delay(120, [ e ])
                }
            })
        } else {
            if (d.options.callback) {
                d.options.callback()
            }
        }
    }
    if (d.options.title) {
        new Element("h2", {
            text : d.options.title ? d.options.title : "格瓦拉生活网提示",
            styles : {
                height : "42px",
                "line-height" : "42px",
                "text-indent" : "10px",
                "font-size" : "16px",
                "font-weight" : "bold",
                background : "#f0f0f0",
                width : "100%",
                display : "block",
                color : "#333"
            }
        }).inject(d.options.isFlag ? d.coreTD : d.coreDialog);
        if (!d.options.isConfirm && !d.options.isAlert) {
            new Element("span", {
                styles : {
                    position : "absolute",
                    top : "14px",
                    right : "16px",
                    cursor : "pointer",
                    display : "block",
                    height : "23px",
                    width : "23px",
                    background : "url(" + gewara.util.icon
                            + ") 0 -142px no-repeat"
                }
            }).addEvents({
                click : function() {
                    d.options.cancelCallback.call();
                    d.dispose(e)
                },
                mouseenter : function() {
                    this.setStyle("background-position", "-23px -142px")
                },
                mouseleave : function() {
                    this.setStyle("background-position", "0 -142px")
                }
            }).inject(d.options.isFlag ? d.coreTD : d.coreDialog)
        }
    }
    d.content = new Element("div", {
        styles : {
            padding : d.options.isEsc ? "" : "10px",
            width : "auto",
            "line-height" : "22px",
            color : "#666",
            "font-size" : "12px",
            "font-weight" : "normal",
            "background-color" : d.options.isFlag ? d.options.bgcolor
                    : d.options.tipsBgColor,
            height : "auto",
            overflow : "hidden"
        }
    }).inject(d.coreTD);
    if ($(d.options.content)) {
        $(d.options.content).show().setStyle("opacity", 1).inject(d.content)
    } else {
        d.content.innerHTML = d.options.content ? d.options.content
                : "哦，出错了..."
    }
    d.show = function() {
        var k = arguments[0] ? arguments[0] : "default";
        if (gewa.util.container[k]) {
            gewa.util.show(gewa.util.container[k].coreDialog, function() {
                if (gewa.util.container[k].coreDisable) {
                    gewa.util.container[k].coreDisable.show()
                }
            })
        }
    };
    d.getPositionSettings = function(k) {
        var l = d.options.isFlag ? 0 : d.options.size || 15;
        var m = d.options.isFlag ? "center" : d.options.point;
        switch (m) {
        case "left":
        case 8:
        case 9:
        case 10:
            return {
                edge : {
                    x : "left",
                    y : "top"
                },
                position : {
                    x : "right",
                    y : "top"
                },
                offset : {
                    x : l,
                    y : -l
                }
            };
        case "right":
        case 2:
        case 3:
        case 4:
            return {
                edge : {
                    x : "right",
                    y : "top"
                },
                position : {
                    x : "left",
                    y : "top"
                },
                offset : {
                    x : -l,
                    y : -l
                }
            };
        case "up":
        case 11:
        case 12:
        case 1:
            return {
                edge : {
                    x : k ? k : "left",
                    y : "bottom"
                },
                position : {
                    x : k ? k : "left",
                    y : "top"
                },
                offset : {
                    y : -l,
                    x : (!k) ? (-l) : l + 10
                }
            };
        case "down":
        case 5:
        case 6:
        case 7:
            return {
                edge : {
                    x : k ? k : "left",
                    y : "top"
                },
                position : {
                    x : k ? k : "left",
                    y : "bottom"
                },
                offset : {
                    y : l,
                    x : (!k) ? (-l - 5) : l + 10
                }
            };
        case "center":
            return {
                edge : {
                    x : "center",
                    y : "center"
                },
                position : {
                    x : "center",
                    y : "center"
                },
                offset : {
                    y : 0,
                    x : 0
                }
            }
        }
    };
    d.hide = function() {
        var k = arguments[0] ? arguments[0] : "default";
        if (!gewa.util.container[k]) {
            return
        }
        if (gewa.util.container[k]) {
            d.morph(gewa.util.container[k], function() {
                if (gewa.util.container[k]) {
                    gewa.util.container[k].coreDisable.hide()
                }
            })
        }
    };
    d.dispose = function() {
        var k = arguments[0] ? arguments[0] : "default", l = arguments[1];
        if (!gewa.util.container[k]) {
            return
        }
        if (gewa.util.container[k]) {
            d.morph(gewa.util.container[k],
                    function() {
                        if (gewa.util.container[k]
                                && $(gewa.util.container[k].options.content)) {
                            if (l) {
                                $(gewa.util.container[k].options.content)
                                        .dispose()
                            } else {
                                $(gewa.util.container[k].options.content)
                                        .hide().inject(document.body)
                            }
                        }
                        if (gewa.util.container[k]
                                && gewa.util.container[k].coreDialog) {
                            gewa.util.container[k].coreDialog.dispose()
                        }
                        if ($("dailogCoreDisable")
                                && gewa.util.container[k].options.isEsc) {
                            $("dailogCoreDisable").hide()
                        } else {
                            if (gewa.util.container[k]
                                    && gewa.util.container[k].coreDisable) {
                                gewa.util.container[k].coreDisable.dispose()
                            }
                        }
                        gewa.util.container.erase(k)
                    })
        }
    };
    d.morph = function(n, l) {
        if (!n) {
            return
        }
        if (n.coreDialog) {
            var q = n.coreDialog.getPosition(), o = window.getScroll(), p = n.coreDialog
                    .getDimensions();
            var k = n.coreFloor.retrieve("key");
            if (k) {
                if (!n.options.bgel.match("body")) {
                    q.x = q.x == 0 ? k.l : q.x + o.x;
                    q.y = q.y == 0 ? k.t : q.y + o.y
                }
                if (!d.options.isFlag) {
                    var m = d.options.bgel.retrieve("vp")
                }
                n.coreDialog.setStyle("overflow", "hidden");
                n.coreDialog.set("morph", {
                    duration : d.options.isFlag ? 260 : 200,
                    transition : Fx.Transitions.linear,
                    link : "cancel",
                    onComplete : function() {
                        if (l && typeof l == "function") {
                            l()
                        }
                    }
                }).morph(
                        {
                            opacity : [ 1, 0 ],
                            width : [ p.width, 0 ],
                            height : [ p.height, 0 ],
                            top : [
                                    d.options.isFlag ? q.y : m.top
                                            - d.coreDialog.h / 2,
                                    (!d.options.isFlag) ? m.top : p.height / 2
                                            + q.y ],
                            left : [
                                    d.options.isFlag ? q.x : m.left
                                            - d.coreDialog.w / 2,
                                    (!d.options.isFlag) ? m.left : p.width / 2
                                            + q.x ],
                            "font-size" : [ 12, 4 ]
                        });
                if (n.coreDialog.getElement("table")) {
                    n.coreDialog.getElement("table").set("morph", {
                        duration : 300,
                        transition : Fx.Transitions.linear,
                        link : "cancel"
                    }).morph({
                        "margin-left" : [ 0, -p.width / 5 ],
                        "margin-top" : [ 0, -p.height / 5 ],
                        width : [ p.width, p.width / 5 ],
                        height : [ p.height, p.height / 5 ],
                        "font-size" : [ 12, 4 ]
                    })
                }
            } else {
                l()
            }
        }
    };
    d.disposeTips = function() {
        if (gewa.util.container[this] && !gewa.util.container[this].isAttach) {
            d.dispose(this, true)
        }
    };
    d.sanim = function() {
        var m = arguments[0], l = arguments[1];
        d.options.counter = {
            count : l
        };
        var k = (function() {
            if (this.count == 0) {
                if (d.options.callback) {
                    d.options.callback()
                }
                d.dispose(e);
                clearInterval(k)
            }
            m.setStyle("width", "80px");
            m.value = d.options.sureBt + "(" + this.count + ")";
            this.count--
        }).periodical(1000, d.options.counter)
    };
    if (d.options.issure) {
        d.buttonBox = new Element("div", {
            styles : {
                width : "94%",
                height : "100%",
                overflow : "hidden"
            }
        }).inject(new Element("div", {
            styles : {
                height : "32px",
                padding : "0 0 15px 0",
                width : "100%",
                background : "#fff",
                overflow : "hidden"
            }
        }).inject(d.options.isFlag ? d.coreTD : d.coreDialog));
        if (!d.options.isAlert) {
            new Element("input", {
                type : "button",
                value : d.options.cancelBt
            }).addEvents({
                click : function() {
                    d.options.cancelCallback.call();
                    d.dispose(e)
                }
            }).inject(new Element("label", {
                styles : {
                    "float" : "right",
                    margin : "0 0 0 15px"
                }
            }).addClass("bigWhiteBt bigBt button").addEvents({
                mouseenter : function() {
                    this.addClass("bg_hover")
                },
                mouseleave : function() {
                    this.removeClass("bg_hover")
                }
            }).inject(d.buttonBox))
        }
        d.cancel = new Element("input", {
            type : "button",
            value : d.options.sureBt
        }).addEvents({
            click : function() {
                if (d.options.isConfirm && d.options.callback) {
                    d.options.callback();
                    d.dispose(e)
                } else {
                    if (d.options.counter) {
                        d.options.counter.count = 0
                    } else {
                        if (d.options.callback) {
                            d.options.callback()
                        }
                    }
                }
            }
        }).inject(new Element("label", {
            styles : {
                "float" : "right"
            }
        }).addClass("button redBt bigBt").addEvents({
            mouseenter : function() {
                this.addClass("bg_hover")
            },
            mouseleave : function() {
                this.removeClass("bg_hover")
            }
        }).inject(d.buttonBox));
        if (d.options.isAlert || d.options.isConfirm) {
            d.content.setStyles({
                padding : "20px 20px 20px 60px",
                "background-image" : "url(" + gewara.util.icon + ")",
                "background-repeat" : "no-repeat",
                "font-size" : "16px",
                "background-position" : d.options.isAlert ? "6px -742px"
                        : "6px -447px"
            })
        }
        if (d.options.isAlert) {
            d.sanim(d.cancel, 4)
        }
    }
    d.coreDialog.w = d.options.width ? d.options.width
            : d.coreDialog.clientWidth > 360 ? 360 : d.coreDialog.clientWidth;
    d.coreDialog.h = d.coreDialog.offsetHeight;
    var a = "";
    if (!d.options.isFlag) {
        a = d.options.tipsBgColor
    } else {
        if (d.options.isAlert || d.options.isConfirm) {
            a = "#fff"
        } else {
            a = d.options.bgcolor
        }
    }
    var b = "";
    if (d.options.point == "up" || d.options.point == "down") {
        var h = d.options.bgel.getPosition(), f = d.options.bgel
                .getDimensions(), g = (window.getSize().x - d.options.allowmax) / 2;
        if ((h.x + f.width + d.coreDialog.w) > (g + d.options.allowmax)) {
            b = "right"
        }
    }
    d.coreFloor = new Element(
            "div",
            {
                styles : {
                    border : "1px solid #dcdcdc",
                    width : 1,
                    height : 1,
                    position : "absolute",
                    overflow : "hidden",
                    "background-image" : (!d.options.isAlert || !d.options.isConfirm) ? ""
                            : "url(" + gewara.util.cdnPath
                                    + "css/images/loading.gif)",
                    "background-position" : "center center",
                    "background-repeat" : "no-repeat",
                    "background-color" : a,
                    "z-index" : d.options.zIndex
                }
            }).inject(document.body).position($extend({
        relativeTo : d.options.bgel
    }, d.getPositionSettings(b)));
    d.coreDialog.l = d.coreFloor.getPosition().x;
    d.coreDialog.t = d.coreFloor.getPosition().y;
    if (d.coreFloor.retrieve("key") == null) {
        d.coreFloor.store("key", {
            x : d.coreDialog.w,
            y : d.coreDialog.h,
            t : d.coreDialog.t,
            l : d.coreDialog.l
        })
    }
    d.coreDialog.setStyle("width", d.coreDialog.w);
    d.coreFloor
            .set(
                    "morph",
                    {
                        duration : d.options.isFlag ? 260 : 200,
                        transition : Fx.Transitions.linear,
                        link : "cancel",
                        onComplete : function() {
                            try {
                                d.coreDialog.setStyles({
                                    opacity : 1
                                });
                                d.coreDialog.position($extend({
                                    relativeTo : d.options.bgel
                                }, d.getPositionSettings(b)));
                                if (d.options.bgel == document.body
                                        && !d.options.isPin
                                        && !navigator.userAgent
                                                .match(/Windows NT 6.1/i)
                                        && !navigator.userAgent.match(/rv:11/i)) {
                                    d.coreDialog.pin()
                                }
                                d.coreFloor.dispose();
                                if (navigator.userAgent
                                        .match(/Windows NT 6.1/i)
                                        && navigator.userAgent.match(/rv:11/i)) {
                                    (function() {
                                        d.coreDialog.setStyles({
                                            top : d.coreDialog.t
                                                    - d.coreDialog.h / 2,
                                            left : d.coreDialog.l
                                                    - d.coreDialog.w / 2
                                        })
                                    }).delay(10)
                                }
                                if (d.options.isFlag
                                        && (d.options.isEsc
                                                || d.options.isAlert || d.options.isConfirm)) {
                                    document.addEvent("keypress", function(l) {
                                        if (l.key == "esc") {
                                            d.dispose(e, true)
                                        }
                                        if (l.key == "enter") {
                                            if (d.options.isConfirm
                                                    && d.options.callback) {
                                                d.options.callback();
                                                d.dispose(e)
                                            } else {
                                                if (d.options.counter) {
                                                    d.options.counter.count = 0
                                                } else {
                                                    if (d.options.callback) {
                                                        d.options.callback()
                                                    }
                                                }
                                            }
                                        }
                                        document.removeEvent("keypress",
                                                arguments.callee)
                                    })
                                }
                                d.options.initCallback.call()
                            } catch (k) {
                            }
                        }
                    });
    if (d.options.isFlag) {
        d.coreFloor.morph({
            opacity : [ 0, 1 ],
            width : [
                    0,
                    d.options.width ? d.options.width
                            : d.coreDialog.clientWidth > 360 ? 360
                                    : d.coreDialog.clientWidth ],
            height : [ 0, d.coreDialog.offsetHeight ],
            left : [ d.coreDialog.l, d.coreDialog.l - d.coreDialog.w / 2 ],
            top : [ d.coreDialog.t, d.coreDialog.t - d.coreDialog.h / 2 ]
        })
    } else {
        var c = {};
        c.chlid = d.options.bgel.getDimensions();
        if (d.options.point == "left") {
            c.left = d.coreDialog.l + d.coreDialog.w / 2 + 10;
            c.top = d.coreDialog.t + d.coreDialog.h / 2;
            d.los.setStyles({
                left : "-9px",
                top : "12px",
                "background-position" : "0 -11px"
            })
        } else {
            if (d.options.point == "right") {
                c.left = d.coreDialog.l - d.coreDialog.w / 2 - 10;
                c.top = d.coreDialog.t + d.coreDialog.h / 2;
                d.los.setStyles({
                    right : "-9px",
                    top : "12px",
                    "background-position" : "-33px -11px"
                })
            } else {
                if (d.options.point == "up") {
                    if (b == "") {
                        d.los.setStyles({
                            bottom : "-9px",
                            left : "20px",
                            "background-position" : "-9px -32px"
                        });
                        c.left = d.coreDialog.l + d.coreDialog.w / 2
                    } else {
                        d.los.setStyles({
                            bottom : "-9px",
                            right : "20px",
                            "background-position" : "-9px -32px"
                        });
                        c.left = d.coreDialog.l - d.coreDialog.w / 2
                    }
                    c.top = d.coreDialog.t - d.coreDialog.h / 2 + f.y / 2
                } else {
                    if (b == "") {
                        d.los.setStyles({
                            top : "-9px",
                            left : "20px",
                            "background-position" : "-13px 0"
                        });
                        c.left = d.coreDialog.l + d.coreDialog.w / 2
                    } else {
                        d.los.setStyles({
                            top : "-9px",
                            right : "10px",
                            "background-position" : "-13px 0"
                        });
                        c.left = d.coreDialog.l - d.coreDialog.w / 2
                    }
                    c.top = d.coreDialog.t + d.coreDialog.h / 2 + 10
                }
            }
        }
        d.options.bgel.store("vp", c);
        d.coreFloor.morph({
            width : [
                    0,
                    d.options.width ? d.options.width
                            : d.coreDialog.clientWidth > 360 ? 360
                                    : d.coreDialog.clientWidth ],
            height : [ 0, d.coreDialog.offsetHeight ],
            left : [ c.left, c.left - d.coreDialog.w / 2 ],
            top : [ c.top, c.top - d.coreDialog.h / 2 ]
        })
    }
};
gewa.util.mask = function(a) {
    this.options = $extend({
        mid : "mskid_defined_",
        table : "",
        content : "",
        title : "",
        element : document.body,
        opacity : "0.2",
        zindex : 600,
        bgcolor : "#fff"
    }, a || {});
    if ($(this.options.element)) {
        this.options.element = $(this.options.element)
    } else {
        this.options.element = document.body
    }
    this.dialog = new Element("div", {
        styles : {
            width : "130px",
            height : "30px",
            position : "absolute",
            "z-index" : this.options.zindex + 1,
            background : "#eee",
            padding : "2px",
            border : "1px solid #aaa"
        }
    }).inject(document.body);
    this.dialog.set("id", this.options.mid + "maskDialog");
    this.dialog.position({
        relativeTo : this.options.element,
        position : "center",
        edge : "center"
    });
    this.winSize = this.options.element.getScrollSize();
    this.winfacebox = new Element("div", {
        styles : {
            position : "absolute",
            width : this.winSize.x + "px",
            height : this.winSize.y + "px",
            top : "0",
            left : "0",
            "z-indent" : "9",
            opacity : this.options.opacity,
            "background-color" : this.options.bgcolor,
            "z-index" : this.options.zindex
        }
    }).inject($(document.body));
    this.winfacebox.set("id", this.options.mid + "winfacebox");
    gewara.util.toCenter(this.winfacebox, this.options.element);
    this.loadUrl = gewara.util.cdnPath + "css/home/load.gif";
    new Element("h2", {
        text : this.options.title ? this.options.title : "请稍等...",
        styles : {
            height : "22px",
            width : "100%",
            "line-height" : "22px",
            color : "#333",
            "font-size" : "12px",
            "font-weight" : "normal",
            "text-indent" : "8px",
            background : "#eee",
            display : "block"
        }
    }).inject(this.dialog);
    new Element("div", {
        styles : {
            height : "8px",
            width : "100%",
            background : "#eee url(" + this.loadUrl
                    + ") center center no-repeat"
        }
    }).inject(this.dialog)
};
gewa.util.mask2 = function(a) {
    this.options = $extend({
        mid : "mskid_defined_",
        table : "",
        content : "",
        title : "",
        element : document.body,
        opacity : "0.4",
        zindex : 600,
        bgcolor : "#000",
        height : ""
    }, a || {});
    if ($(this.options.element)) {
        this.options.element = $(this.options.element)
    } else {
        this.options.element = document.body
    }
    this.dialog = new Element("div", {
        styles : {
            width : "130px",
            height : "30px",
            position : "absolute",
            "z-index" : this.options.zindex + 1
        }
    }).inject(document.body);
    this.dialog.set("id", this.options.mid + "maskDialog");
    this.dialog.position({
        relativeTo : this.options.element,
        position : "center",
        edge : "center"
    });
    this.winSize = this.options.element.getScrollSize();
    this.winfacebox = new Element("div", {
        styles : {
            position : "absolute",
            width : this.winSize.x + "px",
            height : this.options.opacity ? this.options.opacity
                    : this.winSize.y + "px",
            top : "0",
            left : "0",
            "z-index" : "9",
            opacity : this.options.opacity,
            "background-color" : this.options.bgcolor,
            "z-index" : this.options.zindex
        }
    }).inject($(document.body));
    this.winfacebox.set("id", this.options.mid + "winfacebox");
    gewara.util.toCenter(this.winfacebox, this.options.element);
    this.loadUrl = gewara.util.cdnPath + "css/images/loading4.gif";
    new Element("div", {
        styles : {
            height : "8px",
            width : "100%",
            background : "url(" + this.loadUrl + ") center center no-repeat"
        }
    }).inject(this.dialog)
};
gewa.util.clearMask = function() {
    var b = arguments[0] && $defined(arguments[0]) ? arguments[0]
            : "mskid_defined_", c = b + "maskDialog", a = b + "winfacebox";
    if ($(c) && $(a)) {
        $(c).set("tween", {
            duration : 1000,
            onComplete : function() {
                document.getElements("*[id=" + a + "]").dispose();
                document.getElements("*[id=" + c + "]").dispose()
            }
        }).tween("opacity", "0")
    }
};
gewa.util.popoFlag = function(b) {
    b = new Event(b);
    var a = this[0], c = this[1];
    if (a != b.target && !a.hasChild(b.target) && !c.hasChild(b.target)
            && c != b.target) {
        if (this[3]) {
            this[3]()
        }
        document.removeEvents(this[2], this[4])
    }
};
gewa.util.loadData = function() {
    var a = "T" + Date.now();
    var b = arguments[0] ? arguments[0] : "";
    GewaraUtil.mask(b, a);
    gewara.util.sendLoad(arguments[0], arguments[1], arguments[2], function() {
        GewaraUtil.unmask(a);
        this(arguments[0])
    }.bind(arguments[3] && typeof (arguments[3]) == "function" ? arguments[3]
            : $empty), arguments[4])
};
gewa.util.dispose = function() {
    gewa.util.hide(arguments[0], function() {
        this.dispose()
    }.bind($(arguments[0])))
};
gewa.util.hide = function() {
    var b = $(arguments[0]);
    if (b.retrieve("fx") == null) {
        var a = new Fx.Reveal(b, {
            duration : 500,
            transition : "linear",
            onComplete : function() {
                if (typeof (this) == "function") {
                    this()
                }
            }.bind(arguments[1] ? arguments[1] : this)
        });
        b.store("fx", a);
        a.dissolve()
    } else {
        b.retrieve("fx").dissolve()
    }
};
gewa.util.show = function() {
    var b = $(arguments[0]);
    if (b.retrieve("fx") == null) {
        var a = new Fx.Reveal(b, {
            duration : 500,
            transition : "linear",
            onComplete : function() {
                if (typeof (this) == "function") {
                    this()
                }
            }.bind(arguments[1] ? arguments[1] : this)
        });
        b.store("fx", a);
        a.reveal()
    } else {
        b.retrieve("fx").reveal()
    }
};
gewa.util.shutOpen = function(e, c, b, f) {
    var d = $(e), a = c, b = $(b), h = "收起", g = "展开";
    if (d) {
        if (b) {
            if (b.hasClass("shut")) {
                b.removeClass("shut");
                b.set("text", b.get("text").replace(h, g));
                $(d).tween("height", f);
                return
            } else {
                b.addClass("shut");
                b.set("text", b.get("text").replace(g, h))
            }
        }
        $(d).tween("height", a)
    }
};
var HoverGroup = new Class({
    Implements : [ Options, Events ],
    Binds : [ "enter", "leave", "remain" ],
    options : {
        elements : [],
        delay : 300,
        start : [ "mouseenter" ],
        remain : [],
        end : [ "mouseleave" ]
    },
    initialize : function(a) {
        this.setOptions(a);
        this.attachTo(this.options.elements);
        this.addEvents({
            leave : function() {
                this.active = false
            },
            enter : function() {
                this.active = true
            }
        })
    },
    elements : [],
    attachTo : function(d, e) {
        var b = {}, c = {}, a = {};
        this.options.start.each(function(f) {
            b[f] = this.enter
        }, this);
        this.options.end.each(function(f) {
            a[f] = this.leave
        }, this);
        this.options.remain.each(function(f) {
            c[f] = this.remain
        }, this);
        if (e) {
            d.each(function(f) {
                f.removeEvents(b).removeEvents(a).removeEvents(c);
                this.elements.erase(f)
            })
        } else {
            d.each(function(f) {
                f.addEvents(b).addEvents(a).addEvents(c)
            });
            this.elements.combine(d)
        }
        return this
    },
    detachFrom : function(a) {
        this.attachTo(a, true)
    },
    enter : function(a) {
        this.isMoused = true;
        this.assert(a)
    },
    leave : function(a) {
        this.isMoused = false;
        this.assert(a)
    },
    remain : function(a) {
        if (this.active) {
            this.enter(a)
        }
    },
    assert : function(a) {
        $clear(this.assertion);
        this.assertion = (function() {
            if (!this.isMoused && this.active) {
                this.fireEvent("leave", a)
            } else {
                if (this.isMoused && !this.active) {
                    this.fireEvent("enter", a)
                }
            }
        }).delay(this.options.delay, this)
    }
});
var dwCheckboxes = new Class({
    Implements : [ Options ],
    options : {
        elements : "input[type=checkbox]",
        mode : "toggle",
        relativ : ""
    },
    initialize : function(a) {
        this.setOptions(a);
        document.ondragstart = function() {
            return false
        };
        this.options.elements = $$(this.options.elements);
        this.manage()
    },
    manage : function() {
        var a = 0;
        this.options.elements.each(function(c) {
            c.addEvents({
                mousedown : function(d) {
                    d.stop();
                    a = 1;
                    c.checked = !c.checked
                },
                mouseenter : function(d) {
                    if (a === 1) {
                        c.checked = ("toggle" == this.options.mode ? !c.checked
                                : "check" == this.options.mode)
                    }
                    this.allManager()
                }.bind(this),
                click : function(d) {
                    c.checked = !c.checked;
                    a = 0;
                    this.allManager()
                }.bind(this)
            });
            var b = $$("label[for=" + c.get("id") + "]");
            if (b.length) {
                b[0].addEvent("click", function() {
                    c.checked = !c.checked
                })
            }
        }.bind(this));
        window.addEvent("mouseup", function() {
            a = 0;
            this.allManager()
        }.bind(this))
    },
    allManager : function() {
        if (this.options.relativ) {
            if (this.options.elements.filter(function(a) {
                return a.checked
            }).length == this.options.elements.length) {
                this.options.relativ.checked = true
            } else {
                this.options.relativ.checked = false
            }
        }
    }
});
String.implement({
    equals : function(a) {
        return (this == a || JSON.encode(this) == JSON.encode(a))
    }
});
Element.implement({
    click : function(a) {
        return this.addEvent("click", a)
    },
    hasEvent : function(a, b) {
        var c = this.retrieve("events");
        return c && c[a] && (b == undefined || c[a].keys.contains(b))
    },
    definedHight : function(a) {
        if (this.retrieve("height") == null) {
            this.store("height", this.getDimensions().y)
        }
        this.setStyles({
            height : 0,
            opacity : 0,
            display : "block"
        });
        if (this.retrieve("fx") == null) {
            this.set("morph", {
                duration : 240,
                transition : Fx.Transitions.linear,
                link : "cancel",
                onComplete : function() {
                    if (a && typeof a == "function") {
                        a()
                    }
                }
            }).morph({
                height : this.retrieve("height"),
                opacity : 1
            });
            this.store("fx", true)
        } else {
            this.morph({
                height : this.retrieve("height"),
                opacity : 1
            })
        }
    },
    zeroHight : function() {
        this.morph({
            height : 0,
            opacity : 0
        })
    },
    hasProperty : function(a) {
        return this.getProperty(a) ? true : false
    },
    toggleDisplay : function() {
        if (this.getStyle("display") == "none") {
            this.show()
        } else {
            this.hide()
        }
    },
    PlayPicture : function(a, g, h, e) {
        var c = {}, b = this.getElement(".selected"), i = this, d = this
                .getElements(".selected");
        if ($defined(a) && this.retrieve(a) == null) {
            var f = new Element("img", {
                src : gewara.util.cdnPath + "css/images/loading3.gif",
                styles : {
                    top : "46%",
                    left : "46%"
                }
            }).inject(this);
            c.img = Asset.image(a, {
                styles : {
                    opacity : 0
                },
                onLoad : function() {
                    if (this.width > g || this.height > h) {
                        rateWidth = this.width / g;
                        rateHeight = this.height / h;
                        if (rateWidth > rateHeight) {
                            c.width = g;
                            c.height = this.height / rateWidth
                        } else {
                            c.width = this.width / rateHeight;
                            c.height = h
                        }
                    } else {
                        c.width = this.width;
                        c.height = this.height
                    }
                    c.left = (g - c.width) / 2;
                    c.top = (h - c.height) / 2;
                    if (b != null && b != this) {
                        if (gewa.util.container.pic) {
                            gewa.util.container.pic.dispose("pic")
                        }
                        d.removeClass("selected");
                        b.morph({
                            height : 0,
                            width : 0,
                            opacity : 0,
                            left : b.width / 2,
                            top : b.height / 2
                        })
                    }
                    f.dispose();
                    this.setStyles({
                        height : 0,
                        width : 0,
                        left : c.width / 2,
                        top : c.height / 2
                    });
                    this.addClass("selected").morph({
                        height : c.height,
                        opacity : 1,
                        width : c.width,
                        left : 0,
                        top : 0
                    });
                    i.morph({
                        height : c.height,
                        width : c.width,
                        "margin-left" : c.left,
                        "margin-top" : c.top
                    });
                    if (typeof (e) == "function") {
                        e(true)
                    }
                }
            }).inject(this);
            this.store(a, c)
        } else {
            var c = this.retrieve(a);
            b.morph({
                height : 0,
                width : 0,
                opacity : 0,
                left : b.width / 2,
                top : b.height / 2
            });
            if (c != null && $defined(a)) {
                if (gewa.util.container.pic) {
                    gewa.util.container.pic.dispose("pic")
                }
                d.removeClass("selected");
                c.img.addClass("selected").morph({
                    height : c.height,
                    opacity : 1,
                    width : c.width,
                    left : 0,
                    top : 0
                });
                i.morph({
                    height : c.height,
                    width : c.width,
                    "margin-left" : c.left,
                    "margin-top" : c.top
                })
            } else {
                if (!gewa.util.container.pic) {
                    gewa.util.maskContent(i, "没有图片了...", "", 220, "pic")
                }
            }
            if (typeof (e) == "function") {
                e(true)
            }
        }
    },
    hover : function(c, e, a, f, g, b) {
        if (!$(c)) {
            return null
        }
        c = $(c);
        if (c.retrieve("hover") == null) {
            var d = new HoverGroup({
                elements : [ this, c ],
                delay : $defined(g) ? g : 300,
                onEnter : function() {
                    if (a && typeof a == "function") {
                        a()
                    }
                    c.definedHight(e);
                    if (b && typeof b == "function") {
                        b()
                    }
                },
                onLeave : function() {
                    c.zeroHight();
                    if (f && typeof f == "function") {
                        f()
                    }
                }
            });
            c.store("hover", d);
            this.store("hover", d)
        }
    },
    mousehover : function(b, a) {
        return this.addEvents({
            mouseenter : function(c) {
                b.attempt(c, this)
            },
            mouseleave : function(c) {
                a.attempt(c, this)
            }
        })
    },
    toPos : function(c, b, a, d) {
        a = $defined(a) ? a : 0;
        d = $defined(d) ? d : 10;
        this.position({
            relativeTo : c,
            position : b,
            offset : {
                x : a,
                y : d
            }
        })
    },
    autoTips : function(a) {
        a = a || {};
        if (document.body.retrieve("autotips") == null) {
            var b = {};
            b.child = {};
            b.child.width = a.width;
            b.ispoint = a.ispoint || false;
            b.child.height = window.getSize().y;
            b.o = this.getPosition();
            b.point = "upperRight";
            a.border = a.border || "#cdcdcd";
            b.inject = new Element("div", {
                styles : {
                    width : b.child.width,
                    height : b.child.height,
                    position : "fixed",
                    bottom : 0,
                    left : 0,
                    opacity : 0,
                    overflow : "hidden",
                    background : a.bgColor,
                    "z-index" : 100,
                    "border-left" : "1px solid " + a.border
                }
            }).inject(document.body);
            b.html = new Element("div", {
                styles : {
                    width : b.child.width - 1,
                    height : "100%",
                    overflow : "hidden",
                    "border-left" : "1px solid #ffffff"
                }
            }).inject(b.inject);
            if (!b.ispoint) {
                b.pl = new Element("div", {
                    styles : {
                        width : "16px",
                        height : a.ch || "22px",
                        "border-width" : "1px 0",
                        "border-style" : "solid",
                        "border-color" : a.plborder || a.border,
                        position : "absolute",
                        "z-index" : a.plIndex || 101,
                        display : "none",
                        background : a.plBgcolor || a.bgColor
                    }
                }).inject(document.body)
            }
            window.addEvents({
                scroll : function() {
                    var c = document.getScroll().y, d = window.getSize().y;
                    if (!window.XMLHttpRequest) {
                        b.inject.setStyles({
                            top : c,
                            position : "absolute"
                        })
                    }
                },
                resize : function() {
                    b.child.height = window.getSize().y;
                    b.inject.setStyle("height", window.getSize().y)
                }
            });
            b.property = {};
            b.property.content = function(d, c, e) {
                b.html.innerHTML = $(d) ? $(d).innerHTML : d;
                b.property.go(c);
                if (e && typeof e == "function") {
                    e()
                }
            };
            b.pos = b.inject.getPosition();
            b.isAttach = false;
            b.property.go = function(d) {
                a.el = d;
                var c = !b.ispoint ? 10 : 0;
                b.inject.setStyle("left", d.getPosition().x
                        + d.getDimensions().x + c);
                if (!b.ispoint) {
                    b.pl.position({
                        relativeTo : d,
                        position : b.point,
                        offset : {
                            x : -5,
                            y : 0
                        }
                    })
                }
            };
            b.isHide = function() {
                return b.isAttach
            };
            b.inject.addEvents({
                mouseenter : function() {
                    b.isAttach = true;
                    if (a.clazz && a.el) {
                        a.el.addClass(a.clazz)
                    }
                },
                mouseleave : function() {
                    b.isAttach = false;
                    b.hide.delay(120, [ a.clazz ])
                }
            });
            b.show = function() {
                b.inject.morph({
                    width : b.child.width,
                    opacity : 1,
                    onComplete : function() {
                        b.isAttach = true;
                        if (document.getElements("select").length > 0
                                && !window.XMLHttpRequest) {
                            document.getElements("select").hide()
                        }
                        if (!b.ispoint) {
                            b.pl.show()
                        }
                        if (a.clazz && a.el) {
                            a.el.addClass(a.clazz)
                        }
                    }.bind(b.inject)
                })
            };
            b.hide = function() {
                if (!b.isAttach) {
                    if (!b.ispoint) {
                        b.pl.hide()
                    }
                    b.inject.morph({
                        width : 0,
                        opacity : 0,
                        onComplete : function() {
                            b.isAttach = false;
                            if (document.getElements("select").length > 0
                                    && !window.XMLHttpRequest) {
                                document.getElements("select").show()
                            }
                            if (a.clazz && a.el) {
                                a.el.removeClass(a.clazz)
                            }
                        }.bind(b.inject)
                    })
                }
            };
            document.body.store("autotips", b);
            return b
        } else {
            return document.body.retrieve("autotips")
        }
    }
});
var Widget = new Class({
    Implements : [ Class.Occlude ],
    initialize : function(a) {
        if (this.occlude("widget", a)) {
            return this.occluded
        }
    }
});
var Collapsable = new Class({
    Extends : Fx.Reveal,
    initialize : function(b, e, d, a, c) {
        this.clicker = $(b);
        this.section = $(e);
        this.f = a;
        this.parent(c);
        this.obj = d;
        this.addEvents()
    },
    addEvents : function() {
        this.clicker.addEvent("click", function(b) {
            var a = $(b) ? $(b) : $(b.target);
            if (!a.hasClass("AC")) {
                a = a.getParent(".AC")
            }
            if ($defined(this.obj) && this.obj != null) {
                checkLogin(true, function() {
                    var c = this.obj.elements.indexOf(a);
                    this.obj.options.count = c;
                    this.element = this.obj.loadElements[c];
                    this.obj.replay();
                    if (a.retrieve(a.get("lang")) == null) {
                        this.obj.getReplay(a, this.obj.loadElements[c]
                                .getElement("ul").getNext("._replayList"), a
                                .get("id"))
                    }
                    if (typeof (this.f) == "function") {
                        this.f()
                    }
                    this.toggle()
                }.bind(this))
            } else {
                this.element = this.section;
                if (typeof (this.f) == "function") {
                    this.f()
                }
                this.toggle()
            }
        }.bind(this))
    }
});
var modifyDefiend = new Class(
        {
            Extends : Fx.Reveal,
            initialize : function(a, b) {
                this.selectSwitchDis = $$("select" + a);
                this.radioSwitchDis = $$("input" + a);
                this.parent(this.section, b);
                if (this.options.address && $(this.options.address)) {
                    this.address = $(this.options.address)
                }
                this.elementTo = $(this.options.to);
                this.cookieCitycode = this.options.cookieCitycode;
                this.select();
                this.radio()
            },
            addEvents : function(b, a) {
                if (b.get("lang") == null || b.get("lang") == "") {
                    if (this.elementTo.getElement("div")) {
                        this.elementTo.getElement("div").show()
                    }
                    this.elementTo.getElement('input[type="radio"]').checked = true;
                    if ($defined(this.dialog) && this.dialog != null) {
                        this.hide();
                        this.clearChoice()
                    }
                } else {
                    this.elementPlugs(b);
                    this.element = this.dialog;
                    gewa.util.mask({
                        element : this.elementTo,
                        title : "正在加载,请稍候..."
                    });
                    this.selection(b, a);
                    this
                            .update(
                                    b.get("lang"),
                                    function() {
                                        this.loadElement
                                                .getElements(
                                                        "input[type='text']")
                                                .each(
                                                        function(e) {
                                                            if (!$("myScript"
                                                                    + e
                                                                            .get("name"))) {
                                                                var c = this, d = new Date();
                                                                new Asset.javascript(
                                                                        gewara.util.basePath
                                                                                + "activity/getConst.xhtml?citycode="
                                                                                + this.cookieCitycode
                                                                                + "&tag="
                                                                                + b
                                                                                        .get("lang")
                                                                                + "&v="
                                                                                + d
                                                                                        .getMilliseconds(),
                                                                        {
                                                                            id : "myScript"
                                                                                    + e
                                                                                            .get("name"),
                                                                            onLoad : function() {
                                                                                c
                                                                                        .autoChoice(
                                                                                                b,
                                                                                                e)
                                                                            }
                                                                        })
                                                            } else {
                                                                this
                                                                        .autoChoice(
                                                                                b,
                                                                                e)
                                                            }
                                                        }.bind(this))
                                    }.bind(this));
                    this.reveal()
                }
                if (this.choice && this.elementTo) {
                    this.choice.store("relatedid", null);
                    this.choice.store("categoryid", null);
                    this.elementTo.store("relatedid", null);
                    this.elementTo.store("categoryid", null)
                }
                OverText.update()
            },
            autoChoice : function(filter, item) {
                var tokens = eval(filter.get("lang") + item.get("lang"));
                new Autocompleter.Local(item, tokens, {
                    delay : 100,
                    maxChoices : 10,
                    ipt : item,
                    relatedFun : this.objectRelated.bind(this),
                    filter : function() {
                        var values = this.queryValue.split(/ +/);
                        return this.tokens.filter(function(token) {
                            var result = values.every(function(v) {
                                var reg = new RegExp(v.escapeRegExp(), "i");
                                return reg.test(token.skey)
                            });
                            return result
                        })
                    },
                    injectChoice : function(choice) {
                        modifyPlug(this, choice, item.get("name"), item
                                .get("lang"))
                    },
                    addChoiceEvents : function(el) {
                        return el.addEvents({
                            mouseover : this.choiceOver.bind(this, [ el ]),
                            click : this.choiceSelect.bind(this, [ el ])
                        })
                    }
                })
            },
            selection : function(b, a) {
                this.elementTo.getElement("div").hide();
                this.clearChoice();
                this.elementTo
                        .getElements('input[type="radio"]')
                        .each(
                                function(c) {
                                    this.showChoice.show();
                                    if (c.value.trim() == b.get("lang").trim()) {
                                        c.checked = true;
                                        new Element("span", {
                                            text : "请选择关联的" + c.get("title"),
                                            styles : {
                                                "padding-right" : "8px",
                                                cursor : "pointer"
                                            }
                                        }).inject(new Element("span").addClass(
                                                "releBt releHover").addEvent(
                                                "click", function() {
                                                    this.addEvents(c, false);
                                                    this.dialog.show()
                                                }.bind(this)).inject(
                                                this.showChoice));
                                        if (!a) {
                                            new Element(
                                                    "img",
                                                    {
                                                        src : gewara.util.cdnPath
                                                                + "css/images/blank.gif"
                                                    })
                                                    .addEvent(
                                                            "click",
                                                            function() {
                                                                this.elementTo
                                                                        .getElement('input[type="radio"]').checked = true;
                                                                this.elementTo
                                                                        .getElement(
                                                                                "div")
                                                                        .show();
                                                                this.dialog
                                                                        .hide();
                                                                this
                                                                        .clearChoice();
                                                                if (this.address) {
                                                                    this.address.value = "";
                                                                    this.address
                                                                            .fireEvent(
                                                                                    "blur",
                                                                                    [ this.address ])
                                                                }
                                                                c.checked = "";
                                                                OverText
                                                                        .update()
                                                            }.bind(this))
                                                    .inject(
                                                            new Element(
                                                                    "span",
                                                                    {
                                                                        text : c
                                                                                .getParent()
                                                                                .get(
                                                                                        "text")
                                                                    })
                                                                    .inject(new Element(
                                                                            "span",
                                                                            {
                                                                                "class" : "releBt releHover"
                                                                            })
                                                                            .inject(
                                                                                    this.showChoice,
                                                                                    "top")))
                                        }
                                        GewaraUtil.unmask()
                                    } else {
                                        c.checked = ""
                                    }
                                }.bind(this));
                OverText.update()
            },
            create : function(b) {
                this.dialog = new Element("div", {
                    "class" : "plugpanel",
                    styles : {
                        width : "600px",
                        display : "none",
                        visibility : "visible"
                    }
                }).inject(document.body);
                this.inner = new Element("div", {
                    "class" : "inner"
                }).inject(this.dialog);
                new Element("img", {
                    src : gewara.util.cdnPath + "css/home/min_pt.gif",
                    styles : {
                        position : "absolute",
                        top : "-5px",
                        left : "20px"
                    }
                }).inject(this.inner);
                this.close = new Element("span", {
                    "class" : "more",
                    styles : {
                        background : "url(" + gewara.util.cdnPath
                                + "css/home/del.gif) no-repeat",
                        width : "10px",
                        height : "10px",
                        display : "inline-block",
                        top : "10px",
                        cursor : "pointer"
                    }
                }).addEvent("click", function() {
                    this.dialog.hide();
                    this.choice.empty();
                    if (Browser.ie6) {
                        document.getElements("select").fade(1)
                    }
                }.bind(this)).inject(this.inner);
                this.loadElement = new Element("div").inject(this.inner);
                new Element("span", {
                    "class" : "gr-r"
                }).inject(new Element("span", {
                    "class" : "gr-l"
                }).inject(new Element("div", {
                    "class" : "line mt10"
                }).inject(this.inner)), "after");
                this.choice = new Element("dd").inject(new Element("dl", {
                    "class" : "ui_80 clear relePlugs mt10"
                }).inject(this.inner));
                new Element("b", {
                    text : "你已选择"
                }).inject(new Element("dt").inject(this.choice, "before"));
                this.footer = new Element("div", {
                    "class" : "plugFooter mt10"
                }).inject(this.inner);
                this.sure = new Element("label", {
                    "class" : "button redBt minBt ml20"
                }).addEvents({
                    mouseenter : function() {
                        this.addClass("hover")
                    },
                    mouseleave : function() {
                        this.removeClass("hover")
                    },
                    click : function() {
                        this.confirmChoice("relatedid", "categoryid")
                    }.bind(this)
                }).inject(this.footer);
                new Element("input", {
                    type : "button",
                    value : "确认，添加"
                }).inject(this.sure);
                this.cancel = new Element("label", {
                    "class" : "button whiteBt minBt ml10"
                }).addEvents({
                    mouseenter : function() {
                        this.addClass("hover")
                    },
                    mouseleave : function() {
                        this.removeClass("hover")
                    },
                    click : function() {
                        this.choice.empty();
                        this.dialog.hide();
                        if (Browser.ie6) {
                            document.getElements("select").fade(1)
                        }
                    }.bind(this)
                }).inject(this.footer);
                new Element("input", {
                    type : "button",
                    value : "取消"
                }).inject(this.cancel);
                this.dialog.toPos(this.elementTo, "bottomLeft", 0, 0);
                var a = {
                    dialog : this.dialog,
                    close : this.close,
                    loadEm : this.loadElement,
                    choice : this.choice,
                    sure : this.sure,
                    cancel : this.cancel
                };
                this.dialog.store(b.get("lang"), a)
            },
            elementPlugs : function(a) {
                if (!$defined(this.dialog) && this.dialog == null) {
                    this.create(a)
                } else {
                    if (this.dialog.retrieve(a.get("lang")) != null) {
                        var b = this.dialog.retrieve(a.get("lang"));
                        this.dialog = b.dialog;
                        this.close = b.close.addEvent("click", function() {
                            this.dialog.hide()
                        }.bind(this));
                        this.loadElement = b.loadEm;
                        this.choice = b.choice;
                        this.sure = b.sure.addEvent("click", function() {
                            this.confirmChoice("relatedid", "categoryid")
                        }.bind(this));
                        this.cancel = this.cancel.addEvent("click", function() {
                            this.dialog.hide()
                        }.bind(this))
                    } else {
                        this.create(a)
                    }
                }
            },
            select : function() {
                this.selectSwitchDis.addEvent("change", function(a) {
                    if (this.dialog) {
                        this.dialog.hide()
                    }
                    this.addEvents($(a.target).getElements("option").filter(
                            function(b) {
                                return b.get("selected")
                            })[0], true)
                }.bind(this))
            },
            radio : function() {
                this.radioSwitchDis.addEvent("click", function(a) {
                    if ($(a.target).checked = true) {
                        this.addEvents($(a.target), false)
                    }
                }.bind(this))
            },
            clearChoice : function() {
                if (this.elementTo.getElements("div.relePlugs").length > 0) {
                    this.showChoice = this.elementTo
                            .getElement("div.relePlugs");
                    this.showChoice.hide().empty()
                } else {
                    this.showChoice = new Element("div", {
                        "class" : "relePlugs clear"
                    }).inject(this.elementTo, "bottom")
                }
                if (Browser.ie6) {
                    document.getElements("select").fade(0)
                }
            },
            update : function(d, c) {
                var b = gewara.util.basePath + "ajaxLoadUserFav.xhtml";
                var a = {
                    tag : d,
                    citycode : this.cookieCitycode
                };
                if (this.loadElement.retrieve(d) == null) {
                    GewaraUtil.sendLoad(this.loadElement, b, a,
                            function() {
                                c();
                                this.loadElement.store(d, this.loadElement
                                        .get("html"));
                                this.switchobject();
                                gewaUtil.textOver(".text")
                            }.bind(this))
                } else {
                    this.loadElement.innerHTML = this.loadElement.retrieve(d);
                    c();
                    this.switchobject();
                    gewaUtil.textOver(".text")
                }
            },
            switchobject : function() {
                var a = this;
                this.loadElement.getElements("a").addEvent(
                        "click",
                        function(b) {
                            b.preventDefault();
                            var c = {
                                rel : this.get("rel"),
                                id : this.get("id"),
                                name : this.get("name"),
                                text : this.get("text"),
                                address : this.get("config") ? this
                                        .get("config") : ""
                            };
                            a.objectRelated(c)
                        })
            },
            objectRelated : function(c, f, b) {
                if (!this.choice) {
                    return
                }
                var i = this;
                if (this.choice.retrieve(c.rel) == null) {
                    var h = new Element("span").addClass(
                            "releBt releHover _plugC").inject(
                            f ? this.showChoice : this.choice);
                    if (i.address && c.address != "" && c.address != null) {
                        i.address.value = c.address;
                        i.address.fireEvent("focus", [ i.address ])
                    }
                    var a = new Element("input", {
                        type : "hidden",
                        name : c.rel,
                        value : c.id
                    })
                            .inject(
                                    new Element("img", {
                                        src : gewara.util.cdnPath
                                                + "css/images/blank.gif"
                                    })
                                            .addEvent(
                                                    "click",
                                                    function() {
                                                        if (i.address
                                                                && c.rel == "relatedid") {
                                                            i.address.value = "";
                                                            i.address
                                                                    .fireEvent(
                                                                            "blur",
                                                                            [ i.address ])
                                                        }
                                                        i.choice.store(c.rel,
                                                                null);
                                                        i.elementTo.store(
                                                                c.rel, null);
                                                        if (b == ""
                                                                && i.showChoice
                                                                        .getElements("._plugC").length < 2) {
                                                            i.elementTo
                                                                    .getElement('input[type="radio"]').checked = true;
                                                            i.elementTo
                                                                    .getElement(
                                                                            "div")
                                                                    .show();
                                                            i.dialog.hide();
                                                            OverText.update();
                                                            i.clearChoice()
                                                        }
                                                        this.getParent(
                                                                ".releBt")
                                                                .dispose();
                                                        if (i.elementTo
                                                                .retrieve("relatedid") == null
                                                                && i.elementTo
                                                                        .retrieve("categoryid") == null) {
                                                            i.showChoice
                                                                    .getLast()
                                                                    .show()
                                                        }
                                                    }).inject(
                                                    new Element("span", {
                                                        text : c.text
                                                    }).inject(h)), "before");
                    if (c.rel == "categoryid") {
                        new Element("input", {
                            type : "hidden",
                            name : "category",
                            value : c.name
                        }).inject(a, "before")
                    }
                    i.choice.store(c.rel, h);
                    if (f) {
                        i.elementTo.getElement(".releBt").hide();
                        i.elementTo.store(c.rel, h)
                    }
                } else {
                    var g = i.choice.retrieve(c.rel).getElement("span"), e = g
                            .getElements("input"), d = e.getNext();
                    g.set("text", c.text);
                    e.each(function(j) {
                        if (j.name == "category") {
                            j.value = c.name
                        } else {
                            if (j.name == "categoryid") {
                                j.value = c.id
                            } else {
                                j.value = c.id
                            }
                        }
                        j.inject(g)
                    });
                    d.inject(g)
                }
            },
            confirmChoice : function(b, a) {
                var d = $("plugChoose"), c = $("plug_show");
                this.elementTo.store(b, this.choice.retrieve(b));
                this.elementTo.store(a, this.choice.retrieve(a));
                if (this.choice) {
                    this.choice.getElements("._plugC").inject(
                            this.showChoice.getElement(".releBt"), "after")
                }
                if (this.elementTo.retrieve(b) == null
                        && this.elementTo.retrieve(a) == null) {
                    this.showChoice.getLast().show()
                } else {
                    this.showChoice.getLast().hide()
                }
                this.dialog.hide();
                if (Browser.ie6) {
                    document.getElements("select").fade(1)
                }
            },
            reset : function(a) {
                if (a.lang != "") {
                    this.selection(a, true);
                    this.create(a)
                }
                var b = {
                    rel : a.rel,
                    id : a.id,
                    name : a.name,
                    text : a.text,
                    address : a.get("config")
                };
                this.objectRelated(b, true, a.lang)
            }
        });
gewa.util.removeBodyClick = function(b, a, c) {
    b = $(b);
    document.addEvent("click", function(f) {
        var d = $(f.target);
        if (d != b && !b.contains(d) && d != a && !a.contains(d)) {
            document.removeEvent("click", arguments.callee);
            b.hide();
            if (c) {
                c()
            }
        }
    })
};
(function() {
    var b = function(e, c, d, h) {
        var f = e[c];
        var g = [];
        while (f) {
            if (f.nodeType == 1) {
                if (!d || Element.match(f, d)) {
                    break
                } else {
                    g.push(f)
                }
            }
            f = f[c]
        }
        return new Elements(g, {
            ddup : false,
            cash : !h
        })
    };
    var a = function(e, c, f) {
        var d = 0;
        var g = [];
        while (d < f) {
            g.push(e.getElements(c)[d]);
            d++
        }
        return new Elements(g, {
            ddup : false
        })
    };
    Element.implement({
        getAllPreviousUntil : function(c, d) {
            return b(this, "previousSibling", c, d)
        },
        getAllNextUntil : function(c, d) {
            return b(this, "nextSibling", c, d)
        },
        getParentsUntil : function(c, d) {
            return b(this, "parentNode", c, d)
        },
        getElementsByCount : function(c, d) {
            return a(this, c, d)
        }
    })
})();
Fx
        .implement({
            initStyles : function() {
                this.init = {};
                $A(arguments)
                        .each(
                                function(b) {
                                    if (b == "opacity") {
                                        this.init.opacity = this.element
                                                .get("opacity")
                                    } else {
                                        (this.element.getStyle(b).test("px")) ? this.init[b] = this.element
                                                .getStyle(b).toInt()
                                                : this.init[b] = this.element
                                                        .getStyle(b)
                                    }
                                }, this);
                return this
            },
            removeAuto : function() {
                if (!this.init) {
                    this.init = {}
                }
                $A(arguments).each(function(b) {
                    if (this.element.getStyle(b) == "auto") {
                        this.element.setStyle(b, "0px");
                        this.init[b] = 0
                    }
                }, this);
                return this
            },
            setPosition : function() {
                if (this.element.getStyle("position") == "static") {
                    this.element.setStyle("position", "relative")
                }
                return this
            }
        });
Fx.Toggle = new Class(
        {
            Extends : Fx.Tween,
            initialize : function(b, a) {
                this.parent(b, a);
                this.initStyles("height", "width", "opacity");
                this.element.setStyle("overflow", "hidden")
            },
            toggleHeight : function(d, c) {
                var b = this.element.getChildren().getDimensions(), a = this.init.height;
                d = d || 0;
                if (a == d && b.length > 0) {
                    b.each(function(e) {
                        a = e.y + a
                    })
                }
                a = a == "auto" ? d : a;
                (this.element.getStyle("height").toInt() > d) ? this.start(
                        "height", d) : this.start("height", a);
                if (c && typeof (c) == "function") {
                    c()
                }
                return this
            },
            toggleHeightValue : function(a) {
                a = a || 0;
                this.start("height", a);
                return this
            },
            toggleWidth : function() {
                (this.element.getStyle("width").toInt() > 0) ? this.start(
                        "width", 0) : this.start("width", this.init.width);
                return this
            },
            toggleOpacity : function() {
                (this.element.getStyle("opacity").toInt() > 0) ? this.start(
                        "opacity", 0) : this
                        .start("opacity", this.init.opacity);
                return this
            },
            toggleDisplay : function() {
                this.toggleProperty("display", "none", "block");
                return this
            },
            toggleVisibility : function() {
                this.toggleProperty("visibility", "hidden", "visible");
                return this
            },
            toggleStyle : function() {
            },
            toggleProperty : function(b, d, c, a) {
                if ($string(d) && $string(c)) {
                    if (!a) {
                        (this.element.getStyle(b) == d.toLowerCase()) ? this.element
                                .setStyle(b, c)
                                : this.element.setStyle(b, d)
                    } else {
                        (this.element.getStyle(b) == d.toLowerCase()) ? this
                                .start(b, c) : this.start(b, d)
                    }
                } else {
                    if ($int(d) && $int(c)) {
                        if (!a) {
                            (this.element.getStyle(b).toInt() == d) ? this.set(
                                    b, c) : this.set(b, d)
                        } else {
                            (this.element.getStyle(b).toInt() == d) ? this
                                    .start(b, c) : this.start(b, d)
                        }
                    }
                }
                return this
            },
            toggle : function(a) {
                switch (a) {
                case "height":
                    this.toggleHeight();
                    break;
                case "width":
                    this.toggleWidth();
                    break;
                case "opacity":
                    this.toggleOpacity();
                    break;
                case "display":
                    this.toggleDisplay();
                    break;
                case "visibility":
                    this.toggleVisibility();
                    break
                }
                return this
            }
        });
Fx.Grow = new Class(
        {
            Extends : Fx.Morph,
            initialize : function(c, b, a) {
                this.parent(c, b);
                this.values = a || {
                    height : 200,
                    width : 200,
                    fontsize : 10
                };
                this.element.setStyle("overflow", "hidden")
            },
            start : function(b) {
                var b = b || this.values, a = this.element.getDimensions().x, c = this.element
                        .getDimensions().y;
                this
                        .parent({
                            top : (c > 0) ? [
                                    (this.element.getParent().clientHeight - this.values.height) / 2,
                                    this.values.height / 2 ]
                                    : [
                                            this.values.height / 2,
                                            (this.element.getParent().clientHeight - this.values.height) / 2 ],
                            left : (a > 0) ? [
                                    (this.element.getParent().clientWidth - this.values.width) / 2,
                                    this.element.getParent().clientWidth
                                            - this.values.width / 2 ]
                                    : [
                                            this.values.width / 2,
                                            (this.element.getParent().clientWidth - this.values.width) / 2 ],
                            height : (c > 0) ? [ this.values.height, 0 ] : [ 0,
                                    this.values.height ],
                            width : (a > 0) ? [ this.values.width, 0 ] : [ 0,
                                    this.values.width ],
                            opacity : (c > 0 && a > 0) ? [ 1, 0 ] : [ 0, 1 ]
                        })
            }
        });
gewa.util.pagePos = function(b) {
    var a;
    if (b) {
        a = $(b)
    } else {
        var c = gewa.util.getRequestParams("topos");
        a = $(c.trim())
    }
    if (a) {
        $(window).scrollTo(0, a.getPosition().y)
    }
};
gewa.util.getRequestParams = function(b, e) {
    var a = window.location.search || e;
    if (a && a.indexOf(b) > 0) {
        var c = new RegExp("(^|&)" + b + "=([^&]*)(&|$)", "i"), d = a.substr(1)
                .match(c);
        return (d != null) ? d[2] : ""
    } else {
        return ""
    }
};
gewa.util.getUrlParams = function(c) {
    var b = window.location.search || c;
    if (b) {
        array = b.substr(1).split("&");
        var a = {};
        if (array) {
            array.each(function(e) {
                keyValue = e.split("=");
                var d = keyValue[0];
                if ($chk(d)) {
                    a[d] = keyValue[1] ? keyValue[1] : ""
                }
            })
        }
        return a
    } else {
        return {}
    }
};
gewa.util.setInterval = function() {
};
var Icon = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                unit : [ "32", "20" ],
                dir : {
                    xg : "格小拉",
                    jd : "经典"
                },
                icon : new Object(),
                path : GewaraUtil.cdnPath + "img/minFace/",
                isLoad : [ 0, 0 ]
            },
            initialize : function(a) {
                this.setOptions(a);
                this.getIconTitle()
            },
            getIconTitle : function() {
                this.options.icon = [ {
                    "01" : "点头",
                    "02" : "发飙",
                    "03" : "发呆",
                    "04" : "呵呵",
                    "05" : "黑线",
                    "06" : "贱贱",
                    "07" : "惊讶",
                    "08" : "可怜",
                    "09" : "哭",
                    "010" : "酷",
                    "011" : "狂汗",
                    "012" : "喷",
                    "013" : "期待",
                    "014" : "亲亲",
                    "015" : "色眯眯",
                    "016" : "微笑",
                    "017" : "笑",
                    "018" : "笑cry",
                    "019" : "疑问",
                    "020" : "晕"
                }, {
                    "01" : "害羞",
                    "02" : "可爱",
                    "03" : "呵呵",
                    "04" : "花心",
                    "05" : "嘻嘻",
                    "06" : "亲亲",
                    "07" : "噢耶",
                    "08" : "懒得理你",
                    "09" : "抱抱",
                    "010" : "鄙视",
                    "011" : "汗",
                    "012" : "晕",
                    "013" : "泪",
                    "014" : "悲伤",
                    "015" : "闭嘴",
                    "016" : "吃惊",
                    "017" : "酷",
                    "018" : "哈哈",
                    "019" : "困",
                    "020" : "花",
                    "021" : "伤心",
                    "022" : "邮件",
                    "023" : "电话",
                    "024" : "干杯",
                    "025" : "调谢",
                    "026" : "握手",
                    "027" : "good",
                    "028" : "唱歌",
                    "029" : "得意",
                    "030" : "疑问",
                    "031" : "便便",
                    "032" : "呆",
                    "033" : "河蟹",
                    "034" : "囧",
                    "035" : "咖啡",
                    "036" : "礼花",
                    "037" : "礼物",
                    "038" : "篮球",
                    "039" : "骷髅",
                    "040" : "闪电",
                    "041" : "弱",
                    "042" : "怒",
                    "043" : "衰",
                    "044" : "失望",
                    "045" : "生病",
                    "046" : "睡觉",
                    "047" : "太阳",
                    "048" : "下雨",
                    "049" : "心",
                    "050" : "星",
                    "051" : "药",
                    "052" : "月亮",
                    "053" : "钟",
                    "054" : "抓狂",
                    "055" : "足球"
                } ]
            },
            innerHTML : function(h, a) {
                h = $(h);
                a = $(a);
                var d = "", g = "", e = "";
                Object.each(this.options.dir, function(j, i) {
                    g += this.replaceTabs(i, j)
                }.bind(this));
                var c = new Element("div", {
                    html : d,
                    "class" : "dalogIcon uidialog clear",
                    id : "uidialog"
                });
                var f = new Element("ul", {
                    "class" : "dalogIconTags clear",
                    html : g,
                    id : "dalogIconTags"
                }).inject(c);
                for (var b = 0; b < Object.getLength(this.options.dir); b++) {
                    if (b == 0) {
                        e += "<div class='dalogIconBox clear'></div>"
                    } else {
                        e += "<div class='dalogIconBox none clear'></div>"
                    }
                }
                new Element("div", {
                    html : e,
                    "class" : "dalogIconConts clear",
                    id : "dalogIconConts"
                }).inject(f, "after");
                gewa.util.tips(h, c, 422, "icon", "", function() {
                    var j = this;
                    var i = f.getElements("a");
                    i.each(function(l, k) {
                        l.addEvent("click", function() {
                            if (j.options.isLoad[k] === 0) {
                                j.loadImg(k, a)
                            }
                            $("uidialog").getElements(".dalogIconBox")
                                    .addClass("none");
                            $("uidialog").getElements(".dalogIconBox")[k]
                                    .removeClass("none")
                        })
                    });
                    i.addEvent("click", function() {
                        i.each(function(k) {
                            k.getParent("li").removeClass("select")
                        });
                        this.getParent("li").addClass("select")
                    });
                    document.addEvent("click", function(m) {
                        var l = $(m.target), k = gewa.util.container.icon;
                        if (l != k.coreDialog && !k.coreDialog.contains(l)
                                && l != h && !h.contains(l)) {
                            document.removeEvent("click", arguments.callee);
                            k.dispose([ "icon" ], true)
                        }
                    })
                }.bind(this), "", "0");
                this.loadImg(0, a)
            },
            replaceTabs : function(a, b) {
                return "<li class='$2'><a href='javascript:void(0);'>$1</a></li>"
                        .replace(/\$1|\$2/g, function(c) {
                            if (c == "$2") {
                                if (a == "xg") {
                                    return c = "select"
                                } else {
                                    return c = ""
                                }
                            }
                            return c = b
                        }.bind(this))
            },
            loadImg : function(b, a) {
                var d = $("uidialog").getElements(".dalogIconBox")[b];
                var c = "";
                Object.each(this.options.icon[b], function(f, e) {
                    c += this.replaceHTML(e, f, b)
                }.bind(this));
                d.innerHTML = c;
                this.bindEvent(a);
                this.options.isLoad[b] = 1
            },
            replaceHTML : function(b, c, a) {
                return "<a href='' rel='[$3]'><img src='$1' width='$4' height='$4' title='$2'/></a>"
                        .replace(/\$1|\$2|\$3|\$4/g, function(d) {
                            if (d == "$1") {
                                return d = this.options.path
                                        + Object.keys(this.options.dir)[a]
                                        + "/" + b + ".gif"
                            } else {
                                if (d == "$3") {
                                    return d = Object.keys(this.options.dir)[a]
                                            + b
                                } else {
                                    if (d == "$4") {
                                        return d = this.options.unit[a]
                                    } else {
                                        return d = c
                                    }
                                }
                            }
                        }.bind(this))
            },
            bindEvent : function(a) {
                $("dalogIconConts").getElements("a").each(function(c) {
                    if (c.hasEvent("click")) {
                        return
                    }
                    c.addEvent("click", function(b) {
                        b.preventDefault();
                        try {
                            a.focus();
                            if (a.hasEvent("focus") && Browser.ie) {
                                a.fireEvent("focus")
                            }
                            a.value += this.get("rel")
                        } catch (b) {
                        }
                    })
                })
            }
        });
var IconOld = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                icon : new Object(),
                path : GewaraUtil.cdnPath + "/img/minFace/"
            },
            initialize : function(a) {
                this.setOptions(a);
                this.getIconTitle()
            },
            getIconTitle : function() {
                this.options.icon = {
                    "01" : "害羞",
                    "02" : "可爱",
                    "03" : "呵呵",
                    "04" : "花心",
                    "05" : "嘻嘻",
                    "06" : "亲亲",
                    "07" : "噢耶",
                    "08" : "懒得理你",
                    "09" : "抱抱",
                    "010" : "鄙视",
                    "011" : "汗",
                    "012" : "晕",
                    "013" : "泪",
                    "014" : "悲伤",
                    "015" : "闭嘴",
                    "016" : "吃惊",
                    "017" : "酷",
                    "018" : "哈哈",
                    "019" : "困",
                    "020" : "花",
                    "021" : "伤心",
                    "022" : "邮件",
                    "023" : "电话",
                    "024" : "干杯",
                    "025" : "调谢",
                    "026" : "握手",
                    "027" : "good",
                    "028" : "唱歌",
                    "029" : "得意",
                    "030" : "疑问",
                    "031" : "便便",
                    "032" : "呆",
                    "033" : "河蟹",
                    "034" : "囧",
                    "035" : "咖啡",
                    "036" : "礼花",
                    "037" : "礼物",
                    "038" : "篮球",
                    "039" : "骷髅",
                    "040" : "闪电",
                    "041" : "弱",
                    "042" : "怒",
                    "043" : "衰",
                    "044" : "失望",
                    "045" : "生病",
                    "046" : "睡觉",
                    "047" : "太阳",
                    "048" : "下雨",
                    "049" : "心",
                    "050" : "星",
                    "051" : "药",
                    "052" : "月亮",
                    "053" : "钟",
                    "054" : "抓狂",
                    "055" : "足球"
                }
            },
            innerHTML : function(d, a) {
                d = $(d);
                a = $(a);
                var c = "";
                Object.each(this.options.icon, function(f, e) {
                    c += this.replaceHTML(e, f)
                }.bind(this));
                var b = new Element("div", {
                    html : c,
                    "class" : "dalogIcon uidialog clear",
                    id : "uidialog"
                });
                gewa.util.tips(d, b, 396, "icon", "", function() {
                    b.getElements("a").addEvent("click", function(f) {
                        f.preventDefault();
                        try {
                            a.focus();
                            if (a.hasEvent("focus") && Browser.ie) {
                                a.fireEvent("focus")
                            }
                            a.insertAtCursor(this.get("rel"))
                        } catch (f) {
                        }
                    });
                    document.addEvent("click", function(h) {
                        var g = $(h.target), f = gewa.util.container.icon;
                        if (g != f.coreDialog && !f.coreDialog.contains(g)
                                && g != d && !d.contains(g)) {
                            document.removeEvent("click", arguments.callee);
                            f.dispose([ "icon" ], true)
                        }
                    })
                }, "", "0")
            },
            replaceHTML : function(a, b) {
                return "<a href='' rel='[$3]'><img src='$1' width='20' height='20' title='$2'/></a>"
                        .replace(/\$1|\$2|\$3/g, function(c) {
                            if (c == "$1") {
                                return c = this.options.path + a + ".gif"
                            } else {
                                if (c == "$3") {
                                    return c = a
                                } else {
                                    return c = b
                                }
                            }
                        }.bind(this))
            }
        });
gewa.util.makeRelation = function(b, a) {
    checkLogin(true, function() {
        a = $(a);
        GewaraUtil.sendRequest(GewaraUtil.basePath
                + "micro/addMicroAttention.xhtml", {
            memberid : b
        }, function(d) {
            if (d.success) {
                a.hide();
                var c = new Element("span", {
                    text : "|",
                    styles : {
                        background : "#EFEFEF",
                        border : "1px solid #cccccc",
                        display : "inline-block",
                        height : "22px",
                        "line-height" : "22px",
                        padding : "0 8px",
                        "float" : "left"
                    }
                }).inject(a, "before");
                new Element("span", {
                    text : "取消",
                    styles : {
                        color : "#C03B0C",
                        "margin-left" : "5px",
                        cursor : "pointer"
                    }
                }).addEvent("click", function() {
                    gewaUtil.cancelRelation(b, this.getParent(), a)
                }).inject(c);
                new Element("span", {
                    text : "已关注",
                    styles : {
                        color : "#666666",
                        "margin-right" : "5px"
                    }
                }).inject(c, "top")
            } else {
                gewaUtil.alert(d.msg)
            }
        })
    })
};
gewa.util.cancelRelation = function(c, a, b) {
    checkLogin(true, function() {
        if ($(a)) {
            a = $(a)
        }
        GewaraUtil.sendRequest(GewaraUtil.basePath
                + "micro/cancelAttention.xhtml", {
            memberid : c
        }, function(d) {
            if (d.success) {
                gewaUtil.alert("取消成功！", function() {
                    if ($(a)) {
                        a.dispose()
                    }
                    if ($(b)) {
                        $(b).show();
                        $(b).removeClass("none")
                    }
                })
            } else {
                gewaUtil.alert(d.msg)
            }
        }, "get")
    })
};
gewa.util.dialogSingleUpdate = function(c, a, b) {
    c = {
        id : $(c)
    };
    if (c.id.retrieve("iframe") == null) {
        c.html = new Element("div", {
            styles : {
                display : "none"
            }
        }).inject(document.body);
        new Element("iframe", {
            src : "blank.html",
            name : "iframe_async_upload",
            id : "iframe_async_upload",
            styles : {
                display : "none"
            }
        }).inject(c.html);
        c.form = new Element("form", {
            action : GewaraUtil.basePath + "common/uploadPicture.xhtml",
            method : "post",
            target : "iframe_async_upload"
        }).inject(c.html);
        if (Browser.ie6 || Browser.ie7) {
            c.form.setAttribute("encoding", "multipart/form-data")
        } else {
            c.form.setAttribute("enctype", "multipart/form-data")
        }
        new Element("input", {
            type : "hidden",
            name : "callback",
            value : b
        }).inject(c.form);
        new Element(
                "input",
                {
                    type : "hidden",
                    name : "callbackUrl",
                    value : GewaraUtil.basePath
                            + "common/afterUploadPicture.xhtml?uploadtag=micro&callbackf=gewa.util.updateCallback"
                }).inject(c.form);
        c.t = new Element("div", {
            text : "支持上传 .gif .jpg .png 格式图片，最大不超过2M。",
            styles : {
                width : "100%",
                height : "22px",
                overflow : "hidden",
                "text-indent" : "10px",
                color : "#999"
            }
        }).inject(c.form);
        c.pic = new Element("div", {
            id : "async_upload",
            styles : {
                width : "290px",
                height : "120px",
                overflow : "hidden",
                position : "relative",
                "margin-top" : "10px"
            }
        }).inject(c.form);
        c.tl = new Element("div", {
            id : "async_upload_file",
            styles : {
                width : "76px",
                height : "24px",
                overflow : "hidden",
                position : "absolute",
                left : "95px",
                top : "49px"
            }
        }).inject(c.pic);
        c.input = new Element("input", {
            type : "file",
            name : "headlogo",
            id : "file_async_upload",
            styles : {
                background : "transparent",
                outline : "none",
                "hide-focus" : "expression(this.hideFocus=true)",
                opacity : 0,
                position : "absolute",
                "z-index" : 2,
                left : "-60px",
                width : 150,
                top : "-2px",
                "font-size" : "20px",
                visibility : "visible",
                cursor : "pointer"
            }
        }).addEvent("change", function() {
            checkLogin(true, function() {
                c.form.submit()
            })
        }).inject(c.tl);
        new Element("span", {
            text : "上传图片"
        }).inject(new Element("a", {
            "for" : "file_async_upload",
            "class" : "button minBt redBt",
            href : "javascript:void(0);"
        }).addEvent("click", function() {
            c.input.fireEvent("focus")
        }).inject(c.tl), "top");
        c.id.store("iframe", c.html)
    } else {
        c.html = c.id.retrieve("iframe")
    }
    gewa.util.tips(c.id, c.html, 340, "dailogpic", "", function() {
        document.addEvent("click", function(g) {
            var f = $(g.target), d = gewa.util.container.dailogpic;
            if (f != d.coreDialog && !d.coreDialog.contains(f) && f != c.id
                    && !c.id.contains(f)) {
                document.removeEvent("click", arguments.callee);
                d.dispose([ "dailogpic" ], true)
            }
        })
    }, "", "0")
};
gewa.util.updateCallback = function(b) {
    var a = {};
    a.img = Asset.image(GewaraUtil.cdnPath + b.picpath, {
        onLoad : function() {
            if (this.width > 290 || this.height > 120) {
                rateWidth = this.width / 290;
                rateHeight = this.height / 120;
                if (rateWidth > rateHeight) {
                    this.width = 290;
                    this.height = this.height / rateWidth
                } else {
                    this.width = this.width / rateHeight;
                    this.height = 120
                }
                this.setStyles({
                    "margin-left" : (290 - this.width) / 2,
                    "margin-top" : (120 - this.height) / 2
                })
            }
        }
    }).inject("async_upload");
    $("async_upload_file").hide();
    a.input = new Element("input", {
        type : "hidden",
        name : "bodypic",
        id : "bodypic",
        value : b.picpath
    }).inject(b.callback, "before");
    $(b.callback).value = $(b.callback).value + "分享图片";
    if ($("wala_defV")) {
        $("wala_defV").hide()
    }
    new Element("span", {
        text : "删除图片",
        styles : {
            display : "inline-block",
            background : "#fff",
            "border-radius" : "3px",
            height : "20px",
            "line-height" : "20px",
            padding : "0 6px",
            cursor : "pointer",
            color : "#DD9966",
            border : "1px solid #ddd",
            position : "absolute",
            "*line-height" : "21px",
            left : 115,
            top : 49,
            "z-index" : 1
        }
    }).addEvent(
            "click",
            function() {
                GewaraUtil.sendRequest(GewaraUtil.basePath
                        + "micro/delMicroBlogPic.xhtml", {
                    picpath : b.picpath
                }, function(c) {
                    this.dispose();
                    a.img.dispose();
                    a.input.dispose();
                    $("async_upload_file").show()
                }.bind(this))
            }).inject("async_upload")
};
gewa.util.replay = new Class(
        {
            Implements : [ Options, Events ],
            options : {},
            initialize : function(a) {
                this.setOptions(a)
            },
            createMessageDialog : function(i) {
                if (i.id.contains("img")) {
                    i.id = i.id.substring(3);
                    c = "回复";
                    var e = this
                } else {
                    var e = this, b = (i._this.get("lang") == "f") ? true
                            : false, c = b ? "转发" : "回复"
                }
                if (i.element.retrieve("dom") == null) {
                    var a = new Element("dl", {
                        "class" : "isFirstNode"
                    }).inject(i.element, "top");
                    new Element(
                            "img",
                            {
                                "class" : "picmin",
                                src : (GewaraUtil.cdnPath + (GewaraUtil.member.headUrl != "" ? GewaraUtil.member.headUrl
                                        : "cw30h30/img/default_head.png")),
                                width : 30,
                                height : 30
                            }).inject(new Element("span", {
                        "class" : "picmin"
                    })).inject(new Element("dt").inject(a));
                    var g = new Element("dd").inject(a);
                    i.atmemberid = new Element("input", {
                        type : "hidden",
                        name : "atmemberid"
                    }).inject(g, "top");
                    i.replyid = new Element("input", {
                        type : "hidden",
                        name : "replyid"
                    }).inject(g, "top");
                    var h = new Date().getTime() + i.id;
                    i.replayBt = new Element("button", {
                        html : c,
                        "class" : "button"
                    })
                            .addEvent(
                                    "click",
                                    function() {
                                        if (i.textarea.value.trim() == "") {
                                            i.textarea.highlight("#ffcc99",
                                                    "#fff")
                                        } else {
                                            e.datas = this.getParent("dd")
                                                    .toQueryString()
                                                    .parseQueryString();
                                            e.datas.commentid = i.id;
                                            e.criteDom = new Element("div")
                                                    .hide().inject(a, "after");
                                            checkLogin(
                                                    true,
                                                    function() {
                                                        GewaraUtil
                                                                .sendLoad(
                                                                        e.criteDom,
                                                                        GewaraUtil.basePath
                                                                                + "activity/ajax/sns/oldReplyComment.xhtml",
                                                                        e.datas,
                                                                        function(
                                                                                j) {
                                                                            if (j.success) {
                                                                                i.textarea.value = "";
                                                                                e.criteDom
                                                                                        .reveal()
                                                                            } else {
                                                                                gewaUtil
                                                                                        .alert(j.json.msg)
                                                                            }
                                                                        })
                                                    })
                                        }
                                    }).inject(g);
                    var f = new Element("div", {
                        "class" : "review"
                    }).inject(g);
                    new Element("input", {
                        type : "checkbox",
                        checked : b ? "checked" : "",
                        name : "isMicro",
                        id : h,
                        styles : {
                            "margin-right" : "3px"
                        }
                    }).addEvent("click", function() {
                        if (b) {
                            this.checked = b
                        }
                    }).inject(new Element("label", {
                        html : "转发到我的哇啦",
                        "class" : "left ui_wala_rzf",
                        "for" : h
                    }).inject(f), "top");
                    var d = new Element("b", {
                        html : 140,
                        styles : {
                            "float" : "right",
                            "font-family" : "Constantia,Georgia",
                            "font-size" : "14px",
                            color : "#CC3300",
                            "margin-right" : "70px"
                        }
                    }).inject(f);
                    i.textarea = new Element("textarea", {
                        name : "body",
                        id : "body",
                        root : "text",
                        alt : "请输入" + c + "内容...",
                        styles : {
                            color : "#666"
                        }
                    }).inject(g, "top");
                    i.textarea.addEvent("focus", function() {
                        this.addClass("onFocus")
                    });
                    i.textarea.addEvent("blur", function() {
                        this.removeClass("onFocus")
                    });
                    i.textarea.addEvent("keyup", function() {
                        this.value = this.value.replace(/\n/g, "");
                        if (this.value.length > 0) {
                            i.replayBt.addClass("onButton")
                        } else {
                            i.replayBt.removeClass("onButton")
                        }
                        if (140 - this.value.length >= 0) {
                            e.values = this.value;
                            d.innerHTML = 140 - this.value.length;
                            this.setStyle("height", this.getScrollSize().y)
                        } else {
                            this.value = e.values;
                            d.innerHTML = 0;
                            this.highlight("#ffcc99", "#fff")
                        }
                    }).inject(g, "top");
                    if (i._this.hasProperty("form")) {
                        i.textarea.set("value",
                                (i._this.hasProperty("form")) ? i._this
                                        .get("form") : "");
                        if (i._this.hasProperty("data-atmid")) {
                            i.atmemberid
                                    .set("value", i._this.get("data-atmid"))
                        }
                        if (i._this.hasProperty("data-replyid")) {
                            i.replyid.set("value", i._this.get("data-replyid"))
                        }
                    }
                    new Element("em", {
                        "class" : "dmore"
                    }).inject(new Element("span", {
                        "class" : "iserm",
                        text : "表情"
                    }).addEvent("click", function() {
                        i.icon.innerHTML(this, i.textarea)
                    }).inject(f, "top"));
                    if (typeof i.callback == "function") {
                        i.callback.run()
                    }
                    i.element.store("dom", a)
                } else {
                    i.node = i.element.retrieve("dom");
                    i.button = i.node.getElement("button");
                    i.textArea = i.node.getElement("textArea");
                    i.checkbox = i.node.getElement("input[type=checkbox]");
                    i.atmemberid = i.node.getElement("input[name=atmemberid]");
                    i.replyid = i.node.getElement("input[name=replyid]");
                    i.checkbox.removeEvents("click");
                    i.button.checked = "";
                    i.button.set("text", "回复");
                    i.checkbox.checked = "";
                    if (i._this.hasProperty("form")) {
                        i.textArea.value = i._this.get("form");
                        if (i._this.hasProperty("data-atmid")) {
                            i.atmemberid.value = i._this.get("data-atmid")
                        }
                        if (i._this.hasProperty("data-replyid")) {
                            i.replyid.value = i._this.get("data-replyid")
                        }
                    } else {
                        i.textArea.set("alt", "请输入回复的内容...")
                    }
                    if (typeof i.callback == "function") {
                        i.callback.run()
                    }
                }
            }
        });
function logout() {
    var a = GewaraUtil.basePath + "cas/logout.xhtml?ptn=smp";
    new Request({
        url : a,
        method : "get",
        onComplete : function() {
            gewaUtil.alert("成功退出！", refreshPage)
        }
    }).send()
}
gewa.util.messageInit = function() {
    var a = {};
    a.tgs = document.getElements("*[lang=r],*[lang=f]");
    if (a.tgs.length > 0) {
        if (!$("walasCss")) {
            Asset.css(GewaraUtil.cdnPath + "css/readwala.css", {
                id : "walasCss"
            })
        }
        a.replay = new gewa.util.replay();
        a.icon = new Icon();
        a.tgs.addEvent("click", function(b) {
            b.preventDefault();
            a.url = this.get("rel");
            a.element = this.getParent("*[data=isvalid] div[root=replay]");
            a.id = this.id;
            a._this = this;
            a.replay.createMessageDialog(a)
        })
    }
};
var RatingGroup = new Class(
        {
            initialize : function(d, f, a, e, b, h) {
                this.groupId = d;
                this.itemList = $(d).getElements("li");
                this.rating = f.toInt();
                this.tag = a;
                this.relatedid = e;
                this.desc = $(this.groupId + "Desc");
                this.group_id = $(this.groupId + "Point");
                this.marks = $defined(b) && typeof (b) == "object" ? b : false;
                this.callback = h || "";
                var c = 1;
                var g = this;
                this.starList = [];
                if (this.rating == 0 && this.marks) {
                    this.marks[this.groupId] = 0
                }
                this.itemList.each(function(j, i) {
                    if (i % 2 != 0) {
                        j.set("class", "no")
                    }
                    if (i < this.rating) {
                        if (i % 2 != 0) {
                            j.set("class", "on")
                        } else {
                            j.set("class", "half")
                        }
                        if (this.desc) {
                            this.desc.set("text", j.get("lang"))
                        }
                        if (this.group_id) {
                            this.group_id.set("text", j.id + ".0")
                        }
                        if (this.marks) {
                            this.marks[this.groupId] = j.id
                        }
                    }
                    this.starList[i] = j.get("class");
                    j.addEvents({
                        mouseover : function() {
                            this.showStatus(j.id);
                            if (this.desc) {
                                this.desc.set("text", j.get("lang"))
                            }
                            if (this.group_id) {
                                this.group_id.set("text", j.id + ".0")
                            }
                        }.bind(this),
                        mouseout : function() {
                            this.resetStatus()
                        }.bind(this),
                        click : function() {
                            this.vote(j)
                        }.bind(this)
                    });
                    c++
                }.bind(this))
            },
            resetStatus : function() {
                var a = 1;
                this.itemList
                        .each(function(c, b) {
                            if (b >= 10) {
                                return
                            }
                            if (this.starList[b] == "on"
                                    || this.starList[b] == "half") {
                                if (this.desc) {
                                    this.desc.set("text", c.get("lang"))
                                }
                                if (this.group_id) {
                                    this.group_id.set("text", c.id + ".0")
                                }
                                if (b % 2 != 0) {
                                    c.set("class", "on")
                                } else {
                                    c.set("class", "half")
                                }
                            } else {
                                if (c.hasClass("on") || b % 2 != 0) {
                                    c.set("class", "no")
                                } else {
                                    c.set("class", "")
                                }
                            }
                            a++
                        }.bind(this));
                if (!this.itemList.some(function(b) {
                    return (b.hasClass("on") || b.hasClass("half"))
                })) {
                    if ($(this.groupId + "Desc")) {
                        $(this.groupId + "Desc").set("text", "")
                    }
                    if (this.group_id) {
                        this.group_id.set("text", "")
                    }
                }
            },
            showStatus : function(b) {
                var a = 1;
                this.itemList.each(function(d, c) {
                    if (c >= 10) {
                        return
                    }
                    if (a <= b) {
                        if (c % 2 != 0 || d.hasClass("on")) {
                            d.set("class", "on")
                        } else {
                            d.set("class", "half")
                        }
                    } else {
                        if (d.hasClass("on") || c % 2 != 0) {
                            d.set("class", "no")
                        } else {
                            d.set("class", "")
                        }
                    }
                    a++
                }.bind(this))
            },
            vote : function(a) {
                checkLogin(
                        true,
                        function() {
                            var d = this.groupId;
                            var e = this;
                            this.showStatus(a.id);
                            if (this.marks) {
                                this.marks[this.groupId] = a.id;
                                this.rating = a.id;
                                this.itemList.each(function(g, f) {
                                    this.starList[f] = g.get("class")
                                }.bind(this));
                                if (this.callback
                                        && typeof this.callback == "function") {
                                    this.callback()
                                } else {
                                    if (typeof (showMovieMark) == "function"
                                            && this.groupId == "generalmark") {
                                        showMovieMark()
                                    }
                                }
                            } else {
                                var c = GewaraUtil.basePath
                                        + "ma/common/addComment.xhtml", b = {
                                    tag : this.tag,
                                    relatedid : this.relatedid,
                                    marks : d + "=" + a.id
                                };
                                GewaraUtil
                                        .sendRequest(
                                                c,
                                                b,
                                                function(f) {
                                                    if (f.success) {
                                                        this.rating = a.id;
                                                        this.itemList
                                                                .each(function(
                                                                        h, g) {
                                                                    this.starList[g] = h
                                                                            .get("class")
                                                                }.bind(this));
                                                        if (typeof (showMovieMark) == "function"
                                                                && this.groupId == "generalmark") {
                                                            showMovieMark()
                                                        }
                                                    } else {
                                                        gewaUtil.alert(f.msg)
                                                    }
                                                }.bind(this))
                            }
                        }.bind(this))
            },
            fixStar : function(a) {
                this.itemList.each(function(b) {
                    b.removeEvents("mouseover");
                    b.removeEvents("mouseout");
                    b.removeEvents("click")
                })
            }
        });
gewa.util.deleteReComment = function(a) {
    checkLogin(true, function() {
        gewaUtil.confirm("确认要删除吗?", function() {
            var c = GewaraUtil.basePath
                    + "activity/ajax/sns/deleteMicroReComment.xhtml?r="
                    + GewaraUtil.rtime();
            var b = {
                id : a
            };
            GewaraUtil.sendRequest(c, b, function(d) {
                if (d.success) {
                    document.getElement("div[id=" + a + "]").set("dissolve", {
                        duration : "long",
                        onComplete : function() {
                            this.dispose()
                        }.bind(document.getElement("div[id=" + a + "]"))
                    }).dissolve()
                } else {
                    gewaUtil.alert(d.json.msg)
                }
            })
        })
    })
};
gewa.util.affix = function(b) {
    var a = function(c) {
        var g = c.getPosition().y, i = c.getStyle("position"), f = c
                .getDimensions().y, e = $$(".index_wrap")[0], d = $$(".index_wrap")[0]
                .getDimensions().y, h = $$(".index_wrap")[0].getPosition().y;
        window.addEvent("scroll", function() {
            var j = this.getScroll().y;
            if (j > g) {
                if (window.XMLHttpRequest) {
                    c.setStyles({
                        position : "fixed",
                        top : 0
                    })
                } else {
                    c.setStyles({
                        top : j
                    })
                }
            } else {
                c.setStyles({
                    position : "absolute",
                    top : g
                })
            }
            if (e) {
                if (f + Document.getScrollTop() >= d + h) {
                    e.setStyles({
                        position : "relative"
                    });
                    c.setStyles({
                        position : "absolute",
                        bottom : "0",
                        top : ""
                    })
                } else {
                    e.setStyles({
                        position : "static"
                    })
                }
            }
        })
    };
    if ($type(b) === "array") {
        return b.each(function(c) {
            a(c)
        })
    } else {
        if ($type(b) === "element") {
            a(b)
        }
    }
};
var GewaOverText = new Class(
        {
            Implements : [ Options, Events, Class.Occlude ],
            Binds : [ "reposition", "assert", "focus", "hide", "keypress" ],
            options : {
                element : "label",
                labelClass : "overTxtLabel",
                positionOptions : {
                    position : "upperLeft",
                    edge : "upperLeft",
                    offset : {
                        x : 4,
                        y : 2
                    }
                },
                poll : false,
                pollInterval : 250,
                wrap : false
            },
            property : "GewaOverText",
            initialize : function(b, a) {
                b = this.element = document.id(b);
                if (this.occlude()) {
                    return this.occluded
                }
                this.setOptions(a);
                this.attach(b);
                GewaOverText.instances.push(this);
                if (this.options.poll) {
                    this.poll()
                }
            },
            toElement : function() {
                return this.element
            },
            attach : function() {
                var b = this.element, a = this.options, c = a.textOverride
                        || b.get("alt") || b.get("title");
                if (!c) {
                    return this
                }
                var d = this.text = Element(a.element, {
                    "class" : a.labelClass,
                    styles : {
                        lineHeight : this.element.getDimensions().y,
                        height : this.element.getDimensions().y,
                        position : "absolute",
                        cursor : "text",
                        color : "#ccc",
                        width : this.element.getDimensions().x,
                        "text-indent" : 6
                    },
                    html : c,
                    events : {
                        click : function() {
                            this.element.focus()
                        }.bind(this)
                    }
                }).inject(b, "after");
                if (a.element == "label") {
                    if (!b.get("id")) {
                        b.set("id", "input_" + String.uniqueID())
                    }
                    d.set("for", b.get("id"))
                }
                if (a.wrap) {
                    this.textHolder = new Element("div.overTxtWrapper", {
                        styles : {
                            lineHeight : "normal",
                            position : "relative"
                        }
                    }).grab(d).inject(b, "before")
                }
                return this.enable()
            },
            destroy : function() {
                this.element.eliminate(this.property);
                this.disable();
                if (this.text) {
                    this.text.destroy()
                }
                if (this.textHolder) {
                    this.textHolder.destroy()
                }
                return this
            },
            disable : function() {
                this.element.removeEvents({
                    focus : this.focus,
                    blur : this.assert,
                    keypress : this.keypress,
                    keyup : this.assert,
                    change : this.assert
                });
                window.removeEvent("resize", this.reposition);
                this.hide(true, true);
                return this
            },
            enable : function() {
                this.element.addEvents({
                    focus : this.focus,
                    blur : this.assert,
                    keypress : this.keypress,
                    keyup : this.assert,
                    change : this.assert
                });
                window.addEvent("resize", this.reposition);
                this.reposition();
                return this
            },
            wrap : function() {
                if (this.options.element == "label") {
                    if (!this.element.get("id")) {
                        this.element.set("id", "input_" + String.uniqueID())
                    }
                    this.text.set("for", this.element.get("id"))
                }
            },
            startPolling : function() {
                this.pollingPaused = false;
                return this.poll()
            },
            poll : function(a) {
                if (this.poller && !a) {
                    return this
                }
                if (a) {
                    clearInterval(this.poller)
                } else {
                    this.poller = (function() {
                        if (!this.pollingPaused) {
                            this.assert(true)
                        }
                    }).periodical(this.options.pollInterval, this)
                }
                return this
            },
            stopPolling : function() {
                this.pollingPaused = true;
                return this.poll(true)
            },
            focus : function() {
                this.text.setStyle("color", "#dedede");
                return this
            },
            hide : function(c, a) {
                if (this.text
                        && (this.text.isDisplayed() && (!this.element
                                .get("disabled") || a))) {
                    this.text.hide();
                    this.fireEvent("textHide", [ this.text, this.element ]);
                    this.pollingPaused = true;
                    if (!c) {
                        try {
                            this.element.fireEvent("focus");
                            this.element.focus()
                        } catch (b) {
                        }
                    }
                }
                return this
            },
            show : function() {
                if (this.text && !this.text.isDisplayed()) {
                    this.text.show();
                    this.reposition();
                    this.fireEvent("textShow", [ this.text, this.element ]);
                    this.pollingPaused = false
                }
                return this
            },
            test : function() {
                return !this.element.get("value")
            },
            keypress : function() {
                return this["hide"](true)
            },
            assert : function(a) {
                this.text.setStyle("color", "#ddd");
                return this[this.test() ? "show" : "hide"](a)
            },
            reposition : function() {
                this.assert(true);
                if (!this.element.isVisible()) {
                    return this.stopPolling().hide()
                }
                if (this.text && this.test()) {
                    this.text.position(Object.merge({
                        position : "upperLeft",
                        edge : "upperLeft",
                        offset : {
                            x : 0,
                            y : 1
                        }
                    }, {
                        relativeTo : this.element
                    }))
                }
                return this
            }
        });
GewaOverText.instances = [];
Object.append(GewaOverText, {
    each : function(a) {
        return GewaOverText.instances.each(function(c, b) {
            if (c.element && c.text) {
                a.call(GewaOverText, c, b)
            }
        })
    },
    update : function() {
        return GewaOverText.each(function(a) {
            return a.reposition()
        })
    },
    hideAll : function() {
        return GewaOverText.each(function(a) {
            return a.hide(true, true)
        })
    },
    showAll : function() {
        return GewaOverText.each(function(a) {
            return a.show()
        })
    }
});
gewa.util.textOver = function(b, a) {
    try {
        if ($$("input" + b + " ,textarea" + b).length > 0) {
            b = $$("input" + b + " ,textarea" + b)
        } else {
            return
        }
        b.each(function(f, e) {
            var d = f.getPosition();
            if (f.hasProperty("alt") && d.x > 0 && d.y > 0 && f.value == "") {
                (function() {
                    if (f.retrieve("label") == null) {
                        var g = new GewaOverText(f);
                        f.store("label", g)
                    } else {
                        GewaOverText.update()
                    }
                }).delay(500)
            }
        })
    } catch (c) {
    }
};
gewa.util.fixIE = function() {
    if (Browser.ie && 9 > parseInt(Browser.version, 10)) {
        var b = function() {
            1300 > (document.documentElement.clientWidth || document.body.clientWidth) ? document.body
                    .addClass("wrap_mini")
                    : document.body.removeClass("wrap_mini")
        };
        b()
    }
};
var amTips = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                position : "right",
                fixed : false,
                center : true,
                content : "title",
                html : false,
                isHover : false,
                balloon : true,
                arrowSize : 16,
                arrowOffset : 12,
                distance : 8,
                motion : 6,
                motionOnShow : true,
                motionOnHide : true,
                showOn : "mouseenter",
                hideOn : "mouseleave",
                showDelay : 0,
                hideDelay : 0,
                callback : $empty,
                className : "plugs_tips",
                borderColor : "#ffa463",
                bgColor : "#ffffe1",
                color : "#333",
                width : "auto",
                offset : {
                    x : 0,
                    y : 0
                },
                automove : false,
                ispointer : true,
                delay : 3000,
                isFly : false,
                fx : {
                    duration : "short"
                },
                mouseBandCallback : "",
                ajax : false
            },
            initialize : function(c, a) {
                this.setOptions(a);
                var b = this;
                this.boundShow = (function(d) {
                    this.store("isHover", true);
                    if (b.options.isHover) {
                        (function() {
                            if (this.retrieve("isHover")) {
                                b.doAttach.apply(this, [ b ])
                            } else {
                                return
                            }
                        }.bind(this)).delay(600)
                    } else {
                        b.doAttach.apply(this, [ b ])
                    }
                });
                this.boundHide = (function() {
                    this.store("isHover", null);
                    this.store("isLeave", null);
                    if (b.options.automove) {
                        (function() {
                            if (this.retrieve("isLeave") == null) {
                                b.hide(this)
                            }
                        }.bind(this)).delay(400)
                    } else {
                        b.hide(this)
                    }
                });
                if (![ "top", "right", "bottom", "left", "inside" ]
                        .contains(this.options.position)) {
                    this.options.position = "top"
                }
                if (c) {
                    this.attach(c)
                }
                return this
            },
            doAttach : function(a) {
                if (!a.options.ajax) {
                    this.store("isLeave", true);
                    if (a.options.mouseBandCallback) {
                        if (typeof a.options.mouseBandCallback == "function") {
                            a.options.mouseBandCallback.run({
                                _this : a
                            })
                        }
                    } else {
                        a.show(this)
                    }
                } else {
                    if (typeof a.options.mouseBandCallback == "function") {
                        a.options.mouseBandCallback.apply(a, [ this ])
                    }
                }
            },
            attach : function(b) {
                var a = this;
                $$(b).each(function(c) {
                    if (!a.options.isFly) {
                        if (c.retrieve("hasevent")) {
                            return
                        }
                        evs = {};
                        evs[a.options.showOn] = a.boundShow;
                        evs[a.options.hideOn] = a.boundHide;
                        c.addEvents(evs);
                        c.store("hasevent", true)
                    }
                    c.store("object", a)
                });
                return this
            },
            detach : function(c) {
                var b = this;
                var a = {};
                a[this.options.showOn] = this.boundShow;
                a[this.options.hideOn] = this.boundHide;
                $$(c).each(function(d) {
                    b.hide(d);
                    d.removeEvents(a);
                    d.eliminate("hasevent");
                    d.eliminate("object")
                });
                return this
            },
            show : function(b) {
                var a = b.retrieve("_tips");
                if (a) {
                    if (a.getStyle("opacity") == 1) {
                        clearTimeout(a.retrieve("timeout"));
                        return this
                    }
                }
                var c = this._create(b);
                if (c == null) {
                    return this
                }
                b.store("_tips", c);
                this._animate(c, "in");
                b.store("visible", true);
                this.fireEvent("show", [ c, b ]);
                return this
            },
            hide : function(a) {
                var b = a.retrieve("_tips");
                if (!b) {
                    return this
                }
                this._animate(b, "out");
                a.store("visible", false);
                this.fireEvent("hide", [ b, a ]);
                return this
            },
            toggle : function(a) {
                if (a.retrieve("visible")) {
                    return this.hide(a)
                } else {
                    return this.show(a)
                }
            },
            _create : function(d) {
                var e = this.options;
                e.c = e.content;
                e.opos = e.position;
                if (e.c == "title") {
                    e.c = "plugs-tips";
                    if (!d.get("plugs-tips")) {
                        d.setProperty("plugs-tips", d.get("title"))
                    }
                    d.set("title", "")
                }
                if (!e.center) {
                    if (e.position == "left" || e.position == "right") {
                        e.offset.y = -e.arrowSize / 2
                    } else {
                        e.offset.x = -e.arrowSize / 2
                    }
                }
                e.cnt = (typeof (e.c) == "string" ? d.get(e.c) : e.c(d));
                e.cwr = new Element("div").addClass(e.className).setStyles({
                    margin : 0,
                    border : "1px solid " + e.borderColor,
                    padding : "1px 10px 3px",
                    background : e.bgColor,
                    "border-radius" : "3px",
                    "z-index" : 999,
                    color : e.color
                });
                if (!e.isFly) {
                    var c = {};
                    c[e.showOn] = function() {
                        d.store("isLeave", true)
                    };
                    c[e.hideOn] = this.boundHide.bind(d);
                    e.cwr.addEvents(c)
                }
                e.tip = new Element("div")
                        .addClass(e.className + "-wrapper")
                        .setStyles(
                                {
                                    margin : 0,
                                    padding : 0,
                                    "z-index" : e.cwr.getStyle("z-index") > 100 ? e.cwr
                                            .getStyle("z-index")
                                            : 100
                                }).adopt(e.cwr);
                e.tip.setStyle("max-width", e.width);
                if (e.cnt) {
                    if ($(e.cnt)) {
                        if (e.adoptdom) {
                            e.cwr.adopt(e.cnt)
                        } else {
                            e.cwr.set("html",
                                    typeof (e.cnt) == "string" ? e.cnt : e.cnt
                                            .get("html"))
                        }
                    } else {
                        e.cwr.set("html", e.cnt)
                    }
                } else {
                    return null
                }
                e.tip.setStyles({
                    position : (e.fixed ? "fixed" : "absolute"),
                    opacity : 0,
                    top : 0,
                    left : 0
                }).inject(document.body);
                if (e.balloon && e.ispointer ? (!e.isFly) : (!e.ispointer)) {
                    var a = new Element("div").addClass(
                            e.className + "-triangle").setStyles({
                        margin : 0,
                        padding : 0
                    });
                    e.tipborder = new Element("i", {
                        html : "◆",
                        styles : {
                            "z-index" : 1,
                            color : e.borderColor
                        }
                    }).inject(a);
                    e.tipbg = new Element("i", {
                        html : "◆",
                        styles : {
                            "z-index" : 9,
                            color : e.bgColor
                        }
                    }).inject(a);
                    e.ccstyle = {
                        width : e.arrowSize,
                        height : e.arrowSize,
                        display : "block",
                        "font-family" : "SimSun",
                        position : "absolute",
                        "font-style" : "normal"
                    };
                    e.tipborder.setStyles(e.ccstyle);
                    e.tipbg.setStyles(e.ccstyle);
                    e.borderStyle = {};
                    var b = {
                        width : e.arrowSize,
                        height : e.arrowSize,
                        "line-height" : e.arrowSize,
                        overflow : "hidden",
                        position : "absolute",
                        "z-index" : 3,
                        "font-size" : "1.2em"
                    };
                    switch (e.opos) {
                    case "inside":
                    case "top":
                        b.top = "auto";
                        b.bottom = -8;
                        e.borderStyle.bottom = -1;
                        break;
                    case "right":
                        e.borderStyle.left = -1;
                        b.left = 10;
                        e.cwr.setStyle("margin-left", e.arrowSize);
                        break;
                    case "bottom":
                        b.top = -7;
                        if (Browser.ie6) {
                            b.top = -5
                        }
                        if (Browser.ie6) {
                            b.bottom = -10
                        }
                        e.borderStyle.top = -1;
                        break;
                    case "left":
                        b.right = 8;
                        e.borderStyle.right = -1;
                        if (Browser.ie7) {
                            b.position = "absolute";
                            b.right = 8
                        } else {
                            b["float"] = "right"
                        }
                        e.cwr.setStyle("margin-right", e.arrowSize);
                        break
                    }
                    switch (e.opos) {
                    case "inside":
                    case "top":
                    case "bottom":
                        b["margin-left"] = e.center ? ((e.tip.getSize().x / 2 > e.arrowSize) ? (e.tip
                                .getSize().x / 2 + e.arrowSize / 2)
                                - e.arrowSize
                                : 5)
                                : e.arrowOffset;
                        break;
                    case "left":
                    case "right":
                        b["margin-top"] = e.center ? ((e.tip.getSize().y / 2 > e.arrowSize) ? (e.tip
                                .getSize().y / 2 + e.arrowSize / 2)
                                - e.arrowSize
                                : 5)
                                : e.arrowOffset;
                        break
                    }
                    e.tipborder.setStyles(e.borderStyle);
                    a.setStyles(b).inject(
                            e.tip,
                            (e.opos == "top" || e.opos == "inside") ? "bottom"
                                    : "top")
                }
                e.tipSz = e.tip.getSize();
                e.trgC = d.getCoordinates();
                e.offsetOption = ("function" === typeof (e.offset) ? Object
                        .merge({
                            x : 0,
                            y : 0
                        }, e.offset(d)) : e.offset);
                e.pos = {
                    x : e.trgC.left + e.offsetOption.x,
                    y : e.trgC.top + e.offsetOption.y
                };
                if (e.opos == "inside") {
                    e.tip.setStyles({
                        width : e.tip.getStyle("width"),
                        height : e.tip.getStyle("height")
                    });
                    d.setStyle("position", "relative").adopt(e.tip);
                    e.pos = {
                        x : e.offset.x,
                        y : e.offset.y
                    }
                } else {
                    switch (e.opos) {
                    case "top":
                        e.pos.y -= e.tipSz.y + e.distance;
                        break;
                    case "right":
                        e.pos.x += e.trgC.width + e.distance;
                        break;
                    case "bottom":
                        e.pos.y += e.trgC.height + e.distance;
                        break;
                    case "left":
                        e.pos.x -= e.tipSz.x + e.distance;
                        break
                    }
                }
                if (e.center) {
                    switch (e.opos) {
                    case "top":
                    case "bottom":
                        e.pos.x += (e.trgC.width / 2 - e.tipSz.x / 2);
                        break;
                    case "left":
                    case "right":
                        e.pos.y += (e.trgC.height / 2 - e.tipSz.y / 2);
                        break;
                    case "inside":
                        e.pos.x += (e.trgC.width / 2 - e.tipSz.x / 2);
                        e.pos.y += (e.trgC.height / 2 - e.tipSz.y / 2);
                        break
                    }
                }
                e.pos.y = (d == $(document.body)) ? 0 : e.pos.y;
                e.pos.x = (d == $(document.body)) ? e.pos.x * 2 : e.pos.x;
                if (d.match("body")) {
                    e.pos.y = 15;
                    e.pos.x = e.pos.x - $(document.body).getSize().x / 2
                            + e.tip.getSize().x / 2;
                    e.tip.getElement("div").setStyle("padding", "1px 50px")
                }
                d.store("tips", e.tip);
                e.tip.set("morph", e.fx).store("position", e.pos);
                e.tip.setStyles({
                    top : e.pos.y,
                    left : e.pos.x
                });
                return e.tip
            },
            _animate : function(a, b) {
                var c = this;
                clearTimeout(a.retrieve("timeout"));
                a.store("timeout", (function(e) {
                    var g = this.options, f = (b == "in");
                    var d = {
                        opacity : f ? 1 : 0
                    };
                    if ((g.motionOnShow && f) || (g.motionOnHide && !f)) {
                        var h = e.retrieve("position");
                        if (!h) {
                            return
                        }
                        switch (g.position) {
                        case "inside":
                        case "top":
                            d.top = f ? [ h.y - g.motion, h.y ] : h.y
                                    - g.motion;
                            break;
                        case "right":
                            d.left = f ? [ h.x + g.motion, h.x ] : h.x
                                    + g.motion;
                            break;
                        case "bottom":
                            d.top = f ? [ h.y + g.motion, h.y ] : h.y
                                    + g.motion;
                            break;
                        case "left":
                            d.left = f ? [ h.x - g.motion, h.x ] : h.x
                                    - g.motion;
                            break
                        }
                    }
                    e.morph(d);
                    if (!f) {
                        e.get("morph").chain(function() {
                            c.options.callback.call(c);
                            this.dispose()
                        }.bind(e))
                    }
                }).delay((b == "in") ? this.options.showDelay
                        : this.options.hideDelay, this, a));
                return this
            }
        });
Element.implement({
    amTips : function(a) {
        new amTips(this, a);
        return this
    },
    amTipsShow : function(a) {
        var c = this;
        var b = this.retrieve("object");
        if (b) {
            b.show(this)
        }
        if (b.options.isFly || a) {
            this.amTipsHide.delay(b.options.delay, [ this ])
        }
        return this
    },
    amTipsHide : function() {
        var b = this;
        if (typeof this == "object") {
            b = this[0]
        } else {
            b = this
        }
        var a = b.retrieve("object");
        if (a) {
            a.hide(b)
        }
        return b
    },
    amTipsToggle : function() {
        var a = this.retrieve("object");
        if (a) {
            a.toggle(this)
        }
        return this
    }
});
Element.Properties.amTips = {
    get : function() {
        return this.retrieve("object")
    }
};
function setDefault(b, a) {
    if (!a) {
        a = "请输入搜索关键词"
    }
    if (b.value.trim() == "") {
        b.value = a
    }
}
function clearDefault(a) {
    if (a.value.indexOf("输入") >= 0) {
        a.value = ""
    }
}
function search(c, a) {
    if (c == "countycode") {
        $("indexareacode").value = ""
    }
    $(c).value = a;
    try {
        clearlist = namefield.split(",");
        clearlist.each(function(d) {
            if (c != d && c != "order") {
                $(d).value = ""
            }
        })
    } catch (b) {
    }
    $("searchForm").submit()
}
function addMoreButton(c, b) {
    if ($(c).getScrollSize().y > $(c).getSize().y) {
        var a = new Element("a", {
            id : b,
            "class" : "left morebutton",
            href : "javascript:void(0)",
            styles : {
                color : "#FF6200"
            },
            html : "更多>>",
            events : {
                click : function() {
                    var d = $(c).getSize().y + 60;
                    if (d > $(c).getScrollSize().y) {
                        d = $(c).getScrollSize().y;
                        $(b).dispose()
                    }
                    $(c).setStyle("height", d)
                }
            }
        });
        a.inject(c, "after")
    } else {
        $(c).setStyle("height", "auto")
    }
}
function getFxScroll(b) {
    var a = new Fx.Scroll(b, {
        duration : "long",
        transition : Fx.Transitions.Sine.easeOut
    });
    return a
}
function goLeft(d, a) {
    var b = getFxScroll(d), c = $(d).getScroll();
    if (!a) {
        a = 200
    }
    b.start(c.x - a, c.y)
}
function goRight(d, a) {
    var b = getFxScroll(d), c = $(d).getScroll();
    if (!a) {
        a = 200
    }
    b.start(c.x + a, c.y)
}
function toLeft(a) {
    scroll = getFxScroll(a);
    scroll.toLeft()
}
function toRight(a) {
    scroll = getFxScroll(a);
    scroll.toRight()
}
function goTop(d, a) {
    var b = getFxScroll(d), c = $(d).getScroll();
    if (!a) {
        a = 200
    }
    b.start(c.x, c.y - a)
}
function goBottom(d, a) {
    var b = getFxScroll(d), c = $(d).getScroll();
    if (!a) {
        a = 200
    }
    b.start(c.x, c.y + a)
}
function removeCurrent(a) {
    $(a).removeClass("cur")
}
function setCurrent(a, c, b) {
    $(a).addClass("cur");
    $("newspic").src = b
}
var RemoteErrorCode = {
    notLogon : 1,
    noRights : 2,
    repeated : 3,
    notFound : 4,
    blacklist : 6
};
function xiangqu(e, b, c, d) {
    if (!c) {
        c = "xiangqu"
    }
    var a = true;
    if (d) {
        a = false
    }
    checkLogin(a, function() {
        GewaraUtil.sendRequest(GewaraUtil.basePath
                + "ajax/common/addXiangqu.xhtml", {
            relatedid : e,
            tag : b
        }, function(f) {
            if (f.success) {
                $(c).innerHTML = f.retval;
                gewaUtil.alert("添加成功！")
            } else {
                gewaUtil.alert(f.msg)
            }
        }, "get")
    })
}
function quguo(c, a, b) {
    if (!b) {
        b = "quguo"
    }
    checkLogin(true, function() {
        GewaraUtil.sendRequest(GewaraUtil.basePath
                + "ajax/common/addQuguo.xhtml", {
            relatedid : c,
            tag : a
        }, function(d) {
            if (d.success) {
                $(b).innerHTML = d.retval;
                if (a == "movie" || a == "cinema" || a == "sport"
                        || a == "theatre" || a == "drama") {
                    showMovieMark()
                } else {
                    gewaUtil.alert("操作成功！")
                }
            } else {
                gewaUtil.alert(d.msg)
            }
        }, "get")
    })
}
function collection(c, a, b) {
    if (!b) {
        b = "collection"
    }
    checkLogin(true, function() {
        var e = GewaraUtil.basePath + "ma/common/addCollection.xhtml?v"
                + GewaraUtil.rtime, d = {
            tag : a,
            relatedid : c
        };
        GewaraUtil.sendRequest(e, d,
                function(f) {
                    if (f.success) {
                        if (a == "movie" || a == "cinema" || a == "theatre"
                                || a == "drama" || a == "sport"
                                || a == "sportservice") {
                            $("nCollect").addClass("none");
                            $("hCollect").removeClass("none");
                            gewaUtil.alert("成功添加至“哇啦”我感兴趣！")
                        } else {
                            if ($("nCollect")) {
                                $("nCollect").addClass("none")
                            }
                            if ($("hCollect")) {
                                $("hCollect").removeClass("none")
                            }
                            if (a == "activity") {
                                gewaUtil.alert("成功添加至“哇啦”我感兴趣！")
                            } else {
                                gewaUtil.alert("操作成功！")
                            }
                        }
                        if ($(b)) {
                            $(b).set("html", f.retval)
                        }
                    } else {
                        gewaUtil.alert(f.msg)
                    }
                }, "get")
    })
}
function addDiaryFlower(b, c, a) {
    checkLogin(true, function() {
        GewaraUtil.mask(a);
        var e = GewaraUtil.basePath + "ma/blog/addDiaryFlower.xhtml";
        var d = {
            diaryId : b,
            math : Math.random()
        };
        GewaraUtil.sendRequest(e, d, function(f) {
            GewaraUtil.unmask();
            if (f.success) {
                $(c).innerHTML = f.retval
            } else {
                if (RemoteErrorCode.notLogon == f.errcode) {
                    gewaUtil.alert("您没有登录！")
                } else {
                    if (RemoteErrorCode.repeated == f.errcode) {
                        gewaUtil.alert("12小时以内只能推荐一次")
                    } else {
                        if (f.msg) {
                            gewaUtil.alert(f.msg)
                        } else {
                            gewaUtil.alert("推荐失败！")
                        }
                    }
                }
            }
        }, "get")
    })
}
function addCommentFlower(b, a) {
    checkLogin(true, function() {
        GewaraUtil.mask(a);
        GewaraUtil.sendRequest(GewaraUtil.basePath
                + "activity/ajax/sns/memberSupport.xhtml", {
            type : "comment",
            relatedid : b
        }, function(c) {
            GewaraUtil.unmask();
            if (c.success) {
                $(a).innerHTML = $(a).innerHTML.toInt() + 1
            } else {
                gewaUtil.alert(c.msg)
            }
        }, "get")
    })
}
function toggleMoreContent(c, b, a, d) {
    if (!d) {
        d = 150
    }
    if ($(c).get("text").length > d) {
        $(c).set("text", $(b).get("text").substring(0, d));
        $(a).set("text", ">>")
    } else {
        $(c).set("text", $(b).get("text"));
        $(a).set("text", "<<")
    }
}
function toggleMore() {
    if ($("mark").getStyle("height") == "20px") {
        $("mark").setStyle("height", "auto");
        $("markmore").removeClass("mb1");
        $("markmore").addClass("mb2")
    } else {
        $("mark").setStyle("height", "20px");
        $("markmore").removeClass("mb2");
        $("markmore").addClass("mb1")
    }
}
function setLoading(a) {
    $(a).innerHTML = "<div style='width:75px; height:70px; margin:auto; padding: 2px;'><img style='border:none; ' src='"
            + GewaraUtil.basePath
            + "component/images/extanim32.gif' title='正在加载数据...' /></div>"
}
var StaticRating = new Class({
    initialize : function(d, c) {
        this.itemList = $(d).getElements("li");
        c = c * 1;
        var b = 1;
        var e = this;
        var a = "";
        this.itemList.each(function(g, f) {
            if (c >= b * 10) {
                if (f % 2 != 0) {
                    a = "on"
                } else {
                    a = "half"
                }
            } else {
                if (c + 9 > b * 10 && f % 2 == 0) {
                    a = "half"
                } else {
                    if (f % 2 != 0) {
                        a = "no"
                    } else {
                        a = ""
                    }
                }
            }
            g.set("class", a);
            b++
        })
    }
});
var StaticRating2 = new Class({
    initialize : function(d, c) {
        this.itemList = $(d).getElements("li");
        c = c * 1;
        var b = 1;
        var e = this;
        var a = "";
        this.itemList.each(function(f) {
            if (c >= b) {
                a = "on"
            } else {
                a = "no"
            }
            f.removeClass("no");
            f.addClass(a);
            b++
        })
    }
});
var SliderGroup = new Class({
    current : 0,
    contentList : [],
    navList : [],
    activeClass : "active",
    hideClass : "none",
    eventName : "mouseover",
    pauseSlide : false,
    show : function(a) {
        if (this.current == a.idx) {
            return
        }
        this.navList[this.current].removeClass(this.activeClass);
        this.contentList[this.current].addClass(this.hideClass);
        this.current = a.idx;
        this.navList[a.idx].addClass(this.activeClass);
        this.contentList[a.idx].removeClass(this.hideClass);
        this.contentList[a.idx].get("tween", {
            property : "opacity",
            duration : 2000
        }).start(0, 1)
    },
    showNext : function() {
        if (this.pauseSlide) {
            return
        }
        var a = (this.current + 1) % 7;
        this.show(this.navList[a])
    },
    initialize : function(b, i, d, g, a, h, c) {
        this.contentList = b;
        this.navList = i;
        if (a) {
            this.activeClass = a
        }
        if (h) {
            this.hideClass = h
        }
        if (c) {
            this.eventName = c
        }
        if (g) {
            this.autoSlide = g
        }
        if (d) {
            this.current = d
        }
        this.navList[this.current].addClass(this.activeClass);
        this.contentList[this.current].removeClass(this.hideClass);
        var f = this;
        var e = 0;
        i.each(function(j) {
            j.idx = e;
            if (e != f.current) {
                f.contentList[e].set("opacity", 0)
            }
            j.addEvent(f.eventName, function() {
                f.show(j);
                f.pauseSlide = true
            });
            j.addEvent("mouseout", function() {
                f.pauseSlide = false
            });
            e++
        })
    }
});
var Fxex = new Class({
    options : {},
    initialize : function(a) {
        this.id = a.id;
        var c = this;
        var b = new Fx.Tween(c.id, {
            wait : false,
            duration : 600,
            transition : Fx.Transitions.Circ.easeInOut
        });
        $(c.id).addEvents({
            mouseover : function() {
                b.start("height", 20, 60)
            },
            mouseout : function() {
                b.start("height", 60, 20)
            }
        })
    }
});
function getActivityList(a, b) {
    $(a).empty();
    new Element("option", {
        value : "",
        text : "请选择活动"
    }).inject($(a));
    GewaraUtil.sendRequest(GewaraUtil.basePath
            + "ajax/common/getMyActivityList.xhtml", {}, function(c) {
        if (c.success) {
            c.activityList.each(function(d) {
                new Element("option", {
                    value : d.id,
                    text : d.title.substr(0, 20)
                }).inject($(a))
            })
        } else {
            gewaUtil.alert(c.msg)
        }
        if (b) {
            b()
        }
    })
};
var URI = new Class(
        {
            Implements : Options,
            options : {},
            regex : /^(?:(\w+):)?(?:\/\/(?:(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)?(\.\.?$|(?:[^?#\/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
            parts : [ "scheme", "user", "password", "host", "port",
                    "directory", "file", "query", "fragment" ],
            schemes : {
                http : 80,
                https : 443,
                ftp : 21,
                rtsp : 554,
                mms : 1755,
                file : 0
            },
            initialize : function(b, a) {
                this.setOptions(a);
                var c = this.options.base || URI.base;
                if (!b) {
                    b = c
                }
                if (b && b.parsed) {
                    this.parsed = $unlink(b.parsed)
                } else {
                    this.set("value", b.href || b.toString(), c ? new URI(c)
                            : false)
                }
            },
            parse : function(c, b) {
                var a = c.match(this.regex);
                if (!a) {
                    return false
                }
                a.shift();
                return this.merge(a.associate(this.parts), b)
            },
            merge : function(b, a) {
                if ((!b || !b.scheme) && (!a || !a.scheme)) {
                    return false
                }
                if (a) {
                    this.parts.every(function(c) {
                        if (b[c]) {
                            return false
                        }
                        b[c] = a[c] || "";
                        return true
                    })
                }
                b.port = b.port || this.schemes[b.scheme.toLowerCase()];
                b.directory = b.directory ? this.parseDirectory(b.directory,
                        a ? a.directory : "") : "/";
                return b
            },
            parseDirectory : function(b, c) {
                b = (b.substr(0, 1) == "/" ? "" : (c || "/")) + b;
                if (!b.test(URI.regs.directoryDot)) {
                    return b
                }
                var a = [];
                b.replace(URI.regs.endSlash, "").split("/").each(function(d) {
                    if (d == ".." && a.length > 0) {
                        a.pop()
                    } else {
                        if (d != ".") {
                            a.push(d)
                        }
                    }
                });
                return a.join("/") + "/"
            },
            combine : function(a) {
                return a.value
                        || a.scheme
                        + "://"
                        + (a.user ? a.user
                                + (a.password ? ":" + a.password : "") + "@"
                                : "")
                        + (a.host || "")
                        + (a.port && a.port != this.schemes[a.scheme] ? ":"
                                + a.port : "") + (a.directory || "/")
                        + (a.file || "") + (a.query ? "?" + a.query : "")
                        + (a.fragment ? "#" + a.fragment : "")
            },
            set : function(b, d, c) {
                if (b == "value") {
                    var a = d.match(URI.regs.scheme);
                    if (a) {
                        a = a[1]
                    }
                    if (a && !$defined(this.schemes[a.toLowerCase()])) {
                        this.parsed = {
                            scheme : a,
                            value : d
                        }
                    } else {
                        this.parsed = this.parse(d, (c || this).parsed)
                                || (a ? {
                                    scheme : a,
                                    value : d
                                } : {
                                    value : d
                                })
                    }
                } else {
                    if (b == "data") {
                        this.setData(d)
                    } else {
                        this.parsed[b] = d
                    }
                }
                return this
            },
            get : function(a, b) {
                switch (a) {
                case "value":
                    return this.combine(this.parsed, b ? b.parsed : false);
                case "data":
                    return this.getData()
                }
                return this.parsed[a] || ""
            },
            go : function() {
                document.location.href = this.toString()
            },
            toURI : function() {
                return this
            },
            getData : function(c, b) {
                var a = this.get(b || "query");
                if (!$chk(a)) {
                    return c ? null : {}
                }
                var d = a.parseQueryString();
                return c ? d[c] : d
            },
            setData : function(a, c, b) {
                if (typeof a == "string") {
                    a = this.getData();
                    a[arguments[0]] = arguments[1]
                } else {
                    if (c) {
                        a = $merge(this.getData(), a)
                    }
                }
                return this.set(b || "query", Hash.toQueryString(a))
            },
            clearData : function(a) {
                return this.set(a || "query", "")
            }
        });
URI.prototype.toString = URI.prototype.valueOf = function() {
    return this.get("value")
};
URI.regs = {
    endSlash : /\/$/,
    scheme : /^(\w+):/,
    directoryDot : /\.\/|\.$/
};
URI.base = new URI(document.getElements("base[href]", true).getLast(), {
    base : document.location
});
String.implement({
    toURI : function(a) {
        return new URI(this, a)
    }
});
var PagesNavigation = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                navigationBlocks : [ "page-navigation" ],
                quantityBlocks : [ "page-navigation-quantity-top",
                        "page-navigation-quantity-bottom" ],
                possbileQuantities : [ 5, 10, 25, 50 ],
                defaultQuantity : 3,
                currentQuantityCSSClass : "page-navigation-quantity-current",
                otherQuantityCSSClass : "page-navigation-quantity-other",
                currentLinkCSSClass : "page-navigation-current",
                otherLinkCSSClass : "page-navigation-other",
                disabledLinkCSSClass : "page-navigation-disabled",
                prevLinkTitle : "&laquo上一页",
                nextLinkTitle : "下一页&raquo",
                prevLinkCSSClass : "page-navigation-prev",
                nextLinkCSSClass : "page-navigation-next",
                scrollElement : false,
                currentURL : true,
                onShowPage : $empty()
            },
            blocks : [],
            blocksPerPage : 10,
            pagesCount : 1,
            currentPage : 1,
            quantityBlocks : [],
            navigationBlocks : [],
            initialize : function(b, a) {
                this.blocks = $$(b);
                this.setOptions(a);
                this.blocksPerPage = this.options.defaultQuantity
            },
            build : function() {
                this.parseURL();
                this.calculatePagesCount();
                if (this.pagesCount > 1) {
                    this.installPagesNavigation();
                    this.installQuantityNavigatoion()
                }
                this.showPage()
            },
            parseURL : function() {
                if (this.options.currentURL) {
                    var a = new URI();
                    if (a.get("fragment")) {
                        var c = this.blocksPerPage;
                        var b = a.get("fragment").split("/");
                        b.each(function(d) {
                            var e = d.split("=");
                            if (e.length == 2) {
                                switch (e[0]) {
                                case "quatity":
                                    c = 3;
                                    break;
                                case "page":
                                    this.currentPage = e[1].toInt();
                                    break
                                }
                            }
                        }.bind(this));
                        if (this.options.possbileQuantities.contains(c)) {
                            this.setBlocksPerPage(c)
                        }
                    }
                }
            },
            calculatePagesCount : function() {
                var a = (this.blocks.length / this.blocksPerPage);
                this.pagesCount = (a > a.round()) ? a.round() + 1 : a.round()
            },
            installPagesNavigation : function() {
                this.options.navigationBlocks.each(function(b) {
                    var a = document.id(b);
                    if (a) {
                        this.navigationBlocks.include(a)
                    }
                }.bind(this));
                this.navigationBlocks.each(function(a) {
                    a.empty();
                    if (this.pagesCount > 1) {
                        this.buildPagesNavigationPrevLink(a);
                        if (this.pagesCount > 1) {
                            var b = 1;
                            while (b <= this.pagesCount) {
                                this.buildPagesNavigationLink(b, a);
                                b++
                            }
                        }
                        this.buildPagesNavigationNextLink(a)
                    }
                }.bind(this))
            },
            buildPagesNavigationPrevLink : function(b) {
                var a = new Element("a", {
                    html : this.options.prevLinkTitle,
                    href : "#",
                    "class" : this.options.prevLinkCSSClass
                }).inject(b);
                a.addEvent("click", function(c) {
                    c.stop();
                    if (this.currentPage == 1) {
                        return false
                    }
                    this.currentPage--;
                    this.showPage();
                    this.scrollToTop(c)
                }.bind(this))
            },
            buildPagesNavigationLink : function(c, b) {
                var a = new Element(
                        "a",
                        {
                            html : c,
                            href : "#",
                            "class" : (c == this.currentPage) ? this.options.currentLinkCSSClass
                                    : this.options.otherLinkCSSClass
                        }).inject(b);
                a.store("page", c);
                a.addEvent("click", function(d) {
                    d.stop();
                    this.currentPage = a.retrieve("page");
                    this.showPage();
                    this.scrollToTop(d)
                }.bind(this))
            },
            buildPagesNavigationNextLink : function(b) {
                var a = new Element("a", {
                    html : this.options.nextLinkTitle,
                    href : "#",
                    "class" : this.options.nextLinkCSSClass
                }).inject(b);
                a.addEvent("click", function(c) {
                    c.stop();
                    if (this.currentPage == this.pagesCount) {
                        return false
                    }
                    this.currentPage++;
                    this.showPage();
                    this.scrollToTop(c)
                }.bind(this))
            },
            installQuantityNavigatoion : function() {
                this.options.quantityBlocks.each(function(b) {
                    var a = document.id(b);
                    if (a) {
                        this.quantityBlocks.include(a)
                    }
                }.bind(this));
                this.quantityBlocks
                        .each(function(a) {
                            a.empty();
                            this.options.possbileQuantities
                                    .each(function(c) {
                                        if ($type(c) == "number") {
                                            var b = new Element(
                                                    "a",
                                                    {
                                                        href : "#",
                                                        html : c,
                                                        "class" : (c == this.blocksPerPage) ? this.options.currentQuantityCSSClass
                                                                : this.options.otherQuantityCSSClass
                                                    }).inject(a);
                                            b.store("quantity", c);
                                            b.addEvent("click", function(d) {
                                                d.stop();
                                                this.setBlocksPerPage(c)
                                            }.bind(this))
                                        }
                                    }.bind(this))
                        }.bind(this))
            },
            setBlocksPerPage : function(c) {
                var a = this.options.otherQuantityCSSClass;
                var b = this.options.currentQuantityCSSClass;
                this.quantityBlocks.each(function(d) {
                    d.getElements("a." + a).extend(d.getElements("a." + b))
                            .each(function(e) {
                                e.removeClass(a);
                                e.removeClass(b);
                                if (e.retrieve("quantity") == c) {
                                    e.addClass(b)
                                } else {
                                    e.addClass(a)
                                }
                            })
                }.bind(this));
                this.blocksPerPage = c;
                this.calculatePagesCount();
                if (this.currentPage > this.pagesCount) {
                    this.currentPage = this.pagesCount
                }
                this.installPagesNavigation();
                this.showPage()
            },
            showPage : function() {
                var f = this.options.currentLinkCSSClass;
                var c = this.options.otherLinkCSSClass;
                var b = this.options.disabledLinkCSSClass;
                this.navigationBlocks
                        .each(function(j) {
                            if (this.pagesCount > 1) {
                                j
                                        .getElements("a." + c)
                                        .extend(j.getElements("a." + f))
                                        .each(
                                                function(l) {
                                                    l.removeClass(c);
                                                    l.removeClass(f);
                                                    if (l.retrieve("page") == this.currentPage) {
                                                        l.addClass(f)
                                                    } else {
                                                        l.addClass(c)
                                                    }
                                                }.bind(this))
                            }
                            if (this.pagesCount > 1) {
                                var k = j.getElement("a."
                                        + this.options.prevLinkCSSClass);
                                var i = j.getElement("a."
                                        + this.options.nextLinkCSSClass);
                                k.removeClass(b);
                                i.removeClass(b);
                                if (this.currentPage == 1) {
                                    k.addClass(b)
                                }
                                if (this.currentPage == this.pagesCount) {
                                    i.addClass(b)
                                }
                            }
                        }.bind(this));
                var g = (this.currentPage - 1) * this.blocksPerPage;
                var h = this.currentPage * this.blocksPerPage;
                var e = [];
                var a = (this.blocks[0]) ? this.blocks[0].get("tag") : false;
                var d = (a == "tr" && !Browser.Engine.trident) ? "table-row"
                        : "block";
                this.blocks.each(function(j, i) {
                    if (i >= g && i < h) {
                        j.setStyle("display", d);
                        e.include(j)
                    } else {
                        j.setStyle("display", "none")
                    }
                });
                this.updateCurrentURI();
                this.fireEvent("pageShow", [ e ])
            },
            updateCurrentURI : function() {
                if (this.options.currentURL != false) {
                    var a = new URI();
                    a.set("fragment", "page=" + this.currentPage + "/quatity="
                            + this.blocksPerPage);
                    window.location = a.toString()
                }
            },
            scrollToTop : function(a) {
                new Fx.Scroll(window)
                        .toElement((this.options.scrollElement) ? this.options.scrollElement
                                : this.blocks[0])
            }
        });
var Slimbox;
(function() {
    var X = 0, Y, S, ac, J, I, P, Z, R, U = new Image(), T = new Image(), E, N, O, W, F, C, V, D, ab;
    window.addEvent("domready", function() {
        $(document.body).adopt($$([ E = new Element("div", {
            id : "lbOverlay"
        }).addEvent("click", Q), N = new Element("div", {
            id : "lbCenter"
        }), C = new Element("div", {
            id : "lbBottomContainer"
        }) ]).setStyle("display", "none"));
        O = new Element("div", {
            id : "lbImage"
        }).injectInside(N).adopt(W = new Element("a", {
            id : "lbPrevLink",
            href : "#"
        }).addEvent("click", aa), F = new Element("a", {
            id : "lbNextLink",
            href : "#"
        }).addEvent("click", K));
        V = new Element("div", {
            id : "lbBottom"
        }).injectInside(C).adopt(new Element("a", {
            id : "lbCloseLink",
            href : "#"
        }).addEvent("click", Q), D = new Element("div", {
            id : "lbCaption"
        }), ab = new Element("div", {
            id : "lbNumber"
        }), new Element("div", {
            styles : {
                clear : "both"
            }
        }));
        Z = {
            overlay : new Fx.Tween(E, {
                property : "opacity",
                duration : 500
            }).set(0),
            image : new Fx.Tween(O, {
                property : "opacity",
                duration : 500,
                onComplete : ad
            }),
            bottom : new Fx.Tween(V, {
                property : "margin-top",
                duration : 400
            })
        }
    });
    Slimbox = {
        open : function(a, b, c) {
            Y = $extend({
                loop : false,
                overlayOpacity : 0.8,
                resizeDuration : 400,
                resizeTransition : false,
                initialWidth : 250,
                initialHeight : 250,
                animateCaption : true,
                showCounter : true,
                counterText : "第{x}张，共{y}张"
            }, c || {});
            if (typeof a == "string") {
                a = [ [ a, b ] ];
                b = 0
            }
            S = a;
            Y.loop = Y.loop && (S.length > 1);
            M();
            L(true);
            P = window.getScrollTop() + (window.getHeight() / 15);
            Z.resize = new Fx.Morph(N, $extend({
                duration : Y.resizeDuration,
                onComplete : ad
            }, Y.resizeTransition ? {
                transition : Y.resizeTransition
            } : {}));
            N.setStyles({
                top : P,
                width : Y.initialWidth,
                height : Y.initialHeight,
                marginLeft : -(Y.initialWidth / 2),
                display : ""
            });
            Z.overlay.start(Y.overlayOpacity);
            X = 1;
            return H(b)
        }
    };
    Element.implement({
        slimbox : function(b, a) {
            $$(this).slimbox(b, a);
            return this
        }
    });
    Elements.implement({
        slimbox : function(d, a, b) {
            a = a || function(e) {
                return [ e.href, e.title ]
            };
            b = b || function() {
                return true
            };
            var c = this;
            c.removeEvents("click").addEvent("click", function() {
                var e = c.filter(b, this);
                return Slimbox.open(e.map(a), e.indexOf(this), d)
            });
            return c
        }
    });
    function M() {
        E.setStyles({
            top : window.getScrollTop(),
            height : window.getHeight()
        })
    }
    function L(b) {
        [ "object", Browser.Engine.trident ? "select" : "embed" ]
                .forEach(function(c) {
                    Array.forEach(document.getElementsByTagName(c),
                            function(d) {
                                if (b) {
                                    d._slimbox = d.style.visibility
                                }
                                d.style.visibility = b ? "hidden" : d._slimbox
                            })
                });
        E.style.display = b ? "" : "none";
        var a = b ? "addEvent" : "removeEvent";
        window[a]("scroll", M)[a]("resize", M);
        document[a]("keydown", G)
    }
    function G(a) {
        switch (a.code) {
        case 27:
        case 88:
        case 67:
            Q();
            break;
        case 37:
        case 80:
            aa();
            break;
        case 39:
        case 78:
            K()
        }
        return false
    }
    function aa() {
        return H(J)
    }
    function K() {
        return H(I)
    }
    function H(a) {
        if ((X == 1) && (a >= 0)) {
            X = 2;
            ac = a;
            J = ((ac || !Y.loop) ? ac : S.length) - 1;
            I = ac + 1;
            if (I == S.length) {
                I = Y.loop ? 0 : -1
            }
            $$(W, F, O, C).setStyle("display", "none");
            Z.bottom.cancel().set(0);
            Z.image.set(0);
            N.className = "lbLoading";
            R = new Image();
            R.onload = ad;
            R.src = S[a][0]
        }
        return false
    }
    function ad() {
        switch (X++) {
        case 2:
            N.className = "";
            O.setStyles({
                backgroundImage : "url(" + S[ac][0] + ")",
                display : ""
            });
            $$(O, V).setStyle("width", R.width);
            $$(O, W, F).setStyle("height", R.height);
            D.set("html", S[ac][1] || "");
            ab.set("html", (Y.showCounter && (S.length > 1)) ? Y.counterText
                    .replace(/{x}/, ac + 1).replace(/{y}/, S.length) : "");
            if (J >= 0) {
                U.src = S[J][0]
            }
            if (I >= 0) {
                T.src = S[I][0]
            }
            if (N.clientHeight != O.offsetHeight) {
                Z.resize.start({
                    height : O.offsetHeight
                });
                break
            }
            X++;
        case 3:
            if (N.clientWidth != O.offsetWidth) {
                Z.resize.start({
                    width : O.offsetWidth,
                    marginLeft : -O.offsetWidth / 2
                });
                break
            }
            X++;
        case 4:
            C.setStyles({
                top : P + N.clientHeight,
                marginLeft : N.style.marginLeft,
                visibility : "hidden",
                display : ""
            });
            Z.image.start(1);
            break;
        case 5:
            if (J >= 0) {
                W.style.display = ""
            }
            if (I >= 0) {
                F.style.display = ""
            }
            if (Y.animateCaption) {
                Z.bottom.set(-V.offsetHeight).start(0)
            }
            C.style.visibility = "";
            X = 1
        }
    }
    function Q() {
        if (X) {
            X = 0;
            R.onload = $empty;
            for ( var a in Z) {
                Z[a].cancel()
            }
            $$(N, C).setStyle("display", "none");
            Z.overlay.chain(L).start(0)
        }
        return false
    }
})();
Slimbox.scanPage = function(b) {
    if (b) {
        var c = new Element("div").setStyle("display", "none").set("id",
                "_hidDV").inject(document.body);
        GewaraUtil
                .sendLoad(
                        "_hidDV",
                        gewara.util.basePath + "showSlimbox.xhtml",
                        b,
                        function(d) {
                            var g = $(document.body)
                                    .getElements("a")
                                    .filter(
                                            function(h) {
                                                return h.rel
                                                        && h.rel
                                                                .test(/^lightbox/i)
                                                        && h
                                                                .getParent("div[id!=_hidDV]")
                                            });
                            var f = $("_hidDV").getElements("a");
                            $each(f, function(h) {
                                if (g.get("href").contains(h.get("href"))) {
                                    h.set("show", "false")
                                }
                            });
                            var e = $(document.body).getElements("a").filter(
                                    function(h) {
                                        return h.rel
                                                && h.rel.test(/^lightbox/i)
                                                && (h.get("show") != "false")
                                    });
                            $$(e)
                                    .slimbox(
                                            {},
                                            null,
                                            function(h) {
                                                return (this == h)
                                                        || ((this.rel.length > 8) && (this.rel == h.rel))
                                            })
                        })
    } else {
        var a = $(document.body).getElements("a").filter(function(d) {
            return d.rel && d.rel.test(/^lightbox/i)
        });
        $$(a).slimbox(
                {},
                null,
                function(d) {
                    return (this == d)
                            || ((this.rel.length > 8) && (this.rel == d.rel))
                })
    }
};
var ScrollSpy = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                container : window,
                max : 0,
                min : 0,
                loop : 0,
                mode : "vertical"
            },
            initialize : function(a) {
                this.setOptions(a);
                this.container = document.id(this.options.container);
                this.enters = this.leaves = 0;
                this.max = this.options.max;
                this.inside = false;
                this.addListener()
            },
            addListener : function() {
                this.container
                        .addEvent(
                                "scroll",
                                function(c) {
                                    if (this.options.loop < 4) {
                                        var a = this.container.getScroll(), b = a[this.options.mode == "vertical" ? "y"
                                                : "x"];
                                        if (b >= this.options.min
                                                && (this.max == 0 || b <= this.max)) {
                                            if (!this.inside) {
                                                this.inside = true;
                                                this.enters++;
                                                this.fireEvent("enter", [ a,
                                                        this.enters, c ])
                                            }
                                            this.fireEvent("tick", [ a,
                                                    this.inside, this.enters,
                                                    this.leaves, c ])
                                        } else {
                                            if (this.inside) {
                                                this.inside = false;
                                                this.leaves++;
                                                this.fireEvent("leave", [ a,
                                                        this.leaves, c ])
                                            }
                                        }
                                        this.fireEvent("scroll", [ a,
                                                this.inside, this.enters,
                                                this.leaves, c ]);
                                        this.options.loop++
                                    }
                                }.bind(this))
            }
        });
var CountDown = new Class({
    Implements : [ Options, Events ],
    options : {
        element : "countdown",
        start : 10,
        finish : 0,
        loop : false,
        onComplete : $empty,
        duration : 1000
    },
    initialize : function(a) {
        this.setOptions(a)
    },
    start : function() {
        this.anim()
    },
    anim : function() {
        if (this.options.loop) {
            this.options.start--
        }
        this.options.element.set("text", this.options.start);
        var a = new Fx.Tween(this.options.element, {
            duration : this.options.duration,
            link : "ignore",
            onComplete : function() {
                if (this.options.start >= this.options.finish
                        && this.options.loop) {
                    this.anim()
                } else {
                    this.fireEvent("complete")
                }
            }.bind(this)
        }).start("font-size", this.options.startFont, this.options.endFont)
    }
});
var tableLayer = new Class({
    Implements : [ Options, Events ],
    options : {},
    initialize : function(c) {
        this.setOptions(c);
        this.options.table = new Element("table", {
            cellspacing : "0",
            cellpadding : "0",
            border : "0",
            width : "100%"
        }).addClass("tableLayer");
        var b = new Element("tbody").inject(this.options.table);
        var d = new Element("tr").inject(b);
        new Element("td").addClass("t_l").inject(d);
        new Element("td").addClass("t_c").inject(d);
        new Element("td").addClass("t_r").inject(d);
        var e = new Element("tr").inject(b);
        new Element("td").addClass("m_l").inject(e);
        this.options.content = new Element("td").addClass("m_c").inject(e);
        new Element("td").addClass("m_r").inject(e);
        var a = new Element("tr").inject(b);
        new Element("td").addClass("b_l").inject(a);
        new Element("td").addClass("b_c").inject(a);
        new Element("td").addClass("b_r").inject(a)
    }
});
var tableSpec = new Class({
    Implements : [ Options, Events ],
    options : {},
    initialize : function(c, b, a) {
        this.setOptions(a);
        this.options.parent = $(c);
        this.options.content = $(b).show();
        this.options.content.inject(this.options.parent);
        new Element("div", {
            styles : {
                width : "126px",
                position : "absolute",
                height : this.options.parent.getElements("li").length * 27 + 5,
                top : 0,
                left : 0,
                "z-index" : 1
            }
        }).addClass("headerMenuFloor").inject(this.options.parent);
        new Element("div", {
            styles : {
                width : "126px",
                position : "absolute",
                height : this.options.parent.getElements("li").length * 27 + 5,
                "background-color" : "#fff",
                top : 0,
                left : 0,
                "z-index" : 1,
                opacity : "0.5"
            }
        }).inject(this.options.parent);
        new Element("div", {
            styles : {
                width : "126px",
                position : "absolute",
                height : "300px",
                background : "#aaa",
                opacity : "0.4",
                top : Browser.Engine.trident4 ? "7px" : "5px",
                left : "3px",
                "z-index" : 0
            }
        }).inject(this.options.parent)
    }
});
var request = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                button : ".wlSubmite",
                loadEl : "",
                fx : "",
                del : $empty,
                flag : true
            },
            initialize : function(b, a) {
                this.setOptions(a);
                this.elements = $(b).getElements(this.options.button);
                this.replay = $(b).getElements(".AC");
                this.submite()
            },
            submite : function() {
                var a = this;
                this.elements.addEvent("click", function() {
                    if (a.options.flag) {
                        a.options.flag = false;
                        var b = this.getParent("form"), c = b.toQueryString()
                                .parseQueryString(), d = this.getParent("form")
                                .getElement("textArea");
                        if (c.body.trim().length > 140) {
                            a.showContent(d, "搭话的内容不能超过140个字符！");
                            return
                        }
                        a.createRequest(b.get("action"), c, this, a.elements
                                .indexOf(this))
                    }
                })
            },
            createRequest : function(url, data, el, count) {
                var dom = "", self = this, tarea = el.getParent("form")
                        .getElement("textArea");
                if (tarea.value.trim() != "") {
                    new Request(
                            {
                                url : url,
                                method : "post",
                                link : "cancel",
                                noCache : true,
                                onRequest : function() {
                                    this.load();
                                    this.options.loadEl
                                            .set(
                                                    "html",
                                                    '<img src="'
                                                            + gewara.util.cdnPath
                                                            + 'css/home/home_loading.gif"/>');
                                    this.options.loadEl.show().inject(tarea,
                                            "after")
                                }.bind(this),
                                onSuccess : function(resText) {
                                    if (resText.indexOf('"success":false') != -1) {
                                        eval(resText);
                                        gewaUtil.alert(data.msg)
                                    } else {
                                        dom = new Element("div", {
                                            html : resText,
                                            styles : {
                                                display : "none"
                                            }
                                        }).addClass("newsReplay");
                                        dom
                                                .inject(el.getParent(
                                                        ".ui_abeam").getNext(
                                                        "._replayList"), "top");
                                        new Fx.Reveal(dom, {
                                            duration : 2200
                                        }).reveal();
                                        try {
                                            self.options.del.del(dom)
                                        } catch (e) {
                                        }
                                    }
                                }.bind(this),
                                onFailure : function() {
                                    this.options.loadEl
                                            .set(
                                                    "html",
                                                    '<img src="'
                                                            + gewara.util.imgPath
                                                            + 'css/pub/trash.png"/>数据请求失败啦！');
                                    this.options.loadEl.nix({
                                        duration : 3000
                                    }, true)
                                }.bind(this),
                                onComplete : function(resText) {
                                    this.options.loadEl.dispose();
                                    if (resText.indexOf('"success":false') != -1) {
                                        eval(resText)
                                    } else {
                                        var sp = this.replay[count]
                                                .getElement("span"), val = 0;
                                        if (sp) {
                                            if ($chk(sp.get("text"))) {
                                                if (tarea.value
                                                        .trim()
                                                        .substring(
                                                                tarea.value
                                                                        .trim()
                                                                        .indexOf(
                                                                                ":") + 1) != ""
                                                        || tarea.value.trim()
                                                                .indexOf("回复@") != 0) {
                                                    val = sp.get("text")
                                                            .toInt();
                                                    this.count(val, 1, sp)
                                                }
                                            } else {
                                                val++;
                                                this.replay[count].set("html",
                                                        "搭话(<span>" + val
                                                                + "</span>)")
                                            }
                                        }
                                    }
                                    tarea.focus();
                                    tarea.value = "";
                                    self.options.flag = true
                                }.bind(this)
                            }).send({
                        data : data
                    })
                } else {
                    tarea.focus();
                    this.showContent(tarea, "回复不能为空！")
                }
            },
            showContent : function(b, a) {
                this.load();
                this.options.loadEl.set("html", a);
                this.options.loadEl.show().inject(b, "after");
                this.options.loadEl.nix({
                    duration : 1000,
                    onComplete : function() {
                        this.options.loadEl.dispose();
                        this.options.flag = true
                    }.bind(this)
                }, true)
            },
            load : function() {
                this.options.loadEl = new Element("div", {
                    styles : {
                        position : "absolute",
                        "font-size" : "12px",
                        height : 24,
                        width : "82%",
                        "text-align" : "center",
                        left : "45px",
                        top : "6px",
                        padding : "18px 0",
                        "font-weight" : "bold",
                        background : "#fff"
                    }
                }).hide();
                if (!window.XMLHttpRequest) {
                    this.options.loadEl.setStyle("width", "97%")
                }
            },
            count : function(b, c, a) {
                new CountDown({
                    element : $(a),
                    start : b,
                    duration : 1000,
                    startFont : "20px",
                    endFont : "12px",
                    finish : b + c
                }).start();
                $(a).set("text", b + c)
            }
        });
var AC = new Class(
        {
            Extends : tableLayer,
            options : {
                openFx : {},
                ac : ".AC",
                replay : ".AC_IMG",
                loadElement : ".fLoad",
                submitbox : ".AC_BT",
                font : ".AC_FONT",
                flag : true,
                curtag : true,
                textarea : null,
                curtimes : "",
                pt : "",
                script : $empty,
                textList : [],
                dataList : [],
                del : $empty,
                count : 0
            },
            initialize : function(b, a) {
                this.parent(a);
                this.elements = $(b).getElements(this.options.ac);
                this.loadElements = $(b).getElements(this.options.loadElement);
                this.img = $(b).getElements(".imgLazz");
                this.creatFx();
                this.table();
                this.zoopmParam();
                this.build()
            },
            build : function() {
                this.replayFace()
            },
            getReplay : function(a, b, c) {
                new Request(
                        {
                            url : a.get("lang"),
                            method : "post",
                            onSuccess : function(e) {
                                b.set("html", e);
                                var d = new PagesNavigation(
                                        b.getElements(".ui_abeam"),
                                        {
                                            navigationBlocks : [ "page-navigation-bottom"
                                                    + c ],
                                            defaultQuantity : 5
                                        });
                                d.build();
                                this.options.del.del(b);
                                a.store(a.get("lang"), b.innerHTML)
                            }.bind(this)
                        }).send()
            },
            creatFx : function() {
                var a = this;
                this.elements.each(function(d, b) {
                    var c = this.loadElements[b].getElement("textArea");
                    d.store("widget", new Collapsable(d, this.loadElements[b],
                            a, this.replayHide(c, this.loadElements[b])))
                }.bind(this))
            },
            replay : function() {
                var a = this, b = this.loadElements[this.options.count]
                        .getElement("textArea");
                this.options.curtimes = a.options.count;
                b.addEvents({
                    focus : function() {
                        a.options.pt.fade("out");
                        a.options.flag = false;
                        a.replayShow(this, a.loadElements[a.options.count])
                    },
                    blur : function() {
                        a.options.flag = true;
                        var c = function() {
                            a.replayHide(this, a.loadElements[a.options.count])
                        }.bind(this);
                        c.delay(500)
                    }
                })
            },
            replayHide : function(a, b) {
                a = $(a);
                if (a.value.trim() == "" && this.options.flag) {
                    a.removeClass("h");
                    b.getElement(this.options.submitbox).hide();
                    b.getElement(this.options.font).show();
                    b.getElement(this.options.replay).fade("out")
                }
            },
            replayShow : function(a, b) {
                a = $(a);
                a.addClass("h");
                b.getElement(this.options.submitbox).show();
                b.getElement(this.options.font).hide();
                b.getElement(this.options.replay).fade("in");
                this.options.textarea = a.id
            },
            replayFace : function() {
                var a = this;
                $$(this.options.replay)
                        .addEvent(
                                "click",
                                function() {
                                    if (a.options.flag) {
                                        a.options.curtag = a.options.flag = false;
                                        a.options.pt.setStyles({
                                            left : this.getPosition().x,
                                            top : this.getPosition().y + 25
                                        }).fade("in");
                                        document.addEvent("click", a.removeEven
                                                .bind(a));
                                        if ($(a.options.textarea)
                                                && $(a.options.textarea)
                                                        .retrieve(
                                                                a.options.textarea) == null) {
                                            $(a.options.textarea).store(
                                                    a.options.textarea,
                                                    a.options.textarea);
                                            a.options.pt
                                                    .getElements("span")
                                                    .addEvents(
                                                            {
                                                                click : function() {
                                                                    val = this
                                                                            .getElement(
                                                                                    "img")
                                                                            .get(
                                                                                    "alt");
                                                                    a
                                                                            .insert(val)
                                                                },
                                                                mouseenter : function() {
                                                                    this
                                                                            .addClass("select")
                                                                },
                                                                mouseleave : function() {
                                                                    this
                                                                            .removeClass("select")
                                                                }
                                                            })
                                        } else {
                                            if (!$(a.options.textarea)) {
                                                document.removeEvents("click");
                                                a.options.pt.fade("out");
                                                a.options.flag = true
                                            }
                                        }
                                    }
                                })
            },
            setThis : function(a) {
                return a = this.options.textarea
            },
            table : function() {
                var a = this;
                this.options.pt = new Element("div", {
                    styles : {
                        width : "360px",
                        height : "160px",
                        position : "absolute",
                        visibility : "hidden",
                        top : "0px"
                    }
                }).inject(document.body);
                this.options.table.inject(this.options.pt);
                new Element("div", {
                    styles : {
                        position : "absolute",
                        width : "13px",
                        height : "8px",
                        background : "url(" + gewara.util.imgPath
                                + "css/home/mrcio_tp.png) no-repeat",
                        left : 16,
                        top : -3
                    }
                }).inject(this.options.pt);
                var b = new Element("div").addClass("uidialog clear");
                var c = '<span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/01.gif" alt="[01]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/02.gif" alt="[02]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/03.gif" alt="[03]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/04.gif" alt="[04]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/05.gif" alt="[05]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/06.gif" alt="[06]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/07.gif" alt="[07]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/08.gif" alt="[08]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/09.gif" alt="[09]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/010.gif" alt="[010]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/011.gif" alt="[011]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/012.gif" alt="[012]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/013.gif" alt="[013]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/014.gif" alt="[014]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/015.gif" alt="[015]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/016.gif" alt="[016]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/017.gif" alt="[017]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/018.gif" alt="[018]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/019.gif" alt="[019]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/020.gif" alt="[020]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/021.gif" alt="[021]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/022.gif" alt="[022]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/023.gif" alt="[023]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/024.gif" alt="[024]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/025.gif" alt="[025]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/026.gif" alt="[026]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/027.gif" alt="[027]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/028.gif" alt="[028]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/029.gif" alt="[029]" width="20" height="20"/></span><span><img src="'
                        + gewara.util.imgPath
                        + 'img/minFace/030.gif" alt="[030]" width="20" height="20"/></span>', b = new Element(
                        "div", {
                            html : c
                        }).addClass("uidialog clear");
                b.set("id", "myFace").inject(this.options.content)
            },
            removeEven : function(a) {
                if (!this.options.pt.hasChild(a.target) && this.options.curtag) {
                    if (!this.options.pt.hasChild(a.target)) {
                        document.removeEvents("click");
                        this.options.pt.fade("out");
                        this.options.flag = true;
                        this.replayHide(this.options.textarea,
                                this.loadElements[this.options.curtimes])
                    }
                } else {
                    this.options.curtag = true
                }
            },
            insert : function(c) {
                var a = $(this.options.textarea);
                try {
                    a.focus();
                    a.insertAtCursor(c)
                } catch (b) {
                }
            },
            clacImgZoomParam : function(d, c, b, a) {
                var e = {
                    width : b,
                    height : a,
                    top : 0,
                    left : 0
                };
                if (b > d || a > c) {
                    rateWidth = b / d;
                    rateHeight = a / c;
                    if (rateWidth > rateHeight) {
                        e.width = d;
                        e.height = a / rateWidth
                    } else {
                        e.width = b / rateHeight;
                        e.height = c
                    }
                }
                e.left = (d - e.width) / 2;
                e.top = (c - e.height) / 2;
                return e
            },
            zoopmParam : function() {
                var a = this;
                if (this.img.length > 0) {
                    this.img.each(function(b) {
                        b.addEvent("load", function() {
                            if (this.width > 120 || this.height > 90) {
                                var c = a.clacImgZoomParam(120, 90, this.width,
                                        this.height);
                                this.set("width", c.width);
                                this.set("height", c.height);
                                if (this.getParent().tagName != "a") {
                                    this.inject(new Element("a", {
                                        href : this.get("src"),
                                        rel : "lightbox[galerie]",
                                        target : "_blank"
                                    }).inject(this, "before"))
                                }
                            }
                            Slimbox.scanPage()
                        })
                    })
                }
            }
        });
var del = new Class(
        {
            initialize : function(a) {
                this.del(a)
            },
            del : function(element) {
                var elements = $(element).getElements(".DEL"), self = this;
                $$(".DEL")
                        .addEvent(
                                "click",
                                function() {
                                    var _this = this;
                                    var parent = this.getParent(".ui_abeam"), url = this
                                            .get("lang");
                                    if (parent && url
                                            && elements.contains(this)) {
                                        gewaUtil
                                                .confirm(
                                                        "确认删除？",
                                                        function() {
                                                            new Request(
                                                                    {
                                                                        url : url,
                                                                        method : "get",
                                                                        onSuccess : function(
                                                                                resText) {
                                                                            eval(resText);
                                                                            if (data.success) {
                                                                                parent
                                                                                        .nix(
                                                                                                {
                                                                                                    duration : 1500,
                                                                                                    onComplete : function() {
                                                                                                        if (_this
                                                                                                                .getParent(".newsReplay")) {
                                                                                                            this
                                                                                                                    .getParent(
                                                                                                                            ".newsReplay")
                                                                                                                    .dispose()
                                                                                                        } else {
                                                                                                            _this
                                                                                                                    .getParent(
                                                                                                                            ".ui_abeam")
                                                                                                                    .dispose()
                                                                                                        }
                                                                                                    }
                                                                                                            .bind(parent)
                                                                                                },
                                                                                                true);
                                                                                if (_this
                                                                                        .getParent(".fLoad")) {
                                                                                    var span = _this
                                                                                            .getParent(
                                                                                                    ".fLoad")
                                                                                            .getPrevious()
                                                                                            .getElement(
                                                                                                    ".AC")
                                                                                            .getElement(
                                                                                                    "span");
                                                                                    if (span) {
                                                                                        self
                                                                                                .count(
                                                                                                        span
                                                                                                                .get(
                                                                                                                        "text")
                                                                                                                .toInt(),
                                                                                                        -1,
                                                                                                        span)
                                                                                    }
                                                                                }
                                                                            } else {
                                                                                gewaUtil
                                                                                        .alert(data.msg)
                                                                            }
                                                                        }
                                                                    }).send()
                                                        })
                                    }
                                })
            },
            count : function(b, c, a) {
                new CountDown({
                    element : $(a),
                    start : b,
                    duration : 1000,
                    startFont : "20px",
                    endFont : "12px",
                    finish : b + c
                }).start();
                $(a).set("text", b + c)
            }
        });
var selectpic = new Class({
    initialize : function(a, b) {
        var c = "";
        if (a && b) {
            this.select(b, a, this.insert)
        }
    },
    select : function(d, b, a) {
        var c = $(d).getElements("span"), e = "";
        c.addEvents({
            click : function(f) {
                e = this.getElement("img").get("alt");
                a($(b), e)
            },
            mouseenter : function() {
                this.addClass("select")
            },
            mouseleave : function() {
                this.removeClass("select")
            }
        })
    },
    insert : function(a, c) {
        try {
            a.focus();
            a.insertAtCursor(c)
        } catch (b) {
        }
    }
});
var dialogs = new Class({
    Extends : tableLayer,
    options : {
        elements : ".dialogs",
        elementList : {},
        historyDom : "",
        curDom : "",
        pt : "",
        flag : false,
        width : "202px"
    },
    initialize : function(b, a) {
        this.parent(a);
        this.elements = $$(this.options.elements);
        this.createLayer();
        this.el = $(b);
        this.build()
    },
    build : function() {
        var a = this;
        this.elements.addEvent("click", function() {
            var b = a.options.elementList[a.elements.indexOf(this)];
            if (b) {
                if (a.options.historyDom) {
                    a.options.historyDom.fade("out")
                }
                a.options.pt.show();
                a.options.pt.position({
                    relativeTo : this,
                    offset : {
                        x : 0,
                        y : 10
                    }
                });
                if (a.el) {
                    a.options.elementList[a.elements.indexOf(this)].setStyles({
                        width : a.options.width,
                        left : this.getPosition().x
                    });
                    a.options.pt.setStyles({
                        left : 20,
                        top : -3
                    })
                }
                a.options.pt.inject(b);
                if (a.options.flag) {
                    a.options.elementList[a.elements.indexOf(this)].setStyle(
                            "top", this.getPosition().y + 20)
                }
                b.fade(1);
                b.show();
                a.options.historyDom = b;
                a.options.curDom = this;
                gewa.util.removeBodyClick(b, this, function() {
                })
            }
        })
    },
    createLayer : function() {
        var b = this, a = {};
        this.elements.each(function(d, c) {
            if (c == 0) {
                a.left = d.getPosition().x;
                a.top = d.getPosition().y + 20
            }
            if (d.getElement(".none")) {
                b.options.elementList[c] = new Element("div", {
                    styles : {
                        width : "360px",
                        position : "absolute",
                        visibility : "hidden",
                        top : "0px",
                        left : a.left,
                        "z-index" : 999
                    }
                }).inject(document.body);
                b.options.table.clone().inject(b.options.elementList[c]);
                d.getElement(".none").removeClass("none").inject(
                        b.options.elementList[c].getElement(".m_c"));
                new Element("img", {
                    src : gewara.util.imgPath + "css/home/c_del.png",
                    styles : {
                        cursor : "pointer",
                        position : "absolute",
                        right : "16px",
                        bottom : "16px",
                        "z-index" : "9"
                    }
                }).addEvent("click", function() {
                    b.removeEvet()
                }).inject(b.options.elementList[c], "top")
            }
        });
        this.options.pt = new Element("div", {
            styles : {
                position : "absolute",
                width : "13px",
                height : "8px",
                background : "url(" + gewara.util.imgPath
                        + "css/home/mrcio_tp.png) no-repeat",
                display : "none"
            }
        })
    },
    hide : function(a) {
        if (!this.options.historyDom.hasChild(a.target)
                && !this.options.curDom.hasChild(a.target)) {
            this.removeEvet()
        }
    },
    removeEvet : function() {
        document.removeEvents("click");
        this.options.historyDom.fade("out")
    }
});
var issue = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                font : "",
                subt : "",
                tips : "",
                num : 50
            },
            initialize : function(b, a) {
                this.setOptions(a);
                this.element = $(b);
                this.count();
                this.tips();
                this.work()
            },
            count : function() {
                var a = this.options.num.toInt() - this.element.value.length, b = $(this.options.font);
                if (a < 0) {
                    b.innerHTML = "已超出<b>" + a + "</b>字！";
                    b.addClass("wlColor")
                } else {
                    b.innerHTML = "你还可以输入<b>" + a + "</b>字！";
                    b.removeClass("wlColor")
                }
            },
            work : function() {
                var a = this;
                this.element.addEvents({
                    focus : function() {
                        $(a.options.tips).hide()
                    },
                    blur : function() {
                        if (!$chk(this.value)) {
                            $(a.options.tips).show()
                        }
                        a.count()
                    },
                    keyup : function() {
                        a.count()
                    }
                })
            },
            tips : function() {
                if ($chk(this.element.value)) {
                    $(this.options.tips).hide()
                }
            }
        });
var scrollLives = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                scrollFx : $empty,
                flag : true
            },
            initialize : function(b, a) {
                this.setOptions(a);
                this.triger = $$(".liveScroll");
                this.element = $(b);
                this.scroll()
            },
            scroll : function() {
                this.triger.addEvent("click", function(e) {
                    if (this.options.flag) {
                        this.options.flag = false;
                        var target = e.target, data = {}, ul = this.element
                                .getElement("ul");
                        var request = new Request({
                            url : GewaraUtil.basePath + "ajaxLoadAgenda.xhtml",
                            method : "get",
                            link : "cancel",
                            noCache : true,
                            onSuccess : function(resText) {
                                eval(resText);
                                if (data.success) {
                                    if (target.getNext() == this.element) {
                                        this.dispose(ul.getLast(), data)
                                    } else {
                                        this.dispose(ul.getFirst(), data, true)
                                    }
                                }
                            }.bind(this)
                        });
                        if (target.getNext() == this.element) {
                            data.append = 0;
                            data.agendatime = ul.getElement(".select")
                                    .getPrevious().get("lang");
                            request.send({
                                data : data
                            })
                        } else {
                            data.append = 1;
                            data.agendatime = ul.getElement(".select")
                                    .getNext().get("lang");
                            request.send({
                                data : data
                            })
                        }
                    }
                }.bind(this))
            },
            dispose : function(c, d, a) {
                var b = this.element.getElement("ul");
                b
                        .set(
                                "morph",
                                {
                                    duration : 3000,
                                    transition : Fx.Transitions.Sine.easeOut,
                                    onComplete : function() {
                                        this[0].dispose();
                                        this[1].setStyles({
                                            left : "auto",
                                            right : "auto"
                                        });
                                        this[1].getElements("li")[1]
                                                .addClass("select");
                                        var f = $("livesInsert"), e = 0;
                                        f
                                                .set(
                                                        "tween",
                                                        {
                                                            duration : 1500,
                                                            onComplete : function() {
                                                                if (e < 1) {
                                                                    e++;
                                                                    f.empty();
                                                                    if ($defined(d.groundAgenda)
                                                                            || $chk(d.groundAgenda)) {
                                                                        f
                                                                                .set(
                                                                                        "html",
                                                                                        d.groundAgenda)
                                                                    } else {
                                                                        f
                                                                                .set(
                                                                                        "html",
                                                                                        '瓦友们，没有生活安排了！<a href="/home/agenda/addAgenda.xhtml" target="_blank">立即安排我的生活</a>')
                                                                    }
                                                                    f
                                                                            .tween(
                                                                                    "opacity",
                                                                                    1)
                                                                }
                                                            }
                                                        });
                                        f.tween("opacity", 0);
                                        this[2].options.flag = true
                                    }.bind([ c, b, this ])
                                });
                b.getElements("li").removeClass("select");
                if (a) {
                    b.morph({
                        left : [ 0, -80 ]
                    });
                    new Element("li", {
                        lang : d.curDate,
                        text : d.curDateStr
                    }).inject(b)
                } else {
                    b.morph({
                        right : [ 0, -80 ]
                    });
                    new Element("li", {
                        lang : d.curDate,
                        text : d.curDateStr
                    }).inject(b, "top")
                }
            }
        });
var DynWaraTemplate = new Class({
    Implements : [ Options, Events ],
    options : {
        preURL : "",
        container : "",
        moderator : "",
        count : "6",
        isReply : false,
        dialog : false,
        isZtMarquee : false
    },
    initialize : function(a, b) {
        this.setOptions(a);
        this.loadWara(this.options)
    },
    loadWara : function(c) {
        var b = c.preURL + "loadMicroModerTable.xhtml";
        var e = c.moderator;
        if (e.contains("#")) {
            e = e.replace(/#/g, "")
        }
        var a = {
            moderate : e,
            count : c.count,
            isReply : c.isReply,
            isZtMarquee : c.isZtMarquee
        };
        $(c.container).empty();
        var d = new Element("div").inject(c.container, "top");
        d.innerHTML = '<img src="' + gewara.util.cdnPath
                + 'css/home/home_loading.gif">';
        GewaraUtil.sendLoad(d, b, a, function(f) {
            if (!f) {
                gewaUtil.alert("Error loadWalaModerTable!")
            } else {
                delFun = new del(d);
                new AC(d, {
                    script : selector,
                    del : delFun
                });
                new request(d, {
                    del : delFun
                });
                if (c.dialog) {
                    new dialogs()
                }
            }
        })
    }
});
var ShowErrorTextArea = new Class({
    Implements : [ Options, Events ],
    options : {
        oTime : $empty,
        isshow : true
    },
    initialize : function(a) {
        this.setOptions(a)
    },
    stop : function() {
        $clear(this.options.oTime);
        this.options.isshow = true
    },
    start : function() {
        if (this.options.isshow) {
            this.options.isshow = false;
            this.options.oTime = this.step.periodical(300, this);
            this.stop.delay(700, this)
        }
    },
    show : function(a) {
        this.element = $(a);
        this.element.highlight("#fdd9ba", "#ffffff");
        this.start()
    },
    step : function() {
        this.show(this.element)
    }
});
function addMicroMemberTreasure(memberid, obj, isRefresh) {
    checkLogin(true, function() {
        var url = GewaraUtil.basePath + "micro/addMicroAttention.xhtml";
        new Request({
            url : url,
            method : "get",
            onSuccess : function(resText) {
                eval(resText);
                if (data.success) {
                    if (isRefresh) {
                        refreshPage()
                    } else {
                        if ($chk($(obj)) && $chk($(obj).getParent("span"))) {
                            $(obj).getParent("span").set("text", "已关注")
                                    .addClass("gray")
                        }
                    }
                } else {
                    gewaUtil.alert(data.msg)
                }
            }
        }).send({
            data : {
                memberid : memberid
            }
        })
    })
}
function cancelMemberTreasure(b, a) {
    checkLogin(true, function() {
        var d = GewaraUtil.basePath + "micro/cancelAttention.xhtml";
        var c = {
            memberid : b
        };
        GewaraUtil.sendRequest(d, c, function(e) {
            if (e.success) {
                if (a == "micro") {
                    gewaUtil.alert("取消成功！", refreshPage)
                } else {
                    gewaUtil.alert(data.retval)
                }
            } else {
                gewaUtil.alert(e.msg)
            }
        }, "get")
    })
}
function cancelMicroTreasure(c) {
    if (confirm("确定取消关注吗？")) {
        var b = GewaraUtil.basePath + "micro/cancelTreasure.xhtml";
        var a = {
            tid : c
        };
        GewaraUtil.sendRequest(b, a, function(d) {
            if (d.success) {
                refreshPage()
            } else {
                gewaUtil.alert(d.msg)
            }
        }, "get")
    }
}
function checkAll(a) {
    if (a.checked) {
        $("microComment").getElements("input[type=checkbox]").each(function(b) {
            b.checked = true
        })
    } else {
        $("microComment").getElements("input[type=checkbox]").each(function(b) {
            b.checked = false
        })
    }
}
function validateData(a) {
    $$(".replyAction").each(
            function(b) {
                b.addEvent("click", function() {
                    var f = this.get("id"), d = this.getNext(".replyBox")
                            .getElement(".inser_page_data").get("id"), c = "#"
                            + d + " .dl-40", e = this.getNext(".replyBox")
                            .getElement(".page-navigation").getElement("div")
                            .get("id");
                    if (a.indexOf("micro") != -1) {
                        microblogpageCurr(f, d, c, e, this, a)
                    } else {
                        pageCurr(f, d, c, e, this)
                    }
                })
            })
}
function loadData(i, b, g, h, f, a, d) {
    GewaraUtil.showLoading(f);
    var c = (Math.random() * 1000000).toInt();
    a = a + "?=" + c;
    var e = new Request({
        url : a,
        method : "get",
        onSuccess : function(l) {
            if ($(b)) {
                $(b).set("html", l);
                resizePicture($(b).getElements("img"), 340, true);
                slidePicture();
                new reply(".reply");
                var k = new PagesNavigation(g, {
                    navigationBlocks : [ h ],
                    defaultQuantity : 5
                });
                k.build();
                GewaraUtil.hideLoading();
                $(b).getElements("img").each(function(m) {
                    m.addEvent("load", function() {
                        if (!this.hasClass("img1") && this.width > 90) {
                            this.width = 90
                        }
                    })
                });
                var j = 0;
                if ($(b).getElements("dl")) {
                    j = $(b).getElements("dl").length
                } else {
                    j = $(b).getElements("ul").length
                }
                if (j == 0) {
                    $("repcount" + i).set("text", "")
                } else {
                    $("repcount" + i).set("text", "(" + j + ")")
                }
                $(h).getParent(".replyBox").removeClass("none")
            }
        }
    });
    e.send({
        data : {
            requestid : i
        }
    })
}
function areaSet(a) {
    a.value = "回复...";
    a.getParent().getPrevious("span").addClass("none");
    a.getParent("li").setStyle("padding", "0px");
    a.getAllNext().addClass("none");
    a.setStyles({
        height : "16px",
        "font-size" : "12px",
        color : "#999"
    })
}
function pageCurr(b, d, a, c, e) {
    var f = "";
    if ($(c).getParent(".replyBox").hasClass("none")
            || $(e).getNext(".replyBox").hasClass("none")) {
        if ($(e).get("text").test("展开回复")) {
            f = $(e).get("text").replace(/.{4}/, "收起回复");
            $(e).set("text", f)
        }
        $(c).getParent(".replyBox").removeClass("none");
        loadData(b, d, a, c, e, "/home/getDiaryCommentList.xhtml")
    } else {
        if ($(e).get("text").test("收起回复")) {
            f = $(e).get("text").replace(/.{4}/, "展开回复");
            $(e).set("text", f)
        }
        $(c).getParent(".replyBox").addClass("none")
    }
}
function cancelBt(a, c, b) {
    if ($(a).value == "") {
        gewaUtil.alert("请输入" + c + "，再点击确定！")
    } else {
        $(b).hide()
    }
}
function replyBeforeFun(e) {
    var d = $(e).get("rid");
    var c = $(e).get("uid");
    var a = $(e).get("uname");
    var f = a + ":";
    $(e).getParent("ul .ui_abeam").getElement("input[name=replytag]").set(
            "value", f);
    $(e).getParent("ul .ui_abeam").getElement("input[name=tomemberid]").set(
            "value", c);
    $(e).getParent("ul .ui_abeam").getElement("input[name=transferid]").set(
            "value", d);
    var b = $(e).getParent("ul .ui_abeam").getElement("textarea");
    b.focus();
    b.set("value", f)
};