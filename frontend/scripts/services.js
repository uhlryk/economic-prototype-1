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
  this.add = function(key, data){
    if(!memoryData[key]){
      memoryData[key] = {};
    }
    for(var i in data){
      if(data.hasOwnProperty(i)){
        var v = data[i];
        if(!memoryData[key][i]){
          memoryData[key][i] = [v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v];
        }
        memoryData[key][i].push(v);
        if(memoryData[key][i].length > 21){
          memoryData[key][i] = memoryData[key][i].splice(memoryData[key][i].length-21,21);
        }
      }
    }
  };
  this.getAll = function(key1){
    if(!memoryData[key1]){
      memoryData[key1] = [];
    }
    return memoryData[key1];
  };
  this.get = function(key1, key2){
    if(!memoryData[key1]){
      memoryData[key1] = [];
    }
    if(!memoryData[key1][key2]){
      memoryData[key1][key2] = [];
    }
    return memoryData[key1][key2];
  };
});

