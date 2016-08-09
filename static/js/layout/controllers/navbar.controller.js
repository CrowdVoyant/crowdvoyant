/**
* NavbarController
* @namespace crowdsource.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.layout.controllers')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', '$rootScope', '$location'];

  /**
  * @namespace NavbarController
  */
  function NavbarController($scope, $rootScope, $location) {
    var self = this;

    $rootScope.isActiveTab = isActiveTab;

    /**
    * @name logout
    * @desc Log the user out
    * @memberOf crowdsource.layout.controllers.NavbarController
    */


    function isActiveTab(path){
      var re = new RegExp(path,'gi');
      return ($location.path().match(re));
    }
  }
})();
