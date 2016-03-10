
<?php
include("../config.php");
$example_path=$_GET["example_path"];
$file_content=file_get_contents($example_path."/".$example_html);
$file_content=str_replace('<body>','<link href="styles/tutoCom.css" rel="stylesheet" type="text/css"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<body>
<script language="javascript"> 
				<!-- 
				function popupcentre() {
						var file="'.$example_path.'/'.$example_specification.'";
						
						window.open(file,"_blank","top="+screen.height+"-400,left="+screen.height+"-600,width=600,height=400");
				} 
				--> 
</script>
<a style="position:absolute" href="javascript:popupcentre();">Example Specification</a>',$file_content);
echo $file_content;
?>