(function () {
  'use strict';

  angular
    .module('crowdsource.visual', [
      'crowdsource.visual.controllers',
      'crowdsource.visual.services',
      'crowdsource.visual.directives',
      'updateMeta'


    ]);

  angular
    .module('crowdsource.visual.controllers', ['updateMeta']);

  angular
    .module('crowdsource.visual.services', ['ngCookies']);

  angular
    .module('crowdsource.visual.directives', ['updateMeta']);
})();
