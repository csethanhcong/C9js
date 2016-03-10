WIND.List = function (iddiv, options) {
    this.draggable = false;
    this.resizable = false;
    this.top = 10;
    this.left = 10;
    this.width = 200;
    this.height = 400;
    this.color = "#3366CC";
    this.border = "#3366CC 2px solid";
    this.name = "List Displayer";
    this.icon = lib_path + "images/lvizicon.png";
    this.header = false;
    this.removable = false;
    this.configurable = false;

    if (options.draggable == true) this.draggable = options.draggable;
    if (options.resizable == true) this.resizable = options.resizable;
    if (options.header == true) this.header = options.header;
    if (options.removable == true) this.removable = options.removable;
    if (options.configurable == true) this.configurable = options.configurable;
    if (this.draggable == true || this.removable == true || this.configurable == true) this.header = true;

    var outerDiv = document.createElement("div");
    outerDiv.id = iddiv + "Outer";
    outerDiv.style.position = "absolute";

    if (options.top) this.top = options.top;
    outerDiv.style.top = this.top + "px";

    if (options.left) this.left = options.left;
    outerDiv.style.left = this.left + "px";

    if (options.width) this.width = options.width;
    outerDiv.style.width = this.width + "px";

    if (options.height) this.height = options.height;
    outerDiv.style.height = this.height + "px";

    if (options.color) this.color = options.color;
    if (options.border) this.border = options.border;
    outerDiv.style.border = this.border;

    if (options.parentEl) this.parentEl = options.parentEl;
    if (options.name) this.name = options.name;
    if (options.icon) this.icon = options.icon;

    var textDiv;
    if (document.getElementById(iddiv))
        textDiv = document.getElementById(iddiv);
    else {
        textDiv = document.createElement("div");
        textDiv.id = iddiv;
    }
    textDiv.style.position = "absolute";
    textDiv.style.bottom = "2px";
    textDiv.style.overflow = "auto";
    textDiv.style.width = "100%";
    if (this.header) textDiv.style.height = "90%";
    else textDiv.style.height = "100%";
    //textDiv.style.marginTop = "20px";
    //textDiv.style.border = "blue 1px solid";
    outerDiv.appendChild(textDiv);

    if (options.parentEl) {
        this.parentEl = options.parentEl;
        document.getElementById(options.parentEl).appendChild(outerDiv);
    } else document.body.appendChild(outerDiv);

    // Draggable
    if (this.header) {
        var headerDiv = document.createElement("div");
        headerDiv.id = iddiv + "Handle";
        headerDiv.style.position = "absolute";
        headerDiv.style.width = "100%";
        headerDiv.style.height = "20px";
        headerDiv.style.backgroundColor = this.color;
        if (this.draggable) headerDiv.style.cursor = "move";
        headerDiv.style.zIndex = 2;

        var iconSpan = document.createElement("img");
        iconSpan.src = this.icon;
        iconSpan.alt = "[ ]";
        iconSpan.title = "ListDisplayer";
        iconSpan.style.cssFloat = "left";
        headerDiv.appendChild(iconSpan);

        var nameNode = document.createElement("span");
        nameNode.style.color = "#FFFFFF";
        nameNode.style.paddingLeft = "3px";
        nameNode.appendChild(document.createTextNode(this.name));
        headerDiv.appendChild(nameNode);

        var configDiv = document.createElement("div");
        configDiv.id = iddiv + "Configuration";
        configDiv.style.position = "absolute";
        configDiv.style.width = "100%";
        //configDiv.style.height = "100px";
        configDiv.style.marginTop = "20px";
        configDiv.style.backgroundColor = "#E4E4E4";
        configDiv.style.zIndex = 2;
        configDiv.style.display = "none";
        outerDiv.appendChild(configDiv);

        var label1 = document.createElement("span");
        label1.appendChild(document.createTextNode("Name of displayer: "));
        configDiv.appendChild(label1);
        configDiv.appendChild(document.createElement("br"));
        var input1 = document.createElement("input");
        input1.type = "text";
        input1.id = iddiv + "Configuration_Name";
        input1.name = iddiv + "Configuration_Name";
        input1.size = "30";
        configDiv.appendChild(input1);
        configDiv.appendChild(document.createElement("br"));
        var button1 = document.createElement("input");
        button1.type = "button";
        button1.id = iddiv + "Configuration_OK";
        button1.name = iddiv + "Configuration_OK";
        button1.value = "OK";
        configDiv.appendChild(button1);

        this.eventConfigured = new YAHOO.util.CustomEvent("eventConfigured");
        var that = this;
        button1.onclick = function () {
            var nomafficheur = document.getElementById(iddiv + "Configuration_Name").value;
            if ((nomafficheur != null) && (nomafficheur != '')) {
                that.name = nomafficheur;
                nameNode.removeChild(nameNode.firstChild);
                nameNode.appendChild(document.createTextNode(that.name));
            }
            configDiv.style.display = "none";
            that.eventConfigured.fire(that);
        };
        this.eventConfigured.subscribe(this.onConfigure, this, true);

        var button2 = document.createElement("input");
        button2.type = "button";
        button2.id = iddiv + "Configuration_Cancel";
        button2.name = iddiv + "Configuration_Cancel";
        button2.value = "Cancel";
        configDiv.appendChild(button2);
        button2.onclick = function () {
            configDiv.style.display = "none";
        };

        if (this.removable) {
            this.eventRemoved = new YAHOO.util.CustomEvent("eventRemoved");

            var removeSpan = document.createElement("img");
            removeSpan.src = lib_path + "images/close.png";
            removeSpan.alt = "X";
            removeSpan.title = "Delete";
            removeSpan.style.backgroundColor = "#EFEFEF";
            removeSpan.style.cssFloat = "right";
            removeSpan.style.cursor = "pointer";
            headerDiv.appendChild(removeSpan);
            //var that = this;
            removeSpan.onclick = function () {
                if (confirm("Do you really want to delete it?")) {
                    that.destroy();
                    that.eventRemoved.fire(that);
                }
            };
            this.eventRemoved.subscribe(this.onRemove, this, true);
        }

        if (this.configurable) {
            var configureSpan = document.createElement("img");
            configureSpan.src = lib_path + "images/gear.png";
            configureSpan.alt = "*";
            configureSpan.title = "Preferences";
            //configureSpan.style.backgroundColor = "#EFEFEF";
            configureSpan.style.cssFloat = "right";
            configureSpan.style.marginRight = "10px";
            configureSpan.style.cursor = "pointer";
            headerDiv.appendChild(configureSpan);
            configureSpan.onclick = function () {
                configDiv.style.display = "block";
            };
        }

        outerDiv.appendChild(headerDiv);

        if (this.draggable) {
            var dd = new YAHOO.util.DD(iddiv + "Outer");
            dd.setHandleElId(iddiv + "Handle");
            this.eventDragged = new YAHOO.util.CustomEvent("eventDragged");
            dd.on('endDragEvent', function (ev) {
                this.eventDragged.fire(this);
            }, this, true);

            this.eventDragged.subscribe(this.onDrag, this, true);

            if (options.parentEl) {
                var region = document.getElementById(options.parentEl);
                //Set left to x minus left 
                var left = outerDiv.offsetLeft - region.offsetLeft;
                //Set right to right minus x minus width 
                var right = region.offsetLeft + region.offsetWidth - outerDiv.offsetLeft - outerDiv.offsetWidth;
                //Set top to y minus top 
                var top = outerDiv.offsetTop - region.offsetTop;
                //Set bottom to bottom minus y minus height 
                var bottom = region.offsetTop + region.offsetHeight - outerDiv.offsetTop - outerDiv.offsetHeight;
                //Set the constraints based on the above calculations 
                dd.setXConstraint(left, right);
                dd.setYConstraint(top);
            } else {
                var left = outerDiv.offsetLeft;
                var top = outerDiv.offsetTop;
                dd.setXConstraint(left);
                dd.setYConstraint(top);
            }
        }
    }

    if (this.resizable) {
        var newdiv = document.createElement("div");
        newdiv.id = "yui-gen0";
        newdiv.className = "yui-resize-handle yui-resize-handle-r";
        var newindiv = document.createElement("div");
        newindiv.className = "yui-resize-handle-inner-r";
        newdiv.appendChild(newindiv);
        outerDiv.appendChild(newdiv);

        var newdiv = document.createElement("div");
        newdiv.id = "yui-gen1";
        newdiv.className = "yui-resize-handle yui-resize-handle-b";
        var newindiv = document.createElement("div");
        newindiv.className = "yui-resize-handle-inner-b";
        newdiv.appendChild(newindiv);
        outerDiv.appendChild(newdiv);

        var newdiv = document.createElement("div");
        newdiv.id = "yui-gen2";
        newdiv.className = "yui-resize-handle yui-resize-handle-br";
        var newindiv = document.createElement("div");
        newindiv.className = "yui-resize-handle-inner-br";
        newdiv.appendChild(newindiv);
        outerDiv.appendChild(newdiv);

        var dd2 = new YAHOO.util.Resize(iddiv + "Outer", {
            'minWidth': 10,
            'minHeight': 10,
            'maxWidth': 1200,
            'maxHeight': 800
        });
        this.eventResized = new YAHOO.util.CustomEvent("eventResized");
        dd2.on('endResize', function (ev) {
            this.eventResized.fire(this);
        }, this, true);
        this.eventResized.subscribe(this.onResize, this, true);
    }

    this.container = iddiv;
    //this.paragraphs = [];
    this.groups = [];
    this.interactionList = [];
    this.parts = [];
    this.annotations = [];
    this.parentDocument = null;
    this.toolbar = null;
};

