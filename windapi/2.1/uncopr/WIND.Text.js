/**
	Creates an object of the Text class.
	@memberOf WIND
	@class Creates an object of the Text class to be displayed on the web page.
	@param {string} iddiv The ID of the Text object.
	@param {JSON} options string in JSON format to set options for the Text objet.
	@example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
*/
WIND.Text = function (iddiv, options) {
    this.type = "text";
    this.top = 10;
    this.left = 10;
    this.width = 600;
    this.height = 400;
    this.color = "#0033CC";
    this.border = "#0033CC 2px solid";
    this.name = "Text Displayer";
    this.icon = lib_path + "images/tvizicon.png";

    // Admin action configuration for the designer
    this.draggable = false;
    this.resizable = false;
    this.header = false;
    this.removable = false;
    this.configurable = false;
    this.config = false;
	wind_text = true;
    // Action given for users
    this.tool = new Array();

    if (options.draggable == true) this.draggable = options.draggable;
    if (options.resizable == true) this.resizable = options.resizable;
    if (options.header == true) this.header = options.header;
    if (options.removable == true) this.removable = options.removable;
    if (options.configurable == true) this.configurable = options.configurable;
    if (options.config == true) this.config = options.config;
    if (this.draggable == true || this.removable == true || this.configurable == true || this.config == true) this.header = true;

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
    if (this.header) textDiv.style.height = "85%";
    else textDiv.style.height = "100%";
    //textDiv.style.marginTop = "20px";
    //textDiv.style.border = "blue 1px solid";
    textDiv.style.whiteSpace = "normal";
    outerDiv.appendChild(textDiv);

    if (options.parentEl) {
        this.parentEl = options.parentEl;
        document.getElementById(options.parentEl).appendChild(outerDiv);
    } else document.body.appendChild(outerDiv);

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
        iconSpan.title = "TextDisplayer";
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

        var that = this;

        // Name of displayer
        var label1 = document.createElement("span");
        label1.appendChild(document.createTextNode("Name: "));
        configDiv.appendChild(label1);
        //configDiv.appendChild(document.createElement("br"));
        var input1 = document.createElement("input");
        input1.type = "text";
        input1.id = iddiv + "Configuration_Name";
        input1.name = iddiv + "Configuration_Name";
        input1.size = "30";
        input1.value = this.name;
        configDiv.appendChild(input1);
        input1.onblur = function () {
            var nomafficheur = document.getElementById(iddiv + "Configuration_Name").value;
            if ((nomafficheur != null) && (nomafficheur != '')) {
                that.name = nomafficheur;
                nameNode.removeChild(nameNode.firstChild);
                nameNode.appendChild(document.createTextNode(that.name));
            }
            that.eventConfigured.fire(that);
        };

        configDiv.appendChild(document.createElement("br"));
        // Color of displayer
        var label2 = document.createElement("span");
        label2.appendChild(document.createTextNode("Color: "));
        configDiv.appendChild(label2);
        var input2 = document.createElement("select");
        input2.id = iddiv + "Configuration_Color";
        input2.name = iddiv + "Configuration_Color";
        configDiv.appendChild(input2);
        input2.style.background = this.color;
        var colorTab = ["#00248E", "#0033CC", "#809FFE", "#BFCFFE", "#12127D", "#1919B3", "#9191FE", "#C8C8FE", "#24006B", "#330099", "#AA80FE", "#D4BFFE", "#2D006B", "#400099", "#B580FE", "#DABFFE", "#47006B", "#660099", "#D580FE", "#EABFFE", "#6B006B", "#990099", "#FF80FE", "#FFBFFE", "#8E006B", "#CC0099", "#FE80DF", "#FEBFEF", "#A10048", "#E60066", "#FE80B9", "#FEBFDC", "#B20000", "#FF0000", "#FE8080", "#FEBFBF", "#B22400", "#FF3300", "#FE9980", "#FECCBF", "#B24700", "#FF6600", "#FEB380", "#FED9BF", "#B25900", "#FF8000", "#FEBF80", "#FEDFBF", "#B26B00", "#FF9900", "#FECC80", "#FEE6BF", "#B27D00", "#FFB200", "#FED980", "#FEECBF", "#B28F00", "#FFCC00", "#FEE680", "#FEF2BF", "#B2A100", "#FFE500", "#FEF280", "#FEF9BF", "#B2B300", "#FFFF00", "#FEFF80", "#FEFFBF", "#8FB200", "#CCFF00", "#E6FE80", "#F2FEBF", "#6BB200", "#99FF00", "#CCFE80", "#E6FEBF", "#24B200", "#33FF00", "#99FE80", "#CCFEBF", "#008E00", "#00CC00", "#80FE80", "#BFFEBF", "#007D47", "#00B366", "#80FEC8", "#BFFEE3", "#006B6B", "#009999", "#80FFFE", "#BFFFFE", "#00477D", "#0066B3", "#80C8FE", "#BFE3FE"];
        for (var i = 0; i < colorTab.length; i++) {
            var opt = new Option(colorTab[i], colorTab[i]);
            opt.style.background = colorTab[i];
            opt.style.position = "absolute";
            opt.style.width = "100px";
            opt.style.height = "30px";
            if (colorTab[i] == this.color) opt.selected = true;
            input2.add(opt);
        }
        input2.onchange = function () {
            input2.style.background = this.options[this.selectedIndex].value;
            that.color = this.options[this.selectedIndex].value;
            that.border = this.options[this.selectedIndex].value + " 2px solid";
            document.getElementById(iddiv + "Handle").style.backgroundColor = that.color;
            document.getElementById(iddiv + "Outer").style.border = that.border;
        };

        configDiv.appendChild(document.createElement("br"));
		if(!this.config)
		{
			// Mode editable du texte
			var label3 = document.createElement("span");
			label3.appendChild(document.createTextNode("Editable: "));
			configDiv.appendChild(label3);
			var input3 = document.createElement("input");
			input3.type = "checkbox";
			input3.id = iddiv + "Configuration_Editable";
			input3.name = iddiv + "Configuration_Editable";
			configDiv.appendChild(input3);

			configDiv.appendChild(document.createElement("br"));
			var button1 = document.createElement("input");
			button1.type = "button";
			button1.id = iddiv + "Configuration_Tool";
			button1.name = iddiv + "Configuration_Tool";
			button1.value = "Create a new tool";
			configDiv.appendChild(button1);
			button1.onclick = function () {
				var toolName = prompt("Name of tool:", "Tool");
				if (toolName != null) {
					var toolDescription = prompt("Description of tool:", "Select word(s).");
					if (toolDescription != null) {
						var toolColor = prompt("Color of tool:", "blue");
						if (toolColor != null) {
							var tun = new WIND.Text.MagicButton(toolName, toolDescription, "bottom", null, toolColor);
							that.addTool(tun);
							//tun2.activate();
							that.tool.push({
								"rdftype": "http://erozate.iutbayonne.univ-pau.fr/wind#Button",
								"name": toolName,
								"description": toolDescription,
								"position": "bottom",
								"semantics": "unknown",
								"color": toolColor
							});
						}
					}
				}
			};

			configDiv.appendChild(document.createElement("br"));
			configDiv.appendChild(document.createElement("br"));
		}
        this.eventConfigured = new YAHOO.util.CustomEvent("eventConfigured");


        this.eventConfigured.subscribe(this.onConfigure, this, true);

        var button2 = document.createElement("input");
        button2.type = "button";
        button2.id = iddiv + "Configuration_Cancel";
        button2.name = iddiv + "Configuration_Cancel";
        button2.value = "Close";
        configDiv.appendChild(button2);
        button2.onclick = function () {
            configDiv.style.display = "none";
        };

        if (this.removable) {
            this.eventRemoved = new YAHOO.util.CustomEvent("eventRemoved");

            var removeSpan = document.createElement("img");
            removeSpan.src = lib_path + "images/close.png";
            removeSpan.alt = "X";
            removeSpan.title = "Click to delete";
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
            configureSpan.title = "Click to configure";
            //configureSpan.style.backgroundColor = "#EFEFEF";
            configureSpan.style.cssFloat = "right";
            configureSpan.style.marginRight = "10px";
            configureSpan.style.cursor = "pointer";
            headerDiv.appendChild(configureSpan);
            configureSpan.onclick = function () {
                configDiv.style.display = "block";
            };
        }

        if (this.config) {
            var configureSpan = document.createElement("img");
            configureSpan.src = lib_path + "images/gear.png";
            configureSpan.alt = "*";
            configureSpan.title = "Click to configure";
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
    this.paragraphs = new Array();
    this.interactionList = new Array();
    this.parts = new Array();
    this.annotations = new Array();
    this.parentDocument = null;
    this.toolbar = null;
    this.innerText = new Array();
    this.editable = false;
};
/**
 Destroys the text and remove it from the page.
 @function
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
 t.destroy();
 **/
WIND.Text.prototype.destroy = function () {
    var textDiv = document.getElementById(this.container + "Outer");
    if (this.parentEl) {
        var newtab = [];
        for (var i = 0; i < this.parentDocument.viewers.length; i++) {
            if (this.parentDocument.viewers[i].container != this.container) {
                newtab.push(this.parentDocument.viewers[i]);
            }
        }
        this.parentDocument.viewers = newtab;
        document.getElementById(this.parentEl).removeChild(textDiv);
    } else document.body.removeChild(textDiv);
};

WIND.Text.prototype.onDrag = function () {
    this.top = document.getElementById(this.container + "Outer").offsetTop;
    this.left = document.getElementById(this.container + "Outer").offsetLeft;
};

WIND.Text.prototype.onResize = function () {
    this.width = document.getElementById(this.container + "Outer").offsetWidth;
    this.height = document.getElementById(this.container + "Outer").offsetHeight;
};

WIND.Text.prototype.onConfigure = function () {}; // to override
WIND.Text.prototype.onRemove = function () {}; // to override
/**
Add a toolbar of text editing tools.
 @function
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
 t.addToolBar();
 **/
WIND.Text.prototype.addToolBar = function () {
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
/**
Remove the toolbar from the text.
 @function
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
 t.addToolBar();
 t.removeToolBar();
 **/
WIND.Text.prototype.removeToolBar = function () {
    if (this.toolbar != null)
        this.toolbar.style.visibility = "hidden";
};

/**
 Adds an annotation objet to the text. 
 @function
 @param {Annotation} annotation Annotation objet to add.
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
 t.addAnnotation(annotation);
 **/
WIND.Text.prototype.addAnnotation = function (annotation) {
    var valid = false;
    for (var i = 0; i < annotation.annotedObjects.length; i++) {
        if (annotation.annotedObjects.type == "text") {
            valid = true;
            break;
        }
    }
    this.annotations.push(annotation);
};
/**
 Creates ana Annotaion objet on the text.
 @function
 @param {string} type Represents the type of the Annotation objet to add. Its value can be anything.
 @param {string} entity Name of the annotated entity.
 @param {integer} paragraph The index of the paragraph we want to add an annotation.
 @param {integer} idtokendebut The index of the first token of the annotation.
 @param {integer} idtokenfin The index of the last token of the annotation.
 @param {JSON} [options] Options for the Annotation object. It contains the style of the annotationand and may contain:
 'color', 'background-color', 'font-weight', 'font-style', 'font-size', 'text-decoration', 'cursor', 'border', 'border-top', 'border-right', 'border-bottom', 'border-left' and 'padding'.
 @return {Annotation} returns Annotation object.
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
 t.createAnnotation("ville", "Mauléon-Licharre", 1, 4, 4,{"style":"color:red,font-size:20"});
 **/
WIND.Text.prototype.createAnnotation = function (type, entity, paragraph, idtokendebut, idtokenfin, options) {
    var textparts = this.createSensiblePart(paragraph, idtokendebut, idtokenfin, options);
    var annotation = new WIND.Annotation(type, entity, textparts);
    this.annotations.push(annotation);
    return annotation;
};
WIND.Text.prototype.getValue = function () {
    return {
        id: this.container,
        ref: this.ref,
        type: "TextComponent",
        rdftype: "http://erozate.iutbayonne.univ-pau.fr/wind#TextComponent",
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
        tool: this.tool,
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


WIND.Text.prototype.activateInteractions_ = function () {
    for (var i = 0; i < this.interactionList.length; i++) {
        this.activateInteraction(this.interactionList[i]);
    }
};
WIND.Text.prototype.activateInteraction_ = function (interact) {
    var evt = interact.event;
    var tmp = interact.reactions;
    if (evt instanceof WIND.SelectEvent) {
        //if (evt.target == "all") {
        if (evt.annotationSelected instanceof WIND.Selection) {
            //alert("WIND.Selection");
            // for (var k=0; k<evt.annotationSelected.set.length; k++) {
            // var tmpAnnot = evt.annotationSelected.set[k];
            // var new_evt = new WIND.SelectEvent(evt.event_type, tmpAnnot);
            // var new_react11 = new WIND.ExternalReaction(tmpAnnot, tmp[0].effect_type);
            // var new_react12 = new WIND.Projection(tmpAnnot, tmp[1].target);
            // var new_react13 = new WIND.ExternalReaction(new_react12.result, tmp[2].effect_type, tmp[2].parameters);
            // var new_i = new WIND.Interaction(new_evt, new Array(new_react11,new_react12,new_react13));
            // new_i.activate();
            // }

            for (var k = 0; k < evt.annotationSelected.set.length; k++) {
                var tmpAnnot = evt.annotationSelected.set[k];
                for (var l = 0; l < tmpAnnot.annotedObjects.length; l++) {
                    tmpAnnot.annotedObjects[l].setStyle("color:#0033CC;text-decoration:underline;cursor:pointer");
                    this.addListener(tmpAnnot.annotedObjects[l].object, evt.event_type, function (e) {
                        var evtObj = YAHOO.util.Event.getTarget(e);
                        var clicked;
                        for (var x = 0; x < evt.annotationSelected.set.length; x++) {
                            var tmpAnnot2 = evt.annotationSelected.set[x];
                            for (var y = 0; y < tmpAnnot2.annotedObjects.length; y++) {
                                if (tmpAnnot2.annotedObjects[y].object == evtObj.id) {
                                    clicked = tmpAnnot2;
                                    break;
                                }
                            }
                        }
                        if (clicked) {
                            interact.runReactions();
                            //alert(clicked.annotedObjects[0].object);

                            // var new_evt = new WIND.SelectEvent(evt.event_type, clicked);
                            // var new_react11 = new WIND.ExternalReaction(clicked, tmp[0].effect_type);
                            // var new_react12 = new WIND.Projection(clicked, tmp[1].target);
                            // var tp1_new = react2.result;
                            // var new_react13 = new WIND.ExternalReaction(new_react12.result, tmp[2].effect_type, tmp[2].parameters);
                            // var new_i = new WIND.Interaction(new_evt, new Array(new_react11,new_react12,new_react13));
                            // new_i.activate();


                            // for (var i=0; i<clicked.contains.length; i++) {
                            // if (clicked.contains[i].type == "text") {
                            // clicked.annotedObjects[0].setStyle("color:#0033CC;text-decoration:underline;cursor:pointer");
                            // for (var j = 0; j<tmp.length; j++) {

                            // alert("class = " + (tmp[j] instanceof WIND.ExternalReaction));
                            // alert("class = " + (tmp[j] instanceof WIND.Projection));
                            // if (tmp[j] instanceof WIND.ExternalReaction) {
                            // var cible;
                            // if (tmp[j].annotationApplied == null) {
                            // alert(j);
                            // if (j>0 && tmp[j-1] instanceof WIND.Projection) {
                            // if (tmp[j-1].source instanceof WIND.Selection) {
                            // cible = (new WIND.Projection(clicked, tmp[j-1].target)).raise();
                            // }
                            // else
                            // cible = tmp[j-1].raise();
                            // }
                            // }
                            // else if (tmp[j].annotationApplied instanceof WIND.Selection) {
                            // cible = clicked;
                            // }
                            // else {
                            // alert(tmp[j].annotationApplied);
                            // cible = tmp[j].annotationApplied;
                            // }
                            // for (var l=0; l<cible.annotedObjects.length; l++) {
                            // cible.annotedObjects[l].callFunction(tmp[j].effect_type, tmp[j].parameters);
                            // }
                            // }
                            // else if (tmp[j] instanceof WIND.Projection) {
                            // if (tmp[j].source instanceof WIND.Selection) {
                            // tmp[j].source = clicked;
                            // alert("jj = " + j);
                            // }
                            // }
                            // }
                            // }
                            // }


                        }
                    });
                }
            }
        } else {
            interact.runReactions();
            // for (var j = 0; j<tmp.length; j++) {
            // if (tmp[j] instanceof WIND.ExternalReaction) {
            // var cible;
            // if (tmp[j].annotationApplied == null) {
            // var newtab = new Array();
            // var temp2 = tmp[j];
            // while (temp2.dependency != null) {
            // newtab.push(temp2.dependency);
            // temp2 = temp2.dependency;
            // }
            // for (var i=newtab.length-1; i>0; i--) {
            // newtab[i-1].source = newtab[i].raise();
            // }
            // cible = newtab[0].raise();
            // }
            // else 
            // cible = tmp[j].annotationApplied;
            // if (cible instanceof WIND.Annotation) {
            // for (var l=0; l<cible.annotedObjects.length; l++) {
            // cible.annotedObjects[l].callFunction(tmp[j].effect_type, tmp[j].parameters);
            // }
            // }
            // }
            // }

            // for (var i=0; i<evt.annotationSelected.contains.length; i++) {	
            // if (evt.annotationSelected.contains[i].type == "text") {
            // evt.annotationSelected.annotedObjects[0].setStyle("color:#0033CC;text-decoration:underline;cursor:pointer");
            // this.addListener(evt.annotationSelected.annotedObjects[0].object, evt.event_type, function(ee) {
            // for (var j = 0; j<tmp.length; j++) {
            // if (tmp[j] instanceof WIND.ExternalReaction) {
            // var cible;
            // if (tmp[j].annotationApplied == null) {
            // if (j>0) {
            // if (tmp[j-1] instanceof WIND.Projection) { 
            // cible = tmp[j-1].raise();
            // }
            // else if (tmp[j-1] instanceof WIND.Calculation) { 
            // cible = tmp[j-1].raise();
            // }
            // }
            // }
            // else
            // cible = tmp[j].annotationApplied;
            // for (var l=0; l<cible.annotedObjects.length; l++) {
            // cible.annotedObjects[l].callFunction(tmp[j].effect_type, tmp[j].parameters);
            // }
            // }
            // }
            // });
            // }
            // other cases
            // }
        }
        //}
        // else {
        // if (evt.target.type == "text") {
        // cible.callFunction(tmp[j].calledFunction, tmp[j].parameters);
        // }
        // }
    } else if (evt instanceof WIND.InputEvent) {
        interact.runReactions();
        // for (var j = 0; j<tmp.length; j++) {
        // if (tmp[j] instanceof WIND.ExternalReaction) {
        // var cible;
        // if (tmp[j].annotationApplied == null) {
        // var newtab = new Array();
        // var temp2 = tmp[j];
        // while (temp2.dependency != null) {
        // newtab.push(temp2.dependency);
        // temp2 = temp2.dependency;
        // }
        // for (var i=newtab.length-1; i>0; i--) {
        // newtab[i-1].source = newtab[i].raise();
        // }
        // cible = newtab[0].raise();
        // }
        // else 
        // cible = tmp[j].annotationApplied;
        // if (cible instanceof WIND.Annotation) {
        // for (var l=0; l<cible.annotedObjects.length; l++) {
        // cible.annotedObjects[l].callFunction(tmp[j].effect_type, tmp[j].parameters);
        // }
        // }
        // }
        // }		
    }
};
WIND.Text.prototype.activateInteraction2 = function (interact) {
    var so = interact.source;
    var evt = interact.event;
    var tmp = interact.reactions;
    var that = this;
    if (so instanceof Array) {
        for (var k = 0; k < so.length; k++) {
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
                                                    var spref;
                                                    if (cibleViewer instanceof WIND.Map) {
                                                        spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                            "style": "strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"
                                                        });
                                                    } else if (cibleViewer instanceof WIND.Text) {
                                                        //Tricher
                                                        var textDiv = document.getElementById(cibleViewer.container);
                                                        while (textDiv.firstChild) {
                                                            textDiv.removeChild(textDiv.firstChild);
                                                        }
                                                        document.getElementById(cibleViewer.container).innerHTML = "";
                                                        cibleViewer.paragraphs = [];

                                                        var p = cibleViewer.createParagraph();
                                                        p.setContent(pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue);
                                                        spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, 1, 1, 1);
                                                    }
                                                    var realTarget = spref.annotedObjects;
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
                                                    //var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture",pref.getElementsByTagName("nom_chf_l")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
                                                    var spref;
                                                    if (cibleViewer instanceof WIND.Map) {
                                                        spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                            "style": "strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"
                                                        });
                                                    } else if (cibleViewer instanceof WIND.Text) {
                                                        //Tricher
                                                        var textDiv = document.getElementById(cibleViewer.container);
                                                        while (textDiv.firstChild) {
                                                            textDiv.removeChild(textDiv.firstChild);
                                                        }
                                                        document.getElementById(cibleViewer.container).innerHTML = "";
                                                        cibleViewer.paragraphs = [];

                                                        var p = cibleViewer.createParagraph();
                                                        p.setContent(pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue);
                                                        spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, 1, 1, 1);
                                                    }

                                                    var realTarget = spref.annotedObjects;
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
                                                    //alert(pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue);
                                                    //var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_dept")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
                                                    var spref;
                                                    if (cibleViewer instanceof WIND.Map) {
                                                        spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                            "style": "strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"
                                                        });
                                                    } else if (cibleViewer instanceof WIND.Text) {
                                                        //Tricher
                                                        var textDiv = document.getElementById(cibleViewer.container);
                                                        while (textDiv.firstChild) {
                                                            textDiv.removeChild(textDiv.firstChild);
                                                        }
                                                        document.getElementById(cibleViewer.container).innerHTML = "";
                                                        cibleViewer.paragraphs = [];

                                                        var p = cibleViewer.createParagraph();
                                                        p.setContent(pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue);
                                                        spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue, 1, 1, 1);
                                                    }

                                                    var realTarget = spref.annotedObjects;
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
                                                //var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture",pref.getElementsByTagName("nom_chf_l")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
                                                var spref;
                                                if (cibleViewer instanceof WIND.Map) {
                                                    spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                        "style": "strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"
                                                    });
                                                } else if (cibleViewer instanceof WIND.Text) {
                                                    //Tricher
                                                    var textDiv = document.getElementById(cibleViewer.container);
                                                    while (textDiv.firstChild) {
                                                        textDiv.removeChild(textDiv.firstChild);
                                                    }
                                                    document.getElementById(cibleViewer.container).innerHTML = "";
                                                    cibleViewer.paragraphs = [];

                                                    var p = cibleViewer.createParagraph();
                                                    p.setContent(pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue);
                                                    spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, 1, 1, 1);
                                                }
                                                var realTarget = spref.annotedObjects;
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
                                                //var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture",pref.getElementsByTagName("nom_chf_l")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
                                                var spref;
                                                if (cibleViewer instanceof WIND.Map) {
                                                    spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                        "style": "strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"
                                                    });
                                                } else if (cibleViewer instanceof WIND.Text) {
                                                    //Tricher
                                                    var textDiv = document.getElementById(cibleViewer.container);
                                                    while (textDiv.firstChild) {
                                                        textDiv.removeChild(textDiv.firstChild);
                                                    }
                                                    document.getElementById(cibleViewer.container).innerHTML = "";
                                                    cibleViewer.paragraphs = [];

                                                    var p = cibleViewer.createParagraph();
                                                    p.setContent(pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue);
                                                    spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue, 1, 1, 1);
                                                }
                                                var realTarget = spref.annotedObjects;
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
                                                //var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_dept")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
                                                var spref;
                                                if (cibleViewer instanceof WIND.Map) {
                                                    spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue, pref.getElementsByTagName("astext")[0].textContent, {
                                                        "style": "strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"
                                                    });
                                                } else if (cibleViewer instanceof WIND.Text) {
                                                    //Tricher
                                                    var textDiv = document.getElementById(cibleViewer.container);
                                                    while (textDiv.firstChild) {
                                                        textDiv.removeChild(textDiv.firstChild);
                                                    }
                                                    document.getElementById(cibleViewer.container).innerHTML = "";
                                                    cibleViewer.paragraphs = [];

                                                    var p = cibleViewer.createParagraph();
                                                    p.setContent(pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue);
                                                    spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue, 1, 1, 1);
                                                }
                                                var realTarget = spref.annotedObjects;
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
WIND.Text.prototype.addListener = function (object, evt, callback) {
    if (document.getElementById(object)) {
        if (evt == "click") {
            //document.getElementById(object).style.cursor = 'pointer';
            document.getElementById(object).onclick = callback;
        } else if (evt == "mouseover") {
            document.getElementById(object).onmouseover = callback;
        } else if (evt == "mouseout") {
            document.getElementById(object).onmouseout = callback;
        }
    }
};
/*
WIND.Text.prototype.showRDFDisplay = function(tab) {
	var leng = tab.length;
	if (leng > 0) {
		var str = "";
		for (var i=0; i<leng-1; i++) {
			str += tab[i].ref + "!!";
		}
		str += tab[leng-1].ref;
		
		//alert(str);
		var xhr = createXHR(); 
		xhr.open("GET", "displayonText.php?display=" + str, false); 
		xhr.send(null);
		if (xhr.status == 200) {
		}
	}
};
*/
WIND.Text.prototype.loadRDFFile = function (php, url) {
    //alert(php + ", " + url);
    var xhr = createXHR();
    xhr.open("GET", php + "?rdf=" + url, false);
    xhr.send(null);
    if (xhr.status == 200) {
        //alert(xhr.responseText);
        var resultat = YAHOO.lang.JSON.parse(xhr.responseText);
        var paras = resultat.paragraphs;
        //this.innerText = new Array();
        for (var i = 0; i < paras.length; i++) {
            var toAdd = true;
            for (var j = 0; j < this.paragraphs.length; j++) {
                if (this.paragraphs[j].text == paras[i]) {
                    toAdd = false;
                    break;
                }
            }
            if (toAdd) {
                var p = this.createParagraph();
                p.setContent(paras[i]);
                this.innerText.push({
                    "ref": url
                });
            }
        }

        var res = resultat.annotations;
        //alert(res.length);
        for (var i = 0; i < res.length; i++) {
            var sp = [];
            var pos = res[i].position;
            for (var j = 0; j < pos.length; j++) {
                //var realIndex = pos[j].paragraph;
                for (var l = 0; l < this.paragraphs.length; l++) {
                    //alert("l = " + l + " -- " + this.paragraphs[l].text);
                    //alert("pos = " + pos[j].paragraph + " -- " + paras[pos[j].paragraph - 1]);
                    if (this.paragraphs[l].text == paras[pos[j].paragraph - 1]) {
                        pos[j].paragraph = l + 1;
                        break;
                    }
                }
                //alert(pos[j].paragraph);
                var tp = this.createSensiblePart(pos[j].paragraph, pos[j].start, pos[j].end);
                for (var k = 0; k < tp.length; k++) {
                    tp[k].setStyle("text-decoration:underline");
                    //alert("text-decoration:underline");
                    sp.push(tp[k]);
                    //tp[k].highlight();
                }
            }

            //if (sp.length > 0) {
            //	var annot = new WIND.Annotation(res[i].spatialInfo[0].geotype, res[i].entityName, sp);
            //	this.annotations.push(annot);
            //}
        }


    } else {
        document.getElementById(this.container).innerHTML = "Error: " + url + " " + xhr.status + " " + xhr.statusText;
    }

};
/**
 Creates a WIND.Text.Part object.
 @memberOf WIND.Text
 @class Creates a WIND.Text.Part object.
 @param {string} elem The ID of the object.
 @example var part = new WIND.Text.Part("part1");
 **/
