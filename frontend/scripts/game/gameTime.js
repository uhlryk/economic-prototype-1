/*jslint node: true */
"use strict";
module.exports = angular.module('EconomicGame.Game.Time',[])
.service('gameTime',['$timeout',function($timeout){
  var interval = 500;
  var daytime, day, dayListener, timeListener, refreshControl;
  var gameLoop = function() {
    refreshControl = $timeout(function() {
      daytime ++;
      if(daytime>3){
        daytime = 0;
        day ++;
        dayListener.forEach(function(cb){
          cb(daytime, day);
        });
      }
      timeListener.forEach(function(cb){
        cb(daytime, day);
      });
      refreshControl = $timeout(gameLoop, interval);
    },interval);
  };
  this.init = function(){
    daytime = 0;
    day = 1;
    dayListener = [];
    timeListener = [];
  };
  this.start = function(){
    gameLoop();
  };
  this.stop = function(){
    $timeout.cancel(refreshControl);
  };
  this.addDayListener = function(cb){
    dayListener.push(cb);
  };
  this.addTimeListener = function(cb){
    timeListener.push(cb);
  };
  this.getTime = function(){
    return daytime;
  };
  this.getDay = function(){
    return day;
  };
}]);