/*jslint node: true */
"use strict";
require("./gameTime");
require("./gameData");
module.exports = angular.module('Game.Controllers',['Game.Time','Game.Data'])
.controller("Game.MainController", ['$scope', '$timeout', 'gameData','gameTime','storage', function($scope, $timeout, gameData, gameTime, storage){
  storage.init();
  gameData.init();
  gameTime.init();
  $scope.filters = {};
  for(var i=0; i < gameData.resourceNameList.length;i++){
    var resourceName = gameData.resourceNameList[i];
    $scope.filters[resourceName] = true;
  }

  $scope.day = gameTime.getDay();
  $scope.$watch('resouces',function(){});
  $scope.resources = gameData.actualResources.getList();
  $scope.$watch('buildings',function(){});
  $scope.resourceNameList = gameData.resourceNameList;
  $scope.buildings = gameData.buildings.getList();
  $scope.definition = gameData.definition.getList();
  storage.add("resource",JSON.parse(JSON.stringify(gameData.actualResources.getList())));
  storage.add("buildings",JSON.parse(JSON.stringify(gameData.buildings.getList())));
  gameTime.addDayListener(function(time, day) {
    $scope.day = day;
    gameData.addNextDayResources();
    storage.add("resource",JSON.parse(JSON.stringify(gameData.actualResources.getList())));
    storage.add("buildings",JSON.parse(JSON.stringify(gameData.buildings.getList())));
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