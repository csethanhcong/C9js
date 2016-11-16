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