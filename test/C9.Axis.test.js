function load(doneLoaded) {
    var div = document.createElement('div');
    div.id = 'chart';
    div.style.width = '640px';
    div.style.height = '480px';
    document.body.appendChild(div);

    var tableDiv = document.createElement('div');
    tableDiv.id = 'table';
    tableDiv.style.width = '640px';
    tableDiv.style.height = '480px';
    document.body.appendChild(tableDiv);

    var expandDiv = document.createElement('div');
    expandDiv.id = 'expand';
    expandDiv.style.width = '640px';
    expandDiv.style.height = '480px';
    document.body.appendChild(expandDiv);

    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    document.body.appendChild(mapDiv);

    document.body.style.margin = '0px';

    doneLoaded();
}


describe('C9 Unit Test - Axis', function() {

    beforeEach(function(done) {
        load(done);
    });

    it('should create x axis', function() {

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

        var barChart = new window.C9.BarChart(option);
        barChart.draw();

        var axis = d3.select('.c9-axis.c9-axis-x-text');

        expect(axis.attr('dx')).toEqual('-.8em');
        expect(axis.attr('dy')).toEqual('-.55em');
        expect(axis.text()).toEqual('Name');

    });

    it('should create y axis', function() {

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

        var axis = d3.select('.c9-axis.c9-axis-y-text');

        expect(axis.attr('dy')).toEqual('.10');
        expect(axis.attr('y')).toEqual('-10');
        expect(axis.text()).toEqual('Value');

    });

    it('should hide all axis', function() {

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
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    show: false
                }
            }
        };

        var barChart = new window.C9.BarChart(option);
        barChart.draw();

        var xAxis = d3.select('.c9-axis.c9-axis-x .domain');
        var yAxis = d3.select('.c9-axis.c9-axis-y .domain');

        expect(xAxis.style('display')).toEqual('none');
        expect(yAxis.style('display')).toEqual('none');

    });

    it('should show axis grid', function() {

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
            },
            axis: {
                x: {
                    grid: true
                }
            }
        };

        var barChart = new window.C9.BarChart(option);
        barChart.draw();

        var xGrid = d3.select('.c9-axis.c9-axis-x .tick line');
        var yGrid = d3.select('.c9-axis.c9-axis-y .tick line');

        expect(xGrid.attr('x2')).toEqual('0');
        expect(xGrid.attr('y2')).toEqual('-350');
        expect(yGrid.attr('x2')).toEqual('1000');
        expect(yGrid.attr('y2')).toEqual('0');

    });

    it('should change format axis to $xxx$', function() {

        var data = [
            {"name": "Jose", "value": 70},
            {"name": "Ronald", "value": 97},
            {"name": "Mark", "value": 36},
            {"name": "Denise", "value": 99},
            {"name": "Kelly", "value": 43},
            {"name": "Annie", "value": 88},
            {"name": "Pamela", "value": 50},
            {"name": "Lois", "value": 80},
            {"name": "Cheryl", "value": 43},
            {"name": "Brian", "value": 42}
        ];          

        var option = {
            id: "chart",
            data: {
                plain: data,
            }, 
            axis: {
                y: {
                    tick: {
                        format: function(data, index) {
                            return '$' + data + '$';
                        }
                    }
                }
            },
        };
        var barChart = new C9.BarChart(option);
        barChart.draw();

        var yText = d3.select('.c9-axis.c9-axis-y .tick text');

        expect(yText.text()).toEqual('$0$');

    });

    it('should rotate x axis by -30 degree', function() {

        var data = [
            {"name": "Jose", "value": 70},
            {"name": "Ronald", "value": 97},
            {"name": "Mark", "value": 36},
            {"name": "Denise", "value": 99},
            {"name": "Kelly", "value": 43},
            {"name": "Annie", "value": 88},
            {"name": "Pamela", "value": 50},
            {"name": "Lois", "value": 80},
            {"name": "Cheryl", "value": 43},
            {"name": "Brian", "value": 42}
        ];          

        var option = {
            id: "chart",
            data: {
                plain: data,
            }, 
            axis: {
                x: {
                    tick :{
                        rotate: -30
                    }
                },
            }
        };
        var barChart = new C9.BarChart(option);
        barChart.draw();

        var xText = d3.select('.c9-axis.c9-axis-x .tick text');

        expect(xText.attr('transform')).toMatch(/-30/);

    });

});