/*jslint node: true */
"use strict";
module.exports = angular.module('Buildings.Controllers',[])
.controller("Buildings.MainController",["$scope", function($scope){
  $scope.$emit("changePanelTitle", "Buildings");

}])
.controller("Buildings.ConstructController",["$scope", function($scope){
  $scope.$emit("changePanelTitle", "Construct Buildings");
}])
;