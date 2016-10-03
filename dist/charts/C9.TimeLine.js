'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require('./C9.Chart');

var _C2 = _interopRequireDefault(_C);

var _C3 = require('./utils/C9.Axis');

var _C4 = _interopRequireDefault(_C3);

var _C5 = require('./utils/C9.Title');

var _C6 = _interopRequireDefault(_C5);

var _C7 = require('./utils/C9.Legend');

var _C8 = _interopRequireDefault(_C7);

var _C9 = require('../helper/C9.Helper');

var _C10 = _interopRequireDefault(_C9);

var _C11 = require('../helper/C9.DataAdapter');

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