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
	id: "#demo1",
	data: {
		plain: [
			{name: "A", value:	.0245},
			{name: "B",	value:  .01492},
			{name: "C", value:	.02782}
		],
	}, 
};
var barChart = new C9.BarChart(option);
barChart.draw();
```

Above sample will generate the Bar Chart like this:

