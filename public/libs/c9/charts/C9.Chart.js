'use strict';

class Chart {
    constructor(options) {
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
                left: 40,
            },
            padding: {
                top: 20,
                right: 20,
                bottom: 70,
                left: 40,
            },
            // interaction in chart
            enable_interaction: true,
            // mouse events
            on_mouse_over: function() {},
            on_mouse_out: function() {},
            on_mouse_click: function() {},
            // legend
            legend_show: true,
            legend_position: "bottom",
            legend_inset_anchor: "top-left",
            legend_padding: 0,

            // grid
            grid_x_show: false,
            grid_y_show: false,
            // tooltip - show when mouseover on each data
            tooltip_show: true,
            tooltip_position: undefined,
            // title
            title_show: true,
            title_text: undefined,
            title_padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            title_position: 'top-center',

            // data
            data: [{
                name: "A",
                value: ".08167"
            }, {
                name: "C",
                value: ".02536"
            }, {
                name: "D",
                value: ".02157"
            }, {
                name: "E",
                value: ".06954"
            }, {
                name: "B",
                value: ".01492"
            }]
        };

        this._id        = options.id        || config.id;
        this._width     = options.width     || config.width;
        this._height    = options.height    || config.height;
        this._margin    = options.margin    || config.margin;
        this._padding   = options.padding   || config.padding;
        this._data      = options.data      || config.data;
        this._svg       = null;
        this._x         = null;
        this._y         = null;

        var margin = this._margin,
            id = this._id,
            width = this._width - margin.left - margin.right,
            height = this._height - margin.top - margin.bottom;

        this._svg = d3.select(id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get id() {
        return this._id;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get margin() {
        return this._margin;
    }

    get padding() {
        return this._padding;
    }

    get data() {
        return this._data;
    }

    get svg() {
        return this._svg;
    }

    get x() {
        return this._x;
    }
    
    get y() {
        return this._y;
    }
    /*=====  End of Getter  ======*/
    
    
    /*==============================
    =            Setter            =
    ==============================*/
    
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }

    set width(newWidth) {
        if (newWidth) {
            this._width = newWidth;
        }
    }

    set height(newHeight) {
        if (newHeight) {
            this._height = newHeight;
        }
    }

    set margin(newMargin) {
        if (newMargin) {
            this._margin = newMargin;
        }
    }

    set padding(newPadding) {
        if (newPadding) {
            this._padding = newPadding;
        }
    }

    set data(newData) {
        if (newData) {
            this._data = newData;
        }
    }

    set svg(newSvg) {
        if (newSvg) {
            this._svg = newSvg;
        }
    }

    set x(newX) {
        if (newX) {
            this._x = newX;
        }
    }
    
    set y(newY) {
        if (newY) {
            this._y = newY;
        }
    }
    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    /*=====  End of Main Functions  ======*/

    
}
