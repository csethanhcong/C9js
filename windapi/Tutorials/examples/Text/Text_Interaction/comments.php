Within this example, we display a text component with contents.<br><br>
First we create the text component and we specify its options:<br>
var t = new WIND.Text('<span id="param">text', {'<span id="options">top</span>':50}</span>);<br><br>
'<span id="param">text</span>' is the identifier of the text.<br><br>
Then we create a <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Text.html" target="_blank">Text</a>.<a href="<?php echo $documentation_path;?>/WIND.Text.Paragraph.html" target="_blank">Paragraph</a> object using <a href="<?php echo $documentation_path;?>/WIND.Text.html#createParagraph" target="_blank">createParagraph</a> method.<br>
Then we set the paragraph's content with <a href="<?php echo $documentation_path;?>/WIND.Text.Paragraph.html#setContent" target="_blank">setContent</a> method.<br><br>
After that we create two annotations with different styles using the <a href="<?php echo $documentation_path;?>/WIND.Text.html#createAnnotation" target="_blank">createAnnotation</a>() method.<br>
Then we create two "click" event for each annotation using the <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html" target="_blank">SelectEvent</a> object.<br><br>
Then the <a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html#trigger" target="_blank">trigger</a> method allows to execute a javaScript function when the event is triggered<br>
evt1.<a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html#trigger" target="_blank">trigger</a>(<span id="param">function(e){}</span>);<br><br>
Here we create an <a href="<?php echo $documentation_path;?>/WIND.ExternalReaction.html" target="_blank">ExternalReaction</a> object with three parameters:<br>
- The annotation where the reaction will occur.<br>
- The function that will occur.<br>
- The the parameter for the function.<br><br>
var react1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.ExternalReaction.html" target="_blank">ExternalReaction</a>(<span id="param">annot1, "setStyle","background-color:green;color:white;font-weight:bold"</span>);<br><br>
Then we create an <a href="<?php echo $documentation_path;?>/WIND.Interaction.html" target="_blank">Interaction</a> object that will link an event and a series of reaction.<br><br>
var i1 = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Interaction.html" target="_blank">Interaction</a>(<span id="param">evt2, new Array(react1)</span>);<br><br>
Finally we activate the interaction that will run the reactions when the event is triggered.<br><br>
i1.<a href="<?php echo $documentation_path;?>/WIND.Interaction.html#activate" target="_blank">activate()</a>;