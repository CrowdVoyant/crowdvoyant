/**
* ImageController
* @namespace crowdsource.visual.controllers
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.visual.controllers')
    .controller('ImageController', ImageController);

  CommentController.$inject = ['$location', '$scope', 'Authentication', '$routeParams', '$mdToast', '$mdDialog'];

  /**
  * @namespace ImageController
  */
	function ImageController($location, $scope, Authentication, Visual, $routeParams, $mdToast, $mdDialog) {

    var self = this;
		self.articles={};
		Visual.getArticles($routeParams.param).then(function(Data){
			self.articles = Data[0]
      });

		});

  }


})();
