'use strict';
import Helper from '../../helper/C9.Helper';

export default class Axis {
    constructor(options, body, data, width, height, x, y) {
        var self = this;

        var config = {
            x: {
                tick: {
                    rotate: 0,
                    count: 10,
                    size: 6,
                    padding: 3,
                    format: undefined,
                    values: [],
                    //the following use for timeline chart
                    type: d3.time.hours,
                    interval: 1
                },
                label: {
                    text: "Name",
                    position: "default"
                },
                show: false,
                grid: false,
                type: ""
            },
            y: {
                tick: {
                    rotate: 0,
                    count: 10,
                    size: 6,
                    padding: 3,
                    format: undefined,
                    values: []
                },
                label: {
                    text: "Value",
                    position: "default"
                },
                show: false,
                grid: false,
                type: ""
            }
        };
        
// <<<<<<< HEAD
        // this._xShow         = options.x.show      || config.x.show;
        // this._xText         = options.x.text      || config.x.text;
        // this._yShow     = options.y.show      || (body.type == "timeline" ? false : config.y.show);
        // this._yText     = options.y.text      || config.y.text;
        // // this._isLogaricVariant     = options.isLogaric      || config.isLogaric;
        // this._xTick    = options.x.tick      || config.x.tick;
        // this._yTick    = options.y.tick    || config.y.tick;
        // this._xGrid     = options.x.grid      || config.x.grid;
        // this._yGrid     = options.y.grid      || config.y.grid;
        // this._xType     = options.x.type      || config.x.type;
        // this._yType     = options.y.type      || config.y.type;
        // this._x             = x;
        // this._y             = y;
        
        if (body.type == "line") {
            var xDomain = x.domain(), paddingX = (x.domain()[1] - x.domain()[0]) * 0.01;
            // var yDomain = y.domain(), paddingY = (y.domain()[1] - y.domain()[0]) * 0.05;
            x.domain([xDomain[0] - paddingX, xDomain[1] + paddingX]);
            // y.domain([yDomain[0] - paddingY, yDomain[1] + paddingY]);
        }


        // x.domain(data.map(function(d) {
        //     return d.name || d[0].name;
        // }));

        // y.domain([
        //     d3.min(data, function(d) {
        //         return d.value;
        //     }), 
        //     d3.max(data, function(d) {
        //         return d.value;
        //     })
        // ]);

        // if (body.type == "timeline") {
// =======
        self._xShow = options.x.show || config.x.show;
        self._xText = options.x.text || config.x.text;
        self._xTick = options.x.tick || config.x.tick;
        self._xGrid = options.x.grid || config.x.grid;
        self._xType = options.x.type || config.x.type;

        self._yShow = options.y.show || (body.type == "timeline" ? false : config.y.show);
        self._yText = options.y.text || config.y.text;
        self._yTick = options.y.tick || config.y.tick;
        self._yGrid = options.y.grid || config.y.grid;
        self._yType = options.y.type || config.y.type;
        // self._isLogaricVariant     = options.isLogaric      || config.isLogaric;
        
        self._x = x;
        self._y = y;

        self._body    = body;
        self._data   = data;
        self._width  = width;
        self._height  = height;
        self._options = options;

        self.updateConfig();
            
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get xShow() {
        return this._xShow;
    }

    get xText() {
        return this._xText;
    }

    get xTick() {
        return this._xTick;
    }

    get xGrid() {
        return this._xGrid;
    }

    get xType() {
        return this._xType;
    }

    get yShow() {
        return this._yShow;
    }

    get yText() {
        return this._yText;
    }

    get yTick() {
        return this._yTick;
    }

    get yGrid() {
        return this._yGrid;
    }

    get yType() {
        return this._yType;
    }

    get body() {
        return this._body;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get data() {
        return this._data;
    }

    get options() {
        return this._options;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set x(arg) {
        if (arg) {
            this._x = arg;
        }
    }

    set y(arg) {
        if (arg) {
            this._y = arg;
        }
    }

    set xShow(arg) {
        if (arg) {
            this._xShow = arg;
        }
    }

    set xText(arg) {
        if (arg) {
            this._xText = arg;
        }
    }

    set xTick(arg) {
        if (arg) {
            this._xTick = arg;
        }
    }

    set xGrid(arg) {
        if (arg) {
            this._xGrid = arg;
        }
    }

    set xType(arg) {
        if (arg) {
            this._xType = arg;
        }
    }

    set yShow(arg) {
        if (arg) {
            this._yShow = arg;
        }
    }

    set yText(arg) {
        if (arg) {
            this._yText = arg;
        }
    }

    set yTick(arg) {
        if (arg) {
            this._yTick = arg;
        }
    }

    set yGrid(arg) {
        if (arg) {
            this._yGrid = arg;
        }
    }

    set yType(arg) {
        if (arg) {
            this._yType = arg;
        }
    }

    set body(arg) {
        if (arg) {
            this._body = arg;
        }
    }

    set width(arg) {
        if (arg) {
            this._width = arg;
        }
    }

    set height(arg) {
        if (arg) {
            this._height = arg;
        }
    }

    set data(arg) {
        if (arg) {
            this._data = arg;
        }
    }

    set options(arg) {
        if (arg) {
            this._options = arg;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    updateConfig() {
        var self = this;

        if (self.body.type == "timeline") {

            var xScale = d3.time.scale()
                .domain([self.options.starting, self.options.ending])
                .range([0, self.width]);
            self._xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickFormat(self._xTick.format === undefined ? d3.time.format("%I %p") : self._xTick.format)
                // .tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize)
                .ticks(self._xTick.type, self._xTick.interval);
            // delete options.starting;
            // delete options.ending;

        } else {

            self._xAxis = d3.svg.axis()
                .scale(self._x)
                .orient("bottom")
                .tickPadding(self._xTick.padding)
                .ticks(self._xTick.count)
                .tickValues(self._xTick.values.length > 0 ? self._xTick.values : undefined)
                .tickFormat(self._xType == "timeseries" ? self._xTick.format || d3.time.format("%Y-%m-%d") : self._xTick.format ? self._xTick.format : undefined);

            // In LOG scale, can't specify default number of ticks
            // must be filter with tickFormat instead
            // refer: https://github.com/d3/d3/wiki/Quantitative-Scales#log_ticks
            if (self._isLogaricVariant) {
                self._yAxis = d3.svg.axis()
                    .scale(self._y)
                    .orient("left")
                    .tickPadding(self._yTick.padding)
                    .ticks(self._yTick.count, self._yType == "timeseries" ? self._yTick.format || "%Y-%m-%d" : self._yTick.format ? self._yTick.format : undefined)
                    .tickValues(self._yTick.values.length > 0 ? self._yTick.values : undefined);
            } else {
                self._yAxis = d3.svg.axis()
                    .scale(self._y)
                    .orient("left")
                    .tickPadding(self._yTick.padding)
                    .ticks(self._yTick.count)
                    .tickValues(self._yTick.values.length > 0 ? self._yTick.values : undefined)
                    .tickFormat(self._yType == "timeseries" ? self._yTick.format || d3.time.format("%Y-%m-%d") : self._yTick.format ? self._yTick.format : undefined);
            }
        
        }

        if (self.body.type != "timeline") {
            // Grid
            if (self._xGrid) {
                // Select CURRENT svg container, to make self axis outside
                // as a SEPARATED component, just like AXIS, of CHART
                // d3.select(self._svg[0][0].parentNode)
                self._xAxis.innerTickSize(-self.height)
                    .outerTickSize(0);
            }

            if (self._yGrid) {
                // Select CURRENT svg container, to make self axis outside
                // as a SEPARATED component, just like AXIS, of CHART
                // d3.select(self._svg[0][0].parentNode)
                self._yAxis.innerTickSize(-self.width)
                    .outerTickSize(0);
            }
        }

        var textAnchor = function(angle) {
            var sin = Math.sin(angle * Math.PI / 180).toFixed(15);
            return sin == 0 ? "middle" : (sin > 0 ? "start" : "end");
        };

        var textDx = function(angle) {
            var sin = Math.sin(angle * Math.PI / 180).toFixed(15);
            return 8 * sin;
        };

        var textY = function(angle) {
            return 11.5 - 2.5 * (angle / 15) * (angle > 0 ? 1 : -1);
        };

        //draw x axis
        self._body.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (self.height) + ")")
            .call(self._xAxis);
        //draw tick
        d3.select(".x.axis").selectAll("text")
            .style("text-anchor", textAnchor(self._xTick.rotate))
            .attr("y", textY(self._xTick.rotate))
            .attr("x", 0)
            .attr("dy", ".71em")
            .attr("dx", textDx(self._xTick.rotate))
            .attr("transform", "rotate(" + self._xTick.rotate + ")");
        //draw label
        d3.select(".x.axis")
            .append("text")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("x", self.width + 20)
            .attr("y", 10)
            .style("text-anchor", "start")
            .text(self._xText);

        //hide x axis
        if (!self._xShow) {
            d3.select(".x.axis>.domain").style("display", "none");
            if (!self._xGrid) d3.selectAll(".x.axis>g.tick>line").style("display", "none");
        }

        if (self.body.type != "timeline") {
            self._body.append("g")
                .attr("class", "y axis")
                .call(self._yAxis);
            d3.select(".y.axis")
                .append("text")
                .attr("y", -10)
                .attr("dy", ".10")
                .style("text-anchor", "end")
                .text(self._yText);

            if (!self._yShow) {
                d3.select(".y.axis>.domain").style("display", "none");
                if (!self._yGrid) d3.selectAll(".y.axis>g.tick>line").style("display", "none");
            }
        }
    }

    update(x, y, duration) {
        var self = this;

        if (self.body.type == "line") {
            var xDomain = x.domain(), paddingX = (x.domain()[1] - x.domain()[0]) * 0.01;
            // var yDomain = y.domain(), paddingY = (y.domain()[1] - y.domain()[0]) * 0.05;
            x.domain([xDomain[0] - paddingX, xDomain[1] + paddingX]);
            // y.domain([yDomain[0] - paddingY, yDomain[1] + paddingY]);
        }

        if (x) {
            self._x = x;
            self._body.select('.x.axis').transition().duration(duration).call(self._xAxis);
        }
        if (y) {
            self._y = y;
            self._body.select(".y.axis").transition().duration(duration).call(self._yAxis);
        }
    }
    /*=====  End of Main Functions  ======*/
    
}