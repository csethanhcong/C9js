export default class Map {
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
        self._svg       = null;
        self._options   = options;

        self.initConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    /*=====  End of Getter  ======*/
    
    
    /*==============================
    =            Setter            =
    ==============================*/
    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    /*=====  End of Main Functions  ======*/

}
