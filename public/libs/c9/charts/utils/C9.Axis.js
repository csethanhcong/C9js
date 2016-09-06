'use strict';

export default class Axis {
    constructor(options, body, data, width, height, xAxe, yAxe) {
        var config = {
            x_axis_show     : true,
            x_axis_padding  : {},   // TODO
            x_axis_text     : 'Name',
            y_axis_show     : true,
            y_axis_padding  : {},   // TODO
            y_axis_text     : 'Value',
            num_of_tick_y   : 5,
            tick_format     : "s",   // refer: https://github.com/d3/d3-format
            is_logaric_variant: false, // TODO: Add logaric variant for x axis
            y2_axis_show    : true,
            y2_axis_padding : {},   // TODO
            y2_axis_text    : 'Value',
            grid_x_show: false,
            grid_y_show: false
        };

        this._xAxisShow     = options.x_axis_show      || config.x_axis_show;
        this._xAxisPadding  = options.x_axis_padding   || config.x_axis_padding;
        this._xAxisText     = options.x_axis_text      || config.x_axis_text;
        this._yAxisShow     = options.y_axis_show      || (body.type == "timeline" ? false : config.y_axis_show);
        this._yAxisPadding  = options.y_axis_padding   || config.y_axis_padding;
        this._yAxisText     = options.y_axis_text      || config.y_axis_text;
        this._isLogaricVariant     = options.is_logaric_variant      || config.is_logaric_variant;
        this._tickFormat    = options.tick_format      || config.tick_format;
        this._numOfTickY    = options.num_of_tick_y    || config.num_of_tick_y;
        this._y2AxisShow    = options.y2_axis_show     || config.y2_axis_show;
        this._y2AxisPadding = options.y2_axis_padding  || config.y2_axis_padding;
        this._y2AxisText    = options.y2_axis_text     || config.y2_axis_text;
        this._gridXShow     = options.grid_x_show      || config.grid_x_show;
        this._gridYShow     = options.grid_y_show      || config.grid_y_show;


        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y;

        if (this._isLogaricVariant) {
            y = d3.scale.log().range([height, 0]);
        } else {
            y = d3.scale.linear().range([height, 0]);
        }
        
        x.domain(data.map(function(d) {
            return d.name;
        }));

        if (body.type == "bar")
            y.domain([
                d3.min(data, function(d) {
                    return d.total;
                }), 
                d3.max(data, function(d) {
                    return d.total;
                })
            ]);
        else
            y.domain([
                d3.min(data, function(d) {
                    return d.value;
                }), 
                d3.max(data, function(d) {
                    return d.value;
                })
            ]);

        if (body.type == "timeline") {

            var xScale = d3.time.scale()
                .domain([options.starting, options.ending])
                .range([0, width]);
            this._xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickFormat(options.tickFormat === undefined ? d3.time.format("%I %p") : options.tickFormat.format)
                .tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize)
                .ticks(options.tickFormat === undefined ? d3.time.hours : options.tickFormat.tickTime, options.tickFormat === undefined ? 1 : options.tickFormat.tickInterval);
            delete options.starting;
            delete options.ending;

        } else if (body.type == "line") {

            this._xAxis = xAxe;
            this._yAxis = yAxe;

        } else {
            // Currently, support logaric axis only for y-axis on bar-chart
            // TODO: add for line-chart too
            var _tickFormat = d3.format(this._tickFormat);
            var _numOfTickY = this._numOfTickY;

            this._xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(10);

            // In LOG scale, can't specify default number of ticks
            // must be filter with tickFormat instead
            // refer: https://github.com/d3/d3/wiki/Quantitative-Scales#log_ticks
            if (this._isLogaricVariant) {
                this._yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(_numOfTickY, _tickFormat)
                    .tickSize(10, 0);
            } else {
                this._yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(_numOfTickY)
                    .tickSize(10, 0)
                    .tickFormat(_tickFormat);
            }
        }

        

        // Grid
        if (this._gridXShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            // d3.select(this._svg[0][0].parentNode)
            this._xAxis.innerTickSize(-height)
                .outerTickSize(0);
        }

        if (this._gridYShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            // d3.select(this._svg[0][0].parentNode)
            this._yAxis.innerTickSize(-width)
                .outerTickSize(0);
        }

        this._body    = body;
        this._data   = data;
        this._width  = width;   // TODO : ADD Getter/setter
        this._height  = height;

        if (this._xAxisShow) {
            this._body.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height) + ")")
                .call(this._xAxis)
                .append("text")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("x", width)
                .attr("y", "20")
                .style("text-anchor", "start")
                .text(this._xAxisText);
                // .attr("transform", "rotate(-90)" );
        }

        if (this._yAxisShow) {
            this._body.append("g")
                .attr("class", "y axis")
                .call(this._yAxis)
                .append("text")
                // .attr("transform", "rotate(-90)")
                .attr("y", -10)
                .attr("dy", ".10")
                .style("text-anchor", "end")
                .text(this._yAxisText);
        }


        /**
            TODO:
            - Add y2-axis
        **/
            
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get xAxis() {
        return this._xAxis;
    }

    get yAxis() {
        return this._yAxis;
    }

    get xAxisShow() {
        return this._xAxisShow;
    }

    get xAxisPadding() {
        return this._xAxisPadding;
    }

    get yAxisShow() {
        return this._yAxisShow;
    }

    get yAxisPadding() {
        return this._yAxisPadding;
    }

    get isLogaricVariant() {
        return this._isLogaricVariant;
    }

    get y2AxisShow() {
        return this._y2AxisShow;
    }

    get y2AxisPadding() {
        return this._y2AxisPadding;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set xAxis(newXAxis) {
        if (newXAxis) {
            this._xAxis = newXAxis;
        }
    }

    set yAxis(newYAxis) {
        if (newYAxis) {
            this._yAxis = newYAxis;
        }
    }

    set xAxisShow(newXAxisShow) {
        if (newXAxisShow) {
            this._xAxisShow = newXAxisShow;
        }
    }

    set xAxisPadding(newXAxisPadding) {
        if (newXAxisPadding) {
            this._xAxisPadding = newXAxisPadding;
        }
    }

    set yAxisShow(newYAxisShow) {
        if (newYAxisShow) {
            this._yAxisShow = newYAxisShow;
        }
    }

    set yAxisPadding(newYAxisPadding) {
        if (newYAxisPadding) {
            this._yAxisPadding = newYAxisPadding;
        }
    }

    set isLogaricVariant(newIsLogaricVariant) {
        if (newIsLogaricVariant) {
            this._isLogaricVariant = newIsLogaricVariant;
        }
    }

    set y2AxisShow(newY2AxisShow) {
        if (newY2AxisShow) {
            this._y2AxisShow = newY2AxisShow;
        }
    }

    set y2AxisPadding(newY2AxisPadding) {
        if (newY2AxisPadding) {
            this._y2AxisPadding = newY2AxisPadding;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /*=====  End of Main Functions  ======*/
    
}