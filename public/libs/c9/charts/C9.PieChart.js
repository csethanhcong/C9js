'use strict';

class PieChart extends Chart {
    constructor(options) {
        super(options);
        var config = {
            radius: 200
        };

        this._radius    = options.radius || config.radius;

        var width   = this.width - this.margin.left - this.margin.right;
        var height  = this.height - this.margin.top - this.margin.bottom;

        var _data = this.data;
        var __radius = this._radius;
        var pie = d3.layout.pie().value(function(d){ return d.value; });
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(this._radius);
        // Random color
        var color = d3.scale.category20b();

        // select paths, use arc generator to draw
        var arcs = this.svg
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                    .selectAll('g.slice')
          .data(pie(this.data))
          .enter()
          .append('g')
          .attr('class', 'slice');
        arcs
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(i);
          })
          arcs.append("text")
            .attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = __radius;
                return "translate(" + arc.centroid(d) + ")";})
            .attr("text-anchor", "middle")
            .text( function(d, i) { return d.data.name; });
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
