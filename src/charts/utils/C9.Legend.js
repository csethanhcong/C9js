import Helper from '../../helper/C9.Helper';

export default class Legend {
    constructor(options, body, data) {
        var config = {
            show      : false,
            position  : "top",
            box : false,
            size      : 10,
            textSize  : "12px",
            margin    : [5, 5, 5, 5],
            space     : 10,
            // legendStyle     : "rect" // TODO: Allow user to choose type of legend (circle, rect, etc.)
        };

        var self = this;

        self._show         = options.show ? options.show : config.show;
        self._textSize     = options.textSize   || config.textSize;
        self._position     = options.position   || config.position;
        self._size         = options.size       || config.size;
        self._box          = options.box        || config.box;
        self._margin       = options.margin     || config.margin;
        self._space        = options.space      || config.space;
        // self._legendStyle        = options.legendStyle      || config.legendStyle;

        self._options   = options;
        self._body      = body;
        self._maxWidth  = d3.select(body[0][0].parentNode).attr('width');
        self._maxHeight  = d3.select(body[0][0].parentNode).attr('height');
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
    
    get show() {
        return this._show;
    }

    get text() {
        return this._text ;
    }

    get position() {
        return this._position;
    }

    get size() {
        return this._size;
    }

    get margin() {
        return this._margin;
    }

    get space() {
        return this._space;
    }

    get textSize() {
        return this._textSize;
    }

    get item() {
        return this._item;
    }

    get domain() {
        return this._domain;
    }

    get itemEventFactory() {
        return this._itemEventFactory;
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

    set text(newText) {
        if (newText) {
            this._text = newText;
        }
    }

    set position(newPosition) {
        if (newPosition) {
            this._position = newPosition;
        }
    }

    set size(newSize) {
        if (newSize) {
            this._size = newSize;
        }
    }

    set margin(arg) {
        if (arg) {
            this._margin = arg;
        }
    }

    set space(arg) {
        if (arg) {
            this._space = arg;
        }
    }

    set item(newItem) {
        if (newItem) {
            this._item = newItem;
        }
    }

    set domain(newDomain) {
        if (newDomain) {
            this._domain = newDomain;
        }
    }

    set itemEventFactory(newItemEventFactory) {
        if (newItemEventFactory) {
            this._itemEventFactory = newItemEventFactory;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    draw () {
        var self = this;

        if (self.show) {
            // var color = self.color;
            // TODO: Remove these conditional checks by getData for general purposes
            var domain = [];

            if (self._body.type == "bar") {
                self.data = self.data[self.data.reduce((p, c, i, a) => a[p].length > c.length ? p : i, 0)];
            }

            // Legend will be appended in main SVG container
            var container = d3.select(self._body[0][0].parentNode)
                .append("g")
                .attr("class", "c9-custom-legend c9-custom-legend-container");
            
            // var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();

            self.item = container.selectAll("g.c9-custom-legend.c9-custom-legend-item")
                // .data(color.domain())
                .data(self.data)
                .enter().append("g")
                .attr("class", "c9-custom-legend c9-custom-legend-item")
                .attr('data-ref', function(d) { return d['data-ref']; })
                .attr('data-enable', function(d) { return d['enable']; })
                

            self.item.append('rect')
                .attr('class', 'c9-custom-legend c9-custom-legend-rect')
                .attr('width', self.size)
                .attr('height', self.size)
                .attr('r', self.size)
                .attr('fill', function(d){ return d.color || d.values[0].color; })
                .attr('stroke', function(d){ return d.color || d.values[0].color; });

            self.item.append('rect')
                .attr('width', 5)
                .attr('height', self.size)
                .attr('x', self.size)
                .attr('y', 0)
                .attr('opacity', 0);

            self.item.append('text')
                .attr('class', 'c9-custom-legend c9-custom-legend-text')
                .attr('x', self.size + 5)
                .attr('y', self.size)
                .style('font-size', self.textSize)
                // .attr('text-anchor', 'middle')
                .text(function(d) { return self._body.type == "bar" ? d.group : d.name || d.key; });

            //caculate position for legend
            var getSize = function(item) { return item.getBoundingClientRect() };
            var getXY = function(item) { var xy = d3.select(item).attr('transform').split(','); return {x: parseFloat(xy[0].replace('translate(', '')), y: parseFloat(xy[1].replace(')', ''))}; };
            var r = 0; // current row
            var items = d3.selectAll(".c9-custom-legend-item")[0];
            var itemHeight = getSize(items[0]).height;
            var numItemsCol = Math.floor((self._maxHeight - self.margin[0] - self.margin[2]) / (itemHeight + self.space));
            if (self.space > itemHeight) numItemsCol++;
            var maxWidthCol = new Array(Math.floor(items.length / numItemsCol));

            items.forEach(function (i, n) {
                var pos = Math.floor(n / numItemsCol);
                var width = getSize(i).width;
                if (maxWidthCol[pos] == undefined || width > maxWidthCol[pos]) maxWidthCol[pos] = width;
            });

            if  (self.position == "bottom"){
                /************ BOTTOM ***************/
                self.item.attr("transform", function(d, i) {
                    if (i > 0) {
                        var item  = items[i];
                        var preItem  = items[i - 1];
                        var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.space + getSize(item).width + self.margin[1]) / self._maxWidth);
                        if (newR > 0) r++;
                        return "translate(" + (newR > 0 ? self.margin[3] : getXY(preItem).x + getSize(preItem).width + self.space) + "," + (self._maxHeight - self.margin[0] - itemHeight - r * (itemHeight + self.space)) + ")";
                    }
                    else
                        return "translate(" + self.margin[3] + "," + (self._maxHeight - self.margin[0] - itemHeight) + ")";
                });
            } else if (self.position == "left") {
                /************ LEFT ***************/
                self.item.attr("transform", function(d, i) {
                    var pos = Math.floor(i / numItemsCol);

                    if (i > 0) {
                        var prePos = Math.floor((i - 1) / numItemsCol);
                        var item  = items[i];
                        var preItem  = items[i - 1];
                        return "translate(" + (pos > prePos ? (maxWidthCol[pos] + self.space + getXY(preItem).x) : getXY(preItem).x) + "," + (pos > prePos ? self.margin[0] : getXY(preItem).y + getSize(preItem).height + self.space) + ")";
                    }
                    else
                        return "translate(" + self.margin[3] + "," + self.margin[0] + ")";
                });
            } else if (self.position == "right") {
                /************ RIGHT ***************/
                self.item.attr("transform", function(d, i) {
                    var pos = Math.floor(i / numItemsCol);
                    if (i > 0) {
                        var prePos = Math.floor((i - 1) / numItemsCol);
                        var item  = items[i];
                        var preItem  = items[i - 1];
                        return "translate(" + (pos > prePos ? (getXY(preItem).x - self.space - maxWidthCol[pos]) : getXY(preItem).x) + "," + (pos > prePos ? self.margin[0] : getXY(preItem).y + getSize(preItem).height + self.space) + ")";
                    }
                    else
                        return "translate(" + (self._maxWidth - self.margin[3] - maxWidthCol[pos]) + "," + self.margin[0] + ")";
                });
            } else {
                /************ TOP ***************/
                self.item.attr("transform", function(d, i) {
                    if (i > 0) {
                        var item  = items[i];
                        var preItem  = items[i - 1];
                        var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.space + getSize(item).width + self.margin[1]) / self._maxWidth);
                        if (newR > 0) r++;
                        return "translate(" + (newR > 0 ? self.margin[3] : getXY(preItem).x + getSize(preItem).width + self.space) + "," + (self.margin[0] + r * (itemHeight + self.space)) + ")";
                    }
                    else
                        return "translate(" + self.margin[3] + "," + self.margin[0] + ")";
                });
            }
            
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
    updateInteractionForLineChart(chart) {

        var self = this;

        var hoverOptions        = chart.hover.options,
            hoverEnable         = chart.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback     = chart.click.callback;

        self.itemEventFactory = {

            'click': function(item) {
                if (Helper.isFunction(onClickCallback)) {
                    onClickCallback.call(this, item);
                }

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
                if (selector.attr('data-enable') == 'false') {
                    selector.attr('data-enable', 'true');
                    selector.style('opacity', '1');
                } else {
                    if (totalEnable < 2) return;
                    selector.attr('data-enable', 'false');
                    selector.style('opacity', '0.1');
                    enable = false;
                }

                // update line
                var lineGen = d3.svg.line()
                                .x(function(d) { return chart.x(d.valueX); })
                                .y(function(d) { return chart.y(d.valueY); })
                                .interpolate(chart.interpolate);

                var areaGen = d3.svg.area()
                                .x(function(d) { return chart.x(d.valueX); })
                                .y0(function(d) { return chart.y(d.valueY); })
                                .y1(chart.height - chart.margin.top - chart.margin.bottom)
                                .interpolate(chart.interpolate);

                chart.updatePath(lineGen, areaGen, chart.dataTarget.splice(chart.dataTarget.indexOf(item), 1));
                console.log(chart.dataTarget.splice(chart.dataTarget.indexOf(item), 1))

            },

            'mouseover': function(item) {
                console.log(item)
                if (Helper.isFunction(onMouseOverCallback)) {
                    onMouseOverCallback.call(this, item);
                }

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

            },

            'mouseout': function(item) {
                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, item);
                }

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

                var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");

            }
        
        };

        if (self.show)
            self.item.on(self.itemEventFactory);
    }

