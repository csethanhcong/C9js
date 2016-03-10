Within this example, we display a Timeline composed by two bands. The years band and the months band.<br><br>
var t = new <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Timeline.html" target="_blank">Timeline</a>('<span id="param">timeline</span>', <span id="param">{}</span>)<br>
t.<a href="<?php echo $documentation_path;?>/WIND.Timeline.html#createAnnotation" target="_blank">createAnnotation</a>("<span id="param">Event</span>","<span id="param">Mother's Day</span>","<span id="param">2014-05-11</span>","<span id="param">2014-05-11</span>");<br><br>
First we create the timeline, '<span id="param">timeline</span>' is its identifier.<br>
Here we didn't give any options so they all have a default value<br><br>
Then we create an annotation using the <a href="<?php echo $documentation_path;?>/WIND.Timeline.html#createAnnotation" target="_blank">createAnnotation</a> method which takes four parameters.<br>
- <span id="param">Event</span>: The type of the annotation.<br>
- <span id="param">Mother's Day</span>: The name of the annotation.<br>
- <span id="param">2014-05-11</span>: Starting date.<br>
- <span id="param">2014-05-11</span>: Ending date.<br>
If the starting and the ending date are equal, the annotation is an instant.