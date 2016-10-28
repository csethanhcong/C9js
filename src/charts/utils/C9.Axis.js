'use strict';
import Helper from '../../helper/C9.Helper';

export default class Axis {
    constructor(options, body, data, width, height, x, y) {
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
        
        this._xShow         = options.x.show      || config.x.show;
        this._xText         = options.x.text      || config.x.text;
        this._yShow     = options.y.show      || (body.type == "timeline" ? false : config.y.show);
        this._yText     = options.y.text      || config.y.text;
        // this._isLogaricVariant     = options.isLogaric      || config.isLogaric;
        this._xTick    = options.x.tick      || config.x.tick;
        this._yTick    = options.y.tick    || config.y.tick;
        this._xGrid     = options.x.grid      || config.x.grid;
        this._yGrid     = options.y.grid      || config.y.grid;
        this._xType     = options.x.type      || config.x.type;
        this._yType     = options.y.type      || config.y.type;
        this._x             = x;
        this._y             = y;
        
        if (body.type == "line") {
            var xDomain = x.domain(), paddingX = (x.domain()[1] - x.domain()[0]) * 0.01;
            var yDomain = y.domain(), paddingY = (y.domain()[1] - y.domain()[0]) * 0.05;
            x.domain([xDomain[0] - paddingX, xDomain[1] + paddingX]);
            y.domain([yDomain[0] - paddingY, yDomain[1] + paddingY]);
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

        if (body.type == "timeline") {

            var xScale = d3.time.scale()
                .domain([options.starting, options.ending])
                .range([0, width]);
            this._xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickFormat(this._xTick.format === undefined ? d3.time.format("%I %p") : this._xTick.format)
                // .tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize)
                .ticks(this._xTick.type, this._xTick.interval);
            delete options.starting;
            delete options.ending;

        } else {

            this._xAxis = d3.svg.axis()
                .scale(this._x)
                .orient("bottom")
                .tickPadding(this._xTick.padding)
                .ticks(this._xTick.count)
                .tickValues(this._xTick.values.length > 0 ? this._xTick.values : undefined)
                .tickFormat(this._xType == "timeseries" ? this._xTick.format || d3.time.format("%Y-%m-%d") : this._xTick.format ? this._xTick.format : undefined);

            // In LOG scale, can't specify default number of ticks
            // must be filter with tickFormat instead
            // refer: https://github.com/d3/d3/wiki/Quantitative-Scales#log_ticks
            if (this._isLogaricVariant) {
                this._yAxis = d3.svg.axis()
                    .scale(this._y)
                    .orient("left")
                    .tickPadding(this._yTick.padding)
                    .ticks(this._yTick.count, this._yType == "timeseries" ? this._yTick.format || "%Y-%m-%d" : this._yTick.format ? this._yTick.format : undefined)
                    .tickValues(this._yTick.values.length > 0 ? this._yTick.values : undefined);
            } else {
                this._yAxis = d3.svg.axis()
                    .scale(this._y)
                    .orient("left")
                    .tickPadding(this._yTick.padding)
                    .ticks(this._yTick.count)
                    .tickValues(this._yTick.values.length > 0 ? this._yTick.values : undefined)
                    .tickFormat(this._yType == "timeseries" ? this._yTick.format || d3.time.format("%Y-%m-%d") : this._yTick.format ? this._yTick.format : undefined);
            }
        }

        if (body.type != "timeline") {
            // Grid
            if (this._xGrid) {
                // Select CURRENT svg container, to make this axis outside
                // as a SEPARATED component, just like AXIS, of CHART
                // d3.select(this._svg[0][0].parentNode)
                this._xAxis.innerTickSize(-height)
                    .outerTickSize(0);
            }

            if (this._yGrid) {
                // Select CURRENT svg container, to make this axis outside
                // as a SEPARATED component, just like AXIS, of CHART
                // d3.select(this._svg[0][0].parentNode)
                this._yAxis.innerTickSize(-width)
                    .outerTickSize(0);
            }
        }

        this._body    = body;
        this._data   = data;
        this._width  = width;   // TODO : ADD Getter/setter
        this._height  = height;

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
        this._body.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height) + ")")
            .call(this._xAxis);
        //draw tick
        d3.select(".x.axis").selectAll("text")
            .style("text-anchor", textAnchor(this._xTick.rotate))
            .attr("y", textY(this._xTick.rotate))
            .attr("x", 0)
            .attr("dy", ".71em")
            .attr("dx", textDx(this._xTick.rotate))
            .attr("transform", "rotate(" + this._xTick.rotate + ")");
        //draw label
        d3.select(".x.axis")
            .append("text")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("x", width + 20)
            .attr("y", 10)
            .style("text-anchor", "start")
            .text(this._xText);

