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

        var config = {
            rowSeparator: "rgb(154, 154, 154)",
            backgroundColor: null,
            starting: 0,
            ending: 0,
            stack: false, //test
            // rotateTicks: false,
            itemHeight: 25,
            itemMargin: 20,
            labelMargin: 20,
            striped: null
        };

        self.body.type        = "timeline";
        self._stack             = options.stack || config.stack;
        self._starting          = options.starting || config.starting;
        self._ending            = options.ending || config.ending;
        self._rowSeparator      = options.rowSeparator || config.rowSeparator;
        self._backgroundColor   = options.backgroundColor || config.backgroundColor;
        self._itemHeight        = options.itemHeight || config.itemHeight;
        self._itemMargin        = options.itemMargin || config.itemMargin;
        self._labelMargin       = options.labelMargin || config.labelMargin;
        self._maxStack          = 1;
        self._striped           = options.striped || config.striped;

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption);
        self.dataTarget = da.getDataTarget("timeline");

        self.updateConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get stack() {
        return this._stack;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    get rowSeparator() {
        return this._rowSeparator;
    }

    get starting() {
        return this._starting;
    }

    get ending() {
        return this._ending;
    }

    get itemHeight() {
        return this._itemHeight;
    }

    get itemMargin() {
        return this._itemMargin;
    }

    get labelMargin() {
        return this._labelMargin;
    }

    get maxStack() {
        return this._maxStack;
    }

    get striped() {
        return this._striped;
    }

    get x() {
        return this._x;
    }

    get subChartX() {
        return this._subChartX;
    }

    get subChartXAxis() {
        return this._subChartXAxis;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set stack(arg) {
        if (arg) {
            this._stacked = arg;
        }
    }

    set backgroundColor(arg) {
        if (arg) {
            this._backgroundColor = arg;
        }
    }

    set rowSeparator(arg) {
        if (arg) {
            this._rowSeparator = arg;
        }
    }

    set starting(arg) {
        if (arg) {
            this._starting = arg;
        }
    }

    set ending(arg) {
        if (arg) {
            this._ending = arg;
        }
    }

    set itemHeight(arg) {
        if (arg) {
            this._itemHeight = arg;
        }
    }

    set itemMargin(arg) {
        if (arg) {
            this._itemMargin = arg;
        }
    }

    set labelMargin(arg) {
        if (arg) {
            this._labelMargin = arg;
        }
    }

    set maxStack(arg) {
        if (arg) {
            this._maxStack = arg;
        }
    }

    set striped(arg) {
        if (arg) {
            this._striped = arg;
        }
    }

    set x(arg) {
        if (arg) {
            this._x = arg;
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
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    updateConfig() {
        var self = this;

        var subChartOptions = self.options.subchart;

        var stackList = {},
            maxStack = 0,
            minTime = 0,
            maxTime = 0,
            width = self.width - self.margin.left - self.margin.right,
            height = self.height - self.margin.top - self.margin.bottom;

        var hoverOptions        = self.hover.options,
            hoverEnable         = self.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback     = self.click.callback;

        // Update Tooltip options for Timeline Chart
        self.options.tooltip = {
            show: true,
            position: 'left', // [top, right, bottom, left]
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            fontColor: '#fff',
            fontSize: '11px',
            format: null
        };

        var tooltip = new Tooltip(self.options.tooltip);

        // Main Event Dispatch for paths in pie chart
        self._eventFactory = {
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

                tooltip.draw(d, self, 'mouseover');
            },
            
            'mouseout': function(d, i) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, d);
                }

                tooltip.draw(d, self, 'mouseout');
            }
        };

        // count number of stack and calculate min time, max time from data
        if (self.stack || self.ending === 0 || self.starting === 0) {
            
            self.dataTarget.forEach(function (datum, index) {

                if (self.stack && Object.keys(stackList).indexOf(index) == -1) {
                    stackList[index] = maxStack;
                    maxStack++;
                }

                datum.value.forEach(function (time, i) {
                    if(self.starting === 0)
                        if (time.start < minTime || minTime === 0)
                            minTime = time.start;
                    if(self.ending === 0) {
                        if (time.start > maxTime)
                            maxTime = time.start;
                        if (time.end > maxTime)
                            maxTime = time.end;
                    }
                });
            });

            if (self.ending === 0) {
              self.ending = maxTime;
            }
            if (self.starting === 0) {
              self.starting = minTime;
            }
        }

        self.maxStack = maxStack;

        self.update(self.dataTarget, stackList);

        // Draw axis before adding brushing
        self.options.axis.starting = self.starting;
        self.options.axis.ending = self.ending;

        var x = d3.time.scale()
                .domain([self.starting, self.ending])
                .range([0, self.width]);

        self._x = x;

        var axis    = new Axis(self.options.axis, self.body, self.dataTarget, self.width - self.margin.left - self.margin.right, (self.itemHeight + self.itemMargin) * self.maxStack, null, null);

        // Set actual size for chart after initialization
        var chartBox = self.body.node().getBBox();
        // self.actualWidth = chartBox.width - 4 * self.point.radius;
        self.actualHeight = chartBox.height;

        /*----------  Sub Chart  ----------*/
        
        var subChartWidth = width,
            subChartHeight = self.options.subchart.height,
            subChartMargin = {
                'top': self.actualHeight + 100,
                'left': self.margin.left
            };

        self.subChartX = d3.time.scale().range([0, subChartWidth]);

        self.subChartX.domain([self.starting, self.ending]);

        self.subChartXAxis = d3.svg.axis()
                        .scale(self.subChartX)
                        .orient("bottom");

        var brush = d3.svg.brush()
                        .x(self.subChartX)
                        .on("brush", brushed);

        /*----------  Draw subchart  ----------*/
        self.updateSubChart(subChartHeight, subChartMargin, stackList, self.subChartXAxis, brush, self.dataTarget);
        /*----------  End Draw sub chart  ----------*/
        

        function brushed() {
            // Update axis
            self.x.domain(brush.empty() ? self.subChartX.domain() : brush.extent());
            axis.update(self.x, self.y, 500);
            var scale = width / (self.ending - self.starting);
            // Update main path of Line Chart
            self.body.selectAll(".c9-timeline-custom-rect")
                    .attr("x", function(d, i) { console.log(self.x(d.start));return self.x(d.start); });
                    // .attr("x", function(d, i) { return self.getXPos(d,i, scale); });
                    // .attr("y", function(d, i) { return self.getStackPosition(d,i,stackList, index); })
                    // .attr("cx", function(d, i) { return self.getXPos(d,i, scale); })
                    // .attr("cy", function (d, i) {
                    //     return self.getStackPosition(d, i, stackList, index) + self.itemHeight / 2;
                    // });
        }

        /*----------  End of Sub Chart  ----------*/
    }

    draw() {
        var self = this;
        
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);    
        var legend  = new Legend(self.options.legend, self.body, self.colorRange, self.dataTarget);

        self.updateInteraction();
    }

    update(data, stackList) {
        var self = this;

        var width = self.width - self.margin.left - self.margin.right,
            height = self.height - self.margin.top - self.margin.bottom;

        var scale = width / (self.ending - self.starting);

        var color = self.colorRange;

        self.body.selectAll(".c9-timeline-border-bar").data([]).exit().remove();
        self.body.selectAll(".c9-timeline-chart.c9-background-container").data([]).exit().remove();
        self.body.selectAll(".c9-timeline-chart.c9-stripe-background-container").data([]).exit().remove();
        self.body.selectAll(".c9-timeline-chart.c9-rect-container").data([]).exit().remove();

        // Update clip-parth
        self.svg.select('#clip').select('rect').attr('height', (self.itemHeight + self.itemMargin) * data.length);

        //draw border
        self.body.append("rect")
            .attr("class", "c9-timeline-border-bar")
            .attr("x", 0)
            .attr("width", width)
            .attr("y", 0 - self.itemMargin / 2)
            .attr("height", (self.itemHeight + self.itemMargin) * data.length)
            .attr("stroke", "rgb(154, 154, 154)")
            .attr("stroke-width", 2)
            .attr("fill", "none");



        var labelContainer = self.svg.append("g")
                                .attr('class', 'c9-timeline-chart c9-label-container');

        data.forEach( function(datum, index) {
            var barYAxis = ((self.itemHeight + self.itemMargin) * stackList[index]);
            //draw background
            if (self.backgroundColor) { 
                var bgContainer = self.body.append("g")
                                    .attr('class', 'c9-timeline-chart c9-background-container');

                bgContainer.selectAll(".c9-background-container")
                    .data(datum.value).enter()
                    .append("rect")
                    .attr("class", "c9-timeline-background-bar")
                    .attr("x", 0)
                    .attr("width", width)
                    .attr("y", barYAxis - self.itemMargin / 2)
                    .attr("height", self.itemHeight + self.itemMargin)
                    .attr("fill", Helper.isArray(self.backgroundColor) ? self.backgroundColor[index % (self.maxStack - 1)] : self.backgroundColor);
            }

            if (self.striped) { 
                var bgContainer = self.body.append("g")
                                    .attr('class', 'c9-timeline-chart c9-stripe-background-container');
                bgContainer.selectAll(".c9-stripe-background-container")
                    .data(datum.value).enter()
                    .insert("rect")
                    .attr("class", "c9-timeline-stripe-background-bar")
                    .attr("x", 0)
                    .attr("width", width)
                    .attr("y", barYAxis - self.itemMargin / 2)
                    .attr("height", self.itemHeight + self.itemMargin)
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
                .attr("y", function(d, i) { return self.getStackPosition(d, i, stackList, index); })
                .attr("width", function (d, i) {
                    return (d.end - d.start) * scale;
                })
                .attr("cy", function (d, i) {
                    return self.getStackPosition(d, i, stackList, index) + self.itemHeight / 2;
                })
                .attr("cx", function(d, i) { return self.getXPos(d,i,scale); })
                .attr("r", self.itemHeight / 2)
                .attr("height", self.itemHeight)
                .style("fill", color(index));

            if (self.rowSeparator && index < self.maxStack - 1) {
                var lineYAxis = ( self.itemHeight + self.itemMargin / 2 + (self.itemHeight + self.itemMargin) * stackList[index]);
                self.body.append("svg:line")
                  .attr("class", "c9-timeline-row-separator")
                  .attr("x1", 0)
                  .attr("x2", width)
                  .attr("y1", lineYAxis)
                  .attr("y2", lineYAxis)
                  .attr("stroke-width", 3)
                  .attr("stroke", Helper.isArray(self.rowSeparator) ? self.rowSeparator[index % (self.maxStack - 1)] : self.rowSeparator);
            }

            //draw the label left side item
            if (!Helper.isEmpty(datum.name) && datum.name != "") { 
                var rowsDown = self.margin.top + (self.itemHeight + self.itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + self.itemHeight * 0.75;

                labelContainer.append("text")
                    .attr("class", "c9-timeline-label")
                    .attr("transform", "translate(" + self.labelMargin + "," + rowsDown + ")")
                    .text(datum.name);
            }
            //draw icon
            else if (!Helper.isEmpty(datum.icon) && datum.icon != "") {
                labelContainer.append("image")
                    .attr("class", "c9-timeline-label")
                    .attr("transform", "translate("+ self.labelMargin +","+ (self.margin.top + (self.itemHeight + self.itemMargin) * stackList[index])+")")
                    .attr("xlink:href", datum.icon)
                    .attr("width", self.itemHeight)
                    .attr("height", self.itemHeight);
            }

            

            // function getStackTextPosition(d, i) {
            //     if (self.stack) {
            //         return (self.itemHeight + self.itemMargin) * stackList[index] + self.itemHeight * 0.75;
            //     }
            //     return self.itemHeight * 0.75;
            // }

            

            // function getXTextPos(d, i) {
            //     return (d.start - self.starting) * scale + 5;
            // }
        });
    }

    /**
     * Update sub chart
     */
    updateSubChart(subChartHeight, subChartMargin, stackList, subChartXAxis, brush, data) {
        var self = this;

        var width = self.width - self.margin.left - self.margin.right,
            height = self.height - self.margin.top - self.margin.bottom;

        var scale = width / (self.ending - self.starting);

        var color = self.colorRange;

        if (self.options.subchart.show) {

            self.svg.attr('height', self.height + subChartHeight);

            self.svg.selectAll(".c9-subchart-custom").remove();
            self.svg.selectAll(".c9-subchart-custom .c9-subchart-axis").remove();

            var subChart = self.svg.append("g")
                            .attr("class", "c9-subchart-custom")
                            .attr("transform", "translate(" + subChartMargin.left + "," + subChartMargin.top + ")");

            var itemContainer = subChart.append('g')
                                    .attr('class', 'c9-subchart-custom c9-subchart-timeline-container')
                                    .attr("clip-path", "url(#clip)");

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
                    .attr("y", function(d, i) { return self.getStackPosition(d,i,stackList, index); })
                    // .attr("width", function (d, i) {
                    //     return (d.end - d.start) * scale;
                    // })
                    .attr("width", function (d, i) {
                        return self.subChartX(d.end) - self.subChartX(d.start);
                    })
                    .attr("cy", function (d, i) {
                        return self.getStackPosition(d, i, stackList, index) + self.itemHeight / 2;
                    })
                    // .attr("cx", function(d, i) { return self.getXPos(d,i, scale); })
                    .attr("cx", function(d, i) { return self.subChartX(d.start); })
                    .attr("r", self.itemHeight / 2)
                    .attr("height", self.itemHeight / 2)
                    .style("fill", color(index));
            });
            

            itemContainer.append("g")
                .attr("class", "c9-subchart-axis")
                .attr("transform", "translate(0," + subChartHeight + ")")
                .call(subChartXAxis);

            //append the brush for the selection of subsection  
            itemContainer.append("g")
                .attr("class", "c9-subchart-brush")
                .call(brush)
                .selectAll("rect")
                .attr("height", subChartHeight);

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
            selector= self.selectAllRect();

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

    getXPos(d, i, scale) {
        var self = this;
        return (d.start - self.starting) * scale;
    }

    getStackPosition(d, i, stackList, index) {
        var self = this;
        if (self.stack) {
            return (self.itemHeight + self.itemMargin) * stackList[index];
        }
        return 0;
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}

