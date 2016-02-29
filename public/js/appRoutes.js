angular.module('demoApp')
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		// .when('/', {
		// 	templateUrl: 'views/home.html'
		// 	// controller: 'MainController'
		// })

	$locationProvider.html5Mode(true);

}]);