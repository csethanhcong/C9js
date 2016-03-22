<?php
ini_set("error_reporting", 0);
$place = removeAccent($_GET["place"]);

header("Content-type: application/xml; charset=utf-8");

echo "<geonames>";
if ($connectMySQL = mysql_connect("localhost", "wind_user", "t2i")) {
	if (mysql_select_db("wind", $connectMySQL)) {
		if (($precision) && ($precision != "")) $rq = "SELECT * FROM geonames WHERE name = '" . $place . "' ORDER BY population DESC";
		else $rq = "SELECT * FROM geonames WHERE name LIKE '" . $place . "%' OR asciiname LIKE '" . $place . "%' OR alternatenames LIKE '%" . $place . "%' ORDER BY population DESC";
		$fh = fopen("log.txt", 'w') or die("can't open file");
	fwrite($fh, $rq);
	fclose($fh);
		mysql_query("SET NAMES 'utf8'");
		$res = mysql_query($rq);
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

function removeAccent($str) {
	$s = array("À","Á","Â","Ã","Ä","Å","à","á","â","ã","ä","å","Ò","Ó","Ô","Õ","Ö","Ø","ò","ó","ô","õ","ö","ø","È","É","Ê","Ë","è","é","ê","ë","Ç","ç","Ì","Í","Î","Ï","ì","í","î","ï","Ù","Ú","Û","Ü","ù","ú","û","ü","Ÿ","ÿ","Ñ","ñ"," ","'");
	$r = array("A","A","A","A","A","A","a","a","a","a","a","a","O","O","O","O","O","O","o","o","o","o","o","o","E","E","E","E","e","e","e","e","c","c","I","I","I","I","i","i","i","i","U","U","U","U","u","u","u","u","Y","y","N","n","_","");
	$newstr = str_replace($s, $r, $str);
	return $newstr;
}

?>