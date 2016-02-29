angular.module('demoApp')
	.directive('userInteraction', function($compile) {
		// Runs during compile
		return {
			restrict: 'AEC',
			scope: {
				data: '='
			},
			templateUrl: '../views/userInteraction.html',
			link: function($scope, iElm, iAttrs, controller) {
				$scope.addData = function(e) {
					// Init data for added item
					var dataLength = $scope.data.length;
					var newData = {
						"name": $scope.data[dataLength-1].name || "Test",
						"data": $scope.data[dataLength-1].data || "10"
					}
					$scope.data.push(newData);
				};

				$scope.removeData = function(e) {
					$scope.data.splice(e, 1);
				};

				$scope.refreshData = function() {
					// $scope.$apply(function() {
					$scope.d3Data = [];
					// });
				};
			}
		};
	});