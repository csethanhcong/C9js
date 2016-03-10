In this example, we display a simple map centered on (<span id="options">longitude</span>: -1.526535 and <span id="options">latitude</span>: 43.468320) with a hight <span id="options">zoom</span> level(13).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map</span>', {'<span id="options">zoom</span>':13,'<span id="options">latitude</span>':43.468320,'<span id="options">longitude</span>':-1.526535,'<span id="options">top</span>': 50})<br>
var point = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Aeroport","Biarritz","POLYGON((***))"</span>);<br><br>
After we construct our map, we call the <a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>() method with three parameters.<br>
- The first two are the type and the name of the annotated figure.<br>
- The third one is the geometrie of the annotation.<br>
In this exemple it is a polygon formed by three points separated with a comma.<br>
Here the coordinates are in double parenthesis.