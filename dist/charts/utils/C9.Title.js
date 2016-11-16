'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require('../../helper/C9.Helper');

var _C2 = _interopRequireDefault(_C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Title = function () {
    function Title(options, chart) {
        _classCallCheck(this, Title);

        var self = this;

        var config = {
            show: true,
            text: "Sample Chart",
            position: 'top',
            fontSize: "14px"
        };

        self._options = options;
        self._chart = chart;

        self.updateConfig(config);
    }

    /*==============================
    =            Getter            =
    ==============================*/


    _createClass(Title, [{
        key: 'updateConfig',

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        value: function updateConfig(config) {
            var self = this;

            self.options = _C2.default.mergeDeep(config, self.options);
        }
    }, {
        key: 'draw',
        value: function draw() {
            var self = this;

            if (self.options.show) {
                var text = self.chart.svg.append("g").attr('class', 'c9-custom-title c9-custom-title-container').append("text").attr("class", "c9-custom-title c9-custom-title-text");

                // Get title self.chart.width: text.node().getComputedTextLength()           
                text.attr("x", (self.chart.width - text.node().getComputedTextLength()) / 2)
                // text.attr("x", (((self.chart.width - 200) / 2)))           
                .attr("y", self.setYLocation(self.chart.height, self.chart.margin)).attr("text-anchor", "middle").style("font-size", self.options.fontSize).text(self.options.text);
            }
        }
    }, {
        key: 'setYLocation',
        value: function setYLocation(height, margin) {
            var self = this;

            if (self.options.position === 'top') {
                return margin.top / 2;
            } else if (self.options.position === 'bottom') {
                return height - margin.bottom / 2;
            }
        }
        /*=====  End of Main Functions  ======*/

    }, {
        key: 'chart',
        get: function get() {
            return this._chart;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(arg) {
            if (arg) {
                this._chart = arg;
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

    return Title;
}();

exports.default = Title;