angular.module('demoApp')
  .directive('d3Bars', ['d3', function(d3) {
    return {
      restrict: 'EA',
      scope: {
        data: "=",
        label: "@",
        onClick: "&"
      },
      link: function(scope, iElement, iAttrs) {
        var width = 400;
        var chart = d3.select(iElement[0]);
            // .append("div")
            // .attr("width", width);

        var tooltip = d3.select("body")
                          .append("div")
                          .attr('class', 'd3-tip')
                          .style("position", "absolute")
                          .style("z-index", "10")
                          .style("visibility", "hidden");
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
          chart.selectAll("*").remove();

          // setup variables
          var height, max;
          // width = d3.select(iElement[0])[0][0].offsetWidth * 9/10;
          
            // 20 is for margins and can be changed
          height = scope.data.length * 35;
            // 35 = 30(bar height) + 5(margin between bars)
          // max = 98;
            // this can also be found dynamically when the data is not static
          max = Math.max.apply(Math, data.map(function(value, key) {return value.data;} ));
          // adjust it if over the width

          // set the height based on the calculations above
          // chart.attr('height', height);

          //create the rectangles for the bar chart
          var hoverDiv = chart.append("div").attr("class", "chart")
             .selectAll("div")
             .data(data).enter().append("div");

            hoverDiv
             .style("height", "30px")
             .transition().ease("elastic")
             .style("width", function(d) { return d.data*width/max + "px"; })
             .text(function(d) { return d.name ; });

            hoverDiv
              .on("mouseover", function(d){return tooltip.html("<strong>Value:</strong> <span style='color:red'>" + d.data + "</span>").style("visibility", "visible");})
              .on("mousemove", function(d){return tooltip.html("<strong>Value:</strong> <span style='color:red'>" + d.data + "</span>").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
              .on("mouseout", function(d){return tooltip.html("<strong>Value:</strong> <span style='color:red'>" + d.data + "</span>").style("visibility", "hidden");});
        };

        // random color for bar
        scope.random = function() {
          return Math.floor(Math.random() * 255);
        }
      }
    };
  }]);