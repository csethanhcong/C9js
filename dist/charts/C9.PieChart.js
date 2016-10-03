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

var _C9 = require('../helper/C9.DataAdapter');

var _C10 = _interopRequireDefault(_C9);

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
            // innerRadius: R > 80 ? R - 80 : R - 40,
            showText: true // show/hide text on middle or each pie
        };

        self._radius = options.radius || config.radius;
        // self._innerRadius    = options.innerRadius || config.innerRadius;
        self._showText = options.showText || config.showText;
        self.body.type = 'pie';

        var dataOption = self.dataOption;
        dataOption.colorRange = self.colorRange;

        var da = new _C10.default(dataOption);
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
        }

        // get innerRadius() {
        //     return this._innerRadius;
        // }

        ,

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(newradius) {
            if (newradius) {
                this._radius = newradius;
            }
        }

        // set innerRadius(newInnerRadius) {
        //     if (newInnerRadius) {
        //         this._innerRadius = newInnerRadius;
        //     }
        // }

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