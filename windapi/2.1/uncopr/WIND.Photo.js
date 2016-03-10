// Constructeur de la classe WIND.Photo
WIND.Photo = function (iddiv, options) {
    this.draggable = false;
    this.resizable = false;
    this.top = 10;
    this.left = 10;
    this.width = 600;
    this.height = 400;
    this.color = "#3366CC";
    this.border = "#3366CC 2px solid";
    this.name = "Photo Displayer";
    this.icon = lib_path + "images/pvizicon.png";
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

    var photoDiv;
    if (document.getElementById(iddiv))
        photoDiv = document.getElementById(iddiv);
    else {
        photoDiv = document.createElement("div");
        photoDiv.id = iddiv;
    }
    photoDiv.style.position = "absolute";
    photoDiv.style.top = "0px";
    photoDiv.style.width = "100%";
    photoDiv.style.height = "100%";
    outerDiv.appendChild(photoDiv);
    //document.body.appendChild(outerDiv);
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
        iconSpan.title = "PhotoDisplayer";
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
    this.parentDocument = null;
    // List of sensible parts
    this.parts = [];
    this.annotations = [];

    // List of interactions -- feature v1.0.5 (16/4/2009)
    this.interactionList = [];

    this.photoviewer = new Seadragon.Viewer(iddiv);

    this.collection = [];
    this.switchBar = false;
    this.switchBarContainer;
    this.open = false;
    this.tree = false;
    this.treeContainer;
    this.parts = [];
    this.tags;
    Seadragon.Config.maxZoomPixelRatio = 5;

};

WIND.Photo.prototype.destroy = function () {
    var photoDiv = document.getElementById(this.container + "Outer");
    if (this.parentEl) {
        var newtab = [];
        for (var i = 0; i < this.parentDocument.viewers.length; i++) {
            if (this.parentDocument.viewers[i].container != this.container) {
                newtab.push(this.parentDocument.viewers[i]);
            }
        }
        this.parentDocument.viewers = newtab;
        document.getElementById(this.parentEl).removeChild(photoDiv);
    } else document.body.removeChild(photoDiv);
};

WIND.Photo.prototype.onDrag = function () {
    this.top = document.getElementById(this.container + "Outer").offsetTop;
    this.left = document.getElementById(this.container + "Outer").offsetLeft;
};

WIND.Photo.prototype.onResize = function () {
    this.width = document.getElementById(this.container + "Outer").offsetWidth;
    this.height = document.getElementById(this.container + "Outer").offsetHeight;
};

WIND.Photo.prototype.onConfigure = function () {}; // to override
WIND.Photo.prototype.onRemove = function () {}; // to override

