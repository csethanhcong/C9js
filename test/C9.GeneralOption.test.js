function load(doneLoaded) {
    var div = document.createElement('div');
    div.id = 'chart';
    div.style.width = '640px';
    div.style.height = '480px';
    document.body.appendChild(div);
    document.body.style.margin = '0px';

    doneLoaded();
} 


describe('C9 Unit Test - General Option', function() {

    beforeEach(function(done) {
        load(done);
    });

    it('should change color of chart', function() {

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
            width: 1100,
            height: 500,
            data: {
                plain: data,
            },
            title: {
                text: "The Populations of different States in America by age group"
            },
            colorRange: ['#008F95', '#EB6E80', '#DF744A', '#DCB239', '#4ABDAC', '#FC4A1A', '#F7B733']
        };

        var barChart = new C9.BarChart(option);
        barChart.draw();

        var color = d3.select('.c9-chart-bar.c9-custom-rect').style('fill');

        expect(color).toEqual("#008f95");

    });

    it('should change margin of chart to [100, 100]', function() {

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
            width: 1100,
            height: 500,
            data: {
                plain: data,
            },
            margin: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100
            },
            title: {
                text: "The Populations of different States in America by age group"
            },
            colorRange: ['#008F95', '#EB6E80', '#DF744A', '#DCB239', '#4ABDAC', '#FC4A1A', '#F7B733']
        };

        var barChart = new C9.BarChart(option);
        barChart.draw();

        var margin = d3.select('.c9-chart.c9-custom-container').attr('transform');

        expect(margin).toMatch(/100,100/);

    });

});