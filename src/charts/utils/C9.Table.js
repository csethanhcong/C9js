import Helper from '../../helper/C9.Helper';

export default class Table {
    constructor(options, chart) {
        var self = this;

        var config = {
            container: "body",
            show: false,
            headings: ["Name", "Value"],
            style: "stripe", // || "stripe"
            serial: true,
            hover: {
                enable: true,
                callback: null
            },
            click: {
                enable: true,
                callback: null
            }
        };


        self._options   = options;
        self._chart     = chart;

        self.updateConfig(config);
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get data() {
        return this._data;
    }

    get chart() {
        return this._chart;
    }

    get options() {
        return this._options;
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

    set chart(arg) {
        if (arg) {
            this._chart = arg;
        }
    }

    set options(arg) {
        if (arg) {
            this._options = arg;
        }
    }
    /*=====  End of Setter  ======*/

    /*======================================
    =            Main Functions            =
    ======================================*/
    updateConfig(config) {
        var self = this;

        self.options = Helper.mergeDeep(config, self.options);
    }

    update(data) {
        var self = this;

        if (self.chart.chartType == "bar" || self.chart.chartType == "line") {
            //headings
            if (self.options.headings.length < 3 && !data[0].value && data[0][0]["group-ref"] != undefined) 
                self.options.headings.push("Group");

            //data
            self.data = [];
            data.forEach(function(d) {
                (Helper.isArray(d) ? d : d.value).forEach(function(b) {
                    self.data.push(b);
                })
            });
        } else {
            self.data = data;
        }

        if (self.options.show) {
            d3.selectAll('.c9-table').remove();
            d3.selectAll('.c9-table-container').remove();

            var headTbl = d3.select(self.options.container !== 'body' ? '#' + self.options.container : 'body')
                            .append("table")
                                .attr('class', 'c9-table c9-table-header'),
                thead = headTbl.append("thead"),
                bodyTbl = d3.select(self.options.container !== 'body' ? '#' + self.options.container : 'body')
                                .append("div")
                                .attr('class', 'c9-table-container')
                                    .append("table")
                                    .attr('class', function() {
                                        return self.getTableStyle();
                                    }),
                tbody = bodyTbl.append("tbody");

            // Append serial no heading
            // Bind each statistic to a line of the table
            // Show serial no.
            var hRows = thead.append("tr");

            if (self.options.serial) {
                hRows.append("th")
                    .text("#");
            }

            hRows.selectAll("thead")
                .data(self.options.headings)
                .enter()
                .append("th")
                    .text(function(d) {
                        return d;
                    });

            // Bind each statistic to a line of the table
            // Show serial no.
            var bRows = tbody
                .selectAll("tr")
                .data(self.data)
                    .enter()
                        .append("tr")
                        .attr("data-ref", function (d){ return d["data-ref"] });

            if (self.options.serial) {
                bRows.append("td")
                    .text(function(d, i) {
                        return i + 1;
                    });
            }

            // Add statistic names to each row
            bRows.append("td")
                    .text(function(d) {
                        return d.name;
                    });

            // Add values to each row
            bRows.append("td")
                    .text(function(d) {
                        return d.value || d.y0 || d.valueY;
                    });

            // Add group if chart is bar chart
            if (self.chart.chartType == "bar")
                bRows.append("td")
                        .text(function(d) {
                            return d.group;
                        });
        }
    }

    draw() {
        var self = this;

        self.update(self.chart.dataTarget);
    }

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
                
            },

            'mouseover': function(item) {
                if (!item) return;

                var selector = d3.select(this);
                selector.style('cursor', 'pointer');
                // if (selector.attr('data-enable') == 'true')
                    d3.selectAll('.c9-custom-bar>.c9-custom-rect')
                        .filter(function (d){ return d['data-ref'] != item['data-ref']; })
                        .attr('opacity', 0.3);
            },

            'mouseout': function(item) {
                if (!item) return;
                d3.select(this).style('cursor', 'pointer');
                d3.selectAll('.c9-custom-bar>.c9-custom-rect')
                    .filter(function (d){ return d['data-ref'] != item['data-ref']; })
                    .attr('opacity', 1);
            }
        
        };
        if (self.options.show)
            self.selectAllRow().on(self.itemEventFactory);
    }

    updateInteractionForDonutPieChart(chart) {

        var self = this;

        var hoverOptions        = chart.hover.options,
            hoverEnable         = chart.hover.enable,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback     = chart.click.callback;

        var chartType = chart.chartType;

        var chartInnerBefore    = chartType == 'pie' ?  0 : chart.options.innerRadius,
            chartOuterBefore    = chartType == 'pie' ?  chart.options.radius : chart.options.outerRadius,
            chartInnerAfter     = chartType == 'pie' ?  0 : chart.options.innerRadius,
            chartOuterAfter     = chartType == 'pie' ?  chart.options.radius * 1.2 : chart.options.outerRadius * 1.2;
        self.itemEventFactory = {

            'click': function(item) {
                if (Helper.isFunction(onClickCallback)) {
                    onClickCallback.call(this, item);
                }

            },

            'mouseover': function(item) {
                if (!item)
                    return;

                if (Helper.isFunction(onMouseOverCallback)) {
                    onMouseOverCallback.call(this, item);
                }

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');
                // if (legendSelector.attr('enable') == 'true') {

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
                // }

            },

            'mouseout': function(item) {
                if (!item)
                    return;
                
                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, item);
                }

                var legendSelector = d3.select(this);
                // Add pointer to cursor
                legendSelector.style('cursor', 'pointer');

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
            }
        
        };

        if (self.options.show)
            self.selectAllRow().on(self.itemEventFactory);
    }

    selectAllRow(){
        return d3.selectAll(".c9-table tr");
    }

    getTableStyle() {
        var self = this;

        if (self.options.style === 'default') {
            return 'c9-table c9-table-body';
        } else if (self.options.style === 'stripe') {
            return 'c9-table c9-table-body c9-stripe';
        }
    }
    /*=====  End of Main Functions  ======*/
}