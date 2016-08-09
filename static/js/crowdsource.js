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
    'crowdsource.config',
    'crowdsource.routes',
    'crowdsource.visual'
  ]);

angular
  .module('crowdsource')
  .run(run);

run.$inject = ['$http', '$rootScope', '$window', '$location', 'Authentication'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http, $rootScope, $window, $location, Authentication) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';


}
