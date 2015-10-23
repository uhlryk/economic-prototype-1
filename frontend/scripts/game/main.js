/*jslint node: true */
"use strict";
require("./controllers");
module.exports = angular.module('EconomicGame.Game',['EconomicGame.Game.Controllers']);
angular.module('EconomicGame.Game').config(["$stateProvider", function($stateProvider){
  $stateProvider
  .state("game", {
    abstract : true,
    templateUrl: "js/views/game/layout.html",
    controller : 'GameController',
  })
  .state("game.dashboard", {
    url : "/game/dashboard",
    templateUrl: "js/views/game/dashboard.html",
    controller : "Game.DashboardController"
  })
  ;
}]);