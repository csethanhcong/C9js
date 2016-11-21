"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require("../../helper/C9.Helper");

var _C2 = _interopRequireDefault(_C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Axis = function () {
    function Axis(options, chart, width, height) {
        _classCallCheck(this, Axis);

        var self = this;

        var config = {
            x: {
                tick: {
                    rotate: 0,
                    count: 10, // number of ticks to display
                    size: 6, // size of tick
                    padding: 3,
                    format: undefined,
                    values: [],
                    //the following use for timeline chart
                    time: undefined,
                    interval: 1
                },
                label: {
                    text: "Name",
                    position: "default"
                },
                show: true,
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
                show: true,
                grid: true,
                type: ""
            }
        };

        self._options = options;
        self._chart = chart;
        self._width = width;
        self._height = height;

        self.updateConfig(config);
    }

    /*==============================
    =            Getter            =
    ==============================*/

    _createClass(Axis, [{
        key: "updateConfig",


        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        value: function updateConfig(config) {
            var self = this;

            self.options = _C2.default.mergeDeep(config, self.options);

            self.x = self.chart.x;
            self.y = self.chart.y;

            self.data = self.chart.dataTarget;
            self.isLogaricVariant = self.chart.options.isLogaric;

            if (self.chart.chartType == "timeline") {
                var xScale = d3.time.scale().domain([self.chart.options.starting, self.chart.options.ending]).range([0, self.width]);

                self.xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(self.options.x.tick.format === undefined ? d3.time.format("%I %p") : self.options.x.tick.format)
                // .tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize)
                .ticks(self.options.x.tick.time || self.options.x.tick.count, self.options.x.tick.interval);
                // delete options.starting;
                // delete options.ending;
            } else {
                self.xAxis = d3.svg.axis().scale(self.x).orient("bottom").tickPadding(self.options.x.tick.padding).ticks(self.options.x.tick.count).tickValues(self.options.x.tick.values.length > 0 ? self.options.x.tick.values : undefined).tickFormat(self.options.x.type == "timeseries" ? self.options.x.tick.format || d3.time.format("%Y-%m-%d") : self.options.x.tick.format ? self.options.x.tick.format : undefined);

                // In LOG scale, can't specify default number of ticks
                // must be filter with tickFormat instead
                // refer: https://github.com/d3/d3/wiki/Quantitative-Scales#log_ticks
                if (self.isLogaricVariant) {
                    self.yAxis = d3.svg.axis().scale(self.y).orient("left").ticks(self.options.y.tick.count, self.options.y.type == "timeseries" ? self.options.y.tick.format || d3.time.format("%Y-%m-%d") : self.options.y.tick.format ? self.options.y.tick.format : undefined).tickPadding(self.options.y.tick.padding).tickValues(self.options.y.tick.values.length > 0 ? self.options.y.tick.values : undefined);
                } else {
                    self.yAxis = d3.svg.axis().scale(self.y).orient("left").ticks(self.options.y.tick.count).tickPadding(self.options.y.tick.padding).tickValues(self.options.y.tick.values.length > 0 ? self.options.y.tick.values : undefined).tickFormat(self.options.y.type == "timeseries" ? self.options.y.tick.format || d3.time.format("%Y-%m-%d") : self.options.y.tick.format ? self.options.y.tick.format : undefined);
                }
            }

            if (self.chart.chartType != "timeline") {
                // Grid
                if (self.options.x.grid) {
                    self.xAxis.innerTickSize(-self.height).outerTickSize(0);
                }

                if (self.options.y.grid) {
                    self.yAxis.innerTickSize(-self.width).outerTickSize(0);
                }
            }

            var textAnchor = function textAnchor(angle) {
                var sin = Math.sin(angle * Math.PI / 180).toFixed(15);
                return sin == 0 ? "middle" : sin > 0 ? "start" : "end";
            };

            var textDx = function textDx(angle) {
                var sin = Math.sin(angle * Math.PI / 180).toFixed(15);
                return 8 * sin;
            };

            var textY = function textY(angle) {
                return 11.5 - 2.5 * (angle / 15) * (angle > 0 ? 1 : -1);
            };

            //draw x axis
            self.chart.body.append("g").attr("class", "c9-axis c9-axis-x").attr("transform", "translate(0," + self.height + ")").call(self.xAxis);

            //draw tick
            self.chart.svg.select(".c9-axis.c9-axis-x").selectAll("text").style("text-anchor", textAnchor(self.options.x.tick.rotate)).attr("y", textY(self.options.x.tick.rotate)).attr("x", 0).attr("dy", ".71em").attr("dx", textDx(self.options.x.tick.rotate)).attr("transform", "rotate(" + self.options.x.tick.rotate + ")");
            //draw label
            self.chart.svg.select(".c9-axis.c9-axis-x").append("text").attr("class", "c9-axis c9-axis-x-text").attr("dx", "-.8em").attr("dy", "-.55em").attr("x", self.width + 20).attr("y", 10).style("text-anchor", "start").text(self.options.x.label.text);

            //hide x axis
            if (!self.options.x.show) {
                self.chart.svg.select(".c9-axis.c9-axis-x>.domain").style("display", "none");
                if (!self.options.x.grid) self.chart.svg.selectAll(".c9-axis.c9-axis-x>g.tick>line").style("display", "none");
            }

            if (self.chart.chartType != "timeline") {
                self.chart.body.append("g").attr("class", "c9-axis c9-axis-y").call(self.yAxis);

                self.chart.svg.select(".c9-axis.c9-axis-y").append("text").attr("class", "c9-axis c9-axis-y-text").attr("y", -10).attr("dy", ".10").style("text-anchor", "end").text(self.options.y.label.text);

                if (!self.options.y.show) {
                    self.chart.svg.select(".c9-axis.c9-axis-y>.domain").style("display", "none");
                    if (!self.options.y.grid) self.chart.svg.selectAll(".c9-axis.c9-axis-y>g.tick>line").style("display", "none");
                }
            }
        }
    }, {
        key: "update",
        value: function update(x, y, duration) {
            var self = this;

            if (!_C2.default.isEmpty(x)) {
                self.x = x;

                if (self.chart.chartType == 'timeline') {
                    var xScale = d3.time.scale().domain([self.chart.options.starting, self.chart.options.ending]).range([0, self.width]);

                    self.xAxis.scale(xScale);
                } else {
                    self.xAxis.scale(self.x);
                }

                self.chart.body.select('.c9-axis.c9-axis-x').transition().duration(duration).call(self.xAxis);
            }
            if (!_C2.default.isEmpty(y)) {
                self.y = y;

                if (self.chart.chartType == 'timeline') {
                    return;
                } else {
                    self.yAxis.scale(self.y);
                }

                self.chart.body.select(".c9-axis.c9-axis-y").transition().duration(duration).call(self.yAxis);
            }
        }
    }, {
        key: "draw",
        value: function draw() {
            var self = this;

            self.update(self.x, self.y, 100);
        }
        /*=====  End of Main Functions  ======*/

    }, {
        key: "x",
        get: function get() {
            return this._x;
        },


        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/

        set: function set(arg) {
            if (arg) {
                this._x = arg;
            }
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(arg) {
            if (arg) {
                this._y = arg;
            }
        }
    }, {
        key: "xAxis",
        get: function get() {
            return this._xAxis;
        },
        set: function set(arg) {
            if (arg) {
                this._xAxis = arg;
            }
        }
    }, {
        key: "yAxis",
        get: function get() {
            return this._yAxis;
        },
        set: function set(arg) {
            if (arg) {
                this._yAxis = arg;
            }
        }
    }, {
        key: "chart",
        get: function get() {
            return this._chart;
        },
        set: function set(arg) {
            if (arg) {
                this._chart = arg;
            }
        }
    }, {
        key: "options",
        get: function get() {
            return this._options;
        },
        set: function set(arg) {
            if (arg) {
                this._options = arg;
            }
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(arg) {
            if (arg) {
                this._width = arg;
            }
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(arg) {
            if (arg) {
                this._height = arg;
            }
        }
    }, {
        key: "data",
        get: function get() {
            return this._data;
        },
        set: function set(arg) {
            if (arg) {
                this._data = arg;
            }
        }
    }]);

    return Axis;
}();

exports.default = Axis;