<?php
ini_set("error_reporting", 0);
$resource = $_POST["resource"];
$query = $_POST["query"];
$query = str_replace("\'","'", $query);
$query = utf8_decode($query);
header("Content-type: application/xml; charset=utf-8");
if ($resource == "geonames") {
echo "<geonames>";
if ($connectMySQL = mysql_connect("erozate.iutbayonne.univ-pau.fr", "wind_user", "t2i")) {
	if (mysql_select_db("wind", $connectMySQL)) {
		$res = mysql_query($query);
		$nb = mysql_num_rows($res);
		echo "<totalResultsCount>" . $nb . "</totalResultsCount>";
		while ($row = mysql_fetch_assoc($res)) {
			echo "<geoname>";
			echo "<geonameId>" . $row['geonameid'] . "</geonameId>";
			
			echo "<name>" . utf8_encode($row['name']) . "</name>";
			echo "<toponymName>" . utf8_encode($row['asciiname']) . "</toponymName>";
			echo "<alternateNames>" . utf8_encode($row['alternatenames']) . "</alternateNames>";
			
			echo "<lng>" . $row['longitude'] . "</lng>";
			echo "<lat>" . $row['latitude'] . "</lat>";
			
			echo "<countryCode>" . $row['country_code'] . "</countryCode>";
			echo "<countryName>" . $row['country_code'] . "</countryName>"; // a modifier
			
			echo "<fcl>" . $row['feature_class'] . "</fcl>";
			echo "<fcode>" . $row['feature_code'] . "</fcode>";
			
			$query2 = "SELECT name FROM featureclasses WHERE feature_class = '" . $row['feature_class'] . "'";
			$res2 = mysql_query($query2);
			$row2 = mysql_fetch_array($res2);
			echo "<fclName>" . utf8_encode($row2[0]) . "</fclName>";
			
			$query2 = "SELECT name FROM featurecodes WHERE feature_code = '" . $row['feature_class'] . "." . $row['feature_code'] . "'";
			$res2 = mysql_query($query2);
			$row2 = mysql_fetch_array($res2);
			echo "<fcodeName>" . utf8_encode($row2[0]) . "</fcodeName>";
			
			echo "<adminCode1>" . $row['admin1_code'] . "</adminCode1>";
			$query2 = "SELECT name FROM admin1codes WHERE admin1_code = '" . $row['country_code'] . "." . $row['admin1_code'] . "'";
			$res2 = mysql_query($query2);
			$row2 = mysql_fetch_array($res2);
			echo "<adminName1>" . utf8_encode($row2[0]) . "</adminName1>";
			
			echo "<adminCode2>" . $row['admin2_code'] . "</adminCode2>";
			$query2 = "SELECT name FROM admin2codes WHERE admin2_code = '" . $row['country_code'] . "." . $row['admin1_code'] . "." . $row['admin2_code'] . "'";
			$res2 = mysql_query($query2);
			$row2 = mysql_fetch_array($res2);
			echo "<adminName2>" . utf8_encode($row2[0]) . "</adminName2>"; 

			echo "<adminCode3>" . $row['admin3_code'] . "</adminCode3>";
			echo "<adminName3>" . $row['admin3_code'] . "</adminName3>"; // a modifier
			echo "<adminCode4>" . $row['admin4_code'] . "</adminCode4>";
			echo "<adminName4>" . $row['admin4_code'] . "</adminName4>"; // a modifier
			
			echo "<population>" . $row['population'] . "</population>";
			echo "<elevation>" . $row['elevation'] . "</elevation>";
			
			$query2 = "SELECT dst_offset, gmt_offset FROM timezones WHERE timezoneid = '" . $row['timezone'] . "'";
			$res2 = mysql_query($query2);
			$row2 = mysql_fetch_array($res2);
			if ($row2) 
				echo "<timezone dstOffset=\"" . $row2[0] . "\" gmtOffset=\"" . $row2[1] . "\">" . $row['timezone'] . "</timezone>";
			else
				echo "<timezone>" . $row['timezone'] . "</timezone>"; //dstOffset="2.0" gmtOffset="1.0"
			echo "</geoname>";
		}
	}
}
echo "</geonames>";
}
else if ($resource == "postgres") {
	$connexionPG = pg_connect("host=127.0.0.1 port=5432 user=titi password=titi40 dbname=PIV") or die("Impossible to connect to PostGIS server");
	//$connexionPG = pg_connect("host=localhost port=5432 user=titi password=titi40 dbname=PIV") or die("Impossible to connect to PostGIS server");
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
}

?>