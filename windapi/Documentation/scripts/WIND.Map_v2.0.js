    function include(fileName){
    document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
    }
	//
	
	
	// Map class 
	
WIND.Map = function(iddiv, options) {
	this.type = "map";
	this.top = 10;
	this.left = 10;
	this.width = 600;
	this.height = 400;
	this.color = "#3366CC";
	this.border = "#3366CC 2px solid";
	this.name = "Map Displayer";
	this.icon = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/images/mvizicon.png";
	
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
	
		if (options.type) {this.baseLayer = options.type;}
		if (options.longitude) {this.longitude = options.longitude;}
		if (options.latitude) {this.latitude = options.latitude;}
		if (options.zoom || options.zoom == 0) {this.zoom = options.zoom;}
	}
	
	var outerDiv = document.createElement("div");
	outerDiv.id = iddiv + "Outer";
	outerDiv.style.position = "absolute";
	
	if (options.top) this.top = options.top;
	outerDiv.style.top = this.top+"px";
	
	if (options.left) this.left = options.left;
	outerDiv.style.left = this.left+"px";
	
	if (options.width) this.width = options.width;
	outerDiv.style.width = this.width+"px";
	
	if (options.height) this.height = options.height;
	outerDiv.style.height = this.height+"px";
	
	if (options.color) this.color = options.color;
	if (options.border) this.border = options.border;
	outerDiv.style.border = this.border;
	
	if (options.parentEl) this.parentEl = options.parentEl;
	if (options.name) this.name = options.name;
	if (options.icon) this.icon = options.icon;
	
	var mapDiv;
	if (document.getElementById(iddiv))
		mapDiv = document.getElementById(iddiv);
	else { 
		mapDiv = document.createElement("div");
		mapDiv.id = iddiv;
	}
	mapDiv.style.position = "absolute";
	mapDiv.style.top = "0px";
	mapDiv.style.width = "100%";
	mapDiv.style.height = "100%";
	outerDiv.appendChild(mapDiv);
	//document.body.appendChild(outerDiv);
	if (options.parentEl) {
		this.parentEl = options.parentEl;
		document.getElementById(options.parentEl).appendChild(outerDiv);
	}
	else document.body.appendChild(outerDiv);
	
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
		iconSpan.title = "MapDisplayer";
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
		configDiv.style.zIndex = 11;
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
		input1.onblur = function() {
			var nomafficheur = document.getElementById(iddiv + "Configuration_Name").value;
			if ((nomafficheur != null) && (nomafficheur != '')) {
				that.name = nomafficheur;
				nameNode.removeChild(nameNode.firstChild);
				nameNode.appendChild(document.createTextNode(that.name));
			}
			that.eventConfigured.fire(that);
		};
		/*
		var nameButton = document.createElement("input");
		nameButton.type = "button";
		nameButton.id = iddiv + "Configuration_Name_OK";
		nameButton.name = iddiv + "Configuration_Name_OK";
		nameButton.value = "OK";
		configDiv.appendChild(nameButton);
		nameButton.onclick = function() {
			var nomafficheur = document.getElementById(iddiv + "Configuration_Name").value;
			if ((nomafficheur != null) && (nomafficheur != '')) {
				that.name = nomafficheur;
				nameNode.removeChild(nameNode.firstChild);
				nameNode.appendChild(document.createTextNode(that.name));
			}
			that.eventConfigured.fire(that);
		};
		*/
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
		var colorTab=["#00248E","#0033CC","#809FFE","#BFCFFE","#12127D","#1919B3","#9191FE","#C8C8FE","#24006B","#330099","#AA80FE","#D4BFFE","#2D006B","#400099","#B580FE","#DABFFE","#47006B","#660099","#D580FE","#EABFFE","#6B006B","#990099","#FF80FE","#FFBFFE","#8E006B","#CC0099","#FE80DF","#FEBFEF","#A10048","#E60066","#FE80B9","#FEBFDC","#B20000","#FF0000","#FE8080","#FEBFBF","#B22400","#FF3300","#FE9980","#FECCBF","#B24700","#FF6600","#FEB380","#FED9BF","#B25900","#FF8000","#FEBF80","#FEDFBF","#B26B00","#FF9900","#FECC80","#FEE6BF","#B27D00","#FFB200","#FED980","#FEECBF","#B28F00","#FFCC00","#FEE680","#FEF2BF","#B2A100","#FFE500","#FEF280","#FEF9BF","#B2B300","#FFFF00","#FEFF80","#FEFFBF","#8FB200","#CCFF00","#E6FE80","#F2FEBF","#6BB200","#99FF00","#CCFE80","#E6FEBF","#24B200","#33FF00","#99FE80","#CCFEBF","#008E00","#00CC00","#80FE80","#BFFEBF","#007D47","#00B366","#80FEC8","#BFFEE3","#006B6B","#009999","#80FFFE","#BFFFFE","#00477D","#0066B3","#80C8FE","#BFE3FE"];
		for (var i=0; i<colorTab.length; i++) {
			var opt = new Option(colorTab[i], colorTab[i]);
			opt.style.background = colorTab[i];
			opt.style.position = "absolute";
			opt.style.width = "100px";
			opt.style.height = "30px";
			if (colorTab[i] == this.color) opt.selected = true;
			input2.add(opt);
		}
		input2.onchange = function() {
			input2.style.background = this.options[this.selectedIndex].value;
			that.color = this.options[this.selectedIndex].value;
			that.border = this.options[this.selectedIndex].value + " 2px solid";
			document.getElementById(iddiv + "Handle").style.backgroundColor = that.color;
			document.getElementById(iddiv + "Outer").style.border = that.border;
		}; 
		
		configDiv.appendChild(document.createElement("br"));
		// Zoomable
		var label3 = document.createElement("span");
		label3.appendChild(document.createTextNode("Zoomable: "));
		configDiv.appendChild(label3);
		var input31 = document.createElement("input");
		input31.type = "radio";
		input31.id = iddiv + "Configuration_Zoomable_Yes";
		input31.name = iddiv + "Configuration_Zoomable";
		if (this.zoomable == true) input31.checked = "checked";
		configDiv.appendChild(input31);
		var labelInput31 = document.createElement("label");
		//labelInput31.for = iddiv + "Configuration_Zoomable";
		labelInput31.appendChild(document.createTextNode("Yes "));
		configDiv.appendChild(labelInput31);
		var input32 = document.createElement("input");
		input32.type = "radio";
		input32.id = iddiv + "Configuration_Zoomable_No";
		input32.name = iddiv + "Configuration_Zoomable";
		if (this.zoomable == false) input32.checked = "checked";
		configDiv.appendChild(input32);
		var labelInput32 = document.createElement("label");
		//labelInput32.for = iddiv + "Configuration_Zoomable";
		labelInput32.appendChild(document.createTextNode("No "));
		configDiv.appendChild(labelInput32);
		input31.onclick = function() {
			that.zoomable = true;
			if (that.pannable)
				that.setMouseControl({'zoomWheelEnabled': true, 'zoomBoxEnabled': true, 'zoomDbClickEnabled': true, 'panEnabled': true});
			else 
				that.setMouseControl({'zoomWheelEnabled': true, 'zoomBoxEnabled': true, 'zoomDbClickEnabled': true, 'panEnabled': false});
			that.addZoomControl();
		};
		input32.onclick = function() {
			that.zoomable = false;
			if (that.pannable)
				that.setMouseControl({'zoomWheelEnabled': false, 'zoomBoxEnabled': false, 'zoomDbClickEnabled': false, 'panEnabled': true});
			else 
				that.setMouseControl({'zoomWheelEnabled': false, 'zoomBoxEnabled': false, 'zoomDbClickEnabled': false, 'panEnabled': false});
			that.removeZoomControl();
		};
		
		configDiv.appendChild(document.createElement("br"));
		// Pannable
		var label4 = document.createElement("span");
		label4.appendChild(document.createTextNode("Pannable: "));
		configDiv.appendChild(label4);
		var input41 = document.createElement("input");
		input41.type = "radio";
		input41.id = iddiv + "Configuration_Pannable_Yes";
		input41.name = iddiv + "Configuration_Pannable";
		if (this.pannable == true) input41.checked = "checked";
		configDiv.appendChild(input41);
		var labelInput41 = document.createElement("label");
		//labelInput41.for = iddiv + "Configuration_Pannable";
		labelInput41.appendChild(document.createTextNode("Yes "));
		configDiv.appendChild(labelInput41);
		var input42 = document.createElement("input");
		input42.type = "radio";
		input42.id = iddiv + "Configuration_Pannable_No";
		input42.name = iddiv + "Configuration_Pannable";
		if (this.pannable == false) input42.checked = "checked";
		configDiv.appendChild(input42);
		var labelInput42 = document.createElement("label");
		//labelInput42.for = iddiv + "Configuration_Pannable";
		labelInput42.appendChild(document.createTextNode("No "));
		configDiv.appendChild(labelInput42);
		input41.onclick = function() {
			that.pannable = true;
			if (that.zoomable)
				that.setMouseControl({'zoomWheelEnabled': true, 'zoomBoxEnabled': true, 'zoomDbClickEnabled': true, 'panEnabled': true});
			else 
				that.setMouseControl({'zoomWheelEnabled': false, 'zoomBoxEnabled': false, 'zoomDbClickEnabled': false, 'panEnabled': true});
		};
		input42.onclick = function() {
			that.pannable = false;
			if (that.zoomable)
				that.setMouseControl({'zoomWheelEnabled': true, 'zoomBoxEnabled': true, 'zoomDbClickEnabled': true, 'panEnabled': false});
			else 
				that.setMouseControl({'zoomWheelEnabled': false, 'zoomBoxEnabled': false, 'zoomDbClickEnabled': false, 'panEnabled': false});
		};
		
		configDiv.appendChild(document.createElement("br"));
		// Show Scale
		var label5 = document.createElement("span");
		label5.appendChild(document.createTextNode("Show scale: "));
		configDiv.appendChild(label5);
		var input51 = document.createElement("input");
		input51.type = "radio";
		input51.id = iddiv + "Configuration_Showscale_Yes";
		input51.name = iddiv + "Configuration_Showscale";
		if (this.showscale == true) input51.checked = "checked";
		configDiv.appendChild(input51);
		var labelInput51 = document.createElement("label");
		//labelInput51.for = iddiv + "Configuration_Showscale";
		labelInput51.appendChild(document.createTextNode("Yes "));
		configDiv.appendChild(labelInput51);
		var input52 = document.createElement("input");
		input52.type = "radio";
		input52.id = iddiv + "Configuration_Showscale_No";
		input52.name = iddiv + "Configuration_Showscale";
		if (this.showscale == false) input52.checked = "checked";
		configDiv.appendChild(input52);
		var labelInput52 = document.createElement("label");
		//labelInput52.for = iddiv + "Configuration_Showscale";
		labelInput52.appendChild(document.createTextNode("No "));
		configDiv.appendChild(labelInput52);
		input51.onclick = function() {
			that.showscale = true;
			that.scaleControl = new OpenLayers.Control.Scale();
			that.olMap.addControl(that.scaleControl);
		};
		input52.onclick = function() {
			that.showscale = false;
			that.olMap.removeControl(that.scaleControl);
		};
		
		configDiv.appendChild(document.createElement("br"));
		// Show Position
		var label6 = document.createElement("span");
		label6.appendChild(document.createTextNode("Show position: "));
		configDiv.appendChild(label6);
		var input61 = document.createElement("input");
		input61.type = "radio";
		input61.id = iddiv + "Configuration_Showposition_Yes";
		input61.name = iddiv + "Configuration_Showposition";
		if (this.showposition == true) input61.checked = "checked";
		configDiv.appendChild(input61);
		var labelInput61 = document.createElement("label");
		//labelInput61.for = iddiv + "Configuration_Showposition";
		labelInput61.appendChild(document.createTextNode("Yes "));
		configDiv.appendChild(labelInput61);
		var input62 = document.createElement("input");
		input62.type = "radio";
		input62.id = iddiv + "Configuration_Showposition_No";
		input62.name = iddiv + "Configuration_Showposition";
		if (this.showposition == false) input62.checked = "checked";
		configDiv.appendChild(input62);
		var labelInput62 = document.createElement("label");
		//labelInput62.for = iddiv + "Configuration_Showposition";
		labelInput62.appendChild(document.createTextNode("No "));
		configDiv.appendChild(labelInput62);
		input61.onclick = function() {
			that.showposition = true;
			that.positionControl = new OpenLayers.Control.MousePosition();
			that.olMap.addControl(that.positionControl);
		};
		input62.onclick = function() {
			that.showposition = false;
			that.olMap.removeControl(that.positionControl);
		};
		
		configDiv.appendChild(document.createElement("br"));
		// Layers
		var label7 = document.createElement("span");
		label7.appendChild(document.createTextNode("Layers: "));
		configDiv.appendChild(label7);
		for (var i=0; i<WIND.Map.Type.length; i++) {
			var layerChoice = document.createElement("input");
			layerChoice.type = "checkbox";
			layerChoice.id = iddiv + "Configuration_Layer" + i;
			layerChoice.name = iddiv + "Configuration_Layer" + i;
			configDiv.appendChild(layerChoice);
			var layerChoiceLabel = document.createElement("label");
			//layerChoiceLabel.for = iddiv + "Configuration_Layer" + i;
			layerChoiceLabel.appendChild(document.createTextNode(WIND.Map.Type[i] + " "));
			configDiv.appendChild(layerChoiceLabel);
			if (WIND.Map.Type[i] == this.baseLayer) {
				layerChoice.checked = true;
				layerChoice.disabled = true;
			}
			layerChoice.onclick = function(e) {
				var layerName = this.id;
				var layerNum = layerName.substring(layerName.length-1, layerName.length);
				if (this.checked)
					that.addLayer(WIND.Map.Type[Number(layerNum)], false);
				else that.removeLayer(WIND.Map.Type[Number(layerNum)]);
			};
		}
		
		configDiv.appendChild(document.createElement("br"));
		// Toolbar
		var label8 = document.createElement("span");
		label8.appendChild(document.createTextNode("Toolbar: "));
		configDiv.appendChild(label8);
		var input81 = document.createElement("input");
		input81.type = "radio";
		input81.id = iddiv + "Configuration_Showtoolbar_Yes";
		input81.name = iddiv + "Configuration_Showtoolbar";
		if (this.showtoolbar == true) input81.checked = "checked";
		configDiv.appendChild(input81);
		var labelInput81 = document.createElement("label");
		//labelInput81.for = iddiv + "Configuration_Showtoolbar";
		labelInput81.appendChild(document.createTextNode("Yes "));
		configDiv.appendChild(labelInput81);
		var input82 = document.createElement("input");
		input82.type = "radio";
		input82.id = iddiv + "Configuration_Showtoolbar_No";
		input82.name = iddiv + "Configuration_Showtoolbar";
		if (this.showtoolbar == false) input82.checked = "checked";
		configDiv.appendChild(input82);
		var labelInput82 = document.createElement("label");
		//labelInput82.for = iddiv + "Configuration_Showtoolbar";
		labelInput82.appendChild(document.createTextNode("No "));
		configDiv.appendChild(labelInput82);
		input81.onclick = function() {
			that.showtoolbar = true;
			pointChoice.disabled = false;
			pointChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_point_on.png";
			lineChoice.disabled = false;
			lineChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_line_on.png";
			polygonChoice.disabled = false;
			polygonChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_polygon_on.png";
			that.addToolBarLite();
		};
		input82.onclick = function() {
			that.showtoolbar = false;
			pointChoice.disabled = true;
			pointChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_point_off.png";
			lineChoice.disabled = true;
			lineChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_line_off.png";
			polygonChoice.disabled = true;
			polygonChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_polygon_off.png";
			that.removeToolBar();
		};
		
		configDiv.appendChild(document.createElement("br"));
		
		// Elements de la barre d'outil
		var pointChoiceIcon = document.createElement("img");
		if (this.showtoolbar == true) {
			pointChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_point_on.png";
		}
		else {
			pointChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_point_off.png";
		}
		pointChoiceIcon.alt = "Point";
		pointChoiceIcon.title = "Point";
		configDiv.appendChild(pointChoiceIcon);
		var pointChoice = document.createElement("input");
		pointChoice.type = "checkbox";
		pointChoice.id = iddiv + "Configuration_Toolbar_PointChoice";
		pointChoice.name = iddiv + "Configuration_Toolbar_PointChoice";
		configDiv.appendChild(pointChoice);
		if (this.showtoolbar == false) {
			pointChoice.disabled = true;
		}
		if (this.showtoolbar == true) {
			pointChoice.disabled = false;
		}
		var that = this;
		pointChoice.onclick = function(e) {
			if (this.checked) {
				that.addDrawing2ToolBar("point");
			}
		};
		
		var lineChoiceIcon = document.createElement("img");
		if (this.showtoolbar == true) {
			lineChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_line_on.png";
		}
		else {
			lineChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_line_off.png";
		}
		lineChoiceIcon.alt = "Line";
		lineChoiceIcon.title = "Line";
		configDiv.appendChild(lineChoiceIcon);
		var lineChoice = document.createElement("input");
		lineChoice.type = "checkbox";
		lineChoice.id = iddiv + "Configuration_Toolbar_LineChoice";
		lineChoice.name = iddiv + "Configuration_Toolbar_LineChoice";
		configDiv.appendChild(lineChoice);
		if (this.showtoolbar == false) {
			lineChoice.disabled = true;
		}
		if (this.showtoolbar == true) {
			lineChoice.disabled = false;
		}
		lineChoice.onclick = function(e) {
			if (this.checked) {
				that.addDrawing2ToolBar("line");
			}
		};
			
		var polygonChoiceIcon = document.createElement("img");
		if (this.showtoolbar == true) {
			polygonChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_polygon_on.png";
		}
		else {
			polygonChoiceIcon.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windmash/css/images/draw_polygon_off.png";
		}
		polygonChoiceIcon.alt = "Polygon";
		polygonChoiceIcon.title = "Polygon";
		configDiv.appendChild(polygonChoiceIcon);
		var polygonChoice = document.createElement("input");
		polygonChoice.type = "checkbox";
		polygonChoice.id = iddiv + "Configuration_Toolbar_PolygonChoice";
		polygonChoice.name = iddiv + "Configuration_Toolbar_PolygonChoice";
		configDiv.appendChild(polygonChoice);
		if (this.showtoolbar == false) {
			polygonChoice.disabled = true;
		}
		if (this.showtoolbar == true) {
			polygonChoice.disabled = false;
		}
		polygonChoice.onclick = function(e) {
			if (this.checked) {
				that.addDrawing2ToolBar("polygon");
			}
		};
		
		/* Show Location
		var label9 = document.createElement("span");
		label9.appendChild(document.createTextNode("Show location bar: "));
		configDiv.appendChild(label9);
		var input91 = document.createElement("input");
		input91.type = "radio";
		input91.id = iddiv + "Configuration_Showlocation_Yes";
		input91.name = iddiv + "Configuration_Showlocation";
		if (this.showlocation == true) input91.checked = "checked";
		configDiv.appendChild(input91);
		var labelInput91 = document.createElement("label");
		//labelInput91.for = iddiv + "Configuration_Showlocation";
		labelInput91.appendChild(document.createTextNode("Yes "));
		configDiv.appendChild(labelInput91);
		var input92 = document.createElement("input");
		input92.type = "radio";
		input92.id = iddiv + "Configuration_Showlocation_No";
		input92.name = iddiv + "Configuration_Showlocation";
		if (this.showlocation == false) input92.checked = "checked";
		configDiv.appendChild(input92);
		var labelInput92 = document.createElement("label");
		//labelInput92.for = iddiv + "Configuration_Showlocation";
		labelInput92.appendChild(document.createTextNode("No "));
		configDiv.appendChild(labelInput92);
		input91.onclick = function() {
			that.showlocation = true;
			that.addLocationBar();
		};
		input92.onclick = function() {
			that.showlocation = false;
			that.removeLocationBar();
		};
		
		configDiv.appendChild(document.createElement("br"));
		// Show Itinerary
		var label10 = document.createElement("span");
		label10.appendChild(document.createTextNode("Show itinerary bar: "));
		configDiv.appendChild(label10);
		var input101 = document.createElement("input");
		input101.type = "radio";
		input101.id = iddiv + "Configuration_Showitinerary_Yes";
		input101.name = iddiv + "Configuration_Showitinerary";
		if (this.showitinerary == true) input101.checked = "checked";
		configDiv.appendChild(input101);
		var labelInput101 = document.createElement("label");
		//labelInput101.for = iddiv + "Configuration_Showitinerary";
		labelInput101.appendChild(document.createTextNode("Yes "));
		configDiv.appendChild(labelInput101);
		var input102 = document.createElement("input");
		input102.type = "radio";
		input102.id = iddiv + "Configuration_Showitinerary_No";
		input102.name = iddiv + "Configuration_Showitinerary";
		if (this.showitinerary == false) input102.checked = "checked";
		configDiv.appendChild(input102);
		var labelInput102 = document.createElement("label");
		//labelInput102.for = iddiv + "Configuration_Showitinerary";
		labelInput102.appendChild(document.createTextNode("No "));
		configDiv.appendChild(labelInput102);
		input101.onclick = function() {
			that.showitinerary = true;
			that.addItineraryBar();
		};
		input102.onclick = function() {
			that.showitinerary = false;
			that.removeItineraryBar();
		};
		*/
		configDiv.appendChild(document.createElement("br"));
		configDiv.appendChild(document.createElement("br"));
		/*var button1 = document.createElement("input");
		button1.type = "button";
		button1.id = iddiv + "Configuration_OK";
		button1.name = iddiv + "Configuration_OK";
		button1.value = "OK";
		configDiv.appendChild(button1);
		*/
		this.eventConfigured = new YAHOO.util.CustomEvent("eventConfigured");
		
		/*
		button1.onclick = function() {
			var nomafficheur = document.getElementById(iddiv + "Configuration_Name").value;
			if ((nomafficheur != null) && (nomafficheur != '')) {
				that.name = nomafficheur;
				nameNode.removeChild(nameNode.firstChild);
				nameNode.appendChild(document.createTextNode(that.name));
			}
			configDiv.style.display = "none";
			that.eventConfigured.fire(that);
			//zoom
			if (document.getElementById(iddiv + "Configuration_Zoomable_Yes").checked) {
				that.zoomable = true;
			}
			else if (document.getElementById(iddiv + "Configuration_Zoomable_No").checked) {
				that.zoomable = false;
			}
			
			if (document.getElementById(iddiv + "Configuration_Pannable_Yes").checked) {
				that.pannable = true;
			}
			else if (document.getElementById(iddiv + "Configuration_Pannable_No").checked) {
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
		
		var button2 = document.createElement("input");
		button2.type = "button";
		button2.id = iddiv + "Configuration_Cancel";
		button2.name = iddiv + "Configuration_Cancel";
		button2.value = "Close";
		configDiv.appendChild(button2);
		button2.onclick = function() {
			configDiv.style.display = "none";
		};
		
		if (this.removable) {
			this.eventRemoved = new YAHOO.util.CustomEvent("eventRemoved");
			
			var removeSpan = document.createElement("img");
			removeSpan.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/images/close.png";
			removeSpan.alt = "X";
			removeSpan.title = "Click to delete";
			removeSpan.style.backgroundColor = "#EFEFEF";
			removeSpan.style.cssFloat = "right";
			removeSpan.style.cursor = "pointer";
			headerDiv.appendChild(removeSpan);
			//var that = this;
			removeSpan.onclick = function(){
				if (confirm("Do you really want to delete it?")) {
					that.destroy();
					that.eventRemoved.fire(that);
				}
			};
			this.eventRemoved.subscribe(this.onRemove, this, true);
		}
		
		if (this.configurable) {
			var configureSpan = document.createElement("img");
			configureSpan.src = "http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/images/gear.png";
			configureSpan.alt = "*";
			configureSpan.title = "Click to configure";
			//configureSpan.style.backgroundColor = "#EFEFEF";
			configureSpan.style.cssFloat = "right";
			configureSpan.style.marginRight = "10px";
			configureSpan.style.cursor = "pointer";
			headerDiv.appendChild(configureSpan);
			configureSpan.onclick = function(){
				configDiv.style.display = "block";
			};
		}
		
		outerDiv.appendChild(headerDiv);
		
		if (this.draggable) {	
			var dd = new YAHOO.util.DD(iddiv + "Outer"); 
			dd.setHandleElId(iddiv + "Handle");
			this.eventDragged = new YAHOO.util.CustomEvent("eventDragged");
			dd.on('endDragEvent', function(ev) {
				this.eventDragged.fire(this);
			}, this, true);
			
			this.eventDragged.subscribe(this.onDrag, this, true);
			if (options.parentEl) {
				var region = document.getElementById(options.parentEl);
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
			}
			else {
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
		
		var dd2 = new YAHOO.util.Resize(iddiv + "Outer", {'minWidth': 160, 'minHeight':160, 'maxWidth': 1200, 'maxHeight':800});
		this.eventResized = new YAHOO.util.CustomEvent("eventResized");
		dd2.on('endResize', function(ev) {
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
	this.vectorLayer = null;
	this.annotations = [];
	this.itineraries = [];
	
	// List of interactions -- feature v1.0.5 (16/4/2009)
	this.interactionList = [];
	
	var typesupport = false;
	for (var i=0; i<WIND.Map.Type.length; i++) {
		if (this.baseLayer == WIND.Map.Type[i]) {
			typesupport = true;
			break;
		}
	}
	if (typesupport) {
		this.render();
	} 
	else {
		document.getElementById(this.container).innerHTML = "Don't support map type " + this.baseLayer;
	}
};

WIND.Map.prototype.onDrag = function() {
	this.top = document.getElementById(this.container + "Outer").offsetTop;
	this.left = document.getElementById(this.container + "Outer").offsetLeft;
};

WIND.Map.prototype.onResize = function() {
	this.width = document.getElementById(this.container + "Outer").offsetWidth;
	this.height = document.getElementById(this.container + "Outer").offsetHeight;
};
WIND.Map.prototype.onConfigure = function() {}; // to override
WIND.Map.prototype.onRemove = function() {}; // to override

/* 20/02/2010 */
WIND.Map.prototype.addAnnotation = function(annotation) {
	var valid = false;
	for (var i=0; i<annotation.annotedObjects.length; i++) {
		if (annotation.annotedObjects.type == "map") {
			valid = true;
			break;
		}
	}
	this.annotations.push(annotation);
};
WIND.Map.prototype.createAnnotation = function(type, entity, geodata, options) {
	var mappart = this.createSensiblePart(geodata, options);
	var annotation = new WIND.Annotation(type, entity, mappart);
	this.annotations.push(annotation);
	return annotation;
};
// A completer
WIND.Map.prototype.getValue = function() {
	var ll = this.olMap.getCenter().clone();
	//ll.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
	ll.transform(this.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
	var z =  this.olMap.getZoom();
	return {
		id: this.container,
		ref: this.ref,
		rdftype: "http://erozate.iutbayonne.univ-pau.fr/wind#MapComponent",
		name: this.name,
		position: {top: this.top, left: this.left},
		size: {width: this.width, height: this.height},
		style: {color: this.color, border: this.border, icon: this.icon},
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
		center: {longitude: ll.lon, latitude: ll.lat, zoom: z}
	}
};

WIND.Map.Type = ["Google Street", "Google Hybrid", "Google Satellite", "Google Terrain", "IGN Route", "IGN Satellite", "IGN Terrain"];
//, "Google Street Edit", "Google Hybrid Edit", "Google Satellite Edit"];
WIND.Map.prototype.addScaleControl = function() {
	if (this.scaleControl == null) {
		this.scaleControl = new OpenLayers.Control.Scale();
		this.olMap.addControl(this.scaleControl);
	}
};
WIND.Map.prototype.removeScaleControl = function() {
	if (this.scaleControl != null) {
		this.olMap.removeControl(this.scaleControl);
		this.scaleControl = null;
	}
};
WIND.Map.prototype.addPositionControl = function() {
	if (this.positionControl == null) {
		this.positionControl = new OpenLayers.Control.MousePosition();
		this.olMap.addControl(this.positionControl);
	}
};
WIND.Map.prototype.removePositionControl = function() {
	if (this.positionControl != null) {
		this.olMap.removeControl(this.positionControl);
		this.positionControl = null;
	}
};
WIND.Map.prototype.addMouseControl = function() {
	if (this.mouseControl == null) {
		this.mouseControl = new OpenLayers.Control.Navigation();
		this.olMap.addControl(this.mouseControl);
	}
};
WIND.Map.prototype.removeMouseControl = function() {
	if (this.mouseControl != null) {
		this.mouseControl.destroy();
	}
};
WIND.Map.prototype.setMouseControl = function(opt) {
	if (this.mouseControl != null) {
		this.mouseControl.destroy();
	}
	if (opt.zoomDbClickEnabled) {
		this.mouseControl = new OpenLayers.Control.Navigation();
		this.olMap.addControl(this.mouseControl);
	}
	else {
		this.mouseControl = new OpenLayers.Control.Navigation({'defaultDblClick': function(event) { return; }});
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
WIND.Map.prototype.addKeyboardControl = function() {
	if (this.keyboardControl == null) {
		this.keyboardControl = new OpenLayers.Control.KeyboardDefaults();
		this.olMap.addControl(this.keyboardControl);
	}
};
WIND.Map.prototype.removeKeyboardControl = function() {
	if (this.keyboardControl != null) {
		this.olMap.removeControl(this.keyboardControl);
		this.keyboardControl = null;
	}
};

WIND.Map.prototype.addZoomControl = function() {
	if (this.zoomControl == null) {
		var zodiv = document.createElement('div');
		zodiv.style.position = 'absolute';
		zodiv.style.top = '60px';
		zodiv.style.right = '10px';
		zodiv.style.zIndex = 10;
		var mm = this;
		var p1 = document.createElement('p');
		var zoomInButton = document.createElement('input');
		zoomInButton.type = 'button';
		zoomInButton.value = '+';
		zoomInButton.style.fontSize = '20px';
		zoomInButton.style.border = '#80FE80 1px solid';
		zoomInButton.style.backgroundColor = '#80FE80';
		zoomInButton.style.height = '30px';
		zoomInButton.style.width = '30px';
		zoomInButton.style.cursor = 'pointer';
		zoomInButton.onclick = function() { mm.zoomIn(); };
		p1.appendChild(zoomInButton);
		zodiv.appendChild(p1);
			
		var p2 = document.createElement('p');
		var zoomOutButton = document.createElement('input');
		zoomOutButton.type = 'button';
		zoomOutButton.value = '-';
		zoomOutButton.style.fontSize = '20px';
		zoomOutButton.style.border = '#80FE80 1px solid';
		zoomOutButton.style.backgroundColor = '#80FE80';
		zoomOutButton.style.height = '30px';
		zoomOutButton.style.width = '30px';
		zoomOutButton.style.cursor = 'pointer';
		zoomOutButton.onclick = function() { mm.zoomOut(); };
		p2.appendChild(zoomOutButton);
		zodiv.appendChild(p2);
		//document.body.appendChild(zodiv);
		document.getElementById(this.container + "Outer").appendChild(zodiv);
		this.zoomControl = zodiv;
	}
	else this.zoomControl.style.visibility = "visible";
};

WIND.Map.prototype.removeZoomControl = function() {
	//if (this.zoomControl != null) document.body.removeChild(this.zoomControl);
	if (this.zoomControl != null) 
		this.zoomControl.style.visibility = "hidden";
	//document.getElementById(this.container + "Outer").removeChild(this.zoomControl);
};
WIND.Map.prototype.zoomIn = function() {
	this.olMap.zoomIn();
};
WIND.Map.prototype.zoomOut = function() {
	this.olMap.zoomOut();
};
WIND.Map.prototype.zoomToExtent = function(mps) {
	var geometry;
	if (mps.length > 0) {
		geometry = mps[0].feature.geometry.clone();
		geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
		var bbox = geometry.getBounds(); 
		var bbox2;
		for (var i=1; i<mps.length; i++) {
			geometry = mps[i].feature.geometry.clone();
			geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
			bbox2 = geometry.getBounds(); 
			bbox.extend(bbox2); 
		}
		if ((mps.length == 1) && (geometry instanceof OpenLayers.Geometry.Point)) {
			this.olMap.setCenter(new OpenLayers.LonLat(geometry.x, geometry.y), 17);
		}
		else {
			this.olMap.zoomToExtent(bbox, false);
		}
	}
};
WIND.Map.prototype.addSwitcher = function() {
	if (this.switcher == null) {
		var swdiv = document.createElement('div');
		swdiv.style.position = 'absolute';
		swdiv.style.top = '42px';
		swdiv.style.left = '2px';
		swdiv.style.border = '#B0B0B0 1px solid';
		swdiv.style.backgroundColor = '#FFFFFF';
		swdiv.style.zIndex = 10;
		swdiv.style.display = 'none';
		swdiv.style.textAlign = 'left';
		var mm = this;
		for (var i=0; i<this.typeList.length; i++) {
			if (!this.typeList[i].startsWith("IGN")) {
				var radioObj = document.createElement("input");
				radioObj.setAttribute("type", "radio");
				if (this.baseLayer == this.typeList[i]) {radioObj.checked = true;}
				radioObj.setAttribute("name", "layerchoice");
				radioObj.setAttribute("value", this.typeList[i]);
				radioObj.onclick = function() {
					mm.changeBaseLayer(this.value);
					if (mm.ignLayersDiv) mm.ignLayersDiv.style.display = 'none';
				};
				swdiv.appendChild(radioObj);
				swdiv.appendChild(document.createTextNode(this.typeList[i]));
				swdiv.appendChild(document.createElement("br"));
			}
			else if (!this.ignLayersDiv) {
				var radioObj = document.createElement("input");
				radioObj.setAttribute("type", "radio");
				if (this.baseLayer == this.typeList[i]) {radioObj.checked = true;}
				radioObj.setAttribute("name", "layerchoice");
				radioObj.setAttribute("value", "IGN Maps");
				swdiv.appendChild(radioObj);
				swdiv.appendChild(document.createTextNode("IGN Maps"));
				swdiv.appendChild(document.createElement("br"));
				var ignDiv = document.createElement("div");
				ignDiv.style.position = 'relative';
				ignDiv.style.left = '5px';
				if (radioObj.checked) ignDiv.style.display = 'block';
				else ignDiv.style.display = 'none';
				var checkboxObj = document.createElement("input");
				checkboxObj.setAttribute("type", "checkbox");
				checkboxObj.setAttribute("value", this.typeList[i]);
				checkboxObj.checked = true;
				ignDiv.appendChild(checkboxObj);
				ignDiv.appendChild(document.createTextNode(this.typeList[i]));
				ignDiv.appendChild(document.createElement("br"));
				swdiv.appendChild(ignDiv);
				this.ignLayersDiv = ignDiv;
				radioObj.onclick = function() {
					mm.changeBaseLayer(this.value);
					mm.ignLayersDiv.style.display = 'block';
				};
				this.ignBaseLayer = this.typeList[i];
				var myLayer;
				checkboxObj.onclick = function() {
					for (var i=0; i<mm.olMap.layers.length; i++) {
						if (mm.olMap.layers[i].name == this.value) {
							myLayer = mm.olMap.layers[i];
						}
					}
					if (this.checked) myLayer.setVisibility(true);
					else myLayer.setVisibility(false);
				};
			}
			else {
				var checkboxObj = document.createElement("input");
				checkboxObj.setAttribute("type", "checkbox");
				checkboxObj.setAttribute("value", this.typeList[i]);
				checkboxObj.checked = false;
				/*if (this.typeList[i] == "IGN Route" || this.typeList[i] == "IGN Satellite")
					checkboxObj.checked = true;*/
				this.ignLayersDiv.appendChild(checkboxObj);
				this.ignLayersDiv.appendChild(document.createTextNode(this.typeList[i]));
				this.ignLayersDiv.appendChild(document.createElement("br"));
				var myLayer;
				checkboxObj.onclick = function() {
					for (var i=0; i<mm.olMap.layers.length; i++) {
						if (mm.olMap.layers[i].name == this.value) {
							myLayer = mm.olMap.layers[i];
						}
					}
					if (this.checked) myLayer.setVisibility(true);
					else myLayer.setVisibility(false);
				};
			}
		} 
		//document.body.appendChild(swdiv);
		document.getElementById(this.container + "Outer").appendChild(swdiv);
		var layerButtonDiv = document.createElement('div');
		layerButtonDiv.style.position = 'absolute';
		layerButtonDiv.style.top = '21px';
		layerButtonDiv.style.left = '2px';
		layerButtonDiv.style.border = '#B0B0B0 1px solid';
		layerButtonDiv.style.backgroundColor = '#FFFFFF';
		layerButtonDiv.style.zIndex = 10;
		var layerButton = document.createElement('input');
		layerButton.type = 'button';
		layerButton.value = 'Layers';
		layerButton.style.border = '#B0B0B0 1px solid';
		layerButton.style.backgroundColor = '#FFFFFF';
		layerButton.style.cursor = 'pointer';
		layerButton.onclick = function() {
			if (swdiv.style.display == 'none') {
				swdiv.style.display = 'block';
				layerButton.style.backgroundColor = '#B0B0B0';
				layerButton.style.color = '#FFFFFF';
			}
			else {
				swdiv.style.display = 'none';
				layerButton.style.backgroundColor = '#FFFFFF';
				layerButton.style.color = '#000000';
			}
		};
		layerButtonDiv.appendChild(layerButton);
		//document.body.appendChild(layerButtonDiv);
		document.getElementById(this.container + "Outer").appendChild(layerButtonDiv);
		this.switcher = swdiv;
		this.switcherButton = layerButtonDiv;
	}
	else {
		this.switcherButton.style.visibility = "visible";
		this.switcher.style.visibility = "visible";
	}
};
WIND.Map.prototype.removeSwitcher = function() {
	if (this.switcher != null) {
		//document.body.removeChild(this.switcherButton);
		//document.getElementById(this.container + "Outer").removeChild(this.switcherButton);
		this.switcherButton.style.visibility = "hidden";
		//document.body.removeChild(this.switcher);
		//document.getElementById(this.container + "Outer").removeChild(this.switcher);
		this.switcher.style.visibility = "hidden";
	}
};


WIND.Map.prototype.addToolBarLite = function() {
	if (this.toolbar == null) {
		var headID = document.getElementsByTagName("head")[0];        
		var cssNode = document.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = 'http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/toolbar.css';
		//cssNode.media = 'screen';
		headID.appendChild(cssNode);
		
		var tbdiv = document.createElement('div');
		tbdiv.style.position = 'absolute';
		tbdiv.style.top = '20px';
		tbdiv.style.right = '0px';
		tbdiv.className = "olControlPanel";
		tbdiv.style.zIndex = 10;
		document.getElementById(this.container + "Outer").appendChild(tbdiv);
		this.toolbardiv = tbdiv;
		//this.toolbar = new OpenLayers.Control.EditingToolbar(this.vectorLayer, {'div': this.toolbardiv});
		//, {defaultControl: mousecontrol}
		//this.olMap.addControl(this.toolbar);
	
		// Ajouter les outils de dessin ******
		//this.mousecontrol = new OpenLayers.Control.Navigation();
		this.mousecontrol = new OpenLayers.Control.Navigation({title:'Utiliser la souris pour glisser, faire un zoom sur la carte', displayClass:'olControlMouseDefaults'});
	
		this.toolbar = new OpenLayers.Control.Panel({defaultControl: this.mousecontrol, div: this.toolbardiv});
		//this.drawPoint = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Point, {title:'Dessiner un point', displayClass:'olControlDrawFeaturePoint'});
		//this.drawLine = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Path, {title:'Dessiner une ligne', displayClass:'olControlDrawFeaturePath'});
		//this.drawPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Polygon, {title:'Dessiner un polygone', displayClass:'olControlDrawFeaturePolygon'});
		
		this.toolbar.addControls([this.mousecontrol]);
		this.olMap.addControl(this.toolbar);
	}	
	
};
WIND.Map.prototype.addDrawing2ToolBar = function(tool) {
	if (tool == "point") {
		var pointStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		pointStyle.strokeColor = "#FF0000";
		pointStyle.strokeWidth = 3;
		pointStyle.fillColor = "#FECC80";
		this.drawPoint = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Point, {title:'Dessiner un point', displayClass:'olControlDrawFeaturePoint', handlerOptions: {style: pointStyle}});
		this.toolbar.addControls([this.drawPoint]);	
	}
	else if (tool == "line") {
		var lineStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		lineStyle.strokeColor = "#B26B00";
		lineStyle.strokeWidth = 3;
		lineStyle.fillColor = "#FECC80";
		this.drawLine = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Path, {title:'Dessiner une ligne', displayClass:'olControlDrawFeaturePath', handlerOptions: {style: lineStyle}});
		this.toolbar.addControls([this.drawLine]);	
	}
	else if (tool == "polygon") {
		var polyStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		polyStyle.strokeColor = "#0066B3";
		polyStyle.strokeWidth = 3;
		polyStyle.fillColor = "#FECC80";
		this.drawPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Polygon, {title:'Dessiner un polygone', displayClass:'olControlDrawFeaturePolygon', handlerOptions: {style: polyStyle}});
		this.toolbar.addControls([this.drawPolygon]);	
	}
};


