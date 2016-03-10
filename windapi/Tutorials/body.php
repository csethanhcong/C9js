<?php
	if(isset($class) and isset($example))
	{
		$relative=$examples_dir."/".$class."/".$example;
		echo '<h1>'.str_replace("_", " ",$example).'</h1>';
		echo '<h2 class="sous_ligne">Goals</h2>';
		echo '<div class="goals_file">';
		include($relative."/".$goals);
		echo '</div>';
		echo '<h2 class="sous_ligne">Example</h2>';
		echo '<pre class="line-numbers"><code class="language-javascript">';
		echo htmlentities(file_get_contents($relative."/".$example_html));
		echo '</code></pre>';
		echo '<h2 class="sous_ligne">Comments</h2>';
		echo '<div class="comments_file">';
		include($relative."/".$comments);
		echo '</div>';
		echo '<h2 class="sous_ligne">Result</h2>';
		echo '<a href="' . $example_php . '?example_path=' . $relative . '" target="_blank">Click here to display the '.$class.'</a>';
	}
	elseif(isset($class))
	{
		include($com_class);
	}
	else
	{	
		include($about);
	}
?>
<script language="javascript"> 
				<!-- 
				function popupcentree() {
						var file= '<?php echo $example_php."?example_path=".$relative; ?>';
						
						window.open(file,"","top="+0+",left="+0+",width="+screen.width+",height="+screen.height);
				} 
				--> 
</script>