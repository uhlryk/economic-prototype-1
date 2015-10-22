/*jslint node: true */
"use strict";
function Resource(keyList){
  this.list = {};
  if(keyList) {
    this.setKeyList(keyList);
  }
}
Resource.prototype.setKey = function(key){
  this.list[key] = 0;
}
Resource.prototype.setKeyList = function(keyList) {
  for(var i=0; i < keyList.length;i++){
    this.setKey(keyList[i]);
  }
}
Resource.prototype.reset = function(){
  for(var i in this.list){
    if(this.list.hasOwnProperty(i)){
      this.list[i] = 0;
    }
  }
  return this;
}
Resource.prototype.set = function(key, value){
  this.list[key] = value;
}
Resource.prototype.add = function(key, value){
  this.list[key] += value;
}
Resource.prototype.modify = function(res, func){
  for(var i in res){
    if(res.hasOwnProperty(i)){
      func.call(this,i, res[i]);
    }
  }
  return this;
}
Resource.prototype.setList = function(res){
  this.modify(res, this.set);
  return this;
}
Resource.prototype.addList = function(res){
  this.modify(res, this.add);
  return this;
}
Resource.prototype.get = function(key){
  return this.list[key];
}
Resource.prototype.getList = function(){
  return this.list;
}
module.exports = Resource;