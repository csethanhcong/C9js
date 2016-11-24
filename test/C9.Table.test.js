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

    document.body.style.margin = '0px';

    doneLoaded();
} 


describe('C9 Unit Test - Table', function() {

    beforeEach(function(done) {
        load(done);
    });

    it('should show table with id #table', function() {

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
            table: {
                container: 'table',
                show: true
            }
        };
        var barChart = new C9.BarChart(option);
        barChart.draw();

        expect(barChart.table).toEqual(jasmine.any(Object));
        expect(barChart.table).not.toBeNull();
        expect(barChart.table.options.container).toEqual('table');

    });

    it('should show table headings as [Letter, Freq]', function() {

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
            table: {
                container: 'table',
                show: true,
                headings: ['Letter', 'Freq']
            }
        };
        var barChart = new C9.BarChart(option);
        barChart.draw();

        var theads = d3.selectAll('.c9-table.c9-table-header thead tr th')[0];

        expect(theads[0].innerHTML).toEqual('#');
        expect(theads[1].innerHTML).toEqual('Letter');
        expect(theads[2].innerHTML).toEqual('Freq');

    });

    it('should show change style of table to stripe', function() {

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
        var options = {
            id: "chart",
            data: {
                plain: data,
            },
            table: {
                container: 'table',
                show: true,
                style: 'stripe'
            }
        };
        var barChart = new C9.BarChart(options);
        barChart.draw();

        var row = d3.select('.c9-table.c9-table-body.c9-stripe');

        expect(row.style('background-color')).toEqual('rgb(255, 255, 255)');

    });

    it('should hide serial number', function() {

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
        var options = {
            id: "chart",
            data: {
                plain: data,
            },
            table: {
                container: 'table',
                show: true,
                serial: false
            }
        };
        var barChart = new C9.BarChart(options);
        barChart.draw();

        var theads = d3.selectAll('.c9-table.c9-table-header thead tr th')[0];

        expect(theads[0].innerHTML).not.toEqual('#');

    });

});