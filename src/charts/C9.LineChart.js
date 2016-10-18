import Chart from './C9.Chart';

import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Table from './utils/C9.Table';
import Tooltip from './utils/C9.Tooltip';

import Helper from '../helper/C9.Helper';
import DataAdapter from '../helper/C9.DataAdapter';

export default class LineChart extends Chart {
    constructor(options) {
        super(options);

        var self    = this;

        var config  = {
            point: {
                show: true,
                fill: "steelblue",
                stroke: "#d26b5f",
                'stroke-width': 2,
                opacity: 1.0,
                radius: 5,
            },
            area: {
                show: true
            },
            line: {
                style: "solid", // "dash", "dot"
                width: 2
            },
            interpolate: "linear", // refer: https://www.dashingd3js.com/svg-paths-and-d3js
        };

        self._point         = Helper.merge(options.point, config.point);
        self._area          = Helper.merge(options.area, config.area);
        self._line          = Helper.merge(options.line, config.line);
        self._interpolate   = options.interpolate           ||  config.interpolate;

        self.body.type = "line";
        self._bisectDate = d3.bisector(function(d) { return d.valueX; }).left;;

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        self._da = new DataAdapter(dataOption);
        self.dataTarget     = self._da.getDataTarget("line");

        self._isTimeDomain = self._da.timeFormat;

        self.updateConfig();

    }

    /*==============================
    =            Getter            =
    ==============================*/

    get point() {
        return this._point;
    }

    get area() {
        return this._area;
    }

    get line() {
        return this._line;
    }

    get interpolate() {
        return this._interpolate;
    }
    
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get isTimeDomain() {
        return this._isTimeDomain;
    }

    get da() {
        return this._da;
    }

    get bisectDate() {
        return this._bisectDate;
    }

