Within this example, we display a text component.<br><br>
First we create the text component and we specify its options:<br>
var t = new WIND.Text('<span id="param">text', {'<span id="options">draggable</span>':true,'<span id="options">resizable</span>':true,'<span id="options">top</span>':50}</span>);<br><br>
'<span id="param">text</span>' is the identifier of the text.<br>
<span id="options">draggable</span>':true means that the text can be moved using the mouse.<br>
<span id="options">resizable</span>':true means that the text can be resized using the mouse.<br><br>
Then we create a <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Text.html" target="_blank">Text</a>.<a href="<?php echo $documentation_path;?>/WIND.Text.Paragraph.html" target="_blank">Paragraph</a> object using <a href="<?php echo $documentation_path;?>/WIND.Text.html#createParagraph" target="_blank">createParagraph</a> method.<br>
Finally w set the paragraph's content with <a href="<?php echo $documentation_path;?>/WIND.Text.Paragraph.html#setContent" target="_blank">setContent</a> method.<br>