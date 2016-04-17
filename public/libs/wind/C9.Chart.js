'use strict';

class Chart {
	constructor(id, options) {
		var config = {
			// container
			id: "body",
			// size (width, height), margin, padding
			width: 960,
			height: 480,
			margin: {
				top: 20,
				right: 20,
				bottom: 70,
				left: 40,
			},
			padding: {
				top: 20,
				right: 20,
				bottom: 70,
				left: 40,
			},
			// interaction in chart
			enable_interaction: true,
			// mouse events
			on_mouse_over: function(),
			on_mouse_out: function(),
			on_mouse_click: function(),
			// legend
			legend_show: true,
			legend_position: "bottom",
        	legend_inset_anchor: "top-left",
        	legend_padding: 0,
        	// axis
        	axis_x_show: true,
        	axis_x_padding: {},
        	axis_y_show: true,
        	axis_y_padding: {},
        	axis_y2_show: true,
        	axis_y2_padding: {},
        	// grid
        	grid_x_show: false,
        	grid_y_show: false,
	        // tooltip - show when mouseover on each data
        	tooltip_show: true,
        	tooltip_position: undefined,
        	// title
        	title_show: true,
        	title_text: undefined,
	        title_padding: {
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0
	        },
	        title_position: 'top-center',

        	// line chart
        	point_show: true,
        	point_radius: 5,
        	point_hover_enable: true,
        	line_color: "black",
        	// bar chart
        	bar_width: undefined,
			bar_color: "steelblue",
			// pie chart
			pie_label_show: true,
			pie_radius: 100,
			pie_expand_duration: 50,
			// donut
	        donut_label_show: true,
	        donut_width: undefined,
	        donut_expand_duration: 50,
			// data
			data: [ 
				{ name : "A", value: ".08167" }, 
				{ name : "C", value: ".02536" }, 
				{ name : "D", value: ".02157" }, 
				{ name : "E", value: ".06954" }, 
				{ name : "B", value: ".01492" } 
			]
		};

		this._id 		= id 				|| id;
		this._width 	= options.width 	|| config.width;
		this._height 	= options.height 	|| config.height;
		this._margin 	= options.margin 	|| config.margin;
		this._padding 	= options.padding 	|| config.padding;
		this._data 		= options.data 		|| config.data;
	}

	/*====================== Getter ======================*/
	get id() {
		return this._id;
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get margin() {
		return this._margin;
	}

	get padding() {
		return this._padding;
	}

	get data() {
		return this._data;
	}

	/*====================== Setter ======================*/
	set id(newId){
        if(newId){ 
            this._id = newId;
        }
    }

	set width(newWidth){
        if(newWidth){ 
            this._width = newWidth;
        }
    }

	set height(newHeight){
        if(newHeight){ 
            this._height = newHeight;
        }
    }

    set margin(newMargin){
        if(newMargin){ 
            this._margin = newMargin;
        }
    }

    set padding(newPadding){
        if(newPadding){ 
            this._padding = newPadding;
        }
    }

	set data(newData){
        if(newData){ 
            this._data = newData;
        }
    }

	draw () {
		var margin = {top: 20, right: 20, bottom: 70, left: 40},
			id = this.id,
		    width = this.width - margin.left - margin.right,
		    height = this.height - margin.top - margin.bottom;

		var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

		var y = d3.scale.linear().range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(10);

		var svg = d3.select(id).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", 
		          "translate(" + margin.left + "," + margin.top + ")");

		var data = this._data;
			
		  x.domain(data.map(function(d) { return d.name; }));
		  y.domain([0, d3.max(data, function(d) { return d.value; })]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		    .selectAll("text")
		      .attr("dx", "-.8em")
		      .attr("dy", "-.55em")
		      .attr("x", "10")
		      .attr("y", "20")
		      .style("text-anchor", "end");
		      // .attr("transform", "rotate(-90)" );

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		    .append("text")
		      // .attr("transform", "rotate(-90)")
		      .attr("y", -10)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Value");

		  svg.selectAll("bar")
		      .data(data)
		    .enter().append("rect")
		      .style("fill", "steelblue")
		      .attr("x", function(d) { return x(d.name); })
		      .attr("width", x.rangeBand())
		      .attr("y", function(d) { return y(d.value); })
		      .attr("height", function(d) { return height - y(d.value); });

	}
}
