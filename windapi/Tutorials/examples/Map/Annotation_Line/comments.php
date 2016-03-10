In this example, we display a simple map centered on (<span id="options">longitude</span>: -1.482483 and <span id="options">latitude</span>: 43.498080) with a hight <span id="options">zoom</span> level(15).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map</span>', <span id="param">{'<span id="options">zoom</span>':15,'<span id="options">latitude</span>':43.498080,'<span id="options">longitude</span>':-1.482483,'<span id="options">top</span>': 50}</span>)<br>
var point = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Bridge","Grenet","LINESTRING(-1.481655 43.499112,-1.483240 43.496958)",{"<span id="options">style</span>":"strokeColor:red,strokeWidth:5"}</span>);<br><br>
After we construct our map, we call the <a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>() method with four parameters.<br>
- The first two are the type and the name of the annotated figure.<br>
- The third one is the geometrie of the annotation.<br>
- The last one is options of the geometrie.<br>
In this exemple it is a line formed by two points separated with a comma.<br>
Here the coordinates are in simple parenthesis.<br>