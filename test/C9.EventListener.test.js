describe('C9 Unit Test - Event Listener', function() {

    it('should show data on div#expand', function() {

        var data = [
            {name: "A", value:  .0245},
            {name: "B", value:  .01492},
            {name: "C", value:  .02782},
            {name: "D", value:  .04253},
            {name: "E", value:  1},
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
        };
        var barChart = new C9.BarChart(option);
        barChart.draw();
        barChart.on('click', function(data) {
            var t = '<p> User just clicked user ' + data.name + ' consisting of ' + data.value + '</p>';
            document.getElementById('expand').innerHTML += t;
        });

        // var spy = spyOnEvent($('.c9-chart-bar.c9-custom-rect')[0], 'click');
        // $('.c9-chart-bar.c9-custom-rect')[0].trigger('click');
        // expect('click').toHaveBeenTriggeredOn($('.c9-chart-bar.c9-custom-rect')[0]);
        // expect(spy).toHaveBeenTriggered();

        //Need to create a cross browser click() function no .click() in PhantomJS
        function click(el){
            var ev = document.createEvent('MouseEvent');
            ev.initMouseEvent(
                'click',
                true /* bubble */, true /* cancelable */,
                window, null,
                0, 0, 0, 0, /* coordinates */
                false, false, false, false, /* modifier keys */
                0 /*left*/, null
            );
            el.dispatchEvent(ev);
        }

        var obj = document.getElementsByClassName('c9-chart-bar c9-custom-rect')[0];
        click(obj);

        var text = document.getElementById('expand').innerHTML;

        expect(text).toMatch('<p> User just clicked user A consisting of 0.0245</p>');

    });

});