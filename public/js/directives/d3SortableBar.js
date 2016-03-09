
angular.module('demoApp')
  .directive('d3SortableBar', ['d3', function(d3) {
    return {
      restrict: 'EA',
      scope: {
        data: "=",
        label: "@",
        onClick: "&"
      },
      link: function(scope, iElement, iAttrs) {
        // Setup svg element
        var margin = {top: 0, right: 10, bottom: 20, left: 10},
            width = 500,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select(iElement[0])
            .append("svg")
            .attr("width", width)
            .attr("height", height);

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

          // Setup variables
          var scaleFactor = 0.85;
          var range = data.length;
          var superScaleFactor = 1/range;
          var index = d3.range(range);
          var max = Math.max.apply(Math, data.map(function(value, key) {return value.data;} ));

          var x = d3.scale.linear()
            .domain([0, max])
            .range([0, width*scaleFactor]);

          var y = d3.scale.ordinal()
            .domain(index)
            .rangeRoundBands([0, height*scaleFactor], .1);

          svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d, i) {
              return "translate(10," + y(i) + ")";
            });

          bar.append("rect")
            .attr("height", y.rangeBand())
            .attr("width", function(d) {return x(d.data)});

          bar.append("text")
            // .attr("text-anchor", "end")
            .attr("x", "10")
            .attr("y", y.rangeBand() / 2)
            .attr("dy", ".35em")
            .text(function(d, i) {
              return d.name;
            });

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(10," + height*scaleFactor + ")")
            .call(d3.svg.axis()
              .scale(x)
              .orient("bottom"));

          setInterval(function() {

            // if (sort = !sort) {
              index.sort(function(a, b) {
                return data[a].data - data[b].data;
              });
            // } else {
            //   index = d3.range(24);
            // }
            // console.log(index);
            y.domain(index);

            bar.transition()
              .duration(1000)
              .delay(function(d, i) {
                return d.data;
              })
              .attr("transform", function(d, i) {
                return "translate(10," + y(i) + ")";
              });

          }, 1500);
        };
      }
    };
  }]);
