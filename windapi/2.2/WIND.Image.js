Caman.remoteProxy = Caman.IO.useProxy('php');
wind_image = true;
WIND.Image = function (iddiv, options) {
    this.draggable = false;
    this.resizable = false;
    this.top = 10;
    this.left = 10;
    this.width = 800;
    this.height = 400;
    this.color = "#3366CC";
    this.border = "#3366CC 2px solid";
    this.name = "Image Displayer";
    this.icon = lib_path + "images/lvizicon.png";
    this.header = false;
    this.removable = false;
    this.configurable = false;
	this.nomiddiv = iddiv;
	this.collection = [];
	this.switchBar = false;
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
 /*var name = "surf";
	var img = document.createElement("img");
			img.setAttribute("id", name);
            img.setAttribute("src", "GeneratedImages2/surf.jpg");
            img.setAttribute("alt", "GeneratedImages2/surf.jpg");
 
            textDiv.appendChild(img);
			
			*/
	this.textDiv = textDiv;	
	
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
        iconSpan.title = "ImageDisplayer";
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
            removeSpan.src = tuto_path+"/styles/images/close.png";
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
            configureSpan.src = tuto_path+"/styles/images/icons/gear.png";
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
    this.interactionImage = [];
    this.parts = [];
    this.annotations = [];
    this.parentDocument = null;
    this.toolbar = null;
	this.imageId = "image";
	
};

WIND.Image.prototype.addImage = function (file,collectionName) {
var container = document.getElementById(this.nomiddiv);
  var collectionRecuperee = this.getCollection(collectionName);
    collectionRecuperee.photos.push(file);
 
 var img = document.createElement("img");
			img.setAttribute("id", this.imageId);
            img.setAttribute("src",this.collection[0].photos[0]);
            img.setAttribute("alt",this.collection[0].photos[0]);
// "GeneratedImages2/surf.jpg"
            container.appendChild(img);
			
			

};
/*
document.getElementById("image").onclick = function() {
    EXIF.getData(this, function() {
	 var GPSLongituderef  = EXIF.getTag(this, "GPSLongitudeRef");
        var GPSLongitude  = EXIF.getTag(this, "GPSLongitude");
		var longitude = GPSLongitude + '';
        var GPSLatitude = EXIF.getTag(this, "GPSLatitude");
		var GPSLagitudeRef  = EXIF.getTag(this, "GPSLagitudeRef");
		var latitude = GPSLatitude + '';
		var reslatitude = latitude.split(',');
			//var resul = res[2].replace(".", ","); 
		//	var resu = res[2].split('.');
		//var lo = reslatitude[2] + '';
		var b = parseFloat(reslatitude[0]);
		var a = parseFloat(reslatitude[1]);
		var c = parseFloat(reslatitude[2]);
		var lat = 0;
		   var lat = b + (a/60)+  c/(60*60);
		   if (GPSLagitudeRef == "S" || GPSLagitudeRef == "W") {
        lat = lat * -1;
		} // Don't do anything for N or E
		 	
			var res = longitude.split(',');
		//	var resul = res[2].replace(".", ","); 
//var resu = res[2].split('.');
		//	 var lat = ConvertDMSToDD(res[0], res[1], resul, GPSLongituderef);
			 var d = parseFloat(res[0]);
		var e = parseFloat(res[1]);
		var f = parseFloat(res[2]);
			 
			   var dd = d + e/60 + f/(60*60);

    if (GPSLongituderef == "S" || GPSLongituderef == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
	
        alert("I was taken by a " +  lat + " " + dd + " " +a );
    });
}*/

WIND.Image.prototype.addImageToCollection = function (file,collectionName) {
  var collectionRecuperee = this.getCollection(collectionName);
    collectionRecuperee.photos.push(file);

};


WIND.Image.prototype.addCollection = function (collectionName) {
    var mycollection = {};
    mycollection.name = collectionName;
    mycollection.photos = [];
    mycollection.miniatures = [];
    mycollection.tags = []; // TAGS
    this.collection.push(mycollection);
};

WIND.Image.prototype.getCollection = function (collectionName) {
    for (var i = 0; i < this.collection.length; i++) {
        if (this.collection[i].name == collectionName) {
            return this.collection[i];
        }
    }
    return false;
};

WIND.Image.prototype.addSwitchBar = function (collectionName) {
    if (!this.switchBar) {
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id", this.switchBarContainer);
        var collectionRecuperee = this.getCollection(collectionName);

		var that = this;
        for (var i = 0; i < collectionRecuperee.photos.length; i++) {
            var img = document.createElement("img");
            img.setAttribute("src", collectionRecuperee.photos[i]);
            img.setAttribute("alt", collectionRecuperee.photos[i]);
            img.setAttribute("border", "5");
            img.setAttribute("bordercolor", "white");
            img.setAttribute("width", "110");
            img.setAttribute("height", "70");
            img.setAttribute("hspace", "10");
			
            img.onclick = function () {
			
			console.log(this.imageId);
			var disp = document.getElementById(that.imageId);
            disp.setAttribute("src", this.src);
		  // disp.src = "toto";
            disp.setAttribute("alt", "toto");
            };
            newdiv.appendChild(img);
        }

        document.body.appendChild(newdiv);
        this.switchBar = true;
    }
};

WIND.Image.prototype.brightness = function (niveau) {
 var imagename = "#image";
			   Caman(imagename , function () {
  // manipulate image here
  this.brightness(niveau).render();
});
};


WIND.Image.prototype.contrast = function (niveau) {
 var imagename = "#image";
			   Caman(imagename , function () {
  // manipulate image here
  this.contrast(niveau).render();
});
};

