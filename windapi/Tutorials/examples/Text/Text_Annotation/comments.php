In this example, we create an empty text then we create a paragraph and add contents to it.<br>
Then we create an annotation in this text using the <a href="<?php echo $documentation_path;?>/WIND.Text.html#createAnnotation" target="_blank">createAnnotation</a>() method which take six parameters:<br>
- <span id="param">Word</span>: type of the annotation.<br>
- <span id="param">River</span>: name of the annotated entity.<br>
- <span id="param">1</span>: ID of the paragraph. The IDs start from 1.<br>
- <span id="param">11</span>: ID of the first token. The token IDs start from 1.<br>
- <span id="param">12</span>: ID of the last token.<br>
- <span id="param">{"style":"background-color:blue;color:white"}</span>: the style of the annotation.<br>