WIND.Text.Part = function (elem) {
    this.object = elem;
    this.paragraph = null;
    this.tokenId = null;
    this.word = null;
};

// The WIND.TextPart object inherits all of the WIND.SensiblePart object's methods
WIND.Text.Part.prototype = new WIND.SensiblePart('text');
/**
 Hightlight the Part. 
 @function
 @example var part = new WIND.Text.Part("part1");
 part.highlight();
 **/
WIND.Text.Part.prototype.highlight = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.backgroundColor = 'blue';
        obj.style.color = 'white';
    }
};
/**
 The part is diplayed in bold.
 @function
 @example var part = new WIND.Text.Part("part1");
 part.bold();
 **/
WIND.Text.Part.prototype.bold = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.fontWeight = 'bold';
    }
};
/**
 The part is diplayed in italics.
 @function
 @example var part = new WIND.Text.Part("part1");
 part.italicize();
 **/
WIND.Text.Part.prototype.italicize = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.fontStyle = 'italic';
    }
};
/**
 The part is underlined.
 @function
 @example var part = new WIND.Text.Part("part1");
 part.underline();
 **/
WIND.Text.Part.prototype.underline = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.textDecoration = 'underline';
    }
};
/**
 The part will blink.
 @function
 @example var part = new WIND.Text.Part("part1");
 part.blink();
 **/