WIND.Photo.prototype.getValue = function () {
    return {
        id: this.container,
        ref: this.ref,
        rdftype: "http://erozate.iutbayonne.univ-pau.fr/wind#PhotoComponent",
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

//Ajoute
WIND.Photo.prototype.onload = function (func) {
    this.photoviewer.addEventListener("open", func);
};

// Créer une nouvelle collection
WIND.Photo.prototype.addCollection = function (collectionName) {
    var mycollection = {};
    mycollection.name = collectionName;
    mycollection.photos = [];
    mycollection.miniatures = [];
    mycollection.tags = []; // TAGS
    this.collection.push(mycollection);
};

// Obtenir une collection par son nom
WIND.Photo.prototype.getCollection = function (collectionName) {
    for (var i = 0; i < this.collection.length; i++) {
        if (this.collection[i].name == collectionName) {
            return this.collection[i];
        }
    }
    return false;
};

// La méthode addPhoto sert à ajouter une photo dans le viewer
WIND.Photo.prototype.addPhoto = function (file, mini, collectionName) {
    var collectionRecuperee = this.getCollection(collectionName);
    collectionRecuperee.photos.push(file);
    collectionRecuperee.miniatures.push(mini);
    if (this.open == false) {
        this.photoviewer.openDzi(this.collection[0].photos[0]);
        this.open = true;
        this.photoviewer.source = new Seadragon.TileSource(600, 400, 256, 10);
    }
};

// Afficher les boutons
WIND.Photo.prototype.addControlButtons = function () {
    this.photoviewer.setDashboardEnabled(true);
};

// Cacher les boutons
WIND.Photo.prototype.removeControlButtons = function () {
    this.photoviewer.setDashboardEnabled(false);
};

// Activer zoom
WIND.Photo.prototype.enableZoom = function () {
    Seadragon.Config.zoomPerClick = 2;
    Seadragon.Config.zoomPerScroll = 1.2;
    Seadragon.Config.zoomPerSecond = 2;
};

// Désactiver zoom
WIND.Photo.prototype.disableZoom = function () {
    Seadragon.Config.zoomPerClick = 1;
    Seadragon.Config.zoomPerScroll = 1;
    Seadragon.Config.zoomPerSecond = 1;
};

//Active le déplacement de la photo à la souris
WIND.Photo.prototype.enableMouseNav = function () {
    this.photoviewer.setMouseNavEnabled(true);
};

//Désactive le déplacement de la photo à la souris
WIND.Photo.prototype.disableMouseNav = function () {
    this.photoviewer.setMouseNavEnabled(false);
};


// Changer de photo
WIND.Photo.prototype.switchTo = function (file) {
    if (file) {
        this.photoviewer.openDzi(file);
    } else {
        this.photoviewer.close();
    }
};

// Centrer la photo sur un point
WIND.Photo.prototype.moveTo = function (x, y) {

    this.photoviewer.viewport.panTo(new Seadragon.Point(x, y), true);
};

// Déplacer la photo
WIND.Photo.prototype.moveBy = function (x, y) {

    this.photoviewer.viewport.panBy(new Seadragon.Point(x, y), true);
};

//Aller au niveau de zoom spécifié en paramètre
WIND.Photo.prototype.zoomTo = function (level) {
    this.photoviewer.viewport.zoomTo(level);
};

//Multiplie le ziveau de zoom actuel par celui passé en paramètre
WIND.Photo.prototype.zoomBy = function (level) {
    this.photoviewer.viewport.zoomBy(level);
};

//Associer un <div> pour la barre de miniatures
WIND.Photo.prototype.setSwitchBarContainer = function (div) {
    this.switchBarContainer = div;
};

//Associer un <div> pour la liste des collections 
WIND.Photo.prototype.setTreeContainer = function (div) {
    this.treeContainer = div;
};

// Afficher la barre de miniatures
WIND.Photo.prototype.addSwitchBar = function (collectionName) {
    if (!this.switchBar) {
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id", this.switchBarContainer);
        var collectionRecuperee = this.getCollection(collectionName);
        var view = this.photoviewer;

        for (var i = 0; i < collectionRecuperee.photos.length; i++) {
            var img = document.createElement("img");
            img.setAttribute("src", collectionRecuperee.miniatures[i]);
            img.setAttribute("alt", collectionRecuperee.photos[i]);
            img.setAttribute("border", "5");
            img.setAttribute("bordercolor", "white");
            img.setAttribute("width", "110");
            img.setAttribute("height", "70");
            img.setAttribute("hspace", "10");
            img.onclick = function () {
                view.openDzi(this.alt);
            };
            newdiv.appendChild(img);
        }

        document.body.appendChild(newdiv);
        this.switchBar = true;
    }
};

// Enlever la barre de miniatures
WIND.Photo.prototype.removeSwitchBar = function (collectionName) {
    if (this.switchBar) {
        document.body.removeChild(document.getElementById(this.switchBarContainer));
        this.switchBar = false;
    }
};

// Affiche l'arborescence des collections
WIND.Photo.prototype.addTree = function () {
    if (!this.tree) {
        var myGlobal = this;
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id", this.treeContainer);
        var col = this.collection;

        var tree;

        tree = new YAHOO.widget.TreeView(newdiv);
        var root = tree.getRoot();

        for (var i = 0; i < col.length; i++) {
            var colName = this.collection[i].name;
            var tmpNode = new YAHOO.widget.TextNode(colName, root, true);
        }

        tree.subscribe("labelClick", function (node) {
            myGlobal.removeSwitchBar();
            myGlobal.addSwitchBar(node.label);
        });

        tree.render();

        var cont = document.getElementById("container");
        document.body.insertBefore(newdiv, cont);
        this.tree = true;
    }
};

// Enlever l'arborescence
WIND.Photo.prototype.removeTree = function () {
    if (this.tree) {
        document.body.removeChild(document.getElementById(this.treeContainer));
        this.tree = false;
    }
};

//Créer une partie sensible sur la photo
WIND.Photo.prototype.createSensiblePart = function (str) {

    var spart = new WIND.PhotoPart(str, this);
    spart.initCanvas();
    this.parts.push(spart);
    return spart;
};

Point = function (x, y) {
    this.x = x;
    this.y = y;
};

function pointInPolygon(point, polygon) {
    var j = polygon.length - 1;
    var inside = false;
    for (var i = 0; i < polygon.length; i++) {
        if (polygon[i].y < point.y && polygon[j].y >= point.y || polygon[j].y < point.y && polygon[i].y >= point.y) {
            if (Number(polygon[i].x) + Number((point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) * (polygon[j].x - polygon[i].x)) < Number(point.x)) {
                inside = !inside;
            }
        }

        j = i;
    }
    //alert(inside);
    return inside;
}

// Constructeur de la classe WIND.Photo.Part	
WIND.PhotoPart = function (str, photoviewer) {

    this.points = [];

    var glob = this;
    var posd = str.lastIndexOf('(');
    var posf = str.lastIndexOf(')');
    var strvalues = str.substring(posd + 1, posf);

    this.figure = str.substring(0, posd);
    //alert(this.figure);

    if (this.figure == "POLYGON") {
        var form = strvalues.split(',');

        for (var i = 0; i < form.length; i++) {
            var coord = form[i].split(' ');
            var p = new Point(coord[0], coord[1]);
            glob.points.push(p);
        }
    } else if (this.figure == "PIN") {
        var coord = strvalues.split(' ');
        var p = new Point(coord[0], coord[1]);
        glob.points.push(p);
    }
    //alert(this.points[0].y);

    //this.photo = photoviewer;
    //this.canvas;

    // Utiliser this.viewer pour la meme maniere de la TextPart, MapPart, ...
    this.viewer = photoviewer;

    this.origin = null;
    this.rect = null;
    this.canvasValues;
    this.canvasRest;
    this.interieur = "black"; // par default
    this.contour = "black"; // par default
    this.clicdiscov = false;
};

// Ajoute
var comparer = function (pp1, pp2) {
    var nb1 = pp1.length;
    var nb2 = pp2.length;
    if (nb1 != nb2) {
        return false;
    } else {
        var res = true;
        for (var i = 0; i < nb1; i++) {
            if (pp1[i].x != pp2[i].x || pp1[i].y != pp2[i].y) {
                res = false;
                break;
            }
        }
        return res;
    }
};
// The WIND.PhotoPart object inherits all of the WIND.SensiblePart object's methods
WIND.PhotoPart.prototype = new WIND.SensiblePart("photo");

// Initialisation du canvas	
WIND.PhotoPart.prototype.initCanvas = function () {
    if (this.figure == "POLYGON") {
        this.canvas = document.createElement("canvas");
        this.canvasValues = this.getCanvasValues();
        this.canvas.setAttribute("width", this.canvasValues[2]);
        this.canvas.setAttribute("height", this.canvasValues[3]);

        var g = this.points;
        var global = this; //Permet la visibilité du PhotoPart dans les fonctions de niveau inférieur
        this.canvas.onclick = function (evt) {
            var pointClic = clicCoordinates(evt, global.canvasValues, global);
            for (var i = 0; i < global.viewer.interactionList.length; i++) {
                var interact = global.viewer.interactionList[i];
                var cible = interact.source;
                var event = interact.event;
                var tmp = interact.reactions;
                var pointClic = clicCoordinates(evt, global.canvasValues, global);
                if ((event == "click") && pointInPolygon(pointClic, g) && comparer(cible.points, g)) {
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                    }
                }
            }
        };
        /*
		this.canvas.onmouseover = function(evt){
		alert("over");
			for (var i = 0; i < global.viewer.interactionList.length; i++) {
				var interact = global.viewer.interactionList[i];
				var cible = interact.source;
				var event = interact.event;
				var tmp = interact.reactions;
				var pointClic = clicCoordinates(evt, global.canvasValues, global);
				if ((event == "mouseover") && pointInPolygon(pointClic, g) && comparer(cible.points, g)) {
					for (var j = 0; j<tmp.length; j++) {
						tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
					}
				}
			}
		}
*/
        this.canvas.onmouseover = function (evt) {

            var pointClic = clicCoordinates(evt, global.canvasValues, global);

            if (pointInPolygon(pointClic, g)) {
                Seadragon.Config.zoomPerClick = 1;
                this.style.cursor = 'pointer';
            } else {
                if (!global.clicdiscov) {
                    Seadragon.Config.zoomPerClick = 2;
                }
                this.style.cursor = 'default';
            }
            for (var i = 0; i < global.viewer.interactionList.length; i++) {
                var interact = global.viewer.interactionList[i];
                var cible = interact.source;
                var event = interact.event;
                var tmp = interact.reactions;
                var pointClic = clicCoordinates(evt, global.canvasValues, global);
                if ((event == "mouseover") && pointInPolygon(pointClic, g) && comparer(cible.points, g)) {
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                    }
                }
                if ((event == "mouseout") && pointInPolygon(pointClic, g) == false && comparer(cible.points, g)) {
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                    }
                }
            }
        };

        this.canvas.onmouseout = function () {
            if (!global.clicdiscov) {
                Seadragon.Config.zoomPerClick = 2;
            }


            for (var i = 0; i < global.viewer.interactionList.length; i++) {
                var interact = global.viewer.interactionList[i];
                var cible = interact.source;
                var event = interact.event;
                var tmp = interact.reactions;

                if ((event == "mouseout") && comparer(cible.points, g)) {
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                    }
                }
            }
        };

        var cntx = this.canvas.getContext('2d');

        //On dessine la forme dans l'élément <canvas>		
        cntx.beginPath();

        var org = this.relativeToAbsolute(this.points[0].x - this.origin.x, this.points[0].y - this.origin.y);
        cntx.moveTo(org.x, org.y);

        for (var i = 1; i < this.points.length; i++) {
            var pt = this.relativeToAbsolute(this.points[i].x - this.origin.x, this.points[i].y - this.origin.y);
            cntx.lineTo(pt.x, pt.y);
        }
        cntx.closePath();
        cntx.fill();


        this.rect = new Seadragon.Rect(parseFloat(this.origin.x), parseFloat(this.origin.y),
            this.canvasValues[0], this.canvasValues[1]);

        //On ajoute le <canvas> sur la photo
        this.viewer.photoviewer.drawer.addOverlay(this.canvas, this.rect);
    } else if (this.figure == "PIN") {
        var img = document.createElement("img");
        var point = new Seadragon.Point(parseFloat(this.points[0].x), parseFloat(this.points[0].y));
        var placement = Seadragon.OverlayPlacement.BOTTOM;
        img.src = lib_path + "images/pin.png";
        img.onmouseover = function () {
            this.style.cursor = 'pointer';
        };
        this.viewer.photoviewer.drawer.addOverlay(img, point, placement);
    }

};

