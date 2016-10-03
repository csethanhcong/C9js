'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require('../helper/C9.Helper');

var _C2 = _interopRequireDefault(_C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chart = function () {
    function Chart(options) {
        _classCallCheck(this, Chart);

        var self = this;
        var config = {
            // container
            id: "body",
            // size (width, height), margin, padding
            width: 960,
            height: 480,
            margin: {
                top: 20,
                right: 20,
                bottom: 70,
                left: 40
            },
            // interaction in chart
            hover: {
                enable: true,
                options: {
                    template: '',
                    onMouseOver: {
                        fadeIn: 200
                    },
                    onMouseOut: {
                        fadeOut: 500
                    }
                }
            },

            // legend
            legendShow: true,
            legendPosition: "bottom",
            legendInsetAnchor: "top-left",
            legendPadding: 0,
            // tooltip - show when mouseover on each data
            tooltipShow: true,
            tooltipPosition: undefined,
            // color range
            colorRange: "category20",
            // data
            data: {
                // ALL OPTIONS AVAILABLE IN DATA CONFIG
                plain: [],
                file: {
                    type: null,
                    url: null
                },
                keys: {
                    name: "name",
                    value: "value"
                },
                groups: [],
                stacks: []
            }
        };

        self._id = options.id || config.id;
        self._width = options.width || config.width;
        self._height = options.height || config.height;
        self._colorRange = options.colorRange || config.colorRange;
        self._hover = options.hover || config.hover;

        self._dataOption = _C2.default.merge(options.data, config.data);
        self._dataTarget = null;
        self._margin = _C2.default.merge(options.margin, config.margin);

        // Skeleton: 
        // SVG
        // ---BODY (g)
        // -------BlaBla
        self._svg = null;
        self._body = null;
        self._options = options;

        self.initConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/


    _createClass(Chart, [{
        key: 'initConfig',

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        /**
         * Init & Update Parent Chart Config
         */
        value: function initConfig() {
            var margin = this.margin,
                id = this.id,
                width = this.width - margin.left - margin.right,
                height = this.height - margin.top - margin.bottom;

            this.container = d3.select(id);

            this.svg = d3.select(id).append("svg").style('overflow', 'visible') // to overwrite overflow: hidden by Boostrap as default
            .attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);

            this.body = this.svg.append("g").attr('class', 'c9-chart c9-custom-container').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        /*=====  End of Main Functions  ======*/

    }, {
        key: 'container',
        get: function get() {
            return this._container;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(newContainer) {
            if (newContainer) {
                this._container = newContainer;
            }
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        },
        set: function set(newId) {
            if (newId) {
                this._id = newId;
            }
        }
    }, {
        key: 'width',
        get: function get() {
            return this._width;
        },
        set: function set(newWidth) {
            if (newWidth) {
                this._width = newWidth;
            }
        }
    }, {
        key: 'height',
        get: function get() {
            return this._height;
        }

        /**
         * If colorRange is Array of color then scale range according to it
         * If colorRange is a String like "category20", "category20b", etc. then scale using d3.scale.category
         */
        ,
        set: function set(newHeight) {
            if (newHeight) {
                this._height = newHeight;
            }
        }
    }, {
        key: 'colorRange',
        get: function get() {
            if (typeof this._colorRange == 'string') {
                return d3.scale[this._colorRange]();
            } else if (_typeof(this._colorRange) == 'object') {
                return d3.scale.ordinal().range(this._colorRange);
            }
        },
        set: function set(newColorRange) {
            if (newColorRange) {
                this._colorRange = newColorRange;
            }
        }
    }, {
        key: 'margin',
        get: function get() {
            return this._margin;
        },
        set: function set(newMargin) {
            if (newMargin) {
                this._margin = newMargin;
            }
        }
    }, {
        key: 'dataOption',
        get: function get() {
            return this._dataOption;
        },
        set: function set(arg) {
            if (arg) {
                this._dataOption = arg;
            }
        }
    }, {
        key: 'svg',
        get: function get() {
            return this._svg;
        },
        set: function set(newSvg) {
            if (newSvg) {
                this._svg = newSvg;
            }
        }
    }, {
        key: 'body',
        get: function get() {
            return this._body;
        },
        set: function set(newBody) {
            if (newBody) {
                this._body = newBody;
            }
        }
    }, {
        key: 'options',
        get: function get() {
            return this._options;
        },
        set: function set(newOptions) {
            if (newOptions) {
                this._options = newOptions;
            }
        }
    }, {
        key: 'hover',
        get: function get() {
            return this._hover;
        },
        set: function set(newHover) {
            if (newHover) {
                this._hover = newHover;
            }
        }
    }, {
        key: 'dataTarget',
        get: function get() {
            return this._dataTarget;
        },
        set: function set(arg) {
            if (arg) {
                this._dataTarget = arg;
            }
        }
    }]);

    return Chart;
}();

exports.default = Chart;