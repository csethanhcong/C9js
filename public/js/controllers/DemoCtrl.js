angular.module('demoApp')
  .controller('DemoCtrl', function($scope, $compile, $element, fileReader){
    $scope.isActiveTabGraph = true;
    $scope.isActiveTabMap = false;
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

    var center = {
      lat: 0,
      lon: 0,
      zoom: 1
    }

    var markers = [
      {
          name: 'London',
          lat: 51.505,
          lon: -0.09,
          label: {
            message: 'London',
            show: false,
            showOnMouseOver: true
          },
          onClick: function (event, properties) {
            center.lat = properties.lat;
            center.lon = properties.lon;
            center.zoom = 10;
          }
      },
      {
          name: 'Bath',
          lat: 51.375,
          lon: -2.35,
          label: {
            message: 'Bath',
            show: false,
            showOnMouseOver: true
          },
          onClick: function (event, properties) {
            center.lat = properties.lat;
            center.lon = properties.lon;
            center.zoom = 10;
          }
      },
      {
          name: 'Canterbury',
          lat: 51.267,
          lon: 1.083,
          label: {
            message: 'Canterbury',
            show: false,
            showOnMouseOver: true,
          },
          onClick: function (event, properties) {
            center.lat = properties.lat;
            center.lon = properties.lon;
            center.zoom = 10;
          }
      }
    ];

    angular.extend($scope, {
      center: center,
      markers: markers
    });



    $scope.accessor = function(d) {
      return d.data;
    };

    $scope.d3OnClick = function(item) {
      alert(item.name);
    };

    $scope.getFile = function() {
      fileReader.readAsDataUrl($scope.file, $scope)
        .then(function(result) {
          var resultInJSON = JSON.parse(result);
          if ($scope.isActiveTabMap) {
            markers = [];
            center = {
              lat: 0,
              lon: 0,
              zoom: 1
            }
            for (var i = 0; i < resultInJSON.length; i++) {
              markers.push({
                name: resultInJSON[i].name,
                lat: resultInJSON[i].lat,
                lon: resultInJSON[i].lon,
                label: {
                  message: 'Name: ' + resultInJSON[i].name + '<br>Lat: ' + resultInJSON[i].lat + '<br>Lon: ' + resultInJSON[i].lon,
                  show: false,
                  showOnMouseOver: true
                }
              });
              markers[i].onClick = function (event, properties) {
                center.lat = properties.lat;
                center.lon = properties.lon;
                center.zoom = 10;
              }
            };
            angular.extend($scope, {
              center: center,
              markers: markers
            });
          }
          else {
            // refresh data
            $scope.refreshData();

            for (var i = 0; i < resultInJSON.length; i++) {
              $scope.d3Data.push({
                name: resultInJSON[i].name,
                data: resultInJSON[i].data
              });
            };
          }
          
        });
    };

    $scope.refreshData = function() {
      $scope.d3Data = [];
    };

    $scope.activeTabMap = function() {
      $scope.isActiveTabMap = true;
      $scope.isActiveTabGraph = false;
    };

    $scope.activeTabGraph = function() {
      $scope.isActiveTabGraph = true;
      $scope.isActiveTabMap = false;
    };
  });
