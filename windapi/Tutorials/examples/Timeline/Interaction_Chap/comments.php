Within this example, we display a Timeline composed by two bands. The years band and the months band.<br><br>
First we create the timeline, '<span id="param">timeline</span>' is its identifier.<br>
Here we didn't give any options so they all have a default value<br><br>
We create 2 <a href="<?php echo $documentation_path;?>/WIND.Annotation.html" target="_blank">annotation</a> objects using the <a href="<?php echo $documentation_path;?>/WIND.Timeline.html#createAnnotation" target="_blank">createAnnotation</a> method.<br>
Then we create a <a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html" target="_blank">SelectEvent</a> object with two parameters:<br>
- The event's type.<br>
- The annotation where the event will be triggered.<br><br>
Then the <a href="<?php echo $documentation_path;?>/WIND.SelectEvent.html#trigger" target="_blank">trigger</a> method allows to execute a javaScript function when the event is triggered.<br>
Later we create an <a href="<?php echo $documentation_path;?>/WIND.ExternalReaction.html" target="_blank">ExternalReaction</a> object with two parameters:<br>
- The annotation where the reaction will occur.<br>
- The function that will occur.<br><br>
Afterward we create an <a href="<?php echo $documentation_path;?>/WIND.Interaction.html" target="_blank">Interaction</a> object that wil link an event and a reaction.<br>
Finally we <a href="<?php echo $documentation_path;?>/WIND.Interaction.html#activate" target="_blank">activate</a> the interaction that will run the reactions when the event is triggered.