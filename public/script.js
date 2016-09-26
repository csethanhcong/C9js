$(function() {

  /***************************
    GRAPH container
  ****************************/

  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    width = 1000 - margin.left - margin.right, // width
    height = 500 - margin.top - margin.bottom; // height

  /***************************
    SCALE
  ****************************/

  var x0 = d3.scale.ordinal()
    .rangeRoundBands([10, width - 50], .3); // (interval[, padding])  // interval: distance from point 0 // padding distance of categories from each other

  var x1 = d3.scale.ordinal();

  var y = d3.scale.linear()
    .range([height, 0]);

  /***************************
    COLORS
  ****************************/

  var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6"]);

  /***************************
    AXIS
  ****************************/

  var xAxis = d3.svg.axis() // set scale + orient
    .scale(x0)
    .orient("bottom");

  var yAxis = d3.svg.axis() // set scale + orient
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s")); // scale number format

  /***************************
    SVG
  ****************************/

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  /***************************
    CSV
  ****************************/


  function drawGraph(data, update) {
    var genderNames = d3.keys(data[0]).filter(function(key) {
      return key !== "Category";
    }); // get list of column variables : age ranges

    data.forEach(function(d) {
      d.genders = genderNames.map(function(name) {
        return {
          name: name,
          value: +d[name]
        };
      }); // get the name of each category filter and its value
    });


    x0.domain(data.map(function(d) {
      return d.Category;
    })); // state names in X axis
    x1.domain(genderNames).rangeRoundBands([0, x0.rangeBand()]); // set separation settings between x values
    y.domain([0, d3.max(data, function(d) {
      return d3.max(d.genders, function(d) {
        return d.value;
      });
    })]); // ages in y axis

    /* X axis */
    svg.select(".x.axis").remove();

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    /* Y axis */
    svg.select(".y.axis").remove();
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

    // Y axis title
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percentage of Calls");

    /* data */

    var category = svg.selectAll(".category")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + x0(d.Category) + ",0)";
      });

    /* Initialize tooltip */
    tip = d3.tip().html(function(d) {
      return d.name + " " + d.value;
    });

    /* Invoke the tip in the context of your visualization */
    category.call(tip);

    /* rectangles */
    var rects = category.selectAll("rect")
      .data(function(d) {
        return d.genders;
      });

    if (update) {
      // rects.exit().transition().duration(750).attr("height", 0).attr("width", 0).remove();
      svg.selectAll("rect").transition().duration(750).attr("height", 0).attr("width", 0).remove();
      rects.enter().append("rect")
        .attr("width", 0)
        .attr("x", function(d) {
          return x1(d.name);
        })
        .attr("y", function(d) {
          return y(d.value);
        })
        .attr("height", 0)
        .style("fill", function(d) {
          return color(d.name);
        })
        /* Show and hide tip on mouse events */
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
      
      rects
        .transition().duration(750)
        .attr("y", function(d) {
          return y(d.value);
        })
        .attr("height", function(d) {
          return height - y(d.value);
        })
        .attr("width", x1.rangeBand());
    } else {
      rects.enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) {
          return x1(d.name);
        })
        .attr("y", function(d) {
          return y(d.value);
        })
        .attr("height", function(d) {
          return height - y(d.value);
        })
        .style("fill", function(d) {
          return color(d.name);
        })
        /* Show and hide tip on mouse events */
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
      rects.exit().remove();
    }

  }



  d3.csv("data.csv", function(error, data) {
    drawGraph(data, false);
  });


  d3.select("#similar").on("click", function() {
    d3.csv("data-column.csv", function(error, data) {
      drawGraph(data, true);
    });
  });

  d3.select("#different").on("click", function() {
    d3.csv("data.csv", function(error, data) {
      drawGraph(data, true);
    });
  });

});