WIND.Text.Part.prototype.blink = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.textDecoration = 'blink';
    }
};
WIND.Text.Part.prototype.setStyleByClass = function (css) {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.className = css;
    }
};
/**
 Put the part in a given style.
 @function
 @param {string} stylestring The CSS string that describes the new style of the part. It may contain: 'color', 'background-color', 'font-weight', 'font-style', 'font-size', 'text-decoration', 'cursor', 'border', 'border-top', 'border-right', 'border-bottom', 'border-left' and 'padding'.
 @example var part = new WIND.Text.Part("part1");
 part.setStyle("color:blue;text-decoration:underline");
 **/
WIND.Text.Part.prototype.setStyle = function (stylestring) {
    var obj = document.getElementById(this.object);
    if (obj) {
        var decors = stylestring.split(";");
        var decor;
        obj.style.whiteSpace = "pre";
        for (var i = 0; i < decors.length; i++) {
            decor = decors[i];
            if (decor.split(":")[0] == 'color') obj.style.color = decor.split(":")[1];
            if (decor.split(":")[0] == 'background-color') obj.style.backgroundColor = decor.split(":")[1];
            if (decor.split(":")[0] == 'font-weight') obj.style.fontWeight = decor.split(":")[1];
            if (decor.split(":")[0] == 'font-style') obj.style.fontStyle = decor.split(":")[1];
            if (decor.split(":")[0] == 'font-size') obj.style.fontSize = decor.split(":")[1];
            if (decor.split(":")[0] == 'text-decoration') obj.style.textDecoration = decor.split(":")[1];
            if (decor.split(":")[0] == 'cursor') obj.style.cursor = decor.split(":")[1];
            if (decor.split(":")[0] == 'border') obj.style.border = decor.split(":")[1];
            if (decor.split(":")[0] == 'border-top') obj.style.borderTop = decor.split(":")[1];
            if (decor.split(":")[0] == 'border-right') obj.style.borderRight = decor.split(":")[1];
            if (decor.split(":")[0] == 'border-bottom') obj.style.borderBottom = decor.split(":")[1];
            if (decor.split(":")[0] == 'border-left') obj.style.borderLeft = decor.split(":")[1];
            if (decor.split(":")[0] == 'padding') obj.style.padding = decor.split(":")[1];
        }
    }
};
/**
 Displays the Part.
 @function
 @example var part = new WIND.Text.Part("part1");
 part.show();
 **/
