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
            width: 750,
            height: 500,
            margin: {
                top: 100,
                left: 50,
                right: 50,
                bottom: 50
            },

            // interaction in chart
            hover: {
                enable: true,
                options: {
                    template: '',
                    onMouseOver: {
                        fadeIn: 200,
                        callback: function callback(data) {
                            // console.dir(data);
                        }
                    },
                    onMouseOut: {
                        fadeOut: 500,
                        callback: function callback(data) {
                            // console.dir(data);
                        }
                    },
                    onMouseMove: {
                        callback: function callback(data) {
                            // console.dir(data);
                        }
                    }
                }
            },

            click: {
                callback: function callback(data) {
                    // console.dir(data);
                }
            },

            // title
            title: {
                show: true,
                text: "Sample Chart",
                position: 'top',
                fontSize: "14px"
            },

            // legend
            legend: {
                show: true,
                position: "top",
                size: 10,
                fontSize: "12px",
                fontColor: "#999",
                fontWeight: 'bold',
                margin: [5, 5, 5, 5],
                space: 10
            },

            // tooltip
            tooltip: {
                show: true,
                position: 'right', // [top, right, bottom, left]
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                fontColor: '#fff',
                fontSize: '11px',
                format: null
            },

            // table 
            table: {
                container: "body",
                show: false,
                headings: ["Name", "Value"],
                style: "stripe", // "strip", "border"
                serial: true,
                hover: {
                    enable: true,
                    callback: null
                },
                click: {
                    enable: true,
                    callback: null
                }
            },

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
                    value: "value",
                    time: "time"
                },
                groups: [],
                stacks: []
            },

            axis: {
                x: {
                    tick: {
                        rotate: 0,
                        count: 10,
                        size: 6,
                        padding: 3,
                        format: undefined,
                        values: [],
                        //the following use for timeline chart
                        type: d3.time.hours,
                        interval: 1
                    },
                    label: {
                        text: "Name",
                        position: "default"
                    },
                    show: true,
                    grid: false,
                    type: ""
                },
                y: {
                    tick: {
                        rotate: 0,
                        count: 10,
                        size: 6,
                        padding: 3,
                        format: undefined,
                        values: []
                    },
                    label: {
                        text: "Value",
                        position: "default"
                    },
                    show: true,
                    grid: true,
                    type: ""
                }
            },

            // sub-chart
            subchart: {
                show: false,
                height: 100
            }
        };

        self._options = options;

        self.initConfig(config);
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
         * Init parent config
         * Only in BaseClass <Chart> to init config
         */
        value: function initConfig(config) {
            var self = this;

            self.options = _C2.default.mergeDeep(config, self.options);

            var options = self.options;

            self.id = options.id || config.id;
            self.width = options.width || config.width;
            self.height = options.height || config.height;
            self.colorRange = options.colorRange || config.colorRange;

            self.margin = _C2.default.merge(options.margin, config.margin);
            self.hover = _C2.default.merge(options.hover, config.hover);
            self.click = _C2.default.merge(options.click, config.click);

            self.dataOption = _C2.default.mergeDeep(config.data, options.data);

            self.options.subchart = _C2.default.merge(options.subchart, config.subchart);
            self.options.table = _C2.default.merge(options.table, config.table);
            self.options.tooltip = _C2.default.merge(options.tooltip, config.tooltip);
            self.options.legend = _C2.default.merge(options.legend, config.legend);
            self.options.axis = _C2.default.mergeDeep(config.axis, options.axis);
        }

        /**
         * Update parent config
         */

    }, {
        key: 'updateConfig',
        value: function updateConfig(config) {
            var self = this;

            self.options = _C2.default.mergeDeep(config, self.options);

            var options = self.options;

            self.id = options.id || config.id;
            self.width = options.width || config.width;
            self.height = options.height || config.height;
            self.colorRange = options.colorRange || config.colorRange;

            self.margin = _C2.default.merge(options.margin, config.margin);
            self.hover = _C2.default.merge(options.hover, config.hover);
            self.click = _C2.default.merge(options.click, config.click);

            self.dataOption = _C2.default.mergeDeep(config.data, options.data);

            self.options.subchart = _C2.default.merge(options.subchart, config.subchart);
            self.options.table = _C2.default.merge(options.table, config.table);
            self.options.tooltip = _C2.default.merge(options.tooltip, config.tooltip);
            self.options.legend = _C2.default.merge(options.legend, config.legend);
            self.options.axis = _C2.default.mergeDeep(config.axis, options.axis);
        }

        /**
         * Draw or Re-draw Base Chart
         */

    }, {
        key: 'draw',
        value: function draw() {
            var self = this;

            var margin = self.margin,
                id = self.id,
                width = self.width - margin.left - margin.right,
                height = self.height - margin.top - margin.bottom;

            self.container = d3.select(id);

            // Remove existing chart at current container
            self.container.selectAll(".c9-svg").data([]).exit().remove();

            self.svg = d3.select(id).style('position', 'relative').append("svg").attr('class', 'c9-svg').attr("width", self.width).attr("height", self.height).style('overflow', 'visible'); // to overwrite overflow: hidden by Boostrap as default


            self.svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", width).attr("height", height);

            self.body = self.svg.append("g").attr('class', 'c9-chart c9-custom-container').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        /**
         * Get lightening color to create effect when interacting
         * @param  {[type]} color [description]
         */

    }, {
        key: 'getLightenColor',
        value: function getLightenColor(color) {
            return _C2.default.shadeColor(0.5, color);
        }

        /*=====  End of Main Functions  ======*/

        /*========================================
        =            User's Functions            =
        ========================================*/
        /**
         * Custom Event Listener
         * @param  {[type]}   eventType [description]
         * @param  {Function} callback  [description]
         */

    }, {
        key: 'on',
        value: function on(eventType, callback) {}

        /**
         * Set option via stand-alone function
         * @param {[type]} key   [description]
         * @param {[type]} value [description]
         */

    }, {
        key: 'setOption',
        value: function setOption(key, value) {
            var self = this;

            _C2.default.set(key, value, self.options);

            // Self-update on Base Chart to make sure that self.options consisting
            // of all new values
            self.updateConfig(self.options);
        }

        /**
         * Update chart based on new data with optional dataConfig
         * @param  {[type]} data       [description]
         * @param  {[type]} dataConfig [description]
         */

    }, {
        key: 'updateData',
        value: function updateData(data, dataConfig) {}
        /*=====  End of User's Functions  ======*/

    }, {
        key: 'container',
        get: function get() {
            return this._container;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(arg) {
            if (arg) {
                this._container = arg;
            }
        }
    }, {
        key: 'id',
        get: function get() {
            if (this._id !== 'body') {
                return '#' + this._id;
            }
            return this._id;
        },
        set: function set(arg) {
            if (arg) {
                this._id = arg;
            }
        }
    }, {
        key: 'width',
        get: function get() {
            return this._width;
        },
        set: function set(arg) {
            if (arg) {
                this._width = arg;
            }
        }
    }, {
        key: 'height',
        get: function get() {
            return this._height;
        },
        set: function set(arg) {
            if (arg) {
                this._height = arg;
            }
        }
    }, {
        key: 'actualWidth',
        get: function get() {
            return this._actualWidth;
        },
        set: function set(arg) {
            if (arg) {
                this._actualWidth = arg;
            }
        }
    }, {
        key: 'actualHeight',
        get: function get() {
            return this._actualHeight;
        }

        /**
         * If colorRange is Array of color then scale range according to it
         * If colorRange is a String like "category20", "category20b", etc. then scale using d3.scale.category
         */
        ,
        set: function set(arg) {
            if (arg) {
                this._actualHeight = arg;
            }
        }
    }, {
        key: 'colorRange',
        get: function get() {
            var color = this._colorRange;

            if (typeof color == 'string') {
                try {
                    return d3.scale[color]();
                } catch (err) {
                    return function (i) {
                        return color;
                    };
                }
            } else if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) == 'object') {
                return d3.scale.ordinal().range(color);
            }
        },
        set: function set(arg) {
            if (arg) {
                this._colorRange = arg;
            }
        }
    }, {
        key: 'margin',
        get: function get() {
            return this._margin;
        },
        set: function set(arg) {
            if (arg) {
                this._margin = arg;
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
        set: function set(arg) {
            if (arg) {
                this._svg = arg;
            }
        }
    }, {
        key: 'body',
        get: function get() {
            return this._body;
        },
        set: function set(arg) {
            if (arg) {
                this._body = arg;
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
    }, {
        key: 'hover',
        get: function get() {
            return this._hover;
        },
        set: function set(arg) {
            if (arg) {
                this._hover = arg;
            }
        }
    }, {
        key: 'click',
        get: function get() {
            return this._click;
        },
        set: function set(arg) {
            if (arg) {
                this._click = arg;
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
    }, {
        key: 'dataSource',
        get: function get() {
            return this._dataSource;
        },
        set: function set(arg) {
            if (arg) {
                this._dataSource = arg;
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
        key: 'x',
        get: function get() {
            return this._x;
        },
        set: function set(arg) {
            if (arg) {
                this._x = arg;
            }
        }
    }, {
        key: 'y',
        get: function get() {
            return this._y;
        },
        set: function set(arg) {
            if (arg) {
                this._y = arg;
            }
        }
    }, {
        key: 'chartType',
        get: function get() {
            return this._chartType;
        },
        set: function set(arg) {
            if (arg) {
                this._chartType = arg;
            }
        }
    }, {
        key: 'title',
        get: function get() {
            return this._title;
        },
        set: function set(arg) {
            if (arg) {
                this._title = arg;
            }
        }
    }, {
        key: 'axis',
        get: function get() {
            return this._axis;
        },
        set: function set(arg) {
            if (arg) {
                this._axis = arg;
            }
        }
    }, {
        key: 'legend',
        get: function get() {
            return this._legend;
        },
        set: function set(arg) {
            if (arg) {
                this._legend = arg;
            }
        }
    }, {
        key: 'table',
        get: function get() {
            return this._table;
        },
        set: function set(arg) {
            if (arg) {
                this._table = arg;
            }
        }
    }, {
        key: 'tooltip',
        get: function get() {
            return this._tooltip;
        },
        set: function set(arg) {
            if (arg) {
                this._tooltip = arg;
            }
        }
    }]);

    return Chart;
}();

exports.default = Chart;