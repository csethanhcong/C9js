/**
	Creates an object of the Map class.
	@memberOf WIND
	@class Creates an object of the Map class to be displayed on the web page.
	@param {String} iddiv The ID of the Map object.
	@param {JSON} options String in JSON format to set options for the Map objet.
	@example var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
*/

WIND.Map = function (iddiv, options) {
    this.type = "map";
    this.top = 10;
    this.left = 10;
    this.width = 600;
    this.height = 400;
    this.color = "#3366CC";
    this.border = "#3366CC 2px solid";
    this.name = "Map Displayer";
    this.icon = lib_path + "images/mvizicon.png";
    // Admin action configuration for the designer
    this.draggable = false;
    this.resizable = false;
    this.header = false;
    this.removable = false;
    this.configurable = false;

    // Action given for users
    this.zoomable = true;
    this.pannable = true;
    this.showscale = true;
    this.showposition = true;
    this.showlocation = false;
    this.showitinerary = false;
    this.showtoolbar = false;
	wind_map = true;
    // Action given for users
    this.tool = new Array();

    if (options) {
        if (options.draggable == true) this.draggable = options.draggable;
        if (options.resizable == true) this.resizable = options.resizable;
        if (options.header == true) this.header = options.header;
        if (options.removable == true) this.removable = options.removable;
        if (options.configurable == true) this.configurable = options.configurable;
        if (this.draggable == true || this.removable == true || this.configurable == true) this.header = true;

        if (options.zoomable == false) this.zoomable = false;
        if (options.pannable == false) this.pannable = false;

        if (options.type) {
            this.baseLayer = options.type;
        }
        if (options.longitude || options.longitude == 0) {
            this.longitude = options.longitude;
        }
        if (options.latitude || options.latitude == 0) {
            this.latitude = options.latitude;
        }
        if (options.zoom || options.zoom == 0) {
            this.zoom = options.zoom;
        }
    }

    var outerDiv = $create("div").attr("id", iddiv + "Outer");

    if (options.top) this.top = options.top;

    if (options.left) this.left = options.left;

    if (options.width) this.width = options.width;

    if (options.height) this.height = options.height;

    if (options.color) this.color = options.color;
    if (options.border) this.border = options.border;

    outerDiv.css({"position": "absolute", "top": this.top + "px", "left": this.left + "px", "width": this.width + "px", "height": this.height + "px", "border": this.border});
    if (options.parentEl) this.parentEl = options.parentEl;
    if (options.name) this.name = options.name;
    if (options.icon) this.icon = options.icon;

    var mapDiv;
    if ($id(iddiv).length)
        mapDiv = $id(iddiv);
    else {
        mapDiv = $create("div").attr("id", iddiv);
    }
    mapDiv.css({"position": "absolute", "top": "0px", "width": "100%", "height": "100%"});
    outerDiv.append(mapDiv);
    if (options.parentEl) {
        this.parentEl = options.parentEl;
        $id(options.parentEl).append(outerDiv);
    } else $("body").append(outerDiv);

    if (this.header) {
        var headerDiv = $create("div")
                            .attr("id", iddiv + "Handle")
                            .css({"position": "absolute", "width": "100%", "height": "20px", "background-color": this.color, "zIndex": 2});
        if (this.draggable) headerDiv.css("cursor", "move");

        var iconSpan = $attrs($create("img"), {"src": this.icon, "alt": "[ ]", "title": "MapDisplayer"}).css("float", "left");
        headerDiv.append(iconSpan);

        var nameNode = $create("span")
                            .css({"color": "#FFFFFF", "paddingLeft": "3px"})
                            .text(this.name);
        headerDiv.append(nameNode);

        var configDiv = $create("div")
                            .attr("id", iddiv + "Configuration")
                            .css({"position": "absolute", "width": "100%", "marginTop": "20px", "background-color": "#E4E4E4", "zIndex": 11, "display": "none"});
        outerDiv.append(configDiv);

        var that = this;

        // Name of displayer
        var label1 = $create("span").text("Name: ");
        configDiv.append(label1);
        //configDiv.append($create("br"));
        var input1 = $attrs($create("input"), {"type": "text", "id": iddiv + "Configuration_Name", "name": iddiv + "Configuration_Name", "size": 30, "value": this.name});
        configDiv.append(input1);
        input1.blur(function () {
            var nomafficheur = $id(iddiv + "Configuration_Name").val();
            if ((nomafficheur != null) && (nomafficheur != '')) {
                that.name = nomafficheur;
                nameNode.remove(nameNode.firstChild);
                nameNode.append(document.createTextNode(that.name));
            }
            that.eventConfigured.fire(that);
        });
        /*
		var nameButton = $create("input");
		nameButton.type = "button";
		nameButton.id = iddiv + "Configuration_Name_OK";
		nameButton.name = iddiv + "Configuration_Name_OK";
		nameButton.value = "OK";
		configDiv.append(nameButton);
		nameButton.onclick = function() {
			var nomafficheur = $id(iddiv + "Configuration_Name").value;
			if ((nomafficheur != null) && (nomafficheur != '')) {
				that.name = nomafficheur;
				nameNode.remove(nameNode.firstChild);
				nameNode.append(document.createTextNode(that.name));
			}
			that.eventConfigured.fire(that);
		};
		*/
        configDiv.append($create("br"));
        // Color of displayer
        var label2 = $create("span").text("Color: ");
        configDiv.append(label2);
        var input2 = $attrs($create("select"), {"id": iddiv + "Configuration_Color", "name": iddiv + "Configuration_Color"}).css("background", this.color);
        configDiv.append(input2);
        var colorTab = ["#00248E", "#0033CC", "#809FFE", "#BFCFFE", "#12127D", "#1919B3", "#9191FE", "#C8C8FE", "#24006B", "#330099", "#AA80FE", "#D4BFFE", "#2D006B", "#400099", "#B580FE", "#DABFFE", "#47006B", "#660099", "#D580FE", "#EABFFE", "#6B006B", "#990099", "#FF80FE", "#FFBFFE", "#8E006B", "#CC0099", "#FE80DF", "#FEBFEF", "#A10048", "#E60066", "#FE80B9", "#FEBFDC", "#B20000", "#FF0000", "#FE8080", "#FEBFBF", "#B22400", "#FF3300", "#FE9980", "#FECCBF", "#B24700", "#FF6600", "#FEB380", "#FED9BF", "#B25900", "#FF8000", "#FEBF80", "#FEDFBF", "#B26B00", "#FF9900", "#FECC80", "#FEE6BF", "#B27D00", "#FFB200", "#FED980", "#FEECBF", "#B28F00", "#FFCC00", "#FEE680", "#FEF2BF", "#B2A100", "#FFE500", "#FEF280", "#FEF9BF", "#B2B300", "#FFFF00", "#FEFF80", "#FEFFBF", "#8FB200", "#CCFF00", "#E6FE80", "#F2FEBF", "#6BB200", "#99FF00", "#CCFE80", "#E6FEBF", "#24B200", "#33FF00", "#99FE80", "#CCFEBF", "#008E00", "#00CC00", "#80FE80", "#BFFEBF", "#007D47", "#00B366", "#80FEC8", "#BFFEE3", "#006B6B", "#009999", "#80FFFE", "#BFFFFE", "#00477D", "#0066B3", "#80C8FE", "#BFE3FE"];
        $.each(colorTab, function(i, v){
            var opt = $create("option")
                            .text(v)
                            .attr("value", v);
            opt.css({"background": v, "position": "absolute", "width": "100px", "height": "30px"})
            if (v == this.color) opt.attr("selected", true);
            input2.append(opt);
        });
        input2.change(function (){
            $(this).css("background", $("option:selected").val());
            that.color = $("option:selected").val();
            that.border = $("option:selected").val() + " 2px solid";
            $id(iddiv + "Handle").css("background-color", that.color);
            $id(iddiv + "Outer").css("border", that.border);
        });

        configDiv.append($create("br"));
        // Zoomable
        var label3 = $create("span").text("Zoomable: ");
        configDiv.append(label3);
        var input31 = $attrs($create("input"), {"type": "radio", "id": iddiv + "Configuration_Zoomable_Yes", "name": iddiv + "Configuration_Zoomable"});
        if (this.zoomable == true) input31.checked = "checked";
        configDiv.append(input31);
        var labelInput31 = $create("label");
        //labelInput31.for = iddiv + "Configuration_Zoomable";
        labelInput31.append(document.createTextNode("Yes "));
        configDiv.append(labelInput31);
        var input32 = $create("input");
        input32.type = "radio";
        input32.id = iddiv + "Configuration_Zoomable_No";
        input32.name = iddiv + "Configuration_Zoomable";
        if (this.zoomable == false) input32.checked = "checked";
        configDiv.append(input32);
        var labelInput32 = $create("label");
        //labelInput32.for = iddiv + "Configuration_Zoomable";
        labelInput32.append(document.createTextNode("No "));
        configDiv.append(labelInput32);
        input31.onclick = function () {
            that.zoomable = true;
            if (that.pannable)
                that.setMouseControl({
                    'zoomWheelEnabled': true,
                    'zoomBoxEnabled': true,
                    'zoomDbClickEnabled': true,
                    'panEnabled': true
                });
            else
                that.setMouseControl({
                    'zoomWheelEnabled': true,
                    'zoomBoxEnabled': true,
                    'zoomDbClickEnabled': true,
                    'panEnabled': false
                });
            that.addZoomControl();
        };
        input32.onclick = function () {
            that.zoomable = false;
            if (that.pannable)
                that.setMouseControl({
                    'zoomWheelEnabled': false,
                    'zoomBoxEnabled': false,
                    'zoomDbClickEnabled': false,
                    'panEnabled': true
                });
            else
                that.setMouseControl({
                    'zoomWheelEnabled': false,
                    'zoomBoxEnabled': false,
                    'zoomDbClickEnabled': false,
                    'panEnabled': false
                });
            that.removeZoomControl();
        };

        configDiv.append($create("br"));
        // Pannable
        var label4 = $create("span");
        label4.append(document.createTextNode("Pannable: "));
        configDiv.append(label4);
        var input41 = $create("input");
        input41.type = "radio";
        input41.id = iddiv + "Configuration_Pannable_Yes";
        input41.name = iddiv + "Configuration_Pannable";
        if (this.pannable == true) input41.checked = "checked";
        configDiv.append(input41);
        var labelInput41 = $create("label");
        //labelInput41.for = iddiv + "Configuration_Pannable";
        labelInput41.append(document.createTextNode("Yes "));
        configDiv.append(labelInput41);
        var input42 = $create("input");
        input42.type = "radio";
        input42.id = iddiv + "Configuration_Pannable_No";
        input42.name = iddiv + "Configuration_Pannable";
        if (this.pannable == false) input42.checked = "checked";
        configDiv.append(input42);
        var labelInput42 = $create("label");
        //labelInput42.for = iddiv + "Configuration_Pannable";
        labelInput42.append(document.createTextNode("No "));
        configDiv.append(labelInput42);
        input41.onclick = function () {
            that.pannable = true;
            if (that.zoomable)
                that.setMouseControl({
                    'zoomWheelEnabled': true,
                    'zoomBoxEnabled': true,
                    'zoomDbClickEnabled': true,
                    'panEnabled': true
                });
            else
                that.setMouseControl({
                    'zoomWheelEnabled': false,
                    'zoomBoxEnabled': false,
                    'zoomDbClickEnabled': false,
                    'panEnabled': true
                });
        };
        input42.onclick = function () {
            that.pannable = false;
            if (that.zoomable)
                that.setMouseControl({
                    'zoomWheelEnabled': true,
                    'zoomBoxEnabled': true,
                    'zoomDbClickEnabled': true,
                    'panEnabled': false
                });
            else
                that.setMouseControl({
                    'zoomWheelEnabled': false,
                    'zoomBoxEnabled': false,
                    'zoomDbClickEnabled': false,
                    'panEnabled': false
                });
        };

        configDiv.append($create("br"));
        // Show Scale
        var label5 = $create("span");
        label5.append(document.createTextNode("Show scale: "));
        configDiv.append(label5);
        var input51 = $create("input");
        input51.type = "radio";
        input51.id = iddiv + "Configuration_Showscale_Yes";
        input51.name = iddiv + "Configuration_Showscale";
        if (this.showscale == true) input51.checked = "checked";
        configDiv.append(input51);
        var labelInput51 = $create("label");
        //labelInput51.for = iddiv + "Configuration_Showscale";
        labelInput51.append(document.createTextNode("Yes "));
        configDiv.append(labelInput51);
        var input52 = $create("input");
        input52.type = "radio";
        input52.id = iddiv + "Configuration_Showscale_No";
        input52.name = iddiv + "Configuration_Showscale";
        if (this.showscale == false) input52.checked = "checked";
        configDiv.append(input52);
        var labelInput52 = $create("label");
        //labelInput52.for = iddiv + "Configuration_Showscale";
        labelInput52.append(document.createTextNode("No "));
        configDiv.append(labelInput52);
        input51.onclick = function () {
            that.showscale = true;
            that.scaleControl = new OpenLayers.Control.Scale();
            that.olMap.addControl(that.scaleControl);
        };
        input52.onclick = function () {
            that.showscale = false;
            that.olMap.removeControl(that.scaleControl);
        };

        configDiv.append($create("br"));
        // Show Position
        var label6 = $create("span");
        label6.append(document.createTextNode("Show position: "));
        configDiv.append(label6);
        var input61 = $create("input");
        input61.type = "radio";
        input61.id = iddiv + "Configuration_Showposition_Yes";
        input61.name = iddiv + "Configuration_Showposition";
        if (this.showposition == true) input61.checked = "checked";
        configDiv.append(input61);
        var labelInput61 = $create("label");
        //labelInput61.for = iddiv + "Configuration_Showposition";
        labelInput61.append(document.createTextNode("Yes "));
        configDiv.append(labelInput61);
        var input62 = $create("input");
        input62.type = "radio";
        input62.id = iddiv + "Configuration_Showposition_No";
        input62.name = iddiv + "Configuration_Showposition";
        if (this.showposition == false) input62.checked = "checked";
        configDiv.append(input62);
        var labelInput62 = $create("label");
        //labelInput62.for = iddiv + "Configuration_Showposition";
        labelInput62.append(document.createTextNode("No "));
        configDiv.append(labelInput62);
        input61.onclick = function () {
            that.showposition = true;
            that.positionControl = new OpenLayers.Control.MousePosition();
            that.olMap.addControl(that.positionControl);
        };
        input62.onclick = function () {
            that.showposition = false;
            that.olMap.removeControl(that.positionControl);
        };

        configDiv.append($create("br"));
        // Layers
        var label7 = $create("span");
        label7.append(document.createTextNode("Layers: "));
        configDiv.append(label7);
        for (var i = 0; i < WIND.Map.Type.length; i++) {
            var layerChoice = $create("input");
            layerChoice.type = "checkbox";
            layerChoice.id = iddiv + "Configuration_Layer" + i;
            layerChoice.name = iddiv + "Configuration_Layer" + i;
            configDiv.append(layerChoice);
            var layerChoiceLabel = $create("label");
            //layerChoiceLabel.for = iddiv + "Configuration_Layer" + i;
            layerChoiceLabel.append(document.createTextNode(WIND.Map.Type[i] + " "));
            configDiv.append(layerChoiceLabel);
            if (WIND.Map.Type[i] == this.baseLayer) {
                layerChoice.checked = true;
                layerChoice.disabled = true;
            }
            layerChoice.onclick = function (e) {
                var layerName = this.id;
                var layerNum = layerName.substring(layerName.length - 1, layerName.length);
                if (this.checked)
                    that.addLayer(WIND.Map.Type[Number(layerNum)], false);
                else that.removeLayer(WIND.Map.Type[Number(layerNum)]);
            };
        }

        configDiv.append($create("br"));
        // Toolbar
        var label8 = $create("span");
        label8.append(document.createTextNode("Toolbar: "));
        configDiv.append(label8);
        var input81 = $create("input");
        input81.type = "radio";
        input81.id = iddiv + "Configuration_Showtoolbar_Yes";
        input81.name = iddiv + "Configuration_Showtoolbar";
        if (this.showtoolbar == true) input81.checked = "checked";
        configDiv.append(input81);
        var labelInput81 = $create("label");
        //labelInput81.for = iddiv + "Configuration_Showtoolbar";
        labelInput81.append(document.createTextNode("Yes "));
        configDiv.append(labelInput81);
        var input82 = $create("input");
        input82.type = "radio";
        input82.id = iddiv + "Configuration_Showtoolbar_No";
        input82.name = iddiv + "Configuration_Showtoolbar";
        if (this.showtoolbar == false) input82.checked = "checked";
        configDiv.append(input82);
        var labelInput82 = $create("label");
        //labelInput82.for = iddiv + "Configuration_Showtoolbar";
        labelInput82.append(document.createTextNode("No "));
        configDiv.append(labelInput82);
        input81.onclick = function () {
            that.showtoolbar = true;
            pointChoice.disabled = false;
            pointChoiceIcon.src = lib_path + "images/draw_point_on.png";
            lineChoice.disabled = false;
            lineChoiceIcon.src = lib_path + "images/draw_line_on.png";
            polygonChoice.disabled = false;
            polygonChoiceIcon.src = lib_path + "images/draw_polygon_on.png";
            that.addToolBarLite();
        };
        input82.onclick = function () {
            that.showtoolbar = false;
            pointChoice.disabled = true;
            pointChoiceIcon.src = lib_path + "images/draw_point_off.png";
            lineChoice.disabled = true;
            lineChoiceIcon.src = lib_path + "images/draw_line_off.png";
            polygonChoice.disabled = true;
            polygonChoiceIcon.src = lib_path + "images/draw_polygon_off.png";
            that.removeToolBar();
        };

        configDiv.append($create("br"));

        // Elements de la barre d'outil
        var pointChoiceIcon = $create("img");
        if (this.showtoolbar == true) {
            pointChoiceIcon.src = lib_path + "images/draw_point_on.png";
        } else {
            pointChoiceIcon.src = lib_path + "images/draw_point_off.png";
        }
        pointChoiceIcon.alt = "Point";
        pointChoiceIcon.title = "Point";
        configDiv.append(pointChoiceIcon);
        var pointChoice = $create("input");
        pointChoice.type = "checkbox";
        pointChoice.id = iddiv + "Configuration_Toolbar_PointChoice";
        pointChoice.name = iddiv + "Configuration_Toolbar_PointChoice";
        configDiv.append(pointChoice);
        if (this.showtoolbar == false) {
            pointChoice.disabled = true;
        }
        if (this.showtoolbar == true) {
            pointChoice.disabled = false;
        }
        var that = this;
        pointChoice.onclick = function (e) {
            if (this.checked) {
                that.addDrawing2ToolBar("point");
            }
        };

        var lineChoiceIcon = $create("img");
        if (this.showtoolbar == true) {
            lineChoiceIcon.src = lib_path + "images/draw_line_on.png";
        } else {
            lineChoiceIcon.src = lib_path + "images/draw_line_off.png";
        }
        lineChoiceIcon.alt = "Line";
        lineChoiceIcon.title = "Line";
        configDiv.append(lineChoiceIcon);
        var lineChoice = $create("input");
        lineChoice.type = "checkbox";
        lineChoice.id = iddiv + "Configuration_Toolbar_LineChoice";
        lineChoice.name = iddiv + "Configuration_Toolbar_LineChoice";
        configDiv.append(lineChoice);
        if (this.showtoolbar == false) {
            lineChoice.disabled = true;
        }
        if (this.showtoolbar == true) {
            lineChoice.disabled = false;
        }
        lineChoice.onclick = function (e) {
            if (this.checked) {
                that.addDrawing2ToolBar("line");
            }
        };

        var polygonChoiceIcon = $create("img");
        if (this.showtoolbar == true) {
            polygonChoiceIcon.src = lib_path + "images/draw_polygon_on.png";
        } else {
            polygonChoiceIcon.src = lib_path + "images/draw_polygon_off.png";
        }
        polygonChoiceIcon.alt = "Polygon";
        polygonChoiceIcon.title = "Polygon";
        configDiv.append(polygonChoiceIcon);
        var polygonChoice = $create("input");
        polygonChoice.type = "checkbox";
        polygonChoice.id = iddiv + "Configuration_Toolbar_PolygonChoice";
        polygonChoice.name = iddiv + "Configuration_Toolbar_PolygonChoice";
        configDiv.append(polygonChoice);
        if (this.showtoolbar == false) {
            polygonChoice.disabled = true;
        }
        if (this.showtoolbar == true) {
            polygonChoice.disabled = false;
        }
        polygonChoice.onclick = function (e) {
            if (this.checked) {
                that.addDrawing2ToolBar("polygon");
            }
        };

        /* Show Location
		var label9 = $create("span");
		label9.append(document.createTextNode("Show location bar: "));
		configDiv.append(label9);
		var input91 = $create("input");
		input91.type = "radio";
		input91.id = iddiv + "Configuration_Showlocation_Yes";
		input91.name = iddiv + "Configuration_Showlocation";
		if (this.showlocation == true) input91.checked = "checked";
		configDiv.append(input91);
		var labelInput91 = $create("label");
		//labelInput91.for = iddiv + "Configuration_Showlocation";
		labelInput91.append(document.createTextNode("Yes "));
		configDiv.append(labelInput91);
		var input92 = $create("input");
		input92.type = "radio";
		input92.id = iddiv + "Configuration_Showlocation_No";
		input92.name = iddiv + "Configuration_Showlocation";
		if (this.showlocation == false) input92.checked = "checked";
		configDiv.append(input92);
		var labelInput92 = $create("label");
		//labelInput92.for = iddiv + "Configuration_Showlocation";
		labelInput92.append(document.createTextNode("No "));
		configDiv.append(labelInput92);
		input91.onclick = function() {
			that.showlocation = true;
			that.addLocationBar();
		};
		input92.onclick = function() {
			that.showlocation = false;
			that.removeLocationBar();
		};
		
		configDiv.append($create("br"));
		// Show Itinerary
		var label10 = $create("span");
		label10.append(document.createTextNode("Show itinerary bar: "));
		configDiv.append(label10);
		var input101 = $create("input");
		input101.type = "radio";
		input101.id = iddiv + "Configuration_Showitinerary_Yes";
		input101.name = iddiv + "Configuration_Showitinerary";
		if (this.showitinerary == true) input101.checked = "checked";
		configDiv.append(input101);
		var labelInput101 = $create("label");
		//labelInput101.for = iddiv + "Configuration_Showitinerary";
		labelInput101.append(document.createTextNode("Yes "));
		configDiv.append(labelInput101);
		var input102 = $create("input");
		input102.type = "radio";
		input102.id = iddiv + "Configuration_Showitinerary_No";
		input102.name = iddiv + "Configuration_Showitinerary";
		if (this.showitinerary == false) input102.checked = "checked";
		configDiv.append(input102);
		var labelInput102 = $create("label");
		//labelInput102.for = iddiv + "Configuration_Showitinerary";
		labelInput102.append(document.createTextNode("No "));
		configDiv.append(labelInput102);
		input101.onclick = function() {
			that.showitinerary = true;
			that.addItineraryBar();
		};
		input102.onclick = function() {
			that.showitinerary = false;
			that.removeItineraryBar();
		};
		*/
        configDiv.append($create("br"));
        configDiv.append($create("br"));
        /*var button1 = $create("input");
		button1.type = "button";
		button1.id = iddiv + "Configuration_OK";
		button1.name = iddiv + "Configuration_OK";
		button1.value = "OK";
		configDiv.append(button1);
		*/
        this.eventConfigured = new YAHOO.util.CustomEvent("eventConfigured");

        /*
		button1.onclick = function() {
			var nomafficheur = $id(iddiv + "Configuration_Name").value;
			if ((nomafficheur != null) && (nomafficheur != '')) {
				that.name = nomafficheur;
				nameNode.remove(nameNode.firstChild);
				nameNode.append(document.createTextNode(that.name));
			}
			configDiv.style.display = "none";
			that.eventConfigured.fire(that);
			//zoom
			if ($id(iddiv + "Configuration_Zoomable_Yes").checked) {
				that.zoomable = true;
			}
			else if ($id(iddiv + "Configuration_Zoomable_No").checked) {
				that.zoomable = false;
			}
			
			if ($id(iddiv + "Configuration_Pannable_Yes").checked) {
				that.pannable = true;
			}
			else if ($id(iddiv + "Configuration_Pannable_No").checked) {
				that.pannable = false;
			}
			
			if (that.zoomable == true && that.pannable == true) {
				that.setMouseControl({'zoomWheelEnabled': true, 'zoomBoxEnabled': true, 'zoomDbClickEnabled': true, 'panEnabled': true});
				that.addZoomControl();
			}
			else if (that.zoomable == false && that.pannable == true) {
				that.setMouseControl({'zoomWheelEnabled': false, 'zoomBoxEnabled': false, 'zoomDbClickEnabled': false, 'panEnabled': true});
				that.removeZoomControl();
			}
			else if (that.zoomable == true && that.pannable == false) {
				that.setMouseControl({'zoomWheelEnabled': true, 'zoomBoxEnabled': true, 'zoomDbClickEnabled': true, 'panEnabled': false});
				that.addZoomControl();
			}
			else if (that.zoomable == false && that.pannable == false) {
				that.setMouseControl({'zoomWheelEnabled': false, 'zoomBoxEnabled': false, 'zoomDbClickEnabled': false, 'panEnabled': false});
				that.removeZoomControl();
			}
			that.eventConfigured.fire(that);
		};
		*/
        this.eventConfigured.subscribe(this.onConfigure, this, true);

        var button2 = $create("input");
        button2.type = "button";
        button2.id = iddiv + "Configuration_Cancel";
        button2.name = iddiv + "Configuration_Cancel";
        button2.value = "Close";
        configDiv.append(button2);
        button2.onclick = function () {
            configDiv.style.display = "none";
        };

        if (this.removable) {
            this.eventRemoved = new YAHOO.util.CustomEvent("eventRemoved");

            var removeSpan = $create("img")
                                .attr({
                                    src: lib_path + "images/close.png",
                                    alt: 'X',
                                    title: 'Click to delete'
                                })
                                .css({
                                    backgroundColor: '#EFEFEF',
                                    cssFloat: 'right',
                                    cursor: 'pointer'
                                });
            headerDiv.append(removeSpan);
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
            var configureSpan = $create("img")
                                .attr({
                                    src: lib_path + "images/gear.png",
                                    alt: '*',
                                    title: 'Click to configure'
                                })
                                .css({
                                    marginRight: '10px',
                                    cssFloat: 'right',
                                    cursor: 'pointer'
                                });
            headerDiv.append(configureSpan);
            configureSpan.onclick = function () {
                configDiv.css('display', 'block');
            };
        }

        outerDiv.append(headerDiv);

        if (this.draggable) {
            var dd = new YAHOO.util.DD(iddiv + "Outer");
            dd.setHandleElId(iddiv + "Handle");
            this.eventDragged = new YAHOO.util.CustomEvent("eventDragged");
            dd.on('endDragEvent', function (ev) {
                this.eventDragged.fire(this);
            }, this, true);

            this.eventDragged.subscribe(this.onDrag, this, true);
            if (options.parentEl) {
                var region = $id(options.parentEl);
                //Set left to x minus left 
                var left = outerDiv.offsetLeft - region.offsetLeft;
                //Set right to right minus x minus width 
                //var right = region.offsetLeft + region.offsetWidth - outerDiv.offsetLeft - outerDiv.offsetWidth; 
                //Set top to y minus top 
                var top = outerDiv.offsetTop - region.offsetTop;
                //Set bottom to bottom minus y minus height 
                var bottom = region.offsetTop + region.offsetHeight - outerDiv.offsetTop - outerDiv.offsetHeight;
                //Set the constraints based on the above calculations 
                dd.setXConstraint(left);
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
        var newdiv = $create("div");
        newdiv.id = "yui-gen0";
        newdiv.className = "yui-resize-handle yui-resize-handle-r";
        var newindiv = $create("div");
        newindiv.className = "yui-resize-handle-inner-r";
        newdiv.append(newindiv);
        outerDiv.append(newdiv);

        var newdiv = $create("div");
        newdiv.id = "yui-gen1";
        newdiv.className = "yui-resize-handle yui-resize-handle-b";
        var newindiv = $create("div");
        newindiv.className = "yui-resize-handle-inner-b";
        newdiv.append(newindiv);
        outerDiv.append(newdiv);

        var newdiv = $create("div");
        newdiv.id = "yui-gen2";
        newdiv.className = "yui-resize-handle yui-resize-handle-br";
        var newindiv = $create("div");
        newindiv.className = "yui-resize-handle-inner-br";
        newdiv.append(newindiv);
        outerDiv.append(newdiv);

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
    this.olMap = null;

    this.scaleControl = null;
    this.positionControl = null;
    this.mouseControl = null;
    this.keyboardControl = null;

    this.zoomControl = null;
    this.switcher = null;
    this.toolbar = null;
    this.locationbar = null;
    this.itinerarybar = null;

    if (!this.baseLayer) {
        this.baseLayer = "Google Street";
    }
    this.typeList = [];

    // List of sensible parts
    this.parts = [];
    this.vectorLayers = [];
	this.vlIndex = [];
    this.annotations = [];
    this.itineraries = [];


    // List of interactions -- feature v1.0.5 (16/4/2009)
    this.interactionList = [];

    var typesupport = false;
    for (var i = 0; i < WIND.Map.Type.length; i++) {
        if (this.baseLayer == WIND.Map.Type[i]) {
            typesupport = true;
            break;
        }
    }
    if (typesupport) {
        this.render();
    } else {
        $id(this.container).innerHTML = "Don't support map type " + this.baseLayer;
    }
};
var id_annot;
var index_annot = 0;
WIND.Map.prototype.onDrag = function () {
    this.top = $id(this.container + "Outer").offsetTop;
    this.left = $id(this.container + "Outer").offsetLeft;
};
WIND.Map.prototype.onResize = function () {
    this.width = $id(this.container + "Outer").offsetWidth;
    this.height = $id(this.container + "Outer").offsetHeight;
};
WIND.Map.prototype.onConfigure = function () {}; // to override
WIND.Map.prototype.onRemove = function () {}; // to override

/**
 Adds an annotation objet to the map. 
 @function
 @param {Annotation} annotation Annotation objet to add.
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addAnnotation(annotation);
 **/
WIND.Map.prototype.addAnnotation = function (annotation) {
    var valid = false;
    for (var i = 0; i < annotation.annotedObjects.length; i++) {
        if (annotation.annotedObjects.type == "map") {
            valid = true;
            break;
        }
    }
    this.annotations.push(annotation);
};
/**
 Creates ana Annotaion objet on the map.
 @function
 @param {String} type Represents the type of the Annotation objet to add. Its value can be anything.
 @param {String} entity Name of the annotated entity.
 @param {String} geodata Type and coordinates of the figure. It can either a "POLYGON", a "MULTIPOLYGON", a "LINESTRING", a "MULTILINESTRING", a "POINT", a "MULTIPOINT", a "MARKER" or a "MULTIMARKER.
 @param {JSON} [options] Options for the Annotation object. It may contain up to four parameters: <br>-projection, the projection we want to use, <br>-style, the style of the annotation and may contain 5 options: strokeColor, strokeWidth, strokeOpacity, fillColor and fillOpacity, <br>-display, either we diplay the annotation or not and <br>-geoname, the name of the geometry.
 @param {Integer} [vl=0] The Id of the vector layer we want to add the annotation to it.
 @return {Annotation} returns Annotation object.
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.createAnnotation("ville", "Mauléon-Licharre", "POINT(0.567893 45.64124)",{"projection":"EPSG:4326","style":"strokeColor:#0033CC,strokeWidth:3,strokeOpacity:1,fillColor:#FF9900,fillOpacity:1","display":true,"geoname":"point"},0);
 **/
WIND.Map.prototype.createAnnotation = function (type, entity, geodata, options, vl) {
	var nb;
	if(!vl || !this.vlIndex.indexOf(vl))
		nb=0;
	else nb=vl;
    var mappart = this.createSensiblePart(geodata, options, nb);
    var annotation = new WIND.Annotation(type, entity, mappart);
    this.annotations.push(annotation);
    return annotation;
};
/**
 Returns the properties of the Map object in the JSON format. 
 @function
 @return {JSON} String in the JSON format containing the properties.
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 var valeur = carte.getValue();
 **/
WIND.Map.prototype.getValue = function () {
    var ll = this.olMap.getCenter().clone();
    //ll.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
    ll.transform(this.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
    var z = this.olMap.getZoom();
    return {
        id: this.container,
        ref: this.ref,
        rdftype: "http://erozate.iutbayonne.univ-pau.fr/wind#MapComponent",
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
            zoomable: (this.zoomable) ? "yes" : "no",
            pannable: (this.pannable) ? "yes" : "no",
            scaleControl: (this.showscale == true) ? "yes" : "no",
            positionControl: (this.showposition == true) ? "yes" : "no",
            mouseControl: (this.mouseControl) ? "yes" : "no",
            keyboardControl: (this.keyboardControl) ? "yes" : "no",
            zoomControl: (this.zoomControl) ? "yes" : "no",
            switcher: (this.switcher) ? "yes" : "no",
            toolBar: (this.showtoolbar) ? "yes" : "no",
            pointToolBar: (this.drawPoint) ? "yes" : "no",
            lineToolBar: (this.drawLine) ? "yes" : "no",
            polygonToolBar: (this.drawPolygon) ? "yes" : "no",
            locationBar: (this.showlocation) ? "yes" : "no",
            itineraryBar: (this.showitinerary) ? "yes" : "no"
        },
        //layers: [this.olMap.baseLayer.name],
        layers: this.typeList,
        center: {
            longitude: ll.lon,
            latitude: ll.lat,
            zoom: z
        }
    }
};

WIND.Map.Type = ["Google Street", "Google Hybrid", "Google Satellite", "Google Terrain", "IGN Route", "IGN Satellite", "OpenStreetMap", "Yahoo Street", "Yahoo Hybrid", "Yahoo Satellite", "Bing Road", "Bing Hybrid", "Bing Aerial"];
/**
 Adds a tool to resize the map.
 @function
 @example
 carte.addScaleControl();
 **/
WIND.Map.prototype.addScaleControl = function () {
    if (this.scaleControl == null) {
        this.scaleControl = new OpenLayers.Control.Scale();
        this.olMap.addControl(this.scaleControl);
    }
};
WIND.Map.prototype.removeScaleControl = function () {
    if (this.scaleControl != null) {
        this.olMap.removeControl(this.scaleControl);
        this.scaleControl = null;
    }
};
WIND.Map.prototype.addPositionControl = function () {
    if (this.positionControl == null) {
        this.positionControl = new OpenLayers.Control.MousePosition();
        this.olMap.addControl(this.positionControl);
    }
};
WIND.Map.prototype.removePositionControl = function () {
    if (this.positionControl != null) {
        this.olMap.removeControl(this.positionControl);
        this.positionControl = null;
    }
};
WIND.Map.prototype.addMouseControl = function () {
    if (this.mouseControl == null) {
        this.mouseControl = new OpenLayers.Control.Navigation();
        this.olMap.addControl(this.mouseControl);
    }
};
WIND.Map.prototype.removeMouseControl = function () {
    if (this.mouseControl != null) {
        this.mouseControl.destroy();
    }
};
WIND.Map.prototype.setMouseControl = function (opt) {
    if (this.mouseControl != null) {
        this.mouseControl.destroy();
    }
    if (opt.zoomDbClickEnabled) {
        this.mouseControl = new OpenLayers.Control.Navigation();
        this.olMap.addControl(this.mouseControl);
    } else {
        this.mouseControl = new OpenLayers.Control.Navigation({
            'defaultDblClick': function (event) {
                return;
            }
        });
        this.olMap.addControl(this.mouseControl);
    }
    if (opt.zoomWheelEnabled)
        this.mouseControl.enableZoomWheel();
    else
        this.mouseControl.disableZoomWheel();
    if (opt.zoomBoxEnabled)
        this.mouseControl.enableZoomBox();
    else
        this.mouseControl.disableZoomBox();
    if (opt.panEnabled)
        this.mouseControl.dragPan.activate();
    else
        this.mouseControl.dragPan.deactivate();
};
WIND.Map.prototype.addKeyboardControl = function () {
    if (this.keyboardControl == null) {
        this.keyboardControl = new OpenLayers.Control.KeyboardDefaults();
        this.olMap.addControl(this.keyboardControl);
    }
};
WIND.Map.prototype.removeKeyboardControl = function () {
    if (this.keyboardControl != null) {
        this.olMap.removeControl(this.keyboardControl);
        this.keyboardControl = null;
    }
};

WIND.Map.prototype.addZoomControl = function () {
    if (this.zoomControl == null) {
        var zodiv = $create('div')
                        .css({
                            position: 'absolute',
                            top: '60px',
                            right: '10px',
                            zIndex: '10'
                        });
        var mm = this;
        var p1 = $create('p');
        var zoomInButton = $create('input')
                                .css({
                                    fontSize: '20px',
                                    border: '#80FE80 1px solid',
                                    backgroundColor: '#80FE80',
                                    height: '30px',
                                    width: '30px',
                                    cursor: 'pointer'
                                })
                                .attr({
                                    type: 'button',
                                    value: '+'
                                });
        zoomInButton.onclick = function () {
            mm.zoomIn();
        };
        p1.append(zoomInButton);
        zodiv.append(p1);

        var p2 = $create('p');
        var zoomOutButton = $create('input')
                                .css({
                                    fontSize: '20px',
                                    border: '#80FE80 1px solid',
                                    backgroundColor: '#80FE80',
                                    height: '30px',
                                    width: '30px',
                                    cursor: 'pointer'
                                })
                                .attr({
                                    type: 'button',
                                    value: '-'
                                });
        zoomOutButton.onclick = function () {
            mm.zoomOut();
        };
        p2.append(zoomOutButton);
        zodiv.append(p2);
        //document.body.append(zodiv);
        $id(this.container + "Outer").append(zodiv);
        this.zoomControl = zodiv;
    } else {
        this.zoomControl.css('visibility', 'visible');
    }
};

WIND.Map.prototype.removeZoomControl = function () {
    //if (this.zoomControl != null) document.body.remove(this.zoomControl);
    if (this.zoomControl != null) {
        this.zoomControl.css('visibility', 'hidden');
    }
    //$id(this.container + "Outer").remove(this.zoomControl);
};
/**
 Zoom in on the map.
 @function
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.zoomIn();
 **/
WIND.Map.prototype.zoomIn = function () {
    this.olMap.zoomIn();
};
/**
Zoom out the map.
 @function
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.zoomOut();
 **/
WIND.Map.prototype.zoomOut = function () {
    this.olMap.zoomOut();
};
WIND.Map.prototype.zoomToExtent = function (mps) {
    var geometry;
    if (mps.length > 0) {
        geometry = mps[0].feature.geometry.clone();
        geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
        var bbox = geometry.getBounds();
        var bbox2;
        for (var i = 1; i < mps.length; i++) {
            geometry = mps[i].feature.geometry.clone();
            geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
            bbox2 = geometry.getBounds();
            bbox.extend(bbox2);
        }
        if ((mps.length == 1) && (geometry instanceof OpenLayers.Geometry.Point)) {
            this.olMap.setCenter(new OpenLayers.LonLat(geometry.x, geometry.y), 17);
        } else {
            this.olMap.zoomToExtent(bbox, false);
        }
    }
};
WIND.Map.prototype.addSwitcher = function () {
    if (this.switcher == null) {
        var swdiv = $create('div') 
                        .css({
                            position: 'absolute',
                            top: '42px',
                            left: '2px',
                            border: '#B0B0B0 1px solid',
                            backgroundColor: '#FFFFFF',
                            zIndex: 10,
                            display: 'none',
                            textAlign: 'left'
                        });
        var mm = this;
        for (var i = 0; i < this.typeList.length; i++) {
            if (!this.typeList[i].startsWith("IGN")) {
                var radioObj = $create("input")
                                    .attr("type", "radio");
                if (this.baseLayer == this.typeList[i]) {
                    radioObj.attr("checked", true); 
                }
                radioObj.attr({
                    name: 'layerchoice',
                    value: value
                });
                radioObj.onclick = function () {
                    if (mm.ignLayersDiv) mm.ignLayersDiv.style.display = 'none';
                    mm.changeBaseLayer(this.value);

                };
                swdiv.append(radioObj);
                swdiv.append(document.createTextNode(this.typeList[i]));
                swdiv.append($create("br"));
            } else if (!this.ignLayersDiv) {
                var radioObj = $create("input");
                radioObj.css("type", "radio");
                if (this.baseLayer == this.typeList[i]) {
                    radioObj.checked = true;
                }
                radioObj.css("name", "layerchoice");
                radioObj.css("value", "IGN Maps");
                swdiv.append(radioObj);
                swdiv.append(document.createTextNode("IGN Maps"));
                swdiv.append($create("br"));
                var ignDiv = $create("div");
                ignDiv.style.position = 'relative';
                ignDiv.style.left = '5px';
                if (radioObj.checked) ignDiv.style.display = 'block';
                else ignDiv.style.display = 'none';
                var checkboxObj = $create("input");
                checkboxObj.css("type", "checkbox");
                checkboxObj.css("value", this.typeList[i]);
                checkboxObj.checked = true;
                ignDiv.append(checkboxObj);
                ignDiv.append(document.createTextNode(this.typeList[i]));
                ignDiv.append($create("br"));
                swdiv.append(ignDiv);
                this.ignLayersDiv = ignDiv;
                radioObj.onclick = function () {
                    mm.ignLayersDiv.style.display = 'block';
                    mm.changeBaseLayer(this.value);

                };
                this.ignBaseLayer = this.typeList[i];
                var myLayer;
                checkboxObj.onclick = function () {
                    for (var i = 0; i < mm.olMap.layers.length; i++) {
                        if (mm.olMap.layers[i].name == this.value) {
                            myLayer = mm.olMap.layers[i];
                        }
                    }
                    if (this.checked) myLayer.setVisibility(true);
                    else myLayer.setVisibility(false);

                };
            } else {
                var checkboxObj = $create("input");
                checkboxObj.css("type", "checkbox");
                checkboxObj.css("value", this.typeList[i]);
                checkboxObj.checked = false;
                /*if (this.typeList[i] == "IGN Route" || this.typeList[i] == "IGN Satellite")
					checkboxObj.checked = true;*/
                this.ignLayersDiv.append(checkboxObj);
                this.ignLayersDiv.append(document.createTextNode(this.typeList[i]));
                this.ignLayersDiv.append($create("br"));
                var myLayer;
                checkboxObj.onclick = function () {
                    for (var i = 0; i < mm.olMap.layers.length; i++) {
                        if (mm.olMap.layers[i].name == this.value) {
                            myLayer = mm.olMap.layers[i];
                        }
                    }
                    if (this.checked) myLayer.setVisibility(true);
                    else myLayer.setVisibility(false);

                };
            }
        }
        //document.body.append(swdiv);
        $id(this.container + "Outer").append(swdiv);
        var layerButtonDiv = $create('div')
                                    .css({
                                        position: 'absolute',
                                        top: '21px',
                                        left: '2px',
                                        border: '#B0B0B0 1px solid',
                                        backgroundColor: '#FFFFFF',
                                        zIndex: 10
                                    });
        
        var layerButton = $create('input')
                                .css({
                                    border: '#B0B0B0 1px solid',
                                    backgroundColor: '#FFFFFF',
                                    cursor: 'pointer'
                                })
                                .attr({
                                    type: 'button',
                                    value: 'Layers'
                                });
        layerButton.onclick = function () {
            if (swdiv.style.display == 'none') {
                swdiv.style.display = 'block';
                layerButton.style.backgroundColor = '#B0B0B0';
                layerButton.style.color = '#FFFFFF';
            } else {
                swdiv.style.display = 'none';
                layerButton.style.backgroundColor = '#FFFFFF';
                layerButton.style.color = '#000000';
            }
        };
        layerButtonDiv.append(layerButton);
        //document.body.append(layerButtonDiv);
        $id(this.container + "Outer").append(layerButtonDiv);
        this.switcher = swdiv;
        this.switcherButton = layerButtonDiv;
    } else {
        this.switcherButton.style.visibility = "visible";
        this.switcher.style.visibility = "visible";
    }
};
WIND.Map.prototype.removeSwitcher = function () {
    if (this.switcher != null) {
        //document.body.remove(this.switcherButton);
        //$id(this.container + "Outer").remove(this.switcherButton);
        this.switcherButton.style.visibility = "hidden";
        //document.body.remove(this.switcher);
        //$id(this.container + "Outer").remove(this.switcher);
        this.switcher.style.visibility = "hidden";
    }
};
/**
Add a toolbar of drawing tools.
 @function
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addToolBarLite();
 **/
WIND.Map.prototype.addToolBarLite = function () {
    if (this.toolbar == null) {
        var headID = $tag("head")[0];
        var cssNode = $create('link');
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.href = lib_path + "/styles/toolbar.css";
        //cssNode.media = 'screen';
        headID.append(cssNode);

        var tbdiv = $create('div');
        tbdiv.style.position = 'absolute';
        tbdiv.style.top = '20px';
        tbdiv.style.right = '0px';
        tbdiv.className = "olControlPanel";
        tbdiv.style.zIndex = 10;
        $id(this.container + "Outer").append(tbdiv);
        this.toolbardiv = tbdiv;
        //this.toolbar = new OpenLayers.Control.EditingToolbar(this.vectorLayer, {'div': this.toolbardiv});
        //, {defaultControl: mousecontrol}
        //this.olMap.addControl(this.toolbar);

        // Ajouter les outils de dessin ******
        //this.mousecontrol = new OpenLayers.Control.Navigation();
        this.mousecontrol = new OpenLayers.Control.Navigation({
            title: 'Utiliser la souris pour glisser, faire un zoom sur la carte',
            displayClass: 'olControlMouseDefaults'
        });

        this.toolbar = new OpenLayers.Control.Panel({
            defaultControl: this.mousecontrol,
            div: this.toolbardiv
        });
        //this.drawPoint = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Point, {title:'Dessiner un point', displayClass:'olControlDrawFeaturePoint'});
        //this.drawLine = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Path, {title:'Dessiner une ligne', displayClass:'olControlDrawFeaturePath'});
        //this.drawPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Polygon, {title:'Dessiner un polygone', displayClass:'olControlDrawFeaturePolygon'});

        this.toolbar.addControls([this.mousecontrol]);
        this.olMap.addControl(this.toolbar);
    }

};
/**
Add a drawing tool to the toolbar.
 @function
 @param {String} tool The type of the tool we want to add. It can be either a "point", a "line" or a "polygon".
 @param  {Integer} [vl] Specifies the vector layer'ID. 0 by default.
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addToolBarLite();
 carte.addDrawing2ToolBar("point");
 **/
WIND.Map.prototype.addDrawing2ToolBar = function (tool, vl) {
	var nb;
	if(!vl || !this.vlIndex.indexOf(vl))
		nb=0;
	else nb=vl;
    switch (tool) {
    case "point":
        var pointStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        pointStyle.strokeColor = "#FF0000";
        pointStyle.strokeWidth = 3;
        pointStyle.fillColor = "#FECC80";
        this.drawPoint = new OpenLayers.Control.DrawFeature(this.vectorLayers[nb], OpenLayers.Handler.Point, {
            title: 'Dessiner un point',
            displayClass: 'olControlDrawFeaturePoint',
            handlerOptions: {
                style: pointStyle
            }
        });
        this.toolbar.addControls([this.drawPoint]);
        break;
    case "line":
        var lineStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        lineStyle.strokeColor = "#B26B00";
        lineStyle.strokeWidth = 3;
        lineStyle.fillColor = "#FECC80";
        this.drawLine = new OpenLayers.Control.DrawFeature(this.vectorLayers[nb], OpenLayers.Handler.Path, {
            title: 'Dessiner une ligne',
            displayClass: 'olControlDrawFeaturePath',
            handlerOptions: {
                style: lineStyle
            }
        });
        this.toolbar.addControls([this.drawLine]);
        break;
    case "polygon":
        var polyStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        polyStyle.strokeColor = "#0066B3";
        polyStyle.strokeWidth = 3;
        polyStyle.fillColor = "#FECC80";
        this.drawPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayers[nb], OpenLayers.Handler.Polygon, {
            title: 'Dessiner un polygone',
            displayClass: 'olControlDrawFeaturePolygon',
            handlerOptions: {
                style: polyStyle
            }
        });
        this.toolbar.addControls([this.drawPolygon]);
        break;
    }
};

WIND.Map.prototype.addToolBar = function () {
    if (this.toolbar == null) {
        var headID = $tag("head")[0];
        var cssNode = $create('link');
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.href = lib_path + "/styles/toolbar.css";
        //cssNode.media = 'screen';
        headID.append(cssNode);

        var tbdiv = $create('div');
        tbdiv.style.position = 'absolute';
        tbdiv.style.top = '20px';
        tbdiv.style.right = '0px';
        tbdiv.className = "olControlPanel";
        tbdiv.style.zIndex = 10;
        $id(this.container + "Outer").append(tbdiv);
        this.toolbardiv = tbdiv;
        //this.toolbar = new OpenLayers.Control.EditingToolbar(this.vectorLayer, {'div': this.toolbardiv});
        //, {defaultControl: mousecontrol}
        //this.olMap.addControl(this.toolbar);

        // Ajouter les outils de dessin ******
        //this.mousecontrol = new OpenLayers.Control.Navigation();
        this.mousecontrol = new OpenLayers.Control.Navigation({
            title: 'Utiliser la souris pour glisser, faire un zoom sur la carte',
            displayClass: 'olControlMouseDefaults'
        });
        //this.olMap.addControl(this.mouseControl);

        this.toolbar = new OpenLayers.Control.Panel({
            defaultControl: this.mousecontrol,
            div: this.toolbardiv
        });
        this.drawPoint = new OpenLayers.Control.DrawFeature(this.vectorLayers[0], OpenLayers.Handler.Point, {
            title: 'Dessiner un point',
            displayClass: 'olControlDrawFeaturePoint'
        });
        this.drawLine = new OpenLayers.Control.DrawFeature(this.vectorLayers[0], OpenLayers.Handler.Path, {
            title: 'Dessiner une ligne',
            displayClass: 'olControlDrawFeaturePath'
        });
        this.drawPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayers[0], OpenLayers.Handler.Polygon, {
            title: 'Dessiner un polygone',
            displayClass: 'olControlDrawFeaturePolygon'
        });

        this.drawRegularPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayers[0], OpenLayers.Handler.RegularPolygon, {
            title: 'Dessiner un polygon régulier',
            handlerOptions: {
                sides: 4
            },
            displayClass: 'olControlDrawFeatureRegularPolygon'
        });
        var drawRegularPolygonDiv = $create('div');
        //drawRegularPolygonDiv.id = this.container + "drawRegularPolygonParam";
        drawRegularPolygonDiv.style.position = 'absolute';
        drawRegularPolygonDiv.style.top = '45px';
        drawRegularPolygonDiv.style.right = '120px';
        drawRegularPolygonDiv.style.padding = '10px';
        drawRegularPolygonDiv.style.backgroundColor = "#EFEFEF";
        drawRegularPolygonDiv.style.display = "none";
        //tbdiv.className = "olControlPanel";
        drawRegularPolygonDiv.style.zIndex = 10;
        $id(this.container + "Outer").append(drawRegularPolygonDiv);
        var ligne1 = $create("p");
        var span1 = $create("span");
        span1.innerHTML = "Number of sides: ";
        ligne1.append(span1);
        var input1 = $create("input");
        input1.type = "text";
        input1.id = this.container + "WIND-draw-Regular-Polygon-polysides";
        input1.value = 4;
        ligne1.append(input1);
        drawRegularPolygonDiv.append(ligne1);
        var ligne2 = $create("p");
        var span2 = $create("span");
        span2.innerHTML = "Irregularity: ";
        ligne2.append(span2);
        var input2 = $create("input");
        input2.type = "checkbox";
        input2.id = this.container + "WIND-draw-Regular-Polygon-irregularpoly";
        ligne2.append(input2);
        drawRegularPolygonDiv.append(ligne2);
        var sbutton1 = $create("input");
        sbutton1.type = "button";
        sbutton1.value = "OK";
        //sbutton.id = "WIND-draw-Regular-Polygon-irregularpoly";
        drawRegularPolygonDiv.append(sbutton1);
        var sbutton2 = $create("input");
        sbutton2.type = "button";
        sbutton2.value = "Cancel";
        drawRegularPolygonDiv.append(sbutton2);
        this.drawRegularPolygonDiv = drawRegularPolygonDiv;
        var that = this;
        sbutton1.onclick = function () {
            var sides = parseInt($id(that.container + "WIND-draw-Regular-Polygon-polysides").value);
            sides = Math.max(3, isNaN(sides) ? 0 : sides);
            that.drawRegularPolygon.handler.sides = sides;
            var irregular = $id(that.container + "WIND-draw-Regular-Polygon-irregularpoly").checked;
            that.drawRegularPolygon.handler.irregular = irregular;
            that.drawRegularPolygonDiv.style.display = "none";
        };
        sbutton2.onclick = function () {
            that.drawRegularPolygonDiv.style.display = "none";
        };
        /*$id(this.drawRegularPolygon.div).onclick = function() {
			that.drawRegularPolygonDiv.style.display = "block";
		};*/
        this.drawRegularPolygon.events.register("activate", this, function () {
            this.drawRegularPolygonDiv.style.display = "block";
        });
        this.drawRegularPolygon.events.register("deactivate", this, function () {
            this.drawRegularPolygonDiv.style.display = "none";
        });

        this.createMarker = new OpenLayers.Control.InsertIcon(this.vectorLayers[0], {
            title: "Créer un marqueur",
            displayClass: "olControlInsertIcon"
        });
        var createMarkerDiv = $create('div');
        //drawRegularPolygonDiv.id = this.container + "drawRegularPolygonParam";
        createMarkerDiv.style.position = 'absolute';
        createMarkerDiv.style.top = '45px';
        createMarkerDiv.style.right = '40px';
        createMarkerDiv.style.padding = '10px';
        createMarkerDiv.style.backgroundColor = "#EFEFEF";
        createMarkerDiv.style.display = "none";
        //tbdiv.className = "olControlPanel";
        createMarkerDiv.style.zIndex = 10;
        $id(this.container + "Outer").append(createMarkerDiv);
        var ligne1 = $create("p");
        var span1 = $create("span");
        span1.innerHTML = "URL of icon: ";
        ligne1.append(span1);
        var input1 = $create("input");
        input1.type = "text";
        input1.size = "50";
        input1.id = this.container + "WIND-create-Marker-Url";
        input1.value = lib_path + "images/marker.png";
        ligne1.append(input1);
        createMarkerDiv.append(ligne1);
        var ligne2 = $create("p");
        var span2 = $create("span");
        span2.innerHTML = "Size: ";
        ligne2.append(span2);
        var selectbox = $create("select");
        selectbox.id = this.container + "WIND-create-Marker-Size";
        var optnTiny = $create("option");
        optnTiny.text = "Tiny";
        optnTiny.value = 5;
        selectbox.options.add(optnTiny);
        var optnSmall = $create("option");
        optnSmall.selected = true;
        optnSmall.text = "Small";
        optnSmall.value = 15;
        selectbox.options.add(optnSmall);
        var optnNormal = $create("option");
        optnNormal.text = "Normal";
        optnNormal.value = 25;
        selectbox.options.add(optnNormal);
        var optnLarge = $create("option");
        optnLarge.text = "Large";
        optnLarge.value = 35;
        selectbox.options.add(optnLarge);
        var optnHuge = $create("option");
        optnHuge.text = "Huge";
        optnHuge.value = 45;
        selectbox.options.add(optnHuge);
        ligne2.append(selectbox);
        createMarkerDiv.append(ligne2);
        var sbutton1 = $create("input");
        sbutton1.type = "button";
        sbutton1.value = "OK";
        createMarkerDiv.append(sbutton1);
        var sbutton2 = $create("input");
        sbutton2.type = "button";
        sbutton2.value = "Cancel";
        createMarkerDiv.append(sbutton2);
        this.createMarkerDiv = createMarkerDiv;
        var that = this;
        sbutton1.onclick = function () {
            var iconurl = $id(that.container + "WIND-create-Marker-Url").value;
            that.createMarker.iconURL = iconurl;
            var size = parseInt($id(that.container + "WIND-create-Marker-Size").value);
            that.createMarker.size = size;
            that.createMarkerDiv.style.display = "none";
        };
        sbutton2.onclick = function () {
            that.createMarkerDiv.style.display = "none";
        };
        this.createMarker.events.register("activate", this, function () {
            this.createMarkerDiv.style.display = "block";
        });
        this.createMarker.events.register("deactivate", this, function () {
            this.createMarkerDiv.style.display = "none";
        });

        this.reshapeFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayers[0], {
            mode: OpenLayers.Control.ModifyFeature.RESHAPE,
            title: 'Remodeler une figure',
            displayClass: 'olControlReshapeFeature'
        });
        this.reshapeFeature.geometryTypes = ["OpenLayers.Geometry.LineString", "OpenLayers.Geometry.MultiLineString", "OpenLayers.Geometry.Polygon", "OpenLayers.Geometry.MultiPolygon"];
        this.resizeFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayers[0], {
            mode: OpenLayers.Control.ModifyFeature.RESIZE,
            title: 'Redimensionner une figure',
            displayClass: 'olControlResizeFeature'
        });
        this.resizeFeature.geometryTypes = ["OpenLayers.Geometry.LineString", "OpenLayers.Geometry.MultiLineString", "OpenLayers.Geometry.Polygon", "OpenLayers.Geometry.MultiPolygon"];
        this.dragFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayers[0], {
            mode: OpenLayers.Control.ModifyFeature.DRAG,
            title: 'Déplacer une figure',
            displayClass: 'olControlDragFeature'
        });
        this.rotateFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayers[0], {
            mode: OpenLayers.Control.ModifyFeature.ROTATE,
            title: 'Tourner une figure',
            displayClass: 'olControlRotateFeature'
        });
        this.rotateFeature.geometryTypes = ["OpenLayers.Geometry.LineString", "OpenLayers.Geometry.MultiLineString", "OpenLayers.Geometry.Polygon", "OpenLayers.Geometry.MultiPolygon"];

        this.selectFeature = new OpenLayers.Control.SelectFeature(this.vectorLayers[0], {
            'multiple': false,
            title: 'Sélectionner une figure pour la mettre en form',
            displayClass: 'olControlFormatFeature',
            onSelect: function (feature) {
                //selectedFeature = feature;
                var popupDiv = $create("div");
                popupDiv.style.fontSize = "12px";

                if ((feature.style == null) || (feature.style.externalGraphic == null)) {
                    //Stroke
                    var ligne1 = $create("p");
                    var span11 = $create("span");
                    span11.innerHTML = "Stroke Color: ";
                    ligne1.append(span11);
                    var input11 = $create("input");
                    input11.id = that.container + "WIND-strokecolor";
                    input11.type = "text";
                    input11.size = 10;
                    //input11.value = "dqshdkjqshdkjqshdkjqshkdj";
                    ligne1.append(input11);
                    var span12 = $create("span");
                    span12.innerHTML = " Stroke Width: ";
                    ligne1.append(span12);
                    var input12 = $create("select");
                    input12.id = that.container + "WIND-strokewidth";
                    for (var i = 0; i < 10; i++) {
                        var optn = $create("option");
                        if (i == 2) optn.selected = true;
                        else optn.selected = false;
                        optn.text = i;
                        optn.value = i;
                        input12.options.add(optn);
                    }
                    ligne1.append(input12);
                    var span13 = $create("span");
                    span13.innerHTML = " Stroke Opacity: ";
                    ligne1.append(span13);
                    var input13 = $create("select");
                    input13.id = that.container + "WIND-strokeopacity";
                    var optn = $create("option");
                    optn.text = 1.0;
                    optn.value = 1.0;
                    input13.options.add(optn);
                    for (var i = 9; i >= 0; i--) {
                        var optn = $create("option");
                        optn.text = "0." + i;
                        optn.value = Number("0." + i);
                        input13.options.add(optn);
                    }
                    ligne1.append(input13);
                    popupDiv.append(ligne1);

                    // Fill
                    var ligne2 = $create("p");
                    var span21 = $create("span");
                    span21.innerHTML = "Fill Color: ";
                    ligne2.append(span21);
                    var input21 = $create("input");
                    input21.id = that.container + "WIND-fillcolor";
                    input21.type = "text";
                    input21.size = 10;
                    input21.value = "EE9900";
                    ligne2.append(input21);
                    var span22 = $create("span");
                    span22.innerHTML = " Fill Opacity: ";
                    ligne2.append(span22);
                    var input22 = $create("select");
                    input22.id = that.container + "WIND-fillopacity";
                    var optn = $create("option");
                    optn.text = 1.0;
                    optn.value = 1.0;
                    input22.options.add(optn);
                    for (var i = 9; i >= 0; i--) {
                        var optn = $create("option");
                        optn.text = "0." + i;
                        optn.value = Number("0." + i);
                        input22.options.add(optn);
                    }
                    ligne2.append(input22);
                    popupDiv.append(ligne2);

                    // Buttons
                    var sbutton1 = $create("input");
                    sbutton1.id = that.container + "updateFeatureButton";
                    sbutton1.type = "button";
                    sbutton1.value = "Update";
                    popupDiv.append(sbutton1);
                } else {
                    // Url
                    var ligne1 = $create("p");
                    var span1 = $create("span");
                    span1.innerHTML = "URL of icon: ";
                    ligne1.append(span1);
                    var input1 = $create("input");
                    input1.type = "text";
                    input1.size = "50";
                    input1.id = that.container + "WIND-iconurl";
                    ligne1.append(input1);
                    popupDiv.append(ligne1);
                    // Size
                    var ligne2 = $create("p");
                    var span2 = $create("span");
                    span2.innerHTML = "Size: ";
                    ligne2.append(span2);
                    var selectbox = $create("select");
                    selectbox.id = that.container + "WIND-iconsize";
                    var optnTiny = $create("option");
                    optnTiny.text = "Tiny";
                    optnTiny.value = 5;
                    selectbox.options.add(optnTiny);
                    var optnSmall = $create("option");
                    optnSmall.text = "Small";
                    optnSmall.value = 15;
                    selectbox.options.add(optnSmall);
                    var optnNormal = $create("option");
                    optnNormal.text = "Normal";
                    optnNormal.value = 25;
                    selectbox.options.add(optnNormal);
                    var optnLarge = $create("option");
                    optnLarge.text = "Large";
                    optnLarge.value = 35;
                    selectbox.options.add(optnLarge);
                    var optnHuge = $create("option");
                    optnHuge.text = "Huge";
                    optnHuge.value = 45;
                    selectbox.options.add(optnHuge);
                    ligne2.append(selectbox);
                    popupDiv.append(ligne2);

                    // Buttons
                    var sbutton1 = $create("input");
                    sbutton1.id = that.container + "updateFeatureButton";
                    sbutton1.type = "button";
                    sbutton1.value = "Update";
                    popupDiv.append(sbutton1);
                }

                that.popupDiv = popupDiv;

                //alert(popupDiv.innerHTML);
                var popup = new OpenLayers.Popup.FramedCloud("mypopup", feature.geometry.getBounds().getCenterLonLat(), null, popupDiv.innerHTML, null, true, false);
                feature.popup = popup;
                that.olMap.addPopup(popup);
                that.selectedFeature = feature;

                if ((feature.style == null) || (feature.style.externalGraphic == null)) {
                    $id(that.container + "WIND-strokecolor").value = ((feature.style != null) && (feature.style.strokeColor != null)) ? feature.style.strokeColor : "#0033CC";
                    $id(that.container + "WIND-strokewidth").options[((feature.style != null) && (feature.style.strokeWidth != null)) ? feature.style.strokeWidth : 2].selected = true;
                    $id(that.container + "WIND-strokeopacity").options[10 - 10 * Number(((feature.style != null) && (feature.style.strokeOpacity != null)) ? feature.style.strokeOpacity : 1)].selected = true;
                    $id(that.container + "WIND-fillcolor").value = ((feature.style != null) && (feature.style.fillColor != null)) ? feature.style.fillColor : "#809FFE";
                    $id(that.container + "WIND-fillopacity").options[10 - 10 * Number(((feature.style != null) && (feature.style.fillOpacity != null)) ? feature.style.fillOpacity : 0.5)].selected = true;
                } else {
                    $id(that.container + "WIND-iconurl").value = feature.style.externalGraphic;
                    $id(that.container + "WIND-iconsize").options[Math.floor((Number(feature.style.pointRadius) - 5) / 10)].selected = true;
                }

                $id(that.container + "updateFeatureButton").onclick = function () {
                    if ((feature.style == null) || (feature.style.externalGraphic == null)) {
                        var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
                        style.strokeColor = $id(that.container + "WIND-strokecolor").value;
                        style.strokeWidth = parseInt($id(that.container + "WIND-strokewidth").value);
                        style.strokeOpacity = parseFloat($id(that.container + "WIND-strokeopacity").value);
                        style.fillColor = $id(that.container + "WIND-fillcolor").value;
                        style.fillOpacity = parseFloat($id(that.container + "WIND-fillopacity").value);
                        feature.style = style;
                        that.vectorLayers[0].drawFeature(feature);
                        that.olMap.removePopup(feature.popup);
                    } else {
                        var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
                        style.externalGraphic = $id(that.container + "WIND-iconurl").value;
                        var mysize = parseInt($id(that.container + "WIND-iconsize").value);
                        style.pointRadius = mysize;
                        style.graphicXOffset = -1 * mysize;
                        style.graphicYOffset = -2 * mysize;
                        style.fillOpacity = 1;
                        feature.style = style;
                        that.vectorLayers[0].drawFeature(feature);
                        that.olMap.removePopup(feature.popup);
                    }
                };

            },
            onUnselect: function (feature) {
                that.olMap.removePopup(feature.popup);
                //feature.popup.destroy();
                //feature.popup = null;
            }
        });


        this.removeFeature = new OpenLayers.Control.SelectFeature(this.vectorLayers[0], {
            'multiple': false,
            title: 'Supprimer une figure de la carte',
            displayClass: 'olControlRemoveFeature',
            onSelect: function (feature) {
                if (confirm("Vous voulez supprimer cette figure?")) {
                    for (var i = 0; i < that.parts.length; i++) {
                        var geo2 = that.parts[i].feature.geometry.clone();
                        geo2.transform(new OpenLayers.Projection("EPSG:4326"), that.olMap.baseLayer.projection);
                        //alert(that.parts[i].feature.geometry + " ->" + geo2 + " ?? " + feature.geometry);
                        if (comparerGeo(geo2, feature.geometry)) {
                            //alert("toto2");
                            var part1 = that.parts.slice(0, i);
                            var part2 = that.parts.slice(i + 1);
                            that.parts = part1.concat(part2);
                            that.vectorLayers[0].removeFeatures([feature]);
                            break;
                        }
                    }
                }
            }
            /*,
			onUnselect: function(feature) {
				alert("titi");
			}*/
        });

        this.toolbar.addControls([this.mousecontrol, this.drawPoint, this.drawLine, this.drawPolygon, this.drawRegularPolygon, this.createMarker, this.reshapeFeature, this.resizeFeature, this.dragFeature, this.rotateFeature, this.selectFeature, this.removeFeature]);
        this.olMap.addControl(this.toolbar);

    }
    // **************************
    var that = this;
    this.vectorLayers[0].onFeatureInsert = function (feature) {
        var geo2 = feature.geometry.clone();
        //geo2.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
        geo2.transform(that.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
        if (feature.style && feature.style.externalGraphic) {
            var len = geo2.toString().length;
            if (geo2 instanceof OpenLayers.Geometry.Collection) {
                var geostring = "MULTIMARKER(" + geo2.toString().substring(10) + ", " + feature.style.externalGraphic + ")";
                that.parts.push(new WIND.Map.Part(geostring));
            } else {
                var geostring = "MARKER(" + geo2.toString().substring(5) + ", " + feature.style.externalGraphic + ")";
                that.parts.push(new WIND.Map.Part(geostring));
            }
        } else
            that.parts.push(new WIND.Map.Part(geo2.toString()));

        that.onPartInsert();
    };

    this.modifyingPartIndex = 0;
    this.vectorLayers[0].events.on({
        "beforefeaturemodified": function (event) {
            for (var i = 0; i < that.parts.length; i++) {
                var geo2 = that.parts[i].feature.geometry.clone();
                geo2.transform(new OpenLayers.Projection("EPSG:4326"), that.olMap.baseLayer.projection);
                if (comparerGeo(geo2, event.feature.geometry)) {
                    that.modifyingPartIndex = i;
                    //alert(i);
                }
            }
        },
        //"featuremodified": report,
        "afterfeaturemodified": function (event) {
            var newgeo = event.feature.geometry.clone();
            newgeo.transform(that.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
            //alert(that.modifyingPartIndex);
            that.parts[that.modifyingPartIndex].geoObject = newgeo.toString();
            that.parts[that.modifyingPartIndex].feature = new OpenLayers.Feature.Vector(newgeo, {}, that.parts[that.modifyingPartIndex].style);
        }
    });
};
WIND.Map.prototype.onPartInsert = function () {};
OpenLayers.Control.InsertIcon = OpenLayers.Class(OpenLayers.Control, {
    iconURL: lib_path + "images/marker.png",
    size: 15,
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function (vlayer, options) {
        if (options.iconURL) this.iconURL = options.iconURL;
        if (options.size) this.size = options.size;
        this.vectorLayer = vlayer;
        this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.handler = new OpenLayers.Handler.Click(
            this, {
                "click": this.trigger
            }, this.handlerOptions
        );
        //this.type = OpenLayers.Control.TYPE_BUTTON;
        this.title = options.title;
        this.displayClass = options.displayClass;
    },

    trigger: function (e) {
        var lonlat = this.vectorLayer.map.getLonLatFromViewPortPx(e.xy);
        var mystyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        mystyle.externalGraphic = this.iconURL;
        mystyle.pointRadius = this.size;
        mystyle.graphicXOffset = -1 * this.size;
        mystyle.graphicYOffset = -2 * this.size;
        mystyle.fillOpacity = 1;
        var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat), {}, mystyle
        );
        this.vectorLayer.addFeatures([feature]);
        /*
		var geo2 = feature.geometry.clone();
		geo2.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
		that.parts.push(new WIND.Map.Part(geo2.toString()));	*/
    }
});
/**
Remove the toolbar from the map.
 @function
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addToolBarLite();
 carte.addDrawing2ToolBar("line");
 carte.removeToolBar();
 **/