// Cette fonction calcule les coordonnées relatives du clic en fonction des coordonnées absolues
function clicCoordinates(event, values, thispart) {
    var pointc = new Point(event.layerX, event.layerY);
    var internratioX = pointc.x / (thispart.canvas.offsetWidth); // Coordonnées relatives du clic
    var internratioY = pointc.y / (thispart.canvas.offsetHeight); // à l'intérieur du canvas

    var globalwiX = internratioX * values[0]; // Coordonnées relatives du clic par rapport à l'image
    var globalheY = internratioY * values[1]; // avec pour origine le coin supérieur gauche du canvas

    var largeurRatio = globalwiX + parseFloat(thispart.origin.x); // Coordonnées relatives du clic par rapport à l'image
    var hauteurRatio = globalheY + parseFloat(thispart.origin.y); // (avec pour origine le coin supérieur gauche de l'image)
    var clicCoord = new Point(largeurRatio, hauteurRatio);

    return clicCoord;
}



// Définit le point d'origine du canvas (point supérieur gauche) en coordonnées relatives
// Renvoie un tableau contenant la largeur et la hauteur du canvas, en coordonnées relatives et en pixels
WIND.PhotoPart.prototype.getCanvasValues = function () {
    var minX = 1;
    var maxX = 0;
    var minY = 1;
    var maxY = 0;

    // Détermination des coordonnées minimales et maximales des points de la figure (coordonnées relatives)
    for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].x < minX) {
            minX = this.points[i].x
        }
        if (this.points[i].x > maxX) {
            maxX = this.points[i].x
        }
        if (this.points[i].y < minY) {
            minY = this.points[i].y
        }
        if (this.points[i].y > maxY) {
            maxY = this.points[i].y
        }
    }

    this.origin = new Point(minX, minY);

    var rectX = (maxX - minX); // Largeur relative du canvas par rapport à l'image
    var rectY = (maxY - minY); // Hauteur relative du canvas par rapport à l'image
    var relativeDim = this.relativeToAbsolute(rectX, rectY);

    var size = [rectX, rectY, relativeDim.x, relativeDim.y];
    return size;
};