WIND.List.prototype.destroy = function () {
    var listDiv = document.getElementById(this.container + "Outer");
    if (this.parentEl) {
        var newtab = [];
        for (var i = 0; i < this.parentDocument.viewers.length; i++) {
            if (this.parentDocument.viewers[i].container != this.container) {
                newtab.push(this.parentDocument.viewers[i]);
            }
        }
        this.parentDocument.viewers = newtab;
        document.getElementById(this.parentEl).removeChild(listDiv);
    } else document.body.removeChild(listDiv);
};

WIND.List.prototype.onDrag = function () {
    this.top = document.getElementById(this.container + "Outer").offsetTop;
    this.left = document.getElementById(this.container + "Outer").offsetLeft;
};

WIND.List.prototype.onResize = function () {
    this.width = document.getElementById(this.container + "Outer").offsetWidth;
    this.height = document.getElementById(this.container + "Outer").offsetHeight;
};
WIND.List.prototype.onConfigure = function () {}; // to override
WIND.List.prototype.onRemove = function () {}; // to override

WIND.List.prototype.addToolBar = function () {
    if (this.toolbar == null) {
        var tbdiv = document.createElement("div");
        tbdiv.style.position = "absolute";
        tbdiv.style.top = "22px";
        tbdiv.style.right = "10px";
        tbdiv.style.zIndex = "1000";

        var boldButton = document.createElement("input");
        boldButton.type = "button";
        boldButton.title = "Bold";
        //boldButton.style.top = "2px";
        //boldButton.style.left = "5px";
        boldButton.style.height = "24px";
        boldButton.style.width = "30px";
        boldButton.style.background = "url(http://yui.yahooapis.com/2.8.0r4/build/editor/assets/skins/sam/editor-sprite.gif) no-repeat 5px 2px";
        //boldButton.style.backgroundPosition = "5 2px";
        boldButton.style.border = "#808080 1px solid";
        boldButton.style.cursor = "pointer";
        //boldButton.onclick = function() { mm.zoomIn(); }
        tbdiv.appendChild(boldButton);

        var italicButton = document.createElement("input");
        italicButton.type = "button";
        italicButton.title = "Italic";
        //italicButton.style.top = "2px";
        //italicButton.style.left = "5px";
        italicButton.style.height = "24px";
        italicButton.style.width = "30px";
        italicButton.style.background = "url(http://yui.yahooapis.com/2.8.0r4/build/editor/assets/skins/sam/editor-sprite.gif) no-repeat 5px -34px";
        //italicButton.style.backgroundPosition = "5 -34px";
        italicButton.style.border = "#808080 1px solid";
        italicButton.style.cursor = "pointer";
        //italicButton.onclick = function() { mm.zoomIn(); }
        tbdiv.appendChild(italicButton);

        var underlineButton = document.createElement("input");
        underlineButton.type = "button";
        underlineButton.title = "Underline";
        //underlineButton.style.top = "2px";
        //underlineButton.style.left = "5px";
        underlineButton.style.height = "24px";
        underlineButton.style.width = "30px";
        underlineButton.style.background = "url(http://yui.yahooapis.com/2.8.0r4/build/editor/assets/skins/sam/editor-sprite.gif) no-repeat 5px -70px";
        //underlineButton.style.backgroundPosition = "5 -70px";
        underlineButton.style.border = "#808080 1px solid";
        underlineButton.style.cursor = "pointer";
        //underlineButton.onclick = function() { mm.zoomIn(); }
        tbdiv.appendChild(underlineButton);

        var strikethroughButton = document.createElement("input");
        strikethroughButton.type = "button";
        strikethroughButton.title = "Strike Through";
        //underlineButton.style.top = "2px";
        //underlineButton.style.left = "5px";
        strikethroughButton.style.height = "24px";
        strikethroughButton.style.width = "30px";
        strikethroughButton.style.background = "url(http://yui.yahooapis.com/2.8.0r4/build/editor/assets/skins/sam/editor-sprite.gif) no-repeat 5px -106px";
        //strikethroughButton.style.backgroundPosition = "5 -106px";
        strikethroughButton.style.border = "#808080 1px solid";
        strikethroughButton.style.cursor = "pointer";
        //strikethroughButton.onclick = function() { mm.zoomIn(); }
        tbdiv.appendChild(strikethroughButton);

        var fontcolorButton = document.createElement("input");
        fontcolorButton.type = "button";
        fontcolorButton.title = "Font Color";
        //fontcolorButton.style.top = "2px";
        //fontcolorButton.style.left = "5px";
        fontcolorButton.style.height = "24px";
        fontcolorButton.style.width = "30px";
        fontcolorButton.style.background = "url(http://yui.yahooapis.com/2.8.0r4/build/editor/assets/skins/sam/editor-sprite.gif) no-repeat 5px -214px";
        //fontcolorButton.style.backgroundPosition = "5 -214px";
        fontcolorButton.style.border = "#808080 1px solid";
        fontcolorButton.style.cursor = "pointer";
        //fontcolorButton.onclick = function() { mm.zoomIn(); }
        tbdiv.appendChild(fontcolorButton);

        var bgcolorButton = document.createElement("input");
        bgcolorButton.type = "button";
        bgcolorButton.title = "Background Color";
        //bgcolorButton.style.top = "2px";
        //bgcolorButton.style.left = "5px";
        bgcolorButton.style.height = "24px";
        bgcolorButton.style.width = "30px";
        bgcolorButton.style.background = "url(http://yui.yahooapis.com/2.8.0r4/build/editor/assets/skins/sam/editor-sprite.gif) no-repeat 5px -286px";
        //bgcolorButton.style.backgroundPosition = "5 -286px";
        bgcolorButton.style.border = "#808080 1px solid";
        bgcolorButton.style.cursor = "pointer";
        //bgcolorButton.onclick = function() { mm.zoomIn(); }
        tbdiv.appendChild(bgcolorButton);

        document.getElementById(this.container + "Outer").appendChild(tbdiv);
        this.toolbar = tbdiv;
    } else this.toolbar.style.visibility = "visible";
};
WIND.List.prototype.removeToolBar = function () {
    if (this.toolbar != null)
        this.toolbar.style.visibility = "hidden";
};

