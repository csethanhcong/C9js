<?php
ini_set("error_reporting", 1);
//geotopia 10.0.13.239
$connexionPG = pg_connect("host=127.0.0.1 port=5432 user=titi password=titi40 dbname=PIV") or die("Impossible to connect to PostGIS server");
//$connexionPG = pg_connect("host=193.50.225.18 port=5432 user=titi password=titi40 dbname=PIV") or die("Impossible to connect to PostGIS server");
//$connexionPG = pg_connect("host=10.0.13.239 port=5432 user=t2i password=mdpt2i dbname=geotopia");
//$connexionPG = pg_connect("host=194.167.155.20 port=5432 user=t2i password=mdpt2i dbname=geotopia");
// or die("Impossible to connect to PostGIS server");
//$connexionPG = pg_connect("host=10.3.205.162 port=5432 user=desi password=bayonne dbname=piir") or die("Could not connect to PostGIS server");
	print pg_options($connexionPG);
if ($connexionPG) {
	echo "Connected";
	pg_trace('trace.log', 'w', $connexionPG);
	pg_query("SELECT 1");
	pg_untrace($connexionPG);
}
else {
   print pg_last_error($connexionPG);
   exit;
}

?>