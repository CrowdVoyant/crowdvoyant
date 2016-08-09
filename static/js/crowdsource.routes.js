(function () {
  'use strict';

  angular
    .module('crowdsource.routes', ['ngRoute'])
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/visual/stories.html',
      controller: 'StoryController',
      controllerAs: 'ctrl'
    })
    .when('/story/:param',{
      templateUrl: '/visual/images.html',
      controller: 'ImageController',
      controllerAs: 'ctrl'
    })
    .when('/forum-home', {
        controller: 'CategoryController',
        controllerAs: 'ctrl',
        templateUrl :'/static/templates/forum/home.html',
        authenticated:true
    })
    .when('/forum-category/:param', {
        controller: 'TopicController',
        controllerAs: 'ctrl',
        templateUrl :'/static/templates/forum/category.html',
        authenticated:true
    })
    .when('/forum-topic/:param', {
        controller: 'CommentController',
        controllerAs: 'ctrl',
        templateUrl :'/static/templates/forum/topic.html',
        authenticated:true
    })

    .otherwise('/');
  }
})();
