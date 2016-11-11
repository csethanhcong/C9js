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
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
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

            // title
            title: {
                show      : true,
                text      : "Sample Chart",
                position  : 'top',
                fontSize  : "14px"
            },

            // legend
            legend: {
                show      : true,
                position  : "top",
                size      : 10,
                fontSize  : "12px",
                fontColor : "#999",
                fontWeight: 'bold',
                margin    : [5, 5, 5, 5],
                space     : 10,
            },

            // tooltip
            tooltip: {
                show: true,
                position: 'left', // [top, right, bottom, left]
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

        self._options   = options;

        self.updateConfig(config);
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
        var color = this._colorRange;

        if (typeof color == 'string') {
            try {
                return d3.scale[color]();    
            }
            catch(err) {
                return function(i) {
                    return color;
                };
            }
        } else if (typeof color == 'object') {
            return d3.scale.ordinal().range(color);
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

    get dataSource() {
        return this._dataSource;
    }

    get eventFactory() {
        return this._eventFactory;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get chartType() {
        return this._chartType;
    }

    get title() {
        return this._title;
    }

    get axis() {
        return this._axis;
    }

    get legend() {
        return this._legend;
    }

    get table() {
        return this._table;
    }

    get tooltip() {
        return this._tooltip;
    }
    /*=====  End of Getter  ======*/
    
    
    /*==============================
    =            Setter            =
    ==============================*/
    set container(arg) {
        if (arg) {
            this._container = arg;
        }
    }
    
    set id(arg) {
        if (arg) {
            this._id = arg;
        }
    }

    set width(arg) {
        if (arg) {
            this._width = arg;
        }
    }

    set height(arg) {
        if (arg) {
            this._height = arg;
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

    set colorRange(arg) {
        if (arg) {
            this._colorRange = arg;
        }
    }

    set margin(arg) {
        if (arg) {
            this._margin = arg;
        }
    }

    set dataOption(arg) {
        if (arg) {
            this._dataOption = arg;
        }
    }

    set svg(arg) {
        if (arg) {
            this._svg = arg;
        }
    }

    set body(arg) {
        if (arg) {
            this._body = arg;
        }
    }

    set options(arg) {
        if (arg) {
            this._options = arg;
        }
    }

    set hover(arg) {
        if (arg) {
            this._hover = arg;
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

    set dataSource(arg) {
        if (arg) {
            this._dataSource = arg;
        }
    }

    set eventFactory(arg) {
        if (arg) {
            this._eventFactory = arg;
        }
    }

    set x(arg) {
        if (arg) {
            this._x = arg;
        }
    }

    set y(arg) {
        if (arg) {
            this._y = arg;
        }
    }

    set chartType(arg) {
        if (arg) {
            this._chartType = arg;
        }
    }

    set title(arg) {
        if (arg) {
            this._title = arg;
        }
    }

    set axis(arg) {
        if (arg) {
            this._axis = arg;
        }
    }

    set legend(arg) {
        if (arg) {
            this._legend = arg;
        }
    }

    set table(arg) {
        if (arg) {
            this._table = arg;
        }
    }

    set tooltip(arg) {
        if (arg) {
            this._tooltip = arg;
        }
    }
    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /**
     * Update parent config
     */
    updateConfig(config) {
        var self = this;

        self.options = Helper.mergeDeep(config, self.options);

        var options = self.options;

        self.id        = options.id        || config.id;
        self.width     = options.width     || config.width;
        self.height    = options.height    || config.height;
        self.colorRange= options.colorRange|| config.colorRange;
        
        self.margin    = Helper.merge(options.margin, config.margin);
        self.hover     = Helper.merge(options.hover, config.hover);
        self.click     = Helper.merge(options.click, config.click);
        
        self.dataOption= Helper.mergeDeep(config.data, options.data);

        self.options.subchart  = Helper.merge(options.subchart, config.subchart);
        self.options.table     = Helper.merge(options.table, config.table);
        self.options.tooltip   = Helper.merge(options.tooltip, config.tooltip);
        self.options.legend    = Helper.merge(options.legend, config.legend);
        self.options.axis      = Helper.mergeDeep(config.axis, options.axis);
    }

    /**
     * Draw or Re-draw Base Chart
     */
    draw() {
        var self = this;

        var margin  = self.margin,
            id      = self.id,
            width   = self.width - margin.left - margin.right,
            height  = self.height - margin.top - margin.bottom;

        self.container = d3.select(id);

        // Remove existing chart at current container
        self.container.selectAll(".c9-svg").data([]).exit().remove();

        self.svg = d3.select(id)
            .style('position', 'relative')
            .append("svg")
            .attr('class', 'c9-svg')
            .attr("width", self.width)
            .attr("height", self.height)
            .style('overflow', 'visible'); // to overwrite overflow: hidden by Boostrap as default


        self.svg.append("defs")
            .append("clipPath")
                .attr("id", "clip")
            .append("rect")
                .attr("width", width)
                .attr("height", height);

        self.body = self.svg
                    .append("g")
                    .attr('class', 'c9-chart c9-custom-container')
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");               
    }

    /**
     * Get lightening color to create effect when interacting
     * @param  {[type]} color [description]
     */
    getLightenColor(color) {
        return Helper.shadeColor(0.5, color);
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

        // Self-update on Base Chart to make sure that self.options consisting
        // of all new values
        self.updateConfig(self.options);
    }

    /**
     * Update chart based on new data with optional dataConfig
     * @param  {[type]} data       [description]
     * @param  {[type]} dataConfig [description]
     */
    updateData(data, dataConfig) {

    }
    /*=====  End of User's Functions  ======*/
    

}
