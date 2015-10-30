/*jslint node: true */
"use strict";
require("./controllers");
require("./buildings/main");
require("./chartsDirectives");
module.exports = angular.module('Game',['Game.Controllers','Buildings','charts'])
.config(["$stateProvider", function($stateProvider){
  $stateProvider
  .state("game", {
    abstract : true,
    url : "/game",
    templateUrl: "js/views/game/layout.html",
    controller : 'Game.MainController',
  })
  .state("game.dashboard", {
    url : "/dashboard",
    templateUrl: "js/views/game/dashboard.html",
    controller : "Game.DashboardController"
  })
  ;
}]);