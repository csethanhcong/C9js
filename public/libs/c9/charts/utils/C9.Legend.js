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

        self.draw();
        
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
            var setEnableData = function(data, flag) {
                return {
                    'data': data,
                    'enable': flag
                };
            }

            if (self._body.type == "line") {

                var dataGroup = d3.nest()
                    .key(function(d) { return d.Client; })
                    .entries(self._data);
                dataGroup.forEach(function(d, i) {
                    legendDomain.push(d.key);
                })

            // TODO: Maybe we should remove legend domain of Bar Chart ???
            // Because Bar Chart doesn't have domain
            // Future works: Add Group bar chart to filter domain ???
            } else if (self._body.type == "bar") {

                try {
                    if (typeof options.legendDomain === "string")
                        legendDomain.push(options.legendDomain);
                    else if (typeof options.legendDomain === "object")
                        legendDomain = options.legendDomain;
                }
                catch (err) {
                    throw "Legend domain is not defined";
                }

            } else if (self._body.type == "pie" || self._body.type == "donut" || self._body.type == "timeline") {

                self._data.forEach(function(d) {
                    d.name ? legendDomain.push(d.name) : legendDomain.push("");
                });

            }

            // Store for backup, and add enable flag to each data
            self.legendDomain = [];
            legendDomain.forEach(function(d) {
                self.legendDomain.push(setEnableData(d, true));
            });

            var i = 0;
            for (i; i < legendDomain.length; i++) {
                if (legendDomain[i] != "")
                    break;
            };

            if (i == legendDomain.length)
                legendDomain = [];

            color.domain(legendDomain);

            // Legend will be appended in main SVG container
            var legendContainer = d3.select(self._body[0][0].parentNode)
                .append("g")
                .attr("class", "c9-custom-legend c9-custom-legend-container")
                .attr("transform", "translate(" + self._legendPosition[0] + "," + self._legendPosition[1] + ")");
        
            var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();

            self.legendItem = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-item")
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

            self.legendItemEventFactory = {
                'click': function(item) {
                    var selector = d3.select(this);
                    var enable = true,
                        dataSet = self.legendDomain;
                    var totalEnable = d3.sum(dataSet.map(function(d) {
                        return (d.enable) ? 1 : 0;
                    }));

                    if (selector.style('opacity') === '0.1') {
                        selector.style('opacity', '1.0');
                    } else {
                        if (totalEnable < 2) return;
                        selector.style('opacity', '0.1');
                        enable = false;
                    }

                    pie.value(function(d) {
                        if (d.label === label) d.enable = enable;
                        return (d.enable) ? d.count : 0;
                    });

                    path = path.data(pie(dataSet));

                    path.transition()
                    .duration(750)
                    .attrTween('d', function(d) {
                        var interpolate = d3.interpolate(this._current, d);
                        this._current = interpolate(0);
                        return function(t) {
                            return arc(interpolate(t));
                        };
                    });
                }
            
            };

            self.legendItem.on(self.legendItemEventFactory);

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

    setYLocation (height, margin) {
        if (this.legendPosition === 'top') {
            return (margin.top / 2);
        } else if (this.legendPosition === 'bottom') {
            return (height - margin.bottom / 2);
        }
    }
    /*=====  End of Main Functions  ======*/
    
}