/*jslint node: true */
"use strict";
module.exports = angular.module('Buildings.Controllers',[])
.controller("Buildings.MainController",["$scope", function($scope){
  $scope.$emit("changePanelTitle", "Buildings");

}])
.controller("Buildings.ListController",["$scope", function($scope){
  $scope.$emit("changePanelTitle", "List Buildings");
}])
.controller("Buildings.ConstructController",["$scope","gameData", function($scope, gameData){
  $scope.build = function(buildingName){
    gameData.build(buildingName);
    console.log("build " + buildingName);
  };
  $scope.demolish = function(buildingName){
    gameData.demolish(buildingName);
    console.log("demolish " + buildingName);
  };
  $scope.$emit("changePanelTitle", "Construct Buildings");
}])
;