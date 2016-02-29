angular.module('demoApp')
  .directive('userData', function() {
    
  })
  .directive('d3Bars', ['d3', function(d3) {
    return {
      restrict: 'EA',
      scope: {
        data: "=",
        label: "@",
        onClick: "&"
      },
      link: function(scope, iElement, iAttrs) {
        var svg = d3.select(iElement[0])
            .append("svg")
            .attr("width", "100%");

        // on window resize, re-render d3 canvas
        window.onresize = function() {
          return scope.$apply();
        };
        scope.$watch(function(){
            return angular.element(window)[0].innerWidth;
          }, function(){
            return scope.render(scope.data);
          }
        );

        // watch for data changes and re-render
        scope.$watch('data', function(newVals, oldVals) {
          return scope.render(newVals);
        }, true);

        // define render function
        scope.render = function(data){
          // remove all previous items before render
          svg.selectAll("*").remove();

          // setup variables
          var width, height, max;
          width = d3.select(iElement[0])[0][0].offsetWidth - 20;
            // 20 is for margins and can be changed
          height = scope.data.length * 35;
            // 35 = 30(bar height) + 5(margin between bars)
          max = 98;
            // this can also be found dynamically when the data is not static
            // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

          // set the height based on the calculations above
          svg.attr('height', height);

          //create the rectangles for the bar chart
          svg.selectAll("rect")
            .data(data)
            .enter()
              .append("rect")
              .on("click", function(d, i){return scope.onClick({item: d});})
              .attr("height", 30) // height of each bar
              .attr("width", 0) // initial width of 0 for transition
              .attr("x", 10) // half of the 20 side margin specified above
              .attr("y", function(d, i){
                return i * 35;
              }) // height + margin between bars
              .transition()
                .duration(1000) // time of duration
                .attr("width", function(d){
                  return d.score/(max/width);
                }); // width based on scale

          svg.selectAll("text")
            .data(data)
            .enter()
              .append("text")
              .attr("fill", "#fff")
              .attr("y", function(d, i){return i * 35 + 22;})
              .attr("x", 15)
              .text(function(d){return d[scope.label];});
        };
      }
    };
  }])
  .directive("ngFileSelect",function(){

    return {
      link: function($scope,el){
        
        el.bind("change", function(e){
        
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        })
        
      }
      
    }
    
    
  })
  .directive('d3DonutChart',  ['d3', function(d3) {

  return {
    scope: { // isolate scope
      'data': '=', 
      'onClick': '&',
      'accessor': '='
    },
    restrict: 'E',
    link: link
  };

  function link(scope, element) {
    // the d3 bits
    var color = d3.scale.category10();
    var el = element[0];
    var width = 150;
    var height = 150;
    var min = Math.min(width, height);

    var svg = d3.select(el).append('svg')
        .attr({width: width, height: height})
      .append('g')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        
    
    var accessor = scope.accessor || Number;
    var pie = d3.layout.pie().sort(null).value(accessor);
    var arc = d3.svg.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.5);
    
    svg.on('mousedown', function(d) {
      // yo angular, the code in this callback might make a change to the scope!
      // so be sure to apply $watch's and catch errors.
      scope.$apply(function(){
        if(scope.onClick) scope.onClick();
      });
    });

    function arcTween(a) {
      // see: http://bl.ocks.org/mbostock/1346410
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arc(i(t));
      };
    }
    
    // add the <path>s for each arc slice
    var arcs = svg.selectAll('path.arc').data(pie(scope.data))
      .enter().append('path')
        .attr('class', 'arc')
        .style('stroke', 'white')
        .attr('fill', function(d, i) { return color(i) })
        // store the initial angles
        .each(function(d) { return this._current = d });
    
    // our data changed! update the arcs, adding, updating, or removing 
    // elements as needed
    scope.$watch('data', function(newData, oldData){
      console.log('data changed!');
      var data = newData.slice(0); // copy
      var duration = 500;
      var PI = Math.PI;
      while(data.length < oldData.length) data.push(0);
      arcs = svg.selectAll('.arc').data(pie(data));
      arcs.transition().duration(duration).attrTween('d', arcTween);
      // transition in any new slices
      arcs.enter().append('path')
        .style('stroke', 'white')
        .attr('class', 'arc')
        .attr('fill', function(d, i){ return color(i) })
        .each(function(d) {
          this._current = { startAngle: 2 * PI - 0.001, endAngle: 2 * PI }
        })
        .transition().duration(duration).attrTween('d', arcTween);
      // transition out any slices with size = 0
      arcs.filter(function(d){ return d.data === 0 })
        .transition()
        .duration(duration)
        .each(function(d){ d.startAngle = 2 * PI - 0.001; d.endAngle = 2 * PI; })
        .attrTween('d', arcTween).remove();
    // IMPORTANT! the third argument, `true`, tells angular to watch for 
    // changes to array elements.
    }, true);
  }
}]);
