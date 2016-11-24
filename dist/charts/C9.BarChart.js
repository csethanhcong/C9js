'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _C = require('./C9.Chart');

var _C2 = _interopRequireDefault(_C);

var _C3 = require('./utils/C9.Axis');

var _C4 = _interopRequireDefault(_C3);

var _C5 = require('./utils/C9.Title');

var _C6 = _interopRequireDefault(_C5);

var _C7 = require('./utils/C9.Legend');

var _C8 = _interopRequireDefault(_C7);

var _C9 = require('./utils/C9.Table');

var _C10 = _interopRequireDefault(_C9);

var _C11 = require('./utils/C9.Tooltip');

var _C12 = _interopRequireDefault(_C11);

var _C13 = require('../helper/C9.Helper');

var _C14 = _interopRequireDefault(_C13);

var _C15 = require('../helper/C9.DataAdapter');

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