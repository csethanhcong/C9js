import Helper from '../helper/C9.Helper';

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
                        callback: function(data) {
                            // console.dir(data);
                        },
                    },
                    onMouseOut: {
                        fadeOut: 500,
                        callback: function(data) {
                            // console.dir(data);
                        },
                    },
                    onMouseMove: {
                        callback: function(data) {
                            // console.dir(data);
                        },
                    }
                }
            },

            click: {
                callback: function(data) {
                    // console.dir(data);
                },
            },

            // legend
            legend: {
                show      : false,
                position  : "top",
                size      : 10,
                textSize  : "12px",
                margin    : [5, 5, 5, 5],
                space     : 10,
            },

            // tooltip
            tooltip: {
                show: true,
                position: 'left', // [top, right, bottom, left]
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                fontColor: '#fff',
                format: null
            },

            // table 
            table: {
                container: "body",
                show: false,
                headings: ["Name", "Value"],
                style: "default", // "strip", "border"
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
                    url: null,
                },
                keys: {
                    name: "name",
                    value: "value",
                    time: "time"
                },
                groups: [],
                stacks: [],
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
                    show: false,
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
                    show: false,
                    grid: false,
                    type: ""
                }
            },

            // sub-chart
            subchart: {
                show: false,
                height: 100,
            },
        };

        self._id        = options.id        || config.id;
        self._width     = options.width     || config.width;
        self._height    = options.height    || config.height;
        self._colorRange= options.colorRange|| config.colorRange;

        
        self._margin    = Helper.merge(options.margin, config.margin);
        self._hover     = Helper.merge(options.hover, config.hover);
        self._click     = Helper.merge(options.click, config.click);

        // Main factory contains all interactions
        self._eventFactory = null;
        
        self._dataOption= Helper.merge(options.data, config.data);
        self._dataTarget= null;

        // Skeleton: 
        // SVG
        // ---BODY (g)
        // -------BlaBla
        self._svg       = null;
        self._body      = null;
        self._options   = options;

        self._options.subchart  = Helper.merge(options.subchart, config.subchart);
        self._options.table     = Helper.merge(options.table, config.table);
        self._options.tooltip   = Helper.merge(options.tooltip, config.tooltip);
        self._options.legend    = Helper.merge(options.legend, config.legend);
        self._options.axis      = Helper.mergeDeep(config.axis, options.axis);

        self.initConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get container() {
        return this._container;
    }
    
    get id() {
        return this._id;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get actualWidth() {
        return this._actualWidth;
    }

    get actualHeight() {
        return this._actualHeight;
    }

    /**
     * If colorRange is Array of color then scale range according to it
     * If colorRange is a String like "category20", "category20b", etc. then scale using d3.scale.category
     */
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

    get dataOption() {
        return this._dataOption;
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

    get click() {
        return this._click;
    }

    get dataTarget() {
        return this._dataTarget;
    }

    get eventFactory() {
        return this._eventFactory;
    }
    /*=====  End of Getter  ======*/
    
    
    /*==============================
    =            Setter            =
    ==============================*/
    set container(newContainer) {
        if (newContainer) {
            this._container = newContainer;
        }
    }
    
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

    set actualWidth(arg) {
        if (arg) {
            this._actualWidth = arg;
        }
    }

    set actualHeight(arg) {
        if (arg) {
            this._actualHeight = arg;
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

    set dataOption(arg) {
        if (arg) {
            this._dataOption = arg;
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

    set click(arg) {
        if (arg) {
            this._click = arg;
        }
    }

    set dataTarget(arg) {
        if (arg) {
            this._dataTarget = arg;
        }
    }

    set eventFactory(arg) {
        if (arg) {
            this._eventFactory = arg;
        }
    }
    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /**
     * Init & Update Parent Chart Config
     */
    initConfig() {
        var margin  = this.margin,
            id      = this.id,
            width   = this.width - margin.left - margin.right,
            height  = this.height - margin.top - margin.bottom;

        this.container = d3.select(id);

        this.svg = d3.select(id)
            .append("svg")
            .style('overflow', 'visible') // to overwrite overflow: hidden by Boostrap as default
            .attr("width", this.width)
            .attr("height", this.height);


        this.svg.append("defs").append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", width)
            .attr("height", height);

        this.body = this.svg
                    .append("g")
                    .attr('class', 'c9-chart c9-custom-container')
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                  
    }

    /**
     * Custom Event Listener
     * @param  {[type]}   eventType [description]
     * @param  {Function} callback  [description]
     */
    on(eventType, callback) {

    }

    /**
     * Set option via stand-alone function
     * @param {[type]} key   [description]
     * @param {[type]} value [description]
     */
    setOption(key, value) {
        var self = this;

        Helper.set(key, value, self.options);
    }

    /*=====  End of Main Functions  ======*/

}
