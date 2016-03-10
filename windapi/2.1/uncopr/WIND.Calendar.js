WIND.Calendar = function (iddiv, options) {
    this.draggable = false;
    this.resizable = false;
    this.top = 10;
    this.left = 10;
    this.width = 600;
    this.height = 400;
    this.color = "#3366CC";
    this.border = "#3366CC 2px solid";
    this.name = "Calendar Displayer";
    this.icon = lib_path + "images/cvizicon.png";
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
    //outerDiv.style.border = this.color + " 2px solid";

    if (options.border) this.border = options.border;
    outerDiv.style.border = this.border;

    if (options.parentEl) this.parentEl = options.parentEl;
    if (options.name) this.name = options.name;
    if (options.icon) this.icon = options.icon;
    /*
	var headerDiv = document.createElement("div");
	headerDiv.id = iddiv + "Handle";
	headerDiv.style.position = "absolute";
	headerDiv.style.width = "100%";
	headerDiv.style.height = "20px";
	headerDiv.style.backgroundColor = this.color;
	if (this.draggable) headerDiv.style.cursor = "move";
	headerDiv.style.zIndex = 2;
	//headerDiv.appendChild(document.createTextNode("Calendar"));
	outerDiv.appendChild(headerDiv);
	*/

    var navControlDiv = document.createElement("div");
    navControlDiv.id = iddiv + "navControlDiv";
    navControlDiv.className = "navControl";
    navControlDiv.style.position = "absolute";
    navControlDiv.style.top = "22px";
    navControlDiv.style.left = "2px";
    outerDiv.appendChild(navControlDiv);

    var viewControlDiv = document.createElement("div");
    viewControlDiv.id = iddiv + "viewControlDiv";
    viewControlDiv.className = "viewControl";
    viewControlDiv.style.position = "absolute";
    viewControlDiv.style.top = "22px";
    viewControlDiv.style.right = "2px";
    outerDiv.appendChild(viewControlDiv);

    var calendarDiv;
    if (document.getElementById(iddiv))
        calendarDiv = document.getElementById(iddiv);
    else {
        calendarDiv = document.createElement("div");
        calendarDiv.id = iddiv;
    }
    calendarDiv.style.position = "absolute";
    calendarDiv.style.bottom = "2px";
    calendarDiv.style.width = "100%";
    //calendarDiv.style.height = "90%";
    if (this.header) calendarDiv.style.height = "90%";
    else calendarDiv.style.height = "100%";
    outerDiv.appendChild(calendarDiv);
    //document.body.appendChild(outerDiv);
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
        iconSpan.title = "CalendarDisplayer";
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
        //dd2.on('endResize', function(ev) {
        //this.eventConfigured.fire(this);
        //}, this, true);


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
            var that = this;
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
            'minWidth': 160,
            'minHeight': 160,
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

    // The pivot date for the current navigation view
    this.currentPivotDate = new Date();
    // Indicateur le début de la semaine: '0' = dimanche, '1' = lundi (Nhan)
    this.firstDayOfWeek = 1;
    this.viewMode = "month";

    this.interactionList = [];
    this.parts = [];
    this.annotations = [];
    this.parentDocument = null;
    // display the calendar
    this.render();
};

WIND.Calendar.prototype.destroy = function () {
    var calendarDiv = document.getElementById(this.container + "Outer");
    if (this.parentEl) {
        var newtab = [];
        for (var i = 0; i < this.parentDocument.viewers.length; i++) {
            if (this.parentDocument.viewers[i].container != this.container) {
                newtab.push(this.parentDocument.viewers[i]);
            }
        }
        this.parentDocument.viewers = newtab;
        document.getElementById(this.parentEl).removeChild(calendarDiv);
    } else document.body.removeChild(calendarDiv);
};

WIND.Calendar.prototype.onDrag = function () {
    this.top = document.getElementById(this.container + "Outer").offsetTop;
    this.left = document.getElementById(this.container + "Outer").offsetLeft;
};

WIND.Calendar.prototype.onResize = function () {
    this.width = document.getElementById(this.container + "Outer").offsetWidth;
    this.height = document.getElementById(this.container + "Outer").offsetHeight;
};