WIND.Map.prototype.removeToolBar = function () {
    if (this.toolbar != null) {
        this.olMap.removeControl(this.toolbar);
        this.toolbar = null;
        $id(this.container + "Outer").remove(this.toolbardiv);
    }
};
WIND.Map.prototype.addLocationBar = function () {
    if (this.locationBar == null) {
        var lb = $create('div');
        lb.style.position = 'absolute';
        //lb.style.top = ($id(this.container).offsetTop + $id(this.container).offsetHeight) + 'px';
        lb.style.bottom = '2px';
        lb.style.left = '2px';
        lb.style.zIndex = 10;
        var mm = this;
        var html = "<input type='text' id='lbaddress' size='10'> ";
        html += "<input type='button' id='lbsubmit' value='Search'>";
        lb.innerHTML = html;
        //document.body.append(lb);
        $id(this.container + "Outer").append(lb);
        $id('lbsubmit').onclick = function () {
            if ($id('lbaddress').value) {
                var ps = WIND.Map.searchLocation($id('lbaddress').value, false);
                for (var i = 0; i < ps.length; i++)
                    mm.addMarker(new WIND.Map.Marker(ps[i]));
            } else alert("Please entre a location!");
        };
        this.locationBar = lb;
    } else this.locationBar.style.visibility = "visible";
};
WIND.Map.prototype.removeLocationBar = function () {
    //if (this.locationBar != null) document.body.remove(this.locationBar);
    if (this.locationBar != null)
        this.locationBar.style.visibility = "hidden";
};
WIND.Map.prototype.addItineraryBar = function () {
    if (this.itineraryBar == null) {
        var ib = $create('div');
        ib.style.position = 'absolute';
        ib.style.bottom = '2px';
        ib.style.right = '2px';
        ib.style.zIndex = 10;
        var mm = this;
        //var html = "<input type='text' id='ibaddress1' size='10'> <input type='text' id='ibaddress2' size='10'>";
        var html = "<input type='text' id='ibitinerary' size='20' value='from:Bayonne to:Dax to:Pau'> route<input type='checkbox' id='itimode'>";
        html += "<input type='button' id='ibsubmit' value='Itinerary'>";
        ib.innerHTML = html;
        //document.body.append(ib);
        $id(this.container + "Outer").append(ib);
        $id('ibsubmit').onclick = function () {
            if ($id('ibitinerary').value) {
                var iti = ($id('ibitinerary').value).split(" ");
                var places = [];
                var place = '';
                for (var i = 0; i < iti.length; i++) {
                    place = iti[i];
                    if (place.startsWith("from:")) place = place.substring(5, place.length);
                    else if (place.startsWith("from")) place = place.substring(4, place.length);
                    else if (place.startsWith("to:")) place = place.substring(3, place.length);
                    else if (place.startsWith("to")) place = place.substring(2, place.length);
                    places.push(place);
                }
                var iti = WIND.Map.searchItinerary(places);
                if ($id('itimode').checked)
                    mm.addItinerary(iti, {
                        mode: "route",
                        color: "blue"
                    });
                else
                    mm.addItinerary(iti, {
                        mode: "direct",
                        color: "blue"
                    });
            } else alert("Please entre an itinerary!");
        };
        this.itineraryBar = ib;
    } else this.itineraryBar.style.visibility = "visible";
};
WIND.Map.prototype.removeItineraryBar = function () {
    if (this.itineraryBar != null)
    //document.body.remove(this.itineraryBar);
        this.itineraryBar.style.visibility = "hidden";
};
/**
 Initialize the map.
 @function
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.initialize();
 **/
