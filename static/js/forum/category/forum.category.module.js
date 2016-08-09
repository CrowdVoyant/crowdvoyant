(function () {
  'use strict';

  angular
    .module('crowdsource.forum.category', [
      'crowdsource.forum.category.controllers',
       'crowdsource.forum.category.services'
    ]);

  angular
    .module('crowdsource.forum.category.controllers', []);

  angular
    .module('crowdsource.forum.category.services', ['ngCookies']);

})();
