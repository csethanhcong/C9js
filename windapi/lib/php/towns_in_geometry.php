<?php
ini_set("error_reporting", 0);
$geo = $_GET["geo"];
$geo = str_replace("%20", " ", $geo);

header("Content-type: application/xml; charset=utf-8");

$connexionPG = pg_connect("host=127.0.0.1 port=5432 user=titi password=titi40 dbname=PIV") or die("Impossible to connect to PostGIS server");
$query = "SELECT bdnyme_communes.nom_com, astext(transform(bdnyme_communes.the_geom,4326)) FROM bdnyme_communes WHERE intersects(transform(bdnyme_communes.the_geom,4326),geomfromtext('" . $geo . "',4326)) AND bdnyme_communes.depart IN (SELECT bdnyme_departements.code_dept FROM bdnyme_departements WHERE intersects(transform(bdnyme_departements.the_geom,4326),geomfromtext('" . $geo . "',4326))) ORDER BY bdnyme_communes.nblog DESC LIMIT 100";

// Example : Avec intersects (523 lignes)
// SELECT bdnyme_communes.nom_com, astext(transform(bdnyme_communes.the_geom,4326)) FROM bdnyme_communes WHERE intersects(transform(bdnyme_communes.the_geom,4326),geomfromtext('POLYGON((-1.1879199217194987 43.53767013574067,-0.5397265624606453 43.776123514306555,0.09198730461370154 43.46196251276154,0.12494628898279547 42.99367149478285,-1.1879199217194987 43.53767013574067))',4326)) AND bdnyme_communes.depart IN (SELECT bdnyme_departements.code_dept FROM bdnyme_departements WHERE intersects(transform(bdnyme_departements.the_geom,4326),geomfromtext('POLYGON((-1.1879199217194987 43.53767013574067,-0.5397265624606453 43.776123514306555,0.09198730461370154 43.46196251276154,0.12494628898279547 42.99367149478285,-1.1879199217194987 43.53767013574067))',4326))) ORDER BY bdnyme_communes.nblog DESC LIMIT 100
// Avec contains (400 lignes) Temps d'exécution total : 3,726.096 ms
// SELECT bdnyme_communes.nom_com, astext(transform(bdnyme_communes.the_geom,4326)) FROM bdnyme_communes WHERE contains(geomfromtext('POLYGON((-1.1879199217194987 43.53767013574067,-0.5397265624606453 43.776123514306555,0.09198730461370154 43.46196251276154,0.12494628898279547 42.99367149478285,-1.1879199217194987 43.53767013574067))',4326),transform(bdnyme_communes.the_geom,4326)) AND bdnyme_communes.depart IN (SELECT bdnyme_departements.code_dept FROM bdnyme_departements WHERE intersects(geomfromtext('POLYGON((-1.1879199217194987 43.53767013574067,-0.5397265624606453 43.776123514306555,0.09198730461370154 43.46196251276154,0.12494628898279547 42.99367149478285,-1.1879199217194987 43.53767013574067))',4326),transform(bdnyme_departements.the_geom,4326))) ORDER BY bdnyme_communes.nblog DESC LIMIT 100

// depart intersects : POLYGON((-1.1879199217194987 43.53767013574067,-0.5397265624606453 43.776123514306555,0.09198730461370154 43.46196251276154,0.12494628898279547 42.99367149478285,-1.1879199217194987 43.53767013574067))
//$query = "SELECT bdnyme_departements.code_dept FROM bdnyme_departements WHERE intersects(transform(bdnyme_departements.the_geom,4326),geomfromtext('" . $geo . "',4326))";

$resultat = pg_query($connexionPG, $query);
if (!$resultat) { die('Pb requete verification commune : '.$query);	}
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