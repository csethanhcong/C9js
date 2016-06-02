'use strict';

class TimeLine extends Chart {
    constructor(options) {
        super(options);
        var config = {
            rowSeparators: null,
            backgroundColor: null,
            itemColors: d3.scale.category20(),
            starting: 0,
            ending: 0,
            stacked: false, //test
            // rotateTicks: false,
            itemHeight: 20,
            itemMargin: 5,
            labelMargin: 20
        };

        this.svg.c9Chart = "timeline";
        this._stacked           = options.stacked || config.stacked;
        this._starting          = options.starting || config.starting;
        this._ending            = options.ending || config.ending;
        this._itemColors        = options.itemColors || config.itemColors;
        this._rowSeparators     = options.rowSeparators || config.rowSeparators;
        this._backgroundColor   = options.backgroundColor || config.backgroundColor;
        this._itemHeight        = options.itemHeight || config.itemHeight;
        this._itemMargin        = options.itemMargin || config.itemMargin;
        this._labelMargin       = options.labelMargin || config.labelMargin;

        var stackList = {},
            maxStack = 0,
            minTime = 0,
            maxTime = 0,
            stacked = this._stacked,
            starting = this._starting,
            ending = this._ending,
            backgroundColor = this._backgroundColor,
            itemHeight = this._itemHeight,
            itemMargin = this._itemMargin,
            svg = this.svg,
            itemColors = this._itemColors,
            width = this.width - this.margin.left - this.margin.right,
            height = this.height - this.margin.top - this.margin.bottom,
            rowSeparators = this._rowSeparators,
            labelMargin = this._labelMargin,
            margin = this.margin;

        // count number of stack and calculate min time, max time from data
        if (this._stacked || this._ending === 0 || this._starting === 0) {
            
            this.data.forEach(function (datum, index) {

                if (stacked && Object.keys(stackList).indexOf(index) == -1) {
                    stackList[index] = maxStack;
                    maxStack++;
                }

                datum.times.forEach(function (time, i) {
                    if(starting === 0)
                        if (time.starting_time < minTime || minTime === 0)
                            minTime = time.starting_time;
                    if(ending === 0) {
                        if (time.starting_time > maxTime)
                            maxTime = time.starting_time;
                        if (time.ending_time > maxTime)
                            maxTime = time.ending_time;
                    }
                });
            });

            if (this._ending === 0) {
              this._ending = maxTime;
              ending = maxTime;
            }
            if (this._starting === 0) {
              this._starting = minTime;
              starting = minTime;
            }
        }

        this._maxStack = maxStack;
        var scale = width / (this._ending - this._starting);

        this.data.forEach( function(datum, index){
            var data = datum.times;

            //draw background
            if (backgroundColor) { 
                var barYAxis = ((itemHeight + itemMargin) * stackList[index]);
                svg.selectAll("g")
                    .data(data).enter()
                    .insert("rect")
                    .attr("class", "timeline-background-bar")
                    .attr("x", 0)
                    .attr("width", width)
                    .attr("y", barYAxis)
                    .attr("height", itemHeight)
                    .attr("fill", backgroundColor instanceof Function ? backgroundColor(datum, index) : backgroundColor);
            }

            //draw item
            svg.selectAll("g")
                .data(data).enter()
                .append(function(d, i) {
                    return document.createElementNS(d3.ns.prefix.svg, "ending_time" in d? "rect" : "circle");
                })
                .attr("x", getXPos)
                .attr("y", getStackPosition)
                .attr("width", function (d, i) {
                    return (d.ending_time - d.starting_time) * scale;
                })
                .attr("cy", function(d, i) {
                    return getStackPosition(d, i) + itemHeight/2;
                })
                .attr("cx", getXPos)
                .attr("r", itemHeight / 2)
                .attr("height", itemHeight)
                .style("fill", function(d, i){
                    if (d.color) return d.color;
                    return itemColors(index);
                });

            //draw label inside item
            svg.selectAll("g")
                .data(data).enter()
                .append("text")
                .attr("x", getXTextPos)
                .attr("y", getStackTextPosition)
                .text(function(d) {
                  return d.name;
                });

            if (rowSeparators && index < maxStack - 1) {
                var lineYAxis = ( itemHeight + itemMargin / 2 + (itemHeight + itemMargin) * stackList[index]);
                svg.append("svg:line")
                  .attr("class", "timeline-row-separator")
                  .attr("x1", 0)
                  .attr("x2", width)
                  .attr("y1", lineYAxis)
                  .attr("y2", lineYAxis)
                  .attr("stroke-width", 1)
                  .attr("stroke", rowSeparators);
            }

            //draw the label left side item
            if (typeof(datum.name) !== "undefined") { 
                var rowsDown = margin.top + (itemHeight + itemMargin) * (stackList[index] === undefined ? 0 : stackList[index]) + itemHeight * 0.75;

                d3.select(svg[0][0].parentNode).append("text")
                    .attr("class", "timeline-label")
                    .attr("transform", "translate(" + labelMargin + "," + rowsDown + ")")
                    .text(datum.name);
            }
            //draw icon
            else if (typeof(datum.icon) !== "undefined") {
                d3.select(svg[0][0].parentNode).append("image")
                    .attr("class", "timeline-label")
                    .attr("transform", "translate("+ labelMargin +","+ (margin.top + (itemHeight + itemMargin) * stackList[index])+")")
                    .attr("xlink:href", datum.icon)
                    .attr("width", itemHeight)
                    .attr("height", itemHeight);
            }

            function getStackPosition(d, i) {
                if (stacked) {
                    return (itemHeight + itemMargin) * stackList[index];
                }
                return 0;
            }
            function getStackTextPosition(d, i) {
                if (stacked) {
                    return (itemHeight + itemMargin) * stackList[index] + itemHeight * 0.75;
                }
                return itemHeight * 0.75;
            }
        });

        function getXPos(d, i) {
            return (d.starting_time - starting) * scale;
        }

        function getXTextPos(d, i) {
            return (d.starting_time - starting) * scale + 5;
        }
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set stack(newStack) {
        if (newStack)
            this._stacked = newStack;
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    draw() {
        options.starting = this._starting;
        options.ending = this._ending;
        var axis    = new Axis(options, this.svg, this.data, this.width - this.margin.left - this.margin.right, (this._itemHeight + this._itemMargin) * this._maxStack);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}

