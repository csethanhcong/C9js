import Chart from './C9.Chart';

import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Tooltip from './utils/C9.Tooltip';

import Helper from '../helper/C9.Helper';
import DataAdapter from '../helper/C9.DataAdapter';

export default class BarChart extends Chart {
    constructor(options) {
        super(options);
        var self = this;
        var config = {
            barWidth: undefined,
            // groupType: "stack"
        };

        var width        = self.width - self.margin.left - self.margin.right;
        var height       = self.height - self.margin.top - self.margin.bottom;
        // var groupCount   = 0; // use to count how many element in group
        // var groupStart   = 0; // calculate the number of those first element that just have only 1 value

        self.body.type      = "bar";
        // self._groupType     = options.groupType     ||  config.groupType;

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption);
        self.dataTarget = da.getDataTarget("bar");
        var barChartType = da.getDataTypeForBarChart()
        if (barChartType != "single") {
            self._groupNames    = da.groups || da.stacks;  //define group names use for showing legend
            self._isGroup       = barChartType == "group";
        }

        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = options.isLogaric ? d3.scale.log().range([height, 0]) : d3.scale.linear().range([height, 0]);

        var minMax = Helper.getMinMax(self.dataTarget, barChartType);

        x.domain(self.dataTarget.map(function(d) {
            return d[0].name;
        }));

        y.domain([minMax.min, minMax.max]);

        /******** Handle for grouped, stacked bar chart ********/
        if (self._groupNames) {
            self._xGroup = d3.scale.ordinal();
            self._xGroup.domain(self._groupNames).rangeRoundBands([0, x.rangeBand()]);
        }
        
        /**********************************************/

        // Make flexible width according to barWidth
        config.barWidth      = x.rangeBand();
        self._barWidth       = options.barWidth  ||  config.barWidth;
        self._x              = x;
        self._y              = y;
        self.updateConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get barWidth() {
        return this._barWidth;
    }

    get colorRange() {
        var color = this._colorRange;
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

    get isGroup() {
        return this._isGroup;
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
    
    set colorRange(newBarColor) {
        if (newBarColor) {
            this._colorRange = newBarColor;
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
    updateConfig(){
        var self  = this,
            color = self.colorRange,
            x     = self._x,
            y     = self._y,
            xGroup= self._xGroup;

        var bar = self.body
                    .selectAll(".bar")
                    .data(self.dataTarget)
                    .enter()
                        .append("g")
                        .attr("class", "c9-chart-bar c9-custom-bar")
                        .attr("transform", function(d) { return "translate(" + x(d[0].name) + ",0)"; });

        var bars = bar.selectAll(".c9-custom-rect")
            .data(function(d) { return d; });

        bars.enter()
            .append("rect")
            .attr("class", "c9-custom-rect")
            .style("fill", function (d, i) { return d.color || color(i); })
            .attr("x", function(d) { return self.isGroup ? xGroup(d.group) : undefined; })
            .attr("y", function(d) { return y(d.y1); })
            .attr("width", function(d) { return self.isGroup ? xGroup.rangeBand() : x.rangeBand(); })
            .attr("height", function(d) { return y(0) - y(Math.abs(d.y0)); });
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
        var type = self.groupType;

        var minMax = Helper.getMinMax(data, self.isGroup == false ? "stack" : null);
        var y = self.y;
        // console.log(minMax);
        y.domain([minMax.min, minMax.max]);
        self.axis.update(null, y, 750);

        var xGroup = d3.scale.ordinal();
        xGroup.domain(groupNames).rangeRoundBands([0, self.x.rangeBand()]);

        var xGroupOld = d3.scale.ordinal();
        xGroupOld.domain(groupNamesOld).rangeRoundBands([0, self.x.rangeBand()]);

        var midGroup = undefined;
        //check add new label in the middle
        if (groupNames.length > groupNamesOld.length && 0 < groupNames.indexOf(newLabel) && groupNames.indexOf(newLabel) < groupNames.length - 1 )
            midGroup = groupNamesOld[groupNames.indexOf(newLabel)];

        // self.body.selectAll(".c9-custom-rect").transition().duration(750).attr("height", 0).remove();
        self.body.selectAll(".c9-custom-rect").data([]).exit().remove();
        self.body.selectAll(".c9-custom-bar").data([]).exit().remove();
        var bar = self.body
                    .selectAll(".c9-chart-bar.c9-custom-bar")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class", "c9-chart-bar c9-custom-bar")
                    .attr("transform", function (d, i) { return "translate(" + self.x(self.dataTarget[i][0].name) + ",0)"; });

        var bars = bar.selectAll(".c9-custom-rect")
            .data(function(d) { return d; });

        bars.enter()
            .append("rect")
            .attr("class", "c9-custom-rect")
            .style("fill", function(d) { return d.color; })
            .attr("x", function(d) {
                // use for stack
                if (!self.isGroup) return undefined;
                // use for group
                // group member positioning at the end of groups, so its x is the position of right edge of bar
                if (groupNames.length > groupNamesOld.length && d.group == newLabel && groupNames.indexOf(newLabel) == groupNames.length - 1)
                    return self.x.rangeBand();
                return midGroup ? d.group == newLabel ? xGroupOld(midGroup) : xGroupOld(d.group) : xGroupOld(d.group);
            })
            .attr("y", function(d) { return y(d.y1); })
            .attr("width", function(d) {
                return !self.isGroup ? self.x.rangeBand() : d.group == newLabel ? 0 : xGroupOld.rangeBand();
            })
            .attr("height", function(d) { return y(0) - y(Math.abs(d.y0)); });

        bars.transition().duration(750)
            .attr("x", function(d) { return !self.isGroup ? undefined : xGroup(d.group); })
            .attr("width", function(d) { return !self.isGroup ? self.x.rangeBand() : xGroup.rangeBand(); })

        self.updateInteraction();
    }

    /**
     * [Main draw function of Bar Chart]
     * @return {[type]} [description]
     */
    draw() {
        var self = this;
        self.axis    = new Axis(self.options, self.body, self.dataTarget, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self.x, self.y);
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options, self.body, self.dataTarget);
        
        legend.draw();
        legend.updateInteractionForBarChart(self);

        self.updateInteraction();
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
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback  = self.click.callback;

        // Define tooltip
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


        // Update Event Factory
        self.eventFactory = {
            'click': function(d) {
                if (Helper.isFunction(onClickCallback)) {
                    onClickCallback.call(this, d);
                }
            },
            'mouseover': function(d) {
                if (!hoverEnable) return;
                
                if (Helper.isFunction(onMouseOverCallback)) {
                    onMouseOverCallback.call(this, d);
                }

                div.transition()
                    .duration(hoverOptions.onMouseOver.fadeIn)
                    .style("display", 'block')
                    .attr("transform", "translate(" + self.x(d.name) + "," + self.y(self.retrieveValue(d.y0, d.y1)) + ")");

                text_1.text('Name: ' + d.name);
                text_2.text('Value: ' + self.retrieveValue(d.y0, d.y1));
            },
            'mouseout': function(d) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, d);
                }

                div.transition()
                    .duration(hoverOptions.onMouseOut.fadeOut)      
                    .style('display', 'none');
            }
        }

        selector.on(self.eventFactory);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
