export default class Chart {
    constructor(options) {
        var self    = this;
        var config  = {
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
            // interaction in chart
            hover: {
                enable: true,
                options: {
                    template: '',
                    onMouseOver: {
                        fadeIn: 200,
                        // callback: function(data) {
                        //     console.dir(data);
                        // },
                    },
                    onMouseOut: {
                        fadeOut: 500,
                        // callback: function(data) {
                        //     console.dir(data);
                        // },
                    }
                }
            },

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

        self._id        = options.id        || config.id;
        self._width     = options.width     || config.width;
        self._data      = options.data      || config.data;
        self._height    = options.height    || config.height;
        self._colorRange= options.color_range|| config.color_range;
        self._margin    = self.extend(options.margin, config.margin);

        // Skeleton: 
        // SVG
        // ---BODY (g)
        // -------BlaBla
        self._svg       = null;
        self._body      = null;
        self._options   = options;
        self._hover     = options.hover     || config.hover;

        self.initConfig();
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

    get colorRange() {
        if (typeof this._colorRange == 'string') {
            return d3.scale[this._colorRange]();
        } else if (typeof this._colorRange == 'object') {
            return d3.scale.ordinal().range(this._colorRange);
        }
    }

    get margin() {
        return this._margin;
    }

    get data() {
        return this._data;
    }

    get svg() {
        return this._svg;
    }

    get body() {
        return this._body;
    }

    get options() {
        return this._options;
    }

    get hover() {
        return this._hover;
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

    set colorRange(newColorRange) {
        if (newColorRange) {
            this._colorRange = newColorRange;
        }
    }

    set margin(newMargin) {
        if (newMargin) {
            this._margin = newMargin;
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

    set body(newBody) {
        if (newBody) {
            this._body = newBody;
        }
    }

    set options(newOptions) {
        if (newOptions) {
            this._options = newOptions;
        }
    }

    set hover(newHover) {
        if (newHover) {
            this._hover = newHover;
        }
    }
    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /**
     * [First init config in parent Chart]
     * @param  {[type]} self [description]
     * @return {[type]}      [description]
     */
    initConfig() {
        var margin  = this.margin,
            id      = this.id,
            width   = this.width - margin.left - margin.right,
            height  = this.height - margin.top - margin.bottom;

        this.svg = d3.select(id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        this.body = this.svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    
    /**
     * Overwrites obj2's values with obj1's and adds obj1's if non existent in obj2
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    extend(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        return obj3;
    }

    /*=====  End of Main Functions  ======*/

}
