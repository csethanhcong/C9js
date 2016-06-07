'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DonutChart = function (_Chart) {
    _inherits(DonutChart, _Chart);

    function DonutChart(options) {
        _classCallCheck(this, DonutChart);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DonutChart).call(this, options));

        var self = _this;
        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
        var config = {
            outer_radius: R,
            inner_radius: R > 80 ? R - 80 : R - 40
        };

        self._outerRadius = options.outer_radius || config.outer_radius;
        self._innerRadius = options.inner_radius || config.inner_radius;

        self.initDonutChartConfig();
        return _this;
    }

    /*==============================
    =            Getter            =
    ==============================*/


    _createClass(DonutChart, [{
        key: 'initDonutChartConfig',

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/

        value: function initDonutChartConfig() {
            var width = this.width - this.margin.left - this.margin.right;
            var height = this.height - this.margin.top - this.margin.bottom;
            var color = this.colorRange;

            var arc = d3.svg.arc().outerRadius(this.outerRadius).innerRadius(this.innerRadius);

            //we can sort data here
            var pie = d3.layout.pie().value(function (d) {
                return d.value;
            });

            //draw chart
            var arcs = this.svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll('g.arc').data(pie(this.data)).enter().append('g').attr('class', 'arc');

            arcs.append('path').attr('d', arc).style('fill', function (d, i) {
                return color(i);
            });

            arcs.append('text').attr('transform', function (d) {
                return "translate(" + arc.centroid(d) + ")";
            }).attr('dy', '.35em').text(function (d) {
                return d.data.name;
            });
        }
    }, {
        key: 'draw',
        value: function draw() {

            var title = new Title(this.options, this.svg, this.width, this.height, this.margin);
        }

        /*=====  End of Main Functions  ======*/

    }, {
        key: 'outerRadius',
        get: function get() {
            return this._outerRadius;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(newOuterRadius) {
            if (newOuterRadius) {
                this._outerRadius = newOuterRadius;
            }
        }
    }, {
        key: 'innerRadius',
        get: function get() {
            return this._innerRadius;
        },
        set: function set(newInnerRadius) {
            if (newInnerRadius) {
                this._innerRadius = newInnerRadius;
            }
        }
    }]);

    return DonutChart;
}(Chart);