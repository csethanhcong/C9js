'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeLine = function (_Chart) {
    _inherits(TimeLine, _Chart);

    function TimeLine(options) {
        _classCallCheck(this, TimeLine);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimeLine).call(this, options));

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
        key: "initTimelineConfig",

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
        key: "draw",
        value: function draw() {
            this.options.starting = this.starting;
            this.options.ending = this.ending;
            var axis = new Axis(this.options, this.svg, this.data, this.width - this.margin.left - this.margin.right, (this.itemHeight + this.itemMargin) * this.maxStack, null, null);
            var title = new Title(this.options, this.svg, this.width, this.height, this.margin);
        }

        /*=====  End of Main Functions  ======*/

    }, {
        key: "stack",
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
        key: "backgroundColor",
        get: function get() {
            return this._backgroundColor;
        },
        set: function set(newBackgroundColor) {
            if (newBackgroundColor) {
                this.backgroundColor = newBackgroundColor;
            }
        }
    }, {
        key: "rowSeparator",
        get: function get() {
            return this._rowSeparator;
        },
        set: function set(newRowSeparator) {
            if (newRowSeparator) {
                this._rowSeparator = newRowSeparator;
            }
        }
    }, {
        key: "starting",
        get: function get() {
            return this._starting;
        },
        set: function set(newStarting) {
            if (newStarting) {
                this._starting = newStarting;
            }
        }
    }, {
        key: "ending",
        get: function get() {
            return this._ending;
        },
        set: function set(newEnding) {
            if (newEnding) {
                this._ending = newEnding;
            }
        }
    }, {
        key: "itemHeight",
        get: function get() {
            return this._itemHeight;
        },
        set: function set(newItemHeight) {
            if (newItemHeight) {
                this._itemHeight = newItemHeight;
            }
        }
    }, {
        key: "itemMargin",
        get: function get() {
            return this._itemMargin;
        },
        set: function set(newItemMargin) {
            if (newItemMargin) {
                this._itemMargin = newItemMargin;
            }
        }
    }, {
        key: "labelMargin",
        get: function get() {
            return this._labelMargin;
        },
        set: function set(newLabelMargin) {
            if (newLabelMargin) {
                this._labelMargin = newLabelMargin;
            }
        }
    }, {
        key: "maxStack",
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
}(Chart);