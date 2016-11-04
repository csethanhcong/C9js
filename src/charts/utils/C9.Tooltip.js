import Helper from '../../helper/C9.Helper';

export default class Tooltip {
    constructor(options) {
        var self = this;

        var config = {
            show: true,
            position: 'left', // [top, right, bottom, left]
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            fontColor: '#fff',
            fontSize: '11px',
        };

        self._show              = options.show || config.show;
        self._position          = options.position || config.position;
        self._backgroundColor   = options.backgroundColor || config.backgroundColor;
        self._fontColor         = options.fontColor || config.fontColor;
        self._fontSize          = options.fontSize || config.fontSize;

        self._options            = options;

    }

    /*==============================
    =            Getter            =
    ==============================*/
    get show() {
        return this._show;
    }

    get position() {
        return this._position;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    get fontColor() {
        return this._fontColor;
    }

    get fontSize() {
        return this._fontSize;
    }

    get format() {
        return this._format;
    }

    get eventFactory() {
        return this._eventFactory;
    }

    get options() {
        return this._options;
    }


    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set show(arg) {
        if (arg) {
            this._show = arg;
        }
    }

    set position(arg) {
        if (arg) {
            this._position = arg;
        }
    }

    set backgroundColor(arg) {
        if (arg) {
            this._backgroundColor = arg;
        }
    }

    set fontColor(arg) {
        if (arg) {
            this._fontColor = arg;
        }
    }

    set fontSize(arg) {
        if (arg) {
            this._fontSize = arg;
        }
    }

    set format(arg) {
        if (arg) {
            this._format = arg;
        }
    }

    set eventFactory(arg) {
        if (arg) {
            this._eventFactory = arg;
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

    /**
     * [draw description]
     * @return {[type]} [description]
     */
    draw(data, chart, eventType) {
        var self = this;

        var format = self.format;

        // First of all, remove all exisiting tooltips
        d3.select(chart.id).selectAll('.c9-custom-tooltip-container').remove();

        var selector = d3.select(chart.id);

        // TODO: Add margin to tooltip configs
        // Default: (100, 100) relative to mouse coordinate and chart margin transformation
        var divOnHover = selector.append('div')
                            .attr('class', function() { 
                                return 'c9-custom-tooltip-container ' + self.getTriangleClass(); 
                            })
                            // .attr("transform", function() { return 'translate(' + (d3.mouse(this)[0] - 100) +","+ (d3.mouse(this)[1] - 100) + ')'; })
                            .style('display', 'none')
                            .style('position', 'absolute')
                            .style('pointer-events', 'all')
                            .style('background-color', self.backgroundColor)
                            .style('color', self.fontColor)
                            .style('font-size', self.fontSize);
                            // .style('width', '100px')
                            // .style('height', '50px')
                            // .html(function() {
                            //     return self.getFormatByChartType(chart, data);
                            // });

        self.eventFactory = {

            'mouseover': function(_data) {
                divOnHover
                    .html(function() {
                        return self.getFormatByChartType(chart, _data);
                    })
                    .transition()
                    // .style('left', function() {return d3.mouse(this)[0] + 'px';})
                    .style('left', function() {
                        return self.getCoordinate()['left'];
                    })
                    // .style('top', function() {return d3.mouse(this)[1]  + 'px';})
                    .style('top', function() {
                        return self.getCoordinate()['top'];
                    })
                    .duration(200)
                    .style("display", 'block')
                    .style('pointer-events', 'none');
            },

            'mousemove': function(_data) {
                divOnHover
                    .html(function() {
                        return self.getFormatByChartType(chart, _data);
                    })
                    .transition()
                    // .style('left', function() {return d3.mouse(this)[0] + 'px';})
                    .style('left', function() {
                        return self.getCoordinate()['left'];
                    })
                    // .style('top', function() {return d3.mouse(this)[1]  + 'px';})
                    .style('top', function() {
                        return self.getCoordinate()['top'];
                    })
                    .duration(200)
                    .style("display", 'block')
                    .style('pointer-events', 'none');
            },

            'mouseout': function(_data) {
                divOnHover
                    .transition()
                    .duration(200)      
                    .style('display', 'none');

            }

        };

        if (self.show) {

            switch(eventType) {
                case 'mouseover':
                    self.eventFactory.mouseover(data);
                    break;
                case 'mouseout':
                    self.eventFactory.mouseout(data);
                    break;
                case 'mousemove':
                    self.eventFactory.mousemove(data);
                    break;
            }

        }

    }

    getTriangleClass() {
        var self = this;
        let r ;

        switch(self.position) {
            case 'top':
                r = 'c9-tooltip-top';
                break;
            case 'right':
                r = 'c9-tooltip-right';
                break;
            case 'bottom':
                r = 'c9-tooltip-bottom';
                break;
            case 'left':
                r = 'c9-tooltip-left';
                break;
        }
        return r;
    }

    setDefaultFormatByChartType(chart, data) {
        // if (Helper.isEmpty(data)) { console.log(data);return false;}
        var self = this;

        let chartType = chart.chartType, format;

        switch(chartType) {
            case 'bar':
                format = function(data) {
                    return '<strong>' + data.name + '</strong>' + '<br><span>' + data.value + '</span>'
                };
                break;
            case 'pie':
                format = function(data) {
                    return '<strong>' + data.data.name + '</strong>' + '<br><span>' + data.data.value + '</span>' 
                };
                break;
            case 'donut':
                format = function(data) {
                    return '<strong>' + data.data.name + '</strong>' + '<br><span>' + data.data.value + '</span>' 
                };
                break;
            case 'line':
                format = function(data) {
                    let _format = '';
                    data.forEach(function(d, i){
                        _format += '<strong>' + d.name + '</strong>' + '<br><span> Value X: ' + d.valueX + '</span>' + '<br><span> Value Y: ' + d.valueY + '</span><br>';    
                    });
                    return _format;
                };
                break;
            case 'timeline':
                format = function(data) {
                    return '<strong>' + data.name + '</strong>' + '<br><span> Start at: ' + data.start + '</span><br><span> End at: ' + data.end + '</span>' 
                };
                break;
        }

        // Update format for tooltip based on chart type
        self.format     = self.options.format || format;
        // console.log(self.format);

    }

    getCoordinate() {
        var self = this;
        let r ;

        switch(self.position) {
            case 'top':
                r = {
                    'left': (d3.event.pageX - 50) + 'px',
                    'top': (d3.event.pageY - 50) + 'px'
                };
                break;
            case 'right':
                r = {
                    'left': (d3.event.pageX - 50) + 'px',
                    'top': (d3.event.pageY - 50) + 'px'
                };
                break;
            case 'bottom':
                r = {
                    'left': (d3.event.pageX - 50) + 'px',
                    'top': (d3.event.pageY + 50) + 'px'
                };
                break;
            case 'left':
                r = {
                    'left': (d3.event.pageX + 50) + 'px',
                    'top': (d3.event.pageY - 50) + 'px'
                };
                break;
        }
        return r;
    }

    getFormatByChartType(chart, data) {
        var self = this;

        self.setDefaultFormatByChartType(chart, data);

        let r = self.format(data);

        return r;
    }


    /*=====  End of Main Functions  ======*/

}