/* 20/02/2010 */
WIND.List.prototype.addAnnotation = function (annotation) {
    var valid = false;
    for (var i = 0; i < annotation.annotedObjects.length; i++) {
        if (annotation.annotedObjects.type == "list") {
            valid = true;
            break;
        }
    }
    this.annotations.push(annotation);
};
WIND.List.prototype.createAnnotation = function (type, entity, group, item, options) {
    var textparts = this.createSensiblePart(group, item, options);
    var annotation = new WIND.Annotation(type, entity, textparts);
    this.annotations.push(annotation);
    return annotation;
};
WIND.List.prototype.getValue = function () {
    return {
        id: this.container,
        ref: this.ref,
        rdftype: "http://erozate.iutbayonne.univ-pau.fr/wind#ListComponent",
        name: this.name,
        position: {
            top: this.top,
            left: this.left
        },
        size: {
            width: this.width,
            height: this.height
        },
        style: {
            color: this.color,
            border: this.border,
            icon: this.icon
        },
        annotation: this.annotation,
        display: this.display,
        load: this.load,
        parameter: {
            draggable: (this.draggable) ? "yes" : "no",
            resizable: (this.resizable) ? "yes" : "no",
            removable: (this.removable) ? "yes" : "no",
            configurable: (this.configurable) ? "yes" : "no",
            header: (this.header) ? "yes" : "no",
            toolbar: "no"
        }
    }
};