WIND.Text.Part.prototype.show = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.display = "block";
    }
};
/**
 Hides the Part.
 @function
 @example var part = new WIND.Text.Part("part1");
 part.hide();
 **/
WIND.Text.Part.prototype.hide = function () {
    var obj = document.getElementById(this.object);
    if (obj) {
        obj.style.display = "none";
    }
};


WIND.Text.Part.prototype.setDraggable = function (group, displayer) {
    var obj = document.getElementById(this.object);
    if (obj) {
        var ddProxy = new WIND.Annotation2DisplayerProxy(this.object, group, displayer);
        ddProxy._part = this;

        var ddTarget = new YAHOO.util.DDTarget(displayer.container, "Annotation2Displayer");
        //ddTarget._displayer = displayer;
        /*var dd = new YAHOO.util.DDProxy(this.object); 
		dd.setHandleElId(this.object);
		dd.initTarget(displayer.container, "displayer_target");
		this.eventDragged = new YAHOO.util.CustomEvent("eventDragged");
		dd.on('endDragEvent', function(ev) {
			this.eventDragged.fire(this);
		}, this, true);
		this.eventDragged.subscribe(this.onDrag, this, true);

		dd.on('dragEvent', function(e, target) {
		}, this, true);
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
			}
			else {
				var left = outerDiv.offsetLeft; 
				var top = outerDiv.offsetTop; 
				dd.setXConstraint(left); 
				dd.setYConstraint(top);
			}
		
		*/
    }
};
WIND.Text.Part.prototype.onDrag = function () {};

