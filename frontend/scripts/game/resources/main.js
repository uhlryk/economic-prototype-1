/*jslint node: true */
"use strict";
require("./controllers");
module.exports = angular.module('Resources',['Resources.Controllers'])
.config(["$stateProvider", function($stateProvider){
  $stateProvider
  .state("game.resources", {
    abstract : true,
    url : "/resources",
    controller : "Resources.MainController",
    template : '<div ui-view></div'
  })
  .state("game.resources.list", {
    url : "/list",
    templateUrl: "js/views/game/resources/list.html",
    controller : "Resources.ListController"
  })
  ;
}]);