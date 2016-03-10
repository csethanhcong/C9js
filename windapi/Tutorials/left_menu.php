<?php
$class=$_GET["class"];
$files=scandir($examples_dir);
?>
<ul class="list">
	<?php
		echo '<h2 id="classes">Classes</h2>';
		
		for ($i = 2; $i < count($files); $i++) 
		{
			if($class==$files[$i])
				echo '<li id="type" class="menu_active"><a class="menu_active" href="'.$tutorials_path.'?class='.$files[$i].'">'.$files[$i].'</a></li>';
			else
				echo '<li id="type"><a href="'.$tutorials_path.'?class='.$files[$i].'">'.$files[$i].'</a></li>';
		}
	?>
</ul>