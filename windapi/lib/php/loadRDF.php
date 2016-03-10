<?php
ini_set("error_reporting", 1);
define("RDFAPI_INCLUDE_DIR", "E:/DONNEES/WWW/Nhan/rap/api/");
include(RDFAPI_INCLUDE_DIR . "RdfAPI.php");
	
function extractRDFInfo($file) {
	$result = array();
	//echo "toto";
	//if (file_exists($file)) {
		//echo "toto3";
		$model = ModelFactory::getDefaultModel();
		$model->load($file);
		$stmtIter = $model->findAsIterator(NULL, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#annotation"), NULL);
		$paragraph = array();
		$paraloaded = array();
		while ($stmtIter->hasNext()) {
			$statement = $stmtIter->next();
			$annot = $statement->getObject();
			$statement = $model->findFirstMatchingStatement($annot, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#entityName"), NULL);
			$entityName = $statement->getObject()->getLabel();
			
			//$statement = $model->findFirstMatchingStatement($annot, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#in"), NULL);
			$stmtIter1 = $model->findAsIterator($annot, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#in"), NULL);
			$intext = array();
			while ($stmtIter1->hasNext()) {
				$statement = $stmtIter1->next();
				$position = array();
				//if ($statement) {
				$inSub = $statement->getObject();
				$statement2 = $model->findFirstMatchingStatement($inSub, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#start"), NULL);
				// TODO
				$startURI = $statement2->getObject()->getURI();
				$temp = split("#", $startURI);
				if (!in_array($temp[0], $paraloaded)) {
					array_push($paraloaded, $temp[0]);
					$model->load($temp[0]);
					$stmtIter2 = $model->findAsIterator(NULL, new Resource("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#Paragraph"));
					while ($stmtIter2->hasNext()) {
						$statement3 = $stmtIter2->next();
						$para = $statement3->getSubject();
						$statement3 = $model->findFirstMatchingStatement($para, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#value"), NULL);
						$paragraph[] = $statement3->getObject()->getLabel();
					}
				}
				$tmp = split("-", $temp[1]);
				$paraNum = substr($tmp[0],3);
				$startNum = substr($tmp[1],5);
				$statement2 = $model->findFirstMatchingStatement($inSub, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#end"), NULL);
				$endURI = $statement2->getObject()->getURI();
				$temp = split("#", $endURI);
				$tmp = split("-", $temp[1]);
				$endNum = substr($tmp[1],5);
				$intext[] = array("paragraph" => $paraNum, "start" => $startNum, "end" => $endNum);
				//}
			}
			$stmtIter2 = $model->findAsIterator($annot, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#spatialInfo"), NULL);
			$infos = array();
			while ($stmtIter2->hasNext()) {
				$statement2 = $stmtIter2->next();
				$spat = $statement2->getObject();
				$statement2 = $model->findFirstMatchingStatement($spat, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#geoname"), NULL);
				$geoname = $statement2->getObject()->getLabel();
				$statement2 = $model->findFirstMatchingStatement($spat, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#geotype"), NULL);
				$geotype = $statement2->getObject()->getLabel();
				$temp = split("#", $geotype);
				$statement2 = $model->findFirstMatchingStatement($spat, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#geolocation"), NULL);
				$geolocation = $statement2->getObject()->getLabel();
				$infos[] = array("geoname" => $geoname, "geotype" => $temp[1], "geolocation" => $geolocation);
			}
			
			$stmtIter3 = $model->findAsIterator($annot, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#temporalInfo"), NULL);
			$temporalInfos = array();
			while ($stmtIter3->hasNext()) {
				$statement3 = $stmtIter3->next();
				$tempo = $statement3->getObject();
				$statement3 = $model->findFirstMatchingStatement($tempo, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#interval"), NULL);
				$interval = $statement3->getObject();
				$statement3 = $model->findFirstMatchingStatement($interval, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#tempoStart"), NULL);
				$startTime = $statement3->getObject()->getLabel();
				
				$statement3 = $model->findFirstMatchingStatement($interval, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#tempoEnd"), NULL);
				$endTime = $statement3->getObject()->getLabel();
				$temporalInfos[] = array("tempoStart" => $startTime, "tempoEnd" => $endTime);
			}
			$result[] = array("entityName" => $entityName, "position" => $intext, "spatialInfo" => $infos, "temporalInfo" => $temporalInfos);
			
		}
		
		$stmtIter = $model->findAsIterator(NULL, new Resource("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#Itinerary"));
		$wps = array();
		while ($stmtIter->hasNext()) {
			$statement = $stmtIter->next();
			$annot = $statement->getSubject();
			$statement = $model->findFirstMatchingStatement($annot, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#waypoints"), NULL);
			$wpSeqSub = $statement->getObject();
			$wpSeq = $model->findAsIterator($wpSeqSub, NULL, NULL);
			
			while ($wpSeq->hasNext()) {
				$stmt = $wpSeq->next();
				$predicateLabel = $stmt->getLabelPredicate();
				if (substr($predicateLabel,0,strlen(RDF_NAMESPACE_URI.'_')) == RDF_NAMESPACE_URI.'_') {
					$annot = $stmt->getObject();
					$statement2 = $model->findFirstMatchingStatement($annot, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#spatialInfo"), NULL);
					$spat = $statement2->getObject();
					$statement3 = $model->findFirstMatchingStatement($spat, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#geoname"), NULL);
					$geoname = $statement3->getObject()->getLabel();
					$statement3 = $model->findFirstMatchingStatement($spat, new Resource("http://erozate.iutbayonne.univ-pau.fr/windmash#geolocation"), NULL);
					$geolocation = $statement3->getObject()->getLabel();
					$wps[] = array("geoname" => $geoname, "geolocation" => $geolocation);
				}
			}
		}
	//}
	return array("paragraphs" => $paragraph, "annotations" => $result, "itinerary" => $wps);
}
	
$fichier = $_GET["rdf"];
//echo $fichier;
echo json_encode(extractRDFInfo($fichier));
?>