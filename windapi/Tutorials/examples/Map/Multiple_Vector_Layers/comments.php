This example consists of adding two different annotations on different vector layer.<br><br>
We display a simple map centered on (<span id="options">longitude</span>: -1.526535 and <span id="options">latitude</span>: 43.468320) with a hight <span id="options">zoom</span> level(13).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map</span>', {'<span id="options">zoom</span>':13,'<span id="options">latitude</span>':43.468320,'<span id="options">longitude</span>':-1.526535});<br><br>
Then we create two annotations with the <a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>() method.<br><br>
var blue_annot = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Town","Bayonne","MULTIPOLYGON(((...)))"</span>);<br>
var red_annot = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Town","Pau","MULTIPOLYGON(((...)))"</span>);<br><br>
Then we create a SelectEvent object with two parameters:<br>
- The event's type.(Here a left click)<br>
- The annotation where the event will be triggered.<br><br>
var evt1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html" target="_blank">SelectEvent</a>(<span id="param">"click",annot1</span>);<br><br>
Then the <a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html#trigger" target="_blank">trigger</a> method allows to execute a javaScript function when the event is triggered<br><br>
evt1.<a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html#trigger" target="_blank">trigger</a>(<span id="param">function(e){}</span>);<br><br>
Here we create an <a href="<?php echo $documentation_path;?>/WIND.ExternalReaction.html" target="_blank">ExternalReaction</a> object with two parameters:<br>
- The annotation where the reaction will occur.<br>
- The function that will occur.<br><br>
var react1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.ExternalReaction.html" target="_blank">ExternalReaction</a>(<span id="param">annot1, "hide"</span>);<br><br>
Then we create an <a href="<?php echo $documentation_path;?>/WIND.Interaction.html" target="_blank">Interaction</a> object that will link an event and a series of reaction.<br><br>
var i1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Interaction.html" target="_blank">Interaction</a>(<span id="param">evt1, new Array(react1)</span>);<br><br>
Finally we activate the interaction that will run the reactions when the event is triggered.<br><br>
i1.<a href="<?php echo $documentation_path;?>/WIND.Interaction.html#activate" target="_blank">activate()</a>;