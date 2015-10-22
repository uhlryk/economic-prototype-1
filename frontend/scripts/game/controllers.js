/*jslint node: true */
"use strict";
module.exports = angular.module('EconomicGame.Game.Controllers',[])
.controller("GameController", ['$scope', '$timeout', 'data', function($scope, $timeout, data){
  console.log("GameController");
  data.init();
  console.log(data.actualResources.getList());
  $scope.day = 999;

  $scope.resouces = data.actualResources.getList();
  $scope.$watch('resouces',function(){});
  var time = 0;
  var gameLoop = function() {
    var cancelRefresh= $timeout(function myFunction() {
      console.log(time*25 + "%");
      time ++;
      if(time>3){
        time = 0;
        $scope.day ++;
      }
      cancelRefresh = $timeout(gameLoop, 1000);
    },1000);
  };
  gameLoop();
}])
.controller("TopController", ['$scope', function($scope){
  console.log("TopController");
}])
.controller("SideController", ['$scope', function($scope){
  console.log("SideController");
}])
.controller("Game.DashboardController",["$scope", function($scope){
  console.log("Game.DashboardController");
  $scope.$emit("changePanelTitle", "Dashboard");
}])
;