WIND.Calendar.prototype.onConfigure = function () {}; // to override
WIND.Calendar.prototype.onRemove = function () {}; // to override

WIND.Calendar.prototype.activateInteractions = function () {
    // For calendar's interactions
    for (var i = 0; i < this.parts.length; i++) {
        this.parts[i].setStyle("background-color:#CFDFFE");
    }
    for (var i = 0; i < this.interactionList.length; i++) {
        this.activateInteraction(this.interactionList[i]);
    }
};
WIND.Calendar.prototype.activateInteraction = function (interact) {
    var so = interact.source;
    var evt = interact.event;
    var tmp = interact.reactions;
    if (so instanceof Array) {
        for (var k = 0; k < so.length; k++) {
            this.addListener(so[k].object, evt, function () {
                for (var j = 0; j < tmp.length; j++) {
                    tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                }
            });
        }
    } else {
        this.addListener(so.object, evt, function () {
            for (var j = 0; j < tmp.length; j++) {
                tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
            }
        });
    }
};
WIND.Calendar.prototype.addListener = function (object, evt, callback) {
    if (document.getElementById(object)) {
        if (evt == 'click') {
            document.getElementById(object).style.cursor = 'pointer';
            document.getElementById(object).onclick = callback;
        } else if (evt == 'mouseover') {
            document.getElementById(object).onmouseover = callback;
        } else if (evt == 'mouseout') {
            document.getElementById(object).onmouseout = callback;
        }
    }
};

