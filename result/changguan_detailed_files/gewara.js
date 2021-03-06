var Observer = new Class({
    Implements : [ Options, Events ],
    options : {
        periodical : false,
        delay : 1000
    },
    initialize : function(c, a, b) {
        this.element = $(c) || $$(c);
        this.addEvent("onFired", a);
        this.setOptions(b);
        this.bound = this.changed.bind(this);
        this.resume()
    },
    changed : function() {
        var a = this.element.get("value");
        if ($equals(this.value, a)) {
            return
        }
        this.clear();
        this.value = a;
        this.timeout = this.onFired.delay(this.options.delay, this)
    },
    setValue : function(a) {
        this.value = a;
        this.element.set("value", a);
        return this.clear()
    },
    onFired : function() {
        this.fireEvent("onFired", [ this.value, this.element ])
    },
    clear : function() {
        $clear(this.timeout || null);
        return this
    },
    pause : function() {
        if (this.timer) {
            $clear(this.timer)
        } else {
            this.element.removeEvent("keyup", this.bound)
        }
        return this.clear()
    },
    resume : function() {
        this.value = this.element.get("value");
        if (this.options.periodical) {
            this.timer = this.changed.periodical(this.options.periodical, this)
        } else {
            this.element.addEvent("keyup", this.bound)
        }
        return this
    }
});
var $equals = function(b, a) {
    return (b == a || JSON.encode(b) == JSON.encode(a))
};
var Autocompleter = new Class(
        {
            Implements : [ Options, Events ],
            options : {
                forceRefresh : false,
                relatedFun : "",
                minLength : 1,
                markQuery : true,
                width : "inherit",
                maxChoices : 10,
                injectChoice : null,
                customChoices : null,
                emptyChoices : null,
                visibleChoices : true,
                className : "autocompleter-choices",
                zIndex : 100,
                delay : 400,
                observerOptions : {},
                fxOptions : {},
                src : "",
                autoSubmit : false,
                overflow : false,
                overflowMargin : 25,
                selectFirst : false,
                filter : null,
                filterCase : false,
                filterSubset : false,
                forceSelect : false,
                selectMode : true,
                choicesMatch : null,
                classW : "",
                requestid : "",
                multiple : false,
                separator : ", ",
                separatorSplit : /\s*[,;]\s*/,
                autoTrim : false,
                allowDupes : false,
                unselect : "hideChoices",
                select : "choiceSelect",
                cache : true,
                relative : false,
                autoPos : true
            },
            initialize : function(b, a, c) {
                this.element = $(b);
                this.setOptions(a);
                this.build(c);
                this.observer = new Observer(this.element, this.prefetch
                        .bind(this), $merge({
                    delay : this.options.delay
                }, this.options.observerOptions));
                this.queryValue = null;
                if (this.options.filter) {
                    this.filter = this.options.filter.bind(this)
                }
                var d = this.options.selectMode;
                this.typeAhead = (d == "type-ahead");
                this.selectMode = (d === true) ? "selection" : d;
                this.cached = []
            },
            build : function(a) {
                var b;
                if (a) {
                    b = a
                } else {
                    b = $(document.body)
                }
                if ($(this.options.customChoices)) {
                    this.choices = this.options.customChoices
                } else {
                    this.choices = new Element("ul", {
                        "class" : this.options.classW ? this.options.classW
                                : this.options.className,
                        styles : {
                            zIndex : this.options.zIndex,
                            top : 0,
                            left : 0
                        }
                    }).inject(b);
                    this.relative = false;
                    if (this.options.relative) {
                        this.choices.inject(this.element, "after");
                        this.relative = this.element.getOffsetParent()
                    }
                    this.fix = new OverlayFix(this.choices)
                }
                if (!this.options.separator.test(this.options.separatorSplit)) {
                    this.options.separatorSplit = this.options.separator
                }
                this.fx = (!this.options.fxOptions) ? null : new Fx.Tween(
                        this.choices, $merge({
                            property : "opacity",
                            link : "cancel",
                            duration : 200
                        }, this.options.fxOptions)).addEvent("onStart",
                        Chain.prototype.clearChain).set(0);
                this.element
                        .setProperty("autocomplete", "off")
                        .addEvent(
                                (Browser.Engine.trident || Browser.Engine.webkit) ? "keydown"
                                        : "keypress", this.onCommand.bind(this))
                        .addEvent("mouseover",
                                this.onCommand.bind(this, [ false ])).addEvent(
                                "click", this.onCommand.bind(this, [ false ]))
                        .addEvent("focus", this.toggleFocus.create({
                            bind : this,
                            arguments : true,
                            delay : 100
                        })).addEvent("blur", this.toggleFocus.create({
                            bind : this,
                            arguments : false,
                            delay : 100
                        }))
            },
            destroy : function() {
                if (this.fix) {
                    this.fix.destroy()
                }
                this.choices = this.selected = this.choices.destroy()
            },
            toggleFocus : function(a) {
                this.focussed = a;
                if (!a) {
                    this.hideChoices(true)
                }
                this.fireEvent((a) ? "onFocus" : "onBlur", [ this.element ]);
                this.element.removeClass(this.options.select);
                this.element.addClass(this.options.unselect)
            },
            onCommand : function(b) {
                if (!b && this.focussed) {
                    return this.prefetch()
                }
                if (b && b.key && !b.shift) {
                    switch (b.key) {
                    case "enter":
                        if (!$defined(this.opted)) {
                            this.choiceSelect(this.selected)
                        }
                        if (this.element.value != this.opted) {
                            return true
                        }
                        if (this.selected && this.visible) {
                            if (this.selected.getElement("a")) {
                                if ($chk(this.selected.getElement("a").href)
                                        && this.options.relatedFun == "") {
                                    window.location = this.selected
                                            .getElement("a").href
                                }
                            }
                            this.choiceSelect(this.selected);
                            return !!(this.options.autoSubmit)
                        }
                        break;
                    case "up":
                    case "down":
                        if (!this.prefetch() && this.queryValue !== null) {
                            var a = (b.key == "up");
                            this
                                    .choiceOver(
                                            (this.selected || this.choices)[(this.selected) ? ((a) ? "getPrevious"
                                                    : "getNext")
                                                    : ((a) ? "getLast"
                                                            : "getFirst")]
                                                    (this.options.choicesMatch),
                                            true)
                        }
                        return false;
                    case "esc":
                    case "tab":
                        this.hideChoices(true);
                        break
                    }
                }
                return true
            },
            setSelection : function(h) {
                try {
                    var i = this.selected.inputValue, j = i;
                    if ($defined(i)) {
                        var a = this.queryValue.length, c = i.length;
                        if (i.substr(0, a).toLowerCase() != this.queryValue
                                .toLowerCase()) {
                            a = 0
                        }
                        if (this.options.multiple) {
                            var g = this.options.separatorSplit;
                            j = this.element.value;
                            a += this.queryIndex;
                            c += this.queryIndex;
                            var b = j.substr(this.queryIndex).split(g, 1)[0];
                            j = j.substr(0, this.queryIndex) + i
                                    + j.substr(this.queryIndex + b.length);
                            if (h) {
                                var f = j.split(this.options.separatorSplit)
                                        .filter(function(e) {
                                            return this.test(e)
                                        }, /[^\s,]+/);
                                if (!this.options.allowDupes) {
                                    f = [].combine(f)
                                }
                                var k = this.options.separator;
                                j = f.join(k) + k;
                                c = j.length
                            }
                        }
                        this.observer.setValue(j);
                        this.opted = j;
                        if (h || this.selectMode == "pick") {
                            a = c
                        }
                        this.element.selectRange(a, c)
                    } else {
                        i = this.selected.innerHTML;
                        j = i;
                        if (!$defined(h)) {
                            this.observer.element.value = this.observer.element.value
                        } else {
                            this.observer.setValue((!$defined(h)) ? (j
                                    .split("@")[0]) : j)
                        }
                    }
                    this.fireEvent("onSelection", [ this.element,
                            this.selected, j, i ])
                } catch (d) {
                }
            },
            showChoices : function() {
                var c = this.options.choicesMatch, b = this.choices.getFirst(c);
                this.selected = this.selectedValue = null;
                if (this.fix && this.options.autoPos) {
                    var e = this.element.getCoordinates(this.relative), a = this.options.width
                            || "auto";
                    if (Browser.Engine.gecko) {
                        this.choices
                                .setStyles({
                                    left : e.left + 1,
                                    top : e.bottom,
                                    width : (a === true || a == "inherit") ? e.width - 2
                                            : a - 2
                                })
                    } else {
                        this.choices
                                .setStyles({
                                    left : e.left,
                                    top : e.bottom,
                                    width : (a === true || a == "inherit") ? e.width - 2
                                            : a - 2
                                })
                    }
                    this.element.removeClass(this.options.unselect);
                    this.element.addClass(this.options.select)
                }
                if (!b) {
                    return
                }
                if (!this.visible) {
                    this.visible = true;
                    this.choices.setStyle("display", "");
                    if (this.fx) {
                        this.fx.start(1)
                    }
                    this.fireEvent("onShow", [ this.element, this.choices ])
                }
                if (this.options.selectFirst || this.typeAhead
                        || b.inputValue == this.queryValue) {
                    this.choiceOver(b, this.typeAhead)
                }
                var d = this.choices.getChildren(c), f = this.options.maxChoices;
                var i = {
                    overflowY : "hidden",
                    height : ""
                };
                this.overflown = false;
                if (d.length > f) {
                    var j = d[f - 1];
                    i.overflowY = "scroll";
                    i.height = j.getCoordinates(this.choices).bottom;
                    this.overflown = true
                }
                this.choices.setStyles(i);
                if (this.fix) {
                    this.fix.show()
                }
                if (this.options.visibleChoices) {
                    var h = document.getScroll(), k = document.getSize(), g = this.choices
                            .getCoordinates();
                    if (g.right > h.x + k.x) {
                        h.x = g.right - k.x
                    }
                    if (g.bottom > h.y + k.y) {
                        h.y = g.bottom - k.y
                    }
                    window
                            .scrollTo(Math.min(h.x, g.left), Math.min(h.y,
                                    g.top))
                }
            },
            hideChoices : function(a) {
                if (a) {
                    var c = this.element.value;
                    if (this.options.forceSelect) {
                        c = this.opted
                    }
                    if (this.options.autoTrim) {
                        c = c.split(this.options.separatorSplit).filter(
                                $arguments(0)).join(this.options.separator)
                    }
                    this.observer.setValue(c)
                }
                if (!this.visible) {
                    return
                }
                this.visible = false;
                if (this.selected) {
                    this.selected.removeClass("autocompleter-selected")
                }
                this.observer.clear();
                var b = function() {
                    this.choices.setStyle("display", "none");
                    if (this.fix) {
                        this.fix.hide()
                    }
                }.bind(this);
                if (this.fx) {
                    this.fx.start(0).chain(b)
                } else {
                    b()
                }
                this.fireEvent("onHide", [ this.element, this.choices ])
            },
            refresh : function() {
                this.forceRefresh = true
            },
            prefetch : function() {
                var f = this.element.value, e = f;
                if (this.options.multiple) {
                    var c = this.options.separatorSplit;
                    var a = f.split(c);
                    var b = this.element.getSelectedRange().start;
                    var g = f.substr(0, b).split(c);
                    var d = g.length - 1;
                    b -= g[d].length;
                    e = a[d]
                }
                if (e.length < this.options.minLength) {
                    this.hideChoices()
                } else {
                    if ((e === this.queryValue || (this.visible && e == this.selectedValue))
                            && !this.forceRefresh) {
                        if (this.visible) {
                            return false
                        }
                        this.showChoices()
                    } else {
                        this.queryValue = e;
                        this.queryIndex = b;
                        this.forceRefresh = false;
                        if (!this.fetchCached()) {
                            this.query()
                        }
                    }
                }
                return true
            },
            fetchCached : function() {
                return false;
                if (!this.options.cache || !this.cached || !this.cached.length
                        || this.cached.length >= this.options.maxChoices
                        || this.queryValue) {
                    return false
                }
                this.update(this.filter(this.cached));
                return true
            },
            update : function(c) {
                this.choices.empty();
                this.cached = c;
                var b = c && $type(c);
                if (!b || (b == "array" && !c.length)
                        || (b == "hash" && !c.getLength())) {
                    (this.options.emptyChoices || this.hideChoices).call(this)
                } else {
                    if (this.options.maxChoices < c.length
                            && !this.options.overflow) {
                        c.length = this.options.maxChoices
                    }
                    c.each(this.options.injectChoice || function(e) {
                        var d = new Element("li", {
                            html : e
                        });
                        d.inputValue = e;
                        this.addChoiceEvents(d).inject(this.choices)
                    }, this);
                    this.showChoices()
                }
                if (!$defined(c)) {
                    var a = new Element("li", {
                        html : "没有找到项目"
                    });
                    a.injectInside(this.choices);
                    this.showChoices()
                }
            },
            choiceOver : function(c, d) {
                if (!c || c == this.selected) {
                    return
                }
                if (this.selected) {
                    this.selected.removeClass("autocompleter-selected")
                }
                this.selected = c.addClass("autocompleter-selected");
                this.fireEvent("onSelect", [ this.element, this.selected, d ]);
                if (!this.selectMode) {
                    this.opted = this.element.value
                }
                if (!d) {
                    return
                }
                this.selectedValue = this.selected.inputValue;
                if (this.overflown) {
                    var f = this.selected.getCoordinates(this.choices), e = this.options.overflowMargin, g = this.choices.scrollTop, a = this.choices.offsetHeight, b = g
                            + a;
                    if (f.top - e < g && g) {
                        this.choices.scrollTop = Math.max(f.top - e, 0)
                    } else {
                        if (f.bottom + e > b) {
                            this.choices.scrollTop = Math.min(f.bottom - a + e,
                                    b)
                        }
                    }
                }
                if (this.selectMode) {
                    this.setSelection()
                }
            },
            choogeStyle : function() {
                this.element.removeClass(this.options.select);
                this.element.addClass(this.options.unselect)
            },
            choiceSelect : function(b) {
                if (b) {
                    this.choiceOver(b)
                }
                this.setSelection(true);
                this.queryValue = false;
                this.hideChoices();
                if (this.options.relatedFun && this.options.relatedFun != "") {
                    var a = b.getChildren("a").length > 0 ? b.getChildren("a")
                            : b;
                    var c = {
                        rel : a.get("rel"),
                        id : a.get("id"),
                        name : a.get("name"),
                        text : a.get("text"),
                        address : a.get("config"),
                        dom : this.element
                    };
                    this.options.relatedFun(c)
                }
                if (this.options.form) {
                    this.options.form.submit()
                }
                if (this.options.requestid) {
                    $(this.options.requestid).value = b.getElement("a").get(
                            "rel")
                }
            },
            filter : function(a) {
                return (a || this.tokens).filter(function(b) {
                    return this.test(b)
                }, new RegExp(((this.options.filterSubset) ? "" : "^")
                        + this.queryValue.escapeRegExp(),
                        (this.options.filterCase) ? "" : "i"))
            },
            addChoiceEvents : function(a) {
                return a.addEvents({
                    mouseover : this.choiceOver.bind(this, [ a ]),
                    click : this.choiceSelect.bind(this, [ a ])
                })
            }
        });
