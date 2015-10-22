/*jslint node: true */
"use strict";

module.exports = angular.module('EconomicGame.Services',[])
.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
})
.directive('autoFocus', function($timeout) {
  return {
    restrict: 'AC',
    link: function(_scope, _element) {
      $timeout(function(){
        _element[0].focus();
      }, 0);
    }
  };
});