WIND.Text.Part.prototype.window = function (exp) {
    var eventWindow = new Widget.Dialog;
    eventWindow.alert(exp);
};
/**
 Creates a WIND.Text.Paragraph object.
 @memberOf WIND.Text
 @class Creates a WIND.Text.Paragraph object.
 @param {string} Paragraph The ID of the Paragraph object.
 @example var paragraph = new WIND.Text.Paragraph("paragraph1");
 **/
WIND.Text.Paragraph = function (idparagraph) {
    this.object = idparagraph;
    this.words = [];
    this.text = null;
};
WIND.Text.Paragraph.prototype = new WIND.Text.Part(this.object);
/**
 Creates a paragraph object and add it to the text.
 @function
 @param {string} [options] The options of the paragraph nad it contains: "display".
 @return {WIND.Text.Paragraph} returns WIND.Text.Paragraph object.
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
 var p = t.createParagraph("display:true");
 **/
WIND.Text.prototype.createParagraph = function (options) {
    var len = this.paragraphs.length + 1;
    var paragraphDiv = document.createElement("div");
    paragraphDiv.id = this.container + "_paragraph" + len;
    paragraphDiv.style.margin = "10px";
    paragraphDiv.style.textAlign = "left";
    //paragraphDiv.style.border = "red 1px solid";
    if (options) {
        if (options.display) paragraphDiv.style.display = "block";
        else paragraphDiv.style.display = "none";
    } else paragraphDiv.style.display = "block";
    document.getElementById(this.container).appendChild(paragraphDiv);
    var para = new WIND.Text.Paragraph(this.container + "_paragraph" + len);
    this.paragraphs.push(para);
    return para;
};
/**
 Allows cutting contetns in an array of tokens.
 @function
 @param {string} content The contents that we want to cut.
 @return {string[]} returns Array of string tokens.
 @static
 @example var tab = WIND.Text.tokenizer("Je vais de Bayonne à Pau.");
 **/
