describe('C9 Unit Test - Pie Chart', function() {

    it('should create PieChart with id #chart', function() {

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
        var pieChart = new C9.PieChart(option);
        pieChart.draw();

        expect(pieChart).toEqual(jasmine.any(C9.PieChart));
        expect(pieChart).not.toBeNull();
        expect(pieChart.id).toEqual('#chart');
    });

    it('should create PieChart with radius: 150', function() {

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
            radius: 150,
            title: {
                text: "Frequency of English Letters"
            }
        };
        var pieChart = new C9.PieChart(option);
        pieChart.draw();

        var arc = d3.select('.c9-chart-pie.c9-custom-path');

        expect(arc.attr('d')).toMatch(/150/);
    });

});