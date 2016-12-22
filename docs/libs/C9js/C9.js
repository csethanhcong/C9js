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
	
	var _C3 = __webpack_require__(10);
	
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
	
	var _C15 = __webpack_require__(9);
	
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
	
	var _C11 = __webpack_require__(8);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(9);
	
	var _C16 = _interopRequireDefault(_C15);
	
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
	
	        // var config = {
	        //     // barWidth: undefined,
	        //     isLogaric: false,
	        // };
	
	        self.config = {
	            // barWidth: undefined,
	            isLogaric: false
	        };
	
	        // self.updateConfig(config);
	        return _this;
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	    // get barWidth() {
	    //     return this._barWidth;
	    // }
	
	    _createClass(BarChart, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        /**
	         * Init Bar Chart Config
	         */
	        value: function updateConfig(config, callback) {
	            _get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), 'updateConfig', this).call(this, config);
	
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(config, self.options);
	
	            self.chartType = "bar";
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            // TESTING
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                var barChartType = da.getDataTypeForBarChart();
	                if (barChartType != "single") {
	                    self._groupNames = da.groups.length > 0 ? da.groups : da.stacks; //define group names use for showing legend
	                    self._isGroup = barChartType == "group";
	                }
	
	                var width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
	                var x = d3.scale.ordinal().rangeRoundBands([0, width], .1),
	                    y = self.options.isLogaric ? d3.scale.log().range([height, 0]) : d3.scale.linear().range([height, 0]);
	
	                var minMax = _C14.default.getMinMax(self.dataTarget, barChartType, self.options.isLogaric);
	
	                x.domain(self.dataTarget.map(function (d) {
	                    return d[0].name;
	                }));
	
	                y.domain([minMax.min, minMax.max]);
	
	                /******** Handle for grouped, stacked bar chart ********/
	                if (self.groupNames) {
	                    self.xGroup = d3.scale.ordinal();
	                    self.xGroup.domain(self.groupNames).rangeRoundBands([0, x.rangeBand()]);
	                }
	
	                /**********************************************/
	
	                // Make flexible width according to barWidth
	                // self.barWidth       = self.options.barWidth  ||  x.rangeBand();
	                self.x = x;
	                self.y = y;
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	
	            // var da = new DataAdapter(dataOption);
	            // self.dataTarget = da.getDataTarget(self.chartType);
	            // console.log(self.dataTarget);
	            // self.dataSource = da.dataSource;
	
	            // var barChartType = da.getDataTypeForBarChart();
	            // if (barChartType != "single") {
	            //     self._groupNames    = da.groups.length > 0 ? da.groups : da.stacks;  //define group names use for showing legend
	            //     self._isGroup       = barChartType == "group";
	            // }
	
	            // var width        = self.width - self.margin.left - self.margin.right,
	            //     height       = self.height - self.margin.top - self.margin.bottom;
	
	            // // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
	            // var x = d3.scale.ordinal().rangeRoundBands([0, width], .1),
	            //     y = self.options.isLogaric ? d3.scale.log().range([height, 0]) : d3.scale.linear().range([height, 0]);
	
	            // var minMax = Helper.getMinMax(self.dataTarget, barChartType, self.options.isLogaric);
	
	            // x.domain(self.dataTarget.map(function(d) {
	            //     return d[0].name;
	            // }));
	
	            // y.domain([minMax.min, minMax.max]);
	
	            // /******** Handle for grouped, stacked bar chart ********/
	            // if (self.groupNames) {
	            //     self.xGroup = d3.scale.ordinal();
	            //     self.xGroup.domain(self.groupNames).rangeRoundBands([0, x.rangeBand()]);
	            // }
	
	            // /**********************************************/
	
	            // // Make flexible width according to barWidth
	            // // self.barWidth       = self.options.barWidth  ||  x.rangeBand();
	            // self.x              = x;
	            // self.y              = y;
	        }
	
	        /**
	         * Update Chart Data Config
	         * Notes: Merge Deep change order of Config and Option
	         * ---------------------------------------------------
	         */
	
	    }, {
	        key: 'updateDataConfig',
	        value: function updateDataConfig(dataCfg, callback) {
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(self.options, dataCfg);
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                var barChartType = da.getDataTypeForBarChart();
	                if (barChartType != "single") {
	                    self._groupNames = da.groups.length > 0 ? da.groups : da.stacks; //define group names use for showing legend
	                    self._isGroup = barChartType == "group";
	                }
	
	                var width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
	                var x = d3.scale.ordinal().rangeRoundBands([0, width], .1),
	                    y = self.options.isLogaric ? d3.scale.log().range([height, 0]) : d3.scale.linear().range([height, 0]);
	
	                var minMax = _C14.default.getMinMax(self.dataTarget, barChartType, self.options.isLogaric);
	
	                x.domain(self.dataTarget.map(function (d) {
	                    return d[0].name;
	                }));
	
	                y.domain([minMax.min, minMax.max]);
	
	                /******** Handle for grouped, stacked bar chart ********/
	                if (self.groupNames) {
	                    self.xGroup = d3.scale.ordinal();
	                    self.xGroup.domain(self.groupNames).rangeRoundBands([0, x.rangeBand()]);
	                }
	
	                /**********************************************/
	
	                // Make flexible width according to barWidth
	                // self.barWidth       = self.options.barWidth  ||  x.rangeBand();
	                self.x = x;
	                self.y = y;
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	
	        /**
	         * Update chart based on data
	         * @param  {[type]} data [description]
	         */
	
	    }, {
	        key: 'update',
	        value: function update(data) {
	            var self = this;
	
	            self.body.selectAll(".c9-chart-bar.c9-custom-rect").data([]).exit().remove();
	            self.body.selectAll(".c9-chart-bar.c9-custom-bar").data([]).exit().remove();
	
	            var color = self.colorRange,
	                x = self.x,
	                y = self.y,
	                xGroup = self.xGroup;
	
	            var bar = self.body.selectAll(".c9-chart-bar.c9-custom-bar").data(data).enter().append("g").attr("class", "c9-chart-bar c9-custom-bar").attr("transform", function (d) {
	                return "translate(" + x(d[0].name) + ",0)";
	            });
	
	            var bars = bar.selectAll(".c9-chart-bar.c9-custom-rect").data(function (d) {
	                return d;
	            });
	
	            bars.enter().append("rect").attr("class", "c9-chart-bar c9-custom-rect").style("fill", function (d, i) {
	                return d.color || color(i);
	            }).attr("x", function (d) {
	                return self.isGroup ? xGroup(d.group) : undefined;
	            }).attr("y", function (d) {
	                return y(d.y1);
	            }).attr("width", function (d) {
	                return self.isGroup ? xGroup.rangeBand() : x.rangeBand();
	            }).attr("height", function (d) {
	                return self.options.isLogaric ? y(y.domain()[0]) - y(d.y0) : y(0) - y(Math.abs(d.y0));
	            });
	
	            self.updateInteraction();
	        }
	
	        /**
	         * Update Interaction with Legend
	         * @param  {[type]} data          [description]
	         * @param  {[type]} groupNames    [description]
	         * @param  {[type]} groupNamesOld [description]
	         * @param  {[type]} newLabel      [description]
	         */
	
	    }, {
	        key: 'updateLegendInteraction',
	        value: function updateLegendInteraction(data, groupNames, groupNamesOld, newLabel) {
	            var self = this;
	            var type = self.groupType;
	
	            var y = self.y;
	            var minMax = _C14.default.getMinMax(data, self.isGroup == false ? "stack" : null, self.options.isLogaric);
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
	            self.body.selectAll(".c9-chart-bar.c9-custom-rect").data([]).exit().remove();
	            self.body.selectAll(".c9-chart-bar.c9-custom-bar").data([]).exit().remove();
	
	            var bar = self.body.selectAll(".c9-chart-bar.c9-custom-bar").data(data).enter().append("g").attr("class", "c9-chart-bar c9-custom-bar").attr("transform", function (d, i) {
	                return "translate(" + self.x(self.dataTarget[i][0].name) + ",0)";
	            });
	
	            var bars = bar.selectAll(".c9-custom-rect").data(function (d) {
	                return d;
	            });
	
	            bars.enter().append("rect").attr("class", "c9-chart-bar c9-custom-rect").style("fill", function (d) {
	                return d.color;
	            }).attr("x", function (d) {
	                // use for stack
	                if (!self.isGroup) return undefined;
	                // use for group
	                // group member positioning at the end of groups, so its x is the position of right edge of bar
	                if (groupNames.length > groupNamesOld.length && d.group == newLabel && groupNames.indexOf(newLabel) == groupNames.length - 1) return self.x.rangeBand();
	                return midGroup ? d.group == newLabel ? xGroupOld(midGroup) : xGroupOld(d.group) : xGroupOld(d.group);
	            }).attr("y", function (d) {
	                return self.isGroup ? y(d.y1) : self.options.isLogaric ? y(y.domain()[1]) : y(0);
	            }).attr("width", function (d) {
	                return !self.isGroup ? self.x.rangeBand() : d.group == newLabel ? 0 : xGroupOld.rangeBand();
	            }).attr("height", function (d) {
	                return self.options.isLogaric ? y(y.domain()[0]) - y(d.y0) : self.isGroup ? y(0) - y(Math.abs(d.y0)) : 0;
	            });
	
	            bars.transition().duration(750).attr("x", function (d) {
	                return !self.isGroup ? undefined : xGroup(d.group);
	            }).attr("width", function (d) {
	                return !self.isGroup ? self.x.rangeBand() : xGroup.rangeBand();
	            }).attr("y", function (d) {
	                return y(d.y1);
	            }).attr("height", function (d) {
	                return self.options.isLogaric ? y(y.domain()[0]) - y(d.y0) : y(0) - y(Math.abs(d.y0));
	            });
	
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
	
	            var tooltip = new _C12.default(self.options.tooltip);
	
	            // Update Event Factory
	            self.eventFactory = {
	                'click': function click(d) {
	                    if (_C14.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, d);
	                    }
	                },
	                'mouseover': function mouseover(d) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, d);
	                    }
	
	                    // For table
	                    if (self.options.table.show) {
	                        var tr = d3.selectAll('.c9-table-container>.c9-table-body tr');
	                        tr.filter(function (i) {
	                            return i['data-ref'] != d['data-ref'];
	                        }).selectAll('td').style('opacity', '0.5');
	                        var selectedItem = tr.filter(function (i) {
	                            return i['data-ref'] == d['data-ref'];
	                        });
	                        //set its style and scroll to its pos
	                        selectedItem.selectAll('td').style('opacity', '1');
	                        _C14.default.scroll(d3.select('.c9-table-container')[0][0], selectedItem[0][0].offsetTop, 200);
	                    }
	
	                    d3.select(this).style("fill", function (d, i) {
	                        return self.getLightenColor(d.color || color(i));
	                    });
	
	                    tooltip.draw(d, self, 'mouseover');
	                },
	                'mouseout': function mouseout(d) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, d);
	                    }
	
	                    // For Table
	                    if (self.options.table.show) d3.selectAll('.c9-table-container>.c9-table-body tr').selectAll('td').style('opacity', '');
	
	                    d3.select(this).style("fill", function (d, i) {
	                        return d.color || color(i);
	                    });
	
	                    tooltip.draw(d, self, 'mouseout');
	                }
	            };
	
	            selector.on(self.eventFactory);
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	        /*========================================
	        =            User's Functions            =
	        ========================================*/
	
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
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
	
	        /**
	         * [Main draw function of Bar Chart]
	         * @return {[type]} [description]
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            _get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), 'draw', this).call(this);
	
	            var self = this;
	
	            // var axis    = new Axis(self.options.axis, self, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom);
	            // var title   = new Title(self.options.title, self);
	            // var legend  = new Legend(self.options.legend, self, self.dataTarget);
	            // var table   = new Table(self.options.table, self, self.dataTarget);
	
	            // self.axis = axis;
	            // self.title = title;
	            // self.table = table;
	            // self.legend = legend;
	
	            // TESTING
	            self.updateConfig(self.config, function (data) {
	                var axis = new _C4.default(self.options.axis, self, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom);
	                var title = new _C6.default(self.options.title, self);
	                var legend = new _C8.default(self.options.legend, self, self.dataTarget);
	                var table = new _C10.default(self.options.table, self, self.dataTarget);
	                self.axis = axis;
	                self.title = title;
	                self.table = table;
	                self.legend = legend;
	
	                // Draw axis
	                // self.axis.draw();
	
	
	                // Update Chart based on dataTarget
	                self.update(data);
	                self.updateInteraction();
	
	                // Draw title
	                self.title.draw();
	
	                // Draw legend
	                self.legend.draw();
	                self.legend.updateInteractionForBarChart(self);
	
	                // Draw table
	                self.table.draw();
	                self.table.updateInteractionForBarChart(self);
	            });
	
	            // // Draw axis
	            // self.axis.draw();
	
	            // // Draw title
	            // self.title.draw();
	
	            // // Update Chart based on dataTarget
	            // self.update(self.dataTarget);
	            // self.updateInteraction();
	
	            // // Draw legend
	            // self.legend.draw();
	            // self.legend.updateInteractionForBarChart(self);
	
	            // // Draw table
	            // self.table.draw();
	            // self.table.updateInteractionForBarChart(self);
	        }
	
	        /**
	         * Set option via stand-alone function
	         * @param {[type]} key   [description]
	         * @param {[type]} value [description]
	         */
	
	    }, {
	        key: 'setOption',
	        value: function setOption(key, value) {
	            _get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), 'setOption', this).call(this, key, value);
	
	            var self = this;
	
	            _C14.default.set(key, value, self.options);
	
	            self.updateConfig(self.options);
	        }
	
	        /**
	         * Update chart based on new data with optional dataConfig
	         * @param  {[type]} data       [description]
	         * @param  {[type]} dataConfig [description]
	         */
	
	    }, {
	        key: 'updateData',
	        value: function updateData(newData, newDataConfig) {
	            var self = this;
	
	            var newCfg = {};
	
	            if (!_C14.default.isEmpty(newDataConfig)) {
	
	                newCfg.data = {
	                    plain: newData,
	                    keys: newDataConfig
	                };
	            } else {
	
	                newCfg.data = {
	                    plain: newData
	                };
	            }
	
	            // Update Chart
	            self.updateDataConfig(newCfg, function (data) {
	                self.update(data);
	
	                // Update Axis
	                self.axis.update(self.x, self.y, 100);
	
	                // Update Legend
	                self.legend.update(data);
	                self.legend.updateInteractionForBarChart(self);
	
	                // Update Table
	                self.table.update(data);
	            });
	        }
	        /*=====  End of User's Functions  ======*/
	
	    }, {
	        key: 'groupType',
	        get: function get() {
	            return this._groupType;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        // set barWidth(arg) {
	        //     if (arg) {
	        //         this._barWidth = arg;
	        //     }
	        // }
	
	        set: function set(arg) {
	            if (arg) {
	                this._groupType = arg;
	            }
	        }
	    }, {
	        key: 'xGroup',
	        get: function get() {
	            return this._xGroup;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._xGroup = arg;
	            }
	        }
	    }, {
	        key: 'groupNames',
	        get: function get() {
	            return this._groupNames;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._groupNames = arg;
	            }
	        }
	    }, {
	        key: 'isGroup',
	        get: function get() {
	            return this._isGroup;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._isGroup = arg;
	            }
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
	            width: 750,
	            height: 500,
	            margin: {
	                top: 100,
	                left: 50,
	                right: 50,
	                bottom: 50
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
	
	            // title
	            title: {
	                show: true,
	                text: "Sample Chart",
	                position: 'top',
	                fontSize: "14px"
	            },
	
	            // legend
	            legend: {
	                show: true,
	                position: "top",
	                size: 10,
	                fontSize: "12px",
	                fontColor: "#999",
	                fontWeight: 'bold',
	                margin: [5, 5, 5, 5],
	                space: 10
	            },
	
	            // tooltip
	            tooltip: {
	                show: true,
	                position: 'right', // [top, right, bottom, left]
	                backgroundColor: 'rgba(0, 0, 0, 0.8)',
	                fontColor: '#fff',
	                fontSize: '11px',
	                format: null
	            },
	
	            // table 
	            table: {
	                container: "body",
	                show: false,
	                headings: ["Name", "Value"],
	                style: "stripe", // "strip", "border"
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
	            },
	
	            // sub-chart
	            subchart: {
	                show: false,
	                height: 100
	            }
	        };
	
	        self._options = options;
	
	        self.initConfig(config);
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
	         * Init parent config
	         * Only in BaseClass <Chart> to init config
	         */
	        value: function initConfig(config) {
	            var self = this;
	
	            self.options = _C2.default.mergeDeep(config, self.options);
	
	            var options = self.options;
	
	            self.id = options.id || config.id;
	            self.width = options.width || config.width;
	            self.height = options.height || config.height;
	            self.colorRange = options.colorRange || config.colorRange;
	
	            self.margin = _C2.default.merge(options.margin, config.margin);
	            self.hover = _C2.default.merge(options.hover, config.hover);
	            self.click = _C2.default.merge(options.click, config.click);
	
	            self.dataOption = _C2.default.mergeDeep(config.data, options.data);
	
	            self.options.subchart = _C2.default.merge(options.subchart, config.subchart);
	            self.options.table = _C2.default.merge(options.table, config.table);
	            self.options.tooltip = _C2.default.merge(options.tooltip, config.tooltip);
	            self.options.legend = _C2.default.merge(options.legend, config.legend);
	            self.options.axis = _C2.default.mergeDeep(config.axis, options.axis);
	        }
	
	        /**
	         * Update parent config
	         */
	
	    }, {
	        key: 'updateConfig',
	        value: function updateConfig(config) {
	            var self = this;
	
	            self.options = _C2.default.mergeDeep(config, self.options);
	
	            var options = self.options;
	
	            self.id = options.id || config.id;
	            self.width = options.width || config.width;
	            self.height = options.height || config.height;
	            self.colorRange = options.colorRange || config.colorRange;
	
	            self.margin = _C2.default.merge(options.margin, config.margin);
	            self.hover = _C2.default.merge(options.hover, config.hover);
	            self.click = _C2.default.merge(options.click, config.click);
	
	            self.dataOption = _C2.default.mergeDeep(config.data, options.data);
	
	            self.options.subchart = _C2.default.merge(options.subchart, config.subchart);
	            self.options.table = _C2.default.merge(options.table, config.table);
	            self.options.tooltip = _C2.default.merge(options.tooltip, config.tooltip);
	            self.options.legend = _C2.default.merge(options.legend, config.legend);
	            self.options.axis = _C2.default.mergeDeep(config.axis, options.axis);
	        }
	
	        /**
	         * Draw or Re-draw Base Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	
	            var margin = self.margin,
	                id = self.id,
	                width = self.width - margin.left - margin.right,
	                height = self.height - margin.top - margin.bottom;
	
	            self.container = d3.select(id);
	
	            // Remove existing chart at current container
	            self.container.selectAll(".c9-svg").data([]).exit().remove();
	
	            self.svg = d3.select(id).style('position', 'relative').append("svg").attr('class', 'c9-svg').attr("width", self.width).attr("height", self.height).style('overflow', 'visible'); // to overwrite overflow: hidden by Boostrap as default
	
	
	            self.svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", width).attr("height", height);
	
	            self.body = self.svg.append("g").attr('class', 'c9-chart c9-custom-container').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	        }
	
	        /**
	         * Get lightening color to create effect when interacting
	         * @param  {[type]} color [description]
	         */
	
	    }, {
	        key: 'getLightenColor',
	        value: function getLightenColor(color) {
	            return _C2.default.shadeColor(0.5, color);
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	        /*========================================
	        =            User's Functions            =
	        ========================================*/
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {}
	
	        /**
	         * Set option via stand-alone function
	         * @param {[type]} key   [description]
	         * @param {[type]} value [description]
	         */
	
	    }, {
	        key: 'setOption',
	        value: function setOption(key, value) {
	            var self = this;
	
	            _C2.default.set(key, value, self.options);
	
	            // Self-update on Base Chart to make sure that self.options consisting
	            // of all new values
	            self.updateConfig(self.options);
	        }
	
	        /**
	         * Update chart based on new data with optional dataConfig
	         * @param  {[type]} data       [description]
	         * @param  {[type]} dataConfig [description]
	         */
	
	    }, {
	        key: 'updateData',
	        value: function updateData(data, dataConfig) {}
	        /*=====  End of User's Functions  ======*/
	
	    }, {
	        key: 'container',
	        get: function get() {
	            return this._container;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._container = arg;
	            }
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            if (this._id !== 'body') {
	                return '#' + this._id;
	            }
	            return this._id;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._id = arg;
	            }
	        }
	    }, {
	        key: 'width',
	        get: function get() {
	            return this._width;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._width = arg;
	            }
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return this._height;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._height = arg;
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
	        set: function set(arg) {
	            if (arg) {
	                this._colorRange = arg;
	            }
	        }
	    }, {
	        key: 'margin',
	        get: function get() {
	            return this._margin;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._margin = arg;
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
	        set: function set(arg) {
	            if (arg) {
	                this._svg = arg;
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
	        key: 'options',
	        get: function get() {
	            return this._options;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._options = arg;
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
	        key: 'dataSource',
	        get: function get() {
	            return this._dataSource;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._dataSource = arg;
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
	        key: 'chartType',
	        get: function get() {
	            return this._chartType;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._chartType = arg;
	            }
	        }
	    }, {
	        key: 'title',
	        get: function get() {
	            return this._title;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._title = arg;
	            }
	        }
	    }, {
	        key: 'axis',
	        get: function get() {
	            return this._axis;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._axis = arg;
	            }
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
	    }, {
	        key: 'table',
	        get: function get() {
	            return this._table;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._table = arg;
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
	
	    // Overlap source by target
	    merge: function merge(target, source) {
	        var obj3 = {};
	        for (var attrname in source) {
	            if (!Util.isEmpty(source[attrname])) obj3[attrname] = source[attrname];
	        }
	        for (var attrname in target) {
	            if (!Util.isEmpty(target[attrname])) obj3[attrname] = target[attrname];
	        }
	        return obj3;
	    },
	
	    // Overlap target by source
	    mergeDeep: function mergeDeep(target, source) {
	        return _mergeDeep(target, source);
	    },
	
	    get: function get(_key, _data) {
	        var _keys = _key.split(".");
	        var _current = _data;
	
	        for (var i = 0; i < _keys.length; i++) {
	
	            if ('undefined' == typeof _current[_keys[i]]) {
	                return '';
	            } else {
	                _current = _current[_keys[i]];
	            }
	        }
	
	        return _current;
	    },
	
	    set: function set(_key, _value, _context) {
	        var _current = _context; // a moving reference to internal objects within obj
	        var _keys = _key.split('.');
	        var len = _keys.length;
	        for (var i = 0; i < len - 1; i++) {
	            var _handle = _keys[i];
	            if (!_current[_handle]) _current[_handle] = {};
	            _current = _current[_handle];
	        }
	
	        _current[_keys[len - 1]] = _value;
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
	        if (type == "stack") {
	            data.forEach(function (d) {
	                d.forEach(function (s) {
	                    if (s.y0 > 0) _temp.push(s.y1);else _temp.push(s.y1 + s.y0);
	                });
	            });
	        } else {
	            data.forEach(function (d) {
	                d.forEach(function (s) {
	                    _temp.push(s.y0);
	                });
	            });
	        }
	
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
	        // Convert color from 'Name' to 'Hex'
	        from = Util.convertColorToHex(from) || from;
	
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
	            f = this.sbcRip(from),
	            t = this.sbcRip(to);
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
	    },
	    textDx: function textDx(angle) {
	        var sin = Math.sin(angle * Math.PI / 180).toFixed(15);
	        return 8 * sin;
	    },
	    textY: function textY(angle) {
	        return 11.5 - 2.5 * (angle / 15) * (angle > 0 ? 1 : -1);
	    },
	    textAnchor: function textAnchor(angle) {
	        var sin = Math.sin(angle * Math.PI / 180).toFixed(15);
	        return sin == 0 ? "middle" : sin > 0 ? "start" : "end";
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
	    },
	
	    convertColorToHex: function convertColorToHex(colour) {
	        var colours = {
	            "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
	            "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
	            "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
	            "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
	            "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
	            "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
	            "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
	            "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
	            "honeydew": "#f0fff0", "hotpink": "#ff69b4",
	            "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
	            "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
	            "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
	            "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
	            "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
	            "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
	            "navajowhite": "#ffdead", "navy": "#000080",
	            "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
	            "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
	            "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
	            "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
	            "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
	            "violet": "#ee82ee",
	            "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
	            "yellow": "#ffff00", "yellowgreen": "#9acd32"
	        };
	
	        if (typeof colours[colour.toLowerCase()] != 'undefined') return colours[colour.toLowerCase()];
	
	        return false;
	    }
	};
	
	function _mergeDeep(target, source) {
	    if (Util.isObject(target) && Util.isObject(source)) {
	        for (var key in source) {
	            if (Util.isObject(source[key])) {
	                if (Helper.isEmpty(target[key])) {
	                    Object.assign(target, _defineProperty({}, key, {}));
	                }
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
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
	
	            //draw x axis
	            self.chart.body.append("g").attr("class", "c9-axis c9-axis-x").attr("transform", "translate(0," + self.height + ")").call(self.xAxis);
	
	            //draw tick
	            self.chart.svg.select(".c9-axis.c9-axis-x").selectAll("text").style("text-anchor", _C2.default.textAnchor(self.options.x.tick.rotate)).attr("y", _C2.default.textY(self.options.x.tick.rotate)).attr("x", 0).attr("dy", ".71em").attr("dx", _C2.default.textDx(self.options.x.tick.rotate)).attr("transform", "rotate(" + self.options.x.tick.rotate + ")");
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
	
	            // update tick position
	            self.chart.svg.selectAll(".c9-axis.c9-axis-x>g.tick>text").style("text-anchor", _C2.default.textAnchor(self.options.x.tick.rotate)).attr("y", _C2.default.textY(self.options.x.tick.rotate)).attr("x", 0).attr("dy", ".71em").attr("dx", _C2.default.textDx(self.options.x.tick.rotate)).attr("transform", "rotate(" + self.options.x.tick.rotate + ")");
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

/***/ },
/* 5 */
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
	
	var Title = function () {
	    function Title(options, chart) {
	        _classCallCheck(this, Title);
	
	        var self = this;
	
	        var config = {
	            show: true,
	            text: "Sample Chart",
	            position: 'top',
	            fontSize: "14px"
	        };
	
	        self._options = options;
	        self._chart = chart;
	
	        self.updateConfig(config);
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Title, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function updateConfig(config) {
	            var self = this;
	
	            self.options = _C2.default.mergeDeep(config, self.options);
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	
	            if (self.options.show) {
	                var text = self.chart.svg.append("g").attr('class', 'c9-custom-title c9-custom-title-container').append("text").attr("class", "c9-custom-title c9-custom-title-text");
	
	                // Get title self.chart.width: text.node().getComputedTextLength()           
	                text.attr("x", (self.chart.width - text.node().getComputedTextLength()) / 2)
	                // text.attr("x", (((self.chart.width - 200) / 2)))           
	                .attr("y", self.setYLocation(self.chart.height, self.chart.margin)).attr("text-anchor", "middle").style("font-size", self.options.fontSize).text(self.options.text);
	            }
	        }
	    }, {
	        key: 'setYLocation',
	        value: function setYLocation(height, margin) {
	            var self = this;
	
	            if (self.options.position === 'top') {
	                return margin.top / 2;
	            } else if (self.options.position === 'bottom') {
	                return height - margin.bottom / 2;
	            }
	        }
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: 'chart',
	        get: function get() {
	            return this._chart;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._chart = arg;
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
	    function Legend(options, chart) {
	        _classCallCheck(this, Legend);
	
	        var self = this;
	
	        var config = {
	            show: true,
	            position: "top",
	            size: 10,
	            fontSize: "12px",
	            fontColor: "#999",
	            fontWeight: 'bold',
	            margin: [5, 5, 5, 5],
	            space: 10,
	            box: false
	        };
	
	        self._options = options;
	        self._chart = chart;
	
	        self.updateConfig(config);
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Legend, [{
	        key: "updateConfig",
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function updateConfig(config) {
	            var self = this;
	
	            self.options = _C2.default.mergeDeep(config, self.options);
	
	            self.maxWidth = self.chart.width;
	            self.maxHeight = self.chart.height;
	            self.data = self.chart.dataTarget;
	        }
	    }, {
	        key: "update",
	        value: function update(data) {
	            var self = this;
	
	            self.data = data;
	
	            if (self.options.show && !_C2.default.isEmpty(self.data)) {
	                // Remove current legend
	                self.chart.svg.selectAll('.c9-custom-legend.c9-custom-legend-container').remove();
	
	                // var color = self.color;
	                var domain = [];
	
	                if (self.chart.chartType == "bar") {
	                    self.data = self.data[self.data.reduce(function (p, c, i, a) {
	                        return a[p].length > c.length ? p : i;
	                    }, 0)];
	                }
	
	                // Legend will be appended in main SVG container
	                // var container = d3.select(self._body[0][0].parentNode)
	                var container = self.chart.svg.append("g").attr("class", "c9-custom-legend c9-custom-legend-container");
	
	                // var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();
	
	                self.item = container.selectAll("g.c9-custom-legend.c9-custom-legend-item").data(self.data).enter().append("g").attr("class", "c9-custom-legend c9-custom-legend-item").attr('data-ref', function (d) {
	                    return d['data-ref'];
	                }).attr('data-enable', function (d) {
	                    return d['enable'];
	                });
	
	                self.item.append('rect').attr('class', 'c9-custom-legend c9-custom-legend-rect').attr('width', self.options.size).attr('height', self.options.size).attr('r', self.options.size).attr('fill', function (d) {
	                    return d.color || d[0].color;
	                })
	                // .attr('stroke', function(d){ return d.color || d[0].color; })
	                .style('cursor', 'pointer');
	
	                self.item.append('rect').attr('width', 5).attr('height', self.options.size).attr('x', self.options.size).attr('y', 0).attr('opacity', 0).style('cursor', 'pointer');
	
	                self.item.append('text').attr('class', 'c9-custom-legend c9-custom-legend-text').attr('x', self.options.size + 5).attr('y', self.options.size).style('font-size', self.options.fontSize).style('font-weight', self.options.fontWeight).style('fill', self.options.fontColor).style('cursor', 'pointer')
	                // .attr('text-anchor', 'middle')
	                .text(function (d) {
	                    return self.chart.chartType == "bar" ? d.group : d.name;
	                });
	
	                //caculate position for legend
	                var getSize = function getSize(item) {
	                    return item.getBoundingClientRect();
	                };
	                var getXY = function getXY(item) {
	                    var xy = d3.select(item).attr('transform').split(',');
	                    return {
	                        x: parseFloat(xy[0].replace('translate(', '')),
	                        y: parseFloat(xy[1].replace(')', ''))
	                    };
	                };
	
	                var r = 0; // current row
	                var items = self.chart.svg.selectAll(".c9-custom-legend-item")[0];
	                var itemHeight = getSize(items[0]).height;
	                var numItemsCol = Math.floor((self.maxHeight - self.options.margin[0] - self.options.margin[2]) / (itemHeight + self.options.space));
	
	                if (self.options.space > itemHeight) numItemsCol++;
	
	                var maxWidthCol = new Array(Math.floor(items.length / numItemsCol));
	
	                items.forEach(function (i, n) {
	                    var pos = Math.floor(n / numItemsCol);
	                    var width = getSize(i).width;
	                    if (maxWidthCol[pos] == undefined || width > maxWidthCol[pos]) maxWidthCol[pos] = width;
	                });
	
	                if (self.options.position == "bottom") {
	                    self.item.attr("transform", function (d, i) {
	                        if (i > 0) {
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.options.space + getSize(item).width + self.options.margin[1]) / self.maxWidth);
	                            if (newR > 0) r++;
	                            return "translate(" + (newR > 0 ? self.options.margin[3] : getXY(preItem).x + getSize(preItem).width + self.options.space) + "," + (self.maxHeight - self.options.margin[0] - itemHeight - r * (itemHeight + self.options.space)) + ")";
	                        } else {
	                            return "translate(" + self.options.margin[3] + "," + (self.maxHeight - self.options.margin[0] - itemHeight) + ")";
	                        }
	                    });
	                } else if (self.options.position == "left") {
	                    self.item.attr("transform", function (d, i) {
	                        var pos = Math.floor(i / numItemsCol);
	
	                        if (i > 0) {
	                            var prePos = Math.floor((i - 1) / numItemsCol);
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            return "translate(" + (pos > prePos ? maxWidthCol[pos] + self.options.space + getXY(preItem).x : getXY(preItem).x) + "," + (pos > prePos ? self.options.margin[0] : getXY(preItem).y + getSize(preItem).height + self.options.space) + ")";
	                        } else return "translate(" + self.options.margin[3] + "," + self.options.margin[0] + ")";
	                    });
	                } else if (self.options.position == "right") {
	                    self.item.attr("transform", function (d, i) {
	                        var pos = Math.floor(i / numItemsCol);
	                        if (i > 0) {
	                            var prePos = Math.floor((i - 1) / numItemsCol);
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            return "translate(" + (pos > prePos ? getXY(preItem).x - self.options.space - maxWidthCol[pos] : getXY(preItem).x) + "," + (pos > prePos ? self.options.margin[0] : getXY(preItem).y + getSize(preItem).height + self.options.space) + ")";
	                        } else return "translate(" + (self.maxWidth - self.options.margin[3] - maxWidthCol[pos]) + "," + self.options.margin[0] + ")";
	                    });
	                } else {
	                    self.item.attr("transform", function (d, i) {
	                        if (i > 0) {
	                            var item = items[i];
	                            var preItem = items[i - 1];
	                            var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.options.space + getSize(item).width + self.options.margin[1]) / self.maxWidth);
	                            if (newR > 0) r++;
	
	                            return "translate(" + (newR > 0 ? self.options.margin[3] : getXY(preItem).x + getSize(preItem).width + self.options.space) + "," + (self.options.margin[0] + r * (itemHeight + self.options.space)) + ")";
	                        } else return "translate(" + self.options.margin[3] + "," + self.options.margin[0] + ")";
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
	    }, {
	        key: "draw",
	        value: function draw() {
	            var self = this;
	
	            self.update(self.chart.dataTarget);
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
	                    // selector.style('cursor', 'pointer');
	
	                    // If current selector is disabled, then turn it on back
	                    // Else, set enable to false
	                    if (selector.attr('data-enable') == 'false') {
	                        selector.attr('data-enable', true);
	                        selector.style('opacity', '1');
	                    } else {
	                        if (totalEnable < 2) return;
	                        selector.attr('data-enable', false);
	                        selector.style('opacity', '0.1');
	                        enable = false;
	                    }
	
	                    // update line
	                    var newData = [];
	                    chart.dataTarget.forEach(function (_data) {
	                        if (_data['data-ref'] == item['data-ref']) _data.enable = enable;
	                        if (_data.enable) newData.push(_data);
	                    });
	
	                    chart.updateDomain(newData);
	                    chart.axis.update(chart.x, chart.y, 750);
	                    chart.update(newData);
	
	                    // Update subchart
	                    if (chart.options.subchart.show) {
	                        chart.subChartX.domain(chart.x.domain());
	                        chart.subChartY.domain(chart.y.domain());
	                        chart.svg.select('.c9-subchart-custom .c9-subchart-axis').transition().duration(750).call(chart.subChartXAxis);
	                        chart.updateSubChart(newData);
	                    }
	
	                    // Update overlay to make it at the bottom of structure
	                    chart.updateOverlay();
	                    chart.updateInteraction();
	                },
	
	                'mouseover': function mouseover(item) {
	                    if (_C2.default.isFunction(onMouseOverCallback)) {
	                        onMouseOverCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	
	                    // Add pointer to cursor and make it lighten
	                    // legendSelector.style('cursor', 'pointer');
	                    self.lightenLegendItem(legendSelector);
	                },
	
	                'mouseout': function mouseout(item) {
	                    if (_C2.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, item);
	                    }
	
	                    var legendSelector = d3.select(this);
	
	                    // Add pointer to cursor
	                    // legendSelector.style('cursor', 'pointer');
	                    self.normalizeLegendItem(legendSelector);
	                }
	
	            };
	
	            if (self.options.show && self.item) {
	                self.item.on(self.itemEventFactory);
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
	
	            var hoverOptions = chart.hover.options,
	                hoverEnable = chart.hover.enable,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = chart.click.callback;
	
	            var chartType = chart.chartType;
	
	            var chartInnerBefore = chartType == 'pie' ? 0 : chart.options.innerRadius,
	                chartOuterBefore = chartType == 'pie' ? chart.options.radius : chart.options.outerRadius,
	                chartInnerAfter = chartType == 'pie' ? 0 : chart.options.innerRadius,
	                chartOuterAfter = chartType == 'pie' ? chart.options.radius * 1.2 : chart.options.outerRadius * 1.2;
	
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
	                    // selector.style('cursor', 'pointer');
	
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
	                        if (d["data-ref"] == item["data-ref"]) d.enable = enable;
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
	                    // legendSelector.style('cursor', 'pointer');
	                    self.lightenLegendItem(legendSelector);
	
	                    if (legendSelector.attr('data-enable')) {
	                        // For Legend
	                        self.item.each(function () {
	                            if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable')) {
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
	                    // legendSelector.style('cursor', 'pointer');
	                    self.normalizeLegendItem(legendSelector);
	
	                    // if (legendSelector.attr('data-enable') == 'true') {
	                    // For Legend
	                    self.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable')) {
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
	
	            if (self.options.show && self.item) self.item.on(self.itemEventFactory);
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
	                    // selector.style('cursor', 'pointer');
	
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
	                    // selector.style('cursor', 'pointer');
	                    self.lightenLegendItem(selector);
	
	                    if (selector.attr('data-enable') == 'true') d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
	                        return d['group-ref'] != item['group-ref'];
	                    }).attr('opacity', 0.3);
	                },
	
	                'mouseout': function mouseout(item) {
	                    var selector = d3.select(this);
	                    // selector.style('cursor', 'pointer');
	                    self.normalizeLegendItem(selector);
	
	                    d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
	                        return d['group-ref'] != item['group-ref'];
	                    }).attr('opacity', 1);
	                }
	
	            };
	            if (self.options.show && self.item) self.item.on(self.itemEventFactory);
	        }
	    }, {
	        key: "lightenLegendItem",
	        value: function lightenLegendItem(item) {
	            var self = this;
	
	            item.select('.c9-custom-legend-rect').attr('fill', function (d) {
	                return _C2.default.shadeColor(0.5, d.color || d[0].color);
	            });
	            item.select('.c9-custom-legend-text').style('fill', function (d) {
	                return _C2.default.shadeColor(-0.5, self.options.fontColor);
	            });
	        }
	    }, {
	        key: "normalizeLegendItem",
	        value: function normalizeLegendItem(item) {
	            var self = this;
	
	            item.select('.c9-custom-legend-rect').attr('fill', function (d) {
	                return d.color || d[0].color;
	            });
	            item.select('.c9-custom-legend-text').style('fill', function (d) {
	                return self.options.fontColor;
	            });
	        }
	        /*=====  End of Main Functions  ======*/
	
	    }, {
	        key: "options",
	        get: function get() {
	            return this._options;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._options = arg;
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
	        key: "item",
	        get: function get() {
	            return this._item;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._item = arg;
	            }
	        }
	    }, {
	        key: "itemEventFactory",
	        get: function get() {
	            return this._itemEventFactory;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._itemEventFactory = arg;
	            }
	        }
	    }, {
	        key: "maxWidth",
	        get: function get() {
	            return this._maxWidth;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._maxWidth = arg;
	            }
	        }
	    }, {
	        key: "maxHeight",
	        get: function get() {
	            return this._maxHeight;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._maxHeight = arg;
	            }
	        }
	    }]);
	
	    return Legend;
	}();
	
	exports.default = Legend;

/***/ },
/* 7 */
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
	    function Table(options, chart) {
	        _classCallCheck(this, Table);
	
	        var self = this;
	
	        var config = {
	            container: "body",
	            show: false,
	            headings: ["Name", "Value"],
	            style: "default", // || "stripe"
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
	
	        self._options = options;
	        self._chart = chart;
	
	        self.updateConfig(config);
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Table, [{
	        key: "updateConfig",
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function updateConfig(config) {
	            var self = this;
	
	            self.options = _C2.default.mergeDeep(config, self.options);
	        }
	    }, {
	        key: "update",
	        value: function update(data) {
	            var self = this;
	
	            if (self.options.show && !_C2.default.isEmpty(data)) {
	                if (self.chart.chartType == "bar" || self.chart.chartType == "line") {
	                    //headings
	                    if (self.options.headings.length < 3 && !data[0].value && data[0][0]["group-ref"] != undefined) self.options.headings.push("Group");
	
	                    //data
	                    self.data = [];
	                    data.forEach(function (d) {
	                        (_C2.default.isArray(d) ? d : d.value).forEach(function (b) {
	                            self.data.push(b);
	                        });
	                    });
	                } else {
	                    self.data = data;
	                }
	
	                d3.selectAll('.c9-table').remove();
	                d3.selectAll('.c9-table-container').remove();
	
	                var headTbl = d3.select(self.options.container !== 'body' ? '#' + self.options.container : 'body').append("table").attr('class', 'c9-table c9-table-header'),
	                    thead = headTbl.append("thead"),
	                    bodyTbl = d3.select(self.options.container !== 'body' ? '#' + self.options.container : 'body').append("div").attr('class', 'c9-table-container').append("table").attr('class', function () {
	                    return self.getTableStyle();
	                }),
	                    tbody = bodyTbl.append("tbody");
	
	                // Append serial no heading
	                // Bind each statistic to a line of the table
	                // Show serial no.
	                var hRows = thead.append("tr");
	
	                if (self.options.serial) {
	                    hRows.append("th").text("#");
	                }
	
	                hRows.selectAll("thead").data(self.options.headings).enter().append("th").text(function (d) {
	                    return d;
	                });
	
	                // Bind each statistic to a line of the table
	                // Show serial no.
	                var bRows = tbody.selectAll("tr").data(self.data).enter().append("tr").attr("data-ref", function (d) {
	                    return d["data-ref"];
	                });
	
	                if (self.options.serial) {
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
	                    return d.value || d.y0 || d.valueY;
	                });
	
	                // Add group if chart is bar chart
	                if (self.chart.chartType == "bar" && self.options.headings.length < 3 && !data[0].value && data[0][0]["group-ref"] != undefined) bRows.append("td").text(function (d) {
	                    return d.group;
	                });
	            }
	        }
	    }, {
	        key: "draw",
	        value: function draw() {
	            var self = this;
	
	            self.update(self.chart.dataTarget);
	        }
	    }, {
	        key: "updateInteractionForBarChart",
	        value: function updateInteractionForBarChart(chart) {
	
	            var self = this;
	
	            var hoverOptions = chart.hover.options,
	                hoverEnable = chart.hover.enable,
	                onMouseOverCallback = hoverOptions.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = chart.click.callback;
	
	            self.itemEventFactory = {
	
	                'click': function click(item) {
	                    if (_C2.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, item);
	                    }
	                },
	
	                'mouseover': function mouseover(item) {
	                    if (!item) return;
	
	                    var selector = d3.select(this);
	                    selector.style('cursor', 'pointer');
	                    // if (selector.attr('data-enable') == 'true')
	                    d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
	                        return d['data-ref'] != item['data-ref'];
	                    }).attr('opacity', 0.3);
	                },
	
	                'mouseout': function mouseout(item) {
	                    if (!item) return;
	                    d3.select(this).style('cursor', 'pointer');
	                    d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
	                        return d['data-ref'] != item['data-ref'];
	                    }).attr('opacity', 1);
	                }
	
	            };
	            if (self.options.show) self.selectAllRow().on(self.itemEventFactory);
	        }
	    }, {
	        key: "updateInteractionForDonutPieChart",
	        value: function updateInteractionForDonutPieChart(chart) {
	
	            var self = this;
	
	            var hoverOptions = chart.hover.options,
	                hoverEnable = chart.hover.enable,
	                onMouseOverCallback = hoverOptions.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onClickCallback = chart.click.callback;
	
	            var chartType = chart.chartType;
	
	            var chartInnerBefore = chartType == 'pie' ? 0 : chart.options.innerRadius,
	                chartOuterBefore = chartType == 'pie' ? chart.options.radius : chart.options.outerRadius,
	                chartInnerAfter = chartType == 'pie' ? 0 : chart.options.innerRadius,
	                chartOuterAfter = chartType == 'pie' ? chart.options.radius * 1.2 : chart.options.outerRadius * 1.2;
	            self.itemEventFactory = {
	
	                'click': function click(item) {
	                    if (_C2.default.isFunction(onClickCallback)) {
	                        onClickCallback.call(this, item);
	                    }
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
	
	            if (self.options.show) self.selectAllRow().on(self.itemEventFactory);
	        }
	    }, {
	        key: "selectAllRow",
	        value: function selectAllRow() {
	            return d3.selectAll(".c9-table tr");
	        }
	    }, {
	        key: "getTableStyle",
	        value: function getTableStyle() {
	            var self = this;
	
	            if (self.options.style === 'default') {
	                return 'c9-table c9-table-body';
	            } else if (self.options.style === 'stripe') {
	                return 'c9-table c9-table-body c9-stripe';
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
	    }]);
	
	    return Table;
	}();
	
	exports.default = Table;

/***/ },
/* 8 */
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
	
	var Tooltip = function () {
	    function Tooltip(options) {
	        _classCallCheck(this, Tooltip);
	
	        var self = this;
	
	        var config = {
	            show: true,
	            position: 'right', // [top, right, bottom, left]
	            backgroundColor: 'rgba(0, 0, 0, 0.8)',
	            fontColor: '#fff',
	            fontSize: '11px',
	            format: null
	        };
	
	        self._options = options;
	
	        self.updateConfig(config);
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(Tooltip, [{
	        key: 'updateConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function updateConfig(config) {
	            var self = this;
	
	            self.options = _C2.default.mergeDeep(config, self.options);
	        }
	
	        /**
	         * Draw Tooltip
	         */
	
	    }, {
	        key: 'draw',
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
	            .style('display', 'none').style('position', 'absolute').style('pointer-events', 'all').style('background-color', self.options.backgroundColor).style('color', self.options.fontColor).style('font-size', self.options.fontSize);
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
	                        return self.getCoordinate(chart)['left'];
	                    })
	                    // .style('top', function() {return d3.mouse(this)[1]  + 'px';})
	                    .style('top', function () {
	                        return self.getCoordinate(chart)['top'];
	                    }).duration(200).style("display", 'block').style('pointer-events', 'none');
	                },
	
	                'mousemove': function mousemove(_data) {
	                    divOnHover.html(function () {
	                        return self.getFormatByChartType(chart, _data);
	                    }).transition()
	                    // .style('left', function() {return d3.mouse(this)[0] + 'px';})
	                    .style('left', function () {
	                        return self.getCoordinate(chart)['left'];
	                    })
	                    // .style('top', function() {return d3.mouse(this)[1]  + 'px';})
	                    .style('top', function () {
	                        return self.getCoordinate(chart)['top'];
	                    }).duration(200).style("display", 'block').style('pointer-events', 'none');
	                },
	
	                'mouseout': function mouseout(_data) {
	                    divOnHover.transition().duration(200).style('display', 'none');
	                }
	
	            };
	
	            if (self.options.show) {
	
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
	
	            switch (self.options.position) {
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
	
	            var chartType = chart.chartType,
	                format = void 0;
	
	            switch (chartType) {
	                case 'bar':
	                    format = function format(data) {
	                        return '<strong>' + data.name + '</strong>' + '<br><span>' + data.value + '</span>';
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
	                        return (data.name ? '<strong>' + data.name + '</strong>' : '<img src=' + data.icon + '" width="' + chart.options.itemHeight + '" height="' + chart.options.itemHeight + '">') + '<br><strong>Start at: </strong><span>' + data.start + '</span><br><strong>End at: </strong><span>' + data.end + '</span>';
	                    };
	                    break;
	            }
	
	            // Update format for tooltip based on chart type
	            self.format = self.options.format || format;
	            // console.log(self.format);
	        }
	    }, {
	        key: 'getCoordinate',
	        value: function getCoordinate(chart) {
	            var self = this;
	            var r = void 0;
	
	            var offset = self.getOffset(d3.select(chart.id)[0][0]);
	
	            switch (self.options.position) {
	                case 'top':
	                    r = {
	                        'left': d3.event.pageX - offset.left - 50 + 'px',
	                        'top': d3.event.pageY - offset.top - 50 + 'px'
	                    };
	                    break;
	                case 'right':
	                    r = {
	                        // 'left': (d3.event.pageX - offset.left - 50) + 'px',
	                        'left': d3.event.pageX - offset.left + 'px',
	                        // 'top': (d3.event.pageY - offset.top - 50) + 'px'
	                        'top': d3.event.pageY - offset.top - 25 + 'px'
	                    };
	                    break;
	                case 'bottom':
	                    r = {
	                        'left': d3.event.pageX - offset.left - 50 + 'px',
	                        'top': d3.event.pageY - offset.top + 50 + 'px'
	                    };
	                    break;
	                case 'left':
	                    r = {
	                        // 'left': (d3.event.pageX - offset.left + 50) + 'px',
	                        'left': d3.event.pageX - offset.left - 50 + 'px',
	                        // 'top': (d3.event.pageY - offset.top - 50) + 'px'
	                        'top': d3.event.pageY - offset.top - 25 + 'px'
	                    };
	                    break;
	            }
	            return r;
	        }
	    }, {
	        key: 'getOffset',
	        value: function getOffset(elem) {
	            var box = { top: 0, left: 0 };
	
	            // BlackBerry 5, iOS 3 (original iPhone)
	            if (_typeof(elem.getBoundingClientRect) !== undefined) {
	                box = elem.getBoundingClientRect();
	            }
	
	            return {
	                top: box.top + (window.pageYOffset || elem.scrollTop) - (elem.clientTop || 0),
	                left: box.left + (window.pageXOffset || elem.scrollLeft) - (elem.clientLeft || 0)
	            };
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
	        key: 'format',
	        get: function get() {
	            return this._format;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _C = __webpack_require__(3);
	
	var _C2 = _interopRequireDefault(_C);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataAdapter = function () {
	    function DataAdapter(options, chartType, callback) {
	        _classCallCheck(this, DataAdapter);
	
	        var self = this;
	
	        var config = {
	            // ALL OPTIONS AVAILABLE IN DATA CONFIG
	            keys: {
	                name: "name",
	                value: "value",
	                x: "value.x",
	                y: "value",
	                coor: "coor",
	                icon: "icon"
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
	
	        self._dataSource = [];
	        self._dataTarget = []; // Initialize new Array to use Array methods
	        self._dataRefs = [];
	
	        self._options = options;
	        self._chartType = chartType;
	        self._callback = callback;
	
	        self.updateConfig(config);
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	
	    _createClass(DataAdapter, [{
	        key: "updateConfig",
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	        value: function updateConfig(config) {
	            var self = this;
	
	            self.options = _C2.default.mergeDeep(config, self.options);
	
	            // self.initDataSource();
	        }
	
	        // initDataSource() {
	        //     var self = this;
	
	        //     // if (self.hasPlainData()) {
	        //     //     self.executePlainData();
	        //     // }
	        //     // TESTING
	        //     //  else if (self.hasFile()) {
	        //     //     self.executeFile();
	        //     // }
	        // }
	
	    }, {
	        key: "hasPlainData",
	        value: function hasPlainData() {
	            var self = this;
	
	            return self.options.plain && _C2.default.isArray(self.options.plain) || !_C2.default.isEmpty(self.options.plain);
	            // return !Helper.isEmpty(self.options.plain); // fix for map
	        }
	    }, {
	        key: "hasFile",
	        value: function hasFile() {
	            var self = this;
	
	            return _C2.default.isObject(self.options.file) && !_C2.default.isEmpty(self.options.file.url) && !_C2.default.isEmpty(self.options.file.type);
	        }
	    }, {
	        key: "executePlainData",
	        value: function executePlainData(callback) {
	            var self = this;
	
	            self.dataSource = self.options.plain;
	
	            callback.call(self, self.dataSource);
	        }
	    }, {
	        key: "executeFile",
	        value: function executeFile(callback) {
	            var self = this;
	
	            self.file = self.options.file;
	
	            if (!_C2.default.isEmpty(self.file)) {
	
	                switch (self.file.type) {
	                    case "csv":
	                        self.getCsv(callback);
	                        break;
	                    case "tsv":
	                        self.getTsv(callback);
	                        break;
	                    case "text":
	                        self.getText(callback);
	                        break;
	                    case "json":
	                        self.getJson(callback);
	                        break;
	                    case "xml":
	                        self.getXml(callback);
	                        break;
	                    case "xhr":
	                        self.getJson(callback);
	                        break;
	                    default:
	                        self.getJson(callback);
	                        break;
	                }
	            }
	        }
	    }, {
	        key: "getDataTypeForBarChart",
	        value: function getDataTypeForBarChart() {
	            var self = this;
	
	            if (!_C2.default.isEmpty(self.groups) && _C2.default.isArray(self.groups) && self.groups.length !== 1) {
	                return "group";
	            } else if (!_C2.default.isEmpty(self.stacks) && _C2.default.isArray(self.stacks)) {
	                return "stack";
	            }
	
	            // default grouped bar if user do not defined groups for array value
	            for (var i = self.dataSource.length - 1; i >= 0; i--) {
	                if (_C2.default.isArray(_C2.default.get(self.keys.value, self.dataSource[i]))) return "group";
	            }
	
	            return "single";
	        }
	    }, {
	        key: "getDataTarget",
	        value: function getDataTarget(type, callback) {
	            var self = this;
	
	            // TESTING
	            if (self.hasFile()) {
	                self.executeFile(function (data) {
	                    self.dataSource = data;
	                    self.generateDataTarget(type);
	                    callback.call(self, self.dataTarget);
	                });
	            } else if (self.hasPlainData()) {
	                self.executePlainData(function (data) {
	                    self.dataSource = data;
	                    self.generateDataTarget(type);
	                    callback.call(self, self.dataTarget);
	                });
	            }
	        }
	    }, {
	        key: "generateDataTarget",
	        value: function generateDataTarget(type) {
	            var self = this;
	
	            switch (type) {
	                case "bar":
	                    self.getDataTargetForBarChart();
	                    break;
	
	                case "line":
	                    self.getDataTargetForLineChart();
	                    break;
	
	                case "pie":
	                    self.getDataTargetForPieChart();
	                    break;
	
	                case "donut":
	                    self.getDataTargetForDonutChart();
	                    break;
	
	                case "timeline":
	                    self.getDataTargetForTimelineChart();
	                    break;
	
	                case "map":
	                    self.getDataTargetForMap();
	                    break;
	
	                default:
	                    self.dataTarget = self.dataSource;
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
	
	            var groups;
	            var groupRefs;
	            var stacks;
	            var groupRefs;
	
	            var _ret = function () {
	                switch (self.getDataTypeForBarChart()) {
	                    case "single":
	                        var color = self.colorRange;
	                        var groups = self.groups;
	
	                        self.dataSource.forEach(function (data, index) {
	                            var _data = [{
	                                "name": _C2.default.get(self.keys.name, data),
	                                "value": _C2.default.get(self.keys.value, data),
	                                "y0": _C2.default.get(self.keys.value, data),
	                                "y1": _C2.default.get(self.keys.value, data),
	                                "group": groups[0] || 'data' + 1,
	                                "data-ref": _C2.default.guid(),
	                                "enable": true,
	                                "color": color(0)
	                            }];
	                            self.dataTarget.push(_data);
	                        });
	
	                        // return self.dataTarget;
	                        break;
	
	                    case "group":
	                        groups = self.groups;
	                        groupRefs = [];
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
	                                "group-ref": "",
	                                "enable": true
	                            },
	                                color = self.colorRange;
	
	                            // Iterate each single bar in a group
	                            if (_C2.default.isArray(_dsArray)) {
	                                _dsArray.forEach(function (d, i) {
	                                    if (groupRefs.length - 1 < i) groupRefs.push(_C2.default.guid());
	                                    if (_C2.default.isEmpty(groups[i])) groups.push('data' + (i + 1));
	                                    _stackItem = {
	                                        "color": color(i),
	                                        "y0": d,
	                                        "y1": d > 0 ? d : 0,
	                                        "group": groups[i],
	                                        "name": _C2.default.get(self.keys.name, data),
	                                        "value": d,
	                                        "data-ref": _C2.default.guid(),
	                                        "group-ref": groupRefs[i],
	                                        "enable": true
	                                    };
	                                    _stack.push(_stackItem);
	                                });
	                            } else {
	                                if (groupRefs.length == 0) groupRefs.push(_C2.default.guid());
	                                if (_C2.default.isEmpty(groups[0])) groups.push('data1');
	                                _stackItem = {
	                                    "color": color(0),
	                                    "y0": _dsArray,
	                                    "y1": _dsArray > 0 ? _dsArray : 0,
	                                    "group": groups[0],
	                                    "name": _C2.default.get(self.keys.name, data),
	                                    "value": _dsArray,
	                                    "data-ref": _C2.default.guid(),
	                                    "group-ref": groupRefs[0],
	                                    "enable": true
	                                };
	                                _stack.push(_stackItem);
	                            }
	
	                            self.dataTarget.push(_stack);
	                        });
	
	                        self.groups = groups;
	                        return {
	                            v: self.dataTarget
	                        };
	                        break;
	
	                    case "stack":
	                        stacks = self.stacks;
	                        groupRefs = [];
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
	                                        if (groupRefs.length - 1 < i) groupRefs.push(_C2.default.guid());
	                                        if (_C2.default.isEmpty(stacks[i])) stacks.push('data' + (i + 1));
	                                        _stackItem = {
	                                            "color": color(i),
	                                            "y0": d,
	                                            "y1": d > 0 ? d + _posBase : _negBase,
	                                            "group": stacks[i],
	                                            "name": _C2.default.get(self.keys.name, data),
	                                            "value": d,
	                                            "data-ref": _C2.default.guid(),
	                                            "group-ref": groupRefs[i],
	                                            "enable": true
	                                        };
	                                        _stack.push(_stackItem);
	                                        if (d > 0) _posBase += d;else _negBase += d;
	                                    });
	                                })();
	                            } else {
	                                if (groupRefs.length == 0) groupRefs.push(_C2.default.guid());
	                                if (_C2.default.isEmpty(stacks[0])) stacks.push('data1');
	                                _stackItem = {
	                                    "color": color(0),
	                                    "y0": _dsArray,
	                                    "y1": _dsArray > 0 ? _dsArray : 0,
	                                    "group": stacks[0],
	                                    "name": _C2.default.get(self.keys.name, data),
	                                    "value": _dsArray,
	                                    "data-ref": _C2.default.guid(),
	                                    "group-ref": groupRefs[0],
	                                    "enable": true
	                                };
	                                _stack.push(_stackItem);
	                            }
	
	                            self.dataTarget.push(_stack);
	                        });
	
	                        self.stacks = stacks;
	                        return {
	                            v: self.dataTarget
	                        };
	                        break;
	
	                    default:
	                        return {
	                            v: self.dataSource
	                        };
	                        break;
	                }
	            }();
	
	            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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
	                    "icon": _C2.default.get(self.keys.icon, data),
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
	                    "enable": true,
	                    "icon": null
	                };
	
	                if (_C2.default.isArray(_dsArray)) {
	                    _dsArray.forEach(function (d, i) {
	                        _valueItem = {
	                            "name": _C2.default.get(self.keys.name, data),
	                            "start": new Date(d.start),
	                            "end": new Date(d.end),
	                            "color": color(index),
	                            "data-ref": _C2.default.guid(),
	                            "enable": true,
	                            "icon": _C2.default.get(self.keys.icon, data)
	                        };
	                        _valueArray.push(_valueItem);
	                    });
	                } else {
	                    _valueItem = {
	                        "name": _C2.default.get(self.keys.name, data),
	                        "start": new Date(_dsArray.start),
	                        "end": new Date(_dsArray.end),
	                        "color": color(index),
	                        "data-ref": _C2.default.guid(),
	                        "enable": true,
	                        "icon": _C2.default.get(self.keys.icon, data)
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
	
	        /*=================================================
	        =              Normalize Data For Map             =
	        =================================================*/
	
	    }, {
	        key: "getDataTargetForMap",
	        value: function getDataTargetForMap() {
	            var self = this;
	
	            var getDataValue = function getDataValue(key, data, isArray) {
	                var _keys = key.split('.');
	                var _value = _C2.default.get(key, data);
	                var _v = void 0;
	                if (_keys.length == 1 && _keys[0] == 'value' && !isArray) {
	                    _v = _value;
	                } else {
	                    _v = new Object();
	                    _v[_keys[_keys.length - 1]] = _value;
	                }
	                return _v;
	            };
	
	            var getData = function getData(data) {
	                var _data = {
	                    "name": _C2.default.get(self.keys.name, data),
	                    "coor": _C2.default.get(self.keys.coor, data),
	                    "value": null
	                };
	                if (_C2.default.isArray(self.keys.value)) {
	                    self.keys.value.forEach(function (k) {
	                        var _v = getDataValue(k, data, true);
	                        _data.value = _C2.default.merge(_data.value, _v);
	                    });
	                } else {
	                    _data.value = getDataValue(self.keys.value, data, false);
	                }
	
	                return _data;
	            };
	
	            if (!_C2.default.isArray(self.dataSource)) self.dataTarget = getData(self.dataSource);else self.dataSource.forEach(function (data) {
	                self.dataTarget.push(getData(data));
	            });
	
	            return self.dataTarget;
	        }
	
	        /*=====    End of Normalize Data For Map   ======*/
	
	        /*=============================================
	        =            Data Input From Files            =
	        =============================================*/
	
	    }, {
	        key: "getCsv",
	        value: function getCsv(callback) {
	
	            var self = this;
	
	            d3.csv(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
	            });
	        }
	    }, {
	        key: "getTsv",
	        value: function getTsv(callback) {
	
	            var self = this;
	
	            d3.tsv(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
	            });
	        }
	    }, {
	        key: "getText",
	        value: function getText(callback) {
	
	            var self = this;
	
	            d3.text(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
	            });
	        }
	    }, {
	        key: "getJson",
	        value: function getJson(callback) {
	
	            var self = this;
	
	            d3.json(self.file.url, function (err, data) {
	                if (err) throw err;
	
	                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
	            });
	        }
	    }, {
	        key: "getXml",
	        value: function getXml(callback) {
	
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
	
	                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
	            });
	        }
	
	        /*=====  End of Data Input From Files  ======*/
	
	    }, {
	        key: "options",
	        get: function get() {
	            return this._options;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._options = arg;
	            }
	        }
	    }, {
	        key: "callback",
	        get: function get() {
	            return this._callback;
	        }
	    }, {
	        key: "chartType",
	        get: function get() {
	            return this._chartType;
	        }
	    }, {
	        key: "file",
	        get: function get() {
	            return this._file;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._file = arg;
	            }
	        }
	    }, {
	        key: "keys",
	        get: function get() {
	            return this._keys;
	        },
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
/* 10 */
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
	
	var _C9 = __webpack_require__(7);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(8);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(9);
	
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
	        self.config = {
	            outerRadius: R,
	            innerRadius: R > 80 ? R - 80 : R - 40
	        };
	
	        // self.updateConfig(config);
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
	        value: function updateConfig(config, callback) {
	            _get(DonutChart.prototype.__proto__ || Object.getPrototypeOf(DonutChart.prototype), 'updateConfig', this).call(this, config);
	
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(config, self.options);
	
	            self.chartType = 'donut';
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	
	        /**
	         * Update Donut Chart Config
	         */
	
	    }, {
	        key: 'updateDataConfig',
	        value: function updateDataConfig(dataCfg, callback) {
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(self.options, dataCfg);
	
	            self.chartType = 'donut';
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	
	        /**
	         * Update Donut Chart based on new data
	         * @param  {[type]} data [description]
	         */
	
	    }, {
	        key: 'update',
	        value: function update(data) {
	            var self = this;
	
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom,
	                color = self.colorRange;
	
	            self.arc = d3.svg.arc().outerRadius(self.options.outerRadius).innerRadius(self.options.innerRadius);
	
	            //we can sort data here
	            self.pie = d3.layout.pie().sort(null).value(function (d) {
	                return d.value;
	            });
	
	            self.body.selectAll(".c9-chart-donut.c9-custom-arc-container").data([]).exit().remove();
	
	            //draw chart
	            var arcs = self.body.append('g').attr('class', 'c9-chart-donut c9-custom-arc-container').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('.c9-chart-donut.c9-custom-arc').data(self.pie(data)).enter().append('g').attr('class', 'c9-chart-donut c9-custom-arc');
	
	            // Append main path contains donut
	            // TODO: add a unique class to allow Legend could find selected donut/pie
	            arcs.append('path').attr('class', 'c9-chart-donut c9-custom-path').attr('data-ref', function (d) {
	                return d.data['data-ref'];
	            }).attr('d', self.arc).attr('fill', function (d, i) {
	                return color(i);
	            }).attr('stroke', '#ffffff').each(function (d) {
	                self.currentData = d;
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
	                selector = self.selectAllPath(),
	                width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom,
	                color = self.colorRange,
	                chartInnerBefore = self.options.innerRadius,
	                chartOuterBefore = self.options.outerRadius,
	                chartInnerAfter = self.options.innerRadius,
	                chartOuterAfter = self.options.outerRadius * 1.2;
	
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
	                    if (self.options.legend.show) self.legend.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '0.3');
	                        }
	                    });
	
	                    // For Table
	                    if (self.options.table.show) {
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
	                    if (self.options.legend.show) self.legend.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    // For Table
	                    if (self.options.table.show) d3.selectAll('.c9-table-container>.c9-table-body tr').selectAll('td').style('opacity', '');
	
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
	
	            selector.on(self._eventFactory);
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	        /*========================================
	        =            User's Functions            =
	        ========================================*/
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
	
	        /**
	         * Main draw function of Donut Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            _get(DonutChart.prototype.__proto__ || Object.getPrototypeOf(DonutChart.prototype), 'draw', this).call(this);
	
	            var self = this;
	
	            self.updateConfig(self.config, function (data) {
	                var title = new _C6.default(self.options.title, self);
	                var legend = new _C8.default(self.options.legend, self, self.dataTarget);
	                var table = new _C10.default(self.options.table, self, self.dataTarget);
	
	                self.title = title;
	                self.legend = legend;
	                self.table = table;
	
	                // Draw title
	                self.title.draw();
	
	                // Update interaction of this own chart
	                self.update(self.dataTarget);
	                self.updateInteraction();
	
	                self.legend = legend;
	                self.table = table;
	
	                // Draw legend
	                self.legend.draw();
	                self.legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);
	
	                // Draw table
	                self.table.draw();
	                self.table.updateInteractionForDonutPieChart(self);
	            });
	        }
	
	        /**
	         * Set option via stand-alone function
	         * @param {[type]} key   [description]
	         * @param {[type]} value [description]
	         */
	
	    }, {
	        key: 'setOption',
	        value: function setOption(key, value) {
	            _get(DonutChart.prototype.__proto__ || Object.getPrototypeOf(DonutChart.prototype), 'setOption', this).call(this, key, value);
	
	            var self = this;
	
	            _C14.default.set(key, value, self.options);
	
	            self.updateConfig(self.options);
	        }
	
	        /**
	         * Update chart based on new data with optional dataConfig
	         * @param  {[type]} data       [description]
	         * @param  {[type]} dataConfig [description]
	         */
	
	    }, {
	        key: 'updateData',
	        value: function updateData(newData, newDataConfig) {
	            var self = this;
	
	            var newCfg = {};
	
	            if (!_C14.default.isEmpty(newDataConfig)) {
	
	                newCfg.data = {
	                    plain: newData,
	                    keys: newDataConfig
	                };
	            } else {
	
	                newCfg.data = {
	                    plain: newData
	                };
	            }
	
	            self.updateDataConfig(newCfg, function (data) {
	                // Update Chart
	                self.update(data);
	
	                // Update Legend
	                self.legend.update(data);
	                self.legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);
	
	                // Update Table
	                self.table.update(data);
	                self.table.updateInteractionForDonutPieChart(self);
	            });
	        }
	
	        /*=====  End of User's Functions  ======*/
	
	    }, {
	        key: 'pie',
	        get: function get() {
	            return this._pie;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
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
	    }]);
	
	    return DonutChart;
	}(_C2.default);
	
	exports.default = DonutChart;

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
	
	var _C9 = __webpack_require__(7);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(8);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(9);
	
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
	
	        self.config = {
	            point: {
	                show: true,
	                fill: "steelblue",
	                stroke: "steelblue",
	                'stroke-width': 1,
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
	
	        // self.updateConfig(config);
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
	         * Init Line Chart Config
	         */
	        value: function updateConfig(config, callback) {
	            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'updateConfig', this).call(this, config);
	
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(config, self.options);
	
	            self.chartType = "line";
	            self.bisectDate = d3.bisector(function (d) {
	                return d.valueX;
	            }).left;
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	                self.isTimeDomain = da.timeFormat;
	
	                var width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                self.x = self.isTimeDomain ? d3.time.scale().range([0, width]) : d3.scale.linear().range([0, width]), self.y = d3.scale.linear().range([height, 0]);
	
	                self.updateDomain(self.dataTarget);
	
	                self.lineGen = d3.svg.line().x(function (d) {
	                    return self.x(d.valueX);
	                }).y(function (d) {
	                    return self.y(d.valueY);
	                }).interpolate(self.options.interpolate);
	
	                self.areaGen = d3.svg.area().x(function (d) {
	                    return self.x(d.valueX);
	                }).y0(function (d) {
	                    return self.y(d.valueY);
	                }).y1(height).interpolate(self.options.interpolate);
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	
	        /**
	         * Update data config
	         */
	
	    }, {
	        key: 'updateDataConfig',
	        value: function updateDataConfig(dataCfg, callback) {
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(self.options, dataCfg);
	
	            self.chartType = "line";
	            self.bisectDate = d3.bisector(function (d) {
	                return d.valueX;
	            }).left;
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	                self.isTimeDomain = da.timeFormat;
	
	                var width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                self.x = self.isTimeDomain ? d3.time.scale().range([0, width]) : d3.scale.linear().range([0, width]), self.y = d3.scale.linear().range([height, 0]);
	
	                self.updateDomain(self.dataTarget);
	
	                self.lineGen = d3.svg.line().x(function (d) {
	                    return self.x(d.valueX);
	                }).y(function (d) {
	                    return self.y(d.valueY);
	                }).interpolate(self.options.interpolate);
	
	                self.areaGen = d3.svg.area().x(function (d) {
	                    return self.x(d.valueX);
	                }).y0(function (d) {
	                    return self.y(d.valueY);
	                }).y1(height).interpolate(self.options.interpolate);
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	    }, {
	        key: 'updateOverlay',
	        value: function updateOverlay() {
	            var self = this;
	
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom;
	
	            //** Create a invisible rect for mouse tracking
	            var paddingX = (self.x.domain()[1] - self.x.domain()[0]) * 0.01,
	                paddingY = (self.y.domain()[1] - self.y.domain()[0]) * 0.05;
	
	            self.body.selectAll(".c9-chart-line.c9-rect-overlay").remove();
	
	            self.body.append('rect').attr('class', 'c9-chart-line c9-rect-overlay')
	            // .attr('width', self.actualWidth)
	            // .attr('height', self.actualHeight)
	            .attr('width', width - self.x(paddingX)).attr('height', height).attr('x', self.x(paddingX) / 2).style('fill', 'none').style('pointer-events', 'all');
	        }
	    }, {
	        key: 'updateHoverLine',
	        value: function updateHoverLine() {
	            var self = this;
	
	            //** Add the line to the group
	            self.hoverLine = self.body.append('g').attr('class', 'c9-chart-line c9-comparator-line').append('line').style('stroke', 'grey').style('stroke-opacity', 0);
	
	            self.hoverCircle = self.hoverLine.append('circle').attr('class', 'c9-chart-line c9-comparator-line').attr('r', self.options.point.radius);
	        }
	
	        /**
	         * Update LineChart Domain
	         * @param  {[type]} data [description]
	         */
	
	    }, {
	        key: 'updateDomain',
	        value: function updateDomain(data) {
	            var self = this;
	
	            var valueXArray = d3.merge(data.map(function (_data) {
	                return _data.value.map(function (d) {
	                    return d.valueX;
	                });
	            }));
	
	            var valueYArray = d3.merge(data.map(function (_data) {
	                return _data.value.map(function (d) {
	                    return d.valueY;
	                });
	            }));
	
	            self.x.domain(d3.extent(valueXArray));
	
	            self.y.domain(d3.extent(valueYArray));
	
	            // Update domain if all values positive / negative
	            if (self.y.domain()[0] > 0 && self.y.domain()[1] > 0) {
	                self.y.domain([0, self.y.domain()[1]]);
	            } else if (self.y.domain()[0] < 0 && self.y.domain()[1] < 0) {
	                self.y.domain([self.y.domain()[0], 0]);
	            }
	
	            // Check if its is timeDomain then skip
	            if (!self.isTimeDomain) {
	                var xDomain = self.x.domain(),
	                    paddingX = (self.x.domain()[1] - self.x.domain()[0]) * 0.01;
	                var yDomain = self.y.domain(),
	                    paddingY = (self.y.domain()[1] - self.y.domain()[0]) * 0.05;
	
	                self.x.domain([xDomain[0] - paddingX, xDomain[1] + paddingX]);
	                self.y.domain([yDomain[0], yDomain[1] + paddingY]);
	            }
	            // else {
	            //     var xDomain = self.x.domain(), paddingX = (self.x.domain()[1] - self.x.domain()[0]);
	            //     var yDomain = self.y.domain(), paddingY = (self.y.domain()[1] - self.y.domain()[0]);
	            //         console.log(xDomain[0]);
	            //     self.x.domain([xDomain[0] - new Date(paddingX), xDomain[1] + new Date(paddingX)]);
	            //     self.y.domain([yDomain[0], yDomain[1] + paddingY]);
	            // }
	        }
	
	        /**
	         * Update main path of Line Chart when brushing
	         */
	
	    }, {
	        key: 'update',
	        value: function update(data) {
	            var self = this;
	
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom;
	
	            self.updateDomain(data);
	
	            self.body.selectAll(".c9-chart-line.c9-area-container").data([]).exit().remove();
	            self.body.selectAll(".c9-chart-line.c9-path-container").data([]).exit().remove();
	            self.body.selectAll(".c9-chart-line.c9-point-container").data([]).exit().remove();
	
	            if (self.options.area.show) {
	                var areaContainer = self.body.append('g').attr('class', 'c9-chart-line c9-area-container').attr("clip-path", "url(#clip)");
	
	                areaContainer.selectAll(".c9-chart-line.c9-path-area-custom")
	                // self.body.selectAll("dot")
	                .data(data).enter().append('path').filter(function (d) {
	                    return d.enable;
	                })
	                // .attr("clip-path", "url(#clip)")
	                .attr('class', 'c9-chart-line c9-path-area-custom').attr('d', function (d) {
	                    return self.areaGen(d.value);
	                }).attr('data-ref', function (d) {
	                    return 'c9-' + d['data-ref'];
	                }).style('fill', function (d) {
	                    return d.color;
	                }).style('stroke', 'none').style('opacity', '0.5');
	            }
	
	            var pathContainer = self.body.append('g').attr('class', 'c9-chart-line c9-path-container').attr("clip-path", "url(#clip)");
	
	            pathContainer.selectAll(".c9-chart-line.c9-path-line-custom")
	            // self.body.selectAll("dot")
	            .data(data).enter().append('path').filter(function (d) {
	                return d.enable;
	            }).attr('class', 'c9-chart-line c9-path-line-custom').attr('d', function (d) {
	                return self.lineGen(d.value);
	            }).attr('data-ref', function (d) {
	                return 'c9-' + d['data-ref'];
	            }).style('stroke', function (d) {
	                return d.color;
	            }).style('stroke-dasharray', function () {
	                return self.getLineStyle();
	            }).style('stroke-width', self.options.line.width).style('fill', 'none');
	
	            if (self.options.point.show) {
	                var pointContainer = self.body.append('g').attr('class', 'c9-chart-line c9-point-container').attr("clip-path", "url(#clip)");
	
	                data.forEach(function (d) {
	                    if (!d.enable) return;
	                    pointContainer.selectAll(".c9-chart-line.c9-point-container")
	                    // self.body.selectAll("dot")
	                    .data(d.value).enter().append("circle")
	                    // .attr("clip-path", "url(#clip)")
	                    .attr('class', 'c9-chart-line c9-circle-custom').attr("r", self.options.point.radius).attr("cx", function (_d) {
	                        return self.x(_d.valueX);
	                    }).attr("cy", function (_d) {
	                        return self.y(_d.valueY);
	                    }).attr("data-ref", function (data) {
	                        return data["data-ref"];
	                    }).style("fill", self.options.point.fill).style("stroke", self.options.point.stroke).style("stroke-width", self.options.point['stroke-width']).style("opacity", self.options.point.opacity);
	                });
	            }
	
	            /*----------  Set actual size for chart after initialization  ----------*/
	            var chartBox = self.body.node().getBBox();
	            self.actualWidth = chartBox.width - 4 * self.options.point.radius;
	            self.actualHeight = chartBox.height;
	            /*----------  End of Set actual size for chart after initialization  ----------*/
	
	            self.updateInteraction();
	        }
	
	        /**
	         * Update sub chart
	         */
	
	    }, {
	        key: 'updateSubChart',
	        value: function updateSubChart(data) {
	            var self = this;
	
	            if (self.options.subchart.show) {
	                var width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                /*----------  Sub Chart  ----------*/
	                self.subChartWidth = width, self.subChartHeight = self.options.subchart.height;
	                if (_C14.default.isEmpty(self.subChartMargin)) {
	                    self.subChartMargin = {
	                        'top': self.actualHeight + 100,
	                        'left': self.margin.left
	                    };
	                }
	
	                self.subChartX = self._isTimeDomain ? d3.time.scale().range([0, self.subChartWidth]) : d3.scale.linear().range([0, self.subChartWidth]), self.subChartY = d3.scale.linear().range([self.subChartHeight, 0]);
	
	                self.subChartX.domain(self.x.domain());
	                self.subChartY.domain(self.y.domain());
	
	                self.subChartXAxis = d3.svg.axis().scale(self.subChartX).orient("bottom");
	
	                self.brush = d3.svg.brush().x(self.subChartX).on("brush", function () {
	                    // Update axis
	                    self.x.domain(self.brush.empty() ? self.subChartX.domain() : self.brush.extent());
	                    self.axis.update(self.x, self.y, 500);
	
	                    // Update main path of Line Chart
	                    if (self.options.area.show) {
	                        self.body.selectAll("path.c9-chart-line.c9-path-area-custom").attr("d", function (d) {
	                            return self.areaGen(d.value);
	                        });
	                    }
	                    self.body.selectAll("path.c9-chart-line.c9-path-line-custom").attr("d", function (d) {
	                        return self.lineGen(d.value);
	                    });
	
	                    if (self.options.point.show) {
	                        self.body.selectAll("circle.c9-chart-line.c9-circle-custom").attr("cx", function (d) {
	                            return self.x(d.valueX);
	                        }).attr("cy", function (d) {
	                            return self.y(d.valueY);
	                        });
	                    }
	                });
	
	                self.subChartAreaGen = d3.svg.area().x(function (d) {
	                    return self.subChartX(d.valueX);
	                }).y0(function (d) {
	                    return self.subChartY(d.valueY);
	                }).y1(self.subChartHeight).interpolate(self.options.interpolate);
	
	                self.svg.attr('height', self.height + self.subChartHeight);
	
	                self.svg.selectAll(".c9-subchart-custom").remove();
	                self.svg.selectAll(".c9-subchart-custom .c9-subchart-axis").remove();
	
	                var subChart = self.svg.append("g").attr("class", "c9-subchart-custom").attr("transform", "translate(" + self.subChartMargin.left + "," + self.subChartMargin.top + ")");
	
	                var subChartAreaContainer = subChart.append('g').attr('class', 'c9-subchart-custom c9-subchart-area-container').attr("clip-path", "url(#clip)");
	
	                data.forEach(function (d, i) {
	                    if (!d.enable) return;
	
	                    subChartAreaContainer.append("path")
	                    // .attr("clip-path", "url(#clip)")
	                    .attr("class", "c9-subchart-area").attr("d", function () {
	                        return self.subChartAreaGen(d.value);
	                    }).attr('data-ref', 'c9-' + d['data-ref']).style('fill', d.color).style('stroke', 'none').style('opacity', '0.5');
	                });
	
	                subChart.append("g").attr("class", "c9-subchart-axis").attr("transform", "translate(0," + self.subChartHeight + ")").call(self.subChartXAxis);
	
	                //append the brush for the selection of subsection  
	                subChart.append("g").attr("class", "c9-subchart-brush").call(self.brush).selectAll("rect").attr("height", self.subChartHeight);
	            }
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
	                selector = self.selectRectLayer(),
	                hoverEnable = self.hover.enable,
	                hoverOptions = self.hover.options,
	                onMouseOverCallback = hoverOptions.onMouseOver.callback,
	                onMouseOutCallback = hoverOptions.onMouseOut.callback,
	                onMouseMoveCallback = hoverOptions.onMouseMove.callback,
	                onClickCallback = self.click.callback;
	
	            var tooltip = new _C12.default(self.options.tooltip);
	
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
	                        d3.select(circle).style('fill', self.options.point.fill).style('fill-opacity', self.options.point.opacity);
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
	                        d1 = !_C14.default.isEmpty(sameTimeArr[i][idx]) ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];
	
	                        // Check d0, d1 still in boundary or not
	                        // To work well with brushing
	                        d0 = self.checkBoundary(d0.valueX) === -1 ? d1 : d0;
	                        d1 = self.checkBoundary(d1.valueX) === 1 ? d0 : d1;
	
	                        // work out which date value is closest to the mouse
	                        sameTimeValueArr[i] = curValueX - d0.valueX > d1.valueX - curValueX ? d1 : d0;
	                    });
	
	                    if (_C14.default.isFunction(onMouseMoveCallback)) {
	                        onMouseMoveCallback.call(this, sameTimeValueArr);
	                    }
	
	                    var x = self.x(!_C14.default.isEmpty(sameTimeValueArr[0].valueX) ? sameTimeValueArr[0].valueX : sameTimeValueArr[1].valueX);
	                    var y = self.y(!_C14.default.isEmpty(sameTimeValueArr[0].valueY) ? sameTimeValueArr[0].valueY : sameTimeValueArr[1].valueY);
	
	                    // console.log(x);
	
	                    // Remove circle style before
	                    self.selectAllCircle()[0].forEach(function (circle) {
	                        d3.select(circle).style('fill', self.options.point.fill).style('fill-opacity', self.options.point.opacity);
	                    });
	
	                    // Update circle style after mouse move
	                    for (var i = 0; i < sameTimeValueArr.length; i++) {
	                        var circle = d3.select("circle[data-ref='" + sameTimeValueArr[i]['data-ref'] + "']");
	                        circle.style('fill', self.getLightenColor(self.options.point.fill)).style('fill-opacity', 1);
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
	
	            switch (self.options.line.style) {
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
	    }, {
	        key: 'checkBoundary',
	        value: function checkBoundary(value) {
	            var self = this;
	
	            var bound = self.width - self.margin.left - self.margin.right,
	                checkWidth = self.x(value);
	
	            return checkWidth < 0 ? -1 : checkWidth > bound ? 1 : 0;
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	        /*========================================
	        =            User's Functions            =
	        ========================================*/
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
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
	
	        /**
	         * Main draw function of Line Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'draw', this).call(this);
	
	            var self = this;
	
	            self.updateConfig(self.config, function (data) {
	                var axis = new _C4.default(self.options.axis, self, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom);
	                var title = new _C6.default(self.options.title, self);
	                var legend = new _C8.default(self.options.legend, self);
	                var table = new _C10.default(self.options.table, self, data);
	
	                self.axis = axis;
	                self.title = title;
	                self.legend = legend;
	                self.table = table;
	
	                // Draw title
	                self.title.draw();
	
	                // Draw axis
	                self.axis.draw();
	
	                self.update(data);
	                self.updateSubChart(data);
	                self.updateOverlay();
	                self.updateHoverLine();
	                self.updateInteraction();
	
	                // Draw legend
	                self.legend.draw();
	                self.legend.updateInteractionForLineChart(self);
	
	                // Draw table
	                self.table.draw();
	            });
	        }
	
	        /**
	         * Set option via stand-alone function
	         * @param {[type]} key   [description]
	         * @param {[type]} value [description]
	         */
	
	    }, {
	        key: 'setOption',
	        value: function setOption(key, value) {
	            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'setOption', this).call(this, key, value);
	
	            var self = this;
	
	            _C14.default.set(key, value, self.options);
	
	            self.updateConfig(self.options);
	        }
	
	        /**
	         * Update chart based on new data with optional dataConfig
	         * @param  {[type]} data       [description]
	         * @param  {[type]} dataConfig [description]
	         */
	
	    }, {
	        key: 'updateData',
	        value: function updateData(newData, newDataConfig) {
	            var self = this;
	
	            var newCfg = {};
	
	            if (!_C14.default.isEmpty(newDataConfig)) {
	
	                newCfg.data = {
	                    plain: newData,
	                    keys: newDataConfig
	                };
	            } else {
	
	                newCfg.data = {
	                    plain: newData
	                };
	            }
	
	            self.updateDataConfig(newCfg, function (data) {
	                // Update Chart
	                self.update(data);
	                self.updateSubChart(data);
	
	                // Update Axis
	                self.axis.update(self.x, self.y, 100);
	
	                // Update Legend
	                self.legend.update(data);
	                self.legend.updateInteractionForLineChart(self);
	
	                // Update Table
	                self.table.update(data);
	            });
	        }
	        /*=====  End of User's Functions  ======*/
	
	    }, {
	        key: 'isTimeDomain',
	        get: function get() {
	            return this._isTimeDomain;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._isTimeDomain = arg;
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
	    }, {
	        key: 'subChartX',
	        get: function get() {
	            return this._subChartX;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartX = arg;
	            }
	        }
	    }, {
	        key: 'subChartY',
	        get: function get() {
	            return this._subChartY;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartY = arg;
	            }
	        }
	    }, {
	        key: 'subChartWidth',
	        get: function get() {
	            return this._subChartWidth;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartWidth = arg;
	            }
	        }
	    }, {
	        key: 'subChartHeight',
	        get: function get() {
	            return this._subChartHeight;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartHeight = arg;
	            }
	        }
	    }, {
	        key: 'subChartMargin',
	        get: function get() {
	            return this._subChartMargin;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartMargin = arg;
	            }
	        }
	    }, {
	        key: 'subChartXAxis',
	        get: function get() {
	            return this._subChartXAxis;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartXAxis = arg;
	            }
	        }
	    }, {
	        key: 'brush',
	        get: function get() {
	            return this._brush;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._brush = arg;
	            }
	        }
	    }, {
	        key: 'subChartAreaGen',
	        get: function get() {
	            return this._subChartAreaGen;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartAreaGen = arg;
	            }
	        }
	    }, {
	        key: 'lineGen',
	        get: function get() {
	            return this._lineGen;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._lineGen = arg;
	            }
	        }
	    }, {
	        key: 'areaGen',
	        get: function get() {
	            return this._areaGen;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._areaGen = arg;
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
	
	var _C9 = __webpack_require__(7);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(8);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(9);
	
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
	
	        self.config = {
	            radius: Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2
	        };
	
	        // self.updateConfig(config);
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
	        value: function updateConfig(config, callback) {
	            _get(PieChart.prototype.__proto__ || Object.getPrototypeOf(PieChart.prototype), 'updateConfig', this).call(this, config);
	
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(config, self.options);
	
	            self.chartType = 'pie';
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	
	        /**
	         * Update Donut Chart Config
	         */
	
	    }, {
	        key: 'updateDataConfig',
	        value: function updateDataConfig(dataCfg, callback) {
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(self.options, dataCfg);
	
	            self.chartType = 'pie';
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	
	        /**
	         * Update Donut Chart based on new data
	         * @param  {[type]} data [description]
	         */
	
	    }, {
	        key: 'update',
	        value: function update(data) {
	            var self = this;
	
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom,
	                color = self.colorRange;
	
	            self.arc = d3.svg.arc().innerRadius(0).outerRadius(self.options.radius);
	
	            //we can sort data here
	            self.pie = d3.layout.pie().sort(null).value(function (d) {
	                return d.value;
	            });
	
	            self.body.selectAll(".c9-chart-pie.c9-custom-arc-container").data([]).exit().remove();
	
	            //draw chart
	            var arcs = self.body.append('g').attr('class', 'c9-chart-pie c9-custom-arc-container').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('.c9-chart-pie.c9-custom-arc').data(self.pie(data)).enter().append('g').attr('class', 'c9-chart-pie c9-custom-arc');
	
	            // Append main path contains pie
	            arcs.append('path').attr('class', 'c9-chart-pie c9-custom-path').attr('data-ref', function (d) {
	                return d.data['data-ref'];
	            }).attr('d', self.arc).attr('fill', function (d, i) {
	                return color(i);
	            }).attr('stroke', '#ffffff').each(function (d) {
	                self.currentData = d;
	            });
	            // Current data used for calculate interpolation 
	            // between current arc vs disabled arc
	
	
	            // Append middle text display name
	            // if (self.options.showText) {
	            //     arcs.append('text')
	            //             .attr('class', 'c9-chart-pie c9-custom-text')
	            //             .attr('transform', function(d) { return 'translate(' + self.arc.centroid(d) + ')'; })
	            //             .attr('dy', '.35em')
	            //             .attr('text-anchor', 'middle')
	            //             .text(function(d) { return d.data.name; });
	            // }
	
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
	                selector = self.selectAllPath(),
	                color = self.colorRange,
	                chartInnerBefore = 0,
	                chartOuterBefore = self.options.radius,
	                chartInnerAfter = 0,
	                chartOuterAfter = self.options.radius * 1.2,
	                hoverOptions = self.hover.options,
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
	                    if (self.options.legend.show) {
	                        self.legend.item.each(function () {
	                            if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable')) {
	                                d3.select(this).attr('opacity', '0.3');
	                            }
	                        });
	                    }
	
	                    // For Table
	                    if (self.options.table.show) {
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
	                    if (self.options.legend.show) self.legend.item.each(function () {
	                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable')) {
	                            d3.select(this).attr('opacity', '1.0');
	                        }
	                    });
	
	                    // For Table
	                    if (self.options.table.show) {
	                        d3.selectAll('.c9-table-container>.c9-table-body tr').selectAll('td').style('opacity', '');
	                    }
	
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
	
	            selector.on(self.eventFactory);
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	        /*========================================
	        =            User's Functions            =
	        ========================================*/
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
	
	        /**
	         * Main draw function of Pie Chart
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            _get(PieChart.prototype.__proto__ || Object.getPrototypeOf(PieChart.prototype), 'draw', this).call(this);
	
	            var self = this;
	
	            self.updateConfig(self.config, function (data) {
	                var title = new _C6.default(self.options.title, self);
	                var legend = new _C8.default(self.options.legend, self, self.dataTarget);
	                var table = new _C10.default(self.options.table, self, self.dataTarget);
	
	                self.title = title;
	                self.legend = legend;
	                self.table = table;
	
	                // Draw title
	                self.title.draw();
	
	                // Update interaction of this own chart
	                self.update(data);
	                self.updateInteraction();
	
	                // Draw legend
	                self.legend.draw();
	                self.legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);
	
	                // Draw table
	                self.table.draw();
	                self.table.updateInteractionForDonutPieChart(self);
	            });
	        }
	
	        /**
	         * Set option via stand-alone function
	         * @param {[type]} key   [description]
	         * @param {[type]} value [description]
	         */
	
	    }, {
	        key: 'setOption',
	        value: function setOption(key, value) {
	            _get(PieChart.prototype.__proto__ || Object.getPrototypeOf(PieChart.prototype), 'setOption', this).call(this, key, value);
	
	            var self = this;
	
	            _C14.default.set(key, value, self.options);
	
	            self.updateConfig(self.options);
	        }
	
	        /**
	         * Update chart based on new data with optional dataConfig
	         * @param  {[type]} data       [description]
	         * @param  {[type]} dataConfig [description]
	         */
	
	    }, {
	        key: 'updateData',
	        value: function updateData(newData, newDataConfig) {
	            var self = this;
	
	            var newCfg = {};
	
	            if (!_C14.default.isEmpty(newDataConfig)) {
	
	                newCfg.data = {
	                    plain: newData,
	                    keys: newDataConfig
	                };
	            } else {
	
	                newCfg.data = {
	                    plain: newData
	                };
	            }
	
	            self.updateDataConfig(newCfg, function (data) {
	                // Update Chart
	                self.update(self.dataTarget);
	
	                // Update Legend
	                self.legend.update(self.dataTarget);
	                self.legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);
	
	                // Update Table
	                self.table.update(self.dataTarget);
	                self.table.updateInteractionForDonutPieChart(self);
	            });
	        }
	        /*=====  End of User's Functions  ======*/
	
	    }, {
	        key: 'pie',
	        get: function get() {
	            return this._pie;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
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
	
	var _C9 = __webpack_require__(7);
	
	var _C10 = _interopRequireDefault(_C9);
	
	var _C11 = __webpack_require__(8);
	
	var _C12 = _interopRequireDefault(_C11);
	
	var _C13 = __webpack_require__(3);
	
	var _C14 = _interopRequireDefault(_C13);
	
	var _C15 = __webpack_require__(9);
	
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
	
	        self.config = {
	            separatorColor: "rgb(154, 154, 154)",
	            backgroundColor: null,
	            starting: 0,
	            ending: 0,
	            stack: true,
	            itemHeight: 25,
	            itemMargin: 15,
	            labelMargin: 50,
	            striped: null
	        };
	
	        // self.updateConfig(config);
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
	
	        value: function updateConfig(config, callback) {
	            _get(TimeLine.prototype.__proto__ || Object.getPrototypeOf(TimeLine.prototype), 'updateConfig', this).call(this, config);
	
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(config, self.options);
	
	            self.chartType = "timeline";
	            self.maxStack = 1;
	            self.stackList = {};
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                var maxStack = 0,
	                    minTime = 0,
	                    maxTime = 0,
	                    width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                // count number of stack and calculate min time, max time from data
	                if (self.options.stack || self.options.ending === 0 || self.options.starting === 0) {
	
	                    self.dataTarget.forEach(function (datum, index) {
	
	                        if (self.options.stack && Object.keys(self.stackList).indexOf(index) == -1) {
	                            self.stackList[index] = maxStack;
	                            maxStack++;
	                        }
	
	                        datum.value.forEach(function (time, i) {
	                            if (self.options.starting === 0) if (time.start < minTime || minTime === 0) minTime = time.start;
	                            if (self.options.ending === 0) {
	                                if (time.start > maxTime) maxTime = time.start;
	                                if (time.end > maxTime) maxTime = time.end;
	                            }
	                        });
	                    });
	
	                    if (self.options.ending === 0) {
	                        self.options.ending = maxTime;
	                    }
	                    if (self.options.starting === 0) {
	                        self.options.starting = minTime;
	                    }
	                }
	
	                self.maxStack = maxStack;
	
	                self.x = d3.time.scale().domain([self.options.starting, self.options.ending]).range([0, self.width]);
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	    }, {
	        key: 'updateDataConfig',
	        value: function updateDataConfig(dataCfg, callback) {
	
	            var self = this;
	
	            self.options = _C14.default.mergeDeep(self.options, dataCfg);
	
	            self.chartType = "timeline";
	            self.maxStack = 1;
	            self.stackList = {};
	
	            var dataOption = self.dataOption;
	            dataOption.colorRange = self.colorRange;
	
	            var da = new _C16.default(dataOption, self.chartType, null);
	            da.getDataTarget(self.chartType, function (data) {
	                self.dataTarget = data;
	
	                var maxStack = 0,
	                    minTime = 0,
	                    maxTime = 0,
	                    width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                // Count number of stack and calculate min time, max time from data
	                // Update from existing data, so starting|ending both existed, no need
	                // to check
	                if (self.options.stack || self.options.ending === 0 || self.options.starting === 0) {
	
	                    self.dataTarget.forEach(function (datum, index) {
	
	                        if (self.options.stack && Object.keys(self.stackList).indexOf(index) == -1) {
	                            self.stackList[index] = maxStack;
	                            maxStack++;
	                        }
	
	                        datum.value.forEach(function (time, i) {
	                            // if(self.options.starting === 0)
	                            if (time.start < minTime || minTime === 0) minTime = time.start;
	                            // if(self.options.ending === 0) {
	                            if (time.start > maxTime) maxTime = time.start;
	                            if (time.end > maxTime) maxTime = time.end;
	                            // }
	                        });
	                    });
	
	                    // if (self.options.ending === 0) {
	                    self.options.ending = maxTime;
	                    // }
	                    // if (self.options.starting === 0) {
	                    self.options.starting = minTime;
	                    // }
	                }
	
	                self.maxStack = maxStack;
	
	                self.x = d3.time.scale().domain([self.options.starting, self.options.ending]).range([0, self.width]);
	
	                if (_C14.default.isFunction(callback)) {
	                    callback.call(self, self.dataTarget);
	                }
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update(data) {
	            var self = this;
	
	            var width = self.width - self.margin.left - self.margin.right,
	                height = self.height - self.margin.top - self.margin.bottom;
	
	            var scale = width / (self.options.ending - self.options.starting);
	
	            var color = self.colorRange;
	
	            var stackList = self.stackList;
	
	            self.body.selectAll(".c9-timeline-border-bar").data([]).exit().remove();
	            self.body.selectAll(".c9-timeline-chart.c9-background-container").data([]).exit().remove();
	            self.body.selectAll(".c9-timeline-chart.c9-stripe-background-container").data([]).exit().remove();
	            self.body.selectAll(".c9-timeline-chart.c9-rect-container").data([]).exit().remove();
	            self.svg.selectAll(".c9-timeline-chart.c9-label-container").remove();
	            self.body.selectAll(".c9-timeline-row-separator").remove();
	
	            // Update clip-parth
	            self.svg.select('#clip').select('rect').attr('height', (self.options.itemHeight + self.options.itemMargin) * data.length);
	
	            //draw border
	            self.body.append("rect").attr("class", "c9-timeline-border-bar").attr("x", 0).attr("width", width).attr("y", 0 - self.options.itemMargin / 2).attr("height", (self.options.itemHeight + self.options.itemMargin) * (self.options.stack ? self.maxStack : 1)).attr("stroke", "rgb(154, 154, 154)").attr("stroke-width", 2).attr("fill", "none");
	
	            var labelContainer = self.svg.append("g").attr('class', 'c9-timeline-chart c9-label-container');
	
	            data.forEach(function (datum, index) {
	                var barYAxis = (self.options.itemHeight + self.options.itemMargin) * stackList[index];
	                if (!self.options.stack) barYAxis = 0;
	
	                //draw background
	                if ((!self.options.stack && index == 0 || self.options.stack) && self.options.backgroundColor) {
	                    var bgContainer = self.body.append("g").attr('class', 'c9-timeline-chart c9-background-container');
	
	                    bgContainer.selectAll(".c9-background-container").data(datum.value).enter().append("rect").attr("class", "c9-timeline-background-bar").attr("x", 0).attr("width", width).attr("y", barYAxis - self.options.itemMargin / 2).attr("height", self.options.itemHeight + self.options.itemMargin).attr("fill", _C14.default.isArray(self.options.backgroundColor) ? self.options.backgroundColor[index % self.maxStack] : self.options.backgroundColor);
	                }
	
	                if ((!self.options.stack && index == 0 || self.options.stack) && self.options.striped) {
	                    var bgContainer = self.body.append("g").attr('class', 'c9-timeline-chart c9-stripe-background-container');
	                    bgContainer.selectAll(".c9-stripe-background-container").data(datum.value).enter().insert("rect").attr("class", "c9-timeline-stripe-background-bar").attr("x", 0).attr("width", width).attr("y", barYAxis - self.options.itemMargin / 2).attr("height", self.options.itemHeight + self.options.itemMargin).attr("fill", index % 2 ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)");
	                }
	
	                //draw item
	                var itemContainer = self.body.append("g").attr('class', 'c9-timeline-chart c9-rect-container').attr("clip-path", "url(#clip)");
	
	                itemContainer.selectAll(".c9-rect-container").data(datum.value).enter().append(function (d, i) {
	                    return document.createElementNS(d3.ns.prefix.svg, d.end != "Invalid Date" ? "rect" : "circle");
	                }).attr('class', 'c9-timeline-custom-rect')
	                // .attr("x", function(d, i) { return self.getXPos(d,i,scale); })
	                .attr("x", function (d, i) {
	                    return self.x(d.start);
	                }).attr("y", function (d, i) {
	                    return self.getStackPosition(d, i, index);
	                })
	                // .attr("width", function (d, i) {
	                //     return (d.end - d.start) * scale;
	                // })
	                .attr("width", function (d, i) {
	                    return self.x(d.end) - self.x(d.start);
	                }).attr("cy", function (d, i) {
	                    return self.getStackPosition(d, i, index) + self.options.itemHeight / 2;
	                }).attr("cx", function (d, i) {
	                    return self.getXPos(d, i, scale);
	                }).attr("r", self.options.itemHeight / 2).attr("height", self.options.itemHeight).style("fill", color(index));
	
	                if (self.options.stack && self.options.separatorColor && index < self.maxStack - 1) {
	                    var lineYAxis = self.options.itemHeight + self.options.itemMargin / 2 + (self.options.itemHeight + self.options.itemMargin) * stackList[index];
	                    self.body.append("svg:line").attr("class", "c9-timeline-row-separator").attr("x1", 0).attr("x2", width).attr("y1", lineYAxis).attr("y2", lineYAxis).attr("stroke-width", 3).attr("stroke", _C14.default.isArray(self.options.separatorColor) ? self.options.separatorColor[index % (self.maxStack - 1)] : self.options.separatorColor);
	                }
	
	                //draw the label left side item
	                if (self.options.stack && !_C14.default.isEmpty(datum.name) && datum.name != "") {
	                    var rowsDown = self.margin.top + (self.options.itemHeight + self.options.itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + self.options.itemHeight * 0.75;
	
	                    labelContainer.append("text").attr("class", "c9-timeline-label").attr("transform", "translate(" + self.options.labelMargin + "," + rowsDown + ")").text(datum.name);
	                }
	                //draw icon
	                else if (self.options.stack && !_C14.default.isEmpty(datum.icon) && datum.icon != "") {
	                        labelContainer.append("image").attr("class", "c9-timeline-label").attr("transform", "translate(" + self.options.labelMargin + "," + (self.margin.top + (self.options.itemHeight + self.options.itemMargin) * stackList[index]) + ")").attr("xlink:href", datum.icon).attr("width", self.options.itemHeight).attr("height", self.options.itemHeight);
	                    }
	            });
	
	            self.updateInteraction();
	        }
	
	        /**
	         * Update sub chart
	         */
	
	    }, {
	        key: 'updateSubChart',
	        value: function updateSubChart(data) {
	            var self = this;
	
	            if (self.options.subchart.show) {
	                var width = self.width - self.margin.left - self.margin.right,
	                    height = self.height - self.margin.top - self.margin.bottom;
	
	                // Set actual size for chart after initialization
	                var chartBox = self.body.node().getBBox();
	                // self.actualWidth = chartBox.width - 4 * self.point.radius;
	                self.actualHeight = chartBox.height;
	
	                /*----------  Sub Chart  ----------*/
	
	                self.subChartWidth = width, self.subChartHeight = self.options.subchart.height, self.subChartMargin = {
	                    'top': self.actualHeight + 100,
	                    'left': self.margin.left
	                };
	
	                self.subChartX = d3.time.scale().range([0, self.subChartWidth]);
	
	                self.subChartX.domain([self.options.starting, self.options.ending]);
	
	                self.subChartXAxis = d3.svg.axis().scale(self.subChartX).orient("bottom");
	
	                self.brush = d3.svg.brush().x(self.subChartX).on("brush", function () {
	                    // Update axis
	                    self.x.domain(self.brush.empty() ? self.subChartX.domain() : self.brush.extent());
	
	                    self.options.starting = self.x.domain()[0];
	                    self.options.ending = self.x.domain()[1];
	
	                    self.axis.update(self.x, self.y, 500);
	                    var scale = width / (self.options.ending - self.options.starting);
	
	                    // Update main path of Line Chart
	                    self.body.selectAll(".c9-timeline-custom-rect").attr("x", function (d, i) {
	                        return self.x(d.start);
	                    }).attr("width", function (d, i) {
	                        return self.x(d.end) - self.x(d.start);
	                    });
	                    // .attr("x", function(d, i) { return self.getXPos(d,i, scale); });
	                    // .attr("y", function(d, i) { return self.getStackPosition(d,i,stackList, index); })
	                    // .attr("cx", function(d, i) { return self.getXPos(d,i, scale); })
	                    // .attr("cy", function (d, i) {
	                    //     return self.getStackPosition(d, i, stackList, index) + self.options.itemHeight / 2;
	                    // });
	                });
	
	                var scale = width / (self.options.ending - self.options.starting);
	
	                var color = self.colorRange;
	
	                self.svg.attr('height', self.height + self.subChartHeight);
	
	                self.svg.selectAll(".c9-subchart-custom").remove();
	                self.svg.selectAll(".c9-subchart-custom .c9-subchart-axis").remove();
	
	                var subChart = self.svg.append("g").attr("class", "c9-subchart-custom")
	                // .attr("clip-path", "url(#clip)")
	                .attr("transform", "translate(" + self.subChartMargin.left + "," + self.subChartMargin.top + ")");
	
	                var itemContainer = subChart.append('g').attr('class', 'c9-subchart-custom c9-subchart-timeline-container');
	                // .attr("clip-path", "url(#clip)");
	
	                data.forEach(function (datum, index) {
	                    if (!datum.enable) return;
	
	                    itemContainer.selectAll(".c9-subchart-timeline-container").data(datum.value).enter().append(function (d, i) {
	                        return document.createElementNS(d3.ns.prefix.svg, d.end != "Invalid Date" ? "rect" : "circle");
	                    }).attr('class', 'c9-timeline-custom-rect')
	                    // .attr("x", function(d, i) { return self.getXPos(d,i, scale); })
	                    .attr("x", function (d, i) {
	                        return self.subChartX(d.start);
	                    }).attr("y", function (d, i) {
	                        return self.getStackPosition(d, i, index, true);
	                    })
	                    // .attr("width", function (d, i) {
	                    //     return (d.end - d.start) * scale;
	                    // })
	                    .attr("width", function (d, i) {
	                        return self.subChartX(d.end) - self.subChartX(d.start);
	                    }).attr("cy", function (d, i) {
	                        return self.getStackPosition(d, i, index) + self.options.itemHeight / 2;
	                    })
	                    // .attr("cx", function(d, i) { return self.getXPos(d,i, scale); })
	                    .attr("cx", function (d, i) {
	                        return self.subChartX(d.start);
	                    }).attr("r", self.options.itemHeight / 2).attr("height", self.options.itemHeight / 2).style("fill", color(index));
	                });
	
	                itemContainer.append("g").attr("class", "c9-subchart-axis").attr("transform", "translate(0," + self.subChartHeight + ")").call(self.subChartXAxis);
	
	                //append the brush for the selection of subsection  
	                itemContainer.append("g").attr("class", "c9-subchart-brush").call(self.brush).selectAll("rect").attr("height", self.subChartHeight);
	            }
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
	                selector = self.selectAllRect(),
	                hoverOptions = self.hover.options,
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
	
	                    d3.select(this).style("fill", function (d, i) {
	                        return self.getLightenColor(d.color || color(i));
	                    });
	
	                    tooltip.draw(d, self, 'mouseover');
	                },
	
	                'mouseout': function mouseout(d, i) {
	                    if (!hoverEnable) return;
	
	                    if (_C14.default.isFunction(onMouseOutCallback)) {
	                        onMouseOutCallback.call(this, d);
	                    }
	
	                    d3.select(this).style("fill", function (d, i) {
	                        return d.color || color(i);
	                    });
	
	                    tooltip.draw(d, self, 'mouseout');
	                }
	            };
	
	            selector.on(self.eventFactory);
	        }
	    }, {
	        key: 'getXPos',
	        value: function getXPos(d, i, scale) {
	            var self = this;
	            return (d.start - self.options.starting) * scale;
	        }
	    }, {
	        key: 'getStackPosition',
	        value: function getStackPosition(d, i, index, isSubchart) {
	            var self = this;
	
	            var stackList = self.stackList;
	
	            if (self.options.stack) {
	                if (isSubchart) {
	                    var height = self.height - self.margin.top - self.margin.bottom;
	                    var ratio = self.subChartHeight / height;
	
	                    return (self.options.itemHeight * ratio + self.options.itemMargin) * stackList[index];
	                } else {
	                    return (self.options.itemHeight + self.options.itemMargin) * stackList[index];
	                }
	            }
	            return 0;
	        }
	
	        /*=====  End of Main Functions  ======*/
	
	        /*========================================
	        =            User's Functions            =
	        ========================================*/
	
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
	
	        /**
	         * Main draw function
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            _get(TimeLine.prototype.__proto__ || Object.getPrototypeOf(TimeLine.prototype), 'draw', this).call(this);
	
	            var self = this;
	
	            self.updateConfig(self.config, function (data) {
	                var axis = new _C4.default(self.options.axis, self, self.width - self.margin.left - self.margin.right, (self.options.itemHeight + self.options.itemMargin) * self.maxStack);
	                var title = new _C6.default(self.options.title, self);
	                var legend = new _C8.default(self.options.legend, self, self.colorRange, data);
	
	                self.axis = axis;
	                self.title = title;
	                self.legend = legend;
	
	                // Draw title
	                self.title.draw();
	
	                // Draw axis
	                self.axis.draw();
	
	                self.update(data);
	                self.updateSubChart(data);
	                self.updateInteraction();
	            });
	        }
	
	        /**
	         * Set option via stand-alone function
	         * @param {[type]} key   [description]
	         * @param {[type]} value [description]
	         */
	
	    }, {
	        key: 'setOption',
	        value: function setOption(key, value) {
	            _get(TimeLine.prototype.__proto__ || Object.getPrototypeOf(TimeLine.prototype), 'setOption', this).call(this, key, value);
	
	            var self = this;
	
	            _C14.default.set(key, value, self.options);
	
	            self.updateConfig(self.options);
	        }
	
	        /**
	         * Update chart based on new data with optional dataConfig
	         * @param  {[type]} data       [description]
	         * @param  {[type]} dataConfig [description]
	         */
	
	    }, {
	        key: 'updateData',
	        value: function updateData(newData, newDataConfig) {
	            var self = this;
	
	            var newCfg = {};
	
	            if (!_C14.default.isEmpty(newDataConfig)) {
	
	                newCfg.data = {
	                    plain: newData,
	                    keys: newDataConfig
	                };
	            } else {
	
	                newCfg.data = {
	                    plain: newData
	                };
	            }
	
	            // Update chart
	            self.updateDataConfig(newCfg, function (data) {
	                self.update(data);
	                self.updateSubChart(data);
	
	                // Update Axis
	                self.axis.update(self.x, self.y, 100);
	            });
	        }
	        /*=====  End of User's Functions  ======*/
	
	    }, {
	        key: 'maxStack',
	        get: function get() {
	            return this._maxStack;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	        set: function set(arg) {
	            if (arg) {
	                this._maxStack = arg;
	            }
	        }
	    }, {
	        key: 'subChartX',
	        get: function get() {
	            return this._subChartX;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartX = arg;
	            }
	        }
	    }, {
	        key: 'subChartXAxis',
	        get: function get() {
	            return this._subChartXAxis;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartXAxis = arg;
	            }
	        }
	    }, {
	        key: 'subChartWidth',
	        get: function get() {
	            return this._subChartWidth;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartWidth = arg;
	            }
	        }
	    }, {
	        key: 'subChartHeight',
	        get: function get() {
	            return this._subChartHeight;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartHeight = arg;
	            }
	        }
	    }, {
	        key: 'subChartMargin',
	        get: function get() {
	            return this._subChartMargin;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._subChartMargin = arg;
	            }
	        }
	    }, {
	        key: 'brush',
	        get: function get() {
	            return this._brush;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._brush = arg;
	            }
	        }
	    }, {
	        key: 'stackList',
	        get: function get() {
	            return this._stackList;
	        },
	        set: function set(arg) {
	            if (arg) {
	                this._stackList = arg;
	            }
	        }
	    }]);
	
	    return TimeLine;
	}(_C2.default);
	
	exports.default = TimeLine;

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
	
	var _C3 = __webpack_require__(8);
	
	var _C4 = _interopRequireDefault(_C3);
	
	var _C5 = __webpack_require__(9);
	
	var _C6 = _interopRequireDefault(_C5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	            layers: null,
	            view: {
	                lat: 0,
	                lon: 0,
	                zoom: 2
	            },
	            data: null,
	            tooltip: {
	                format: null
	            }
	        };
	
	        self._options = _C2.default.mergeDeep(config, options);
	        self._dataSource = self._options.data;
	        self.initMapConfig();
	    }
	
	    /*==============================
	    =            Getter            =
	    ==============================*/
	
	    // get id() {
	    //     return this._options.id;
	    // }
	
	    // get height() {
	    //     return this._height;
	    // }
	
	    // get width() {
	    //     return this._width;
	    // }
	
	    // get view() {
	    //     return this._view;
	    // }
	
	    // get markers() {
	    //     return this._markers;
	    // }
	
	    // get layers() {
	    //     return this._layers;
	    // }
	
	    _createClass(Map, [{
	        key: 'initMapConfig',
	
	        /*=====  End of Setter  ======*/
	
	        /*======================================
	        =            Main Functions            =
	        ======================================*/
	
	        value: function initMapConfig() {
	            var self = this;
	
	            //c9Layers contain all layers
	            self.c9Layers = [];
	            //c9Markers contain all markers
	            // self.c9Markers = new ol.source.Vector({});
	            //c9Objects contain all polygons, lines
	            self.c9Objs = new ol.source.Vector({});
	            self.c9GeojsonObjs = [];
	            self.c9GeojsonObjsLayers = [];
	            //init all thing relating to user's data
	
	            //layer
	            self.initLayer();
	
	            //quick markers
	            // self.initMarker();
	
	            //object
	            // self.initObj();
	
	            //init popup
	            var popup = document.createElement('div');
	            popup.id = 'c9MapPopup';
	            popup.className = 'c9-map-tooltip-container c9-custom-tooltip-container c9-tooltip-top';
	            document.body.appendChild(popup);
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	            var view = self.options.view,
	                id = self.options.id;
	
	            self.c9View = new ol.View({
	                center: ol.proj.fromLonLat([view.lon, view.lat]),
	                zoom: view.zoom > 2 ? view.zoom : 2,
	                minZoom: 2
	            });
	            self.c9Map = new ol.Map({
	                target: id,
	                layers: self.c9Layers,
	                view: self.c9View,
	                interactions: ol.interaction.defaults({ doubleClickZoom: false })
	            });
	
	            /******************** ADD C9 OBJECTS ********************/
	            self.c9ObjsLayer = new ol.layer.Vector({
	                source: self.c9Objs,
	                map: self.c9Map
	            });
	            /********************************************************/
	
	            /********************* ADD C9 POPUP *********************/
	            self.c9Popup = new ol.Overlay({
	                positioning: 'bottom-center',
	                element: document.getElementById('c9MapPopup')
	            });
	
	            //add overlay to contain popup
	            self.c9Map.addOverlay(self.c9Popup);
	            /********************************************************/
	
	            /********************* HOVER STYLE **********************/
	            self.c9CustomHover = new ol.layer.Vector({
	                source: new ol.source.Vector(),
	                map: self.c9Map,
	                style: new ol.style.Style({
	                    stroke: new ol.style.Stroke({
	                        color: 'rgb(0, 153, 255)',
	                        width: 3
	                    }),
	                    fill: new ol.style.Fill({
	                        color: 'rgba(255, 255, 255, 0.2)'
	                    })
	                })
	            });
	            /********************************************************/
	            //adapt data to obj
	            self.addData(self.dataSource);
	            //define interaction
	            self.updateInteraction();
	        }
	        /*=====  End of Main Functions  ======*/
	
	        /**
	         * Create layer
	         * @param  {String} type of layer
	         * @param  {source} source data defined by C9
	         */
	
	    }, {
	        key: 'createLayer',
	        value: function createLayer(options) {
	            var self = this;
	            if (_C2.default.isEmpty(options)) return;
	
	            var type = options.type || 'Tile',
	                source = options.source || { name: 'OSM' };
	            // style = options.style;
	
	            var layer = new ol.layer[type]();
	            layer.setSource(self.setupSource(source));
	            // if (!Helper.isEmpty(style)) layer.setStyle(style);
	
	            //adapt source data to c9obj
	            //support maximum 2 source level
	            var containFeature = true,
	                vs;
	            try {
	                vs = layer.getSource();
	                vs.getFeatures();
	            } catch (err) {
	                try {
	                    vs = layer.getSource().getSource();
	                    vs.getFeatures();
	                } catch (err) {
	                    containFeature = false;
	                }
	            }
	
	            if (containFeature) {
	                var readFormat = function readFormat(feature) {
	                    var result = {};
	                    feature.getKeys().forEach(function (k) {
	                        result[k] = feature.getProperties()[k];
	                    });
	                    result['id'] = feature.getId();
	                    return result;
	                };
	                //register layer loaded event to set data for obj
	                vs.once('change', function (e) {
	                    if (vs.getState() == 'ready') {
	                        var objs = vs.getFeatures();
	                        self.c9GeojsonObjs.push(layer.getSource());
	                        self.c9GeojsonObjsLayers.push(layer);
	                        // self.c9Objs.addFeatures(objs);
	
	                        objs.forEach(function (o) {
	                            o.set('data', readFormat(o));
	                            o.set('type', 'c9-geojson');
	                        });
	
	                        self.updateGeojsonData({
	                            data: options.data,
	                            style: options.style
	                        });
	                    }
	                });
	            }
	
	            self.c9Layers.push(layer);
	
	            if (!_C2.default.isEmpty(self.c9Map)) self.c9Map.addLayer(layer);
	
	            return layer;
	        }
	
	        /**
	         * Init Layer base on first user's data
	         */
	
	    }, {
	        key: 'initLayer',
	        value: function initLayer() {
	            var self = this;
	            var layers = self.options.layers;
	
	            if (layers instanceof Array) {
	                layers.forEach(function (l, i) {
	                    self.createLayer({ type: l.type, source: l.source, style: l.style, condition: l.condition, data: l.data });
	                });
	            } else if (_C2.default.isObject(layers)) {
	                self.createLayer({ type: layers.type, source: layers.source, style: layers.style, condition: layers.condition, data: layers.data });
	            }
	        }
	
	        /**
	         * Setup source for layer
	         * @param  {Object} source data style defined by c9
	         * @return {String} return source (ol.source)
	         */
	
	    }, {
	        key: 'setupSource',
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
	                        source: this.setupSource(s.source),
	                        // default style
	                        style: new ol.style.Style({
	                            fill: new ol.style.Fill({
	                                color: 'rgba(255, 255, 255, 0.2)'
	                            }),
	                            stroke: new ol.style.Stroke({
	                                color: '#319FD3',
	                                width: 1
	                            })
	                        })
	                    });
	                    break;
	                default:
	                    source = new ol.source.OSM();
	                    break;
	
	            }
	
	            return source;
	        }
	
	        /**
	         * define some interactions
	         */
	
	    }, {
	        key: 'updateInteraction',
	        value: function updateInteraction() {
	            var self = this;
	            var LEFT_KEY = 37,
	                RIGHT_KEY = 39,
	                DEL_KEY = 46,
	                DURATION = 1000,
	                LOAD_MAP_DELAY = 500;
	
	            // add default interaction of ol3
	            // self.c9Map.addInteraction(self.c9DefaultHoverStyle = new ol.interaction.Select({
	            //     condition: ol.events.condition.pointerMove
	            // }));
	
	            //normal: stroke 'rgb(49, 159, 211)' width: 1
	            //        fill '#fff'
	
	
	            /******************* SOME HELPER FUNCTION ********************/
	            var getCenterLonLat = function getCenterLonLat(f) {
	                return ol.proj.transform(getCenter(f), 'EPSG:3857', 'EPSG:4326');
	            };
	            var getCenter = function getCenter(f) {
	                return ol.extent.getCenter(f.getGeometry().getExtent());
	            };
	            var transformCoordinates = function transformCoordinates(c) {
	                return ol.proj.transform(c, 'EPSG:3857', 'EPSG:4326');
	            };
	            /**
	             * Create pan animation on object
	             * @param  {ol.Feature}
	             */
	            var panAnimation = function panAnimation(feature) {
	                if (self.c9View.getCenter()[0] == getCenter(feature)[0] && self.c9View.getCenter()[1] == getCenter(feature)[1]) return;
	
	                var pan = ol.animation.pan({
	                    duration: DURATION,
	                    source: self.c9View.getCenter()
	                });
	                self.c9Map.beforeRender(pan);
	                self.c9View.setCenter(getCenter(feature));
	            };
	            /**
	             * Create marker's flash effect
	             * @param  {ol.Feature}
	             */
	            var createMarkerEffect = function createMarkerEffect(feature) {
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
	            };
	            /**
	             * Caculate distance between marker and center view, plus direction compare with center
	             * @param  {ol.Feature}
	             * @return {[Number, Boolean]} Array of distance value and direction value (left if true, right if false)
	             */
	            var distanceAndDirection = function distanceAndDirection(f) {
	                var center = transformCoordinates(self.c9View.getCenter());
	                var fCoordinates = getCenterLonLat(f);
	                return [Math.sqrt(Math.pow(fCoordinates[0] - center[0], 2) + Math.pow(fCoordinates[1] - center[1], 2)), fCoordinates[0] - center[0] <= 0];
	            };
	            var formatPopup = function formatPopup(data) {
	                if (_C2.default.isEmpty(data)) return;
	                var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
	                    return string.charAt(0).toUpperCase() + string.slice(1);
	                };
	                var strongSpan = function strongSpan(strong, span) {
	                    if (span == '' || _C2.default.isEmpty(span) || _C2.default.isObject(span)) return "";return "<strong>" + capitalizeFirstLetter(strong) + ":</strong>" + "<span> " + span + "</span></br>";
	                };
	                var result = strongSpan("Name", data.name),
	                    v;
	                if (!_C2.default.isEmpty(data.coor)) result += strongSpan("Lon", data.coor.lon || data.coor[0]) + strongSpan("Lat", data.coor.lat || data.coor[1]);
	
	                for (var i in v = data.value) {
	                    result += strongSpan(i, v[i]);
	                }
	                return result;
	            };
	            /*************************************************************/
	
	            //register pointer move event to show cursor as pointer if user hover on markers
	            self.c9Map.on('pointermove', function (evt) {
	                var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
	                    return feature;
	                });
	
	                // new hover style
	                if (f !== self.lastHoveredObj) {
	                    if (self.lastHoveredObj) {
	                        if (self.lastHoveredObj.get('type') != "c9-geojson" && self.lastHoveredObj.get('c9-style')) self.lastHoveredObj.setStyle(self.lastHoveredObj.get('c9-style'));else self.c9CustomHover.getSource().removeFeature(self.lastHoveredObj);
	                    }
	                    if (f) {
	                        var fStyle = f.get('c9-style'),
	                            strokeColor = 'rgb(0, 153, 255)',
	                            strokeWidth = 3,
	                            fillColor = 'rgba(255, 255, 255, 0.2)';
	                        if (fStyle) {
	                            strokeColor = fStyle.getStroke().getColor() == '#319FD3' ? 'rgb(0, 153, 255)' : self.getLightenColor(fStyle.getStroke().getColor());
	                            strokeWidth = fStyle.getStroke().getWidth() + 2;
	                            fillColor = fStyle.getFill().getColor() == 'rgba(255, 255, 255, 0.2)' ? 'rgba(255, 255, 255, 0.2)' : self.getLightenColor(fStyle.getFill().getColor());
	                        }
	                        var newStyle = new ol.style.Style({
	                            stroke: new ol.style.Stroke({
	                                color: strokeColor,
	                                width: strokeWidth
	                            }),
	                            fill: new ol.style.Fill({
	                                color: fillColor
	                            })
	                        });
	                        if (fStyle) f.setStyle(newStyle);else {
	                            self.c9CustomHover.setStyle(newStyle);
	                            self.c9CustomHover.getSource().addFeature(f);
	                        }
	                    }
	                    self.lastHoveredObj = f;
	                }
	                if (f) {
	                    self.c9Map.getTargetElement().style.cursor = 'pointer';
	                    // self.createMarkerEffect(f);
	                    /************* LIGHTEN COLOR ***********/
	                    // if (f.get('type') == 'c9-line' || f.get('type') == 'c9-polygon' || f.get('type') == 'c9-multipolygon'){
	                    //     var fStyle = f.getStyle();
	                    //     var defaultStyle = f.get('c9-style');
	
	                    //     if (fStyle.getStroke().getWidth() == defaultStyle.strokeWidth)
	                    //         f.setStyle(new ol.style.Style({
	                    //             stroke: new ol.style.Stroke({
	                    //                 width: fStyle.getStroke().getWidth() + 2,
	                    //                 color: self.getLightenColor(fStyle.getStroke().getColor())
	                    //             }),
	                    //             fill: new ol.style.Fill({
	                    //                 color: self.getLightenColor(fStyle.getFill().getColor())
	                    //             })
	                    //         }));
	                    // }
	
	                    // if (f !== self.lastHoveredObj) {
	                    //     if (self.lastHoveredObj) {
	                    //         self.c9CustomHover.getSource().removeFeature(self.lastHoveredObj);
	                    //     }
	                    //     if (f) {
	                    //         self.c9CustomHover.getSource().addFeature(f);
	                    //     }
	                    //     self.lastHoveredObj = f;
	                    // }
	
	                    /****************************************/
	
	                    /************** SHOW POPUP *************/
	                    self.c9Popup.getElement().style.display = 'none';
	
	                    // panAnimation(f);
	
	                    try {
	                        if (self.options.tooltip.format) self.options.tooltip.format(f.get('data'));
	                    } catch (err) {
	                        throw "Check data format again";
	                        return;
	                    }
	
	                    var content = self.options.tooltip.format ? self.options.tooltip.format(f.get('data')) : formatPopup(f.get('data'));
	                    if (_C2.default.isEmpty(content) || content.toString().trim() == "") return;
	
	                    self.c9Popup.getElement().style.display = 'block';
	                    self.c9Popup.getElement().innerHTML = content;
	                    // self.c9Popup.setPosition(getCenter(f));
	                    self.c9Popup.setPosition(evt.coordinate);
	                    /****************************************/
	                    // var stop = new CustomEvent("click", {detail: {message: "stop"}});
	                    // self.c9Map.dispatchEvent(stop);
	                }
	                if (!f) {
	                    self.c9Map.getTargetElement().style.cursor = '';
	                    self.c9Popup.getElement().style.display = 'none';
	
	                    //remove last obj style
	                    // if (!Helper.isEmpty(self.lastHoveredObj) && (self.lastHoveredObj.get('type') == 'c9-line' || self.lastHoveredObj.get('type') == 'c9-polygon' || self.lastHoveredObj.get('type') == 'c9-multipolygon')) {
	                    //     var defaultStyle = self.lastHoveredObj.get('c9-style');
	                    //     self.lastHoveredObj.setStyle(defaultStyle);
	                    // }   
	                }
	            });
	
	            //register map first render's event to show marker's effect
	            self.c9Map.once('postrender', function (evt) {
	                setTimeout(function () {
	                    self.c9Objs.getFeatures().forEach(function (f, i) {
	                        if (f.get('type') == 'c9-marker') createMarkerEffect(f);
	                    });
	                }, LOAD_MAP_DELAY);
	            });
	
	            //register click event to show effect on markers
	            self.c9Map.on('click', function (evt) {
	
	                // if (evt instanceof CustomEvent) return;
	                var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
	                    self.lastSelectedObj = feature;
	                    return feature;
	                });
	                if (f) {
	                    // self.createMarkerEffect(f);
	                    // self.c9Popup.getElement().style.display = 'none';
	
	                    panAnimation(f);
	
	                    // try {
	                    //     if (self.options.format) self.options.format(f.get('data'));
	                    // }
	                    // catch(err) {
	                    //     throw "Check data format again";
	                    //     return;
	                    // }
	
	                    // var content = self.options.format ? self.options.format(f.get('data')) : formatPopup(f.get('data'));
	                    // if (Helper.isEmpty(content) || content.toString().trim() == "") return;
	
	                    // self.c9Popup.getElement().style.display = 'block';
	                    // self.c9Popup.getElement().innerHTML = content;
	                    // self.c9Popup.setPosition(getCenter(f));
	
	                    // // var stop = new CustomEvent("click", {detail: {message: "stop"}});
	                    // // self.c9Map.dispatchEvent(stop);
	                }
	                if (!f) self.c9Popup.getElement().style.display = 'none';
	            });
	
	            //register keydown event to change center view
	            document.addEventListener('keydown', function (e) {
	                var keydownAnimate = function keydownAnimate(k) {
	                    var selectedFeature = undefined;
	                    var minDistance = Infinity;
	                    self.c9Objs.getFeatures().forEach(function (f, i) {
	                        if (f.get('type') == "c9-marker") {
	                            var checkAnimate = distanceAndDirection(f);
	
	                            if ((checkAnimate[1] && k == LEFT_KEY || !checkAnimate[1] && k == RIGHT_KEY) && checkAnimate[0] < minDistance && checkAnimate[0] != 0) {
	                                minDistance = checkAnimate[0];
	                                selectedFeature = f;
	                            }
	                        }
	                    });
	                    if (selectedFeature) {
	                        setTimeout(createMarkerEffect(selectedFeature), LOAD_MAP_DELAY);
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
	                    case DEL_KEY:
	                        // if (!Helper.isEmpty(self.lastSelectedObj) && (!Helper.isEmpty(self.lastSelectedObj.get('type')) || self.lastSelectedObj.get('type') != 'c9-geojson')) self.c9Objs.removeFeature(self.lastSelectedObj);
	                        break;
	                }
	            });
	        }
	
	        // /**
	        //  * marker first set up
	        //  */
	        // initMarker() {
	        //     var self = this;
	        //     //data
	        //     var markers = self.markers;
	        //     //add marker layer to layer list (c9Layers)
	        //     self.c9Layers.push(new ol.layer.Vector({
	        //         source: self.c9Markers
	        //     }));
	
	        //     if (markers.length === 0) return;
	
	        //     if (markers instanceof Array) {
	        //         markers.forEach(function(m, i) {
	        //             self.createMarker({lat: m.lat, lon: m.lon, imgSrc: m.img, scale: m.scale});
	        //         });
	        //     }
	        //     else {
	        //         self.createMarker({lat: markers.lat, lon: markers.lon, imgSrc: markers.img, scale: markers.scale});
	        //     }
	        // }
	        /**
	         * obj first set up
	         */
	        // initObj() {
	        //     var self = this;
	
	        //     //add layer Vector to layer list (c9Layers)
	        //     self.c9Layers.push(new ol.layer.Vector({
	        //         source: self.c9Objs
	        //     }));
	        // }
	
	        /**
	         * create c9 obj
	         * @data  {Object} coordinate
	         * @options  {Object} some options: strokeWidth,strokeColor,fillColor,imgSrc,scale
	         * @return {}
	         */
	
	    }, {
	        key: 'createObject',
	        value: function createObject(options) {
	            var self = this;
	            if (_C2.default.isEmpty(options) || _C2.default.isEmpty(options.data)) return;
	            var data = options.data,
	                style = options.style;
	            /**
	             * Create marker
	             * @param  {Number} latitude of marker
	             * @param  {Number} longitude of marker
	             * @param  {String} image source (support for both local and net)
	             * @param  {Number} scale image if its size is too large - default = 1
	             */
	            var createMarker = function createMarker(data, coor, options) {
	
	                if (!_C2.default.isArray(coor) && coor.length != 2) return;
	
	                var DEFAULT_SRC = 'http://s21.postimg.org/blklb8scn/marker_icon.png';
	                var DEFAULT_SCALE = 1;
	
	                var lat = coor[1],
	                    lon = coor[0],
	                    imgSrc = options ? options.imgSrc || DEFAULT_SRC : DEFAULT_SRC,
	                    scale = options ? options.scale || DEFAULT_SCALE : DEFAULT_SCALE;
	
	                var marker = new ol.Feature({
	                    'data-ref': '',
	                    type: 'c9-marker',
	                    data: data,
	                    // 'c9-id': ,
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
	                // marker.set('c9-style', markerStyle);
	                marker.setStyle(createMarkerStyle(imgSrc, scale));
	
	                //add this marker to marker list (c9Objs)
	                self.c9Objs.addFeature(marker);
	                return marker;
	            };
	
	            var coorAndType = self.normalizeCoordinate(data.coor);
	            if (coorAndType.coor == null) return;
	
	            //marker
	            if (coorAndType.type == "marker") {
	                return createMarker(data, coorAndType.coor, style);
	            }
	
	            // if (data == self.c9Markers) {
	            //     data = [];
	            //     self.c9Markers.getFeatures().forEach(function (d) {
	            //         data.push(ol.proj.transform(d.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326'));
	            //     })
	            // }
	
	            var strokeWidth = style ? style.strokeWidth || 1 : 1,
	                strokeColor = style ? style.strokeColor || "#319FD3" : "#319FD3",
	                fillColor = style ? style.fillColor || "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.2)";
	
	            var obj = new ol.Feature({
	                'data-ref': '',
	                type: "c9-" + coorAndType.type,
	                data: data,
	                geometry: coorAndType.type == "polygon" ? new ol.geom.Polygon(coorAndType.coor) : coorAndType.type == "line" ? new ol.geom.LineString(coorAndType.coor) : new ol.geom.MultiPolygon(coorAndType.coor)
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
	                        width: strokeWidth,
	                        color: strokeColor
	                    }),
	                    fill: new ol.style.Fill({
	                        color: fillColor
	                    })
	                });
	            };
	
	            var objStyle = createObjStyle(strokeWidth, strokeColor, fillColor);
	            obj.set('c9-style', objStyle);
	            obj.setStyle(objStyle);
	
	            //add this marker to marker list (c9Objs)
	            self.c9Objs.addFeature(obj);
	            return obj;
	        }
	
	        /**
	         * normalize coordinate
	         * currently only support marker, linestring, polygon and multipolygon
	         * @coor  {Array} coordinate of object
	         * @return {Array} coordinate was normalized
	         */
	
	    }, {
	        key: 'normalizeCoordinate',
	        value: function normalizeCoordinate(coor) {
	            var normCoor = [],
	                type,
	                error = { coor: null, type: null };
	            if (_C2.default.isObject(coor) && coor.length == undefined || _C2.default.isArray(coor) && coor.length == 2 && !isNaN(coor[0]) && !isNaN(coor[1])) {
	                // marker - [] - {}
	                type = "marker";
	                if (coor.length == undefined) {
	                    if (_C2.default.isEmpty(coor.lat) || _C2.default.isEmpty(coor.lon)) return error;
	                    normCoor = [coor.lon, coor.lat];
	                } else {
	                    normCoor = coor;
	                }
	            } else if (_C2.default.isArray(coor)) {
	                // linestring - [{},{}] - [[],[]] - [{},[]] - [[],{}]
	                var isArrayOrObject = function isArrayOrObject(obj) {
	                    var result = {};
	                    if (_C2.default.isObject(obj) && obj.length == undefined) {
	                        result['check'] = !_C2.default.isEmpty(obj.lat) && !_C2.default.isEmpty(obj.lon);
	                        if (result['check']) result['coor'] = [obj.lon, obj.lat];
	                    } else {
	                        result['check'] = _C2.default.isArray(obj) && obj.length == 2 && !isNaN(obj[0]) && !isNaN(obj[1]);
	                        if (result['check']) result['coor'] = obj;
	                    }
	                    return result;
	                };
	
	                // check data inside to eliminate case: multipolygon contains 2 polygons
	                if (coor.length == 2 && isArrayOrObject(coor[0]).check && isArrayOrObject(coor[1]).check) {
	                    type = "line";
	                    normCoor.push(isArrayOrObject(coor[0]).coor);
	                    normCoor.push(isArrayOrObject(coor[1]).coor);
	                }
	                //polygon || multipolygon
	                else if (coor.length >= 1) {
	                        // multipolygon [[[[] || {}, ...]], [[[] || {}, ...]], ...]
	                        if (!_C2.default.isEmpty(coor[0][0]) && !_C2.default.isEmpty(coor[0][0][0])) {
	                            type = "multipolygon";
	                            coor.forEach(function (pc, i) {
	                                if (_C2.default.isArray(pc) && pc.length == 1) {
	                                    normCoor.push([[]]);
	                                    pc[0].forEach(function (c) {
	                                        // data - [] || {}
	                                        var obj = isArrayOrObject(c);
	                                        if (obj.check) normCoor[i][0].push(obj.coor);
	                                    });
	                                    // cannot create polygon with the number of points is less than 2
	                                    if (normCoor[i][0].length <= 2) return error;
	                                } else return error; // because data format is not true
	                            });
	                        }
	                        // polygon [[[] || {}, ...]]
	                        else {
	                                type = "polygon";
	                                normCoor.push([]);
	                                coor[0].forEach(function (c) {
	                                    // data - [] || {}
	                                    var obj = isArrayOrObject(c);
	                                    if (obj.check) normCoor[0].push(obj.coor);
	                                });
	                                if (normCoor[0].length <= 2) return error;
	                            }
	                    } else return error;
	            }
	            return {
	                coor: normCoor,
	                type: type
	            };
	        }
	
	        /**
	         * create obj base on user data
	         * @data  {Object} data structure: {coor: [], name: , value: }
	         * return list of created object
	         */
	
	    }, {
	        key: 'addData',
	        value: function addData(data) {
	            if (_C2.default.isEmpty(data) || _C2.default.isEmpty(data.plain) && _C2.default.isEmpty(data.file)) return;
	            var self = this;
	
	            var da = new _C6.default(data);
	            da.getDataTarget('map', function (data) {
	                self.data = data;
	                if (!_C2.default.isEmpty(self.c9Map)) {
	                    if (_C2.default.isArray(self.data)) self.data.forEach(function (d, i) {
	                        self.createObject({ data: d });
	                    });else self.createObject({ data: self.data });
	                }
	            });
	        }
	    }, {
	        key: 'getObjects',
	        value: function getObjects() {
	            var c9GeojsonObjs = [];
	            this.c9GeojsonObjs.forEach(function (o) {
	                try {
	                    c9GeojsonObjs = c9GeojsonObjs.concat(o.getSource().getFeatures());
	                } catch (err) {
	                    try {
	                        c9GeojsonObjs = c9GeojsonObjs.concat(o.getFeatures());
	                    } catch (err) {}
	                }
	            });
	
	            return this.c9Objs.getFeatures().concat(c9GeojsonObjs);
	        }
	    }, {
	        key: 'getMap',
	        value: function getMap() {
	            return this.c9Map;
	        }
	
	        /**
	         * Custom Event Listener
	         * @param  {[type]}   eventType [description]
	         * @param  {Function} callback  [description]
	         */
	
	    }, {
	        key: 'on',
	        value: function on(eventType, callback) {
	            var self = this;
	            // Update Event Factory
	            var eventFactoryViewport = {
	                'click': function click(evt) {
	                    var f = self.c9Map.forEachFeatureAtPixel(self.c9Map.getEventPixel(evt), function (feature, layer) {
	                        return feature;
	                    });
	                    if (_C2.default.isFunction(callback) && f) {
	                        callback.call(this, f);
	                    }
	                },
	                'pointermove': function pointermove(evt) {
	                    var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
	                        return feature;
	                    });
	                    if (_C2.default.isFunction(callback) && f) {
	                        callback.call(this, f);
	                    }
	                },
	                'postrender': function postrender(evt) {
	                    if (_C2.default.isFunction(callback)) {
	                        callback.call(this, evt);
	                    }
	                }
	            };
	
	            if (eventType == "click") self.c9Map.getViewport().addEventListener(eventType, eventFactoryViewport[eventType]);else if (eventType == "pointermove") self.c9Map.on(eventType, eventFactoryViewport[eventType]);else if (eventType == "postrender") self.c9Map.once(eventType, eventFactoryViewport[eventType]);
	        }
	    }, {
	        key: 'getLightenColor',
	        value: function getLightenColor(color) {
	            if (color.includes('rgba')) {
	                var alpha = color.split(',')[color.split(',').length - 1].replace(')', '');
	                var currentColor = color.replace(',' + alpha, '').replace('a', '');
	                var newColor = _C2.default.shadeColor(-0.2, currentColor);
	                return 'rgba(' + newColor.split('(')[1].split(')')[0] + ',' + alpha.trim() + ')';
	            } else return _C2.default.shadeColor(-0.2, color);
	        }
	
	        /**
	         * set style: consist of layer, source and obj
	         * @obj   {ol.layer || ol.source || ol.Feature}
	         * @style {function || ol.style} style function || ol.style
	         */
	
	    }, {
	        key: 'setStyle',
	        value: function setStyle(options) {
	            if (_C2.default.isEmpty(options) || _C2.default.isEmpty(options.obj) || _C2.default.isEmpty(options.style)) return;
	            //create style for obj
	            if (_C2.default.isFunction(options.style) || options.style instanceof ol.style.Style) {
	                options.obj.setStyle(options.style);
	            } else {
	                var DEFAULT_SRC = 'http://s21.postimg.org/blklb8scn/marker_icon.png';
	                var DEFAULT_SCALE = 1;
	
	                var strokeColor = options.style.strokeColor ? options.style.strokeColor : '#319FD3',
	                    strokeWidth = options.style.strokeWidth ? options.style.strokeColor : 1,
	                    fillColor = options.style.fillColor ? options.style.fillColor : 'rgba(255, 255, 255, 0.2)',
	                    imgSrc = options.style.type == 'marker' || options.style.type == 'c9-marker' ? options.style.imgSrc || DEFAULT_SRC : null,
	                    scale = options.style.type == 'marker' || options.style.type == 'c9-marker' ? options.style.scale || DEFAULT_SCALE : null;
	
	                var style;
	
	                if (imgSrc != null) options.obj.setStyle(style = new ol.style.Style({
	                    image: new ol.style.Icon({
	                        anchor: [0.5, 1], //middle-width and bottom-height of image
	                        src: imgSrc,
	                        scale: scale
	                    })
	                }));else options.obj.setStyle(style = new ol.style.Style({
	                    stroke: new ol.style.Stroke({
	                        color: strokeColor,
	                        width: strokeWidth
	                    }),
	                    fill: new ol.style.Fill({
	                        color: fillColor
	                    })
	                }));
	
	                options.obj.set('c9-style', style);
	            }
	        }
	
	        // TODO - set hover style
	
	        /**
	         * create a layer from geojson file
	         * @url  {String} url of geojson file
	         */
	
	    }, {
	        key: 'createLayerFromGeojson',
	        value: function createLayerFromGeojson(options) {
	            var self = this;
	            if (_C2.default.isEmpty(options) || _C2.default.isEmpty(options.url)) return;
	
	            self.createLayer({
	                type: "Image",
	                source: {
	                    name: "ImageVector",
	                    source: {
	                        name: 'Vector',
	                        url: options.url,
	                        format: 'GeoJSON'
	                    }
	                },
	                data: options.data,
	                style: options.style
	            });
	            //create style
	            // self.setStyle({obj: layer.getSource(), style: options.style});
	
	            // if (!Helper.isEmpty(options.style)) {
	            //     if (Helper.isFunction(style) || style instanceof ol.style.Style) {
	            //         layer.getSource().setStyle(options.style);
	            //     }
	            //     else {
	            //         var strokeColor = options.style.strokeColor ? options.style.strokeColor : '#319FD3',
	            //             strokeWidth = options.style.strokeWidth ? options.style.strokeColor : 1,
	            //             fillColor   = options.style.fillColor   ? options.style.fillColor   : 'rgba(255, 255, 255, 0.2)';
	
	            //         layer.getSource().setStyle(new ol.style.Style({
	            //             stroke: new ol.style.Stroke({
	            //                 color: strokeColor,
	            //                 width: strokeWidth
	            //             }),
	            //             fill: new ol.style.Fill({
	            //                 color: fillColor
	            //             })
	            //         }))
	            //     }
	            // }
	        }
	    }, {
	        key: 'updateGeojsonData',
	        value: function updateGeojsonData(options) {
	            if (_C2.default.isEmpty(options)) return;
	
	            var self = this,
	                objs = this.getObjects().filter(function (o) {
	                return o.get('type') == 'c9-geojson';
	            }),
	                layer;
	
	            if (_C2.default.isArray(options.layerIndex)) {
	                layer = [];
	                options.layerIndex.forEach(function (i) {
	                    layer.push(self.c9GeojsonObjsLayers[i]);
	                });
	            } else {
	                layer = options.layerIndex ? options.layerIndex > self.c9GeojsonObjsLayers.length - 1 ? self.c9GeojsonObjsLayers[self.c9GeojsonObjsLayers.length - 1] : self.c9GeojsonObjsLayers[options.layerIndex] : self.c9GeojsonObjsLayers[self.c9GeojsonObjsLayers.length - 1];
	            }
	
	            var setStyle = function setStyle(layers) {
	                var sf = function sf(layer) {
	                    try {
	                        self.setStyle({ obj: layer.getSource(), style: options.style });
	                    } catch (err) {
	                        try {
	                            self.setStyle({ obj: layer.getSource().getSource(), style: options.style });
	                        } catch (err) {
	                            try {
	                                self.setStyle({ obj: layer, style: options.style });
	                            } catch (err) {
	                                throw 'Cannot set style for this source';
	                            }
	                        }
	                    }
	                };
	                if (!_C2.default.isEmpty(options.style)) {
	                    if (_C2.default.isArray(layers)) layers.forEach(function (l) {
	                        sf(l);
	                    });else sf(layers);
	                }
	            };
	
	            //read data from url
	            if (!_C2.default.isEmpty(options.data) && _C2.default.isFunction(options.data.condition) && !_C2.default.isEmpty(options.data.file) && !_C2.default.isEmpty(options.data.file.url) && !_C2.default.isEmpty(options.data.file.type)) {
	                var da = new _C6.default(options.data);
	                da.getDataTarget('', function (data) {
	                    var condition = options.data.condition;
	                    var process = options.data.process;
	
	                    if (!_C2.default.isEmpty(process) && _C2.default.isFunction(process)) data = process(data);
	
	                    objs.forEach(function (o) {
	                        if (_C2.default.isArray(data)) {
	                            for (var i = 0; i < data.length; i++) {
	                                if (condition(o, data[i])) {
	                                    for (var j in data[i]) {
	                                        o.get('data')[j] = data[i][j];
	                                    }
	                                    break;
	                                }
	                            }
	                        } else if (condition(o, data)) {
	                            for (var i in data) {
	                                o.get('data')[i] = data[i];
	                            }
	                        }
	                    });
	                    setStyle(layer);
	                });
	            } else setStyle(layer);
	        }
	    }, {
	        key: 'dataSource',
	        get: function get() {
	            return this._dataSource;
	        },
	
	        /*=====  End of Getter  ======*/
	
	        /*==============================
	        =            Setter            =
	        ==============================*/
	
	        // set id(newId) {
	        //     if (newId) {
	        //         this._options.id = newId;
	        //     }
	        // }
	
	        // set height(newHeight) {
	        //     if (newHeight) {
	        //         this._height = newHeight;    
	        //     }
	        // }
	
	        // set width(newWidth) {
	        //     if (newWidth) {
	        //         this._width = newWidth;
	        //     }
	        // }
	
	        // set view(newView) {
	        //     if (newView) {
	        //         this._view = newView;
	        //     }
	        // }
	
	        // set markers(newMarkers) {
	        //     if (newMarkers) {
	        //         this._markers = newMarkers;
	        //     }
	        // }
	
	        // set layers(newLayers) {
	        //     if (newLayers) {
	        //         this._layers = newLayers;
	        //     }
	        // }
	
	        set: function set(newData) {
	            if (newData) {
	                this._dataSource = newData;
	            }
	        }
	    }, {
	        key: 'data',
	        get: function get() {
	            return this._data;
	        },
	        set: function set(newData) {
	            if (newData) {
	                this._data = newData;
	            }
	        }
	    }, {
	        key: 'options',
	        get: function get() {
	            return this._options;
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