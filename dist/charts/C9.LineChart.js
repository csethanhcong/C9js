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