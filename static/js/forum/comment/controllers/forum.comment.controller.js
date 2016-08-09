/**
* CommentController
* @namespace crowdsource.forum.comment.controllers
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.forum.comment.controllers')
    .controller('CommentController', CommentController);

  CommentController.$inject = ['$location', '$scope', 'Authentication', 'Comment', 'Topic', 'Category', '$routeParams', '$mdToast', '$mdDialog'];

  /**
  * @namespace CommentController
  */
	function CommentController($location, $scope, Authentication, Comment, Topic, Category, $routeParams, $mdToast, $mdDialog) {
		var userAccount = Authentication.getAuthenticatedAccount();
		if (!userAccount) {
			$location.path('/login');
			return;
		}

    var self = this;
		self.topic={};
		Topic.getTopic($routeParams.param).then(function(topicData){
			self.topic=topicData[0];
      Category.getCategory(self.topic.category).then(function (CategoryData){
        self.topic.category = CategoryData[0];
        if(self.topic.category.parent){
          Category.getCategory(self.topic.category.parent).then(function (CategoryData){
            self.topic.category.parent = CategoryData[0];
          });
        }

      });
      Comment.getComments($routeParams.param).then(function (commentsData) {
  			self.topic.comments = commentsData[0];
        console.log(self.topic.comments);
  		});
      Comment.getPolls($routeParams.param).then(function (pollsData) {
  			self.topic.polls = pollsData[0];
        console.log(self.topic.polls);
  		});

		});






    self.newcomment = {};
		self.addComment = function(){
      self.newcomment.topic =  self.topic.id;
			Comment.addComment(self.newcomment).then(function(commentData){
				$mdToast.show(
						$mdToast.simple()
						.content('New comment added')
						.hideDelay(3000)
				);
				self.topic.comments.push(commentData[0]);
				self.newcomment = {
					topic: self.topic.id
				};
			});
		}
    self.like = function(comment){
      Comment.addLike(comment).then(function(commentLikeData){
        comment.likes_count = comment.likes_count+1;
        comment.liked = commentLikeData[0];
      });
    }

    self.unlike = function(comment){
      Comment.removeLike(comment).then(function(commentData){
        comment.likes_count = comment.likes_count-1;
        comment.liked = [];
      });
    }

    self.addPoll = function(ev) {
      $mdDialog.show({
        controller: AddPollController,
        controllerAs: 'addpoll',
        templateUrl: '/static/templates/forum/newPoll.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      }).then(function(answer) {
        answer.topic = self.topic.id;
        Comment.addPoll(answer).then(function (pollData){
          if(pollData[1]=201){
            $mdToast.show(
                $mdToast.simple()
                .content('New Poll created')
                .hideDelay(3000)
            );
            self.topic.poll.push(pollData[0]);
            console.log(self.topic.poll);
          }
        });
      }, function() {
      });
    };

  }

  function AddPollController($location, $scope, Authentication,$mdDialog){
		var self = this;
		self.poll = {};
    self.poll.choices = [];
    self.poll.choice_limit = 1;
    self.addchoice = function() {
      self.poll.choices.push({description: self.temp});
      self.temp = "";
    }
    self.removechoice = function(choice) {
      self.poll.choices.pop(choice);
    }
		self.cancel = function() {
			$mdDialog.cancel();
		};
		self.answer = function(subcategory) {
			$mdDialog.hide(subcategory);
		};
	}
})();
