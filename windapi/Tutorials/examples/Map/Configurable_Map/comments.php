Within this example, we display a map centered by default on France (<span id="options">longitude</span>: -1.508585 and <span id="options">latitude</span>: 43.477743) with a low <span id="options">zoom</span> level(4).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map</span>', <span id="param">{'<span id="options">configurable</span>':true,'<span id="options">top</span>': 50}</span>)<br><br>
The <span id="options">configurable</span> option means that we can change the configuration of the map after it is displayed. If it is set to true, a button will be added on the righ of the header.<br>
If we click on it a menu will appear and then we can change:<br>
- The map's <span id="options">name</span><br>
- The color of the <span id="options">header</span> and th <span id="options">border</span><br>
- The <span id="options">zoomable</span>, <span id="options">pannable</span>, <span id="options">show scale</span> and <span id="options">show position</span> properties.<br>
- The Map's Layers<br>
- The draw toolbar<br>