angular.module('appCtrl', [])
  .controller('DemoCtrl', function($scope){
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

    $scope.addData = function() {
      var html = '<div class="row">'+
      '  <div class="row">' +
      '    <div class="col-lg-4">' +
      '      <input type="text" class="form-control" placeholder="name..">' +
      '    </div>' +
      '    <div class="col-lg-4">' +
      '      <input type="text" class="form-control" placeholder="data..">' +
      '    </div>' +
      '    <div class="col-lg-4">' +
      '      <button class="btn btn-primary" type="button" title="Add" ng-click="addData()" ><span><i class="glyphicon glyphicon-plus"></i></span></button>' +
      '      <button class="btn btn-danger" type="button" title="Remove" ng-click="removeData()"><span><i class="glyphicon glyphicon-remove"></i></span></button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="col-lg-10"><hr></div>' +
      '</div>';
      $scope.$apply(function() {
        angular.element($('#input-data')).append(html);
      });
    };

    $scope.removeData = function() {
      var html = $(this);
      console.log(html.html());
      // angular.element($('#input-data')).remove(html);
    }
  });
