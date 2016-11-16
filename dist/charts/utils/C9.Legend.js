"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require("../../helper/C9.Helper");

var _C2 = _interopRequireDefault(_C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Legend = function () {
    function Legend(options, chart) {
        _classCallCheck(this, Legend);

        var self = this;

        var config = {
            show: true,
            position: "top",
            size: 10,
            fontSize: "12px",
            fontColor: "#999",
            fontWeight: 'bold',
            margin: [5, 5, 5, 5],
            space: 10,
            box: false
        };

        self._options = options;
        self._chart = chart;

        self.updateConfig(config);
    }

    /*==============================
    =            Getter            =
    ==============================*/


    _createClass(Legend, [{
        key: "updateConfig",

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        value: function updateConfig(config) {
            var self = this;

            self.options = _C2.default.mergeDeep(config, self.options);

            self.maxWidth = self.chart.width;
            self.maxHeight = self.chart.height;
            self.data = self.chart.dataTarget;
        }
    }, {
        key: "update",
        value: function update(data) {
            var self = this;

            self.data = data;

            if (self.options.show) {
                // Remove current legend
                self.chart.svg.selectAll('.c9-custom-legend.c9-custom-legend-container').remove();

                // var color = self.color;
                var domain = [];

                if (self.chart.chartType == "bar") {
                    self.data = self.data[self.data.reduce(function (p, c, i, a) {
                        return a[p].length > c.length ? p : i;
                    }, 0)];
                }

                // Legend will be appended in main SVG container
                // var container = d3.select(self._body[0][0].parentNode)
                var container = self.chart.svg.append("g").attr("class", "c9-custom-legend c9-custom-legend-container");

                // var legendBox = legendContainer.selectAll(".c9-custom-legend.c9-custom-legend-box").data([true]).enter();

                self.item = container.selectAll("g.c9-custom-legend.c9-custom-legend-item").data(self.data).enter().append("g").attr("class", "c9-custom-legend c9-custom-legend-item").attr('data-ref', function (d) {
                    return d['data-ref'];
                }).attr('data-enable', function (d) {
                    return d['enable'];
                });

                self.item.append('rect').attr('class', 'c9-custom-legend c9-custom-legend-rect').attr('width', self.options.size).attr('height', self.options.size).attr('r', self.options.size).attr('fill', function (d) {
                    return d.color || d[0].color;
                })
                // .attr('stroke', function(d){ return d.color || d[0].color; })
                .style('cursor', 'pointer');

                self.item.append('rect').attr('width', 5).attr('height', self.options.size).attr('x', self.options.size).attr('y', 0).attr('opacity', 0).style('cursor', 'pointer');

                self.item.append('text').attr('class', 'c9-custom-legend c9-custom-legend-text').attr('x', self.options.size + 5).attr('y', self.options.size).style('font-size', self.options.fontSize).style('font-weight', self.options.fontWeight).style('fill', self.options.fontColor).style('cursor', 'pointer')
                // .attr('text-anchor', 'middle')
                .text(function (d) {
                    return self.chart.chartType == "bar" ? d.group : d.name;
                });

                //caculate position for legend
                var getSize = function getSize(item) {
                    return item.getBoundingClientRect();
                };
                var getXY = function getXY(item) {
                    var xy = d3.select(item).attr('transform').split(',');
                    return {
                        x: parseFloat(xy[0].replace('translate(', '')),
                        y: parseFloat(xy[1].replace(')', ''))
                    };
                };

                var r = 0; // current row
                var items = self.chart.svg.selectAll(".c9-custom-legend-item")[0];
                var itemHeight = getSize(items[0]).height;
                var numItemsCol = Math.floor((self.maxHeight - self.options.margin[0] - self.options.margin[2]) / (itemHeight + self.options.space));

                if (self.options.space > itemHeight) numItemsCol++;

                var maxWidthCol = new Array(Math.floor(items.length / numItemsCol));

                items.forEach(function (i, n) {
                    var pos = Math.floor(n / numItemsCol);
                    var width = getSize(i).width;
                    if (maxWidthCol[pos] == undefined || width > maxWidthCol[pos]) maxWidthCol[pos] = width;
                });

                if (self.options.position == "bottom") {
                    self.item.attr("transform", function (d, i) {
                        if (i > 0) {
                            var item = items[i];
                            var preItem = items[i - 1];
                            var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.options.space + getSize(item).width + self.options.margin[1]) / self.maxWidth);
                            if (newR > 0) r++;
                            return "translate(" + (newR > 0 ? self.options.margin[3] : getXY(preItem).x + getSize(preItem).width + self.options.space) + "," + (self.maxHeight - self.options.margin[0] - itemHeight - r * (itemHeight + self.options.space)) + ")";
                        } else {
                            return "translate(" + self.options.margin[3] + "," + (self.maxHeight - self.options.margin[0] - itemHeight) + ")";
                        }
                    });
                } else if (self.options.position == "left") {
                    self.item.attr("transform", function (d, i) {
                        var pos = Math.floor(i / numItemsCol);

                        if (i > 0) {
                            var prePos = Math.floor((i - 1) / numItemsCol);
                            var item = items[i];
                            var preItem = items[i - 1];
                            return "translate(" + (pos > prePos ? maxWidthCol[pos] + self.options.space + getXY(preItem).x : getXY(preItem).x) + "," + (pos > prePos ? self.options.margin[0] : getXY(preItem).y + getSize(preItem).height + self.options.space) + ")";
                        } else return "translate(" + self.options.margin[3] + "," + self.options.margin[0] + ")";
                    });
                } else if (self.options.position == "right") {
                    self.item.attr("transform", function (d, i) {
                        var pos = Math.floor(i / numItemsCol);
                        if (i > 0) {
                            var prePos = Math.floor((i - 1) / numItemsCol);
                            var item = items[i];
                            var preItem = items[i - 1];
                            return "translate(" + (pos > prePos ? getXY(preItem).x - self.options.space - maxWidthCol[pos] : getXY(preItem).x) + "," + (pos > prePos ? self.options.margin[0] : getXY(preItem).y + getSize(preItem).height + self.options.space) + ")";
                        } else return "translate(" + (self.maxWidth - self.options.margin[3] - maxWidthCol[pos]) + "," + self.options.margin[0] + ")";
                    });
                } else {
                    self.item.attr("transform", function (d, i) {
                        if (i > 0) {
                            var item = items[i];
                            var preItem = items[i - 1];
                            var newR = Math.floor((getXY(preItem).x + getSize(preItem).width + self.options.space + getSize(item).width + self.options.margin[1]) / self.maxWidth);
                            if (newR > 0) r++;

                            return "translate(" + (newR > 0 ? self.options.margin[3] : getXY(preItem).x + getSize(preItem).width + self.options.space) + "," + (self.options.margin[0] + r * (itemHeight + self.options.space)) + ")";
                        } else return "translate(" + self.options.margin[3] + "," + self.options.margin[0] + ")";
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
    }, {
        key: "draw",
        value: function draw() {
            var self = this;

            self.update(self.chart.dataTarget);
        }

        /**
         * Update interaction event dispatchers for legend
         * For: Donut Chart, Pie Chart
         */

    }, {
        key: "updateInteractionForLineChart",
        value: function updateInteractionForLineChart(chart) {

            var self = this;

            var hoverOptions = chart.hover.options,
                hoverEnable = chart.hover.enable,
                onMouseOverCallback = hoverOptions.onMouseOver.callback,
                onMouseOutCallback = hoverOptions.onMouseOut.callback,
                onClickCallback = chart.click.callback;

            self.itemEventFactory = {

                'click': function click(item) {
                    if (_C2.default.isFunction(onClickCallback)) {
                        onClickCallback.call(this, item);
                    }

                    var selector = d3.select(this);
                    var enable = true,
                        dataSet = self.data;
                    var totalEnable = d3.sum(dataSet.map(function (d) {
                        return d.enable ? 1 : 0;
                    }));

                    // Add pointer to cursor
                    // selector.style('cursor', 'pointer');

                    // If current selector is disabled, then turn it on back
                    // Else, set enable to false
                    if (selector.attr('data-enable') == 'false') {
                        selector.attr('data-enable', true);
                        selector.style('opacity', '1');
                    } else {
                        if (totalEnable < 2) return;
                        selector.attr('data-enable', false);
                        selector.style('opacity', '0.1');
                        enable = false;
                    }

                    // update line
                    var newData = [];
                    chart.dataTarget.forEach(function (_data) {
                        if (_data['data-ref'] == item['data-ref']) _data.enable = enable;
                        if (_data.enable) newData.push(_data);
                    });

                    chart.updateDomain(newData);
                    chart.axis.update(chart.x, chart.y, 750);
                    chart.update(newData);

                    // Update subchart
                    if (chart.options.subchart.show) {
                        chart.subChartX.domain(chart.x.domain());
                        chart.subChartY.domain(chart.y.domain());
                        chart.svg.select('.c9-subchart-custom .c9-subchart-axis').transition().duration(750).call(chart.subChartXAxis);
                        chart.updateSubChart(newData);
                    }
                },

                'mouseover': function mouseover(item) {
                    if (_C2.default.isFunction(onMouseOverCallback)) {
                        onMouseOverCallback.call(this, item);
                    }

                    var legendSelector = d3.select(this);

                    // Add pointer to cursor and make it lighten
                    // legendSelector.style('cursor', 'pointer');
                    self.lightenLegendItem(legendSelector);
                },

                'mouseout': function mouseout(item) {
                    if (_C2.default.isFunction(onMouseOutCallback)) {
                        onMouseOutCallback.call(this, item);
                    }

                    var legendSelector = d3.select(this);

                    // Add pointer to cursor
                    // legendSelector.style('cursor', 'pointer');
                    self.normalizeLegendItem(legendSelector);
                }

            };

            if (self.options.show) {
                self.item.on(self.itemEventFactory);
            }
        }

        /**
         * Update interaction event dispatchers for legend
         * For: Donut Chart, Pie Chart
         */

    }, {
        key: "updateInteractionForDonutPieChart",
        value: function updateInteractionForDonutPieChart(chart, path, pie, currentData, arc) {

            var self = this;

            var hoverOptions = chart.hover.options,
                hoverEnable = chart.hover.enable,
                onMouseOverCallback = hoverOptions.onMouseOver.callback,
                onMouseOutCallback = hoverOptions.onMouseOut.callback,
                onClickCallback = chart.click.callback;

            var chartType = chart.chartType;

            var chartInnerBefore = chartType == 'pie' ? 0 : chart.options.innerRadius,
                chartOuterBefore = chartType == 'pie' ? chart.options.radius : chart.options.outerRadius,
                chartInnerAfter = chartType == 'pie' ? 0 : chart.options.innerRadius,
                chartOuterAfter = chartType == 'pie' ? chart.options.radius * 1.2 : chart.options.outerRadius * 1.2;

            self.itemEventFactory = {

                'click': function click(item) {
                    if (_C2.default.isFunction(onClickCallback)) {
                        onClickCallback.call(this, item);
                    }

                    var selector = d3.select(this);
                    var enable = true,
                        dataSet = self.data;
                    var totalEnable = d3.sum(dataSet.map(function (d) {
                        return d.enable ? 1 : 0;
                    }));

                    // Add pointer to cursor
                    // selector.style('cursor', 'pointer');

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

                    self.item.each(function () {
                        if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable') == 'true') {
                            d3.select(this).attr('opacity', '1.0');
                        }
                    });

                    chart.selectAllPath().each(function () {
                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
                            d3.select(this).attr('opacity', '1.0');
                        }
                    });
                    /*----------  End Reset opacity after click  ----------*/

                    chart.pie.value(function (d) {
                        if (d["data-ref"] == item["data-ref"]) d.enable = enable;
                        return d.enable ? d.value : 0;
                    });

                    path = path.data(chart.pie(dataSet));

                    path.transition().duration(500).attrTween('d', function (d) {
                        var interpolate = d3.interpolate(chart.currentData, d);
                        // Returns an interpolator between the two arbitrary values a and b. 
                        // The interpolator implementation is based on the type of the end value b.
                        chart.currentData = interpolate(0);
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    })
                    // Remove stroke when re-draw arcs to avoid duplicate strokes
                    .attr('stroke', 'none');;
                },

                'mouseover': function mouseover(item) {
                    if (_C2.default.isFunction(onMouseOverCallback)) {
                        onMouseOverCallback.call(this, item);
                    }

                    var legendSelector = d3.select(this);
                    // Add pointer to cursor
                    // legendSelector.style('cursor', 'pointer');
                    self.lightenLegendItem(legendSelector);

                    if (legendSelector.attr('data-enable')) {
                        // For Legend
                        self.item.each(function () {
                            if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable')) {
                                d3.select(this).attr('opacity', '0.3');
                            }
                        });

                        // For Chart
                        chart.selectAllPath().each(function () {
                            if (d3.select(this).attr('data-ref') !== item['data-ref']) {
                                d3.select(this).attr('opacity', '0.3');
                            }
                        });

                        var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");

                        selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerAfter).outerRadius(chartOuterAfter));
                    }
                },

                'mouseout': function mouseout(item) {
                    if (_C2.default.isFunction(onMouseOutCallback)) {
                        onMouseOutCallback.call(this, item);
                    }

                    var legendSelector = d3.select(this);
                    // Add pointer to cursor
                    // legendSelector.style('cursor', 'pointer');
                    self.normalizeLegendItem(legendSelector);

                    // if (legendSelector.attr('data-enable') == 'true') {
                    // For Legend
                    self.item.each(function () {
                        if (d3.select(this).attr('data-ref') !== item['data-ref'] && d3.select(this).attr('data-enable')) {
                            d3.select(this).attr('opacity', '1.0');
                        }
                    });

                    // For Chart
                    chart.selectAllPath().each(function () {
                        if (d3.select(this).attr('data-ref') !== item['data-ref']) {
                            d3.select(this).attr('opacity', '1.0');
                        }
                    });

                    var selector = d3.select("path[data-ref='" + item['data-ref'] + "']");

                    selector.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(chartInnerBefore).outerRadius(chartOuterBefore));
                    // }
                }

            };

            if (self.options.show) self.item.on(self.itemEventFactory);
        }

        /**
         * Update interaction for barchart
         * @param  {[type]} chart       [description]
         * @return {[type]}             [description]
         */

    }, {
        key: "updateInteractionForBarChart",
        value: function updateInteractionForBarChart(chart) {

            var self = this;

            var hoverOptions = chart.hover.options,
                hoverEnable = chart.hover.enable,
                onMouseOverCallback = hoverOptions.onMouseOver.callback,
                onMouseOutCallback = hoverOptions.onMouseOut.callback,
                onClickCallback = chart.click.callback;

            self.itemEventFactory = {

                'click': function click(item) {
                    if (_C2.default.isFunction(onClickCallback)) {
                        onClickCallback.call(this, item);
                    }

                    var selector = d3.select(this);
                    var enable = true,
                        dataBackup = chart.dataTarget,
                        dataSet = self.data;
                    var totalEnable = d3.sum(dataSet.map(function (d) {
                        return d.enable ? 1 : 0;
                    }));

                    var enableSet = [];
                    var enableSetOld = [];
                    var data = [];
                    // Add pointer to cursor
                    // selector.style('cursor', 'pointer');

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
                    self.data.forEach(function (d, i) {
                        if (d.enable) enableSetOld.push(d.group);
                        if (d.group == item.group) d.enable = enable;
                        if (d.enable) enableSet.push(d.group);
                    });

                    dataBackup.forEach(function (d) {
                        var negElement = [];
                        var posElement = [];
                        d.forEach(function (s) {
                            enableSet.forEach(function (e, i) {
                                if (e == s.group) {
                                    if (s.y0 < 0) negElement.push({ e: s, s: i });else posElement.push({ e: s, s: i });
                                }
                            });
                        });
                        if (!chart.isGroup) {
                            if (negElement.length > 0) {
                                if (negElement[0].e.y1 < 0) negElement[0].e.y1 = 0;
                                for (var i = 1; i < negElement.length; i++) {
                                    negElement[i].e.y1 = negElement[i - 1].e.y1 + negElement[i - 1].e.y0;
                                };
                            }
                            if (posElement.length > 0) {
                                if (posElement[0].e.y1 - posElement[0].e.y0 != 0) posElement[0].e.y1 = posElement[0].e.y0;
                                for (var i = 1; i < posElement.length; i++) {
                                    posElement[i].e.y1 = posElement[i - 1].e.y1 + posElement[i].e.y0;
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

                'mouseover': function mouseover(item) {
                    var selector = d3.select(this);
                    // selector.style('cursor', 'pointer');
                    self.lightenLegendItem(selector);

                    if (selector.attr('data-enable') == 'true') d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
                        return d['group-ref'] != item['group-ref'];
                    }).attr('opacity', 0.3);
                },

                'mouseout': function mouseout(item) {
                    var selector = d3.select(this);
                    // selector.style('cursor', 'pointer');
                    self.normalizeLegendItem(selector);

                    d3.selectAll('.c9-custom-bar>.c9-custom-rect').filter(function (d) {
                        return d['group-ref'] != item['group-ref'];
                    }).attr('opacity', 1);
                }

            };
            if (self.options.show) self.item.on(self.itemEventFactory);
        }
    }, {
        key: "lightenLegendItem",
        value: function lightenLegendItem(item) {
            var self = this;

            item.select('.c9-custom-legend-rect').attr('fill', function (d) {
                return _C2.default.shadeColor(0.5, d.color || d[0].color);
            });
            item.select('.c9-custom-legend-text').style('fill', function (d) {
                return _C2.default.shadeColor(-0.5, self.options.fontColor);
            });
        }
    }, {
        key: "normalizeLegendItem",
        value: function normalizeLegendItem(item) {
            var self = this;

            item.select('.c9-custom-legend-rect').attr('fill', function (d) {
                return d.color || d[0].color;
            });
            item.select('.c9-custom-legend-text').style('fill', function (d) {
                return self.options.fontColor;
            });
        }
        /*=====  End of Main Functions  ======*/

    }, {
        key: "options",
        get: function get() {
            return this._options;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(arg) {
            if (arg) {
                this._options = arg;
            }
        }
    }, {
        key: "data",
        get: function get() {
            return this._data;
        },
        set: function set(arg) {
            if (arg) {
                this._data = arg;
            }
        }
    }, {
        key: "chart",
        get: function get() {
            return this._chart;
        },
        set: function set(arg) {
            if (arg) {
                this._chart = arg;
            }
        }
    }, {
        key: "item",
        get: function get() {
            return this._item;
        },
        set: function set(arg) {
            if (arg) {
                this._item = arg;
            }
        }
    }, {
        key: "itemEventFactory",
        get: function get() {
            return this._itemEventFactory;
        },
        set: function set(arg) {
            if (arg) {
                this._itemEventFactory = arg;
            }
        }
    }, {
        key: "maxWidth",
        get: function get() {
            return this._maxWidth;
        },
        set: function set(arg) {
            if (arg) {
                this._maxWidth = arg;
            }
        }
    }, {
        key: "maxHeight",
        get: function get() {
            return this._maxHeight;
        },
        set: function set(arg) {
            if (arg) {
                this._maxHeight = arg;
            }
        }
    }]);

    return Legend;
}();

exports.default = Legend;