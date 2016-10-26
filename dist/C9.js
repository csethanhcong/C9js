(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["C9"] = factory();
	else
		root["C9"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	var _C3 = __webpack_require__(9);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(11);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(12);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(13);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(14);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(8);
	
	var _C16 = _interopRequireDefault(_C15);
	
	var _C17 = __webpack_require__(15);
	
	var _C18 = _interopRequireDefault(_C17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Map Importer
	module.exports = {
		BarChart: _C2.default,
		DonutChart: _C4.default,
		LineChart: _C6.default,
		PieChart: _C8.default,
		TimeLine: _C10.default,
	
		Map: _C12.default,
	
		DataAdapter: _C16.default,
		Helper: _C14.default
	};
	
	// CSS Importer
	
	
	// Helper Importer
	// Chart Importer

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(7);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(3);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(8);
	
	var _C14 = _interopRequireDefault(_C13);
	
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
	            barWidth: undefined
	        };
	
	        var width = self.width - self.margin.left - self.margin.right;
	        var height = self.height - self.margin.top - self.margin.bottom;
	        // var groupCount   = 0; // use to count how many element in group
	        // var groupStart   = 0; // calculate the number of those first element that just have only 1 value
	
	        self.body.type = "bar";
	        // self._groupType     = options.groupType     ||  config.groupType;
	
	        var dataOption = self.dataOption;
	        dataOption.colorRange = self.colorRange;
	
	        var da = new _C14.default(dataOption);
	        self.dataTarget = da.getDataTarget("bar");
	        self.dataSource = da.dataSource;
	        var barChartType = da.getDataTypeForBarChart();
	        if (barChartType != "single") {
	            self._groupNames = da.groups || da.stacks; //define group names use for showing legend
	            self._isGroup = barChartType == "group";
	        }
	
	        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
	        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	        var y = options.isLogaric ? d3.scale.log().range([height, 0]) : d3.scale.linear().range([height, 0]);
	
	        var minMax = _C12.default.getMinMax(self.dataTarget, barChartType, options.isLogaric);
	
	        x.domain(self.dataTarget.map(function (d) {
	            return d[0].name;
	        }));
	
	        y.domain([minMax.min, minMax.max]);
	
	        /******** Handle for grouped, stacked bar chart ********/
	        if (self._groupNames) {
	            self._xGroup = d3.scale.ordinal();
	            self._xGroup.domain(self._groupNames).rangeRoundBands([0, x.rangeBand()]);
	        }
	
	        /**********************************************/
	
	        // Make flexible width according to barWidth
	        config.barWidth = x.rangeBand();
	        self._barWidth = options.barWidth || config.barWidth;
	        self._x = x;
	        self._y = y;
	        self.isLogaric = options.isLogaric;
	        self.updateConfig();
	        return _this;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(BarChart, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	
	        /**
	         * Init Bar Chart Config
	         */
	        value: function updateConfig() {
	            var self = this,
	                color = self.colorRange,
	                x = self._x,
	                y = self._y,
	                xGroup = self._xGroup;
	
	            var bar = self.body.selectAll(".bar").data(self.dataTarget).enter().append("g").attr("class", "c9-chart-bar c9-custom-bar").attr("transform", function (d) {
	                return "translate(" + x(d[0].name) + ",0)";
	            });
	
	            var bars = bar.selectAll(".c9-custom-rect").data(function (d) {
	                return d;
	            });
	
	            bars.enter().append("rect").attr("class", "c9-custom-rect").style("fill", function (d, i) {
	                return d.color || color(i);
	            }).attr("x", function (d) {
	                return self.isGroup ? xGroup(d.group) : undefined;
	            }).attr("y", function (d) {
	                return y(d.y1);
	            }).attr("width", function (d) {
	                return self.isGroup ? xGroup.rangeBand() : x.rangeBand();
	            }).attr("height", function (d) {
	                return self.isLogaric ? y(y.domain()[0]) - y(d.y0) : y(0) - y(Math.abs(d.y0));
	            });
	        }
	
	        /**
	         * [updateLegendInteraction description]
	         * @param  {[type]} data          [description]
	         * @param  {[type]} groupNames    [description]
	         * @param  {[type]} groupNamesOld [description]
	         * @param  {[type]} newLabel      [description]
	         * @return {[type]}               [description]
	         */
	
	    }, {
	        key: 'updateLegendInteraction',
	        value: function updateLegendInteraction(data, groupNames, groupNamesOld, newLabel) {
	            var self = this;
	            var type = self.groupType;
	
	            var y = self.y;
	            var minMax = _C12.default.getMinMax(data, self.isGroup == false ? "stack" : null, self.isLogaric);
	            y.domain([minMax.min, minMax.max]);
	            self.axis.update(null, y, 750);
	
	            var xGroup = d3.scale.ordinal();
	            xGroup.domain(groupNames).rangeRoundBands([0, self.x.rangeBand()]);
	
	            var xGroupOld = d3.scale.ordinal();
	            xGroupOld.domain(groupNamesOld).rangeRoundBands([0, self.x.rangeBand()]);
	
	            var midGroup = undefined;
	            //check add new label in the middle
	            if (groupNames.length > groupNamesOld.length && 0 < groupNames.indexOf(newLabel) && groupNames.indexOf(newLabel) < groupNames.length - 1) midGroup = groupNamesOld[groupNames.indexOf(newLabel)];
	
	            // self.body.selectAll(".c9-custom-rect").transition().duration(750).attr("height", 0).remove();
	            self.body.selectAll(".c9-custom-rect").data([]).exit().remove();
	            self.body.selectAll(".c9-custom-bar").data([]).exit().remove();
	            var bar = self.body.selectAll(".c9-chart-bar.c9-custom-bar").data(data).enter().append("g").attr("class", "c9-chart-bar c9-custom-bar").attr("transform", function (d, i) {
	                return "translate(" + self.x(self.dataTarget[i][0].name) + ",0)";
	            });
	
	            var bars = bar.selectAll(".c9-custom-rect").data(function (d) {
	                return d;
	            });
	
	            bars.enter().append("rect").attr("class", "c9-custom-rect").style("fill", function (d) {
	                return d.color;
	            }).attr("x", function (d) {
	                // use for stack
	                if (!self.isGroup) return undefined;
	                // use for group
	                // group member positioning at the end of groups, so its x is the position of right edge of bar
	                if (groupNames.length > groupNamesOld.length && d.group == newLabel && groupNames.indexOf(newLabel) == groupNames.length - 1) return self.x.rangeBand();
	                return midGroup ? d.group == newLabel ? xGroupOld(midGroup) : xGroupOld(d.group) : xGroupOld(d.group);
	            }).attr("y", function (d) {
	                return self.isGroup ? y(d.y1) : self.isLogaric ? y(y.domain()[1]) : y(0);
	            }).attr("width", function (d) {
	                return !self.isGroup ? self.x.rangeBand() : d.group == newLabel ? 0 : xGroupOld.rangeBand();
	            }).attr("height", function (d) {
	                return self.isLogaric ? y(y.domain()[0]) - y(d.y0) : self.isGroup ? y(0) - y(Math.abs(d.y0)) : 0;
	            });
	
	            bars.transition().duration(750).attr("x", function (d) {
	                return !self.isGroup ? undefined : xGroup(d.group);
	            }).attr("width", function (d) {
	                return !self.isGroup ? self.x.rangeBand() : xGroup.rangeBand();
	            }).attr("y", function (d) {
	                return y(d.y1);
	            }).attr("height", function (d) {
	                return self.isLogaric ? y(y.domain()[0]) - y(d.y0) : y(0) - y(Math.abs(d.y0));
	            });
	
	            self.updateInteraction();
	        }
	
	        /**
	         * [Main draw function of Bar Chart]
	         * @return {[type]} [description]
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	            self.axis = new _C4.default(self.options.axis, self.body, self.dataTarget, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self.x, self.y);
	            var title = new _C6.default(self.options, self.body, self.width, self.height, self.margin);
	            var legend = new _C8.default(self.options.legend, self.body, self.dataTarget);
	
	            legend.draw();
	            legend.updateInteractionForBarChart(self);
	
	            self.updateInteraction();
	        }
	
	        /**
	         * Retrieve value from upper and lower bounds of each stack
	         * @param  {String} lower Lower bound of value
	         * @param  {String} upper Upper bound of value
	         * @return {String}       Value to return
	         */
	
	    }, {
	        key: 'retrieveValue',
	        value: function retrieveValue(lower, upper) {
	            var d1 = Math.floor(lower) === lower ? 0 : lower.toString().split(".")[1].length;
	            var d2 = Math.floor(upper) === upper ? 0 : upper.toString().split(".")[1].length;
	            return d1 > d2 ? (upper - lower).toFixed(d1) : (upper - lower).toFixed(d2);
	        }
	
	        /**
	         * Select all bars as type RECT in Bar Chart via its CLASS
	         */
	
	    }, {
	        key: 'selectAllBar',
	        value: function selectAllBar() {
	            var self = this;
	
	            return self.body.selectAll('.c9-custom-rect');
	        }
	
	        /**
	         * Update Interaction: Hover
	         * @return {} 
	         */
	
	    }, {
	        key: 'updateInteraction',
	        value: function updateInteraction() {
	            var self = this,
	                hoverEnable = self.hover.enable,
	                hoverOptions = self.hover.options,
	                selector = self.selectAllBar(),
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = self.click.callback;
	
	            var tooltip = new _C10.default(self.options.tooltip);
	
	            // Update Event Factory
	            self.eventFactory = {
	                'click': function click(d) {
	                    if (_C12.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, d);
	                    }
	                },
	                'mouseover': function mouseover(d) {
	                    if (!hoverEnable) return;
	
	                    if (_C12.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, d);
	                    }
	
	                    tooltip.draw(d, self, 'mouseover');
	                },
	                'mouseout': function mouseout(d) {
	                    if (!hoverEnable) return;
	
	                    if (_C12.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, d);
	                    }
	
	                    tooltip.draw(d, self, 'mouseout');
	                }
	            };
	
	            selector.on(self.eventFactory);
	        }
	
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {
	            _get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), 'on', this).call(this, eventType, callback);
	
	            var self = this;
	            var selector = self.selectAllBar();
	
	            // Update Event Factory
	            var eventFactory = {
	                'click.event': function clickEvent(d) {
	                    if (_C12.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseover.event': function mouseoverEvent(d) {
	                    if (_C12.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseout.event': function mouseoutEvent(d) {
	                    if (_C12.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                }
	            };
	
	            var eventName = eventType + '.event';
	
	            selector.on(eventName, eventFactory[eventName]);
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
	        key: 'colorRange',
	        get: function get() {
	            var color = this._colorRange;
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
	                this._colorRange = newBarColor;
	            }
	        }
	    }, {
	        key: 'groupType',
	        get: function get() {
	            return this._groupType;
	        },
	        set: function set(newGroupType) {
	            if (newGroupType) {
	                this._groupType = newGroupType;
	            }
	        }
	    }, {
	        key: 'x',
	        get: function get() {
	            return this._x;
	        },
	        set: function set(newX) {
	            if (newX) {
	                this._x = newX;
	            }
	        }
	    }, {
	        key: 'y',
	        get: function get() {
	            return this._y;
	        },
	        set: function set(newY) {
	            if (newY) {
	                this._y = newY;
	            }
	        }
	    }, {
	        key: 'xGroup',
	        get: function get() {
	            return this._xGroup;
	        },
	        set: function set(newXGroup) {
	            if (newXGroup) {
	                this._xGroup = newXGroup;
	            }
	        }
	    }, {
	        key: 'groupNames',
	        get: function get() {
	            return this._groupNames;
	        },
	        set: function set(newGroupNames) {
	            if (newGroupNames) {
	                this._groupNames = newGroupNames;
	            }
	        }
	    }, {
	        key: 'chartType',
	        get: function get() {
	            return this._body.type;
	        }
	    }, {
	        key: 'isGroup',
	        get: function get() {
	            return this._isGroup;
	        }
	    }]);
	
	    return BarChart;
	}(_C2.default);
	
	exports.default = BarChart;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
	var _C2 = _interopRequireDefault(_C);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	            hover: {
	                enable: true,
	                options: {
	                    template: '',
	                    onMouseOver: {
	                        fadeIn: 200,
	                        callback: function callback(data) {
	                            // console.dir(data);
	                        }
	                    },
	                    onMouseOut: {
	                        fadeOut: 500,
	                        callback: function callback(data) {
	                            // console.dir(data);
	                        }
	                    },
	                    onMouseMove: {
	                        callback: function callback(data) {
	                            // console.dir(data);
	                        }
	                    }
	                }
	            },
	
	            click: {
	                callback: function callback(data) {
	                    // console.dir(data);
	                }
	            },
	
	            // legend
	            legend: {
	                show: false,
	                position: "top",
	                size: 10,
	                textSize: "12px",
	                margin: [5, 5, 5, 5],
	                space: 10
	            },
	
	            // tooltip
	            tooltip: {
	                show: true,
	                position: 'left', // [top, right, bottom, left]
	                backgroundColor: 'rgba(0, 0, 0, 0.8)',
	                fontColor: '#fff',
	                format: null
	            },
	
	            // table 
	            table: {
	                container: "body",
	                show: true,
	                headings: ["Name", "Value"],
	                style: "default", // "strip", "border"
	                serial: true,
	                hover: {
	                    enable: true,
	                    callback: null
	                },
	                click: {
	                    enable: true,
	                    callback: null
	                }
	            },
	
	            // color range
	            colorRange: "category20",
	
	            // data
	            data: {
	                // ALL OPTIONS AVAILABLE IN DATA CONFIG
	                plain: [],
	                file: {
	                    type: null,
	                    url: null
	                },
	                keys: {
	                    name: "name",
	                    value: "value",
	                    time: "time"
	                },
	                groups: [],
	                stacks: []
	            },
	
	            axis: {
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
	            }
	        };
	
	        self._id = options.id || config.id;
	        self._width = options.width || config.width;
	        self._height = options.height || config.height;
	        self._colorRange = options.colorRange || config.colorRange;
	
	        self._margin = _C2.default.merge(options.margin, config.margin);
	        self._hover = _C2.default.merge(options.hover, config.hover);
	        self._click = _C2.default.merge(options.click, config.click);
	
	        // Main factory contains all interactions
	        self._eventFactory = null;
	
	        self._dataOption = _C2.default.merge(options.data, config.data);
	        self._dataTarget = null;
	
	        // Skeleton: 
	        // SVG
	        // ---BODY (g)
	        // -------BlaBla
	        self._svg = null;
	        self._body = null;
	        self._options = options;
	
	        self._options.table = _C2.default.merge(options.table, config.table);
	        self._options.tooltip = _C2.default.merge(options.tooltip, config.tooltip);
	        self._options.legend = _C2.default.merge(options.legend, config.legend);
	        self._options.axis = _C2.default.mergeDeep(config.axis, options.axis);
	
	        self.initConfig();
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Chart, [{
	        key: 'initConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        /**
	         * Init & Update Parent Chart Config
	         */
	        value: function initConfig() {
	            var margin = this.margin,
	                id = this.id,
	                width = this.width - margin.left - margin.right,
	                height = this.height - margin.top - margin.bottom;
	
	            this.container = d3.select(id);
	
	            this.svg = d3.select(id).append("svg").style('overflow', 'visible') // to overwrite overflow: hidden by Boostrap as default
	            .attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
	
	            this.body = this.svg.append("g").attr('class', 'c9-chart c9-custom-container').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	        }
	
	        /**
	         * Custom Event Listener
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {}
	
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: 'container',
	        get: function get() {
	            return this._container;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(newContainer) {
	            if (newContainer) {
	                this._container = newContainer;
	            }
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            return this._id;
	        },
	        set: function set(newId) {
	            if (newId) {
	                this._id = newId;
	            }
	        }
	    }, {
	        key: 'width',
	        get: function get() {
	            return this._width;
	        },
	        set: function set(newWidth) {
	            if (newWidth) {
	                this._width = newWidth;
	            }
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return this._height;
	        },
	        set: function set(newHeight) {
	            if (newHeight) {
	                this._height = newHeight;
	            }
	        }
	    }, {
	        key: 'actualWidth',
	        get: function get() {
	            return this._actualWidth;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._actualWidth = arg;
	            }
	        }
	    }, {
	        key: 'actualHeight',
	        get: function get() {
	            return this._actualHeight;
	        }
	
	        /**
	         * If colorRange is Array of color then scale range according to it
	         * If colorRange is a String like "category20", "category20b", etc. then scale using d3.scale.category
	         */
	        ,
	        set: function set(arg) {
	            if (arg) {
	                this._actualHeight = arg;
	            }
	        }
	    }, {
	        key: 'colorRange',
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
	        key: 'margin',
	        get: function get() {
	            return this._margin;
	        },
	        set: function set(newMargin) {
	            if (newMargin) {
	                this._margin = newMargin;
	            }
	        }
	    }, {
	        key: 'dataOption',
	        get: function get() {
	            return this._dataOption;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._dataOption = arg;
	            }
	        }
	    }, {
	        key: 'svg',
	        get: function get() {
	            return this._svg;
	        },
	        set: function set(newSvg) {
	            if (newSvg) {
	                this._svg = newSvg;
	            }
	        }
	    }, {
	        key: 'body',
	        get: function get() {
	            return this._body;
	        },
	        set: function set(newBody) {
	            if (newBody) {
	                this._body = newBody;
	            }
	        }
	    }, {
	        key: 'options',
	        get: function get() {
	            return this._options;
	        },
	        set: function set(newOptions) {
	            if (newOptions) {
	                this._options = newOptions;
	            }
	        }
	    }, {
	        key: 'hover',
	        get: function get() {
	            return this._hover;
	        },
	        set: function set(newHover) {
	            if (newHover) {
	                this._hover = newHover;
	            }
	        }
	    }, {
	        key: 'click',
	        get: function get() {
	            return this._click;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._click = arg;
	            }
	        }
	    }, {
	        key: 'dataTarget',
	        get: function get() {
	            return this._dataTarget;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._dataTarget = arg;
	            }
	        }
	    }, {
	        key: 'eventFactory',
	        get: function get() {
	            return this._eventFactory;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._eventFactory = arg;
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var Helper = {
	
	    each: function each(loopable, callback, self, reverse) {
	        // Check to see if null or undefined firstly.
	        var i, len;
	        if (self.isArray(loopable)) {
	            len = loopable.length;
	            if (reverse) {
	                for (i = len - 1; i >= 0; i--) {
	                    callback.call(self, loopable[i], i);
	                }
	            } else {
	                for (i = 0; i < len; i++) {
	                    callback.call(self, loopable[i], i);
	                }
	            }
	        } else if ((typeof loopable === 'undefined' ? 'undefined' : _typeof(loopable)) === 'object') {
	            var keys = Object.keys(loopable);
	            len = keys.length;
	            for (i = 0; i < len; i++) {
	                callback.call(self, loopable[keys[i]], keys[i]);
	            }
	        }
	    },
	
	    // setDefaultConfig: function() {
	    //     var self = this;
	
	    //     if (self.defaultConfig == null || self.defaultConfig === undefined) {
	    //         return;
	    //     } else {
	    //         self.lastConfig = self.merge(Chart._options, Chart);
	    //         self.each(self.lastConfig, function(value, index) {
	    //             // var prefixCfg = self.setPrefix(index);
	    //             self.setValue(self.lastConfig[index], index);
	    //         }, self);
	    //     }
	    // }
	
	    setValue: function setValue(value, key) {
	        var self = this;
	        self[key] = value;
	    },
	
	    setPrefix: function setPrefix(config) {
	        var constPrefix = '_';
	        if (config) {
	            return constPrefix + config;
	        }
	    },
	
	    isEmpty: function isEmpty(value) {
	        return value === null || value === undefined || Util.isArray(value) && value.length === 0 || Util.isArray(value) && Util.isEmpty(value[0]);
	    },
	
	    isObject: function isObject(object) {
	        return !Util.isEmpty(object) && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
	    },
	
	    isArray: function isArray(array) {
	        return !Util.isEmpty(array) && (Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]');
	    },
	
	    isFunction: function isFunction(func) {
	        return !Util.isEmpty(func) && typeof func === 'function';
	    },
	
	    merge: function merge(obj1, obj2) {
	        var obj3 = {};
	        for (var attrname in obj2) {
	            if (!Util.isEmpty(obj2[attrname])) obj3[attrname] = obj2[attrname];
	        }
	        for (var attrname in obj1) {
	            if (!Util.isEmpty(obj1[attrname])) obj3[attrname] = obj1[attrname];
	        }
	        return obj3;
	    },
	
	    mergeDeep: function mergeDeep(target, source) {
	        return _mergeDeep(target, source);
	    },
	
	    get: function get(_key, _data) {
	        var _keys = _key.split(".");
	        var _current = _data;
	        var self = this;
	
	        for (var i = 0, len = _keys.length; i < len; i++) {
	            var _fun = _keys[i].split("|");
	
	            if (_fun && _fun.length == 2) {
	                _keys[i] = _fun[0];
	                _fun = _fun[1];
	            } else {
	                _fun = null;
	            }
	
	            if ('undefined' == typeof _current[_keys[i]]) {
	                return '';
	            } else {
	                _current = _current[_keys[i]];
	            }
	
	            if (null !== _fun) {
	                _current = self.filter[_fun].call(this, _current);
	            }
	        }
	
	        return _current;
	    },
	
	    max: function max(arr) {
	        return Math.max.apply(Math, _toConsumableArray(arr));
	    },
	
	    min: function min(arr) {
	        return Math.min.apply(Math, _toConsumableArray(arr));
	    },
	
	    sum: function sum(arr) {
	        return arr.reduce(function (a, b) {
	            return a + b;
	        }, 0);
	    },
	
	    guid: function guid() {
	        return 'c9-xxxxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0,
	                v = c == 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    },
	
	    getMinMax: function getMinMax(data, type, isLogaric) {
	        var self = this;
	        var _temp = new Array();
	        var _min = 0,
	            _max = 0;
	        if (type == "stack") data.forEach(function (d) {
	            d.forEach(function (s) {
	                if (s.y0 > 0) _temp.push(s.y1);else _temp.push(s.y1 + s.y0);
	            });
	        });else data.forEach(function (d) {
	            d.forEach(function (s) {
	                _temp.push(s.y0);
	            });
	        });
	
	        var _newMin = self.min(_temp);
	        var _newMax = self.max(_temp);
	        if (_newMin < _min || isLogaric) _min = _newMin;
	        if (_newMax > _max) _max = _newMax;
	
	        return { min: _min, max: _max };
	    },
	    dateParser: function dateParser(format) {
	        return d3.time.format(format).parse;
	    },
	    dateFormatter: function dateFormatter(format) {
	        return d3.time.format(format);
	    },
	    // Convert color 'from' to 'to' (if any) in propotion of 'p'
	    // Use to lighten/darken specific color
	    shadeColor: function shadeColor(p, from, to) {
	        if (typeof p != "number" || p < -1 || p > 1 || typeof from != "string" || from[0] != 'r' && from[0] != '#' || typeof to != "string" && typeof to != "undefined") return null; //ErrorCheck
	        if (!this.sbcRip) this.sbcRip = function (d) {
	            var l = d.length,
	                RGB = new Object();
	            if (l > 9) {
	                d = d.split(",");
	                if (d.length < 3 || d.length > 4) return null; //ErrorCheck
	                RGB[0] = i(d[0].slice(4)), RGB[1] = i(d[1]), RGB[2] = i(d[2]), RGB[3] = d[3] ? parseFloat(d[3]) : -1;
	            } else {
	                if (l == 8 || l == 6 || l < 4) return null; //ErrorCheck
	                if (l < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + "" + d[4] : ""); //3 digit
	                d = i(d.slice(1), 16), RGB[0] = d >> 16 & 255, RGB[1] = d >> 8 & 255, RGB[2] = d & 255, RGB[3] = l == 9 || l == 5 ? r((d >> 24 & 255) / 255 * 10000) / 10000 : -1;
	            }
	            return RGB;
	        };
	        var i = parseInt,
	            r = Math.round,
	            h = from.length > 9,
	            h = typeof to == "string" ? to.length > 9 ? true : to == "c" ? !h : false : h,
	            b = p < 0,
	            p = b ? p * -1 : p,
	            to = to && to != "c" ? to : b ? "#000000" : "#FFFFFF",
	            f = sbcRip(from),
	            t = sbcRip(to);
	        if (!f || !t) return null; //ErrorCheck
	        if (h) return "rgb(" + r((t[0] - f[0]) * p + f[0]) + "," + r((t[1] - f[1]) * p + f[1]) + "," + r((t[2] - f[2]) * p + f[2]) + (f[3] < 0 && t[3] < 0 ? ")" : "," + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000 : t[3] < 0 ? f[3] : t[3]) + ")");else return "#" + (0x100000000 + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255) * 0x1000000 + r((t[0] - f[0]) * p + f[0]) * 0x10000 + r((t[1] - f[1]) * p + f[1]) * 0x100 + r((t[2] - f[2]) * p + f[2])).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
	    },
	    //smooth scroll c9 table
	    scroll: function scroll(element, to, duration) {
	        var self = this;
	        if (duration <= 0) return;
	        var difference = to - element.scrollTop;
	        var perTick = difference / duration * 10;
	
	        setTimeout(function () {
	            element.scrollTop = element.scrollTop + perTick;
	            if (element.scrollTop === to) return;
	            self.scroll(element, to, duration - 10);
	        }, 10);
	    }
	};
	
	var Util = {
	    isEmpty: function isEmpty(value) {
	        return value === null || value === undefined;
	    },
	
	    isArray: function isArray(array) {
	        return Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]';
	    },
	
	    isObject: function isObject(object) {
	        return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && !Array.isArray(object);
	    }
	};
	
	function _mergeDeep(target, source) {
	    if (Util.isObject(target) && Util.isObject(source)) {
	        for (var key in source) {
	            if (Util.isObject(source[key])) {
	                if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
	                _mergeDeep(target[key], source[key]);
	            } else {
	                Object.assign(target, _defineProperty({}, key, source[key]));
	            }
	        }
	    }
	    return target;
	}
	
	module.exports = Helper;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
	var _C2 = _interopRequireDefault(_C);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Axis = function () {
	    function Axis(options, body, data, width, height, x, y) {
	        _classCallCheck(this, Axis);
	
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
	
	        this._xShow = options.x.show || config.x.show;
	        this._xText = options.x.text || config.x.text;
	        this._yShow = options.y.show || (body.type == "timeline" ? false : config.y.show);
	        this._yText = options.y.text || config.y.text;
	        // this._isLogaricVariant     = options.isLogaric      || config.isLogaric;
	        this._xTick = options.x.tick || config.x.tick;
	        this._yTick = options.y.tick || config.y.tick;
	        this._xGrid = options.x.grid || config.x.grid;
	        this._yGrid = options.y.grid || config.y.grid;
	        this._xType = options.x.type || config.x.type;
	        this._yType = options.y.type || config.y.type;
	        this._x = x;
	        this._y = y;
	
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
	
	            var xScale = d3.time.scale().domain([options.starting, options.ending]).range([0, width]);
	            this._xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(this._xTick.format === undefined ? d3.time.format("%I %p") : this._xTick.format)
	            // .tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize)
	            .ticks(this._xTick.type, this._xTick.interval);
	            delete options.starting;
	            delete options.ending;
	        } else {
	
	            this._xAxis = d3.svg.axis().scale(this._x).orient("bottom").tickPadding(this._xTick.padding).ticks(this._xTick.count).tickValues(this._xTick.values.length > 0 ? this._xTick.values : undefined).tickFormat(this._xType == "timeseries" ? this._xTick.format || d3.time.format("%Y-%m-%d") : this._xTick.format ? this._xTick.format : undefined);
	
	            // In LOG scale, can't specify default number of ticks
	            // must be filter with tickFormat instead
	            // refer: https://github.com/d3/d3/wiki/Quantitative-Scales#log_ticks
	            if (this._isLogaricVariant) {
	                this._yAxis = d3.svg.axis().scale(this._y).orient("left").tickPadding(this._yTick.padding).ticks(this._yTick.count, this._yType == "timeseries" ? this._yTick.format || "%Y-%m-%d" : this._yTick.format ? this._yTick.format : undefined).tickValues(this._yTick.values.length > 0 ? this._yTick.values : undefined);
	            } else {
	                this._yAxis = d3.svg.axis().scale(this._y).orient("left").tickPadding(this._yTick.padding).ticks(this._yTick.count).tickValues(this._yTick.values.length > 0 ? this._yTick.values : undefined).tickFormat(this._yType == "timeseries" ? this._yTick.format || d3.time.format("%Y-%m-%d") : this._yTick.format ? this._yTick.format : undefined);
	            }
	        }
	
	        if (body.type != "timeline") {
	            // Grid
	            if (this._xGrid) {
	                // Select CURRENT svg container, to make this axis outside
	                // as a SEPARATED component, just like AXIS, of CHART
	                // d3.select(this._svg[0][0].parentNode)
	                this._xAxis.innerTickSize(-height).outerTickSize(0);
	            }
	
	            if (this._yGrid) {
	                // Select CURRENT svg container, to make this axis outside
	                // as a SEPARATED component, just like AXIS, of CHART
	                // d3.select(this._svg[0][0].parentNode)
	                this._yAxis.innerTickSize(-width).outerTickSize(0);
	            }
	        }
	
	        this._body = body;
	        this._data = data;
	        this._width = width; // TODO : ADD Getter/setter
	        this._height = height;
	
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
	        this._body.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(this._xAxis);
	        //draw tick
	        d3.select(".x.axis").selectAll("text").style("text-anchor", textAnchor(this._xTick.rotate)).attr("y", textY(this._xTick.rotate)).attr("x", 0).attr("dy", ".71em").attr("dx", textDx(this._xTick.rotate)).attr("transform", "rotate(" + this._xTick.rotate + ")");
	        //draw label
	        d3.select(".x.axis").append("text").attr("dx", "-.8em").attr("dy", "-.55em").attr("x", width + 20).attr("y", 10).style("text-anchor", "start").text(this._xText);
	
	        //hide x axis
	        if (!this._xShow) {
	            d3.select(".x.axis>.domain").style("display", "none");
	            if (!this._xGrid) d3.selectAll(".x.axis>g.tick>line").style("display", "none");
	        }
	
	        if (body.type != "timeline") {
	            this._body.append("g").attr("class", "y axis").call(this._yAxis);
	            d3.select(".y.axis").append("text").attr("y", -10).attr("dy", ".10").style("text-anchor", "end").text(this._yText);
	
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
	
	    _createClass(Axis, [{
	        key: 'update',
	        value: function update(x, y, duration) {
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
	
	    }, {
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
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Title = function () {
	    function Title(options, body, width, height, margin) {
	        _classCallCheck(this, Title);
	
	        var config = {
	            titleShow: true,
	            titleText: "Sample Chart",
	            titlePosition: 'top',
	            titleSize: "14px"
	        };
	
	        this._titleShow = options.titleShow || config.titleShow;
	        this._titleText = options.titleText || config.titleText;
	        this._titlePosition = options.titlePosition || config.titlePosition;
	        this._titleSize = options.titleSize || config.titleSize;
	
	        this._body = body;
	
	        if (this._titleShow) {
	            var self = this;
	            // Select CURRENT body container, to make this axis outside
	            // as a SEPARATED component, just like AXIS, of CHART
	            var text = d3.select(self._body[0][0].parentNode).append("g").attr('class', 'c9-custom-title c9-custom-title-container').append("text").attr("class", "c9-custom-title c9-custom-title-text");
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
	var _C2 = _interopRequireDefault(_C);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Legend = function () {
	    function Legend(options, body, data) {
	        _classCallCheck(this, Legend);
	
	        var config = {
	            show: false,
	            position: "top",
	            box: false,
	            size: 10,
	            textSize: "12px",
	            margin: [5, 5, 5, 5],
	            space: 10
	        };
	
	        var self = this;
	
	        self._show = options.show ? options.show : config.show;
	        self._textSize = options.textSize || config.textSize;
	        self._position = options.position || config.position;
	        self._size = options.size || config.size;
	        self._box = options.box || config.box;
	        self._margin = options.margin || config.margin;
	        self._space = options.space || config.space;
	        // self._legendStyle        = options.legendStyle      || config.legendStyle;
	
	        self._options = options;
	        self._body = body;
	        self._maxWidth = d3.select(body[0][0].parentNode).attr('width');
	        self._maxHeight = d3.select(body[0][0].parentNode).attr('height');
	        // self._color     = color;
	        self._data = data;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Legend, [{
	        key: "draw",
	
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function draw() {
	            var self = this;
	
	            if (self.show) {
	                // var color = self.color;
	                // TODO: Remove these conditional checks by getData for general purposes
	                var domain = [];
	
	                if (self._body.type == "bar") {
	                    self.data = self.data[self.data.reduce(function (p, c, i, a) {
	                        return a[p].length > c.length ? p : i;
	                    }, 0)];
	                } else if (self._body.type == "line") {
	                    self.data = d3.nest().key(function (d) {
	                        return d.name;
	                    }).entries(self.data);
	                    self.data.forEach(function (d) {
	                        d.color = d.values[0].color;
	                    });
	                }
	
	                // Legend will be appended in main SVG container
	                var container = d3.select(self._body[0][0].parentNode).append("g").attr("class", "c9-custom-legend c9-custom-legend-container");
	
	                // var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();
	
	                self.item = container.selectAll("g.c9-custom-legend.c9-custom-legend-item")
	                // .data(color.domain())
	                .data(self.data).enter().append("g").attr("class", "c9-custom-legend c9-custom-legend-item").attr('data-ref', function (d) {
	                    return d['data-ref'];
	                }).attr('data-enable', function (d) {
	                    return d['enable'];
	                });
	
	                self.item.append('rect').attr('class', 'c9-custom-legend c9-custom-legend-rect').attr('width', self.size).attr('height', self.size).attr('r', self.size).attr('fill', function (d) {
	                    return d.color;
	                }).attr('stroke', function (d) {
	                    return d.color;
	                });
	
	                self.item.append('rect').attr('width', 5).attr('height', self.size).attr('x', self.size).attr('y', 0).attr('opacity', 0);
	
	                self.item.append('text').attr('class', 'c9-custom-legend c9-custom-legend-text').attr('x', self.size + 5).attr('y', self.size).style('font-size', self.textSize)
	                // .attr('text-anchor', 'middle')
	                .text(function (d) {
	                    return self._body.type == "bar" ? d.group : d.name || d.key;
	                });
	
	                //caculate position for legend
	                var getSize = function getSize(item) {
	                    return item.getBoundingClientRect();
	                };
	                var getXY = function getXY(item) {
	                    var xy = d3.select(item).attr('transform').split(',');return { x: parseFloat(xy[0].replace('translate(', '')), y: parseFloat(xy[1].replace(')', '')) };
	                };
	                var r = 0; // current row
	                var items = d3.selectAll(".c9-custom-legend-item")[0];
	                var itemHeight = getSize(items[0]).height;
	                var numItemsCol = Math.floor((self._maxHeight - self.margin[0] - self.margin[2]) / (itemHeight + self.space));
	                if (self.space > itemHeight) numItemsCol++;
	                var maxWidthCol = new Array(Math.floor(items.length / numItemsCol));
	
	                items.forEach(function (i, n) {
	                    var pos = Math.floor(n / numItemsCol);
	                    var width = getSize(i).width;
	                    if (maxWidthCol[pos] == undefined || width > maxWidthCol[pos]) maxWidthCol[pos] = width;
	                });
	
	                if (self.position == "bottom") {
	                    /************ BOTTOM ***************/
	                    self.item.attr("transform", function (d, i) {
	                        if (i > 0) {
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.space + getSize(item).width + self.margin[1]) / self._maxWidth);
	                            if (newR > 0) r++;
	                            return "translate(" + (newR > 0 ? self.margin[3] : getXY(preItem).x + getSize(preItem).width + self.space) + "," + (self._maxHeight - self.margin[0] - itemHeight - r * (itemHeight + self.space)) + ")";
	                        } else return "translate(" + self.margin[3] + "," + (self._maxHeight - self.margin[0] - itemHeight) + ")";
	                    });
	                } else if (self.position == "left") {
	                    /************ LEFT ***************/
	                    self.item.attr("transform", function (d, i) {
	                        var pos = Math.floor(i / numItemsCol);
	
	                        if (i > 0) {
	                            var prePos = Math.floor((i - 1) / numItemsCol);
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            return "translate(" + (pos > prePos ? maxWidthCol[pos] + self.space + getXY(preItem).x : getXY(preItem).x) + "," + (pos > prePos ? self.margin[0] : getXY(preItem).y + getSize(preItem).height + self.space) + ")";
	                        } else return "translate(" + self.margin[3] + "," + self.margin[0] + ")";
	                    });
	                } else if (self.position == "right") {
	                    /************ RIGHT ***************/
	                    self.item.attr("transform", function (d, i) {
	                        var pos = Math.floor(i / numItemsCol);
	                        if (i > 0) {
	                            var prePos = Math.floor((i - 1) / numItemsCol);
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            return "translate(" + (pos > prePos ? getXY(preItem).x - self.space - maxWidthCol[pos] : getXY(preItem).x) + "," + (pos > prePos ? self.margin[0] : getXY(preItem).y + getSize(preItem).height + self.space) + ")";
	                        } else return "translate(" + (self._maxWidth - self.margin[3] - maxWidthCol[pos]) + "," + self.margin[0] + ")";
	                    });
	                } else {
	                    /************ TOP ***************/
	                    self.item.attr("transform", function (d, i) {
	                        if (i > 0) {
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.space + getSize(item).width + self.margin[1]) / self._maxWidth);
	                            if (newR > 0) r++;
	                            return "translate(" + (newR > 0 ? self.margin[3] : getXY(preItem).x + getSize(preItem).width + self.space) + "," + (self.margin[0] + r * (itemHeight + self.space)) + ")";
	                        } else return "translate(" + self.margin[3] + "," + self.margin[0] + ")";
	                    });
	                }
	
	                // if (self._legendBox && legendDomain.length > 0) {
	                //     var box = legendContainer[0][0].getBBox();
	                //     legendBox.attr("class", ".c9-custom-legend.c9-custom-legend-box")
	                //         .attr("x", 0)
	                //         .attr("y", 0)
	                //         .attr("width", box.width + self._legendMargin[1] + self._legendMargin[3])
	                //         .attr("height", box.height + self._legendMargin[2] + self._legendMargin[0])
	                //         .style("fill", "none")
	                //         .style("stroke", color);
	                // }
	            }
	        }
	
	        /**
	         * Update interaction event dispatchers for legend
	         * For: Donut Chart, Pie Chart
	         */
	
	    }, {
	        key: "updateInteractionForLineChart",
	        value: function updateInteractionForLineChart(chart) {
	
	            var self = this;
	
	            var hoverOptions = chart.hover.options,
	                hoverEnable = chart.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = chart.click.callback;
	
	            self.itemEventFactory = {
	
	                'click': function click(item) {
	                    if (_C2.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, item);
	                    }
	
	                    var selector = d3.select(this);
	                    var enable = true,
	                        dataSet = self.data;
	                    var totalEnable = d3.sum(dataSet.map(function (d) {
	                        return d.enable ? 1 : 0;
	                    }));
	
	                    // Add pointer to cursor
	                    selector.style('cursor', 'pointer');
	
	                    // If current selector is disabled, then turn it on back
	                    // Else, set enable to false
	                    if (selector.style('opacity') == '0.1') {
	                        selector.style('opacity', '1.0');
	                    } else {
	                        if (totalEnable < 2) return;
	                        selector.style('opacity', '0.1');
	                        enable = false;
	                    }
	                },
	
	                'mouseover': function mouseover(item) {
	                    if (_C2.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	                },
	
	                'mouseout': function mouseout(item) {
	                    if (_C2.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	
	                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");
	                }
	
	            };
	
	            if (self.show) self.item.on(self.itemEventFactory);
	        }
	
	        /**
	         * Update interaction event dispatchers for legend
	         * For: Donut Chart, Pie Chart
	         */
	
	    }, {
	        key: "updateInteractionForDonutPieChart",
	        value: function updateInteractionForDonutPieChart(chart, path, pie, currentData, arc) {
	
	            var self = this;
	
	            var hoverOptions = chart.hover.options,
	                hoverEnable = chart.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = chart.click.callback;
	
	            var chartType = chart.chartType;
	
	            var chartInnerBefore = chartType == 'pie' ? 0 : chart.innerRadius,
	                chartOuterBefore = chartType == 'pie' ? chart.radius : chart.outerRadius,
	                chartInnerAfter = chartType == 'pie' ? 0 : chart.innerRadius,
	                chartOuterAfter = chartType == 'pie' ? chart.radius * 1.2 : chart.outerRadius * 1.2;
	
	            self.itemEventFactory = {
	
	                'click': function click(item) {
	                    if (_C2.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, item);
	                    }
	
	                    var selector = d3.select(this);
	                    var enable = true,
	                        dataSet = self.data;
	                    var totalEnable = d3.sum(dataSet.map(function (d) {
	                        return d.enable ? 1 : 0;
	                    }));
	
	                    // Add pointer to cursor
	                    selector.style('cursor', 'pointer');
	
	                    // If current selector is disabled, then turn it on back
	                    // Else, set enable to false
	                    if (selector.attr('data-enable') == 'false') {
	                        selector.attr('data-enable', true);
	                        selector.attr('opacity', '1.0');
	                    } else {
	                        if (totalEnable < 2) return;
	                        selector.attr('data-enable', false);
	                        selector.attr('opacity', '0.1');
	                        enable = false;
	                    }
	
	                    /*----------  Reset opacity after click  ----------*/
	
	                    self.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    chart.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	                    /*----------  End Reset opacity after click  ----------*/
	
	                    chart.pie.value(function (d) {
	                        if (d.name == item.name) d.enable = enable;
	                        return d.enable ? d.value : 0;
	                    });
	
	                    path = path.data(chart.pie(dataSet));
	
	                    path.transition().duration(500).attrTween('d', function (d) {
	                        var interpolate = d3.interpolate(chart.currentData, d);
	                        // Returns an interpolator between the two arbitrary values a and b. 
	                        // The interpolator implementation is based on the type of the end value b.
	                        chart.currentData = interpolate(0);
	                        return function (t) {
	                            return arc(interpolate(t));
	                        };
	                    })
	                    // Remove stroke when re-draw arcs to avoid duplicate strokes
	                    .attr('stroke', 'none');;
	                },
	
	                'mouseover': function mouseover(item) {
	                    if (_C2.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	
	                    if (legendSelector.attr('data-enable') == 'true') {
	                        // For Legend
	                        self.item.each(function () {
	                            if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                                d3.select(this).attr('opacity', '0.3');
	                            }
	                        });
	
	                        // For Chart
	                        chart.selectAllPath().each(function () {
	                            if (d3.select(this).attr('data-ref') !== item['data-ref']) {
	                                d3.select(this).attr('opacity', '0.3');
	                            }
	                        });
	
	                        var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");
	
	                        selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter));
	                    }
	                },
	
	                'mouseout': function mouseout(item) {
	                    if (_C2.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	
	                    // if (legendSelector.attr('data-enable') == 'true') {
	                    // For Legend
	                    self.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    // For Chart
	                    chart.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");
	
	                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore));
	                    // }
	
	                }
	
	            };
	
	            if (self.show) self.item.on(self.itemEventFactory);
	        }
	
	        /**
	         * Update interaction for barchart
	         * @param  {[type]} chart       [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: "updateInteractionForBarChart",
	        value: function updateInteractionForBarChart(chart) {
	
	            var self = this;
	
	            var hoverOptions = chart.hover.options,
	                hoverEnable = chart.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = chart.click.callback;
	
	            self.itemEventFactory = {
	
	                'click': function click(item) {
	                    if (_C2.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, item);
	                    }
	
	                    var selector = d3.select(this);
	                    var enable = true,
	                        dataBackup = chart.dataTarget,
	                        dataSet = self.data;
	                    var totalEnable = d3.sum(dataSet.map(function (d) {
	                        return d.enable ? 1 : 0;
	                    }));
	
	                    var enableSet = [];
	                    var enableSetOld = [];
	                    var data = [];
	                    // Add pointer to cursor
	                    selector.style('cursor', 'pointer');
	
	                    // If current selector is disabled, then turn it on back
	                    // Else, set enable to false
	                    if (selector.attr('data-enable') == 'false') {
	                        selector.attr('data-enable', 'true');
	                        selector.style('opacity', '1.0');
	                    } else {
	                        if (totalEnable < 2) return;
	                        selector.attr('data-enable', 'false');
	                        selector.style('opacity', '0.1');
	                        enable = false;
	                    }
	
	                    //set current data for legend
	                    self.data.forEach(function (d, i) {
	                        if (d.enable) enableSetOld.push(d.group);
	                        if (d.group == item.group) d.enable = enable;
	                        if (d.enable) enableSet.push(d.group);
	                    });
	
	                    dataBackup.forEach(function (d) {
	                        var negElement = [];
	                        var posElement = [];
	                        d.forEach(function (s) {
	                            enableSet.forEach(function (e, i) {
	                                if (e == s.group) {
	                                    if (s.y0 < 0) negElement.push({ e: s, s: i });else posElement.push({ e: s, s: i });
	                                }
	                            });
	                        });
	                        if (!chart.isGroup) {
	                            if (negElement.length > 0) {
	                                if (negElement[0].e.y1 < 0) negElement[0].e.y1 = 0;
	                                for (var i = 1; i < negElement.length; i++) {
	                                    negElement[i].e.y1 = negElement[i - 1].e.y1 + negElement[i - 1].e.y0;
	                                };
	                            }
	                            if (posElement.length > 0) {
	                                if (posElement[0].e.y1 - posElement[0].e.y0 != 0) posElement[0].e.y1 = posElement[0].e.y0;
	                                for (var i = 1; i < posElement.length; i++) {
	                                    posElement[i].e.y1 = posElement[i - 1].e.y1 + posElement[i].e.y0;
	                                };
	                            }
	                        }
	                        var element = new Array(negElement.length + posElement.length);
	                        for (var i = 0; i < negElement.length; i++) {
	                            element[negElement[i].s] = negElement[i].e;
	                        };
	                        for (var i = 0; i < posElement.length; i++) {
	                            element[posElement[i].s] = posElement[i].e;
	                        };
	                        data.push(element);
	                    });
	
	                    chart.updateLegendInteraction(data, enableSet, enableSetOld, item.group);
	                },
	
	                'mouseover': function mouseover(item) {
	                    var selector = d3.select(this);
	                    selector.style('cursor', 'pointer');
	                    if (selector.attr('data-enable') == 'true') d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
	                        return d.group != item.group;
	                    }).attr('opacity', 0.3);
	                },
	
	                'mouseout': function mouseout(item) {
	                    d3.select(this).style('cursor', 'pointer');
	                    d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
	                        return d.group != item.group;
	                    }).attr('opacity', 1);
	                }
	
	            };
	            if (self.show) self.item.on(self.itemEventFactory);
	        }
	    }, {
	        key: "setYLocation",
	        value: function setYLocation(height, margin) {
	            if (this.position === 'top') {
	                return margin.top / 2;
	            } else if (this.position === 'bottom') {
	                return height - margin.bottom / 2;
	            }
	        }
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: "data",
	        get: function get() {
	            return this._data;
	        },
	
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._data = arg;
	            }
	        }
	    }, {
	        key: "body",
	        get: function get() {
	            return this._body;
	        }
	    }, {
	        key: "color",
	        get: function get() {
	            return this._color;
	        }
	    }, {
	        key: "show",
	        get: function get() {
	            return this._show;
	        }
	    }, {
	        key: "text",
	        get: function get() {
	            return this._text;
	        },
	        set: function set(newText) {
	            if (newText) {
	                this._text = newText;
	            }
	        }
	    }, {
	        key: "position",
	        get: function get() {
	            return this._position;
	        },
	        set: function set(newPosition) {
	            if (newPosition) {
	                this._position = newPosition;
	            }
	        }
	    }, {
	        key: "size",
	        get: function get() {
	            return this._size;
	        },
	        set: function set(newSize) {
	            if (newSize) {
	                this._size = newSize;
	            }
	        }
	    }, {
	        key: "margin",
	        get: function get() {
	            return this._margin;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._margin = arg;
	            }
	        }
	    }, {
	        key: "space",
	        get: function get() {
	            return this._space;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._space = arg;
	            }
	        }
	    }, {
	        key: "textSize",
	        get: function get() {
	            return this._textSize;
	        }
	    }, {
	        key: "item",
	        get: function get() {
	            return this._item;
	        },
	        set: function set(newItem) {
	            if (newItem) {
	                this._item = newItem;
	            }
	        }
	    }, {
	        key: "domain",
	        get: function get() {
	            return this._domain;
	        },
	        set: function set(newDomain) {
	            if (newDomain) {
	                this._domain = newDomain;
	            }
	        }
	    }, {
	        key: "itemEventFactory",
	        get: function get() {
	            return this._itemEventFactory;
	        },
	        set: function set(newItemEventFactory) {
	            if (newItemEventFactory) {
	                this._itemEventFactory = newItemEventFactory;
	            }
	        }
	    }]);
	
	    return Legend;
	}();
	
	exports.default = Legend;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
	var _C2 = _interopRequireDefault(_C);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tooltip = function () {
	    function Tooltip(options) {
	        _classCallCheck(this, Tooltip);
	
	        var self = this;
	
	        var config = {
	            show: true,
	            position: 'left', // [top, right, bottom, left]
	            backgroundColor: 'rgba(0, 0, 0, 0.8)',
	            fontColor: '#fff',
	            fontSize: '11px'
	        };
	
	        self._show = options.show || config.show;
	        self._position = options.position || config.position;
	        self._backgroundColor = options.backgroundColor || config.backgroundColor;
	        self._fontColor = options.fontColor || config.fontColor;
	        self._fontSize = options.fontSize || config.fontSize;
	
	        self._options = options;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Tooltip, [{
	        key: 'draw',
	
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	
	        /**
	         * [draw description]
	         * @return {[type]} [description]
	         */
	        value: function draw(data, chart, eventType) {
	            var self = this;
	
	            var format = self.format;
	
	            // First of all, remove all exisiting tooltips
	            d3.select(chart.id).selectAll('.c9-custom-tooltip-container').remove();
	
	            var selector = d3.select(chart.id);
	
	            // TODO: Add margin to tooltip configs
	            // Default: (100, 100) relative to mouse coordinate and chart margin transformation
	            var divOnHover = selector.append('div').attr('class', function () {
	                return 'c9-custom-tooltip-container ' + self.getTriangleClass();
	            })
	            // .attr("transform", function() { return 'translate(' + (d3.mouse(this)[0] - 100) +","+ (d3.mouse(this)[1] - 100) + ')'; })
	            .style('display', 'none').style('position', 'absolute').style('pointer-events', 'all').style('background-color', self.backgroundColor).style('color', self.fontColor).style('font-size', self.fontSize);
	            // .style('width', '100px')
	            // .style('height', '50px')
	            // .html(function() {
	            //     return self.getFormatByChartType(chart, data);
	            // });
	
	            self.eventFactory = {
	
	                'mouseover': function mouseover(_data) {
	                    divOnHover.html(function () {
	                        return self.getFormatByChartType(chart, _data);
	                    }).transition()
	                    // .style('left', function() {return d3.mouse(this)[0] + 'px';})
	                    .style('left', function () {
	                        return self.getCoordinate()['left'];
	                    })
	                    // .style('top', function() {return d3.mouse(this)[1]  + 'px';})
	                    .style('top', function () {
	                        return self.getCoordinate()['top'];
	                    }).duration(200).style("display", 'block').style('pointer-events', 'none');
	                },
	
	                'mousemove': function mousemove(_data) {
	                    divOnHover.html(function () {
	                        return self.getFormatByChartType(chart, _data);
	                    }).transition()
	                    // .style('left', function() {return d3.mouse(this)[0] + 'px';})
	                    .style('left', function () {
	                        return self.getCoordinate()['left'];
	                    })
	                    // .style('top', function() {return d3.mouse(this)[1]  + 'px';})
	                    .style('top', function () {
	                        return self.getCoordinate()['top'];
	                    }).duration(200).style("display", 'block').style('pointer-events', 'none');
	                },
	
	                'mouseout': function mouseout(_data) {
	                    divOnHover.transition().duration(200).style('display', 'none');
	                }
	
	            };
	
	            if (self.show) {
	
	                switch (eventType) {
	                    case 'mouseover':
	                        self.eventFactory.mouseover(data);
	                        break;
	                    case 'mouseout':
	                        self.eventFactory.mouseout(data);
	                        break;
	                    case 'mousemove':
	                        self.eventFactory.mousemove(data);
	                        break;
	                }
	            }
	        }
	    }, {
	        key: 'getTriangleClass',
	        value: function getTriangleClass() {
	            var self = this;
	            var r = void 0;
	
	            switch (self.position) {
	                case 'top':
	                    r = 'c9-tooltip-top';
	                    break;
	                case 'right':
	                    r = 'c9-tooltip-right';
	                    break;
	                case 'bottom':
	                    r = 'c9-tooltip-bottom';
	                    break;
	                case 'left':
	                    r = 'c9-tooltip-left';
	                    break;
	            }
	            return r;
	        }
	    }, {
	        key: 'setDefaultFormatByChartType',
	        value: function setDefaultFormatByChartType(chart, data) {
	            // if (Helper.isEmpty(data)) { console.log(data);return false;}
	            var self = this;
	
	            var chartType = chart.body.type,
	                format = void 0;
	
	            switch (chartType) {
	                case 'bar':
	                    format = function format(data) {
	                        return '<strong>' + data.name + '</strong>' + '<br><span>' + chart.retrieveValue(data.y0, data.y1) + '</span>';
	                    };
	                    break;
	                case 'pie':
	                    format = function format(data) {
	                        return '<strong>' + data.data.name + '</strong>' + '<br><span>' + data.data.value + '</span>';
	                    };
	                    break;
	                case 'donut':
	                    format = function format(data) {
	                        return '<strong>' + data.data.name + '</strong>' + '<br><span>' + data.data.value + '</span>';
	                    };
	                    break;
	                case 'line':
	                    format = function format(data) {
	                        var _format = '';
	                        data.forEach(function (d, i) {
	                            _format += '<strong>' + d.name + '</strong>' + '<br><span> Value X: ' + d.valueX + '</span>' + '<br><span> Value Y: ' + d.valueY + '</span><br>';
	                        });
	                        return _format;
	                    };
	                    break;
	                case 'timeline':
	                    format = function format(data) {
	                        return '<strong>' + data.name + '</strong>' + '<br><span>' + data.start, data.end + '</span>';
	                    };
	                    break;
	            }
	
	            // Update format for tooltip based on chart type
	            self.format = self.options.format || format;
	            // console.log(self.format);
	        }
	    }, {
	        key: 'getCoordinate',
	        value: function getCoordinate() {
	            var self = this;
	            var r = void 0;
	
	            switch (self.position) {
	                case 'top':
	                    r = {
	                        'left': d3.event.pageX - 50 + 'px',
	                        'top': d3.event.pageY - 50 + 'px'
	                    };
	                    break;
	                case 'right':
	                    r = {
	                        'left': d3.event.pageX - 50 + 'px',
	                        'top': d3.event.pageY - 50 + 'px'
	                    };
	                    break;
	                case 'bottom':
	                    r = {
	                        'left': d3.event.pageX - 50 + 'px',
	                        'top': d3.event.pageY + 50 + 'px'
	                    };
	                    break;
	                case 'left':
	                    r = {
	                        'left': d3.event.pageX + 50 + 'px',
	                        'top': d3.event.pageY - 50 + 'px'
	                    };
	                    break;
	            }
	            return r;
	        }
	    }, {
	        key: 'getFormatByChartType',
	        value: function getFormatByChartType(chart, data) {
	            var self = this;
	
	            self.setDefaultFormatByChartType(chart, data);
	
	            var r = self.format(data);
	
	            return r;
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: 'show',
	        get: function get() {
	            return this._show;
	        },
	
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._show = arg;
	            }
	        }
	    }, {
	        key: 'position',
	        get: function get() {
	            return this._position;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._position = arg;
	            }
	        }
	    }, {
	        key: 'backgroundColor',
	        get: function get() {
	            return this._backgroundColor;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._backgroundColor = arg;
	            }
	        }
	    }, {
	        key: 'fontColor',
	        get: function get() {
	            return this._fontColor;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._fontColor = arg;
	            }
	        }
	    }, {
	        key: 'fontSize',
	        get: function get() {
	            return this._fontSize;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._fontSize = arg;
	            }
	        }
	    }, {
	        key: 'format',
	        get: function get() {
	            return this._format;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._format = arg;
	            }
	        }
	    }, {
	        key: 'eventFactory',
	        get: function get() {
	            return this._eventFactory;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._eventFactory = arg;
	            }
	        }
	    }, {
	        key: 'options',
	        get: function get() {
	            return this._options;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._options = arg;
	            }
	        }
	    }]);
	
	    return Tooltip;
	}();
	
	exports.default = Tooltip;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
	var _C2 = _interopRequireDefault(_C);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataAdapter = function () {
	    function DataAdapter(options) {
	        _classCallCheck(this, DataAdapter);
	
	        var self = this;
	
	        var config = {
	            // ALL OPTIONS AVAILABLE IN DATA CONFIG
	            keys: {
	                name: "name",
	                value: "value",
	                x: "value.x",
	                y: "value"
	            },
	            groups: [],
	            stacks: [],
	            timeFormat: false,
	
	            // NO NEED TO ADD TO DATA OPTIONS
	            // Just use to define default parameters
	            colorRange: null
	        };
	
	        self._keys = _C2.default.merge(options.keys, config.keys);
	        self._groups = options.groups || config.groups;
	        self._stacks = options.stacks || config.stacks;
	        self._timeFormat = options.timeFormat || config.timeFormat;
	        self._colorRange = options.colorRange || config.colorRange;
	
	        self._dataSource = null;
	        self._dataTarget = []; // Initialize new Array to use Array methods
	        self._dataRefs = [];
	        self.initDataSource(options);
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(DataAdapter, [{
	        key: "initDataSource",
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function initDataSource(options) {
	            var self = this;
	
	            if (self.hasPlainData(options)) {
	                self.executePlainData(options);
	            } else if (self.hasFile(options)) {
	                self.executeFile(options);
	            }
	        }
	    }, {
	        key: "hasPlainData",
	        value: function hasPlainData(options) {
	            return options.plain && _C2.default.isArray(options.plain);
	        }
	    }, {
	        key: "hasFile",
	        value: function hasFile(options) {
	            return options.file && _C2.default.isObject(options.file);
	        }
	    }, {
	        key: "executePlainData",
	        value: function executePlainData(options) {
	            var self = this;
	
	            self._dataSource = options.plain;
	        }
	    }, {
	        key: "executeFile",
	        value: function executeFile(options) {
	            var self = this;
	
	            self._file = _C2.default.merge(options.file, config.file);
	
	            if (self._file && self._file.type) {
	
	                switch (self._file.type) {
	                    case "csv":
	                        self._dataSource = self.getCsv();
	                        break;
	                    case "tsv":
	                        self._dataSource = self.getTsv();
	                        break;
	                    case "text":
	                        self._dataSource = self.getText();
	                        break;
	                    case "json":
	                        self._dataSource = self.getJson();
	                        break;
	                    case "xml":
	                        self._dataSource = self.getXml();
	                        break;
	                    case "xhr":
	                        self._dataSource = self.getJson();
	                        break;
	                    default:
	                        self._dataSource = self.getJson();
	                        break;
	                }
	            }
	        }
	    }, {
	        key: "getDataTypeForBarChart",
	        value: function getDataTypeForBarChart() {
	            var self = this;
	
	            if (!_C2.default.isEmpty(self.groups) && _C2.default.isArray(self.groups)) {
	                return "group";
	            } else if (!_C2.default.isEmpty(self.stacks) && _C2.default.isArray(self.stacks)) {
	                return "stack";
	            }
	
	            return "single";
	        }
	    }, {
	        key: "getDataTarget",
	        value: function getDataTarget(chartType) {
	            var self = this;
	
	            switch (chartType) {
	                case "bar":
	                    return self.getDataTargetForBarChart();
	                    break;
	
	                case "line":
	                    return self.getDataTargetForLineChart();
	                    break;
	
	                case "pie":
	                    return self.getDataTargetForPieChart();
	                    break;
	
	                case "donut":
	                    return self.getDataTargetForDonutChart();
	                    break;
	
	                case "timeline":
	                    return self.getDataTargetForTimelineChart();
	                    break;
	                default:
	                    return self.dataSource;
	                    break;
	            }
	        }
	    }, {
	        key: "getName",
	        value: function getName(v) {
	            return v.name;
	        }
	    }, {
	        key: "getValue",
	        value: function getValue(v) {
	            var self = this;
	
	            return _C2.default.get(self.keys, v);
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	        /*=================================================
	        =            Normalize Data For Charts            =
	        =================================================*/
	
	    }, {
	        key: "getDataTargetForBarChart",
	        value: function getDataTargetForBarChart() {
	            var self = this;
	
	            switch (self.getDataTypeForBarChart()) {
	                case "single":
	                    self.dataSource.forEach(function (data, index) {
	                        var _stack = [];
	                        var _data = {
	                            "max": _C2.default.get(self.keys.value, data),
	                            "stack": [{
	                                "name": _C2.default.get(self.keys.name, data),
	                                "y0": 0,
	                                "y1": _C2.default.get(self.keys.value, data),
	                                "enable": true
	                            }]
	                        };
	                        self.dataTarget.push(_data);
	                    });
	
	                    return self.dataTarget;
	                    break;
	
	                case "group":
	                    var groups = self.groups;
	
	                    // Iterate over each group
	                    self.dataSource.forEach(function (data, index) {
	                        var _dsArray = _C2.default.get(self.keys.value, data);
	
	                        var _stack = [],
	                            _stackItem = {
	                            "color": "#ffffff",
	                            "y0": 0,
	                            "y1": 1,
	                            "group": "",
	                            "name": "",
	                            "data-ref": "",
	                            "enable": true
	                        },
	                            color = self.colorRange;
	
	                        // Iterate each single bar in a group
	                        if (_C2.default.isArray(_dsArray)) {
	                            _dsArray.forEach(function (d, i) {
	                                _stackItem = {
	                                    "color": color(i),
	                                    "y0": d,
	                                    "y1": d > 0 ? d : 0,
	                                    "group": groups[i] || i,
	                                    "name": _C2.default.get(self.keys.name, data),
	                                    "data-ref": _C2.default.guid(),
	                                    "enable": true
	                                };
	                                _stack.push(_stackItem);
	                            });
	                        } else {
	                            _stackItem = {
	                                "color": color(0),
	                                "y0": _dsArray,
	                                "y1": _dsArray > 0 ? _dsArray : 0,
	                                "group": groups[0] || 0,
	                                "name": _C2.default.get(self.keys.name, data),
	                                "data-ref": _C2.default.guid(),
	                                "enable": true
	                            };
	                            _stack.push(_stackItem);
	                        }
	
	                        self.dataTarget.push(_stack);
	                    });
	
	                    return self.dataTarget;
	                    break;
	
	                case "stack":
	                    var stacks = self.stacks;
	
	                    // Iterate over each group
	                    self.dataSource.forEach(function (data, index) {
	                        var _dsArray = _C2.default.get(self.keys.value, data);
	
	                        var _stack = [],
	                            _stackItem = {
	                            "color": "#ffffff",
	                            "y0": 0,
	                            "y1": 1,
	                            "group": "",
	                            "name": "",
	                            "data-ref": "",
	                            "enable": true
	                        },
	                            color = self.colorRange;
	
	                        // Iterate each single bar in a group
	                        if (_C2.default.isArray(_dsArray)) {
	                            (function () {
	                                var _negBase = 0;
	                                var _posBase = 0;
	                                _dsArray.forEach(function (d, i) {
	                                    _stackItem = {
	                                        "color": color(i),
	                                        "y0": d,
	                                        "y1": d > 0 ? d + _posBase : _negBase,
	                                        "group": stacks[i] || i,
	                                        "name": _C2.default.get(self.keys.name, data),
	                                        "data-ref": _C2.default.guid(),
	                                        "enable": true
	                                    };
	                                    _stack.push(_stackItem);
	                                    if (d > 0) _posBase += d;else _negBase += d;
	                                });
	                            })();
	                        } else {
	                            _stackItem = {
	                                "color": color(0),
	                                "y0": _dsArray,
	                                "y1": _dsArray > 0 ? _dsArray : 0,
	                                "group": stacks[0] || 0,
	                                "name": _C2.default.get(self.keys.name, data),
	                                "data-ref": _C2.default.guid(),
	                                "enable": true
	                            };
	                            _stack.push(_stackItem);
	                        }
	
	                        self.dataTarget.push(_stack);
	                    });
	
	                    return self.dataTarget;
	                    break;
	
	                default:
	                    return self.dataSource;
	                    break;
	            }
	        }
	    }, {
	        key: "getDataTargetForPieChart",
	        value: function getDataTargetForPieChart() {
	            var self = this;
	
	            var color = self.colorRange;
	            self.dataSource.forEach(function (data, index) {
	                var _data = {
	                    "color": color(index),
	                    "name": _C2.default.get(self.keys.name, data),
	                    "value": _C2.default.get(self.keys.value, data),
	                    "data-ref": _C2.default.guid(),
	                    "enable": true
	                };
	                self.dataTarget.push(_data);
	            });
	
	            return self.dataTarget;
	        }
	    }, {
	        key: "getDataTargetForDonutChart",
	        value: function getDataTargetForDonutChart() {
	            var self = this;
	
	            var color = self.colorRange;
	            self.dataSource.forEach(function (data, index) {
	                var _data = {
	                    "color": color(index),
	                    "data-ref": _C2.default.guid(),
	                    "enable": true,
	                    "name": _C2.default.get(self.keys.name, data),
	                    "value": _C2.default.get(self.keys.value, data)
	                };
	
	                self.dataTarget.push(_data);
	            });
	
	            return self.dataTarget;
	        }
	    }, {
	        key: "getDataTargetForTimelineChart",
	        value: function getDataTargetForTimelineChart() {
	            var self = this;
	
	            var color = self.colorRange;
	
	            self.dataSource.forEach(function (data, index) {
	
	                var _data = {
	                    // "color"     : color(index),
	                    "icon": data.icon,
	                    "name": _C2.default.get(self.keys.name, data),
	                    "value": [],
	                    "data-ref": _C2.default.guid(),
	                    "enable": true
	                };
	
	                var _dsArray = _C2.default.get(self.keys.value, data),
	                    _valueArray = [],
	                    _valueItem = {
	                    "name": _C2.default.get(self.keys.name, data),
	                    "start": null,
	                    "end": null,
	                    "color": "#fff",
	                    "data-ref": null,
	                    "enable": true
	                };
	
	                if (_C2.default.isArray(_dsArray)) {
	                    _dsArray.forEach(function (d, i) {
	                        _valueItem = {
	                            "name": _C2.default.get(self.keys.name, data),
	                            "start": new Date(d.start),
	                            "end": new Date(d.end),
	                            "color": color(index),
	                            "data-ref": _C2.default.guid(),
	                            "enable": true
	                        };
	                        _valueArray.push(_valueItem);
	                    });
	                } else {
	                    _valueItem = {
	                        "name": _C2.default.get(self.keys.name, data),
	                        "start": new Date(d.start),
	                        "end": new Date(d.end),
	                        "color": color(index),
	                        "data-ref": _C2.default.guid(),
	                        "enable": true
	                    };
	                    _valueArray.push(_valueItem);
	                }
	                _data.value = _valueArray;
	
	                self.dataTarget.push(_data);
	            });
	            return self.dataTarget;
	        }
	    }, {
	        key: "getDataTargetForLineChart",
	        value: function getDataTargetForLineChart() {
	            var self = this;
	
	            var color = self.colorRange;
	            self.dataSource.forEach(function (data, index) {
	                var _data = {
	                    "color": color(index),
	                    "name": _C2.default.get(self.keys.name, data),
	                    "value": [],
	                    "data-ref": _C2.default.guid(),
	                    "enable": true
	                };
	
	                var _valueXArray = _C2.default.get(self.keys.x, data),
	                    _valueYArray = _C2.default.get(self.keys.y, data),
	                    _valueArray = [],
	                    _valueItem = {
	                    "name": _C2.default.get(self.keys.name, data),
	                    "valueX": null,
	                    "valueY": null,
	                    "data-ref": _C2.default.guid(),
	                    "enable": true
	                };
	
	                if (_C2.default.isArray(_valueYArray)) {
	                    /**
	                     *
	                     * CASE 1: [{name:, value: []}, {}, ..]
	                     *
	                     */
	
	                    if (!_C2.default.isArray(_valueXArray)) {
	                        _valueYArray.forEach(function (d, i) {
	                            _valueItem = {
	                                "name": _C2.default.get(self.keys.name, data),
	                                "valueX": i,
	                                "valueY": d,
	                                "data-ref": _C2.default.guid(),
	                                "enable": true
	                            };
	                            _valueArray.push(_valueItem);
	                        });
	                    } else
	
	                        /**
	                         *
	                         * CASE 2: [{name:, value: {x: [], y:[]}, {}, ..]
	                         *
	                         */
	
	                        if (_C2.default.isArray(_valueXArray) && !self.timeFormat) {
	                            _valueYArray.forEach(function (d, i) {
	                                _valueItem = {
	                                    "name": _C2.default.get(self.keys.name, data),
	                                    "valueX": !_C2.default.isEmpty(_valueXArray[i]) ? _valueXArray[i] : i,
	                                    "valueY": d,
	                                    "data-ref": _C2.default.guid(),
	                                    "enable": true
	                                };
	                                _valueArray.push(_valueItem);
	                            });
	                        } else
	
	                            /**
	                             *
	                             * CASE 3: [{name:, value: {x: [], y:[]}, {}, ..] with config `timeFormat`
	                             *
	                             */
	
	                            if (_C2.default.isArray(_valueXArray) && self.timeFormat) {
	                                (function () {
	                                    var _parser = _C2.default.dateParser(self.timeFormat);
	
	                                    _valueYArray.forEach(function (d, i) {
	                                        _valueItem = {
	                                            "name": _C2.default.get(self.keys.name, data),
	                                            "valueX": !_C2.default.isEmpty(_valueXArray[i]) ? _parser(_valueXArray[i]) : i,
	                                            "valueY": d,
	                                            "data-ref": _C2.default.guid(),
	                                            "enable": true
	                                        };
	                                        _valueArray.push(_valueItem);
	                                    });
	                                })();
	                            }
	                }
	
	                _data.value = _valueArray;
	
	                self.dataTarget.push(_data);
	            });
	
	            return self.dataTarget;
	        }
	        /*=====  End of Normalize Data For Charts  ======*/
	
	        /*=============================
	        =            Utils            =
	        =============================*/
	        // getBarColorForBarChart() {
	        //     var self = this;
	
	        //     var color = self.colorRange;
	        //     if (typeof color == 'string') {
	        //         try {
	        //             return d3.scale[color]();    
	        //         }
	        //         catch(err) {
	        //             return function(i) {
	        //                 return color;
	        //             };
	        //         }
	        //     } else if (typeof color == 'object') {
	        //         return d3.scale.ordinal().range(color);
	        //     }
	        // }
	
	
	        /*=====  End of Utils  ======*/
	
	        /*=============================================
	        =            Data Input From Files            =
	        =============================================*/
	
	    }, {
	        key: "getCsv",
	        value: function getCsv() {
	
	            var self = this;
	
	            d3.csv(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                return data;
	            });
	        }
	    }, {
	        key: "getTsv",
	        value: function getTsv() {
	
	            var self = this;
	
	            d3.tsv(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                return data;
	            });
	        }
	    }, {
	        key: "getText",
	        value: function getText() {
	
	            var self = this;
	
	            d3.text(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                return JSON.parse(data);
	            });
	        }
	    }, {
	        key: "getJson",
	        value: function getJson() {
	            var self = this;
	
	            d3.json(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                return data;
	            });
	        }
	    }, {
	        key: "getXml",
	        value: function getXml() {
	            var self = this;
	
	            d3.xml(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                // Convert the XML document to an array of objects.
	                // Note that querySelectorAll returns a NodeList, not a proper Array,
	                // so we must use map.call to invoke array methods.
	                data = [].map.call(data.querySelectorAll("data"), function (d) {
	                    return {
	                        name: d.querySelector("name").textContent,
	                        value: d.querySelector("value").textContent
	                    };
	                });
	
	                return data;
	            });
	        }
	
	        /*=====  End of Data Input From Files  ======*/
	
	    }, {
	        key: "keys",
	        get: function get() {
	            return this._keys;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._keys = arg;
	            }
	        }
	    }, {
	        key: "dataSource",
	        get: function get() {
	            return this._dataSource;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._dataSource = arg;
	            }
	        }
	    }, {
	        key: "dataTarget",
	        get: function get() {
	            return this._dataTarget;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._dataTarget = arg;
	            }
	        }
	    }, {
	        key: "groups",
	        get: function get() {
	            return this._groups;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._groups = arg;
	            }
	        }
	    }, {
	        key: "stacks",
	        get: function get() {
	            return this._stacks;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._stacks = arg;
	            }
	        }
	    }, {
	        key: "colorRange",
	        get: function get() {
	            return this._colorRange;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._colorRange = arg;
	            }
	        }
	    }, {
	        key: "timeFormat",
	        get: function get() {
	            return this._timeFormat;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._timeFormat = arg;
	            }
	        }
	    }]);
	
	    return DataAdapter;
	}();
	
	exports.default = DataAdapter;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(10);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(7);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(8);
	
	var _C16 = _interopRequireDefault(_C15);
	
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
	            outerRadius: R,
	            innerRadius: R > 80 ? R - 80 : R - 40,
	            showText: true // show/hide text on middle or each donut
	        };
	
	        self._outerRadius = options.outerRadius || config.outerRadius;
	        self._innerRadius = options.innerRadius || config.innerRadius;
	        self._showText = options.showText || config.showText;
	        self.body.type = 'donut';
	
	        var dataOption = self.dataOption;
	        dataOption.colorRange = self.colorRange;
	
	        var da = new _C16.default(dataOption);
	        self.dataTarget = da.getDataTarget("donut");
	
	        self.updateConfig();
	        return _this;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(DonutChart, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        /**
	         * Update Donut Chart Config
	         */
	        value: function updateConfig() {
	            var self = this;
	
	            // chartInnerAfter, chartOuterAfter define easing radius of donut chart during animation
	            // TODO: Add configs allow users to define these radius
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom,
	                color = self.colorRange,
	                chartInnerBefore = self.innerRadius,
	                chartOuterBefore = self.outerRadius,
	                chartInnerAfter = self.innerRadius,
	                chartOuterAfter = self.outerRadius * 1.2;
	
	            var hoverOptions = self.hover.options,
	                hoverEnable = self.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = self.click.callback;
	
	            var tooltip = new _C12.default(self.options.tooltip);
	
	            // Main Event Dispatch for paths in donut chart
	            self._eventFactory = {
	                'click': function click(d, i) {
	                    if (_C14.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, d);
	                    }
	                },
	
	                'mouseover': function mouseover(d, i) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, d);
	                    }
	
	                    var selector = d3.select(this);
	                    selector.transition().attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter));
	
	                    // For legend
	                    if (self.legend.item) self.legend.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '0.3');
	                        }
	                    });
	
	                    // For Chart
	                    self.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
	                            d3.select(this).attr('opacity', '0.3');
	                        }
	                    });
	
	                    // For Tooltip
	                    tooltip.draw(d, self, 'mouseover');
	                },
	
	                'mouseout': function mouseout(d, i) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, d);
	                    }
	
	                    var selector = d3.select(this);
	                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore));
	
	                    // For legend
	                    if (self.legend.item) self.legend.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    // For Chart
	                    self.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    // For Tooltip
	                    tooltip.draw(d, self, 'mouseout');
	                }
	
	            };
	
	            self.arc = d3.svg.arc().outerRadius(self.outerRadius).innerRadius(self.innerRadius);
	
	            //we can sort data here
	            self.pie = d3.layout.pie().sort(null).value(function (d) {
	                return d.value;
	            });
	
	            //draw chart
	            var arcs = self.body.append('g').attr('class', 'c9-chart c9-custom-arc-container').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('.c9-chart-donut.c9-custom-arc').data(self.pie(self.dataTarget)).enter().append('g').attr('class', 'c9-chart-donut c9-custom-arc');
	
	            // Append main path contains donut
	            // TODO: add a unique class to allow Legend could find selected donut/pie
	            arcs.append('path').attr('class', 'c9-chart-donut c9-custom-path').attr('data-ref', function (d) {
	                return d.data['data-ref'];
	            }).attr('d', self.arc).attr('fill', function (d, i) {
	                return color(i);
	            }).attr('stroke', '#ffffff').each(function (d) {
	                self._currentData = d;
	            });
	            // Current data used for calculate interpolation 
	            // between current arc vs disabled arc
	
	
	            // Append middle text display name
	            // if (self.showText) {
	            //     arcs.append('text')
	            //             .attr('class', 'c9-chart-donut c9-custom-text')
	            //             .attr('transform', function(d) { return 'translate(' + self.arc.centroid(d) + ')'; })
	            //             .attr('dy', '.35em')
	            //             .attr('text-anchor', 'middle')
	            //             .text(function(d) { return d.data.name; });
	            // }
	        }
	
	        /**
	         * Main draw function of Donut Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	
	            var self = this;
	
	            var title = new _C6.default(self.options, self.body, self.width, self.height, self.margin);
	            var legend = new _C8.default(self.options.legend, self.body, self.dataTarget);
	
	            self.legend = legend;
	
	            // Draw legend
	            legend.draw();
	            legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);
	
	            // Update interaction of this own chart
	            self.updateInteraction();
	        }
	
	        /**
	         * Select all path as type PATH in Donut Chart via its CLASS
	         */
	
	    }, {
	        key: 'selectAllPath',
	        value: function selectAllPath() {
	            var self = this;
	
	            return self.body
	            // .selectAll('g')
	            .selectAll('path.c9-chart-donut.c9-custom-path');
	        }
	
	        /**
	         * Update Interaction: Hover
	         * @return {} 
	         */
	
	    }, {
	        key: 'updateInteraction',
	        value: function updateInteraction() {
	            var self = this,
	                selector = self.selectAllPath();
	
	            selector.on(self._eventFactory);
	        }
	
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {
	            _get(DonutChart.prototype.__proto__ || Object.getPrototypeOf(DonutChart.prototype), 'on', this).call(this, eventType, callback);
	
	            var self = this;
	            var selector = self.selectAllPath();
	
	            // Update Event Factory
	            var eventFactory = {
	                'click.event': function clickEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseover.event': function mouseoverEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseout.event': function mouseoutEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                }
	            };
	
	            var eventName = eventType + '.event';
	
	            selector.on(eventName, eventFactory[eventName]);
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
	        set: function set(arg) {
	            if (arg) {
	                this._outerRadius = arg;
	            }
	        }
	    }, {
	        key: 'innerRadius',
	        get: function get() {
	            return this._innerRadius;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._innerRadius = arg;
	            }
	        }
	    }, {
	        key: 'showText',
	        get: function get() {
	            return this._showText;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._showText = arg;
	            }
	        }
	    }, {
	        key: 'tooltip',
	        get: function get() {
	            return this._tooltip;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._tooltip = arg;
	            }
	        }
	    }, {
	        key: 'pie',
	        get: function get() {
	            return this._pie;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._pie = arg;
	            }
	        }
	    }, {
	        key: 'arc',
	        get: function get() {
	            return this._arc;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._arc = arg;
	            }
	        }
	    }, {
	        key: 'currentData',
	        get: function get() {
	            return this._currentData;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._currentData = arg;
	            }
	        }
	    }, {
	        key: 'chartType',
	        get: function get() {
	            return this._body.type;
	        }
	    }, {
	        key: 'legend',
	        get: function get() {
	            return this._legend;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._legend = arg;
	            }
	        }
	    }]);
	
	    return DonutChart;
	}(_C2.default);
	
	exports.default = DonutChart;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
	var _C2 = _interopRequireDefault(_C);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Table = function () {
	    function Table(options, body, data) {
	        _classCallCheck(this, Table);
	
	        var config = {
	            container: "body",
	            show: false,
	            headings: ["Name", "Value"],
	            style: "stripe", // || "stripe"
	            serial: true,
	            hover: {
	                enable: true,
	                callback: null
	            },
	            click: {
	                enable: true,
	                callback: null
	            }
	        };
	
	        var self = this;
	
	        self._container = options.container || config.container;
	        self._show = options.show ? options.show : config.show;
	        self._headings = options.headings || config.headings;
	        self._style = options.style || config.style;
	        self._serial = options.serial || config.serial;
	        self._hover = _C2.default.merge(options.hover, config.hover);
	        self._click = _C2.default.merge(options.click, config.click);
	
	        self._data = data;
	        self._body = body;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Table, [{
	        key: "draw",
	
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function draw() {
	            var self = this;
	
	            if (self.show) {
	
	                var headTbl = d3.select(self.container).append("table").attr('class', 'c9-table c9-table-header'),
	                    thead = headTbl.append("thead"),
	                    bodyTbl = d3.select(self.container).append("div").attr('class', 'c9-table-container').append("table").attr('class', function () {
	                    if (self.style === 'default') return 'c9-table c9-table-body';else if (self.style === 'stripe') return 'c9-table c9-table-body c9-stripe';
	                }),
	                    tbody = bodyTbl.append("tbody");
	
	                // Append serial no heading
	                // Bind each statistic to a line of the table
	                // Show serial no.
	                var hRows = thead.append("tr");
	
	                if (self.serial) {
	                    hRows.append("th").text("#");
	                }
	
	                hRows.selectAll("thead").data(self.headings).enter().append("th").text(function (d) {
	                    return d;
	                });
	
	                // Bind each statistic to a line of the table
	                // Show serial no.
	                var bRows = tbody.selectAll("tr").data(self.data).enter().append("tr").attr("data-ref", function (d) {
	                    return d["data-ref"];
	                });
	
	                if (self.serial) {
	                    bRows.append("td").text(function (d, i) {
	                        return i + 1;
	                    });
	                }
	
	                // Add statistic names to each row
	                bRows.append("td").text(function (d) {
	                    return d.name;
	                });
	
	                // Add values to each row
	                bRows.append("td").text(function (d) {
	                    return d.value;
	                });
	            }
	        }
	    }, {
	        key: "updateInteractionForPieChart",
	        value: function updateInteractionForPieChart(chart) {
	
	            var self = this;
	
	            var hoverOptions = chart.hover.options,
	                hoverEnable = chart.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = chart.click.callback;
	
	            var chartType = chart.chartType;
	
	            var chartInnerBefore = chartType == 'pie' ? 0 : chart.innerRadius,
	                chartOuterBefore = chartType == 'pie' ? chart.radius : chart.outerRadius,
	                chartInnerAfter = chartType == 'pie' ? 0 : chart.innerRadius,
	                chartOuterAfter = chartType == 'pie' ? chart.radius * 1.2 : chart.outerRadius * 1.2;
	            self.itemEventFactory = {
	
	                'click': function click(item) {
	                    if (_C2.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, item);
	                    }
	
	                    // var selector = d3.select(this);
	                    // var enable = true,
	                    //     dataSet = self.data;
	                    // var totalEnable = d3.sum(dataSet.map(function(d) {
	                    //     return (d.enable) ? 1 : 0;
	                    // }));
	
	                    // // Add pointer to cursor
	                    // selector.style('cursor', 'pointer');
	
	                    // // If current selector is disabled, then turn it on back
	                    // // Else, set enable to false
	                    // if (selector.style('opacity') == '0.1') {
	                    //     selector.style('opacity', '1.0');
	                    // } else {
	                    //     if (totalEnable < 2) return;
	                    //     selector.style('opacity', '0.1');
	                    //     enable = false;
	                    // }
	                },
	
	                'mouseover': function mouseover(item) {
	                    if (!item) return;
	
	                    if (_C2.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	                    // if (legendSelector.attr('enable') == 'true') {
	
	                    // For Chart
	                    chart.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
	                            d3.select(this).attr('opacity', '0.3');
	                        }
	                    });
	
	                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");
	
	                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter));
	                    // }
	                },
	
	                'mouseout': function mouseout(item) {
	                    if (!item) return;
	
	                    if (_C2.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	
	                    chart.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");
	
	                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore));
	                }
	
	            };
	
	            if (self.show) self.selectAllRow().on(self.itemEventFactory);
	        }
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: "selectAllRow",
	        value: function selectAllRow() {
	            return d3.selectAll(".c9-table tr");
	        }
	    }, {
	        key: "data",
	        get: function get() {
	            return this._data;
	        },
	
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._data = arg;
	            }
	        }
	    }, {
	        key: "body",
	        get: function get() {
	            return this._body;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._body = arg;
	            }
	        }
	    }, {
	        key: "container",
	        get: function get() {
	            return this._container;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._container = arg;
	            }
	        }
	    }, {
	        key: "show",
	        get: function get() {
	            return this._show;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._show = arg;
	            }
	        }
	    }, {
	        key: "headings",
	        get: function get() {
	            return this._headings;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._headings = arg;
	            }
	        }
	    }, {
	        key: "style",
	        get: function get() {
	            return this._style;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._style = arg;
	            }
	        }
	    }, {
	        key: "serial",
	        get: function get() {
	            return this._serial;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._serial = arg;
	            }
	        }
	    }, {
	        key: "hover",
	        get: function get() {
	            return this._hover;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._hover = arg;
	            }
	        }
	    }, {
	        key: "click",
	        get: function get() {
	            return this._click;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._click = arg;
	            }
	        }
	    }]);
	
	    return Table;
	}();
	
	exports.default = Table;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(10);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(7);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(8);
	
	var _C16 = _interopRequireDefault(_C15);
	
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
	            point: {
	                show: true,
	                fill: "steelblue",
	                stroke: "#d26b5f",
	                'stroke-width': 2,
	                opacity: 1.0,
	                radius: 5
	            },
	            area: {
	                show: true
	            },
	            line: {
	                style: "solid", // "dash", "dot"
	                width: 2
	            },
	            interpolate: "linear" };
	
	        self._point = _C14.default.merge(options.point, config.point);
	        self._area = _C14.default.merge(options.area, config.area);
	        self._line = _C14.default.merge(options.line, config.line);
	        self._interpolate = options.interpolate || config.interpolate;
	
	        self.body.type = "line";
	        self._bisectDate = d3.bisector(function (d) {
	            return d.valueX;
	        }).left;;
	
	        var dataOption = self.dataOption;
	        dataOption.colorRange = self.colorRange;
	
	        self._da = new _C16.default(dataOption);
	        self.dataTarget = self._da.getDataTarget("line");
	
	        self._isTimeDomain = self._da.timeFormat;
	
	        self.updateConfig();
	
	        return _this;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	    _createClass(LineChart, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	
	        /**
	         * First init Line Chart
	         */
	        value: function updateConfig() {
	            var self = this;
	
	            var da = self._da;
	
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom;
	
	            var x = self._isTimeDomain ? d3.time.scale().range([0, width]) : d3.scale.linear().range([0, width]),
	                y = d3.scale.linear().range([height, 0]);
	
	            var valueXArray = d3.merge(self.dataTarget.map(function (data) {
	                return data.value.map(function (d) {
	                    return d.valueX;
	                });
	            }));
	
	            var valueYArray = d3.merge(self.dataTarget.map(function (data) {
	                return data.value.map(function (d) {
	                    return d.valueY;
	                });
	            }));
	
	            x.domain(d3.extent(valueXArray));
	
	            y.domain(d3.extent(valueYArray));
	
	            // Update domain if all values positive / negative
	            if (y.domain()[0] > 0 && y.domain()[1] > 0) {
	                y.domain([0, y.domain()[1]]);
	            } else if (y.domain()[0] < 0 && y.domain()[1] < 0) {
	                y.domain([y.domain()[0], 0]);
	            }
	
	            self._x = x;
	            self._y = y;
	
	            var lineGen = d3.svg.line().x(function (d) {
	                return x(d.valueX);
	            }).y(function (d) {
	                return y(d.valueY);
	            }).interpolate(self.interpolate);
	
	            var areaGen = d3.svg.area().x(function (d) {
	                return x(d.valueX);
	            }).y0(function (d) {
	                return y(d.valueY);
	            }).y1(height).interpolate(self.interpolate);
	
	            self.dataTarget.forEach(function (d, i) {
	                if (self.area.show) {
	                    self.body.append('path').attr('class', 'c9-chart-line c9-path-area-custom').attr('d', areaGen(d.value)).attr('data-ref', 'c9-' + d['data-ref']).style('fill', d.color).style('stroke', 'none').style('opacity', '0.1');
	                }
	
	                self.body.append('path').attr('class', 'c9-chart-line c9-path-line-custom').attr('d', lineGen(d.value)).attr('data-ref', 'c9-' + d['data-ref']).style('stroke', d.color).style('stroke-dasharray', function () {
	                    console.log(self.getLineStyle());
	                    return self.getLineStyle();
	                }).style('stroke-width', self.line.width).style('fill', 'none');
	
	                if (self.point.show) {
	                    self.body.selectAll("dot").data(d.value).enter().append("circle").attr('class', 'c9-chart-line c9-circle-custom').attr("r", self.point.radius).attr("cx", function (_d) {
	                        return x(_d.valueX);
	                    }).attr("cy", function (_d) {
	                        return y(_d.valueY);
	                    }).attr("data-ref", function (d) {
	                        return d["data-ref"];
	                    }).style("fill", self.point.fill).style("stroke", self.point.stroke).style("stroke-width", self.point['stroke-width']).style("opacity", self.point.opacity);
	                }
	            });
	
	            // Draw axis before rect-overlay
	            var axis = new _C4.default(self.options.axis, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self._x, self._y);
	
	            // Set actual size for chart after initialization
	            var chartBox = self.body.node().getBBox();
	            self.actualWidth = chartBox.width - 4 * self.point.radius;
	            self.actualHeight = chartBox.height;
	
	            //** Create a invisible rect for mouse tracking
	            self.body.append('rect').attr('class', 'c9-chart-line c9-rect-overlay')
	            // .attr('width', self.actualWidth)
	            // .attr('height', self.actualHeight)
	            .attr('width', width).attr('height', height).style('fill', 'none').style('pointer-events', 'all');
	
	            //** Hover line & invisible rect
	
	            //** Add the line to the group
	            self.hoverLine = self.body.append('g').attr('class', 'c9-chart-line c9-comparator-line').append('line').style('stroke', 'grey').style('stroke-opacity', 0);
	
	            self.hoverCircle = self.hoverLine.append('circle').attr('class', 'c9-chart-line c9-comparator-line').attr('r', self.point.radius);
	        }
	
	        /**
	         * Main draw function of Line Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	
	            // var axis    = new Axis(self.options.axis, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self._x, self._y);
	            var title = new _C6.default(self.options, self.body, self.width, self.height, self.margin);
	            var legend = new _C8.default(self.options.legend, self.body, self.dataTarget);
	
	            // Draw legend
	            legend.draw();
	            legend.updateInteractionForLineChart(self);
	
	            self.updateInteraction();
	        }
	
	        /**
	         * Select all circle as type CIRCLE in Line Chart via its CLASS
	         */
	
	    }, {
	        key: 'selectAllCircle',
	        value: function selectAllCircle() {
	            var self = this;
	
	            return self.body.selectAll('circle.c9-chart-line.c9-circle-custom');
	        }
	
	        /**
	         * Select all rect as type RECT in Line Chart via its CLASS
	         */
	
	    }, {
	        key: 'selectRectLayer',
	        value: function selectRectLayer() {
	            var self = this;
	
	            return d3.selectAll('svg rect.c9-chart-line.c9-rect-overlay');
	        }
	
	        /**
	         * Update Interaction: Hover
	         */
	
	    }, {
	        key: 'updateInteraction',
	        value: function updateInteraction() {
	            var self = this,
	                hoverEnable = self.hover.enable,
	                hoverOptions = self.hover.options,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onMouseMoveCallback = hoverOptions.onMouseMove.callback,
	                onClickCallback = self.click.callback;
	
	            var tooltip = new _C12.default(self.options.tooltip);
	
	            var selector = self.selectRectLayer();
	
	            // Update Event Factory
	            self.eventFactory = {
	                // 'click': function(d) {
	                //     if (Helper.isFunction(onClickCallback)) {
	                //         onClickCallback.call(this, d);
	                //     }
	                // },
	                // 'mouseover': function(d) {
	                //     if (!hoverEnable) return;
	
	                //     if (Helper.isFunction(onMouseOverCallback)) {
	                //         onMouseOverCallback.call(this, d);
	                //     }
	
	                //     // tooltip.draw(d, self, 'mouseover');
	                // },
	                'mouseout': function mouseout(d) {
	                    if (!hoverEnable) return;
	
	                    // if (Helper.isFunction(onMouseOutCallback)) {
	                    //     onMouseOutCallback.call(this, d);
	                    // }
	
	                    self.hoverLine.style('stroke-opacity', 0);
	
	                    // Remove circle style before
	                    self.selectAllCircle()[0].forEach(function (circle) {
	                        d3.select(circle).style('fill', self.point.fill).style('fill-opacity', self.point.opacity);
	                    });
	
	                    tooltip.draw(d, self, 'mouseout');
	                },
	                'mousemove': function mousemove(d) {
	                    if (!hoverEnable) return;
	
	                    var mouse = d3.mouse(this),
	                        mouseX = mouse[0],
	                        mouseY = mouse[1],
	                        curValueX = self.x.invert(mouseX);
	
	                    var sameTimeArr = [],
	                        sameTimeValueArr = [];
	
	                    self.dataTarget.forEach(function (d, i) {
	                        sameTimeArr[i] = d.value;
	                        sameTimeArr[i].sort(function (a, b) {
	                            return a.valueX - b.valueX;
	                        });
	                        var idx = self._isTimeDomain ? self.bisectDate(sameTimeArr[i], new Date(curValueX)) : self.bisectDate(sameTimeArr[i], curValueX);
	
	                        var d0, d1;
	
	                        d0 = idx === 0 ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];
	                        d1 = sameTimeArr[i][idx];
	
	                        // work out which date value is closest to the mouse
	                        sameTimeValueArr[i] = curValueX - d0.valueX > d1.valueX - curValueX ? d1 : d0;
	                    });
	
	                    if (_C14.default.isFunction(onMouseMoveCallback)) {
	                        onMouseMoveCallback.call(this, sameTimeValueArr);
	                    }
	
	                    var x = self.x(sameTimeValueArr[0].valueX);
	                    var y = self.y(sameTimeValueArr[0].valueY);
	
	                    // Remove circle style before
	                    self.selectAllCircle()[0].forEach(function (circle) {
	                        d3.select(circle).style('fill', self.point.fill).style('fill-opacity', self.point.opacity);
	                    });
	
	                    // Update circle style after mouse move
	                    for (var i = 0; i < sameTimeValueArr.length; i++) {
	                        var circle = d3.select("circle[data-ref='" + sameTimeValueArr[i]['data-ref'] + "']");
	                        circle.style('fill', 'steelblue').style('fill-opacity', 1);
	                    }
	
	                    // focus.select('#focusCircle')
	                    //     .attr('cx', x)
	                    //     .attr('cy', y);
	                    self.hoverLine.attr('x1', x).attr('y1', self.y(self.y.domain()[0])).attr('x2', x).attr('y2', self.y(self.y.domain()[1])).style('stroke-opacity', 1);
	                    // self.hoverLine
	                    //     .attr('x1', self.x(self.x.domain()[0])).attr('y1', y)
	                    //     .attr('x2', self.x(self.x.domain()[1])).attr('y2', y)
	                    //     .attr('stroke-opacity', 1);
	
	                    //** Display Hover line
	                    // self.hoverLine
	                    //     .attr('x1', self.x(sameTimeValueArr[0].valueX))
	                    //     .attr('x2', self.x(sameTimeValueArr[0].valueX))
	                    //     .attr('stroke-opacity', 1);
	
	                    tooltip.draw(sameTimeValueArr, self, 'mousemove');
	                }
	            };
	
	            selector.on(self.eventFactory);
	        }
	    }, {
	        key: 'getLineStyle',
	        value: function getLineStyle() {
	            var self = this;
	
	            var r = void 0;
	
	            switch (self.line.style) {
	                case 'dot':
	                    r = "1, 1";
	                    break;
	                case 'solid':
	                    r = 'none';
	                    break;
	                case 'dash':
	                    r = "3, 3";
	                    break;
	                default:
	                    r = 'none';
	                    break;
	            }
	
	            return r;
	        }
	
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {
	            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'on', this).call(this, eventType, callback);
	
	            var self = this;
	            var selector = self.selectRectLayer();
	
	            // Update Event Factory
	            var eventFactory = {
	                'mousemove.event': function mousemoveEvent(d) {
	
	                    var mouse = d3.mouse(this),
	                        mouseX = mouse[0],
	                        mouseY = mouse[1],
	                        curValueX = self.x.invert(mouseX);
	
	                    var sameTimeArr = [],
	                        sameTimeValueArr = [];
	
	                    self.dataTarget.forEach(function (d, i) {
	                        sameTimeArr[i] = d.value;
	                        sameTimeArr[i].sort(function (a, b) {
	                            return a.valueX - b.valueX;
	                        });
	                        var idx = self._isTimeDomain ? self.bisectDate(sameTimeArr[i], new Date(curValueX)) : self.bisectDate(sameTimeArr[i], curValueX);
	
	                        var d0, d1;
	
	                        d0 = idx === 0 ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];
	                        d1 = sameTimeArr[i][idx];
	
	                        // work out which date value is closest to the mouse
	                        sameTimeValueArr[i] = curValueX - d0.valueX > d1.valueX - curValueX ? d1 : d0;
	                    });
	
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, sameTimeValueArr);
	                    }
	                }
	            };
	
	            var eventName = eventType + '.event';
	
	            selector.on(eventName, eventFactory[eventName]);
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: 'point',
	        get: function get() {
	            return this._point;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	
	        set: function set(arg) {
	            if (arg) {
	                this._point = arg;
	            }
	        }
	    }, {
	        key: 'area',
	        get: function get() {
	            return this._area;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._area = arg;
	            }
	        }
	    }, {
	        key: 'line',
	        get: function get() {
	            return this._line;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._line = arg;
	            }
	        }
	    }, {
	        key: 'interpolate',
	        get: function get() {
	            return this._interpolate;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._interpolate = arg;
	            }
	        }
	    }, {
	        key: 'x',
	        get: function get() {
	            return this._x;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._x = arg;
	            }
	        }
	    }, {
	        key: 'y',
	        get: function get() {
	            return this._y;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._y = arg;
	            }
	        }
	    }, {
	        key: 'isTimeDomain',
	        get: function get() {
	            return this._isTimeDomain;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._isTimeDomain = arg;
	            }
	        }
	    }, {
	        key: 'da',
	        get: function get() {
	            return this._da;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._da = arg;
	            }
	        }
	    }, {
	        key: 'bisectDate',
	        get: function get() {
	            return this._bisectDate;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._bisectDate = arg;
	            }
	        }
	    }, {
	        key: 'hoverLine',
	        get: function get() {
	            return this._hoverLine;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._hoverLine = arg;
	            }
	        }
	    }]);
	
	    return LineChart;
	}(_C2.default);
	
	exports.default = LineChart;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(10);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(7);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(8);
	
	var _C16 = _interopRequireDefault(_C15);
	
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
	
	        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
	        var config = {
	            radius: R,
	            showText: true
	        };
	
	        self._radius = options.radius || config.radius;
	        self._showText = options.showText || config.showText;
	
	        self.body.type = 'pie';
	
	        var dataOption = self.dataOption;
	        dataOption.colorRange = self.colorRange;
	
	        var da = new _C16.default(dataOption);
	        self.dataTarget = da.getDataTarget("pie");
	
	        self.updateConfig();
	        return _this;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(PieChart, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        /**
	         * Update Donut Chart Config
	         */
	        value: function updateConfig() {
	            var self = this;
	
	            // chartInnerAfter, chartOuterAfter define easing radius of pie chart during animation
	            // TODO: Add configs allow users to define these radius
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom,
	                color = self.colorRange,
	                chartInnerBefore = 0,
	                chartOuterBefore = self.radius,
	                chartInnerAfter = 0,
	                chartOuterAfter = self.radius * 1.2;
	
	            var hoverOptions = self.hover.options,
	                hoverEnable = self.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = self.click.callback;
	
	            var tooltip = new _C12.default(self.options.tooltip);
	
	            // Main Event Dispatch for paths in pie chart
	            self.eventFactory = {
	                'click': function click(d, i) {
	                    if (_C14.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, d);
	                    }
	                },
	
	                'mouseover': function mouseover(d, i) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, d);
	                    }
	
	                    var selector = d3.select(this);
	                    selector.transition().attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter));
	
	                    // For legend
	                    if (self.legend.show) self.legend.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '0.3');
	                        }
	                    });
	
	                    // For Table
	                    if (self.table.show) {
	                        var tr = d3.selectAll('.c9-table-container>.c9-table-body tr');
	                        tr.filter(function (i) {
	                            return i['data-ref'] != d.data['data-ref'];
	                        }).selectAll('td').style('opacity', '0.5');
	                        var selectedItem = tr.filter(function (i) {
	                            return i['data-ref'] == d.data['data-ref'];
	                        });
	                        //set its style and scroll to its pos
	                        selectedItem.selectAll('td').style('opacity', '1');
	                        _C14.default.scroll(d3.select('.c9-table-container')[0][0], selectedItem[0][0].offsetTop, 200);
	                    }
	
	                    // For Chart
	                    self.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
	                            d3.select(this).attr('opacity', '0.3');
	                        }
	                    });
	
	                    // For Tooltip
	                    tooltip.draw(d, self, 'mouseover');
	                },
	
	                'mouseout': function mouseout(d, i) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, d);
	                    }
	
	                    var selector = d3.select(this);
	                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore));
	
	                    // For legend
	                    if (self.legend.item) self.legend.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    // For Table
	                    if (self.table.show) d3.selectAll('.c9-table-container>.c9-table-body tr').filter(function (i) {
	                        return i['data-ref'] != d.data['data-ref'];
	                    }).selectAll('td').style('opacity', '1');
	
	                    // For Chart
	                    self.selectAllPath().each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    // For Tooltip
	                    tooltip.draw(d, self, 'mouseout');
	                }
	
	            };
	
	            self.arc = d3.svg.arc().innerRadius(0).outerRadius(self.radius);
	
	            //we can sort data here
	            self.pie = d3.layout.pie().sort(null).value(function (d) {
	                return d.value;
	            });
	
	            //draw chart
	            var arcs = self.body.append('g').attr('class', 'c9-chart c9-custom-arc-container').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('.c9-chart-pie.c9-custom-arc').data(self.pie(self.dataTarget)).enter().append('g').attr('class', 'c9-chart-pie c9-custom-arc');
	
	            // Append main path contains pie
	            arcs.append('path').attr('class', 'c9-chart-pie c9-custom-path').attr('data-ref', function (d) {
	                return d.data['data-ref'];
	            }).attr('d', self.arc).attr('fill', function (d, i) {
	                return color(i);
	            }).attr('stroke', '#ffffff').each(function (d) {
	                self._currentData = d;
	            });
	            // Current data used for calculate interpolation 
	            // between current arc vs disabled arc
	
	
	            // Append middle text display name
	            // if (self.showText) {
	            //     arcs.append('text')
	            //             .attr('class', 'c9-chart-pie c9-custom-text')
	            //             .attr('transform', function(d) { return 'translate(' + self.arc.centroid(d) + ')'; })
	            //             .attr('dy', '.35em')
	            //             .attr('text-anchor', 'middle')
	            //             .text(function(d) { return d.data.name; });
	            // }
	        }
	
	        /**
	         * Main draw function of Donut Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	
	            var self = this;
	
	            var title = new _C6.default(self.options, self.body, self.width, self.height, self.margin);
	            var legend = new _C8.default(self.options.legend, self.body, self.dataTarget);
	            var table = new _C10.default(self.options.table, self.body, self.dataTarget);
	
	            self.legend = legend;
	            self.table = table;
	            // Draw legend
	            legend.draw();
	            legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);
	
	            // Draw table
	            table.draw();
	            table.updateInteractionForPieChart(self);
	            // Update interaction of this own chart
	            self.updateInteraction();
	        }
	
	        /**
	         * Select all path as type PATH in Donut Chart via its CLASS
	         */
	
	    }, {
	        key: 'selectAllPath',
	        value: function selectAllPath() {
	            var self = this;
	
	            return self.body.selectAll('path.c9-chart-pie.c9-custom-path');
	        }
	
	        /**
	         * Update Interaction: Hover
	         * @return {} 
	         */
	
	    }, {
	        key: 'updateInteraction',
	        value: function updateInteraction() {
	            var self = this,
	                selector = self.selectAllPath();
	
	            selector.on(self.eventFactory);
	        }
	
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {
	            _get(PieChart.prototype.__proto__ || Object.getPrototypeOf(PieChart.prototype), 'on', this).call(this, eventType, callback);
	
	            var self = this;
	            var selector = self.selectAllPath();
	
	            // Update Event Factory
	            var eventFactory = {
	                'click.event': function clickEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseover.event': function mouseoverEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseout.event': function mouseoutEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                }
	            };
	
	            var eventName = eventType + '.event';
	
	            selector.on(eventName, eventFactory[eventName]);
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: 'radius',
	        get: function get() {
	            return this._radius;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(newradius) {
	            if (newradius) {
	                this._radius = newradius;
	            }
	        }
	    }, {
	        key: 'showText',
	        get: function get() {
	            return this._showText;
	        },
	        set: function set(newShowText) {
	            if (newShowText) {
	                this._showText = newShowText;
	            }
	        }
	    }, {
	        key: 'pie',
	        get: function get() {
	            return this._pie;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._pie = arg;
	            }
	        }
	    }, {
	        key: 'arc',
	        get: function get() {
	            return this._arc;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._arc = arg;
	            }
	        }
	    }, {
	        key: 'currentData',
	        get: function get() {
	            return this._currentData;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._currentData = arg;
	            }
	        }
	    }, {
	        key: 'chartType',
	        get: function get() {
	            return this._body.type;
	        }
	    }, {
	        key: 'legend',
	        get: function get() {
	            return this._legend;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._legend = arg;
	            }
	        }
	    }]);
	
	    return PieChart;
	}(_C2.default);
	
	exports.default = PieChart;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(10);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(7);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(8);
	
	var _C16 = _interopRequireDefault(_C15);
	
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
	            rowSeparator: "rgb(154, 154, 154)",
	            backgroundColor: null,
	            starting: 0,
	            ending: 0,
	            stack: false, //test
	            // rotateTicks: false,
	            itemHeight: 25,
	            itemMargin: 20,
	            labelMargin: 20,
	            striped: null
	        };
	
	        self.body.type = "timeline";
	        self._stack = options.stack || config.stack;
	        self._starting = options.starting || config.starting;
	        self._ending = options.ending || config.ending;
	        self._rowSeparator = options.rowSeparator || config.rowSeparator;
	        self._backgroundColor = options.backgroundColor || config.backgroundColor;
	        self._itemHeight = options.itemHeight || config.itemHeight;
	        self._itemMargin = options.itemMargin || config.itemMargin;
	        self._labelMargin = options.labelMargin || config.labelMargin;
	        self._maxStack = 1;
	        self._striped = options.striped || config.striped;
	
	        var dataOption = self.dataOption;
	        dataOption.colorRange = self.colorRange;
	
	        var da = new _C16.default(dataOption);
	        self.dataTarget = da.getDataTarget("timeline");
	
	        self.updateConfig();
	        return _this;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(TimeLine, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	
	        value: function updateConfig() {
	            var self = this;
	
	            var color = self.colorRange;
	
	            var stackList = {},
	                maxStack = 0,
	                minTime = 0,
	                maxTime = 0,
	                width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom;
	
	            var hoverOptions = self.hover.options,
	                hoverEnable = self.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = self.click.callback;
	
	            // Update Tooltip options for Timeline Chart
	            self.options.tooltip = {
	                show: true,
	                position: 'left', // [top, right, bottom, left]
	                backgroundColor: 'rgba(0, 0, 0, 0.8)',
	                fontColor: '#fff',
	                fontSize: '11px',
	                format: null
	            };
	
	            var tooltip = new _C12.default(self.options.tooltip);
	
	            // Main Event Dispatch for paths in pie chart
	            self._eventFactory = {
	                'click': function click(d, i) {
	                    if (_C14.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, d);
	                    }
	                },
	
	                'mouseover': function mouseover(d, i) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, d);
	                    }
	
	                    // var selector = d3.select(this);
	                    // selector.transition()
	                    //         .attr('d', d3.svg.arc()
	                    //             .innerRadius(chartInnerAfter)
	                    //             .outerRadius(chartOuterAfter)
	                    //         )
	                    //         // .style('stroke', '#FFFFF3')
	                    //         .attr('fill-opacity', '1.0');
	
	                    tooltip.draw(d, self, 'mouseover');
	                },
	
	                'mouseout': function mouseout(d, i) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, d);
	                    }
	
	                    // var selector = d3.select(this);
	                    // selector.transition()
	                    //         .duration(500)
	                    //         .ease('bounce')
	                    //         .attr('d', d3.svg.arc()
	                    //             .innerRadius(chartInnerBefore)
	                    //             .outerRadius(chartOuterBefore)
	                    //         )
	                    //         // .style('stroke', '#ffffff')
	                    //         .attr('fill-opacity', '0.5');
	
	                    tooltip.draw(d, self, 'mouseout');
	                }
	
	            };
	
	            // count number of stack and calculate min time, max time from data
	            if (self.stack || self.ending === 0 || self.starting === 0) {
	
	                self.dataTarget.forEach(function (datum, index) {
	
	                    if (self.stack && Object.keys(stackList).indexOf(index) == -1) {
	                        stackList[index] = maxStack;
	                        maxStack++;
	                    }
	
	                    datum.value.forEach(function (time, i) {
	                        if (self.starting === 0) if (time.start < minTime || minTime === 0) minTime = time.start;
	                        if (self.ending === 0) {
	                            if (time.start > maxTime) maxTime = time.start;
	                            if (time.end > maxTime) maxTime = time.end;
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
	
	            //draw border
	            self.body.append("rect").attr("class", "c9-timeline-border-bar").attr("x", 0).attr("width", width).attr("y", 0 - self.itemMargin / 2).attr("height", (self.itemHeight + self.itemMargin) * self.dataTarget.length).attr("stroke", "rgb(154, 154, 154)").attr("stroke-width", 2).attr("fill", "none");
	
	            self.dataTarget.forEach(function (datum, index) {
	                var data = datum.value;
	
	                //draw background
	                if (self.backgroundColor) {
	                    var barYAxis = (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.body.selectAll("g").data(data).enter().insert("rect").attr("class", "c9-timeline-background-bar").attr("x", 0).attr("width", width).attr("y", barYAxis - self.itemMargin / 2).attr("height", self.itemHeight + self.itemMargin).attr("fill", _C14.default.isArray(self.backgroundColor) ? self.backgroundColor[index % (self.maxStack - 1)] : self.backgroundColor);
	                }
	
	                if (self.striped) {
	                    var barYAxis = (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.body.selectAll("g").data(data).enter().insert("rect").attr("class", "c9-timeline-background-bar").attr("x", 0).attr("width", width).attr("y", barYAxis - self.itemMargin / 2).attr("height", self.itemHeight + self.itemMargin).attr("fill", index % 2 ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)");
	                }
	
	                //draw item
	                self.body.selectAll("g").data(data).enter().append(function (d, i) {
	                    return document.createElementNS(d3.ns.prefix.svg, d.end != "Invalid Date" ? "rect" : "circle");
	                }).attr('class', 'c9-timeline-custom-rect').attr("x", getXPos).attr("y", getStackPosition).attr("width", function (d, i) {
	                    return (d.end - d.start) * scale;
	                }).attr("cy", function (d, i) {
	                    return getStackPosition(d, i) + self.itemHeight / 2;
	                }).attr("cx", getXPos).attr("r", self.itemHeight / 2).attr("height", self.itemHeight).style("fill", color(index));
	
	                if (self.rowSeparator && index < self.maxStack - 1) {
	                    var lineYAxis = self.itemHeight + self.itemMargin / 2 + (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.body.append("svg:line").attr("class", "c9-timeline-row-separator").attr("x1", 0).attr("x2", width).attr("y1", lineYAxis).attr("y2", lineYAxis).attr("stroke-width", 3).attr("stroke", _C14.default.isArray(self.rowSeparator) ? self.rowSeparator[index % (self.maxStack - 1)] : self.rowSeparator);
	                }
	
	                //draw the label left side item
	                if (!_C14.default.isEmpty(datum.name) && datum.name != "") {
	                    var rowsDown = self.margin.top + (self.itemHeight + self.itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + self.itemHeight * 0.75;
	
	                    d3.select(self.body[0][0].parentNode).append("text").attr("class", "c9-timeline-label").attr("transform", "translate(" + self.labelMargin + "," + rowsDown + ")").text(datum.name);
	                }
	                //draw icon
	                else if (!_C14.default.isEmpty(datum.icon) && datum.icon != "") {
	                        d3.select(self.body[0][0].parentNode).append("image").attr("class", "c9-timeline-label").attr("transform", "translate(" + self.labelMargin + "," + (self.margin.top + (self.itemHeight + self.itemMargin) * stackList[index]) + ")").attr("xlink:href", datum.icon).attr("width", self.itemHeight).attr("height", self.itemHeight);
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
	                return (d.start - self.starting) * scale;
	            }
	
	            function getXTextPos(d, i) {
	                return (d.start - self.starting) * scale + 5;
	            }
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	
	            self.options.axis.starting = self.starting;
	            self.options.axis.ending = self.ending;
	            var axis = new _C4.default(self.options.axis, self.body, self.dataTarget, self.width - self.margin.left - self.margin.right, (self.itemHeight + self.itemMargin) * self.maxStack, null, null);
	            var title = new _C6.default(self.options, self.body, self.width, self.height, self.margin);
	            var legend = new _C8.default(self.options.legend, self.body, self.colorRange, self.dataTarget);
	
	            self.updateInteraction();
	        }
	
	        /**
	         * Select all path as type RECT in Timeline Chart via its CLASS
	         */
	
	    }, {
	        key: 'selectAllRect',
	        value: function selectAllRect() {
	            var self = this;
	
	            return self.body.selectAll('.c9-timeline-custom-rect');
	        }
	
	        /**
	         * Update Interaction: Hover
	         * @return {} 
	         */
	
	    }, {
	        key: 'updateInteraction',
	        value: function updateInteraction() {
	            var self = this,
	                selector = self.selectAllRect();
	
	            selector.on(self.eventFactory);
	        }
	
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {
	            _get(TimeLine.prototype.__proto__ || Object.getPrototypeOf(TimeLine.prototype), 'on', this).call(this, eventType, callback);
	
	            var self = this;
	            var selector = self.selectAllRect();
	
	            // Update Event Factory
	            var eventFactory = {
	                'click.event': function clickEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseover.event': function mouseoverEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                },
	                'mouseout.event': function mouseoutEvent(d) {
	                    if (_C14.default.isFunction(callback)) {
	                        callback.call(this, d);
	                    }
	                }
	            };
	
	            var eventName = eventType + '.event';
	
	            selector.on(eventName, eventFactory[eventName]);
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
	                this._backgroundColor = newBackgroundColor;
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
	    }, {
	        key: 'striped',
	        get: function get() {
	            return this._striped;
	        },
	        set: function set(newStriped) {
	            if (newStriped) {
	                this._striped = newStriped;
	            }
	        }
	    }]);
	
	    return TimeLine;
	}(_C2.default);
	
	exports.default = TimeLine;

/***/ },
/* 14 */
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
	            layers: {
	                type: "Tile",
	                source: {
	                    name: "OSM"
	                }
	            },
	            view: {
	                lat: 0,
	                lon: 0,
	                zoom: 2
	            }
	        };
	
	        self._id = options.id || config.id;
	        self._data = options.data || config.data;
	        self._view = options.view || config.view;
	        self._markers = options.markers || [];
	        self._options = options;
	        self._layers = options.layers || config.layers;
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
	            var self = this;
	
	            //c9Layers contain all layers
	            self.c9Layers = [];
	            //c9Markers contain all markers
	            self.c9Markers = new ol.source.Vector({});
	            //c9Objects contain all polygons, lines
	            self.c9Objs = new ol.source.Vector({});
	            //init all thing relating to user's data
	
	            //layer
	            self.initLayer();
	
	            //quick markers
	            self.initMarker();
	
	            //object
	            self.initObj();
	        }
	    }, {
	        key: "draw",
	        value: function draw() {
	            var self = this;
	            self.c9View = new ol.View({
	                center: ol.proj.fromLonLat([self.view.lon, self.view.lat]),
	                zoom: self.view.zoom > 2 ? self.view.zoom : 2,
	                minZoom: 2
	            });
	            self.c9Map = new ol.Map({
	                target: self.id,
	                layers: self.c9Layers,
	                view: self.c9View,
	                interactions: ol.interaction.defaults({ doubleClickZoom: false })
	            });
	
	            //TODO - Create a function to gather all these event function
	            self.updateInteraction();
	        }
	        /*=====  End of Main Functions  ======*/
	
	        /**
	         * Create layer
	         * @param  {String} type of layer
	         * @param  {source} source data defined by C9
	         */
	
	    }, {
	        key: "createLayer",
	        value: function createLayer(type) {
	            var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	
	            var self = this;
	            var layer = new ol.layer[type]();
	            layer.setSource(self.setupSource(source));
	            self.c9Layers.push(layer);
	        }
	
	        /**
	         * Init Layer base on first user's data
	         */
	
	    }, {
	        key: "initLayer",
	        value: function initLayer() {
	            var self = this;
	            var layers = self.layers;
	
	            if (layers instanceof Array) {
	                layers.forEach(function (l, i) {
	                    self.createLayer(l.type, l.source);
	                });
	            } else {
	                self.createLayer(layers.type, layers.source);
	            }
	        }
	
	        /**
	         * Create marker
	         * @param  {Number} latitude of marker
	         * @param  {Number} longitude of marker
	         * @param  {String} image source (support for both local and net)
	         * @param  {Number} scale image if its size is too large - default = 1
	         */
	
	    }, {
	        key: "createMarker",
	        value: function createMarker(lat, lon) {
	            var imgSrc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'http://s21.postimg.org/blklb8scn/marker_icon.png';
	            var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	
	            var self = this;
	
	            var marker = new ol.Feature({
	                type: 'c9GeoMarker',
	                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
	            });
	
	            /**
	             * Create marker style
	             * @param  {String} image source
	             * @param  {Number} scale
	             * @return {ol.style.Style} return marker style
	             */
	            var createMarkerStyle = function createMarkerStyle(imgSrc, scale) {
	                return new ol.style.Style({
	                    image: new ol.style.Icon({
	                        anchor: [0.5, 1], //middle-width and bottom-height of image
	                        src: imgSrc,
	                        scale: scale
	                    })
	                });
	            };
	
	            marker.setStyle(createMarkerStyle(imgSrc, scale));
	
	            //add this marker to marker list (c9Markers)
	            self.c9Markers.addFeature(marker);
	        }
	
	        /**
	         * marker first set up
	         */
	
	    }, {
	        key: "initMarker",
	        value: function initMarker() {
	            var self = this;
	            //data
	            var markers = self.markers;
	            //add marker layer to layer list (c9Layers)
	            self.c9Layers.push(new ol.layer.Vector({
	                source: self.c9Markers
	            }));
	
	            if (markers.length === 0) return;
	
	            if (markers instanceof Array) {
	                markers.forEach(function (m, i) {
	                    self.createMarker(m.lat, m.lon, m.img, m.scale);
	                });
	            } else {
	                self.createMarker(markers.lat, markers.lon, markers.img, markers.scale);
	            }
	        }
	
	        /**
	         * Setup source for layer
	         * @param  {Object} source data style defined by c9
	         * @return {String} return source (ol.source)
	         */
	
	    }, {
	        key: "setupSource",
	        value: function setupSource(s) {
	            var source = undefined;
	            switch (s.name) {
	                case 'BingMaps':
	                    source = new ol.source.BingMaps({
	                        key: s.key,
	                        imagerySet: s.imagerySet || 'Road'
	                    });
	                    break;
	                case 'Stamen':
	                    source = new ol.source.Stamen({
	                        layer: s.layer || 'watercolor'
	                    });
	                    break;
	                /********** TileJSON require ol >= v3.8.2 **********/
	                case 'TileJSON':
	                    source = new ol.source.TileJSON({
	                        url: s.url,
	                        crossOrigin: s.crossOrigin || 'anonymous'
	                    });
	                    break;
	                case 'TileArcGISRest':
	                    source = new ol.source.TileArcGISRest({
	                        url: s.url
	                    });
	                    break;
	                case 'Vector':
	                    source = new ol.source.Vector({
	                        url: s.url,
	                        format: s.format === undefined ? null : new ol.format[s.format]({
	                            extractStyles: s.extractStyles || false
	                        })
	                    });
	                    break;
	                case 'Cluster':
	                    source = new ol.source.Cluster({
	                        distance: s.distance || 20,
	                        source: this.setupSource(s.source)
	                    });
	                    break;
	                case 'ImageVector':
	                    source = new ol.source.ImageVector({
	                        source: this.setupSource(s.source)
	                    });
	                    break;
	                default:
	                    source = new ol.source.OSM();
	                    break;
	
	            }
	            return source;
	        }
	
	        /**
	         * Create marker's flash effect
	         * @param  {ol.Feature}
	         */
	
	    }, {
	        key: "createMarkerEffect",
	        value: function createMarkerEffect(feature) {
	            var self = this;
	            var duration = 3000;
	            var start = new Date().getTime();
	            var listenerKey;
	
	            function animate(event) {
	                var vectorContext = event.vectorContext;
	                var frameState = event.frameState;
	                var flashGeom = feature.getGeometry().clone();
	                var elapsed = frameState.time - start;
	                var elapsedRatio = elapsed / duration;
	                // radius will be 5 at start and 30 at end.
	                var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
	                var opacity = ol.easing.easeOut(1 - elapsedRatio);
	
	                var style = new ol.style.Style({
	                    image: new ol.style.Circle({
	                        radius: radius,
	                        snapToPixel: false,
	                        stroke: new ol.style.Stroke({
	                            color: 'rgba(255, 0, 0, ' + opacity + ')',
	                            width: 0.25 + opacity
	                        })
	                    })
	                });
	
	                vectorContext.setStyle(style);
	                vectorContext.drawGeometry(flashGeom);
	                if (elapsed > duration) {
	                    ol.Observable.unByKey(listenerKey);
	                    return;
	                }
	                // tell OL3 to continue postcompose animation
	                self.c9Map.render();
	            }
	            listenerKey = self.c9Map.on('postcompose', animate);
	        }
	    }, {
	        key: "updateInteraction",
	        value: function updateInteraction() {
	            var self = this;
	            var LEFT_KEY = 37,
	                RIGHT_KEY = 39,
	                DURATION = 1000,
	                LOAD_MAP_DELAY = 500;
	
	            var getCoordinatesLonLat = function getCoordinatesLonLat(f) {
	                return ol.proj.transform(f.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
	            };
	            var getCoordinates = function getCoordinates(f) {
	                return f.getGeometry().getCoordinates();
	            };
	            var transformCoordinates = function transformCoordinates(c) {
	                return ol.proj.transform(c, 'EPSG:3857', 'EPSG:4326');
	            };
	            var panAnimation = function panAnimation(f) {
	                var pan = ol.animation.pan({
	                    duration: DURATION,
	                    source: self.c9View.getCenter()
	                });
	                self.c9Map.beforeRender(pan);
	                self.c9View.setCenter(getCoordinates(f));
	            };
	            /**
	             * Caculate distance between marker and center view, plus direction compare with center
	             * @param  {ol.Feature}
	             * @return {[Number, Boolean]} Array of distance value and direction value (left if true, right if false)
	             */
	            var distanceAndDirection = function distanceAndDirection(f) {
	                var center = transformCoordinates(self.c9View.getCenter());
	                var fCoordinates = getCoordinatesLonLat(f);
	                return [Math.sqrt(Math.pow(fCoordinates[0] - center[0], 2) + Math.pow(fCoordinates[1] - center[1], 2)), fCoordinates[0] - center[0] <= 0];
	            };
	            //register pointer move event to show cursor as pointer if user hover on markers
	            self.c9Map.on('pointermove', function (evt) {
	                self.c9Map.getTargetElement().style.cursor = self.c9Map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
	            });
	
	            //register map first render's event to show marker's effect
	            self.c9Map.once('postrender', function (evt) {
	                setTimeout(function () {
	                    self.c9Markers.getFeatures().forEach(function (f, i) {
	                        self.createMarkerEffect(f);
	                    });
	                }, LOAD_MAP_DELAY);
	            });
	
	            //register click event to show effect on markers
	            self.c9Map.on('click', function (evt) {
	                var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
	                    return feature;
	                });
	                if (f && f.get('type') == 'c9GeoMarker') {
	                    // self.createMarkerEffect(f);
	                    //test
	                    panAnimation(f);
	                }
	            });
	
	            //register keydown event to change center view
	            $(document).keydown(function (e) {
	                var keydownAnimate = function keydownAnimate(k) {
	                    var selectedFeature = undefined;
	                    var minDistance = Infinity;
	                    self.c9Markers.getFeatures().forEach(function (f, i) {
	                        var checkAnimate = distanceAndDirection(f);
	
	                        if ((checkAnimate[1] && k == LEFT_KEY || !checkAnimate[1] && k == RIGHT_KEY) && checkAnimate[0] < minDistance && checkAnimate[0] != 0) {
	                            minDistance = checkAnimate[0];
	                            selectedFeature = f;
	                        }
	                    });
	                    if (selectedFeature) {
	                        setTimeout(self.createMarkerEffect(selectedFeature), LOAD_MAP_DELAY);
	                        panAnimation(selectedFeature);
	                    }
	                };
	                switch (e.keyCode) {
	                    case LEFT_KEY:
	                        keydownAnimate(LEFT_KEY);
	                        break;
	                    case RIGHT_KEY:
	                        keydownAnimate(RIGHT_KEY);
	                        break;
	                }
	            });
	        }
	
	        /**
	         * obj first set up
	         */
	
	    }, {
	        key: "initObj",
	        value: function initObj() {
	            var self = this;
	
	            //add layer Vector to layer list (c9Layers)
	            self.c9Layers.push(new ol.layer.Vector({
	                source: self.c9Objs
	            }));
	        }
	
	        /**
	         * [createObj description]
	         * @param  {[type]} type        [description]
	         * @param  {[type]} data        [description]
	         * @param  {[type]} strokeWidth [description]
	         * @param  {[type]} strokeColor [description]
	         * @param  {[type]} fillColor   [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: "createObj",
	        value: function createObj(type, data, strokeWidth, strokeColor, fillColor) {
	            var self = this;
	
	            if (type != "polygon" && type != "line") throw "No support";
	
	            if (data == self.c9Markers) {
	                data = [];
	                self.c9Markers.getFeatures().forEach(function (d) {
	                    data.push(ol.proj.transform(d.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326'));
	                });
	            }
	
	            var obj = new ol.Feature({
	                geometry: type == "polygon" ? new ol.geom.Polygon([data]) : new ol.geom.LineString(data, 'XY')
	            });
	
	            obj.getGeometry().transform('EPSG:4326', 'EPSG:3857');
	
	            /**
	             * Create obj style
	             * @param  {Number} stroke width
	             * @param  {String} stroke color
	             * @param  {String} fill color
	             * @return {ol.style.Style} return obj style
	             */
	            var createObjStyle = function createObjStyle(strokeWidth, strokeColor, fillColor) {
	                return new ol.style.Style({
	                    stroke: new ol.style.Stroke({
	                        width: strokeWidth || 2,
	                        color: strokeColor || "steelblue"
	                    }),
	                    fill: new ol.style.Fill({
	                        color: fillColor || "rgba(0, 0, 255, 0.2)"
	                    })
	                });
	            };
	
	            obj.setStyle(createObjStyle(strokeWidth, strokeColor, fillColor));
	
	            //add this marker to marker list (c9Markers)
	            self.c9Objs.addFeature(obj);
	        }
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
	    }, {
	        key: "layers",
	        get: function get() {
	            return this._layers;
	        },
	        set: function set(newLayers) {
	            if (newLayers) {
	                this._layers = newLayers;
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
	    }]);
	
	    return Map;
	}();
	
	exports.default = Map;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=C9.js.map