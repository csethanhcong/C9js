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
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    updateConfig() {
        var self = this;

        var subChartOptions = self.options.subchart;

        var color = self.colorRange;

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
        var scale = width / (self.ending - self.starting);

        self.drawMain(self.dataTarget, width, stackList, scale, color);

        // Draw axis before adding brushing
        self.options.axis.starting = self.starting;
        self.options.axis.ending = self.ending;

        var axis    = new Axis(self.options.axis, self.body, self.dataTarget, self.width - self.margin.left - self.margin.right, (self.itemHeight + self.itemMargin) * self.maxStack, null, null);

        /*----------  Sub Chart  ----------*/
        
        // var subChartWidth = width,
        //     subChartHeight = self.options.subchart.height,
        //     subChartMargin = {
        //         'top': self.actualHeight + 100,
        //         'left': self.margin.left
        //     };

        // var x2 = d3.time.scale().range([0, subChartWidth]);

        // x2.domain([self.options.starting, self.options.ending]);

        // var xAxis2 = d3.svg.axis()
        //                 .scale(x2)
        //                 .orient("bottom");

        // var brush = d3.svg.brush()
        //                 .x(x2)
        //                 .on("brush", brushed);

        // var subChartAreaGen = d3.svg.area()
        //                 .x(function(d) { return x2(d.valueX) })
        //                 .y0(function(d) { return y2(d.valueY) })
        //                 .y1(subChartHeight);

        // /*----------  Draw subchart  ----------*/
        // // self.updateSubChart(subChartHeight, subChartMargin, subChartAreaGen, xAxis2, brush, self.dataTarget);
        // /*----------  End Draw sub chart  ----------*/
        

        // function brushed() {
        //     // Update axis
        //     self.x.domain(brush.empty() ? x2.domain() : brush.extent());
        //     axis.update(self.x, self.y, 500);

        //     // Update main path of Line Chart
        //     if (self.area.show) {
        //         self.body.selectAll("path.c9-chart-line.c9-path-area-custom")
        //             .attr("d",  function(d) { return areaGen(d.value) });
        //     }
        //     self.body.selectAll("path.c9-chart-line.c9-path-line-custom")
        //             .attr("d",  function(d) { return lineGen(d.value) });

        //     if (self.point.show) {
        //         self.body.selectAll("circle.c9-chart-line.c9-circle-custom")
        //                 .attr("cx", function(d) { return self.x(d.valueX); })
        //                 .attr("cy", function(d) { return self.y(d.valueY); });
        //     }
        // }

        /*----------  End of Sub Chart  ----------*/
    }

    draw() {
        var self = this;
        
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);    
        var legend  = new Legend(self.options.legend, self.body, self.colorRange, self.dataTarget);

        self.updateInteraction();
    }

    drawMain(data, width, stackList, scale, color) {
        var self = this;

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

        data.forEach( function(datum, index) {
            //draw background
            if (self.backgroundColor) { 
                var barYAxis = ((self.itemHeight + self.itemMargin) * stackList[index]);
                var bgContainer = self.body.append("g")
                                    .attr('class', 'c9-timeline-chart c9-background-container');

                bgContainer.selectAll("g")
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
                var barYAxis = ((self.itemHeight + self.itemMargin) * stackList[index]);
                self.body.selectAll("g")
                    .data(datum.value).enter()
                    .insert("rect")
                    .attr("class", "c9-timeline-background-bar")
                    .attr("x", 0)
                    .attr("width", width)
                    .attr("y", barYAxis - self.itemMargin / 2)
                    .attr("height", self.itemHeight + self.itemMargin)
                    .attr("fill", index % 2 ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)");
            }

            //draw item
            self.body.selectAll("g")
                .data(datum.value).enter()
                .append(function (d, i) {
                    return document.createElementNS(d3.ns.prefix.svg, d.end != "Invalid Date" ? "rect" : "circle");
                })
                .attr('class', 'c9-timeline-custom-rect')
                .attr("x", function(d, i) { getXPos(d,i); })
                .attr("y", function(d, i) { getStackPosition(d,i ); })
                .attr("width", function (d, i) {
                    return (d.end - d.start) * scale;
                })
                .attr("cy", function (d, i) {
                    return getStackPosition(d, i) + self.itemHeight / 2;
                })
                .attr("cx", function(d, i) { getXPos(d,i); })
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

                d3.select(self.body[0][0].parentNode).append("text")
                    .attr("class", "c9-timeline-label")
                    .attr("transform", "translate(" + self.labelMargin + "," + rowsDown + ")")
                    .text(datum.name);
            }
            //draw icon
            else if (!Helper.isEmpty(datum.icon) && datum.icon != "") {
                d3.select(self.body[0][0].parentNode).append("image")
                    .attr("class", "c9-timeline-label")
                    .attr("transform", "translate("+ self.labelMargin +","+ (self.margin.top + (self.itemHeight + self.itemMargin) * stackList[index])+")")
                    .attr("xlink:href", datum.icon)
                    .attr("width", self.itemHeight)
                    .attr("height", self.itemHeight);
            }

            function getStackPosition(d, i) {
                if (self.stack) {
                    return (self.itemHeight + self.itemMargin) * stackList[index];
                }
                return 0;
            }

            // function getStackTextPosition(d, i) {
            //     if (self.stack) {
            //         return (self.itemHeight + self.itemMargin) * stackList[index] + self.itemHeight * 0.75;
            //     }
            //     return self.itemHeight * 0.75;
            // }

            function getXPos(d, i) {
                return (d.start - self.starting) * scale;
            }

            // function getXTextPos(d, i) {
            //     return (d.start - self.starting) * scale + 5;
            // }
        });
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
    
    /*=====  End of Main Functions  ======*/
    
    
}

