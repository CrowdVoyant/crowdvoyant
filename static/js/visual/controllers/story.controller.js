/**
* StoryController
* @namespace crowdsource.visual.controllers
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.visual.controllers')
    .controller('StoryController', StoryController);

  StoryController.$inject = ['$location', '$scope', 'Visual', '$routeParams'];

  /**
  * @namespace StoryController
  */
	function StoryController($location, $scope, Visual, $routeParams) {

    var self = this;
		self.stories={};
		Visual.getAllStories().then(function(Data){
			self.stories = Data[0];
      console.log(self.stories);
      });



  }


})();
