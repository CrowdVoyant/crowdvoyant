/**
* ImageController
* @namespace crowdsource.visual.controllers
*/
(function () {
  'use strict';

  angular
  .module('crowdsource.visual.controllers')
  .controller('ImageController', ImageController);

  angular
  .module('crowdsource.visual.controllers')
  .controller('MemeController', MemeController);

  ImageController.$inject = ['$location', '$scope', 'Visual', '$routeParams', '$mdDialog'];

  /**
  * @namespace ImageController
  */
  function ImageController($location, $scope, Visual, $routeParams, $mdDialog) {

    var self = this;
    self.story=null;
    self.selection_done=false;
    self.selected_images=[];

    Visual.getStory($routeParams.param).then(function(Data){
      self.story = Data[0];
      Visual.getArticles(self.story.id).then(function(Data){
        self.story.articles = Data[0];
        console.log(self.story.articles);

        for (var index in self.story.articles){
          self.getimages(index);

        }
      });
    });
    self.getimages = function(index) {
      Visual.getImages(self.story.articles[index].id).then(function(Data){
        console.log(self.story.articles[index]);
        self.story.articles[index].images = Data[0];
        console.log(Data[0]);
      });
    }

    self.select = function(image){
      self.selected_images.push(image);
      if (self.selected_images.length == 2){
        self.selection_done=true;
      }
      console.log(self.selected_images);
    }

    self.reset = function(){
      self.selected_images=[];
      self.selection_done=false;
    }

    self.showAdvance = function(ev, images, story) {
       $mdDialog.show({
         controller: MemeController,
         controllerAs: 'meme',
         templateUrl: '/static/templates/visual/dialog1.tmpl.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true,
         locals : {
                    images : images,
                    story : story
                },
         fullscreen: $scope.customFullscreen
         // Only for -xs, -sm breakpoints.
       })
       .then(function() {
         $scope.status = 'Meme Generated. Thanks for your contribution towards fighting media bias.';
       }, function() {
         $scope.status = 'You cancelled the dialog.';
       });
     };


  }

  function MemeController($location, $scope, Visual, $mdDialog, images, story){
		var self = this;
    self.images = images;
    self.story = story;
    console.log(self.images);
		self.cancel = function() {
			$mdDialog.cancel();
		};
		self.answer = function() {
			$mdDialog.hide();
		};
	}


})();
