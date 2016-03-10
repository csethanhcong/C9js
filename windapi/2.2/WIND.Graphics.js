/**
	Creates an object of the Graphics class.
	@memberOf WIND
	@class Creates an object of the Graphics class to be displayed on the web page.
	@param {String} iddiv The ID of the Graphics object.
	@param {JSON} options String in JSON format to set options for the Graphics object.
	@param {string} [somebody] - Somebody's name.
	@example   var g = new WIND.Graphics('myGraph',{'resizable':true,'draggable':true,'top':50});
*/
wind_graphics = true;
WIND.Graphics = function (iddiv, options) {
  
	this.draggable = false;
    this.resizable = false;
    this.top = 10;
    this.left = 10;
    this.width = 600;
    this.height = 600;
    this.color = "#3366CC";
    this.border = "#3366CC 2px solid";
    this.name = "Graph Displayer";
    this.icon = lib_path + "images/lvizicon.png";
    this.header = false;
    this.removable = false;
    this.configurable = false;
	this.nomiddiv = iddiv;

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
	
	// type de graphique
	if (options.type) this.type = options.type;
	
	// ************
	// Creation du div canvas.
	var canvasElm = document.createElement("canvas");
	canvasElm.id = "canvas";
	canvasElm.height = "450"; 
	canvasElm.width = "600";
	outerDiv.appendChild(canvasElm);
    
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
        iconSpan.title = "Graphics Displayer";
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
            removeSpan.src = lib_path+"images/close.png";
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
            configureSpan.src = lib_path+"images/icons/gear.png";
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
    this.interactionGraphics = [];
    this.parts = [];
    this.annotations = [];
    this.parentDocument = null;
    this.toolbar = null;
	
	//attribute of data
	this.rawData = [];
	this.data = [];
	this.canvasId = "canvas";
	
	// colors
	this.fillColor = "rgba(204,0,153,0.2)";
	this.strokeColor = "rgba(151,187,205,1)";
	this.pointColor = "rgba(151,187,205,1)";
	this.pointStrokeColor = "#fff";
	this.pointHighlightFill = "#fff";
	this.pointHighlightStroke = "rgba(151,187,205,1)";
	this.highlightColor = "#F7464A";
};

