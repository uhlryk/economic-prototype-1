/*jslint node: true */
"use strict";
module.exports = angular.module('EconomicGame.Services',[])
/**
 * temporary memory storage
 */
.service('storage', function () {
  var memoryData = {};
  this.init = function (){
    memoryData = {};
  };
  this.add = function(key, day, data){
    if(!memoryData.key){
      memoryData.key = [];
    }
    memoryData.key[day] = data;
  };
  this.get = function(key){
    if(!memoryData.key){
      memoryData.key = [];
    }
    return memoryData.key;
  };
});

