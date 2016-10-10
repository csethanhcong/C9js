import Helper from '../../helper/C9.Helper';

export default class Tooltip {
    constructor(options) {
        var self = this;

        var config = {
            show: true,
            position: 'top', // [top, right, bottom, left]
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            fontColor: '#fff',
            fontSize: '11px',
            trianglePosition: 'left', // [top, right, bottom, left]
            format: {
                title: function(d) {
                    return 'Title ' + d;
                },
                detail: function(d) {
                    return 'Detail ' + d;
                }
            }
        };

        self._show              = options.show || config.show;
        self._position          = options.position || config.position;
        self._backgroundColor   = options.backgroundColor || config.backgroundColor;
        self._fontColor         = options.fontColor || config.fontColor;
        self._fontSize         = options.fontSize || config.fontSize;
        self._trianglePosition         = options.trianglePosition || config.trianglePosition;

        self._format            = Helper.merge(options.format, config.format);

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

    get trianglePosition() {
        return this._trianglePosition;
    }

    get format() {
        return this._format;
    }

    get eventFactory() {
        return this._eventFactory;
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

    set trianglePosition(arg) {
        if (arg) {
            this._trianglePosition = arg;
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
                            .attr('class', function() { return 'c9-custom-tooltip-container ' + self.getTriangleClass(); })
                            // .attr("transform", function() { return 'translate(' + (d3.mouse(this)[0] - 100) +","+ (d3.mouse(this)[1] - 100) + ')'; })
                            .style('display', 'none')
                            .style('position', 'absolute')
                            .style('pointer-events', 'all')
                            .style('background-color', self.backgroundColor)
                            .style('color', self.fontColor)
                            .style('font-size', self.fontSize)
                            // .style('width', '100px')
                            // .style('height', '50px')
                            .html(function() {
                                return '<strong>' + self.format.title(data.data.name) + '</strong>' + '<br><span>' + self.format.detail(data.data.value) + '</span>';
                            });

        self.eventFactory = {

            'mouseover': function(data) {
                divOnHover.transition()
                    // .style('left', function() {return d3.mouse(this)[0] + 'px';})
                    .style('left', function() {return d3.event.pageX + 'px';})
                    // .style('top', function() {return d3.mouse(this)[1]  + 'px';})
                    .style('top', function() {return d3.event.pageY  + 'px';})
                    .duration(200)
                    .style("display", 'block')
                    .style('pointer-events', 'none');
            },

            'mouseout': function(data) {
                divOnHover.transition()
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
            }

        }

    }

    getTriangleClass() {
        var self = this;
        let r ;

        switch(self.trianglePosition) {
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


    /*=====  End of Main Functions  ======*/

}