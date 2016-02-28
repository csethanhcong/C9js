// create the angular app
angular.module('demoApp', [
	'ngRoute', 
	'appRoutes', 
	'appCtrl',
  	'appDirective',
  	'd3'
  ]);

// setup dependency injection
// angular.module('d3', []);
// angular.module('appCtrl', []);
// angular.module('appDirective', ['d3']);
