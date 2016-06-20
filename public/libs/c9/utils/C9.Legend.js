'use strict';

export default class Legend {
    constructor(options, svg, color, legendDomain) {
        var config = {
            legend_show      : true,
            legend_position  : [0, 0],
            legend_box       : true,
            legend_size      : 18,
            legend_text_size : "14px",
            legend_margin   : [5, 5, 5, 5],
            legend_space     : 5,
            legend_style     : "rect"
        };

        this._legendShow         = options.legend_show       || config.legend_show;
        this._legendTextSize     = options.legend_text_size  || config.legend_text_size;
        this._legendPosition     = options.legend_position   || config.legend_position;
        this._legendSize         = options.legend_size       || config.legend_size;
        this._legendBox          = options.legend_box        || config.legend_box;
        this._legendMargin       = options.legend_margin     || config.legend_margin;
        this._legendSpace        = options.legend_space      || config.legend_space;
        this._legendStyle        = options.legend_style      || config.legend_style;
        this._legendDomain       = options._legend_domain    || legendDomain;

        this._svg    = svg;

        if (this._legendShow) {
            var self = this;
            var legend = d3.select(self._svg[0][0].parentNode)
                .append("g")
                .attr("class", "legend")
                .attr("transform", "translate(" + self._legendPosition[0] + "," + self._legendPosition[1] + ")");
            
            color.domain(this._legendDomain);
            var legendBox = legend.selectAll(".legendBox").data([true]).enter().append("rect");
            var legendItem = legend.selectAll(".legendItem")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "legendItem")
                .attr("transform", function(d, i) {
                    return "translate(" + self._legendMargin[3] + "," + (i * (self._legendSize + self._legendSpace) + self._legendMargin[0]) + ")"
                });
            legendItem.append(self._legendStyle)
                .attr("width", self._legendSize)
                .attr("height", self._legendSize)
                .attr("r", self._legendSize)
                .style("fill", color)
                .style("stroke", color);

            legendItem.append("text")
                .attr("x", self._legendSize + self._legendSpace)
                .attr("y", self._legendSize - self._legendSpace)
                .text(function(d) { return d; });

            if (self._legendBox) {
                var box = legend[0][0].getBBox();
                legendBox.attr("class", "legendBox")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", box.width + self._legendMargin[1] + self._legendMargin[3])
                    .attr("height", box.height + self._legendMargin[2] + self._legendMargin[0])
                    .style("fill", "none")
                    .style("stroke", "black");
            }
        }
            
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get legendShow() {
        return this._legendShow;
    }

    get legendText() {
        return this._legendText ;
    }

    get legendPosition() {
        return this._legendPosition;
    }

    get legendSize() {
        return this._legendSize;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set legendShow(newlegendShow) {
        if (newlegendShow) {
            this._legendShow = newlegendShow;
        }
    }

    set legendText(newlegendText) {
        if (newlegendText) {
            this._legendText = newlegendText;
        }
    }

    set legendPosition(newlegendPosition) {
        if (newlegendPosition) {
            this._legendPosition = newlegendPosition;
        }
    }

    set legendSize(newlegendSize) {
        if (newlegendSize) {
            this._legendSize = newlegendSize;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    setYLocation(height, margin) {
        if (this.legendPosition === 'top') {
            return (margin.top / 2);
        } else if (this.legendPosition === 'bottom') {
            return (height - margin.bottom / 2);
        }
    }
    /*=====  End of Main Functions  ======*/
    
}