    get hoverLine() {
        return this._hoverLine;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/

    set point(arg) {
        if (arg) {
            this._point = arg;
        }
    }

    set area(arg) {
        if (arg) {
            this._area = arg;
        }
    }

    set line(arg) {
        if (arg) {
            this._line = arg;
        }
    }

    set interpolate(arg) {
        if (arg) {
            this._interpolate = arg;
        }
    }

    set x(arg) {
        if (arg) {
            this._x = arg;
        }
    }

    set y(arg) {
        if (arg) {
            this._y = arg;
        }
    }

    set isTimeDomain(arg) {
        if (arg) {
            this._isTimeDomain = arg;
        }
    }

    set da(arg) {
        if (arg) {
            this._da = arg;
        }
    }

    set bisectDate(arg) {
        if (arg) {
            this._bisectDate = arg;
        }
    }

    set hoverLine(arg) {
        if (arg) {
            this._hoverLine = arg;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    /**
     * First init Line Chart
     */
    updateConfig() {
        var self = this;

        var da = self._da;

        var width   = self.width - self.margin.left - self.margin.right,
            height  = self.height - self.margin.top - self.margin.bottom;

        var x = (self._isTimeDomain) ? d3.time.scale().range([0, width]) : d3.scale.linear().range([0, width]),
            y = d3.scale.linear().range([height, 0]);

        var valueXArray = d3.merge(self.dataTarget.map(function(data) {
            return data.value.map(function(d) {
                return d.valueX;
            })
        }));

        var valueYArray = d3.merge(self.dataTarget.map(function(data) {
            return data.value.map(function(d) {
                return d.valueY;
            })
        }));

        x.domain(d3.extent(valueXArray));

        y.domain(d3.extent(valueYArray));

        // Update domain if all values positive / negative
        if (y.domain()[0] > 0 && y.domain()[1] > 0) {
            y.domain([0, y.domain()[1]]);
        } else if (y.domain()[0] < 0 && y.domain()[1] < 0) {
            y.domain([y.domain()[0], 0]);
        }



        self._x = x;
        self._y = y;

        var lineGen = d3.svg.line()
                        .x(function(d) { return x(d.valueX); })
                        .y(function(d) { return y(d.valueY); })
                        .interpolate(self.interpolate);

        var areaGen = d3.svg.area()
                .x(function(d) { return x(d.valueX); })
                .y0(function(d) { return y(d.valueY); })
                .y1(height)
                .interpolate(self.interpolate);

        self.dataTarget.forEach(function(d,i) {
            if (self.area.show) {
                self.body.append('path')
                    .attr('class', 'c9-chart-line c9-path-area-custom')
                    .attr('d', areaGen(d.value))
                    .attr('data-ref', 'c9-'+d['data-ref'])
                    .style('fill', d.color)
                    .style('stroke', 'none')
                    .style('opacity', '0.1');
            }

            self.body
                .append('path')
                .attr('class', 'c9-chart-line c9-path-line-custom')
                .attr('d', lineGen(d.value))
                .attr('data-ref', 'c9-'+d['data-ref'])
                .style('stroke', d.color)
                .style('stroke-dasharray', function() {
                    console.log(self.getLineStyle());
                    return self.getLineStyle();
                })
                .style('stroke-width', self.line.width)
                .style('fill', 'none');

            if (self.point.show) {
                self.body.selectAll("dot")
                    .data(d.value)
                    .enter()
                    .append("circle")
                    .attr('class', 'c9-chart-line c9-circle-custom')
                    .attr("r", self.point.radius)
                    .attr("cx", function(_d) { return x(_d.valueX); })
                    .attr("cy", function(_d) { return y(_d.valueY); })
                    .attr("data-ref", function (d) { return d["data-ref"]; })
                    .style("fill", self.point.fill) 
                    .style("stroke", self.point.stroke)
                    .style("stroke-width", self.point['stroke-width'])
                    .style("opacity", self.point.opacity);
            }

        });

        // Draw axis before rect-overlay
        var axis    = new Axis(self.options, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self._x, self._y);

        // Set actual size for chart after initialization
        var chartBox = self.body.node().getBBox();
        self.actualWidth = chartBox.width - 4 * self.point.radius;
        self.actualHeight = chartBox.height;


        //** Create a invisible rect for mouse tracking
        self.body.append('rect')
            .attr('class', 'c9-chart-line c9-rect-overlay')
            // .attr('width', self.actualWidth)
            // .attr('height', self.actualHeight)
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all');



        //** Hover line & invisible rect

        //** Add the line to the group
        self.hoverLine = self.body.append('g')
            .attr('class', 'c9-chart-line c9-comparator-line')
            .append('line')
            .style('stroke', 'grey')
            .style('stroke-opacity', 0);

        self.hoverCircle = self.hoverLine.append('circle')
                .attr('class', 'c9-chart-line c9-comparator-line')
                .attr('r', self.point.radius);
    }

    /**
     * Main draw function of Line Chart
     */
    draw() {
        var self = this;

        var axis    = new Axis(self.options.axis, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self._x, self._y);
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options.legend, self.body, self.dataTarget);

        // Draw legend
        legend.draw();
        legend.updateInteractionForLineChart(self);

        self.updateInteraction();
    }

    /**
     * Select all circle as type CIRCLE in Line Chart via its CLASS
     */
    selectAllCircle() {
        var self = this;

        return self.body
                .selectAll('circle.c9-chart-line.c9-circle-custom');
    }

    /**
     * Select all rect as type RECT in Line Chart via its CLASS
     */
    selectRectLayer() {
        var self = this;

        return d3
                .selectAll('svg rect.c9-chart-line.c9-rect-overlay');
    }

    /**
     * Update Interaction: Hover
     */
    updateInteraction() {
        var self = this,
            hoverEnable     = self.hover.enable,
            hoverOptions    = self.hover.options,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onMouseMoveCallback  = hoverOptions.onMouseMove.callback,
            onClickCallback  = self.click.callback;

        var tooltip = new Tooltip(self.options.tooltip);

        var selector        = self.selectRectLayer();

        // Update Event Factory
        self.eventFactory = {
            // 'click': function(d) {
            //     if (Helper.isFunction(onClickCallback)) {
            //         onClickCallback.call(this, d);
            //     }
            // },
            // 'mouseover': function(d) {
            //     if (!hoverEnable) return;
                
            //     if (Helper.isFunction(onMouseOverCallback)) {
            //         onMouseOverCallback.call(this, d);
            //     }

            //     // tooltip.draw(d, self, 'mouseover');
            // },
            'mouseout': function(d) {
                if (!hoverEnable) return;

                // if (Helper.isFunction(onMouseOutCallback)) {
                //     onMouseOutCallback.call(this, d);
                // }

                self.hoverLine.style('stroke-opacity', 0);

                // Remove circle style before
                self.selectAllCircle()[0].forEach(function(circle) {
                    d3.select(circle)
                        .style('fill', self.point.fill)
                        .style('fill-opacity', self.point.opacity);
                }); 

                tooltip.draw(d, self, 'mouseout');
            },
            'mousemove': function(d) {
                if (!hoverEnable) return;


                var mouse   = d3.mouse(this),
                    mouseX  = mouse[0],
                    mouseY  = mouse[1],

                    curValueX   = self.x.invert(mouseX);

                var sameTimeArr = [],
                    sameTimeValueArr = [];

                self.dataTarget.forEach(function(d, i) {
                    sameTimeArr[i] = d.value;
                    sameTimeArr[i].sort(function(a, b) { return a.valueX - b.valueX; });
                    var idx = self._isTimeDomain ? self.bisectDate(sameTimeArr[i], new Date(curValueX)) : self.bisectDate(sameTimeArr[i], curValueX);
                    
                    var d0, d1;
                    
                    d0 = (idx === 0) ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];
                    d1 = sameTimeArr[i][idx];

                    // work out which date value is closest to the mouse
                    sameTimeValueArr[i] = (curValueX - d0.valueX > d1.valueX - curValueX) ? d1 : d0;
                });

                if (Helper.isFunction(onMouseMoveCallback)) {
                    onMouseMoveCallback.call(this, sameTimeValueArr);
                }
                
                var x = self.x(sameTimeValueArr[0].valueX);
                var y = self.y(sameTimeValueArr[0].valueY);

                // Remove circle style before
                self.selectAllCircle()[0].forEach(function(circle) {
                    d3.select(circle)
                        .style('fill', self.point.fill)
                        .style('fill-opacity', self.point.opacity);
                }); 

                // Update circle style after mouse move
                for (let i=0; i < sameTimeValueArr.length; i++) {
                    let circle = d3.select("circle[data-ref='" + sameTimeValueArr[i]['data-ref'] + "']");
                    circle
                    .style('fill', 'steelblue')
                    .style('fill-opacity', 1);
                }

                // focus.select('#focusCircle')
                //     .attr('cx', x)
                //     .attr('cy', y);
                self.hoverLine
                    .attr('x1', x).attr('y1', self.y(self.y.domain()[0]))
                    .attr('x2', x).attr('y2', self.y(self.y.domain()[1]))
                    .style('stroke-opacity', 1);
                // self.hoverLine
                //     .attr('x1', self.x(self.x.domain()[0])).attr('y1', y)
                //     .attr('x2', self.x(self.x.domain()[1])).attr('y2', y)
                //     .attr('stroke-opacity', 1);

                //** Display Hover line
                // self.hoverLine
                //     .attr('x1', self.x(sameTimeValueArr[0].valueX))
                //     .attr('x2', self.x(sameTimeValueArr[0].valueX))
                //     .attr('stroke-opacity', 1);

                tooltip.draw(sameTimeValueArr, self, 'mousemove');
            }
        }

        selector.on(self.eventFactory);
    }

    getLineStyle() {
        var self = this;

        let r;

        switch(self.line.style) {
            case 'dot':
                r = "1, 1";
                break;
            case 'solid':
                r = 'none';
                break;
            case 'dash':
                r = "3, 3";
                break;
            default:
                r = 'none';
                break;
        }

        return r;
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
        var selector    = self.selectRectLayer();

        // Update Event Factory
        let eventFactory = {
            'mousemove.event': function(d) {

                var mouse   = d3.mouse(this),
                    mouseX  = mouse[0],
                    mouseY  = mouse[1],

                    curValueX   = self.x.invert(mouseX);

                var sameTimeArr = [],
                    sameTimeValueArr = [];

                self.dataTarget.forEach(function(d, i) {
                    sameTimeArr[i] = d.value;
                    sameTimeArr[i].sort(function(a, b) { return a.valueX - b.valueX; });
                    var idx = self._isTimeDomain ? self.bisectDate(sameTimeArr[i], new Date(curValueX)) : self.bisectDate(sameTimeArr[i], curValueX);
                    
                    var d0, d1;
                    
                    d0 = (idx === 0) ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];
                    d1 = sameTimeArr[i][idx];

                    // work out which date value is closest to the mouse
                    sameTimeValueArr[i] = (curValueX - d0.valueX > d1.valueX - curValueX) ? d1 : d0;
                });

                if (Helper.isFunction(callback)) {
                    callback.call(this, sameTimeValueArr);
                }
            }
        }

        let eventName = eventType + '.event';

        selector.on(eventName, eventFactory[eventName]);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}