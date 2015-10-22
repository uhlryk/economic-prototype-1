/*jslint node: true */
"use strict";
module.exports = angular.module('EconomicGame.Controllers',[])
.controller("MainMenuController", ['$scope','$state', function($scope,$state){
  $scope.startGame = function(){
    $state.go('game.dashboard');
  };
}])
;