WIND.Image.prototype.rotate = function (niveau) {
 var imagename = "#image";
			   Caman(imagename , function () {
  // manipulate image here
  this.rotate(niveau).render();
});
};

WIND.Image.prototype.kernel = function (noyau) {
 var imagename = "#image";
			   Caman(imagename , function () {
  this.processKernel("Box Blur",noyau,1,0);
 this.render();
});

};

WIND.Image.prototype.contourdetect = function () {
 var imagename = "#image";
			   Caman(imagename , function () {
  this.processKernel("Box Blur",[0,1,0,1,-4,1,0,1,0],1,0);
 this.render();
});

};

WIND.Image.prototype.blur = function () {
 var imagename = "#image";
			   Caman(imagename , function () {
  this.processKernel("Box Blur",[1,1,1,1,1,1,1,1,1],1,0);
 this.render();
});

};

// Creating an Annotation for Image
WIND.Image.prototype.createAnnotation = function (type, entity) {
    var imagepart = this.createSensiblePart();
	var annotation = new WIND.Annotation(type, entity, [imagepart]);
    this.annotations.push(annotation);
    return annotation;
};

WIND.Image.prototype.destroy = function () {
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

WIND.Image.prototype.onDrag = function () {
    this.top = document.getElementById(this.container + "Outer").offsetTop;
    this.left = document.getElementById(this.container + "Outer").offsetLeft;
};

WIND.Image.prototype.onResize = function () {
    this.width = document.getElementById(this.container + "Outer").offsetWidth;
    this.height = document.getElementById(this.container + "Outer").offsetHeight;
};
WIND.Image.prototype.onConfigure = function () {}; // to override
WIND.Image.prototype.onRemove = function () {}; // to override

WIND.Image.prototype.addToolBar = function () {
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
WIND.Image.prototype.removeToolBar = function () {
    if (this.toolbar != null)
        this.toolbar.style.visibility = "hidden";
};



/**
 Creates a WIND.Image.Part object.
 @memberOf WIND.Image
 @class Creates a WIND.Image.Part object.
 **/
WIND.Image.Part = function (elm) {
	this.object = elm;
};

WIND.Image.Part.prototype = new WIND.SensiblePart('image');

WIND.Image.prototype.createSensiblePart = function () {
	var imagepart = new WIND.Image.Part(this.imageId); 
	imagepart.viewer = this; 
	return imagepart;
};

WIND.Image.Part.prototype.rotate = function (angle) {
    Caman("#" + this.object , function () {
	  // manipulate image here
	  this.rotate(angle).render();
	});
};

WIND.Image.Part.prototype.contrast = function (degree) {
    Caman("#" + this.object , function () {
	  // manipulate image here
	  this.contrast(degree).render();
	});
};

WIND.Image.Part.prototype.brightness = function (degree) {
    Caman("#" + this.object , function () {
	  // manipulate image here
	  this.brightness(degree).render();
	});
};

WIND.Image.Part.prototype.contourdetect = function () {
    Caman("#" + this.object , function () {
	  // manipulate image here
	 this.processKernel("Box Blur",[0,1,0,1,-4,1,0,1,0],1,0);
	 this.render();
	});
};

WIND.Image.Part.prototype.blur = function () {
    Caman("#" + this.object , function () {
	  // manipulate image here
	  this.processKernel("Box Blur",[1,1,1,1,1,1,1,1,1],1,0);
	  this.render();	  
	});
};



// TODO
// Creer les autres methodes pour des autres reactions



WIND.Image.prototype.imagelocation = function () {
document.getElementById("image").onload = function() {
    EXIF.getData(this, function() {
	 var GPSLongituderef  = EXIF.getTag(this, "GPSLongitudeRef");
        var GPSLongitude  = EXIF.getTag(this, "GPSLongitude");
		var longitude = GPSLongitude + '';
        var GPSLatitude = EXIF.getTag(this, "GPSLatitude");
		var GPSLagitudeRef  = EXIF.getTag(this, "GPSLagitudeRef");
		var latitude = GPSLatitude + '';
		var reslatitude = latitude.split(',');
			//var resul = res[2].replace(".", ","); 
		//	var resu = res[2].split('.');
		//var lo = reslatitude[2] + '';
		var b = parseFloat(reslatitude[0]);
		var a = parseFloat(reslatitude[1]);
		var c = parseFloat(reslatitude[2]);
		
		  var lat = b + (a/60)+  c/(60*60);
		   if (GPSLagitudeRef == "S" || GPSLagitudeRef == "W") {
        lat = lat * -1;
		} // Don't do anything for N or E
		 	
			var res = longitude.split(',');
		//	var resul = res[2].replace(".", ","); 
//var resu = res[2].split('.');
		//	 var lat = ConvertDMSToDD(res[0], res[1], resul, GPSLongituderef);
			 var d = parseFloat(res[0]);
		var e = parseFloat(res[1]);
		var f = parseFloat(res[2]);
			 
			  var dd = d + e/60 + f/(60*60);

    if (GPSLongituderef == "S" || GPSLongituderef == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
	
	 /*var m = new WIND.Map('map', {'type':'Google Hybrid','longitude': dd, 'latitude': lat, 'zoom': 17,'top':50});*/
      //  alert("I was taken by a " +  lat + " " + dd + " " +a );
		  var m = new WIND.Map('map', {'top':50});
			var marqueur = new WIND.Map.Marker(dd,lat);
			m.addMarker(marqueur);
    });
}
};