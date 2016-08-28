var C9 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _C = __webpack_require__(1);

	var _C2 = _interopRequireDefault(_C);

	var _C3 = __webpack_require__(6);

	var _C4 = _interopRequireDefault(_C3);

	var _C5 = __webpack_require__(7);

	var _C6 = _interopRequireDefault(_C5);

	var _C7 = __webpack_require__(8);

	var _C8 = _interopRequireDefault(_C7);

	var _C9 = __webpack_require__(9);

	var _C10 = _interopRequireDefault(_C9);

	var _C11 = __webpack_require__(10);

	var _C12 = _interopRequireDefault(_C11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		BarChart: _C2.default,
		DonutChart: _C4.default,
		LineChart: _C6.default,
		PieChart: _C8.default,
		TimeLine: _C10.default,
		Map: _C12.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _C = __webpack_require__(2);

	var _C2 = _interopRequireDefault(_C);

	var _C3 = __webpack_require__(3);

	var _C4 = _interopRequireDefault(_C3);

	var _C5 = __webpack_require__(4);

	var _C6 = _interopRequireDefault(_C5);

	var _C7 = __webpack_require__(5);

	var _C8 = _interopRequireDefault(_C7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BarChart = function (_Chart) {
	    _inherits(BarChart, _Chart);

	    function BarChart(options) {
	        _classCallCheck(this, BarChart);

	        var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, options));

	        var self = _this;
	        var config = {
	            bar_width: undefined,
	            bar_color: "category20"
	        };

	        var width = self.width - self.margin.left - self.margin.right;
	        var height = self.height - self.margin.top - self.margin.bottom;

	        self.svg.c9Chart = "bar";

	        self.data.forEach(function (d) {
	            var y0 = 0;
	            d.stack = _typeof(d.value) === "object" ? d.value.map(function (v) {
	                return { name: d.name, y0: y0, y1: y0 += v };
	            }) : [{ y0: y0, y1: d.value }];
	            d.total = d.stack[d.stack.length - 1].y1;
	        });

	        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
	        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	        var y = d3.scale.linear().range([height, 0]);

	        x.domain(self.data.map(function (d) {
	            return d.name;
	        }));

	        y.domain([0, d3.max(self.data, function (d) {
	            return d.total;
	        })]);
	        // Make flexible width according to bar_width
	        config.bar_width = x.rangeBand();
	        self._barWidth = options.bar_width || config.bar_width;
	        self._barColor = options.bar_color || config.bar_color;

	        self.initBarChartConfig(height, x, y);
	        return _this;
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/

	    _createClass(BarChart, [{
	        key: 'initBarChartConfig',

	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        /**
	         * [First init config Bar Chart]
	         * @param  {[type]} height [Height of Bar Chart]
	         * @param  {[type]} x      [x scale]
	         * @param  {[type]} y      [y scale]
	         * @return {[type]}        [description]
	         */
	        value: function initBarChartConfig(height, x, y) {
	            var color = this.barColor;

	            var bar = this.svg.selectAll(".bar").data(this.data).enter().append("g").attr("class", "gBar").attr("transform", function (d) {
	                return "translate(" + x(d.name) + ",0)";
	            });

	            bar.selectAll("rect").data(function (d) {
	                return d.stack;
	            }).enter().append("rect").attr("class", "bar").style("fill", function (d, i) {
	                return color(i);
	            }).attr("y", function (d) {
	                return y(d.y1);
	            }).attr("width", this.barWidth) //x.rangeBand()
	            .attr("height", function (d) {
	                return y(d.y0) - y(d.y1);
	            });
	        }

	        /**
	         * [Main draw function of Bar Chart]
	         * @return {[type]} [description]
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {

	            var axis = new _C4.default(this.options, this.svg, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom, null, null);
	            var title = new _C6.default(this.options, this.svg, this.width, this.height, this.margin);
	            var legend = new _C8.default(this.options, this.svg, this.barColor, this.data);
	        }

	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: 'barWidth',
	        get: function get() {
	            return this._barWidth;
	        },


	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/

	        set: function set(newBarWidth) {
	            if (newBarWidth) {
	                this._barWidth = newBarWidth;
	            }
	        }
	    }, {
	        key: 'barColor',
	        get: function get() {
	            var color = this._barColor;
	            if (typeof color == 'string') {
	                try {
	                    return d3.scale[color]();
	                } catch (err) {
	                    return function (i) {
	                        return color;
	                    };
	                }
	            } else if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) == 'object') {
	                return d3.scale.ordinal().range(color);
	            }
	        },
	        set: function set(newBarColor) {
	            if (newBarColor) {
	                this._barColor = newBarColor;
	            }
	        }
	    }]);

	    return BarChart;
	}(_C2.default);

	exports.default = BarChart;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Chart = function () {
	    function Chart(options) {
	        _classCallCheck(this, Chart);

	        var self = this;
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
	                left: 40
	            },
	            // interaction in chart
	            enable_interaction: true,
	            // mouse events
	            on_mouse_over: function on_mouse_over() {},
	            on_mouse_out: function on_mouse_out() {},
	            on_mouse_click: function on_mouse_click() {},
	            // legend
	            legend_show: true,
	            legend_position: "bottom",
	            legend_inset_anchor: "top-left",
	            legend_padding: 0,
	            // tooltip - show when mouseover on each data
	            tooltip_show: true,
	            tooltip_position: undefined,
	            // color range
	            color_range: "category20",
	            // data
	            data: []
	        };

	        self._id = options.id || config.id;
	        self._width = options.width || config.width;
	        self._data = options.data || config.data;
	        self._height = options.height || config.height;
	        self._colorRange = options.color_range || config.color_range;
	        self._margin = self.extend(options.margin, config.margin);
	        self._svg = null;
	        self._options = options;

	        self.initConfig();
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/

	    _createClass(Chart, [{
	        key: "initConfig",

	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        /**
	         * [First init config in parent Chart]
	         * @param  {[type]} self [description]
	         * @return {[type]}      [description]
	         */
	        value: function initConfig() {
	            var margin = this.margin,
	                id = this.id,
	                width = this.width - margin.left - margin.right,
	                height = this.height - margin.top - margin.bottom;

	            this.svg = d3.select(id).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	        }

	        /**
	         * Overwrites obj2's values with obj1's and adds obj1's if non existent in obj2
	         * @param obj1
	         * @param obj2
	         * @returns obj3 a new object based on obj1 and obj2
	         */

	    }, {
	        key: "extend",
	        value: function extend(obj1, obj2) {
	            var obj3 = {};
	            for (var attrname in obj2) {
	                obj3[attrname] = obj2[attrname];
	            }
	            for (var attrname in obj1) {
	                obj3[attrname] = obj1[attrname];
	            }
	            return obj3;
	        }

	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: "id",
	        get: function get() {
	            return this._id;
	        },

	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/

	        set: function set(newId) {
	            if (newId) {
	                this._id = newId;
	            }
	        }
	    }, {
	        key: "width",
	        get: function get() {
	            return this._width;
	        },
	        set: function set(newWidth) {
	            if (newWidth) {
	                this._width = newWidth;
	            }
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            return this._height;
	        },
	        set: function set(newHeight) {
	            if (newHeight) {
	                this._height = newHeight;
	            }
	        }
	    }, {
	        key: "colorRange",
	        get: function get() {
	            if (typeof this._colorRange == 'string') {
	                return d3.scale[this._colorRange]();
	            } else if (_typeof(this._colorRange) == 'object') {
	                return d3.scale.ordinal().range(this._colorRange);
	            }
	        },
	        set: function set(newColorRange) {
	            if (newColorRange) {
	                this._colorRange = newColorRange;
	            }
	        }
	    }, {
	        key: "margin",
	        get: function get() {
	            return this._margin;
	        },
	        set: function set(newMargin) {
	            if (newMargin) {
	                this._margin = newMargin;
	            }
	        }
	    }, {
	        key: "data",
	        get: function get() {
	            return this._data;
	        },
	        set: function set(newData) {
	            if (newData) {
	                this._data = newData;
	            }
	        }
	    }, {
	        key: "svg",
	        get: function get() {
	            return this._svg;
	        },
	        set: function set(newSvg) {
	            if (newSvg) {
	                this._svg = newSvg;
	            }
	        }
	    }, {
	        key: "options",
	        get: function get() {
	            return this._options;
	        },
	        set: function set(newOptions) {
	            if (newOptions) {
	                this._options = newOptions;
	            }
	        }
	    }]);

	    return Chart;
	}();

	exports.default = Chart;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

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
	            num_of_tick_y: 5,
	            tick_format: "s", // refer: https://github.com/d3/d3-format
	            is_logaric_variant: false, // TODO: Add logaric variant for x axis
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
	        this._isLogaricVariant = options.is_logaric_variant || config.is_logaric_variant;
	        this._tickFormat = options.tick_format || config.tick_format;
	        this._numOfTickY = options.num_of_tick_y || config.num_of_tick_y;
	        this._y2AxisShow = options.y2_axis_show || config.y2_axis_show;
	        this._y2AxisPadding = options.y2_axis_padding || config.y2_axis_padding;
	        this._y2AxisText = options.y2_axis_text || config.y2_axis_text;
	        this._gridXShow = options.grid_x_show || config.grid_x_show;
	        this._gridYShow = options.grid_y_show || config.grid_y_show;

	        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	        var y;

	        if (this._isLogaricVariant) {
	            y = d3.scale.log().range([height, 0]);
	        } else {
	            y = d3.scale.linear().range([height, 0]);
	        }

	        x.domain(data.map(function (d) {
	            return d.name;
	        }));

	        if (svg.c9Chart == "bar") y.domain([d3.min(data, function (d) {
	            return d.total;
	        }), d3.max(data, function (d) {
	            return d.total;
	        })]);else y.domain([d3.min(data, function (d) {
	            return d.value;
	        }), d3.max(data, function (d) {
	            return d.value;
	        })]);

	        if (svg.c9Chart == "timeline") {

	            var xScale = d3.time.scale().domain([options.starting, options.ending]).range([0, width]);
	            this._xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(options.tickFormat === undefined ? d3.time.format("%I %p") : options.tickFormat.format).tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize).ticks(options.tickFormat === undefined ? d3.time.hours : options.tickFormat.tickTime, options.tickFormat === undefined ? 1 : options.tickFormat.tickInterval);
	            delete options.starting;
	            delete options.ending;
	        } else if (svg.c9Chart == "line") {

	            this._xAxis = xAxe;
	            this._yAxis = yAxe;
	        } else {
	            // Currently, support logaric axis only for y-axis on bar-chart
	            // TODO: add for line-chart too
	            var _tickFormat = d3.format(this._tickFormat);
	            var _numOfTickY = this._numOfTickY;

	            this._xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);

	            // In LOG scale, can't specify default number of ticks
	            // must be filter with tickFormat instead
	            // refer: https://github.com/d3/d3/wiki/Quantitative-Scales#log_ticks
	            if (this._isLogaricVariant) {
	                this._yAxis = d3.svg.axis().scale(y).orient("left").ticks(_numOfTickY, _tickFormat).tickSize(10, 0);
	            } else {
	                this._yAxis = d3.svg.axis().scale(y).orient("left").ticks(_numOfTickY).tickSize(10, 0).tickFormat(_tickFormat);
	            }
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
	        key: 'isLogaricVariant',
	        get: function get() {
	            return this._isLogaricVariant;
	        },
	        set: function set(newIsLogaricVariant) {
	            if (newIsLogaricVariant) {
	                this._isLogaricVariant = newIsLogaricVariant;
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

	exports.default = Axis;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Title = function () {
	    function Title(options, svg, width, height, margin) {
	        _classCallCheck(this, Title);

	        var config = {
	            title_show: true,
	            title_text: "Sample Chart",
	            title_position: 'top',
	            title_size: "14px"
	        };

	        this._titleShow = options.title_show || config.title_show;
	        this._titleText = options.title_text || config.title_text;
	        this._titlePosition = options.title_position || config.title_position;
	        this._titleSize = options.title_size || config.title_size;

	        this._svg = svg;

	        if (this._titleShow) {
	            // Select CURRENT svg container, to make this axis outside
	            // as a SEPARATED component, just like AXIS, of CHART
	            var text = d3.select(this._svg[0][0].parentNode).append("g").append("text").attr("class", "title");

	            // Get title width: text.node().getComputedTextLength()           
	            text.attr("x", (width - text.node().getComputedTextLength()) / 2).attr("y", this.setYLocation(height, margin)).attr("text-anchor", "middle").style("font-size", this._titleSize).text(this._titleText);
	        }
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/

	    _createClass(Title, [{
	        key: 'setYLocation',


	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function setYLocation(height, margin) {
	            if (this.titlePosition === 'top') {
	                return margin.top / 2;
	            } else if (this.titlePosition === 'bottom') {
	                return height - margin.bottom / 2;
	            }
	        }
	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: 'titleShow',
	        get: function get() {
	            return this._titleShow;
	        },


	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/

	        set: function set(newTitleShow) {
	            if (newTitleShow) {
	                this._titleShow = newTitleShow;
	            }
	        }
	    }, {
	        key: 'titleText',
	        get: function get() {
	            return this._titleText;
	        },
	        set: function set(newTitleText) {
	            if (newTitleText) {
	                this._titleText = newTitleText;
	            }
	        }
	    }, {
	        key: 'titlePosition',
	        get: function get() {
	            return this._titlePosition;
	        },
	        set: function set(newTitlePosition) {
	            if (newTitlePosition) {
	                this._titlePosition = newTitlePosition;
	            }
	        }
	    }, {
	        key: 'titleSize',
	        get: function get() {
	            return this._titleSize;
	        },
	        set: function set(newTitleSize) {
	            if (newTitleSize) {
	                this._titleSize = newtitleSize;
	            }
	        }
	    }]);

	    return Title;
	}();

	exports.default = Title;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Legend = function () {
	    function Legend(options, svg, color, data) {
	        _classCallCheck(this, Legend);

	        var config = {
	            legend_show: false,
	            legend_position: [0, 0],
	            legend_box: false,
	            legend_size: 18,
	            legend_text_size: "14px",
	            legend_margin: [5, 5, 5, 5],
	            legend_space: 5,
	            legend_style: "rect"
	        };

	        this._legendShow = options.legend_show || config.legend_show;
	        this._legendTextSize = options.legend_text_size || config.legend_text_size;
	        this._legendPosition = options.legend_position || config.legend_position;
	        this._legendSize = options.legend_size || config.legend_size;
	        this._legendBox = options.legend_box || config.legend_box;
	        this._legendMargin = options.legend_margin || config.legend_margin;
	        this._legendSpace = options.legend_space || config.legend_space;
	        this._legendStyle = options.legend_style || config.legend_style;

	        this._svg = svg;
	        this._data = data;
	        if (this._legendShow) {
	            var self = this;
	            var legendDomain = [];
	            if (self._svg.c9Chart == "line") {
	                var dataGroup = d3.nest().key(function (d) {
	                    return d.Client;
	                }).entries(self._data);
	                dataGroup.forEach(function (d, i) {
	                    legendDomain.push(d.key);
	                });
	            } else if (self._svg.c9Chart == "bar") {
	                try {
	                    if (typeof options.legend_domain === "string") legendDomain.push(options.legend_domain);else if (_typeof(options.legend_domain) === "object") legendDomain = options.legend_domain;
	                } catch (err) {
	                    throw "Legend domain is not defined";
	                }
	            } else if (self._svg.c9Chart == "pie" || self._svg.c9Chart == "donut" || self._svg.c9Chart == "timeline") {
	                self._data.forEach(function (d) {
	                    d.name ? legendDomain.push(d.name) : legendDomain.push("");
	                });
	            }

	            var i = 0;
	            for (i; i < legendDomain.length; i++) {
	                if (legendDomain[i] != "") break;
	            };

	            if (i == legendDomain.length) legendDomain = [];

	            color.domain(legendDomain);

	            var legend = d3.select(self._svg[0][0].parentNode).append("g").attr("class", "legend").attr("transform", "translate(" + self._legendPosition[0] + "," + self._legendPosition[1] + ")");

	            var legendBox = legend.selectAll(".legendBox").data([true]).enter().append("rect");
	            var legendItem = legend.selectAll(".legendItem").data(color.domain()).enter().append("g").attr("class", "legendItem").attr("transform", function (d, i) {
	                return "translate(" + self._legendMargin[3] + "," + (i * (self._legendSize + self._legendSpace) + self._legendMargin[0]) + ")";
	            });
	            legendItem.append(self._legendStyle).attr("width", self._legendSize).attr("height", self._legendSize).attr("r", self._legendSize).style("fill", color).style("stroke", color);

	            legendItem.append("text").attr("x", self._legendSize + self._legendSpace).attr("y", self._legendSize - self._legendSpace).text(function (d) {
	                return d;
	            });

	            if (self._legendBox && legendDomain.length > 0) {
	                var box = legend[0][0].getBBox();
	                legendBox.attr("class", "legendBox").attr("x", 0).attr("y", 0).attr("width", box.width + self._legendMargin[1] + self._legendMargin[3]).attr("height", box.height + self._legendMargin[2] + self._legendMargin[0]).style("fill", "none").style("stroke", "black");
	            }
	        }
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/

	    _createClass(Legend, [{
	        key: "setYLocation",


	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function setYLocation(height, margin) {
	            if (this.legendPosition === 'top') {
	                return margin.top / 2;
	            } else if (this.legendPosition === 'bottom') {
	                return height - margin.bottom / 2;
	            }
	        }
	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: "legendShow",
	        get: function get() {
	            return this._legendShow;
	        },


	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/

	        set: function set(newlegendShow) {
	            if (newlegendShow) {
	                this._legendShow = newlegendShow;
	            }
	        }
	    }, {
	        key: "legendText",
	        get: function get() {
	            return this._legendText;
	        },
	        set: function set(newlegendText) {
	            if (newlegendText) {
	                this._legendText = newlegendText;
	            }
	        }
	    }, {
	        key: "legendPosition",
	        get: function get() {
	            return this._legendPosition;
	        },
	        set: function set(newlegendPosition) {
	            if (newlegendPosition) {
	                this._legendPosition = newlegendPosition;
	            }
	        }
	    }, {
	        key: "legendSize",
	        get: function get() {
	            return this._legendSize;
	        },
	        set: function set(newlegendSize) {
	            if (newlegendSize) {
	                this._legendSize = newlegendSize;
	            }
	        }
	    }]);

	    return Legend;
	}();

	exports.default = Legend;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _C = __webpack_require__(2);

	var _C2 = _interopRequireDefault(_C);

	var _C3 = __webpack_require__(3);

	var _C4 = _interopRequireDefault(_C3);

	var _C5 = __webpack_require__(4);

	var _C6 = _interopRequireDefault(_C5);

	var _C7 = __webpack_require__(5);

	var _C8 = _interopRequireDefault(_C7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DonutChart = function (_Chart) {
	    _inherits(DonutChart, _Chart);

	    function DonutChart(options) {
	        _classCallCheck(this, DonutChart);

	        var _this = _possibleConstructorReturn(this, (DonutChart.__proto__ || Object.getPrototypeOf(DonutChart)).call(this, options));

	        var self = _this;
	        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
	        var config = {
	            outer_radius: R,
	            inner_radius: R > 80 ? R - 80 : R - 40
	        };

	        self._outerRadius = options.outer_radius || config.outer_radius;
	        self._innerRadius = options.inner_radius || config.inner_radius;
	        self.svg.c9Chart = 'donut';
	        self.initDonutChartConfig();
	        return _this;
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/


	    _createClass(DonutChart, [{
	        key: 'initDonutChartConfig',

	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/

	        value: function initDonutChartConfig() {
	            var width = this.width - this.margin.left - this.margin.right;
	            var height = this.height - this.margin.top - this.margin.bottom;
	            var color = this.colorRange;

	            var arc = d3.svg.arc().outerRadius(this.outerRadius).innerRadius(this.innerRadius);

	            //we can sort data here
	            var pie = d3.layout.pie().value(function (d) {
	                return d.value;
	            });

	            //draw chart
	            var arcs = this.svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('g.arc').data(pie(this.data)).enter().append('g').attr('class', 'arc');

	            arcs.append('path').attr('d', arc).style('fill', function (d, i) {
	                return color(i);
	            });

	            arcs.append('text').attr('transform', function (d) {
	                return 'translate(' + arc.centroid(d) + ')';
	            }).attr('dy', '.35em').attr('text-anchor', 'middle').text(function (d) {
	                return d.data.name;
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {

	            var title = new _C6.default(this.options, this.svg, this.width, this.height, this.margin);
	            var legend = new _C8.default(this.options, this.svg, this.colorRange, this.data);
	        }

	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: 'outerRadius',
	        get: function get() {
	            return this._outerRadius;
	        },

	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(newOuterRadius) {
	            if (newOuterRadius) {
	                this._outerRadius = newOuterRadius;
	            }
	        }
	    }, {
	        key: 'innerRadius',
	        get: function get() {
	            return this._innerRadius;
	        },
	        set: function set(newInnerRadius) {
	            if (newInnerRadius) {
	                this._innerRadius = newInnerRadius;
	            }
	        }
	    }]);

	    return DonutChart;
	}(_C2.default);

	exports.default = DonutChart;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _C = __webpack_require__(2);

	var _C2 = _interopRequireDefault(_C);

	var _C3 = __webpack_require__(3);

	var _C4 = _interopRequireDefault(_C3);

	var _C5 = __webpack_require__(4);

	var _C6 = _interopRequireDefault(_C5);

	var _C7 = __webpack_require__(5);

	var _C8 = _interopRequireDefault(_C7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LineChart = function (_Chart) {
	    _inherits(LineChart, _Chart);

	    function LineChart(options) {
	        _classCallCheck(this, LineChart);

	        var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, options));

	        var self = _this;
	        var config = {
	            point_show: false,
	            point_fill: "#fb8072",
	            point_stroke: "#d26b5f",
	            point_opacity: 1.0,
	            point_radius: 5,
	            point_hover_enable: false,
	            interpolate: "linear" // refer: https://www.dashingd3js.com/svg-paths-and-d3js
	        };

	        self._pointShow = options.point_show || config.point_show;
	        self._pointRadius = options.point_radius || config.point_radius;
	        self._pointFill = options.point_fill || config.point_fill;
	        self._pointStroke = options.point_stroke || config.point_stroke;
	        self._pointOpacity = options.point_opacity || config.point_opacity;
	        self._pointHoverEnable = options.point_hover_enable || config.point_hover_enable;
	        self._interpolate = options.interpolate || config.interpolate;
	        self.svg.c9Chart = "line";

	        self.initLineChart();

	        return _this;
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/

	    _createClass(LineChart, [{
	        key: 'initLineChart',

	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/

	        /**
	         * [First init Line Chart]
	         * @return {[type]} [description]
	         */
	        value: function initLineChart() {
	            var dataGroup = d3.nest().key(function (d) {
	                return d.Client;
	            }).entries(this.data);

	            var width = this.width - this.margin.left - this.margin.right;
	            var height = this.height - this.margin.top - this.margin.bottom;

	            var x = d3.scale.linear().range([0, width]);
	            var y = d3.scale.linear().range([height, 0]);

	            x.domain([d3.min(this.data, function (d) {
	                return d.year;
	            }), d3.max(this.data, function (d) {
	                return d.year;
	            })]);
	            y.domain([d3.min(this.data, function (d) {
	                return d.sale;
	            }), d3.max(this.data, function (d) {
	                return d.sale;
	            })]);

	            this.xAxis = d3.svg.axis().scale(x);
	            this.yAxis = d3.svg.axis().scale(y).orient("left");

	            var lineGen = d3.svg.line().x(function (d) {
	                return x(d.year);
	            }).y(function (d) {
	                return y(d.sale);
	            }).interpolate(this.interpolate);

	            var _svg = this.svg,
	                _colorRange = this.colorRange,
	                _pointShow = this.pointShow,
	                _pointRadius = this.pointRadius,
	                _pointFill = this.pointFill,
	                _pointStroke = this.pointStroke,
	                _pointOpacity = this.pointOpacity;

	            dataGroup.forEach(function (d, i) {
	                _svg.append('path').attr('d', lineGen(d.values)).attr('stroke', _colorRange(i)).attr('stroke-width', 2).attr('id', 'line_' + d.key).attr('fill', 'none');

	                if (_pointShow) {
	                    _svg.selectAll("dot").data(d.values).enter().append("circle").attr("r", _pointRadius).attr("cx", function (_d) {
	                        return x(_d.year);
	                    }).attr("cy", function (_d) {
	                        return y(_d.sale);
	                    }).style("fill", _pointFill).style("stroke", _pointStroke).style("opacity", _pointOpacity);
	                }
	            });
	        }

	        /**
	         * [Main draw functon of Line Chart]
	         * @return {[type]} [description]
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {

	            var axis = new _C4.default(this.options, this.svg, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom, this.xAxis, this.yAxis);
	            var title = new _C6.default(this.options, this.svg, this.width, this.height, this.margin);
	            var legend = new _C8.default(this.options, this.svg, this.colorRange, this.data);
	        }

	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: 'pointShow',
	        get: function get() {
	            return this._pointShow;
	        },


	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/

	        set: function set(newPointShow) {
	            if (newPointShow) {
	                this._pointShow = newPointShow;
	            }
	        }
	    }, {
	        key: 'pointFill',
	        get: function get() {
	            return this._pointFill;
	        },
	        set: function set(newPointFill) {
	            if (newPointFill) {
	                this._pointFill = newPointFill;
	            }
	        }
	    }, {
	        key: 'pointStroke',
	        get: function get() {
	            return this._pointStroke;
	        },
	        set: function set(newPointStroke) {
	            if (newPointStroke) {
	                this._pointStroke = newPointStroke;
	            }
	        }
	    }, {
	        key: 'pointOpacity',
	        get: function get() {
	            return this._pointOpacity;
	        },
	        set: function set(newPointOpacity) {
	            if (newPointOpacity) {
	                this._pointOpacity = newPointOpacity;
	            }
	        }
	    }, {
	        key: 'pointRadius',
	        get: function get() {
	            return this._pointRadius;
	        },
	        set: function set(newPointRadius) {
	            if (newPointRadius) {
	                this._pointRadius = newPointRadius;
	            }
	        }
	    }, {
	        key: 'pointHoverEnable',
	        get: function get() {
	            return this._pointHoverEnable;
	        },
	        set: function set(newPointHoverEnable) {
	            if (newPointHoverEnable) {
	                this._pointHoverEnable = newPointHoverEnable;
	            }
	        }
	    }, {
	        key: 'interpolate',
	        get: function get() {
	            return this._interpolate;
	        },
	        set: function set(newInterpolate) {
	            if (newInterpolate) {
	                this._interpolate = newInterpolate;
	            }
	        }
	    }]);

	    return LineChart;
	}(_C2.default);

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


	exports.default = LineChart;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _C = __webpack_require__(2);

	var _C2 = _interopRequireDefault(_C);

	var _C3 = __webpack_require__(3);

	var _C4 = _interopRequireDefault(_C3);

	var _C5 = __webpack_require__(4);

	var _C6 = _interopRequireDefault(_C5);

	var _C7 = __webpack_require__(5);

	var _C8 = _interopRequireDefault(_C7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PieChart = function (_Chart) {
	    _inherits(PieChart, _Chart);

	    function PieChart(options) {
	        _classCallCheck(this, PieChart);

	        var _this = _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call(this, options));

	        var self = _this;
	        var config = {
	            radius: 200
	        };

	        self._radius = options.radius || config.radius;
	        self.svg.c9Chart = "pie";
	        self.initPieChartConfig();
	        return _this;
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/

	    _createClass(PieChart, [{
	        key: 'initPieChartConfig',


	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/

	        /**
	         * [First init Pie Chart]
	         * @return {[type]} [description]
	         */
	        value: function initPieChartConfig() {
	            var width = this.width - this.margin.left - this.margin.right;
	            var height = this.height - this.margin.top - this.margin.bottom;

	            var _data = this.data;
	            var __radius = this.radius;

	            var pie = d3.layout.pie().value(function (d) {
	                return d.value;
	            });
	            // declare an arc generator function
	            var arc = d3.svg.arc().outerRadius(this.radius);
	            // Random color
	            var color = this.colorRange;

	            // select paths, use arc generator to draw
	            var arcs = this.svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('g.slice').data(pie(this.data)).enter().append('g').attr('class', 'slice');

	            arcs.append('path').attr('d', arc).attr('fill', function (d, i) {
	                return color(i);
	            });

	            arcs.append("text").attr("transform", function (d) {
	                d.innerRadius = 0;
	                d.outerRadius = __radius;

	                return "translate(" + arc.centroid(d) + ")";
	            }).attr("text-anchor", "middle").text(function (d, i) {
	                return d.data.name;
	            });
	        }

	        /**
	         * [Main draw function of Pie Chart]
	         * @return {[type]} [description]
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {

	            var title = new _C6.default(this.options, this.svg, this.width, this.height, this.margin);
	            var legend = new _C8.default(this.options, this.svg, this.colorRange, this.data);
	        }

	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: 'radius',
	        get: function get() {
	            return this._radius;
	        }

	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/

	        ,
	        set: function set(newRadius) {
	            if (newRadius) {
	                this._radius = newRadius;
	            }
	        }
	    }]);

	    return PieChart;
	}(_C2.default);

	exports.default = PieChart;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _C = __webpack_require__(2);

	var _C2 = _interopRequireDefault(_C);

	var _C3 = __webpack_require__(3);

	var _C4 = _interopRequireDefault(_C3);

	var _C5 = __webpack_require__(4);

	var _C6 = _interopRequireDefault(_C5);

	var _C7 = __webpack_require__(5);

	var _C8 = _interopRequireDefault(_C7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TimeLine = function (_Chart) {
	    _inherits(TimeLine, _Chart);

	    function TimeLine(options) {
	        _classCallCheck(this, TimeLine);

	        var _this = _possibleConstructorReturn(this, (TimeLine.__proto__ || Object.getPrototypeOf(TimeLine)).call(this, options));

	        var self = _this;

	        var config = {
	            row_separator: null,
	            background_color: null,
	            starting: 0,
	            ending: 0,
	            stack: false, //test
	            // rotateTicks: false,
	            item_height: 20,
	            item_margin: 5,
	            label_margin: 20
	        };

	        self.svg.c9Chart = "timeline";
	        self._stack = options.stack || config.stack;
	        self._starting = options.starting || config.starting;
	        self._ending = options.ending || config.ending;
	        self._rowSeparator = options.row_separator || config.row_separator;
	        self._backgroundColor = options.background_color || config.background_color;
	        self._itemHeight = options.item_height || config.item_height;
	        self._itemMargin = options.item_margin || config.item_margin;
	        self._labelMargin = options.label_margin || config.label_margin;
	        self._maxStack = 1;

	        self.initTimelineConfig();
	        return _this;
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/


	    _createClass(TimeLine, [{
	        key: 'initTimelineConfig',

	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/

	        value: function initTimelineConfig() {
	            var self = this;
	            var color = self.colorRange;
	            var stackList = {},
	                maxStack = 0,
	                minTime = 0,
	                maxTime = 0,
	                width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom;

	            // count number of stack and calculate min time, max time from data
	            if (self.stack || self.ending === 0 || self.starting === 0) {

	                self.data.forEach(function (datum, index) {

	                    if (self.stack && Object.keys(stackList).indexOf(index) == -1) {
	                        stackList[index] = maxStack;
	                        maxStack++;
	                    }

	                    datum.times.forEach(function (time, i) {
	                        if (self.starting === 0) if (time.starting_time < minTime || minTime === 0) minTime = time.starting_time;
	                        if (self.ending === 0) {
	                            if (time.starting_time > maxTime) maxTime = time.starting_time;
	                            if (time.ending_time > maxTime) maxTime = time.ending_time;
	                        }
	                    });
	                });

	                if (self.ending === 0) {
	                    self.ending = maxTime;
	                }
	                if (self.starting === 0) {
	                    self.starting = minTime;
	                }
	            }

	            self.maxStack = maxStack;
	            var scale = width / (self.ending - self.starting);

	            self.data.forEach(function (datum, index) {
	                var data = datum.times;
	                //draw background
	                if (self.backgroundColor) {
	                    var barYAxis = (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.svg.selectAll("g").data(data).enter().insert("rect").attr("class", "timeline-background-bar").attr("x", 0).attr("width", width).attr("y", barYAxis).attr("height", self.itemHeight).attr("fill", self.backgroundColor instanceof Function ? self.backgroundColor(index) : self.backgroundColor);
	                }

	                //draw item
	                self.svg.selectAll("g").data(data).enter().append(function (d, i) {
	                    return document.createElementNS(d3.ns.prefix.svg, "ending_time" in d ? "rect" : "circle");
	                }).attr("x", getXPos).attr("y", getStackPosition).attr("width", function (d, i) {
	                    return (d.ending_time - d.starting_time) * scale;
	                }).attr("cy", function (d, i) {
	                    return getStackPosition(d, i) + self.itemHeight / 2;
	                }).attr("cx", getXPos).attr("r", self.itemHeight / 2).attr("height", self.itemHeight).style("fill", color(index));

	                //draw label inside item
	                self.svg.selectAll("g").data(data).enter().append("text").attr("x", getXTextPos).attr("y", getStackTextPosition).text(function (d) {
	                    return d.name;
	                });

	                if (self.rowSeparator && index < self.maxStack - 1) {
	                    var lineYAxis = self.itemHeight + self.itemMargin / 2 + (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.svg.append("svg:line").attr("class", "timeline-row-separator").attr("x1", 0).attr("x2", width).attr("y1", lineYAxis).attr("y2", lineYAxis).attr("stroke-width", 1).attr("stroke", self.rowSeparator instanceof Function ? self.rowSeparator(index) : self.rowSeparator);
	                }

	                //draw the label left side item
	                if (typeof datum.name !== "undefined") {
	                    var rowsDown = self.margin.top + (self.itemHeight + self.itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + self.itemHeight * 0.75;

	                    d3.select(self.svg[0][0].parentNode).append("text").attr("class", "timeline-label").attr("transform", "translate(" + self.labelMargin + "," + rowsDown + ")").text(datum.name);
	                }
	                //draw icon
	                else if (typeof datum.icon !== "undefined") {
	                        d3.select(self.svg[0][0].parentNode).append("image").attr("class", "timeline-label").attr("transform", "translate(" + self.labelMargin + "," + (self.margin.top + (self.itemHeight + self.itemMargin) * stackList[index]) + ")").attr("xlink:href", datum.icon).attr("width", self.itemHeight).attr("height", self.itemHeight);
	                    }

	                function getStackPosition(d, i) {
	                    if (self.stack) {
	                        return (self.itemHeight + self.itemMargin) * stackList[index];
	                    }
	                    return 0;
	                }
	                function getStackTextPosition(d, i) {
	                    if (self.stack) {
	                        return (self.itemHeight + self.itemMargin) * stackList[index] + self.itemHeight * 0.75;
	                    }
	                    return self.itemHeight * 0.75;
	                }
	            });

	            function getXPos(d, i) {
	                return (d.starting_time - self.starting) * scale;
	            }

	            function getXTextPos(d, i) {
	                return (d.starting_time - self.starting) * scale + 5;
	            }
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            this.options.starting = this.starting;
	            this.options.ending = this.ending;
	            var axis = new _C4.default(this.options, this.svg, this.data, this.width - this.margin.left - this.margin.right, (this.itemHeight + this.itemMargin) * this.maxStack, null, null);
	            var title = new _C6.default(this.options, this.svg, this.width, this.height, this.margin);
	            var legend = new _C8.default(this.options, this.svg, this.colorRange, this.data);
	        }

	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: 'stack',
	        get: function get() {
	            return this._stack;
	        },

	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(newStack) {
	            if (newStack) {
	                this._stacked = newStack;
	            }
	        }
	    }, {
	        key: 'backgroundColor',
	        get: function get() {
	            return this._backgroundColor;
	        },
	        set: function set(newBackgroundColor) {
	            if (newBackgroundColor) {
	                this.backgroundColor = newBackgroundColor;
	            }
	        }
	    }, {
	        key: 'rowSeparator',
	        get: function get() {
	            return this._rowSeparator;
	        },
	        set: function set(newRowSeparator) {
	            if (newRowSeparator) {
	                this._rowSeparator = newRowSeparator;
	            }
	        }
	    }, {
	        key: 'starting',
	        get: function get() {
	            return this._starting;
	        },
	        set: function set(newStarting) {
	            if (newStarting) {
	                this._starting = newStarting;
	            }
	        }
	    }, {
	        key: 'ending',
	        get: function get() {
	            return this._ending;
	        },
	        set: function set(newEnding) {
	            if (newEnding) {
	                this._ending = newEnding;
	            }
	        }
	    }, {
	        key: 'itemHeight',
	        get: function get() {
	            return this._itemHeight;
	        },
	        set: function set(newItemHeight) {
	            if (newItemHeight) {
	                this._itemHeight = newItemHeight;
	            }
	        }
	    }, {
	        key: 'itemMargin',
	        get: function get() {
	            return this._itemMargin;
	        },
	        set: function set(newItemMargin) {
	            if (newItemMargin) {
	                this._itemMargin = newItemMargin;
	            }
	        }
	    }, {
	        key: 'labelMargin',
	        get: function get() {
	            return this._labelMargin;
	        },
	        set: function set(newLabelMargin) {
	            if (newLabelMargin) {
	                this._labelMargin = newLabelMargin;
	            }
	        }
	    }, {
	        key: 'maxStack',
	        get: function get() {
	            return this._maxStack;
	        },
	        set: function set(newMaxStack) {
	            if (newMaxStack) {
	                this._maxStack = newMaxStack;
	            }
	        }
	    }]);

	    return TimeLine;
	}(_C2.default);

	exports.default = TimeLine;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = function () {
	    function Map(options) {
	        _classCallCheck(this, Map);

	        var self = this;
	        var config = {
	            // container
	            id: "body",

	            // Layers:
	            // BingMaps, OSM, Raster, Tile, TileImage, Vector, VectorTile,...
	            // REF: http://openlayers.org/en/latest/apidoc/ol.source.html?stableonly=true
	            layer: "OSM",
	            view: {
	                lat: 0,
	                lon: 0,
	                zoom: 2
	            },
	            controls: ol.control.defaults({
	                attribution: false
	            })
	        };

	        self._id = options.id || config.id;
	        self._width = options.width || config.width;
	        self._data = options.data || config.data;
	        self._height = options.height || config.height;
	        self._view = options.view || config.view;
	        self._markers = options.markers || [];
	        self._options = options;
	        self.initMapConfig();
	    }

	    /*==============================
	    =            Getter            =
	    ==============================*/

	    _createClass(Map, [{
	        key: "initMapConfig",


	        /*=====  End of Setter  ======*/

	        /*======================================
	        =            Main Functions            =
	        ======================================*/

	        value: function initMapConfig() {
	            var vectorSource = new ol.source.Vector({});
	            var styles = {};
	            this.markers.forEach(function (m, i) {
	                var marker = new ol.Feature({
	                    type: 'c9GeoMarker' + i,
	                    geometry: new ol.geom.Point(ol.proj.fromLonLat([m[1], m[0]]))
	                });
	                if (m[2] === undefined) styles['c9GeoMarker' + i] = new ol.style.Style({
	                    image: new ol.style.Icon({
	                        anchor: [0.5, 1],
	                        src: 'https://farm9.staticflickr.com/8427/28670431094_0c20eb415a_o_d.png'
	                    })
	                });else styles['c9GeoMarker' + i] = new ol.style.Style({
	                    image: new ol.style.Icon({
	                        anchor: [0.5, 1],
	                        src: m[2],
	                        scale: m[3] === undefined ? 1 : m[3]
	                    })
	                });

	                vectorSource.addFeature(marker);
	            });

	            this.map = new ol.Map({
	                target: this.id,
	                layers: [new ol.layer.Tile({
	                    source: new ol.source.OSM()
	                }), new ol.layer.Vector({
	                    source: vectorSource,
	                    style: function style(feature) {
	                        return styles[feature.get('type')];
	                    }
	                })],
	                view: new ol.View({
	                    center: ol.proj.fromLonLat([this.view.lon, this.view.lat]),
	                    zoom: this.view.zoom
	                })
	            });
	        }

	        /*=====  End of Main Functions  ======*/

	    }, {
	        key: "id",
	        get: function get() {
	            return this._id;
	        },


	        /*=====  End of Getter  ======*/

	        /*==============================
	        =            Setter            =
	        ==============================*/

	        set: function set(newId) {
	            if (newId) {
	                this._id = newId;
	            }
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            return this._height;
	        },
	        set: function set(newHeight) {
	            if (newHeight) {
	                this._height = newHeight;
	            }
	        }
	    }, {
	        key: "width",
	        get: function get() {
	            return this._width;
	        },
	        set: function set(newWidth) {
	            if (newWidth) {
	                this._width = newWidth;
	            }
	        }
	    }, {
	        key: "view",
	        get: function get() {
	            return this._view;
	        },
	        set: function set(newView) {
	            if (newView) {
	                this._view = newView;
	            }
	        }
	    }, {
	        key: "markers",
	        get: function get() {
	            return this._markers;
	        },
	        set: function set(newMarkers) {
	            if (newMarkers) {
	                this._markers = newMarkers;
	            }
	        }
	    }]);

	    return Map;
	}();

	exports.default = Map;

/***/ }
/******/ ]);