/*jslint node: true */
"use strict";
var BuildDefinitionList = require("./gameData/buildDefinitionList");
module.exports = angular.module('Game.BuildDefinition',[])
.service('buildDefinition', function () {
  this.definition = new BuildDefinitionList();
  this.definition.add('woodcutter', {
    logs:-2, stone:-1
  }, {
    grassland: -2
  }, {
    food:-1,logs:3
  }, {
    grassland: 2, forest:-2
  });
  this.definition.add('sawmill', {
    boards:-3, stone:-3
  }, {
    grassland: 4
  }, {
    food:-2,logs:-4,boards:2
  }, {

  });
  this.definition.add('farm', {
    boards:-3, stone:-4
  }, {
    grassland: -20
  }, {
    logs:-1,stone:-1,food:3
  }, {

  });
  this.definition.add('stonemason',{
    boards:-2, stone:-1
  }, {
    grassland: -2
  }, {
    food:-1,stone:3
  }, {
    'stone deposit':-2
  });
  this.definition.add('ironmine',  {
    boards:-3, stone:-2
  }, {
    'hill':-1
  }, {
    food:-3,'iron ore':2
  }, {
    'iron deposit':-2, 'hill':2
  });
  this.definition.add('ironsmelter', {
    boards:-3, stone:-3
  }, {
    grassland: -4
  }, {
    food:-3,logs:2,'iron ore':-4,iron:2
  }, {

  });
  this.definition.add('metalworks',  {
    boards:-3, stone:-4
  }, {
    grassland: -4
  }, {
    food:-3,iron:-2,boards:-3,tools:2
  }, {

  });
  this.definition.add('armory',  {
    boards:-4, stone:-4
  }, {
    grassland: -4
  }, {
    food:-3,iron:-2,logs:-3,weapons:2
  }, {

  });
});