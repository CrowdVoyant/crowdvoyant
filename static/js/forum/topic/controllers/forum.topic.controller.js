/**
* TopicController
* @namespace crowdsource.forum.topic.controllers
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.forum.topic.controllers')
    .controller('TopicController', TopicController);

	angular
	.module('crowdsource.forum.category.controllers')
	.controller('AddTopicController', AddTopicController);

	angular
	.module('crowdsource.forum.category.controllers')
	.controller('AddSubCategoryController', AddSubCategoryController);

  TopicController.$inject = ['$location', '$scope', 'Authentication', 'Topic', 'Category', '$routeParams', '$mdDialog', '$mdToast'];
  AddTopicController.$inject = ['$location', '$scope', 'Authentication', 'Category', '$mdDialog'];
  AddSubCategoryController.$inject = ['$location', '$scope', 'Authentication', 'Category', '$mdDialog'];

  /**
  * @namespace TopicController
  */
  function TopicController($location, $scope, Authentication, Topic, Category, $routeParams, $mdDialog, $mdToast) {
    var self = this;
    var userAccount = Authentication.getAuthenticatedAccount();
    if (!userAccount) {
      $location.path('/login');
      return;
    }

  	self.category = {};
		Category.getCategory($routeParams.param).then(function (CategoryData){
			self.category = CategoryData[0];
      if(self.category.parent){
        Category.getCategory(self.category.parent).then(function (CategoryData){
          self.category.parent = CategoryData[0];
        });
      }
      Topic.getTopics($routeParams.param).then(function (topicsData) {
        self.category.topics = topicsData[0];
      });
		});




		self.addTopic = function(ev) {
			$mdDialog.show({
				controller: AddTopicController,
				controllerAs: 'addtopic',
				templateUrl: '/static/templates/forum/newTopic.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				answer.category = self.category.id;
				Topic.addTopic(answer).then(function (topicData){
					if(topicData[1]=201){
						$mdToast.show(
								$mdToast.simple()
								.content('New Topic added : '+topicData[0].title)
								.hideDelay(3000)
						);
						self.category.topics.push(topicData[0]);
					}
				});
			}, function() {
			});
		};

		self.addSubCategory = function(ev) {
			$mdDialog.show({
				controller: AddSubCategoryController,
				controllerAs: 'addsubcategory',
				templateUrl: '/static/templates/forum/newSubCategory.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				answer.parent = self.category.id;
				Category.addCategory(answer).then(function (subcategoryData){
					if(subcategoryData[1]=201){
						$mdToast.show(
								$mdToast.simple()
								.content('New Sub Category added : '+subcategoryData[0].title)
								.hideDelay(3000)
						);
						self.category.category_set.push(subcategoryData[0]);
					}
				});
			}, function() {
			});
		};

  }

	function AddTopicController($location, $scope, Authentication, Category,   $mdDialog){
		var self = this;
		self.topic = {};
		self.cancel = function() {
			$mdDialog.cancel();
		};
		self.answer = function(topic) {
			$mdDialog.hide(topic);
		};
	}
	function AddSubCategoryController($location, $scope, Authentication, Category,   $mdDialog){
		var self = this;
		self.subcategory = {};
		self.cancel = function() {
			$mdDialog.cancel();
		};
		self.answer = function(subcategory) {
			$mdDialog.hide(subcategory);
		};
	}
})();
