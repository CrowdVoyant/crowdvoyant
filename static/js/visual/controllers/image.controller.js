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




  }


})();
