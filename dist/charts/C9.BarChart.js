'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require('./C9.Chart');

var _C2 = _interopRequireDefault(_C);

var _C3 = require('./utils/C9.Axis');

var _C4 = _interopRequireDefault(_C3);

var _C5 = require('./utils/C9.Title');

var _C6 = _interopRequireDefault(_C5);

var _C7 = require('./utils/C9.Legend');

var _C8 = _interopRequireDefault(_C7);

var _C9 = require('./utils/C9.Tooltip');

var _C10 = _interopRequireDefault(_C9);

var _C11 = require('../helper/C9.Helper');

var _C12 = _interopRequireDefault(_C11);

var _C13 = require('../helper/C9.DataAdapter');

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