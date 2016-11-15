import Chart from './C9.Chart';

import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Table from './utils/C9.Table';
import Tooltip from './utils/C9.Tooltip';

import Helper from '../helper/C9.Helper';
import DataAdapter from '../helper/C9.DataAdapter';

export default class TimeLine extends Chart {
    constructor(options) {
        super(options);

        var self = this;

        self.config = {
            separatorColor: "rgb(154, 154, 154)",
            backgroundColor: null,
            starting: 0,
            ending: 0,
            stack: true,
            itemHeight: 25,
            itemMargin: 15,
            labelMargin: 50,
            striped: null
        };

        // self.updateConfig(config);
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get maxStack() {
        return this._maxStack;
    }

    get subChartX() {
        return this._subChartX;
    }

    get subChartXAxis() {
        return this._subChartXAxis;
    }

    get subChartWidth() {
        return this._subChartWidth;
    }

    get subChartHeight() {
        return this._subChartHeight;
    }

    get subChartMargin() {
        return this._subChartMargin;
    }

    get brush() {
        return this._brush;
    }

    get stackList() {
        return this._stackList;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set maxStack(arg) {
        if (arg) {
            this._maxStack = arg;
        }
    }

    set subChartX(arg) {
        if (arg) {
            this._subChartX = arg;
        }
    }

    set subChartXAxis(arg) {
        if (arg) {
            this._subChartXAxis = arg;
        }
    }

    set subChartWidth(arg) {
        if (arg) {
            this._subChartWidth = arg;
        }
    }

    set subChartHeight(arg) {
        if (arg) {
            this._subChartHeight = arg;
        }
    }

    set subChartMargin(arg) {
        if (arg) {
            this._subChartMargin = arg;
        }
    }

    set brush(arg) {
        if (arg) {
            this._brush = arg;
        }
    }

    set stackList(arg) {
        if (arg) {
            this._stackList = arg;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    updateConfig(config, callback) {
        super.updateConfig(config);

        var self = this;

        self.options = Helper.mergeDeep(config, self.options);

        self.chartType          = "timeline";
        self.maxStack           = 1;
        self.stackList          = {};

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption, self.chartType, null);
        da.getDataTarget(self.chartType, function(data) {
            self.dataTarget = data;

            var maxStack = 0,
                minTime = 0,
                maxTime = 0,
                width = self.width - self.margin.left - self.margin.right,
                height = self.height - self.margin.top - self.margin.bottom;

            // count number of stack and calculate min time, max time from data
            if (self.options.stack || self.options.ending === 0 || self.options.starting === 0) {
                
                self.dataTarget.forEach(function (datum, index) {

                    if (self.options.stack && Object.keys(self.stackList).indexOf(index) == -1) {
                        self.stackList[index] = maxStack;
                        maxStack++;
                    }

                    datum.value.forEach(function (time, i) {
                        if(self.options.starting === 0)
                            if (time.start < minTime || minTime === 0)
                                minTime = time.start;
                        if(self.options.ending === 0) {
                            if (time.start > maxTime)
                                maxTime = time.start;
                            if (time.end > maxTime)
                                maxTime = time.end;
                        }
                    });
                });

                if (self.options.ending === 0) {
                  self.options.ending = maxTime;
                }
                if (self.options.starting === 0) {
                  self.options.starting = minTime;
                }
            }

            self.maxStack = maxStack;

            self.x = d3.time.scale()
                    .domain([self.options.starting, self.options.ending])
                    .range([0, self.width]);

            if (Helper.isFunction(callback)) {
                callback.call(self, self.dataTarget);
            }
        });
    }

    updateDataConfig(dataCfg, callback) {

        var self = this;

        self.options = Helper.mergeDeep(self.options, dataCfg);

        self.chartType          = "timeline";
        self.maxStack           = 1;
        self.stackList          = {};

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption, self.chartType, null);
        da.getDataTarget(self.chartType, function(data) {
            var maxStack = 0,
                minTime = 0,
                maxTime = 0,
                width = self.width - self.margin.left - self.margin.right,
                height = self.height - self.margin.top - self.margin.bottom;

            // count number of stack and calculate min time, max time from data
            if (self.options.stack || self.options.ending === 0 || self.options.starting === 0) {
                
                self.dataTarget.forEach(function (datum, index) {

                    if (self.options.stack && Object.keys(self.stackList).indexOf(index) == -1) {
                        self.stackList[index] = maxStack;
                        maxStack++;
                    }

                    datum.value.forEach(function (time, i) {
                        if(self.options.starting === 0)
                            if (time.start < minTime || minTime === 0)
                                minTime = time.start;
                        if(self.options.ending === 0) {
                            if (time.start > maxTime)
                                maxTime = time.start;
                            if (time.end > maxTime)
                                maxTime = time.end;
                        }
                    });
                });

                if (self.options.ending === 0) {
                  self.options.ending = maxTime;
                }
                if (self.options.starting === 0) {
                  self.options.starting = minTime;
                }
            }

            self.maxStack = maxStack;

            self.x = d3.time.scale()
                    .domain([self.options.starting, self.options.ending])
                    .range([0, self.width]);

            if (Helper.isFunction(callback)) {
                callback.call(self, self.dataTarget);
            }
        });
    }

    update(data) {
        var self = this;

        var width = self.width - self.margin.left - self.margin.right,
            height = self.height - self.margin.top - self.margin.bottom;

        var scale = width / (self.options.ending - self.options.starting);

        var color = self.colorRange;

        var stackList = self.stackList;

        self.body.selectAll(".c9-timeline-border-bar").data([]).exit().remove();
        self.body.selectAll(".c9-timeline-chart.c9-background-container").data([]).exit().remove();
        self.body.selectAll(".c9-timeline-chart.c9-stripe-background-container").data([]).exit().remove();
        self.body.selectAll(".c9-timeline-chart.c9-rect-container").data([]).exit().remove();
        self.svg.selectAll(".c9-timeline-chart.c9-label-container").remove();
        self.body.selectAll(".c9-timeline-row-separator").remove();

        // Update clip-parth
        self.svg.select('#clip').select('rect').attr('height', (self.options.itemHeight + self.options.itemMargin) * data.length);

        //draw border
        self.body.append("rect")
            .attr("class", "c9-timeline-border-bar")
            .attr("x", 0)
            .attr("width", width)
            .attr("y", 0 - self.options.itemMargin / 2)
            .attr("height", (self.options.itemHeight + self.options.itemMargin) * data.length)
            .attr("stroke", "rgb(154, 154, 154)")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        var labelContainer = self.svg.append("g")
                                .attr('class', 'c9-timeline-chart c9-label-container');

        data.forEach( function(datum, index) {
            var barYAxis = ((self.options.itemHeight + self.options.itemMargin) * stackList[index]);
            //draw background
            if (self.options.backgroundColor) { 
                var bgContainer = self.body.append("g")
                                    .attr('class', 'c9-timeline-chart c9-background-container');

                bgContainer.selectAll(".c9-background-container")
                    .data(datum.value).enter()
                    .append("rect")
                    .attr("class", "c9-timeline-background-bar")
                    .attr("x", 0)
                    .attr("width", width)
                    .attr("y", barYAxis - self.options.itemMargin / 2)
                    .attr("height", self.options.itemHeight + self.options.itemMargin)
                    .attr("fill", Helper.isArray(self.options.backgroundColor) ? self.options.backgroundColor[index % (self.maxStack - 1)] : self.options.backgroundColor);
            }

            if (self.options.striped) { 
                var bgContainer = self.body.append("g")
                                    .attr('class', 'c9-timeline-chart c9-stripe-background-container');
                bgContainer.selectAll(".c9-stripe-background-container")
                    .data(datum.value).enter()
                    .insert("rect")
                    .attr("class", "c9-timeline-stripe-background-bar")
                    .attr("x", 0)
                    .attr("width", width)
                    .attr("y", barYAxis - self.options.itemMargin / 2)
                    .attr("height", self.options.itemHeight + self.options.itemMargin)
                    .attr("fill", index % 2 ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)");
            }

            //draw item
            var itemContainer = self.body.append("g")
                                    .attr('class', 'c9-timeline-chart c9-rect-container')
                                    .attr("clip-path", "url(#clip)");

            itemContainer.selectAll(".c9-rect-container")
                .data(datum.value).enter()
                .append(function (d, i) {
                    return document.createElementNS(d3.ns.prefix.svg, d.end != "Invalid Date" ? "rect" : "circle");
                })
                .attr('class', 'c9-timeline-custom-rect')
                .attr("x", function(d, i) { return self.getXPos(d,i,scale); })
                .attr("y", function(d, i) { return self.getStackPosition(d, i, index); })
                .attr("width", function (d, i) {
                    return (d.end - d.start) * scale;
                })
                .attr("cy", function (d, i) {
                    return self.getStackPosition(d, i, index) + self.options.itemHeight / 2;
                })
                .attr("cx", function(d, i) { return self.getXPos(d,i,scale); })
                .attr("r", self.options.itemHeight / 2)
                .attr("height", self.options.itemHeight)
                .style("fill", color(index));

            if (self.options.separatorColor && index < self.maxStack - 1) {
                var lineYAxis = ( self.options.itemHeight + self.options.itemMargin / 2 + (self.options.itemHeight + self.options.itemMargin) * stackList[index]);
                self.body.append("svg:line")
                  .attr("class", "c9-timeline-row-separator")
                  .attr("x1", 0)
                  .attr("x2", width)
                  .attr("y1", lineYAxis)
                  .attr("y2", lineYAxis)
                  .attr("stroke-width", 3)
                  .attr("stroke", Helper.isArray(self.options.separatorColor) ? self.options.separatorColor[index % (self.maxStack - 1)] : self.options.separatorColor);
            }

            //draw the label left side item
            if (!Helper.isEmpty(datum.name) && datum.name != "") { 
                var rowsDown = self.margin.top + (self.options.itemHeight + self.options.itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + self.options.itemHeight * 0.75;

                labelContainer.append("text")
                    .attr("class", "c9-timeline-label")
                    .attr("transform", "translate(" + self.options.labelMargin + "," + rowsDown + ")")
                    .text(datum.name);
            }
            //draw icon
            else if (!Helper.isEmpty(datum.icon) && datum.icon != "") {
                labelContainer.append("image")
                    .attr("class", "c9-timeline-label")
                    .attr("transform", "translate("+ self.options.labelMargin +","+ (self.margin.top + (self.options.itemHeight + self.options.itemMargin) * stackList[index])+")")
                    .attr("xlink:href", datum.icon)
                    .attr("width", self.options.itemHeight)
                    .attr("height", self.options.itemHeight);
            }
        });

        self.updateInteraction();
    }

    /**
     * Update sub chart
     */
    updateSubChart(data) {
        var self = this;

        if (self.options.subchart.show) {
            var width = self.width - self.margin.left - self.margin.right,
                height = self.height - self.margin.top - self.margin.bottom;

            // Set actual size for chart after initialization
            var chartBox = self.body.node().getBBox();
            // self.actualWidth = chartBox.width - 4 * self.point.radius;
            self.actualHeight = chartBox.height;

            /*----------  Sub Chart  ----------*/
            
            self.subChartWidth = width,
            self.subChartHeight = self.options.subchart.height,
            self.subChartMargin = {
                'top': self.actualHeight + 100,
                'left': self.margin.left
            };

            self.subChartX = d3.time.scale().range([0, self.subChartWidth]);

            self.subChartX.domain([self.options.starting, self.options.ending]);

            self.subChartXAxis = d3.svg.axis()
                            .scale(self.subChartX)
                            .orient("bottom");

            self.brush = d3.svg.brush()
                            .x(self.subChartX)
                            .on("brush", function() {
                                // Update axis
                                self.x.domain(self.brush.empty() ? self.subChartX.domain() : self.brush.extent());
                                self.axis.update(self.x, self.y, 500);
                                var scale = width / (self.options.ending - self.options.starting);
                                // Update main path of Line Chart
                                self.body.selectAll(".c9-timeline-custom-rect")
                                        .attr("x", function(d, i) { return self.x(d.start); });
                                        // .attr("x", function(d, i) { return self.getXPos(d,i, scale); });
                                        // .attr("y", function(d, i) { return self.getStackPosition(d,i,stackList, index); })
                                        // .attr("cx", function(d, i) { return self.getXPos(d,i, scale); })
                                        // .attr("cy", function (d, i) {
                                        //     return self.getStackPosition(d, i, stackList, index) + self.options.itemHeight / 2;
                                        // });
                            });

            var scale = width / (self.options.ending - self.options.starting);

            var color = self.colorRange;

            self.svg.attr('height', self.height + self.subChartHeight);

            self.svg.selectAll(".c9-subchart-custom").remove();
            self.svg.selectAll(".c9-subchart-custom .c9-subchart-axis").remove();

            var subChart = self.svg.append("g")
                            .attr("class", "c9-subchart-custom")
                            // .attr("clip-path", "url(#clip)")
                            .attr("transform", "translate(" + self.subChartMargin.left + "," + self.subChartMargin.top + ")");

            var itemContainer = subChart.append('g')
                                    .attr('class', 'c9-subchart-custom c9-subchart-timeline-container');
                                    // .attr("clip-path", "url(#clip)");

            data.forEach(function(datum, index) {
                if (!datum.enable) return;

                itemContainer.selectAll(".c9-subchart-timeline-container")
                    .data(datum.value).enter()
                    .append(function (d, i) {
                        return document.createElementNS(d3.ns.prefix.svg, d.end != "Invalid Date" ? "rect" : "circle");
                    })
                    .attr('class', 'c9-timeline-custom-rect')
                    // .attr("x", function(d, i) { return self.getXPos(d,i, scale); })
                    .attr("x", function(d, i) { return self.subChartX(d.start); })
                    .attr("y", function(d, i) { return self.getStackPosition(d, i , index); })
                    // .attr("width", function (d, i) {
                    //     return (d.end - d.start) * scale;
                    // })
                    .attr("width", function (d, i) {
                        return self.subChartX(d.end) - self.subChartX(d.start);
                    })
                    .attr("cy", function (d, i) {
                        return self.getStackPosition(d, i, index) + self.options.itemHeight / 2;
                    })
                    // .attr("cx", function(d, i) { return self.getXPos(d,i, scale); })
                    .attr("cx", function(d, i) { return self.subChartX(d.start); })
                    .attr("r", self.options.itemHeight / 2)
                    .attr("height", self.options.itemHeight / 2)
                    .style("fill", color(index));
            });
            

            itemContainer.append("g")
                .attr("class", "c9-subchart-axis")
                .attr("transform", "translate(0," + self.subChartHeight + ")")
                .call(self.subChartXAxis);

            //append the brush for the selection of subsection  
            itemContainer.append("g")
                .attr("class", "c9-subchart-brush")
                .call(self.brush)
                .selectAll("rect")
                .attr("height", self.subChartHeight);

        }
    }

    /**
     * Select all path as type RECT in Timeline Chart via its CLASS
     */
    selectAllRect() {
        var self = this;

        return self.body
                    .selectAll('.c9-timeline-custom-rect');
    }

    /**
     * Update Interaction: Hover
     * @return {} 
     */
    updateInteraction() {
        var self    = this,
            selector= self.selectAllRect(),
            hoverOptions        = self.hover.options,
            hoverEnable         = self.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback     = self.click.callback;

        var tooltip = new Tooltip(self.options.tooltip);

        // Main Event Dispatch for paths in pie chart
        self.eventFactory = {
            'click': function(d, i) {
                if (Helper.isFunction(onClickCallback)) {
                    onClickCallback.call(this, d);
                }
            },

            'mouseover': function(d, i) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOverCallback)) {
                    onMouseOverCallback.call(this, d);
                }

                d3.select(this).style("fill", function (d, i) { return self.getLightenColor(d.color || color(i)); });

                tooltip.draw(d, self, 'mouseover');
            },
            
            'mouseout': function(d, i) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, d);
                }

