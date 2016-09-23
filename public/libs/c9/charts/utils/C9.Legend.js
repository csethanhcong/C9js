'use strict';

export default class Legend {
    constructor(options, body, color, data) {
        var config = {
            legendShow      : false,
            legendPosition  : [0, 0],
            legendBox       : false,
            legendSize      : 18,
            legendTextSize : "14px",
            legendMargin   : [50, 5, 5, 5],
            legendSpace     : 150,
            // legendStyle     : "rect" // TODO: Allow user to choose type of legend (circle, rect, etc.)
        };

        var self = this;

        self._legendShow         = options.legendShow       || config.legendShow;
        self._legendTextSize     = options.legendTextSize   || config.legendTextSize;
        self._legendPosition     = options.legendPosition   || config.legendPosition;
        self._legendSize         = options.legendSize       || config.legendSize;
        self._legendBox          = options.legendBox        || config.legendBox;
        self._legendMargin       = options.legendMargin     || config.legendMargin;
        self._legendSpace        = options.legendSpace      || config.legendSpace;
        // self._legendStyle        = options.legendStyle      || config.legendStyle;

        self._options   = options;
        self._body      = body;
        self._color     = color;
        self._data      = data;

    }

    /*==============================
    =            Getter            =
    ==============================*/

    get body() {
        return this._body;
    }

    get color() {
        return this._color;
    }
    
    get legendShow() {
        return this._legendShow;
    }

    get legendText() {
        return this._legendText ;
    }

    get legendPosition() {
        return this._legendPosition;
    }

    get legendSize() {
        return this._legendSize;
    }

    get legendItem() {
        return this._legendItem;
    }

    get legendDomain() {
        return this._legendDomain;
    }