WIND.Map.prototype.initialize = function () {
	for(var i=0;i<this.vectorLayers.length;i++)
		this.vectorLayers[i].destroyFeatures();
    this.annotations = [];
    this.parts = [];
};
/**
 Destroys the map and remove it from the page.
 @function
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.destroy();
 **/
WIND.Map.prototype.destroy = function () {
    //this.removeZoomControl();
    //this.removeSwitcher();
    //this.removeLocationBar();
    //this.removeItineraryBar();
    this.scaleControl = null;
    this.positionControl = null;
    this.mouseControl = null;
    this.keyboardControl = null;

    this.zoomControl = null;
    this.switcher = null;
    this.toolbar = null;
    this.locationbar = null;
    this.itinerarybar = null;

    var mapDiv = $id(this.container + "Outer");
    if (this.parentEl) {
        var newtab = [];
        for (var i = 0; i < this.parentDocument.viewers.length; i++) {
            if (this.parentDocument.viewers[i].container != this.container) {
                newtab.push(this.parentDocument.viewers[i]);
            }
        }
        this.parentDocument.viewers = newtab;
        $id(this.parentEl).remove(mapDiv);
    } else document.body.remove(mapDiv);
};
/**
 Remove the layer from the map.
 @function
 @param {String} layerName Name of the layer to remove.
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addLayer("IGN Street");
 carte.removeLayer("Google Satellite");
 **/
