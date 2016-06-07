'use strict';

class Title {
    constructor(options, svg, width, height, margin) {
        var config = {
            title_show      : true,
            title_text      : "Sample Chart",
            title_position  : 'top',
            title_size      : "14px"
        };

        this._titleShow     = options.title_show       || config.title_show;
        this._titleText     = options.title_text       || config.title_text;
        this._titlePosition = options.title_position   || config.title_position;
        this._titleSize     = options.title_size       || config.title_size;

        this._svg    = svg;

        if (this._titleShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            var text = d3.select(this._svg[0][0].parentNode)
                .append("g")
                .append("text")
                .attr("class", "title");

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