/*jslint node: true */
"use strict";
require("./gameTime");
require("./gameData");
module.exports = angular.module('EconomicGame.Game.Controllers',['EconomicGame.Game.Time','EconomicGame.Game.Data'])
.controller("GameController", ['$scope', '$timeout', 'gameData','gameTime', function($scope, $timeout, gameData, gameTime){
  gameData.init();
  gameTime.init();
  $scope.day = gameTime.getDay();
  $scope.$watch('resouces',function(){});
  $scope.resources = gameData.actualResources.getList();
  gameTime.addDayListener(function(time, day) {
    $scope.day = day;
  });
  gameTime.start();
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