import Chart from 'C9.Chart';
import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';

class BarChart extends Chart {
    constructor(options) {
        super(options);
        var self = this;
        var config = {
            bar_width: undefined,
            bar_color: "steelblue"
        };

        var width   = self.width - self.margin.left - self.margin.right;
        var height  = self.height - self.margin.top - self.margin.bottom;

        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height, 0]);

        x.domain(self.data.map(function(d) {
            return d.name;
        }));

        y.domain([0, d3.max(self.data, function(d) {
            return d.value;
        })]);

        // Make flexible width according to bar_width
        config.bar_width      = x.rangeBand();
        self._barWidth        = options.bar_width  ||  config.bar_width;
        self._barColor        = options.bar_color  ||  config.bar_color;

        self.initBarChartConfig(height, x, y);
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
    /**
     * [First init config Bar Chart]
     * @param  {[type]} height [Height of Bar Chart]
     * @param  {[type]} x      [x scale]
     * @param  {[type]} y      [y scale]
     * @return {[type]}        [description]
     */
    initBarChartConfig(height, x, y) {
        this.svg.selectAll(".bar")
            .data(this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .style("fill", this.barColor)
            .attr("x", function(d) {
                return x(d.name);
            })
            .attr("y", function(d) {
                return y(d.value);
            })
            .attr("width", this.barWidth) //x.rangeBand()
            .attr("height", function(d) {
                return height - y(d.value);
            });
    }

    /**
     * [Main draw function of Bar Chart]
     * @return {[type]} [description]
     */
    draw() {

        var axis    = new Axis(this.options, this.svg, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom, null, null);
        var title   = new Title(this.options, this.svg, this.width, this.height, this.margin);
        
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