WIND.Map.prototype.addToolBar = function() {
	if (this.toolbar == null) {
		var headID = document.getElementsByTagName("head")[0];        
		var cssNode = document.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = 'http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/toolbar.css';
		//cssNode.media = 'screen';
		headID.appendChild(cssNode);
		
		var tbdiv = document.createElement('div');
		tbdiv.style.position = 'absolute';
		tbdiv.style.top = '20px';
		tbdiv.style.right = '0px';
		tbdiv.className = "olControlPanel";
		tbdiv.style.zIndex = 10;
		document.getElementById(this.container + "Outer").appendChild(tbdiv);
		this.toolbardiv = tbdiv;
		//this.toolbar = new OpenLayers.Control.EditingToolbar(this.vectorLayer, {'div': this.toolbardiv});
		//, {defaultControl: mousecontrol}
		//this.olMap.addControl(this.toolbar);
	
		// Ajouter les outils de dessin ******
		//this.mousecontrol = new OpenLayers.Control.Navigation();
		this.mousecontrol = new OpenLayers.Control.Navigation({title:'Utiliser la souris pour glisser, faire un zoom sur la carte', displayClass:'olControlMouseDefaults'});
	//this.olMap.addControl(this.mouseControl);

		this.toolbar = new OpenLayers.Control.Panel({defaultControl: this.mousecontrol, div: this.toolbardiv});
		this.drawPoint = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Point, {title:'Dessiner un point', displayClass:'olControlDrawFeaturePoint'});
		this.drawLine = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Path, {title:'Dessiner une ligne', displayClass:'olControlDrawFeaturePath'});
		this.drawPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.Polygon, {title:'Dessiner un polygone', displayClass:'olControlDrawFeaturePolygon'});
		
		this.drawRegularPolygon = new OpenLayers.Control.DrawFeature(this.vectorLayer, OpenLayers.Handler.RegularPolygon, {title:'Dessiner un polygon régulier', handlerOptions: {sides: 4}, displayClass:'olControlDrawFeatureRegularPolygon'});
		var drawRegularPolygonDiv = document.createElement('div');
		//drawRegularPolygonDiv.id = this.container + "drawRegularPolygonParam";
		drawRegularPolygonDiv.style.position = 'absolute';
		drawRegularPolygonDiv.style.top = '45px';
		drawRegularPolygonDiv.style.right = '120px';
		drawRegularPolygonDiv.style.padding = '10px';
		drawRegularPolygonDiv.style.backgroundColor = "#EFEFEF";
		drawRegularPolygonDiv.style.display = "none";
		//tbdiv.className = "olControlPanel";
		drawRegularPolygonDiv.style.zIndex = 10;
		document.getElementById(this.container + "Outer").appendChild(drawRegularPolygonDiv);
		var ligne1 = document.createElement("p");
		var span1 = document.createElement("span");
		span1.innerHTML = "Number of sides: ";
		ligne1.appendChild(span1);
		var input1 = document.createElement("input");
		input1.type = "text";
		input1.id = this.container + "WIND-draw-Regular-Polygon-polysides";
		input1.value = 4;
		ligne1.appendChild(input1);
		drawRegularPolygonDiv.appendChild(ligne1);
		var ligne2 = document.createElement("p");
		var span2 = document.createElement("span");
		span2.innerHTML = "Irregularity: ";
		ligne2.appendChild(span2);
		var input2 = document.createElement("input");
		input2.type = "checkbox";
		input2.id = this.container + "WIND-draw-Regular-Polygon-irregularpoly";
		ligne2.appendChild(input2);
		drawRegularPolygonDiv.appendChild(ligne2);
		var sbutton1 = document.createElement("input");
		sbutton1.type = "button";
		sbutton1.value = "OK";
		//sbutton.id = "WIND-draw-Regular-Polygon-irregularpoly";
		drawRegularPolygonDiv.appendChild(sbutton1);
		var sbutton2 = document.createElement("input");
		sbutton2.type = "button";
		sbutton2.value = "Cancel";
		drawRegularPolygonDiv.appendChild(sbutton2);
		this.drawRegularPolygonDiv = drawRegularPolygonDiv;
		var that = this;
		sbutton1.onclick = function() {
			var sides = parseInt(document.getElementById(that.container + "WIND-draw-Regular-Polygon-polysides").value);
	        sides = Math.max(3, isNaN(sides) ? 0 : sides);
	        that.drawRegularPolygon.handler.sides = sides;
	        var irregular =  document.getElementById(that.container + "WIND-draw-Regular-Polygon-irregularpoly").checked;
			that.drawRegularPolygon.handler.irregular = irregular;
			that.drawRegularPolygonDiv.style.display = "none";
		};
		sbutton2.onclick = function() {
			that.drawRegularPolygonDiv.style.display = "none";
		};
		/*document.getElementById(this.drawRegularPolygon.div).onclick = function() {
			that.drawRegularPolygonDiv.style.display = "block";
		};*/
		this.drawRegularPolygon.events.register("activate", this, function() {
			this.drawRegularPolygonDiv.style.display = "block";
		});
		this.drawRegularPolygon.events.register("deactivate", this, function() {
			this.drawRegularPolygonDiv.style.display = "none";
		});
		
		this.createMarker = new OpenLayers.Control.InsertIcon(this.vectorLayer, {title:"Créer un marqueur", displayClass:"olControlInsertIcon"});
		var createMarkerDiv = document.createElement('div');
		//drawRegularPolygonDiv.id = this.container + "drawRegularPolygonParam";
		createMarkerDiv.style.position = 'absolute';
		createMarkerDiv.style.top = '45px';
		createMarkerDiv.style.right = '40px';
		createMarkerDiv.style.padding = '10px';
		createMarkerDiv.style.backgroundColor = "#EFEFEF";
		createMarkerDiv.style.display = "none";
		//tbdiv.className = "olControlPanel";
		createMarkerDiv.style.zIndex = 10;
		document.getElementById(this.container + "Outer").appendChild(createMarkerDiv);
		var ligne1 = document.createElement("p");
		var span1 = document.createElement("span");
		span1.innerHTML = "URL of icon: ";
		ligne1.appendChild(span1);
		var input1 = document.createElement("input");
		input1.type = "text";
		input1.size = "50";
		input1.id = this.container + "WIND-create-Marker-Url";
		input1.value = "http://thenhan.luong.free.fr/maps/markers/marker.png";
		ligne1.appendChild(input1);
		createMarkerDiv.appendChild(ligne1);
		var ligne2 = document.createElement("p");
		var span2 = document.createElement("span");
		span2.innerHTML = "Size: ";
		ligne2.appendChild(span2);
		var selectbox = document.createElement("select");
		selectbox.id = this.container + "WIND-create-Marker-Size";
		var optnTiny = document.createElement("option");
		optnTiny.text = "Tiny";
		optnTiny.value = 5;
		selectbox.options.add(optnTiny);
		var optnSmall = document.createElement("option");
		optnSmall.selected = true;
		optnSmall.text = "Small";
		optnSmall.value = 15;
		selectbox.options.add(optnSmall);
		var optnNormal = document.createElement("option");
		optnNormal.text = "Normal";
		optnNormal.value = 25;
		selectbox.options.add(optnNormal);
		var optnLarge = document.createElement("option");
		optnLarge.text = "Large";
		optnLarge.value = 35;
		selectbox.options.add(optnLarge);
		var optnHuge = document.createElement("option");
		optnHuge.text = "Huge";
		optnHuge.value = 45;
		selectbox.options.add(optnHuge);
		ligne2.appendChild(selectbox);
		createMarkerDiv.appendChild(ligne2);
		var sbutton1 = document.createElement("input");
		sbutton1.type = "button";
		sbutton1.value = "OK";
		createMarkerDiv.appendChild(sbutton1);
		var sbutton2 = document.createElement("input");
		sbutton2.type = "button";
		sbutton2.value = "Cancel";
		createMarkerDiv.appendChild(sbutton2);
		this.createMarkerDiv = createMarkerDiv;
		var that = this;
		sbutton1.onclick = function() {
			var iconurl = document.getElementById(that.container + "WIND-create-Marker-Url").value;
	        that.createMarker.iconURL = iconurl;
			var size = parseInt(document.getElementById(that.container + "WIND-create-Marker-Size").value);
			that.createMarker.size = size;
			that.createMarkerDiv.style.display = "none";
		};
		sbutton2.onclick = function() {
			that.createMarkerDiv.style.display = "none";
		};
		this.createMarker.events.register("activate", this, function() {
			this.createMarkerDiv.style.display = "block";
		});
		this.createMarker.events.register("deactivate", this, function() {
			this.createMarkerDiv.style.display = "none";
		});
		
		this.reshapeFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayer, {mode: OpenLayers.Control.ModifyFeature.RESHAPE, title:'Remodeler une figure', displayClass:'olControlReshapeFeature'});
		this.reshapeFeature.geometryTypes = ["OpenLayers.Geometry.LineString", "OpenLayers.Geometry.MultiLineString", "OpenLayers.Geometry.Polygon", "OpenLayers.Geometry.MultiPolygon"];
		this.resizeFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayer, {mode: OpenLayers.Control.ModifyFeature.RESIZE, title:'Redimensionner une figure', displayClass:'olControlResizeFeature'});
		this.resizeFeature.geometryTypes = ["OpenLayers.Geometry.LineString", "OpenLayers.Geometry.MultiLineString", "OpenLayers.Geometry.Polygon", "OpenLayers.Geometry.MultiPolygon"];
		this.dragFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayer, {mode: OpenLayers.Control.ModifyFeature.DRAG, title:'Déplacer une figure', displayClass:'olControlDragFeature'});
		this.rotateFeature = new OpenLayers.Control.ModifyFeature(this.vectorLayer, {mode: OpenLayers.Control.ModifyFeature.ROTATE, title:'Tourner une figure', displayClass:'olControlRotateFeature'});
		this.rotateFeature.geometryTypes = ["OpenLayers.Geometry.LineString", "OpenLayers.Geometry.MultiLineString", "OpenLayers.Geometry.Polygon", "OpenLayers.Geometry.MultiPolygon"];
				
		this.selectFeature = new OpenLayers.Control.SelectFeature(this.vectorLayer, {'multiple': false, title:'Sélectionner une figure pour la mettre en form', displayClass:'olControlFormatFeature',
			onSelect: function(feature) {
				//selectedFeature = feature;
				var popupDiv = document.createElement("div");
				popupDiv.style.fontSize = "12px";
				
				if ((feature.style == null) || (feature.style.externalGraphic == null)) {
					//Stroke
					var ligne1 = document.createElement("p");
					var span11 = document.createElement("span");
					span11.innerHTML = "Stroke Color: ";
					ligne1.appendChild(span11);
					var input11 = document.createElement("input");
					input11.id = that.container + "WIND-strokecolor";
					input11.type = "text";
					input11.size = 10;
					//input11.value = "dqshdkjqshdkjqshdkjqshkdj";
					ligne1.appendChild(input11);
					var span12 = document.createElement("span");
					span12.innerHTML = " Stroke Width: ";
					ligne1.appendChild(span12);
					var input12 = document.createElement("select");
					input12.id = that.container + "WIND-strokewidth";
					for (var i = 0; i<10; i++) {
						var optn = document.createElement("option");
						if (i == 2) optn.selected = true;
						else optn.selected = false;
						optn.text = i;
						optn.value = i;
						input12.options.add(optn);
					}
					ligne1.appendChild(input12);
					var span13 = document.createElement("span");
					span13.innerHTML = " Stroke Opacity: ";
					ligne1.appendChild(span13);
					var input13 = document.createElement("select");
					input13.id = that.container + "WIND-strokeopacity";
					var optn = document.createElement("option");
					optn.text = 1.0;
					optn.value = 1.0;
					input13.options.add(optn);
					for (var i = 9; i>=0; i--) {
						var optn = document.createElement("option");
						optn.text = "0." + i;
						optn.value = Number("0." + i);
						input13.options.add(optn);
					}
					ligne1.appendChild(input13);
					popupDiv.appendChild(ligne1);
			
					// Fill
					var ligne2 = document.createElement("p");
					var span21 = document.createElement("span");
					span21.innerHTML = "Fill Color: ";
					ligne2.appendChild(span21);
					var input21 = document.createElement("input");
					input21.id = that.container + "WIND-fillcolor";
					input21.type = "text";
					input21.size = 10;
					input21.value = "EE9900";
					ligne2.appendChild(input21);
					var span22 = document.createElement("span");
					span22.innerHTML = " Fill Opacity: ";
					ligne2.appendChild(span22);
					var input22 = document.createElement("select");
					input22.id = that.container + "WIND-fillopacity";
					var optn = document.createElement("option");
					optn.text = 1.0;
					optn.value = 1.0;
					input22.options.add(optn);
					for (var i = 9; i>=0; i--) {
						var optn = document.createElement("option");
						optn.text = "0." + i;
						optn.value = Number("0." + i);
						input22.options.add(optn);
					}
					ligne2.appendChild(input22);
					popupDiv.appendChild(ligne2);
					
					// Buttons
					var sbutton1 = document.createElement("input");
					sbutton1.id = that.container + "updateFeatureButton";
					sbutton1.type = "button";
					sbutton1.value = "Update";
					popupDiv.appendChild(sbutton1);
				}
				else {
					// Url
					var ligne1 = document.createElement("p");
					var span1 = document.createElement("span");
					span1.innerHTML = "URL of icon: ";
					ligne1.appendChild(span1);
					var input1 = document.createElement("input");
					input1.type = "text";
					input1.size = "50";
					input1.id = that.container + "WIND-iconurl";
					ligne1.appendChild(input1);
					popupDiv.appendChild(ligne1);
					// Size
					var ligne2 = document.createElement("p");
					var span2 = document.createElement("span");
					span2.innerHTML = "Size: ";
					ligne2.appendChild(span2);
					var selectbox = document.createElement("select");
					selectbox.id = that.container + "WIND-iconsize";
					var optnTiny = document.createElement("option");
					optnTiny.text = "Tiny";
					optnTiny.value = 5;
					selectbox.options.add(optnTiny);
					var optnSmall = document.createElement("option");
					optnSmall.text = "Small";
					optnSmall.value = 15;
					selectbox.options.add(optnSmall);
					var optnNormal = document.createElement("option");
					optnNormal.text = "Normal";
					optnNormal.value = 25;
					selectbox.options.add(optnNormal);
					var optnLarge = document.createElement("option");
					optnLarge.text = "Large";
					optnLarge.value = 35;
					selectbox.options.add(optnLarge);
					var optnHuge = document.createElement("option");
					optnHuge.text = "Huge";
					optnHuge.value = 45;
					selectbox.options.add(optnHuge);
					ligne2.appendChild(selectbox);
					popupDiv.appendChild(ligne2);
		
					// Buttons
					var sbutton1 = document.createElement("input");
					sbutton1.id = that.container + "updateFeatureButton";
					sbutton1.type = "button";
					sbutton1.value = "Update";
					popupDiv.appendChild(sbutton1);
				}
				
				that.popupDiv = popupDiv;
				
				//alert(popupDiv.innerHTML);
	            var popup = new OpenLayers.Popup.FramedCloud("mypopup", feature.geometry.getBounds().getCenterLonLat(), null, popupDiv.innerHTML, null, true, false);
				feature.popup = popup;
	            that.olMap.addPopup(popup);
				that.selectedFeature = feature;
				
				if ((feature.style == null) || (feature.style.externalGraphic == null)){
					document.getElementById(that.container + "WIND-strokecolor").value = ((feature.style != null) && (feature.style.strokeColor != null)) ? feature.style.strokeColor : "#0033CC";
					document.getElementById(that.container + "WIND-strokewidth").options[((feature.style != null) && (feature.style.strokeWidth != null)) ? feature.style.strokeWidth : 2].selected = true;
					document.getElementById(that.container + "WIND-strokeopacity").options[10 - 10 * Number(((feature.style != null) && (feature.style.strokeOpacity != null)) ? feature.style.strokeOpacity : 1)].selected = true;
					document.getElementById(that.container + "WIND-fillcolor").value = ((feature.style != null) && (feature.style.fillColor != null)) ? feature.style.fillColor : "#809FFE";
					document.getElementById(that.container + "WIND-fillopacity").options[10 - 10 * Number(((feature.style != null) && (feature.style.fillOpacity != null)) ? feature.style.fillOpacity : 0.5)].selected = true;
				}
				else {
					document.getElementById(that.container + "WIND-iconurl").value = feature.style.externalGraphic;
					document.getElementById(that.container + "WIND-iconsize").options[Math.floor((Number(feature.style.pointRadius) - 5)/10)].selected = true;
				}
				
				document.getElementById(that.container + "updateFeatureButton").onclick = function() {
					if ((feature.style == null) || (feature.style.externalGraphic == null)){
						var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
						style.strokeColor = document.getElementById(that.container + "WIND-strokecolor").value; 
						style.strokeWidth = parseInt(document.getElementById(that.container + "WIND-strokewidth").value); 
						style.strokeOpacity = parseFloat(document.getElementById(that.container + "WIND-strokeopacity").value); 
						style.fillColor = document.getElementById(that.container + "WIND-fillcolor").value; 
						style.fillOpacity = parseFloat(document.getElementById(that.container + "WIND-fillopacity").value); 
						feature.style = style;
						that.vectorLayer.drawFeature(feature);
						that.olMap.removePopup(feature.popup);
					}
					else {
						var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
						style.externalGraphic = document.getElementById(that.container + "WIND-iconurl").value; 
						var mysize = parseInt(document.getElementById(that.container + "WIND-iconsize").value);
						style.pointRadius = mysize; 
						style.graphicXOffset = - 1 * mysize;
						style.graphicYOffset = - 2* mysize; 
						style.fillOpacity = 1;
						feature.style = style;
						that.vectorLayer.drawFeature(feature);
						that.olMap.removePopup(feature.popup);
					}
				};
							
			}, 
			onUnselect: function(feature) {
				that.olMap.removePopup(feature.popup);
	            //feature.popup.destroy();
	            //feature.popup = null;
			}
		});
		
		
		this.removeFeature = new OpenLayers.Control.SelectFeature(this.vectorLayer, {'multiple': false, title:'Supprimer une figure de la carte', displayClass:'olControlRemoveFeature',
			onSelect: function(feature) {
				if (confirm("Vous voulez supprimer cette figure?")) {
					for (var i=0; i<that.parts.length; i++) {
						var geo2 = that.parts[i].feature.geometry.clone();
						geo2.transform(new OpenLayers.Projection("EPSG:4326"), that.olMap.baseLayer.projection);
						//alert(that.parts[i].feature.geometry + " ->" + geo2 + " ?? " + feature.geometry);
						if (comparerGeo(geo2, feature.geometry)) {
						//alert("toto2");
							var part1 = that.parts.slice(0,i);
							var part2 = that.parts.slice(i+1);
							that.parts = part1.concat(part2);
							that.vectorLayer.removeFeatures([feature]);
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
	this.vectorLayer.onFeatureInsert = function(feature) {
		var geo2 = feature.geometry.clone();
		//geo2.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
		geo2.transform(that.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
		if (feature.style && feature.style.externalGraphic) {
			var len = geo2.toString().length;
			if (geo2 instanceof OpenLayers.Geometry.Collection) {
				var geostring = "MULTIMARKER(" + geo2.toString().substring(10) + ", " + feature.style.	externalGraphic + ")";
				that.parts.push(new WIND.Map.Part(geostring));
			}
			else {
				var geostring = "MARKER(" + geo2.toString().substring(5) + ", " + feature.style.	externalGraphic + ")";
				that.parts.push(new WIND.Map.Part(geostring));
			}
		}
		else 
			that.parts.push(new WIND.Map.Part(geo2.toString()));
			
		that.onPartInsert();
	};
	
	this.modifyingPartIndex = 0; 
    this.vectorLayer.events.on({
        "beforefeaturemodified": function(event) {
			for (var i=0; i<that.parts.length; i++) {
				var geo2 = that.parts[i].feature.geometry.clone();
				geo2.transform(new OpenLayers.Projection("EPSG:4326"), that.olMap.baseLayer.projection);
				if (comparerGeo(geo2, event.feature.geometry)) {
					that.modifyingPartIndex = i;
					//alert(i);
				}
			}
		},
        //"featuremodified": report,
        "afterfeaturemodified": function(event) {
			var newgeo = event.feature.geometry.clone();
			newgeo.transform(that.olMap.baseLayer.projection, new OpenLayers.Projection("EPSG:4326"));
			//alert(that.modifyingPartIndex);
			that.parts[that.modifyingPartIndex].geoObject = newgeo.toString();
			that.parts[that.modifyingPartIndex].feature = new OpenLayers.Feature.Vector(newgeo, {}, that.parts[that.modifyingPartIndex].style);
		}
    });	
};
WIND.Map.prototype.onPartInsert = function() {};
OpenLayers.Control.InsertIcon = OpenLayers.Class(OpenLayers.Control, {      
	iconURL: "http://thenhan.luong.free.fr/maps/markers/marker.png",
	size: 15,
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(vlayer, options) {
		if (options.iconURL) this.iconURL = options.iconURL;
		if (options.size) this.size = options.size;
		this.vectorLayer = vlayer;
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
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

    trigger: function(e) {
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
WIND.Map.prototype.removeToolBar = function() {
	if (this.toolbar != null) {
		this.olMap.removeControl(this.toolbar);
		this.toolbar = null;
		document.getElementById(this.container + "Outer").removeChild(this.toolbardiv);
	}
};
WIND.Map.prototype.addLocationBar = function() {
	if (this.locationBar == null) {
		var lb = document.createElement('div');
		lb.style.position = 'absolute';
		//lb.style.top = (document.getElementById(this.container).offsetTop + document.getElementById(this.container).offsetHeight) + 'px';
		lb.style.bottom = '2px';
		lb.style.left = '2px';
		lb.style.zIndex = 10;
		var mm = this;
		var html = "<input type='text' id='lbaddress' size='10'> ";
		html += "<input type='button' id='lbsubmit' value='Search'>";
		lb.innerHTML = html;
		//document.body.appendChild(lb);
		document.getElementById(this.container + "Outer").appendChild(lb);
		document.getElementById('lbsubmit').onclick = function() {
			if (document.getElementById('lbaddress').value)	{
				var ps = WIND.Map.searchLocation(document.getElementById('lbaddress').value, false);
				for (var i=0; i<ps.length; i++)
					mm.addMarker(new WIND.Map.Marker(ps[i]));
			}
			else alert("Please entre a location!");
		};
		this.locationBar = lb;
	}
	else this.locationBar.style.visibility = "visible";
};
WIND.Map.prototype.removeLocationBar = function() {
	//if (this.locationBar != null) document.body.removeChild(this.locationBar);
	if (this.locationBar != null)
		this.locationBar.style.visibility = "hidden";
};
WIND.Map.prototype.addItineraryBar = function() {
	if (this.itineraryBar == null) {
		var ib = document.createElement('div');
		ib.style.position = 'absolute';
		ib.style.bottom = '2px';
		ib.style.right = '2px';
		ib.style.zIndex = 10;
		var mm = this;
		//var html = "<input type='text' id='ibaddress1' size='10'> <input type='text' id='ibaddress2' size='10'>";
		var html = "<input type='text' id='ibitinerary' size='20' value='from:Bayonne to:Dax to:Pau'> route<input type='checkbox' id='itimode'>";
		html += "<input type='button' id='ibsubmit' value='Itinerary'>";
		ib.innerHTML = html;
		//document.body.appendChild(ib);
		document.getElementById(this.container + "Outer").appendChild(ib);
		document.getElementById('ibsubmit').onclick = function() {
			if (document.getElementById('ibitinerary').value) {
				var iti = (document.getElementById('ibitinerary').value).split(" ");
				var places = [];
				var place = '';
				for (var i=0; i<iti.length; i++) {
					place = iti[i];
					if (place.startsWith("from:")) place = place.substring(5, place.length);
					else if (place.startsWith("from")) place = place.substring(4, place.length);
					else if (place.startsWith("to:")) place = place.substring(3, place.length);
					else if (place.startsWith("to")) place = place.substring(2, place.length);
					places.push(place);
				}
				var iti = WIND.Map.searchItinerary(places);
				if (document.getElementById('itimode').checked)
					mm.addItinerary(iti, {mode: "route", color: "blue"});
				else 
					mm.addItinerary(iti, {mode: "direct", color: "blue"});
			}
			else alert("Please entre an itinerary!");
		};
		this.itineraryBar = ib;
	}
	else this.itineraryBar.style.visibility = "visible";
};
WIND.Map.prototype.removeItineraryBar = function() {
	if (this.itineraryBar != null) 
		//document.body.removeChild(this.itineraryBar);
		this.itineraryBar.style.visibility = "hidden";
};
WIND.Map.prototype.initialize = function(){
	this.vectorLayer.destroyFeatures();
	this.annotations = [];
	this.parts = [];
};
WIND.Map.prototype.destroy = function() {
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
	
	var mapDiv = document.getElementById(this.container + "Outer");
	if (this.parentEl) {
		var newtab = [];
		for (var i=0; i<this.parentDocument.viewers.length; i++) {
			if (this.parentDocument.viewers[i].container != this.container) {
				newtab.push(this.parentDocument.viewers[i]);
			}
		}
		this.parentDocument.viewers = newtab;
		document.getElementById(this.parentEl).removeChild(mapDiv);
	}
	else document.body.removeChild(mapDiv);
};
WIND.Map.prototype.removeLayer = function(layerName) {
	var newtab = new Array();
	var removed = false;
	for (var i=0; i<this.typeList.length; i++) {
		if (this.typeList[i] == layerName) {
			removed = true;
		}
		else {
			newtab.push(this.typeList[i]);
		}
	}
	if (removed) {
		this.typeList = newtab;
		var radios = this.switcher.getElementsByTagName("input");
		for (var i=0; i<radios.length; i++) {
			if (radios[i].type == "radio" && radios[i].value == layerName) {
				var textnode = radios[i].nextSibling;
				var brnode = textnode.nextSibling;
				this.switcher.removeChild(radios[i]);
				this.switcher.removeChild(textnode);
				this.switcher.removeChild(brnode);
				break;
			}
		}
		if (layerName == this.olMap.baseLayer.name) {
			this.changeBaseLayer(this.typeList[0]);
			var radios = this.switcher.getElementsByTagName("input");
			for (var i=0; i<radios.length; i++) {
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
WIND.Map.prototype.addLayer = function(layerName, isBaseLayer) {
	var mm = this;
	this.typeList.push(layerName);
	if (this.typeList.length > 1 && this.switcher == null) this.addSwitcher();
	else if (this.switcher != null) {
		var myselect = this.switcher;
		if (!layerName.startsWith("IGN")) {
			var radioObj = document.createElement("input");
			radioObj.setAttribute("type", "radio");
			radioObj.setAttribute("name", "layerchoice");
			radioObj.setAttribute("value", layerName);
			radioObj.onclick = function() {
				mm.changeBaseLayer(this.value);
				if (mm.ignLayersDiv) mm.ignLayersDiv.style.display = 'none';
			};
			myselect.appendChild(radioObj);
			myselect.appendChild(document.createTextNode(layerName));
			myselect.appendChild(document.createElement("br"));
		}
		else if (!this.ignLayersDiv) {
			var radioObj = document.createElement("input");
			radioObj.setAttribute("type", "radio");
			radioObj.setAttribute("name", "layerchoice");
			radioObj.setAttribute("value", "IGN Maps");
			myselect.appendChild(radioObj);
			myselect.appendChild(document.createTextNode("IGN Maps"));
			myselect.appendChild(document.createElement("br"));
			var ignDiv = document.createElement("div");
			ignDiv.style.position = 'relative';
			ignDiv.style.left = '5px';
			if (radioObj.checked) ignDiv.style.display = 'block';
			else ignDiv.style.display = 'none';
			var checkboxObj = document.createElement("input");
			checkboxObj.setAttribute("type", "checkbox");
			checkboxObj.setAttribute("value", layerName);
			checkboxObj.checked = true;
			ignDiv.appendChild(checkboxObj);
			ignDiv.appendChild(document.createTextNode(layerName));
			ignDiv.appendChild(document.createElement("br"));
			myselect.appendChild(ignDiv);
			this.ignLayersDiv = ignDiv;
			radioObj.onclick = function() {
				mm.changeBaseLayer(this.value);
				mm.ignLayersDiv.style.display = 'block';
			};
			this.ignBaseLayer = layerName;
			var myLayer;
			checkboxObj.onclick = function() {
				for (var i=0; i<mm.olMap.layers.length; i++) {
					if (mm.olMap.layers[i].name == this.value) {
						myLayer = mm.olMap.layers[i];
					}
				}
				if (this.checked) myLayer.setVisibility(true);
				else myLayer.setVisibility(false);
			};
		}
		else {
			var checkboxObj = document.createElement("input");
			checkboxObj.setAttribute("type", "checkbox");
			checkboxObj.setAttribute("value", layerName);
			checkboxObj.checked = false;
			/*if (layerName == "IGN Route" || layerName == "IGN Satellite")
				checkboxObj.checked = true;*/
			this.ignLayersDiv.appendChild(checkboxObj);
			this.ignLayersDiv.appendChild(document.createTextNode(layerName));
			this.ignLayersDiv.appendChild(document.createElement("br"));
			var myLayer;
			checkboxObj.onclick = function() {
				for (var i=0; i<mm.olMap.layers.length; i++) {
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
	if (layerName == "Google Street") {
		addedLayer = new OpenLayers.Layer.Google("Google Street", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': G_NORMAL_MAP, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Google Street Edit") {
		addedLayer = new OpenLayers.Layer.Google("Google Street Edit", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': G_MAPMAKER_NORMAL_MAP, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Google Hybrid") {
		addedLayer = new OpenLayers.Layer.Google("Google Hybrid", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': G_HYBRID_MAP, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Google Hybrid Edit") {
		addedLayer = new OpenLayers.Layer.Google("Google Hybrid Edit", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': G_MAPMAKER_HYBRID_MAP, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Google Satellite") {
		addedLayer = new OpenLayers.Layer.Google("Google Satellite", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': G_SATELLITE_MAP, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Google Terrain") {
		addedLayer = new OpenLayers.Layer.Google("Google Terrain", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': G_PHYSICAL_MAP, 
			'sphericalMercator': true 
		});
	}
	// Microsoft Virtual Earth
	else if (layerName == "Virtual Earth Roads") {
		addedLayer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Roads", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': VEMapStyle.Road, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Virtual Earth Hybrid") {
		addedLayer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Hybrid", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': VEMapStyle.Hybrid, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Virtual Earth Aerial") {
		addedLayer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Aerial", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': VEMapStyle.Aerial, 
			'sphericalMercator': true 
		});
	}
	// Yahoo Maps
	else if (layerName == "Yahoo Street") {
		addedLayer = new OpenLayers.Layer.Yahoo("Yahoo Street", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			//'type': YAHOO_MAP_HYB, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Yahoo Hybrid") {
		addedLayer = new OpenLayers.Layer.Yahoo("Yahoo Hybrid", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': YAHOO_MAP_HYB, 
			'sphericalMercator': true 
		});
	}
	else if (layerName == "Yahoo Satellite") {
		addedLayer = new OpenLayers.Layer.Yahoo("Yahoo Satellite", {
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			'type': YAHOO_MAP_SAT, 
			'sphericalMercator': true 
		});
	}
	// IGN 
	else if (layerName == "IGN Route") {
		addedLayer = new Geoportal.Layer.WMSC(
			"IGN Route", 
			gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey]
				.resources['GEOGRAPHICALGRIDSYSTEMS.MAPS:WMSC'].url,
			{
				layers: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
				format:'image/jpeg',
				exceptions: 'text/xml'
			},
			{
				gridOrigin: new OpenLayers.LonLat(0,0),
				isBaseLayer: false,
				opacity: 0.7,
				resolutions: Geoportal.Catalogue.RESOLUTIONS.slice(5, 18),
				alwaysInRange: true,
				projection: ignfFXX,
				maxExtent: new OpenLayers.Bounds(-1181626.0, 3815715.0, 2340591.0, 7071932.0),
				units: ignfFXX.getUnits(),
				//GeoRM: Geoportal.GeoRMHandler.getConfig(['707797586574608501'], null,null, mm.olMap)
				GeoRM: Geoportal.GeoRMHandler.addKey(
					gGEOPORTALRIGHTSMANAGEMENT.apiKey,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.url,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.ttl,
					mm.olMap)
			}
		);
	}	
	else if (layerName == "IGN Satellite") {
		addedLayer = new Geoportal.Layer.WMSC(
			"IGN Satellite", 
			gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey]
				.resources['ORTHOIMAGERY.ORTHOPHOTOS:WMSC'].url,
			{
				layers: 'ORTHOIMAGERY.ORTHOPHOTOS',
				format:'image/jpeg',
				exceptions: 'text/xml'
			},
			{
				gridOrigin: new OpenLayers.LonLat(0,0),
				isBaseLayer: false,
				opacity: 0.5,
				resolutions: Geoportal.Catalogue.RESOLUTIONS.slice(5, 18),
				alwaysInRange: true,
				projection: ignfFXX,
				maxExtent: new OpenLayers.Bounds(-1181626.0, 3815715.0, 2340591.0, 7071932.0),
				units: ignfFXX.getUnits(),
				GeoRM: Geoportal.GeoRMHandler.addKey(
					gGEOPORTALRIGHTSMANAGEMENT.apiKey,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.url,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.ttl,
					mm.olMap)
			}
		);
		if (this.typeList.join().indexOf("IGN Route") != -1)
			addedLayer.setVisibility(false);
	}	
	/*else if (layerName == "IGN Terrain") {	
		addedLayer = new Geoportal.Layer.WMSC(
			"IGN Terrain", 
			gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey]
				.resources['ELEVATION.SLOPS:WMSC'].url,
			{
				layers: 'ELEVATION.SLOPS',
				format:'image/jpeg',
				exceptions: 'text/xml'
			},
			{
				gridOrigin: new OpenLayers.LonLat(0,0),
				isBaseLayer: false,
				opacity: 0.5,
				resolutions: Geoportal.Catalogue.RESOLUTIONS.slice(5, 18),
				alwaysInRange: true,
				projection: ignfFXX,
				maxExtent: new OpenLayers.Bounds(-1181626.0, 3815715.0, 2340591.0, 7071932.0),
				units: ignfFXX.getUnits(),
				GeoRM: Geoportal.GeoRMHandler.addKey(
					gGEOPORTALRIGHTSMANAGEMENT.apiKey,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.url,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.ttl,
					mm.olMap)
			}
		);
		addedLayer.setVisibility(false);
	}
	else if (layerName == "IGN Boundary") {
		addedLayer = new Geoportal.Layer.WMSC(
			"IGN Boundary", 
			gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey]
				.resources['ADMINISTRATIVEUNITS.BOUNDARIES:WMSC'].url,
			{
				layers: 'ADMINISTRATIVEUNITS.BOUNDARIES',
				format:'image/png',
				exceptions: 'text/xml'
			},
			{
				gridOrigin: new OpenLayers.LonLat(0,0),
				isBaseLayer: false,
				opacity: 0.7,
				resolutions: Geoportal.Catalogue.RESOLUTIONS.slice(5, 18),
				alwaysInRange: true,
				projection: ignfFXX,
				maxExtent: new OpenLayers.Bounds(-1181626.0, 3815715.0, 2340591.0, 7071932.0),
				units: ignfFXX.getUnits(),
				GeoRM: Geoportal.GeoRMHandler.addKey(
					gGEOPORTALRIGHTSMANAGEMENT.apiKey,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.url,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.ttl,
					mm.olMap)
			}
		);
		addedLayer.setVisibility(false);
	}
	else if (layerName == "IGN Hydrography") {
		addedLayer = new Geoportal.Layer.WMSC(
					"IGN Hydrography", 
			gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey]
				.resources['HYDROGRAPHY.HYDROGRAPHY:WMSC'].url,
			{
				layers: 'HYDROGRAPHY.HYDROGRAPHY',
				format:'image/png',
				exceptions: 'text/xml'
			},
			{
				gridOrigin: new OpenLayers.LonLat(0,0),
				isBaseLayer: false,
				opacity: 0.7,
				resolutions: Geoportal.Catalogue.RESOLUTIONS.slice(5, 18),
				alwaysInRange: true,
				projection: ignfFXX,
				maxExtent: new OpenLayers.Bounds(-1181626.0, 3815715.0, 2340591.0, 7071932.0),
				units: ignfFXX.getUnits(),
				GeoRM: Geoportal.GeoRMHandler.addKey(
					gGEOPORTALRIGHTSMANAGEMENT.apiKey,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.url,
					gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].tokenServer.ttl,
					mm.olMap)
			}
		);
		addedLayer.setVisibility(false);
	}*/			
	if (addedLayer.name == this.ignBaseLayer || isBaseLayer) { addedLayer.isBaseLayer = true; }
	
	// add layer to the map
	this.olMap.addLayer(addedLayer);	
	if (isBaseLayer) {
		this.olMap.baseLayer = addedLayer;
	}
	var baseLayerName = this.olMap.baseLayer.name;
	
	if (baseLayerName.indexOf("Google") != -1 || baseLayerName.indexOf("Virtual Earth") != -1 || baseLayerName.indexOf("Yahoo") != -1) {
		if (addedLayer.name.indexOf("IGN") != -1) { addedLayer.alwaysInRange = false; }
	}
};
WIND.Map.prototype.changeBaseLayer = function(newBaseLayerName) {
	if (newBaseLayerName.indexOf("Google") != -1 || newBaseLayerName.indexOf("Virtual Earth") != -1 || newBaseLayerName.indexOf("Yahoo") != -1) {
		var leng = this.olMap.layers.length;
		for (var i=0; i<leng; i++) {
			if (this.olMap.layers[i].name.indexOf("IGN") != -1) {
				this.olMap.layers[i].alwaysInRange = false;
			}
		}
	}
	if (newBaseLayerName.indexOf("IGN Maps") != -1) {
		newBaseLayerName = this.ignBaseLayer;
		var checkboxs = this.ignLayersDiv.getElementsByTagName("input");
		for (var i=0; i<checkboxs.length; i++) {
			if (checkboxs[i].type == "checkbox" && checkboxs[i].value  == this.ignBaseLayer)
				checkboxs[i].checked = true;
		}
		var leng = this.olMap.layers.length;
		for (var i=0; i<leng; i++) {
			if (this.olMap.layers[i].name.indexOf("IGN") != -1) {
				this.olMap.layers[i].alwaysInRange = true;
			}
		}
	}
	var oldBaseLayer  = null;
	var oldProjection = null;
	var oldExtent = null;
	if (this.olMap.baseLayer) {
		oldBaseLayer = this.olMap.baseLayer;
		oldProjection = this.olMap.getProjection();
		oldExtent = this.olMap.baseLayer.getExtent();
	}
	var newBaseLayer;
	for (var i=0; i<this.olMap.layers.length; i++) {
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
			if (oldProjection && oldProjection.getCode() != this.olMap.getProjection().getCode()) {
				oldExtent.transform(oldProjection, this.olMap.baseLayer.projection);
				this.olMap.zoomToExtent(oldExtent);
				// Xu ly ve do zoom cua Google
				if (oldBaseLayer.name.indexOf("IGN") != -1 && (newBaseLayerName.indexOf("Google") != -1 || newBaseLayerName.indexOf("Virtual Earth") != -1 || newBaseLayerName.indexOf("Yahoo") != -1)) {
					this.olMap.zoomIn(1);
				}
				// Traitement de la couche vecteur
				if (this.toolbar) this.parts = [];
				if (this.vectorLayer) {
					//var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
					var fea = [];
					var geo, style;
					for (var i=0; i<this.vectorLayer.features.length; i++) {
						geo = this.vectorLayer.features[i].geometry.clone();
						style = this.vectorLayer.features[i].style;
						geo.transform(oldProjection, this.olMap.baseLayer.projection);
						fea.push(new OpenLayers.Feature.Vector(geo, {}, style));
					}
					this.vectorLayer.destroyFeatures();
					this.vectorLayer.addFeatures(fea);
				}
				// ***********************
			}
			else {
				var center = this.olMap.getCenter();
				if (center != null) {
					var newCenter = (oldExtent)
						? oldExtent.getCenterLonLat()
						: center;
					newCenter.transform(oldProjection, this.olMap.getProjection());
					var newZoom = (typeof(zoom)=='number')
						? zoom
						: (oldExtent)
							? this.olMap.getZoomForExtent(oldExtent, true)
							: this.olMap.getZoomForResolution(this.olMap.resolution, true);
					this.olMap.setCenter(newCenter, newZoom, false, true);
				}
			}
		}
	}	
};

/* Add VectorLayer - 8/2/2010 */
WIND.Map.prototype.addVectorLayer = function(nb) {
	// Vector Layer
	var vlayer = new OpenLayers.Layer.Vector("Vector Layer " + nb);
	this.olMap.addLayer(vlayer);
	this.vectorLayers[nb] = vlayer;	
};
WIND.Map.prototype.addSensiblePartToLayer = function(geo, nb, options) {
	var projection, style;
	var display = true;
	if (options) {
		if (options.projection) {projection = options.projection;}
		if (options.style) {
			var decoration = options.style;
			style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
			var decors = decoration.split(",");
			var decor;
			for (var i=0; i<decors.length; i++) {
				decor = decors[i];
				if (decor.split(":")[0] == 'strokeColor') style.strokeColor = decor.split(":")[1];
				if (decor.split(":")[0] == 'strokeWidth') style.strokeWidth = decor.split(":")[1];
				if (decor.split(":")[0] == 'strokeOpacity') style.strokeOpacity = decor.split(":")[1];
				if (decor.split(":")[0] == 'fillColor') style.fillColor = decor.split(":")[1];
				if (decor.split(":")[0] == 'fillOpacity') style.fillOpacity = decor.split(":")[1];	
			}
		}
		if (options.display || !options.display) {display = options.display;}
	}
	var mp = new WIND.Map.Part(geo, projection, style);
	mp.viewer = this;
	mp.vlayer = this.vectorLayers[nb];
	this.parts.push(mp);
	if (display) {
		var geometry = mp.feature.geometry.clone();
		geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
		var feature = new OpenLayers.Feature.Vector(geometry, {}, mp.feature.style);
		this.vectorLayers[nb].addFeatures([feature]);
	}
	return mp;
};

WIND.Map.prototype.addSensiblePart = function(mp, display) {
	mp.viewer = this;
	mp.vlayer = this.vectorLayer;
	this.parts.push(mp);
	if (display) {
		var geometry = mp.feature.geometry.clone();
		geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
		var feature = new OpenLayers.Feature.Vector(geometry, {}, mp.feature.style);
		this.vectorLayer.addFeatures([feature]);
	}
};

/* 8/2/2010 */

WIND.Map.prototype.render = function() {
	var lon, lat, z;
	if (this.longitude) {
		lon = this.longitude;
	}
	else {
		lon = 2.5;
	}
	if (this.latitude) {
		lat = this.latitude;
	}
	else {
		lat = 47;
	}
	if (this.zoom || this.zoom == 0) {
		z = this.zoom;
	}
	else {
		z = 4;
	}
	
	//fixIE();
	
	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
	OpenLayers.Feature.Vector.style['default'].strokeWidth = 3;
	OpenLayers.Util.onImageLoadErrorColor = "transparent";
	this.olMap = new OpenLayers.Map(this.container, { 
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
		controls : []
	});

	// zoom scale
	this.addScaleControl();
	// position of mouse
	this.addPositionControl();
	// use mouse to pan and zoom map
	if (this.zoomable == true && this.pannable == true) {
		this.setMouseControl({'zoomWheelEnabled': true, 'zoomBoxEnabled': true, 'zoomDbClickEnabled': true, 'panEnabled': true});
		this.addZoomControl();
	}
	// use keyboard to pan and zoom map
	//this.addKeyboardControl();
	
	this.addLayer(this.baseLayer, true);
			
	var ll = new OpenLayers.LonLat(lon, lat);
	ll.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
	this.olMap.setCenter(ll, z);

	
	// Vector Layer
	this.vectorLayer = new OpenLayers.Layer.Vector("Vector Layer");
	this.olMap.addLayer(this.vectorLayer);
	//this.addToolBar();	

	this.vectorLayers = [];

	// event click on map
	this.evtclick = new OpenLayers.Control.Click(this);	 
	this.olMap.addControl(this.evtclick);
	this.evtclick.activate();
	//event mouseover on map
	this.evthover = new OpenLayers.Control.Hover(this);	 
	this.olMap.addControl(this.evthover);
	this.evthover.activate();
};
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 10,
        'stopSingle': false,
        'stopDouble': false
    },
	initialize: function(m, options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
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
    trigger: function(e) {
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
			
				for (var j = 0; j<tmp.length; j++) {
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
					for (var x=0; x<that.parts.length; x++) {
						if ((evt == 'click') && pointclicked.intersects(that.parts[x].feature.geometry) || pointNearByLine(pointclicked, that.parts[x].feature.geometry) || comparerPoint(pointclicked, that.parts[x].feature.geometry)){
						//if (that.parts[x].object == evtObj.id) {
							clicked = that.parts[x];
							break;
						}
					}
					if (clicked) {
						
						var cibleViewer = cible.viewer;
						var f = cible.func;
						var cibleAnnotation = cibleViewer.annotations;
						for (var y=0; y<cibleAnnotation.length; y++) {
							if ((cibleAnnotation[y].semantics == clicked.annotation.semantics) && (cibleAnnotation[y].entity == clicked.annotation.entity)){
								if (f == "prefecture_of_town") {
									var xhr = createXHR(); 		 
									xhr.onreadystatechange = function() {  
										if (xhr.readyState == 4) {  
											if (xhr.status == 200) {
												var results = xhr.responseXML;	
												var pref = results.getElementsByTagName("geoname")[0];
												//var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture",pref.getElementsByTagName("nom_chf_l")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
												var spref;
												if (cibleViewer instanceof WIND.Map) {
													spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
												}
												else if (cibleViewer instanceof WIND.Text) {
													//Tricher
													var textDiv = document.getElementById(cibleViewer.container);
													while (textDiv.firstChild) {
														textDiv.removeChild(textDiv.firstChild);
													}
													document.getElementById(cibleViewer.container).innerHTML = "";
													cibleViewer.paragraphs = [];
														
													var p = cibleViewer.createParagraph();
													p.setContent(pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue);
													spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue,1,1,1);
												}
												var realTarget = spref.annotedObjects;
												for (var z=0; z<realTarget.length; z++) {
													realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
												}
											}	
										}  
									}; 
									xhr.open("GET", "http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/php/prefecture_of_town.php?place=" + cibleAnnotation[y].entity, false); 
									xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");  		
									xhr.send(null);
								}
								else if (f == "prefecture_of_department") {
									var xhr = createXHR(); 		 
									xhr.onreadystatechange = function() {  
										if (xhr.readyState == 4) {  
											if (xhr.status == 200) {
												var results = xhr.responseXML;	
												var pref = results.getElementsByTagName("geoname")[0];
												//var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Prefecture",pref.getElementsByTagName("nom_chf_l")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
												var spref;
												if (cibleViewer instanceof WIND.Map) {
													spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
												}
												else if (cibleViewer instanceof WIND.Text) {
													//Tricher
													var textDiv = document.getElementById(cibleViewer.container);
													while (textDiv.firstChild) {
														textDiv.removeChild(textDiv.firstChild);
													}
													document.getElementById(cibleViewer.container).innerHTML = "";
													cibleViewer.paragraphs = [];
													
													var p = cibleViewer.createParagraph();
													p.setContent(pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue);
													spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_chf_l")[0].childNodes[0].nodeValue,1,1,1);
												}
												var realTarget = spref.annotedObjects;
												for (var z=0; z<realTarget.length; z++) {
													realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
												}
											}	
										}  
									}; 
									xhr.open("GET", "http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/php/prefecture_of_department.php?place=" + cibleAnnotation[y].entity, false); 
									xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");  		
									xhr.send(null);
								}
								else if (f == "department_of_town") {
									var xhr = createXHR(); 										
									xhr.onreadystatechange = function() {  
										if (xhr.readyState == 4) {  
											if (xhr.status == 200) {
												var results = xhr.responseXML;	
												var pref = results.getElementsByTagName("geoname")[0];
												//var mpref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_dept")[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
												var spref;
												if (cibleViewer instanceof WIND.Map) {
													spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department", pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue,pref.getElementsByTagName("astext")[0].textContent,{"style":"strokeColor:#0033CC,strokeWidth:2,fillColor:#809FFE"});
												}
												else if (cibleViewer instanceof WIND.Text) {
													//Tricher
													var textDiv = document.getElementById(cibleViewer.container);
													while (textDiv.firstChild) {
														textDiv.removeChild(textDiv.firstChild);
													}
													document.getElementById(cibleViewer.container).innerHTML = "";
													cibleViewer.paragraphs = [];
													
													var p = cibleViewer.createParagraph();
													p.setContent(pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue);
													spref = cibleViewer.createAnnotation("http://geotopia.univ-pau.fr/GeotopiaService#Department",pref.getElementsByTagName("nom_dept")[0].childNodes[0].nodeValue,1,1,1);
												}
												var realTarget = spref.annotedObjects;
												for (var z=0; z<realTarget.length; z++) {
													realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
												}
											}	
										}  
									}; 
									xhr.open("GET", "http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/php/department_of_town.php?place=" + cibleAnnotation[y].entity, false); 
									xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");  		
									xhr.send(null);
								}
								else {
									var realTarget = cibleAnnotation[y].annotedObjects;
									for (var z=0; z<realTarget.length; z++) {
										realTarget[z].callFunction(tmp[j].calledFunction, tmp[j].parameters);
									}
								}
								break;
							}
						}
					}
				}
				else {
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
	initialize: function(m, options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        ); 
        this.handler = new OpenLayers.Handler.Hover(
            this, {
			'pause': this.onPause, 'move': this.onMove},
            this.handlerOptions
        );
		this.windMap = m;
    }, 
	onPause: function(e) {
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
			if ((evt == 'mouseover') && (pointclicked.intersects(geo) || pointNearByLine(pointclicked, geo) || comparerPoint(pointclicked, geo))){
				for (var j = 0; j<tmp.length; j++) {
					tmp[j].target.callFunction(tmp[j].calledFunction, tmp[j].parameters);
				}
			}
		}
    },
	onMove: function(e) {
        // if this control sent an Ajax request (e.g. GetFeatureInfo) when
        // the mouse pauses the onMove callback could be used to abort that request.
    }
});

WIND.Map.searchLocation = function(place, precision) {
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
			for (var i=0; i<geos.length; i++) {
				if (place == geos[i].getElementsByTagName('name')[0].firstChild.nodeValue) {
					var lon = geos[i].getElementsByTagName('lng')[0].firstChild.nodeValue;
					var lat = geos[i].getElementsByTagName('lat')[0].firstChild.nodeValue;
					point = new OpenLayers.Geometry.Point(lon, lat);
					break;
				}
			}
		}	
		else {
			alert("Error: " + xhr.status + " " + xhr.statusText);
		}
		return point;
	}
	else {
		var points = [];
		xhr.open("POST", "http://erozate.iutbayonne.univ-pau.fr/Nhan/windapi/php/geonames.php", false); 	
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		xhr.send("place=" + place + "&p=0");
		if (xhr.status == 200) {
			var geos = xhr.responseXML.getElementsByTagName('geoname');
			for (var i=0; i<geos.length; i++) {
				//if (place == geos[i].getElementsByTagName('name')[0].firstChild.nodeValue) {
				var lon = geos[i].getElementsByTagName('lng')[0].firstChild.nodeValue;
				var lat = geos[i].getElementsByTagName('lat')[0].firstChild.nodeValue;
				points.push(new OpenLayers.Geometry.Point(lon, lat));
				//}
			}
		}	
		else {
			alert("Error: " + xhr.status + " " + xhr.statusText);
		}
		return points;
	}
};
WIND.Map.searchItinerary = function(places) {
	if (places.length > 1) {
		var wayPoints = [];
		for (var i=0; i<places.length; i++) {
			var p = WIND.Map.searchLocation(places[i]);
			if (p != null)
				wayPoints.push(p);
		}
		return new WIND.Map.Itinerary(wayPoints);
	}
	else 
		return null;
};

WIND.Map.prototype.loadXMLFile = function(url) {
	var xhr = createXHR(); 
	xhr.open("GET", url, false); 
	//xhr.overrideMimeType("text/xml; charset=ISO-8859-1");
	xhr.send(null);
	if (xhr.status == 200) {		
		var xmldoc = xhr.responseXML;	
		var annotations = xmldoc.getElementsByTagName("Annotation"); 
		for (var i=0; i<annotations.length; i++) {
			var annoId = annotations[i].getAttribute("id");
			if (annoId) {
				var sp = [];
				// For itinerary
				var itiNodes = annotations[i].getElementsByTagName("Itinerary");
				if (itiNodes.length > 0) {
					var iti = itiNodes[0];
					var mpNodes = iti.getElementsByTagName("MapPart");
					var pointtab = [];
					for (var j=0; j<mpNodes.length; j++) {
						var mpNode = mpNodes[j];
						var pointStr = mpNode.getElementsByTagName("geolocation")[0].firstChild.nodeValue;
						var pointStrCoupe = pointStr.substring(6, pointStr.length - 1);
						var lon = pointStrCoupe.split(" ")[0];
						var lat = pointStrCoupe.split(" ")[1];
						pointtab.push(new OpenLayers.Geometry.Point(lon,lat));
					}
					var iti = new WIND.Map.Itinerary(pointtab);
					sp.push(iti);
					this.addItinerary(iti, {mode: "route", color: "blue"});
				}
				else {
					var mapparts = annotations[i].getElementsByTagName("MapPart");
					for (var j=0; j<mapparts.length; j++) {
						var geodata = mapparts[j].getElementsByTagName("geolocation")[0].textContent;
						var geoName = null;
						var geoNameNodes = mapparts[j].getElementsByTagName("geoname");
						if (geoNameNodes.length > 0 && geoNameNodes[0].firstChild) geoName = geoNameNodes[0].firstChild.nodeValue;
						var mp = this.createSensiblePart(geodata, {'geoname': geoName, 'style':"strokeColor:#0033CC,strokeWidth:3,fillColor:#FF9900"});
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
	}
	else {
		document.getElementById(this.container).innerHTML = "Error: " + url + " " + xhr.status + " " + xhr.statusText;
	}		
};
WIND.Map.prototype.loadRDFFile = function(php,url) {
	var xhr = createXHR(); 
	xhr.open("GET", php+"?rdf="+url, false); 
	xhr.send(null);
	if (xhr.status == 200) {		
		var resultat = YAHOO.lang.JSON.parse(xhr.responseText);
		if (resultat.itinerary && resultat.itinerary.length > 0) {
			var mpNodes = resultat.itinerary;
			var pointtab = [];
			for (var j=0; j<mpNodes.length; j++) {
				var mpNode = mpNodes[j];
				var pointStr = mpNode.geolocation;
				var pointStrCoupe = pointStr.substring(6, pointStr.length - 1);
				var lon = pointStrCoupe.split(" ")[0];
				var lat = pointStrCoupe.split(" ")[1];
				pointtab.push(new OpenLayers.Geometry.Point(lon,lat));
			}
			var iti = new WIND.Map.Itinerary(pointtab);
			//sp.push(iti);
			this.addItinerary(iti, {mode: "route", color: "blue"});
		} 
		else {
			var res = resultat.annotations;
			for (var i=0; i<res.length; i++) {
				var spat = res[i].spatialInfo;
				for (var j=0; j<spat.length; j++) {
					var mp = this.createSensiblePart(spat[j].geolocation, {'geoname': spat[j].geoname, 'style':"strokeColor:#0033CC,strokeWidth:3,fillColor:#FF9900,fillOpacity:0.3"});
					var annot = new WIND.Annotation(spat[j].geotype, spat[j].geoname, [mp]);
					this.annotations.push(annot);
				}
			}
			this.zoomToExtent(this.parts);	
		}
	}	
	else {
		document.getElementById(this.container).innerHTML = "Error: " + url + " " + xhr.status + " " + xhr.statusText;
	}		
};
WIND.Map.prototype.createSensiblePart = function(geo, options) {
	var projection, geoname;
	var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
	var display = true;
	if (options) {
		if (options.projection) {projection = options.projection;}
		if (options.style) {
			var decoration = options.style;
			var decors = decoration.split(",");
			var decor;
			for (var i=0; i<decors.length; i++) {
				decor = decors[i];
				if (decor.split(":")[0] == 'strokeColor') style.strokeColor = decor.split(":")[1];
				if (decor.split(":")[0] == 'strokeWidth') style.strokeWidth = decor.split(":")[1];
				if (decor.split(":")[0] == 'strokeOpacity') style.strokeOpacity = decor.split(":")[1];
				if (decor.split(":")[0] == 'fillColor') style.fillColor = decor.split(":")[1];
				if (decor.split(":")[0] == 'fillOpacity') style.fillOpacity = decor.split(":")[1];	
			}
		}
		if (options.display) {display = options.display;}
		if (options.geoname) {geoname = options.geoname;}
	}
	var mp = new WIND.Map.Part(geo, projection, style);
	mp.geoname = geoname;
	mp.viewer = this;
	mp.vlayer = this.vectorLayer;
	mp.object = this.container + "_mappart" + (this.parts.length + 1);
	// fix 4/3/2011
	if (!this.toolbar) this.parts.push(mp);
	if (display) {
		var geometry = mp.feature.geometry.clone();
		geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
		//alert(mp.feature.geometry + "->" + geometry);
		var feature = new OpenLayers.Feature.Vector(geometry, {}, mp.feature.style);
		this.vectorLayer.addFeatures([feature]);
	}
	return mp;
};

// Map.Part class
WIND.Map.Part = function(geometry, projection, style) {
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
		for (var i=0; i<rings.length; i++) {
			ring = rings[i];
			var points = ring.split(",");
			var point;
			var pts = [];
			for (var j=0; j<points.length; j++) {
				point = points[j];
				pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
			}
			rgs.push(new OpenLayers.Geometry.LinearRing(pts));
		}
		var poly = new OpenLayers.Geometry.Polygon(rgs);
		if (projection) poly.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
		this.feature = new OpenLayers.Feature.Vector(poly, {}, mystyle);
	}
	if (geometry.startsWith("MULTIPOLYGON")) {
		var polys = geometry.substring(15, geometry.length - 3).split(")),((");
		var poly;
		var polygones = [];
		for (var i=0; i<polys.length; i++) {
			poly = polys[i];
			var rings = poly.split("),(");
			var ring;
			var rgs = [];
			for (var j=0; j<rings.length; j++) {
				ring = rings[j];
				var points = ring.split(",");
				var point;
				var pts = [];
				for (var k=0; k<points.length; k++) {
					point = points[k];
					pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
				}
				rgs.push(new OpenLayers.Geometry.LinearRing(pts));
			}
			var polygone = new OpenLayers.Geometry.Polygon(rgs);
			polygones.push(polygone);
		}
		var multipolygon = new OpenLayers.Geometry.MultiPolygon(polygones);
		if (projection) multipolygon.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
		this.feature = new OpenLayers.Feature.Vector(multipolygon, {}, mystyle);
	}
	else if (geometry.startsWith("LINESTRING")) {
		var points = geometry.substring(11, geometry.length - 1).split(",");
		var point;
		var pts = [];
		for (var i=0; i<points.length; i++) {
			point = points[i];
			pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
		}
		var line = new OpenLayers.Geometry.LineString(pts);
		if (projection) line.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
		this.feature = new OpenLayers.Feature.Vector(line, {}, mystyle);
	}
	else if (geometry.startsWith("MULTILINESTRING")) {
		var lines = geometry.substring(17, geometry.length - 2).split("),(");
		var line;
		var lignes = [];
		for (var i=0; i<lines.length; i++) {
			line = lines[i];
			var points = line.split(",");
			var point;
			var pts = [];
			for (var j=0; j<points.length; j++) {
				point = points[j];
				pts.push(new OpenLayers.Geometry.Point(point.split(" ")[0], point.split(" ")[1]));
			}
			var ligne = new OpenLayers.Geometry.LineString(pts);
			lignes.push(ligne);
		}
		var multiline = new OpenLayers.Geometry.MultiLineString(lignes);
		if (projection) multiline.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
		this.feature = new OpenLayers.Feature.Vector(multiline, {}, mystyle);
	}
	else if (geometry.startsWith("POINT")) {
		var pt = geometry.substring(6, geometry.length - 1).split(" ");
		var point = new OpenLayers.Geometry.Point(pt[0], pt[1]);
		if (projection) point.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
		this.feature = new OpenLayers.Feature.Vector(point, {}, mystyle);
	}
	else if (geometry.startsWith("MULTIPOINT")) {
		var points = geometry.substring(11, geometry.length - 1).split(",");
		var pt, point;
		var pts = [];
		for (var i=0; i<points.length; i++) {
			point = points[i];
			pt = point.substring(1, point.length - 1).split(" ");
			pts.push(new OpenLayers.Geometry.Point(pt[0], pt[1]));
		}
		var multipoint = new OpenLayers.Geometry.MultiPoint(pts);
		if (projection) multipoint.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
		this.feature = new OpenLayers.Feature.Vector(multipoint, {}, mystyle);
	}
	else if (geometry.startsWith("MULTIMARKER")) {
		var tk = geometry.substring(13, geometry.length - 1).split("), ");
		var points = tk[0].split(",");
		var pt, point;
		var pts = [];
		for (var i=0; i<points.length; i++) {
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
	}
	else if (geometry.startsWith("MARKER")) {
		var tk = geometry.substring(7, geometry.length - 1).split(",");
		var pt = tk[0].substring(1, tk[0].length - 1).split(" ");
		var point = new OpenLayers.Geometry.Point(pt[0], pt[1]);
		if (projection) point.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection("EPSG:4326"));
		mystyle.externalGraphic = tk[1];
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

WIND.Map.Part.prototype.show = function() {
	var geometry = this.feature.geometry.clone();
	geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.viewer.olMap.baseLayer.projection);
	var feature = new OpenLayers.Feature.Vector(geometry, {}, this.feature.style);
	this.vlayer.addFeatures([feature]);
};
WIND.Map.Part.prototype.hide = function() {
	var geometry = this.feature.geometry.clone();
	geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.viewer.olMap.baseLayer.projection);
	for (var i=0; i<this.vlayer.features.length; i++) {
		if (comparerGeo(this.vlayer.features[i].geometry, geometry)) {
			this.vlayer.removeFeatures([this.vlayer.features[i]]);
		}
	}	
};
WIND.Map.Part.prototype.zoomTo = function() {
	var geometry = this.feature.geometry.clone();
	geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.viewer.olMap.baseLayer.projection);
	if (geometry instanceof OpenLayers.Geometry.Point) {
		this.viewer.olMap.setCenter(new OpenLayers.LonLat(geometry.x, geometry.y), 15);
	}
	else {
		var zoomLevel = Math.min(this.viewer.olMap.getZoomForExtent(geometry.getBounds()), 15);
		var center = geometry.getBounds().getCenterLonLat();
		this.viewer.olMap.setCenter(center, zoomLevel);
		//this.viewer.olMap.zoomToExtent(geometry.getBounds());
	}
};
WIND.Map.Part.prototype.zoomWith = function(mp) {
	var geometry1 = this.feature.geometry.clone();
	var geometry2 = mp.feature.geometry.clone();
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
	window.setTimeout(function(){that.vlayer.removeFeatures([feature]);}, 3000);
};
WIND.Map.Part.prototype.highlight = function() {
	var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
	style.strokeColor = 'green';
	style.strokeWidth = 3;
	style.fillColor = 'blue'; 
	var geometry = this.feature.geometry.clone();
	geometry.transform(new OpenLayers.Projection("EPSG:4326"), this.viewer.olMap.baseLayer.projection);
	for (var i=0; i<this.vlayer.features.length; i++) {
		if (comparerGeo(this.vlayer.features[i].geometry, geometry)) {
			this.vlayer.removeFeatures([this.vlayer.features[i]]);
			break;
		}
	}
	var feature = new OpenLayers.Feature.Vector(geometry, {}, style);
	this.vlayer.addFeatures([feature]);
	//this.feature = feature;
	this.feature.sytle = style;
};
WIND.Map.Part.prototype.setFeatureStyle = function(styleString) {
	var decors = styleString.split(",");
	var decor;
	for (var i=0; i<decors.length; i++) {
		decor = decors[i];
		if (decor.split(":")[0] == 'strokeColor') this.feature.style.strokeColor = decor.split(":")[1];
		if (decor.split(":")[0] == 'strokeWidth') this.feature.style.strokeWidth = decor.split(":")[1];
		if (decor.split(":")[0] == 'strokeOpacity') this.feature.style.strokeOpacity = decor.split(":")[1];
		if (decor.split(":")[0] == 'fillColor') this.feature.style.fillColor = decor.split(":")[1];
		if (decor.split(":")[0] == 'fillOpacity') this.feature.style.fillOpacity = decor.split(":")[1];	
		if (decor.split(":")[0] == 'icon') {
			this.feature.style.externalGraphic = decor.split(":")[1],                    
			this.feature.style.pointRadius = 15,
			this.feature.style.graphicXOffset = -15,
			this.feature.style.graphicYOffset = -30
		}
	}
	this.show();
};


WIND.Map.Marker = function(p, i, s) {
	this.point = p;
	var scriptLocation = WIND.getScriptLocation();
	if (scriptLocation != 0 && !scriptLocation.endsWith("/")) {
		scriptLocation += "/";
	}
	if (i) this.icon = i;
	else this.icon = scriptLocation + "images/blue.png";
	if (s) this.size = s;
	else this.size = 15;
};
WIND.Map.prototype.addMarker = function(marker) {
	var point = marker.point.clone();
	var iconUrl = marker.icon;
	var size = marker.size;
	point.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
	// Corriger le bug de Marker
	var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
	style.externalGraphic = iconUrl;
	style.pointRadius = size;
	style.graphicXOffset = - size;
	style.graphicYOffset = - 2*size;
	style.fillOpacity = 1;
	var feature = new OpenLayers.Feature.Vector(point, {}, style);
	this.vectorLayer.addFeatures([feature]);
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
WIND.Map.Itinerary = function(wps) {
	this.wayPoints = wps;
	this.start = this.wayPoints[0];
	this.end = this.wayPoints[this.wayPoints.length - 1];
};
WIND.Map.prototype.addItinerary = function(iti, options) {
	var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
	style.strokeWidth = 2;
	var mode = "direct";
	var travel = G_TRAVEL_MODE_DRIVING;
	var avoid = false;
	var wps = iti.wayPoints;
	var icons = [];
	var scriptLocation = WIND.getScriptLocation();
	if (scriptLocation != 0 && !scriptLocation.endsWith("/")) {
		scriptLocation += "/";
	}
	icons.push(scriptLocation + "images/depart.png");
	if (wps.length > 2) {
		for (var i=1; i<wps.length - 1; i++) {
			icons.push(scriptLocation + "images/relais.png");
		}
	}
	icons.push(scriptLocation + "images/arrivee.png");
	if (options) {
		if (options.mode) mode = options.mode;
		if (options.travelMode) travel = options.travelMode;
		if (options.avoidHighways) avoid = options.avoidHighways;
		if (options.color) style.strokeColor = options.color;
		if (options.icons) icons = options.icons;
	}
	
	if (mode == "route") {
		var gwps = [];
		for (var i=0; i<wps.length; i++) {
			gwps.push(new GLatLng(wps[i].y, wps[i].x));
		}
		// For GDirections
		var gdir = new GDirections();
		var mm = this;
		GEvent.addListener(gdir, "load", 
			function () { 
				var route = gdir.getPolyline();
				if (route) {
					var leng = Math.round(route.getLength()/1000);
					var diems = [];
					for (var i=0; i<route.getVertexCount(); i++) {
						var pt = new OpenLayers.Geometry.Point(route.getVertex(i).lng(), route.getVertex(i).lat());
						diems.push(pt);
					}
					var poly = new OpenLayers.Geometry.LineString(diems);
					poly.transform(new OpenLayers.Projection('EPSG:4326'), mm.olMap.baseLayer.projection);
					var feature = new OpenLayers.Feature.Vector(poly, {}, style);
					mm.vectorLayer.addFeatures([feature]);
				}
			}
		);
		GEvent.addListener(gdir, "error", 
			function() {
				if (gdir.getStatus().code == G_GEO_BAD_REQUEST)
					alert("A directions request could not be successfully parsed.\n Error code: " + gdir.getStatus().code);
				else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)
					alert("A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.\n Error code: " + gdir.getStatus().code);
				else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)
					alert("The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.\n Error code: " + gdir.getStatus().code);
				else if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
					alert("No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect.\nError code: " + gdir.getStatus().code);
				else if (gdir.getStatus().code == G_GEO_UNAVAILABLE_ADDRESS) 
					alert("The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons.\n Error code: " + gdir.getStatus().code);
				else if (gdir.getStatus().code == G_GEO_UNKNOWN_DIRECTIONS) 
					alert("The GDirections object could not compute directions between the points mentioned in the query. This is usually because there is no route available between the two points, or because we do not have data for routing in that region.\n Error code: " + gdir.getStatus().code);
				else if (gdir.getStatus().code == G_GEO_BAD_KEY)
					alert("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + gdir.getStatus().code);
				else if (gdir.getStatus().code == G_GEO_TOO_MANY_QUERIES)
					alert("The given key has gone over the requests limit in the 24 hour period or has submitted too many requests in too short a period of time. If you're sending multiple requests in parallel or in a tight loop, use a timer or pause in your code to make sure you don't send the requests too quickly.\n Error code: " + gdir.getStatus().code);
				else 
					alert("An unknown error occurred.");
			}
		);
		gdir.loadFromWaypoints(gwps, {local: "FR", getPolyline:true, travelMode: travel, avoidHighways: avoid});
	}
	else {
		var ligne = (new OpenLayers.Geometry.LineString(wps)).clone();
		ligne.transform(new OpenLayers.Projection("EPSG:4326"), this.olMap.baseLayer.projection);
		var feature = new OpenLayers.Feature.Vector(ligne, {}, style);
		this.vectorLayer.addFeatures([feature]);
	}
	this.addMarker(new WIND.Map.Marker(wps[0], icons[0], 15));
	this.addMarker(new WIND.Map.Marker(wps[wps.length - 1], icons[wps.length - 1], 15));
	if (wps.length > 2) {
		for (var i=1; i<wps.length - 1; i++) {
			this.addMarker(new WIND.Map.Marker(wps[i], icons[i], 15));
		}
	}
};
comparerNumber = function(a, b) {
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
comparerGeo = function(a, b) {
	if (a instanceof OpenLayers.Geometry.Polygon) {
		if (b instanceof OpenLayers.Geometry.Polygon) {
			return comparerPolygon(a, b);
		}
		else return false;
	}
	if (a instanceof OpenLayers.Geometry.MultiPolygon) {
		if (b instanceof OpenLayers.Geometry.MultiPolygon) {
			return comparerMultiPolygon(a, b);
		}
		else return false;
	}
	else if (a instanceof OpenLayers.Geometry.LineString) {
		if (b instanceof OpenLayers.Geometry.LineString) {
			return comparerLineString(a, b);
		}
		else return false;
	}
	else if (a instanceof OpenLayers.Geometry.MultiLineString) {
		if (b instanceof OpenLayers.Geometry.MultiLineString) {
			return comparerMultiLineString(a, b);
		}
		else return false;
	}
	else if (a instanceof OpenLayers.Geometry.Point) {
		if (b instanceof OpenLayers.Geometry.Point) {
			return comparerPoint(a, b);
		}
		else return false;
	}
	else if (a instanceof OpenLayers.Geometry.MultiPoint) {
		if (b instanceof OpenLayers.Geometry.MultiPoint) {
			return comparerMultiPoint(a, b);
		}
		else return false;
	}
	else return false;
};
comparerPolygon = function(a, b) {
	var la = a.components.length;
	var lb = b.components.length;
	if (la == lb) {
		var ok = true;
		for (var i=0; i<la; i++) {
			if (comparerLineString(a.components[i], b.components[i]) == false) {
				ok = false;
				break;
			}
		}
		return ok;
	}
	else return false;
};
comparerMultiPolygon = function(a, b) {
	var la = a.components.length;
	var lb = b.components.length;
	if (la == lb) {
		var ok = true;
		for (var i=0; i<la; i++) {
			if (comparerPolygon(a.components[i], b.components[i]) == false) {
				ok = false;
				break;
			}
		}
		return ok;
	}
	else return false;
};
comparerLineString = function(a, b) {
	var la = a.components.length;
	var lb = b.components.length;
	if (la == lb) {
		var ok = true;
		for (var i=0; i<la; i++) {
			if (comparerPoint(a.components[i], b.components[i]) == false) {
				ok = false;
				break;
			}
		}
		return ok;
	}
	else return false;
};
comparerMultiLineString = function(a, b) {
	var la = a.components.length;
	var lb = b.components.length;
	if (la == lb) {
		var ok = true;
		for (var i=0; i<la; i++) {
			if (comparerLineString(a.components[i], b.components[i]) == false) {
				ok = false;
				break;
			}
		}
		return ok;
	}
	else return false;
};
comparerPoint = function(a, b) {
	if (comparerNumber(a.x, b.x) && comparerNumber(a.y, b.y))
		return true;
	else return false;
};
comparerMultiPoint = function(a, b) {
	var la = a.components.length;
	var lb = b.components.length;
	if (la == lb) {
		var ok = true;
		for (var i=0; i<la; i++) {
			if (comparerPoint(a.components[i], b.components[i]) == false) {
				ok = false;
				break;
			}
		}
		return ok;
	}
	else return false;
};
pointNearByLine = function(p, line) {
	if ((p instanceof OpenLayers.Geometry.Point) && ((line instanceof OpenLayers.Geometry.LineString) || (line instanceof OpenLayers.Geometry.MultiLineString))) {
		if (p.distanceTo(line) < 0.01) return true;
	}
	else 
		return false;
};

sortPoints = function(points) {
	var p = points[0];
	for (var i=0; i<points.length; i++) {
		if (points[i].y < p.y) p = points[i];
        else if (points[i].y == p.y && points[i].x < p.x) p = points[i];
	}
    var sorted = [];
	var pos = [];
	var neg = [];
	var infini = [];
	for (var i=0; i<points.length; i++) {
		var a = points[i].x - p.x;
        var b = points[i].y - p.y;
		if (a != 0) {
	        var cot = b/a;
	        if(cot < 0) neg.push({point:points[i], cotangent:cot});
			else pos.push({point:points[i], cotangent:cot});
		}
		else infini.push({point:points[i], dy:b});
	}
	sorted.push(p);
	sortDescending(neg, "cotangent");
	for (var i=0; i<neg.length; i++) {
		if (sorted[sorted.length - 1].x == neg[i].point.x && sorted[sorted.length - 1].y == neg[i].point.y)
			continue;
		sorted.push(neg[i].point);
	}
	sortDescending(infini, "dy");
	sorted.push(infini[0].point);
	sortDescending(pos, "cotangent");
	for (var i=0; i<pos.length; i++) {
		if (sorted[sorted.length - 1].x == pos[i].point.x && sorted[sorted.length - 1].y == pos[i].point.y)
			continue;
		sorted.push(pos[i].point);
	}
	return sorted;
};

sortDescending = function(tab, index) {
	var tmp;
	if (index == "cotangent") {
		for (var i=0; i<tab.length - 1; i++) {
			for (var j=i+1; j<tab.length; j++) {
				if (tab[i].cotangent < tab[j].cotangent) {
					tmp = tab[i];
					tab[i] = tab[j];
					tab[j] = tmp;
				}
			}
		}
	}
	if (index == "dy") {
		for (var i=0; i<tab.length - 1; i++) {
			for (var j=i+1; j<tab.length; j++) {
				if (tab[i].dy < tab[j].dy) {
					tmp = tab[i];
					tab[i] = tab[j];
					tab[j] = tmp;
				}
			}
		}
	}
};
directionFunc = function(p1, p2, p3) {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
};    
        
WIND.Map.createConvexPolygon = function (points) {
	var ordered = sortPoints(points);
	var hull = [];
    hull.push(ordered[0]); // add the pivot
    hull.push(ordered[1]); // makes first vector
    for (var i=2; i<ordered.length; i++) {
        while (directionFunc(hull[hull.length - 2], hull[hull.length - 1], ordered[i]) > 0)
            hull.pop();
        hull.push(ordered[i]);
    }
	var ring = new OpenLayers.Geometry.LinearRing(hull);
    return new OpenLayers.Geometry.Polygon([ring]);
};