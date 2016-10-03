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
	
	var _C5 = __webpack_require__(10);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(11);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(12);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(13);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(8);
	
	var _C16 = _interopRequireDefault(_C15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Helper Importer
	// Chart Importer
	module.exports = {
		BarChart: _C2.default,
		DonutChart: _C4.default,
		LineChart: _C6.default,
		PieChart: _C8.default,
		TimeLine: _C10.default,
	
		Map: _C12.default,
	
		DataAdapter: _C16.default
	};
	
	// Map Importer

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	        var barChartType = da.getDataTypeForBarChart();
	        if (barChartType != "single") {
	            self._groupNames = da.groups || da.stacks; //define group names use for showing legend
	            self._isGroup = barChartType == "group";
	        }
	
	        // self.data.forEach(function(d, i) {
	        //     var y0 = 0; // calculate stacked data (top of each bar)
	        //     var count = 0; // count number of group
	        //     groupStart = i; 
	        //     if (typeof d.value === "object") {
	        //         if (self.groupType == "stack") {
	        //             d.stack = d.value.map(function(v) {
	        //                 count++;
	        //                 return {name: d.name, y0: y0, y1: y0 += v, group: self._groupNames.length > 0 ? self._groupNames[count - 1] : "Group " + count};
	        //             });
	        //             d.total = d.stack[d.stack.length - 1].y1;
	        //         }
	        //         else if (self.groupType == "group") {
	        //             var total = -Infinity;
	        //             d.stack = d.value.map(function(v) {
	        //                 count++;
	        //                 total = v > total ? v : total;
	        //                 return {name: d.name, y0: y0, y1: v, group: self._groupNames.length > 0 ? self._groupNames[count - 1] : "Group " + count};
	        //             });
	        //             d.total = total;
	        //         }
	        //     }
	        //     else {
	        //         d.stack = [{name: d.name, y0: y0, y1: d.value, group: count > 0 ? self._groupNames.length > 0 ? self._groupNames[count] : "Group " + ++count : undefined}];
	        //         d.total = d.stack[d.stack.length - 1].y1;
	        //     }
	        //     if (count > groupCount)
	        //         groupCount = count;
	        // });
	
	        // // assign group to those first elements in data if they don't have
	        // for (var i = 0; i < groupStart - 1; i++) {
	        //     self.data[i].stack[0].group = self._groupNames.length > 0 ? self._groupNames[0] : "Group 1";
	        // };
	
	        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
	        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	        var y = d3.scale.linear().range([height, 0]);
	
	        x.domain(self.dataTarget.map(function (d) {
	            return d.stack[0].name;
	        }));
	
	        y.domain([0, d3.max(self.dataTarget, function (d) {
	            return d.max;
	        })]);
	
	        /******** Handle for grouped, stacked bar chart ********/
	        if (self._groupNames) {
	            self._xGroup = d3.scale.ordinal();
	            self._xGroup.domain(self._groupNames).rangeRoundBands([0, x.rangeBand()]);
	        }
	
	        //self-define group names if user do not define
	        // if (self._groupNames.length == 0)
	        //     for (var i = 1; i <= groupCount; i++) {
	        //         self._groupNames.push("Group " + i);
	        //     };
	
	        /**********************************************/
	
	        // Make flexible width according to barWidth
	        config.barWidth = x.rangeBand();
	        self._barWidth = options.barWidth || config.barWidth;
	        self._x = x;
	        self._y = y;
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
	                return "translate(" + x(d.stack[0].name) + ",0)";
	            });
	
	            var bars = bar.selectAll(".c9-custom-rect").data(function (d) {
	                return d.stack;
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
	                return y(d.y0) - y(d.y1);
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
	
	            var xGroup = d3.scale.ordinal();
	            xGroup.domain(groupNames).rangeRoundBands([0, self.x.rangeBand()]);
	
	            var xGroupOld = d3.scale.ordinal();
	            xGroupOld.domain(groupNamesOld).rangeRoundBands([0, self.x.rangeBand()]);
	
	            var midGroup = undefined;
	            //check add new label in the middle
	            if (groupNames.length > groupNamesOld.length && 0 < groupNames.indexOf(newLabel) && groupNames.indexOf(newLabel) < groupNames.length - 1) midGroup = groupNamesOld[groupNames.indexOf(newLabel)];
	
	            // self.body.selectAll(".c9-custom-rect").transition().duration(750).attr("height", 0).remove();
	            self.body.selectAll(".c9-custom-rect").data([]).exit().remove();
	
	            var bar = self.body.selectAll(".bar").data(data).enter().append("g").attr("class", "c9-chart-bar c9-custom-bar").attr("transform", function (d, i) {
	                return "translate(" + self.x(self.dataTarget[i].stack[0].name) + ",0)";
	            });
	
	            var bars = bar.selectAll(".c9-custom-rect").data(function (d) {
	                return d.stack;
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
	                return self.y(d.y1);
	            }).attr("width", function (d) {
	                return !self.isGroup ? self.x.rangeBand() : d.group == newLabel ? 0 : xGroupOld.rangeBand();
	            }).attr("height", function (d) {
	                return self.y(d.y0) - self.y(d.y1);
	            });
	
	            bars.transition().duration(750).attr("x", function (d) {
	                return !self.isGroup ? undefined : xGroup(d.group);
	            }).attr("width", function (d) {
	                return !self.isGroup ? self.x.rangeBand() : xGroup.rangeBand();
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
	            var axis = new _C4.default(self.options, self.body, self.dataTarget, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, null, null);
	            var title = new _C6.default(self.options, self.body, self.width, self.height, self.margin);
	            var legend = new _C8.default(self.options, self.body, self.dataTarget);
	
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
	                onMouseOutCallback = hoverOptions.onMouseOut.callback;
	
	            if (hoverEnable) {
	                // Define the div for the tooltip
	                // TODO: Allow user to add custom DIV, CLASS
	                // Make sure that: 
	                // - Rect not overflow the bar, if not, hover effect will be messed
	                // -> So, just align the rect to right/left (x: 25) to avoid it
	                // -> And, the text will be align also
	                var div = self.body.append('g').style('display', 'none');
	                // Rect Container
	                div.append('rect').attr('class', 'c9-custom-tooltip-box').attr('x', 25).attr('rx', 5).attr('ry', 5).style('position', 'absolute').style('width', '100px').style('height', '50px').style('fill', '#FEE5E2').style('stroke', '#FDCCC6').style('stroke-width', 2);
	                // First line
	                var text_1 = div.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 10).style('font-family', 'sans-serif').style('font-size', '10px');
	                // Second line
	                var text_2 = div.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 20).style('font-family', 'sans-serif').style('font-size', '10px');
	
	                selector.on("mouseover", function (d) {
	                    div.transition().duration(hoverOptions.onMouseOver.fadeIn).style("display", 'block').attr("transform", "translate(" + self.x(d.name) + "," + self.y(self.retrieveValue(d.y0, d.y1)) + ")");
	
	                    text_1.text('Name: ' + d.name);
	                    text_2.text('Value: ' + self.retrieveValue(d.y0, d.y1));
	                }).on("mouseout", function (d) {
	                    div.transition().duration(hoverOptions.onMouseOut.fadeOut).style('display', 'none');
	                });
	            }
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
	                        fadeIn: 200
	                    },
	                    onMouseOut: {
	                        fadeOut: 500
	                    }
	                }
	            },
	
	            // legend
	            legendShow: true,
	            legendPosition: "bottom",
	            legendInsetAnchor: "top-left",
	            legendPadding: 0,
	            // tooltip - show when mouseover on each data
	            tooltipShow: true,
	            tooltipPosition: undefined,
	
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
	                    value: "value"
	                },
	                groups: [],
	                stacks: []
	            }
	        };
	
	        self._id = options.id || config.id;
	        self._width = options.width || config.width;
	        self._height = options.height || config.height;
	        self._colorRange = options.colorRange || config.colorRange;
	        self._hover = options.hover || config.hover;
	
	        self._dataOption = _C2.default.merge(options.data, config.data);
	        self._dataTarget = null;
	        self._margin = _C2.default.merge(options.margin, config.margin);
	
	        // Skeleton: 
	        // SVG
	        // ---BODY (g)
	        // -------BlaBla
	        self._svg = null;
	        self._body = null;
	        self._options = options;
	
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
	        }
	
	        /**
	         * If colorRange is Array of color then scale range according to it
	         * If colorRange is a String like "category20", "category20b", etc. then scale using d3.scale.category
	         */
	        ,
	        set: function set(newHeight) {
	            if (newHeight) {
	                this._height = newHeight;
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
	        key: 'dataTarget',
	        get: function get() {
	            return this._dataTarget;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._dataTarget = arg;
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
	        return value === null || value === undefined || Util.isArray(value) && value.length === 0;
	    },
	
	    isObject: function isObject(object) {
	        return !Util.isEmpty(object) && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
	    },
	
	    isArray: function isArray(array) {
	        return Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]';
	    },
	
	    isFunction: function isFunction(func) {
	        return !Util.isEmpty(func) && typeof func === 'function';
	    },
	
	    merge: function merge(obj1, obj2) {
	        var obj3 = {};
	        for (var attrname in obj2) {
	            obj3[attrname] = obj2[attrname];
	        }
	        for (var attrname in obj1) {
	            obj3[attrname] = obj1[attrname];
	        }
	        return obj3;
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
	    }
	
	};
	
	var Util = {
	    isEmpty: function isEmpty(value) {
	        return value === null || value === undefined;
	    },
	
	    isArray: function isArray(array) {
	        return Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]';
	    }
	};
	
	module.exports = Helper;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Axis = function () {
	    function Axis(options, body, data, width, height, xAxe, yAxe) {
	        _classCallCheck(this, Axis);
	
	        var config = {
	            xAxisShow: true,
	            xAxisPadding: {}, // TODO
	            xAxisText: 'Name',
	            yAxisShow: true,
	            yAxisPadding: {}, // TODO
	            yAxisText: 'Value',
	            numOfTickY: 5,
	            tickFormat: "s", // refer: https://github.com/d3/d3-format
	            isLogaric: false, // TODO: Add isPower, isNormal(default), isLogaric
	            y2AxisShow: true,
	            y2AxisPadding: {}, // TODO
	            y2AxisText: 'Value',
	            gridXShow: false,
	            gridYShow: false
	        };
	
	        this._xAxisShow = options.xAxisShow || config.xAxisShow;
	        this._xAxisPadding = options.xAxisPadding || config.xAxisPadding;
	        this._xAxisText = options.xAxisText || config.xAxisText;
	        this._yAxisShow = options.yAxisShow || (body.type == "timeline" ? false : config.yAxisShow);
	        this._yAxisPadding = options.yAxisPadding || config.yAxisPadding;
	        this._yAxisText = options.yAxisText || config.yAxisText;
	        this._isLogaricVariant = options.isLogaric || config.isLogaric;
	        this._tickFormat = options.tickFormat || config.tickFormat;
	        this._numOfTickY = options.numOfTickY || config.numOfTickY;
	        this._y2AxisShow = options.y2AxisShow || config.y2AxisShow;
	        this._y2AxisPadding = options.y2AxisPadding || config.y2AxisPadding;
	        this._y2AxisText = options.y2AxisText || config.y2AxisText;
	        this._gridXShow = options.gridXShow || config.gridXShow;
	        this._gridYShow = options.gridYShow || config.gridYShow;
	
	        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	        var y;
	
	        if (this._isLogaricVariant) {
	            y = d3.scale.log().range([height, 0]);
	        } else {
	            y = d3.scale.linear().range([height, 0]);
	        }
	
	        x.domain(data.map(function (d) {
	            return d.name || d.stack[0].name;
	        }));
	
	        if (body.type == "bar") {
	            y.domain([d3.min(data, function (d) {
	                return d.max;
	            }), d3.max(data, function (d) {
	                return d.max;
	            })]);
	        } else y.domain([d3.min(data, function (d) {
	            return d.value;
	        }), d3.max(data, function (d) {
	            return d.value;
	        })]);
	
	        if (body.type == "timeline") {
	
	            var xScale = d3.time.scale().domain([options.starting, options.ending]).range([0, width]);
	            this._xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(options.tickFormat === undefined ? d3.time.format("%I %p") : options.tickFormat.format).tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize).ticks(options.tickFormat === undefined ? d3.time.hours : options.tickFormat.tickTime, options.tickFormat === undefined ? 1 : options.tickFormat.tickInterval);
	            delete options.starting;
	            delete options.ending;
	        } else if (body.type == "line") {
	
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
	
	        this._body = body;
	        this._data = data;
	        this._width = width; // TODO : ADD Getter/setter
	        this._height = height;
	
	        if (this._xAxisShow) {
	            this._body.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(this._xAxis).append("text").attr("dx", "-.8em").attr("dy", "-.55em").attr("x", width).attr("y", "20").style("text-anchor", "start").text(this._xAxisText);
	            // .attr("transform", "rotate(-90)" );
	        }
	
	        if (this._yAxisShow) {
	            this._body.append("g").attr("class", "y axis").call(this._yAxis).append("text")
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Legend = function () {
	    function Legend(options, body, data) {
	        _classCallCheck(this, Legend);
	
	        var config = {
	            legendShow: false,
	            legendPosition: [0, 0],
	            legendBox: false,
	            legendSize: 18,
	            legendTextSize: "14px",
	            legendMargin: [50, 5, 5, 5],
	            legendSpace: 150
	        };
	
	        var self = this;
	
	        self._legendShow = options.legendShow || config.legendShow;
	        self._legendTextSize = options.legendTextSize || config.legendTextSize;
	        self._legendPosition = options.legendPosition || config.legendPosition;
	        self._legendSize = options.legendSize || config.legendSize;
	        self._legendBox = options.legendBox || config.legendBox;
	        self._legendMargin = options.legendMargin || config.legendMargin;
	        self._legendSpace = options.legendSpace || config.legendSpace;
	        // self._legendStyle        = options.legendStyle      || config.legendStyle;
	
	        self._options = options;
	        self._body = body;
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
	
	            // var color = self.color;
	
	            if (self._legendShow) {
	                // TODO: Remove these conditional checks by getData for general purposes
	                var legendDomain = [];
	
	                // var setEnableData = function(_data, _flag) {
	                //     return {
	                //         'data': _data,
	                //         'enable': _flag
	                //     };
	                // };
	
	                // if (self._body.type == "line") {
	
	                //     var dataGroup = d3.nest()
	                //         .key(function(d) { return d.Client; })
	                //         .entries(self._data);
	
	                //     dataGroup.forEach(function(d, i) {
	                //         legendDomain.push(d.key);
	                //     });
	
	                // } else if (self._body.type == "bar") {
	
	                //     legendDomain = self._data;
	
	
	                // } else if (self._body.type == "pie" || self._body.type == "donut" || self._body.type == "timeline") {
	
	                //     self._data.forEach(function(d) {
	                //         d.name ? legendDomain.push(d.name) : legendDomain.push("");
	                //     });
	
	                // }
	
	
	                // Store for backup, and add enable flag to each data
	                // self.legendDomain = [];
	                // self._data.forEach(function(d) {
	                //     if (d) {
	                //         self.legendDomain.push(setEnableData(d, true));
	                //     }
	                // });
	
	                // var i;
	                // for (i = 0; i < legendDomain.length; i++) {
	                //     if (legendDomain[i] != "")
	                //         break;
	                // };
	
	                // if (i == legendDomain.length)
	                //     legendDomain = [];
	
	                // Calculate domain for color to draw
	                // color.domain(legendDomain);
	
	                if (self._body.type == "bar") {
	                    self.data = self.data[self.data.reduce(function (p, c, i, a) {
	                        return a[p].stack.length > c.stack.length ? p : i;
	                    }, 0)].stack;
	                }
	
	                // Legend will be appended in main SVG container
	                var legendContainer = d3.select(self._body[0][0].parentNode).append("g").attr("class", "c9-custom-legend c9-custom-legend-container").attr("transform", "translate(" + self._legendPosition[0] + "," + self._legendPosition[1] + ")");
	
	                // var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();
	
	                self.legendItem = legendContainer.selectAll("g.c9-custom-legend.c9-custom-legend-item")
	                // .data(color.domain())
	                .data(self.data).enter().append("g").attr("class", "c9-custom-legend c9-custom-legend-item").attr('data-ref', function (d) {
	                    return d['data-ref'];
	                }).attr("transform", function (d, i) {
	                    return "translate(" + (i * (self.legendSize + self.legendSpace) + self.legendMargin[0]) + "," + self.legendMargin[3] + ")";
	                });
	
	                self.legendItem.append('rect').attr('class', 'c9-custom-legend c9-custom-legend-rect').attr('width', self.legendSize * 2).attr('height', self.legendSize).attr('r', self.legendSize).attr('fill', function (d) {
	                    return d.color;
	                }).attr('stroke', function (d) {
	                    return d.color;
	                });
	
	                self.legendItem.append('text').attr('class', 'c9-custom-legend c9-custom-legend-text').attr('x', self._legendSize * 2 + 20).attr('y', 15)
	                // .attr('text-anchor', 'middle')
	                .text(function (d) {
	                    return self._body.type == "bar" ? d.group : d.name;
	                });
	
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
	        key: "updateInteractionForDonutPieChart",
	        value: function updateInteractionForDonutPieChart(chart, path, pie, currentData, arc) {
	
	            var self = this;
	
	            var chartType = chart.chartType;
	
	            var chartInnerBefore = chartType == 'pie' ? 0 : chart.innerRadius,
	                chartOuterBefore = chartType == 'pie' ? chart.radius : chart.outerRadius,
	                chartInnerAfter = chartType == 'pie' ? 0 : chart.innerRadius,
	                chartOuterAfter = chartType == 'pie' ? chart.radius * 1.2 : chart.outerRadius * 1.2;
	
	            self.legendItemEventFactory = {
	
	                'click': function click(item) {
	
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
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	
	                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");
	
	                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter)).attr('fill-opacity', '1.0');
	                    // var enable = true,
	                    //     dataSet = self.legendDomain,
	                    //     isCurrentEnable = true;
	
	                    // var totalEnable = d3.sum(dataSet.map(function(d) {
	                    //     if (d.data.name == item && !d.enable) isCurrentEnable = false;
	                    //     return (d.enable) ? 1 : 0;
	                    // }));
	
	                    // // Add pointer to cursor
	                    // selector.style('cursor', 'pointer');
	
	                    // // If current selector is disabled, then remains it
	                    // // Else, turn enabled to disabled
	                    // if (!isCurrentEnable) {
	                    //     return false;
	                    // } else {
	                    //     if (totalEnable < 2) return;
	                    //     selector.style('opacity', '0.5');
	                    //     enable = false;
	                    // }
	
	                    // chart.pie.value(function(d) {
	                    //     if (d.data.name == item) d.tempEnable = enable;
	                    //     else d.tempEnable = d.enable;
	
	                    //     return (d.tempEnable) ? d.data.value : 0;
	                    // });
	
	                    // path = path.data(chart.pie(dataSet));
	
	                    // path.transition()
	                    //     .duration(200)
	                    //     .attrTween('d', function(d) {
	                    //         var interpolate = d3.interpolate(chart.currentData, d);
	                    //         // Returns an interpolator between the two arbitrary values a and b. 
	                    //         // The interpolator implementation is based on the type of the end value b.
	                    //         chart.currentData = interpolate(0);
	                    //         return function(t) {
	                    //             return arc(interpolate(t));
	                    //         };
	                    //     });
	                },
	
	                'mouseout': function mouseout(item) {
	
	                    var legendSelector = d3.select(this);
	                    // Add pointer to cursor
	                    legendSelector.style('cursor', 'pointer');
	
	                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");
	
	                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore)).attr('fill-opacity', '0.5');
	                    // var dataSet = self.legendDomain,
	                    //     isCurrentEnable = true;
	
	                    // var totalEnable = d3.sum(dataSet.map(function(d) {
	                    //     if (d.data.name == item && !d.enable) isCurrentEnable = false;
	                    //     return (d.enable) ? 1 : 0;
	                    // }));
	
	                    // // Add pointer to cursor
	                    // selector.style('cursor', 'pointer');
	
	                    // chart.pie.value(function(d) {
	                    //     if (d.data.name == item && !d.enable) d.enable = enable;
	                    //     return (d.enable) ? d.data.value : 0;
	                    // });
	
	                    // if (!isCurrentEnable) {
	                    //     return;
	                    // } else {
	                    //     if (totalEnable < 2 || selector.style('opacity') == '1') return;
	                    //     selector.style('opacity', '1.0');
	                    // }
	
	                    // path = path.data(chart.pie(dataSet));
	
	                    // path.transition()
	                    //     .duration(200)
	                    //     .attrTween('d', function(d) {
	                    //         var interpolate = d3.interpolate(chart.currentData, d);
	                    //         // Returns an interpolator between the two arbitrary values a and b. 
	                    //         // The interpolator implementation is based on the type of the end value b.
	                    //         chart.currentData = interpolate(0);
	                    //         return function(t) {
	                    //             return arc(interpolate(t));
	                    //         };
	                    //     });
	                }
	
	            };
	
	            if (self.legendShow) {
	
	                self.legendItem.on(self.legendItemEventFactory);
	            }
	        }
	
	        /**
	         * Update interaction for barchart
	         * @param  {[type]} chart       [description]
	         * @param  {[type]} path        [description]
	         * @param  {[type]} pie         [description]
	         * @param  {[type]} currentData [description]
	         * @param  {[type]} arc         [description]
	         * @return {[type]}             [description]
	         */
	
	    }, {
	        key: "updateInteractionForBarChart",
	        value: function updateInteractionForBarChart(chart) {
	
	            var self = this;
	
	            self.legendItemEventFactory = {
	
	                'click': function click(item) {
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
	                    if (selector.style('opacity') == '0.1') {
	                        selector.style('opacity', '1.0');
	                    } else {
	                        if (totalEnable < 2) return;
	                        selector.style('opacity', '0.1');
	                        enable = false;
	                    }
	
	                    //set current data for legend
	                    self.data.forEach(function (d, i) {
	                        if (d.enable) enableSetOld.push(d.group);
	                        if (d.group == item.group) d.enable = enable;
	                        if (d.enable) enableSet.push(d.group);
	                    });
	
	                    //TODO - handle total - use for axis
	                    dataBackup.forEach(function (d, i) {
	                        var element = { stack: [], max: d.max };
	                        d.stack.forEach(function (s, j) {
	                            enableSet.forEach(function (e) {
	                                if (e == s.group) {
	                                    element.stack.push(s);
	                                }
	                            });
	                        });
	                        data.push(element);
	                    });
	
	                    chart.updateLegendInteraction(data, enableSet, enableSetOld, item.group);
	                }
	
	            };
	
	            if (self.legendShow) {
	
	                self.legendItem.on(self.legendItemEventFactory);
	            }
	        }
	    }, {
	        key: "setYLocation",
	        value: function setYLocation(height, margin) {
	            if (this.legendPosition === 'top') {
	                return margin.top / 2;
	            } else if (this.legendPosition === 'bottom') {
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
	        key: "legendShow",
	        get: function get() {
	            return this._legendShow;
	        },
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
	    }, {
	        key: "legendMargin",
	        get: function get() {
	            return this._legendMargin;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._legendMargin = arg;
	            }
	        }
	    }, {
	        key: "legendSpace",
	        get: function get() {
	            return this._legendSpace;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._legendSpace = arg;
	            }
	        }
	    }, {
	        key: "legendItem",
	        get: function get() {
	            return this._legendItem;
	        },
	        set: function set(newLegendItem) {
	            if (newLegendItem) {
	                this._legendItem = newLegendItem;
	            }
	        }
	    }, {
	        key: "legendDomain",
	        get: function get() {
	            return this._legendDomain;
	        },
	        set: function set(newLegendDomain) {
	            if (newLegendDomain) {
	                this._legendDomain = newLegendDomain;
	            }
	        }
	    }, {
	        key: "legendItemEventFactory",
	        get: function get() {
	            return this._legendItemEventFactory;
	        },
	        set: function set(newLegendItemEventFactory) {
	            if (newLegendItemEventFactory) {
	                this._legendItemEventFactory = newLegendItemEventFactory;
	            }
	        }
	    }]);
	
	    return Legend;
	}();
	
	exports.default = Legend;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tooltip = function () {
	    function Tooltip(options, body, data) {
	        _classCallCheck(this, Tooltip);
	
	        var config = {
	            show: true,
	            position: top,
	            offset: [-10, 0],
	            class: 'd3-tip'
	        };
	
	        this._show = options.show || config.show;
	        this._position = options.position || config.position;
	        this._offset = options.offset || config.offset;
	        this._class = options.class || config.class;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Tooltip, [{
	        key: 'show',
	        get: function get() {
	            return this._show;
	        }
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        ,
	        set: function set(newShow) {
	            if (newShow) {
	                this._show = newShow;
	            }
	        }
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	
	        /*=====  End of Main Functions  ======*/
	
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
	                value: "value"
	            },
	            groups: [],
	            stacks: [],
	
	            // NO NEED TO ADD TO DATA OPTIONS
	            // Just use to define default parameters
	            colorRange: null
	        };
	
	        self._keys = _C2.default.merge(options.keys, config.keys);
	        self._groups = options.groups || config.groups;
	        self._stacks = options.stacks || config.stacks;
	        self._colorRange = options.colorRange || config.colorRange;
	
	        self._dataSource = null;
	        self._dataTarget = []; // Initialize new Array to use Array methods
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
	                        var _group = {
	                            "max": null,
	                            "stack": []
	                        },
	                            _dsArray = _C2.default.get(self.keys.value, data);
	
	                        // If Group has only 1 value, so MAX = this.value
	                        if (_C2.default.isArray(_dsArray)) {
	                            _group.max = _C2.default.max(_dsArray);
	                        } else {
	                            _group.max = _dsArray;
	                        }
	
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
	                                    "y0": 0,
	                                    "y1": d,
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
	                                "y0": 0,
	                                "y1": _dsArray,
	                                "group": groups[0] || 0,
	                                "name": _C2.default.get(self.keys.name, data),
	                                "data-ref": _C2.default.guid(),
	                                "enable": true
	                            };
	                            _stack.push(_stackItem);
	                        }
	                        _group.stack = _stack;
	
	                        self.dataTarget.push(_group);
	                    });
	
	                    return self.dataTarget;
	                    break;
	
	                case "stack":
	                    var stacks = self.stacks;
	
	                    // Iterate over each group
	                    self.dataSource.forEach(function (data, index) {
	                        var _group = {
	                            "max": null,
	                            "stack": []
	                        },
	                            _dsArray = _C2.default.get(self.keys.value, data);
	
	                        // If Group has only 1 value, so MAX = this.value
	                        if (_C2.default.isArray(_dsArray)) {
	                            _group.max = _C2.default.sum(_dsArray);
	                        } else {
	                            _group.max = _dsArray;
	                        }
	
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
	                                var _tempY0 = 0;
	                                _dsArray.forEach(function (d, i) {
	                                    _stackItem = {
	                                        "color": color(i),
	                                        "y0": _tempY0,
	                                        "y1": _tempY0 + d,
	                                        "group": stacks[i] || i,
	                                        "name": _C2.default.get(self.keys.name, data),
	                                        "data-ref": _C2.default.guid(),
	                                        "enable": true
	                                    };
	                                    _stack.push(_stackItem);
	                                    // Increase tempY0 by d to restore previous y0
	                                    _tempY0 += d;
	                                });
	                            })();
	                        } else {
	                            _stackItem = {
	                                "color": color(0),
	                                "y0": 0,
	                                "y1": _dsArray,
	                                "group": stacks[0] || 0,
	                                "name": _C2.default.get(self.keys.name, data),
	                                "data-ref": _C2.default.guid(),
	                                "enable": true
	                            };
	                            _stack.push(_stackItem);
	                        }
	                        _group.stack = _stack;
	
	                        self.dataTarget.push(_group);
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
	                    "start": null,
	                    "end": null,
	                    "color": "#fff",
	                    "data-ref": null,
	                    "enable": true
	                };
	
	                if (_C2.default.isArray(_dsArray)) {
	                    _dsArray.forEach(function (d, i) {
	                        _valueItem = {
	                            "start": d.start,
	                            "end": d.end,
	                            "color": color(index),
	                            "data-ref": _C2.default.guid(),
	                            "enable": true
	                        };
	                        _valueArray.push(_valueItem);
	                    });
	                } else {
	                    _valueItem = {
	                        "start": d.start,
	                        "end": d.end,
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
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(8);
	
	var _C10 = _interopRequireDefault(_C9);
	
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
	
	        var da = new _C10.default(dataOption);
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
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback;
	
	            // Define Animations for paths
	            self.pathAnim = function (path, dir) {
	                switch (dir) {
	
	                    case 'mouseover':
	                        path.transition().attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter))
	                        // .style('stroke', '#000')
	                        .attr('fill-opacity', '1.0');
	                        break;
	
	                    case 'mouseout':
	                        path.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore))
	                        // .style('stroke', '#000')
	                        .attr('fill-opacity', '0.5');
	                        break;
	
	                }
	            };
	
	            // Main Event Dispatch for paths in donut chart
	            self.eventFactory = {
	
	                'mouseover': function mouseover(d, i, j) {
	                    self.pathAnim(d3.select(this), 'mouseover');
	                    self.tooltip().mouseover(d);
	
	                    // var thisDonut = self.body..select('.type' + j);
	                    // thisDonut.select('.value').text(function(donut_d) {
	                    //     return d.data.val.toFixed(1) + donut_d.unit;
	                    // });
	                    // thisDonut.select('.percentage').text(function(donut_d) {
	                    //     return (d.data.val/donut_d.total*100).toFixed(2) + '%';
	                    // });
	                },
	
	                'mouseout': function mouseout(d, i, j) {
	                    self.pathAnim(d3.select(this), 'mouseout');
	                    self.tooltip().mouseout(d);
	
	                    // var thisDonut = charts.select('.type' + j);
	                    // setCenterText(thisDonut);
	                }
	
	            };
	
	            // Define the tooltip
	            // TODO: Define it as a individual CLASS, in C9.Tooltip
	            self.tooltip = function () {
	                // First, remove all before hover div
	                self.body.selectAll('g.c9-custom-tooltip-container').remove();
	
	                // TODO: Add margin to tooltip configs
	                // Default: (100, 100) relative to mouse coordinate and chart margin transformation
	                var divOnHover = self.body.append('g').attr('class', 'c9-custom-tooltip-container').attr("transform", function () {
	                    return 'translate(' + (d3.mouse(this)[0] - 100) + "," + (d3.mouse(this)[1] - 100) + ')';
	                }).style('display', 'none');
	
	                var arc = d3.svg.arc().outerRadius(self.outerRadius).innerRadius(self.innerRadius);
	
	                // Rect Container
	                divOnHover.append('rect').attr('class', 'c9-custom-tooltip-box').attr('x', 25).attr('rx', 5).attr('ry', 5).style('position', 'absolute').style('width', '100px').style('height', '50px').attr('fill', '#FEE5E2').attr('stroke', '#FDCCC6').attr('stroke-width', 2);
	                // First line
	                var text_1 = divOnHover.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 10).style('font-family', 'sans-serif').style('font-size', '10px');
	                // Second line
	                var text_2 = divOnHover.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 20).style('font-family', 'sans-serif').style('font-size', '10px');
	
	                var tooltipEventFactory = {
	
	                    'mouseover': function mouseover(d) {
	                        divOnHover.transition().duration(hoverOptions.onMouseOver.fadeIn).style("display", 'block');
	
	                        var name = d.data.name || d.data.data.name,
	                            value = d.data.value || d.data.data.value;
	
	                        text_1.text('Name: ' + name);
	                        text_2.text('Value: ' + value);
	                    },
	
	                    'mouseout': function mouseout(d) {
	                        divOnHover.transition().duration(hoverOptions.onMouseOut.fadeOut).style('display', 'none');
	                    }
	
	                };
	
	                return tooltipEventFactory;
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
	            }).attr('stroke', '#ffffff').attr('fill-opacity', '0.5').each(function (d) {
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
	            var legend = new _C8.default(self.options, self.body, self.dataTarget);
	
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
	                hoverEnable = self.hover.enable,
	                hoverOptions = self.hover.options,
	                selector = self.selectAllPath(),
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback;
	
	            if (hoverEnable) {
	                selector.on(self._eventFactory);
	            }
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
	        key: 'eventFactory',
	        get: function get() {
	            return this._eventFactory;
	        },
	        set: function set(newEventFactory) {
	            if (newEventFactory) {
	                this._eventFactory = newEventFactory;
	            }
	        }
	    }, {
	        key: 'pathAnim',
	        get: function get() {
	            return this._pathAnim;
	        },
	        set: function set(newPathAnim) {
	            if (newPathAnim) {
	                this._pathAnim = newPathAnim;
	            }
	        }
	    }, {
	        key: 'tooltip',
	        get: function get() {
	            return this._tooltip;
	        },
	        set: function set(newTooltip) {
	            if (newTooltip) {
	                this._tooltip = newTooltip;
	            }
	        }
	    }, {
	        key: 'pie',
	        get: function get() {
	            return this._pie;
	        },
	        set: function set(newPie) {
	            if (newPie) {
	                this._pie = newPie;
	            }
	        }
	    }, {
	        key: 'arc',
	        get: function get() {
	            return this._arc;
	        },
	        set: function set(newArc) {
	            if (newArc) {
	                this._arc = newArc;
	            }
	        }
	    }, {
	        key: 'currentData',
	        get: function get() {
	            return this._currentData;
	        },
	        set: function set(newCurrentData) {
	            if (newCurrentData) {
	                this._currentData = newCurrentData;
	            }
	        }
	    }, {
	        key: 'chartType',
	        get: function get() {
	            return this._body.type;
	        }
	    }]);
	
	    return DonutChart;
	}(_C2.default);
	
	exports.default = DonutChart;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
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
	            pointShow: false,
	            pointFill: "#fb8072",
	            pointStroke: "#d26b5f",
	            pointOpacity: 1.0,
	            pointRadius: 5,
	            pointHoverEnable: false,
	            interpolate: "linear" // refer: https://www.dashingd3js.com/svg-paths-and-d3js
	        };
	
	        self._pointShow = options.pointShow || config.pointShow;
	        self._pointRadius = options.pointRadius || config.pointRadius;
	        self._pointFill = options.pointFill || config.pointFill;
	        self._pointStroke = options.pointStroke || config.pointStroke;
	        self._pointOpacity = options.pointOpacity || config.pointOpacity;
	        self._pointHoverEnable = options.pointHoverEnable || config.pointHoverEnable;
	        self._interpolate = options.interpolate || config.interpolate;
	        self.body.type = "line";
	
	        var width = self.width - self.margin.left - self.margin.right;
	        var height = self.height - self.margin.top - self.margin.bottom;
	
	        var x = d3.scale.linear().range([0, width]);
	        var y = d3.scale.linear().range([height, 0]);
	
	        self._x = x;
	        self._y = y;
	
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
	            var self = this,
	                x = self._x,
	                y = self._y;
	
	            self._dataGroup = d3.nest().key(function (d) {
	                return d.Client;
	            }).entries(self.data);
	
	            var dataGroup = self._dataGroup;
	
	            x.domain([d3.min(self.data, function (d) {
	                return d.year;
	            }), d3.max(self.data, function (d) {
	                return d.year;
	            })]);
	            y.domain([d3.min(self.data, function (d) {
	                return d.sale;
	            }), d3.max(self.data, function (d) {
	                return d.sale;
	            })]);
	
	            self.xAxis = d3.svg.axis().scale(x);
	            self.yAxis = d3.svg.axis().scale(y).orient("left");
	
	            var lineGen = d3.svg.line().x(function (d) {
	                return x(d.year);
	            }).y(function (d) {
	                return y(d.sale);
	            }).interpolate(self.interpolate);
	
	            var _body = self.body,
	                _colorRange = self.colorRange,
	                _pointShow = self.pointShow,
	                _pointRadius = self.pointRadius,
	                _pointFill = self.pointFill,
	                _pointStroke = self.pointStroke,
	                _pointOpacity = self.pointOpacity;
	
	            dataGroup.forEach(function (d, i) {
	                _body.append('path').attr('d', lineGen(d.values)).attr('stroke', _colorRange(i)).attr('stroke-width', 2).attr('id', 'line_' + d.key).attr('fill', 'none');
	
	                if (_pointShow) {
	                    _body.selectAll("dot").data(d.values).enter().append("circle").attr('class', 'c9-chart-line c9-circle-custom').attr("r", _pointRadius).attr("cx", function (_d) {
	                        return x(_d.year);
	                    }).attr("cy", function (_d) {
	                        return y(_d.sale);
	                    }).style("fill", _pointFill).style("stroke", _pointStroke).style("opacity", _pointOpacity);
	                }
	            });
	        }
	
	        /**
	         * Main draw function of Line Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	
	            var axis = new _C4.default(self.options, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self.xAxis, self.yAxis);
	            var title = new _C6.default(self.options, self.body, self.width, self.height, self.margin);
	            var legend = new _C8.default(self.options, self.body, self.colorRange, self.data);
	
	            // Draw legend
	            legend.draw();
	
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
	         * Update Interaction: Hover
	         */
	
	    }, {
	        key: 'updateInteraction',
	        value: function updateInteraction() {
	            var self = this,
	                hoverEnable = self.hover.enable,
	                hoverOptions = self.hover.options,
	                selector = self.selectAllCircle(),
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback;
	
	            if (hoverEnable) {
	                // Define the div for the tooltip
	                // TODO: Allow user to add custom DIV, CLASS
	                // Make sure that: 
	                // - Rect not overflow the bar, if not, hover effect will be messed
	                // -> So, just align the rect to right/left (x: 25) to avoid it
	                // -> And, the text will be align also
	                var div = self.body.append('g').style('display', 'none');
	                // .style('opacity', 0);
	                // Rect Container
	                div.append('rect').attr('class', 'c9-custom-tooltip-box').attr('x', 25).attr('rx', 5).attr('ry', 5).style('position', 'absolute').style('width', '100px').style('height', '50px').style('fill', '#FEE5E2').style('stroke', '#FDCCC6').style('stroke-width', 2);
	                // First line
	                var text_1 = div.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 10).style('font-family', 'sans-serif').style('font-size', '10px');
	                // Second line
	                var text_2 = div.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 20).style('font-family', 'sans-serif').style('font-size', '10px');
	
	                selector.on("mouseover", function (d) {
	                    div.transition().duration(hoverOptions.onMouseOver.fadeIn).style("display", 'block').attr("transform", "translate(" + self.x(d.year) + "," + self.y(d.sale) + ")");
	
	                    text_1.text('Name: ' + d.year);
	                    text_2.text('Value: ' + d.sale);
	                }).on("mouseout", function (d) {
	                    div.transition().duration(hoverOptions.onMouseOut.fadeOut).style("display", 'none');
	                });
	            }
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
	        key: 'dataGroup',
	        get: function get() {
	            return this._dataGroup;
	        },
	        set: function set(newDataGroup) {
	            if (newDataGroup) {
	                this._dataGroup = newDataGroup;
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
	
	//         // this.body.selectAll('g')
	//         //         .data(this.sortedDataX)
	//         //         .enter()
	//         //         .append('path')
	//         //         .attr('class', 'line')
	//         //         .attr('d', function(d){
	//         //             return lineFunc(d.coordinate);
	//         //         });
	//         this.body.selectAll('dot')
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(14);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(8);
	
	var _C12 = _interopRequireDefault(_C11);
	
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
	
	        var da = new _C12.default(dataOption);
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
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback;
	
	            // Define Animations for paths
	            self.pathAnim = function (path, dir) {
	                switch (dir) {
	
	                    case 'mouseover':
	                        path.transition().attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter))
	                        // .style('stroke', '#FFFFF3')
	                        .attr('fill-opacity', '1.0');
	                        break;
	
	                    case 'mouseout':
	                        path.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore))
	                        // .style('stroke', '#ffffff')
	                        .attr('fill-opacity', '0.5');
	                        break;
	                }
	            };
	
	            // Main Event Dispatch for paths in pie chart
	            self.eventFactory = {
	
	                'mouseover': function mouseover(d, i, j) {
	                    self.pathAnim(d3.select(this), 'mouseover');
	                    self.tooltip().mouseover(d);
	
	                    // var thisDonut = self.body..select('.type' + j);
	                    // thisDonut.select('.value').text(function(pie_d) {
	                    //     return d.data.val.toFixed(1) + pie_d.unit;
	                    // });
	                    // thisDonut.select('.percentage').text(function(pie_d) {
	                    //     return (d.data.val/pie_d.total*100).toFixed(2) + '%';
	                    // });
	                },
	
	                'mouseout': function mouseout(d, i, j) {
	                    self.pathAnim(d3.select(this), 'mouseout');
	                    self.tooltip().mouseout(d);
	
	                    // var thisDonut = charts.select('.type' + j);
	                    // setCenterText(thisDonut);
	                }
	
	            };
	
	            // Define the tooltip
	            // TODO: Define it as a individual CLASS, in C9.Tooltip
	            self.tooltip = function () {
	                // First, remove all before hover div
	                self.body.selectAll('g.c9-custom-tooltip-container').remove();
	
	                // TODO: Add margin to tooltip configs
	                // Default: (100, 100) relative to mouse coordinate and chart margin transformation
	                var divOnHover = self.body.append('g').attr('class', 'c9-custom-tooltip-container').attr("transform", function () {
	                    return 'translate(' + (d3.mouse(this)[0] - 100) + "," + (d3.mouse(this)[1] - 100) + ')';
	                }).style('display', 'none');
	
	                var arc = d3.svg.arc().innerRadius(0).outerRadius(self.radius);
	
	                // Rect Container
	                divOnHover.append('rect').attr('class', 'c9-custom-tooltip-box').attr('x', 25).attr('rx', 5).attr('ry', 5).style('position', 'absolute').style('width', '100px').style('height', '50px').style('fill', '#FEE5E2').style('stroke', '#FDCCC6').style('stroke-width', 2);
	                // First line
	                var text_1 = divOnHover.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 10).style('font-family', 'sans-serif').style('font-size', '10px');
	                // Second line
	                var text_2 = divOnHover.append('text').attr('class', 'c9-custom-tooltip-label').attr('x', 30).attr('y', 20).style('font-family', 'sans-serif').style('font-size', '10px');
	
	                var tooltipEventFactory = {
	
	                    'mouseover': function mouseover(d) {
	                        divOnHover.transition().duration(hoverOptions.onMouseOver.fadeIn).style("display", 'block');
	
	                        var name = d.data.name || d.data.data.name,
	                            value = d.data.value || d.data.data.value;
	
	                        text_1.text('Name: ' + name);
	                        text_2.text('Value: ' + value);
	                    },
	
	                    'mouseout': function mouseout(d) {
	                        divOnHover.transition().duration(hoverOptions.onMouseOut.fadeOut).style('display', 'none');
	                    }
	
	                };
	
	                return tooltipEventFactory;
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
	            }).attr('stroke', '#ffffff').attr('fill-opacity', '0.5').each(function (d) {
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
	            var legend = new _C8.default(self.options, self.body, self.dataTarget);
	            var table = new _C10.default(self.options.table, self.body, self.dataTarget);
	
	            // Draw legend
	            legend.draw();
	            legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);
	
	            // Draw table
	            table.draw();
	
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
	            .selectAll('path.c9-chart-pie.c9-custom-path');
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
	                selector = self.selectAllPath(),
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback;
	
	            if (hoverEnable) {
	                selector.on(self.eventFactory);
	            }
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
	        key: 'eventFactory',
	        get: function get() {
	            return this._eventFactory;
	        },
	        set: function set(newEventFactory) {
	            if (newEventFactory) {
	                this._eventFactory = newEventFactory;
	            }
	        }
	    }, {
	        key: 'pathAnim',
	        get: function get() {
	            return this._pathAnim;
	        },
	        set: function set(newPathAnim) {
	            if (newPathAnim) {
	                this._pathAnim = newPathAnim;
	            }
	        }
	    }, {
	        key: 'tooltip',
	        get: function get() {
	            return this._tooltip;
	        },
	        set: function set(newTooltip) {
	            if (newTooltip) {
	                this._tooltip = newTooltip;
	            }
	        }
	    }, {
	        key: 'pie',
	        get: function get() {
	            return this._pie;
	        },
	        set: function set(newPie) {
	            if (newPie) {
	                this._pie = newPie;
	            }
	        }
	    }, {
	        key: 'arc',
	        get: function get() {
	            return this._arc;
	        },
	        set: function set(newArc) {
	            if (newArc) {
	                this._arc = newArc;
	            }
	        }
	    }, {
	        key: 'currentData',
	        get: function get() {
	            return this._currentData;
	        },
	        set: function set(newCurrentData) {
	            if (newCurrentData) {
	                this._currentData = newCurrentData;
	            }
	        }
	    }, {
	        key: 'chartType',
	        get: function get() {
	            return this._body.type;
	        }
	    }]);
	
	    return PieChart;
	}(_C2.default);
	
	exports.default = PieChart;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(2);
	
	var _C2 = _interopRequireDefault(_C);
	
	var _C3 = __webpack_require__(4);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(5);
	
	var _C6 = _interopRequireDefault(_C5);
	
	var _C7 = __webpack_require__(6);
	
	var _C8 = _interopRequireDefault(_C7);
	
	var _C9 = __webpack_require__(3);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(8);
	
	var _C12 = _interopRequireDefault(_C11);
	
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
	
	        var da = new _C12.default(dataOption);
	        self.dataTarget = da.getDataTarget("timeline");
	
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
	            self.body.append("rect").attr("class", "timeline-border-bar").attr("x", 0).attr("width", width).attr("y", 0 - self.itemMargin / 2).attr("height", (self.itemHeight + self.itemMargin) * self.dataTarget.length).attr("stroke", "rgb(154, 154, 154)").attr("stroke-width", 2).attr("fill", "none");
	
	            self.dataTarget.forEach(function (datum, index) {
	                var data = datum.value;
	
	                //draw background
	                if (self.backgroundColor) {
	                    var barYAxis = (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.body.selectAll("g").data(data).enter().insert("rect").attr("class", "timeline-background-bar").attr("x", 0).attr("width", width).attr("y", barYAxis - self.itemMargin / 2).attr("height", self.itemHeight + self.itemMargin).attr("fill", _C10.default.isArray(self.backgroundColor) ? self.backgroundColor[index % (self.maxStack - 1)] : self.backgroundColor);
	                }
	
	                if (self.striped) {
	                    var barYAxis = (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.body.selectAll("g").data(data).enter().insert("rect").attr("class", "timeline-background-bar").attr("x", 0).attr("width", width).attr("y", barYAxis - self.itemMargin / 2).attr("height", self.itemHeight + self.itemMargin).attr("fill", index % 2 ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)");
	                }
	
	                //draw item
	                self.body.selectAll("g").data(data).enter().append(function (d, i) {
	                    return document.createElementNS(d3.ns.prefix.svg, d.end ? "rect" : "circle");
	                }).attr("x", getXPos).attr("y", getStackPosition).attr("width", function (d, i) {
	                    return (d.end - d.start) * scale;
	                }).attr("cy", function (d, i) {
	                    return getStackPosition(d, i) + self.itemHeight / 2;
	                }).attr("cx", getXPos).attr("r", self.itemHeight / 2).attr("height", self.itemHeight).style("fill", color(index));
	
	                //draw label inside item
	                // self.body.selectAll("g")
	                //     .data(data).enter()
	                //     .append("text")
	                //     .attr("x", getXTextPos)
	                //     .attr("y", getStackTextPosition)
	                //     .text(function(d) {
	                //       return d.name;
	                //     });
	
	                if (self.rowSeparator && index < self.maxStack - 1) {
	                    var lineYAxis = self.itemHeight + self.itemMargin / 2 + (self.itemHeight + self.itemMargin) * stackList[index];
	                    self.body.append("svg:line").attr("class", "timeline-row-separator").attr("x1", 0).attr("x2", width).attr("y1", lineYAxis).attr("y2", lineYAxis).attr("stroke-width", 3).attr("stroke", _C10.default.isArray(self.rowSeparator) ? self.rowSeparator[index % (self.maxStack - 1)] : self.rowSeparator);
	                }
	
	                //draw the label left side item
	                if (!_C10.default.isEmpty(datum.name) && datum.name != "") {
	                    var rowsDown = self.margin.top + (self.itemHeight + self.itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + self.itemHeight * 0.75;
	
	                    d3.select(self.body[0][0].parentNode).append("text").attr("class", "timeline-label").attr("transform", "translate(" + self.labelMargin + "," + rowsDown + ")").text(datum.name);
	                }
	                //draw icon
	                else if (!_C10.default.isEmpty(datum.icon) && datum.icon != "") {
	                        d3.select(self.body[0][0].parentNode).append("image").attr("class", "timeline-label").attr("transform", "translate(" + self.labelMargin + "," + (self.margin.top + (self.itemHeight + self.itemMargin) * stackList[index]) + ")").attr("xlink:href", datum.icon).attr("width", self.itemHeight).attr("height", self.itemHeight);
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
	            this.options.starting = this.starting;
	            this.options.ending = this.ending;
	            // var axis    = new Axis(this.options, this.body, this.dataTarget, this.width - this.margin.left - this.margin.right, (this.itemHeight + this.itemMargin) * this.maxStack, null, null);
	            var title = new _C6.default(this.options, this.body, this.width, this.height, this.margin);
	            var legend = new _C8.default(this.options, this.body, this.colorRange, this.dataTarget);
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
/* 13 */
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
	
	            //init all thing relating to user's data
	
	            //layer
	            self.initLayer();
	
	            //quick markers
	            self.initMarker();
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
	         * Create marker style
	         * @param  {String} image source
	         * @param  {Number} scale
	         * @return {ol.style.Style} return marker style
	         */
	
	    }, {
	        key: "createMarkerStyle",
	        value: function createMarkerStyle(imgSrc, scale) {
	            return new ol.style.Style({
	                image: new ol.style.Icon({
	                    anchor: [0.5, 1], //middle-width and bottom-height of image
	                    src: imgSrc,
	                    scale: scale
	                })
	            });
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
	            marker.setStyle(self.createMarkerStyle(imgSrc, scale));
	
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
/* 14 */
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
	
	var Table = function () {
	    function Table(options, body, data) {
	        _classCallCheck(this, Table);
	
	        var config = {
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
	        key: 'draw',
	
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function draw() {
	            var self = this;
	
	            if (self.show) {
	
	                var table = d3.select(self.container).append("table");
	                var thead = table.append("thead");
	                var tbody = table.append("tbody");
	
	                // Append the headers
	                thead.append("tr").selectAll("th").append("th").text("No").data(self.headings).enter().append("th").text(function (d) {
	                    return d;
	                });
	
	                // Bind each statistic to a line of the table
	                // Show serial no.
	                var rows = tbody.selectAll("tr").data(self.data).enter().append("tr");
	
	                rows.append("td").text(function (d, i) {
	                    return i + 1;
	                });
	
	                // Add statistic names to each row
	                rows.append("td").text(function (d) {
	                    return d.name;
	                });
	
	                // Add values to each row
	                rows.append("td").text(function (d) {
	                    return d.value;
	                });
	            }
	        }
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: 'data',
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
	        key: 'body',
	        get: function get() {
	            return this._body;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._body = arg;
	            }
	        }
	    }, {
	        key: 'container',
	        get: function get() {
	            return this._container;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._container = arg;
	            }
	        }
	    }, {
	        key: 'show',
	        get: function get() {
	            return this._show;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._show = arg;
	            }
	        }
	    }, {
	        key: 'headings',
	        get: function get() {
	            return this._headings;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._headings = arg;
	            }
	        }
	    }, {
	        key: 'style',
	        get: function get() {
	            return this._style;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._style = arg;
	            }
	        }
	    }, {
	        key: 'serial',
	        get: function get() {
	            return this._serial;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._serial = arg;
	            }
	        }
	    }, {
	        key: 'hover',
	        get: function get() {
	            return this._hover;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._hover = arg;
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
	    }]);
	
	    return Table;
	}();
	
	exports.default = Table;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=C9.js.map