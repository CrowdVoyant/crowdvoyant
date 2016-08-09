(function () {
  'use strict';

  angular
    .module('crowdsource.forum.comment', [
      'crowdsource.forum.comment.controllers',
       'crowdsource.forum.comment.services'
    ]);

  angular
    .module('crowdsource.forum.comment.controllers', []);

  angular
    .module('crowdsource.forum.comment.services', ['ngCookies']);

})();