    /**
     * Update interaction event dispatchers for legend
     * For: Donut Chart, Pie Chart
     */
    updateInteractionForDonutPieChart(chart, path, pie, currentData, arc) {

        var self = this;

        var hoverOptions        = chart.hover.options,
            hoverEnable         = chart.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback     = chart.click.callback;

        var chartType = chart.chartType;

        var chartInnerBefore    = chartType == 'pie' ?  0 : chart.innerRadius,
            chartOuterBefore    = chartType == 'pie' ?  chart.radius : chart.outerRadius,
            chartInnerAfter     = chartType == 'pie' ?  0 : chart.innerRadius,
            chartOuterAfter     = chartType == 'pie' ?  chart.radius * 1.2 : chart.outerRadius * 1.2;

        self.itemEventFactory = {

            'click': function(item) {
                if (Helper.isFunction(onClickCallback)) {
                    onClickCallback.call(this, item);
                }

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
                if (selector.attr('data-enable') == 'false') {
                    selector.attr('data-enable', true);
                    selector.attr('opacity', '1.0');
                } else {
                    if (totalEnable < 2) return;
                    selector.attr('data-enable', false);
                    selector.attr('opacity', '0.1');
                    enable = false;
                }

                /*----------  Reset opacity after click  ----------*/
                
                self.item.each(function() {
                    if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
                        d3.select(this).attr('opacity', '1.0');
                    }
                });

                chart.selectAllPath().each(function(){
                    if (d3.select(this).attr('data-ref') !== item['data-ref']) {
                        d3.select(this).attr('opacity', '1.0');
                    }
                });
                /*----------  End Reset opacity after click  ----------*/
                

                chart.pie.value(function(d) {
                    if (d["data-ref"] == item["data-ref"]) d.enable = enable;
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
                if (Helper.isFunction(onMouseOverCallback)) {
                    onMouseOverCallback.call(this, item);
                }

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

                if (legendSelector.attr('data-enable') == 'true') {
                    // For Legend
                    self.item.each(function() {
                        if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
                            d3.select(this).attr('opacity', '0.3');
                        }
                    });

                    // For Chart
                    chart.selectAllPath().each(function(){
                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
                            d3.select(this).attr('opacity', '0.3');
                        }
                    });

                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");

                    selector
                        .transition()
                            .duration(500)
                            .ease('bounce')
                            .attr('d', d3.svg.arc()
                                .innerRadius(chartInnerAfter)
                                .outerRadius(chartOuterAfter)
                            );
                }

                

            },

            'mouseout': function(item) {
                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, item);
                }

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

