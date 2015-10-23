/*jslint node: true */
"use strict";
require("./controllers");
module.exports = angular.module('Buildings',['Buildings.Controllers'])
.config(["$stateProvider", function($stateProvider){
  $stateProvider
  .state("game.buildings", {
    abstract : true,
    url : "/buildings",
    controller : "Buildings.MainController",
    template : '<div ui-view></div'
  })
  .state("game.buildings.construct", {
    url : "/construct",
    templateUrl: "js/views/game/buildings/construct.html",
    controller : "Buildings.ConstructController"
  })
  ;
}]);