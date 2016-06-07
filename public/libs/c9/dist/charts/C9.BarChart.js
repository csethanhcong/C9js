'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = function (_Chart) {
    _inherits(BarChart, _Chart);

    function BarChart(options) {
        _classCallCheck(this, BarChart);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BarChart).call(this, options));

        var self = _this;
        var config = {
            bar_width: undefined,
            bar_color: "steelblue"
        };

        var width = self.width - self.margin.left - self.margin.right;
        var height = self.height - self.margin.top - self.margin.bottom;

        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height, 0]);

        x.domain(self.data.map(function (d) {
            return d.name;
        }));

        y.domain([0, d3.max(self.data, function (d) {
            return d.value;
        })]);

        // Make flexible width according to bar_width
        config.bar_width = x.rangeBand();
        self._barWidth = options.bar_width || config.bar_width;
        self._barColor = options.bar_color || config.bar_color;

        self.initBarChartConfig(height, x, y);
        return _this;
    }

    /*==============================
    =            Getter            =
    ==============================*/

    _createClass(BarChart, [{
        key: "initBarChartConfig",

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        /**
         * [First init config Bar Chart]
         * @param  {[type]} height [Height of Bar Chart]
         * @param  {[type]} x      [x scale]
         * @param  {[type]} y      [y scale]
         * @return {[type]}        [description]
         */
        value: function initBarChartConfig(height, x, y) {
            this.svg.selectAll(".bar").data(this.data).enter().append("rect").attr("class", "bar").style("fill", this.barColor).attr("x", function (d) {
                return x(d.name);
            }).attr("y", function (d) {
                return y(d.value);
            }).attr("width", this.barWidth) //x.rangeBand()
            .attr("height", function (d) {
                return height - y(d.value);
            });
        }

        /**
         * [Main draw function of Bar Chart]
         * @return {[type]} [description]
         */

    }, {
        key: "draw",
        value: function draw() {

            var axis = new Axis(this.options, this.svg, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom, null, null);
            var title = new Title(this.options, this.svg, this.width, this.height, this.margin);
        }

        /*=====  End of Main Functions  ======*/

    }, {
        key: "barWidth",
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
        key: "barColor",
        get: function get() {
            return this._barColor;
        },
        set: function set(newBarColor) {
            if (newBarColor) {
                this._barColor = newBarColor;
            }
        }
    }]);

    return BarChart;
}(Chart);