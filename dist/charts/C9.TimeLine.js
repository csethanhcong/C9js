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