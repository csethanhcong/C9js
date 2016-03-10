Within this example, we display a map centered by default on France (<span id="options">longitude</span>: -1.508585 and <span id="options">latitude</span>: 43.477743) with a low <span id="options">zoom</span> level(4).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map</span>', <span id="param">{'<span id="options">top</span>': 50}</span>)<br>
var marqueur = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.Marker.html" target="_blank">Marker</a>(<span id="param">-1.509136,43.478266</span>);<br>
m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#addMarker" target="_blank">addMarker</a>(<span id="param">marqueur</span>);<br><br>
First we construct a our map with default options.<br>
Then w construct a Marker objet at the map's center but it can be in any coordinates.<br>
Finally we add the Marker object to the map.