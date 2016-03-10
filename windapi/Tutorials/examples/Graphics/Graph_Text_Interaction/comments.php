We display a simple graph that we created before.<br>
var g = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Graphics.html" target="_blank">Graphics</a>('<span id="param">'myGraph',{'resizable':true,'draggable':true,'top':50})<br><br>
		g.CreateChart();<br>

Then we create four annotations with the <a href="<?php echo $documentation_path;?>/WIND.Map.html#createAnnotation" target="_blank">createAnnotation</a>() method.<br><br>
var graph_annot1 = g.<a href="<?php echo $documentation_path;?>/WIND.Graphics.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Date","2014-06-11",{"style":"strokeColor:green,strokeWidth:3,strokeOpacity:1,fillColor:green,fillOpacity:0.5"}"</span>);<br>
var graph_annot2 = g.<a href="<?php echo $documentation_path;?>/WIND.Graphics.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Date","2014-06-12",{"style":"strokeColor:green,strokeWidth:3,strokeOpacity:1,fillColor:green,fillOpacity:0.5"});<br>
var text_annot1 = t.<a href="<?php echo $documentation_path;?>/WIND.Graphics.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Date","2014-06-11",1,7,7,{"style":"background-color:red;color:white;"});<br>
var text_annot2 = t.<a href="<?php echo $documentation_path;?>/WIND.Graphics.html#createAnnotation" target="_blank">createAnnotation</a>(<span id="param">"Date","2014-06-12",1,9,9,{"style":"background-color:green;color:white;"});<br>
		
<br>Then we create a SelectEvent object with two parameters:
<br>- The event's type.(Here a left click)
<br>- The annotation where the event will be triggered.
var evt1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html" target="_blank">SelectEvent</a>(<span id="param">"click",annot1</span>);<br><br>

Then the <a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html#trigger" target="_blank">trigger</a> method allows to execute a javaScript function when the event is triggered<br><br>
evt1.<a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html#trigger" target="_blank">trigger</a>(<span id="param">function(e){}</span>);<br><br>
Here we create an <a href="<?php echo $documentation_path;?>/WIND.ExternalReaction.html" target="_blank">ExternalReaction</a> object with two parameters:<br>
- The annotation where the reaction will occur.<br>
- The function that will occur.<br><br>
var react1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.ExternalReaction.html" target="_blank">ExternalReaction</a>(<span id="param">annot1, "highlight"</span>);<br><br>
Then we create an <a href="<?php echo $documentation_path;?>/WIND.Interaction.html" target="_blank">Interaction</a> object that will link an event and a series of reaction.<br><br>
var i1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Interaction.html" target="_blank">Interaction</a>(<span id="param">evt1, new Array(react1)</span>);<br><br>
Finally we activate the interaction that will run the reactions when the event is triggered.<br><br>
i1.<a href="<?php echo $documentation_path;?>/WIND.Interaction.html#activate" target="_blank">activate()</a>;

