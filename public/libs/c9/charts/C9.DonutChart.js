'use strict';

class DonutChart extends Chart {
    constructor(options) {
        super(options);
        var config = {
            // axis
            axis_x_show: true,
            axis_x_padding: {},
            axis_y_show: true,
            axis_y_padding: {},
            axis_y2_show: true,
            axis_y2_padding: {},
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
            
            // donut
            donut_label_show: true,
            donut_width: undefined,
            donut_expand_duration: 50,
        };


    }
}
}