//Transforme des valeurs relatives en valeurs absolues(pixels)
WIND.PhotoPart.prototype.relativeToAbsolute = function (relX, relY) {

    var imgHeight = 1 / this.viewer.photoviewer.source.aspectRatio; // Calcul du rapport de la hauteur de l'image par rapport à sa largeur
    var dimX = this.viewer.photoviewer.source.dimensions.x;
    var dimY = this.viewer.photoviewer.source.dimensions.y;

    return new Point(relX * dimX, (relY * dimY) / imgHeight);
};

//Rend invisible la partie sensible
WIND.PhotoPart.prototype.show = function () {

    this.canvas.style.opacity = 1;
};

//Déplacer la partie sensible aux coordonées passées en paramètre
WIND.PhotoPart.prototype.move = function (newX, newY) {
    //On détache le <canvas> de l'image
    this.viewer.photoviewer.drawer.removeOverlay(this.canvas);
    var g = this;
    var newPoint = new Point(newX, newY);

    //Mise à jour des valeurs
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].x = parseFloat(this.points[i].x) + parseFloat(newX) - parseFloat(this.origin.x);
        this.points[i].y = parseFloat(this.points[i].y) + parseFloat(newY) - parseFloat(this.origin.y);
    }
    this.canvasValues = this.getCanvasValues();
    this.origin = new Point(newX, newY);
    this.rect.x = parseFloat(newX);
    this.rect.y = parseFloat(newY);

    //On rattache le <canvas> à l'image
    this.viewer.photoviewer.drawer.addOverlay(this.canvas, this.rect);


    //Si le reste de la photo est caché
    if (this.canvasRest != null) {

        var restcntx = this.canvasRest.getContext('2d');
        restcntx.clearRect(0, 0, this.canvasRest.width, this.canvasRest.height);
        restcntx.fillRect(0, 0, this.viewer.photoviewer.source.dimensions.x, this.viewer.photoviewer.source.dimensions.y);

        restcntx.globalCompositeOperation = 'xor';

        restcntx.beginPath();

        var org = this.relativeToAbsolute(this.points[0].x, this.points[0].y);
        restcntx.moveTo(org.x, org.y);

        for (var i = 1; i < this.points.length; i++) {
            var pt = this.relativeToAbsolute(this.points[i].x, this.points[i].y);
            restcntx.lineTo(pt.x, pt.y);
        }
        restcntx.fill();

        var fullRect = new Seadragon.Rect(0, 0, 1, 1 / this.viewer.photoviewer.source.aspectRatio);
    }

};

