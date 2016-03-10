In this example, we display a simple map centered by default on France (<span id="options">longitude</span>: -1.508585 and <span id="options">latitude</span>: 43.477743) with a hight <span id="options">zoom</span> level(14).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map</span>', {'<span id="options">zoom</span>':14,'<span id="options">top</span>': 50})<br>
var point = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"University","IUT","POINT(-1.508585 43.477743)"</span>,<span id="param">{"projection":"EPSG:4326","style":"strokeColor:red,strokeWidth:3,strokeOpacity:1, fillColor:#FF9900,fillOpacity:1","display":true,"geoname":"point"}</span>);<br><br>
After we construct our map, we call the <a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>() method with four parameters.<br>
- The first two are the type and the name of the annotated figure.<br>
- The third one is the geometrie of the annotation.<br>
- The last one is options of the geometrie.<br>
In this exemple it is a point with <span id="options">longitude</span>=-1.508585 and <span id="options">latitude</span>=43.477743.<br>
Here the coordinates are in simple parenthesis.