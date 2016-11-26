describe('C9 Unit Test - Donut Chart', function() {

    it('should create DonutChart with id #chart', function() {

       var data = [
            {name: 'A', value: .08167},
            {name: 'B', value: .01492},
            {name: 'C', value: .02782},
            {name: 'D', value: .04253},
            {name: 'E', value: .12702}
        ];

        var option = {
            id: "chart", 
            width: 1100, 
            height: 600,
            data: {
                plain: data,
            },
            title: {
                text: "Frequency of English Letters"
            }
        };
        var donutChart = new C9.DonutChart(option);
        donutChart.draw();

        expect(donutChart).toEqual(jasmine.any(C9.DonutChart));
        expect(donutChart).not.toBeNull();
        expect(donutChart.id).toEqual('#chart');
    });

    it('should create DonutChart with innerRadius: 50, outerRadius: 150', function() {

       var data = [
            {name: 'A', value: .08167},
            {name: 'B', value: .01492},
            {name: 'C', value: .02782},
            {name: 'D', value: .04253},
            {name: 'E', value: .12702}
        ];

        var option = {
            id: "chart", 
            width: 1100, 
            height: 600,
            data: {
                plain: data,
            },
            innerRadius: 50,
            outerRadius: 150,
            title: {
                text: "Frequency of English Letters"
            }
        };
        var donutChart = new C9.DonutChart(option);
        donutChart.draw();

        var arc = d3.select('.c9-chart-donut.c9-custom-path');

        expect(arc.attr('d')).toMatch(/50/);
        expect(arc.attr('d')).toMatch(/150/);
    });

});