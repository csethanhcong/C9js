In this example, we display a simple map centered by default on France (<span id="options">longitude</span>: -1.508585 and <span id="options">latitude</span>: 43.477743) with a hight <span id="options">zoom</span> level(14).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map</span>', <span id="options">{'zoom':14}</span>)<br>
var point = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Mairie","Anglet","MARKER((-1.514989 43.481459),styles/images/marker-gold.png)"</span>);<br><br>
After we construct our map, we call the <a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>() method with three parameters.<br>
The first two are the type and the name of the annotated figure.<br>
The third one is the geometrie of the annotation.<br>
In this exemple it is a marker with <span id="options">longitude</span>=-1.514989 and <span id="options">latitude</span>=43.481459 and also the URL of marker's icon.<br>
Here the marker is in simple parenthesis in wich the coordinates are also in simple parameters.