/* 20/02/2010 */
WIND.Calendar.prototype.addAnnotation = function (annotation) {
    var valid = false;
    for (var i = 0; i < annotation.annotedObjects.length; i++) {
        if (annotation.annotedObjects.type == "calendar") {
            valid = true;
            break;
        }
    }
    this.annotations.push(annotation);
};
WIND.Calendar.prototype.createAnnotation = function (type, entity, startTime, endTime, event) {
    var calendarpart = this.createSensiblePart(startTime, endTime, event);
    var annotation = new WIND.Annotation(type, entity, calendarpart);
    this.annotations.push(annotation);
    return annotation;
};
WIND.Calendar.prototype.getValue = function () {
    return {
        id: this.container,
        ref: this.ref,
        rdftype: "http://erozate.iutbayonne.univ-pau.fr/wind#CalendarComponent",
        name: this.name,
        innerText: this.innerText,
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
WIND.Calendar.prototype.getValuetoXML = function () {
    var namespaceURI = "http://erozate.iutbayonne.univ-pau.fr/wind/";
    var doc = createXMLDocument('Viewer', namespaceURI);
    doc.documentElement.setAttribute("type", "CalendarViewer");
    doc.documentElement.setAttribute("id", this.container);

    var styleNode = createElementNS(namespaceURI, "style", doc);
    styleNode.setAttribute("left", this.left);
    styleNode.setAttribute("top", this.top);
    styleNode.setAttribute("width", this.width);
    styleNode.setAttribute("height", this.height);
    styleNode.setAttribute("color", this.color);
    doc.documentElement.appendChild(styleNode);

    var dragNode = createElementNS(namespaceURI, "draggable", doc);
    dragNode.appendChild(doc.createTextNode(this.draggable));
    doc.documentElement.appendChild(dragNode);

    var resizeNode = createElementNS(namespaceURI, "resizable", doc);
    resizeNode.appendChild(doc.createTextNode(this.resizable));
    doc.documentElement.appendChild(resizeNode);

    var viewNode = createElementNS(namespaceURI, "mode", doc);
    viewNode.appendChild(doc.createTextNode(this.viewMode));
    doc.documentElement.appendChild(viewNode);

    for (var i = 0; i < this.annotations.length; i++) {
        var annotationNode = createElementNS(namespaceURI, "Annotation", doc);
        annotationNode.setAttribute("id", this.container + "_annotation" + (i + 1));
        var typeNode = createElementNS(namespaceURI, "semantics", doc);
        typeNode.appendChild(doc.createTextNode(this.annotations[i].semantics));
        annotationNode.appendChild(typeNode);
        //Entity
        var entityNode = createElementNS(namespaceURI, "entity", doc);
        entityNode.appendChild(doc.createTextNode(this.annotations[i].entity));
        annotationNode.appendChild(entityNode);
        var annot = this.annotations[i];
        for (var j = 0; j < annot.annotedObjects.length; j++) {
            var cp = annot.annotedObjects[j];
            var cpNode = createElementNS(namespaceURI, "CalendarPart", doc);
            cpNode.setAttribute("startTime", cp.startTime);
            cpNode.setAttribute("endTime", cp.endTime);
            var eventNode = createElementNS(namespaceURI, "event", doc);
            eventNode.appendChild(doc.createTextNode(cp.event));
            cpNode.appendChild(eventNode);
            annotationNode.appendChild(cpNode);
        }
        doc.documentElement.appendChild(annotationNode);
    }
    return doc;
};
WIND.Calendar.prototype.getValuetoXMLString = function () {
    var doc = this.getValuetoXML();
    var str = serializeNode(doc);
    return str;
};
WIND.Calendar.prototype.getValuetoXMLNode = function (doc) {
    var namespaceURI = "http://erozate.iutbayonne.univ-pau.fr/wind/";
    var viewerNode = createElementNS(namespaceURI, "Viewer", doc);
    viewerNode.setAttribute("type", "CalendarViewer");
    viewerNode.setAttribute("id", this.container);

    var styleNode = createElementNS(namespaceURI, "style", doc);
    styleNode.setAttribute("left", this.left);
    styleNode.setAttribute("top", this.top);
    styleNode.setAttribute("width", this.width);
    styleNode.setAttribute("height", this.height);
    styleNode.setAttribute("color", this.color);
    viewerNode.appendChild(styleNode);

    var dragNode = createElementNS(namespaceURI, "draggable", doc);
    dragNode.appendChild(doc.createTextNode(this.draggable));
    viewerNode.appendChild(dragNode);

    var resizeNode = createElementNS(namespaceURI, "resizable", doc);
    resizeNode.appendChild(doc.createTextNode(this.resizable));
    viewerNode.appendChild(resizeNode);

    var viewNode = createElementNS(namespaceURI, "mode", doc);
    viewNode.appendChild(doc.createTextNode(this.viewMode));
    viewerNode.appendChild(viewNode);

    for (var i = 0; i < this.annotations.length; i++) {
        var annotationNode = createElementNS(namespaceURI, "Annotation", doc);
        annotationNode.setAttribute("id", this.container + "_annotation" + (i + 1));
        var typeNode = createElementNS(namespaceURI, "semantics", doc);
        typeNode.appendChild(doc.createTextNode(this.annotations[i].semantics));
        annotationNode.appendChild(typeNode);
        //Entity
        var entityNode = createElementNS(namespaceURI, "entity", doc);
        entityNode.appendChild(doc.createTextNode(this.annotations[i].entity));
        annotationNode.appendChild(entityNode);
        var annot = this.annotations[i];
        for (var j = 0; j < annot.annotedObjects.length; j++) {
            var cp = annot.annotedObjects[j];
            var cpNode = createElementNS(namespaceURI, "CalendarPart", doc);
            cpNode.setAttribute("startTime", cp.startTime);
            cpNode.setAttribute("endTime", cp.endTime);
            var eventNode = createElementNS(namespaceURI, "event", doc);
            eventNode.appendChild(doc.createTextNode(cp.event));
            cpNode.appendChild(eventNode);
            annotationNode.appendChild(cpNode);
        }
        viewerNode.appendChild(annotationNode);
    }
    return viewerNode;
};

// Calendar.Part class
WIND.Calendar.Part = function (startTime, endTime, event) {
    //this.object = this.viewer.container + startTime.substring(0,10);
    this.object = null;
    this.startTime = startTime;
    this.endTime = endTime;
    this.event = event;
};
WIND.Calendar.Part.prototype = new WIND.SensiblePart('calendar');
/* Les fonctions possible de la classe */
WIND.Calendar.Part.prototype.highlight = function () {
    this.viewer.panToDate(this.object);
    document.getElementById(this.object).style.backgroundColor = 'yellow';
    document.getElementById(this.object).style.border = '1px blue solid';
};
WIND.Calendar.Part.prototype.setStyle = function (styleString) {
    if (document.getElementById(this.object)) {
        var decors = styleString.split(";");
        var decor;
        for (var i = 0; i < decors.length; i++) {
            decor = decors[i];
            if (decor.split(":")[0] == 'color') document.getElementById(this.object).style.color = decor.split(":")[1];
            if (decor.split(":")[0] == 'background-color') document.getElementById(this.object).style.backgroundColor = decor.split(":")[1];
            if (decor.split(":")[0] == 'font-weight') document.getElementById(this.object).style.fontWeight = decor.split(":")[1];
            if (decor.split(":")[0] == 'font-style') document.getElementById(this.object).style.fontStyle = decor.split(":")[1];
            if (decor.split(":")[0] == 'text-decoration') document.getElementById(this.object).style.textDecoration = decor.split(":")[1];
        }
    }
};

//Calendar class
// Constant strings for month labels
WIND.Calendar.MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
// Constant strings for day labels
WIND.Calendar.DAYS = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];

// CSS classes
WIND.Calendar.calendarViewClass = "calendarView";
WIND.Calendar.columnHeadingClass = "columnDay";
WIND.Calendar.weekViewCellClass = "weekViewCell";
WIND.Calendar.weekViewTodayCellClass = "weekViewTodayCell";
WIND.Calendar.monthViewCellClass = "monthViewCell";
WIND.Calendar.monthViewTodayCellClass = "monthViewTodayCell";
WIND.Calendar.dateClass = "date";
WIND.Calendar.contentCellClass = "contentCell";

// string labels
WIND.Calendar.monthViewButtonLabel = "Month";
WIND.Calendar.weekViewButtonLabel = "Week";
WIND.Calendar.todayButtonLabel = "Today";
WIND.Calendar.prevButtonLabel = "<<";
WIND.Calendar.nextButtonLabel = ">>";

WIND.Calendar.prototype.setViewMode = function (mode) {
    if (mode == "month" || mode == "week") {
        this.viewMode = mode;
        this.render();
    }
};
WIND.Calendar.prototype.panToDate = function (obj) {
    var date = obj.substring(this.container.length, obj.length);
    var year = date.substring(0, 4);
    year = parseInt(year);
    var month = date.substring(5, 7);
    if (month.startsWith('0')) month = parseInt(date.substring(6, 7)) - 1;
    else month = parseInt(month) - 1;
    var day = date.substring(8, 10);
    if (day.startsWith('0')) day = parseInt(date.substring(9, 10)) - 1;
    else day = parseInt(day) - 1;
    var d = new Date(year, month, day);
    this.currentPivotDate = d;
    this.render();
};
WIND.Calendar.prototype.render = function () {
    switch (this.viewMode) {
    case "week":
        this.initWeekView();
        break;
    case "month":
        this.initMonthView();
        break;
    }
};
/* Month View */
WIND.Calendar.prototype.initMonthView = function () {
    this.initMonthNavControl();
    this.initMonthViewControl();
    this.updateMonthView();
};
WIND.Calendar.prototype.initMonthNavControl = function () {
    var navControl = document.getElementById(this.container + "navControlDiv");
    if (navControl.hasChildNodes()) {
        while (navControl.childNodes.length > 0) {
            navControl.removeChild(navControl.firstChild);
        }
    }

    var calendar = this;

    var todayButton = document.createElement("input");
    todayButton.type = "button";
    todayButton.id = this.container + "todayButton";
    todayButton.value = WIND.Calendar.todayButtonLabel;
    navControl.appendChild(todayButton);
    var whitespace = document.createTextNode(" ");
    navControl.appendChild(whitespace);
    todayButton.onclick = function () {
        calendar.currentPivotDate = new Date();
        calendar.updateMonthView();
    };

    var prevButton = document.createElement("input");
    prevButton.type = "button";
    prevButton.id = this.container + "prevMonth";
    prevButton.value = WIND.Calendar.prevButtonLabel;
    navControl.appendChild(prevButton);
    whitespace = document.createTextNode(" ");
    navControl.appendChild(whitespace);
    prevButton.onclick = function () {
        var currentMonth = calendar.currentPivotDate.getMonth();
        calendar.currentPivotDate.setMonth(currentMonth - 1);
        //calendar.currentPivotDate.setDate(1);                     
        calendar.updateMonthView();
    };

    var monthHolder = document.createElement("span");
    monthHolder.id = this.container + "monthHolder";
    //monthHolder.appendChild(document.createTextNode(WIND.Calendar.MONTHS[this.currentPivotDate.getMonth()]));
    monthHolder.innerHTML = WIND.Calendar.MONTHS[this.currentPivotDate.getMonth()];
    navControl.appendChild(monthHolder);
    whitespace = document.createTextNode(" ");
    navControl.appendChild(whitespace);

    var yearHolder = document.createElement("span");
    yearHolder.id = this.container + "yearHolder";
    var year = 1800;
    var listYear = document.createElement("select");
    listYear.id = this.container + "yearChooser";
    for (var i = 0; i < 300; i++) {
        var now = new Date();
        listYear.options[listYear.options.length] = new Option(year, year);
        year++;
    }
    listYear.onchange = function () {
        calendar.currentPivotDate.setFullYear(this.options[this.selectedIndex].value);
        calendar.updateMonthView();
    };
    yearHolder.appendChild(listYear);
    navControl.appendChild(yearHolder);
    whitespace = document.createTextNode(" ");
    navControl.appendChild(whitespace);

    var nextButton = document.createElement("input");
    nextButton.type = "button";
    nextButton.id = this.container + "nextMonth";
    nextButton.value = WIND.Calendar.nextButtonLabel;
    navControl.appendChild(nextButton);
    nextButton.onclick = function () {
        var currentMonth = calendar.currentPivotDate.getMonth();
        calendar.currentPivotDate.setMonth(currentMonth + 1);
        //calendar.currentPivotDate.setDate(1);
        calendar.updateMonthView();
    };
};
WIND.Calendar.prototype.initMonthViewControl = function () {
    var viewControl = document.getElementById(this.container + "viewControlDiv");
    if (viewControl.hasChildNodes()) {
        while (viewControl.childNodes.length > 0) {
            viewControl.removeChild(viewControl.firstChild);
        }
    }

    var calendar = this;
    var weekViewButton = document.createElement("input");
    weekViewButton.type = "button";
    weekViewButton.id = this.container + "weekViewButton";
    weekViewButton.value = WIND.Calendar.weekViewButtonLabel;
    viewControl.appendChild(weekViewButton);
    var whitespace = document.createTextNode(" ");
    viewControl.appendChild(whitespace);
    weekViewButton.onclick = function () {
        calendar.viewMode = "week";
        calendar.initWeekView();
    };
    var monthViewButton = document.createElement("input");
    monthViewButton.type = "button";
    monthViewButton.id = this.container + "monthViewButton";
    monthViewButton.value = WIND.Calendar.monthViewButtonLabel;
    monthViewButton.disabled = true;
    viewControl.appendChild(monthViewButton);
};
WIND.Calendar.prototype.updateMonthView = function () {
    this.initMonthGrid();
    document.getElementById(this.container + "monthHolder").innerHTML = WIND.Calendar.MONTHS[this.currentPivotDate.getMonth()];
    var listYear = document.getElementById(this.container + "yearChooser");
    var option;
    for (var i = 0; i < listYear.options.length; i++) {
        var option = listYear.options[i];
        if (option.value == this.currentPivotDate.getFullYear()) {
            listYear.selectedIndex = i;
            break;
        }
    }

    var firstDate = (new Date(this.currentPivotDate));
    firstDate.setDate(1);
    var year = firstDate.getFullYear();
    var month = firstDate.getMonth();
    var daysInMonth = 32 - (new Date(year, month, 32)).getDate();
    var dateHolder = new Date(firstDate);

    var startIndex = firstDate.getDay() - this.firstDayOfWeek;
    if (startIndex == -1) startIndex = 6;
    for (var i = 0; i < daysInMonth; i++) {
        var dateCellId = this.container + dateHolder.getFullYear() + "-" + padZero(dateHolder.getMonth() + 1) + "-" + padZero(dateHolder.getDate());
        var dateContentId = "content" + dateCellId;

        var monthViewCell = document.createElement("div");
        if (dateHolder.getDate() == (new Date()).getDate() && dateHolder.getMonth() == (new Date()).getMonth() && dateHolder.getFullYear() == (new Date()).getFullYear()) {
            monthViewCell.className = WIND.Calendar.monthViewTodayCellClass;
        } else {
            monthViewCell.className = WIND.Calendar.monthViewCellClass;
        }
        monthViewCell.id = dateCellId;

        // div de la date en mois, ex: 1, 2, 3, ...
        var monthViewDate = document.createElement("div");
        monthViewDate.className = WIND.Calendar.dateClass;
        monthViewDate.innerHTML = dateHolder.getDate();
        monthViewCell.appendChild(monthViewDate);
        // div des évènement
        var monthViewContent = document.createElement("div");
        monthViewContent.className = WIND.Calendar.contentCellClass;
        monthViewContent.id = dateContentId;
        monthViewCell.appendChild(monthViewContent);
        document.getElementById(this.container + "date" + startIndex).appendChild(monthViewCell);
        dateHolder.setDate(dateHolder.getDate() + 1);
        startIndex++;
    }
    var lastDate = new Date(firstDate);
    lastDate.setDate(daysInMonth);

    this.activateInteractions();
};
WIND.Calendar.prototype.initMonthGrid = function () {
    var calendarBody = document.getElementById(this.container);
    if (calendarBody.hasChildNodes()) {
        while (calendarBody.childNodes.length > 0) {
            calendarBody.removeChild(calendarBody.firstChild);
        }
    }
    var table = document.createElement("table");
    table.className = WIND.Calendar.calendarViewClass;
    var tr = document.createElement("tr");
    var td;
    for (var i = this.firstDayOfWeek; i < 7 + this.firstDayOfWeek; i++) {
        td = document.createElement("td");
        td.className = WIND.Calendar.columnHeadingClass;
        td.appendChild(document.createTextNode(WIND.Calendar.DAYS[i]));
        tr.appendChild(td);
    }
    table.appendChild(tr);

    var index = 0;
    var somme = WIND.Calendar.getWeeksInMonth(this.currentPivotDate, this.firstDayOfWeek);
    var hauteur = Math.floor((100 - somme) / somme);
    for (var i = 0; i < somme; i++) {
        tr = document.createElement("tr");
        for (var j = 0; j < 7; j++) {
            td = document.createElement("td");
            td.className = WIND.Calendar.calendarViewClass;
            td.id = this.container + "date" + index;
            td.style.height = hauteur + "%";
            td.vAlign = "top";
            tr.appendChild(td);
            index++;
        }
        table.appendChild(tr);
    }
    calendarBody.appendChild(table);
};

/* Week View */
WIND.Calendar.prototype.initWeekView = function () {
    this.initWeekNavControl();
    this.initWeekViewControl();
    this.updateWeekView();
};
WIND.Calendar.prototype.initWeekNavControl = function () {
    var navControl = document.getElementById(this.container + "navControlDiv");
    if (navControl.hasChildNodes()) {
        while (navControl.childNodes.length > 0) {
            navControl.removeChild(navControl.firstChild);
        }
    }

    var calendar = this;

    var todayButton = document.createElement("input");
    todayButton.type = "button";
    todayButton.id = this.container + "todayButton";
    todayButton.value = WIND.Calendar.todayButtonLabel;
    navControl.appendChild(todayButton);
    var whitespace = document.createTextNode(" ");
    navControl.appendChild(whitespace);
    todayButton.onclick = function () {
        calendar.currentPivotDate = new Date();
        calendar.updateWeekView();
    };

    var prevButton = document.createElement("input");
    prevButton.type = "button";
    prevButton.id = this.container + "prevWeek";
    prevButton.value = WIND.Calendar.prevButtonLabel;
    navControl.appendChild(prevButton);
    whitespace = document.createTextNode(" ");
    navControl.appendChild(whitespace);
    prevButton.onclick = function () {
        calendar.currentPivotDate.setDate(calendar.currentPivotDate.getDate() - 7);
        calendar.updateWeekView();
    };

    var weekHolder = document.createElement("span");
    weekHolder.id = this.container + "weekDuration";
    navControl.appendChild(weekHolder);
    calendar.updateWeekDuration();
    whitespace = document.createTextNode(" ");
    navControl.appendChild(whitespace);

    var nextButton = document.createElement("input");
    nextButton.type = "button";
    nextButton.id = this.container + "nextWeek";
    nextButton.value = WIND.Calendar.nextButtonLabel;
    navControl.appendChild(nextButton);
    nextButton.onclick = function () {
        calendar.currentPivotDate.setDate(calendar.currentPivotDate.getDate() + 7);
        calendar.updateWeekView();
    };
};
WIND.Calendar.prototype.updateWeekDuration = function () {
    var weekHolder = document.getElementById(this.container + "weekDuration");
    var weekStart = WIND.Calendar.getFirstDateOfWeek(this.currentPivotDate, this.firstDayOfWeek);
    var weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    var durationString = weekStart.getDate();
    if (WIND.Calendar.MONTHS[weekStart.getMonth()] != WIND.Calendar.MONTHS[weekEnd.getMonth()]) {
        durationString += " ";
        durationString += WIND.Calendar.MONTHS[weekStart.getMonth()];
    }
    if (weekStart.getFullYear() != weekEnd.getFullYear()) {
        durationString += " ";
        durationString += weekStart.getFullYear();
    }
    durationString += " - ";
    durationString += weekEnd.getDate();
    durationString += " ";
    durationString += WIND.Calendar.MONTHS[weekEnd.getMonth()];
    durationString += " ";
    durationString += weekEnd.getFullYear();
    weekHolder.innerHTML = durationString;
};
WIND.Calendar.prototype.initWeekViewControl = function () {
    var viewControl = document.getElementById(this.container + "viewControlDiv");
    if (viewControl.hasChildNodes()) {
        while (viewControl.childNodes.length > 0) {
            viewControl.removeChild(viewControl.firstChild);
        }
    }

    var calendar = this;
    var weekViewButton = document.createElement("input");
    weekViewButton.type = "button";
    weekViewButton.id = this.container + "weekViewButton";
    weekViewButton.value = WIND.Calendar.weekViewButtonLabel;
    weekViewButton.disabled = true;
    viewControl.appendChild(weekViewButton);
    var whitespace = document.createTextNode(" ");
    viewControl.appendChild(whitespace);

    var monthViewButton = document.createElement("input");
    monthViewButton.type = "button";
    monthViewButton.id = this.container + "monthViewButton";
    monthViewButton.value = WIND.Calendar.monthViewButtonLabel;
    monthViewButton.onclick = function () {
        calendar.viewMode = "month";
        calendar.initMonthView();
    };
    viewControl.appendChild(monthViewButton);
};
WIND.Calendar.prototype.updateWeekView = function () {
    this.updateWeekDuration();
    var firstDate = WIND.Calendar.getFirstDateOfWeek(this.currentPivotDate, this.firstDayOfWeek);
    var lastDate = new Date(firstDate);
    lastDate.setDate(firstDate.getDate() + 6);
    var calendarBody = document.getElementById(this.container);
    if (calendarBody.hasChildNodes()) {
        while (calendarBody.childNodes.length > 0) {
            calendarBody.removeChild(calendarBody.firstChild);
        }
    }
    var table = document.createElement("table");
    table.className = WIND.Calendar.calendarViewClass;
    var tr = document.createElement("tr");
    var td;
    for (var i = this.firstDayOfWeek; i < 7 + this.firstDayOfWeek; i++) {
        td = document.createElement("td");
        td.className = WIND.Calendar.columnHeadingClass;
        td.appendChild(document.createTextNode(WIND.Calendar.DAYS[i]));
        tr.appendChild(td);
    }
    table.appendChild(tr);

    tr = document.createElement("tr");
    var dateHolder = new Date(firstDate);
    for (var i = 0; i < 7; i++) {
        var dateCellId = this.container + dateHolder.getFullYear() + "-" + padZero(dateHolder.getMonth() + 1) + "-" + padZero(dateHolder.getDate());
        var dateContentId = "content" + dateCellId;
        td = document.createElement("td");
        td.className = WIND.Calendar.calendarViewClass;
        td.style.height = "95%";
        td.vAlign = "top";
        var weekViewCell = document.createElement("div");
        weekViewCell.id = dateCellId;
        if (dateHolder.getDate() == (new Date()).getDate() && dateHolder.getMonth() == (new Date()).getMonth() && dateHolder.getFullYear() == (new Date()).getFullYear()) {
            weekViewCell.className = WIND.Calendar.weekViewTodayCellClass;
        } else {
            weekViewCell.className = WIND.Calendar.weekViewCellClass;
        }
        // div de la date en mois, ex: 1, 2, 3, ...
        var weekViewDate = document.createElement("div");
        weekViewDate.className = WIND.Calendar.dateClass;
        weekViewDate.innerHTML = dateHolder.getDate();
        weekViewCell.appendChild(weekViewDate);
        // div des évènement		
        var weekViewContent = document.createElement("div");
        weekViewContent.id = dateContentId;
        weekViewContent.className = WIND.Calendar.contentCellClass;
        weekViewCell.appendChild(weekViewContent);
        td.appendChild(weekViewCell);
        tr.appendChild(td);
        dateHolder.setDate(dateHolder.getDate() + 1);
    }
    table.appendChild(tr);
    document.getElementById(this.container).appendChild(table);

    this.activateInteractions();
};

WIND.Calendar.getWeeksInMonth = function (pivotDate, firstDay) {
    var year = pivotDate.getFullYear();
    var month = pivotDate.getMonth();
    var num = 32 - (new Date(year, month, 32)).getDate();
    var firstDateOfMonth = new Date(year, month, 1);
    var lastDateOfMonth = new Date(year, month, num);
    var firstDateOfGrid = WIND.Calendar.getFirstDateOfWeek(firstDateOfMonth, firstDay);
    var lastDateOfGrid = WIND.Calendar.getLastDateOfWeek(lastDateOfMonth, firstDay);
    return Math.floor((lastDateOfGrid - firstDateOfGrid) / (1000 * 60 * 60 * 24 * 7)) + 1;
};
WIND.Calendar.getFirstDateOfWeek = function (pivotDate, firstDay) {
    var dayOffset = pivotDate.getDay() - firstDay;
    if (dayOffset == -1) dayOffset = 6;
    return new Date(pivotDate.getFullYear(), pivotDate.getMonth(),
        pivotDate.getDate() - dayOffset);
};

WIND.Calendar.getLastDateOfWeek = function (pivotDate, firstDay) {
    var dayOffset = 6 + firstDay - pivotDate.getDay();
    if (dayOffset == 7) dayOffset = 0;
    return new Date(pivotDate.getFullYear(), pivotDate.getMonth(),
        pivotDate.getDate() + dayOffset);
};

WIND.Calendar.prototype.loadXMLFile = function (url) {
    var xhr = createXHR();
    xhr.open("GET", url, false);
    //xhr.overrideMimeType("text/xml; charset=ISO-8859-1");
    xhr.send(null);
    if (xhr.status == 200) {
        var xmldoc = xhr.responseXML;
        var annotations = xmldoc.getElementsByTagName("Annotation");
        for (var i = 0; i < annotations.length; i++) {
            var annoId = annotations[i].getAttribute("id");
            if (annoId) {
                var calendarparts = annotations[i].getElementsByTagName("CalendarPart");
                var sp = [];
                for (var j = 0; j < calendarparts.length; j++) {
                    var startTime = calendarparts[j].getAttribute("startTime");
                    var endTime = calendarparts[j].getAttribute("endTime");
                    var event = calendarparts[j].getElementsByTagName("event")[0].firstChild.nodeValue;
                    var cp = this.createSensiblePart(startTime, endTime, event);
                    sp.push(cp);
                }
                if (sp.length > 0) {
                    var annot = new WIND.Annotation(annotations[i].getElementsByTagName("semantics")[0].firstChild.nodeValue, annotations[i].getElementsByTagName("entity")[0].firstChild.nodeValue, sp);
                    this.annotations.push(annot);
                }
            }
        }
    } else {
        document.getElementById(this.container).innerHTML = "Error: " + url + " " + xhr.status + " " + xhr.statusText;
    }

};

WIND.Calendar.prototype.createSensiblePart = function (startTime, endTime, event) {
    //var cp = new WIND.Calendar.Part(this.container + date);
    var cp = new WIND.Calendar.Part(startTime, endTime, event);
    cp.viewer = this;
    cp.object = this.container + startTime.substring(0, 10);
    cp.setStyle("background-color:#CFDFFE");
    this.parts.push(cp);
    return cp;
};