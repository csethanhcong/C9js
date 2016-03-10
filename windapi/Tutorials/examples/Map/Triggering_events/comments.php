This example consists of triggering ("hide") reaction  on several annotations with a different types of events ("click", "mouseleave", "mousedown" and "dblclick").<br><br>
We display a simple map centered on (<span id="options">longitude</span>: -0.973270 and <span id="options">latitude</span>: 43.442174) with a medium <span id="options">zoom</span> level(9).<br><br>
var m = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Map.html" target="_blank">Map</a>('<span id="param">map', {'<span id="options">type</span>':'Bing Hybrid','<span id="options">zoom</span>':9,'<span id="options">latitude</span>':43.442174,'<span id="options">longitude</span>':-0.973270}</span>)<br><br>
Then we create four annotations with the <a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>() method.<br><br>
var annot1 = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Town","Bayonne","MULTIPOLYGON(((...)))"</span>);<br>
var annot2 = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Town","Pau","MULTIPOLYGON(((...)))"</span>);<br>
var annot3 = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Town","Tarnos","MULTIPOLYGON(((...)))"</span>);<br>
var annot4 = m.<a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Town","ARCANGUES","MULTIPOLYGON(((...)))"</span>);<br><br>
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