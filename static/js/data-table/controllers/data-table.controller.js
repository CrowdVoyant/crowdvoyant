/**
 * Created by dmorina on 07/07/15.
 */
/**
* DataTableController
* @namespace crowdsource.data-table.controllers
*/
(function () {
    'use strict';

    angular
      .module('crowdsource.data-table.controllers')
      .controller('DataTableController', DataTableController);

    DataTableController.$inject = ['$location', '$scope','$log', '$q','$timeout', '$mdSidenav', '$mdUtil', '$rootScope', '$filter', '$routeParams'];
    /**
    * @namespace DataTableController
    */
      function DataTableController($location, $scope,  $log,$q ,$timeout, $mdSidenav, $mdUtil, $rootScope, $filter, $routeParams) {
        var self = this;
        self.isDisabled    = false;
        function activate(){
        }
        self.activate();



      }
})();