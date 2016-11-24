function load(doneLoaded) {
    var div = document.createElement('div');
    div.id = 'chart';
    div.style.width = '640px';
    div.style.height = '480px';
    document.body.appendChild(div);
    document.body.style.margin = '0px';

    doneLoaded();
} 


describe('C9 Unit Test - Legend', function() {

    beforeEach(function(done) {
        load(done);
    });

    it('should hide legend', function() {

        var data = [
            {name: "A", value:  .0245},
            {name: "B", value:  .01492},
            {name: "C", value:  .02782},
            {name: "D", value:  .04253},
            {name: "E", value:  .01},
            {name: "F", value:  .02288},
            {name: "G", value:  .02015},
            {name: "H", value:  .06094},
            {name: "I", value:  .5},
        ];
        var option = {
            id: "chart",
            data: {
                plain: data,
            },
            legend: {
                show: false
            }
        };
        var barChart = new C9.BarChart(option);
        barChart.draw();

        var legend = d3.select('.c9-custom-legend.c9-custom-legend-container')[0][0];

        expect(legend).toBeNull();

    });

    it('should change legend\"s position', function() {

        var data = [
            {name: 'CA', value: [2704659,4499890,2159981,3853788,10604510,8819342,4114496]},
            {name: 'TX', value: [2027307,3277946,1420518,2454721,7017731,5656528,2472223]},
            {name: 'NY', value: [1208495,2141490,1058031,1999120,5355235,5120254,2607672]},
            {name: 'FL', value: [1140516,1938695,925060,1607297,4782119,4746856,3187797]},
            {name: 'IL', value: [894368,1558919,725973,1311479,3596343,3239173,1575308]},
            {name: 'PA', value: [737462,1345341,679201,1203944,3157759,3414001,1910571]},
        ];

        var option = {
            id: "chart",
            data: {
                plain: data,
            },
            legend: {
                position: 'right',
                margin: [10, 20, 10, 20]
            }
        };

        var barChart = new C9.BarChart(option);
        barChart.draw();

        var legend = d3.select('.c9-custom-legend.c9-custom-legend-item').attr('transform');

        expect(legend).toMatch(/,10/);

    });

    it('should display legend\"s label as data1', function() {

        var data = [
            {name: 'CA', value: [2704659,4499890,2159981,3853788,10604510,8819342,4114496]},
            {name: 'TX', value: [2027307,3277946,1420518,2454721,7017731,5656528,2472223]},
            {name: 'NY', value: [1208495,2141490,1058031,1999120,5355235,5120254,2607672]},
            {name: 'FL', value: [1140516,1938695,925060,1607297,4782119,4746856,3187797]},
            {name: 'IL', value: [894368,1558919,725973,1311479,3596343,3239173,1575308]},
            {name: 'PA', value: [737462,1345341,679201,1203944,3157759,3414001,1910571]},
        ];

        var option = {
            id: "chart",
            data: {
                plain: data,
            },
            legend: {
                position: 'right',
                margin: [10, 20, 10, 20]
            }
        };

        var barChart = new C9.BarChart(option);
        barChart.draw();

        var text = d3.select('.c9-custom-legend.c9-custom-legend-text').text();

        expect(text).toEqual('data1');

    });

});