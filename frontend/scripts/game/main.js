/*jslint node: true */
"use strict";
require("./controllers");
require("./buildings/main");
module.exports = angular.module('Game',['Game.Controllers','Buildings'])
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