WIND.List.prototype.activateInteractions = function () {
    for (var i = 0; i < this.interactionList.length; i++) {
        this.activateInteraction(this.interactionList[i]);
    }
};
WIND.List.prototype.activateInteraction = function (interact) {
    var so = interact.source;
    var evt = interact.event;
    var tmp = interact.reactions;
    var that = this;
    if (so instanceof Array) {
        for (var k = 0; k < so.length; k++) {
            so[k].setStyle("color:blue;text-decoration:underline;cursor:pointer;");
            this.addListener(so[k].object, evt, function (e) {
                for (var j = 0; j < tmp.length; j++) {
                    var cible = tmp[j].target;
                    // 7 mars 2011
                    if (cible instanceof WIND.LiveSensiblePart) {
                        var evtObj = YAHOO.util.Event.getTarget(e);
                        var clicked;
                        for (var x = 0; x < that.parts.length; x++) {
                            if (that.parts[x].object == evtObj.id) {
                                clicked = that.parts[x];
                                break;
                            }
                        }
                        if (clicked) {
                            var cibleViewer = cible.viewer;
                            var f = cible.func;
                            var cibleAnnotation = cibleViewer.annotations;
                            for (var y = 0; y < cibleAnnotation.length; y++) {
                                if ((cibleAnnotation[y].semantics == clicked.annotation.semantics) && (cibleAnnotation[y].entity == clicked.annotation.entity)) {
                                    if (f == "prefecture_of_town") {
                                        var xhr = createXHR();
                                        xhr.onreadystatechange = function () {
                                            if (xhr.readyState == 4) {
                                                if (xhr.status == 200) {
                                                    var results = xhr.responseXML;
                                                    var pref = results.getElementsByTagName("geoname")[0];
                                                    var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                        "style": "strokeColor:#008800,strokeWidth:5,fillColor:#0080AA"
                                                    });
                                                    var realTarget = mpref.annotedObjects;
                                                    for (var z = 0; z < realTarget.length; z++) {
                                                        realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                                    }
                                                }
                                            }
                                        };
                                        xhr.open("GET", lib_path + "php/prefecture_of_town.php?place=" + cibleAnnotation[y].entity, false);
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                                        xhr.send(null);
                                    } else if (f == "prefecture_of_department") {
                                        var xhr = createXHR();
                                        xhr.onreadystatechange = function () {
                                            if (xhr.readyState == 4) {
                                                if (xhr.status == 200) {
                                                    var results = xhr.responseXML;
                                                    var pref = results.getElementsByTagName("geoname")[0];
                                                    var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                        "style": "strokeColor:#008800,strokeWidth:5,fillColor:#0080AA"
                                                    });
                                                    var realTarget = mpref.annotedObjects;
                                                    for (var z = 0; z < realTarget.length; z++) {
                                                        realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                                    }
                                                }
                                            }
                                        };
                                        xhr.open("GET", lib_path + "php/prefecture_of_department.php?place=" + cibleAnnotation[y].entity, false);
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                                        xhr.send(null);
                                    } else if (f == "department_of_town") {
                                        var xhr = createXHR();
                                        xhr.onreadystatechange = function () {
                                            if (xhr.readyState == 4) {
                                                if (xhr.status == 200) {
                                                    var results = xhr.responseXML;
                                                    var pref = results.getElementsByTagName("geoname")[0];
                                                    var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_dept")[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                        "style": "strokeColor:#008800,strokeWidth:5,fillColor:#0080AA"
                                                    });
                                                    var realTarget = mpref.annotedObjects;
                                                    for (var z = 0; z < realTarget.length; z++) {
                                                        realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                                    }
                                                }
                                            }
                                        };
                                        xhr.open("GET", lib_path + "php/department_of_town.php?place=" + cibleAnnotation[y].entity, false);
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                                        xhr.send(null);
                                    } else {
                                        var realTarget = cibleAnnotation[y].annotedObjects;
                                        for (var z = 0; z < realTarget.length; z++) {
                                            realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    } else {
                        cible.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                    }
                }
            });
        }
    } else {
        so.setStyle("color:blue;text-decoration:underline;cursor:pointer;");
        this.addListener(so.object, evt, function (e) {
            for (var j = 0; j < tmp.length; j++) {
                var cible = tmp[j].target;
                // 7 mars 2011
                if (cible instanceof WIND.LiveSensiblePart) {
                    var evtObj = YAHOO.util.Event.getTarget(e);
                    var clicked;
                    for (var x = 0; x < that.parts.length; x++) {
                        if (that.parts[x].object == evtObj.id) {
                            clicked = that.parts[x];
                            break;
                        }
                    }
                    if (clicked) {
                        var cibleViewer = cible.viewer;
                        var f = cible.func;
                        var cibleAnnotation = cibleViewer.annotations;
                        for (var y = 0; y < cibleAnnotation.length; y++) {
                            if ((cibleAnnotation[y].semantics == clicked.annotation.semantics) && (cibleAnnotation[y].entity == clicked.annotation.entity)) {
                                if (f == "prefecture_of_town") {
                                    var xhr = createXHR();
                                    xhr.onreadystatechange = function () {
                                        if (xhr.readyState == 4) {
                                            if (xhr.status == 200) {
                                                var results = xhr.responseXML;
                                                var pref = results.getElementsByTagName("geoname")[0];
                                                var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                    "style": "strokeColor:#008800,strokeWidth:5,fillColor:#0080AA"
                                                });
                                                var realTarget = mpref.annotedObjects;
                                                for (var z = 0; z < realTarget.length; z++) {
                                                    realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                                }
                                            }
                                        }
                                    };
                                    xhr.open("GET", lib_path + "php/prefecture_of_town.php?place=" + cibleAnnotation[y].entity, false);
                                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                                    xhr.send(null);
                                } else if (f == "prefecture_of_department") {
                                    var xhr = createXHR();
                                    xhr.onreadystatechange = function () {
                                        if (xhr.readyState == 4) {
                                            if (xhr.status == 200) {
                                                var results = xhr.responseXML;
                                                var pref = results.getElementsByTagName("geoname")[0];
                                                var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                    "style": "strokeColor:#008800,strokeWidth:5,fillColor:#0080AA"
                                                });
                                                var realTarget = mpref.annotedObjects;
                                                for (var z = 0; z < realTarget.length; z++) {
                                                    realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                                }
                                            }
                                        }
                                    };
                                    xhr.open("GET", lib_path + "php/prefecture_of_department.php?place=" + cibleAnnotation[y].entity, false);
                                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                                    xhr.send(null);
                                } else if (f == "department_of_town") {
                                    var xhr = createXHR();
                                    xhr.onreadystatechange = function () {
                                        if (xhr.readyState == 4) {
                                            if (xhr.status == 200) {
                                                var results = xhr.responseXML;
                                                var pref = results.getElementsByTagName("geoname")[0];
                                                var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_dept")[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                    "style": "strokeColor:#008800,strokeWidth:5,fillColor:#0080AA"
                                                });
                                                var realTarget = mpref.annotedObjects;
                                                for (var z = 0; z < realTarget.length; z++) {
                                                    realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                                }
                                            }
                                        }
                                    };
                                    xhr.open("GET", lib_path + "php/department_of_town.php?place=" + cibleAnnotation[y].entity, false);
                                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                                    xhr.send(null);
                                } else {
                                    var realTarget = cibleAnnotation[y].annotedObjects;
                                    for (var z = 0; z < realTarget.length; z++) {
                                        realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
                                    }
                                }
                                break;
                            }
                        }
                    }
                } else {
                    cible.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                }
            }
        });
    }
};
WIND.List.prototype.addListener = function (object, evt, callback) {
    if (document.getElementById(object)) {
        if (evt == 'click') {
            //document.getElementById(object).style.cursor = 'pointer';
            document.getElementById(object).onclick = callback;
        } else if (evt == 'mouseover') {
            document.getElementById(object).onmouseover = callback;
        } else if (evt == 'mouseout') {
            document.getElementById(object).onmouseout = callback;
        }
    }
};