WIND.Map.prototype.removeLayer = function (layerName) {
    var newtab = new Array();
    var removed = false;
    for (var i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i] == layerName) {
            removed = true;
        } else {
            newtab.push(this.typeList[i]);
        }
    }
    if (removed) {
        this.typeList = newtab;
        var radios = this.switcher.getElementsByTagName("input");
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type == "radio" && radios[i].value == layerName) {
                var textnode = radios[i].nextSibling;
                var brnode = textnode.nextSibling;
                this.switcher.remove(radios[i]);
                this.switcher.remove(textnode);
                this.switcher.remove(brnode);
                break;
            }
        }
        if (layerName == this.olMap.baseLayer.name) {
            this.changeBaseLayer(this.typeList[0]);
            var radios = this.switcher.getElementsByTagName("input");
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type == "radio" && radios[i].value == this.typeList[0]) {
                    radios[i].checked = "checked";
                    break;
                }
            }
        }
        if (this.typeList.length == 1)
            this.removeSwitcher();
    }
};
/**
 Add a layer to the map.
 @function
 @param {String} layerName Name of the layer to add.
 @param {Boolean} [isBaseLayer] Indicates whether the layer should be the default. Default value is false. 
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addLayer("Google Terrain");
 **/
WIND.Map.prototype.addLayer = function (layerName, isBaseLayer) {
    if (this.typeList.join().indexOf(layerName) < 0) {
        var mm = this;
        this.typeList.push(layerName);
        if (this.typeList.length > 1 && this.switcher == null) this.addSwitcher();
        else if (this.switcher != null) {
            var myselect = this.switcher;
            if (!layerName.startsWith("IGN")) { // layer autre que IGN
                var radioObj = $create("input");
                radioObj.css("type", "radio");
                radioObj.css("name", "layerchoice");
                radioObj.css("value", layerName);
                radioObj.onclick = function () {
                    mm.changeBaseLayer(this.value);
                    if (mm.ignLayersDiv) mm.ignLayersDiv.style.display = 'none';
                };
                myselect.append(radioObj);
                myselect.append(document.createTextNode(layerName));
                myselect.append($create("br"));
            } else if (!this.ignLayersDiv) {
                var radioObj = $create("input");
                radioObj.css("type", "radio");
                radioObj.css("name", "layerchoice");
                radioObj.css("value", "IGN Maps");
                myselect.append(radioObj);
                myselect.append(document.createTextNode("IGN Maps"));
                myselect.append($create("br"));
                var ignDiv = $create("div");
                ignDiv.style.position = 'relative';
                ignDiv.style.left = '5px';
                if (radioObj.checked) ignDiv.style.display = 'block';
                else ignDiv.style.display = 'none';
                var checkboxObj = $create("input");
                checkboxObj.css("type", "checkbox");
                checkboxObj.css("value", layerName);
                checkboxObj.checked = true;
                ignDiv.append(checkboxObj);
                ignDiv.append(document.createTextNode(layerName));
                ignDiv.append($create("br"));
                myselect.append(ignDiv);
                this.ignLayersDiv = ignDiv;
                radioObj.onclick = function () {
                    mm.ignLayersDiv.style.display = 'block';
                    mm.changeBaseLayer(this.value);
                };
                this.ignBaseLayer = layerName;
                var myLayer;
                checkboxObj.onclick = function () {
                    for (var i = 0; i < mm.olMap.layers.length; i++) {
                        if (mm.olMap.layers[i].name == this.value) {
                            myLayer = mm.olMap.layers[i];
                        }
                    }
                    if (this.checked) myLayer.setVisibility(true);
                    else myLayer.setVisibility(false);

                };
            } else {
                var checkboxObj = $create("input");
                checkboxObj.css("type", "checkbox");
                checkboxObj.css("value", layerName);
                checkboxObj.checked = false;
                /*if (layerName == "IGN Route" || layerName == "IGN Satellite")
					checkboxObj.checked = true;*/
                this.ignLayersDiv.append(checkboxObj);
                this.ignLayersDiv.append(document.createTextNode(layerName));
                this.ignLayersDiv.append($create("br"));
                var myLayer;
                checkboxObj.onclick = function () {
                    for (var i = 0; i < mm.olMap.layers.length; i++) {
                        if (mm.olMap.layers[i].name == this.value) {
                            myLayer = mm.olMap.layers[i];
                        }
                    }
                    if (this.checked) myLayer.setVisibility(true);
                    else myLayer.setVisibility(false);

                };
            }
        }
        var addedLayer;
        var ignfFXX = new OpenLayers.Projection('IGNF:GEOPORTALFXX');
        // Google Maps
        switch (layerName) {
        case "Google Street":
            addedLayer = new OpenLayers.Layer.Google("Google Street", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                sphericalMercator: true
            });
            break;
        case "Google Street Edit":
            addedLayer = new OpenLayers.Layer.Google("Google Street Edit", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                type: G_MAPMAKER_NORMAL_MAP,
                sphericalMercator: true
            });
            break;
        case "Google Hybrid":
            addedLayer = new OpenLayers.Layer.Google("Google Hybrid", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                type: google.maps.MapTypeId.HYBRID,
                sphericalMercator: true
            });
            break;
        case "Google Hybrid Edit":
            addedLayer = new OpenLayers.Layer.Google("Google Hybrid Edit", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                type: G_MAPMAKER_HYBRID_MAP,
                sphericalMercator: true
            });
            break;
        case "Google Satellite":
            addedLayer = new OpenLayers.Layer.Google("Google Satellite", {
                type: google.maps.MapTypeId.SATELLITE,
                numZoomLevels: 22
            });
            break;
        case "Google Terrain":
            addedLayer = new OpenLayers.Layer.Google("Google Terrain", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                type: google.maps.MapTypeId.TERRAIN,
                sphericalMercator: true
            });
            break;
        case "Virtual Earth Roads":
            addedLayer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Roads", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                'type': VEMapStyle.Road,
                'sphericalMercator': true
            });
            break;
        case "Virtual Earth Hybrid":
            addedLayer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Hybrid", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                'type': VEMapStyle.Hybrid,
                'sphericalMercator': true
            });
            break;
        case "Virtual Earth Aerial":
            addedLayer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Aerial", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                'type': VEMapStyle.Aerial,
                'sphericalMercator': true
            });
            break;
        case "Yahoo Street":
            addedLayer = new OpenLayers.Layer.Yahoo("Yahoo Street", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                //'type': YAHOO_MAP_HYB, 
                'sphericalMercator': true
            });
            break;
        case "Yahoo Hybrid":
            addedLayer = new OpenLayers.Layer.Yahoo("Yahoo Hybrid", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                'type': YAHOO_MAP_HYB,
                'sphericalMercator': true
            });
            break;
        case "Yahoo Satellite":
            addedLayer = new OpenLayers.Layer.Yahoo("Yahoo Satellite", {
                projection: new OpenLayers.Projection("EPSG:900913"),
                units: "m",
                numZoomLevels: 22,
                maxResolution: 156543.0339,
                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
                'type': YAHOO_MAP_SAT,
                'sphericalMercator': true
            });
            break;
        case "IGN Route":
            var options = {
                name: "IGN Route",
                url: "http://gpp3-wxs.ign.fr/" + IGN_key + "/wmts",
                layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
                matrixSet: "PM",
                style: "normal",
                numZoomLevels: 19,
                attribution: 'Map base: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank"><img src="http://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a> <a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Terms of Service</a>'
            };
            addedLayer = new OpenLayers.Layer.WMTS(options);
            break;
        case "IGN Satellite":
            var options = {
                name: "IGN Satellite",
                url: "http://gpp3-wxs.ign.fr/" + IGN_key + "/wmts",
                layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                matrixSet: "PM",
                style: "normal",
                numZoomLevels: 20,
                attribution: 'Map base: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank"><img src="http://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a> <a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Terms of Service</a>'
            };
            addedLayer = new OpenLayers.Layer.WMTS(options);
            if (this.typeList.join().indexOf("IGN Route") != -1) // if IGN Route existe
                addedLayer.setVisibility(false);
            break;
        case "OpenStreetMap":
            addedLayer = new OpenLayers.Layer.OSM();
            break;
        case "Bing Road":
            addedLayer = new OpenLayers.Layer.Bing({
                name: "Bing Road",
                key: BING_key,
                type: "Road"
            });
            break;
        case "Bing Hybrid":
            addedLayer = new OpenLayers.Layer.Bing({
                name: "Bing Hybrid",
                key: BING_key,
                type: "AerialWithLabels"
            });
            break;
        case "Bing Aerial":
            addedLayer = new OpenLayers.Layer.Bing({
                name: "Bing Aerial",
                key: BING_key,
                type: "Aerial"
            });
            break;
        }
        if (addedLayer.name == this.ignBaseLayer || isBaseLayer) {
            addedLayer.isBaseLayer = true;
        }
        // add layer to the map
        this.olMap.addLayer(addedLayer);
        if (isBaseLayer) {
            this.olMap.baseLayer = addedLayer;
        }
        var baseLayerName = this.olMap.baseLayer.name;

        if (baseLayerName.indexOf("Google") != -1 || baseLayerName.indexOf("Virtual Earth") != -1 || baseLayerName.indexOf("Yahoo") != -1) {
            if (addedLayer.name.indexOf("IGN") != -1) {
                addedLayer.alwaysInRange = false;
            }
        }
    }
};
/**
 Add multiple layers to the map.
 @function
 @param {String[]} an array of layer names we want to add.
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addLayers(["Google Satellite","Google Hybrid","Google Terrain","OpenStreetMap","Yahoo Street","Yahoo Satellite","Yahoo Hybrid","Bing Road","Bing Hybrid","Bing Aerial","IGN Satellite","IGN Route"]);
 **/