        //hide x axis
        if (!this._xShow) {
            d3.select(".x.axis>.domain").style("display", "none");
            if (!this._xGrid) d3.selectAll(".x.axis>g.tick>line").style("display", "none");
        }

        if (body.type != "timeline") {
            this._body.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(0, 0)")
                .call(this._yAxis);
            d3.select(".y.axis")
                .append("text")
                .attr("y", -10)
                .attr("dy", ".10")
                .style("text-anchor", "end")
                .text(this._yText);

            if (!this._yShow) {
                d3.select(".y.axis>.domain").style("display", "none");
                if (!this._yGrid) d3.selectAll(".y.axis>g.tick>line").style("display", "none");
            }
        }


        /**
            TODO:
            - Add y2-axis
        **/
            
    }

    update(x, y, duration) {
        if (x) {
            this._x = x;
            this._body.select('.x.axis').transition().duration(duration).call(this._xAxis);
        }
        if (y) {
            this._y = y;
            this._body.select(".y.axis").transition().duration(duration).call(this._yAxis);
        }
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get xAxis() {
        return this._xAxis;
    }

    get yAxis() {
        return this._yAxis;
    }

    get xAxisShow() {
        return this._xAxisShow;
    }

    get xAxisPadding() {
        return this._xAxisPadding;
    }

    get yAxisShow() {
        return this._yAxisShow;
    }

    get yAxisPadding() {
        return this._yAxisPadding;
    }

    get isLogaricVariant() {
        return this._isLogaricVariant;
    }

    get y2AxisShow() {
        return this._y2AxisShow;
    }

    get y2AxisPadding() {
        return this._y2AxisPadding;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set xAxis(newXAxis) {
        if (newXAxis) {
            this._xAxis = newXAxis;
        }
    }

    set yAxis(newYAxis) {
        if (newYAxis) {
            this._yAxis = newYAxis;
        }
    }

    set xAxisShow(newXAxisShow) {
        if (newXAxisShow) {
            this._xAxisShow = newXAxisShow;
        }
    }

    set xAxisPadding(newXAxisPadding) {
        if (newXAxisPadding) {
            this._xAxisPadding = newXAxisPadding;
        }
    }

    set yAxisShow(newYAxisShow) {
        if (newYAxisShow) {
            this._yAxisShow = newYAxisShow;
        }
    }

    set yAxisPadding(newYAxisPadding) {
        if (newYAxisPadding) {
            this._yAxisPadding = newYAxisPadding;
        }
    }

    set isLogaricVariant(newIsLogaricVariant) {
        if (newIsLogaricVariant) {
            this._isLogaricVariant = newIsLogaricVariant;
        }
    }

    set y2AxisShow(newY2AxisShow) {
        if (newY2AxisShow) {
            this._y2AxisShow = newY2AxisShow;
        }
    }

    set y2AxisPadding(newY2AxisPadding) {
        if (newY2AxisPadding) {
            this._y2AxisPadding = newY2AxisPadding;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /*=====  End of Main Functions  ======*/
    
}