angular
  .module('crowdsource', [
    // third party modules
    'angular-loading-bar',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'mgcrea.ngStrap',
    'ngMaterial',
    //'angular-oauth2',
    'ngDragDrop',
    'ui.sortable',
    'ngFileUpload',
    // local modules
    'crowdsource.home',
    'crowdsource.layout',
    'crowdsource.config',
    'crowdsource.routes',
    'crowdsource.visual',
    'crowdsource.services'
  ]);

angular
  .module('crowdsource')
  .run(run);

run.$inject = ['$http', '$rootScope', '$window', '$location'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http, $rootScope, $window, $location) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';


}
