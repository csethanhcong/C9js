'use strict';

class BarChart extends Chart {
    constructor(options) {
        super(options);
        var config = {
            bar_width: undefined,
            bar_color: "steelblue"
        };

        this._barWidth        = options.bar_width  ||  config.bar_width;
        this._barColor        = options.bar_color  ||  config.bar_color;

        var width = this.width - this.margin.left - this.margin.right;
        var height = this.height - this.margin.top - this.margin.bottom;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
        var y = d3.scale.linear().range([height, 0]);

        x.domain(this.data.map(function(d) {
            return d.name;
        }));

        y.domain([0, d3.max(this.data, function(d) {
            return d.value;
        })]);
        this._svg.selectAll(".bar")
            .data(this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", function(d) {
                return x(d.name);
            })
            .attr("y", function(d) {
                return y(d.value);
            })
            .attr("width", x.rangeBand())
            .attr("height", function(d) {
                return height - y(d.value);
            });
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get barWidth() {
        return this._barWidth;
    }

    get barColor() {
        return this._barColor;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set barWidth(newBarWidth) {
        if (newBarWidth) {
            this._barWidth = newBarWidth;
        }
    }
    
    set barColor(newBarColor) {
        if (newBarColor) {
            this._barColor = newBarColor;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    
    draw() {
        var axis = new Axis({}, this._svg, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom);
        console.dir(axis);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
