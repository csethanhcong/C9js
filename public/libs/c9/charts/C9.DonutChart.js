'use strict';

class DonutChart extends Chart {
    constructor(options) {
        super(options);
        var R = Math.min(this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom) / 2;
        var config = {
            outerRadius: R,
            innerRadius: R > 80 ? R - 80 : R - 40
        };

        this._outerRadius    = options.outerRadius || config.outerRadius;
        this._innerRadius    = options.innerRadius || config.innerRadius;

        var width   = this.width - this.margin.left - this.margin.right;
        var height  = this.height - this.margin.top - this.margin.bottom;
        var color   = d3.scale.category20();
        var _data = this.data;
        var __outerRadius = this._outerRadius;
        var __innerRadius = this._innerRadius;

        var arc = d3.svg.arc()
            .outerRadius(__outerRadius)
            .innerRadius(__innerRadius);

        //we can sort data here
        var pie = d3.layout.pie()
            .value(function(d) { return d.value; });

        var arcs = this.svg
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                    .selectAll('g.arc')
                    .data(pie(_data)).enter()
                    .append('g')
                    .attr('class', 'arc');
        arcs.append('path')
            .attr('d', arc)
            .style('fill', function(d, i) { return color(i); })
        arcs.append('text')
            .attr('transform', function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr('dy', '.35em')
            .text(function(d) { return d.data.name; });

    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    draw() {
        var title   = new Title(this.options, this.svg, this.width, this.height, this.margin);
        
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
