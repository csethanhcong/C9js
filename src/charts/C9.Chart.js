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
            legendShow: true,
            legendPosition: "bottom",
            legendInsetAnchor: "top-left",
            legendPadding: 0,
            // tooltip - show when mouseover on each data
            tooltipShow: true,
            tooltipPosition: undefined,

            // table 
            table: {
                container: "body",
                show: true,
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
                    value: "value"
                },
                groups: [],
                stacks: [],
            }
        };

        self._id        = options.id        || config.id;
        self._width     = options.width     || config.width;
        self._height    = options.height    || config.height;
        self._colorRange= options.colorRange|| config.colorRange;
        self._hover     = options.hover     || config.hover;
        
        self._dataOption= Helper.merge(options.data, config.data);
        self._dataTarget= null;
        self._margin    = Helper.merge(options.margin, config.margin);

        // Skeleton: 
        // SVG
        // ---BODY (g)
        // -------BlaBla
        self._svg       = null;
        self._body      = null;
        self._options   = options;

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

    get dataTarget() {
        return this._dataTarget;
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

    set dataTarget(arg) {
        if (arg) {
            this._dataTarget = arg;
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
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        this.body = this.svg
                    .append("g")
                    .attr('class', 'c9-chart c9-custom-container')
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                  
    }

    /*=====  End of Main Functions  ======*/

}
