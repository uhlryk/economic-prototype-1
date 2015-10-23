/*jslint node: true */
"use strict";
function BuildDefinitionList(){
  this.list = {};
}
BuildDefinitionList.prototype.add = function(name, buildResource, timeResource){
  this.list[name] = {
    buildResource:buildResource,
    timeResource:timeResource
  };
};
BuildDefinitionList.prototype.get = function(name){
  return this.list[name];
};
BuildDefinitionList.prototype.getBuildResource = function(name){
  return this.get(name).buildResource;
};
BuildDefinitionList.prototype.getTimeResource = function(name){
  return this.get(name).timeResource;
};
module.exports = BuildDefinitionList;
