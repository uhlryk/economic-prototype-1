/*jslint node: true */
"use strict";
var Resource = require("./gameData/resource");
var BuildDefinitionList = require("./gameData/buildDefinitionList");
module.exports = angular.module('Game.Data',[])
.service('gameData', function () {
  this.resourceNameList = ['logs','boards','stone','food','iron ore','iron','tools', 'weapons'];
  this.buildNameList = ['woodcutter','sawmill','farm','stonemason','ironmine','ironsmelter', 'metalworks', 'armory'];
  this.definition = new BuildDefinitionList();
  this.definition.add('woodcutter',{logs:-2,   stone:-1},{food:-1,logs:3});
  this.definition.add('sawmill',   {boards:-3, stone:-3},{food:-2,logs:-4,boards:2});
  this.definition.add('farm',      {boards:-3, stone:-4},{logs:-1,stone:-1,food:3});
  this.definition.add('stonemason',{boards:-2, stone:-1},{food:-1,stone:3});
  this.definition.add('ironmine',  {boards:-3, stone:-2},{food:-3,'iron ore':2 });
  this.definition.add('ironsmelter',  {boards:-3, stone:-3},{food:-3,logs:2,'iron ore':-4,iron:2 });
  this.definition.add('metalworks',  {boards:-3, stone:-4},{food:-3,iron:-2,boards:-3,tools:2});
  this.definition.add('armory',  {boards:-4, stone:-4},{food:-3,iron:-2,logs:-3,weapons:2});

  this.buildings = new Resource(this.buildNameList);
  this.actualResources = new Resource(this.resourceNameList);
  this.nextDayResources = new Resource(this.resourceNameList);
  this.init = function(){
    this.actualResources.reset().setList({logs:20,boards:10,stone:20,food:20,'iron ore':5,iron:10,tools:10, weapons:10});
    this.nextDayResources.reset();
    this.buildings.reset();
  };
  this.calculate = function(){
    this.actualResources.addList(this.nextDayResources.getList());
    this.nextDayResources.reset();
    for(var i=0;i < this.buildNameList.length; i++){
      var buildingName = this.buildNameList[i];
      var quantity = this.buildings.get(buildingName);
      var buildTimeResource = this.definition.getTimeResource(buildingName);
      for(var resName in buildTimeResource){
        this.nextDayResources.add(resName, buildTimeResource[resName] * quantity);
      }
    }
  };
  this.build = function(buildingName) {
    var building = this.definition.get(buildingName);
    var buildResource = building.buildResource;
    if(this.actualResources.isEnough(buildResource)) {
      this.actualResources.addList(buildResource);
      this.buildings.increment(buildingName);
    }
  };
  this.demolish = function(buildingName) {
    var quantity = this.buildings.get(buildingName);
    if(quantity>0){
      this.buildings.decrement(buildingName);
    }
  };
})
;

