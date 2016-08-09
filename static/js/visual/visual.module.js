(function () {
  'use strict';

  angular
    .module('crowdsource.visual', [
      'crowdsource.visual.controllers',
      'crowdsource.visual.services'
    ]);

  angular
    .module('crowdsource.visual.controllers', []);

  angular
    .module('crowdsource.visual.services', ['ngCookies']);
})();
