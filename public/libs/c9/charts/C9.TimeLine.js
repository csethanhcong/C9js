import Chart from './C9.Chart';
import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';

export default class TimeLine extends Chart {
    constructor(options) {
        super(options);
        var self = this;

        var config = {
            rowSeparator: null,
            backgroundColor: null,
            starting: 0,
            ending: 0,
            stack: false, //test
            // rotateTicks: false,
            itemHeight: 20,
            itemMargin: 5,
            labelMargin: 20
        };

        self.body.type        = "timeline";
        self._stack             = options.stack || config.stack;
        self._starting          = options.starting || config.starting;
        self._ending            = options.ending || config.ending;
        self._rowSeparator      = options.rowSeparator || config.rowSeparator;
        self._backgroundColor   = options.backgroundColor || config.backgroundColor;
        self._itemHeight        = options.itemHeight || config.itemHeight;
        self._itemMargin        = options.itemMargin || config.itemMargin;
        self._labelMargin       = options.labelMargin || config.labelMargin;
        self._maxStack          = 1;

        self.initTimelineConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get stack() {
        return this._stack;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    get rowSeparator() {
        return this._rowSeparator;
    }

    get starting() {
        return this._starting;
    }

    get ending() {
        return this._ending;
    }

    get itemHeight() {
        return this._itemHeight;
    }

    get itemMargin() {
        return this._itemMargin;
    }

    get labelMargin() {
        return this._labelMargin;
    }

    get maxStack() {
        return this._maxStack;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set stack(newStack) {
        if (newStack) {
            this._stacked = newStack;
        }
    }

    set backgroundColor(newBackgroundColor) {
        if (newBackgroundColor) {
            this.backgroundColor = newBackgroundColor;
        }
    }

    set rowSeparator(newRowSeparator) {
        if (newRowSeparator) {
            this._rowSeparator = newRowSeparator;
        }
    }

    set starting(newStarting) {
        if (newStarting) {
            this._starting = newStarting;
        }
    }

    set ending(newEnding) {
        if (newEnding) {
            this._ending = newEnding;
        }
    }

    set itemHeight(newItemHeight) {
        if (newItemHeight) {
            this._itemHeight = newItemHeight;
        }
    }

    set itemMargin(newItemMargin) {
        if (newItemMargin) {
            this._itemMargin = newItemMargin;
        }
    }

    set labelMargin(newLabelMargin) {
        if (newLabelMargin) {
            this._labelMargin = newLabelMargin;
        }
    }

    set maxStack(newMaxStack) {
        if (newMaxStack) {
            this._maxStack = newMaxStack;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    initTimelineConfig() {
        var self = this;
        var color = self.colorRange;
        var stackList = {},
            maxStack = 0,
            minTime = 0,
            maxTime = 0,
            width = self.width - self.margin.left - self.margin.right,
            height = self.height - self.margin.top - self.margin.bottom;

        // count number of stack and calculate min time, max time from data
        if (self.stack || self.ending === 0 || self.starting === 0) {
            
            self.data.forEach(function (datum, index) {

                if (self.stack && Object.keys(stackList).indexOf(index) == -1) {
                    stackList[index] = maxStack;
                    maxStack++;
                }

                datum.times.forEach(function (time, i) {
                    if(self.starting === 0)
                        if (time.startingTime < minTime || minTime === 0)
                            minTime = time.startingTime;
                    if(self.ending === 0) {
                        if (time.startingTime > maxTime)
                            maxTime = time.startingTime;
                        if (time.endingTime > maxTime)
                            maxTime = time.endingTime;
                    }
                });
            });

            if (self.ending === 0) {
              self.ending = maxTime;
            }
            if (self.starting === 0) {
              self.starting = minTime;
            }
        }

        self.maxStack = maxStack;
        var scale = width / (self.ending - self.starting);

        self.data.forEach( function(datum, index){
            var data = datum.times;
            //draw background
            if (self.backgroundColor) { 
                var barYAxis = ((self.itemHeight + self.itemMargin) * stackList[index]);
                self.body.selectAll("g")
                    .data(data).enter()
                    .insert("rect")
                    .attr("class", "timeline-background-bar")
                    .attr("x", 0)
                    .attr("width", width)
                    .attr("y", barYAxis)
                    .attr("height", self.itemHeight)
                    .attr("fill", self.backgroundColor instanceof Function ? self.backgroundColor(index) : self.backgroundColor);
            }

            //draw item
            self.body.selectAll("g")
                .data(data).enter()
                .append(function(d, i) {
                    return document.createElementNS(d3.ns.prefix.svg, "endingTime" in d? "rect" : "circle");
                })
                .attr("x", getXPos)
                .attr("y", getStackPosition)
                .attr("width", function (d, i) {
                    return (d.endingTime - d.startingTime) * scale;
                })
                .attr("cy", function(d, i) {
                    return getStackPosition(d, i) + self.itemHeight / 2;
                })
                .attr("cx", getXPos)
                .attr("r", self.itemHeight / 2)
                .attr("height", self.itemHeight)
                .style("fill", color(index));

            //draw label inside item
            self.body.selectAll("g")
                .data(data).enter()
                .append("text")
                .attr("x", getXTextPos)
                .attr("y", getStackTextPosition)
                .text(function(d) {
                  return d.name;
                });

            if (self.rowSeparator && index < self.maxStack - 1) {
                var lineYAxis = ( self.itemHeight + self.itemMargin / 2 + (self.itemHeight + self.itemMargin) * stackList[index]);
                self.body.append("svg:line")
                  .attr("class", "timeline-row-separator")
                  .attr("x1", 0)
                  .attr("x2", width)
                  .attr("y1", lineYAxis)
                  .attr("y2", lineYAxis)
                  .attr("stroke-width", 1)
                  .attr("stroke", self.rowSeparator instanceof Function ? self.rowSeparator(index) : self.rowSeparator);
            }

            //draw the label left side item
            if (typeof(datum.name) !== "undefined") { 
                var rowsDown = self.margin.top + (self.itemHeight + self.itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + self.itemHeight * 0.75;

                d3.select(self.body[0][0].parentNode).append("text")
                    .attr("class", "timeline-label")
                    .attr("transform", "translate(" + self.labelMargin + "," + rowsDown + ")")
                    .text(datum.name);
            }
            //draw icon
            else if (typeof(datum.icon) !== "undefined") {
                d3.select(self.body[0][0].parentNode).append("image")
                    .attr("class", "timeline-label")
                    .attr("transform", "translate("+ self.labelMargin +","+ (self.margin.top + (self.itemHeight + self.itemMargin) * stackList[index])+")")
                    .attr("xlink:href", datum.icon)
                    .attr("width", self.itemHeight)
                    .attr("height", self.itemHeight);
            }

            function getStackPosition(d, i) {
                if (self.stack) {
                    return (self.itemHeight + self.itemMargin) * stackList[index];
                }
                return 0;
            }
            function getStackTextPosition(d, i) {
                if (self.stack) {
                    return (self.itemHeight + self.itemMargin) * stackList[index] + self.itemHeight * 0.75;
                }
                return self.itemHeight * 0.75;
            }
        });

        function getXPos(d, i) {
            return (d.startingTime - self.starting) * scale;
        }

        function getXTextPos(d, i) {
            return (d.startingTime - self.starting) * scale + 5;
        }
    }

    draw() {
        this.options.starting = this.starting;
        this.options.ending = this.ending;
        var axis    = new Axis(this.options, this.body, this.data, this.width - this.margin.left - this.margin.right, (this.itemHeight + this.itemMargin) * this.maxStack, null, null);
        var title   = new Title(this.options, this.body, this.width, this.height, this.margin);    
        var legend  = new Legend(this.options, this.body, this.colorRange, this.data);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}

