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
                fill: "#fb8072",
                stroke: "#d26b5f",
                opacity: 1.0,
                radius: 5,
            },
            interpolate: "linear" // refer: https://www.dashingd3js.com/svg-paths-and-d3js
        };

        self._point         = Helper.merge(options.point, config.point);
        self._interpolate       = options.interpolate           ||  config.interpolate;

        self.body.type = "line";

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

    // get dataGroup() {
    //     return this._dataGroup;
    // }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/

    set point(arg) {
        if (arg) {
            this._point = arg;
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

    // set dataGroup(arg) {
    //     if (arg) {
    //         this._dataGroup = arg;
    //     }
    // }
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

        var x = (!Helper.isEmpty(self._isTimeDomain)) ? d3.time.scale().range([0, width]) : d3.scale.linear().range([0, width]),
            y = d3.scale.linear().range([height, 0]);

        self._x = x;
        self._y = y;

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

        var lineGen = d3.svg.line()
                        .x(function(d) { return x(d.valueX); })
                        .y(function(d) { return y(d.valueY); })
                        .interpolate(self.interpolate);

        self.dataTarget.forEach(function(d,i) {
            self.body.append('path')
                .attr('d', lineGen(d.value))
                .attr('stroke', d.color)
                .attr('stroke-width', 2)
                .attr('data-ref', 'c9-'+d['data-ref'])
                .attr('fill', 'none');

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
                    .style("opacity", self.point.opacity);
            }

        });
    }

    /**
     * Main draw function of Line Chart
     */
    draw() {
        var self = this;

        var axis    = new Axis(self.options, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self._x, self._y);
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
     * Update Interaction: Hover
     */
    updateInteraction() {
        var self = this,
            hoverEnable     = self.hover.enable,
            hoverOptions    = self.hover.options,
            selector        = self.selectAllCircle(),
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback  = self.click.callback;

        // Update Tooltip options for Timeline Chart
        self.options.tooltip = {
            show: true,
            position: 'left', // [top, right, bottom, left]
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            fontColor: '#fff',
            fontSize: '11px',
            format: {
                title: function(name) {
                    return 'Title ' + name;
                },
                detail: function(valueX, valueY) {
                    return 'ValueX: ' + valueX + ' <br>valueY: ' + valueY;
                }
            }
        };

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

                tooltip.draw(d, self, 'mouseover');
            },
            'mouseout': function(d) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, d);
                }

                tooltip.draw(d, self, 'mouseout');
            }
        }

        selector.on(self.eventFactory);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}