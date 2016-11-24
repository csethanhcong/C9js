// var d3 = require('d3');
// var C9 = require('../dist/C9');
// var expect = require('chai').expect;
// var jsdom = require('jsdom');

// function load(doneLoaded) {
//     jsdom.env({
//     html: '<html><head></head><body><div id="chart"></div></body></html>',
//     features:{ QuerySelector:true },
//     scripts: [
//         'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
//         'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.js'
//     ],
//     done: (err, win) => {
//       global.window = win;
//       global.document = win.document;
//       global.$ = win.jQuery;
//       global.d3 = win.d3;

//       // Add other common globals
//       Object.keys(win).forEach((property) => {
//         if (typeof global[property] === 'undefined') {
//           global[property] = win[property];
//         }
//       });
//       // Done!
//       doneLoaded();
//     },
//   });
// }

function load(doneLoaded) {
    var div = document.createElement('div');
    div.id = 'chart';
    div.style.width = '640px';
    div.style.height = '480px';
    document.body.appendChild(div);
    document.body.style.margin = '0px';

    doneLoaded();
} 

describe('C9 Unit Test - Data Adapter', function() {

    beforeEach(function(done) {
        load(done);
    });

    it('should return all data with length of 6', function() {

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

        var data = barChart.dataTarget;

        expect(data.length).toEqual(6);
    });

    it('should return first data with name "CA" and group "data1" and value of 2704659', function() {

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

        var data = barChart.dataTarget;

        expect(data[0][0].name).toEqual('CA');
        expect(data[0][0].group).toEqual('data1');
        expect(data[0][0].value).toEqual(2704659);
    });

    it('should return data from JSON format', function() {
        var data = [{
              "user": "Christine",
              "access_count": 54
            }, {
              "user": "Christopher",
              "access_count": 53
            }, {
              "user": "Ryan",
              "access_count": 76
            }
        ];

        var options = {
            id: "chart",
            data: {
                plain: data,
                keys: {
                    name: 'user',
                    value: 'access_count'
                }
            }
        };
        var barChart = new C9.BarChart(options);
        barChart.draw();

        var data = barChart.dataTarget;

        expect(data[0][0].name).toEqual('Christine');
        expect(data[0][0].value).toEqual(54);
    });

    it('should contain correct user-defined keys', function() {
        var data = [{
              "user": "Christine",
              "access_count": 54
            }, {
              "user": "Christopher",
              "access_count": 53
            }, {
              "user": "Ryan",
              "access_count": 76
            }
        ];

        var options = {
            id: "chart",
            data: {
                plain: data,
                keys: {
                    name: 'user',
                    value: 'access_count'
                }
            },
            title: {
                show: false
            }
        };
        var barChart = new C9.BarChart(options);
        barChart.draw();

        var keys = barChart.dataOption.keys;

        expect(keys.name).toEqual('user');
        expect(keys.value).toEqual('access_count');
    });

});