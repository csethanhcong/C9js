import Chart from './C9.Chart';

import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Table from './utils/C9.Table';
import Tooltip from './utils/C9.Tooltip';

import Helper from '../helper/C9.Helper';
import DataAdapter from '../helper/C9.DataAdapter';

export default class PieChart extends Chart {
    constructor(options) {
        super(options);

        var self = this;

        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
        var config = {
            radius: R,
            showText: true
        };

        self._radius    = options.radius || config.radius;
        self._showText  = options.showText || config.showText;

        self.body.type  = 'pie';

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption);
        self.dataTarget     = da.getDataTarget("pie");

        self.updateConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get radius() {
        return this._radius;
    }

    get showText() {
        return this._showText;
    }

    get pie() {
        return this._pie;
    }

    get arc() {
        return this._arc;
    }

    get currentData() {
        return this._currentData;
    }

    get chartType() {
        return this._body.type;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set radius(newradius) {
        if (newradius) {
            this._radius = newradius;
        }
    }

    set showText(newShowText) {
        if (newShowText) {
            this._showText = newShowText;
        }
    }

    set pie(newPie) {
        if (newPie) {
            this._pie = newPie;
        }
    }

    set arc(newArc) {
        if (newArc) {
            this._arc = newArc;
        }
    }

    set currentData(newCurrentData) {
        if (newCurrentData) {
            this._currentData = newCurrentData;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /**
     * Update Donut Chart Config
     */
    updateConfig() {
        var self = this;

        // chartInnerAfter, chartOuterAfter define easing radius of pie chart during animation
        // TODO: Add configs allow users to define these radius
        var width   = self.width - self.margin.left - self.margin.right,
            height  = self.height - self.margin.top - self.margin.bottom,
            color   = self.colorRange,
            chartInnerBefore = 0,
            chartOuterBefore = self.radius,
            chartInnerAfter = 0,
            chartOuterAfter = self.radius * 1.2;

        var hoverOptions        = self.hover.options,
            hoverEnable         = self.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback     = self.click.callback;

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

                var selector = d3.select(this);
                selector.transition()
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerAfter)
                            .outerRadius(chartOuterAfter)
                        );
                        // .style('stroke', '#FFFFF3')
                        // .attr('fill-opacity', '1.0');

                self.selectAllPath().each(function(){
                    if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
                        d3.select(this).attr('fill-opacity', '0.3');
                    }
                });

                tooltip.draw(d, self, 'mouseover');
            },
            
            'mouseout': function(d, i) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, d);
                }

                var selector = d3.select(this);
                selector.transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerBefore)
                            .outerRadius(chartOuterBefore)
                        );
                        // .style('stroke', '#ffffff')
                        // .attr('fill-opacity', '0.5');

                self.selectAllPath().each(function(){
                    if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
                        d3.select(this).attr('fill-opacity', '1.0');
                    }
                });

                tooltip.draw(d, self, 'mouseout');
            }

        };

        self.arc = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(self.radius);

        //we can sort data here
        self.pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d.value; });

        //draw chart
        var arcs = self.body
                    .append('g')
                        .attr('class', 'c9-chart c9-custom-arc-container')
                        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                        .selectAll('.c9-chart-pie.c9-custom-arc')
                        .data(self.pie(self.dataTarget)).enter()
                        .append('g')
                            .attr('class', 'c9-chart-pie c9-custom-arc');

        // Append main path contains pie
        arcs.append('path')
                .attr('class', 'c9-chart-pie c9-custom-path')
                .attr('data-ref', function(d) { return d.data['data-ref']; })
                .attr('d', self.arc)
                .attr('fill', function(d, i) { return color(i); })
                .attr('stroke', '#ffffff')
                // .attr('fill-opacity', '0.5')
                .each(function(d) { self._currentData = d; }); 
                // Current data used for calculate interpolation 
                // between current arc vs disabled arc


        // Append middle text display name
        // if (self.showText) {
        //     arcs.append('text')
        //             .attr('class', 'c9-chart-pie c9-custom-text')
        //             .attr('transform', function(d) { return 'translate(' + self.arc.centroid(d) + ')'; })
        //             .attr('dy', '.35em')
        //             .attr('text-anchor', 'middle')
        //             .text(function(d) { return d.data.name; });
        // }
    }

    /**
     * Main draw function of Donut Chart
     */
    draw() {

        var self = this;
        
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options, self.body, self.dataTarget);
        var table   = new Table(self.options.table, self.body, self.dataTarget);

        // Draw legend
        legend.draw();
        legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);

        // Draw table
        table.draw();

        // Update interaction of this own chart
        self.updateInteraction();

    }

    /**
     * Select all path as type PATH in Donut Chart via its CLASS
     */
    selectAllPath() {
        var self = this;

        return self.body
                // .selectAll('g')
                    .selectAll('path.c9-chart-pie.c9-custom-path');
    }

    /**
     * Update Interaction: Hover
     * @return {} 
     */
    updateInteraction() {
        var self    = this,
            selector= self.selectAllPath();

        selector.on(self.eventFactory);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
