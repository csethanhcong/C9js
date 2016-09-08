import Chart from './C9.Chart';
import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';

export default class DonutChart extends Chart {
    constructor(options) {
        super(options);
        var self = this;
        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
        var config = {
            outerRadius: R,
            innerRadius: R > 80 ? R - 80 : R - 40
        };

        self._outerRadius    = options.outerRadius || config.outerRadius;
        self._innerRadius    = options.innerRadius || config.innerRadius;
        self.body.type = 'donut';
        self.updateConfig();
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
    /**
     * Update Donut Chart Config
     */
    updateConfig() {
        var self = this;

        var width   = self.width - self.margin.left - self.margin.right,
            height  = self.height - self.margin.top - self.margin.bottom,
            color   = self.colorRange;

        var arc = d3.svg.arc()
            .outerRadius(self.outerRadius)
            .innerRadius(self.innerRadius);

        //we can sort data here
        var pie = d3.layout.pie()
            .value(function(d) { return d.value; });

        //draw chart
        var arcs = self.body
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                    .selectAll('.c9-chart-donut.c9-custom-arc')
                    .data(pie(self.data)).enter()
                    .append('g')
                    .attr('class', 'c9-chart-donut c9-custom-arc');

        arcs.append('path')
            .attr('class', 'c9-chart-donut c9-custom-path')
            .attr('d', arc)
            .style('fill', function(d, i) { return color(i); });

        arcs.append('text')
            .attr('class', 'c9-chart-donut c9-custom-text')
            .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .text(function(d) { return d.data.name; });
    }

    /**
     * Main draw function of Donut Chart
     */
    draw() {

        var self = this;
        
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options, self.body, self.colorRange, self.data);

        self.updateInteraction();

    }

    /**
     * Select all pie as type PATH in Donut Chart via its CLASS
     */
    selectAllPie() {
        var self = this;

        return self.body
                .selectAll('g')
                    .selectAll('path.c9-chart-donut.c9-custom-path');
    }

    /**
     * Update Interaction: Hover
     * @return {} 
     */
    updateInteraction() {
        var self = this,
            hoverEnable     = self.hover.enable,
            hoverOptions    = self.hover.options,
            selector        = self.selectAllPie(),
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback;

        if (hoverEnable) {
            // Define the div for the tooltip
            // TODO: Allow user to add custom DIV, CLASS
            // Make sure that: 
            // - Rect not overflow the bar, if not, hover effect will be messed
            // -> So, just align the rect to right/left (x: 25) to avoid it
            // -> And, the text will be align also
            var div = self.body
                        .append('g')   
                        .style('display', 'none');
                // Rect Container
                div.append('rect')
                    .attr('class', 'c9-custom-tooltip-box')
                    .attr('x', 25)
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .style('position', 'absolute')
                    .style('width', '100px')
                    .style('height', '50px')
                    .style('fill', '#FEE5E2')
                    .style('stroke', '#FDCCC6')
                    .style('stroke-width', 2);
                // First line
                var text_1 = div.append('text')
                    .attr('class', 'c9-custom-tooltip-label')
                    .attr('x', 30)
                    .attr('y', 10)
                    .style('font-family', 'sans-serif')
                    .style('font-size', '10px');
                // Second line
                var text_2 = div.append('text')
                    .attr('class', 'c9-custom-tooltip-label')
                    .attr('x', 30)
                    .attr('y', 20)
                    .style('font-family', 'sans-serif')
                    .style('font-size', '10px');

            selector
                .on("mouseover", function(d) {
                    console.dir(d);
                    div.transition()
                        .duration(hoverOptions.onMouseOver.fadeIn)
                        .style("display", 'block')
                        .attr("transform", "translate(0, 0)");

                    text_1.text('Name: ' + d.data.name);
                    text_2.text('Value: ' + d.data.value);
                })
                .on("mouseout", function(d) { 
                    div.transition()
                        .duration(hoverOptions.onMouseOut.fadeOut)      
                        .style('display', 'none');
                });
        }
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
