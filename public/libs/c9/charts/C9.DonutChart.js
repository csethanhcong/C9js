'use strict';

class DonutChart extends Chart {
    constructor(options) {
        super(options);
        var config = {
            // tooltip - show when mouseover on each data
            tooltip_show: true,
            tooltip_position: undefined,
            // title
            title_show: true,
            title_text: undefined,
            title_position: 'top',
            
            // donut
            donut_label_show: true,
            donut_width: undefined,
            donut_expand_duration: 50,
        };


    }
}
}