WIND.Graphics.prototype.destroy = function () {
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

WIND.Graphics.prototype.onDrag = function () {
    this.top = document.getElementById(this.container + "Outer").offsetTop;
    this.left = document.getElementById(this.container + "Outer").offsetLeft;
};

WIND.Graphics.prototype.onResize = function () {
    this.width = document.getElementById(this.container + "Outer").offsetWidth;
    this.height = document.getElementById(this.container + "Outer").offsetHeight;
};
WIND.Graphics.prototype.onConfigure = function () {}; // to override
WIND.Graphics.prototype.onRemove = function () {}; // to override

WIND.Graphics.prototype.addToolBar = function () {
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
WIND.Graphics.prototype.removeToolBar = function () {
    if (this.toolbar != null)
        this.toolbar.style.visibility = "hidden";
};

/* 20/02/2010 */
WIND.Graphics.prototype.addAnnotation = function (annotation) {
    var valid = false;
    for (var i = 0; i < annotation.annotedObjects.length; i++) {
        if (annotation.annotedObjects.type == "graphics") {
            valid = true;
            break;
        }
    }
    this.annotations.push(annotation);
};

WIND.Graphics.prototype.getValue = function () {
    return {
        id: this.container,
        ref: this.ref,
        rdftype: "http://erozate.iutbayonne.univ-pau.fr/wind#GraphicsComponent",
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

WIND.Graphics.prototype.activateInteractions = function () {
    for (var i = 0; i < this.interactionGraphics.length; i++) {
        this.activateInteraction(this.interactionGraphics[i]);
    }
};

WIND.Graphics.prototype.setData = function (data) {
	this.rawData = data;
	
	if (this.type != 'Pie') {
		this.data = {};
		this.data.labels = data.labels;
		this.data.datasets = [];
		for (var i=0; i<data.datasets.length; i++) {
			var dataElm = {};
			dataElm.fillColor = this.fillColor;
			dataElm.strokeColor = this.strokeColor;
			dataElm.pointColor = this.pointColor;
			dataElm.pointStrokeColor = this.pointStrokeColor;
			dataElm.pointHighlightFill = this.pointHighlightFill;
			dataElm.pointHighlightStroke = this.pointHighlightStroke;
			dataElm.data = data.datasets[i];
			this.data.datasets.push(dataElm);
		}
	} else {
		this.data = [];
		for (var i=0; i<data.labels.length; i++) {
			var dataElm = {};
			dataElm.label = data.labels[i];
			dataElm.value = data.datasets[0][i];
			dataElm.color = gradient(this.fillColor, i*10);
			dataElm.highlight = gradient(this.highlightColor, i*10);
			this.data.push(dataElm);
		}
	}
	
	// Draw after setting Data
	this.draw();
};

function gradient(color, pourcentage) {
	return color; //"color -> autre couleur";
}

WIND.Graphics.prototype.draw = function() {
	if (this.type == 'Bar') this.drawBarChart();
	if (this.type == 'Pie') this.drawPieChart();
	if (this.type == 'Radar') this.drawRadarChart();
	if (this.type == 'Line') this.drawLineChart();
};

WIND.Graphics.prototype.drawBarChart = function(){ 	
	var that = this;
	var ctx = document.getElementById("canvas").getContext("2d");
	var myLine = new Chart(ctx).Bar(that.data, {
		responsive: true
	});
};

WIND.Graphics.prototype.drawLineChart = function(){ 	
	var that = this;
	var ctx = document.getElementById("canvas").getContext("2d");
	var myLine = new Chart(ctx).Line(that.data, {
		responsive: true
	});
};

WIND.Graphics.prototype.drawPieChart = function(){ 	
	var that = this;
	var ctx = document.getElementById("canvas").getContext("2d");
	var myLine = new Chart(ctx).Pie(that.data, {
		responsive: true
	});
};

WIND.Graphics.prototype.drawRadarChart = function(){ 	
	var that = this;
	var ctx = document.getElementById("canvas").getContext("2d");
	var myLine = new Chart(ctx).Radar(that.data, {
		responsive: true
	});	
};

WIND.Graphics.prototype.setColor = function(options) { 	
	if (options.fillColor) this.fillColor = options.fillColor; 
	if (options.strokeColor) this.strokeColor = options.strokeColor; 
	if (options.pointColor) this.pointColor = options.pointColor; 
	if (options.pointStrokeColor) this.pointStrokeColor = options.pointStrokeColor; 
	if (options.pointHighlightFill) this.pointHighlightFill = options.pointHighlightFill; 
	if (options.pointHighlightStroke) this.pointHighlightStroke = options.pointHighlightStroke; 
	if (options.highlightColor) this.highlightColor = options.highlightColor; 
};

// Creating an Annotation for Graphics
WIND.Graphics.prototype.createAnnotation = function (type, entity) {
    var graphicpart = this.createSensiblePart();
	var annotation = new WIND.Annotation(type, entity, [graphicpart]);
    this.annotations.push(annotation);
    return annotation;
};

WIND.Graphics.prototype.createSensiblePart = function () {
	var graphicpart = new WIND.Graphics.Part(this.canvasId); 
	graphicpart.viewer = this; 
	return graphicpart;
};

// Graphics.Part class
WIND.Graphics.Part = function (elem) {
    this.object = elem;
};

// The Graphics.TextPart object inherits all of the WIND.SensiblePart object's methods
WIND.Graphics.Part.prototype = new WIND.SensiblePart('graphics');

WIND.Graphics.Part.prototype.changeType = function (type) {
    this.viewer.type = type;
	this.viewer.setData(this.viewer.rawData);
};

WIND.Graphics.Part.prototype.changeTypeRound = function () {
    var typeTable = ["Line", "Bar", "Radar", "Pie"];
	for (var i = 0; i < typeTable.length; i++) {
		if (this.viewer.type == typeTable[i]) {
			if (i < 3) {
				this.changeType(typeTable[i+1]);
			} else {
				this.changeType(typeTable[0]);
			}
			break;
		}
		
	}
};