WIND.Text.tokenizer = function (content) {
    var tableau = content.split(" ");
    var mot1, mot2;
    var nouveau = [];
    for (var i = 0; i < tableau.length; i++) {
        if (tableau[i].indexOf("'") != -1) {
            mot1 = tableau[i].split("'")[0] + "'";
            mot2 = tableau[i].split("'")[1];
            nouveau = tableau.slice(0, i);
            nouveau.push(mot1);
            nouveau.push(mot2);
            nouveau = nouveau.concat(tableau.slice(i + 1, tableau.length));
            tableau = nouveau;
        }
    }
    for (var i = 0; i < tableau.length; i++) {
        if (tableau[i].length > 1 && tableau[i].indexOf(",") != -1) {
            mot1 = tableau[i].substring(0, tableau[i].length - 1);
            mot2 = ",";
            nouveau = tableau.slice(0, i);
            nouveau.push(mot1);
            nouveau.push(mot2);
            nouveau = nouveau.concat(tableau.slice(i + 1, tableau.length));
            tableau = nouveau;
        }
    }
    for (var i = 0; i < tableau.length; i++) {
        if (tableau[i].length > 1 && tableau[i].indexOf(".") != -1) {
            mot1 = tableau[i].substring(0, tableau[i].length - 1);
            mot2 = ".";
            nouveau = tableau.slice(0, i);
            nouveau.push(mot1);
            nouveau.push(mot2);
            nouveau = nouveau.concat(tableau.slice(i + 1, tableau.length));
            tableau = nouveau;
        }
    }
    for (var i = 0; i < tableau.length; i++) {
        if (tableau[i].length > 1 && tableau[i].indexOf(":") != -1 && tableau[i].lastIndexOf(":")==tableau[i].length-1) {
            mot1 = tableau[i].substring(0, tableau[i].length - 1);
            mot2 = ":";
            nouveau = tableau.slice(0, i);
            nouveau.push(mot1);
            nouveau.push(mot2);
            nouveau = nouveau.concat(tableau.slice(i + 1, tableau.length));
            tableau = nouveau;
        }
    }
    for (var i = 0; i < tableau.length; i++) {
        if (tableau[i].length > 1 && tableau[i].indexOf("(") != -1) {
            mot1 = "(";
            mot2 = tableau[i].substring(1);
            nouveau = tableau.slice(0, i);
            nouveau.push(mot1);
            nouveau.push(mot2);
            nouveau = nouveau.concat(tableau.slice(i + 1, tableau.length));
            tableau = nouveau;
        }
    }
    for (var i = 0; i < tableau.length; i++) {
        if (tableau[i].length > 1 && tableau[i].indexOf(")") != -1) {
            mot1 = tableau[i].substring(0, tableau[i].length - 1);
            mot2 = ")";
            nouveau = tableau.slice(0, i);
            nouveau.push(mot1);
            nouveau.push(mot2);
            nouveau = nouveau.concat(tableau.slice(i + 1, tableau.length));
            tableau = nouveau;
        }
    }
    return tableau;
};
/**
 Sets the contents of the paragraph.
 @function
 @param {string} content The contents that we want to set.
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
 var p = t.createParagraph("display:true");
 p.setContent("Je vais de Bayonne à Pau.");
 **/
