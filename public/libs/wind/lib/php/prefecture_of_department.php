<?php
ini_set("error_reporting", 0);
$place = $_GET["place"];

header("Content-type: application/xml; charset=utf-8");

$connexionPG = pg_connect("host=127.0.0.1 port=5432 user=titi password=titi40 dbname=PIV") or die("Impossible to connect to PostGIS server");
$query = "SELECT bdnyme_departements.nom_chf_l, astext(transform(bdnyme_communes.the_geom,4326)) FROM bdnyme_departements, bdnyme_communes WHERE bdnyme_departements.nom_dept ILIKE '" . $place . "' AND bdnyme_departements.nom_chf_l = bdnyme_communes.nom_com";
$resultat = pg_query($connexionPG, $query);
//if (!$resultat) { die('Pb requete verification commune : '.$query);	}
echo "<geonames>";
$nbFields = pg_num_fields($resultat);
$fieldname = array();
for ($i=0; $i<$nbFields; $i++) {
	$fieldname[] = pg_field_name($resultat, $i);
}
while ($row = pg_fetch_array($resultat)){
	echo "<geoname>";
	for ($i=0; $i<$nbFields; $i++) {
		echo "<" . $fieldname[$i] . ">" . $row[$i] . "</" . $fieldname[$i] . ">";
	}
	echo "</geoname>";
}
echo "</geonames>";


?>