WIND.List.prototype.loadRDFFile = function (php, url) {
    var xhr = createXHR();
    xhr.open("GET", php + "?rdf=" + url, false);
    xhr.send(null);
    var in_array = function (arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    };
    if (xhr.status == 200) {
        var resultat = YAHOO.lang.JSON.parse(xhr.responseText);
        var res = resultat.annotations;
        //var group = this.createGroup();
        var keylist = new Array();
        var grouplist = new Array();
        var uncategorized = new Array();
        for (var i = 0; i < res.length; i++) {
            if (res[i].thematicInfo && res[i].thematicInfo.length > 0) {
                for (var j = 0; j < res[i].thematicInfo.length; j++) {
                    if (!in_array(keylist, res[i].thematicInfo[j].category)) {
                        keylist.push(res[i].thematicInfo[j].category);
                        grouplist[res[i].thematicInfo[j].category] = new Array();
                    }
                    grouplist[res[i].thematicInfo[j].category].push(res[i].entityName);
                }
            } else
                uncategorized.push(res[i].entityName);
            //group.addItem(res[i].entityName);
            //var lp = this.createSensiblePart(1, (i+1));
            //var annot = new WIND.Annotation(res[i].spatialInfo[0].geotype, res[i].entityName, [lp]);
            //this.annotations.push(annot);
        }
        for (var i = 0; i < keylist.length; i++) {
            var group = this.createGroup(keylist[i]);
            for (var j = 0; j < grouplist[keylist[i]].length; j++) {
                group.addItem(grouplist[keylist[i]][j]);
            }
        }
        if (uncategorized.length > 0) {
            var group = this.createGroup("Uncategorized");
            for (var j = 0; j < uncategorized.length; j++) {
                group.addItem(uncategorized[j]);
            }
        }
    } else {
        document.getElementById(this.container).innerHTML = "Error: " + url + " " + xhr.status + " " + xhr.statusText;
    }
};
// Text.Part class
WIND.List.Part = function (elem) {
    this.object = elem;
    //this.paragraph = null;
    //this.tokenId = null;
    this.group = null;
    this.itemId = null;
    this.word = null;
};

