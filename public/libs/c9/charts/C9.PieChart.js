import Chart from './C9.Chart';
import Axis from '../utils/C9.Axis';
import Title from '../utils/C9.Title';
import Legend from '../utils/C9.Legend';

export default class PieChart extends Chart {
    constructor(options) {
        super(options);
        var self    = this;
        var config  = {
            radius: 200
        };

        self._radius    = options.radius || config.radius;
        self.svg.c9Chart = "pie";
        self.initPieChartConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get radius() {
        return this._radius;
    }

    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/

    set radius(newRadius) {
        if (newRadius) {
            this._radius = newRadius;
        }
    }

    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    /**
     * [First init Pie Chart]
     * @return {[type]} [description]
     */
    initPieChartConfig() {
        var width   = this.width - this.margin.left - this.margin.right;
        var height  = this.height - this.margin.top - this.margin.bottom;

        var _data   = this.data;
        var __radius = this.radius;

        var pie = d3.layout.pie().value(function(d){ return d.value; });
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(this.radius);
        // Random color
        var color = this.colorRange;

        // select paths, use arc generator to draw
        var arcs = this.svg
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                    .selectAll('g.slice')
                    .data(pie(this.data))
                    .enter()
                    .append('g')
                    .attr('class', 'slice');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
                return color(i);
            });

        arcs.append("text")
            .attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = __radius;

                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text( function(d, i) { return d.data.name; });
    }

    /**
     * [Main draw function of Pie Chart]
     * @return {[type]} [description]
     */
    draw() {

        var title   = new Title(this.options, this.svg, this.width, this.height, this.margin);
        var legend  = new Legend(this.options, this.svg, this.colorRange, this.data);

    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
