'use strict';

class BarChart extends Chart {
    constructor(options) {
        super(options);
        var config = {
            point_show: true,
            point_radius: 5,
            line_color: "black",
            point_hover_enable: true,
        };

        this._pointShow        = options.point_show  ||  config.point_show;
        this._pointRadius        = options.point_radius  ||  config.point_radius;
        this._lineColor       = options.line_color  ||  config.line_color;
        this._pointHoverEnable        = options.point_hover_enable  ||  config.point_hover_enable;
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

    draw() {
        var axis    = new Axis(options, this.svg, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom);
        var title   = new Title(options, this.svg, this.width, this.height, this.margin);
        
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}

