'use strict';

export default class Title {
    constructor(options, body, width, height, margin) {
        var config = {
            titleShow      : true,
            titleText      : "Sample Chart",
            titlePosition  : 'top',
            titleSize      : "14px"
        };

        this._titleShow     = options.titleShow       || config.titleShow;
        this._titleText     = options.titleText       || config.titleText;
        this._titlePosition = options.titlePosition   || config.titlePosition;
        this._titleSize     = options.titleSize       || config.titleSize;

        this._body    = body;

        if (this._titleShow) {
            var self = this;
            // Select CURRENT body container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            var text = d3.select(self._body[0][0].parentNode)
                .append("g")
                    .attr('class', 'c9-custom-title c9-custom-title-container')
                    .append("text")
                        .attr("class", "c9-custom-title c9-custom-title-text");

                // Get title width: text.node().getComputedTextLength()           
                text.attr("x", (((width - text.node().getComputedTextLength()) / 2)))           
                    .attr("y", this.setYLocation(height, margin))
                    .attr("text-anchor", "middle")  
                    .style("font-size", this._titleSize)  
                    .text(this._titleText);
        }
            
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get titleShow() {
        return this._titleShow;
    }

    get titleText() {
        return this._titleText ;
    }

    get titlePosition() {
        return this._titlePosition;
    }

    get titleSize() {
        return this._titleSize;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set titleShow(newTitleShow) {
        if (newTitleShow) {
            this._titleShow = newTitleShow;
        }
    }

    set titleText(newTitleText) {
        if (newTitleText) {
            this._titleText = newTitleText;
        }
    }

    set titlePosition(newTitlePosition) {
        if (newTitlePosition) {
            this._titlePosition = newTitlePosition;
        }
    }

    set titleSize(newTitleSize) {
        if (newTitleSize) {
            this._titleSize = newtitleSize;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    setYLocation(height, margin) {
        if (this.titlePosition === 'top') {
            return (margin.top / 2);
        } else if (this.titlePosition === 'bottom') {
            return (height - margin.bottom / 2);
        }
    }
    /*=====  End of Main Functions  ======*/
    
}