// The WIND.TextPart object inherits all of the WIND.SensiblePart object's methods
WIND.List.Part.prototype = new WIND.SensiblePart('list');

WIND.List.Part.prototype.highlight = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.backgroundColor = 'blue';
        obj.style.color = 'white';
    }
};
WIND.List.Part.prototype.bold = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.fontWeight = 'bold';
    }
};
WIND.List.Part.prototype.italicize = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.fontStyle = 'italic';
    }
};
WIND.List.Part.prototype.underline = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.textDecoration = 'underline';
    }
};
WIND.List.Part.prototype.blink = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.textDecoration = 'blink';
    }
};
WIND.List.Part.prototype.setStyleByClass = function (css) {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.className = css;
    }
};
WIND.List.Part.prototype.setStyle = function (styleString) {
    var obj = document.getElementById(this.object);
    if (obj) {
        var decors = styleString.split(";");
        var decor;
        for (var i = 0; i < decors.length; i++) {
            decor = decors[i];
            if (decor.split(":")[0] == 'color') obj.style.color = decor.split(":")[1];
            if (decor.split(":")[0] == 'background-color') obj.style.backgroundColor = decor.split(":")[1];
            if (decor.split(":")[0] == 'font-weight') obj.style.fontWeight = decor.split(":")[1];
            if (decor.split(":")[0] == 'font-style') obj.style.fontStyle = decor.split(":")[1];
            if (decor.split(":")[0] == 'text-decoration') obj.style.textDecoration = decor.split(":")[1];
            if (decor.split(":")[0] == 'cursor') obj.style.cursor = decor.split(":")[1];
        }
    }
};
WIND.List.Part.prototype.show = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.display = "block";
    }
};
WIND.List.Part.prototype.hide = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.display = "none";
    }
};

