<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<title>WIND Tutorials</title>
	<!-- La feuille de styles "base.css" doit être appelée en premier. -->
	<link rel="stylesheet" type="text/css" href="./styles/base.css" media="all" />
	<link rel="stylesheet" type="text/css" href="./styles/modele11.css" media="screen" />
	<link href="./styles/prism.css" rel="stylesheet" />
	<link href="./styles/tutoCom.css" rel="stylesheet" type="text/css"/>
	<script src="../lib/prism.js"></script>
</head>

<body>
<?php include("../config.php"); ?>
<div id="global">
	<div id="entete">
		<h1>
			<a href="<?php echo $tutorials_path; ?>"><img alt="" src="logo.png" />
			<span>WIND Tutorials</span></a>
		</h1>
		<p class="sous-titre">
			<strong>WIND: Web INteraction Design.</strong>
		</p>
	</div><!-- #entete -->

	<div id="centre">
	<div id="centre-bis">

		<div id="navigation">
			<?php include($left_menu);?>
		</div><!-- #navigation -->

		<div id="secondaire">
			<?php include($right_menu);?>
		</div><!-- #secondaire -->

		<div id="principal">
			<?php
				include($body);
			?>
			
		</div><!-- #principal -->

	</div><!-- #centre-bis -->
	</div><!-- #centre -->

	<div id="pied">
		<?php include($footer);?>
	</div><!-- #pied -->

</div><!-- #global -->

</body>
</html>
