<?php
ini_set("error_reporting", 0);
$place = removeAccent($_GET["place"]);

header("Content-type: application/xml; charset=utf-8");

$connexionPG = pg_connect("host=127.0.0.1 port=5432 user=titi password=titi40 dbname=PIV") or die("Impossible to connect to PostGIS server");
$query = "SELECT bdnyme_communes.nom_com, astext(transform(bdnyme_communes.the_geom,4326)) FROM bdnyme_communes WHERE  bdnyme_communes.nom_com ILIKE '" . $place . "'";
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

function removeAccent($str) {
	$s = array("À","Á","Â","Ã","Ä","Å","à","á","â","ã","ä","å","Ò","Ó","Ô","Õ","Ö","Ø","ò","ó","ô","õ","ö","ø","È","É","Ê","Ë","è","é","ê","ë","Ç","ç","Ì","Í","Î","Ï","ì","í","î","ï","Ù","Ú","Û","Ü","ù","ú","û","ü","Ÿ","ÿ","Ñ","ñ"," ","'");
	$r = array("A","A","A","A","A","A","a","a","a","a","a","a","O","O","O","O","O","O","o","o","o","o","o","o","E","E","E","E","e","e","e","e","c","c","I","I","I","I","i","i","i","i","U","U","U","U","u","u","u","u","Y","y","N","n","_","");
	$newstr = str_replace($s, $r, $str);
	return $newstr;
}

?>