WIND.Map.prototype.addLayers = function (a) {
    for (var b = 0, c = a.length; b < c; b++)
        this.addLayer(a[b])
};
/**
 Change the base layer of the map.
 @function
 @param {String} newBaselayerName Name of the new base layer.
 @example
 var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addLayer("Google Terrain");
 carte.addLayer("IGN Street");
carte.changeBaseLayer("IGN Street");
 **/
WIND.Map.prototype.changeBaseLayer = function (newBaseLayerName) {
    if (newBaseLayerName.indexOf("Google") != -1 || newBaseLayerName.indexOf("Virtual Earth") != -1 || newBaseLayerName.indexOf("Yahoo") != -1) {
        var leng = this.olMap.layers.length;
        for (var i = 0; i < leng; i++) {
            if (this.olMap.layers[i].name.indexOf("IGN") != -1) {
                this.olMap.layers[i].alwaysInRange = false;
            }
        }
    }
    if (newBaseLayerName.indexOf("IGN Maps") != -1) {
        newBaseLayerName = this.ignBaseLayer;
        var checkboxs = this.ignLayersDiv.getElementsByTagName("input");
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].type == "checkbox" && checkboxs[i].value == this.ignBaseLayer)
                checkboxs[i].checked = true;
        }
        var leng = this.olMap.layers.length;
        for (var i = 0; i < leng; i++) {
            if (this.olMap.layers[i].name.indexOf("IGN") != -1) {
                this.olMap.layers[i].alwaysInRange = true;
            }
        }
    }
    var oldBaseLayer = null;
    var oldProjection = null;
    var oldExtent = null;
    if (this.olMap.baseLayer) {
        oldBaseLayer = this.olMap.baseLayer;
        oldProjection = this.olMap.getProjectionObject();
        oldExtent = this.olMap.baseLayer.getExtent();
    }
    var newBaseLayer;
    for (var i = 0; i < this.olMap.layers.length; i++) {
        if (this.olMap.layers[i].name == newBaseLayerName)
            newBaseLayer = this.olMap.layers[i];
    }
    if (newBaseLayerName != this.olMap.baseLayer.name) {
        if (OpenLayers.Util.indexOf(this.olMap.layers, newBaseLayer) != -1) {
            if (this.olMap.baseLayer != null)
                this.olMap.baseLayer.setVisibility(false);
            this.olMap.baseLayer = newBaseLayer;
            this.olMap.viewRequestID++;
            this.olMap.baseLayer.visibility = true;
            if (oldProjection && oldProjection.getCode() != this.olMap.getProjectionObject().getCode()) { ///////////////////////////////
                oldExtent.transform(oldProjection, this.olMap.baseLayer.projection);
                this.olMap.zoomToExtent(oldExtent);
                // Xu ly ve do zoom cua Google
                if (oldBaseLayer.name.indexOf("IGN") != -1 && (newBaseLayerName.indexOf("Google") != -1 || newBaseLayerName.indexOf("Virtual Earth") != -1 || newBaseLayerName.indexOf("Yahoo") != -1)) {
                    this.olMap.zoomIn(1);
                }
                // Traitement de la couche vecteur
                if (this.toolbar) this.parts = [];
                if (this.vectorLayers) {
                    //var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
                    var features = [];
                    var fea = [];
                    var geo;
					var style;
					for(var j=0;j<this.vectorLayers.length;j++)
					{
						for (var i = 0; i < this.vectorLayers[j].features.length; i++) {
							geo = this.vectorLayers[j].features[i].geometry.clone();
							style = this.vectorLayers[j].features[i].style;
							geo[j].transform(oldProjection, this.olMap.baseLayer.projection);
							fea.push(new OpenLayers.Feature.Vector(geo, {}, style));
						}
						features.push(fea);
					}
					for(var j=0;j<this.vectorLayers.length;j++)
					{
						this.vectorLayers[j].destroyFeatures();
						this.vectorLayers[j].addFeatures(features[j]);
					}
                }
                // ***********************
            } else {
                var center = this.olMap.getCenter();
                if (center != null) {
                    var newCenter = (oldExtent) ? oldExtent.getCenterLonLat() : center;
                    newCenter.transform(oldProjection, this.olMap.getProjectionObject());
                    var newZoom = (typeof (zoom) == 'number') ? zoom : (oldExtent) ? this.olMap.getZoomForExtent(oldExtent, true) : this.olMap.getZoomForResolution(this.olMap.resolution, true);
                    this.olMap.setCenter(newCenter, newZoom, false, true);
                }
            }
        }
    }
};
/**
 Select the active vector layer
 @function
 @param {(Integer|Array.<Integer>)} vl The vector layers we want to add. If we want to select only one vector layer it's an integer, and if want we to select multiple vector layers it it an array of integer.
 @param {Boolean} [auto=true] If true allow to adjust the opacity and border of the all annotations in all the vector layers. If the annotation is in an inactive vector layer, it will be without border and will have 0.3 opacity. And if it's in an active vector layer, it will be with a border and will have an important opacity. By default this parameter is set to false.
 @example var carte = new WIND.Map("mymap", {});
 carte.addVectorLayer(1);
 carte.SelectVectorLayer(1,true);
 **/
