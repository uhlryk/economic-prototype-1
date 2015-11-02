/*jslint node: true */
"use strict";
require("./buildDefinition");
var Resource = require("./gameData/resource");
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = angular.module('Game.Data',['Game.BuildDefinition'])
.service('gameData', ['buildDefinition', function (buildDefinition) {
  this.resourceNameList = ['logs','boards','stone','food','iron ore','iron','tools', 'weapons'];
  this.buildNameList = ['woodcutter','sawmill','farm','stonemason','ironmine','ironsmelter', 'metalworks', 'armory'];
  this.terrainNameList = ['grassland', 'hill', 'forest', 'desert', 'stone deposit','coal deposit', 'iron deposit'];
  this.definition = buildDefinition.definition;
  this.buildings = new Resource(this.buildNameList);
  this.actualResources = new Resource(this.resourceNameList);
  this.nextDayResources = new Resource(this.resourceNameList);
  this.actualTerrains = new Resource(this.terrainNameList);
  this.nextDayTerrains = new Resource(this.terrainNameList);
  this.init = function(){
    this.actualResources.reset().setList({logs:20,boards:10,stone:20,food:20,'iron ore':5,iron:10,tools:10, weapons:10});
    this.actualTerrains.reset().setList({grassland:rand(50,60),hill:rand(10,20),forest:rand(50,60),desert:rand(10,20),'stone deposit':rand(50,60), 'coal deposit':rand(30,40), 'iron deposit':rand(30,40)});
    this.nextDayResources.reset();
    this.nextDayTerrains.reset();
    this.buildings.reset();
  };
  this.calculate = function(){
    this.nextDayResources.reset();
    this.nextDayTerrains.reset();
    for(var i=0;i < this.buildNameList.length; i++){
      var buildingName = this.buildNameList[i];
      var quantity = this.buildings.get(buildingName);
      var buildTimeResource = this.definition.getTimeResource(buildingName);
      var buildTimeTerrain = this.definition.getTimeTerrain(buildingName);
      for(var resName in buildTimeResource){
        this.nextDayResources.add(resName, buildTimeResource[resName] * quantity);
      }
      for(var terName in buildTimeTerrain){
        this.nextDayTerrains.add(terName, buildTimeTerrain[terName] * quantity);
      }
    }
  };
  this.addNextDayResources = function(){
    this.actualResources.addList(this.nextDayResources.getList());
  };
  this.addNextDayTerrains = function(){
    this.actualTerrains.addList(this.nextDayTerrains.getList());
  };
  this.build = function(buildingName) {
    var building = this.definition.get(buildingName);
    var buildResource = building.buildResource;
    var buildTerrain = building.buildTerrain;
    if(this.actualResources.isEnough(buildResource) && this.actualTerrains.isEnough(buildTerrain)) {
      this.actualResources.addList(buildResource);
      this.actualTerrains.addList(buildTerrain);
      this.buildings.increment(buildingName);
      this.calculate();
    }
  };
  this.demolish = function(buildingName) {
    var building = this.definition.get(buildingName);
    var buildTerrain = building.buildTerrain;
    var quantity = this.buildings.get(buildingName);
    if(quantity>0){
      this.buildings.decrement(buildingName);
      this.actualTerrains.subtractList(buildTerrain);
      this.calculate();
    }
  };
}])
;

