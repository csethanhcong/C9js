'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require('../../helper/C9.Helper');

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