WIND.Map.prototype.SelectVectorLayer = function (vl,auto) {
	var opacite_automatique=false;
	var nb_annot=0;
	var ij=0;
	if(auto!=null)
		opacite_automatique=auto;
	if(vl instanceof Array)
	{
		var aux;
		var valide_vl = [];
		for(var i=0;i<vl.length;i++)
		{
			aux = vl[i];
			if(this.vlIndex.indexOf(aux)>=0)
			{
				valide_vl.push(vl[i]);
			}
		}
		for(var j=0;j<valide_vl.length;j++)
		{
			valide_vl[j]=m.vectorLayers[valide_vl[j]];
			nb_annot += valide_vl[j].features.length;
		}
		this.selectControl.setLayer(valide_vl);
		if(opacite_automatique)
		{
			for(var i=m.vectorLayers.length-1;i>=0;i--)
			{
				if(valide_vl.indexOf(m.vectorLayers[i])>=0)
				{
					for(var j=0;j<m.vectorLayers[i].features.length;j++)
					{
						m.vectorLayers[i].features[j].style.strokeOpacity=1;
						m.vectorLayers[i].features[j].style.fillOpacity=0.9-(0.2/(nb_annot-1))*ij;
						ij++;
					}
				}
				else
				{
					for(var j=0;j<m.vectorLayers[i].features.length;j++)
					{
						m.vectorLayers[i].features[j].style.strokeOpacity=0;
						m.vectorLayers[i].features[j].style.fillOpacity=0.3;
					}
				}
				m.vectorLayers[i].redraw();
			}
		}
	}
	else
	{
		if(this.vlIndex.indexOf(vl)>=0)
		{
			this.selectControl.setLayer(m.vectorLayers[vl]);
			if(opacite_automatique)
			{
				for(var i=0;i<m.vectorLayers.length;i++)
				{
					if(i!=vl)
					{
						for(var j=0;j<m.vectorLayers[i].features.length;j++)
							m.vectorLayers[i].features[j].style.strokeOpacity=0;
					}
					else
					{
						for(var j=0;j<m.vectorLayers[vl].features.length;j++)
								m.vectorLayers[vl].features[j].style.strokeOpacity=1;
					}
					m.vectorLayers[i].redraw();
				}
			}
		}
	}
}
/**
 Add a new vector vector layer
 @function
 @param {Integer} vl The new vector layer ID we want to add. By default a vector layer with an ID 0 is added to the Map object.
 @example var carte = new WIND.Map("mymap", {});
 carte.addVectorLayer(1);
 **/
WIND.Map.prototype.addVectorLayer = function (vl) {
	if(this.vlIndex.indexOf(vl)<0 && Number.isInteger(vl)){
		var vlayer = new OpenLayers.Layer.Vector("Vector Layer " + vl);
		this.olMap.addLayer(vlayer);
		this.vectorLayers[vl] = vlayer;
		this.vlIndex.push(vl);
	}
};
WIND.Map.prototype.addSensiblePartToLayer = function (geo, vl, options) {
	var nb;
	if(!vl || !this.vlIndex.indexOf(vl))
		nb=0;
	else nb=vl;
    var projection, style;
    var display = true;
    style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
    if (options) {
        if (options.projection) {
            projection = options.projection;
        }
        if (options.style) {
            var decoration = options.style;
            var decors = decoration.split(",");
            var decor;
            for (var i = 0; i < decors.length; i++) {
                decor = decors[i];
                switch (decor.split(":")[0]) {
                case 'strokeColor':
                    style.strokeColor = decor.split(":")[1];
                    break;
                case 'strokeWidth':
                    style.strokeWidth = decor.split(":")[1];
                    break;
                case 'strokeOpacity':
                    style.strokeOpacity = decor.split(":")[1];
                    break;
                case 'fillColor':
                    style.fillColor = decor.split(":")[1];
                    break;
                case 'fillOpacity':
                    style.fillOpacity = decor.split(":")[1];
                    break;
                }
            }
        }
        if (options.display) {
            display = options.display;
        }
    }
    var mp = new WIND.Map.Part(geo, projection, style);
    mp.viewer = this;
    mp.vlayer = this.vectorLayers[nb];
	mp.object = id_annot;
    this.parts.push(mp);
    if (display) {
        var geometry = mp.feature.geometry.clone();
        geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
        var feature = new OpenLayers.Feature.Vector(geometry, {}, mp.feature.style);
        this.vectorLayers[nb].addFeatures([feature]);
    }
    return mp;
};
/**
 Add a Map.Part object to the default layer vector.
 @function
 @function
 @param  {Map.Part} mp the Map.Part object to add to the map.
 @param  {Boolean} display Indicates whether Map.Part appears or not.
 @param  {Integer} vl Specifies the vector layer'ID. 0by default.
 @example var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 carte.addSensiblePart(mp, true);
 **/
WIND.Map.prototype.addSensiblePart = function (mp, display, vl) {
	var nb;
	if(!vl || !this.vlIndex.indexOf(vl))
		nb=0;
	else nb=vl;
    mp.viewer = this;
    mp.vlayer = this.vectorLayers[nb];
    this.parts.push(mp);
    if (display) {
        var geometry = mp.feature.geometry.clone();
        geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
        var feature = new OpenLayers.Feature.Vector(geometry, {}, mp.feature.style);
        this.vectorLayers[nb].addFeatures([feature]);
    }
};

/* 8/2/2010 */

WIND.Map.prototype.render = function () {
    var lon, lat, z;
    if (this.longitude || this.longitude == 0) {
        lon = this.longitude;
    } else {
        lon = -1.508585;
    }
    if (this.latitude || this.latitude == 0) {
        lat = this.latitude;
    } else {
        lat = 43.477743;
    }
    if (this.zoom || this.zoom == 0) {
        z = this.zoom;
    } else {
        z = 4;
    }

    //fixIE();

    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 10;
    OpenLayers.Feature.Vector.style['default'].strokeWidth = 10;
    OpenLayers.Util.onImageLoadErrorColor = "transparent";
    
	//CONSTRUCTOR
    this.olMap = new OpenLayers.Map(this.container, {
        zoomDuration: 10,
        controls: [],
        projection: "EPSG:900913",
		restrictedExtent: null
    });
	
	// bug identified on January 22th
	// if we add Controls into OpenLayers, we can not drag data into MapViewers
	// we should return to user OpenLayers v2.12 to fix this bug
	
    // zoom scale
    this.addScaleControl();
    // position of mouse
    this.addPositionControl();
	
    // use mouse to pan and zoom map
    if (this.zoomable == true && this.pannable == true) {
        this.setMouseControl({
            'zoomWheelEnabled': true,
            'zoomBoxEnabled': true,
            'zoomDbClickEnabled': true,
            'panEnabled': true
        });
        this.addZoomControl();
    }

    // use keyboard to pan and zoom map
    //this.addKeyboardControl();

    this.addLayer(this.baseLayer, true);
    var ll = new OpenLayers.LonLat(lon, lat);
    ll.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    this.olMap.setCenter(ll, z);

    // Vector Layer
    this.vectorLayers[0] = new OpenLayers.Layer.Vector("Vector Layer");
    this.olMap.addLayer(this.vectorLayers[0]);
	this.vlIndex.push(0);

	// event select annotation on map
	this.selectControl = new OpenLayers.Control.SelectFeature([this.vectorLayers[0]]);
	this.olMap.addControl(this.selectControl);
	this.selectControl.activate();	

    // event click on map
    this.evtclick = new OpenLayers.Control.Click(this);
    this.olMap.addControl(this.evtclick);
    this.evtclick.activate();
	
    //event mouseover on map
    this.evthover = new OpenLayers.Control.Hover(this);
    this.olMap.addControl(this.evthover);
    this.evthover.activate();

	// get id of vector layer
	vector_layer_id = "OpenLayers_Layer_Vector_31_vroot";
	var allG = $tag("g");
	for (var g = 0; g < allG.length; g++) {
		if (allG[g].id.indexOf("OpenLayers_Layer_Vector") != -1 && allG[g].id.indexOf("_vroot") != -1 && allG[g].id.indexOf("RootContainer") == -1) {
			vector_layer_id = allG[g].id;
			break;
		}
	}

};
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 10,
        'stopSingle': false,
        'stopDouble': false
    },
    initialize: function (m, options) {
        this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        );
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.trigger
            }, this.handlerOptions
        );
        this.windMap = m;
    },
    trigger: function (e) {
        var mm = this.windMap;
        var that = this;
        var lonlat = mm.olMap.getLonLatFromViewPortPx(e.xy);
        var pointclicked = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
        pointclicked.transform(mm.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
        for (var i = 0; i < mm.interactionList.length; i++) {
            var interact = mm.interactionList[i];
            var evt = interact.event;
            //var ciblet = interact.source[0].feature;
            //var geo = ciblet.geometry;	
            var geo = interact.source[0].feature.geometry;
            var tmp = interact.reactions;
            //if ((evt == 'click') && (pointclicked.intersects(geo) || pointNearByLine(pointclicked, geo) || comparerPoint(pointclicked, geo))){

            for (var j = 0; j < tmp.length; j++) {
                // 12 octobre 2011
                var cible = tmp[j].target;

                if (cible instanceof WIND.LiveSensiblePart) {
                    //var evtObj = YAHOO.util.Event.getTarget(e);
                    //var lonlat2 = mm.olMap.getLonLatFromViewPortPx(e.xy);
                    //var pointclicked2 = new OpenLayers.Geometry.Point(lonlat2.lon, lonlat2.lat);
                    //pointclicked2.transform(mm.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
                    //alert(pointclicked);
                    //alert(that.parts.length);
                    var clicked;
                    for (var x = 0; x < that.parts.length; x++) {
                        if ((evt == 'click') && pointclicked.intersects(that.parts[x].feature.geometry) || pointNearByLine(pointclicked, that.parts[x].feature.geometry) || comparerPoint(pointclicked, that.parts[x].feature.geometry)) {
                            //if (that.parts[x].object == evtObj.id) {
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
                                                    var textDiv = $id(cibleViewer.container);
                                                    while (textDiv.firstChild) {
                                                        textDiv.remove(textDiv.firstChild);
                                                    }
                                                    $id(cibleViewer.container).innerHTML = "";
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
                                                    var textDiv = $id(cibleViewer.container);
                                                    while (textDiv.firstChild) {
                                                        textDiv.remove(textDiv.firstChild);
                                                    }
                                                    $id(cibleViewer.container).innerHTML = "";
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
                                                    var textDiv = $id(cibleViewer.container);
                                                    while (textDiv.firstChild) {
                                                        textDiv.remove(textDiv.firstChild);
                                                    }
                                                    $id(cibleViewer.container).innerHTML = "";
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




                //tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
            }
            //}
        }
    }
});
OpenLayers.Control.Hover = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'delay': 500,
        'pixelTolerance': null,
        'stopMove': false
    },
    initialize: function (m, options) {
        this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        );
        this.handler = new OpenLayers.Handler.Hover(
            this, {
                'pause': this.onPause,
                'move': this.onMove
            },
            this.handlerOptions
        );
        this.windMap = m;
    },
    onPause: function (e) {
        var mm = this.windMap;
        var lonlat = mm.olMap.getLonLatFromViewPortPx(e.xy);
        var pointclicked = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
        pointclicked.transform(mm.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
        for (var i = 0; i < mm.interactionList.length; i++) {
            var interact = mm.interactionList[i];
            var evt = interact.event;
            var cible = interact.source[0].feature;
            var geo = cible.geometry;
            var tmp = interact.reactions;
            if ((evt == 'mouseover') && (pointclicked.intersects(geo) || pointNearByLine(pointclicked, geo) || comparerPoint(pointclicked, geo))) {
                for (var j = 0; j < tmp.length; j++) {
                    tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
                }
            }
        }
    },
    onMove: function (e) {
        // if this control sent an Ajax request (e.g. GetFeatureInfo) when
        // the mouse pauses the onMove callback could be used to abort that request.
    }
});

