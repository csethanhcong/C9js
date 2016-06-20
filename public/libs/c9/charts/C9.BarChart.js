import Chart from './C9.Chart';
import Axis from '../utils/C9.Axis';
import Title from '../utils/C9.Title';

export default class BarChart extends Chart {
    constructor(options) {
        super(options);
        var self = this;
        var config = {
            bar_width: undefined,
            bar_color: "category20"
        };

        var width   = self.width - self.margin.left - self.margin.right;
        var height  = self.height - self.margin.top - self.margin.bottom;

        self.svg.c9Chart = "bar";

        self.data.forEach(function(d) {
            var y0 = 0;
            d.stack = typeof d.value === "object" ? d.value.map(function(v) { return {name: d.name, y0: y0, y1: y0 += v}; }) : [{y0: y0, y1: d.value}];
            d.total = d.stack[d.stack.length - 1].y1;
        });

        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height, 0]);

        x.domain(self.data.map(function(d) {
            return d.name;
        }));

        y.domain([0, d3.max(self.data, function(d) {
            return d.total;
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
        var color = this._barColor;
        if (typeof color == 'string') {
            try {
                return d3.scale[color]();    
            }
            catch(err) {
                return function(i) {
                    return color;
                };
            }
        } else if (typeof color == 'object') {
            return d3.scale.ordinal().range(color);
        }
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
        var color = this.barColor;
        // var data = this.data;
        
        var bar = this.svg.selectAll(".bar")
            .data(this.data)
            .enter().append("g")
            .attr("class", "gBar")
            .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });
        //normal bar chart
        // if (typeof(d.value) === "number")
            bar.selectAll("rect")
                .data(function(d) {
                    return d.stack;
                })
                .enter().append("rect")
                .attr("class", "bar")
                .style("fill", function(d, i) {
                    return color(i);
                })
                .attr("y", function(d) {
                    return y(d.y1);
                })
                .attr("width", this.barWidth) //x.rangeBand()
                .attr("height", function(d) {
                    return y(d.y0) - y(d.y1);
                });
        // //stacked bar chart
        // else {
        //     var data = this.data;
        //     data.forEach(function(d) {
        //         var y0 = 0;
        //         d.ages = d.value.map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        //         d.total = d.ages[d.ages.length - 1].y1;
        //     });


        //     var state = svg.selectAll(".state")
        //         .data(this.data)
        //         .enter().append("g")
        //         .attr("class", "stackedBar")
        //         .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

        //     state.selectAll("rect")
        //         .data(function(d) { return d.ages; })
        //         .enter().append("rect")
        //         .attr("width", x.rangeBand())
        //         .attr("y", function(d) { return y(d.y1); })
        //         .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        //         .style("fill", function(d) { return color(d.name); });
        // }
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
