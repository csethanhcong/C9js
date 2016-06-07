'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            enable_interaction: true,
            // mouse events
            on_mouse_over: function on_mouse_over() {},
            on_mouse_out: function on_mouse_out() {},
            on_mouse_click: function on_mouse_click() {},
            // legend
            legend_show: true,
            legend_position: "bottom",
            legend_inset_anchor: "top-left",
            legend_padding: 0,
            // tooltip - show when mouseover on each data
            tooltip_show: true,
            tooltip_position: undefined,
            // color range
            color_range: "category20",
            // data
            data: []
        };

        self._id = options.id || config.id;
        self._width = options.width || config.width;
        self._data = options.data || config.data;
        self._height = options.height || config.height;
        self._colorRange = options.color_range || config.color_range;
        self._margin = self.extend(options.margin, config.margin);
        self._svg = null;
        self._options = options;

        self.initConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/

    _createClass(Chart, [{
        key: "initConfig",

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        /**
         * [First init config in parent Chart]
         * @param  {[type]} self [description]
         * @return {[type]}      [description]
         */
        value: function initConfig() {
            var margin = this.margin,
                id = this.id,
                width = this.width - margin.left - margin.right,
                height = this.height - margin.top - margin.bottom;

            this.svg = d3.select(id).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        /**
         * Overwrites obj2's values with obj1's and adds obj1's if non existent in obj2
         * @param obj1
         * @param obj2
         * @returns obj3 a new object based on obj1 and obj2
         */

    }, {
        key: "extend",
        value: function extend(obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj2) {
                obj3[attrname] = obj2[attrname];
            }
            for (var attrname in obj1) {
                obj3[attrname] = obj1[attrname];
            }
            return obj3;
        }

        /*=====  End of Main Functions  ======*/

    }, {
        key: "id",
        get: function get() {
            return this._id;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/

        set: function set(newId) {
            if (newId) {
                this._id = newId;
            }
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(newWidth) {
            if (newWidth) {
                this._width = newWidth;
            }
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(newHeight) {
            if (newHeight) {
                this._height = newHeight;
            }
        }
    }, {
        key: "colorRange",
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
        key: "margin",
        get: function get() {
            return this._margin;
        },
        set: function set(newMargin) {
            if (newMargin) {
                this._margin = newMargin;
            }
        }
    }, {
        key: "data",
        get: function get() {
            return this._data;
        },
        set: function set(newData) {
            if (newData) {
                this._data = newData;
            }
        }
    }, {
        key: "svg",
        get: function get() {
            return this._svg;
        },
        set: function set(newSvg) {
            if (newSvg) {
                this._svg = newSvg;
            }
        }
    }, {
        key: "options",
        get: function get() {
            return this._options;
        },
        set: function set(newOptions) {
            if (newOptions) {
                this._options = newOptions;
            }
        }
    }]);

    return Chart;
}();