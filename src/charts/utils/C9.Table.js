import Helper from '../../helper/C9.Helper';

export default class Table {
    constructor(options, chart, data) {
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

        var self = this;

        self._container = options.container || config.container;
        self._show = options.show ? options.show : config.show;
        self._headings = options.headings || config.headings;
        self._style = options.style || config.style;
        self._serial = options.serial || config.serial;
        self._hover = Helper.merge(options.hover, config.hover);
        self._click = Helper.merge(options.click, config.click);

        if (chart.chartType == "bar" || chart.chartType == "line") {
            //headings
            if (self._headings.length < 3 && !data[0].value && data[0][0]["group-ref"] != undefined) 
                self._headings.push("Group");

            //data
            self._data = [];
            data.forEach(function(d) {
                (Helper.isArray(d) ? d : d.value).forEach(function(b) {
                    self._data.push(b);
                })
            });
        }
        else 
            self._data = data;

        self._chart = chart;

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

    get container() {
        return this._container;
    }

    get show() {
        return this._show;
    }

    get headings() {
        return this._headings;
    }

    get style() {
        return this._style;
    }

    get serial() {
        return this._serial;
    }

    get hover() {
        return this._hover;
    }

    get click() {
        return this._click;
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

    set container(arg) {
        if (arg) {
            this._container = arg;
        }
    }

    set show(arg) {
        if (arg) {
            this._show = arg;
        }
    }

    set headings(arg) {
        if (arg) {
            this._headings = arg;
        }
    }

    set style(arg) {
        if (arg) {
            this._style = arg;
        }
    }

    set serial(arg) {
        if (arg) {
            this._serial = arg;
        }
    }

    set hover(arg) {
        if (arg) {
            this._hover = arg;
        }
    }

    set click(arg) {
        if (arg) {
            this._click = arg;
        }
    }

    /*=====  End of Setter  ======*/

    /*======================================
    =            Main Functions            =
    ======================================*/
    draw() {
        var self = this;

        if (self.show) {

            var headTbl = d3.select(self.container).append("table").attr('class', 'c9-table c9-table-header'),
                thead = headTbl.append("thead"),

                bodyTbl = d3.select(self.container)
                                .append("div").attr('class', 'c9-table-container')
                                    .append("table").attr('class', function() {
                                        if (self.style === 'default') return 'c9-table c9-table-body';
                                        else if (self.style === 'stripe') return 'c9-table c9-table-body c9-stripe';
                                    }),
                tbody = bodyTbl.append("tbody");

            // Append serial no heading
            // Bind each statistic to a line of the table
            // Show serial no.
            var hRows = thead.append("tr");

            if (self.serial) {
                hRows.append("th")
                    .text("#");
            }

            hRows.selectAll("thead")
                .data(self.headings)
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

            if (self.serial) {
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
        if (self.show)
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

        if (self.show)
            self.selectAllRow().on(self.itemEventFactory);
    }
    /*=====  End of Main Functions  ======*/
    selectAllRow(){
        return d3.selectAll(".c9-table tr");
    }
}