WIND.Map.searchLocation = function (place, precision) {
    var xhr = createXHR();
    var scriptLocation = WIND.getScriptLocation();
    if (scriptLocation != 0 && !scriptLocation.endsWith("/")) {
        scriptLocation += "/";
    }
    if (precision) {
        var point = null;
        xhr.open("POST", scriptLocation + "php/geonames.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("place=" + place + "&p=1");
        if (xhr.status == 200) {
            var geos = xhr.responseXML.getElementsByTagName('geoname');
            for (var i = 0; i < geos.length; i++) {
                if (place == geos[i].getElementsByTagName('name')[0].firstChild.nodeValue) {
                    var lon = geos[i].getElementsByTagName('lng')[0].firstChild.nodeValue;
                    var lat = geos[i].getElementsByTagName('lat')[0].firstChild.nodeValue;
                    point = new OpenLayers.Geometry.Point(lon, lat);
                    break;
                }
            }
        } else {
            alert("Error: " + xhr.status + " " + xhr.statusText);
        }
        return point;
    } else {
        var points = [];
        xhr.open("POST", lib_path + "php/geonames.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("place=" + place + "&p=0");
        if (xhr.status == 200) {
            var geos = xhr.responseXML.getElementsByTagName('geoname');
            for (var i = 0; i < geos.length; i++) {
                //if (place == geos[i].getElementsByTagName('name')[0].firstChild.nodeValue) {
                var lon = geos[i].getElementsByTagName('lng')[0].firstChild.nodeValue;
                var lat = geos[i].getElementsByTagName('lat')[0].firstChild.nodeValue;
                points.push(new OpenLayers.Geometry.Point(lon, lat));
                //}
            }
        } else {
            alert("Error: " + xhr.status + " " + xhr.statusText);
        }
        return points;
    }
};
WIND.Map.searchItinerary = function (places) {
    if (places.length > 1) {
        var wayPoints = [];
        for (var i = 0; i < places.length; i++) {
            var p = WIND.Map.searchLocation(places[i]);
            if (p != null)
                wayPoints.push(p);
        }
        return new WIND.Map.Itinerary(wayPoints);
    } else
        return null;
};

WIND.Map.prototype.loadXMLFile = function (url) {
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
                var sp = [];
                // For itinerary
                var itiNodes = annotations[i].getElementsByTagName("Itinerary");
                if (itiNodes.length > 0) {
                    var iti = itiNodes[0];
                    var mpNodes = iti.getElementsByTagName("MapPart");
                    var pointtab = [];
                    for (var j = 0; j < mpNodes.length; j++) {
                        var mpNode = mpNodes[j];
                        var pointStr = mpNode.getElementsByTagName("geolocation")[0].firstChild.nodeValue;
                        var pointStrCoupe = pointStr.substring(6, pointStr.length - 1);
                        var lon = pointStrCoupe.split(" ")[0];
                        var lat = pointStrCoupe.split(" ")[1];
                        pointtab.push(new OpenLayers.Geometry.Point(lon, lat));
                    }
                    var iti = new WIND.Map.Itinerary(pointtab);
                    sp.push(iti);
                    this.addItinerary(iti, {
                        mode: "route",
                        color: "blue"
                    });
                } else {
                    var mapparts = annotations[i].getElementsByTagName("MapPart");
                    for (var j = 0; j < mapparts.length; j++) {
                        var geodata = mapparts[j].getElementsByTagName("geolocation")[0].textContent;
                        var geoName = null;
                        var geoNameNodes = mapparts[j].getElementsByTagName("geoname");
                        if (geoNameNodes.length > 0 && geoNameNodes[0].firstChild) geoName = geoNameNodes[0].firstChild.nodeValue;
                        var mp = this.createSensiblePart(geodata, {
                            'geoname': geoName,
                            'style': "strokeColor:#0033CC,strokeWidth:3,fillColor:#FF9900"
                        });
                        sp.push(mp);
                    }
                }
                if (sp.length > 0) {
                    var annot = new WIND.Annotation(annotations[i].getElementsByTagName("semantics")[0].firstChild.nodeValue, annotations[i].getElementsByTagName("entity")[0].firstChild.nodeValue, sp);
                    this.annotations.push(annot);
                }
            }
        }
        this.zoomToExtent(this.parts);
    } else {
        $id(this.container).innerHTML = "Error: " + url + " " + xhr.status + " " + xhr.statusText;
    }
};
WIND.Map.prototype.loadRDFFile = function (php, url) {
    var xhr = createXHR();
    xhr.open("GET", php + "?rdf=" + url, false);
    xhr.send(null);
    if (xhr.status == 200) {
        var resultat = YAHOO.lang.JSON.parse(xhr.responseText);
        if (resultat.itinerary && resultat.itinerary.length > 0) {
            var mpNodes = resultat.itinerary;
            var pointtab = [];
            for (var j = 0; j < mpNodes.length; j++) {
                var mpNode = mpNodes[j];
                var pointStr = mpNode.geolocation;
                var pointStrCoupe = pointStr.substring(6, pointStr.length - 1);
                var lon = pointStrCoupe.split(" ")[0];
                var lat = pointStrCoupe.split(" ")[1];
                pointtab.push(new OpenLayers.Geometry.Point(lon, lat));
            }
            var iti = new WIND.Map.Itinerary(pointtab);
            //sp.push(iti);
            this.addItinerary(iti, {
                mode: "route",
                color: "blue"
            });
        } else {
            var res = resultat.annotations;
            for (var i = 0; i < res.length; i++) {
                var spat = res[i].spatialInfo;
                for (var j = 0; j < spat.length; j++) {
                    var mp = this.createSensiblePart(spat[j].geolocation, {
                        'geoname': spat[j].geoname,
                        'style': "strokeColor:#0033CC,strokeWidth:3,fillColor:#FF9900,fillOpacity:0.3"
                    });
                    var annot = new WIND.Annotation(spat[j].geotype, spat[j].geoname, [mp]);
                    this.annotations.push(annot);
                }
            }
            this.zoomToExtent(this.parts);
        }
    } else {
        $id(this.container).innerHTML = "Error: " + url + " " + xhr.status + " " + xhr.statusText;
    }
};
WIND.Map.prototype.createSensiblePart = function (geo, options, vl) {
	var nb;
	if(!vl || !this.vlIndex.indexOf(vl))
		nb=0;
	else nb=vl;
    var projection, geoname;
    var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
    var display = true;
    if (options) {
        if (options.projection) {
            projection = options.projection;
        }
        if (options.style) {
            var decoration = options.style;
            var decors = decoration.split(",");
            var decor;
            for (var i = 0; i < decors.length; i++) {
                decor = decors[i];
                switch (decor.split(":")[0]) {
                case 'strokeColor':
                    style.strokeColor = decor.split(":")[1];
                    break;
                case 'strokeWidth':
                    style.strokeWidth = decor.split(":")[1];
                    break;
                case 'strokeOpacity':
                    style.strokeOpacity = decor.split(":")[1];
                    break;
                case 'fillColor':
                    style.fillColor = decor.split(":")[1];
                    break;
                case 'fillOpacity':
                    style.fillOpacity = decor.split(":")[1];
                    break;
                }
            }
        }
        if (options.display) {
            display = options.display;
        }
        if (options.geoname) {
            geoname = options.geoname;
        }
    }
    var mp = new WIND.Map.Part(geo, projection, style);
    mp.geoname = geoname;
    mp.viewer = this;
    mp.vlayer = this.vectorLayers[nb];
    mp.object = id_annot;
    // fix 4/3/2011
    if (!this.toolbar) this.parts.push(mp);
    if (display) {
        var geometry = mp.feature.geometry.clone();
        geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
        //alert(mp.feature.geometry + "->" + geometry);
        var feature = new OpenLayers.Feature.Vector(geometry, {}, mp.feature.style);
        this.vectorLayers[nb].addFeatures([feature]);
    }
    return mp;
};

/**
 Creates a WIND.Map.Part object.
 @memberOf WIND.Map
 @class Creates a WIND.Map.Part object.
 @param {String} geometry Type and coordinates of the geometry. It can either a "POLYGON", a "MULTIPOLYGON", a "LINESTRING", a "MULTILINESTRING", a "POINT", a "MULTIPOINT", a "MARKER" or a "MULTIMARKER.
 @param {String} projection The projection system of the map(georeferenced coordinate systems), by default it's EPSG:4326.
 @param {String} style Dedine the css style of the geometry.
 @property {Unknow} feature On sait pas
 @property {Unknow} style style de la carte
 @property {geoObject} geoObject Type de figure de la part avec ses coordonnées
 @property {Unknown} vlayer On sait pas
 @example
 var part = new WIND.Map.Part("POINT(0.43, 46.56)", "EPSG:4326","strokeColor:#FF9900,strokeWidth:3,strokeOpacity:0.8,fillColor:#FFFF00,fillOpacity:0.4");
 **/
WIND.Map.Part = function (geometry, projection, style) {
    var mystyle;
    if (style) mystyle = style;
    else {
        mystyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        mystyle.strokeColor = "#B26B00";
        mystyle.strokeWidth = 2;
        mystyle.fillColor = "#FECC80";
        mystyle.fillOpacity = 0.3;
    }
    if (geometry.startsWith("POLYGON")) {
        var rings = geometry.substring(9, geometry.length - 2).split("),(");
        var ring;
        var rgs = [];
        for (var i = 0; i < rings.length; i++) {
            ring = rings[i];
            var points = ring.split(",");
            var point;
            var pts = [];
            for (var j = 0; j < points.length; j++) {
                point = points[j];
                pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
            }
            rgs.push(new OpenLayers.Geometry.LinearRing(pts));
        }
        var poly = new OpenLayers.Geometry.Polygon(rgs);
        id_annot = poly.id;
		var aux1 = id_annot.split("_")[3];
		var aux = parseInt(aux1);
		aux += 2;
		aux = aux.toString();
		id_annot = id_annot.replace(aux1, aux);
        if (projection) poly.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        this.feature = new OpenLayers.Feature.Vector(poly, {}, mystyle);
    }
    if (geometry.startsWith("MULTIPOLYGON")) {
        var polys = geometry.substring(15, geometry.length - 3).split(")),((");
        var poly;
        var polygones = [];
        for (var i = 0; i < polys.length; i++) {
            poly = polys[i];
            var rings = poly.split("),(");
            var ring;
            var rgs = [];
            for (var j = 0; j < rings.length; j++) {
                ring = rings[j];
                var points = ring.split(",");
                var point;
                var pts = [];
                for (var k = 0; k < points.length; k++) {
                    point = points[k];
                    pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
                }
                rgs.push(new OpenLayers.Geometry.LinearRing(pts));
            }
            var polygone = new OpenLayers.Geometry.Polygon(rgs);
            id_annot = polygone.id;
            var aux1 = id_annot.split("_")[3];
            var aux = parseInt(aux1);
            aux += 4;
            aux = aux.toString();
            id_annot = id_annot.replace(aux1, aux);
            polygones.push(polygone);
        }
        var multipolygon = new OpenLayers.Geometry.MultiPolygon(polygones);
        if (projection) multipolygon.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        this.feature = new OpenLayers.Feature.Vector(multipolygon, {}, mystyle);
    } else if (geometry.startsWith("LINESTRING")) {
        var points = geometry.substring(11, geometry.length - 1).split(",");
        var point;
        var pts = [];
        for (var i = 0; i < points.length; i++) {
            point = points[i];
            pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
        }
        var line = new OpenLayers.Geometry.LineString(pts);
        if (projection) line.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        this.feature = new OpenLayers.Feature.Vector(line, {}, mystyle);
    } else if (geometry.startsWith("MULTILINESTRING")) {
        var lines = geometry.substring(17, geometry.length - 2).split("),(");
        var line;
        var lignes = [];
        for (var i = 0; i < lines.length; i++) {
            line = lines[i];
            var points = line.split(",");
            var point;
            var pts = [];
            for (var j = 0; j < points.length; j++) {
                point = points[j];
                pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
            }
            var ligne = new OpenLayers.Geometry.LineString(pts);
            lignes.push(ligne);
        }
        var multiline = new OpenLayers.Geometry.MultiLineString(lignes);
        if (projection) multiline.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        this.feature = new OpenLayers.Feature.Vector(multiline, {}, mystyle);
    } else if (geometry.startsWith("POINT")) {
        var pt = geometry.substring(6, geometry.length - 1).split(" ");
        var point = new OpenLayers.Geometry.Point(pt[0], pt[1]);
        if (projection) point.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        this.feature = new OpenLayers.Feature.Vector(point, {}, mystyle);
    } else if (geometry.startsWith("MULTIPOINT")) {
        var points = geometry.substring(11, geometry.length - 1).split(",");
        var pt, point;
        var pts = [];
        for (var i = 0; i < points.length; i++) {
            point = points[i];
            pt = point.substring(1, point.length - 1).split(" ");
            pts.push(new OpenLayers.Geometry.Point(pt[0], pt[1]));
        }
        var multipoint = new OpenLayers.Geometry.MultiPoint(pts);
        if (projection) multipoint.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        this.feature = new OpenLayers.Feature.Vector(multipoint, {}, mystyle);
    } else if (geometry.startsWith("MULTIMARKER")) {
        var tk = geometry.substring(13, geometry.length - 1).split("), ");
        var points = tk[0].split(",");
        var pt, point;
        var pts = [];
        for (var i = 0; i < points.length; i++) {
            point = points[i];
            pt = point.substring(1, point.length - 1).split(" ");
            pts.push(new OpenLayers.Geometry.Point(pt[0], pt[1]));
        }
        var multipoint = new OpenLayers.Geometry.MultiPoint(pts);
        if (projection) multipoint.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        mystyle.externalGraphic = tk[1];
        mystyle.pointRadius = 15;
        mystyle.graphicXOffset = -15;
        mystyle.graphicYOffset = -30;
        mystyle.fillOpacity = 1;
        this.feature = new OpenLayers.Feature.Vector(multipoint, {}, mystyle);
    } else if (geometry.startsWith("MARKER")) {
        var tk = geometry.substring(7, geometry.length - 1).split(",");
        var pt = tk[0].substring(1, tk[0].length - 1).split(" ");
        var point = new OpenLayers.Geometry.Point(pt[0], pt[1]);
        if (projection) point.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
        if (tk.length > 1) mystyle.externalGraphic = tk[1];
        else mystyle.externalGraphic = lib_path + "images/marker-gold.png"
        mystyle.pointRadius = 15;
        mystyle.graphicXOffset = -15;
        mystyle.graphicYOffset = -30;
        mystyle.fillOpacity = 1;
        this.feature = new OpenLayers.Feature.Vector(point, {}, mystyle);
    }
    this.style = mystyle;
    this.geoObject = geometry;
    this.vlayer = null;
};

// The WIND.MapPart object inherits all of the WIND.SensiblePart object's methods
WIND.Map.Part.prototype = new WIND.SensiblePart('map');
/**
 Displays the Part.
 @function
 @example var part = new WIND.Map.Part("POINT(0.43, 46.56)", "EPSG:4326","strokeColor:#FF9900,strokeWidth:3,strokeOpacity:0.8,fillColor:#FFFF00,fillOpacity:0.4");
 part.show();
 **/
WIND.Map.Part.prototype.show = function () {
	if(this.feature.style.oldstrokeOpacity>=0)
		this.feature.style.strokeOpacity=this.feature.style.oldstrokeOpacity;
	if(this.feature.style.oldfillOpacity>=0)
		this.feature.style.fillOpacity=this.feature.style.oldfillOpacity;
	this.vlayer.redraw();
};
/**
 Hide the Part.
 @function
 @example
 var part = new WIND.Map.Part("POINT(0.43, 46.56)", "EPSG:4326","strokeColor:#FF9900,strokeWidth:3,strokeOpacity:0.8,fillColor:#FFFF00,fillOpacity:0.4");
 part.hide();
 **/
