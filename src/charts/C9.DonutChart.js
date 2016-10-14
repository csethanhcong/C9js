import Chart from './C9.Chart';

import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Table from './utils/C9.Table';
import Tooltip from './utils/C9.Tooltip';

import Helper from '../helper/C9.Helper';
import DataAdapter from '../helper/C9.DataAdapter';

export default class DonutChart extends Chart {
    constructor(options) {
        super(options);
        var self = this;
        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
        var config = {
            outerRadius: R,
            innerRadius: R > 80 ? R - 80 : R - 40,
            showText: true // show/hide text on middle or each donut
        };

        self._outerRadius   = options.outerRadius || config.outerRadius;
        self._innerRadius   = options.innerRadius || config.innerRadius;
        self._showText      = options.showText || config.showText;
        self.body.type      = 'donut';

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption);
        self.dataTarget     = da.getDataTarget("donut");

        self.updateConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get outerRadius() {
        return this._outerRadius;
    }

    get innerRadius() {
        return this._innerRadius;
    }

    get showText() {
        return this._showText;
    }

    get tooltip() {
        return this._tooltip;
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

    get legend() {
        return this._legend;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set outerRadius(arg) {
        if (arg) {
            this._outerRadius = arg;
        }
    }

    set innerRadius(arg) {
        if (arg) {
            this._innerRadius = arg;
        }
    }

    set showText(arg) {
        if (arg) {
            this._showText = arg;
        }
    }

    set tooltip(arg) {
        if (arg) {
            this._tooltip = arg;
        }
    }

    set pie(arg) {
        if (arg) {
            this._pie = arg;
        }
    }

    set arc(arg) {
        if (arg) {
            this._arc = arg;
        }
    }

    set currentData(arg) {
        if (arg) {
            this._currentData = arg;
        }
    }

    set legend(arg) {
        if (arg) {
            this._legend = arg;
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

        // chartInnerAfter, chartOuterAfter define easing radius of donut chart during animation
        // TODO: Add configs allow users to define these radius
        var width   = self.width - self.margin.left - self.margin.right,
            height  = self.height - self.margin.top - self.margin.bottom,
            color   = self.colorRange,
            chartInnerBefore = self.innerRadius,
            chartOuterBefore = self.outerRadius,
            chartInnerAfter = self.innerRadius,
            chartOuterAfter = self.outerRadius * 1.2;

        var hoverOptions        = self.hover.options,
            hoverEnable         = self.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback  = self.click.callback;

        var tooltip = new Tooltip(self.options.tooltip);

        // Main Event Dispatch for paths in donut chart
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

                // For legend
                if (self.legend.item)
                    self.legend.item.each(function() {
                        if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
                            d3.select(this).attr('opacity', '0.3');
                        }
                    });

                // For Chart
                self.selectAllPath().each(function(){
                    if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
                        d3.select(this).attr('opacity', '0.3');
                    }
                });

                // For Tooltip
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

                // For legend
                if (self.legend.item)
                self.legend.item.each(function() {
                    if (d3.select(this).attr('data-ref') !== d.data['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
                        d3.select(this).attr('opacity', '1.0');
                    }
                });

                // For Chart
                self.selectAllPath().each(function(){
                    if (d3.select(this).attr('data-ref') !== d.data['data-ref']) {
                        d3.select(this).attr('opacity', '1.0');
                    }
                });

                // For Tooltip
                tooltip.draw(d, self, 'mouseout');
            }

        };

        self.arc = d3.svg.arc()
                    .outerRadius(self.outerRadius)
                    .innerRadius(self.innerRadius);

        //we can sort data here
        self.pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d.value; });

        //draw chart
        var arcs = self.body
                    .append('g')
                        .attr('class', 'c9-chart c9-custom-arc-container')
                        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                        .selectAll('.c9-chart-donut.c9-custom-arc')
                        .data(self.pie(self.dataTarget)).enter()
                        .append('g')
                            .attr('class', 'c9-chart-donut c9-custom-arc');

        // Append main path contains donut
        // TODO: add a unique class to allow Legend could find selected donut/pie
        arcs.append('path')
                .attr('class', 'c9-chart-donut c9-custom-path')
                .attr('data-ref', function(d) { return d.data['data-ref']; })
                .attr('d', self.arc)
                .attr('fill', function(d, i) { return color(i); })
                .attr('stroke', '#ffffff')
                .each(function(d) { self._currentData = d; }); 
                // Current data used for calculate interpolation 
                // between current arc vs disabled arc


        // Append middle text display name
        // if (self.showText) {
        //     arcs.append('text')
        //             .attr('class', 'c9-chart-donut c9-custom-text')
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
        var legend  = new Legend(self.options.legend, self.body, self.dataTarget);

        self.legend = legend;
        
        // Draw legend
        legend.draw();
        legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);

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
                    .selectAll('path.c9-chart-donut.c9-custom-path');
    }

    /**
     * Update Interaction: Hover
     * @return {} 
     */
    updateInteraction() {
        var self    = this,
            selector= self.selectAllPath();

        selector.on(self._eventFactory);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
