(function () {
  'use strict';

  angular
    .module('crowdsource.config', ['angular-loading-bar'])
    .config(config);

  config.$inject = ['$httpProvider', '$locationProvider', 'cfpLoadingBarProvider'];

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($httpProvider, $locationProvider, cfpLoadingBarProvider) {
    $httpProvider.interceptors.push('AuthHttpResponseInterceptor');

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    cfpLoadingBarProvider.includeSpinner = false;

  }
})();
