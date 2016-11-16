import Helper from '../../helper/C9.Helper';

export default class Title {
    constructor(options, chart) {
        var self = this;

        var config = {
            show      : true,
            text      : "Sample Chart",
            position  : 'top',
            fontSize  : "14px"
        };

        self._options  = options;
        self._chart    = chart;

        self.updateConfig(config);
            
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get chart() {
        return this._chart;
    }

    get options() {
        return this._options;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/ 
    set chart(arg) {
        if (arg) {
            this._chart = arg;
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
    updateConfig(config) {
        var self = this;

        self.options = Helper.mergeDeep(config, self.options);
    }

    draw() {
        var self = this;

        if (self.options.show) {
            var text = self.chart.svg
                            .append("g")
                                .attr('class', 'c9-custom-title c9-custom-title-container')
                            .append("text")
                                .attr("class", "c9-custom-title c9-custom-title-text");

            // Get title self.chart.width: text.node().getComputedTextLength()           
            text.attr("x", (((self.chart.width - text.node().getComputedTextLength()) / 2)))           
            // text.attr("x", (((self.chart.width - 200) / 2)))           
                .attr("y", self.setYLocation(self.chart.height, self.chart.margin))
                .attr("text-anchor", "middle")  
                .style("font-size", self.options.fontSize)  
                .text(self.options.text);
        }
    }

    setYLocation(height, margin) {
        var self = this;
        
        if (self.options.position === 'top') {
            return (margin.top / 2);
        } else if (self.options.position === 'bottom') {
            return (height - margin.bottom / 2);
        }
    }
    /*=====  End of Main Functions  ======*/
    
}