WIND.List.Group = function (idgroup) {
    this.object = idgroup;
    this.items = [];
    //this.text = null;
};
WIND.List.Group.prototype = new WIND.List.Part(this.object);
WIND.List.prototype.createGroup = function (name, options) {
    var len = this.groups.length + 1;
    var groupDiv = document.createElement("div");
    groupDiv.id = this.container + "_group" + len;
    groupDiv.style.margin = "0px 10px 10px 10px";
    groupDiv.style.textAlign = "left";
    //groupDiv.style.border = "red 1px solid";
    if (options) {
        if (options.display) groupDiv.style.display = "block";
        else groupDiv.style.display = "none";
    } else groupDiv.style.display = "block";
    document.getElementById(this.container).appendChild(groupDiv);
    var groupHeader = document.createElement("div");
    groupHeader.innerHTML = "<b>" + name + "</b>";
    groupDiv.appendChild(groupHeader);
    var groupUL = document.createElement("ul");
    groupUL.id = this.container + "_groupUL" + len;
    groupUL.title = name;
    //groupUL.style.padding = 0;
    groupUL.style.margin = 0;
    groupDiv.appendChild(groupUL);
    var grou = new WIND.List.Group(this.container + "_groupUL" + len);
    this.groups.push(grou);
    return grou;
};
WIND.List.Group.prototype.setItems = function (itemTab) {
    this.items = itemTab;
    var groupUL = document.getElementById(this.object);
    for (var i = 0; i < this.items.length; i++) {
        var item = document.createElement("li");
        item.id = this.object + "_item" + (i + 1);
        item.appendChild(document.createTextNode(this.items[i]));
        //item.innerHTML = this.items[i];
        groupUL.appendChild(item);
    }
};
WIND.List.Group.prototype.addItem = function (item) {
    this.items.push(item);
    var groupUL = document.getElementById(this.object);
    var itemLi = document.createElement("li");
    itemLi.id = this.object + "_item" + (this.items.length);
    itemLi.appendChild(document.createTextNode(item));
    //item.innerHTML = this.items[i];
    groupUL.appendChild(itemLi);
};

