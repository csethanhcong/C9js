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
            barWidth: undefined,
            barColor: "category20",
            groupType: "stack"
        };

        var width        = self.width - self.margin.left - self.margin.right;
        var height       = self.height - self.margin.top - self.margin.bottom;
        var groupCount   = 0; //use to count how many element in group

        self.body.type   = "bar";
        self._groupNames = options.groupNames ? options.groupNames : new Array(); //define group names use for showing legend
        self._groupType  = options.groupType ||  config.groupType;

        self.data.forEach(function(d) {
            var y0 = 0;
            var count = 0;
            if (typeof d.value === "object") {
                if (self.groupType == "stack") {
                    d.stack = d.value.map(function(v) {
                        return {name: d.name, y0: y0, y1: y0 += v};
                    });
                    d.total = d.stack[d.stack.length - 1].y1;
                }
                else if (self.groupType == "group") {
                    var total = -Infinity;
                    d.stack = d.value.map(function(v) {
                        count++;
                        total = v > total ? v : total;
                        return {name: d.name, y0: y0, y1: v, group: self._groupNames.length > 0 ? self._groupNames[count - 1] : "Group " + count};
                    });
                    d.total = total;
                }
            }
            else {
                d.stack = [{name: d.name, y0: y0, y1: d.value, group: self._groupType === "group" ? self._groupNames.length > 0 ? self._groupNames[count] : "Group " + ++count : undefined}];
                d.total = d.stack[d.stack.length - 1].y1;
            }
            if (count > groupCount)
                groupCount = count;
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

        /******** Handle for grouped bar chart ********/
        var xGroup = d3.scale.ordinal();
        //self-define group names if user do not define
        if (self._groupNames.length == 0)
            for (var i = 1; i <= groupCount; i++) {
                self._groupNames.push("Group " + i);
            };
        xGroup.domain(self._groupNames).rangeRoundBands([0, x.rangeBand()]);
        /**********************************************/

        // Make flexible width according to barWidth
        config.barWidth      = x.rangeBand();
        self._barWidth       = options.barWidth  ||  config.barWidth;
        self._barColor       = options.barColor  ||  config.barColor;
        self._x              = x;
        self._y              = y;
        self._xGroup         = xGroup;
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

    get groupType() {
        return this._groupType;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    
    get xGroup() {
        return this._xGroup;
    }

    get groupNames() {
        return this._groupNames;
    }

    get chartType() {
        return this._body.type;
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

    set groupType(newGroupType) {
        if (newGroupType) {
            this._groupType = newGroupType;
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

    set xGroup(newXGroup) {
        if (newXGroup) {
            this._xGroup = newXGroup;
        }
    }

    set groupNames(newGroupNames) {
        if (newGroupNames) {
            this._groupNames = newGroupNames;
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
            y     = self._y,
            xGroup= self._xGroup;

        var bar = self.body
                    .selectAll(".c9-chart-bar.c9-custom-bar")
                    .data(self.data);

        bar.enter()
            .append("g")
            .attr("class", "c9-chart-bar c9-custom-bar")
            .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

        var bars = bar.selectAll(".c9-custom-rect")
            .data(function(d) { return d.stack; });
        bars.enter()
            .append("rect")
            .attr("class", "c9-custom-rect")
            .style("fill", function(d, i) { d.color = color(i); return color(i); })
            .attr("x", function(d) { return d.group ? xGroup(d.group) : undefined; })
            .attr("y", function(d) { return y(d.y1); })
            .attr("width", function(d) { return d.group ? xGroup.rangeBand() : x.rangeBand(); })
            .attr("height", function(d) { return y(d.y0) - y(d.y1); });     
    }

    /**
     * [updateLegendInteraction description]
     * @param  {[type]} data          [description]
     * @param  {[type]} groupNames    [description]
     * @param  {[type]} groupNamesOld [description]
     * @param  {[type]} newLabel      [description]
     * @return {[type]}               [description]
     */
    updateLegendInteraction(data, groupNames, groupNamesOld, newLabel){
        var self = this;

        var xGroup = d3.scale.ordinal();
        xGroup.domain(groupNames).rangeRoundBands([0, self.x.rangeBand()]);

        var xGroupOld = d3.scale.ordinal();
        xGroupOld.domain(groupNamesOld).rangeRoundBands([0, self.x.rangeBand()]);

        var midGroup = undefined;
        //check add new label in the middle
        if (groupNames.length > groupNamesOld.length && 0 < groupNames.indexOf(newLabel) && groupNames.indexOf(newLabel) < groupNames.length - 1 )
            midGroup = groupNamesOld[groupNames.indexOf(newLabel)];
        console.log(midGroup);
        // self.body.selectAll(".c9-chart-bar.c9-custom-bar").remove();
        self.body.selectAll(".c9-chart-bar.c9-custom-bar").data(self.data).exit().remove();
        self.body.selectAll(".c9-custom-rect").data(self.data, function(d) {return d.stack}).exit().remove();

        var bar = self.body
                    .selectAll(".c9-chart-bar.c9-custom-bar")
                    .data(data);
// bar.exit().remove();
        bar.enter()
            .append("g")
            .attr("class", "c9-chart-bar c9-custom-bar")
            .attr("transform", function(d) { return "translate(" + self.x(d.name) + ",0)"; });

        var bars = bar.selectAll(".c9-custom-rect")
            .data(function(d) { return d.stack; });
// bars.exit().remove();
        bars.enter()
            .append("rect")
            .attr("class", "c9-custom-rect")
            .style("fill", function(d) { return d.color; })
            .attr("x", function(d) { 
                if (groupNames.length > groupNamesOld.length && d.group == newLabel && groupNames.indexOf(newLabel) == groupNames.length - 1)
                    return self.x.rangeBand();
                return midGroup ? d.group == newLabel ? xGroupOld(midGroup) : xGroupOld(d.group) : xGroupOld(d.group);
            })
            .attr("y", function(d) { return self.y(d.y1); })
            .attr("width", function(d) { 
                return d.group == newLabel ? 0 : xGroupOld.rangeBand();
            })
            .attr("height", function(d) { return self.y(d.y0) - self.y(d.y1); });

        bars.transition().duration(750)
            .attr("x", function(d) { return xGroup(d.group); })
            .attr("width", function(d) { return xGroup.rangeBand(); })
        self.updateInteraction();
    }

    /**
     * [Main draw function of Bar Chart]
     * @return {[type]} [description]
     */
    draw() {
        var self = this;
        var axis    = new Axis(self.options, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, null, null);
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options, self.body, self.barColor, self.groupNames);
        
        legend.draw();
        legend.updateInteractionForBarChart(self);
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

        return self.body.selectAll('.c9-custom-rect');
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
                        .style('display', 'none');
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
                        .style("display", 'block')
                        .attr("transform", "translate(" + self.x(d.name) + "," + self.y(self.retrieveValue(d.y0, d.y1)) + ")");

                    text_1.text('Name: ' + d.name);
                    text_2.text('Value: ' + self.retrieveValue(d.y0, d.y1));
                })
                .on("mouseout", function(d) { 
                    div.transition()
                        .duration(hoverOptions.onMouseOut.fadeOut)      
                        .style('display', 'none');
                });
        }
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