                d3.select(this).style("fill", function (d, i) { return d.color || color(i); });

                tooltip.draw(d, self, 'mouseout');
            }
        };

        selector.on(self.eventFactory);
    }

    getXPos(d, i, scale) {
        var self = this;
        return (d.start - self.options.starting) * scale;
    }

    getStackPosition(d, i, index) {
        var self = this;

        var stackList = self.stackList;
        
        if (self.options.stack) {
            return (self.options.itemHeight + self.options.itemMargin) * stackList[index];
        }
        return 0;
    }
    
    /*=====  End of Main Functions  ======*/

    /*========================================
    =            User's Functions            =
    ========================================*/

    /**
     * Custom Event Listener
     * @param  {[type]}   eventType [description]
     * @param  {Function} callback  [description]
     * @return {[type]}             [description]
     */
    on(eventType, callback) {
        super.on(eventType, callback);
        
        var self = this;
        var selector    = self.selectAllRect();

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
    
    /**
     * Main draw function
     */
    draw() {
        super.draw();

        var self = this;
        
        self.updateConfig(self.config, function(data) {
            var axis    = new Axis(self.options.axis, self, self.width - self.margin.left - self.margin.right, (self.options.itemHeight + self.options.itemMargin) * self.maxStack);
            var title   = new Title(self.options.title, self);  
            var legend  = new Legend(self.options.legend, self, self.colorRange, data);

            self.axis = axis;
            self.title = title;
            self.legend = legend;

            // Draw title
            self.title.draw();

            // Draw axis
            self.axis.draw();

            self.update(data);
            self.updateSubChart(data);
            self.updateInteraction();
        });
    }

    /**
     * Set option via stand-alone function
     * @param {[type]} key   [description]
     * @param {[type]} value [description]
     */
    setOption(key, value) {
        super.setOption(key, value);

        var self = this;

        Helper.set(key, value, self.options);

        self.updateConfig(self.options);
    }

    /**
     * Update chart based on new data with optional dataConfig
     * @param  {[type]} data       [description]
     * @param  {[type]} dataConfig [description]
     */
    updateData(newData, newDataConfig) {
        var self = this;

        var newCfg = {};

        if (!Helper.isEmpty(newDataConfig)) {

            newCfg.data = {
                plain: newData,
                keys: newDataConfig,
            };

        } else {

            newCfg.data = {
                plain: newData,
            };

        }
        
        // Update chart
        self.updateDataConfig(newCfg, function(data) {
            self.update(self.dataTarget);
            self.updateSubChart(self.dataTarget);

            // Update Axis
            self.axis.update(self.x, self.y, 100);
        });
    }
    /*=====  End of User's Functions  ======*/
    
    
    
}

