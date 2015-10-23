/*jslint node: true */
"use strict";
var Resource = require("./gameData/resource");
var BuildDefinitionList = require("./gameData/buildDefinitionList");
module.exports = angular.module('EconomicGame.Game.Data',[])
.service('gameData', function () {
  this.definition = new BuildDefinitionList();
  this.definition.add('woodcutter',{logs:2,   stone:1},{food:-1,logs:3});
  this.definition.add('sawmill',   {boards:3, stone:3},{food:-2,logs:-4,boards:2});
  this.definition.add('farm',      {boards:3, stone:4},{logs:-1,stone:-1,food:3});
  this.definition.add('stonemason',{boards:2, stone:1},{food:-1,stone:3});
  this.definition.add('ironmine',  {boards:3, stone:2},{food:-3,iron:2 });
  this.definition.add('ironsmelter',  {boards:3, stone:3},{food:-3,iron:2 });
  this.definition.add('metalworks',  {boards:3, stone:4},{food:-3,iron:-2,logs:-3,tools:2});
  this.definition.add('armory',  {boards:4, stone:4},{food:-3,iron:-2,logs:-3,weapons:2});

  this.buildings = new Resource(['woodcutter','sawmill','farm','stonemason','ironmine','ironsmelter', 'metalworks', 'armory']);
  this.actualResources = new Resource(['logs','boards','stone','food','iron','tools', 'weapons']);
  this.nextDayResources = new Resource(['logs','boards','stone','food','iron','tools', 'weapons']);
  this.init = function(){
    this.actualResources.reset().setList({logs:20,boards:10,stone:20,food:20,iron:10,tools:10, weapons:10});
    this.nextDayResources.reset();
    this.buildings.reset();
  };
  this.calculate = function(){
    for(var i in this.buildings.getList()) {
      var building = this.buildings.get(i);
      var buildingDefinition = this.definition.get(i);
      if(building && buildingDefinition){

      }
    }
  };
  this.build = function() {

  };
})
;

