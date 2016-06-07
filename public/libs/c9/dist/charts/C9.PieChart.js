'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChart = function (_Chart) {
    _inherits(PieChart, _Chart);

    function PieChart(options) {
        _classCallCheck(this, PieChart);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PieChart).call(this, options));

        var self = _this;
        var config = {
            radius: 200
        };

        self._radius = options.radius || config.radius;

        self.initPieChartConfig();
        return _this;
    }

    /*==============================
    =            Getter            =
    ==============================*/

    _createClass(PieChart, [{
        key: 'initPieChartConfig',


        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/

        /**
         * [First init Pie Chart]
         * @return {[type]} [description]
         */
        value: function initPieChartConfig() {
            var width = this.width - this.margin.left - this.margin.right;
            var height = this.height - this.margin.top - this.margin.bottom;

            var _data = this.data;
            var __radius = this.radius;

            var pie = d3.layout.pie().value(function (d) {
                return d.value;
            });
            // declare an arc generator function
            var arc = d3.svg.arc().outerRadius(this.radius);
            // Random color
            var color = this.colorRange;

            // select paths, use arc generator to draw
            var arcs = this.svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('g.slice').data(pie(this.data)).enter().append('g').attr('class', 'slice');

            arcs.append('path').attr('d', arc).attr('fill', function (d, i) {
                return color(i);
            });

            arcs.append("text").attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = __radius;

                return "translate(" + arc.centroid(d) + ")";
            }).attr("text-anchor", "middle").text(function (d, i) {
                return d.data.name;
            });
        }

        /**
         * [Main draw function of Pie Chart]
         * @return {[type]} [description]
         */

    }, {
        key: 'draw',
        value: function draw() {

            var title = new Title(this.options, this.svg, this.width, this.height, this.margin);
        }

        /*=====  End of Main Functions  ======*/

    }, {
        key: 'radius',
        get: function get() {
            return this._radius;
        }

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/

        ,
        set: function set(newRadius) {
            if (newRadius) {
                this._radius = newRadius;
            }
        }
    }]);

    return PieChart;
}(Chart);