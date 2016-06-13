var Axis = require('./utils/Axis');
var Title = require('./utils/Title');

class LineChart extends Chart {
    constructor(options) {
        super(options);
        var self    = this;
        var config  = {
            point_show: false,
            point_radius: 5,
            point_hover_enable: false
        };

        self._pointShow         = options.point_show            ||  config.point_show;
        self._pointRadius       = options.point_radius          ||  config.point_radius;
        self._pointHoverEnable  = options.point_hover_enable    ||  config.point_hover_enable;
        self.svg.c9Chart = "line";

        self.initLineChart();

    }

    /*==============================
    =            Getter            =
    ==============================*/

    get pointShow() {
        return this._pointShow;
    }

    get pointRadius() {
        return this._pointRadius;
    }

    get pointHoverEnable() {
        return this._pointHoverEnable;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/

    set pointShow(newPointShow) {
        if (newPointShow) {
            this._pointShow = newPointShow;
        }
    }

    set pointRadius(newPointRadius) {
        if (newPointRadius) {
            this._pointRadius = newPointRadius;
        }
    }

    set pointHoverEnable(newPointHoverEnable) {
        if (newPointHoverEnable) {
            this._pointHoverEnable = newPointHoverEnable;
        }
    }

    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    /**
     * [First init Line Chart]
     * @return {[type]} [description]
     */
    initLineChart() {
        var dataGroup = d3.nest()
                        .key(function(d) { return d.Client; })
                        .entries(this.data);

        var width   = this.width - this.margin.left - this.margin.right;
        var height  = this.height - this.margin.top - this.margin.bottom;

        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        x.domain([d3.min(this.data, function(d) {
                    return d.year;
                }), d3.max(this.data, function(d) {
                    return d.year;
                })]);
        y.domain([d3.min(this.data, function(d) {
                    return d.sale;
                }), d3.max(this.data, function(d) {
                    return d.sale;
                })]);

        this.xAxis = d3.svg.axis()
                        .scale(x);
        this.yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left");

        var lineGen = d3.svg.line()
                        .x(function(d) { return x(d.year); })
                        .y(function(d) { return y(d.sale); });

        var _svg        = this.svg,
            _colorRange = this.colorRange;

        dataGroup.forEach(function(d,i) {
            _svg.append('path')
            .attr('d', lineGen(d.values))
            .attr('stroke', _colorRange(i))
            .attr('stroke-width', 2)
            .attr('id', 'line_'+d.key)
            .attr('fill', 'none');
        });
    }

    /**
     * [Main draw functon of Line Chart]
     * @return {[type]} [description]
     */
    draw() {

        var axis    = new Axis(this.options, this.svg, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom, this.xAxis, this.yAxis);
        var title   = new Title(this.options, this.svg, this.width, this.height, this.margin);
        
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}

// Backup - LOL
// var _currentDataY = this.data;
//         _currentDataY.forEach(function(_currentValue,_index,_arr) {
//                                     _currentDataY[_index].coordinate.sort(function(a,b) {
//                                         return (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0);
//                                     });
//                                 });
//         this.sortedDataY         = _currentDataY;

//         // Get maximum value of coordinate {x, y}
//         var tempMaxY = [];

//         for (var i=0; i<this.sortedDataY.length; i++) {
//             tempMaxY[i] = this.sortedDataY[i].coordinate[this.sortedDataY[i].coordinate.length - 1].y;
//         }

//         var _maxY = Math.max(...tempMaxY);


//         var _currentDataX = this.data;
//         _currentDataX.forEach(function(currentValue,index,arr) {
//                                     _currentDataX[index].coordinate.sort(function(a,b) {
//                                         return (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0);
//                                     });
//                                 });
//         this.sortedDataX         = _currentDataX;
//         var tempMaxX = [];
//         for (var i=0; i<this.sortedDataX.length; i++) {
//             tempMaxX[i] = this.sortedDataX[i].coordinate[this.sortedDataX[i].coordinate.length - 1].x;
//         }
//         var _maxX = Math.max(...tempMaxX);

//         // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
//         var width   = this.width - this.margin.left - this.margin.right;
//         var height  = this.height - this.margin.top - this.margin.bottom;

//         var x = d3.scale.linear().range([0, width]);
//         var y = d3.scale.linear().range([height, 0]);

//         x.domain([_maxX, 0]);
//         y.domain([_maxY, 0]);

//         var lineFunc = d3.svg.line()
//             .x(function(d, i) { return x(d.x); })
//             .y(function(d, i) { return y(d.y); })
//             .interpolate("linear");

//         // this.svg.selectAll('g')
//         //         .data(this.sortedDataX)
//         //         .enter()
//         //         .append('path')
//         //         .attr('class', 'line')
//         //         .attr('d', function(d){
//         //             return lineFunc(d.coordinate);
//         //         });
//         this.svg.selectAll('dot')
//                 .data(this.sortedDataX)
//                 .selectAll('dot')
//                 .data(function(d,i) {return d;})
//                 .enter()
//                 .append("circle")
//                 .attr("r", 3.5)
//                 .attr("cx", function(d, i) { console.log(d, i); return x(d.coordinate[i].x); })
//                 .attr("cy", function(d, i) { console.log(d, i); return y(d.coordinate[i].y); });