    get legendItemEventFactory() {
        return this._legendItemEventFactory;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set legendShow(newlegendShow) {
        if (newlegendShow) {
            this._legendShow = newlegendShow;
        }
    }

    set legendText(newlegendText) {
        if (newlegendText) {
            this._legendText = newlegendText;
        }
    }

    set legendPosition(newlegendPosition) {
        if (newlegendPosition) {
            this._legendPosition = newlegendPosition;
        }
    }

    set legendSize(newlegendSize) {
        if (newlegendSize) {
            this._legendSize = newlegendSize;
        }
    }

    set legendItem(newLegendItem) {
        if (newLegendItem) {
            this._legendItem = newLegendItem;
        }
    }

    set legendDomain(newLegendDomain) {
        if (newLegendDomain) {
            this._legendDomain = newLegendDomain;
        }
    }

    set legendItemEventFactory(newLegendItemEventFactory) {
        if (newLegendItemEventFactory) {
            this._legendItemEventFactory = newLegendItemEventFactory;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    draw () {
        var self = this;

        var color = self.color;

        if (self._legendShow) {
            // TODO: Remove these conditional checks by getData for general purposes
            var legendDomain = [];

            var setEnableData = function(_data, _flag) {
                return {
                    'data': _data,
                    'enable': _flag
                };
            };

            if (self._body.type == "line") {

                var dataGroup = d3.nest()
                    .key(function(d) { return d.Client; })
                    .entries(self._data);

                    console.dir(dataGroup);

                dataGroup.forEach(function(d, i) {
                    legendDomain.push(d.key);
                });

            } else if (self._body.type == "bar") {

                legendDomain = self._data;

            } else if (self._body.type == "pie" || self._body.type == "donut" || self._body.type == "timeline") {

                self._data.forEach(function(d) {
                    d.name ? legendDomain.push(d.name) : legendDomain.push("");
                });

            }

            // Store for backup, and add enable flag to each data
            self.legendDomain = [];
            self._data.forEach(function(d) {
                if (d) {
                    self.legendDomain.push(setEnableData(d, true));
                }
            });
            
            // var i;
            // for (i = 0; i < legendDomain.length; i++) {
            //     if (legendDomain[i] != "")
            //         break;
            // };

            // if (i == legendDomain.length)
            //     legendDomain = [];

            // Calculate domain for color to draw
            color.domain(legendDomain);

            // Legend will be appended in main SVG container
            var legendContainer = d3.select(self._body[0][0].parentNode)
                .append("g")
                .attr("class", "c9-custom-legend c9-custom-legend-container")
                .attr("transform", "translate(" + self._legendPosition[0] + "," + self._legendPosition[1] + ")");
        
            // var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();

            self.legendItem = legendContainer.selectAll("g.c9-custom-legend.c9-custom-legend-item")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "c9-custom-legend c9-custom-legend-item")
                .attr("transform", function(d, i) {
                    return "translate(" + (i * (self._legendSize + self._legendSpace) + self._legendMargin[0]) + "," + self._legendMargin[3] + ")"
                });

            self.legendItem.append('rect')
                .attr('class', 'c9-custom-legend c9-custom-legend-rect')
                .attr('width', self._legendSize * 2)
                .attr('height', self._legendSize)
                .attr('r', self._legendSize)
                .style('fill', color)
                .style('stroke', color);

            self.legendItem.append('text')
                .attr('class', 'c9-custom-legend c9-custom-legend-text')
                .attr('x', self._legendSize * 2 + 20)
                .attr('y', 15)
                // .attr('text-anchor', 'middle')
                .text(function(d) { return d; });


            // if (self._legendBox && legendDomain.length > 0) {
            //     var box = legendContainer[0][0].getBBox();
            //     legendBox.attr("class", ".c9-custom-legend.c9-custom-legend-box")
            //         .attr("x", 0)
            //         .attr("y", 0)
            //         .attr("width", box.width + self._legendMargin[1] + self._legendMargin[3])
            //         .attr("height", box.height + self._legendMargin[2] + self._legendMargin[0])
            //         .style("fill", "none")
            //         .style("stroke", color);
            // }
        
        }
    
    }

    /**
     * Update interaction event dispatchers for legend
     * For: Donut Chart, Pie Chart
     */
    updateInteraction(chart, path, pie, currentData, arc) {

        var self = this;

        var chartType = chart.chartType;

        var chartInnerBefore    = chartType == 'pie' ?  0 : chart.innerRadius,
            chartOuterBefore    = chartType == 'pie' ?  chart.radius : chart.outerRadius,
            chartInnerAfter     = chartType == 'pie' ?  0 : chart.innerRadius,
            chartOuterAfter     = chartType == 'pie' ?  chart.radius * 1.2 : chart.outerRadius * 1.2;

        self.legendItemEventFactory = {

            'click': function(label) {

                var selector = d3.select(this);
                var enable = true,
                    dataSet = self.legendDomain;
                var totalEnable = d3.sum(dataSet.map(function(d) {
                    return (d.enable) ? 1 : 0;
                }));

                // Add pointer to cursor
                selector.style('cursor', 'pointer');

                // If current selector is disabled, then turn it on back
                // Else, set enable to false
                if (selector.style('opacity') == '0.1') {
                    selector.style('opacity', '1.0');
                } else {
                    if (totalEnable < 2) return;
                    selector.style('opacity', '0.1');
                    enable = false;
                }

                chart.pie.value(function(d) {
                    if (d.data.name == label) d.enable = enable;
                    return (d.enable) ? d.data.value : 0;
                });

                path = path.data(chart.pie(dataSet));

                path.transition()
                    .duration(500)
                    .attrTween('d', function(d) {
                        var interpolate = d3.interpolate(chart.currentData, d);
                        // Returns an interpolator between the two arbitrary values a and b. 
                        // The interpolator implementation is based on the type of the end value b.
                        chart.currentData = interpolate(0);
                        return function(t) {
                            return arc(interpolate(t));
                        };
                    });
                
            },

            'mouseover': function(label) {
                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

                var selector = d3.select('.c9-custom-path.' + label);

                selector
                    .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerAfter)
                            .outerRadius(chartOuterAfter)
                        )
                        .style('stroke', '#FFFFF3')
                        .style('fill-opacity', '1.0');
                // var enable = true,
                //     dataSet = self.legendDomain,
                //     isCurrentEnable = true;

                // var totalEnable = d3.sum(dataSet.map(function(d) {
                //     if (d.data.name == label && !d.enable) isCurrentEnable = false;
                //     return (d.enable) ? 1 : 0;
                // }));

                // // Add pointer to cursor
                // selector.style('cursor', 'pointer');

                // // If current selector is disabled, then remains it
                // // Else, turn enabled to disabled
                // if (!isCurrentEnable) {
                //     return false;
                // } else {
                //     if (totalEnable < 2) return;
                //     selector.style('opacity', '0.5');
                //     enable = false;
                // }

                // chart.pie.value(function(d) {
                //     if (d.data.name == label) d.tempEnable = enable;
                //     else d.tempEnable = d.enable;

                //     return (d.tempEnable) ? d.data.value : 0;
                // });

                // path = path.data(chart.pie(dataSet));

                // path.transition()
                //     .duration(200)
                //     .attrTween('d', function(d) {
                //         var interpolate = d3.interpolate(chart.currentData, d);
                //         // Returns an interpolator between the two arbitrary values a and b. 
                //         // The interpolator implementation is based on the type of the end value b.
                //         chart.currentData = interpolate(0);
                //         return function(t) {
                //             return arc(interpolate(t));
                //         };
                //     });

            },

            'mouseout': function(label) {

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

                var selector = d3.select('.c9-custom-path.' + label);

                selector
                    .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerBefore)
                            .outerRadius(chartOuterBefore)
                        )
                        .style('stroke', '#ffffff')
                        .style('fill-opacity', '0.5');
                // var dataSet = self.legendDomain,
                //     isCurrentEnable = true;

                // var totalEnable = d3.sum(dataSet.map(function(d) {
                //     if (d.data.name == label && !d.enable) isCurrentEnable = false;
                //     return (d.enable) ? 1 : 0;
                // }));

                // // Add pointer to cursor
                // selector.style('cursor', 'pointer');

                // chart.pie.value(function(d) {
                //     if (d.data.name == label && !d.enable) d.enable = enable;
                //     return (d.enable) ? d.data.value : 0;
                // });

                // if (!isCurrentEnable) {
                //     return;
                // } else {
                //     if (totalEnable < 2 || selector.style('opacity') == '1') return;
                //     selector.style('opacity', '1.0');
                // }

                // path = path.data(chart.pie(dataSet));

                // path.transition()
                //     .duration(200)
                //     .attrTween('d', function(d) {
                //         var interpolate = d3.interpolate(chart.currentData, d);
                //         // Returns an interpolator between the two arbitrary values a and b. 
                //         // The interpolator implementation is based on the type of the end value b.
                //         chart.currentData = interpolate(0);
                //         return function(t) {
                //             return arc(interpolate(t));
                //         };
                //     });

            }
        
        };

        if (self.legendShow) {
            
            self.legendItem.on(self.legendItemEventFactory);

        }
    
    }

    setYLocation (height, margin) {
        if (this.legendPosition === 'top') {
            return (margin.top / 2);
        } else if (this.legendPosition === 'bottom') {
            return (height - margin.bottom / 2);
        }
    
    }
    /*=====  End of Main Functions  ======*/
    
}