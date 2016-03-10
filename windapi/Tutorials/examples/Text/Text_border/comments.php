Within this example, we display a text component.<br><br>
First we create the text component and we specify its options:<br>
- '<span id="options">name'</span>:'LIUPPA': the component's name.<br>
- '<span id="options">header'</span>:true,'<span id="options">color'</span>:'crimson': we enable the the header with a crimson color.<br>
- '<span id="options">border'</span>:'coral 8px inset': the border's color, width and style.<br>
- '<span id="options">width'</span>:800,'<span id="options">height'</span>:200: the component's size.<br>
- '<span id="options">left'</span>:100,'<span id="options">top'</span>:50: the component's position.<br><br>
Then we create a <a href="<?php echo $documentation_path;?>/WIND.html" target="_blank">WIND</a>.<a href="<?php echo $documentation_path;?>/WIND.Text.html" target="_blank">Text</a>.<a href="<?php echo $documentation_path;?>/WIND.Text.Paragraph.html" target="_blank">Paragraph</a> object using <a href="<?php echo $documentation_path;?>/WIND.Text.html#createParagraph" target="_blank">createParagraph</a> method.<br>
Finally w set the paragraph's content with <a href="<?php echo $documentation_path;?>/WIND.Text.Paragraph.html#setContent" target="_blank">setContent</a> method.