<?php
$v=$_GET["v"];
$file=$_GET["file"];
include("config.php");

if (isset($v) && isset($file))
{
	if(file_exists("./".$v."/".$file.".min.js"))
	{
		header("Content-Type: text/plain");
		echo file_get_contents($v."/".$file.".min.js");
	}
	else
	{
		echo "The file does not exist";
	}
}
else if(empty($v) && empty($file))
{
	include('about.php');
}
?>