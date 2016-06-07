'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Axis = function () {
    function Axis(options, svg, data, width, height, xAxe, yAxe) {
        _classCallCheck(this, Axis);

        var config = {
            x_axis_show: true,
            x_axis_padding: {}, // TODO
            x_axis_text: 'Name',
            y_axis_show: true,
            y_axis_padding: {}, // TODO
            y_axis_text: 'Value',
            y2_axis_show: true,
            y2_axis_padding: {}, // TODO
            y2_axis_text: 'Value',
            grid_x_show: false,
            grid_y_show: false
        };

        this._xAxisShow = options.x_axis_show || config.x_axis_show;
        this._xAxisPadding = options.x_axis_padding || config.x_axis_padding;
        this._xAxisText = options.x_axis_text || config.x_axis_text;
        this._yAxisShow = options.y_axis_show || (svg.c9Chart == "timeline" ? false : config.y_axis_show);
        this._yAxisPadding = options.y_axis_padding || config.y_axis_padding;
        this._yAxisText = options.y_axis_text || config.y_axis_text;
        this._y2AxisShow = options.y2_axis_show || config.y2_axis_show;
        this._y2AxisPadding = options.y2_axis_padding || config.y2_axis_padding;
        this._y2AxisText = options.y2_axis_text || config.y2_axis_text;
        this._gridXShow = options.grid_x_show || config.grid_x_show;
        this._gridYShow = options.grid_y_show || config.grid_y_show;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

        var y = d3.scale.linear().range([height, 0]);

        x.domain(data.map(function (d) {
            return d.name;
        }));

        y.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        if (svg.c9Chart == "timeline") {

            var xScale = d3.time.scale().domain([options.starting, options.ending]).range([0, width]);
            this._xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(options.tickFormat === undefined ? d3.time.format("%I %p") : options.tickFormat.format).tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize).ticks(options.tickFormat === undefined ? d3.time.hours : options.tickFormat.tickTime, options.tickFormat === undefined ? 1 : options.tickFormat.tickInterval);
            delete options.starting;
            delete options.ending;

            // this._yAxis = d3.svg.axis()
            //     .scale(y)
            //     .orient("left")
            //     .ticks(10);
        } else if (svg.c9Chart == "line") {

                this._xAxis = xAxe;
                this._yAxis = yAxe;
            } else {

                this._xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);

                this._yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
            }

        // Grid
        if (this._gridXShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            // d3.select(this._svg[0][0].parentNode)
            this._xAxis.innerTickSize(-height).outerTickSize(0);
        }

        if (this._gridYShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            // d3.select(this._svg[0][0].parentNode)
            this._yAxis.innerTickSize(-width).outerTickSize(0);
        }

        this._svg = svg;
        this._data = data;
        this._width = width; // TODO : ADD Getter/setter
        this._height = height;

        if (this._xAxisShow) {
            this._svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(this._xAxis).append("text").attr("dx", "-.8em").attr("dy", "-.55em").attr("x", width).attr("y", "20").style("text-anchor", "start").text(this._xAxisText);
            // .attr("transform", "rotate(-90)" );
        }

        if (this._yAxisShow) {
            this._svg.append("g").attr("class", "y axis").call(this._yAxis).append("text")
            // .attr("transform", "rotate(-90)")
            .attr("y", -10).attr("dy", ".10").style("text-anchor", "end").text(this._yAxisText);
        }

        /**
            TODO:
            - Add y2-axis
        **/
    }

    /*==============================
    =            Getter            =
    ==============================*/

    _createClass(Axis, [{
        key: 'xAxis',
        get: function get() {
            return this._xAxis;
        },


        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/

        set: function set(newXAxis) {
            if (newXAxis) {
                this._xAxis = newXAxis;
            }
        }
    }, {
        key: 'yAxis',
        get: function get() {
            return this._yAxis;
        },
        set: function set(newYAxis) {
            if (newYAxis) {
                this._yAxis = newYAxis;
            }
        }
    }, {
        key: 'xAxisShow',
        get: function get() {
            return this._xAxisShow;
        },
        set: function set(newXAxisShow) {
            if (newXAxisShow) {
                this._xAxisShow = newXAxisShow;
            }
        }
    }, {
        key: 'xAxisPadding',
        get: function get() {
            return this._xAxisPadding;
        },
        set: function set(newXAxisPadding) {
            if (newXAxisPadding) {
                this._xAxisPadding = newXAxisPadding;
            }
        }
    }, {
        key: 'yAxisShow',
        get: function get() {
            return this._yAxisShow;
        },
        set: function set(newYAxisShow) {
            if (newYAxisShow) {
                this._yAxisShow = newYAxisShow;
            }
        }
    }, {
        key: 'yAxisPadding',
        get: function get() {
            return this._yAxisPadding;
        },
        set: function set(newYAxisPadding) {
            if (newYAxisPadding) {
                this._yAxisPadding = newYAxisPadding;
            }
        }
    }, {
        key: 'y2AxisShow',
        get: function get() {
            return this._y2AxisShow;
        },
        set: function set(newY2AxisShow) {
            if (newY2AxisShow) {
                this._y2AxisShow = newY2AxisShow;
            }
        }
    }, {
        key: 'y2AxisPadding',
        get: function get() {
            return this._y2AxisPadding;
        },
        set: function set(newY2AxisPadding) {
            if (newY2AxisPadding) {
                this._y2AxisPadding = newY2AxisPadding;
            }
        }

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        /*=====  End of Main Functions  ======*/

    }]);

    return Axis;
}();