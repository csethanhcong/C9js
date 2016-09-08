## Bar Chart:

`stack`: auto stack based on input data
e.g: {name: a, value: 2} -> {name: a, y0: lowerbound(2), y1: upperbound(2)}

## Sep., 7th:

#### DONE:

1. `Hover Interaction for Bar Chart`

2. `Restructor SVG container`: SVG -> body (g)

3. `Make Grunt-Webpack combo`: Should auto-run webpack to pack modules every time each files changed
	-> run: webpack --progress --colors --watch
			or type './build.bat' in cmd

#### TODO:

0. `Hover Interaction for all Charts`

1. `setOption`: After construct a new instance from defined class, we could change individual
option of that object

2. `Data Adapter`: 
	- Support data reader with various formats (json, csv, tsv, txt,..), of course with data format 
	that match our definition
	- Add getValue(), getKey() that based on key-definition by user. DON'T use .name, .value instead
	-> Make it customizable

3. `Coding Convention`: Rename object attributes from `bla_bla` to `blaBla`

4. `Make C9.Config`: File contains all default configs, should not put all configs in each files
Put them all in 1 file: Classes, default configs, etc.
