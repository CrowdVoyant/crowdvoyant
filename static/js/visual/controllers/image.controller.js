/**
* ImageController
* @namespace crowdsource.visual.controllers
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.visual.controllers')
    .controller('ImageController', ImageController);

  ImageController.$inject = ['$location', '$scope', 'Visual', '$routeParams'];

  /**
  * @namespace ImageController
  */
	function ImageController($location, $scope, Visual, $routeParams) {

    var self = this;
		self.articles={};
		Visual.getArticles($routeParams.param).then(function(Data){
			self.articles = Data[0]
      });

  }


})();
