/*jslint node: true */
"use strict";
module.exports = angular.module('Resources.Controllers',[])
.controller("Resources.MainController",["$scope", function($scope){
  $scope.$emit("changePanelTitle", "Resources");

}])
.controller("Resources.ListController",["$scope","gameData", function($scope,gameData){
  $scope.$emit("changePanelTitle", "List Resources");
  $scope.colors = ['CornflowerBlue','Crimson','DarkBlue','DarkGoldenRod','DarkGreen','DarkMagenta','DarkOrange','DarkSlateBlue','DeepPink','DodgerBlue'];
  $scope.resources = gameData.nextDayResources.getList();
  $scope.$watch('resources',function(){});

  $scope.clickFilter = function(resourceName){
    $scope.filters[resourceName]=!$scope.filters[resourceName];
  };
}])
;