/*jslint node: true */
'use strict';
(function(){
  require('./controllers');
  require('./services');
  require('./game/main');
  var app = angular.module('EconomicGame', ['ngAnimate', 'ui.router','dynamicNumber', 'EconomicGame.Controllers', 'EconomicGame.Services','Game'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider){
    $stateProvider
    .state('404', {
      url: '/404',
      templateUrl:'js/views/404.html'
    })
    .state('start', {
      url:'/',
      templateUrl:'js/views/start.html',
      controller:'MainMenuController'
    })
    ;
    $urlRouterProvider.otherwise('/404.html');
    $locationProvider.html5Mode(true);
  }])
  .run(['$state', '$rootScope', function($state, $rootScope) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      switch(error){
        default:
          $state.go("start");
      }
    });
    $state.go('start');
  }]);
})();