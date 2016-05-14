'use strict';

class LineChart extends Chart {
    constructor(options) {
        super(options);
        var config = {
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
            
            // line chart
            point_show: true,
            point_radius: 5,
            point_hover_enable: true,
            line_color: "black",
        };


    }
}
}