//Focalisation sur la partie sensible
WIND.PhotoPart.prototype.focus = function () {
    this.viewer.photoviewer.viewport.fitBounds(this.rect);
};

//Rendre visible la partie sensible
WIND.PhotoPart.prototype.hide = function () {
    this.canvas.style.opacity = 0;
};

//Changer la couleur de fonc et de contour
WIND.PhotoPart.prototype.color = function (interieur, contour) {

    var g = this;
    var cntx = this.canvas.getContext('2d');
    cntx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    cntx.beginPath();
    var org = this.relativeToAbsolute(this.points[0].x - this.origin.x, this.points[0].y - this.origin.y);
    cntx.moveTo(org.x, org.y);

    for (var i = 1; i < this.points.length; i++) {
        var pt = this.relativeToAbsolute(this.points[i].x - this.origin.x, this.points[i].y - this.origin.y);
        cntx.lineTo(pt.x, pt.y);
    }
    if (interieur == "same") {
        cntx.fillStyle = this.interieur;
        cntx.fill();
    } else if (interieur != null) {
        cntx.fillStyle = interieur;
        cntx.fill();
    }

    if (contour == "same") {
        cntx.strokeStyle = this.contour;
        cntx.lineWidth = 30;
        cntx.closePath();
        cntx.stroke();
    } else if (contour != null) {
        cntx.strokeStyle = contour;
        cntx.lineWidth = 30;
        cntx.closePath();
        cntx.stroke();
    }
    this.viewer.photoviewer.drawer.addOverlay(this.canvas, this.rect);
};

