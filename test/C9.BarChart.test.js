describe('C9 Unit Test - Bar Chart', function() {

    it('should create Bar Chart with id #chart', function() {

        var data = [
            {name: 'A', value: .08167},
            {name: 'B', value: .01492},
            {name: 'C', value: .02782}
        ];

        var option = {
            id: "chart", 
            width: 1100, 
            height: 500,
            data: {
                plain: data,
            }
        };

        var barChart = new C9.BarChart(option);
        barChart.draw();

        expect(barChart).toEqual(jasmine.any(C9.BarChart));
        expect(barChart).not.toBeNull();
        expect(barChart.id).toEqual('#chart');

    });

    it('should create Bar Chart in specified sizes [1100, 500]', function() {

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
            }
        };

        var barChart = new C9.BarChart(option);
        barChart.draw();

        var width = barChart.width,
            height = barChart.height;

        expect(width).toEqual(1100);
        expect(height).toEqual(500);

    });

});