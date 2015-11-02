/*jslint node: true */
"use strict";
function BuildDefinitionList(){
  this.list = {};
}
BuildDefinitionList.prototype.add = function(name, buildResource, buildTerrain, timeResource, timeTerrain){
  this.list[name] = {
    buildResource:buildResource,
    buildTerrain:buildTerrain,
    timeResource:timeResource,
    timeTerrain:timeTerrain
  };
};
BuildDefinitionList.prototype.get = function(name){
  return this.list[name];
};
BuildDefinitionList.prototype.getList = function(){
  return this.list;
};
BuildDefinitionList.prototype.getBuildResource = function(name){
  return this.get(name).buildResource;
};
BuildDefinitionList.prototype.getTimeResource = function(name){
  return this.get(name).timeResource;
};
BuildDefinitionList.prototype.getBuildTerrain = function(name){
  return this.get(name).buildTerrain;
};
BuildDefinitionList.prototype.getTimeTerrain = function(name){
  return this.get(name).timeTerrain;
};
module.exports = BuildDefinitionList;