//Cacher le reste de la photo
WIND.PhotoPart.prototype.hideRestPhoto = function (moveByClick) {
    if (!this.canvasRest) {
        this.canvasRest = document.createElement('canvas');
        this.canvasRest.setAttribute("width", this.viewer.photoviewer.source.dimensions.x);
        this.canvasRest.setAttribute("height", this.viewer.photoviewer.source.dimensions.y);

        var g = this.points;
        var global = this;

        //Si "true" est passé en paramètre, on ajoute une fonction "onclick" à canvasRest pour pouvoir déplacer la partie sensible en cliquant sur la photo
        if (moveByClick == true) {
            Seadragon.Config.zoomPerClick = 1;
            this.canvasRest.onclick = function (evt) {

                var pointClic = getCoord(evt, global.canvasValues, global);
                global.move(pointClic.x, pointClic.y);
                global.clicdiscov = true;
            };
        }

        restcntx = this.canvasRest.getContext('2d');
        restcntx.fillRect(0, 0, this.viewer.photoviewer.source.dimensions.x, this.viewer.photoviewer.source.dimensions.y);
        restcntx.globalCompositeOperation = 'xor';

        restcntx.beginPath();

        var org = this.relativeToAbsolute(this.points[0].x, this.points[0].y);
        restcntx.moveTo(org.x, org.y);

        for (var i = 1; i < this.points.length; i++) {
            var pt = this.relativeToAbsolute(this.points[i].x, this.points[i].y);
            restcntx.lineTo(pt.x, pt.y);
        }
        restcntx.fill();

        var fullRect = new Seadragon.Rect(0, 0, 1, 1 / this.viewer.photoviewer.source.aspectRatio);
        this.viewer.photoviewer.drawer.addOverlay(this.canvasRest, fullRect);


    }
    //Cette fonction renvoie les coordonnées relatives du point cliqué 
    function getCoord(event, values, thispart) {
        var pointc = new Point(event.layerX, event.layerY);

        var internratioX = pointc.x / (thispart.canvasRest.offsetWidth); // Coordonnées relatives du clic
        var internratioY = pointc.y / (thispart.canvasRest.offsetHeight); // à l'intérieur du canvas

        var clicCoord = new Point(internratioX, internratioY * (1 / thispart.viewer.photoviewer.source.aspectRatio));

        return clicCoord;
    }
};

//Révéler le reste de la photo
WIND.PhotoPart.prototype.showRestPhoto = function () {

    var fullRect = new Seadragon.Rect(0, 0, 1, 1 / this.viewer.photoviewer.source.aspectRatio);
    this.viewer.photoviewer.drawer.removeOverlay(this.canvasRest, fullRect);
    this.canvasRest = null;
    this.clicdiscov = false;
};