WIND.Map.Part.prototype.hide = function () {
	if(this.feature.style.strokeOpacity || this.feature.style.fillOpacity)
	{
		this.feature.style.oldstrokeOpacity=this.feature.style.strokeOpacity;
		this.feature.style.oldfillOpacity=this.feature.style.fillOpacity;
		this.feature.style.strokeOpacity=0;
		this.feature.style.fillOpacity=0;
		this.vlayer.redraw();
    }
};
WIND.Map.Part.prototype.zoomTo = function () {
    var geometry = this.feature.geometry.clone();
    geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.viewer.olMap.baseLayer.projection);
    if (geometry instanceof OpenLayers.Geometry.Point) {
        this.viewer.olMap.setCenter(new OpenLayers.LonLat(geometry.x, geometry.y), 15);
    } else {
        var zoomLevel = Math.min(this.viewer.olMap.getZoomForExtent(geometry.getBounds()), 15);
        var center = geometry.getBounds().getCenterLonLat();
        this.viewer.olMap.setCenter(center, zoomLevel);
        //this.viewer.olMap.zoomToExtent(geometry.getBounds());
    }
};
WIND.Map.Part.prototype.zoomWith = function (mp) {
    var geometry1 = this.feature.geometry.clone();
    if (mp instanceof WIND.Map.Part)
        var geometry2 = mp.feature.geometry.clone();
    else if (mp instanceof WIND.Annotation)
        var geometry2 = mp.annotedObjects[0].feature.geometry.clone();
    geometry1.transform(new OpenLayers.Projection("EPSG:4326"), this.viewer.olMap.baseLayer.projection);
    geometry2.transform(new OpenLayers.Projection("EPSG:4326"), this.viewer.olMap.baseLayer.projection);
    var bbox1 = geometry1.getBounds();
    var bbox2 = geometry2.getBounds();
    bbox2.extend(bbox1);
    this.viewer.olMap.zoomToExtent(bbox2);
    var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
    style.fillOpacity = 0;
    var feature = new OpenLayers.Feature.Vector(bbox2.toGeometry(), {}, style);
    this.vlayer.addFeatures([feature]);
    var that = this;

    setTimeout(function () {
        that.vlayer.removeFeatures([feature]);
    }, 1000);
};
/**
 Hightlight the Part. 
 @function
 @example var part = new WIND.Map.Part("POINT(0.43, 46.56)", "EPSG:4326","strokeColor:#FF9900,strokeWidth:3,strokeOpacity:0.8,fillColor:#FFFF00,fillOpacity:0.4");
 part.highlight();
 **/
WIND.Map.Part.prototype.highlight = function () {
    var styleParams = {
        'strokeColor'   : 'green',
        'strokeWidth'   : '3',
        'fillColor'     : 'blue'
    };
    this.feature.css(styleParams);
	this.vlayer.redraw();
};
WIND.Map.Part.prototype.setFeatureStyle = function (styleString) {
    var changed = false;
    if (styleString.strokeColor != this.feature.style.strokeColor) {
        this.feature.style.strokeColor = styleString.strokeColor;
        changed = true;
    }
    if (styleString.strokeWidth != this.feature.style.strokeWidth) {
        this.feature.style.strokeWidth = styleString.strokeWidth;
        changed = true;
    }
    if (styleString.strokeOpacity != this.feature.style.strokeOpacity) {
        this.feature.style.strokeOpacity = styleString.strokeOpacity;
        changed = true;
    }
    if (styleString.fillColor != this.feature.style.fillColor) {
        this.feature.style.fillColor = styleString.fillColor;
        changed = true;
    }
    if (styleString.fillOpacity != this.feature.style.fillOpacity) {
        this.feature.style.fillOpacity = styleString.fillOpacity;
        changed = true;
    }
    if (styleString.icon) {
        this.feature.style.externalGraphic = styleString.icon;
        this.feature.style.pointRadius = 15;
        this.feature.style.graphicXOffset = -15;
        this.feature.style.graphicYOffset = -30;
    }
    if (changed) {
        this.vlayer.drawFeature(this.feature, styleString);
        this.vlayer.redraw();
    }
};

/**
 Create a Marker object on the map. 
 @memberOf WIND.Map
 @class Create a Marker object on the map.
 @param {Integer} x The longitude of the point where the marker will be displayed.
 @param {Integer} y The latitude of the point where the marker will be displayed.
 @param {String} [i="http://erozate.iutbayonne.univ-pau.fr/windapi/lib/images/marker-gold.png"] URL of the marker icon(.PNG or .JPG extensions).
 @param {Integer} [s=15] The size of the marker.
 @example var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 var marqueur = new WIND.Map.Marker(-1.509136,43.478266);
 **/
WIND.Map.Marker = function (x, y, i, s) {
    this.point = new OpenLayers.Geometry.Point(x, y);
    if (i) this.icon = i;
    else this.icon = lib_path + "images/marker-gold.png";
    if (s) this.size = s;
    else this.size = 15;
};
/**
 Add a marker to the map. 
 @function
 @param {Map.Marker} marker The marker to add to the map.
 @param  {Integer} [vl] Specifies the vector layer'ID. 0 by default.
 @example var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 var marqueur = new WIND.Map.Marker(-1.509136,43.478266);
 carte.addMarker(marqueur);
 **/
WIND.Map.prototype.addMarker = function (marker, vl) {
	var nb;
	if(!vl || !this.vlIndex.indexOf(vl))
		nb=0;
	else nb=vl;
    var point = marker.point.clone();
    var iconUrl = marker.icon;
    var size = marker.size;
    point.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
    // Corriger le bug de Marker
    var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
    style.externalGraphic = iconUrl;
    style.pointRadius = size;
    style.graphicXOffset = -size;
    style.graphicYOffset = -2 * size;
    style.fillOpacity = 1;
    var feature = new OpenLayers.Feature.Vector(point, {}, style);
    this.vectorLayers[nb].addFeatures([feature]);
    /*
	var feature = new OpenLayers.Feature.Vector(point, {}, 
		{
			externalGraphic: iconUrl,                    
			pointRadius: size,
			graphicXOffset: - size,
			graphicYOffset: - 2*size
		}
	);
	this.vectorLayer.addFeatures([feature]);
	*/
};
/**
 Create an Intinerary object.
 * @memberOf WIND.Map
 * @class Create an Intinerary object.
 * @param {Point[]} wps Points passed by the itinerary.
 * @property {Point[]} wayPoints Les points passés par l'itinéraire
 * @property {Point} start Le premier point
 * @property {Point} end Le dernier point 
 * @example
 var iti = new WIND.Map.Itinerary(new Array(new OpenLayers.Geometry.Point(2,45), new OpenLayers.Geometry.Point(3,46)));
 **/
WIND.Map.Itinerary = function (wps) {
    this.wayPoints = wps;
    this.start = this.wayPoints[0];
    this.end = this.wayPoints[this.wayPoints.length - 1];
};
/**
 Add an Itinerary to the map.
 @function
 @param {Intinerary} iti Add an Itinerary to the map.
 @param {JSON} options Describes the options of the Itinerary.
 @example var carte = new WIND.Map("mymap", {'top': 10, 'left': 20, 'width': 600, 'height': 400, 'name': "carte", 'type': 'Google Street', 'longitude': -0.9331, 'latitude': 45.9236, 'zoom': 5, 'draggable': false, 'resizable' : false,'color': '#FF9900', 'border': '#FF9900 2px solid', 'header': false, 'removable': false, 'configurable': false,'zoomable':true});
 var iti = new WIND.Map.Itinerary(new Array(new OpenLayers.Geometry.Point(2,45), new OpenLayers.Geometry.Point(3,46)));
 carte.addItinerary(iti, {'mode':"route"});
 **/
WIND.Map.prototype.addItinerary = function (iti, options) {
    var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
    style.strokeWidth = 2;
    var mode = "direct";
    var travel = G_TRAVEL_MODE_DRIVING;
    var avoid = false;
    var wps = iti.wayPoints;
    var icons = [];
    icons.push(lib_path + "images/depart.png");
    if (wps.length > 2) {
        for (var i = 1; i < wps.length - 1; i++) {
            icons.push(lib_path + "images/relais.png");
        }
    }
    icons.push(lib_path + "images/arrivee.png");
    if (options) {
        if (options.mode) mode = options.mode;
        if (options.travelMode) travel = options.travelMode;
        if (options.avoidHighways) avoid = options.avoidHighways;
        if (options.color) style.strokeColor = options.color;
        if (options.icons) icons = options.icons;
    }

    if (mode == "route") {
        var gwps = [];
        for (var i = 0; i < wps.length; i++) {
            gwps.push(new GLatLng(wps[i].y, wps[i].x));
        }
        // For GDirections
        var gdir = new GDirections();
        var mm = this;
        GEvent.addListener(gdir, "load",
            function () {
                var route = gdir.getPolyline();
                if (route) {
                    var leng = Math.round(route.getLength() / 1000);
                    var diems = [];
                    for (var i = 0; i < route.getVertexCount(); i++) {
                        var pt = new OpenLayers.Geometry.Point(route.getVertex(i).lng(), route.getVertex(i).lat());
                        diems.push(pt);
                    }
                    var poly = new OpenLayers.Geometry.LineString(diems);
                    poly.transform(new OpenLayers.Projection('EPSG:4326'), mm.olMap.baseLayer.projection);
                    var feature = new OpenLayers.Feature.Vector(poly, {}, style);
                    mm.vectorLayers[0].addFeatures([feature]);
                }
            }
        );
        GEvent.addListener(gdir, "error",
            function () {
                switch (gdir.getStatus().code) {
                case G_GEO_BAD_REQUEST:
                    alert("A directions request could not be successfully parsed.\n Error code: " + gdir.getStatus().code);
                    break;
                case G_GEO_SERVER_ERROR:
                    alert("A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.\n Error code: " + gdir.getStatus().code);
                    break;
                case G_GEO_MISSING_QUERY:
                    alert("The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.\n Error code: " + gdir.getStatus().code);
                    break;
                case G_GEO_UNKNOWN_ADDRESS:
                    alert("No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect.\nError code: " + gdir.getStatus().code);
                    break;
                case G_GEO_UNAVAILABLE_ADDRESS:
                    alert("The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons.\n Error code: " + gdir.getStatus().code);
                    break;
                case G_GEO_UNKNOWN_DIRECTIONS:
                    alert("The GDirections object could not compute directions between the points mentioned in the query. This is usually because there is no route available between the two points, or because we do not have data for routing in that region.\n Error code: " + gdir.getStatus().code);
                    break;
                case G_GEO_BAD_KEY:
                    alert("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + gdir.getStatus().code);
                    break;
                case G_GEO_TOO_MANY_QUERIES:
                    alert("The given key has gone over the requests limit in the 24 hour period or has submitted too many requests in too short a period of time. If you're sending multiple requests in parallel or in a tight loop, use a timer or pause in your code to make sure you don't send the requests too quickly.\n Error code: " + gdir.getStatus().code);
                    break;
                default:
                    alert("An unknown error occurred.");
                    break;
                }
            }
        );
        gdir.loadFromWaypoints(gwps, {
            local: "FR",
            getPolyline: true,
            travelMode: travel,
            avoidHighways: avoid
        });
    } else {
        var ligne = (new OpenLayers.Geometry.LineString(wps)).clone();
        ligne.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
        var feature = new OpenLayers.Feature.Vector(ligne, {}, style);
        this.vectorLayers[0].addFeatures([feature]);
    }
    this.addMarker(new WIND.Map.Marker(wps[0], icons[0], 15));
    this.addMarker(new WIND.Map.Marker(wps[wps.length - 1], icons[wps.length - 1], 15));
    if (wps.length > 2) {
        for (var i = 1; i < wps.length - 1; i++) {
            this.addMarker(new WIND.Map.Marker(wps[i], icons[i], 15));
        }
    }
};
comparerNumber = function (a, b) {
    if (a < b) {
        var tmp = b;
        b = a;
        a = tmp;
    }
    var eps = a - b;
    // Il faut prendre en compte du niveau de zoom pour l'approximation
    if (eps < 0.001) return true;
    else return false;
};
comparerGeo = function (a, b) {
    if (a instanceof OpenLayers.Geometry.Polygon) {
        if (b instanceof OpenLayers.Geometry.Polygon) {
            return comparerPolygon(a, b);
        } else return false;
    }
    if (a instanceof OpenLayers.Geometry.MultiPolygon) {
        if (b instanceof OpenLayers.Geometry.MultiPolygon) {
            return comparerMultiPolygon(a, b);
        } else return false;
    } else if (a instanceof OpenLayers.Geometry.LineString) {
        if (b instanceof OpenLayers.Geometry.LineString) {
            return comparerLineString(a, b);
        } else return false;
    } else if (a instanceof OpenLayers.Geometry.MultiLineString) {
        if (b instanceof OpenLayers.Geometry.MultiLineString) {
            return comparerMultiLineString(a, b);
        } else return false;
    } else if (a instanceof OpenLayers.Geometry.Point) {
        if (b instanceof OpenLayers.Geometry.Point) {
            return comparerPoint(a, b);
        } else return false;
    } else if (a instanceof OpenLayers.Geometry.MultiPoint) {
        if (b instanceof OpenLayers.Geometry.MultiPoint) {
            return comparerMultiPoint(a, b);
        } else return false;
    } else return false;
};
comparerPolygon = function (a, b) {
    var la = a.components.length;
    var lb = b.components.length;
    if (la == lb) {
        var ok = true;
        for (var i = 0; i < la; i++) {
            if (comparerLineString(a.components[i], b.components[i]) == false) {
                ok = false;
                break;
            }
        }
        return ok;
    } else return false;
};
comparerMultiPolygon = function (a, b) {
    var la = a.components.length;
    var lb = b.components.length;
    if (la == lb) {
        var ok = true;
        for (var i = 0; i < la; i++) {
            if (comparerPolygon(a.components[i], b.components[i]) == false) {
                ok = false;
                break;
            }
        }
        return ok;
    } else return false;
};
comparerLineString = function (a, b) {
    var la = a.components.length;
    var lb = b.components.length;
    if (la == lb) {
        var ok = true;
        for (var i = 0; i < la; i++) {
            if (comparerPoint(a.components[i], b.components[i]) == false) {
                ok = false;
                break;
            }
        }
        return ok;
    } else return false;
};
comparerMultiLineString = function (a, b) {
    var la = a.components.length;
    var lb = b.components.length;
    if (la == lb) {
        var ok = true;
        for (var i = 0; i < la; i++) {
            if (comparerLineString(a.components[i], b.components[i]) == false) {
                ok = false;
                break;
            }
        }
        return ok;
    } else return false;
};
comparerPoint = function (a, b) {
    if (comparerNumber(a.x, b.x) && comparerNumber(a.y, b.y))
        return true;
    else return false;
};
comparerMultiPoint = function (a, b) {
    var la = a.components.length;
    var lb = b.components.length;
    if (la == lb) {
        var ok = true;
        for (var i = 0; i < la; i++) {
            if (comparerPoint(a.components[i], b.components[i]) == false) {
                ok = false;
                break;
            }
        }
        return ok;
    } else return false;
};
pointNearByLine = function (p, line) {
    if ((p instanceof OpenLayers.Geometry.Point) && ((line instanceof OpenLayers.Geometry.LineString) || (line instanceof OpenLayers.Geometry.MultiLineString))) {
        if (p.distanceTo(line) < 0.01) return true;
    } else
        return false;
};

sortPoints = function (points) {
    var p = points[0];
    for (var i = 0; i < points.length; i++) {
        if (points[i].y < p.y) p = points[i];
        else if (points[i].y == p.y && points[i].x < p.x) p = points[i];
    }
    var sorted = [];
    var pos = [];
    var neg = [];
    var infini = [];
    for (var i = 0; i < points.length; i++) {
        var a = points[i].x - p.x;
        var b = points[i].y - p.y;
        if (a != 0) {
            var cot = b / a;
            if (cot < 0) neg.push({
                point: points[i],
                cotangent: cot
            });
            else pos.push({
                point: points[i],
                cotangent: cot
            });
        } else infini.push({
            point: points[i],
            dy: b
        });
    }
    sorted.push(p);
    sortDescending(neg, "cotangent");
    for (var i = 0; i < neg.length; i++) {
        if (sorted[sorted.length - 1].x == neg[i].point.x && sorted[sorted.length - 1].y == neg[i].point.y)
            continue;
        sorted.push(neg[i].point);
    }
    sortDescending(infini, "dy");
    sorted.push(infini[0].point);
    sortDescending(pos, "cotangent");
    for (var i = 0; i < pos.length; i++) {
        if (sorted[sorted.length - 1].x == pos[i].point.x && sorted[sorted.length - 1].y == pos[i].point.y)
            continue;
        sorted.push(pos[i].point);
    }
    return sorted;
};

sortDescending = function (tab, index) {
    var tmp;
    if (index == "cotangent") {
        for (var i = 0; i < tab.length - 1; i++) {
            for (var j = i + 1; j < tab.length; j++) {
                if (tab[i].cotangent < tab[j].cotangent) {
                    tmp = tab[i];
                    tab[i] = tab[j];
                    tab[j] = tmp;
                }
            }
        }
    }
    if (index == "dy") {
        for (var i = 0; i < tab.length - 1; i++) {
            for (var j = i + 1; j < tab.length; j++) {
                if (tab[i].dy < tab[j].dy) {
                    tmp = tab[i];
                    tab[i] = tab[j];
                    tab[j] = tmp;
                }
            }
        }
    }
};
directionFunc = function (p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
};

WIND.Map.createConvexPolygon = function (points) {
    var ordered = sortPoints(points);
    var hull = [];
    hull.push(ordered[0]); // add the pivot
    hull.push(ordered[1]); // makes first vector
    for (var i = 2; i < ordered.length; i++) {
        while (directionFunc(hull[hull.length - 2], hull[hull.length - 1], ordered[i]) > 0)
            hull.pop();
        hull.push(ordered[i]);
    }
    var ring = new OpenLayers.Geometry.LinearRing(hull);
    return new OpenLayers.Geometry.Polygon([ring]);
};