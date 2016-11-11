## Setup
---
### Download:

1. Direct downloads:

	* From [GitHub](https://github.com/csethanhcong/C9js/releases)

	* From [unpkg](https://unpkg.com/C9js)

2. Via Package Manager: 

	* `npm: npm install C9js`

	* `bower: bower install C9js`

### Usage:

```js
<!-- Load C9.css -->
<link href="/path/to/C9.css" rel="stylesheet" type="text/css">

<!-- Load d3.js and C9.js -->
<script src="/path/to/d3.v3.min.js" charset="utf-8"></script>
<script src="/path/to/C9.min.js"></script>
```

C9js is built on d3, so please load d3 before load C9js

> Note: If you want to generate Map, please load OpenLayers 3 also

```js
<link rel="stylesheet" href="https://openlayers.org/en/v3.19.1/css/ol.css" type="text/css">

<script src="https://openlayers.org/en/v3.19.1/build/ol.js" type="text/javascript"></script>
<script src="/path/to/C9.min.js"></script>
```

## Generate First C9 Chart
---

Built on top with discipline that always make it clear and easy to use. Use ES6's new features, so C9 is basically `Object` constructed from `Class`

Firstly, create a container for C9 to *occupy* ;)

```js
<div id="chart"></div>
```

Then contruct your own C9 chart, and call `draw` function

```js
var option = {
	id: "#chart",
	data: {
		plain: [
			{name: "A", value:	10},
			{name: "B",	value:  20},
			{name: "C", value:	50},
			{name: "D", value:	30},
			{name: "E", value:	70},
		],
	}, 
};
var barChart = new C9.BarChart(option);
barChart.draw();
```

> Note: All constructors of C9 begin with namespace 'C9', please make sure you don't miss it

Above sample will generate the Bar Chart like this:

C9js currently supports many types of chart (`Bar Chart`, `Line Chart`, `Timeline`, `Pie Chart`, `Donut Chart`), you can see some [examples](http://c9js.me/examples.html) available.

## Generate First C9 Map
---

Like Chart, firstly, you need a container

```js
<div id="map"></div>
```

Then contruct your own C9 map, and call `draw` function

```js
var option = {
	id: "#map",
};
var map = new C9.Map(option);
map.draw();
```

## Data Adapter
---

C9js supports various formats of data (`csv`, `tsv`, `json`, `text`, `xml`) and `xhr` also

But it's not all. Data Adapter make your data `adaptive` literally. For example, you have an object like: 

```js
[
	{
		username: 'Adam',
		property: {
			salary: 1000,
			age: 28,
		},
		...
	},
...
]
```

So, you just need point out which data you want to present on C9 Chart

```js
var option = {
	data: {
		file: {
			url: '/data/data1.json',
			type: 'json'
		},
		// Your own defined-keys go here
		keys: {
			'name': 'username',
			'value': 'property.salary'
		}
	}
}

var chart = new C9.BarChart(option);
chart.draw();
```

## Customize Chart/Map Option
---
### setOption

We have a stand-alone function call `setOption` to set option (of course!) if you don't want to bring a bunch of config
at the constructing time

Before `draw` Chart/Map, you can change simply options like below:

```js
// ... bunch of code
chart.setOption('grid.x.show', true);
```

> Remember the *dot* sign (.) to dig into deep object config, e.g 

	grid: {
		x: {
			show: true
		}
	}
	~ equal to
	chart.setOption('grid.x.show', true);

C9 has a lot of options to make your chart/map more colorful, more attractive and more useful

### Axis Format

Hide grid on axis x, rotate tick on axis x 45 degree, show axis y, format tick label on axis y:

```js
var option = {
	axis: {
		x: {
			show: true,
			grid: false,
			tick: {
				rotate: 45
			}
		},
		y: {
			show: true,
			tick: {
				format: function(data, index) {
					return '-' + data + '-';
				}
			}
		},
	}
};

var chart = new C9.LineChart(option);
chart.draw();

```
You can see some examples on axis option [here](http://c9js.me/)

### Tooltip Format

```js
var option = {
	tooltip: {
		tooltip: {
			format: function(data, index) {
				format: function(data, index) {
		            return '<strong>' + data.name + '</strong>' + '<br>' + 'Start at hour: ' + data.start.getHours() + '<br>' + 'End at hour: ' + data.end.getHours();
		        }
			}
		},
	}
};

var chart = new C9.Timeline(option);
chart.draw();
```

In Timeline, data will be normalized and return with format

```js
{
	name: String,
	start: DateObject,
	end: DateObject,
}
```
> Tooltip will be render with format in type of Plain String or HTML, so you can put HTML tag on format return function

Display tooltip on top of data

```js
var option = {
	tooltip: {
		position: 'top'
	}
};

var chart = new C9.DonutChart(option);
chart.draw();
```

C9js supports 4 positions on Tooltip: `top`, `right`, `bottom`, `left`

Some examples on Tooltip go [here](http://c9js.me/)

### Table 

C9js also brings to you `Table` to have an overview through your data


```js
var option = {
	table: {
		show: 'true'
	}
};

var chart = new C9.DonutChart(option);
chart.draw();
```

> Try to hover on each row and see what happens ;)

## Customize Styles
---

### Via option constructor

Change color range used to color chart

```js
var option = {
	colorRange: ['red', 'green', 'blue']
};

var chart = new C9.DonutChart(option);
chart.draw();
```

### Via CSS Selector

Each C9js components has its own `CSS Class` to help you simply overwrite its style via CSS Selector

```js
// Your css customize file
.c9-chart-bar.c9-custom-rect {
    opacity: 0.5;
}
```

## Update Chart
---

You can load Chart continuously with `updateData`

```js
// ... chart drawn already
var chart = new C9.DonutChart(option);
chart.draw();

// Then, update it
setTimeout(function(){
	chart.updateData([
		{name: "Male", value:	45},
		{name: "Female", value:	55},
	]);
}, 5000);
```

You can also re-define which keys you want to update

```js
// ... chart drawn already
var chart = new C9.DonutChart(option);
chart.draw();

// Then, update it
setTimeout(function(){
	chart.updateData([
		{
			name: "Male", 
			property: {
				age: 28,
				salary: 5000
			}
		},
		{
			name: "Female", 
			property: {
				age: 30,
				salary: 4500
			}
		},
	], {
		// new keys go here
		value: 'property.salary'
	});
}, 5000);
```

## and [more...](http://c9js.me/examples.html)
