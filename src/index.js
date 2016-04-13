export default class Chart {
	constructor(width, height, data) {
		this._width 	= width || 960;
		this._height 	= height || 480;
		this._data 		= data || [ 
		{ name : 'A', value: '.08167' }, 
		{ name : 'C', value: '.02536' }, 
		{ name : 'D', value: '.02157' }, 
		{ name : 'E', value: '.06954' }, 
		{ name : 'B', value: '.01492' } 
		];
	};

	/* Getter */
	get width() {
		return this._width;
	};


	get height() {
		return this._height;
	};


	get data() {
		return this._data;
	};

	/* Setter */	
	set height(newHeight){
        if(newHeight){ 
            this._height = newHeight;
        }
    };

	set width(newWidth){
        if(newWidth){ 
            this._width = newWidth;
        }
    };

	set data(newData){
        if(newData){ 
            this._data = newData;
        }
    };

	draw() {
		var margin = {top: 20, right: 20, bottom: 70, left: 40},
	    width = this.width - margin.left - margin.right,
	    height = this.height - margin.top - margin.bottom;

		var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

		var y = d3.scale.linear().range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient('bottom')

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient('left')
		    .ticks(10);

		var svg = d3.select('body').append('svg')
		    .attr('width', width + margin.left + margin.right)
		    .attr('height', height + margin.top + margin.bottom)
		  	.append('g')
		    .attr('transform', 
		          'translate(' + margin.left + ',' + margin.top + ')');

		var data = this._data;
			
	  	x.domain(data.map(function(d) { return d.name; }));
	  	y.domain([0, d3.max(data, function(d) { return d.value; })]);

	  	svg.append('g')
      		.attr('class', 'x axis')
      		.attr('transform', 'translate(0,' + height + ')')
      		.call(xAxis)
		    .selectAll('text')
      		.attr('dx', '-.8em')
      		.attr('dy', '-.55em')
	      	.attr('x', '10')
	      	.attr('y', '20')
	      	.style('text-anchor', 'end');
	      	// .attr('transform', 'rotate(-90)' );

	  	svg.append('g')
	      	.attr('class', 'y axis')
	      	.call(yAxis)
		    .append('text')
	      	// .attr('transform', 'rotate(-90)')
	      	.attr('y', -10)
	      	.attr('dy', '.71em')
	      	.style('text-anchor', 'end')
	      	.text('Value');

	  	svg.selectAll('bar')
	      	.data(data)
		    .enter().append('rect')
	      	.style('fill', 'steelblue')
	      	.attr('x', function(d) { return x(d.name); })
	      	.attr('width', x.rangeBand())
	      	.attr('y', function(d) { return y(d.value); })
	      	.attr('height', function(d) { return height - y(d.value); });

	}
}
