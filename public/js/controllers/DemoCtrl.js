angular.module('appCtrl', [])
  .controller('DemoCtrl1', function($scope){
    $scope.title = "DemoCtrl";
    $scope.d3Data = [
      {name: "Greg", score:98},
      {name: "Ari", score:96},
      {name: "Loser", score: 48}
    ];

    $scope.d3OnClick = function(item){
      alert(item.name);
    };
  })
  .controller('DemoCtrl2', function($scope){
    $scope.title = "DemoCtrl2";
    $scope.d3Data = [
      {title: "Greg", score:12},
      {title: "Ari", score:43},
      {title: "Loser", score: 87}
    ];
  })
  .controller('DemoCtrl3', function($scope, fileReader){
    $scope.d3Data = [];
    $scope.title = "DemoCtrl3";
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          var resultInJSON = JSON.parse(result);
                          for (var i = 0; i < resultInJSON.length; i++){
                            $scope.d3Data.push({
                                        name: resultInJSON[i].title,
                                        score: resultInJSON[i].score
                                      });
                          }                          
                      });
    };
  });
