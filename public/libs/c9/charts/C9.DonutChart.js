import Chart from './C9.Chart';
import Axis from '../utils/C9.Axis';
import Title from '../utils/C9.Title';
import Legend from '../utils/C9.Legend';

export default class DonutChart extends Chart {
    constructor(options) {
        super(options);
        var self = this;
        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
        var config = {
            outer_radius: R,
            inner_radius: R > 80 ? R - 80 : R - 40
        };

        self._outerRadius    = options.outer_radius || config.outer_radius;
        self._innerRadius    = options.inner_radius || config.inner_radius;

        self.initDonutChartConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get outerRadius() {
        return this._outerRadius;
    }

    get innerRadius() {
        return this._innerRadius;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set outerRadius(newOuterRadius) {
        if (newOuterRadius) {
            this._outerRadius = newOuterRadius;
        }
    }

    set innerRadius(newInnerRadius) {
        if (newInnerRadius) {
            this._innerRadius = newInnerRadius;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    initDonutChartConfig() {
        var width   = this.width - this.margin.left - this.margin.right;
        var height  = this.height - this.margin.top - this.margin.bottom;
        var color   = this.colorRange;

        var arc = d3.svg.arc()
            .outerRadius(this.outerRadius)
            .innerRadius(this.innerRadius);

        //we can sort data here
        var pie = d3.layout.pie()
            .value(function(d) { return d.value; });

        //draw chart
        var arcs = this.svg
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                    .selectAll('g.arc')
                    .data(pie(this.data)).enter()
                    .append('g')
                    .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .style('fill', function(d, i) { return color(i); });

        arcs.append('text')
            .attr('transform', function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr('dy', '.35em')
            .text(function(d) { return d.data.name; });
    }

    draw() {
        
        var title   = new Title(this.options, this.svg, this.width, this.height, this.margin);
        
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
