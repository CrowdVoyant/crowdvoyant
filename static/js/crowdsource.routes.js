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
      templateUrl: '/static/templates/task-feed/main.html',
      controller: 'TaskFeedController',
      controllerAs: 'taskfeed',
      authenticated:true
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
