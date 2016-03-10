<?php
$example=$_GET["example"];
$files1 = scandir($examples_dir."/".$class);
$order_tab=array();

?>
<ol class="list">
	<?php
		if(isset($class))
		{
			for ($j = 2; $j < count($files1); $j++)
			{
				$fichier=fopen($examples_path."/".$class."/".$files1[$j]."/".$order,"r");
				$order_tab[str_replace("_", " ",$files1[$j])]=fgets($fichier);
				fclose($fichier);
			}
			asort($order_tab);
			echo '<h2 id="examples">Examples</h2>';
			foreach($order_tab as $k => $v)
			{
				if($example==str_replace(" ", "_",$k))
					echo '<li class="menu_active"><a href="'.$tutorials_path.'?class='.$class.'&example='.str_replace(" ", "_",$k).'">'.$k.'</a></li>';
				else
					echo '<li><a href="'.$tutorials_path.'?class='.$class.'&example='.str_replace(" ", "_",$k).'">'.$k.'</a></li>';
			}
		}
	?>
</ol>