WIND.List.prototype.createSensiblePart = function (groupID, itemID, options) {
    var iditem = this.container + "_groupUL" + groupID + "_item" + itemID;
    var lp = new WIND.List.Part(iditem);
    lp.viewer = this;
    lp.group = groupID;
    lp.itemId = itemID;
    lp.word = this.groups[groupID - 1].items[itemID - 1];
    this.parts.push(lp);
    if (options && options.style) {
        lp.setStyle(options.style);
    } else {
        lp.setStyle("text-decoration:underline");
    }
    return lp;
};
WIND.List.prototype.createSensiblePartByWord = function (exp, options) {
    var mots;
    var textparts = [];
    var idspan, tp;
    var cutExp = WIND.Text.tokenizer(exp);
    var match;
    for (var i = 0; i < this.paragraphs.length; i++) {
        mots = this.paragraphs[i].words;
        for (var j = 0; j < mots.length - cutExp.length; j++) {
            match = true;
            for (var k = 0; k < cutExp.length; k++) {
                if (!(mots[j + k] == cutExp[k])) {
                    match = false;
                    break;
                }
            }
            if (match) {
                for (var k = 0; k < cutExp.length; k++) {
                    idspan = this.container + "_paragraph" + (i + 1) + "_token" + (j + k + 1);
                    tp = new WIND.Text.Part(idspan);
                    tp.viewer = this;
                    textparts.push(tp);
                    this.parts.push(tp);
                }
            }
        }
    }
    if (options && options.style) {
        for (var i = 0; i < textparts.length; i++) {
            textparts[i].setStyle(options.style);
        }
    } else {
        for (var i = 0; i < textparts.length; i++) {
            textparts[i].setStyle("color:blue;text-decoration:underline");
        }
    }
    return textparts;
};