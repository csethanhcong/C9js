angular.module('appCtrl', [])
  .controller('DemoCtrl', function($scope, $compile, $element, fileReader){
    $scope.rows = [];
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
      '      <input type="text" class="form-control" placeholder="name.."></input>' +
      '    </div>' +
      '    <div class="col-lg-4">' +
      '      <input type="text" class="form-control" placeholder="data.."></input>' +
      '    </div>' +
      '    <div class="col-lg-4">' +
      '      <button class="btn btn-primary" type="button" title="Add" ng-click="addData()" ><span><i class="glyphicon glyphicon-plus"></i></span></button>' +
      '      <button class="btn btn-danger" type="button" title="Remove" ng-click="removeData($event)"><span><i class="glyphicon glyphicon-remove"></i></span></button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="col-lg-10"><hr></div>' +
      '</div>';
      html = $compile(html)($scope);
      var appendToElement = angular.element($('#input-data'));
      appendToElement.append(html);
    };

    $scope.removeData = function(e) {
      console.log(e);
      // Choose exact row that contains this element
      var removeElement = e.path[3].className == 'row ng-scope' ? e.path[3] : e.path[5];
      removeElement.remove();
    };

    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
          .then(function(result) {
              // $scope.$apply(function() {
                var resultInJSON = JSON.parse(result);
                // refresh data
                $scope.refreshData();
                for (var i = 0; i < resultInJSON.length; i++){
                  $scope.d3Data.push({
                    name: resultInJSON[i].title,
                    score: resultInJSON[i].score
                  });
                };     

                $scope.rows = $scope.d3Data;
              });
          // });
    };

    $scope.refreshData = function() {
      // $scope.$apply(function() {
        $scope.d3Data = [];
      // });
    };
  });
