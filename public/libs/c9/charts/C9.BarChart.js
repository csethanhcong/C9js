import Chart from './C9.Chart';
import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Tooltip from './utils/C9.Tooltip';
import Helper from '../helper/C9.Helper';

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

        self.body.type = "bar";

        self.data.forEach(function(d) {
            var y0 = 0;
            d.stack = typeof d.value === "object" ? d.value.map(function(v) { return {name: d.name, y0: y0, y1: y0 += v}; }) : [{name: d.name, y0: y0, y1: d.value}];
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
        self._x               = x;
        self._y               = y;

        self.updateConfig();
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

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
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

    set x(newX) {
        if (newX) {
            this._x = newX;
        }
    }

    set y(newY) {
        if (newY) {
            this._y = newY;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /**
     * Init Bar Chart Config
     */
    updateConfig() {
        var self  = this,
            color = self.barColor,
            x     = self._x,
            y     = self._y;

        var bar = self.body
                    .selectAll(".c9-chart-bar.c9-custom-bar")
                    .data(self.data)
                    .enter()
                        .append("g")
                        .attr("class", "c9-chart-bar c9-custom-bar")
                        .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

        bar.selectAll("rect")
            .data(function(d) { return d.stack; })
            .enter()
                .append("rect")
                .attr("class", "c9-chart-bar c9-custom-rect")
                .style("fill", function(d, i) { return color(i); })
                .attr("y", function(d) { return y(d.y1); })
                .attr("width", self.barWidth) //x.rangeBand()
                .attr("height", function(d) { return y(d.y0) - y(d.y1); });
    }

    /**
     * [Main draw function of Bar Chart]
     * @return {[type]} [description]
     */
    draw() {

        var axis    = new Axis(this.options, this.body, this.data, this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom, null, null);
        var title   = new Title(this.options, this.body, this.width, this.height, this.margin);
        var legend  = new Legend(this.options, this.body, this.barColor, this.data);
        
        this.updateInteraction();
    }

    /**
     * Retrieve value from upper and lower bounds of each stack
     * @param  {String} lower Lower bound of value
     * @param  {String} upper Upper bound of value
     * @return {String}       Value to return
     */
    retrieveValue(lower, upper) {
        var d1 = Math.floor(lower) === lower ? 0 : lower.toString().split(".")[1].length;
        var d2 = Math.floor(upper) === upper ? 0 : upper.toString().split(".")[1].length;
        return d1 > d2 ? (upper - lower).toFixed(d1) : (upper - lower).toFixed(d2);
    }
    
    /**
     * Select all bars as type RECT in Bar Chart via its CLASS
     */
    selectAllBar() {
        var self = this;

        return self.body
                .selectAll('g')
                    .selectAll('.c9-chart-bar.c9-custom-rect');
    }

    /**
     * Update Interaction: Hover
     * @return {} 
     */
    updateInteraction() {
        var self = this,
            hoverEnable     = self.hover.enable,
            hoverOptions    = self.hover.options,
            selector        = self.selectAllBar(),
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback;

        if (hoverEnable) {
            // Define the div for the tooltip
            // TODO: Allow user to add custom DIV, CLASS
            // Make sure that: 
            // - Rect not overflow the bar, if not, hover effect will be messed
            // -> So, just align the rect to right/left (x: 25) to avoid it
            // -> And, the text will be align also
            var div = self.body
                        .append('g')   
                        .style('opacity', 0);
                // Rect Container
                div.append('rect')
                    .attr('class', 'c9-custom-tooltip-box')
                    .attr('x', 25)
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .style('position', 'absolute')
                    .style('width', '100px')
                    .style('height', '50px')
                    .style('fill', '#FEE5E2')
                    .style('stroke', '#FDCCC6')
                    .style('stroke-width', 2);
                // First line
                var text_1 = div.append('text')
                    .attr('class', 'c9-custom-tooltip-label')
                    .attr('x', 30)
                    .attr('y', 10)
                    .style('font-family', 'sans-serif')
                    .style('font-size', '10px');
                // Second line
                var text_2 = div.append('text')
                    .attr('class', 'c9-custom-tooltip-label')
                    .attr('x', 30)
                    .attr('y', 20)
                    .style('font-family', 'sans-serif')
                    .style('font-size', '10px');

            selector
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(hoverOptions.onMouseOver.fadeIn)
                        .style("opacity", .9)
                        .attr("transform", "translate(" + self.x(d.name) + "," + self.y(self.retrieveValue(d.y0, d.y1)) + ")");

                    text_1.text('Name: ' + d.name);
                    text_2.text('Value: ' + self.retrieveValue(d.y0, d.y1));
                })
                .on("mouseout", function(d) { 
                    div.transition()
                        .duration(hoverOptions.onMouseOut.fadeOut)      
                        .style("opacity", 0);
                });
        }
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
