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