var OverlayFix = new Class(
        {
            initialize : function(a) {
                if (Browser.Engine.trident) {
                    this.element = $(a);
                    this.relative = this.element.getOffsetParent();
                    this.fix = new Element(
                            "iframe",
                            {
                                frameborder : "0",
                                scrolling : "no",
                                src : "javascript:false;",
                                styles : {
                                    position : "absolute",
                                    border : "none",
                                    display : "none",
                                    filter : "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
                                }
                            }).inject(this.element, "after")
                }
            },
            show : function() {
                if (this.fix) {
                    var a = this.element.getCoordinates(this.relative);
                    delete a.right;
                    delete a.bottom;
                    this.fix.setStyles($extend(a, {
                        display : "",
                        zIndex : (this.element.getStyle("zIndex") || 1) - 1
                    }))
                }
                return this
            },
            hide : function() {
                if (this.fix) {
                    this.fix.setStyle("display", "none")
                }
                return this
            },
            destroy : function() {
                if (this.fix) {
                    this.fix = this.fix.destroy()
                }
            }
        });
Element.implement({
    getSelectedRange : function() {
        if (!Browser.Engine.trident) {
            return {
                start : this.selectionStart,
                end : this.selectionEnd
            }
        }
        var e = {
            start : 0,
            end : 0
        };
        var a = this.getDocument().selection.createRange();
        if (!a || a.parentElement() != this) {
            return e
        }
        var c = a.duplicate();
        if (this.type == "text") {
            e.start = 0 - c.moveStart("character", -100000);
            e.end = e.start + a.text.length
        } else {
            var b = this.value;
            var d = b.length - b.match(/[\n\r]*$/)[0].length;
            c.moveToElementText(this);
            c.setEndPoint("StartToEnd", a);
            e.end = d - c.text.length;
            c.setEndPoint("StartToStart", a);
            e.start = d - c.text.length
        }
        return e
    },
    selectRange : function(d, a) {
        if (Browser.Engine.trident) {
            var c = this.value.substr(d, a - d).replace(/\r/g, "").length;
            d = this.value.substr(0, d).replace(/\r/g, "").length;
            var b = this.createTextRange();
            b.collapse(true);
            b.moveEnd("character", d + c);
            b.moveStart("character", d);
            b.select()
        } else {
            this.focus();
            this.setSelectionRange(d, a)
        }
        return this
    }
});
Autocompleter.Base = Autocompleter;
Autocompleter.Local = new Class({
    Extends : Autocompleter,
    options : {
        minLength : 0,
        delay : 200
    },
    initialize : function(b, d, a, c) {
        this.parent(b, a, c);
        this.tokens = d
    },
    query : function() {
        this.update(this.filter())
    }
});
Autocompleter.Request = new Class({
    Extends : Autocompleter,
    options : {
        postData : {},
        ajaxOptions : {},
        postVar : "value"
    },
    query : function() {
        var c = $unlink(this.options.postData) || {};
        c[this.options.postVar] = this.queryValue;
        var b = $(this.options.indicator);
        if (b) {
            b.setStyle("display", "")
        }
        var a = this.options.indicatorClass;
        if (a) {
            this.element.addClass(a)
        }
        this.fireEvent("onRequest", [ this.element, this.request, c,
                this.queryValue ]);
        this.request.send({
            data : c
        })
    },
    queryResponse : function() {
        var b = $(this.options.indicator);
        if (b) {
            b.setStyle("display", "none")
        }
        var a = this.options.indicatorClass;
        if (a) {
            this.element.removeClass(a)
        }
        return this.fireEvent("onComplete", [ this.element, this.request ])
    }
});
Autocompleter.Request.JSON = new Class({
    Extends : Autocompleter.Request,
    initialize : function(c, b, a) {
        this.parent(c, a);
        this.fn(b);
        this.request = new Request.JSON($merge({
            url : b,
            link : "cancel"
        }, this.options.ajaxOptions)).addEvent("onComplete", this.queryResponse
                .bind(this))
    },
    fn : function(a) {
        this.request = new Request.JSON($merge({
            url : a,
            link : "cancel"
        }, this.options.ajaxOptions)).addEvent("onComplete", this.queryResponse
                .bind(this))
    },
    queryResponse : function(a) {
        this.parent();
        this.update(a)
    }
});
Autocompleter.Request.HTML = new Class({
    Extends : Autocompleter.Request,
    initialize : function(c, b, a) {
        this.parent(c, a);
        this.fc(b);
        this.request = new Request($merge({
            url : b,
            link : "cancel",
            update : this.choices
        }, this.options.ajaxOptions)).addEvent("onComplete", this.queryResponse
                .bind(this))
    },
    fc : function(a) {
        this.request = new Request($merge({
            url : a,
            link : "cancel",
            update : this.choices
        }, this.options.ajaxOptions)).addEvent("onComplete", this.queryResponse
                .bind(this))
    },
    queryResponse : function(responseText) {
        eval(responseText);
        this.parent();
        this.update(data.result)
    }
});
Autocompleter.Ajax = {
    Base : Autocompleter.Request,
    Json : Autocompleter.Request.JSON,
    Xhtml : Autocompleter.Request.HTML
};
function modifyPlug(h, d, b, g) {
    var e = d.skey.indexOf(",") > 0 ? d.skey.substring(0, d.skey.indexOf(","))
            : d.skey;
    var c = new Element("a", {
        href : GewaraUtil.basePath + b + "/" + d.id,
        html : e,
        rel : g,
        id : d.id,
        name : h.element.get("name"),
        config : d.address ? d.address : ""
    }).addEvent("click", function(a) {
        a.preventDefault()
    });
    var f = new Element("li").adopt(c);
    f.inputValue = e;
    h.addChoiceEvents(f).injectInside(h.choices)
}
function genChoice(i, f, c) {
    var g = f.skey;
    var e = new Element("a", {
        href : GewaraUtil.basePath + c + f.id,
        html : g,
        "class" : "left"
    });
    var d = (f.mk / 10 + ".0").substring(0, 3);
    var b = new Element("span", {
        "class" : "pub-pf",
        html : d
    });
    var h = new Element("li").adopt(e);
    b.inject(h);
    h.inputValue = g;
    i.addChoiceEvents(h).injectInside(i.choices)
}
function genCinemaChoice(i, f, c) {
    var g = f.skey.substring(0, f.skey.indexOf(","));
    var e = new Element("a", {
        href : GewaraUtil.basePath + c + f.id,
        html : g,
        "class" : "left"
    });
    var d = (f.mk / 10 + ".0").substring(0, 3);
    var b = new Element("span", {
        "class" : "pub-pf",
        html : d
    });
    var h = new Element("li").adopt(e);
    b.inject(h);
    h.inputValue = g;
    i.addChoiceEvents(h).injectInside(i.choices)
}
var select = new Class({
    Implements : [ Options, Events ],
    Binds : [],
    options : {
        flag : true,
        trigger : null,
        close : null,
        hid : null,
        triggerClass : "trigger-class",
        closeClass : "close-class",
        callback : false,
        goal : null,
        request : null,
        isCompleter : false,
        specialVal : "",
        unify : false
    },
    initialize : function(a) {
        this.setOptions(a);
        this.build();
        this.control();
        this.start()
    },
    build : function() {
        this.trigger = $(this.options.trigger);
        this.close = $(this.options.close);
        this.data = $(this.options.data);
        this.hid = $(this.options.hid);
        this.solid = new Fx.Slide(this.options.close).hide();
        this.request = $(this.options.request);
        this.alist = this.close.getElements("a")
    },
    start : function() {
        var a = this;
        this.trigger.addEvents({
            click : function() {
                a.setStyle();
                a.flag = true
            },
            mouseleave : function() {
                a.close.addEvents({
                    mouseover : function() {
                        a.flag = false
                    },
                    mouseleave : function() {
                        a.flag = true;
                        a.trigger.focus()
                    }
                })
            },
            blur : function() {
                a.getStyle()
            }
        })
    },
    update : function(b, d, c) {
        this.trigger.value = d;
        if (this.request) {
            this.request.value = (c ? c : "")
        }
        if (this.options.isCompleter) {
            var a = ("" + this.options.specialVal.value).trim();
            if (a == "null") {
                a = ""
            }
            c = (c + "").trim();
            if (c == "null") {
                c = ""
            }
            if (this.options.unify) {
                completer.fc(GewaraUtil.basePath
                        + "remote.xhtml?a=sport&countycode=" + a
                        + "&servicetype=" + c)
            } else {
                completer.fc(GewaraUtil.basePath
                        + "remote.xhtml?a=sport&countycode=" + c
                        + "&servicetype=" + a)
            }
            $(this.options.goal).focus();
            completer.refresh()
        }
        if (this.hid) {
            this.hid.value = b
        }
        if (this.options.callback) {
            completer.refresh();
            if (this.options.goal) {
                $(this.options.goal).focus()
            }
        }
        this.flag = true;
        this.getStyle()
    },
    getItem : function(b, a) {
        this.alist = b;
        this.hid = a;
        this.control()
    },
    control : function() {
        var a = this;
        this.alist.each(function(b) {
            b.addEvent("click", function(d) {
                if ($chk(this.get("rel"))) {
                    d.preventDefault();
                    var c = this.get("rel").trim();
                    a.update(c, this.get("text"), this.get("id"))
                }
            })
        })
    },
    setStyle : function() {
        this.trigger.getNext().setStyles({
            top : this.trigger.getTop() + 23,
            left : this.trigger.getLeft() - 1
        });
        this.trigger.getNext().show();
        this.trigger.removeClass("close-class");
        this.trigger.addClass("trigger-class");
        this.solid.slideIn()
    },
    getStyle : function() {
        if (this.flag) {
            this.trigger.removeClass("trigger-class");
            this.trigger.addClass("close-class");
            this.solid.hide();
            this.trigger.getNext().hide()
        }
    }
});
(function(i, f, c) {
    var q = {
        Implements : [ Options, Events ],
        options : {
            step : 30,
            scrollerHtml : '<span class="decrease"></span><div class="scroll"><div class="handle"><div class="handleL"><div class="handleR"><div class="handleC"></div></div></div></div></div><span class="increase"></span>',
            mode : "vertical",
            rtl : false,
            laze : false,
            margins : 0,
            wrapped : null,
            callback : $empty,
            hasWheel : true,
            flag : false
        },
        element : null,
        scroller : null,
        scrollSize : 0,
        areaSize : 0,
        position : 0,
        slider : null,
        events : null,
        generated : false,
        attached : false,
        isAttached : true,
        axis : "y",
        dir : "top",
        property : "height",
        initialize : function b(w, v) {
            this.setOptions(v);
            this.element = f(w);
            this.axis = (this.options.mode == "vertical") ? "y" : "x";
            this.dir = (this.options.mode == "vertical") ? "top"
                    : this.options.rtl ? "right" : "left";
            this.property = (this.options.mode == "vertical") ? "height"
                    : "width";
            this.constrcut();
            this.attach();
            if (this.options.flag) {
                var u = f(this.options.wrapped).getDimensions().x
                        - this.element.getDimensions().x, t = 0;
                var y = function() {
                    if (t <= u * 2 - 10) {
                        this.slider.set(t);
                        t++
                    } else {
                        $clear(s)
                    }
                }.bind(this);
                var s = y.periodical(40);
                this.element.addEvent("mouseenter", function() {
                    $clear(s)
                })
            }
            if (this.options.laze && this.isAttached) {
                this.lazeObject()
            }
        },
        constrcut : function n() {
            var v = this;
            this.scroller = {};
            var s = this.scroller.element = new Element("div", {
                "class" : "scroller",
                html : this.options.scrollerHtml
            }).addClass(this.options.mode), u, v = this, t;
            this.scroller.inc = s.getElement(".decrease");
            this.scroller.dec = s.getElement(".increase");
            this.scroller.scroll = s.getElement(".scroll");
            this.scroller.handle = s.getElement(".handle");
            this.scrolled = (this.options.wrapped) ? f(this.options.wrapped)
                    : (function() {
                        var w = v.element.get("html");
                        v.element.empty();
                        return new Element("div", {
                            html : w,
                            "class" : "wrapped"
                        }).inject(v.element)
                    }());
            this.element.setStyle("overflow", "hidden");
            this.element.adopt(s);
            if (this.axis == "y") {
                this.scroller.scroll.setStyle("height",
                        this.element.getDimensions()[this.axis]
                                - this.element.getElement(".increase")
                                        .getDimensions()[this.axis] * 2)
            }
            if (this.axis == "x") {
                this.scroller.scroll.setStyle("width",
                        this.element.getDimensions()[this.axis]
                                - this.element.getElement(".increase")
                                        .getDimensions()[this.axis] * 2)
            }
            this.areaSize = this.element.getDimensions()[this.axis];
            this.scrollSize = this.scrolled.getDimensions()[this.axis];
            u = this.areaSize / this.scrollSize;
            t = +this.scroller.scroll.getDimensions()[this.axis] * u - 2;
            this.scroller.handle.setStyle(this.property, t.toInt());
            if (this.slider == null) {
                this.slider = new Slider(this.scroller.scroll,
                        this.scroller.handle, {
                            mode : this.options.mode,
                            range : [ 0, this.scrollSize - this.areaSize ]
                        })
            } else {
                this.isAttach()
            }
            this.generated = true
        },
        resizeScroll : function() {
            var t, u = this, s;
            this.scrolled = f(this.options.wrapped);
            this.element.setStyle("overflow", "hidden");
            this.scrolled.removeProperties("style");
            this.scrolled.setStyle("overflow", "scroll");
            this.scrollSize = this.scrolled.getScrollSize()[this.axis];
            this.scrolled.setStyle("overflow", "hidden");
            var v = this.position;
            this.areaSize = this.element.getDimensions()[this.axis];
            t = this.areaSize / this.scrollSize;
            s = this.areaSize * t - 2;
            this.scroller.handle.setStyle(this.property, s.toInt());
            this.scrolled.setStyle(this.property, this.scrollSize);
            this.slider.setRange([ 0, this.scrollSize - this.areaSize ]);
            this.slider.autosize();
            this.slider.set(v)
        },
        attach : function o() {
            var v = this;
            if (this.attached) {
                return
            }
            if (!this.generated) {
                this.generate()
            }
            this.events = {
                scrollUp : function t() {
                    v.scorllSize = v.position - v.options.step;
                    v.slider.set(v.scorllSize)
                },
                scrollDown : function s() {
                    v.scorllSize = v.position + v.options.step;
                    v.slider.set(v.scorllSize)
                },
                manageWheel : function u(w) {
                    w.preventDefault();
                    if (w.wheel > 0) {
                        v.events.scrollUp()
                    } else {
                        v.events.scrollDown()
                    }
                }.bind(this)
            };
            if (this.options.hasWheel) {
                this.element.addEvent("mousewheel", this.events.manageWheel)
            }
            this.scroller.inc.addEvent("click", this.events.scrollUp);
            this.scroller.dec.addEvent("click", this.events.scrollDown);
            this.slider.addEvent("change", function(w) {
                v.options.callback.delay(60, this, [ w ]);
                if (w < v.position) {
                    v.decrease(v.position - w)
                } else {
                    v.increase(w - v.position)
                }
                if (v.options.laze) {
                    v.lazeObject()
                }
            });
            this.attached = true;
            this.isAttach()
        },
        isAttach : function g() {
            if (this.scrollSize - this.areaSize > 0) {
                if (!this.element.hasEvent("mousewheel")
                        && this.options.hasWheel) {
                    this.element
                            .addEvent("mousewheel", this.events.manageWheel)
                }
                this.scroller.element.fade(1);
                this.slider.setRange([ 0, this.scrollSize - this.areaSize ])
            } else {
                this.element.removeEvents("mousewheel");
                this.scroller.element.fade(0)
            }
            this.slider.autosize();
            this.slider.set(0)
        },
        detach : function r() {
            this.element.removeEvent("mousewheel", this.events.manageWheel);
            this.slider.detach();
            this.scroller.each(function(s) {
                s.destroy()
            });
            this.generated = false;
            this.attached = false
        },
        increase : function k(s) {
            s = s || this.options.step;
            if (this.position + s > this.scrollSize - this.areaSize) {
                this.position = this.scrollSize - this.areaSize
            } else {
                this.position += s
            }
            this.scrolled.setStyle("margin-" + this.dir, -1 * this.position);
            this.fireEvent("increase", [ this.position ])
        },
        decrease : function a(s) {
            s = s || this.options.step;
            if (this.position - s < 0) {
                this.position = 0
            } else {
                this.position -= s
            }
            this.scrolled.setStyle("margin-" + this.dir, -1 * this.position);
            this.fireEvent("decrease", [ this.position ])
        },
        toElement : function j() {
            return this.element
        },
        lazeObject : function d() {
            if (this.scrolled.getChildren().length > 0) {
                this.scrolled.getChildren().each(
                        function(t, s) {
                            if (t.getDimensions()[this.axis]
                                    * (s + 1)
                                    - (this.areaSize + (this.isAttached ? 0
                                            : this.position)) <= t
                                    .getDimensions()[this.axis]) {
                                this.showLaze(t)
                            }
                        }.bind(this))
            }
            this.isAttached = false
        },
        showLaze : function m(s) {
            this.recursionLaze(s);
            s.morph("opacity", 1)
        },
        recursionLaze : function h(s) {
            if (s.getChildren().length > 0) {
                s.getChildren().each(function(t) {
                    this.recursionLaze(t)
                }.bind(this))
            } else {
                if (s.hasProperty("lazeSrc")) {
                    Asset.image(s.get("lazeSrc"), {
                        onLoad : function() {
                            s.setStyle("background", "#eee url("
                                    + this.get("src")
                                    + ") center center no-repeat");
                            s.removeProperty("lazeSrc");
                            this.dispose()
                        }
                    })
                }
            }
        },
        getSub : function p() {
            return this.scrollSize - this.areaSize
        },
        setStyle : function e(s, t) {
            return this.scrolled.getChildren().each(function(v, u) {
                if (s == 0 && u == 0) {
                    return t(v)
                }
                if (s == u) {
                    return t(v)
                }
            }.bind(this))
        }
    }, l = this.ScrollerBar = new Class(q)
}).apply(this, [ this, document.id ]);
var nav = {};
nav.getConfig = function() {
    var a = $("navigation");
    return function(c) {
        var b = a.getAttribute(c);
        return b ? b : ""
    }
}();
nav.movie = {
    "热映电影" : "/movie/searchMovie.xhtml",
    "即将上映" : "/movie/futureMovie.xhtml",
    "电影院" : gewa.util.cinemaCityPy,
    "快速购票" : "/cinema/searchOpi.xhtml",
    "电影活动" : "/activity/activityList.xhtml?tag=cinema",
    "电影资讯" : "/news/cinema"
};
if (gewa.util.cityType == 310000) {
    nav.drama = {
        "话剧" : "/drama/dramaList.xhtml?dramatype=drama",
        "演唱会" : "/drama/dramaList.xhtml?dramatype=concert",
        "音乐会" : "/drama/dramaList.xhtml?dramatype=musicale",
        "体育赛事" : "/drama/dramaList.xhtml?dramatype=race",
        "儿童亲子" : "/drama/dramaList.xhtml?dramatype=children",
        "追剧团" : "/drama/troupeIndex.xhtml",
        "演出活动" : "/activity/activityList.xhtml?tag=theatre"
    }
} else {
    nav.drama = {
        "话剧" : "/drama/dramaList.xhtml?dramatype=drama",
        "演唱会" : "/drama/dramaList.xhtml?dramatype=concert",
        "音乐会" : "/drama/dramaList.xhtml?dramatype=musicale",
        "体育赛事" : "/drama/dramaList.xhtml?dramatype=race",
        "儿童亲子" : "/drama/dramaList.xhtml?dramatype=children",
        "演出活动" : "/activity/activityList.xhtml?tag=theatre"
    }
}
nav.sport = {
    "预订场馆" : "/sport/sportList.xhtml",
    "活动" : "/activity/activityList.xhtml?tag=sport"
};
nav.gym = {
    "健身馆" : "/gym/searchGym.xhtml",
    "健身项目" : "/gym/courseList.xhtml",
    "教练" : "/gym/coachList.xhtml",
    "资讯" : "/news/gym"
};
nav.moreInfo = {
    "资讯" : "/news/cinema",
    "电影库" : "/movie/searchMovieStore.xhtml"
};
nav.sns = {
    "电影" : "/movie/",
    "演出" : "/drama/"
};
if (gewa.util.cityType == 310000) {
    nav.activity = {
        "活动首页" : "/activity/",
        "我的活动" : "/activity/myActivityList.xhtml"
    }
} else {
    nav.activity = {
        "活动首页" : "/activity/",
        "我的活动" : "/activity/myActivityList.xhtml"
    }
}
nav.syscount = {};
nav.login = function() {
    if (!$("global_check_login")) {
        return
    }
    var b = gewara.util.rtime();
    var a = Number.random(100000, 999999);
    GewaraUtil.sendLoad("global_check_login", GewaraUtil.basePath
            + "ajax/common/loadSubjectHead.xhtml?tagNo=" + b + a, {
        head : "header"
    }, function() {
        nav.userInfo();
        nav.snsInfo()
    })
};
function disMsgList(a) {
    a = $(a);
    a.getElements(".deleteThisMsg").addEvent("click", function(b) {
        gewa.util.confirm("确认删除此消息？", function() {
            gewara.util.sendRequest("/activity/message/hide.xhtml", {
                messageid : this.get("data-msgid")
            }, function(c) {
                if (c.success) {
                    this.getParent("li").dissolve()
                } else {
                    gewaUtil.alert(c.msg)
                }
            }.bind(this))
        }.bind(this))
    })
}
function reading(a, b) {
    gewara.util.sendRequest("/activity/message/reading.xhtml", {
        messageid : a,
        commentid : b
    }, function(c) {
    })
}
nav.closeTopNotice = function() {
    $("top_notice").dispose();
    $(document.html).setStyle("background-position", "0 50px");
    $(document.body).setStyle("background-position", "center 50px")
};
nav.getCityHtml = function(e, c, d) {
    if ($(e) && c.trim() && $chk(c.trim())) {
        var b = {};
        b.triger = new Element("b", {
            "class" : "ui_cityChoose",
            html : d,
            title : "点击切换城市"
        }).inject(e, "top");
        b.parent = $("ui_city_plugs");
        if (b.parent) {
            b.parent.toPos(b.triger, "bottomLeft", 0, 7)
        }
        b.triger.addEvent("click", function() {
            b.parent.toPos(b.triger, "bottomLeft", 0, 7);
            b.triger.toggleClass("ui_cityChoice");
            b.parent.toggleClass("none");
            b.close = b.parent.getElement('span[class*="ui_close"]');
            b.close.addEvent("click", function() {
                b.parent.addClass("none");
                b.triger.removeClass("ui_cityChoice")
            });
            f(b.parent, this, function() {
                if ($("hotCitys")) {
                    $("hotCitys").fireEvent("click")
                }
            });
            a(b.parent, this)
        })
    }
    var f = function(h, g, i) {
        h = $(h);
        document.addEvent("click", function(k) {
            var j = $(k.target);
            if (j != h && !h.contains(j) && j != g) {
                document.removeEvent("click", arguments.callee);
                g.removeClass("ui_cityChoice");
                h.addClass("none");
                if (i) {
                    i()
                }
            }
        })
    };
    var a = function(h) {
        h = $(h);
        var g = h.getElements("dl");
        g.addEvents({
            mouseover : function() {
                g.each(function(i) {
                    i.removeClass("select")
                });
                this.addClass("select")
            },
            mouseout : function() {
                this.removeClass("select")
            }
        })
    }
};
nav.bindEvent = function() {
    nav.navpanel = document
            .getElements("ul[lang=ishover] li:not(li.isDisabled)");
    if (nav.navpanel.length == 0) {
        return
    }
    nav.navpanel.each(function(b, a) {
        nav["bgcolor" + a] = b.getParent("div[lang=bgcolor]").getStyle(
                "background-color");
        nav["rgba" + a] = (nav["bgcolor" + a] == "transparent") ? "#ffffff"
                .hexToRgb(true) : (nav["bgcolor" + a].hexToRgb(true));
        nav["parent" + a] = new Element("div", {
            "class" : "doAccessKeys",
            styles : {
                border : "1px solid #dddddd",
                "border-top" : 0,
                background : "#fff",
                position : "absolute",
                top : 0,
                visibility : "hidden",
                width : b.getDimensions().x + 80,
                overflow : "hidden",
                "z-index" : 200
            }
        }).inject(document.body);
        nav["parent" + a].toPos(b, "bottomLeft", 0,
                (nav["bgcolor" + a] != "transparent") ? 0 : -1);
        nav["inner" + a] = new Element("div").inject(nav["parent" + a]);
        Object.each(nav[b.get("key")], function(c, d) {
            new Element("span", {
                html : d
            }).inject(new Element("a", {
                href : c
            }).inject(nav["inner" + a]))
        });
        b.hover(nav["parent" + a], null, function() {
            b.addClass("ishover");
            if (b.get("key") != null) {
                nav["parent" + a].toPos(b, "bottomLeft", 5, 0)
            } else {
                nav["parent" + a].addClass("none")
            }
        }, function() {
            b.removeClass("ishover")
        }, 0)
    })
};
nav.snsInfo = function() {
    var a = $("snsNavTag");
    if (a) {
        nav.parent = new Element("div", {
            "class" : "doAccessKeys",
            styles : {
                border : "1px solid #dddddd",
                "border-top" : 0,
                background : "#fff",
                position : "absolute",
                top : 0,
                visibility : "hidden",
                width : a.getDimensions().x + 50,
                overflow : "hidden",
                "z-index" : 200
            }
        }).inject(document.body);
        nav.parent.toPos(a, "bottomLeft", 0, 0);
        nav.inner = new Element("div").inject(nav.parent);
        Object.each(nav[a.get("key")], function(b, c) {
            new Element("span", {
                html : c
            }).inject(new Element("a", {
                href : b
            }).inject(nav.inner))
        });
        a.hover(nav.parent, null, function() {
            a.addClass("ishover");
            if (a.get("key") != null) {
                nav.parent.toPos(a, "bottomLeft", 60, 0)
            } else {
                nav.parent.addClass("none")
            }
        }, function() {
            a.removeClass("ishover")
        }, 0)
    }
};
nav.userInfo = function() {
    var a = $("global_user_infobox"), b = $("global_user_detail");
    if (!a) {
        return
    }
    if (a) {
        a.hover(b, null, function() {
            a.addClass("hover");
            b.toPos(a, "bottomLeft", -1, 0);
            nav.userOrder()
        }, function() {
            a.removeClass("hover")
        })
    }
};
nav.message = function() {
    if (!$("myMsg")) {
        return
    }
    var c = $("myMsg"), b = $("myMsgDetail");
    var a = {};
    c
            .hover(
                    b,
                    null,
                    function() {
                        c.addClass("hover");
                        $("message_list").innerHTML = '<div style="text-align:center;"><img src="http://static5.gewara.com/css/images/loading4.gif"/></div>';
                        b.toPos(c, "bottomRight", -360, 0)
                    }, function() {
                        c.removeClass("hover")
                    }, 0, function() {
                        if (this.retrieve("message") == null) {
                            var e = GewaraUtil.basePath
                                    + "activity/message/messageList.xhtml";
                            var d = {
                                header : "true"
                            };
                            GewaraUtil.sendLoad("", e, d, function(f) {
                                this.store("message", f);
                                a.msg.delay(600, null, [ f ])
                            }.bind(this))
                        } else {
                            a.msg
                                    .delay(600, null, [ this
                                            .retrieve("message") ])
                        }
                    });
    a.msg = function(e) {
        $("message_list").innerHTML = "";
        var d = new Element("div", {
            id : "scrollerMessagePanel",
            html : e,
            styles : {
                overflow : "hidden",
                position : "relative"
            }
        }).inject("message_list");
        if (d.getElements("li").length > 2) {
            b.setStyle("height", 360);
            $("scrollerMessage").setStyle("height",
                    $("message_list").getDimensions().y);
            d.setStyle("height", "360px");
            new ScrollerBar("scrollerMessagePanel", {
                wrapped : "scrollerMessage"
            })
        } else {
            b.setStyle("height", $("message_list").getDimensions().y)
        }
        if (nav.syscount.systemNew) {
            $("systemNew").addClass("haveNew")
        }
        if (nav.syscount.whenNew) {
            $("whenNew").addClass("haveNew")
        }
        disMsgList("message_list")
    }
};
nav.userOrder = function() {
    var b = $("global_userOrder"), c = $("golbal_orderDetail"), a = 0;
    b.hover(c, null, function() {
        if (this.retrieve("loadNavigationOrderList") == null) {
            var e = GewaraUtil.basePath
                    + "home/navigationOrderManageStatus.xhtml";
            var d = {};
            GewaraUtil.sendLoad($("ajaxOrderListDetail"), e, d, function(f) {
                a = 4 + $("ajaxOrderListDetail").getDimensions().y;
                c.tween("height", [ 200, a ])
            });
            this.store("loadNavigationOrderList", true)
        }
        c.tween("height", [ a, a ]);
        c.toPos(b, "topLeft", -315, 0)
    }, function() {
        b.removeClass("hover")
    }, 0)
};
nav.vdata = function() {
    if ($("skey")) {
        $("skey").focus();
        if ($("skey").value === "") {
            return false
        } else {
            return true
        }
    }
};
var cancleCall = null;
function checkUserName(a, b) {
    if ($(a).value.trim() == "") {
        gewa.util.focusErroe(a, "请输入" + b + "！");
        return false
    }
    (function() {
        if (!(GewaraUtil.isEmail($(a).value.trim()))
                && !GewaraUtil.isMobile($(a).value.trim())) {
            gewa.util.focusErroe(a, b + "格式错误！");
            return
        }
    }).delay(300)
}
function loginTo(d) {
    var c = gewara.util.httpsPath;
    if (d) {
        c = d
    }
    var g = $("loginname").value;
    var b = $("loginpassword").value;
    var a = $("dialogLoginCaptcha").value;
    var f = $("dialogLoginCaptchaInput").value;
    if (!$chk(g)) {
        $("loginname").focus();
        return
    } else {
        gewa.util.remmoveError($("loginname"))
    }
    if (!$chk(b)) {
        $("loginpassword").focus();
        return
    } else {
        gewa.util.remmoveError($("loginpassword"))
    }
    if (!$chk(f)) {
        $("dialogLoginCaptchaInput").focus();
        return
    } else {
        gewa.util.remmoveError($("dialogLoginCaptchaInput"))
    }
    var e = "";
    if ($("rememberMe") && $("rememberMe").checked) {
        e = $("rememberMe").value
    }
    GewaraUtil.sendRequest(GewaraUtil.basePath
            + "ajax/common/asynchLogin.xhtml", {
        username : $("loginname").value,
        password : $("loginpassword").value,
        captchaId : a,
        captcha : f,
        rememberMe : e
    }, function(h) {
        if (h.success) {
            GewaraUtil.member.login = true;
            GewaraUtil.member.memberid = h.id;
            GewaraUtil.member.nickname = h.realname;
            GewaraUtil.member.isMobile = h.isMobile;
            gewa.util.container.logins.dispose("logins");
            if (loginCallback) {
                loginCallback()
            }
        } else {
            if (h.errorMap.j_password) {
                gewa.util.focusErroe("loginpassword", h.errorMap.j_password);
                $("loginpassword").value = ""
            } else {
                if (h.errorMap.j_username) {
                    gewa.util.focusErroe("loginname", h.errorMap.j_username)
                } else {
                    gewa.util.focusErroe("dialogLoginCaptchaInput",
                            h.errorMap.captcha)
                }
            }
            if ($("dialogLoginCaptcha")) {
                GewaraUtil.refreshCaptcha("dialogLoginCaptcha", "", c)
            }
        }
    })
}
var cancleCall = null;
function showLogin(d, a, c) {
    var b = gewara.util.httpsPath;
    if (c) {
        b = c
    }
    if ($("logins")) {
        gewa.util.maskContent("", "logins", "格瓦拉登录", 600, "logins", "", "", "",
                false, "", function() {
                    gewaUtil.textOver(".focusText");
                    GewaraUtil.refreshCaptcha("dialogLoginCaptcha", "", b)
                })
    }
    if ($("isMoreLogin")) {
        $("isMoreLogin").toPos($$(".isMoreLogin")[0], "upperRight", 5, -12)
    }
    if (d) {
        loginCallback = d
    } else {
        loginCallback = null
    }
    if (a) {
        cancleCall = a
    }
}
gewa.util.focusErroe = function(d, e) {
    d = $(d).getParent();
    var c = d.getParent();
    if (!d.retrieve("error")) {
        d.setStyles({
            "border-color" : "#DD4B39"
        });
        var b = c.getStyle("margin-bottom").toInt(), a = new Element("div", {
            html : e,
            styles : {
                color : "#dd4b39",
                margin : "-" + b + "px 0 8px 0",
                "font-size" : "13px",
                "line-height" : "22px"
            }
        }).inject(c, "after");
        d.store("error", a)
    } else {
        d.setStyles({
            "border-color" : "#DD4B39"
        });
        d.retrieve("error").show().innerHTML = e
    }
};
gewa.util.remmoveError = function(a) {
    a = $(a).getParent();
    if (!a.retrieve("error")) {
        return
    }
    a.retrieve("error").hide();
    a.setStyles({
        "border-color" : "#CCCCCC",
        "box-shadow" : "none"
    })
};
nav.init = function() {
    nav.login();
    nav.getCityHtml("cityChoose", nav.getConfig("cityMap"), nav
            .getConfig("cookieCityname"));
    gewaUtil.textOver(".search_text");
    document.getElements("div[lang=bgcolor]").addEvent(
            "mouseenter",
            function() {
                nav.bindEvent();
                document.getElements("div[lang=bgcolor]").removeEvents(
                        "mouseenter")
            });
    if ($("skey")) {
        $("skey").addEvents(
                {
                    focus : function() {
                        this.getParents('div[class*="ui_t_search"]').addClass(
                                "ui_t_searchClicked")
                    },
                    blur : function() {
                        this.getParents('div[class*="ui_t_search"]')
                                .removeClass("ui_t_searchClicked")
                    }
                })
    }
};