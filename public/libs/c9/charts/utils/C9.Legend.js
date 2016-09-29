'use strict';

export default class Legend {
    constructor(options, body, data) {
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
        // self._color     = color;
        self._data      = data;

    }

    /*==============================
    =            Getter            =
    ==============================*/
    get data() {
        return this._data;
    }

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

    get legendMargin() {
        return this._legendMargin;
    }

    get legendSpace() {
        return this._legendSpace;
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
    set data(arg) {
        if (arg) {
            this._data = arg;
        }
    }

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

    set legendMargin(arg) {
        if (arg) {
            this._legendMargin = arg;
        }
    }

    set legendSpace(arg) {
        if (arg) {
            this._legendSpace = arg;
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

        // var color = self.color;

        if (self._legendShow) {
            // TODO: Remove these conditional checks by getData for general purposes
            var legendDomain = [];

            // var setEnableData = function(_data, _flag) {
            //     return {
            //         'data': _data,
            //         'enable': _flag
            //     };
            // };

            // if (self._body.type == "line") {

            //     var dataGroup = d3.nest()
            //         .key(function(d) { return d.Client; })
            //         .entries(self._data);

            //     dataGroup.forEach(function(d, i) {
            //         legendDomain.push(d.key);
            //     });

            // } else if (self._body.type == "bar") {

            //     legendDomain = self._data;



            // } else if (self._body.type == "pie" || self._body.type == "donut" || self._body.type == "timeline") {

            //     self._data.forEach(function(d) {
            //         d.name ? legendDomain.push(d.name) : legendDomain.push("");
            //     });

            // }



            // Store for backup, and add enable flag to each data
            // self.legendDomain = [];
            // self._data.forEach(function(d) {
            //     if (d) {
            //         self.legendDomain.push(setEnableData(d, true));
            //     }
            // });

            // var i;
            // for (i = 0; i < legendDomain.length; i++) {
            //     if (legendDomain[i] != "")
            //         break;
            // };

            // if (i == legendDomain.length)
            //     legendDomain = [];

            // Calculate domain for color to draw
            // color.domain(legendDomain);

            // Legend will be appended in main SVG container
            var legendContainer = d3.select(self._body[0][0].parentNode)
                .append("g")
                .attr("class", "c9-custom-legend c9-custom-legend-container")
                .attr("transform", "translate(" + self._legendPosition[0] + "," + self._legendPosition[1] + ")");
            
            // var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();

            self.legendItem = legendContainer.selectAll("g.c9-custom-legend.c9-custom-legend-item")
                // .data(color.domain())
                .data(self.data)
                .enter().append("g")
                .attr("class", "c9-custom-legend c9-custom-legend-item")
                .attr('data-ref', function(d) { return d['data-ref']; })
                .attr("transform", function(d, i) {
                    return "translate(" + (i * (self.legendSize + self.legendSpace) + self.legendMargin[0]) + "," + self.legendMargin[3] + ")"
                });

            self.legendItem.append('rect')
                .attr('class', 'c9-custom-legend c9-custom-legend-rect')
                .attr('width', self.legendSize * 2)
                .attr('height', self.legendSize)
                .attr('r', self.legendSize)
                .attr('fill', function(d){ return d.color; })
                .attr('stroke', function(d){ return d.color; });

            self.legendItem.append('text')
                .attr('class', 'c9-custom-legend c9-custom-legend-text')
                .attr('x', self._legendSize * 2 + 20)
                .attr('y', 15)
                // .attr('text-anchor', 'middle')
                .text(function(d) { return d.name; });


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
    updateInteractionForDonutPieChart(chart, path, pie, currentData, arc) {

        var self = this;

        var chartType = chart.chartType;

        var chartInnerBefore    = chartType == 'pie' ?  0 : chart.innerRadius,
            chartOuterBefore    = chartType == 'pie' ?  chart.radius : chart.outerRadius,
            chartInnerAfter     = chartType == 'pie' ?  0 : chart.innerRadius,
            chartOuterAfter     = chartType == 'pie' ?  chart.radius * 1.2 : chart.outerRadius * 1.2;

        self.legendItemEventFactory = {

            'click': function(item) {

                var selector = d3.select(this);
                var enable = true,
                    dataSet = self.data;
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
                    if (d.name == item.name) d.enable = enable;
                    return (d.enable) ? d.value : 0;
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
                    })
                    // Remove stroke when re-draw arcs to avoid duplicate strokes
                    .attr('stroke', 'none');;
                
            },

            'mouseover': function(item) {
                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

                var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");

                selector
                    .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerAfter)
                            .outerRadius(chartOuterAfter)
                        )
                        .attr('fill-opacity', '1.0');
                // var enable = true,
                //     dataSet = self.legendDomain,
                //     isCurrentEnable = true;

                // var totalEnable = d3.sum(dataSet.map(function(d) {
                //     if (d.data.name == item && !d.enable) isCurrentEnable = false;
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
                //     if (d.data.name == item) d.tempEnable = enable;
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

            'mouseout': function(item) {

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

                var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");

                selector
                    .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerBefore)
                            .outerRadius(chartOuterBefore)
                        )
                        .attr('fill-opacity', '0.5');
                // var dataSet = self.legendDomain,
                //     isCurrentEnable = true;

                // var totalEnable = d3.sum(dataSet.map(function(d) {
                //     if (d.data.name == item && !d.enable) isCurrentEnable = false;
                //     return (d.enable) ? 1 : 0;
                // }));

                // // Add pointer to cursor
                // selector.style('cursor', 'pointer');

                // chart.pie.value(function(d) {
                //     if (d.data.name == item && !d.enable) d.enable = enable;
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

    /**
     * Update interaction for barchart
     * @param  {[type]} chart       [description]
     * @param  {[type]} path        [description]
     * @param  {[type]} pie         [description]
     * @param  {[type]} currentData [description]
     * @param  {[type]} arc         [description]
     * @return {[type]}             [description]
     */
    updateInteractionForBarChart(chart) {

        var self = this;

        self.legendItemEventFactory = {

            'click': function(item) {

                var selector = d3.select(this);
                var enable = true,
                    dataSet = self.data;
                var totalEnable = d3.sum(dataSet.map(function(d) {
                    return (d.enable) ? 1 : 0;
                }));
                var enableSet = [];
                var enableSetOld = [];
                var data = [];
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

                dataSet.forEach(function(d, i) {
                    if (d.enable)
                        enableSetOld.push(d);
                    if (d.group == item.name)
                        d.enable = enable;
                    if (d.enable)
                        enableSet.push(d);
                });

                //TODO - handle total - use for axis
                dataSet.forEach(function(d, i) {
                    var element = {name: d.name, stack: [], max: d.max};
                    d.stack.forEach(function(s, j) {
                        enableSet.forEach(function(e) {
                            if (e == s.group) {
                                element.stack.push(s);
                            }
                        })
                    })
                    data.push(element);
                });

                chart.updateLegendInteraction(data, enableSet, enableSetOld, item);
                
            },

            // 'mouseover': function(item) {
            //     var legendSelector = d3.select(this);
            //     // Add pointer to cursor
            //     legendSelector.style('cursor', 'pointer');

            //     var selector = d3.select('.c9-custom-path.' + item);

            //     selector
            //         .transition()
            //             .duration(500)
            //             .ease('bounce')
            //             .attr('d', d3.svg.arc()
            //                 .innerRadius(chartInnerAfter)
            //                 .outerRadius(chartOuterAfter)
            //             )
            //             .style('stroke', '#FFFFF3')
            //             .style('fill-opacity', '1.0');
            //     // var enable = true,
            //     //     dataSet = self.legendDomain,
            //     //     isCurrentEnable = true;

            //     // var totalEnable = d3.sum(dataSet.map(function(d) {
            //     //     if (d.data.name == item && !d.enable) isCurrentEnable = false;
            //     //     return (d.enable) ? 1 : 0;
            //     // }));

            //     // // Add pointer to cursor
            //     // selector.style('cursor', 'pointer');

            //     // // If current selector is disabled, then remains it
            //     // // Else, turn enabled to disabled
            //     // if (!isCurrentEnable) {
            //     //     return false;
            //     // } else {
            //     //     if (totalEnable < 2) return;
            //     //     selector.style('opacity', '0.5');
            //     //     enable = false;
            //     // }

            //     // chart.pie.value(function(d) {
            //     //     if (d.data.name == item) d.tempEnable = enable;
            //     //     else d.tempEnable = d.enable;

            //     //     return (d.tempEnable) ? d.data.value : 0;
            //     // });

            //     // path = path.data(chart.pie(dataSet));

            //     // path.transition()
            //     //     .duration(200)
            //     //     .attrTween('d', function(d) {
            //     //         var interpolate = d3.interpolate(chart.currentData, d);
            //     //         // Returns an interpolator between the two arbitrary values a and b. 
            //     //         // The interpolator implementation is based on the type of the end value b.
            //     //         chart.currentData = interpolate(0);
            //     //         return function(t) {
            //     //             return arc(interpolate(t));
            //     //         };
            //     //     });

            // },

            // 'mouseout': function(item) {

            //     var legendSelector = d3.select(this);
            //     // Add pointer to cursor
            //     legendSelector.style('cursor', 'pointer');

            //     var selector = d3.select('.c9-custom-path.' + item);

            //     selector
            //         .transition()
            //             .duration(500)
            //             .ease('bounce')
            //             .attr('d', d3.svg.arc()
            //                 .innerRadius(chartInnerBefore)
            //                 .outerRadius(chartOuterBefore)
            //             )
            //             .style('stroke', '#ffffff')
            //             .style('fill-opacity', '0.5');
            //     // var dataSet = self.legendDomain,
            //     //     isCurrentEnable = true;

            //     // var totalEnable = d3.sum(dataSet.map(function(d) {
            //     //     if (d.data.name == item && !d.enable) isCurrentEnable = false;
            //     //     return (d.enable) ? 1 : 0;
            //     // }));

            //     // // Add pointer to cursor
            //     // selector.style('cursor', 'pointer');

            //     // chart.pie.value(function(d) {
            //     //     if (d.data.name == item && !d.enable) d.enable = enable;
            //     //     return (d.enable) ? d.data.value : 0;
            //     // });

            //     // if (!isCurrentEnable) {
            //     //     return;
            //     // } else {
            //     //     if (totalEnable < 2 || selector.style('opacity') == '1') return;
            //     //     selector.style('opacity', '1.0');
            //     // }

            //     // path = path.data(chart.pie(dataSet));

            //     // path.transition()
            //     //     .duration(200)
            //     //     .attrTween('d', function(d) {
            //     //         var interpolate = d3.interpolate(chart.currentData, d);
            //     //         // Returns an interpolator between the two arbitrary values a and b. 
            //     //         // The interpolator implementation is based on the type of the end value b.
            //     //         chart.currentData = interpolate(0);
            //     //         return function(t) {
            //     //             return arc(interpolate(t));
            //     //         };
            //     //     });

            // }
        
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