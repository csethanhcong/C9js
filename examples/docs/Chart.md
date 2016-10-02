## Bar Chart:

1. `stack`: auto stack based on input data
e.g: {name: a, value: 2} -> {name: a, y0: lowerbound(2), y1: upperbound(2)}

2. `data`: [{name: "VN", value: [0, 0.1, 0.2, ...], total: 1, stack: [{color: "#ffffff", y0: 0, y1: 1, group: "Group 1", name: "VN"}, ...]}, ...]

## Line Chart:

## Pie Chart:
1. `data`: [{name: "VN", value: 10}, ...]

## Donut Chart:
1. `data`: [{name: "VN", value: 10}, ...]

## Timeline Chart:



## Sep., 7th:

#### DONE:

2. `Restructor SVG container`: Main Skeleton
	SVG
	 	body (g.c9-chart.c9-custom-container)
	 		bar(c9-chart-bar c9-custom-bar) | arc(c9-chart-donut c9-custom-arc) | line
	 		tooltip
		title
		legend

3. `Make Grunt-Webpack combo`: Should auto-run webpack to pack modules every time each files changed
	-> run: webpack --progress --colors --watch
			or type './build.bat' in cmd

4. `Coding Convention`: Rename object attributes from `bla_bla` to `blaBla`

5. `Remake Hover Interaction for Donut Chart`: 
http://bl.ocks.org/erichoco/6694616  
http://zeroviscosity.com/d3-js-step-by-step/step-6-animating-interactivity

6. `Hover Interaction for all Charts`:
	- DONE: Bar Chart, Line Chart, Donut Chart, Pie Chart

#### TODO:

0000. `Add Hover on Legend, temporarily disable/enable like Click on Legend`
	- DONE: Donut Chart, Pie Chart
		- Option 1: on Hover Legend, we should make it HIGHLIGHT current pie/donut data
		- Option 2: on Hover Legend, we should make it INVISIBLE current pie/donut data
	- NEXT: Line Chart, Bar Chart

000. `Add General Legend to all charts, Interaction when Click on each Legend`: 
	- DONE: Donut Chart, Pie Chart
	- NEXT: Line Chart, Bar Chart

1. `setOption`: After construct a new instance from defined class, we could change individual
option of that object

2. `Data Adapter`: 
	- Support data reader with various formats (json, csv, tsv, txt,..), of course with data format 
	that match our definition
	- Add getValue(), getKey() that based on key-definition by user. DON'T use .name, .value instead
	-> Make it customizable

	- Notes: 
		+ With XHR, only accept response data with format JSON, so we just call getJson for the specific request
		+ `Input data constructor`:
			data
				|--- plain: Array contains plain data 	| DEFAULT: null | e.g. plain: [1,2,3,4] => [{name: 1, value: 1}, {name: 2, value: 2}]
				|--- file: In case of non-plain data, users have to input file instead
					|--- type: Type of file 			| DEFAULT: json | e.g. type: "json" ("xml", "csv", "tsv", "txt", "xhr")
					|--- url: Url to execute 			| DEFAULT: null | e.g. url: "example.ord/data.xml"
				|--- keys: Define key to retrieve name, value
					|--- name: Key to define name 		| DEFAULT: "name" | e.g. name: "name"
					|--- value: Key to define value 	| DEFAULT: "value" | e.g. value: "value.v1.v2"
				|--- groups: If plain data is array | DEFAULT: groups | e.g. groups: [<name of Legend>]
				|--- stacks: [<name of Legend>]

		+ `DataAdapter`: 
			- [`DONE`] `dataSource`: data.plain || data.file...
			- `dataTarget`: [{name:, value:, color:, data-ref: counter ID, enable: true}, {}, ... ]
				- [`DONE`] Bar: 
					- [`DONE`] `Single`: [{name:, value:, max:< =Value >, color:, data-ref: counter ID, enable: true}, {}, ... ]
					- [`DONE`] `Group`: [{max: <max value of group>, stack: [{color: "#ffffff", y0: 0, y1: 1, group: "Group 1", name: <Define Legend>, data-ref: counter ID, enable: true}, {<Single Bar in Group>}]}, {<Group>}]
					- [`DONE`] `Stack`: [{max: <sum of value in Group>, stack: [{color: "#ffffff", y0: 0, y1: 1, group: "Group 1", name: <Define Legend>, data-ref: counter ID, enable: true}, {<Single Bar in Group>}]}, {<Group>}]
				- Line: 
				- [`DONE`] Pie/Donut: [{name:, value:, color:, data-ref: counter ID, enable: true}, {}, ... ]
				- TimeLine: [{icon:, name:, value: [{start: <Date>, end: <Date>, color:, data-ref: counter ID, enable: true}, {}, ..]}, {}, ... ]

			- Methods: 
				- [`DONE`] getDataTypeForBarChart():
					Return:
					- dataSource.groups => "group"
					- dataSource.stacks => "stack"
					- DEFAULT => "single"
				- [`DONE`] <Data>getDataTarget(typeOfChart)

3. `Make C9.Config`: File contains all default configs, should not put all configs in each files
Put them all in 1 file: Classes, default configs, etc.

4. `Bar Chart: Add Group bar chart to filter domain`: To create legend for bar chart, we should add new type of 
Bar Chart (Group of bar chart)

5. `Bar Chart`: Add isLogaric Implementation for DATA-SCALE, currently only implement for y-scale

6. `Create Table View`: 
	- REF: https://developers.google.com/chart/interactive/docs/gallery/table

7. `Separate setting options into abc.xyz.blabla`, e.g.
	grid: {
		show: true,
		text: {
			show: true,
			position: center
		}
	}