                // if (legendSelector.attr('data-enable') == 'true') {
                    // For Legend
                    self.item.each(function() {
                        if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
                            d3.select(this).attr('opacity', '1.0');
                        }
                    });

                    // For Chart
                    chart.selectAllPath().each(function(){
                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
                            d3.select(this).attr('opacity', '1.0');
                        }
                    });

                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");

                    selector
                        .transition()
                            .duration(500)
                            .ease('bounce')
                            .attr('d', d3.svg.arc()
                                .innerRadius(chartInnerBefore)
                                .outerRadius(chartOuterBefore)
                            );
                // }

                

            }
        
        };

        if (self.show)
            self.item.on(self.itemEventFactory);
    }

    /**
     * Update interaction for barchart
     * @param  {[type]} chart       [description]
     * @return {[type]}             [description]
     */
    updateInteractionForBarChart(chart) {

        var self = this;

        var hoverOptions        = chart.hover.options,
            hoverEnable         = chart.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback     = chart.click.callback;

        self.itemEventFactory = {

            'click': function(item) {
                if (Helper.isFunction(onClickCallback)) {
                    onClickCallback.call(this, item);
                }

                var selector = d3.select(this);
                var enable = true,
                    dataBackup = chart.dataTarget,
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
                if (selector.attr('data-enable') == 'false') {
                    selector.attr('data-enable', 'true');
                    selector.style('opacity', '1.0');
                } else {
                    if (totalEnable < 2) return;
                    selector.attr('data-enable', 'false');
                    selector.style('opacity', '0.1');
                    enable = false;
                }

                //set current data for legend
                self.data.forEach(function(d, i) {
                    if (d.enable)
                        enableSetOld.push(d.group);
                    if (d.group == item.group)
                        d.enable = enable;
                    if (d.enable)
                        enableSet.push(d.group);
                });

                dataBackup.forEach(function (d){
                    var negElement = [];
                    var posElement = [];
                    d.forEach(function (s){
                        enableSet.forEach(function (e, i) {
                            if (e == s.group) {
                                if (s.y0 < 0) negElement.push({e: s, s: i});
                                else posElement.push({e: s, s: i})
                            }
                        });
                    });
                    if (!chart.isGroup) {
                        if (negElement.length > 0) {
                            if (negElement[0].e.y1 < 0) negElement[0].e.y1 = 0;
                            for (var i = 1; i < negElement.length; i++) {
                                negElement[i].e.y1 = negElement[i-1].e.y1 + negElement[i-1].e.y0;
                            };
                        }
                        if (posElement.length > 0) {
                            if (posElement[0].e.y1 - posElement[0].e.y0 != 0) posElement[0].e.y1 = posElement[0].e.y0;
                            for (var i = 1; i < posElement.length; i++) {
                                posElement[i].e.y1 = posElement[i-1].e.y1 + posElement[i].e.y0;
                            };
                        }
                    }
                    var element = new Array(negElement.length + posElement.length);
                    for (var i = 0; i < negElement.length; i++) {
                        element[negElement[i].s] = negElement[i].e;
                    };
                    for (var i = 0; i < posElement.length; i++) {
                        element[posElement[i].s] = posElement[i].e;
                    };
                    data.push(element);
                });

                chart.updateLegendInteraction(data, enableSet, enableSetOld, item.group);
                
            },

            'mouseover': function(item) {
                var selector = d3.select(this);
                selector.style('cursor', 'pointer');
                if (selector.attr('data-enable') == 'true')
                    d3.selectAll('.c9-custom-bar>.c9-custom-rect')
                        .filter(function (d){ return d['group-ref'] != item['group-ref']; })
                        .attr('opacity', 0.3);
            },

            'mouseout': function(item) {
                d3.select(this).style('cursor', 'pointer');
                d3.selectAll('.c9-custom-bar>.c9-custom-rect')
                    .filter(function (d){ return d['group-ref'] != item['group-ref']; })
                    .attr('opacity', 1);
            }
        
        };
        if (self.show)
            self.item.on(self.itemEventFactory);

    }
    

    setYLocation (height, margin) {
        if (this.position === 'top') {
            return (margin.top / 2);
        } else if (this.position === 'bottom') {
            return (height - margin.bottom / 2);
        }
    
    }
    /*=====  End of Main Functions  ======*/
    
}