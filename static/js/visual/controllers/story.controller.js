/**
* StoryController
* @namespace crowdsource.visual.controllers
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.visual.controllers')
    .controller('StoryController', StoryController);

  CommentController.$inject = ['$location', '$scope', 'Authentication', '$routeParams', '$mdToast', '$mdDialog'];

  /**
  * @namespace StoryController
  */
	function StoryController($location, $scope, Authentication, Visual, $routeParams, $mdToast, $mdDialog) {

    var self = this;
		self.stories={};
		Visual.getAllStories().then(function(Data){
			self.stories = Data

      });

		});

  }


})();
