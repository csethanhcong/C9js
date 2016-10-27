import Chart from './C9.Chart';

import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Table from './utils/C9.Table';
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
        self.dataSource = da.dataSource;
        var barChartType = da.getDataTypeForBarChart()
        if (barChartType != "single") {
            self._groupNames    = da.groups || da.stacks;  //define group names use for showing legend
            self._isGroup       = barChartType == "group";
        }

        // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = options.isLogaric ? d3.scale.log().range([height, 0]) : d3.scale.linear().range([height, 0]);

        var minMax = Helper.getMinMax(self.dataTarget, barChartType, options.isLogaric);

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
        self.isLogaric       = options.isLogaric;
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
            .attr("height", function(d) { return self.isLogaric ? y(y.domain()[0]) - y(d.y0) : y(0) - y(Math.abs(d.y0)); });
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

        var y = self.y;
        var minMax = Helper.getMinMax(data, self.isGroup == false ? "stack" : null, self.isLogaric);
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
            .attr("y", function(d) { return self.isGroup ? y(d.y1) : self.isLogaric ? y(y.domain()[1]) : y(0); })
            .attr("width", function(d) {
                return !self.isGroup ? self.x.rangeBand() : d.group == newLabel ? 0 : xGroupOld.rangeBand();
            })
            .attr("height", function(d) { return self.isLogaric ? y(y.domain()[0]) - y(d.y0) : self.isGroup ? y(0) - y(Math.abs(d.y0)) : 0; });

        bars.transition().duration(750)
            .attr("x", function(d) { return !self.isGroup ? undefined : xGroup(d.group); })
            .attr("width", function(d) { return !self.isGroup ? self.x.rangeBand() : xGroup.rangeBand(); })
            .attr("y", function(d) { return y(d.y1); })
            .attr("height", function(d) { return self.isLogaric ? y(y.domain()[0]) - y(d.y0) : y(0) - y(Math.abs(d.y0)); });
            
        self.updateInteraction();
    }

    /**
     * [Main draw function of Bar Chart]
     * @return {[type]} [description]
     */
    draw() {
        var self = this;
        self.axis    = new Axis(self.options.axis, self.body, self.dataTarget, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self.x, self.y);
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options.legend, self.body, self.dataTarget);
        var table   = new Table(self.options.table, self.body, self.dataTarget);

        self.table = table;

        // Draw legend
        legend.draw();
        legend.updateInteractionForBarChart(self);

        // Draw table
        table.draw();
        table.updateInteractionForBarChart(self);

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

        var tooltip = new Tooltip(self.options.tooltip);

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

                // For table
                if (self.table.show) {
                    var tr = d3.selectAll('.c9-table-container>.c9-table-body tr');
                    tr.filter(function(i) { return i['data-ref'] != d['data-ref'] }).selectAll('td').style('opacity', '0.5');
                    var selectedItem = tr.filter(function(i) { return i['data-ref'] == d['data-ref'] });
                    //set its style and scroll to its pos
                    selectedItem.selectAll('td').style('opacity', '1');
                    Helper.scroll(d3.select('.c9-table-container')[0][0], selectedItem[0][0].offsetTop, 200);
                }

                tooltip.draw(d, self, 'mouseover');
            },
            'mouseout': function(d) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, d);
                }

                // For Table
                if (self.table.show)
                    d3.selectAll('.c9-table-container>.c9-table-body tr').selectAll('td').style('opacity', '');

                tooltip.draw(d, self, 'mouseout');
            }
        }

        selector.on(self.eventFactory);
    }

    /**
     * Custom Event Listener
     * @param  {[type]}   eventType [description]
     * @param  {Function} callback  [description]
     * @return {[type]}             [description]
     */
    on(eventType, callback) {
        super.on(eventType, callback);
        
        var self = this;
        var selector    = self.selectAllBar();

        // Update Event Factory
        let eventFactory = {
            'click.event': function(d) {
                if (Helper.isFunction(callback)) {
                    callback.call(this, d);
                }
            },
            'mouseover.event': function(d) {
                if (Helper.isFunction(callback)) {
                    callback.call(this, d);
                }
            },
            'mouseout.event': function(d) {
                if (Helper.isFunction(callback)) {
                    callback.call(this, d);
                }
            }
        }

        let eventName = eventType + '.event';

        selector.on(eventName, eventFactory[eventName]);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