WIND.Text.Paragraph.prototype.setContent = function (content) {
    this.text = content;
    var paragraphDiv = document.getElementById(this.object);
    //paragraphDiv.innerHTML = "";
    while (paragraphDiv.firstChild) {
        paragraphDiv.removeChild(paragraphDiv.firstChild);
    }
    this.words = WIND.Text.tokenizer(content);
    var span, spanid;
    for (var i = 0; i < this.words.length; i++) {
        span = document.createElement("span");
        span.id = this.object + "_token" + (i + 1);
        span.appendChild(document.createTextNode(this.words[i]));
        //span.innerHTML = this.words[i];
        paragraphDiv.appendChild(span);
        if (this.words[i].indexOf("'") == -1) {
            span = document.createElement("span");
            span.id = this.object + "_espace" + (i + 1) + "_" + (i + 2);
            //span.innerHTML = "&nbsp;";
            span.appendChild(document.createTextNode(" "));
            paragraphDiv.appendChild(span);
        }
        if ((this.words[i] == ",") || (this.words[i] == ".") || (this.words[i] == ":")) {
            spanid = this.object + "_espace" + i + "_" + (i + 1);
            span = document.getElementById(spanid);
            paragraphDiv.removeChild(span);
        }
    }
};
WIND.Text.Paragraph.prototype.setContentByArray = function (tab) {
    var content = "";
    for (var i = 0; i < tab.length; i++) {
        if ((tab[i] == ".") || (tab[i] == ",") || (tab[i] == ":")) {
            content = content.substring(0, content.length - 1);
        }
        if (tab[i].indexOf("'") == -1) {
            content += tab[i] + " ";
        } else {
            content += tab[i];
        }
    }
    this.text = content;
    var paragraphDiv = document.getElementById(this.object);
    this.words = tab;
    var span, spanid;
    for (var i = 0; i < this.words.length; i++) {
        span = document.createElement("span");
        span.id = this.object + "_token" + (i + 1);
        span.appendChild(document.createTextNode(this.words[i]));
        //span.innerHTML = this.words[i];
        paragraphDiv.appendChild(span);
        if (this.words[i].indexOf("'") == -1) {
            span = document.createElement("span");
            span.id = this.object + "_espace" + (i + 1) + "_" + (i + 2);
            //span.innerHTML = "&nbsp;";
            span.appendChild(document.createTextNode(" "));
            paragraphDiv.appendChild(span);
        }
        if ((this.words[i] == ",") || (this.words[i] == ".") || (this.words[i] == ":")) {
            spanid = this.object + "_espace" + i + "_" + (i + 1);
            span = document.getElementById(spanid);
            paragraphDiv.removeChild(span);
        }
    }
};
WIND.Text.prototype.createSensiblePart = function (paragraph, idtokendebut, idtokenfin, options) {
    var idspan, tp;
    var textparts = new Array();
    for (var i = Number(idtokendebut); i <= Number(idtokenfin); i++) {
        idspan = this.container + "_paragraph" + paragraph + "_token" + i;
        tp = new WIND.Text.Part(idspan);
        tp.viewer = this;
        tp.paragraph = paragraph;
        tp.tokenId = i;
        tp.word = this.paragraphs[paragraph - 1].words[i - 1];
        textparts.push(tp);
        this.parts.push(tp);
    }
    for (var i = Number(idtokendebut); i < Number(idtokenfin); i++) {
        idspan = this.container + "_paragraph" + paragraph + "_espace" + i + "_" + (i + 1);
        if (document.getElementById(idspan)) {
            tp = new WIND.Text.Part(idspan);
            tp.viewer = this;
            tp.paragraph = paragraph;
            textparts.push(tp);
            this.parts.push(tp);
        }
    }
    if (options && options.style) {
        for (var i = 0; i < textparts.length; i++) {
            textparts[i].setStyle(options.style);
        }
    }
    /*else {
		for (var i=0; i<textparts.length; i++) {
			textparts[i].setStyle("text-decoration:underline");
		}
	}*/
    return textparts;
};
WIND.Text.prototype.createSensiblePartByWord = function (exp, options) {
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

/**
 Creates a WIND.Text.MagicButton object.
 @memberOf WIND.Text
 @class Creates a WIND.Text.MagicButton object.
 @param {string} nom The name of the tool.
 @param {string} des The description of the tool.
 @param {string} pos The position of the tool ("bottom", "top", "left", "right").
 @param {string} sem Semantic of the annotations created by the tool.
 @param {string} color Color of the tool.
 @example var button = new WIND.Text.MagicButton("Lieux", "Choisir des lieux dans le texte", "bottom", "place", "red");
**/
WIND.Text.MagicButton = function (nom, des, pos, sem, color) {
    this.name = nom;
    this.description = des;
    this.position = pos;
    this.semantics = sem;
    this.color = color;
    this.parentComponent = null;
    this.button = null;

    /*var mybutton = document.createElement("input");
	mybutton.type = "button";
	mybutton.value = this.name;
	mybutton.title = this.description;
	mybutton.style.backgroundColor = color;
	mybutton.style.padding = "5px";
	mybutton.style.margin = "5px";
	mybutton.style.fontWeight = "bold";
	mybutton.style.color = "#FFFFFF";
	mybutton.disabled = true;
	this.button = mybutton;
	*/

};
WIND.Text.MagicButton.prototype = new WIND.Tool("text");
/**
 Activate the tool.
 @function
 @example var button = new WIND.Text.MagicButton("Lieux", "Choisir des lieux dans le texte", "bottom", "place", "red");
 button.activate();
 **/
 WIND.Text.MagicButton.prototype.activate = function () {
    this.button.set("disabled", false);
};
/**
 Desactivate the tool.
 @function
 @example var button = new WIND.Text.MagicButton("Lieux", "Choisir des lieux dans le texte", "bottom", "place", "red");
 button.desactivate();
 **/
WIND.Text.MagicButton.prototype.desactivate = function () {
    this.button.set("disabled", true);
};
/**
 Add a tool to text object.
 @function
 @param {WIND.Text.MagicButton} outil The tool object we will add.
 @example var t = new WIND.Text('text', {'name':'LIUPPA','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':100});
var button = new WIND.Text.MagicButton("Lieux", "Choisir des lieux dans le texte", "bottom", "place", "red");
t.addTool(button);
 **/
WIND.Text.prototype.addTool = function (outil) {
    if (this.bottomDiv == null) {
        var bottomDiv = document.createElement("div");
        bottomDiv.id = this.container + "-bottom";
        bottomDiv.style.position = "absolute";
        bottomDiv.style.bottom = "0px";
        bottomDiv.style.left = "0px";
        bottomDiv.style.width = "100%";
        //bottomDiv.style.border = "green 1px solid";
        this.bottomDiv = bottomDiv;
        document.getElementById(this.container).appendChild(this.bottomDiv);
    }
    if (outil.position == "bottom") {
        outil.button = new YAHOO.widget.Button({
            id: "mybutton",
            label: outil.name,
            title: outil.description,
            menuclassname: "yui-button",
            type: "checkbox",
            container: this.bottomDiv,
            disabled: true
        });
        //alert(outil.button.get("checked"));
    }
    outil.parentComponent = this;
};