describe('C9 Unit Test - Line Chart', function() {

    it('should create a LineChart with id #chart', function() {

        var data = [
            {"name": "Jessie", "value": [100, 200, 300, 120, 320]},
            {"name": "Kame", "value": [150, 250, -100, 100, 500]}
        ];

        var option = {
            id: "chart",
            data: {
                plain: data
            },
            area: {
              show: false
            }
        };
        var lineChart = new C9.LineChart(option);
        lineChart.draw();

        expect(lineChart).toEqual(jasmine.any(C9.LineChart));
        expect(lineChart).not.toBeNull();
        expect(lineChart.id).toEqual('#chart');

    });

    it('should hide area', function() {

        var data = [
            {"name": "Jessie", "value": [100, 200, 300, 120, 320]},
            {"name": "Kame", "value": [150, 250, -100, 100, 500]}
        ];

        var option = {
            id: "chart",
            data: {
                plain: data
            },
            area: {
              show: false
            }
        };
        var lineChart = new C9.LineChart(option);
        lineChart.draw();

        var area = d3.select('.c9-chart-line.c9-area-container')[0][0];

        expect(area).toBeNull();

    });

    it('should hide point', function() {

        var data = [
            {"name": "Jessie", "value": [100, 200, 300, 120, 320]},
            {"name": "Kame", "value": [150, 250, -100, 100, 500]}
        ];

        var option = {
            id: "chart",
            data: {
                plain: data
            },
            point: {
              show: false
            }
        };
        var lineChart = new C9.LineChart(option);
        lineChart.draw();

        var point = d3.select('.c9-chart-line.c9-point-container')[0][0];

        expect(point).toBeNull();

    });

    it('should change point style', function() {

        var data = [
            {"name": "Jessie", "value": [100, 200, 300, 120, 320]},
            {"name": "Kame", "value": [150, 250, -100, 100, 500]}
        ];

        var option = {
            id: "chart",
            data: {
                plain: data
            },
            point: {
                fill: "red",
                stroke: "#e3e3e3",
                'stroke-width': 0.5,
                opacity: 1.0,
                radius: 3,
            }
        };
        var lineChart = new C9.LineChart(option);
        lineChart.draw();

        var point = d3.select('.c9-chart-line.c9-circle-custom');

        expect(point.style('fill')).toEqual("#ff0000");
        expect(point.style('stroke')).toEqual("#e3e3e3");
        expect(point.style('stroke-width')).toEqual("0.5px");
        expect(point.style('opacity')).toEqual("1");
        expect(point.attr('r')).toEqual("3");

    });

    it('should show subchart', function() {

        var data = [
            {"name": "Jessie", "value": [100, 200, 300, 120, 320]},
            {"name": "Kame", "value": [150, 250, -100, 100, 500]}
        ];

        var option = {
            id: "chart",
            data: {
                plain: data
            },
            subchart: {
              show: true
            }
        };
        var lineChart = new C9.LineChart(option);
        lineChart.draw();

        var subchart = d3.select('.c9-subchart-custom');

        expect(subchart).not.toBeUndefined();

    });

});