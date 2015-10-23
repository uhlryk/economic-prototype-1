/*jslint node: true */
"use strict";
require("./gameTime");
require("./gameData");
module.exports = angular.module('Game.Controllers',['Game.Time','Game.Data'])
.controller("Game.MainController", ['$scope', '$timeout', 'gameData','gameTime', function($scope, $timeout, gameData, gameTime){
  gameData.init();
  gameTime.init();
  $scope.day = gameTime.getDay();
  $scope.$watch('resouces',function(){});
  $scope.resources = gameData.actualResources.getList();
  $scope.$watch('buildings',function(){});
  $scope.resourceNameList = gameData.resourceNameList;
  $scope.buildings = gameData.buildings.getList();
  $scope.definition = gameData.definition.getList();
  gameTime.addDayListener(function(time, day) {
    $scope.day = day;
    gameData.calculate();
  });
  gameTime.start();
}])
.controller("Game.TopController", ['$scope', function($scope){
}])
.controller("Game.SideController", ['$scope', function($scope){
}])
.controller("Game.DashboardController",["$scope", function($scope){
  $scope.$emit("changePanelTitle", "Dashboard");
}])
;