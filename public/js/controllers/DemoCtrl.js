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
  });

