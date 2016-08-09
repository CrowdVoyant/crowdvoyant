(function () {
  'use strict';

  angular
    .module('crowdsource.forum.topic', [
      'crowdsource.forum.topic.controllers',
       'crowdsource.forum.topic.services'
    ]);

  angular
    .module('crowdsource.forum.topic.controllers', []);

  angular
    .module('crowdsource.forum.topic.services', ['ngCookies']);

})();
