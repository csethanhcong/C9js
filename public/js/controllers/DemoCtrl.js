angular.module('demoApp')
  .controller('DemoCtrl', function($scope, $compile, $element, fileReader){
    $scope.rows = [];
    $scope.title = "DemoCtrl";
    $scope.d3Data = [{
      name: "Greg",
      data: 98
    }, {
      name: "Ari",
      data: 96
    }, {
      name: "Loser",
      data: 48
    }];

    $scope.accessor = function(d) {
      return d.data
    };

    $scope.d3OnClick = function(item) {
      alert(item.name);
    };

    $scope.getFile = function() {
      fileReader.readAsDataUrl($scope.file, $scope)
        .then(function(result) {
          var resultInJSON = JSON.parse(result);

          // refresh data
          $scope.refreshData();

          for (var i = 0; i < resultInJSON.length; i++) {
            $scope.d3Data.push({
              name: resultInJSON[i].name,
              data: resultInJSON[i].data
            });
          };
        });
    };

    $scope.refreshData = function() {
      $scope.d3Data = [];
    };
  });
